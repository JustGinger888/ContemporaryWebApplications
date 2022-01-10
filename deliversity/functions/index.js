// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
const stripe = require('stripe')('sk_test_51K8r12EFC6ZFCUDdqaPPQ4pmjRI1eWUlAgP88t9J2Fs3gzbSdsaVSlpUMtvOSXrO5Oak1H9v0qiHqukQyRd0SmmG003LcCyQXy');
    
admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.checkStatus = functions.https.onRequest(async (req, res) => {
    const id = req.query.id;

    console.log(id);
    const session = await stripe.checkout.sessions.retrieve(
     id)
        // Grab the text parameter.
        
        // // Push the new message into Firestore using the Firebase Admin SDK.
        // const writeResult = await admin.firestore().collection('messages').add({original: original});
        // Send back a message that we've successfully written the message
        res.json({result: session.status});
      });
    
