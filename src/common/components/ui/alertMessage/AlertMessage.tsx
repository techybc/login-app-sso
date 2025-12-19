import { Snackbar, Alert } from "@mui/material";

interface AlertMessageProps {
  open: boolean;
  onClose: () => void;
  message: string;
  severity?: "success" | "info" | "warning" | "error";
  autoHideDuration?: number;
}

export default function AlertMessage({
  open,
  onClose,
  message,
  severity = "info",
  autoHideDuration = 4000,
}: AlertMessageProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
