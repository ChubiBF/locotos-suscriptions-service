import type { ISuscripcionRepository } from '../../domain/repositories/ISuscripcion.repository.js'

export class CancelSubscription {
  constructor (private readonly suscripcionRepository: ISuscripcionRepository) {}

  async execute (idUsuario: number): Promise<void> {
    const suscripcion = await this.suscripcionRepository.findActiveByUsuarioId(idUsuario)
    if (suscripcion == null) {
      throw new Error('No se encontró una suscripción activa para este usuario')
    }

    await this.suscripcionRepository.updateEstado(suscripcion.id_suscripcion, 'cancelado')
  }
}
