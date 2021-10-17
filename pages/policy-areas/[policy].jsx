import Layout from "components/Layouts";
import Newsletter from "components/Newsletter";
import PolicyCard from "components/Cards/PolicyCard";
import RelatedItemsCarousel from "components/RelatedItemsCarousel";
import { HeadImage, Button } from "components/ui";
import { useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";

const Policy = (props) => {
  const isMobile = useSelector((state) => state.ui.isMobile);
  const [otherPolicies, setOtherPolicies] = useState(
    props.otherPolicies.slice(0, 3)
  );
  const [morePolicies, setMorePolicies] = useState(true);

  const loadMore = () => {
    setOtherPolicies(props.otherPolicies);
    setMorePolicies(false);
  };
  return (
    <div className="mt-7 w-full flex flex-col items-center">
      {/* head */}
      <div className="mb-6 content-sm text-3xl md:text-5xl font-bold md:text-center">
        {props.pageHead}
      </div>

      {/* headimg */}
      <HeadImage src={props.headImage.src} />

      {/* content */}
      <div className={`mb-10 md:mb-36 content-xs flex flex-col`}>
        <div className="md:mr-6 md:flex-shrink overflow-hidden">
          {/* subhead */}
          <div className="mb-6 md:mb-7 text-sm md:text-lg text-skin-light">
            {props.pageSubhead}
          </div>

          {/* desctipion */}
          <div className="mb-4 font-bold text-lg md:text-2xl">
            {props.descriptionHead}
          </div>
          <div className="mb-10 md:mb-8 grid gap-4">
            {props.description.split("\n").map((line, idx) => (
              <div
                key={`description-${idx}`}
                className="text-skin-light text-sm md:text-lg"
              >
                {line}
              </div>
            ))}
          </div>
        </div>

        {/* publications */}
        <div className={`mb-10 ${isMobile ? "w-screen" : "w-full"}`}>
          <RelatedItemsCarousel
            head={props.relatedHead}
            items={props.relatedItems}
          />
        </div>

        {/* perspective */}
        <div className="mb-10 md:mb-8 w-full">
          <div className="mb-5 text-lg md:text-2xl font-bold">
            {props.perspectiveHead}
          </div>
          <div className="grid md:grid-cols-2 gap-2 md:gap-x-8 md:gap-y-5">
            {props.perspectiveItems.map((perspectiveItem, idx) => (
              <div key={`item-${idx}`} className="border-b border-skin-base">
                <div className="mb-4 text-sm md:text-base font-bold">
                  {perspectiveItem.head}
                </div>
                <div className="mb-9 text-sx text-skin-light">
                  {perspectiveItem.date}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* contact  */}
        <div className="mb-4 font-bold text-lg md:text-2xl">
          {props.contactHead}
        </div>
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-5">
          {props.contacts.map((contact, idx) => (
            <div key={`contact-${idx}`} className="w-full">
              <div className="mb-3 md:mb-4 w-full">
                <Image
                  src={contact.image.src}
                  alt=""
                  width={contact.image.width}
                  height={contact.image.height}
                  layout="responsive"
                />
              </div>
              <div className="mb-1 font-bold md:text-xl">{contact.name}</div>
              <div className="text-xs text-skin-light">{contact.title}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={`mb-10 md:mb-28 ${isMobile ? "w-full" : "content-sm"} `}>
        <Newsletter />
      </div>

      {/* other policies */}
      <div className="w-full bg-skin-light py-10 px-4 md:py-32 flex flex-col items-center">
        <div className="mb-4 md:mb-10 font-bold text-2xl md:text-4xl self-start md:self-center">
          {props.otherPoliciesHead}
        </div>
        <div className={`mb-6 content-md`}>
          <div className="w-full grid md:grid-cols-3 gap-6">
            {otherPolicies.map((policy, idx) => (
              <PolicyCard key={`policy-${idx}`} policy={policy} />
            ))}
          </div>
        </div>
        {morePolicies && (
          <Button text={props.loadMoreText} onClick={loadMore} />
        )}
      </div>
    </div>
  );
};

Policy.layout = Layout;
export default Policy;

export const getStaticPaths = async () => {
  const policies = [];
  const context = require.context(
    "data/policyAreas",
    true,
    /^\.\/.+\/.+\.json$/
  );
  context.keys().forEach((key) => {
    const resource = require(`data/policyAreas/${key.slice(2)}`);
    policies.push(JSON.parse(JSON.stringify(resource)));
  });
  return {
    paths: policies.map((policy) => ({
      params: { policy: policy.slug },
    })),
    fallback: false,
  };
};
export const getStaticProps = async ({ params }) => {
  const { policy: policySlug } = params;
  const policies = [];
  const context = require.context(
    "data/policyAreas",
    true,
    /^\.\/.+\/.+\.json$/
  );
  context.keys().forEach((key) => {
    const resource = require(`data/policyAreas/${key.slice(2)}`);
    policies.push(JSON.parse(JSON.stringify(resource)));
  });

  const staticData = policies.find((policy) => policy.slug === policySlug);
  const commonData = await import(`data/policyAreas/data.json`);
  commonData.otherPolicies = commonData.policies.filter(
    (policy) => policy.slug !== policySlug
  );
  return { props: { ...commonData, ...staticData } };
};
