export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex justify-center w-full mt-24">
      <span className="circle animate-loader"></span>
      <span className="circle animate-loader animation-delay-200"></span>
      <span className="circle animate-loader animation-delay-400"></span>
    </div>
  );
}
