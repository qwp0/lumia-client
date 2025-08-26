const DownloadProgress = () => {
  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-4 bg-black">
      <span className="text-sm text-gray-200">PDF 저장 중입니다.</span>
      <div className="h-2 w-[180px] max-w-[280px] overflow-hidden rounded-full bg-gray-700">
        <div className="animate-progressBar h-full w-1/2 rounded-full bg-[#EB4C60]" />
      </div>
    </div>
  );
};

export default DownloadProgress;
