import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getReaderByUserId = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const reader = await ctx.db
      .query("readers")
      .filter((q) => q.eq(q.field("userId"), args.userId))
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
