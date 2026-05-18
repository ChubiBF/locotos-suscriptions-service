import type { ISuscripcionRepository } from '../../domain/repositories/ISuscripcion.repository.js'

export class CancelSubscription {
  constructor (private readonly suscripcionRepository: ISuscripcionRepository) {}

  async execute (idUsuario: number): Promise<void> {
    const suscripcion = await this.suscripcionRepository.findActiveByUsuarioId(idUsuario)
    if (suscripcion == null) {
      throw new Error('No se encontró una suscripción activa para este usuario')
    }

    const NOTIFICATION_API_URL = process.env.NOTIFICATION_API_URL ?? 'http://localhost:3003/notifications'

    try {
      await fetch(NOTIFICATION_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_usuario: idUsuario,
          mensaje: 'se cancelo la suscripcion completamente',
          tipo: 'pago'
        })
      })
    } catch (e) {
      console.log('error: ', e)
    }

    await this.suscripcionRepository.updateEstado(suscripcion.id_suscripcion, 'cancelado')
  }
}
