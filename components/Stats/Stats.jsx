const Stats = ({ stats, light }) => (
  <div className="w-full flex justify-center">
    <div className="w-full content-sm grid grid-cols-2 md:grid-cols-4 gap-x-16 gap-y-6">
      {stats.map((stat, idx) => (
        <div key={`stat-${idx}`} className="flex flex-col md:items-center">
          <div
            className={`mb-2 flex items-center ${
              light ? "text-white" : "text-skin-highlight"
            }`}
          >
            <div className="font-bold text-5xl">{stat.number}</div>
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
