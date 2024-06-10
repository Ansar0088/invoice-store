import Image from "next/image";
import React from "react";

const sideheader = () => {
  return (
    <div className="bg-[#7777bd] relative h-full p-3 flex flex-col items-center justify-between rounded-tr-3xl rounded-br-3xl">
      <div>
        <Image
          src="/invoice.png"
          width={120}
          height={100}
          alt="logo"
          className="rounded-full mt-5"
        />
      </div>
      <div>
        {/* <hr className="absolute border-2 w-full right-0  m-10 mx-0"/> */}
        <Image
          src="/avtr.jpg"
          width={30}
          height={100}
          alt="logo"
          className="rounded-full"
        />
      </div>
    </div>
  );
};

export default sideheader;
