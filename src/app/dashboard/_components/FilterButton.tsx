import React from "react";

interface FilterButtonProps {
  title: string;
  onClick: () => void;
  color: string;
  selectedFilter: string;
}

export const FilterButton: React.FC<FilterButtonProps> = ({
  title,
  onClick,
  color,
  selectedFilter,
}) => {
  return (
    <button
      className={` hover:${color} ${
        selectedFilter === title ? color : "bg-header"
      } duration-300 border-b border-base/50 text-base py-1 w-full `}
      onClick={onClick}
    >
      {title}
    </button>
  );
};
