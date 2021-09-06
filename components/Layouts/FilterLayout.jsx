import Filters from "components/Filters";
import InlineFilters from "components/InlineFilters";
import Sort from "components/Sort";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchActions } from "store/searchSlice";
import Header from "../Header";

const FilterLayout = ({ children, ...props }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(searchActions.setSortBy({ sortBy: props.sortOptions[0] }));
  }, [dispatch, props.sortOptions]);

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
        <div className="w-1/4 flex-shrink-0">
          {props.filtersData && <Filters filters={props.filtersData} />}
        </div>
        {/* cards */}
        <div className="flex-grow flex flex-col">
          <div className="flex items-baseline mb-4">
            <div className="flex-grow">
              <InlineFilters />
            </div>
            <Sort sortOptions={props.sortOptions} />
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default FilterLayout;
