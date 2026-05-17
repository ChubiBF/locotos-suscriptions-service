export interface MetodoPago {
  id_metodo: number
  id_usuario: number
  tipo_metodo: string
  proveedor?: string
  token_pago: string
  es_predeterminado: boolean
  fecha_registro: string
}
