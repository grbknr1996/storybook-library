import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  TableSortLabel,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Chip,
  Box,
} from "@mui/material";

import { MdOutlineGridView } from "react-icons/md";
import { CiViewList, CiSearch } from "react-icons/ci";
import UserSummary from "./UserSummary";
import SearchField from "./SearchField";

export interface User {
  id: string;
  username: string;
  createdOn: string;
  updatedOn: string;
  email: string;
  status: string; // e.g., 'Active', 'Inactive', 'New'
}

interface UserTableProps {
  users: User[];
}

export const UserTable: React.FC<UserTableProps> = ({ users }) => {
  const [order, setOrder] = React.useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = React.useState<keyof User>("username");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [filter, setFilter] = React.useState<string>("");
  const [view, setView] = React.useState<"table" | "card">("table");
  const [statusFilter, setStatusFilter] = React.useState<string>("All");
  const [columns, setColumns] = useState<string[]>([
    "username",
    "email",
    "createdOn",
    "updatedOn",
    "status",
  ]);

  const handleRequestSort = (property: keyof User) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleStatusFilterChange = (filter: string) => {
    setStatusFilter(filter);
  };

  const filteredUsers = users
    .filter((user) =>
      user.username.toLowerCase().includes(filter.toLowerCase())
    )
    .filter((user) => statusFilter === "All" || user.status === statusFilter);

  const sortedUsers = filteredUsers.sort((a, b) => {
    if (orderBy === "createdOn" || orderBy === "updatedOn") {
      return order === "asc"
        ? new Date(a[orderBy]).getTime() - new Date(b[orderBy]).getTime()
        : new Date(b[orderBy]).getTime() - new Date(a[orderBy]).getTime();
    }
    return order === "asc"
      ? a[orderBy] < b[orderBy]
        ? -1
        : 1
      : a[orderBy] > b[orderBy]
      ? -1
      : 1;
  });

  const paginatedUsers = sortedUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const getChipColor = (status: string) => {
    switch (status) {
      case "Active":
        return "success";
      case "Inactive":
        return "error";
      case "New":
        return "primary";
      default:
        return "default";
    }
  };

  const handleViewChange = (
    event: React.MouseEvent<HTMLElement>,
    nextView: "table" | "card"
  ) => {
    if (nextView !== null) {
      setView(nextView);
    }
  };

  return (
    <div>
      <UserSummary onFilterChange={handleStatusFilterChange} />

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 3, flexWrap: { xs: "wrap", sm: "nowrap" } }} // Allow wrapping on mobile
      >
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={handleViewChange}
          aria-label="view toggle"
          sx={{
            marginRight: { xs: 0, sm: 2 },
            mb: { xs: 1, sm: 0 },
            mt: { xs: 2, sm: 2 },
          }} // Margin adjustments for mobile
        >
          <ToggleButton value="table" aria-label="table view">
            <CiViewList />
          </ToggleButton>
          <ToggleButton value="card" aria-label="card view">
            <MdOutlineGridView />
          </ToggleButton>
        </ToggleButtonGroup>

        <SearchField
          setFilter={setFilter}
          columns={columns}
          setColumns={setColumns}
        />
      </Box>

      {/* Render based on selected view */}
      {view === "table" ? (
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User Icon</TableCell>
                  <TableCell
                    sortDirection={orderBy === "username" ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === "username"}
                      direction={orderBy === "username" ? order : "asc"}
                      onClick={() => handleRequestSort("username")}
                    >
                      Username
                    </TableSortLabel>
                  </TableCell>
                  <TableCell
                    sortDirection={orderBy === "email" ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === "email"}
                      direction={orderBy === "email" ? order : "asc"}
                      onClick={() => handleRequestSort("email")}
                    >
                      Email
                    </TableSortLabel>
                  </TableCell>
                  <TableCell
                    sortDirection={orderBy === "createdOn" ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === "createdOn"}
                      direction={orderBy === "createdOn" ? order : "asc"}
                      onClick={() => handleRequestSort("createdOn")}
                    >
                      Created On
                    </TableSortLabel>
                  </TableCell>
                  <TableCell
                    sortDirection={orderBy === "updatedOn" ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === "updatedOn"}
                      direction={orderBy === "updatedOn" ? order : "asc"}
                      onClick={() => handleRequestSort("updatedOn")}
                    >
                      Updated On
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Avatar>{user.username.substring(0, 2)}</Avatar>
                    </TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {new Date(user.createdOn).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(user.updatedOn).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={user.status}
                        color={getChipColor(user.status)}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton>
                        <CiSearch />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={filteredUsers.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      ) : (
        <Grid container spacing={2}>
          {paginatedUsers.map((user) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
              <Card>
                <CardContent>
                  <Grid container alignItems="center">
                    <Avatar>{user.username.charAt(0)}</Avatar>
                    <Typography variant="h6">{user.username}</Typography>
                  </Grid>
                  <Typography color="textSecondary">
                    Created on: {new Date(user.createdOn).toLocaleDateString()}
                  </Typography>
                  <Typography color="textSecondary">
                    Updated on: {new Date(user.updatedOn).toLocaleDateString()}
                  </Typography>
                  {/* Ribbon based on status */}
                  <Chip
                    label={user.status}
                    color={getChipColor(user.status)}
                    style={{ marginTop: "10px" }}
                  />
                </CardContent>
                <Button fullWidth>View Details</Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};
