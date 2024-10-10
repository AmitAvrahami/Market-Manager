import { FiberManualRecord } from "@mui/icons-material";
import { Box } from "@mui/material";

function CustomFooter(props) {
  return (
    <Box sx={{ p: 1, display: "flex" }}>
      <FiberManualRecord
        fontSize="small"
        sx={{
          mr: 1,
          color: props.status === "מחובר למערכת" ? "#4caf50" : "#d9182e",
        }}
      />
      סטטוס: {props.status}
    </Box>
  );
}

export default CustomFooter;
