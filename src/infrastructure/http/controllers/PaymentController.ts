import type { Request, Response } from 'express'
import type { SubscribeUser } from '../../../application/use-cases/subscribe-user.js'
import type { GetAvailablePlans } from '../../../application/use-cases/get-available-plans.js'
import { RegisterPaymentMethod } from '../../../application/use-cases/register-payment-method.js'
import { GetBillingHistory } from '../../../application/use-cases/get-billing-history.js'
import { GetActiveSubscription } from '../../../application/use-cases/get-active-suscription.js'
import { CancelSubscription } from '../../../application/use-cases/cancel-suscription.js'
import { ToggleAutoRenewal } from '../../../application/use-cases/toggle-auto-renewal.js'
import { GetPaymentMethods } from '../../../application/use-cases/get-payment-methods.js'

export class PaymentController {
  constructor (
    private readonly subscribeUser: SubscribeUser,
    private readonly getAvailablePlans: GetAvailablePlans,
    private readonly registerPaymentMethod: RegisterPaymentMethod,
    private readonly getBillingHistory: GetBillingHistory,
    private readonly getActiveSubscription: GetActiveSubscription,
    private readonly cancelSubscription: CancelSubscription,
    private readonly toggleAutoRenewal: ToggleAutoRenewal,
    private readonly getPaymentMethods: GetPaymentMethods
  ) {}

  async getStatus (req: Request, res: Response): Promise<void> {
    try {
      const idUsuario = Number(req.params.id_usuario)
      const estadoSuscripcion = await this.getActiveSubscription.execute(idUsuario)

      res.status(200).json(estadoSuscripcion)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }

  async getPlanes (_req: Request, res: Response): Promise<void> {
    try {
      const planes = await this.getAvailablePlans.execute()
      res.status(200).json(planes)
    } catch (error: unknown) {
      const message = error instanceof Error && error.message.length > 0
        ? error.message
        : 'Error interno al obtener los planes'
      res.status(500).json({ error: message })
    }
  }

  async getMethods (req: Request, res: Response): Promise<void> {
    try {
      const idUsuario = Number(req.params.id_usuario)
      const metodos = await this.getPaymentMethods.execute(idUsuario)

      res.status(200).json(metodos)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }

  async createPaymentMethod (req: Request, res: Response): Promise<void> {
    try {
      const nuevoMetodo = await this.registerPaymentMethod.execute(req.body)
      res.status(201).json({
        message: 'Método de pago registrado (Simulado)',
        metodo_pago: nuevoMetodo
      })
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }

  async subscribe (req: Request, res: Response): Promise<void> {
    try {
      const nuevaSuscripcion = await this.subscribeUser.execute(req.body)
      res.status(201).json({
        message: 'Suscripción activada con éxito',
        suscripcion: nuevaSuscripcion
      })
    } catch (error: unknown) {
      const message = error instanceof Error && error.message.length > 0
        ? error.message
        : 'Error al procesar la suscripción'
      res.status(400).json({ error: message })
    }
  }

  async cancel (req: Request, res: Response): Promise<void> {
    try {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { id_usuario } = req.body
      await this.cancelSubscription.execute(Number(id_usuario))
      res.status(200).json({ message: 'Suscripción cancelada inmediatamente de forma exitosa' })
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }

  async toggleRenewal (req: Request, res: Response): Promise<void> {
    try {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { id_usuario } = req.body
      const estadoFinal = await this.toggleAutoRenewal.execute(Number(id_usuario))
      res.status(200).json({
        message: 'Preferencia de renovación automática actualizada',
        renovacion_automatica: estadoFinal
      })
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }

  async getHistory (req: Request, res: Response): Promise<void> {
    try {
      const idUsuario = Number(req.params.id_usuario)
      const historial = await this.getBillingHistory.execute(idUsuario)

      res.status(200).json(historial)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }
}
