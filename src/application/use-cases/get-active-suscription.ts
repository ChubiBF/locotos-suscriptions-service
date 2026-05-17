import type { ISuscripcionRepository } from '../../domain/repositories/ISuscripcion.repository.js'
import type { IPlanRepository } from '../../domain/repositories/IPlan.repository.js'
import type { SuscripcionUsuario } from '../../domain/entities/SuscripcionUsuario.js'
import type { PlanSuscripcion } from '../../domain/entities/PlanSuscripcion.js'

export interface ActiveSubscriptionStatusDto {
  tiene_acceso: boolean
  suscripcion: SuscripcionUsuario | null
  detalles_plan: PlanSuscripcion | null
}

export class GetActiveSubscription {
  constructor (
    private readonly suscripcionRepository: ISuscripcionRepository,
    private readonly planRepository: IPlanRepository
  ) {}

  async execute (idUsuario: number): Promise<ActiveSubscriptionStatusDto> {
    if (idUsuario == null || idUsuario <= 0) {
      throw new Error('El ID de usuario proporcionado no es válido')
    }

    const suscripcion = await this.suscripcionRepository.findActiveByUsuarioId(idUsuario)

    if (suscripcion == null) {
      return {
        tiene_acceso: false,
        suscripcion: null,
        detalles_plan: null
      }
    }

    const plan = await this.planRepository.findById(suscripcion.id_plan)

    return {
      tiene_acceso: true,
      suscripcion,
      detalles_plan: plan
    }
  }
}
