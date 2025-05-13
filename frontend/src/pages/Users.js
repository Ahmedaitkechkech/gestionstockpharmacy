import { useState, useEffect } from "react"
import { Chip } from "@mui/material"
import AddUserDialog from "../components/dialogs/AddUserDialog"
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
  AdminPanelSettings as AdminPanelSettingsIcon,
} from "@mui/icons-material"

const Users = () => {
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [openAddDialog, setOpenAddDialog] = useState(false)

  useEffect(() => {
    fetch("http://localhost:2000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users", err))
  }, [])

  const roles = ["all", ...new Set(users.map((user) => user.role))]

  const filteredUsers = users.filter((user) => {
    const username = user.username || ""
    const email = user.email || ""
    const id = user.id?.toString() || ""

    const matchesSearch =
      username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      id.includes(searchTerm)

    const matchesRole = roleFilter === "all" || user.role === roleFilter

    return matchesSearch && matchesRole
  })

  const handleOpenMenu = (event, user) => {
    setAnchorEl(event.currentTarget)
    setSelectedUser(user)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true)
  }

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false)
  }

  const renderStatusChip = (status) => {
    if (status === "Active") {
      return <Chip label="Active" color="success" size="small" />
    } else if (status === "Inactive") {
      return <Chip label="Inactive" color="error" size="small" />
    } else {
      return <Chip label="Unknown" color="default" size="small" />
    }
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Users
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenAddDialog}>
          Add User
        </Button>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Search users..."
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="role-filter-label">Role</InputLabel>
              <Select
                labelId="role-filter-label"
                id="role-filter"
                value={roleFilter}
                label="Role"
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                {roles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role === "all" ? "All Roles" : role}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Users Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="users table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{renderStatusChip(user.statut)}</TableCell> {/* Render the status as Chip */}
                  <TableCell align="right">
                    <IconButton
                      aria-label="more"
                      aria-controls="user-menu"
                      aria-haspopup="true"
                      onClick={(e) => handleOpenMenu(e, user)}
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
      <Menu id="user-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleCloseMenu}>
        <MenuItem onClick={handleCloseMenu}>
          <VisibilityIcon fontSize="small" sx={{ mr: 1 }} />
          View profile
        </MenuItem>
        <MenuItem onClick={handleCloseMenu}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Edit user
        </MenuItem>
        <MenuItem onClick={handleCloseMenu}>
          <AdminPanelSettingsIcon fontSize="small" sx={{ mr: 1 }} />
          Manage permissions
        </MenuItem>
        <MenuItem onClick={handleCloseMenu} sx={{ color: "error.main" }}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Delete user
        </MenuItem>
      </Menu>

      <AddUserDialog open={openAddDialog} onClose={handleCloseAddDialog} />
    </Box>
  )
}

export default Users
