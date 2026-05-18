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
    const NOTIFICATION_API_URL = process.env.NOTIFICATION_API_URL ?? 'http://localhost:3003/notifications'

    try {
      await fetch(NOTIFICATION_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_usuario: idUsuario,
          mensaje: nuevoEstadoRenovacion ? 'se activo la renovacion automatica' : 'se desactivo la renovacion automatica',
          tipo: 'pago'
        })
      })
    } catch (e) {
      console.log('error: ', e)
    }

    return nuevoEstadoRenovacion
  }
}
