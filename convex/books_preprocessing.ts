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
const storageIds = ["kg21hnd448rf4c93n6wx0h3dqh6xq44w"];

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
