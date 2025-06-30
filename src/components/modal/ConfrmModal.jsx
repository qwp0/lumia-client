import { createPortal } from "react-dom";

import { DialogCheckIcon } from "@/assets";
import { MODAL_MESSAGES } from "@/constants/modalMessages";

const ConfirmModal = ({ isOpen, type, onConfirm, onCancel }) => {
  if (!isOpen || !type) return null;

  const modalRoot = document.getElementById("modal-root");
  const { title, description, confirmText, cancelText } = MODAL_MESSAGES[type];

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-[380px] rounded-2xl bg-white px-6 py-7 shadow-xl">
        <div className="flex flex-col items-center text-center">
          <DialogCheckIcon />
          <h2 className="text-lg font-bold text-black">{title}</h2>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
        <div className="mt-6 flex justify-center gap-3">
          <button
            type="button"
            className="btn-confirm"
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className="btn-confirm"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    modalRoot,
  );
};

export default ConfirmModal;
