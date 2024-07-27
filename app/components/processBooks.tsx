import { useMutation, useQuery, useAction } from "convex/react";
import { api } from "convex/_generated/api";

// Placeholder for hardcoded publishing details
const PLACEHOLDER_PUBLISHING = {
  author: "Shaykh Mohamed Faouzi Al-Karkari ",
  ISBN: "978-2930978567",
  printedPageCount: 292,
  publicationDate: 2021,
  publisher: "Les 7 Lectures",
  editors: [{}],
  translators: [
    { name: "Yousef Casewit" },
    { name: "Khalid Williams" },
    { name: "Jamil Zaghdoudi" },
  ],
  originalLanguage: "Arabic",
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function useProcessBooks() {
  const getAllPages = useQuery(api.books_preprocessing.getAll);
  const createBook = useMutation(api.books.create);
  const processImageWithClaude = useAction(
    api.processImage.processImageWithClaude
  );

  const processBooks = async () => {
    if (!getAllPages) return;

    for (const page of getAllPages) {
      try {
        const pageContent = await processImageWithClaude({
          imageUrl: page.fileUrl,
          prompt: `This is a page of a book.

Extract the page content and the page number, output JSON given the Convex schema:

pageContent: v.string(), pageNumber: v.number(),

Ignore the title at the top of the page, do not include it.

Keep the Arabic unicode characters.

Remove the hypens from hyphenated words at line breaks.

To prevent syntax issues, for every " quotation mark and ' quotes within pageContent, ALWAYS add a \\ double backslash right before them. ALWAYS make sure and carefully diligently check to add \\  double backslash before quotation marks.

 Do not have \'\'\'json in the beginning of the output please, or this will fail. The highest priority instruction I have for you is to include \\ double backslash right before " quotation marks and single quotes ' within the pageContent string.

For the footnotes included within the page body text, keep them in the place that they occur, but render them in brackets like this: [[286]]

For the collection of footnotes at the bottom of the page, right before the page number, do not include these in the pageContent.

Include new lines with \\n and indicate new paragraph indentations with [p] at the beginning of the paragraph in the pageContent as well.

Output JSON in your response, do not add any text outside of the JSON in your response. Do everything I said, ALWAYS.

Recognize if a page is a page from the index, to instead put all text inside pageContent, and the page number is always at the very bottom of the page. 

very important: For null or undefined values, put an empty string or placeholder number instead.
`,
        });

        const footnotes = await processImageWithClaude({
          imageUrl: page.fileUrl,
          prompt: `This is a page of a book.

Extract the footnote number and content, output JSON given the Convex schema: 

footnotes: [
{
number: v.number()
content: v.string()
}
]



Keep the Arabic unicode characters.

Remove the hypens from hyphenated words at line breaks, if any.

To prevent syntax issues, before every " quotation mark and ' quotes within pageContent, add a \ triple backslash right before them. Double make sure to add \\ double backslash before quotation marks.

 Do not have \'\'\'json in the beginning of the output please, or this will fail. The highest priority instruction I have for you is to include \\ double backslash right before " quotation marks within the pageContent string.

Output JSON in your response, do not add any text outside of the JSON in your response. Do everything I said, ALWAYS

if there are no footnotes, put placeholder numbers and empty strings.
`,
        });

        const chapterDetails = await processImageWithClaude({
          imageUrl: page.fileUrl,
          prompt: `
This is a page of a book.

Extract the footnote number and content, output JSON given the Convex schema: 
{
  chapter: {
      number: v.number(),
      sectionTitle: v.string(),
      title: v.string(),
  }
  isChapterStart: v.boolean(),
  isSectionStart: v.boolean(),
}

The title of the book is The Foundations of the Karkariya Order, so do not use that for title of chapter.

title and number is for chapterTitle and chapterNumber

Infer sectionTitle, title and number from the following table of contents:

                                  Table of Contents

0. Introduction...................................................................................13
1.0 The Pact (al-ʿahd)......................................................................21
1.1   The Litany (al-wird)............................................................................ 36
1.2   Spiritual Companionship (ṣuḥba)................................................... 42
1.3   The Pledge of Allegiance to God...................................................... 56
1.4   The Hadith of the Walī........................................................................ 63
1.5   The Proper Conduct of Dhikr.......................................................... 71
1.6   The General Litany (al-Wird al-ʿĀmm).......................................... 74
1.7   The Rosary (subḥa).............................................................................. 77
2.0 The Sacred Dance (al-ḥaḍra)..................................................99
2.1   The Basis of the Ḥaḍra........................................................................ 103
2.2   The Proper Conduct of Samāʿ.......................................................... 118
2.3   The Moaning of the Palm Trunk..................................................... 120
3.0 The Patched Cloak (al-muraqqaʿa)........................................125
3.1   The Basis of the Muraqqaʿa............................................................... 129
3.2   Benefits of the Muraqqaʿa.................................................................. 132
3.3  The Muraqqaʿa of Sayyidunā ʿUmar .......................................... 138
3.4   The Symbolism of Colors in the Qurʾān........................................ 140
3.5   The Garment of Reverence (libās al-taqwā)..............................146
3.6   The Story of Sayyidunā Uways al-Qaranī (d. 657)..................... 151
4.0 The Name (al-Ism)....................................................................157
4.1   Th.e Legal Status of Invoking the Singular Name........................ 160
4.2   Say, Allāh!............................................................................................... 164
4.3  All that is Upon it is Passing Away................................................... 168
4.4   Recite in the Name of the Lord......................................................... 170
4.5   The Essence (Dhāt)............................................................................. 176
4.6   God’s Exclusive Unity (Aḥadiyya)................................................... 179
4.7   The Hāʾ of Identity (Hāʾ al-huwiyya).............................................. 184
4.8   The Lām of Love or Contraction (Lām al-ʿishq)......................... 189
4.9   The Lām of Gnosis (Lām al-maʿrifa)............................................. 192
4.10   The Cloud (al-ʿamāʾ)........................................................................... 196
4.11   The Alif of Tawḥīd................................................................................ 199
4.12   The Treasure-Dot (nuqṭat al-kanziyya)........................................ 201
5.0 Wandering (siyāḥa)...................................................................203
5.1   Wandering with the Body and with the Spirit............................. 206
5.2   The Junction of the Two Seas........................................................... 212
5.3   “The wandering of my community is jihad in God’s cause”.... 216
5.4   The Disciple’s Provision..................................................................... 218
5.5   Regarding the Dry Ablution (tayammum)................................... 220
5.6   The Proper Courtesy of Siyāḥa........................................................ 222
6.0 The Spiritual Retreat (khalwa)................................................227
6.1   And We Appointed for Moses........................................................... 231
6.2   Separation (faṣl) and Union (waṣl)................................................. 235
6.3   Unification (al-jamʿ)............................................................................ 239
6.4   The Folding-Up (al-ṭayy)................................................................... 241
6.5   Beauty (al-jamāl)................................................................................. 245
6.6   And Moses Fell Down in a Swoon................................................... 249
7.0 The Innermost Secret (al-sirr)................................................255
7.1   As if you see Him (kaʾannaka tarāh).............................................. 258
7.2   The Vicegerency (al-khilāfa)............................................................ 268
 Conclusion.....................................................................................275
 Works Cited....................................................................................279
 Index of Names..............................................................................285

==== END OF TABLE OF CONTENTS ====

Infer section number by the chapter float numbers, so for 7.2 it will be chapter 7 and section 2.

No null or undefined values, use empty string or placeholder number instead. 

Output JSON in your response, do not add any text outside of the JSON in your response..
          `,
        });

        // Prepare data for insertion
        const bookData = {
          bookTitle: "The Foundations of the Karkariya Order" || "",
          bookTitleShort: "The Foundations" || "",
          chapter: {
            number: chapterDetails.chapter?.number ?? 0,
            sectionTitle: chapterDetails.chapter?.sectionTitle || "",
            title: chapterDetails.chapter?.title || "",
          },
          footnotes:
            footnotes.footnotes?.map((footnote) => ({
              number: footnote.number ?? 0,
              content: footnote.content || "",
            })) || [],
          isChapterStart: chapterDetails.isChapterStart ?? false,
          isSectionStart: chapterDetails.isSectionStart ?? false,
          pageContent: pageContent.pageContent || "",
          pageNumber: pageContent.pageNumber ?? 0,
          language: "English" || "",
          publishing: {
            author: PLACEHOLDER_PUBLISHING.author || "",
            ISBN: PLACEHOLDER_PUBLISHING.ISBN || "",
            printedPageCount: PLACEHOLDER_PUBLISHING.printedPageCount ?? 0,
            publicationDate: PLACEHOLDER_PUBLISHING.publicationDate ?? 0,
            publisher: PLACEHOLDER_PUBLISHING.publisher || "",
            editors:
              PLACEHOLDER_PUBLISHING.editors?.map((editor) => editor || {}) ||
              [],
            translators:
              PLACEHOLDER_PUBLISHING.translators?.map((translator) => ({
                name: translator.name || "",
              })) || [],
            originalLanguage: PLACEHOLDER_PUBLISHING.originalLanguage || "",
          },
        };

        // Insert processed book data into Convex
        await createBook(bookData);
      } catch (error) {
        console.error("Error processing book:", error);
        // Handle error (e.g., show user feedback)
      }
    }
  };

  return processBooks;
}

function hello() {}