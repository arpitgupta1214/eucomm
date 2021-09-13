import { Filters, InlineFilters, Sort, Tabs, Search } from "components/ui";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { searchActions } from "store/searchSlice";
import Header from "../Header";

const FilterLayout = ({ children, ...props }) => {
  const isMobile = useSelector((state) => state.ui.isMobile);
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.sortOptions)
      dispatch(searchActions.setSortBy({ sortBy: props.sortOptions[0] }));
  }, [dispatch, props.sortOptions]);

  useEffect(() => {
    if (props.tabs) dispatch(searchActions.setTab({ tab: props.tabs[0] }));
  }, [dispatch, props.tabs]);

  const [displayFilter, setDisplayFilter] = useState(false);

  useEffect(() => {
    if (!isMobile) {
      setDisplayFilter(true);
    }
  }, [isMobile]);
  return (
    <>
      <Header />
      {/* head */}
      <div className="font-bold text-3xl md:text-5xl mt-11 md:mt-16">
        {props.heading}
      </div>
      {/* subhead  */}
      <div className="text-skin-light text-sm md:text-base mt-3 max-w-md">
        {props.subHeading}
      </div>
      {/* main */}
      <div className="mt-5 md:mt-16 flex">
        {/* filter */}
        {props.filtersData && (
          <div
            className={`w-screen md:w-1/4 flex-shrink-0 fixed bottom-0 md:relative ${
              displayFilter ? "h-auto" : "h-0"
            } overflow-hidden`}
          >
            <Filters filters={props.filtersData} />
          </div>
        )}
        {/* cards */}
        <div className="flex-grow flex flex-col">
          {props.tabs && (
            <div className="w-full">
              <Tabs tabs={props.tabs} />
            </div>
          )}

          <div className="flex flex-wrap md:flex-nowrap items-start mb-6 md:mb-4">
            <div className="flex-grow">
              <InlineFilters />
            </div>
            {props.allowSearch && <Search />}
            <div className="w-full md:w-auto md:ml-3 mt-3 md:mt-0">
              <Sort sortOptions={props.sortOptions} />
            </div>
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default FilterLayout;
