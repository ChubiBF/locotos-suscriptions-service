import { SuscripcionUsuario } from '../entities/SuscripcionUsuario.js'

export interface ISuscripcionRepository {
  save: (suscripcion: Omit<SuscripcionUsuario, 'id_suscripcion'>) => Promise<SuscripcionUsuario>
  findActiveByUsuarioId: (idUsuario: number) => Promise<SuscripcionUsuario | null>
  updateEstado: (idSuscripcion: number, nuevoEstado: string) => Promise<void>
  updateRenovacion: (idSuscripcion: number, renovacion: boolean) => Promise<void>
}
