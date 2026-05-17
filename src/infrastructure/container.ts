import { pool } from './database/mysql-config.js'

import { MySQLPlanRepository } from './database/mysql-plan-repository.js'
import { MySQLSuscripcionRepository } from './database/mysql-suscripciones.repository.js'
import { MySQLPagoRepository } from './database/mysql-pago.repository.js'

import { SubscribeUser } from '../application/use-cases/subscribe-user.js'
import { GetAvailablePlans } from '../application/use-cases/get-available-plans.js'

import { PaymentController } from './http/controllers/PaymentController.js'

import { MySQLMetodoPagoRepository } from './database/mysql-metodo-pago.repository.js'
import { RegisterPaymentMethod } from '../application/use-cases/register-payment-method.js'
import { GetBillingHistory } from '../application/use-cases/get-billing-history.js'
import { GetActiveSubscription } from '../application/use-cases/get-active-suscription.js'

const planRepository = new MySQLPlanRepository(pool)
const pagoRepository = new MySQLPagoRepository(pool)
const suscripcionRepository = new MySQLSuscripcionRepository(pool)

// use cases
const subscribeUser = new SubscribeUser(planRepository, suscripcionRepository, pagoRepository)

const getAvailablePlans = new GetAvailablePlans(planRepository)

const metodoPagoRepository = new MySQLMetodoPagoRepository(pool)

const registerPaymentMethod = new RegisterPaymentMethod(metodoPagoRepository)

const getBillingHistory = new GetBillingHistory(pagoRepository)

const getActiveSubscription = new GetActiveSubscription(suscripcionRepository, planRepository)

export const paymentController = new PaymentController(
  subscribeUser,
  getAvailablePlans,
  registerPaymentMethod,
  getBillingHistory,
  getActiveSubscription
)
