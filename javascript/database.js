import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getDatabase, ref, get, child, onValue, set } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";
$(document).ready(function() {
    
    // Import the functions you need from the SDKs you need
    //import { initializeApp } from "firebase/app";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    const firebaseConfig = {
    apiKey: "AIzaSyDWl-6Uc15Hw1T8hPZK9k3UMWw7tyNNQTw",
    authDomain: "juliensworld-18c44.firebaseapp.com",
    projectId: "juliensworld-18c44",
    storageBucket: "juliensworld-18c44.firebasestorage.app",
    messagingSenderId: "969692121784",
    appId: "1:969692121784:web:ba2105294795d7b56d024d"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    // Initialize Firebase
    //firebase.initializeApp(firebaseConfig);

    // Initialize Realtime Database and get a reference to the service
    const db = getDatabase(app);


    async function readCounterData() {
        const snapshot = await get(child(ref(db), '/counter'));
        if (snapshot.exists()) {
            console.log("Data:", snapshot.val());
            alert(snapshot.val())
        }


    //const counterRef = database.ref('counter');
    //counterRef.once('value').then((snapshot) => {
    //    const data = snapshot.val();
    //    alert(data);
    //    console.log(data);
    //});
    }

    // Example usage
    readCounterData();

});