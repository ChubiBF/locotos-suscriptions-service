import { Router } from 'express'
import { paymentController } from '../../container.js'
import { validateBody } from '../helpers/validation-helper.js'
import { subscribeSchema, createMetodoPagoSchema, userActionSchema } from '../schemas/payment-schema.js'

const paymentRouter = Router()

paymentRouter.get('/status/:id_usuario', async (req, res) => await paymentController.getStatus(req, res))
paymentRouter.get('/planes', async (req, res) => await paymentController.getPlanes(req, res))
paymentRouter.get('/historial/:id_usuario', async (req, res) => await paymentController.getHistory(req, res))
paymentRouter.get('/metodos-pago/:id_usuario', async (req, res) => await paymentController.getMethods(req, res))

paymentRouter.post('/metodos-pago', validateBody(createMetodoPagoSchema), async (req, res) => await paymentController.createPaymentMethod(req, res))
paymentRouter.post('/suscribir', validateBody(subscribeSchema), async (req, res) => await paymentController.subscribe(req, res))
paymentRouter.post('/alternar-renovacion', validateBody(userActionSchema), async (req, res) => await paymentController.toggleRenewal(req, res))
paymentRouter.post('/cancelar', validateBody(userActionSchema), async (req, res) => await paymentController.cancel(req, res))

export default paymentRouter
