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

export default router
