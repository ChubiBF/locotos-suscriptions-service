import { IPlanRepository } from '../../domain/repositories/IPlan.repository.js'
import type { PlanSuscripcion } from '../../domain/entities/PlanSuscripcion.js'

export class GetAvailablePlans {
  constructor (
    private readonly planRepository: IPlanRepository
  ) {}

  async execute (): Promise<PlanSuscripcion[]> {
    const planes = await this.planRepository.findAll()

    if (planes.length === 0) {
      throw new Error('No hay planes de suscripción disponibles en este momento')
    }

    return planes
  }
}
