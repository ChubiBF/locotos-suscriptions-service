import type { Pool, RowDataPacket, ResultSetHeader } from 'mysql2/promise'
import { ISuscripcionRepository } from '../../domain/repositories/ISuscripcion.repository.js'
import type { SuscripcionUsuario } from '../../domain/entities/SuscripcionUsuario.js'
import { mapRowToSuscripcion } from '../../application/mappers/payment.mappers.js'
import { formatMySQLDate } from './sql-help/formatSqlDate.js'

export class MySQLSuscripcionRepository implements ISuscripcionRepository {
  constructor (private readonly db: Pool) {}

  async save (s: Omit<SuscripcionUsuario, 'id_suscripcion'>): Promise<SuscripcionUsuario> {
    const query = `INSERT INTO Suscripcion_Usuario 
      (id_usuario, id_plan, fecha_inicio, fecha_fin, estado, renovacion_automatica) 
      VALUES (?, ?, ?, ?, ?, ?)`

    const [result] = await this.db.execute<ResultSetHeader>(query, [
      s.id_usuario,
      s.id_plan,
      formatMySQLDate(s.fecha_inicio),
      formatMySQLDate(s.fecha_fin ?? ''),
      s.estado,
      s.renovacion_automatica
    ])

    return { ...s, id_suscripcion: result.insertId }
  }

  async findActiveByUsuarioId (idUsuario: number): Promise<SuscripcionUsuario | null> {
    const [rows] = await this.db.execute<RowDataPacket[]>(
      'SELECT * FROM Suscripcion_Usuario WHERE id_usuario = ? AND estado = "activo"',
      [idUsuario]
    )
    return rows[0] != null ? mapRowToSuscripcion(rows[0]) : null
  }

  async updateEstado (id: number, nuevoEstado: string): Promise<void> {
    await this.db.execute(
      'UPDATE Suscripcion_Usuario SET estado = ? WHERE id_suscripcion = ?',
      [nuevoEstado, id]
    )
  }

  async updateRenovacion (id: number, renovacion: boolean): Promise<void> {
    await this.db.execute(
      'UPDATE Suscripcion_Usuario SET renovacion_automatica = ? WHERE id_suscripcion = ?',
      [renovacion ? 1 : 0, id]
    )
  }
}
