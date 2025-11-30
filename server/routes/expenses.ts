import { Router } from 'express'

import * as db from '../db/expenses.ts'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const expenses = await db.getAllExpenses()
    res.json(expenses)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.post('/', async (req, res) => {
  try {
    const data = req.body
    await db.addExpense(data)
    res.sendStatus(204)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.patch('/', async (req, res) => {
  try {
    const data = req.body
    await db.updateExpense(data)
    res.sendStatus(204)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.delete('/', async (req, res) => {
  try {
    const id = req.body.id
    await db.deleteExpense(id)
    res.sendStatus(204)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.post('/bulk', async (req, res) => {
  try {
    const data = req.body
    await db.addBulkExpense(data)
    res.sendStatus(204)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
