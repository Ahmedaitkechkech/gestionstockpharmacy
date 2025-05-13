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
import AddMedicationDialog from "../components/dialogs/AddMedicationDialog"

// Sample data for medications
const medications = [
  {
    id: "MED001",
    name: "Paracetamol",
    category: "Analgesic",
    strength: "500mg",
    form: "Tablet",
    stock: 150,
    status: "In Stock",
  },
  {
    id: "MED002",
    name: "Amoxicillin",
    category: "Antibiotic",
    strength: "250mg",
    form: "Capsule",
    stock: 8,
    status: "Low Stock",
  },
  {
    id: "MED003",
    name: "Ibuprofen",
    category: "NSAID",
    strength: "400mg",
    form: "Tablet",
    stock: 12,
    status: "Low Stock",
  },
  {
    id: "MED004",
    name: "Omeprazole",
    category: "PPI",
    strength: "20mg",
    form: "Capsule",
    stock: 75,
    status: "In Stock",
  },
  {
    id: "MED005",
    name: "Metformin",
    category: "Antidiabetic",
    strength: "500mg",
    form: "Tablet",
    stock: 5,
    status: "Low Stock",
  },
  {
    id: "MED006",
    name: "Atorvastatin",
    category: "Statin",
    strength: "10mg",
    form: "Tablet",
    stock: 60,
    status: "In Stock",
  },
  {
    id: "MED007",
    name: "Salbutamol",
    category: "Bronchodilator",
    strength: "100mcg",
    form: "Inhaler",
    stock: 25,
    status: "In Stock",
  },
  {
    id: "MED008",
    name: "Diazepam",
    category: "Benzodiazepine",
    strength: "5mg",
    form: "Tablet",
    stock: 30,
    status: "In Stock",
  },
  {
    id: "MED009",
    name: "Fluoxetine",
    category: "SSRI",
    strength: "20mg",
    form: "Capsule",
    stock: 45,
    status: "In Stock",
  },
  {
    id: "MED010",
    name: "Amlodipine",
    category: "Calcium Channel Blocker",
    strength: "5mg",
    form: "Tablet",
    stock: 0,
    status: "Out of Stock",
  },
]

const Medications = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedMedication, setSelectedMedication] = useState(null)
  const [openAddDialog, setOpenAddDialog] = useState(false)

  const categories = ["all", ...new Set(medications.map((med) => med.category))]

  const filteredMedications = medications.filter((med) => {
    const matchesSearch =
      med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || med.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  const handleOpenMenu = (event, medication) => {
    setAnchorEl(event.currentTarget)
    setSelectedMedication(medication)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const getStatusChipColor = (status) => {
    switch (status) {
      case "In Stock":
        return "success"
      case "Low Stock":
        return "warning"
      case "Out of Stock":
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
          Medications
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenAddDialog}>
          Add Medication
        </Button>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Search medications..."
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

      {/* Medications Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="medications table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Strength</TableCell>
              <TableCell>Form</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMedications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No medications found.
                </TableCell>
              </TableRow>
            ) : (
              filteredMedications.map((medication) => (
                <TableRow key={medication.id}>
                  <TableCell component="th" scope="row">
                    {medication.id}
                  </TableCell>
                  <TableCell>{medication.name}</TableCell>
                  <TableCell>{medication.category}</TableCell>
                  <TableCell>{medication.strength}</TableCell>
                  <TableCell>{medication.form}</TableCell>
                  <TableCell>{medication.stock}</TableCell>
                  <TableCell>
                    <Chip
                      label={medication.status}
                      color={getStatusChipColor(medication.status)}
                      variant={medication.status === "In Stock" ? "filled" : "outlined"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="more"
                      aria-controls="medication-menu"
                      aria-haspopup="true"
                      onClick={(e) => handleOpenMenu(e, medication)}
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
      <Menu id="medication-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleCloseMenu}>
        <MenuItem onClick={handleCloseMenu}>
          <VisibilityIcon fontSize="small" sx={{ mr: 1 }} />
          View details
        </MenuItem>
        <MenuItem onClick={handleCloseMenu}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Edit medication
        </MenuItem>
        <MenuItem onClick={handleCloseMenu} sx={{ color: "error.main" }}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Delete medication
        </MenuItem>
      </Menu>
      <AddMedicationDialog open={openAddDialog} onClose={handleCloseAddDialog} />
    </Box>
  )
}

export default Medications
