import { Router } from 'express'

import * as db from '../db/savings.ts'

const router = Router()

router.get('/savings', async (req, res) => {
  try {
    const savings = await db.getAllSavings()
    res.json(savings)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.post('/savings', async (req, res) => {
  try {
    const data = req.body
    await db.addSavings(data)
    res.sendStatus(204)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.patch('/savings', async (req, res) => {
  try {
    const data = req.body
    await db.updateSavings(data)
    res.sendStatus(204)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.delete('/savings', async (req, res) => {
  try {
    const id = req.body.id
    await db.deleteSavings(id)
    res.sendStatus(204)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.post('/savings/bulk', async (req, res) => {
  try {
    const data = req.body
    await db.addBulkSavings(data)
    res.sendStatus(204)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
router.get('/saving', async (req, res) => {
  try {
    const saving = await db.getAllSaving()
    res.json(saving)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.post('/saving', async (req, res) => {
  try {
    const data = req.body
    await db.addSaving(data)
    res.sendStatus(204)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.patch('/saving', async (req, res) => {
  try {
    const data = req.body
    await db.updateSaving(data)
    res.sendStatus(204)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.delete('/saving', async (req, res) => {
  try {
    const id = req.body.id
    await db.deleteSaving(id)
    res.sendStatus(204)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})
