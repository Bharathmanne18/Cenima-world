import AccessibilityIcon from "@mui/icons-material/Accessibility"; // Icon for Adventure
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople"; // Icon for Animation
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom"; // Icon for Family
import HistoryEduIcon from "@mui/icons-material/HistoryEdu"; // Icon for Documentary
import LocalMoviesIcon from "@mui/icons-material/LocalMovies"; // Icon for All Movies
import MoodIcon from "@mui/icons-material/Mood"; // Icon for Romance
import NaturePeopleIcon from "@mui/icons-material/NaturePeople"; // Icon for Fantasy
import PersonIcon from "@mui/icons-material/Person"; // Icon for Horror
import SciFiIcon from "@mui/icons-material/Science"; // Icon for Sci-Fi
import SportsEsportsIcon from "@mui/icons-material/SportsEsports"; // Icon for Drama
import StarIcon from "@mui/icons-material/Star"; // Icon for Action
import TheatersIcon from "@mui/icons-material/Theaters"; // Icon for Thriller
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";

const drawerWidth = 240;

function Sidebar({ onCategoryChange, currentCategory }) {
  const categories = [
    { text: "All Movies", icon: <LocalMoviesIcon />, category: "all" },
    { text: "Comedy", icon: <LocalMoviesIcon />, category: "comedy" }, // Comedy: LocalMoviesIcon
    { text: "Thriller", icon: <TheatersIcon />, category: "thriller" }, // Thriller: TheatersIcon
    { text: "Action", icon: <StarIcon />, category: "action" }, // Action: StarIcon
    { text: "Drama", icon: <SportsEsportsIcon />, category: "drama" }, // Drama: SportsEsportsIcon
    { text: "Horror", icon: <PersonIcon />, category: "horror" }, // Horror: PersonIcon
    { text: "Family", icon: <FamilyRestroomIcon />, category: "family" }, // Family: FamilyRestroomIcon
    { text: "Sci-Fi", icon: <SciFiIcon />, category: "sci-fi" }, // Sci-Fi: SciFiIcon
    { text: "Romance", icon: <MoodIcon />, category: "romance" }, // Romance: MoodIcon
    { text: "Adventure", icon: <AccessibilityIcon />, category: "adventure" }, // Adventure: AccessibilityIcon
    { text: "Documentary", icon: <HistoryEduIcon />, category: "documentary" }, // Documentary: HistoryEduIcon
    { text: "Animation", icon: <EmojiPeopleIcon />, category: "animation" }, // Animation: EmojiPeopleIcon
    { text: "Fantasy", icon: <NaturePeopleIcon />, category: "fantasy" }, // Fantasy: NaturePeopleIcon
  ];

  const handleCategoryClick = (category) => {
    if (onCategoryChange) {
      onCategoryChange(category); // Update the selected category in the parent component
    }
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", sm: "block" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: drawerWidth,
          zIndex: 1200,
          backgroundColor: "#3f51b5",
          color: "white",
          display: "flex",
          flexDirection: "column",
        },
      }}
      open
    >
      <Toolbar />
      <Typography variant="h6" sx={{ fontWeight: "bold", color: "white", padding: 2 }}>
        Categories
      </Typography>
      <List sx={{ overflowY: "auto", flexGrow: 1 }}>
        {categories.map(({ text, icon, category }) => (
          <ListItem key={category} disablePadding>
            <ListItemButton
              onClick={() => handleCategoryClick(category)}
              sx={{
                borderRadius: 2,
                mb: 1,
                backgroundColor: currentCategory === category ? "#BBDEFB" : "transparent", // Highlight active category
                color: "white",
                padding: 2,
                "&:hover": {
                  backgroundColor: "#BBDEFB",
                  cursor: "pointer",
                },
              }}
            >
              <ListItemIcon sx={{ color: "inherit" }}>{icon}</ListItemIcon>
              <ListItemText
                primary={text}
                sx={{
                  fontWeight: "bold",
                  color: "inherit",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;
