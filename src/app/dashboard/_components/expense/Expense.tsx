import React, { useEffect, useState } from "react";
import { TransactionItem } from "../TransactionItem";
import { FormModal, FormData } from "../modals/FormModal";
import { ExpenseFilter } from "./ExpenseFilter";
import DetailModal from "../modals/DetailModal";
import { useDateContext } from "../../_context/DateContext";
import { fetchExpenseTransactions } from "../../_service/transactionTypeService";
import { useRefresh } from "../../_hook/RefreshContext";

export const Expense = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>();
  const [isFormModalOpen, setIsFromModalOpen] = useState<boolean>(false);
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
    // console.log(selectedFilter);
  };

  // Appliquer le filtre aux transactions
  const transactionsFilter = transactions.filter((transaction) => {
    if (selectedFilter?.toLowerCase() === "all") {
      return true;
    }

    return (
      transaction.transactionCategory.name.toLowerCase() ===
      selectedFilter?.toLowerCase()
    );
  });

  const openFormModal = (transaction: FormData | null = null) => {
    setEditTransaction(transaction);
    setIsFromModalOpen(true);
  };

  const closeFormModal = () => {
    setIsFromModalOpen(false);
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
        const data = await fetchExpenseTransactions(year, month);
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
        <h2 className="text-3xl font-semibold font-poppins text-yellow">
          Expense
        </h2>
        <ExpenseFilter setFilter={handleSetFilter} />
      </div>
      <div className="h-96 overflow-y-scroll px-4">
        {transactionsFilter.map((transaction, index) => (
          <div key={index}>
            <TransactionItem
              category={transaction.transactionCategory.name}
              amount={transaction.amount}
              createdAt={transaction.createdAt}
              color="bg-yellow"
              // id={transaction.id}
              onEdit={() => openFormModal(transaction)}
              onDetail={() => openDetailModal(transaction)}
            />
          </div>
        ))}
      </div>
      <button
        onClick={() => openFormModal()}
        className="px-2 py-1 text-xl w-1/2 rounded-full mx-auto text-white hover:bg-yellow hover:text-base duration-300 border border-yellow mt-4"
      >
        Expense
      </button>

      <FormModal
        isOpen={isFormModalOpen}
        onClose={closeFormModal}
        existingData={editTransaction}
        isIncome={false}
      />
      <DetailModal
        isOpen={isDetailModalOpen}
        formData={detailTransaction}
        onClose={closeDetailModal}
      />
    </div>
  );
};
