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
  Avatar,
} from "@mui/material"
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  SwapHoriz as SwapHorizIcon,
} from "@mui/icons-material"
import AddStockMovementDialog from "../components/dialogs/AddStockMovementDialog"

// Sample data for stock movements
const stockMovements = [
  {
    id: "MOV001",
    type: "Entry",
    medication: "Paracetamol 500mg",
    batch: "PC-2023-001",
    quantity: 500,
    source: "PharmaCorp",
    destination: "Main Warehouse",
    date: "2023-11-01T10:30:00",
    user: "John Doe",
    notes: "Regular monthly supply",
    avatar: "JD",
  },
  {
    id: "MOV002",
    type: "Exit",
    medication: "Amoxicillin 250mg",
    batch: "MP-2023-045",
    quantity: 50,
    source: "Main Warehouse",
    destination: "Pharmacy Counter",
    date: "2023-11-02T14:15:00",
    user: "Sarah Smith",
    notes: "Moved to dispensary",
    avatar: "SS",
  },
  {
    id: "MOV003",
    type: "Transfer",
    medication: "Ibuprofen 400mg",
    batch: "HM-2023-112",
    quantity: 200,
    source: "Main Warehouse",
    destination: "Branch Location",
    date: "2023-11-03T09:45:00",
    user: "Mike Johnson",
    notes: "Transfer to branch location",
    avatar: "MJ",
  },
  {
    id: "MOV004",
    type: "Entry",
    medication: "Omeprazole 20mg",
    batch: "PC-2023-089",
    quantity: 300,
    source: "MediPharm",
    destination: "Main Warehouse",
    date: "2023-11-04T11:20:00",
    user: "Emily Davis",
    notes: "New stock arrival",
    avatar: "ED",
  },
  {
    id: "MOV005",
    type: "Exit",
    medication: "Metformin 500mg",
    batch: "MP-2023-076",
    quantity: 100,
    source: "Main Warehouse",
    destination: "Customer",
    date: "2023-11-05T15:30:00",
    user: "Robert Wilson",
    notes: "Dispensed to customer",
    avatar: "RW",
  },
  {
    id: "MOV006",
    type: "Transfer",
    medication: "Atorvastatin 10mg",
    batch: "HM-2023-054",
    quantity: 150,
    source: "Branch Location",
    destination: "Main Warehouse",
    date: "2023-11-06T10:15:00",
    user: "Jennifer Brown",
    notes: "Return from branch",
    avatar: "JB",
  },
  {
    id: "MOV007",
    type: "Entry",
    medication: "Salbutamol 100mcg",
    batch: "PC-2023-123",
    quantity: 200,
    source: "HealthMeds",
    destination: "Main Warehouse",
    date: "2023-11-07T09:30:00",
    user: "David Miller",
    notes: "Emergency order",
    avatar: "DM",
  },
  {
    id: "MOV008",
    type: "Exit",
    medication: "Diazepam 5mg",
    batch: "MP-2023-098",
    quantity: 30,
    source: "Main Warehouse",
    destination: "Pharmacy Counter",
    date: "2023-11-08T14:45:00",
    user: "Lisa Taylor",
    notes: "Controlled substance transfer",
    avatar: "LT",
  },
  {
    id: "MOV009",
    type: "Transfer",
    medication: "Fluoxetine 20mg",
    batch: "HM-2023-067",
    quantity: 100,
    source: "Main Warehouse",
    destination: "Secondary Storage",
    date: "2023-11-09T11:00:00",
    user: "James Anderson",
    notes: "Reorganizing storage",
    avatar: "JA",
  },
  {
    id: "MOV010",
    type: "Entry",
    medication: "Amlodipine 5mg",
    batch: "PC-2023-034",
    quantity: 250,
    source: "PharmaCorp",
    destination: "Main Warehouse",
    date: "2023-11-10T10:00:00",
    user: "Patricia Thomas",
    notes: "Scheduled delivery",
    avatar: "PT",
  },
]

const StockMovement = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedMovement, setSelectedMovement] = useState(null)
  const [openAddDialog, setOpenAddDialog] = useState(false)

  const types = ["all", ...new Set(stockMovements.map((movement) => movement.type))]

  const filteredMovements = stockMovements.filter((movement) => {
    const matchesSearch =
      movement.medication.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movement.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movement.batch.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movement.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movement.destination.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || movement.type === typeFilter

    return matchesSearch && matchesType
  })

  const handleOpenMenu = (event, movement) => {
    setAnchorEl(event.currentTarget)
    setSelectedMovement(movement)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case "Entry":
        return <ArrowDownwardIcon fontSize="small" sx={{ color: "success.main" }} />
      case "Exit":
        return <ArrowUpwardIcon fontSize="small" sx={{ color: "error.main" }} />
      case "Transfer":
        return <SwapHorizIcon fontSize="small" sx={{ color: "info.main" }} />
      default:
        return null
    }
  }

  const getTypeChipColor = (type) => {
    switch (type) {
      case "Entry":
        return "success"
      case "Exit":
        return "error"
      case "Transfer":
        return "info"
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
          Stock Movement
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenAddDialog}>
          Add Movement
        </Button>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Search movements..."
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="type-filter-label">Movement Type</InputLabel>
              <Select
                labelId="type-filter-label"
                id="type-filter"
                value={typeFilter}
                label="Movement Type"
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                {types.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type === "all" ? "All Types" : type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Stock Movements Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="stock movements table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Medication</TableCell>
              <TableCell>Batch</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Source</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>User</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMovements.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  No stock movements found.
                </TableCell>
              </TableRow>
            ) : (
              filteredMovements.map((movement) => (
                <TableRow key={movement.id}>
                  <TableCell component="th" scope="row">
                    {movement.id}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {getTypeIcon(movement.type)}
                      <Chip label={movement.type} color={getTypeChipColor(movement.type)} size="small" sx={{ ml: 1 }} />
                    </Box>
                  </TableCell>
                  <TableCell>{movement.medication}</TableCell>
                  <TableCell>{movement.batch}</TableCell>
                  <TableCell>{movement.quantity}</TableCell>
                  <TableCell>{movement.source}</TableCell>
                  <TableCell>{movement.destination}</TableCell>
                  <TableCell>{new Date(movement.date).toLocaleString()}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar sx={{ width: 24, height: 24, mr: 1 }}>{movement.avatar}</Avatar>
                      {movement.user}
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="more"
                      aria-controls="movement-menu"
                      aria-haspopup="true"
                      onClick={(e) => handleOpenMenu(e, movement)}
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
      <Menu id="movement-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleCloseMenu}>
        <MenuItem onClick={handleCloseMenu}>
          <VisibilityIcon fontSize="small" sx={{ mr: 1 }} />
          View details
        </MenuItem>
        <MenuItem onClick={handleCloseMenu}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Edit movement
        </MenuItem>
        <MenuItem onClick={handleCloseMenu} sx={{ color: "error.main" }}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Delete movement
        </MenuItem>
      </Menu>

      {/* Add Stock Movement Dialog */}
      <AddStockMovementDialog open={openAddDialog} onClose={handleCloseAddDialog} />
    </Box>
  )
}

export default StockMovement
