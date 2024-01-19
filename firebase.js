
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { collection, getDocs } from 'firebase/firestore'; 
const firebaseConfig = {
    /* 
    replace this object with yours 
    */  
    
    apiKey: "AIzaSyAurC4wnq6XxxOZ1WK0xw6JDEtcMsPXeIA",
  authDomain: "iwt-project-a9ed1.firebaseapp.com",
  projectId: "iwt-project-a9ed1",
  storageBucket: "iwt-project-a9ed1.appspot.com",
  messagingSenderId: "971523945736",
  appId: "1:971523945736:web:c27bfaf1787470bb8768bd",
  measurementId: "G-XFKC4Z35CK"




};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };