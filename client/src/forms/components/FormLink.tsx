import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Box, Button, Typography } from "@mui/material";

type BreakPointsKeysType = "xs" | "sm" | "md" | "lg" | "xl";
type BreakPointsValueType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type Props = {
  text: string;
  textButton: string;
  to: string;
  breakPoints?: Partial<Record<BreakPointsKeysType, BreakPointsValueType>>;
};

const FormLink: React.FC<Props> = ({ text, to, breakPoints, textButton }) => {
  const navigate = useNavigate();
  return (
    <Grid item xs={12} {...breakPoints}>
      <Typography className="center" sx={{ marginTop: 2 }}>
        {text}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: " center",
        }}
      >
        <Button variant="text" color="success" onClick={() => navigate(to)}>
          <Typography className="center">{textButton}</Typography>
        </Button>
      </Box>
    </Grid>
  );
};

export default FormLink;
