import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const GuessComponent = ({ buttonLabels, onClick, solution, showingResult }) => {
  const [clicked, setClicked] = useState(false);

  const guessedCorrect = (isCorrect) => {
    onClick(isCorrect);
  };

  const onBtnClick = (label) => {
    setClicked(true);
    onClick(label);
  };

  return (
    <div style={{ padding: "5em" }}>
      {!showingResult ? (
        <Grid container spacing={2}>
          {buttonLabels.map((label, index) => (
            <Grid item xs={6} key={index}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => onBtnClick(label)}
              >
                {label}
              </Button>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={2}>
          {buttonLabels.map((label, index) => (
            <Grid item xs={6} key={index}>
              <Button
                variant={label === solution ? "contained" : "outlined"}
                color={label === solution ? "success" : "error"}
                fullWidth
              >
                {label}
              </Button>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default GuessComponent;
