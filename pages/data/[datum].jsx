import Layout from "components/Layouts";
import { useState } from "react";
import Image from "next/image";
import DataCard from "components/Cards/DataCard";
import { useSelector } from "react-redux";
import { Button } from "components/ui";
import getPlaceholderImage from "util/getPlaceholderImg";

const Data = (props) => {
  const isMobile = useSelector((state) => state.ui.isMobile);
  const [otherData, setOtherData] = useState(props.otherData.slice(0, 2));
  const [moreData, setMoreData] = useState(true);

  const loadMore = () => {
    setOtherData(props.data);
    setMoreData(false);
  };
  return (
    <div className="mt-10 md:mt-16 flex flex-col items-center">
      {/* head */}
      <div className="mb-6 mx-4 max-w-xl text-3xl md:text-5xl font-bold md:text-center md:leading-normal">
        {props.pageHead}
      </div>
      {/* subhead */}
      <div className="mx-4 md:mx-0 mb-3 md:w-full max-w-xl text-skin-light text-lg leading-relaxed md:text-center">
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
          placeholder="blur"
          blurDataURL={getPlaceholderImage()}
        />
      </div>

      {/* sections */}
      <div className="mb-10 md:mb-32 content-md grid grid-flow-row gap-6">
        {props.sections.map((section, idx) => (
          <div
            key={`section-${idx}`}
            className="w-full flex flex-col items-center"
          >
            <div className="mb-2 md:mb-3 max-w-3xl font-bold text-lg md:text-2xl md:text-center">
              {section.head}
            </div>
            <div className="mb-6 md:mb-8 max-w-3xl text-sm md:text-base text-skin-light md:text-center">
              {section.subHead}
            </div>
            <div className="w-full flex justify-center flex-wrap">
              {section.graphs.map((graph, idx) => (
                <div
                  key={`graph-${idx}`}
                  className={`mb-6 w-full md:w-1/2 ${
                    !isMobile ? (idx % 2 === 0 ? "pr-3" : "pl-3") : ""
                  }`}
                >
                  <div className={`w-full`}>
                    <Image
                      src={graph.src}
                      alt=""
                      width={graph.width}
                      height={graph.height}
                      layout="responsive"
                      placeholder="blur"
                      blurDataURL={getPlaceholderImage()}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* other data */}
      <div className="w-full py-10 md:py-32 flex flex-col items-center bg-skin-light">
        <div className="mb-4 font-bold text-2xl md:text-4xl content-md md:text-center">
          {props.otherDataHead}
        </div>
        <div className="content-md flex flex-col items-center">
          <div className="mb-6 grid md:grid-cols-2 gap-6">
            {otherData.map((datum, idx) => (
              <DataCard
                key={`datum-${idx}`}
                datum={datum}
                downloadAsText={props.downloadAsText}
                interactiveText={props.interactiveText}
              />
            ))}
          </div>
          {moreData && <Button text={props.loadMoreText} onClick={loadMore} />}
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
