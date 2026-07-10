import React from 'react';
import ReactDOM from 'react-dom/client';
import '../style/main.scss'
import '../style/phone.scss'

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { firebaseConfig } from './firebaseConfig'
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


import { LoginForm } from './LoginForm';
import { CreateAccountForm } from './CreateAccount'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div className='main-container'>
        <CreateAccountForm auth={auth} />
        <LoginForm auth={auth} />
    </div>
)