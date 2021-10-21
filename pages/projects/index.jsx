import Layout from "components/Layouts";
import router from "next/router";
import Image from "next/image";
import CustomIcon from "components/CustomIcon/CustomIcon";
import { useState } from "react";
import { Button } from "components/ui";
import getPlaceholderImage from "util/getPlaceholderImg";
const Projects = (props) => {
  const [projects, setProjects] = useState(props.projects.slice(0, 6));
  const [moreProjects, setMoreProjects] = useState(true);

  const loadMore = () => {
    setProjects(props.projects);
    setMoreProjects(false);
  };
  return (
    <div className="w-full mt-10 md:mt-16 flex flex-col items-center">
      {/* head */}
      <div className="mb-3 content-md text-3xl md:text-5xl font-bold md:text-center">
        {props.pageHead}
      </div>

      {/* projects */}
      <div className="mb-10 md:mb-32 content-md flex flex-col items-center">
        <div className="mb-6 w-full grid md:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <div key={`project-${idx}`} className="bg-skin-light flex flex-col">
              <div className="w-full">
                <Image
                  src={project.image.src}
                  alt=""
                  width={project.image.width}
                  height={project.image.height}
                  layout="responsive"
                  priority={true}
                  placeholder="blur"
                  blurDataURL={getPlaceholderImage()}
                />
              </div>
              <div className="md:py-5 p-6">
                <div className="text-lg md:text-xl font-bold mb-2">
                  {project.name}
                </div>
                <button
                  className="flex items-center text-skin-highlight text-sm"
                  onClick={() =>
                    router.push(`${router.asPath}/${project.slug}`)
                  }
                >
                  <span className="mr-2">View More</span>
                  <CustomIcon name="BsArrowRight" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* load more */}
        {moreProjects && (
          <Button text={props.loadMoreText} onClick={loadMore} />
        )}
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const staticData = await import("data/projects/data.json").then(
    (data) => data.default
  );

  return {
    props: {
      ...staticData,
    },
  };
};

Projects.layout = Layout;
export default Projects;
