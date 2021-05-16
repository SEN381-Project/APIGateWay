const express = require('express')
const router = express.Router()
const ReminderObj =  require('../models/reminderModel')

// getting all
router.get  ('/', async (req,res) => 
                {
                    try 
                    {
                        const getRreminder = await ReminderObj.find()
                        res.json(getRreminder)
                    } 
                    catch (error) 
                    {
                        res.status(500).json({ message: error.message})
                    }
                }
            )
// getting one
router.get  ('/:id', getReminder, (req,res) => 
                {
                    //sends person 1
                    // res.send(res.reminder.ReminderText)
                    //sends subcriber object data
                    res.json(res.reminder)
                }
            )
// creating one
router.post ('/', async (req,res) => 
                {
                    const createReminder = new ReminderObj({
                        ReminderText: req.body.ReminderText
                    })
                    try 
                    {
                        const newReminder = await createReminder.save()
                        res.status(201).json(newReminder)
                    }
                    catch (error) 
                    {
                        res.status(400).json({ message: error.message})
                    }
                }
            )
// updates one
router.patch('/:id', getReminder, async(req,res) => 
                {
                    if (req.body.ReminderText != null) 
                    {
                        res.reminder.ReminderText = req.body.ReminderText
                    }

                    try 
                    {
                        const updatedReminder = await res.reminder.save()
                        res.json(updatedReminder)
                    } 
                    catch (error) 
                    {
                        res.status(400).json({ message: error.message})
                    }
                }
            )
// delete one
router.delete('/:id', getReminder, async (req,res) => 
                {
                    try 
                    {
                        await res.reminder.remove()
                        res.json({message: "Deleted reminder"})
                    }
                    catch (error) 
                    {
                        res.status(500).json({message: error.message})
                    }
                }
            )

async function getReminder(req, res, next) 
{
    let reminder
    try 
    {
        reminder = await ReminderObj.findById(req.params.id)
        if (reminder == null) 
        {
            return res.status(404).json({ message: 'Cannot find Reminder' })
        }
    }   
    catch (error)
    {
        return res.status(500).json({ message: error.message })
    }

    res.reminder = reminder
    next()
}

module.exports = router