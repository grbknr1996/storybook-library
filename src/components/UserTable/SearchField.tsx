import React, { useState } from "react";
import {
  TextField,
  IconButton,
  Popover,
  Button,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Badge,
  Chip,
  Box,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

const SearchField: React.FC<any> = ({ setFilter, columns, setColumns }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchValues, setSearchValues] = useState<{ [key: string]: string }>(
    {}
  );
  const [activeFilters, setActiveFilters] = useState<string[]>(columns);
  const [filterCount, setFilterCount] = useState(0);
  const [durationFilters, setDurationFilters] = useState<{
    createdOn?: string;
    updatedOn?: string;
  }>({});

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleApplyFilter = () => {
    //   setFilter({ ...searchValues, ...durationFilters });
    setFilterCount(
      Object.keys({ ...searchValues, ...durationFilters }).filter(
        (key) => searchValues[key]
      ).length
    );
    handleClose();
  };

  const handleColumnChange = (column: string) => {
    const newColumns = activeFilters.includes(column)
      ? activeFilters.filter((c) => c !== column)
      : [...activeFilters, column];

    setActiveFilters(newColumns);
    setColumns(newColumns);
  };

  const handleDeleteChip = (key: string) => {
    const updatedSearchValues = { ...searchValues };
    delete updatedSearchValues[key];
    setSearchValues(updatedSearchValues);
    setFilter(updatedSearchValues);
    setFilterCount(
      Object.keys(updatedSearchValues).filter((k) => updatedSearchValues[k])
        .length
    );
  };

  const handleDurationChange = (key: string, value: string) => {
    setDurationFilters({ ...durationFilters, [key]: value });
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <IconButton onClick={handleClick}>
        <Badge badgeContent={filterCount} color="primary">
          <FilterListIcon />
        </Badge>
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{
          marginTop: "8px", // Adjust the margin for lower positioning
          "& .MuiPopover-paper": {
            width: { xs: "300px", sm: "400px" }, // Adjust width for mobile compatibility
            padding: 2,
          },
        }}
      >
        <div>
          <Typography variant="h6">Columns to Display</Typography>
          <FormGroup>
            {["username", "email", "status"].map((column) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={activeFilters.includes(column)}
                    onChange={() => handleColumnChange(column)}
                  />
                }
                label={column.charAt(0).toUpperCase() + column.slice(1)}
                key={column}
              />
            ))}
          </FormGroup>

          <Typography variant="subtitle1">Search Filters</Typography>
          {["username", "email"].map((column) => (
            <TextField
              key={column}
              label={`Search ${column}`}
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={(e) =>
                setSearchValues({
                  ...searchValues,
                  [column]: e.target.value,
                })
              }
            />
          ))}

          <Typography variant="subtitle1">Duration Filters</Typography>
          <FormControl fullWidth margin="normal">
            <Select
              value={durationFilters.createdOn || ""}
              displayEmpty
              onChange={(e) =>
                handleDurationChange("createdOn", e.target.value)
              }
            >
              <MenuItem value="" disabled>
                Created On
              </MenuItem>
              <MenuItem value="last7days">Last 7 Days</MenuItem>
              <MenuItem value="last30days">Last 30 Days</MenuItem>
              <MenuItem value="last90days">Last 90 Days</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <Select
              value={durationFilters.updatedOn || ""}
              displayEmpty
              onChange={(e) =>
                handleDurationChange("updatedOn", e.target.value)
              }
            >
              <MenuItem value="" disabled>
                Updated On
              </MenuItem>
              <MenuItem value="last7days">Last 7 Days</MenuItem>
              <MenuItem value="last30days">Last 30 Days</MenuItem>
              <MenuItem value="last90days">Last 90 Days</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            onClick={handleApplyFilter}
            style={{ marginTop: 10 }}
          >
            Apply Filter
          </Button>

          <Box mt={2}>
            <Typography variant="subtitle1">Active Filters:</Typography>
            {Object.entries(searchValues).map(
              ([key, value]) =>
                value && (
                  <Chip
                    key={key}
                    label={`${
                      key.charAt(0).toUpperCase() + key.slice(1)
                    }: ${value}`}
                    onDelete={() => handleDeleteChip(key)}
                    style={{ margin: "4px" }}
                  />
                )
            )}
            {Object.entries(durationFilters).map(
              ([key, value]) =>
                value && (
                  <Chip
                    key={key}
                    label={`${
                      key.charAt(0).toUpperCase() + key.slice(1)
                    }: ${value}`}
                    onDelete={() => handleDeleteChip(key)}
                    style={{ margin: "4px" }}
                  />
                )
            )}
          </Box>
        </div>
      </Popover>
    </div>
  );
};

export default SearchField;
