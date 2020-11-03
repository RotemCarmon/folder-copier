var fse = require('fs-extra')
const path = require('path');
const schedule = require('node-schedule');


/* ################################################################## */
/* #####################>>> ENTER PATH HERE <<<###################### */
/* ################################################################## */
const srcPath = 'C:/Users/tetch/Dropbox/CaSep20-ExcerciseSubmission';
const destPath = 'C:/Users/tetch/Desktop/Coding Academy/CaSep20/SPRINT3';
/* ################################################################## */
/* ################################################################## */

var gStudents;
var gSprint;
var job = null


function getStudents() {
  return fse.readdirSync(srcPath).filter(file => {
    return !file.match(/\./g) && !file.match(/Demo/g)
  })
}


// Schedule a job
async function runJob(payload) {
  const { students, delivery, sprint, dateTime } = payload
  gStudents = students.map(student => student.name);
  gSprint = sprint;
  let schedTime = new Date(dateTime)

  job = schedule.scheduleJob(schedTime, () => {
    copySprintDelivery(delivery)
  });
  return job
}


// cancel a job
async function cancelJob() {
  if (!job) return false
  return job.cancel();
}

async function copyNow(payload) {
  const { students, delivery, sprint } = payload
  gStudents = students.map(student => student.name);
  gSprint = sprint;
  return await copySprintDelivery(delivery)
}

async function copySprintDelivery(delivery) {
  const files = {};
  await gStudents.forEach(async (student) => {
    const res = await recurciveFindPath(srcPath, delivery, student);
    files[student] = res[0];
  });

  const day = getFullDay(delivery);

  for (let student in files) {
    const dest = path.join(destPath, student, day)
    if (!files[student]) {
      console.log('Can\'t find file path for student ' + student);
      files[student] = 'error.txt'

    }
    fse.copy(files[student], dest, (err) => {
      if (err) return console.error(err);
      console.log('Success - copied ' + student);
    })
  }
  return
}

async function recurciveFindPath(inputDir, delivery, name) {
  const pathRe = new RegExp(gSprint + '.*' + delivery, 'i');
  const nameRe = new RegExp(name, 'i');
  const files = [];

  fse.readdirSync(inputDir).forEach(async (file) => {
    var currPath = path.join(inputDir, file);
    if (!currPath.match(nameRe)) return;
    if (currPath.match(pathRe)) {
      files.push(currPath);
    } else if (fse.statSync(currPath).isDirectory()) {
      const res = await recurciveFindPath(currPath, delivery, name);
      if (res && res.length) files.push(...res);
    }
  });
  return files;
}

function getFullDay(exp) {
  const days = ['Wednesday', 'Thursday', 'Saturday']
  const re = new RegExp(exp, 'i');
  return days.find(day => day.match(re))
}

module.exports = {
  copySprintDelivery,
  runJob,
  getStudents,
  cancelJob,
  copyNow
};