"use client";

import Link from "next/link";

export default function Error() {
  return (
    <div className="grid h-screen px-4  place-content-center">
      <div className="text-center">
        <h1 className="font-black text-blue-600 dark:blue-500 text-9xl">404</h1>

        <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-500 sm:text-4xl">
          Page not found
        </p>

        <p className="mt-4">Sorry, we could not find that page.</p>
        <Link
          href="/"
          className="inline-block px-5 py-3 my-6 text-sm font-medium bg-blue-600 dark:bg-blue-500 rounded hover:bg-indigo-700 focus:outline-none focus:ring cursor-pointer"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
