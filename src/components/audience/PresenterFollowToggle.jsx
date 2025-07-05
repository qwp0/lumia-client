import { PresentationIcon } from "@/assets";

const PresenterFollowToggle = ({ isFollowing, onToggleFollow }) => {
  return (
    <button
      type="button"
      onClick={onToggleFollow}
      title="발표자 따라가기"
      className={`fixed top-6 left-6 z-30 flex items-center justify-center rounded-full bg-white/80 p-2 shadow-md transition-colors duration-300 ${
        isFollowing ? "text-black" : "text-zinc-500"
      }`}
    >
      <PresentationIcon className="pointer-events-none h-7 w-7" />
    </button>
  );
};

export default PresenterFollowToggle;
