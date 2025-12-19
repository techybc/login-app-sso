import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

interface LoaderProps {
  text?: string;
  size?: number;
}

const Loader: React.FC<LoaderProps> = ({ text = "Loading...", size = 40 }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
    >
      <CircularProgress size={size} />
      <Typography variant="body2">
        {text}
      </Typography>
    </Box>
  );
};

export default Loader;
