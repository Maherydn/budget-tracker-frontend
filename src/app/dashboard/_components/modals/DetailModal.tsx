import React from "react";
import { FormData } from "./FormModal";

interface DetailModalProps {
  formData: FormData | null;
  onClose: () => void;
  isOpen: boolean;
}

const DetailModal: React.FC<DetailModalProps> = ({
  formData,
  onClose,
  isOpen,
}) => {
  return (
    isOpen && (
      <div className="fixed inset-0 bg-base/50 bg-opacity-75 flex justify-center items-center z-50 px-4">
        <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
          <button
            className="absolute top-2 right-2 text-red-500 hover:text-white font-semibold text-lg hover:bg-red-500 py-0.5 px-2 rounded-lg border border-red-500 duration-300 cursor-pointer"
            onClick={onClose}
          >
            X
          </button>
          <h2 className="text-2xl font-bold text-center mb-4 text-base font-poppins">
            Détails de la transaction
          </h2>
          <div className="space-y-4 text-base">
            <p>
              <strong>Catégorie:</strong> {formData?.transactionCategory.name}
            </p>
            <p>
              <strong>Description:</strong> {formData?.description}
            </p>
            <p>
              <strong>Montant:</strong> {formData?.amount} €
            </p>
            <p>
              <strong>Date:</strong> {formData?.createdAt}
            </p>
          </div>
        </div>
      </div>
    )
  );
};

export default DetailModal;
