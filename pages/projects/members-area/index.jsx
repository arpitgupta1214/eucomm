import Layout from "components/Layouts";
import { Button } from "components/ui";
import Image from "next/image";
import router from "next/router";
import { useState } from "react";
import getPlaceholderImage from "util/getPlaceholderImg";

const MembersArea = (props) => {
  const [members, setMembers] = useState(props.members.slice(0, 14));
  const [moreMembers, setMoreMembers] = useState(true);

  const loadMore = () => {
    setMembers(props.members);
    setMoreMembers(false);
  };

  return (
    <div className="mt-10 md:mt-16 flex flex-col md:items-center">
      {/* head */}
      <div className="mb-6 content-md text-3xl md:text-5xl font-bold md:text-center">
        {props.pageHead}
      </div>

      {/* join button */}
      <div className="mb-6 md:mb-10 content-md flex md:justify-center">
        <Button
          text={props.joinText}
          onClick={() => router.push(`${router.asPath}/become-a-member`)}
          dark
        />
      </div>

      {/* members */}
      <div className="mb-10 md:mb-32 content-md flex flex-col items-center">
        <div className="mb-6 w-full flex justify-center flex-wrap">
          {members.map((member, idx) => (
            <div
              key={`member-${idx}`}
              className={`${
                idx % 2 === 0 ? "mr-2" : "ml-2"
              } md:mx-3 mb-4 md:mb-6 w-40 md:w-52 flex justify-center items-center bg-skin-light`}
            >
              <div className="mx-4 md:mx-12 py-11 w-full">
                <Image
                  src={member.image.src}
                  alt=""
                  width={member.image.width}
                  height={member.image.height}
                  layout="responsive"
                  priority={true}
                  placeholder="blur"
                  blurDataURL={getPlaceholderImage()}
                />
              </div>
            </div>
          ))}
        </div>

        {moreMembers && <Button text={props.loadMoreText} onClick={loadMore} />}
      </div>
    </div>
  );
};

MembersArea.layout = Layout;
export default MembersArea;

export const getStaticProps = async () => {
  const staticData = await import("data/membersArea/data.json");

  return { props: { ...staticData } };
};
