import { Router } from 'express'

import * as db from '../db/userData.ts'

const router = Router()

router.get('/', async (req, res) => {
  const { id } = req.params

  try {
    const userData = await db.getUserData()
    res.json(userData)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.post('/', async (req, res) => {
  try {
    const data = req.body
    await db.updateUserData(data)
    res.sendStatus(204)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
