import { createPortal } from "react-dom";

import { CloseIcon, DialogCheckIcon } from "@/assets";
import { MODAL_MESSAGES } from "@/constants/modalMessages";

const ChoiceModal = ({ isOpen, type, onFirst, onSecond, onCancel }) => {
  if (!isOpen || !type) return null;

  const modalRoot = document.getElementById("modal-root");
  const { title, description, firstText, secondText } = MODAL_MESSAGES[type];

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-[380px] rounded-2xl bg-white px-6 py-7 shadow-xl">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600"
        >
          <CloseIcon className="h-5 w-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          <DialogCheckIcon />
          <h2 className="text-lg font-bold text-black">{title}</h2>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
        <div className="mt-6 flex justify-center gap-3">
          <button
            type="button"
            className="btn-confirm"
            onClick={onFirst}
          >
            {firstText}
          </button>
          <button
            type="button"
            className="btn-confirm"
            onClick={onSecond}
          >
            {secondText}
          </button>
        </div>
      </div>
    </div>,
    modalRoot,
  );
};

export default ChoiceModal;
