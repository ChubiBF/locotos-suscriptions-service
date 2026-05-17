import { Pago } from '../entities/Pago.js'

export interface IPagoRepository {
  save: (pago: Omit<Pago, 'id_pago' | 'fecha_pago'>) => Promise<Pago>
  findAllByUsuarioId: (idUsuario: number) => Promise<Pago[]>
}
