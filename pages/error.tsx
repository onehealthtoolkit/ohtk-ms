import type { NextPage } from "next";
import { useRouter } from "next/router";

const NetworkError: NextPage = () => {
  const router = useRouter();
  return (
    <main className="flex justify-center items-center w-full h-screen">
      <div className="flex flex-col justify-center items-center w-1/3 h-auto rounded bg-blue-100 p-8">
        <p className="text-red-500 text-3xl">Server Side Error</p>
        <p className="text-gray-500 text-lg p-8">Try again later</p>
        <button
          className="bg-blue-400 p-4 w-1/2 text-white rounded"
          onClick={() => router.back()}
        >
          Back
        </button>
      </div>
    </main>
  );
};

export default NetworkError;
