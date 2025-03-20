// components/FormModal.tsx

import { useState, useEffect } from "react";
import {
  createTransaction,
  updateTransaction,
} from "../../_service/transactionSercive";
import { useRefresh } from "../../_hook/RefreshContext";

export interface FormData {
  description: string;
  amount: number;
  transactionCategory: TransactionCategory;
  id?: number;
  createdAt?: string;
}
interface TransactionCategory {
  name: string;
}

// export interface Transaction {
//   id: number;
//   amount: number;
//   description: string;
//   createdAt?: string;
//   transactionCategory: TransactionCategory;
// }

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  existingData: FormData | null;
  isIncome: boolean;
}

export const FormModal: React.FC<FormModalProps> = ({
  isOpen,
  onClose,
  existingData,
  isIncome,
}) => {
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [transactionCategory, setTransactionCategory] = useState<number>();
  const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);

  const { triggerRefresh } = useRefresh();

  // tous les catefory
  const categoryIncome = [
    { value: 2, label: "Salary" },
  ];
  const categoryExpense = [
    { value: 1, label: "Food" },
  ];

  useEffect(() => {
    if (existingData) {
      setDescription(existingData.description);
      setAmount(existingData.amount);
      // setTransactionCategory(existingData.transactionCategory.name);
      setIsUpdateMode(true);
    } else {
      setDescription("");
      setAmount(0);
      // setTransactionCategory("");
      setIsUpdateMode(false);
    }
  }, [existingData, isOpen]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const updateData = {
      description,
      amount: parseInt(amount.toString(), 10),
    };

    const createData = {
      description,
      amount: parseInt(amount.toString(), 10),
      transactionCategory,
    };

    const id = isUpdateMode ? existingData?.id : null;

    if (isUpdateMode && id) {
      try {
        await updateTransaction(updateData, id);
        // console.log(updateData);
        triggerRefresh();
      } catch (error) {
        alert("Erreur lors de l'envoi:" + error);
      }
    } else {
      try {
        await createTransaction(createData);
        // console.log(createData);
        triggerRefresh();
      } catch (error) {
        alert("Erreur lors de l'envoi:" + error);
      }
    }

    // alert("Transaction traitée avec succès");
    onClose();
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (isUpdateMode) {
  //     console.log("update");
  //   } else {
  //     console.log("create");
  //   }
  // };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-base/50 bg-opacity-50 flex justify-center items-center px-4">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-xl font-semibold mb-4 text-base font-poppins">
            {isUpdateMode
              ? "Mettre à jour les données"
              : "Créer une nouvelle entrée"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
                required
                rows={4}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700"
              >
                Montant
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="transactionCategory"
                className="block text-sm font-medium text-gray-700"
              >
                Catégorie de transaction
              </label>
              {!isUpdateMode && (
                <select
                  id="transactionCategory"
                  value={transactionCategory}
                  onChange={(e) =>
                    setTransactionCategory(Number(e.target.value))
                  }
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
                  required
                >
                  <option
                    value=""
                    className="text-base"
                    defaultValue={transactionCategory}
                  >
                    Sélectionnez une catégorie
                  </option>
                  {(isIncome ? categoryIncome : categoryExpense).map(
                    (category) => (
                      <option
                        key={category.value}
                        value={category.value}
                        className="text-base"
                      >
                        {category.label}
                      </option>
                    )
                  )}
                </select>
              )}
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                {isUpdateMode ? "Mettre à jour" : "Envoyer"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Fermer
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};
