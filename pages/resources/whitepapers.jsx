import Filters from "components/Filters";
import InlineFilters from "components/InlineFilters";
import { FilterLayout } from "components/Layouts";
import ResultCard from "components/ResultCards/ResultCard";
import Sort from "components/Sort";
import produce from "immer";
import { useState } from "react";

const Whitepapers = () => {
  const resultsData = [
    {
      head: "One Platform : A PRM Essential for an Effective Channel Model",
      subhead: "Environment & Energy/Electrification",
      date: "12 May, 2021",
      img: "/result-1.png",
      category: { name: "Members Bulletin", id: 1 },
    },
    {
      head: "Blueprint to Creating Effective Sales Playbooks",
      subhead: "Environment & Energy/Electrification",
      date: "12 May, 2021",
      img: "/result-2.png",
      category: { name: "Studies", id: 2 },
    },
    {
      head: "The Ultimate Blueprint to Channel Partner Engagement",
      subhead: "Environment & Energy/Electrification",
      date: "12 May, 2021",
      img: "/result-3.png",
      category: { name: "Studies", id: 2 },
    },
  ];

  return (
    <>
      {resultsData.map((result, idx) => (
        <ResultCard key={`result-${idx}`} result={result} />
      ))}
    </>
  );
};

export const getStaticProps = () => {
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
    {
      name: "Type",
      options: [
        { name: "All" },
        { name: "PDF" },
        { name: "DOC" },
        { name: "XSL" },
      ],
    },
    {
      name: "Date",
      options: [
        { name: "This Week" },
        { name: "This Month" },
        { name: "This Year" },
        { name: "Custom" },
      ],
    },
  ];
  const sortOptions = ["Popuplar", "Recent", "Time"];
  return {
    props: {
      heading: "Whitepapers",
      subHeading:
        "Find out more about sales and channel enablement best practices and industry trends here",
      filtersData,
      sortOptions,
    },
  };
};

Whitepapers.layout = FilterLayout;
export default Whitepapers;
