import Layout from "components/Layouts";
import Newsletter from "components/Newsletter";
import { Carousel, Badge } from "components/ui";
import Image from "next/image";

const Group = (props) => {
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
        />
      </div>
      <div className="mx-4 mb-32 w-full max-w-content flex">
        <div className="w-full">
          <div className="mb-12 text-skin-light">{props.pageSubhead}</div>
          <div className="mb-5 font-bold text-2xl">{props.descriptionHead}</div>
          <div className="mb-7">
            {props.description.split("\n").map((line, idx) => (
              <div key={`description-${idx}`} className="mb-5 text-skin-light">
                {line}
              </div>
            ))}
          </div>
          <div className="mb-12 w-full p-8 bg-skin-light">
            <div className="mb-5 text-2xl font-bold">
              {props.positionPaperHead}
            </div>
            <Carousel>
              {props.positionPapers.map((positionPaper, idx) => (
                <div
                  key={`position-paper-${idx}`}
                  className="mr-5 max-w-xs p-6 pt-5 bg-skin-base rounded-xl "
                >
                  <div className="mb-3 text-xs text-skin-light">
                    {positionPaper.head}
                  </div>
                  <div className="text-lg">{positionPaper.description}</div>
                  <div className="text-skin-extra-light text-sm">
                    {positionPaper.date}
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
          <div className="w-full p-8 bg-skin-light">
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
                          />
                          <div className="mb-2 font-bold text-sm">
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
      </div>
      <div className="mb-28 w-full max-w-content">
        <Newsletter />
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
  const { group } = params;
  const staticData = await import(`data/workingGroups/${group}/data.json`);
  return { props: { ...staticData } };
};
