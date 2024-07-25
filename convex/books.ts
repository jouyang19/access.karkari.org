// File: convex/books.ts

import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    bookTitle: v.string(),
    bookTitleShort: v.string(),
    chapter: v.object({
      number: v.number(),
      sectionTitle: v.string(),
      title: v.string(),
    }),
    footnotes: v.optional(v.any()),
    isChapterStart: v.boolean(),
    isSectionStart: v.boolean(),
    pageContent: v.string(),
    pageNumber: v.number(),
  },
  handler: async (ctx, args) => {
    const bookId = await ctx.db.insert("books", {
      bookTitle: args.bookTitle,
      bookTitleShort: args.bookTitleShort,
      chapter: {
        number: args.chapter.number,
        sectionTitle: args.chapter.sectionTitle,
        title: args.chapter.title,
      },
      footnotes: args.footnotes,
      isChapterStart: args.isChapterStart,
      isSectionStart: args.isSectionStart,
      pageContent: args.pageContent,
      pageNumber: args.pageNumber,
    });

    return bookId;
  },
});
