import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";

export default function Header({ handleDrawerToggle }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#3f51b5",
          zIndex: 1300,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button color="inherit" onClick={handleDrawerToggle}>
            Menu
          </Button>
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <Typography
              variant="h4"
              noWrap
              component="div"
              sx={{
                marginLeft: "20%",
                fontWeight: "bold",
                letterSpacing: 1,
                textAlign: "left",
              }}
            >
              Cinema World
            </Typography>
          </Box>
          <Button color="inherit">LOGIN</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
