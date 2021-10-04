import Layout from "components/Layouts";
import Newsletter from "components/Newsletter";
import { Carousel, Badge, ArrowButton } from "components/ui";
import Image from "next/image";
import router from "next/router";
import { useState } from "react";

const Group = (props) => {
  const [otherGroups, setOtherGroups] = useState(props.otherGroups.slice(0, 2));
  const [moreGroups, setMoreGroups] = useState(true);

  const loadOtherGroups = () => {
    setOtherGroups(props.otherGroups);
    setMoreGroups(false);
  };
  return (
    <div className="mt-7 w-full flex flex-col items-center">
      <div className="font-bold text-5xl mb-6">{props.pageHead}</div>
      <div className="w-full mb-7">
        <Image
          src={props.headImg}
          alt=""
          width={5760}
          height={1120}
          layout="responsive"
          priority={true}
        />
      </div>
      <div className="mx-4 mb-32 content-md flex">
        <div className="mr-6 flex-shrink overflow-hidden">
          <div className="mb-7 text-lg text-skin-light">
            {props.pageSubhead}
          </div>
          <div className="mb-4 font-bold text-2xl">{props.descriptionHead}</div>
          <div className="mb-7">
            {props.description.split("\n").map((line, idx) => (
              <div
                key={`description-${idx}`}
                className="mb-4 text-skin-light text-lg"
              >
                {line}
              </div>
            ))}
          </div>
          <div className="mb-12 w-full p-8 bg-skin-light">
            <div className="mb-5 text-2xl font-bold">
              {props.positionPaperHead}
            </div>
            <div className="w-full grid grid-cols-3 gap-5">
              {props.positionPapers.map((positionPaper, idx) => (
                <div
                  key={`position-paper-${idx}`}
                  className="w-full p-6 pt-5 bg-skin-base"
                >
                  <div className="mb-3 text-xs text-skin-light">
                    {positionPaper.head}
                  </div>
                  <div className="font-bold mb-3">
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
          <div className="w-full p-8 bg-skin-light overflow-hidden">
            <div className="mb-5 text-2xl font-bold">{props.newsHead}</div>
            <Carousel>
              {props.newsItems
                .reduce(
                  (acc, newsItem) => {
                    const last = acc[acc.length - 1];
                    if (last.length < 2) {
                      last.push(newsItem);
                    } else {
                      acc.push([newsItem]);
                    }
                    return acc;
                  },
                  [[]]
                )
                .map((newsItemGroup, idx) => (
                  <div key={`news-group-${idx}`} className="flex flex-col">
                    {newsItemGroup.map((newsItem, idx) => (
                      <div
                        key={`position-paper-${idx}`}
                        className="mr-5 mb-5 max-w-xs flex"
                      >
                        <div className="w-24 h-24 flex-shrink-0 mr-4 relative">
                          <Image
                            src={newsItem.image}
                            alt=""
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                        <div className="flex-grow flex-col">
                          <Badge
                            type={newsItem.category.id}
                            name={newsItem.category.name}
                            small
                          />
                          <div className="mb-2 font-bold text-sm max-line-2">
                            {newsItem.head}
                          </div>
                          <div className="text-skin-light text-xs mb-2">
                            {newsItem.date}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
            </Carousel>
          </div>
        </div>

        {/* chair members */}
        <div className="flex-grow flex flex-col">
          {props.chairGroups.map((group, idx) => (
            <div key={`group-${idx}`} className="mb-5 bg-skin-light py-4 px-5">
              {/* head  */}
              <div className="mb-2 text-xs text-skin-light">{group.name}</div>
              {/* members */}
              {group.members.map((member, idx) => (
                <div key={`member-${idx}`} className="mb-3 w-full flex">
                  {/* image */}
                  <div className="mr-3 w-10 h-10 flex-shrink-0 rounded-full overflow-hidden relative">
                    <Image src={member.image.src} alt="" layout="fill" />
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
      <div className="mb-28 content-sm">
        <Newsletter />
      </div>
      <div className="w-full bg-skin-light py-32 flex flex-col items-center">
        <div className="mb-10 font-bold text-4xl">{props.otherGroupsHead}</div>
        <div className="mb-6 content-md">
          <div className="w-full grid grid-cols-2 gap-6">
            {otherGroups.map((group, idx) => (
              <div
                key={`group-${idx}`}
                className="bg-skin-base p-6 flex items-center"
              >
                <div className="w-40 h-40 flex-shrink-0 mr-5 relative">
                  <Image src={group.image.src} alt="" layout="fill" />
                </div>
                <div className="flex-grow">
                  <div className="text-xl font-bold mb-2">{group.name}</div>
                  <div className="text-sm text-skin-light mb-2">
                    {group.description}
                  </div>
                  <div className="w-12 h-12">
                    <ArrowButton
                      direction="forward"
                      onClick={() =>
                        router.push(`${router.asPath}/${group.slug}`)
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {moreGroups && (
          <button
            className="py-3 px-6 text-skin-highlight border border-skin-highlight"
            onClick={loadOtherGroups}
          >
            {props.otherGroupsMoreText}
          </button>
        )}
      </div>
    </div>
  );
};

Group.layout = Layout;
export default Group;

export const getStaticPaths = async () => {
  const config = await import("data/config.json").then((data) => data.default);
  const workingGroups = config.pages
    .find((page) => page.slug === "working-groups")
    .subpages.map((subpage) => subpage.slug);
  return {
    paths: workingGroups.map((group) => ({
      params: { group },
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
