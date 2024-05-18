"use client"; // Error components must be Client Components

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <div className="min-h-screen flex flex-grow items-center justify-center bg-gray-50">
        <div className="rounded-lg bg-white p-8 text-center shadow-xl">
          <h1 className="mb-4 text-4xl font-bold">500</h1>
          <p className="text-gray-600">Oops! Something went wrong!!!.</p>
          <Link
            href="/"
            className="mt-4 inline-block rounded website-theme-color-bg px-4 py-2 font-semibold text-white "
          >
            {" "}
            Go back to Home{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}
