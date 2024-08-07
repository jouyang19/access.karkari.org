import { v } from "convex/values";
import { action } from "./_generated/server";
import Anthropic from "@anthropic-ai/sdk";

export const processImageWithClaude = action({
  args: { imageUrl: v.string(), prompt: v.string() },
  handler: async (ctx, args) => {
    const { imageUrl, prompt } = args;

    const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;

    if (!CLAUDE_API_KEY) {
      throw new Error("Claude API key not configured");
    }

    const anthropic = new Anthropic({
      apiKey: CLAUDE_API_KEY,
    });

    function isValidJson(jsonString) {
      try {
        JSON.parse(jsonString);
        return true;
      } catch (e) {
        return false;
      }
    }

    async function delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function processImage(retryCount = 0, maxRetries = 5) {
      try {
        // Fetch the image data
        const imageResponse = await fetch(imageUrl);
        const arrayBuffer = await imageResponse.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        const base64Image = btoa(String.fromCharCode.apply(null, uint8Array));

        const response = await anthropic.messages.create({
          model: "claude-3-5-sonnet-20240620",
          max_tokens: 4096,
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "image",
                  source: {
                    type: "base64",
                    media_type: "image/png",
                    data: base64Image,
                  },
                },
                {
                  type: "text",
                  text: prompt,
                },
              ],
            },
          ],
        });

        console.log("Claude response:", response.content[0].text);
        let string = response.content[0].text;

        if (isValidJson(string)) {
          let parsedResponse = JSON.parse(string);
          console.log("Parsed JSON response:", parsedResponse);
          return parsedResponse;
        } else {
          console.error("Invalid JSON format");
          if (retryCount < maxRetries) {
            console.log(
              `Retrying... Attempt ${retryCount + 1} of ${maxRetries}`
            );
            await delay(1000); // Exponential backoff
            return await processImage(retryCount + 1, maxRetries);
          } else {
            console.error("Max retries reached. Unable to get valid JSON.");
          }
        }
      } catch (error) {
        console.error("Error processing image with Claude:", error);
        if (retryCount < maxRetries) {
          console.log(`Retrying... Attempt ${retryCount + 1} of ${maxRetries}`);
          await delay(1000); // Exponential backoff
          return await processImage(retryCount + 1, maxRetries);
        } else {
          throw new Error(
            `Max retries reached. Unable to process image: ${error.message}`
          );
        }
      }
    }

    return await processImage();
  },
});
