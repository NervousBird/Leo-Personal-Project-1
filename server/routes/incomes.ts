import { Router } from 'express'

import * as db from '../db/incomes.ts'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const incomes = await db.getAllIncomes()
    res.json(incomes)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.post('/', async (req, res) => {
  try {
    const data = req.body
    await db.addIncome(data)
    res.sendStatus(204)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.patch('/', async (req, res) => {
  try {
    const data = req.body
    await db.updateIncome(data)
    res.sendStatus(204)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.delete('/', async (req, res) => {
  try {
    const id = req.body.id
    await db.deleteIncome(id)
    res.sendStatus(204)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.post('/bulk', async (req, res) => {
  try {
    const data = req.body
    await db.addBulkIncome(data)
    res.sendStatus(204)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
