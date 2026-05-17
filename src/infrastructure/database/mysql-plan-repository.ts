import type { Pool, RowDataPacket } from 'mysql2/promise'
import type { IPlanRepository } from '../../domain/repositories/IPlan.repository.js'
import type { PlanSuscripcion } from '../../domain/entities/PlanSuscripcion.js'
import { mapRowToPlan } from '../../application/mappers/payment.mappers.js'

export class MySQLPlanRepository implements IPlanRepository {
  constructor (private readonly db: Pool) {}

  async findAll (): Promise<PlanSuscripcion[]> {
    const [rows] = await this.db.execute<RowDataPacket[]>('SELECT * FROM Plan_Suscripcion')
    return rows.map(mapRowToPlan)
  }

  async findById (idPlan: number): Promise<PlanSuscripcion | null> {
    const [rows] = await this.db.execute<RowDataPacket[]>(
      'SELECT * FROM Plan_Suscripcion WHERE id_plan = ?',
      [idPlan]
    )
    return rows[0] != null ? mapRowToPlan(rows[0]) : null
  }
}
