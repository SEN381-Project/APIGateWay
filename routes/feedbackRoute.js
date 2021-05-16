const express = require('express')
const router = express.Router()
const feedbackObj =  require('../models/feedbackModel')

// getting all
router.get  ('/', async (req,res) => 
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
router.get  ('/:id', getFeedback, (req,res) => 
                {
                    //sends subcriber object data
                    res.json(res.feedback)
                }
            )
// creating one
router.post ('/', async (req,res) => 
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
router.patch('/:id', getFeedback, async(req,res) => 
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
router.delete('/:id', getFeedback, async (req,res) => 
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

module.exports = router