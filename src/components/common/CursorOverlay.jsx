import { useCursorMoveListener } from "@/hooks/listeners/useCursorMoveListener";
import { getColorFromNickname } from "@/utils/getColorFromNickname";

const CursorOverlay = ({ currentPage }) => {
  const cursors = useCursorMoveListener(currentPage);

  return (
    <div className="pointer-events-none absolute inset-0 z-50">
      {cursors.map(({ x, y, nickname }) => (
        <div
          key={nickname}
          className="absolute flex flex-col items-center"
          style={{
            top: `${y * 100}%`,
            left: `${x * 100}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="bg-opacity-70 mb-1 rounded bg-black px-1 text-xs text-white">
            {nickname}
          </div>
          <div
            className={`h-3 w-3 rounded-full border border-white ${getColorFromNickname(nickname)}`}
          />
        </div>
      ))}
    </div>
  );
};

export default CursorOverlay;
