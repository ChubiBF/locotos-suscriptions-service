import type { ISuscripcionRepository } from '../../domain/repositories/ISuscripcion.repository.js'

export class ToggleAutoRenewal {
  constructor (private readonly suscripcionRepository: ISuscripcionRepository) {}

  async execute (idUsuario: number): Promise<boolean> {
    const suscripcion = await this.suscripcionRepository.findActiveByUsuarioId(idUsuario)
    if (suscripcion == null) {
      throw new Error('No se encontró una suscripción activa para alternar la renovación')
    }

    const nuevoEstadoRenovacion = !suscripcion.renovacion_automatica

    await this.suscripcionRepository.updateRenovacion(suscripcion.id_suscripcion, nuevoEstadoRenovacion)

    return nuevoEstadoRenovacion
  }
}
