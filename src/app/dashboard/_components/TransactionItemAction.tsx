import React from "react";
import { TransactionItemActionButton } from "./TransactionItemActionButton";

interface TransactionItemActionProps {
  onEdit: () => void;
  onDetail: () => void;
  showTransactionItemAction: boolean;
}

export const TransactionItemAction: React.FC<TransactionItemActionProps> = ({
  onEdit,
  onDetail,
  showTransactionItemAction,
}) => {
  return (
    <div
      className={`bg-slate-200 absolute top-0 right-0 rounded-sm ${
        showTransactionItemAction && "hidden"
      }`}
    >
      <div className=" flex flex-col font-extralight font-poppins rounded-sm overflow-hidden">
        <TransactionItemActionButton
          action={onDetail}
          name="Details"
        />
        <TransactionItemActionButton
          action={onEdit}
          name="Update"
        />
        <TransactionItemActionButton
          action={() => console.log(`Delete `)}
          name="Delete"
          color="text-red-800 hover:bg-red-600 hover:text-white"
        />
      </div>
    </div>
  );
};
