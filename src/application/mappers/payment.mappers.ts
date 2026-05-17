import type { RowDataPacket } from 'mysql2/promise'
import { PlanSuscripcion } from '../../domain/entities/PlanSuscripcion.js'
import { SuscripcionUsuario, EstadoSuscripcion } from '../../domain/entities/SuscripcionUsuario.js'
import { MetodoPago } from '../../domain/entities/MetodoPago.js'

export function mapRowToPlan (row: RowDataPacket): PlanSuscripcion {
  return {
    id_plan: row.id_plan,
    nombre_plan: row.nombre_plan,
    precio: Number(row.precio),
    max_pantallas: row.max_pantallas,
    calidad_video: row.calidad_video,
    descripcion: row.descripcion
  }
}

export function mapRowToSuscripcion (row: RowDataPacket): SuscripcionUsuario {
  return {
    id_suscripcion: row.id_suscripcion,
    id_usuario: row.id_usuario,
    id_plan: row.id_plan,
    fecha_inicio: row.fecha_inicio.toISOString(),
    fecha_fin: row.fecha_fin != null ? row.fecha_fin.toISOString() : undefined,
    estado: row.estado as EstadoSuscripcion,
    renovacion_automatica: Boolean(row.renovacion_automatica)
  }
}

export function mapRowToMetodoPago (row: RowDataPacket): MetodoPago {
  return {
    id_metodo: row.id_metodo,
    id_usuario: row.id_usuario,
    tipo_metodo: row.tipo_metodo,
    proveedor: row.proveedor,
    token_pago: row.token_pago,
    es_predeterminado: Boolean(row.es_predeterminado),
    fecha_registro: row.fecha_registro.toISOString()
  }
}
