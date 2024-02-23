// MyComponent.js
import React from "react";

const FlagComponent = ({ countryCode }) => {
  // const countryCode = "af";
  // const link = `https://www.worldometers.info/img/flags/${countryCode}-flag.gif`;

  const link = `https://flagcdn.com/256x192/${countryCode}.png`;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <img src={link} alt="Flag" style={{ maxWidth: "100%", height: "auto" }} />
    </div>
  );
};

export default FlagComponent;
