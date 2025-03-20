import React, { useState } from "react";
import { PointIcon } from "../_assets/icons";
import { TransactionItemAction } from "./TransactionItemAction";
import { formaDate } from "../_utils/formatDate";

interface TransactionItemProps {
  category: string;
  createdAt?: string;
  amount: number;
  color: string;
  // id: number;
  onEdit: () => void;
  onDetail: () => void;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({
  category,
  createdAt,
  amount,
  color,
  // id,
  onEdit,
  onDetail
}) => {
  const [showTransactionItemAction, setShowTransactionItemAction] =
    useState<boolean>(true);
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
          <p className="text-md text-header/60 font-montserrat">{formaDate(createdAt)}</p>
        </div>
      </div>
      <p className="lg:text-xl font-montserrat sm:block hidden text-header">{amount} ar</p>
      <div
        className="text-header absolute top-0 right-0 cursor-pointer"
        onClick={() => setShowTransactionItemAction(!showTransactionItemAction)}
      >
        <PointIcon />
        <TransactionItemAction
          onEdit={onEdit}
          onDetail={onDetail}
          showTransactionItemAction={showTransactionItemAction}
        />
      </div>
    </div>
  );
};
