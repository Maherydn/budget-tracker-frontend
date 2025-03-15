import React from "react";

interface TransactionItemProps {
  category: string;
  date: string;
  amount: number;
  color: string;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({
  category,
  date,
  amount,
  color,
}) => {
  return (
    <div className="flex justify-between items-center h-24 border-dashed border-t border-header/50 relative">
      <div className="flex gap-2">
        <div
          className={`${color} size-14 rounded-full px-1 flex justify-center items-center `}
        >
          <svg
            className="size-8"
            viewBox="0 0 30 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M27 0H3C1.335 0 0.015 1.335 0.015 3L0 21C0 22.665 1.335 24 3 24H27C28.665 24 30 22.665 30 21V3C30 1.335 28.665 0 27 0ZM27 21H3V12H27V21ZM27 6H3V3H27V6Z"
              fill="#1E1E1E"
            />
          </svg>
        </div>
        <div className="flex flex-col">
          <h3 className="text-xl text-header font-montserrat font-semibold">
            {category}
          </h3>
          <p className="text-md text-header/60 font-montserrat">{date}</p>
        </div>
      </div>
      <p className="text-2xl font-montserrat text-header">{amount} ar</p>
      <div className="text-header absolute top-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>
        <div className=" bg-slate-200 absolute top-0 right-0 rounded-sm hidden ">

        <div className=" flex flex-col font-extralight font-poppins ">
          <button className="border-b border-base/50 pyn-0.5 px-4 text-gray-800 hover:bg-gray-600 hover:text-white duration-300 rounded-t-sm cursor-pointer">
            Details
          </button>
          <button className="border-b border-base/50 pyn-0.5 px-4 text-gray-800 hover:bg-gray-600 hover:text-white duration-300 cursor-pointer">
            Update
          </button>
          <button className="px-4 text-red-800 hover:bg-red-600 hover:text-white duration-300 rounded-b-sm pyn-0.5 cursor-pointer">
            Delete
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};
