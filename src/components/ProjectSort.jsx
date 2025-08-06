import React from "react";
import Box from "@mui/material/Box";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

/**
 * ProjectSort component for handling project sorting
 * @param {Object} props - Component props
 * @param {boolean} props.isNewest - Current sort direction
 * @param {Function} props.onSort - Sort handler function
 * @returns {JSX.Element} Sort button component
 */
const ProjectSort = ({ isNewest, onSort }) => (
  <Box
    onClick={onSort}
    sx={{
      color: "white",
      padding: "8px 16px",
      borderRadius: 20,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      cursor: "pointer",
      transition: "all 0.2s ease",
      display: "flex",
      alignItems: "center",
      gap: "4px",
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.3)",
      },
    }}
  >
    {isNewest ? "New" : "Old"}
    {isNewest ? (
      <ArrowUpwardIcon sx={{ fontSize: "16px" }} />
    ) : (
      <ArrowDownwardIcon sx={{ fontSize: "16px" }} />
    )}
  </Box>
);

export default ProjectSort;
