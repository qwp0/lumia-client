import { useNavigate } from "react-router-dom";

import { DoorIcon } from "@/assets";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-2.5 bg-[#08090A] px-4 text-center text-white">
      <DoorIcon />
      <h1 className="text-2xl">발표방을 찾을 수 없어요.</h1>

      <p className="mt-3 font-light text-white">
        이미 종료된 발표이거나, 링크가 잘못된 것 같아요!
      </p>
      <button
        type="button"
        className="mt-6 rounded bg-white px-5 py-2 text-black transition hover:bg-[#EB4C60] hover:text-white"
        onClick={() => navigate("/")}
      >
        홈으로 돌아가기
      </button>
    </main>
  );
};

export default NotFound;
