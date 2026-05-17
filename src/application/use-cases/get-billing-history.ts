import type { IPagoRepository } from '../../domain/repositories/IPago.repository.js'
import type { Pago } from '../../domain/entities/Pago.js'

export class GetBillingHistory {
  constructor (
    private readonly pagoRepository: IPagoRepository
  ) {}

  async execute (idUsuario: number): Promise<Pago[]> {
    if (idUsuario == null || idUsuario <= 0) {
      throw new Error('El ID de usuario proporcionado no es válido')
    }

    return await this.pagoRepository.findAllByUsuarioId(idUsuario)
  }
}
