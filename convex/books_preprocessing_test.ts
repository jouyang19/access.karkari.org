import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { action } from "./_generated/server";
import { api } from "./_generated/api";
import { Id } from "./_generated/dataModel";
import { ConvexError } from "convex/values";

export const uploadBook = mutation(
  async (
    { db },
    { pageContent, bookTitle }: { pageContent: string; bookTitle: string }
  ) => {
    await db.insert("books_preprocessing_test", { pageContent, bookTitle });
  }
);

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("books_preprocessing_test").collect();
  },
});

// Haiku Book Preprocessing

interface BookPreprocessing {
  bookTitle: string;
  pageContent: string;
}

interface ProcessedBook {
  bookTitle: string;
  bookTitleShort: string;
  chapter: {
    number: number;
    sectionTitle: string;
    title: string;
  };
  footnotes?: any[];
  isChapterStart: boolean;
  isSectionStart: boolean;
  pageContent: string;
  pageNumber: number;
}

interface ClaudeAPIResponse {
  content: Array<{ text: string }>;
}

export const processBooks = action({
  args: {},
  handler: async (ctx): Promise<{ success: boolean; message: string }> => {
    const documents: BookPreprocessing[] = await ctx.runQuery(
      api.books_preprocessing_test.getAll
    );

    for (const doc of documents) {
      const prompt = `Given the following text from a book page, I need you to prepare it for a given Convex schema: 

      ${doc.pageContent}

I need: pageContent: v.string(), pageNumber: v.float64(), remember to not include the pageNumber you extract in the pageContent string Each page will come with a title at the beginning, such as "The Foundations of the Karkariya Order", ignore it. 

A page may have footnotes, if it does then in the pageContent string demarcate the footnote with brackets like this: [[289]], and they will fit as an object into the Convex schema    field: footnotes: v.any() AND PLEASE DO NOT CHANGE THE LOCATION of the footnotes when inserting into pageContent, 

Also from the pageContent I want you to remove un-necessary hyphens in words which the original content used for line breaks 

My Convex schema has a few other fields that you need to take care of: chapter: v.object({       number: v.float64(),  sectionTitle: v.string(),       title: v.string(),     }),     isChapterStart: v.boolean(),     isSectionStart: v.boolean(), The way you will figure these out, is from the table of contents and the associated page numbers, and note that each chapter start is also a section start

Always keep pageContent within one string and if there are " " inside of the pageContent that will break the flow of the string, insert a \ before the quotes

TABLE OF CONTENTS:

Introduction...................................................................................13 1. The Pact (al-ʿahd)......................................................................21 The Litany (al-wird)............................................................................ 36 Spiritual Companionship (ṣuḥba)................................................... 42 The Pledge of Allegiance to God...................................................... 56 The Hadith of the Walī........................................................................ 63 The Proper Conduct of Dhikr.......................................................... 71 The General Litany (al-Wird al-ʿĀmm).......................................... 74 The Rosary (subḥa).............................................................................. 77 2. The Sacred Dance (al-ḥaḍra)..................................................99 The Basis of the Ḥaḍra........................................................................ 103 The Proper Conduct of Samāʿ.......................................................... 118 The Moaning of the Palm Trunk..................................................... 120 3. The Patched Cloak (al-muraqqaʿa)........................................125 The Basis of the Muraqqaʿa............................................................... 129 Benefits of the Muraqqaʿa.................................................................. 132 The Muraqqaʿa of Sayyidunā ʿUmar .......................................... 138 The Symbolism of Colors in the Qurʾān........................................ 140 The Garment of Reverence (libās al-taqwā)..............................146 The Story of Sayyidunā Uways al-Qaranī (d. 657)..................... 151 4. The Name (al-Ism)....................................................................157 The Legal Status of Invoking the Singular Name........................ 160 Say, Allāh!............................................................................................... 164 All that is Upon it is Passing Away................................................... 168 Recite in the Name of the Lord......................................................... 170 The Essence (Dhāt)............................................................................. 176 God’s Exclusive Unity (Aḥadiyya)................................................... 179 The Hāʾ of Identity (Hāʾ al-huwiyya).............................................. 184 The Lām of Love or Contraction (Lām al-ʿishq)......................... 189 The Lām of Gnosis (Lām al-maʿrifa)............................................. 192 The Cloud (al-ʿamāʾ)........................................................................... 196 The Alif of Tawḥīd................................................................................ 199 The Treasure-Dot (nuqṭat al-kanziyya)........................................ 201 5. Wandering (siyāḥa)...................................................................203 Wandering with the Body and with the Spirit............................. 206 The Junction of the Two Seas........................................................... 212 “The wandering of my community is jihad in God’s cause”.... 216 The Disciple’s Provision..................................................................... 218 Regarding the Dry Ablution (tayammum)................................... 220 The Proper Courtesy of Siyāḥa........................................................ 222 6. The Spiritual Retreat (khalwa)................................................227 And We Appointed for Moses........................................................... 231 Separation (faṣl) and Union (waṣl)................................................. 235 Unification (al-jamʿ)............................................................................ 239 The Folding-Up (al-ṭayy)................................................................... 241 Beauty (al-jamāl)................................................................................. 245 And Moses Fell Down in a Swoon................................................... 249 7. The Innermost Secret (al-sirr)................................................255 As if you see Him (kaʾannaka tarāh).............................................. 258 The Vicegerency (al-khilāfa)............................................................ 268 Conclusion.....................................................................................275 Works Cited....................................................................................279 Index of Names..............................................................................285 

For chapter: v.object({ number: v.float64(), sectionTitle: v.string(), title: v.string(), }), I need you to infer what the chapter.number is and chapter.title is, based on the pageNumber you detect.  There are 7 chapters.

LAST BUT NOT LEAST, ONLY OUTPUT JSON DO NOT OUTPUT ANY EXPLANATIONS OR ANYTHING ELSE I JUST ONLY JSON OUTPUT PLEASE
   `;

      try {
        const response = await callClaudeHaikuAPI(prompt, doc.bookTitle);
        const processedData = processClaudeResponse(response, doc.bookTitle);
        await ctx.runMutation(api.books.create, processedData);
      } catch (error) {
        console.error(`Error processing document: ${doc.bookTitle}`, error);
      }
    }

    return { success: true, message: "All books processed" };
  },
});

