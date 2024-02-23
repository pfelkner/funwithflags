// MyComponent.js
import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const GuessComponent = ({ buttonLabels, onButtonClick }) => {
  return (
    <div style={{ padding: "5em" }}>
      <Grid container spacing={2}>
        {buttonLabels.map((label, index) => (
          <Grid item xs={6} key={index}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => onButtonClick(label)}
            >
              {label}
            </Button>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default GuessComponent;
