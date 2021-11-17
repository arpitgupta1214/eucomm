import CustomIcon from "components/CustomIcon";
import Image from "next/image";
import router from "next/router";
import getPlaceholderImage from "util/getPlaceholderImg";

const ProjectCard = ({ project, light }) => (
  <div className="bg-skin-light flex flex-col">
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
    <div className={`md:py-5 p-6 ${light ? "bg-skin-light" : "bg-skin-base"}`}>
      <div className="text-lg md:text-xl font-bold mb-2">{project.name}</div>
      <button
        className="flex items-center text-skin-highlight text-sm"
        onClick={() => router.push(`${router.asPath}/${project.slug}`)}
      >
        <span className="mr-2">View More</span>
        <CustomIcon name="BsArrowRight" />
      </button>
    </div>
  </div>
);

export default ProjectCard;
