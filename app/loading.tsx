import { LoadingSpinnerForRoot } from "@/components/shared/components/loading-spinner/loading.spinner.for.root";

export default function Loading() {
  return (
    <div className="gap-[10px] fixed top-0 right-0 bottom-0 left-0 bg-[#ffffff] z-1000 grid place-items-center ">
      <LoadingSpinnerForRoot />
    </div>
  );
}
