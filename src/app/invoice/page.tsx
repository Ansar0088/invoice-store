import React from "react";
import InvoiceHome from "./(components)/invoice-home";
import SnowfallComponent from "./(components)/snowfall-component";
const page = () => {
  return (
    <div>
      <SnowfallComponent/>  
      <InvoiceHome />
    </div>
  );
};

export default page;
