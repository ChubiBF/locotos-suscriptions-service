export enum EstadoTransaccion {
  EXITOSO = 'exitoso',
  FALLIDO = 'fallido',
  REEMBOLSADO = 'reembolsado'
}
export interface Pago {
  id_pago: number
  id_usuario: number
  id_suscripcion: number
  id_metodo: number
  monto: number
  moneda: string
  fecha_pago: string
  estado_transaccion: EstadoTransaccion
  codigo_transaccion_externo: string
}
