// Imports that may be useful for loading pages and subsequent actions
// import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
// import { useLoaderData } from "@remix-run/react";
// import { json } from "@remix-run/react";

// Define type for the props of Reader
// type ReaderProps = {
//   pages: any;
//   setPages: any;
// };
import { signOut } from "convex/auth";
import { Button } from "@/components/ui/button";
import { FunctionComponent } from "react";

export default function Reader() {
  return (
    <>
      <div className="w-full relative bg-khaki-100 overflow-hidden flex flex-row items-start h-screen justify-start leading-[normal] tracking-[normal]">
        <section className="flex-1 flex flex-row flex-wrap items-start justify-start max-w-full [row-gap:20px] text-left text-lg text-black font-itc-franklin-gothic-std">
          <div className="flex-1 bg-khaki-100 box-border flex flex-col items-end justify-start pt-0 px-0 pb-[15px] gap-[116px] min-w-[390px] max-w-full border-r-[3px] border-dashed border-gray-100 mq450:gap-[29px] mq450:min-w-full mq600:gap-[58px]">
            <div className="self-stretch h-[800px] relative bg-khaki-100 box-border hidden border-r-[3px] border-dashed border-gray-100" />
            <div className="self-stretch flex flex-col items-start justify-start gap-[36px] max-w-full mq600:gap-[18px]">
              <div className="self-stretch bg-khaki-300 box-border flex flex-row items-start justify-start pt-[15px] px-[25px] pb-[7px] max-w-full z-[1] border-b-[1px] border-dashed border-wheat">
                <div className="h-[60px] w-[600px] relative bg-khaki-300 box-border hidden max-w-full border-b-[1px] border-dashed border-wheat" />
                <a className="[text-decoration:none] w-[422px] relative leading-[35px] font-medium text-[inherit] inline-block shrink-0 max-w-full z-[2]">
                  The Foundations of the Karkariya Order
                </a>
              </div>
              <div className="self-stretch flex flex-row items-start justify-start py-0 px-[73px] box-border max-w-full text-xl font-eb-garamond mq600:pl-9 mq600:pr-9 mq600:box-border">
                <div className="h-[533px] flex-1 relative max-w-full">
                  <div className="absolute top-[0px] left-[0px] leading-[35px] inline-block w-full h-full z-[1] mq450:text-base mq450:leading-[28px]">
                    <p className="m-0">
                      He is the sun of knowledge, the meeting of the two seas,
                      the ocean of gnosis, the inmost heart of the spirit, the
                      red sulphur, the inheritor of the secret of the essence,
                      and the guide upon the Path of unveiling. He is the
                      spiritual trainer, Shaykh Abū ʿAbd Allāh, Sīdī Mohamed
                      Faouzi b. Ṭayyib al-Karkarī – may God sanctify his secret
                      – of noble Prophetic descent, through Idrīsī and Ḥasanī
                      lineage.
                    </p>
                    <p className="m-0">&nbsp;</p>
                    <p className="m-0">
                      He is the sun of knowledge, the meeting of the two seas,
                      the ocean of gnosis, the inmost heart of the spirit, the
                      red sulphur, the inheritor of the secret of the essence,
                      and the guide upon the Path of unveiling. He is the
                      spiritual trainer, Shaykh Abū ʿAbd Allāh, Sīdī Mohamed
                      Faouzi b. Ṭayyib al-Karkarī – may God sanctify his secret
                      – of noble Prophetic descent, through Idrīsī and Ḥasanī
                      lineage.
                      <span class="inline align-super text-xs border rounded-[5px] border-dashed bg-gold border-green-500 px-1 text-sm font-dinpro font-bold">
                        143
                      </span>
                    </p>
                    <p className="m-0">&nbsp;</p>
                  </div>
                  <div className="absolute top-[35px] left-[409px] w-[39px] h-[31px] text-sm font-dinpro">
                    <div className="absolute top-[6px] left-[0px] rounded-[5px] bg-gold box-border w-[39px] h-[27px] z-[2] border-[1px] border-dashed border-black" />
                    <a className="[text-decoration:none] absolute top-[0px] left-[6px] leading-[30px] font-bold text-[inherit] inline-block w-[33px] h-[30px] z-[3]">
                      143
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch flex flex-row items-start justify-end py-0 pr-[29px] pl-9 box-border max-w-full">
              <div className="flex-1 flex flex-row items-start justify-start max-w-full [row-gap:20px] mq600:flex-wrap">
                <div className="flex-1 flex flex-col items-start justify-start pt-2 px-0 pb-0 box-border min-w-[235px] max-w-full text-base">
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
                  <b className="h-[39px] w-[26px] relative leading-[35px] inline-block shrink-0 z-[1]">{`<`}</b>
                  <div className="flex-1 flex flex-col items-start justify-start pt-[3px] px-0 pb-0 text-sm text-gray-200">
                    <b className="self-stretch relative leading-[35px] z-[2]">
                      PREVIOUS PAGE
                    </b>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-start pt-1.5 px-0 pb-0 ml-[-13px]">
                  <div className="relative leading-[35px] font-medium inline-block min-w-[25px] z-[1]">
                    43
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
                  <span className="font-medium">The Pact (al-Ahd)</span>
                </div>
                <a className="[text-decoration:none] relative leading-[28px] font-medium text-[inherit] z-[1]">
                  The Pact (al-Ahd)
                </a>
              </div>
              <div className="self-stretch flex flex-row items-start justify-start py-0 pr-[73px] pl-[70px] box-border max-w-full shrink-0 text-xl font-eb-garamond mq600:pl-[35px] mq600:pr-9 mq600:box-border">
                <div className="h-[533px] flex-1 relative leading-[35px] inline-block max-w-full z-[1] mq450:text-base mq450:leading-[28px]">
                  <p className="m-0">
                    He is the sun of knowledge, the meeting of the two seas, the
                    ocean of gnosis, the inmost heart of the spirit, the red
                    sulphur, the inheritor of the secret of the essence, and the
                    guide upon the Path of unveiling. He is the spiritual
                    trainer, Shaykh Abū ʿAbd Allāh, Sīdī Mohamed Faouzi b.
                    Ṭayyib al-Karkarī – may God sanctify his secret – of noble
                    Prophetic descent, through Idrīsī and Ḥasanī lineage.
                  </p>
                  <p className="m-0">&nbsp;</p>
                  <p className="m-0">
                    He is the sun of knowledge, the meeting of the two seas, the
                    ocean of gnosis, the inmost heart of the spirit, the red
                    sulphur, the inheritor of the secret of the essence, and the
                    guide upon the Path of unveiling. He is the spiritual
                    trainer, Shaykh Abū ʿAbd Allāh, Sīdī Mohamed Faouzi b.
                    Ṭayyib al-Karkarī – may God sanctify his secret – of noble
                    Prophetic descent, through Idrīsī and Ḥasanī lineage.
                  </p>
                  <p className="m-0">&nbsp;</p>
                </div>
              </div>
            </div>
            <div className="w-[199px] flex flex-row items-start justify-end py-0 px-[25px] box-border text-sm text-gray-200 font-din">
              <div className="flex-1 flex flex-row items-start justify-start py-0 pr-[3px] pl-0">
                <div className="flex-1 flex flex-row items-start justify-start shrink-0">
                  <div className="w-[149px] flex flex-col items-start justify-start pt-0.5 px-0 pb-0 box-border">
                    <b className="self-stretch relative leading-[35px] z-[2]">
                      NEXT PAGE
                    </b>
                  </div>
                  <b className="relative text-lg leading-[35px] inline-block text-black min-w-[16.7px] z-[1] ml-[-68px]">{`>`}</b>
                </div>
                <div className="flex flex-col items-start justify-start pt-[3px] px-0 pb-0 ml-[-23px] text-lg text-black font-itc-franklin-gothic-std">
                  <div className="relative leading-[35px] font-medium inline-block min-w-[19.9px] shrink-0 z-[1]">
                    44
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="h-[77px] w-[82px] relative bg-khaki-200 hidden" />
        <div className="h-[77px] w-[82px] relative bg-khaki-200 hidden" />
      </div>
    </>
  );
}
