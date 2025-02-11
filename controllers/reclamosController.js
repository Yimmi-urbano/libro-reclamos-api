const Reclamo = require("../models/Reclamo");

const generarCodigoReclamo = () => {
    return `REC-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};

exports.registrarReclamo = async (req, res) => {
    try {
        const { domain } = req.body;

        // Obtener el último código correlativo registrado para este dominio
        const ultimoReclamo = await Reclamo.findOne({ domain })
            .sort({ codigo_correlativo: -1 })
            .select('codigo_correlativo');

        const nuevoCodigoCorrelativo = ultimoReclamo ? ultimoReclamo.codigo_correlativo + 1 : 1;

        const nuevoReclamo = new Reclamo({
            ...req.body,
            codigo_reclamo: generarCodigoReclamo(),
            codigo_correlativo: nuevoCodigoCorrelativo
        });

        await nuevoReclamo.save();
        res.status(201).json({ mensaje: "Reclamo registrado exitosamente", cod_reclamo: nuevoReclamo.codigo_reclamo, num_folio: nuevoCodigoCorrelativo});

    } catch (error) {
        res.status(400).json({ mensaje: "Error al registrar el reclamo", error });
    }
};

exports.obtenerUltimoCorrelativo = async (req, res) => {
    try {
        const domain = req.headers['domain'];

        if (!domain) {
            return res.status(400).json({ mensaje: "El dominio es requerido en el encabezado" });
        }

        const ultimoReclamo = await Reclamo.findOne({ domain })
            .sort({ codigo_correlativo: -1 })
            .select('codigo_correlativo');

        const ultimoCorrelativo = ultimoReclamo ? ultimoReclamo.codigo_correlativo : 0;

        res.json({ domain, ultimoCorrelativo: ultimoCorrelativo + 1 });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener el último correlativo", error });
    }
};


exports.obtenerReclamos = async (req, res) => {
    try {
        const reclamos = await Reclamo.find();
        res.status(200).json(reclamos);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener reclamos", error });
    }
};

exports.obtenerReclamoPorId = async (req, res) => {
    try {
        const reclamo = await Reclamo.findById(req.params.id);
        if (!reclamo) return res.status(404).json({ mensaje: "Reclamo no encontrado" });
        res.status(200).json(reclamo);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener el reclamo", error });
    }
};
