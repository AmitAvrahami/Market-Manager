import { createTheme } from "@mui/material/styles";
import { heIL } from "@mui/material/locale";

const theme = createTheme({
  palette: {
    primary: {
      main: "#88AB8E",
    },
    secondary: {
      main: "#AFC8AD",
    },
    background: {
      default: "#EEE7DA",
      paper: "#F2F1EB",
    },
  },
  direction: "rtl",
  components: {
    MuiButton: {
      styleOverrides: {},
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          backgroundColor: "#EEE7DA",
        },
        columnHeader: {
          backgroundColor: "#88AB8E",
          color: "#FFFFFF",
          fontWeight: "bold",
        },
        row: {
          "&:hover": {
            backgroundColor: "#F2F1EB",
          },
        },
        footerContainer: {
          backgroundColor: "#88AB8E",
          color: "#FFFFFF",
        },
        cell: {
          padding: "15px",
          "&.MuiDataGrid-cell--compact": { padding: "8px" },
          "&.MuiDataGrid-cell--comfortable": { padding: "22px" },
        },
      },
    },
  },

  heIL,
});

export default theme;
