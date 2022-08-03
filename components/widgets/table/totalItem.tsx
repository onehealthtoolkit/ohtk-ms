import React from "react";

type TotalItemProps = {
  totalCount: number;
};

const TotalItem: React.FC<TotalItemProps> = ({ totalCount }) => {
  return (
    <div className="text-sm flex-initial w-64 rounded-lg bg-gray-100 p-3 mr-2">
      รายการทั้งหมด
      <span className="ml-2 font-bold">{totalCount} รายการ </span>
    </div>
  );
};

export default TotalItem;
