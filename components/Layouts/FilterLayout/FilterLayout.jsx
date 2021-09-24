import Footer from "components/Footer";
import {
  Filters,
  InlineFilters,
  Sort,
  Tabs,
  Search,
  MobilePopup,
  Calendar,
} from "components/ui";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { searchActions } from "store/searchSlice";
import Header from "../../Header";

const FilterLayout = ({ children, config, ...props }) => {
  const isMobile = useSelector((state) => state.ui.isMobile);
  const customDate = useSelector((state) => state.search.customDate);
  const activeFilters = useSelector((state) => state.search.activeFilters);
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

  const closeFilter = () => {
    setDisplayFilter(false);
  };

  const openFilters = () => {
    setDisplayFilter(true);
  };

  const showCalendar =
    !customDate.from &&
    !customDate.to &&
    !!activeFilters.find(
      (activeFilter) =>
        activeFilter.filterName === "Date" &&
        activeFilter.optionName === "Custom"
    );

  return (
    <>
      <div className="w-full max-w-content mx-auto px-4">
        <Header config={config} />
        {/* head */}
        <div className="font-bold text-3xl md:text-5xl mt-11 md:mt-16">
          {props.heading}
        </div>
        {/* subhead  */}
        <div className="text-skin-light text-sm md:text-base mt-3 max-w-md">
          {props.subHeading}
        </div>
        {/* main */}
        <div className="w-full mt-5 md:mt-16 flex">
          {/* filter */}
          {props.filtersData && (
            <div className="w-0 md:w-1/4 md:mr-10 flex-shrink-0 z-10">
              <MobilePopup
                onClose={closeFilter}
                display={displayFilter && !(isMobile && showCalendar)}
              >
                <div className="w-full">
                  <Filters
                    filters={props.filtersData}
                    closeFilter={closeFilter}
                  />
                </div>
              </MobilePopup>
              {
                <MobilePopup
                  onClose={() =>
                    dispatch(
                      searchActions.toggleOption({
                        optionName: "Custom",
                        filterName: "Date",
                      })
                    )
                  }
                  display={showCalendar}
                >
                  <div className="w-full md:w-auto md:absolute md:top-full">
                    <Calendar
                      cancel={() =>
                        dispatch(
                          searchActions.toggleOption({
                            optionName: "Custom",
                            filterName: "Date",
                          })
                        )
                      }
                      apply={(from, to) => {
                        dispatch(
                          searchActions.setCustomDate({
                            customDate: { from, to },
                          })
                        );
                      }}
                    />
                  </div>
                </MobilePopup>
              }
            </div>
          )}
          {/* cards */}
          <div className="w-full flex-grow flex flex-col">
            {props.tabs && (
              <div className="w-full">
                <Tabs tabs={props.tabs} />
              </div>
            )}

            <div className="flex flex-wrap md:flex-nowrap items-start mb-6 md:mb-3">
              <div className="w-full flex-grow">
                <InlineFilters openFilters={openFilters} />
              </div>
              {props.allowSearch && (
                <div className="mt-2 md:mt-0 w-full md:w-80 flex-shrink-0">
                  <Search />
                </div>
              )}
              <div className="w-full md:w-auto md:ml-3 mt-3 md:mt-0 flex">
                <Sort sortOptions={props.sortOptions} />
                {isMobile && (
                  <button
                    className="whitespace-nowrap text-skin-highlight bg-skin-light flex-grow ml-2"
                    onClick={openFilters}
                  >
                    Filters
                  </button>
                )}
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
      <Footer config={config} />
    </>
  );
};

export default FilterLayout;
