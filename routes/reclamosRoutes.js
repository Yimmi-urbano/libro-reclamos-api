const express = require("express");
const router = express.Router();
const { registrarReclamo, obtenerReclamos, obtenerReclamoPorId, obtenerUltimoCorrelativo } = require("../controllers/reclamosController");
const validateReclamo = require("../middlewares/validateReclamo");

router.post("/", validateReclamo, registrarReclamo);
router.get("/", obtenerReclamos);
router.get('/ultimo-correlativo', obtenerUltimoCorrelativo);
router.get("/:id", obtenerReclamoPorId);


module.exports = router;
