import React, { useEffect, useState } from "react";
import { IncomeFilter } from "./IncomeFilter";
import { TransactionItem } from "../TransactionItem";
import { FormModal, FormData } from "../modals/FormModal";
import DetailModal from "../modals/DetailModal";
import { useDateContext } from "../../_context/DateContext";
import { fetchIncomeTransactions } from "../../_service/transactionTypeService";
import { useRefresh } from "../../_hook/RefreshContext";

export const Income = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editTransaction, setEditTransaction] = useState<FormData | null>(null);

  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [detailTransaction, setDetailTransaction] = useState<FormData | null>(
    null
  );

  const [transactions, setTransactions] = useState<FormData[]>([]);

  const { year, month } = useDateContext();

    const { refresh } = useRefresh();
  

  const handleSetFilter = (filter: string) => {
    setSelectedFilter(filter);
    console.log(selectedFilter);
  };

  const transactionsFilter = transactions.filter((transaction) => {
    if (selectedFilter?.toLowerCase() === "all") {
      return true;
    }

    return (
      transaction.transactionCategory.name.toLowerCase() ===
      selectedFilter?.toLowerCase()
    );
  });

  const openModal = (transaction: FormData | null = null) => {
    setEditTransaction(transaction);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditTransaction(null);
  };

  const openDetailModal = (transaction: FormData | null = null) => {
    setDetailTransaction(transaction);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setDetailTransaction(null);
  };

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const data = await fetchIncomeTransactions(year, month);
        setTransactions(data);
      } catch (err) {
        console.log(err);
      }
    };

    loadTransactions();
  }, [year, month, refresh]);

  return (
    <div className="border-t border-header/50 mx-6 my-4 flex flex-col lg:w-1/3 lg:border-none">
      <div className="flex items-center justify-between h-28 gap-2">
        <h2 className="text-3xl font-semibold font-poppins text-green">
          Income
        </h2>
        <IncomeFilter setFilter={handleSetFilter} />
      </div>
      <div className="h-96 overflow-y-scroll px-4">
        {transactionsFilter && transactionsFilter.map((transaction, index) => (
          <div key={index}>
            <TransactionItem
              category={transaction.transactionCategory.name}
              amount={transaction.amount}
              createdAt={transaction.createdAt}
              color="bg-green"
              // id={transaction.id}
              onEdit={() => openModal(transaction)}
              onDetail={() => openDetailModal(transaction)}
            />
          </div>
        ))}
      </div>
      <button
        onClick={() => openModal()}
        className="px-2 py-1 text-xl w-1/2 rounded-full mx-auto text-white hover:bg-green hover:text-base duration-300 border border-green mt-4"
      >
        Income
      </button>

      <FormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        existingData={editTransaction}
        isIncome={true}
      />

      <DetailModal
        isOpen={isDetailModalOpen}
        formData={detailTransaction}
        onClose={closeDetailModal}
      />
    </div>
  );
};
