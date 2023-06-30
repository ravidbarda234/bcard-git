import React from "react";
import { Box, Typography } from "@mui/material";

// const ChildPropsString = props => {
//   const { text } = props;

//   return (
//     <Box
//       sx={{
//         backgroundColor: "primary.dark",
//         width: 100,
//         height: 100,
//         "&:hover": {
//           backgroundColor: "error.main",
//           opacity: [0.9, 0.8, 0.7],
//         },
//       }}>
//       <Typography>Child Component</Typography>
//       <Typography>{text}</Typography>
//     </Box>
//   );
// };

const ChildPropsString = ({ text }) => {
  console.log(text);
  return (
    <Box
      sx={{
        backgroundColor: "primary.dark",
        width: 100,
        height: 100,
        "&:hover": {
          backgroundColor: "error.main",
          opacity: [0.9, 0.8, 0.7],
        },
      }}>
      <Typography>Child Component</Typography>
      <Typography>{text}</Typography>
    </Box>
  );
};

export default ChildPropsString;
