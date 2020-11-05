const copyService = require('./copy.service')

async function getStudents(req, res) {
  const students = copyService.getStudents();
  res.send(students)
}

async function setSchedule(req,res){
  const { payload } = req.body;
  console.log("setSchedule -> payload", payload)
  try{
    const job = await copyService.runJob(payload);
    res.send(job)
  }catch(err){
    console.log('ERROR >>>', err);
    res.status(404).send(err);
  }
  
}

async function cancelJob(req, res){
  try{
    const canceledJob = await copyService.cancelJob();
    res.send(canceledJob)
  } catch(err){
    console.log('ERROR >>>', err);
    res.status(404).send(err);
  }
}

async function copyNow(req, res) {
  const { payload } = req.body;
  try{
    const copiedFiles = await copyService.copyNow(payload);
    res.send(copiedFiles)
  }catch(err){
    console.log('ERROR >>>', err);
    res.status(404).send(err);
  }
}

module.exports = { 
  getStudents,
  setSchedule,
  cancelJob,
  copyNow
}