import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="border border-[#f3f3f3] border-t-[6px] border-t-[#3498db] rounded-full w-10 h-10 animate-spin"></div>
    </div>
  );
};

export default Loader;
