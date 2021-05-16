const express = require('express')
const router = express.Router()
const followupObj =  require('../models/followUpModel')

// getting all
router.get  ('/', async (req,res) => 
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
router.get  ('/:id', getFollowup, (req,res) => 
                {
                    //sends subcriber object data
                    res.json(res.followup)
                }
            )
// creating one
router.post ('/', async (req,res) => 
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
router.patch('/:id', getFollowup, async(req,res) => 
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
router.delete('/:id', getFollowup, async (req,res) => 
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

module.exports = router