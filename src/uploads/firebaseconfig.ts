import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAYZ-GXWY9UKsa8slkRSDcWcAg0YBSWsB8',
  authDomain: 'teste-d4080.firebaseapp.com',
  projectId: 'teste-d4080',
  storageBucket: 'teste-d4080.appspot.com',
  messagingSenderId: '355223529386',
  appId: '1:355223529386:web:5bd15d024afa3fa19badd3',
  measurementId: 'G-7P21YX5EFF',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
const storage = getStorage(app);

export { storage };
