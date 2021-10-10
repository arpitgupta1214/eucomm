import Layout from "components/Layouts";
import { useState } from "react";
import Image from "next/image";
import DataCard from "components/DataCard";

const Data = (props) => {
  const [otherData, setOtherData] = useState(props.otherData.slice(0, 2));
  const [moreData, setMoreData] = useState(true);

  const loadMore = () => {
    setOtherData(props.data);
    setMoreData(false);
  };
  return (
    <div className="mt-16 flex flex-col items-center">
      {/* head */}
      <div className="mb-3 w-full max-w-xl font-bold text-5xl leading-normal text-center">
        {props.pageHead}
      </div>
      {/* subhead */}
      <div className="mb-3 w-full max-w-xl text-skin-light text-lg leading-relaxed text-center">
        {props.pageSubHead}
      </div>

      {/* head graph */}
      <div className="mb-20 content-md">
        <Image
          src={props.headGraph.src}
          alt=""
          width={props.headGraph.width}
          height={props.headGraph.height}
          layout="responsive"
        />
      </div>

      {/* sections */}
      <div className="mb-72 content-md grid grid-flow-row gap-6">
        {props.sections.map((section, idx) => (
          <div
            key={`section-${idx}`}
            className="w-full flex flex-col items-center"
          >
            <div className="mb-3 max-w-3xl font-bold text-2xl text-center">
              {section.head}
            </div>
            <div className="mb-8 max-w-3xl text-skin-light text-center">
              {section.subHead}
            </div>
            <div className="w-full flex justify-center flex-wrap">
              {section.graphs.map((graph, idx) => (
                <div
                  key={`graph-${idx}`}
                  className={`mb-6 w-1/2 ${idx % 2 === 0 ? "pr-3" : "pl-3"}`}
                >
                  <div className={`w-full`}>
                    <Image
                      src={graph.src}
                      alt=""
                      width={graph.width}
                      height={graph.height}
                      layout="responsive"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* other data */}
      <div className="w-full py-32 flex flex-col items-center bg-skin-light">
        <div className="mb-4 font-bold text-4xl">{props.otherDataHead}</div>
        <div className="content-md flex flex-col items-center">
          <div className="mb-6 grid grid-cols-2 gap-6">
            {otherData.map((datum, idx) => (
              <DataCard
                key={`datum-${idx}`}
                datum={datum}
                downloadAsText={props.downloadAsText}
                interactiveText={props.interactiveText}
              />
            ))}
          </div>
          {moreData && (
            <button
              className="py-3 px-6 text-skin-highlight border border-skin-highlight"
              onClick={loadMore}
            >
              {props.loadMoreText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

Data.layout = Layout;
export default Data;

export const getStaticPaths = async () => {
  const data = [];
  const context = require.context("data/data", true, /^\.\/.+\/.+\.json$/);
  context.keys().forEach((key) => {
    const resource = require(`data/data/${key.slice(2)}`);
    data.push(JSON.parse(JSON.stringify(resource)));
  });
  return {
    paths: data.map((datum) => ({
      params: { datum: datum.slug },
    })),
    fallback: false,
  };
};
export const getStaticProps = async ({ params }) => {
  const { datum: datumSlug } = params;
  const data = [];
  const context = require.context("data/data", true, /^\.\/.+\/.+\.json$/);
  context.keys().forEach((key) => {
    const resource = require(`data/data/${key.slice(2)}`);
    data.push(JSON.parse(JSON.stringify(resource)));
  });

  const staticData = data.find((datum) => datum.slug === datumSlug);
  const commonData = await import(`data/data/data.json`);
  commonData.otherData = commonData.data;
  return { props: { ...commonData, ...staticData } };
};
