import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const GuessComponent = ({ buttonLabels, onGuess, solution }) => {
  const [clicked, guessTaken] = useState(false);

  const guessedCorrect = (isCorrect) => {
    onGuess(isCorrect);
  };

  const onBtnClick = (label) => {
    guessTaken(true);
    delaySetClicked(label);
  };
  const delaySetClicked = (label) => {
    setTimeout(() => {
      guessTaken(false);
      guessedCorrect(label === solution);
    }, 1000);
  };
  return (
    <div style={{ padding: "5em" }}>
      {!clicked ? (
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
