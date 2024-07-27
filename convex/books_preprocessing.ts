import { mutation, query, action } from "./_generated/server";
import { api } from "./_generated/api";
import { ConvexError } from "convex/values";
import fetch from "node-fetch";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("books_preprocessing").collect();
  },
});

// List of storage IDs
const storageIds = [
  "kg29ye8jbd09x7tgqrwpgrm3416xpfn8",
  "kg27z90rxz9zfbxq1a9gfw0vpn6xq1hg",
  "kg25nx9krr1ysbzg9y8a8x4jy56xp65h",
  "kg2cjwv7y69wcb7g8sfvnfv5e96xqhhn",
  "kg21yg4keekjjbgqgpst9dshxs6xqx3t",
  "kg28kcz32kymyf95g29ezcespn6xqtdc",
  "kg24b1bck3s79mqm3kk8re7hen6xqvhn",
  "kg248d4jhh2harrb7cmfxscegs6xq050",
];

export const generateFileUrls = mutation({
  args: {},
  handler: async (ctx) => {
    const results = [];

    for (const storageId of storageIds) {
      // Generate the file URL
      const fileUrl = await ctx.storage.getUrl(storageId);

      // Store the file URL in the books_preprocessing table
      const documentId = await ctx.db.insert("books_preprocessing", {
        storageId,
        fileUrl,
      });

      results.push({ storageId, fileUrl, documentId });
    }

    return results;
  },
});
