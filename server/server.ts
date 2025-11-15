import express from 'express'
import * as Path from 'node:path'
import incomeRoutes from './routes/incomes.ts'
import expenseRoutes from './routes/expenses.ts'
import transactionRoutes from './routes/transactions.ts'

const server = express()

server.use(express.json())

server.use('/api/v1/transactions', transactionRoutes)
server.use('/api/v1/incomes', incomeRoutes)
server.use('/api/v1/expenses', expenseRoutes)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
