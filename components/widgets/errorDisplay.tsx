import React from "react";

const ErrorDisplay = ({ message }: { message: string | undefined }) => {
  return message ? <p className="text-red-400 text-sm p-4">{message}</p> : null;
};

export default ErrorDisplay;
