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
  Snackbar,
  Alert,
} from "@mui/material"

const AddUserDialog = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    statut: "",
    role: "",
  })

  const [errors, setErrors] = useState({})
  const [successOpen, setSuccessOpen] = useState(false) // State for Snackbar

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" })
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.username.trim()) newErrors.username = "Username is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }
    if (!formData.statut.trim()) {
      newErrors.statut = "Statut is required"
    }
    if (!formData.role) newErrors.role = "Role is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      fetch("http://localhost:2000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => {
          if (!res.ok) throw new Error(`Failed to add user: ${res.status}`)
          return res.text()
        })
        .then((data) => {
          console.log("User added:", data)
          setFormData({
            username: "",
            email: "",
            password: "",
            statut: "",
            role: "",
          })
          setSuccessOpen(true) // Show success Snackbar
          onClose()
        })
        .catch((err) => {
          console.error("Error adding user:", err)
        })
    }
  }

  const handleCloseSnackbar = () => {
    setSuccessOpen(false)
  }

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                name="username"
                label="Username"
                fullWidth
                value={formData.username}
                onChange={handleChange}
                error={!!errors.username}
                helperText={errors.username}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                label="Email Address"
                type="email"
                fullWidth
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="statut"
                label="Statut"
                fullWidth
                value={formData.statut}
                onChange={handleChange}
                error={!!errors.statut}
                helperText={errors.statut}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.role}>
                <InputLabel>Role</InputLabel>
                <Select name="role" value={formData.role} label="Role" onChange={handleChange}>
                  <MenuItem value="RESPONSABLE">Responsable</MenuItem>
                  <MenuItem value="PHARMACIEN">Pharmacien</MenuItem>
                </Select>
                {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                label="Password"
                type="password"
                fullWidth
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Add User
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar
        open={successOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
          User added successfully!
        </Alert>
      </Snackbar>
    </>
  )
}

export default AddUserDialog
