// File: convex/books.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";

export const getAll = query(async ({ db }) => {
  const books = await db.query("books").collect();
  return books;
});

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

export const moveTextToPreviousPage = mutation({
  args: {},
  handler: async (ctx) => {
    // Query all books, sorted by pageNumber
    const books = await ctx.db
      .query("books")
      .order("asc", "pageNumber")
      .collect();

    for (let i = 0; i < books.length; i++) {
      const currentDoc = books[i];

      if (currentDoc.chapter && currentDoc.chapter.sectionTitle) {
        const sectionTitleIndex = currentDoc.pageContent.indexOf(
          currentDoc.chapter.sectionTitle
        );

        if (sectionTitleIndex !== -1) {
          const textToMove = currentDoc.pageContent.substring(
            0,
            sectionTitleIndex
          );
          const newCurrentPageContent =
            currentDoc.pageContent.substring(sectionTitleIndex);

          // Find the previous page
          const previousDoc = books.find(
            (book) => book.pageNumber === currentDoc.pageNumber - 1
          );

          if (previousDoc) {
            // Update the previous document
            await ctx.db.patch(previousDoc._id, {
              pageContent: previousDoc.pageContent + textToMove,
            });

            // Update the current document
            await ctx.db.patch(currentDoc._id, {
              pageContent: newCurrentPageContent,
            });
          } else {
            console.warn(
              `No previous page found for page number ${currentDoc.pageNumber}`
            );
          }
        }
      }
    }
  },
});

export const updateChapterSectionFlags = mutation({
  args: {},
  handler: async (ctx) => {
    const books = await ctx.db
      .query("books")
      .order("asc", "pageNumber")
      .collect();

    for (const book of books) {
      let isChapterStart = false;
      let isSectionStart = false;

      const chapterTitle = book.chapter.title.trim();
      const sectionTitle = book.chapter.sectionTitle.trim();

      // Split the page content into lines
      const contentLines = book.pageContent
        .replace(/\[p\]/g, "")
        .split("\n")
        .map((line) => line.trim());

      // Check for chapter start
      isChapterStart = contentLines.some((line) => line === chapterTitle);

      // Check for section start
      isSectionStart = contentLines.some((line) => line === sectionTitle);

      console.log(
        "contentLines: ",
        contentLines,
        "isChapterStart: ",
        isChapterStart,
        " | ",
        "isSectionStart: ",
        isSectionStart
      );

      if (isChapterStart || isSectionStart) {
        await ctx.db.patch(book._id, {
          isChapterStart,
          isSectionStart,
        });
      }
    }
  },
});

export const updateChapterSectionFlagsUsingEvery = mutation({
  args: {},
  handler: async (ctx) => {
    const books = await ctx.db
      .query("books")
      .order("asc", "pageNumber")
      .collect();

    for (const book of books) {
      let isChapterStart = false;
      let isSectionStart = false;
      const chapterTitle = book.chapter.title.toLowerCase();
      const sectionTitle = book.chapter.sectionTitle.toLowerCase();

      // Remove [p] tags and convert to lowercase
      const pageContent = book.pageContent.replace(/\[p\]/g, "").toLowerCase();

      // Check for chapter start
      const chapterWords = chapterTitle.split(/\s+/);
      isChapterStart = chapterWords.every((word) =>
        pageContent.includes(word.replace(/[()]/g, ""))
      );

      // If it's a chapter start, it's also a section start
      if (isChapterStart) {
        isSectionStart = true;
      } else {
        // Check for section start
        const sectionWords = sectionTitle.split(/\s+/);
        isSectionStart = sectionWords.every((word) =>
          pageContent.includes(word.replace(/[()]/g, ""))
        );
      }

      if (isChapterStart || isSectionStart) {
        await ctx.db.patch(book._id, {
          isChapterStart,
          isSectionStart,
        });
      }
    }
  },
});

export const getBookPages = query({
  args: {
    paginationOpts: paginationOptsValidator,
    currentPage: v.number(),
    currentBook: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("books")
      .withIndex("by_pageNumber", (q) =>
        q
          .eq("bookTitleShort", args.currentBook)
          .gt("pageNumber", args.currentPage)
          .lt("pageNumber", args.currentPage + 3)
      )
      .paginate(args.paginationOpts);
  },
});
