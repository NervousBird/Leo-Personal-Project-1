import { Router } from 'express'

import * as db from '../db/transactions.ts'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const incomes = await db.getAllTransactions()
    res.json(incomes)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.post('/', async (req, res) => {
  try {
    const data = req.body
    await db.addTransaction(data)
    res.sendStatus(204)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.patch('/', async (req, res) => {
  try {
    const data = req.body
    await db.updateTransaction(data)
    res.sendStatus(204)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.delete('/', async (req, res) => {
  try {
    const id = req.body.id
    await db.deleteTransaction(id)
    res.sendStatus(204)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
