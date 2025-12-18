const ServiceSkeleton = () => {
  return (
    <div className="animate-pulse bg-white border border-gray-100 shadow-sm">
      <div className="flex flex-col items-center justify-center px-2 py-9">
        <div className="w-10 h-10 rounded-full bg-gray-200" />
        <div className="h-3 w-20 bg-gray-200 rounded mt-5" />
      </div>
    </div>
  );
};

export default ServiceSkeleton;
