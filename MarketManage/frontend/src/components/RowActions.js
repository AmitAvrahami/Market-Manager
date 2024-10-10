import React from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { GridActionsCellItem } from "@mui/x-data-grid";

const RowActions = ({
  id,
  rowModesModel,
  handleEditClick,
  handleSaveClick,
  handleCancelClick,
  handleDeleteClick,
}) => {
  const isInEditMode = rowModesModel[id]?.mode === "edit";
  if (isInEditMode) {
    return [
      <GridActionsCellItem
        icon={<SaveIcon />}
        onClick={handleSaveClick(id)}
        label="Save"
      />,

      <GridActionsCellItem
        icon={<CancelIcon />}
        onClick={handleCancelClick(id)}
        label="Cancel"
      />,
    ];
  } else {
    return [
      <GridActionsCellItem
        icon={<ModeEditIcon />}
        onClick={handleEditClick(id)}
        label="Edit"
      />,

      <GridActionsCellItem
        icon={<DeleteIcon />}
        onClick={handleDeleteClick(id)}
        label="Delete"
      />,
    ];
  }
};

export default RowActions;
