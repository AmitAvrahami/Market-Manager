import React from "react";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { GridToolbarContainer, GridRowModes } from "@mui/x-data-grid";
import { v4 as uuidv4 } from "uuid";

const EditToolbar = (props) => {
  const { setRows, setRowModesModel } = props;

  const handleClick = async () => {
    try {
      const newProduct = { _id: uuidv4() };
      newProduct.isNew = true;
      console.log(newProduct);

      setRows((oldRows) => [...oldRows, newProduct]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [newProduct._id]: {
          mode: GridRowModes.Edit,
          fieldToFocus: "productName",
        },
      }));
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <GridToolbarContainer className="bg-colors-offWhite ">
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        הוסף מוצר חדש
      </Button>
    </GridToolbarContainer>
  );
};

export default EditToolbar;
