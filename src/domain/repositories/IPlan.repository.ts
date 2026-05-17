import { PlanSuscripcion } from '../entities/PlanSuscripcion.js'

export interface IPlanRepository {
  findAll: () => Promise<PlanSuscripcion[]>
  findById: (idPlan: number) => Promise<PlanSuscripcion | null>
}
