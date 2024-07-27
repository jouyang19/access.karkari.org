// File: convex/books.ts

import { mutation, query } from "./_generated/server";
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

export const getAllPageNumbers = query(async ({ db }) => {
  const books = await db.query("books").collect();
  const pageNumbers = books.map((book) => book.pageNumber);
  console.log(pageNumbers);
  return pageNumbers;
});

import { query } from "./_generated/server";

export const pagesAnalysis = mutation(async ({ db }) => {
  // Retrieve all pageNumber values
  const books = await db.query("books").collect();
  const pageNumbers = books.map((book) => book.pageNumber);

  console.log("All page numbers:", pageNumbers);

  // Check for duplicates
  const duplicates = pageNumbers.filter(
    (num, index, array) => array.indexOf(num) !== index
  );
  console.log("Duplicate page numbers:", duplicates);

  // Find page numbers outside the range 0-290
  const outOfRange = pageNumbers.filter((num) => num < 0 || num > 290);
  console.log("Page numbers out of range (0-290):", outOfRange);

  // Find missing page numbers in the range 0-290
  const allPossiblePages = Array.from({ length: 291 }, (_, i) => i);
  const missingPages = allPossiblePages.filter(
    (num) => !pageNumbers.includes(num)
  );
  console.log("Missing page numbers in range 0-290:", missingPages);

  return {
    allPageNumbers: pageNumbers,
    duplicates,
    outOfRange,
    missingPages,
  };
});

export const resetChapterAndSectionStarts = mutation(async ({ db }) => {
  // Query all book documents
  const books = await db.query("books").collect();

  // Update each book
  for (const book of books) {
    await db.patch(book._id, {
      isChapterStart: false,
      isSectionStart: false,
    });
  }

  return { success: true, message: "All books updated successfully" };
});
