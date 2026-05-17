import { MetodoPago } from '../entities/MetodoPago.js'

export interface IMetodoPagoRepository {
  save: (metodo: Omit<MetodoPago, 'id_metodo' | 'fecha_registro'>) => Promise<MetodoPago>
  findByUsuarioId: (idUsuario: number) => Promise<MetodoPago[]>
}
