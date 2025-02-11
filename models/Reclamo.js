const mongoose = require('mongoose');

const ReclamoSchema = new mongoose.Schema({
    domain: { type: String, required: true },
    codigo_reclamo: { type: String, required: true, unique: true },
    codigo_correlativo: { type: Number, required: true },
    tipo_consumidor: { type: String, required: true },
    ruc: { type: String },
    razon_social: { type: String },
    nombres_completos: { type: String, required: true },
    apellido_paterno: { type: String, required: true },
    apellido_materno: { type: String, required: true },
    menor_edad: { type: Boolean, required: true },
    nombre_apoderado: { type: String },
    tipo_doc: { type: String, required: true },
    num_doc: { type: String, required: true },
    telf_fijo: { type: String, required: true },
    celular: { type: String, required: true },
    correo: { type: String, required: true },
    direccion: { type: String, required: true },
    departamento: { type: String, required: true },
    provincia: { type: String, required: true },
    distrito: { type: String, required: true },
    tipo_servicio: { type: String, required: true },
    tipo_moneda: { type: String, required: true },
    monto: { type: Number, required: true },
    descripcion: { type: String },
    reclamo_detalle: { type: String, required: true },
    detalle_reclamo: { type: String},
    detalle_pedido: { type: String},
    observaciones: { type: String },
    acepta_term: { type: Boolean, required: true }
}, { timestamps: true, versionKey: false });

ReclamoSchema.index({ domain: 1, codigo_correlativo: 1 }, { unique: true });

const Reclamo = mongoose.model('claim_books', ReclamoSchema);
module.exports = Reclamo;
