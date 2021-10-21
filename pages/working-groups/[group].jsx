import Layout from "components/Layouts";
import Newsletter from "components/Newsletter";
import RelatedItemsCarousel from "components/RelatedItemsCarousel";
import { ArrowButton, HeadImage, Button } from "components/ui";
import WorkingGroupCard from "components/Cards/WorkingGroupCard";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import getPlaceholderImage from "util/getPlaceholderImg";

const Group = (props) => {
  const isMobile = useSelector((state) => state.ui.isMobile);
  const [otherGroups, setOtherGroups] = useState(props.otherGroups.slice(0, 2));
  const [moreGroups, setMoreGroups] = useState(true);

  const loadOtherGroups = () => {
    setOtherGroups(props.otherGroups);
    setMoreGroups(false);
  };
  return (
    <div className="mt-7 w-full flex flex-col items-center">
      {/* head */}
      <div className="mb-6 content-md text-3xl md:text-5xl font-bold md:text-center">
        {props.pageHead}
      </div>

      {/* headimg */}
      <HeadImage src={props.headImage.src} />

      {/* content */}
      <div
        className={`mb-10 md:mb-32 ${
          !isMobile ? "content-md" : "w-full"
        } flex flex-col md:flex-row`}
      >
        <div className="md:mr-6 md:flex-shrink overflow-hidden">
          {/* subhead */}
          <div className="mb-6 md:mb-7 mx-4 md:mx-0 text-sm md:text-lg text-skin-light">
            {props.pageSubhead}
          </div>

          {/* desctipion */}
          <div className="mb-4 mx-4 md:mx-0 font-bold text-lg md:text-2xl">
            {props.descriptionHead}
          </div>
          <div className="mb-7 mx-4 md:mx-0">
            {props.description.split("\n").map((line, idx) => (
              <div
                key={`description-${idx}`}
                className="mb-4 text-skin-light text-sm md:text-lg"
              >
                {line}
              </div>
            ))}
          </div>

          {/* position papers */}
          <div className="mb-10 md:mb-12 w-full px-4 py-10 md:p-8 bg-skin-light">
            <div className="mb-4 md:mb-5 text-lg md:text-2xl font-bold">
              {props.positionPaperHead}
            </div>
            <div className="w-full grid md:grid-cols-3 gap-5">
              {props.positionPapers.map((positionPaper, idx) => (
                <div
                  key={`position-paper-${idx}`}
                  className="w-full p-5 md:p-6 md:pt-5 bg-skin-base"
                >
                  <div className="mb-1.5 md:mb-3 text-xs text-skin-light">
                    {positionPaper.head}
                  </div>
                  <div className="text-sm md:text-base font-bold mb-3">
                    {positionPaper.description}
                  </div>
                  <div className="mb-3 text-skin-light text-xs">
                    {positionPaper.date}
                  </div>
                  <div className="w-12 h-12">
                    <ArrowButton direction="forward" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* news */}
          <div className="mb-10 md:mb-0 w-full">
            <RelatedItemsCarousel
              head={props.relatedHead}
              items={props.relatedItems}
            />
          </div>
        </div>

        {/* chair members */}
        <div className="flex-grow flex flex-col">
          {props.chairGroups.map((group, idx) => (
            <div
              key={`group-${idx}`}
              className="mb-5 bg-skin-light py-4 pl-5 pr-8"
            >
              {/* head  */}
              <div className="mb-2 text-xs text-skin-light">{group.name}</div>
              {/* members */}
              {group.members.map((member, idx) => (
                <div key={`member-${idx}`} className="mb-3 w-full flex">
                  {/* image */}
                  <div className="mr-3 w-10 h-10 flex-shrink-0 rounded-full overflow-hidden relative">
                    <Image
                      src={member.image.src}
                      alt=""
                      layout="fill"
                      placeholder="blur"
                      blurDataURL={getPlaceholderImage()}
                    />
                  </div>

                  <div className="flex-grow flex flex-col">
                    <div className="whitespace-nowrap font-bold text-sm">
                      {member.name}
                    </div>
                    <div className="whitespace-nowrap text-skin-light text-xs">
                      {member.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={`mb-10 md:mb-28 ${isMobile ? "w-full" : "content-sm"} `}>
        <Newsletter />
      </div>

      {/* other groups */}
      <div className="w-full bg-skin-light py-10 px-4 md:py-32 flex flex-col items-center">
        <div className="mb-4 md:mb-10 font-bold text-2xl md:text-4xl self-start md:self-center">
          {props.otherGroupsHead}
        </div>
        <div className={`mb-6 ${isMobile ? "w-full" : "content-md"}`}>
          <div className="w-full grid md:grid-cols-2 gap-6">
            {otherGroups.map((group, idx) => (
              <WorkingGroupCard key={`group-${idx}`} workingGroup={group} />
            ))}
          </div>
        </div>
        {moreGroups && (
          <Button text={props.otherGroupsMoreText} onClick={loadOtherGroups} />
        )}
      </div>
    </div>
  );
};

Group.layout = Layout;
export default Group;

export const getStaticPaths = async () => {
  const workingGroups = [];
  const context = require.context(
    "data/workingGroups",
    true,
    /^\.\/.+\/.+\.json$/
  );
  context.keys().forEach((key) => {
    const resource = require(`data/workingGroups/${key.slice(2)}`);
    workingGroups.push(JSON.parse(JSON.stringify(resource)));
  });
  return {
    paths: workingGroups.map((workingGroup) => ({
      params: { group: workingGroup.slug },
    })),
    fallback: false,
  };
};
export const getStaticProps = async ({ params }) => {
  const { group: groupSlug } = params;
  const groups = [];
  const context = require.context(
    "data/workingGroups",
    true,
    /^\.\/.+\/.+\.json$/
  );
  context.keys().forEach((key) => {
    const resource = require(`data/workingGroups/${key.slice(2)}`);
    groups.push(JSON.parse(JSON.stringify(resource)));
  });

  const staticData = groups.find((group) => group.slug === groupSlug);
  const commonData = await import(`data/workingGroups/data.json`);
  commonData.otherGroups = commonData.groups.filter(
    (group) => group.slug !== groupSlug
  );
  return { props: { ...commonData, ...staticData } };
};
