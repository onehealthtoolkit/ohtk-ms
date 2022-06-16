import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const NetworkError: NextPage = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");

  useEffect(() => {
    let message: string = "Something went wrong";
    if (router.query.e === "400") {
      message = "Invalid Request";
    } else if (router.query.e === "500") {
      message = "Server Error";
    }
    setMessage(message);
  }, [router.query]);
  return (
    <main className="flex justify-center items-center w-full h-screen">
      <div className="flex flex-col justify-center items-center w-1/3 h-auto rounded bg-blue-100 p-8  border-blue-300 border-2">
        <p className="text-red-500 text-3xl">{message}</p>
        <p className="text-gray-500 text-lg p-4">😧 Try again later</p>
        <button
          className="bg-blue-500 p-4 w-1/2 text-white rounded"
          onClick={() => router.back()}
        >
          Back
        </button>
      </div>
    </main>
  );
};

export default NetworkError;
