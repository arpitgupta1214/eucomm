const Stats = ({ stats, light, bg }) => (
  <div className="w-full flex justify-center">
    <div
      className={`w-full  grid grid-cols-2 md:grid-cols-4 ${
        bg ? "gap-6 content-md" : "gap-x-16 content-sm"
      } gap-y-6`}
    >
      {stats.map((stat, idx) => (
        <div
          key={`stat-${idx}`}
          className={`flex flex-col md:items-center ${
            bg ? "bg-skin-light py-7" : ""
          }`}
        >
          <div
            className={`mb-1 md:mb-2 flex items-center ${
              light ? "text-white" : bg ? "" : "text-skin-highlight"
            }`}
          >
            <div className="font-bold text-3xl md:text-5xl">{stat.number}</div>
            <div className="text-2xl">{stat.numberSub}</div>
          </div>

          <div
            className={`whitespace-nowrap ${
              light ? "text-white" : "text-skin-light"
            }`}
          >
            {stat.title}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Stats;
