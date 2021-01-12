const functions = require('firebase-functions');
const express = require('express')
// const cors = require('cors')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
const admin = require('firebase-admin');
admin.initializeApp()
const app = express()
const db = admin.firestore()

app.get('/', async(req, res)=>{
  const snapshot = await db.collection('createdCH').get()
  let registeredCHs = []
  snapshot.forEach(doc=>{
    let id = doc.id;
    let data = doc.data();

    registeredCHs.push({id, ...data})
  });

  res.status(200).send(JSON.stringify(registeredCHs))
});

app.get('/:id', async(req, res)=>{
  const snapshot = await db.collection('createdCH').doc(req.params.id).get()

  const userId = snapshot.id;
  const userData = snapshot.data()

  res.status(200).send(JSON.stringify({ id: userId, ...userData }))
});

app.post('/', async (req, res)=>{
  const registerCH = req.body;

  registeredCH = await db.collection('createdCH').add(registerCH)
  console.log("Cambios: ", registerCH)
  res.status(201).send(registerCH);
});

app.delete('/:id', async(req, res)=>{
  let response = await db.collection('createdCH').doc(req.params.id).delete()

  res.status(200).send(response)
});

exports.Cambios = functions.https.onRequest(app)