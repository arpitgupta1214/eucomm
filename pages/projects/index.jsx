import Layout from "components/Layouts";
import router from "next/router";
import Image from "next/image";
import CustomIcon from "components/CustomIcon/CustomIcon";
const Projects = (props) => {
  return (
    <div className="w-full mt-16 flex flex-col items-center">
      {/* head */}
      <div className="mb-3 text-5xl font-bold">{props.pageHead}</div>

      {/* projects */}
      <div className="mb-32 content-md grid grid-cols-3 gap-6">
        {props.projects.map((project, idx) => (
          <div key={`project-${idx}`} className="bg-skin-light flex flex-col">
            <div className="w-full">
              <Image
                src={project.image.src}
                alt=""
                width={project.image.width}
                height={project.image.height}
                layout="responsive"
                priority={true}
              />
            </div>
            <div className="py-5 px-6">
              <div className="text-xl font-bold mb-2">{project.name}</div>
              <button
                className="flex items-center text-skin-highlight text-sm"
                onClick={() => router.push(`${router.asPath}/${project.slug}`)}
              >
                <span className="mr-2">View More</span>
                <CustomIcon name="BsArrowRight" />
              </button>
            </div>
          </div>
        ))}
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
