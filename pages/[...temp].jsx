import { FilterLayout } from "components/Layouts";
const Temp = () => {
  return "temp content";
};

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};
export const getStaticProps = () => {
  console.log("temp page");
  const filtersData = [
    {
      name: "Category",
      options: [
        { name: "All" },
        { name: "Studies" },
        { name: "Market Analysis" },
        { name: "Press Presence" },
        { name: "Members Bulletin" },
      ],
    },
  ];
  const sortOptions = ["Popuplar", "Recent", "Time"];
  return {
    props: {
      heading: "Temp",
      subHeading: "Page Building",
      filtersData,
      sortOptions,
    },
  };
};

Temp.layout = FilterLayout;
export default Temp;
