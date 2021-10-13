import CustomIcon from "components/CustomIcon/CustomIcon";
import Layout from "components/Layouts";
import Newsletter from "components/Newsletter";
import { Button, HeadImage } from "components/ui";
import Image from "next/image";
import router from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";

const Project = (props) => {
  const isMobile = useSelector((state) => state.ui.isMobile);
  const [otherProjects, setOtherProjects] = useState(
    props.otherProjects.slice(0, 3)
  );
  const [moreProjects, setMoreProjects] = useState(true);

  const loadOtherProjects = () => {
    setOtherProjects(props.otherProjects);
    setMoreProjects(false);
  };
  return (
    <div className="mt-10 md:mt-16 w-full flex flex-col items-center">
      {/* head  */}
      <div className="mb-6 content-md text-3xl md:text-5xl font-bold md:text-center">
        {props.pageHead}
      </div>

      {/* headimg  */}
      <HeadImage src={props.headImage.src} />

      <div className="mb-10 md:mb-32 content-md flex flex-col md:flex-row">
        <div className="md:mr-6 flex-shrink overflow-hidden text-skin-light text-sm md:text-lg text-justify">
          {/* subhead */}
          <div className="mb-6 md:mb-7">{props.pageSubhead}</div>

          {/* description head */}
          <div className="mb-4 font-bold text-skin-base text-lg md:text-2xl">
            {props.descriptionHead}
          </div>

          {/* description */}
          <div className="mb-4">
            {props.description.split("\n").map((line, idx) => (
              <div key={`description-${idx}`} className="mb-4">
                {line}
              </div>
            ))}
          </div>

          {/* description bullets */}
          <div className="mb-7 grid grid-flow-row gap-4">
            {props.descriptionBullets.map((bullet, idx) => (
              <div key={`description-${idx}`} className="flex items-start">
                <CustomIcon name="BsCircleFill" className="text-xs mt-1 mr-2" />
                <div>{bullet}</div>
              </div>
            ))}
          </div>

          {/* description foot */}
          <div className="mb-10 md:mb-0 w-full bg-skin-light py-4 px-6 text-left">
            {props.descriptionFoot}
          </div>
          {}
        </div>

        {/* related links */}
        <div className="w-full md:w-64 flex-shrink-0 self-start flex flex-col bg-skin-light py-4 px-5">
          <div className="mb-2 text-xs text-skin-light">
            {props.relatedLinksHead}
          </div>
          <div className="grid grid-flow-row gap-3 list-disc">
            {props.relatedLinks.map((relatedLink, idx) => (
              <div key={`relatedLink-${idx}`} className="flex items-center">
                <CustomIcon name="BsDot" />
                <div className="mr-1 text-xs">{relatedLink.name}</div>
                <CustomIcon
                  name="BsArrowRight"
                  className="text-skin-highlight"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`mb-10 md:mb-28 ${isMobile ? "w-full" : "content-sm"}`}>
        <Newsletter />
      </div>

      {/* other projects  */}
      <div className="w-full bg-skin-light py-10 md:py-32 flex flex-col items-center">
        <div className="mb-4 md:mb-10 font-bold text-2xl md:text-4xl content-md md:text-center">
          {props.otherProjectsHead}
        </div>
        <div className="mb-6 content-md">
          <div className="w-full grid md:grid-cols-3 gap-6">
            {otherProjects.map((project, idx) => (
              <div key={`project-${idx}`} className="w-full bg-skin-base">
                <Image
                  src={project.image.src}
                  alt=""
                  width={project.image.width}
                  height={project.image.height}
                  layout="responsive"
                />

                <div className="px-6 py-4 flex flex-col">
                  <div className="text-lg md:text-xl font-bold mb-2">
                    {project.name}
                  </div>
                  <button
                    className="flex items-center text-skin-highlight text-sm"
                    onClick={() =>
                      router.push(
                        `${router.asPath.split("/").slice(0, -1).join("/")}/${
                          project.slug
                        }`
                      )
                    }
                  >
                    <span className="mr-2">View More</span>
                    <CustomIcon name="BsArrowRight" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {moreProjects && (
          <Button
            text={props.otherProjectsMoreText}
            onClick={loadOtherProjects}
          />
        )}
      </div>
    </div>
  );
};

Project.layout = Layout;
export default Project;

export const getStaticPaths = async () => {
  const projects = [];
  const context = require.context("data/projects", true, /^\.\/.+\/.+\.json$/);
  context.keys().forEach((key) => {
    const resource = require(`data/projects/${key.slice(2)}`);
    projects.push(JSON.parse(JSON.stringify(resource)));
  });
  return {
    paths: projects.map((project) => ({
      params: { project: project.slug },
    })),
    fallback: false,
  };
};
export const getStaticProps = async ({ params }) => {
  const { project: projectSlug } = params;
  const projects = [];
  const context = require.context("data/projects", true, /^\.\/.+\/.+\.json$/);
  context.keys().forEach((key) => {
    const resource = require(`data/projects/${key.slice(2)}`);
    projects.push(JSON.parse(JSON.stringify(resource)));
  });

  const staticData = projects.find((project) => project.slug === projectSlug);
  const commonData = await import(`data/projects/data.json`);
  commonData.otherProjects = commonData.projects;
  // .filter(
  //   (project) => project.slug !== projectSlug
  // );
  return { props: { ...commonData, ...staticData } };
};
