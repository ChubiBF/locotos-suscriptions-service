import { z } from 'zod'
import { requiredOrFilled } from './other-validationts.js'

export const subscribeSchema = z.object({
  id_usuario: z.number({ error: requiredOrFilled }).int().positive(),
  id_plan: z.number({ error: requiredOrFilled })
    .int()
    .min(1, 'El ID de plan mínimo es 1')
    .max(3, 'El ID de plan máximo es 3'),

  id_metodo_pago: z.number({ error: requiredOrFilled }).int().positive()
})

export const createMetodoPagoSchema = z.object({
  id_usuario: z.number({ error: requiredOrFilled }).int().positive(),
  tipo_metodo: z.string({ error: requiredOrFilled }).min(2),
  proveedor: z.string().optional()
})