async function callClaudeHaikuAPI(
  pageContent: string,
  bookTitle: string
): Promise<string> {
  const apiKey = process.env.CLAUDE_API_KEY;
  if (!apiKey) {
    throw new ConvexError("Claude API key is not set");
  }

  const apiUrl = "https://api.anthropic.com/v1/messages";
  const model = "claude-3-haiku-20240307";

  const prompt = `Given the following text from a book page, I need you to prepare it for a given Convex schema: 
  
        ${pageContent}
  
  I need: pageContent: v.string(), pageNumber: v.float64(), remember to not include the pageNumber you extract in the pageContent string Each page will come with a title at the beginning, such as "The Foundations of the Karkariya Order", ignore it. 
  
  A page may have footnotes, if it does then in the pageContent string demarcate the footnote with brackets like this: [[289]], and they will fit as an object into the Convex schema    field: footnotes: v.any() AND PLEASE DO NOT CHANGE THE LOCATION of the footnotes when inserting into pageContent, 
  
  Also from the pageContent I want you to remove un-necessary hyphens in words which the original content used for line breaks 
  
  My Convex schema has a few other fields that you need to take care of: chapter: v.object({       number: v.float64(),  sectionTitle: v.string(),       title: v.string(),     }),     isChapterStart: v.boolean(),     isSectionStart: v.boolean(), The way you will figure these out, is from the table of contents and the associated page numbers, and note that each chapter start is also a section start
  
  Always keep pageContent within one string and if there are " " inside of the pageContent that will break the flow of the string, insert a \ before the quotes
  
  TABLE OF CONTENTS:
  
  Introduction...................................................................................13 1. The Pact (al-ʿahd)......................................................................21 The Litany (al-wird)............................................................................ 36 Spiritual Companionship (ṣuḥba)................................................... 42 The Pledge of Allegiance to God...................................................... 56 The Hadith of the Walī........................................................................ 63 The Proper Conduct of Dhikr.......................................................... 71 The General Litany (al-Wird al-ʿĀmm).......................................... 74 The Rosary (subḥa).............................................................................. 77 2. The Sacred Dance (al-ḥaḍra)..................................................99 The Basis of the Ḥaḍra........................................................................ 103 The Proper Conduct of Samāʿ.......................................................... 118 The Moaning of the Palm Trunk..................................................... 120 3. The Patched Cloak (al-muraqqaʿa)........................................125 The Basis of the Muraqqaʿa............................................................... 129 Benefits of the Muraqqaʿa.................................................................. 132 The Muraqqaʿa of Sayyidunā ʿUmar .......................................... 138 The Symbolism of Colors in the Qurʾān........................................ 140 The Garment of Reverence (libās al-taqwā)..............................146 The Story of Sayyidunā Uways al-Qaranī (d. 657)..................... 151 4. The Name (al-Ism)....................................................................157 The Legal Status of Invoking the Singular Name........................ 160 Say, Allāh!............................................................................................... 164 All that is Upon it is Passing Away................................................... 168 Recite in the Name of the Lord......................................................... 170 The Essence (Dhāt)............................................................................. 176 God's Exclusive Unity (Aḥadiyya)................................................... 179 The Hāʾ of Identity (Hāʾ al-huwiyya).............................................. 184 The Lām of Love or Contraction (Lām al-ʿishq)......................... 189 The Lām of Gnosis (Lām al-maʿrifa)............................................. 192 The Cloud (al-ʿamāʾ)........................................................................... 196 The Alif of Tawḥīd................................................................................ 199 The Treasure-Dot (nuqṭat al-kanziyya)........................................ 201 5. Wandering (siyāḥa)...................................................................203 Wandering with the Body and with the Spirit............................. 206 The Junction of the Two Seas........................................................... 212 "The wandering of my community is jihad in God's cause".... 216 The Disciple's Provision..................................................................... 218 Regarding the Dry Ablution (tayammum)................................... 220 The Proper Courtesy of Siyāḥa........................................................ 222 6. The Spiritual Retreat (khalwa)................................................227 And We Appointed for Moses........................................................... 231 Separation (faṣl) and Union (waṣl)................................................. 235 Unification (al-jamʿ)............................................................................ 239 The Folding-Up (al-ṭayy)................................................................... 241 Beauty (al-jamāl)................................................................................. 245 And Moses Fell Down in a Swoon................................................... 249 7. The Innermost Secret (al-sirr)................................................255 As if you see Him (kaʾannaka tarāh).............................................. 258 The Vicegerency (al-khilāfa)............................................................ 268 Conclusion.....................................................................................275 Works Cited....................................................................................279 Index of Names..............................................................................285 
  
  For chapter: v.object({ number: v.float64(), sectionTitle: v.string(), title: v.string(), }), I need you to infer what the chapter.number is and chapter.title is, based on the pageNumber you detect.  There are 7 chapters.

  For BookTitle use "${bookTitle}"
  
  LAST BUT NOT LEAST, ONLY OUTPUT JSON DO NOT OUTPUT ANY EXPLANATIONS OR ANYTHING ELSE I JUST ONLY JSON OUTPUT PLEASE`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: model,
        max_tokens: 1000,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.2,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new ConvexError(
        `API call failed with status ${response.status}: ${errorBody}`
      );
    }

    const data: ClaudeAPIResponse = await response.json();

    if (!data.content || data.content.length === 0 || !data.content[0].text) {
      throw new ConvexError("Unexpected API response format");
    }

    return data.content[0].text;
  } catch (error) {
    console.error("Error calling Claude Haiku API:", error);
    throw new ConvexError(
      "Failed to call Claude Haiku API: " +
        (error instanceof Error ? error.message : String(error))
    );
  }
}

function processClaudeResponse(
  response: string,
  bookTitle: string
): ProcessedBook {
  try {
    const parsedResponse = JSON.parse(response);

    return {
      bookTitle,
      bookTitleShort: "", // Not provided in the new prompt, keeping it for schema consistency
      chapter: {
        number: parsedResponse.chapter.number,
        sectionTitle: parsedResponse.chapter.sectionTitle,
        title: parsedResponse.chapter.title,
      },
      footnotes: parsedResponse.footnotes,
      isChapterStart: parsedResponse.isChapterStart,
      isSectionStart: parsedResponse.isSectionStart,
      pageContent: parsedResponse.pageContent,
      pageNumber: parsedResponse.pageNumber,
    };
  } catch (error) {
    console.error("Error parsing Claude response:", error);
    throw new ConvexError("Failed to parse Claude response");
  }
}
