import React from "react";

interface TransactionItemActionButtonProps {
  action: () => void;
  color?: string;
  name: string
}

export const TransactionItemActionButton: React.FC<
  TransactionItemActionButtonProps
> = ({
  action,
  color = "border-b border-base/50  text-gray-800 hover:bg-gray-600 ",
  name
}) => {
  return (
    <button
      className={`${color} px-4 hover:text-white duration-300 pyn-0.5 cursor-pointer `}
      onClick={action}
    >
      {name}
    </button>
  );
};
