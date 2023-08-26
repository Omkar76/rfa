import { useState, FC } from "react";

interface CarouselProps {
  children: React.ReactNode[];
}

export const Carousel: FC<CarouselProps> = ({ children }) => {
  const [current, setCurrent] = useState(0);
  return (
    <div>
      <div className="flex items-center justify-between">
        <svg
          style={{ visibility: current > 0 ? "visible" : "hidden" }}
          onClick={() => setCurrent((value) => value - 1)}
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

        <div className="m-10">{children[current]}</div>

        <svg
          style={{
            visibility: current < children.length - 1 ? "visible" : "hidden",
          }}
          onClick={() => setCurrent((value) => value + 1)}
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
      {current === children.length - 1 && (
        <input
          type="submit"
          value="Submit"
          className="mx-auto block bg-blue-600 p-2 text-white rounded"
        />
      )}
    </div>
  );
};
