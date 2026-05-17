import type { Pool, RowDataPacket, ResultSetHeader } from 'mysql2/promise'
import type { IPagoRepository } from '../../domain/repositories/IPago.repository.js'
import type { Pago } from '../../domain/entities/Pago.js'

export class MySQLPagoRepository implements IPagoRepository {
  constructor (private readonly db: Pool) {}

  async save (p: Omit<Pago, 'id_pago' | 'fecha_pago'>): Promise<Pago> {
    const query = `INSERT INTO Pago 
      (id_usuario, id_suscripcion, id_metodo, monto, moneda, estado_transaccion, codigo_transaccion_externo) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`

    const [result] = await this.db.execute<ResultSetHeader>(query, [
      p.id_usuario, p.id_suscripcion, p.id_metodo, p.monto, p.moneda,
      p.estado_transaccion, p.codigo_transaccion_externo
    ])

    return { ...p, id_pago: result.insertId, fecha_pago: new Date().toISOString() }
  }

  async findAllByUsuarioId (idUsuario: number): Promise<Pago[]> {
    const [rows] = await this.db.execute<RowDataPacket[]>(
      'SELECT * FROM Pago WHERE id_usuario = ? ORDER BY fecha_pago DESC',
      [idUsuario]
    )
    return rows as Pago[]
  }
}
