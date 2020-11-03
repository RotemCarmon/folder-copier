const express = require('express')

const {getStudents, setSchedule, cancelJob, copyNow} = require('./copy.controller')

const router = express.Router() 
router.get('/cancel',cancelJob )
router.get('/',getStudents )
router.post('/schedule',setSchedule )
router.post('/',copyNow )


module.exports = router