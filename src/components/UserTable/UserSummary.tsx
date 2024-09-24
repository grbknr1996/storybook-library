import React, { useState } from "react";
import { Paper, Typography, Grid } from "@mui/material";
import { IoPeople, IoPersonRemoveSharp } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosPersonAdd } from "react-icons/io";
import { MdArrowUpward, MdArrowDownward } from "react-icons/md";
import "./UserSummary.css"; // Assuming you have some CSS for styling

const UserManagementCard: React.FC<any> = ({
  title,
  value,
  icon,
  difference,
  caption,
  textColor,
  isActive,
  onClick,
}) => (
  <Paper
    className="card"
    onClick={onClick}
    style={{ backgroundColor: isActive ? "#e0f7fa" : "white" }} // Change color on click
  >
    <div className="content">
      <div className="details">
        <Typography
          className="title"
          variant="body2"
          style={{ color: textColor }}
        >
          {title}
        </Typography>
        <Typography className="value" variant="h3" style={{ color: textColor }}>
          {value}
        </Typography>
      </div>
      <div className="iconWrapper">{icon}</div>
    </div>
    <div className="footer">
      <Typography
        className="difference"
        variant="body2"
        style={{ color: textColor }}
      >
        {difference > 0 ? <MdArrowUpward /> : <MdArrowDownward />}
        {Math.abs(difference)}%
      </Typography>
      <Typography
        className="caption"
        variant="caption"
        style={{ color: textColor }}
      >
        {caption}
      </Typography>
    </div>
  </Paper>
);

const UserSummary: React.FC<any> = ({ onFilterChange }) => {
  const [activeCard, setActiveCard] = useState<string | null>(null); // State to track active card

  const handleCardClick = (cardTitle: string) => {
    setActiveCard(cardTitle === activeCard ? null : cardTitle);
    switch (cardTitle) {
      case "TOTAL USERS":
        onFilterChange("All");
        break;
      case "ACTIVE USERS":
        onFilterChange("Active");
        break;
      case "INACTIVE USERS":
        onFilterChange("Inactive");
        break;
    }
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{ mb: 3, justifyContent: "space-between", cursor: "pointer" }}
    >
      <Grid item xs={12} sm={6} md={3}>
        <UserManagementCard
          title="TOTAL USERS"
          value="1600"
          icon={<IoPeople />}
          difference={16}
          caption="Since last month"
          textColor="#3f51b5" // Blue text
          isActive={activeCard === "TOTAL USERS"}
          onClick={() => handleCardClick("TOTAL USERS")}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <UserManagementCard
          title="ACTIVE USERS"
          value="1200"
          icon={<FaCheckCircle />}
          difference={10}
          caption="Since last week"
          textColor="#4caf50" // Green text
          isActive={activeCard === "ACTIVE USERS"}
          onClick={() => handleCardClick("ACTIVE USERS")}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <UserManagementCard
          title="INACTIVE USERS"
          value="400"
          icon={<IoPersonRemoveSharp />}
          difference={-5}
          caption="Since last month"
          textColor="#f44336" // Red text
          isActive={activeCard === "INACTIVE USERS"}
          onClick={() => handleCardClick("INACTIVE USERS")}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <UserManagementCard
          title="TEMPORARY USERS"
          value="250"
          icon={<IoIosPersonAdd />}
          difference={20}
          caption="Since last week"
          textColor="#2196f3" // Light Blue text
          isActive={activeCard === "NEW USERS"}
          onClick={() => handleCardClick("NEW USERS")}
        />
      </Grid>
    </Grid>
  );
};

export default UserSummary;
