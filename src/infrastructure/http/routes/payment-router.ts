import { Router } from 'express'
import { paymentController } from '../../container.js'
import { validateBody } from '../helpers/validation-helper.js'
import { subscribeSchema, createMetodoPagoSchema } from '../schemas/payment-schema.js'

const paymentRouter = Router()

paymentRouter.get('/planes', async (req, res) => await paymentController.getPlanes(req, res))
paymentRouter.get('/historial/:id_usuario', async (req, res) => await paymentController.getHistory(req, res))
paymentRouter.get('/status/:id_usuario', async (req, res) => await paymentController.getStatus(req, res))

paymentRouter.post('/metodos-pago', validateBody(createMetodoPagoSchema), async (req, res) => await paymentController.createPaymentMethod(req, res))
paymentRouter.post('/suscribir', validateBody(subscribeSchema), async (req, res) => await paymentController.subscribe(req, res))
export default paymentRouter
