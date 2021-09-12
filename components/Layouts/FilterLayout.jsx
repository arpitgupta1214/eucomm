import { Filters, InlineFilters, Sort, Tabs, Search } from "components/ui";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { searchActions } from "store/searchSlice";
import Header from "../Header";

const FilterLayout = ({ children, ...props }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.sortOptions)
      dispatch(searchActions.setSortBy({ sortBy: props.sortOptions[0] }));
  }, [dispatch, props.sortOptions]);

  useEffect(() => {
    if (props.tabs) dispatch(searchActions.setTab({ tab: props.tabs[0] }));
  }, [dispatch, props.tabs]);

  return (
    <>
      <Header />
      {/* head */}
      <div className="font-bold text-5xl mt-16">{props.heading}</div>
      {/* subhead  */}
      <div className="text-skin-light mt-3 max-w-md">{props.subHeading}</div>
      {/* main */}
      <div className="mt-16 flex">
        {/* filter */}
        {props.filtersData && (
          <div className="w-1/4 flex-shrink-0">
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

          <div className="flex items-start mb-4">
            <div className="flex-grow">
              <InlineFilters />
            </div>
            {props.allowSearch && <Search />}
            <Sort sortOptions={props.sortOptions} />
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default FilterLayout;
