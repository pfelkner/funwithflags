// MyComponent.js
import React from "react";
import Card from "@mui/material/Card";

const FlagComponent = ({ countryCode, isCorrectGuess }) => {
  const link = `https://flagcdn.com/w320/${countryCode}.png`;
  console.log("flagcomponent");
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
      }}
    >
      <Card
        style={
          isCorrectGuess === null
            ? { boxShadow: "0px 0px 0.5em 0.7em white" }
            : isCorrectGuess
            ? { boxShadow: "0px 0px 0.5em 0.7em green" }
            : { boxShadow: "0px 0px 0.5em 0.7em red" }
        }
      >
        <img
          src={link}
          alt="Flag"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </Card>
    </div>
  );
};

export default FlagComponent;
