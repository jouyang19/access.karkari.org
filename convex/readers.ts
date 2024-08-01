import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { auth } from "./auth";

export const getReaderByUserId = query({
  args: {},
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (userId === null) {
      return null;
    }
    const reader = await ctx.db
      .query("readers")
      .filter((q) => q.eq(q.field("userId"), userId))
      .first();

    return reader;
  },
});

export const createReader = mutation({
  args: {
    userId: v.id("users"),
    isPaid: v.boolean(),
    sampleMonthBegin: v.optional(v.float64()),
    samplesRemaining: v.optional(v.float64()),
  },
  handler: async (ctx, args) => {
    const newReaderId = await ctx.db.insert("readers", {
      userId: args.userId,
      isPaid: args.isPaid,
      lastBookPage: [],
      sampleMonthBegin: args.sampleMonthBegin ?? Date.now(),
      samplesRemaining: args.samplesRemaining ?? 3,
    });

    return newReaderId;
  },
});

export const updateReaderPaidStatus = mutation({
  args: {
    readerId: v.id("readers"),
    isPaid: v.boolean(),
  },
  handler: async (ctx, args) => {
    const { readerId, isPaid } = args;

    const updatedReader = await ctx.db.patch(readerId, { isPaid });

    return updatedReader;
  },
});

export const updateReaderBookmark = mutation({
  args: {
    pageNumber: v.number(),
    readerId: v.id("readers"),
    bookTitle: v.string(),
  },
  handler: async (ctx, args) => {
    // Destructure pageNumber and readerId from args
    const { pageNumber, readerId, bookTitle } = args;

    // Fetch the current reader data
    const reader = await ctx.db.get(readerId);
    if (!reader) {
      throw new Error("Reader not found");
    }

    // Find the index of the book in the lastBookPage array
    const bookIndex = reader.lastBookPage.findIndex(
      (book) => book.bookTitle === bookTitle
    );

    // If the book exists, add a new entry
    let updatedLastBookPage;
    if (bookIndex !== -1) {
      updatedLastBookPage = [...reader.lastBookPage];
      updatedLastBookPage[bookIndex] = {
        ...updatedLastBookPage[bookIndex],
        pageNumber: pageNumber,
      };
    }

    // Update the reader's lastBookPage array
    const updatedReader = await ctx.db.patch(readerId, {
      lastBookPage: updatedLastBookPage,
    });
  },
});
