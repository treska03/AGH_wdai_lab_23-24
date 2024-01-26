const express = require('express')
const indexRouter = require('./src/routes.js')
const app = express()
const port = 3000
const {sequelize, PersonSchema} = require('./src/db.js')

// Chciałbym żeby mi się czyściła baza danych przed każdym odpaleniem programu
// Jedyne na co wpadłem to żeby wrzucić ten sync z bazą danych w timeout który
// jest staly i wywołać PersonSchema.drop(), które w teorii powinno się wykonać 
// przed tym dzięki timeoutowi. Bez timeoutu nie działa. Czy jest jakiś 
// sensowniejszy sposób? Gdy próbowałem truncate albo destroy, to klucz ID się 
// nie resetuje i nie robi się od 1, co jest znanym problemem i od 2 lat jest 
// issue na githubie.
PersonSchema.drop();

const atSync = async () => {
  
  await console.log("Start atsync");
  await sequelize.sync().then(async function() {
    await PersonSchema.create({'name': 'john', 'surname':'Doe', 'job':'IT'})
    console.log('connected to database')
  }).catch(function(err) {
    console.log(err)
  });
}
setTimeout(() => {
    atSync();
}, 1000);  


app.use('/', indexRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})