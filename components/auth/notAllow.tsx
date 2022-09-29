import React from "react";
import useStore from "lib/store";

const NotAllow: React.FC = () => {
  const store = useStore();

  return (
    <div className="h-screen w-full bg-gray-200 p-8 text-center">
      <div className="mx-auto p-8 bg-white">
        <h1>You do not have permission to use the dashboard.</h1>
        <button
          className="bg-red-500 text-white border rounded px-8 py-2 mt-4"
          type="button"
          onClick={() => {
            store.signOut();
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default NotAllow;
