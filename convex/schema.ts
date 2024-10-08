import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,
  books: defineTable({
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
  })
    .index("by_bookTitle", ["bookTitleShort"])
    .index("by_pageNumber", ["bookTitleShort", "pageNumber"]),
  readers: defineTable({
    isPaid: v.boolean(),
    lastBookPage: v.array(
      v.object({
        bookTitle: v.string(),
        pageNumber: v.float64(),
      })
    ),
    sampleMonthBegin: v.float64(),
    samplesRemaining: v.float64(),
    userId: v.id("users"),
  }),
  books_preprocessing: defineTable({
    storageId: v.string(),
    fileUrl: v.string(),
  }),
  books_preprocessing_test: defineTable({
    storageId: v.string(),
    fileUrl: v.string(),
  }),
  books_test: defineTable({
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
  }),
});
