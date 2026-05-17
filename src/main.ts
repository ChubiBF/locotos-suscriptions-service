import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import paymentRouter from './infrastructure/http/routes/payment-router.js'
const PORT = process.env.PORT ?? 3001

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/suscriptions', paymentRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'no hay ninguna ruta con esa url' })
})

app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  const message = error instanceof Error && error.message.length > 0
    ? error.message
    : 'Error interno del servidor'
  console.error('Unhandled error:', error)
  res.status(500).json({ error: message })
})

app.listen(PORT, () => {
  console.log(`LISTENNING ON PORT http://localhost:${PORT}`)
})
