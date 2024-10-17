// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCTA91ipP8kSUH3vnBaCBYBt7uujTQ5OBo',
  authDomain: 'fuji-recipe-react-native.firebaseapp.com',
  projectId: 'fuji-recipe-react-native',
  storageBucket: 'fuji-recipe-react-native.appspot.com',
  messagingSenderId: '238693427724',
  appId: '1:238693427724:web:161d21a63b3d6c92471c29'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage(app)
