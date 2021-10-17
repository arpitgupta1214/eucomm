import { ArrowButton } from "components/ui";
import Image from "next/image";
import router from "next/router";

const WorkingGroupCard = ({ workingGroup, light }) => (
  <div
    className={`${
      light ? "bg-skin-light" : "bg-skin-base"
    } p-3 md:p-6 flex md:items-center`}
  >
    <div className="w-20 md:w-40 h-20 md:h-40 flex-shrink-0 mr-5 relative">
      <Image
        src={workingGroup.image.src}
        alt=""
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
    </div>
    <div className="flex-grow">
      <div className="mb-1.5 md:mb-2 text-sm md:text-xl font-bold">
        {workingGroup.name}
      </div>
      <div className="mb-1.5 md:mb-2 text-xs md:text-sm text-skin-light">
        {workingGroup.description}
      </div>
      <div className="w-9 md:w-12 h-9 md:h-12">
        <ArrowButton
          direction="forward"
          onClick={() => router.push(`${router.asPath}/${workingGroup.slug}`)}
        />
      </div>
    </div>
  </div>
);

export default WorkingGroupCard;
