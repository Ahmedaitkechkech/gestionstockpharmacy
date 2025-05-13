import React from "react"
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Chip,
} from "@mui/material"
import {
  ArrowUpward,
  Medication as MedicationIcon,
  Inventory as InventoryIcon,
  People as PeopleIcon,
  Warning as WarningIcon,
  Circle as CircleIcon,
} from "@mui/icons-material"
import { Link } from "react-router-dom"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Sample data for the chart
const data = [
  { name: "Jan", total: 1200 },
  { name: "Feb", total: 1900 },
  { name: "Mar", total: 1500 },
  { name: "Apr", total: 1700 },
  { name: "May", total: 2200 },
  { name: "Jun", total: 2500 },
  { name: "Jul", total: 2000 },
  { name: "Aug", total: 2400 },
  { name: "Sep", total: 2800 },
  { name: "Oct", total: 3000 },
  { name: "Nov", total: 2700 },
  { name: "Dec", total: 3200 },
]

// Sample data for recent activities
const activities = [
  {
    user: "John Doe",
    action: "added new medication",
    item: "Paracetamol 500mg",
    time: "2 minutes ago",
    avatar: "JD",
  },
  {
    user: "Sarah Smith",
    action: "updated batch",
    item: "Amoxicillin #1023",
    time: "15 minutes ago",
    avatar: "SS",
  },
  {
    user: "Mike Johnson",
    action: "deleted medication",
    item: "Aspirin 100mg",
    time: "1 hour ago",
    avatar: "MJ",
  },
  {
    user: "Emily Davis",
    action: "added new batch",
    item: "Ibuprofen #2045",
    time: "3 hours ago",
    avatar: "ED",
  },
  {
    user: "Admin",
    action: "added new user",
    item: "Robert Wilson",
    time: "5 hours ago",
    avatar: "AD",
  },
]

// Sample data for low stock items
const lowStockItems = [
  {
    name: "Paracetamol 500mg",
    category: "Analgesic",
    stock: 15,
    threshold: 20,
    status: "Low",
  },
  {
    name: "Amoxicillin 250mg",
    category: "Antibiotic",
    stock: 8,
    threshold: 25,
    status: "Critical",
  },
  {
    name: "Ibuprofen 400mg",
    category: "NSAID",
    stock: 12,
    threshold: 30,
    status: "Critical",
  },
  {
    name: "Omeprazole 20mg",
    category: "PPI",
    stock: 18,
    threshold: 20,
    status: "Low",
  },
  {
    name: "Metformin 500mg",
    category: "Antidiabetic",
    stock: 5,
    threshold: 15,
    status: "Critical",
  },
]

const Dashboard = () => {
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Dashboard
        </Typography>
        <Button variant="contained" startIcon={<ArrowUpward />}>
          Export Report
        </Button>
      </Box>

      {/* Stat Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={1} sx={{ p: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Total Medications
              </Typography>
              <MedicationIcon color="action" />
            </Box>
            <Typography variant="h4" component="div" fontWeight="bold">
              245
            </Typography>
            <Typography variant="caption" color="text.secondary">
              +12 from last month
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={1} sx={{ p: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Total Batches
              </Typography>
              <InventoryIcon color="action" />
            </Box>
            <Typography variant="h4" component="div" fontWeight="bold">
              1,203
            </Typography>
            <Typography variant="caption" color="text.secondary">
              +43 from last month
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={1} sx={{ p: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Active Users
              </Typography>
              <PeopleIcon color="action" />
            </Box>
            <Typography variant="h4" component="div" fontWeight="bold">
              12
            </Typography>
            <Typography variant="caption" color="text.secondary">
              +2 from last month
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={1} sx={{ p: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Expiring Soon
              </Typography>
              <WarningIcon color="action" />
            </Box>
            <Typography variant="h4" component="div" fontWeight="bold">
              24
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Expiring in 30 days
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Charts and Recent Activity */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader title="Stock Overview" subheader="Medication stock levels over the past 30 days" />
            <CardContent sx={{ height: 350 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="total" fill="#16a34a" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <CardHeader title="Recent Activity" subheader="Latest activities in the system" />
            <CardContent sx={{ flexGrow: 1, overflow: "auto" }}>
              <List sx={{ width: "100%" }}>
                {activities.map((activity, index) => (
                  <ListItem key={index} alignItems="flex-start" sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar>{activity.avatar}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={activity.user}
                      secondary={
                        <React.Fragment>
                          <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.primary">
                            {activity.action}:
                          </Typography>
                          {` ${activity.item}`}
                          <Typography variant="caption" display="block" color="text.secondary">
                            {activity.time}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
            <CardActions>
              <Button component={Link} to="/logs" size="small" color="primary">
                View all activity logs
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      {/* Low Stock and Expiring Batches */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader title="Low Stock Items" subheader="Medications that need to be restocked" />
            <CardContent>
              <List>
                {lowStockItems.map((item, index) => (
                  <ListItem
                    key={index}
                    secondaryAction={
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography variant="body2">
                          {item.stock}/{item.threshold}
                        </Typography>
                        <Chip
                          label={item.status}
                          color={item.status === "Critical" ? "error" : "default"}
                          variant={item.status === "Critical" ? "filled" : "outlined"}
                          size="small"
                        />
                      </Box>
                    }
                  >
                    <ListItemText primary={item.name} secondary={item.category} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
            <CardActions>
              <Button component={Link} to="/medications" size="small" color="primary">
                View all medications
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <CardHeader title="Expiring Batches" subheader="Batches expiring in the next 90 days" />
            <CardContent sx={{ flexGrow: 1 }}>
              <List>
                {[1, 2, 3, 4, 5].map((i) => (
                  <ListItem key={i}>
                    <CircleIcon sx={{ color: "error.main", mr: 1, fontSize: 10 }} />
                    <ListItemText
                      primary={`Amoxicillin 500mg - Batch #${1000 + i}`}
                      secondary={`Expires in ${i * 5} days`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
            <CardActions>
              <Button component={Link} to="/batches" size="small" color="primary">
                View all batches
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard
