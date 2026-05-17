import type { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise'
import type { IMetodoPagoRepository } from '../../domain/repositories/IMetodoPago.repository.js'
import type { MetodoPago } from '../../domain/entities/MetodoPago.js'
import { mapRowToMetodoPago } from '../../application/mappers/payment.mappers.js'

export class MySQLMetodoPagoRepository implements IMetodoPagoRepository {
  constructor (private readonly db: Pool) {}

  async save (m: Omit<MetodoPago, 'id_metodo' | 'fecha_registro'>): Promise<MetodoPago> {
    const query = `INSERT INTO Metodo_Pago 
      (id_usuario, tipo_metodo, proveedor, token_pago, es_predeterminado) 
      VALUES (?, ?, ?, ?, ?)`
    const params = [
      m.id_usuario, m.tipo_metodo, m.proveedor, m.token_pago, m.es_predeterminado
    ]
    const [result] = await this.db.execute<ResultSetHeader>(query, params)

    return {
      ...m,
      id_metodo: result.insertId,
      fecha_registro: new Date().toISOString()
    }
  }

  async findByUsuarioId (idUsuario: number): Promise<MetodoPago[]> {
    const [rows] = await this.db.execute<RowDataPacket[]>(
      'SELECT * FROM Metodo_Pago WHERE id_usuario = ?',
      [idUsuario]
    )
    return rows.map(mapRowToMetodoPago)
  }
}
