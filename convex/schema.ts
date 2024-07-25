import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  books: defineTable({
    bookTitle: v.string(),
    bookTitleShort: v.string(),
    chapter: v.object({
      number: v.float64(),
      sectionTitle: v.string(),
      title: v.string(),
    }),
    footnotes: v.optional(v.any()),
    isChapterStart: v.boolean(),
    isSectionStart: v.boolean(),
    pageContent: v.string(),
    pageNumber: v.float64(),
  }),
  books_preprocessing: defineTable({
    pageContent: v.string(),
    bookTitle: v.string(),
  }),
  books_preprocessing_test: defineTable({
    pageContent: v.string(),
    bookTitle: v.string(),
  }),
});
