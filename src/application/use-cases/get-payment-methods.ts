import type { IMetodoPagoRepository } from '../../domain/repositories/IMetodoPago.repository.js'
import type { MetodoPago } from '../../domain/entities/MetodoPago.js'

export class GetPaymentMethods {
  constructor (
    private readonly metodoPagoRepository: IMetodoPagoRepository
  ) {}

  async execute (idUsuario: number): Promise<MetodoPago[]> {
    if (idUsuario == null || idUsuario <= 0) {
      throw new Error('El ID de usuario proporcionado no es válido')
    }

    return await this.metodoPagoRepository.findByUsuarioId(idUsuario)
  }
}
