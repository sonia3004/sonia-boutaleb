import React from "react";
import { TextField, Grid } from "@mui/material";
import { withJsonFormsControlProps } from "@jsonforms/react";
import { rankWith, scopeEndsWith } from "@jsonforms/core";

export const customPercentageTester = rankWith(5, scopeEndsWith("percentage"));

const CustomPercentageControlRenderer = (props: any) => {
  const { data, handleChange, path, errors } = props;

  const handlePercentageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newPercentage = parseFloat(event.target.value);

    if (isNaN(newPercentage) || newPercentage < 0 || newPercentage > 100) {
      return;
    }

    handleChange(path, newPercentage);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <TextField
          label="Pourcentage"
          type="number"
          value={data || ""}
          onChange={handlePercentageChange}
          fullWidth
          error={Boolean(errors)}
          helperText={errors}
        />
      </Grid>
    </Grid>
  );
};

// Connecter le renderer à JSONForms
export const CustomPercentageControl = withJsonFormsControlProps(
  CustomPercentageControlRenderer
);
