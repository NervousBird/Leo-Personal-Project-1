import { Router } from 'express'

import * as db from '../db/users.ts'

const router = Router()

router.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const user = await db.getUserById(id)
    res.json(incomes)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.post('/', async (req, res) => {
  try {
    const data = req.body
    await db.addUser(data)
    res.sendStatus(204)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.delete('/', async (req, res) => {
  try {
    const id = req.body.id
    await db.deleteUser(id)
    res.sendStatus(204)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
