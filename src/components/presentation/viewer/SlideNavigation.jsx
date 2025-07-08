import { ArrowLeft, ArrowRight } from "@/assets";
import { sendSlideChange } from "@/socket/events";

const SlideNavigation = ({
  pageNumber,
  totalPagesNumber,
  onPageChange,
  roomId,
  role,
}) => {
  const goToPrevPage = () => {
    const newPage = pageNumber - 1;

    onPageChange(newPage);
    role === "host" && sendSlideChange({ roomId, page: newPage });
  };

  const goToNextPage = () => {
    const newPage = pageNumber + 1;

    onPageChange(newPage);
    role === "host" && sendSlideChange({ roomId, page: newPage });
  };

  return (
    <div className="fixed bottom-6 z-10 flex gap-5 rounded-4xl bg-black p-2 text-white">
      <button
        type="button"
        onClick={goToPrevPage}
        disabled={pageNumber === 1}
      >
        <ArrowLeft />
      </button>
      <p>
        {pageNumber} / {totalPagesNumber}
      </p>
      <button
        type="button"
        onClick={goToNextPage}
        disabled={pageNumber === totalPagesNumber}
      >
        <ArrowRight />
      </button>
    </div>
  );
};

export default SlideNavigation;
