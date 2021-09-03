import Filters from "components/Filters";
import InlineFilters from "components/InlineFilters";
import Layout from "components/Layout";
import ResultCard from "components/ResultCards/ResultCard";
import Sort from "components/Sort";
import produce from "immer";
import { useState } from "react";

const filtersDataStatic = [
  {
    name: "Category",
    options: [
      "All",
      "Studies",
      "Market Analysis",
      "Press Presence",
      "Members Bulletin",
    ],
  },
  { name: "Type", options: ["All", "PDF", "DOC", "XSL"] },
  { name: "Date", options: ["This Week", "This Month", "This Year", "Custom"] },
];

const filtersData = filtersDataStatic.map((filter) => ({
  ...filter,
  options: filter.options.map((option) => ({
    name: option,
    selected: false,
  })),
  open: false,
}));

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

const sortOptions = ["Popuplar", "Recent", "Time"];

const Whitepapers = () => {
  const [filters, setFilters] = useState(filtersData);
  const [sortBy, setSortBy] = useState(sortOptions[0]);
  const toggleFilter = (filterName) => {
    setFilters((filters) =>
      produce(filters, (filters) => {
        const filter = filters.find((filter) => filter.name === filterName);
        filter.open = !filter.open;
      })
    );
  };

  const toggleOption = (filterName, optionName) => {
    setFilters((filters) =>
      produce(filters, (filters) => {
        const filter = filters.find((filter) => filter.name === filterName);
        const option = filter.options.find(
          (option) => option.name === optionName
        );
        option.selected = !option.selected;
      })
    );
  };

  return (
    <>
      {/* head */}
      <div className="font-bold text-5xl mt-16">Whitepapers</div>
      {/* subhead  */}
      <div className="text-skin-light mt-3 max-w-sm">
        Find out more about sales and channel enablement best practices and
        industry trends here
      </div>
      {/* main */}
      <div className="mt-16 flex">
        {/* filter */}
        <div className="w-1/4 flex-shrink-0">
          <Filters
            filters={filters}
            toggleFilter={toggleFilter}
            toggleOption={toggleOption}
          />
        </div>
        {/* cards */}
        <div className="flex-grow flex flex-col">
          <div className="flex items-baseline mb-4">
            <div className="flex-grow">
              <InlineFilters
                className=""
                filters={filters}
                toggleOption={toggleOption}
                resultsCount={resultsData.length}
              />
            </div>
            <Sort
              sortBy={sortBy}
              sortOptions={sortOptions}
              setSortBy={setSortBy}
            />
          </div>
          {resultsData.map((result, idx) => (
            <ResultCard key={`result-${idx}`} result={result} />
          ))}
        </div>
      </div>
    </>
  );
};

Whitepapers.layout = Layout;
export default Whitepapers;
