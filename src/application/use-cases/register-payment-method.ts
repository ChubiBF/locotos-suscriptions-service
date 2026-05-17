import type { IMetodoPagoRepository } from '../../domain/repositories/IMetodoPago.repository.js'
import type { MetodoPago } from '../../domain/entities/MetodoPago.js'

export interface RegisterPaymentMethodDto {
  id_usuario: number
  tipo_metodo: string
  proveedor?: string
}

export class RegisterPaymentMethod {
  constructor (private readonly metodoPagoRepository: IMetodoPagoRepository) {}

  async execute (data: RegisterPaymentMethodDto): Promise<MetodoPago> {
    const tipoLimpio = data.tipo_metodo.toLowerCase().replace(/\s+/g, '')
    const randomId = Math.floor(1000 + Math.random() * 9000)
    const fakeToken = `tok_${tipoLimpio}_${randomId}_simulated`

    return await this.metodoPagoRepository.save({
      id_usuario: data.id_usuario,
      tipo_metodo: data.tipo_metodo,
      proveedor: data.proveedor ?? 'Genérico',
      token_pago: fakeToken,
      es_predeterminado: true
    })
  }
}
