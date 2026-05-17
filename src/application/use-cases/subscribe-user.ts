import type { ISuscripcionRepository } from '../../domain/repositories/ISuscripcion.repository.js'
import type { IPlanRepository } from '../../domain/repositories/IPlan.repository.js'
import type { IPagoRepository } from '../../domain/repositories/IPago.repository.js'
import { EstadoSuscripcion, type SuscripcionUsuario } from '../../domain/entities/SuscripcionUsuario.js'
import type { SubscribeInputDto } from '../dtos/suscripcion.dto.js'
import { EstadoTransaccion } from '../../domain/entities/Pago.js'

export class SubscribeUser {
  constructor (
    private readonly planRepository: IPlanRepository,
    private readonly suscripcionRepository: ISuscripcionRepository,
    private readonly pagoRepository: IPagoRepository
  ) {}

  async execute (data: SubscribeInputDto): Promise<SuscripcionUsuario> {
    const plan = await this.planRepository.findById(data.id_plan)
    if (plan == null) throw new Error('El plan de suscripción seleccionado no existe')

    const existente = await this.suscripcionRepository.findActiveByUsuarioId(data.id_usuario)
    if (existente != null) throw new Error('El usuario ya cuenta con una suscripción activa')

    const transactionId = `SIM-${Math.floor(Math.random() * 1000000)}`
    const fechaInicio = new Date()
    const fechaFin = new Date()
    fechaFin.setDate(fechaInicio.getDate() + 30)

    const nuevaSuscripcion = await this.suscripcionRepository.save({
      id_usuario: data.id_usuario,
      id_plan: data.id_plan,
      fecha_inicio: fechaInicio.toISOString(),
      fecha_fin: fechaFin.toISOString(),
      estado: EstadoSuscripcion.ACTIVO,
      renovacion_automatica: true
    })

    await this.pagoRepository.save({
      id_usuario: data.id_usuario,
      id_suscripcion: nuevaSuscripcion.id_suscripcion,
      id_metodo: data.id_metodo_pago,
      monto: plan.precio,
      moneda: 'BOB',
      estado_transaccion: EstadoTransaccion.EXITOSO,
      codigo_transaccion_externo: transactionId
    })

    return nuevaSuscripcion
  }
}
