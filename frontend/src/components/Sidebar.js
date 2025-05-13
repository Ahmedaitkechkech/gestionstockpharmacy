"use client"
import { Link, useLocation } from "react-router-dom"
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
} from "@mui/material"
import DashboardIcon from "@mui/icons-material/Dashboard"
import MedicationIcon from "@mui/icons-material/Medication"
import InventoryIcon from "@mui/icons-material/Inventory"
import PeopleIcon from "@mui/icons-material/People"
import HistoryIcon from "@mui/icons-material/History"
import BarChartIcon from "@mui/icons-material/BarChart"
import SettingsIcon from "@mui/icons-material/Settings"
import SwapHorizIcon from "@mui/icons-material/SwapHoriz"

const drawerWidth = 240

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon sx={{ color: "#1976d2" }} />, path: "/dashboard" }, // Bleu pour Dashboard
  { text: "Medications", icon: <MedicationIcon sx={{ color: "#388e3c" }} />, path: "/medications" }, // Vert pour Medications
  { text: "Batches", icon: <InventoryIcon sx={{ color: "#f57c00" }} />, path: "/batches" }, // Orange pour Batches
  { text: "Stock Movement", icon: <SwapHorizIcon sx={{ color: "#0288d1" }} />, path: "/stockmovement" }, // Bleu pour Stock Movement
  { text: "Users", icon: <PeopleIcon sx={{ color: "#9c27b0" }} />, path: "/users" }, // Violet pour Users
  { text: "Activity Logs", icon: <HistoryIcon sx={{ color: "#9e9e9e" }} />, path: "/logs" }, // Gris pour Logs
]

const bottomMenuItems = [
  { text: "Reports", icon: <BarChartIcon sx={{ color: "#43a047" }} />, path: "/reports" }, // Vert pour Reports
  { text: "Settings", icon: <SettingsIcon sx={{ color: "#f44336" }} />, path: "/settings" }, // Rouge pour Settings
]

const Sidebar = ({ mobileOpen, handleDrawerToggle, isMobile }) => {
  const location = useLocation()

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.path} selected={location.pathname === item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {bottomMenuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.path} selected={location.pathname === item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  )

  return (
    <Box component="nav" sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }} aria-label="mailbox folders">
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", lg: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", lg: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  )
}

export default Sidebar
