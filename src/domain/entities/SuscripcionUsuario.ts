export enum EstadoSuscripcion {
  ACTIVO = 'activo',
  CANCELADO = 'cancelado',
  EXPIRADO = 'expirado',
  PENDIENTE = 'pendiente'
}

export interface SuscripcionUsuario {
  id_suscripcion: number
  id_usuario: number // fk
  id_plan: number
  fecha_inicio: string
  fecha_fin?: string
  estado: EstadoSuscripcion
  renovacion_automatica: boolean
}
