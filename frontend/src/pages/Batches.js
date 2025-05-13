"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  MenuItem,
  IconButton,
  Menu,
  Chip,
  FormControl,
  InputLabel,
  Select,
  Grid,
} from "@mui/material"
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material"
import AddBatchDialog from "../components/dialogs/AddBatchDialog"
// Sample data for batches
const batches = [
  {
    id: "BAT1001",
    medication: "Paracetamol 500mg",
    quantity: 1000,
    manufacturer: "PharmaCorp",
    batchNumber: "PC-2023-001",
    expiryDate: "2025-06-15",
    status: "Active",
  },
  {
    id: "BAT1002",
    medication: "Amoxicillin 250mg",
    quantity: 500,
    manufacturer: "MediPharm",
    batchNumber: "MP-2023-045",
    expiryDate: "2024-03-10",
    status: "Expiring Soon",
  },
  {
    id: "BAT1003",
    medication: "Ibuprofen 400mg",
    quantity: 750,
    manufacturer: "HealthMeds",
    batchNumber: "HM-2023-112",
    expiryDate: "2025-01-22",
    status: "Active",
  },
  {
    id: "BAT1004",
    medication: "Omeprazole 20mg",
    quantity: 300,
    manufacturer: "PharmaCorp",
    batchNumber: "PC-2023-089",
    expiryDate: "2024-05-30",
    status: "Expiring Soon",
  },
  {
    id: "BAT1005",
    medication: "Metformin 500mg",
    quantity: 600,
    manufacturer: "MediPharm",
    batchNumber: "MP-2023-076",
    expiryDate: "2025-08-14",
    status: "Active",
  },
  {
    id: "BAT1006",
    medication: "Atorvastatin 10mg",
    quantity: 400,
    manufacturer: "HealthMeds",
    batchNumber: "HM-2023-054",
    expiryDate: "2024-12-05",
    status: "Active",
  },
  {
    id: "BAT1007",
    medication: "Salbutamol 100mcg",
    quantity: 200,
    manufacturer: "PharmaCorp",
    batchNumber: "PC-2023-123",
    expiryDate: "2023-12-30",
    status: "Expired",
  },
  {
    id: "BAT1008",
    medication: "Diazepam 5mg",
    quantity: 300,
    manufacturer: "MediPharm",
    batchNumber: "MP-2023-098",
    expiryDate: "2025-04-18",
    status: "Active",
  },
  {
    id: "BAT1009",
    medication: "Fluoxetine 20mg",
    quantity: 450,
    manufacturer: "HealthMeds",
    batchNumber: "HM-2023-067",
    expiryDate: "2025-02-25",
    status: "Active",
  },
  {
    id: "BAT1010",
    medication: "Amlodipine 5mg",
    quantity: 350,
    manufacturer: "PharmaCorp",
    batchNumber: "PC-2023-034",
    expiryDate: "2024-09-12",
    status: "Active",
  },
]

const Batches = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedBatch, setSelectedBatch] = useState(null)
  const [openAddDialog, setOpenAddDialog] = useState(false)

  const statuses = ["all", ...new Set(batches.map((batch) => batch.status))]

  const filteredBatches = batches.filter((batch) => {
    const matchesSearch =
      batch.medication.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.batchNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || batch.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleOpenMenu = (event, batch) => {
    setAnchorEl(event.currentTarget)
    setSelectedBatch(batch)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const getStatusChipColor = (status) => {
    switch (status) {
      case "Active":
        return "success"
      case "Expiring Soon":
        return "warning"
      case "Expired":
        return "error"
      default:
        return "default"
    }
  }
  const handleOpenAddDialog = () => {
    setOpenAddDialog(true)
  }

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false)
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Batches
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenAddDialog}>
          Add Batch
        </Button>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Search batches..."
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="status-filter-label">Status</InputLabel>
              <Select
                labelId="status-filter-label"
                id="status-filter"
                value={statusFilter}
                label="Status"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                {statuses.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status === "all" ? "All Statuses" : status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Batches Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="batches table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Medication</TableCell>
              <TableCell>Batch Number</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Manufacturer</TableCell>
              <TableCell>Expiry Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBatches.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No batches found.
                </TableCell>
              </TableRow>
            ) : (
              filteredBatches.map((batch) => (
                <TableRow key={batch.id}>
                  <TableCell component="th" scope="row">
                    {batch.id}
                  </TableCell>
                  <TableCell>{batch.medication}</TableCell>
                  <TableCell>{batch.batchNumber}</TableCell>
                  <TableCell>{batch.quantity}</TableCell>
                  <TableCell>{batch.manufacturer}</TableCell>
                  <TableCell>{new Date(batch.expiryDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Chip
                      label={batch.status}
                      color={getStatusChipColor(batch.status)}
                      variant={batch.status === "Active" ? "filled" : "outlined"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="more"
                      aria-controls="batch-menu"
                      aria-haspopup="true"
                      onClick={(e) => handleOpenMenu(e, batch)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Action Menu */}
      <Menu id="batch-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleCloseMenu}>
        <MenuItem onClick={handleCloseMenu}>
          <VisibilityIcon fontSize="small" sx={{ mr: 1 }} />
          View details
        </MenuItem>
        <MenuItem onClick={handleCloseMenu}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Edit batch
        </MenuItem>
        <MenuItem onClick={handleCloseMenu} sx={{ color: "error.main" }}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Delete batch
        </MenuItem>
      </Menu>
      <AddBatchDialog open={openAddDialog} onClose={handleCloseAddDialog} />
    </Box>
  )
}

export default Batches
