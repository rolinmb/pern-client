import { Fragment } from 'react';
import './App.css';
import InputTodo from './components/InputTodo';
import ListTodos from './components/ListTodos';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import { useAuthState } from 'react-firebase-hooks/auth';

firebase.initializeApp({
  apiKey: "_",
  authDomain: "_",
  projectId: "_",
  storageBucket: "_",
  messagingSenderId: "_",
  appId: "_"
});

const auth = firebase.auth();

function App() {
  const [user] = useAuthState(auth);
  return (
    <Fragment>
      <div className="app-container">
        <header>
          <SignOut />
        </header>
        <main>
          {
            user ?
            <div className="todos-container">
              <InputTodo /><ListTodos />
            </div>
            : <SignIn />
          }
        </main>
      </div>
    </Fragment>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  return (
    <Fragment>
      <button className="btn btn-primary" onClick={signInWithGoogle}>Sign in with Google</button>
    </Fragment>
  );
}

function SignOut() {
  return auth.currentUser && (
    <button className="btn btn-secondary" onClick={() => auth.signOut()}>Sign Out</button>
  );
}

export default App;