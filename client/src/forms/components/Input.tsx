import React, { ChangeEvent, FC } from "react";
import TextField from "@mui/material/TextField";
import { makeFirstLetterCapital } from "../utils/algoMethods";
import Grid from "@mui/material/Grid";

type VariantType = "filled" | "outlined" | "standard";
type BreakPointsKeysType = "xs" | "sm" | "md" | "lg" | "xl";
type BreakPointsValueType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type Props = {
  variant?: VariantType;
  type?: string;
  name: string;
  data: Record<string, unknown>;
  label: string;
  required?: boolean;
  error?: string;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  breakPoints?: Partial<Record<BreakPointsKeysType, BreakPointsValueType>>;
};

const Input: FC<Props> = ({
  variant = "outlined",
  type = "text",
  name,
  data,
  label,
  required = true,
  error,
  onInputChange,
  breakPoints = { xl: 12 },
}) => {
  return (
    <Grid item xs={12} {...breakPoints}>
      <TextField
        variant={variant}
        label={makeFirstLetterCapital(label)}
        type={type}
        id={name}
        name={name}
        value={data[name] ? data[name] : ""}
        required={required}
        helperText={error}
        error={Boolean(error)}
        onChange={onInputChange}
        fullWidth
        autoComplete="off"
      />
    </Grid>
  );
};

export default React.memo(Input);
