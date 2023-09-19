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
  }, [current, setCurrent]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <svg
          style={{ visibility: current > 0 ? "visible" : "hidden" }}
          onClick={() => dispatch("previous")}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <title>Previous</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
          />
        </svg>

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

        <svg
          style={{
            visibility: current < children.length - 1 ? "visible" : "hidden",
          }}
          onClick={() => dispatch("next")}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <title>Next</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
          />
        </svg>
      </div>
    </div>
  );
};
