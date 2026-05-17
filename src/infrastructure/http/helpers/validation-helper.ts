import type { Request, Response, NextFunction } from 'express'
import { z } from 'zod'

export function validateBody (schema: z.ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body)

    if (!result.success) {
      return res.status(400).json({
        error: 'Validación fallida',
        details: result.error.issues.map(issue => ({
          campo: issue.path.join('.'),
          mensaje: issue.message
        }))
      })
    }

    req.body = result.data
    next()
  }
}
