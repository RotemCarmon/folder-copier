var fse = require('fs-extra')
const path = require('path');
const schedule = require('node-schedule');


/* ################################################################## */
/* #####################>>> ENTER PATH HERE <<<###################### */
/* ################################################################## */
const srcPath = 'C:/Users/tetch/Dropbox/CaSep20-ExcerciseSubmission';
const destPath = 'C:/Users/tetch/Desktop/Coding Academy/CaSep20/test_test';
/* ################################################################## */
/* ################################################################## */

var gStudents;
var job = null


function getStudents() {
  return fse.readdirSync(srcPath).filter(file => {
    return !file.match(/\./g) && !file.match(/Demo/g)
  })
}


// Schedule a job
async function runJob(payload) {
  const {  students, mustTxt, optionalTxt, dateTime } = payload
  gStudents = students.map(student => student.name);
  gSprint = sprint;
  let schedTime = new Date(dateTime)

  job = schedule.scheduleJob(schedTime, () => {
    copySprintDelivery(mustTxt, optionalTxt)
  });
  return job
}


// cancel a job
async function cancelJob() {
  if (!job) return false
  return job.cancel();
}

async function copyNow(payload) {
  const { students, mustTxt, optionalTxt } = payload
  gStudents = students.map(student => student.name);
  return await copySprintDelivery(mustTxt, optionalTxt)
}

async function copySprintDelivery(mustTxt, optionalTxt) {
  console.log("copySprintDelivery -> mustTxt", mustTxt)
  const files = {};
  console.log('HERE');
  let musts = mustTxt.split(',').join('.*')
  let opts = `(${optionalTxt.split(',').join('|')})`
  console.log("copySprintDelivery -> opts", opts)
  // const  pathRe = new RegExp(name, 'i');
  await gStudents.forEach(async (student) => {
    const res = await recurciveFindPath(srcPath, musts, opts, student);
    files[student] = res[0];
  });

  console.log("back from recurciveFindPath -> files", files)
  // const day = getFullDay(delivery);

  for (let student in files) {
    const dest = path.join(destPath, student)
    if (!files[student]) {
      console.log('Can\'t find file path for student ' + student);
      files[student] = 'error.txt'
      fse.copyFile('error.txt', `${destPath}/${student}.txt`, (err) => {
        if (err) return console.error(err);
        console.log('Success - copied file ' + student);
      })
    } else {

      
      fse.copy(files[student], dest, (err) => {
        if (err) return console.error(err);
        console.log('Success - copied ' + student);
      })
      
    }
  }
  return
}

async function recurciveFindPath(inputDir, musts, opts, name) {

  const pathRe = new RegExp(musts + '.*' + opts + '+', 'i');
  const nameRe = new RegExp(name, 'i');
  const files = [];

  console.log("recurciveFindPath -> pathRe", pathRe)
  fse.readdirSync(inputDir).forEach(async (file) => {
    var currPath = path.join(inputDir, file);
    if (!currPath.match(nameRe)) return;
    if (currPath.match(pathRe)) {
      files.push(currPath);
    } else if (fse.statSync(currPath).isDirectory()) {
      const res = await recurciveFindPath(currPath, musts, opts, name);
      if (res && res.length) files.push(...res);
    }
  });
  return files;
}

module.exports = {
  copySprintDelivery,
  runJob,
  getStudents,
  cancelJob,
  copyNow
};