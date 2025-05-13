"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Grid,
  Avatar,
  Chip,
} from "@mui/material"

// Sample data for logs
const logs = [
  {
    id: "LOG001",
    user: "John Doe",
    action: "Added medication",
    details: "Added Paracetamol 500mg to inventory",
    timestamp: "2023-11-05T09:45:00",
    category: "Inventory",
    avatar: "JD",
  },
  {
    id: "LOG002",
    user: "Sarah Smith",
    action: "Updated batch",
    details: "Updated expiry date for Amoxicillin batch #MP-2023-045",
    timestamp: "2023-11-05T10:30:00",
    category: "Inventory",
    avatar: "SS",
  },
  {
    id: "LOG003",
    user: "Mike Johnson",
    action: "Deleted medication",
    details: "Removed Aspirin 100mg from inventory",
    timestamp: "2023-11-04T16:15:00",
    category: "Inventory",
    avatar: "MJ",
  },
  {
    id: "LOG004",
    user: "Emily Davis",
    action: "Added batch",
    details: "Added new batch of Ibuprofen 400mg",
    timestamp: "2023-11-05T08:20:00",
    category: "Inventory",
    avatar: "ED",
  },
  {
    id: "LOG005",
    user: "John Doe",
    action: "Added user",
    details: "Added new user Robert Wilson",
    timestamp: "2023-10-28T14:10:00",
    category: "User Management",
    avatar: "JD",
  },
  {
    id: "LOG006",
    user: "Jennifer Brown",
    action: "Login",
    details: "User logged in",
    timestamp: "2023-11-05T11:05:00",
    category: "Authentication",
    avatar: "JB",
  },
  {
    id: "LOG007",
    user: "David Miller",
    action: "System update",
    details: "Updated system settings",
    timestamp: "2023-11-04T09:30:00",
    category: "System",
    avatar: "DM",
  },
  {
    id: "LOG008",
    user: "Lisa Taylor",
    action: "Logout",
    details: "User logged out",
    timestamp: "2023-10-15T16:45:00",
    category: "Authentication",
    avatar: "LT",
  },
  {
    id: "LOG009",
    user: "James Anderson",
    action: "Updated medication",
    details: "Updated Paracetamol 500mg details",
    timestamp: "2023-11-05T09:15:00",
    category: "Inventory",
    avatar: "JA",
  },
  {
    id: "LOG010",
    user: "Patricia Thomas",
    action: "Generated report",
    details: "Generated monthly inventory report",
    timestamp: "2023-11-04T13:20:00",
    category: "Reporting",
    avatar: "PT",
  },
  {
    id: "LOG011",
    user: "John Doe",
    action: "Updated user",
    details: "Updated user profile for Sarah Smith",
    timestamp: "2023-11-03T15:40:00",
    category: "User Management",
    avatar: "JD",
  },
  {
    id: "LOG012",
    user: "Mike Johnson",
    action: "Stock adjustment",
    details: "Adjusted stock for Metformin 500mg",
    timestamp: "2023-11-02T11:25:00",
    category: "Inventory",
    avatar: "MJ",
  },
  {
    id: "LOG013",
    user: "Emily Davis",
    action: "Deleted batch",
    details: "Removed expired batch of Salbutamol",
    timestamp: "2023-11-01T14:50:00",
    category: "Inventory",
    avatar: "ED",
  },
  {
    id: "LOG014",
    user: "David Miller",
    action: "Backup",
    details: "System backup completed",
    timestamp: "2023-10-31T23:00:00",
    category: "System",
    avatar: "DM",
  },
  {
    id: "LOG015",
    user: "Sarah Smith",
    action: "Login failed",
    details: "Failed login attempt",
    timestamp: "2023-10-30T08:15:00",
    category: "Authentication",
    avatar: "SS",
  },
]

const Logs = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const categories = ["all", ...new Set(logs.map((log) => log.category))]

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || log.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Activity Logs
        </Typography>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Search logs..."
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="category-filter-label">Category</InputLabel>
              <Select
                labelId="category-filter-label"
                id="category-filter"
                value={categoryFilter}
                label="Category"
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Logs Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="logs table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Timestamp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLogs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No logs found.
                </TableCell>
              </TableRow>
            ) : (
              filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell component="th" scope="row">
                    {log.id}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar sx={{ mr: 1 }}>{log.avatar}</Avatar>
                      {log.user}
                    </Box>
                  </TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>{log.details}</TableCell>
                  <TableCell>
                    <Chip label={log.category} variant="outlined" size="small" />
                  </TableCell>
                  <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default Logs
