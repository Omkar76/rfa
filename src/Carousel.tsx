import { FC, useEffect, useReducer } from "react";

interface CarouselProps {
  children: React.ReactNode[];
  setCurrent: (current: number) => void;
}

type CarouselAction = "next" | "previous";

const reducer = (state: number, action: CarouselAction) => {
  switch (action) {
    case "next":
      return state + 1;
    case "previous":
      return state - 1;
    default:
      return 0;
  }
};

export const Carousel: FC<CarouselProps> = ({ children, setCurrent }) => {
  const [current, dispatch] = useReducer(reducer, 0);

  useEffect(() => {
    setCurrent(current);
  }, [current]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <button
        className="bg-blue-600 text-white rounded-md p-2"
          style={{ visibility: current > 0 ? "visible" : "hidden" }}
          onClick={(e) =>{
            e.preventDefault(); 
            dispatch("previous")}
          }
           >
          Previous
        </button>

        <div className="m-10 transition-all duration-1000 ease-in-out">
          {children.map((child, index) => {
            return (
              <div
                key={index}
                style={{ display: index === current ? "block" : "none" }}
              >
                {child}
              </div>
            );
          })}
        </div>

        <button
        className="bg-blue-600 text-white rounded-md p-2"
          style={{
            visibility: current < children.length - 1 ? "visible" : "hidden",
          }}
          onClick={(e) =>{e.preventDefault(); dispatch("next")}}
        >
          Next
        </button>
      </div>
    </div>
  );
};
