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
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"

// Sample medications for dropdown
const medications = [
  "Paracetamol 500mg",
  "Amoxicillin 250mg",
  "Ibuprofen 400mg",
  "Omeprazole 20mg",
  "Metformin 500mg",
  "Atorvastatin 10mg",
  "Salbutamol 100mcg",
  "Diazepam 5mg",
  "Fluoxetine 20mg",
  "Amlodipine 5mg",
]

// Sample manufacturers for dropdown
const manufacturers = ["PharmaCorp", "MediPharm", "HealthMeds", "GlobalPharma", "MedSupply"]

const AddBatchDialog = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    medication: "",
    batchNumber: "",
    quantity: "",
    manufacturer: "",
    expiryDate: null,
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
      expiryDate: date,
    })
    if (errors.expiryDate) {
      setErrors({
        ...errors,
        expiryDate: "",
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.medication) newErrors.medication = "Medication is required"
    if (!formData.batchNumber.trim()) newErrors.batchNumber = "Batch number is required"

    if (!formData.quantity) {
      newErrors.quantity = "Quantity is required"
    } else if (isNaN(formData.quantity) || Number.parseInt(formData.quantity) <= 0) {
      newErrors.quantity = "Quantity must be a positive number"
    }

    if (!formData.manufacturer) newErrors.manufacturer = "Manufacturer is required"

    if (!formData.expiryDate) {
      newErrors.expiryDate = "Expiry date is required"
    } else {
      const today = new Date()
      if (formData.expiryDate < today) {
        newErrors.expiryDate = "Expiry date cannot be in the past"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      // Here you would typically send the data to your API
      console.log("Submitting batch:", formData)
      // Reset form and close dialog
      setFormData({
        medication: "",
        batchNumber: "",
        quantity: "",
        manufacturer: "",
        expiryDate: null,
        notes: "",
      })
      onClose()
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Batch</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
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
            <TextField
              name="batchNumber"
              label="Batch Number"
              fullWidth
              value={formData.batchNumber}
              onChange={handleChange}
              error={!!errors.batchNumber}
              helperText={errors.batchNumber}
            />
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
            <FormControl fullWidth error={!!errors.manufacturer}>
              <InputLabel>Manufacturer</InputLabel>
              <Select name="manufacturer" value={formData.manufacturer} label="Manufacturer" onChange={handleChange}>
                {manufacturers.map((manufacturer) => (
                  <MenuItem key={manufacturer} value={manufacturer}>
                    {manufacturer}
                  </MenuItem>
                ))}
              </Select>
              {errors.manufacturer && <FormHelperText>{errors.manufacturer}</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Expiry Date"
                value={formData.expiryDate}
                onChange={handleDateChange}
                renderInput={(params) => (
                  <TextField {...params} fullWidth error={!!errors.expiryDate} helperText={errors.expiryDate} />
                )}
                minDate={new Date()}
              />
            </LocalizationProvider>
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
          Add Batch
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddBatchDialog
