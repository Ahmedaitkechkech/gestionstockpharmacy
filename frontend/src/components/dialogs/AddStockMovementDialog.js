"use client"

import { useState } from "react"

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  FormHelperText,
} from "@mui/material"
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"

// Sample data for dropdowns
const medications = ["Paracetamol 500mg", "Amoxicillin 250mg", "Ibuprofen 400mg", "Omeprazole 20mg", "Metformin 500mg"]

const batches = ["PC-2023-001", "MP-2023-045", "HM-2023-112", "PC-2023-089", "MP-2023-076"]

const locations = [
  "Main Warehouse",
  "Pharmacy Counter",
  "Branch Location",
  "Secondary Storage",
  "PharmaCorp",
  "MediPharm",
  "HealthMeds",
  "Customer",
]

const AddStockMovementDialog = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    type: "",
    medication: "",
    batch: "",
    quantity: "",
    source: "",
    destination: "",
    date: new Date(),
    notes: "",
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      date: date,
    })
    if (errors.date) {
      setErrors({
        ...errors,
        date: "",
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.type) newErrors.type = "Movement type is required"
    if (!formData.medication) newErrors.medication = "Medication is required"
    if (!formData.batch) newErrors.batch = "Batch is required"

    if (!formData.quantity) {
      newErrors.quantity = "Quantity is required"
    } else if (isNaN(formData.quantity) || Number.parseInt(formData.quantity) <= 0) {
      newErrors.quantity = "Quantity must be a positive number"
    }

    if (!formData.source) newErrors.source = "Source is required"
    if (!formData.destination) newErrors.destination = "Destination is required"

    if (formData.source === formData.destination) {
      newErrors.destination = "Source and destination cannot be the same"
    }

    if (!formData.date) newErrors.date = "Date is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      // Here you would typically send the data to your API
      console.log("Submitting stock movement:", formData)
      // Reset form and close dialog
      setFormData({
        type: "",
        medication: "",
        batch: "",
        quantity: "",
        source: "",
        destination: "",
        date: new Date(),
        notes: "",
      })
      onClose()
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Stock Movement</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <FormControl fullWidth error={!!errors.type}>
              <InputLabel>Movement Type</InputLabel>
              <Select name="type" value={formData.type} label="Movement Type" onChange={handleChange}>
                <MenuItem value="Entry">Entry</MenuItem>
                <MenuItem value="Exit">Exit</MenuItem>
                <MenuItem value="Transfer">Transfer</MenuItem>
              </Select>
              {errors.type && <FormHelperText>{errors.type}</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.medication}>
              <InputLabel>Medication</InputLabel>
              <Select name="medication" value={formData.medication} label="Medication" onChange={handleChange}>
                {medications.map((med) => (
                  <MenuItem key={med} value={med}>
                    {med}
                  </MenuItem>
                ))}
              </Select>
              {errors.medication && <FormHelperText>{errors.medication}</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.batch}>
              <InputLabel>Batch</InputLabel>
              <Select name="batch" value={formData.batch} label="Batch" onChange={handleChange}>
                {batches.map((batch) => (
                  <MenuItem key={batch} value={batch}>
                    {batch}
                  </MenuItem>
                ))}
              </Select>
              {errors.batch && <FormHelperText>{errors.batch}</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="quantity"
              label="Quantity"
              type="number"
              fullWidth
              value={formData.quantity}
              onChange={handleChange}
              error={!!errors.quantity}
              helperText={errors.quantity}
              inputProps={{ min: 1 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Date & Time"
                value={formData.date}
                onChange={handleDateChange}
                renderInput={(params) => (
                  <TextField {...params} fullWidth error={!!errors.date} helperText={errors.date} />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.source}>
              <InputLabel>Source</InputLabel>
              <Select name="source" value={formData.source} label="Source" onChange={handleChange}>
                {locations.map((location) => (
                  <MenuItem key={location} value={location}>
                    {location}
                  </MenuItem>
                ))}
              </Select>
              {errors.source && <FormHelperText>{errors.source}</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.destination}>
              <InputLabel>Destination</InputLabel>
              <Select name="destination" value={formData.destination} label="Destination" onChange={handleChange}>
                {locations.map((location) => (
                  <MenuItem key={location} value={location}>
                    {location}
                  </MenuItem>
                ))}
              </Select>
              {errors.destination && <FormHelperText>{errors.destination}</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="notes"
              label="Notes"
              fullWidth
              multiline
              rows={3}
              value={formData.notes}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Add Movement
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddStockMovementDialog
