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
    language: v.string(),
    publishing: v.optional(
      v.object({
        author: v.optional(v.string()),
        ISBN: v.optional(v.string()),
        printedPageCount: v.optional(v.number()),
        publicationDate: v.optional(v.number()),
        publisher: v.optional(v.string()),
        editors: v.optional(
          v.array(
            v.object({
              name: v.optional(v.string()),
            })
          )
        ),
        translators: v.optional(
          v.array(
            v.object({
              name: v.optional(v.string()),
            })
          )
        ),
        originalLanguage: v.optional(v.string()),
      })
    ),
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
      language: args.language,
      publishing: args.publishing,
    });

    return bookId;
  },
});
