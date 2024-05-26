const Skeleton = () => {
  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex gap-4 items-center">
        <div className="skeleton w-48 h-48 rounded-full shrink-0"></div>
        <div className="flex flex-col gap-4">
          <div className="skeleton h-12 w-96"></div>
          <div className="skeleton h-8 w-96"></div>
        </div>
      </div>
      <div className="skeleton h-96 w-full"></div>
    </div>
  );
};

export default Skeleton;
