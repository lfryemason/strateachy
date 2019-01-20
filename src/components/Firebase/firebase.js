import app from 'firebase/app';
const config = {
    apiKey: REACT_APP_API_KEY,
    authDomain: REACT_APP_AUTH_DOMAIN,
    databaseURL: REACT_APP_DATABASE_URL,
    projectId: REACT_APP_PROJECT_ID,
    storageBucket: REACT_APP_STORAGE_BUCKET,
    messagingSenderId: REACT_APP_MESSAGING_SENDER_ID
}

class Firebase
{
    constructor()
    {
        app.initializeApp(config);
    }
}

export default Firebase;

export { FirebaseContext };