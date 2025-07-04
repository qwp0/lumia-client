import { useState } from "react";
import { createPortal } from "react-dom";

import logoImage from "@/assets/images/lumia-logo.png";

const AudienceEnterModal = ({ isOpen, onJoin }) => {
  const [name, setName] = useState("");
  const modalRoot = document.getElementById("modal-root");
  const isDisabled = !name.trim();

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#08090A]">
      <img
        src={logoImage}
        alt="Lumia 서비스 로고"
        className="mb-6 h-15"
      />
      <div className="flex w-[420px] flex-col items-center gap-1 rounded-2xl bg-white px-8 py-8 text-center">
        <h2 className="text-lg font-bold text-black">
          참여자 이름을 입력해주세요.
        </h2>
        <p className="text-sm text-gray-500">
          입력한 이름은 발표자 화면에 표시됩니다.
        </p>
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="name"
          className="mt-3 w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:outline-none"
        />
        <hr className="mt-3 w-full border-gray-200" />
        <button
          type="button"
          onClick={() => onJoin(name)}
          disabled={isDisabled}
          className={`mt-3 w-full rounded-md px-4 py-2 text-sm font-bold transition-colors ${
            isDisabled
              ? "bg-gray-100 text-gray-800"
              : "bg-[#EB4C60] text-white hover:bg-[#e2444d]"
          }`}
        >
          참여하기
        </button>
      </div>
    </div>,
    modalRoot,
  );
};

export default AudienceEnterModal;
