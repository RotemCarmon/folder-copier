import httpService from './httpService.js';

// const students = [
//   'Andrey Dolya',
//   'Arie Moldawsky',
//   'Aviv Levy',
//   'Ben Graham',
//   'Chen Kaslasi',
//   'Dana Dubrovsky',
//   'Danielle Sibony',
//   'Dennis Nemirovski',
//   'Dor Grosman',
//   'Eden Aran',
//   'Eilon Shetrit',
//   'Elad Rahamim',
//   'Elhanan Avihail',
//   'Gal Arbel',
//   'Gal Ovadia',
//   'Guy Indepurker',
//   'Haleli Amiad',
//   'Harel Wiengarten',
//   'Idan Atiya',
//   'Inbar Tamir',
//   'Karin Bitan',
//   'Kobi Agrest',
//   'Liran Gabai',
//   'Matan Cohen',
//   'Maya Malik',
//   'Mira Shenron',
//   'Mor Lev Ari',
//   'Moshe Kalman',
//   'Nadav Komornik',
//   'Naphtali Rubin',
//   'Nehoray Ilani',
//   'Noam Aviel',
//   'Ofir Hadar',
//   'Omer Fussfeld',
//   'Orel Vaizman',
//   'Ram Amir',
//   'Ravit Shoval',
//   'Roee Hoobian',
//   'Roman Klebanov',
//   'Ron Goldman',
//   'Roni Gabbay',
//   'Roy Margalit',
//   'Shani Saadia',
//   'Shifra Sherrow',
//   'Shimrit Herbst',
//   'Simon Korotkov',
//   'Stave Parouche',
//   'Tal Harouvi',
//   'Tomer Pinto',
//   'Yotam Barak',
//   'Yulia Alexeev',
//   'Yuval Beiton',
//   'Zohar Sela',
// ];


async function getStudents() {
  var students = await httpService.get('copy');
  var studentObjs = students.map(student => {
    return {
      name: student,
      isChacked: false
    }
  })
  return studentObjs
}

async function onCopy(payload){
  var res;
  if(!payload.dateTime) res = await httpService.post('copy', { payload });
  else res = await httpService.post('copy/schedule', { payload })
  return res;
}

export const copierService = {
  getStudents,
  onCopy
}