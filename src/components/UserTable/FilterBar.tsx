import React, { useState } from "react";
import { Chip, Box } from "@mui/material";

interface FilterBarProps {
  filterOptions: { label: string; value: string; color: string }[];
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  filterOptions,
  selectedFilter,
  onFilterChange,
}) => {
  const handleFilterClick = (filter: string) => {
    onFilterChange(filter);
  };

  return (
    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2, mb: 2 }}>
      {filterOptions.map((filter) => (
        <Chip
          key={filter.value}
          label={filter.label}
          onClick={() => handleFilterClick(filter.value)}
          sx={{
            background:
              selectedFilter === filter.value ? filter.color : "lightgray",
            color: selectedFilter === filter.value ? "#fff" : "#000",
            cursor: "pointer",
            border: "none",
            transition: "background 0.3s ease",
            "&:hover": {
              background: filter.color,
            },
          }}
        />
      ))}
    </Box>
  );
};

export default FilterBar;
