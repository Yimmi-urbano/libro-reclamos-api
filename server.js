const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const reclamosRoutes = require("./routes/reclamosRoutes");
require("dotenv").config();

const app = express();
connectDB();

// Habilitar CORS
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use("/api/reclamos", reclamosRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
