import { ArrowLeft, ArrowRight } from "@/assets";

const SlideNavigation = ({ pageNumber, totalPagesNumber, onPageChange }) => {
  const goToPrevPage = () => {
    onPageChange(pageNumber - 1);
  };

  const goToNextPage = () => {
    onPageChange(pageNumber + 1);
  };

  return (
    <div className="fixed bottom-3 z-10 flex gap-5 rounded-4xl bg-black p-2 text-white">
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
