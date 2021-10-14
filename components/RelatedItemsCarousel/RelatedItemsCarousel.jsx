import { Carousel, Badge } from "components/ui";
import { useSelector } from "react-redux";
import Image from "next/image";

const RelatedItemsCarousel = ({ head, items }) => {
  const isMobile = useSelector((state) => state.ui.isMobile);

  return (
    <div className="overflow-hidden px-4 py-10 md:p-8 bg-skin-light">
      <div className="mb-4 md:mb-5 text-lg md:text-2xl font-bold">{head}</div>
      <Carousel>
        {items
          .reduce(
            (acc, item) => {
              const last = acc[acc.length - 1];
              if (last.length < (isMobile ? 3 : 2)) {
                last.push(item);
              } else {
                acc.push([item]);
              }
              return acc;
            },
            [[]]
          )
          .map((itemGroup, idx) => (
            <div key={`related-group-${idx}`} className="flex flex-col">
              {itemGroup.map((item, idx) => (
                <div
                  key={`position-paper-${idx}`}
                  className="mr-5 mb-5 max-w-xs flex"
                >
                  <div className="w-24 h-24 flex-shrink-0 mr-4 relative">
                    <Image
                      src={item.image}
                      alt=""
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="flex-grow flex-col">
                    <Badge
                      type={item.category.id}
                      name={item.category.name}
                      small
                    />
                    <div className="mb-2 font-bold text-sm max-line-2">
                      {item.head}
                    </div>
                    <div className="text-skin-light text-xs mb-2">
                      {item.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
      </Carousel>
    </div>
  );
};

export default RelatedItemsCarousel;
