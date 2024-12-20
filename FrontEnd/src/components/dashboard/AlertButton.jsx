import React from "react";

const AlertButton = () => {
  const handleClick = () => {
    alert("This is an alert!");
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 bg-gray-300 text-black font-medium rounded-md hover:bg-gray-400 transition duration-200"
    >
      Alert
    </button>
  );
};

export default AlertButton;
