const express = require('express')
const router = express.Router()
const followupObj =  require('../models/followUpModel')
const ReminderObj =  require('../models/reminderModel')
const feedbackObj =  require('../models/feedbackModel')

// getting all
router.get  ('/followUp/', async (req,res) => 
                {
                    try 
                    {
                        const getFollowup = await followupObj.find()
                        res.json(getFollowup)
                    } 
                    catch (error) 
                    {
                        res.status(500).json({ message: error.message})
                    }
                }
            )
// getting one
router.get  ('/followUp/:id', getFollowup, (req,res) => 
                {
                    //sends subcriber object data
                    res.json(res.followup)
                }
            )
// creating one
router.post ('/followUp/', async (req,res) => 
                {
                    const createFollowup = new followupObj({
                        FollowupStatus : req.body.FollowupStatus,
                        FollowupDate : req.body.FollowupDate
                    })
                    try 
                    {
                        const newFollowUp = await createFollowup.save()
                        res.status(201).json(newFollowUp)
                    }
                    catch (error) 
                    {
                        res.status(400).json({ message: error.message})
                    }
                }
            )
// updates one
router.patch('/followUp/:id', getFollowup, async(req,res) => 
                {
                    if (req.body.FollowupStatus != null) 
                    {
                        res.followup.FollowupStatus = req.body.FollowupStatus
                    }

                    if (req.body.FollowupDate != null) 
                    {
                        res.followup.FollowupDate = req.body.FollowupDate 
                    }

                    try 
                    {
                        const updatedFollowup = await res.followup.save()
                        res.json(updatedFollowup)
                    } 
                    catch (error) 
                    {
                        res.status(400).json({ message: error.message})
                    }
                }
            )
// delete one
router.delete('/followUp/:id', getFollowup, async (req,res) => 
                {
                    try 
                    {
                        await res.followup.remove()
                        res.json({message: "Deleted followup"})
                    }
                    catch (error) 
                    {
                        res.status(500).json({message: error.message})
                    }
                }
            )

async function getFollowup(req, res, next) 
{
    let followup
    try 
    {
        followup = await followupObj.findById(req.params.id)
        if (followup == null) 
        {
            return res.status(404).json({ message: 'Cannot find followup' })
        }
    }   
    catch (error)
    {
        return res.status(500).json({ message: error.message })
    }

    res.followup = followup
    next()
}

///////////////////////////////////////////////////////////////////feedback
// getting all
router.get  ('/feedback/', async (req,res) => 
                {
                    try 
                    {
                        const getFeedback = await feedbackObj.find()
                        res.json(getFeedback)
                    } 
                    catch (error) 
                    {
                        res.status(500).json({ message: error.message})
                    }
                }
            )
// getting one
router.get  ('/feedback/:id', getFeedback, (req,res) => 
                {
                    //sends subcriber object data
                    res.json(res.feedback)
                }
            )
// creating one
router.post ('/feedback/', async (req,res) => 
                {
                    const createFeedback = new feedbackObj({
                        Problem : req.body.Problem,
                        HelpedOnTime : req.body.HelpedOnTime,
                        Comment : req.body.Comment,
                        FeedbackDate : req.body.FeedbackDate
                    })
                    try 
                    {
                        const newFeedback = await createFeedback.save()
                        res.status(201).json(newFeedback)
                    }
                    catch (error) 
                    {
                        res.status(400).json({ message: error.message})
                    }
                }
            )
// updates one
router.patch('/feedback/:id', getFeedback, async(req,res) => 
                {
                    if (req.body.Problem != null) 
                    {
                        res.feedback.Problem = req.body.Problem
                    }
                    
                    if (req.body.HelpedOnTime != null) 
                    {
                        res.feedback.HelpedOnTime = req.body.HelpedOnTime 
                    }

                    if (req.body.Comment != null) 
                    {
                        res.feedback.Comment = req.body.Comment 
                    }

                    if (req.body.FeedbackDate != null) 
                    {
                        res.feedback.FeedbackDate = req.body.FeedbackDate 
                    }

                    try 
                    {
                        const updatedFeedback = await res.feedback.save()
                        res.json(updatedFeedback)
                    } 
                    catch (error) 
                    {
                        res.status(400).json({ message: error.message})
                    }
                }
            )
// delete one
router.delete('/feedback/:id', getFeedback, async (req,res) => 
                {
                    try 
                    {
                        await res.feedback.remove()
                        res.json({message: "Deleted feedback"})
                    }
                    catch (error) 
                    {
                        res.status(500).json({message: error.message})
                    }
                }
            )

async function getFeedback(req, res, next) 
{
    let feedback
    try 
    {
        feedback = await feedbackObj.findById(req.params.id)
        if (feedback == null) 
        {
            return res.status(404).json({ message: 'Cannot find feedback' })
        }
    }   
    catch (error)
    {
        return res.status(500).json({ message: error.message })
    }

    res.feedback = feedback
    next()
}

///////////////////////////////////////////////////////////////////reminder
// getting all
router.get  ('/reminder/', async (req,res) => 
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
router.get  ('/reminder/:id', getReminder, (req,res) => 
                {
                    //sends person 1
                    // res.send(res.reminder.ReminderText)
                    //sends subcriber object data
                    res.json(res.reminder)
                }
            )
// creating one
router.post ('/reminder/', async (req,res) => 
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
router.patch('/reminder/:id', getReminder, async(req,res) => 
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
router.delete('/reminder/:id', getReminder, async (req,res) => 
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