// Imports that may be useful for loading pages and subsequent actions
// import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
// import { useLoaderData } from "@remix-run/react";
// import { json } from "@remix-run/react";

// Define type for the props of Reader
// type ReaderProps = {
//   pages: any;
//   setPages: any;
// };

import { SignOut } from "~/components/auth/SignOut";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState, useEffect, useCallback, useRef } from "react";
import { SignOut } from "~/components/auth/SignOut";
import { Authenticated, Unauthenticated } from "convex/react";
import { usePaginatedQuery } from "convex/react";
import { paginationOptsValidator } from "convex/server";
import { auth } from "convex/auth";
import { useNavigate } from "@remix-run/react";
import React from "react";
import { Login } from "~/components/LoginPage";

const formatPageContent = (content: string) => {
  return content.split("[p]").map((paragraph, index) => (
    <React.Fragment key={index}>
      {index > 0 && <br />}
      <p style={{ textIndent: "2em", marginBottom: "1em" }}>
        {paragraph.trim()}
      </p>
    </React.Fragment>
  ));
};

export default function Reader() {
  const [currentPage, setCurrentPage] = useState(24);
  const [currentBook, setCurrentBook] = useState("The Foundations");
  const [leftPage, setLeftPage] = useState({});
  const [rightPage, setRightPage] = useState({});
  const leftPageRef = useRef(null);
  const rightPageRef = useRef(null);

  const currentReader = useQuery(api.readers.getReaderByUserId);
  const updateReaderBookmark = useMutation(api.readers.updateReaderBookmark);

  console.log("current reader", currentReader);

  const { results, status, loadMore } = usePaginatedQuery(
    api.books.getBookPages,
    {
      currentPage: currentPage,
      currentBook: currentBook,
    },
    { initialNumItems: 2 }
  );

  console.log("Pagination results", results);
  console.log("Pagination status", status);
  console.log("Pagination loadMore", loadMore);

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentReader) return;

    if (!currentReader.isPaid) {
      navigate("/sample");
    } else {
      const readerBookmarkArr = currentReader.lastBookPage.find(
        (book) => book.bookTitle === currentBook
      );
      if (readerBookmarkArr) {
        const bookmarkedPage = readerBookmarkArr.pageNumber;
        setCurrentPage(bookmarkedPage);
      }
    }
  }, [currentReader, currentBook, navigate]);

  useEffect(() => {
    if (results && results.length >= 2) {
      setLeftPage(results[0]);
      setRightPage(results[1]);
    }
  }, [results]);

  const handleNextPage = useCallback(() => {
    const newPage = currentPage + 2;
    setCurrentPage(newPage);
    loadMore();
    if (currentReader) {
      updateReaderBookmark({
        pageNumber: newPage,
        readerId: currentReader._id,
        bookTitle: currentBook,
      });
    }
  }, [currentPage, loadMore, currentReader, updateReaderBookmark, currentBook]);

  const handlePreviousPage = useCallback(() => {
    const newPage = Math.max(currentPage - 2, 1);
    setCurrentPage(newPage);
    loadMore();
    if (currentReader) {
      updateReaderBookmark({
        pageNumber: newPage,
        readerId: currentReader._id,
        bookTitle: currentBook,
      });
    }
  }, [currentPage, loadMore, currentReader, updateReaderBookmark, currentBook]);

  const adjustFontSize = useCallback((element) => {
    if (!element) return;

    const maxHeight = element.clientHeight;
    let fontSize = 16; // starting font size
    element.style.fontSize = fontSize + "px";

    while (element.scrollHeight > maxHeight && fontSize > 8) {
      fontSize--;
      element.style.fontSize = fontSize + "px";
    }
  }, []);

  useEffect(() => {
    adjustFontSize(leftPageRef.current);
    adjustFontSize(rightPageRef.current);
  }, [leftPage, rightPage, adjustFontSize]);

  if (!currentReader) {
    return <div>Loading...</div>;
  }

  if (!currentReader.isPaid) {
    return null;
  }

  return (
    <>
      <Unauthenticated>
        <Login />
      </Unauthenticated>
      <Authenticated>
        <div className="w-full relative bg-khaki-100 overflow-hidden flex flex-row items-start justify-start leading-[normal] tracking-[normal]">
          <section className="flex-1 flex flex-row flex-wrap items-start justify-start max-w-full h-screen [row-gap:20px] text-left text-lg text-black font-itc-franklin-gothic-std">
            <div className="flex-1 bg-khaki-100 box-border flex flex-col items-end justify-start pt-0 px-0 pb-[15px] gap-[116px] min-w-[390px] max-w-full border-r-[3px] border-dashed border-gray-100 mq450:gap-[29px] mq450:min-w-full mq600:gap-[58px]">
              <div className="self-stretch h-[800px] relative bg-khaki-100 box-border hidden border-r-[3px] border-dashed border-gray-100" />
              <div className="self-stretch flex flex-col items-start justify-start gap-[36px] max-w-full mq600:gap-[18px]">
                <div className="self-stretch bg-khaki-300 box-border flex flex-row items-start justify-start pt-[15px] px-[25px] pb-[7px] max-w-full z-[1] border-b-[1px] border-dashed border-wheat">
                  <div className="h-[60px] w-[600px] relative bg-khaki-300 box-border hidden max-w-full border-b-[1px] border-dashed border-wheat" />
                  <SignOut />
                  <a className="[text-decoration:none] w-[422px] relative leading-[35px] font-medium text-[inherit] inline-block shrink-0 max-w-full z-[2] font-itc-franklin-gothic-std">
                    The Foundations of the Karkariya Order
                  </a>
                </div>
                <div className="self-stretch flex flex-row items-start justify-start py-0 px-[73px] box-border max-w-full text-xl font-eb-garamond mq600:pl-9 mq600:pr-9 mq600:box-border">
                  <div className="h-[533px] flex-1 relative max-w-full overflow-hidden">
                    <div
                      ref={leftPageRef}
                      className="absolute top-[0px] left-[0px] leading-[1.5] inline-block w-full h-full z-[1] font-serif"
                    >
                      {leftPage && leftPage.pageContent ? (
                        formatPageContent(leftPage.pageContent)
                      ) : (
                        <p>This Page is Intentionally Left Blank</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch flex flex-row items-start  justify-end py-0 pr-[29px] pl-9 box-border max-w-full">
                <div className="flex-1 flex flex-row items-start justify-start max-w-full [row-gap:20px] mq600:flex-wrap">
                  <div className="flex-1 flex flex-col items-start  h-screen justify-start pt-2 px-0 pb-0 box-border min-w-[235px] max-w-full text-base">
                    <div className="flex flex-row items-start justify-start">
                      <div className="relative leading-[28px] font-medium inline-block min-w-[74px] z-[1]">
                        Footnotes
                      </div>
                      <div className="h-[29px] w-7 relative text-sm">
                        <div className="absolute top-[1px] left-[0px] rounded-[50%] bg-gold box-border w-full h-full z-[2] border-[0px] border-dashed border-silver" />
                        <div className="absolute top-[0px] left-[9px] leading-[35px] font-medium inline-block w-3 h-[17px] min-w-[12px] z-[3]">
                          4
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-[175px] flex flex-row items-start justify-start ml-[-13px] font-din">
                    <b
                      className="h-[39px] w-[26px] relative leading-[35px] inline-block shrink-0 z-[1] cursor-pointer"
                      onClick={handlePreviousPage}
                    >{`<`}</b>
                    <div className="flex-1 flex flex-col items-start justify-start pt-[3px] px-0 pb-0 text-sm text-gray-200">
                      <b
                        className="self-stretch relative leading-[35px] z-[2] cursor-pointer"
                        onClick={handlePreviousPage}
                      >
                        PREVIOUS PAGE
                      </b>
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start pt-1.5 px-0 pb-0 ml-[-13px]">
                    <div className="relative leading-[35px] font-medium inline-block min-w-[25px] z-[1] font-serif">
                      {leftPage && leftPage.pageNumber
                        ? leftPage.pageNumber
                        : ""}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 bg-khaki-100 flex flex-col items-end justify-start pt-0 pb-[15px] pr-0 pl-[3px] box-border gap-[119px] min-w-[390px] max-w-full mq450:gap-[30px] mq450:min-w-full mq600:gap-[59px]">
              <div className="self-stretch h-[800px] relative bg-khaki-100 hidden" />
              <div className="self-stretch flex flex-col items-start justify-start gap-[36px] max-w-full mq600:gap-[18px]">
                <div className="self-stretch bg-khaki-300 box-border flex flex-row items-start justify-between pt-[15px] pb-4 pr-[25px] pl-[31px] max-w-full gap-[20px] z-[1] border-b-[1px] border-dashed border-wheat mq450:flex-wrap">
                  <div className="h-[60px] w-[597px] relative bg-khaki-300 box-border hidden max-w-full border-b-[1px] border-dashed border-wheat" />
                  <div className="w-[230.2px] relative leading-[28px] inline-block shrink-0 z-[1]">
                    <span>{`CHAPTER: `}</span>
                    <span className="font-medium">
                      {rightPage.chapter?.title || "N/A"}
                    </span>
                  </div>
                  <a className="[text-decoration:none] relative leading-[28px] font-medium text-[inherit] z-[1]">
                    {rightPage.chapter?.sectionTitle || "N/A"}
                  </a>
                </div>
                <div className="self-stretch flex flex-row items-start justify-start py-0 pr-[73px] pl-[70px] box-border max-w-full shrink-0 text-xl font-eb-garamond mq600:pl-[35px] mq600:pr-9 mq600:box-border">
                  <div
                    ref={rightPageRef}
                    className="h-[533px] flex-1 relative leading-[1.5] font-eb-garamond inline-block max-w-full z-[1] overflow-hidden"
                  >
                    {rightPage && rightPage.pageContent ? (
                      formatPageContent(rightPage.pageContent)
                    ) : (
                      <p>This Page is Intentionally Left Blank</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-[199px] flex flex-row items-start justify-end py-0 px-[25px] box-border text-sm text-gray-200 font-din">
                <div className="flex-1 flex flex-row items-start justify-start py-0 pr-[3px] pl-0">
                  <div className="flex-1 flex flex-row items-start justify-start shrink-0">
                    <div className="w-[149px] flex flex-col items-start justify-start pt-0.5 px-0 pb-0 box-border">
                      <b
                        className="self-stretch relative leading-[35px] z-[2] cursor-pointer"
                        onClick={handleNextPage}
                      >
                        NEXT PAGE
                      </b>
                    </div>
                    <b className="relative text-lg leading-[35px] inline-block text-black min-w-[16.7px] z-[1] ml-[-68px]">{`>`}</b>
                  </div>
                  <div className="flex flex-col items-start justify-start pt-[3px] px-0 pb-0 ml-[-23px] text-lg text-black font-itc-franklin-gothic-std">
                    <div className="relative leading-[35px] font-medium inline-block min-w-[19.9px] shrink-0 z-[1]">
                      {rightPage && rightPage.pageNumber
                        ? rightPage.pageNumber
                        : ""}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="h-[77px] w-[82px] relative bg-khaki-200 hidden" />
          <div className="h-[77px] w-[82px] relative bg-khaki-200 hidden" />
        </div>
      </Authenticated>
    </>
  );
}
