import React, { useCallback, useEffect, useState } from "react";
import {
  DataGrid,
  GridRowModes,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import RowActions from "./RowActions";
import EditToolbar from "./EditToolbar";
import { heIL } from "@mui/x-data-grid/locales";
import {
  addProduct,
  deleteProduct,
  getValidationErrorMessage,
  updateProduct,
} from "../services/productService/ProductSevice";
import { Box, Snackbar, Button } from "@mui/material";
import CustomFooter from "./CustomFooter";

const ProductGrid = ({ rowsData }) => {
  const [status, setStatus] = React.useState("מחובר למערכת");
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (rowsData) {
      setRows(rowsData);
    }
  }, [rowsData]);

  const handleEditClick = (id) => () => {
    console.log(id);
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    console.log("save");
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => async () => {
    console.log("delete");
    try {
      const result = await deleteProduct(id);
      console.log(result);
      setRows(rows.filter((row) => row._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
    const editedRow = rows.find((row) => row._id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row._id !== id));
    }
  };

  const handleRowEditStop = (params, event) => {
    console.log("handleRowEditStop");
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    console.log(newRowModesModel);
    setRowModesModel(newRowModesModel);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBarOpen(false);
  };

  const processRowUpdate = React.useCallback(
    async (newRow) => {
      console.log(newRow);
      const tempId = newRow._id;
      if (newRow.isNew) {
        console.log("add product");

        try {
          const response = await addProduct(newRow);
          setRows((oldRows) => oldRows.filter((row) => row._id !== tempId));
          setRows((oldRows) => [...oldRows, response]);
          setSnackBarOpen(true);
          setMessage(`המוצר ${newRow.productName} נשמר בהצלחה`);
          return response;
        } catch (error) {
          let errorMessage = getValidationErrorMessage(error);
          setMessage(errorMessage.he);
          setSnackBarOpen(true);
        }
      } else {
        console.log("update product");

        try {
          const response = await updateProduct(newRow._id, newRow);
          setSnackBarOpen(true);
          setMessage(`המוצר ${newRow.productName} נשמר בהצלחה`);
          return response;
        } catch (error) {
          handleCancelClick(newRow._id);
          let errorMessage = getValidationErrorMessage(error);
          setMessage(errorMessage.he);
          setSnackBarOpen(true);
        }
      }
    },
    [updateProduct, addProduct, rowModesModel]
  );

  const columns = [
    {
      field: "productName",
      headerName: "שם המוצר",
      editable: true,
      align: "right",
      flex: 2,
    },
    {
      field: "productSerialNumber",
      headerName: "מקט",
      editable: true,
      align: "right",
      flex: 1,
    },
    {
      field: "productType",
      headerName: "סוג",
      editable: true,
      align: "right",
      type: "singleSelect",
      valueOptions: [
        { value: "ללא", label: "ללא" },
        { value: "ירק", label: "ירק" },
        { value: "פרי", label: "פרי" },
        { value: "גידולי שדה", label: "גידולי שדה" },
      ],
      flex: 1,
    },
    {
      field: "productDescription",
      headerName: "תיאור",
      editable: true,
      renderCell: (params) => (
        <div
          style={{
            whiteSpace: "normal",
            wordWrap: "break-word",
            maxWidth: "300px",
            overflowWrap: "break-word",
          }}
        >
          {params.value}
        </div>
      ),
      align: "right",
      flex: 3,
    },
    {
      field: "marketingDate",
      headerName: "תאריך שיווק",
      type: "date",
      editable: true,
      align: "right",
      flex: 2,
      valueFormatter: (value) => {
        const date = new Date(value);
        return `${date.getDate().toString().padStart(2, "0")}/${(
          date.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}/${date.getFullYear()}`;
      },
      valueParser: (value) => {
        return new Date(value).toISOString();
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "פעולות",
      flex: 1,
      getActions: (params) => {
        return [
          <RowActions
            id={params.id}
            rowModesModel={rowModesModel}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
            handleSaveClick={handleSaveClick}
            handleCancelClick={handleCancelClick}
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <DataGrid
        sx={{
          ".MuiDataGrid-scrollbar--vertical": { height: 0 },
          width: "100%",
        }}
        scrollbarSize={0}
        ro
        getRowId={(row) => row._id}
        editMode="row"
        getRowHeight={() => "auto"}
        rows={rows}
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        columns={columns}
        localeText={{
          MuiTablePagination: {
            labelRowsPerPage: "שורות לכל עמוד:",
            labelDisplayedRows: ({ from, to, count }) =>
              `${from} - ${to} מתוך ${count === -1 ? `יותר מ-${to}` : count}`,
          },
          ...heIL.components.MuiDataGrid.defaultProps.localeText,
        }}
        slots={{
          toolbar: EditToolbar,
          footer: CustomFooter,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
          footer: { status, setStatus },
        }}
      />
      {snackBarOpen && (
        <Snackbar
          open={snackBarOpen}
          autoHideDuration={5000}
          onClose={handleClose}
          message={message}
        />
      )}
      <Button
        variant="contained"
        onClick={() => {
          if (status === "מחובר למערכת") {
            const confirmDisconnect = window.confirm(
              "האם אתה בטוח שאתה רוצה להתנתק?"
            );
            if (confirmDisconnect) {
              setStatus("מנותק מהמערכת");
            }
          } else {
            setStatus("מחובר למערכת");
          }
        }}
      >
        {status === "מחובר למערכת" ? "התנתק מהמערכת" : "התחבר למערכת"}
      </Button>
    </Box>
  );
};

export default ProductGrid;
