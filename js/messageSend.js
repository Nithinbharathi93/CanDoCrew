// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvkdf7jnrJe-Yfna_CBOFcY-Xnpxp2pOc",
  authDomain: "can-do-crew-3d22d.firebaseapp.com",
  databaseURL: "https://can-do-crew-3d22d-default-rtdb.firebaseio.com",
  projectId: "can-do-crew-3d22d",
  storageBucket: "can-do-crew-3d22d.appspot.com",
  messagingSenderId: "1021435645251",
  appId: "1:1021435645251:web:d12c0e5d04cc5968b473f6",
  measurementId: "G-FDXKBHL0NB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

var database = firebase.database();

let username = 'Nithin';

let messageListener = null;
function displayPreviousMessages() {
 
  if (messageListener !== null) {
    database.ref('data').off('child_added', messageListener);
  }
 
  // Add new listener
  messageListener = function(snapshot) {
    var childData = snapshot.val();
    displayMessage(childData.username, childData.message, childData.timestamp);
  };
  database.ref('data').on('child_added', messageListener);
 }
 
 function displayMessage(username, message, timestamp) {

   var parts = timestamp.split(" ");
   var timeSent = parts[4]; // The time is the fifth element in the array

  const chatBox = document.querySelector('.chat-box');
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.innerHTML = `<span class="sender">${username}:</span> <span class="message-text">${message}</span>`;
  chatBox.appendChild(messageElement);
  
  const timeElement = document.createElement('div');
  timeElement.classList.add('messageTime');
  timeElement.innerHTML = `<span class="message-time">${timeSent}</span>`;
  chatBox.appendChild(timeElement); 

 }

function sendMessage() {
  const messageInput = document.getElementById('inptChat');
  const message = messageInput.value.trim();
 
  if (message && username) {
    const chatBox = document.querySelector('.chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
 
    const timestamp = new Date().toLocaleString(); // Get current timestamp
    const dataToWrite = `${username},${message},${timestamp}\n`; // Data to write to CSV
 
    // messageElement.innerHTML = `<span class="sender">${username}:</span> <span class="message-text">${message}</span>`;
    chatBox.appendChild(messageElement); 

    
    // Write new data to the database
    database.ref(`data/${username}${Date.now()}`).set({
      username: username,
      message: message,
      timestamp: Date().toString()
    });

  document.getElementById('inptChat').value = '';
  }
 }
 