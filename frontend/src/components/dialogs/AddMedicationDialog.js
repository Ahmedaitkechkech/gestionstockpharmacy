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

const AddMedicationDialog = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    strength: "",
    form: "",
    stock: "",
    threshold: "",
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

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.category) newErrors.category = "Category is required"
    if (!formData.strength.trim()) newErrors.strength = "Strength is required"
    if (!formData.form) newErrors.form = "Form is required"

    if (!formData.stock) {
      newErrors.stock = "Stock is required"
    } else if (isNaN(formData.stock) || Number.parseInt(formData.stock) < 0) {
      newErrors.stock = "Stock must be a positive number"
    }

    if (!formData.threshold) {
      newErrors.threshold = "Threshold is required"
    } else if (isNaN(formData.threshold) || Number.parseInt(formData.threshold) < 0) {
      newErrors.threshold = "Threshold must be a positive number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      // Here you would typically send the data to your API
      console.log("Submitting medication:", formData)
      // Reset form and close dialog
      setFormData({
        name: "",
        category: "",
        strength: "",
        form: "",
        stock: "",
        threshold: "",
      })
      onClose()
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Medication</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              name="name"
              label="Medication Name"
              fullWidth
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.category}>
              <InputLabel>Category</InputLabel>
              <Select name="category" value={formData.category} label="Category" onChange={handleChange}>
                <MenuItem value="Analgesic">Analgesic</MenuItem>
                <MenuItem value="Antibiotic">Antibiotic</MenuItem>
                <MenuItem value="NSAID">NSAID</MenuItem>
                <MenuItem value="PPI">PPI</MenuItem>
                <MenuItem value="Antidiabetic">Antidiabetic</MenuItem>
                <MenuItem value="Statin">Statin</MenuItem>
                <MenuItem value="Bronchodilator">Bronchodilator</MenuItem>
                <MenuItem value="Benzodiazepine">Benzodiazepine</MenuItem>
                <MenuItem value="SSRI">SSRI</MenuItem>
                <MenuItem value="Calcium Channel Blocker">Calcium Channel Blocker</MenuItem>
              </Select>
              {errors.category && <FormHelperText>{errors.category}</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="strength"
              label="Strength (e.g., 500mg)"
              fullWidth
              value={formData.strength}
              onChange={handleChange}
              error={!!errors.strength}
              helperText={errors.strength}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.form}>
              <InputLabel>Form</InputLabel>
              <Select name="form" value={formData.form} label="Form" onChange={handleChange}>
                <MenuItem value="Tablet">Tablet</MenuItem>
                <MenuItem value="Capsule">Capsule</MenuItem>
                <MenuItem value="Liquid">Liquid</MenuItem>
                <MenuItem value="Cream">Cream</MenuItem>
                <MenuItem value="Ointment">Ointment</MenuItem>
                <MenuItem value="Inhaler">Inhaler</MenuItem>
                <MenuItem value="Injection">Injection</MenuItem>
                <MenuItem value="Patch">Patch</MenuItem>
                <MenuItem value="Suppository">Suppository</MenuItem>
              </Select>
              {errors.form && <FormHelperText>{errors.form}</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="stock"
              label="Initial Stock"
              type="number"
              fullWidth
              value={formData.stock}
              onChange={handleChange}
              error={!!errors.stock}
              helperText={errors.stock}
              inputProps={{ min: 0 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="threshold"
              label="Low Stock Threshold"
              type="number"
              fullWidth
              value={formData.threshold}
              onChange={handleChange}
              error={!!errors.threshold}
              helperText={errors.threshold}
              inputProps={{ min: 0 }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Add Medication
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddMedicationDialog
