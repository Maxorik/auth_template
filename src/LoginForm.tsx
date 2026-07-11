import React, { useState,  ChangeEvent} from 'react';
import '../style/main.scss'

import { signInWithEmailAndPassword, signOut } from 'firebase/auth'

/** форма авторизации */
export function LoginForm({auth}) {
    /** статус логина */
    const [isLogin, setIsLogin] = useState(false);
    const [incorrectCreds, setIncorrectCreds] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const setLogin = (state: boolean) => { setIsLogin(state) };

    /** почта для входа */
    const [email, setEmail] = useState('');
    const editEmail = (e: ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value) };

    /** пароль для входа */
    const [password, setPassword] = useState('');
    const editPassword = (e: ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value) };

    /** логин */
    const sendAuth = async() => {
        console.log(`sending ${email} ${password}`)
        setShowLoader(true);
        setIncorrectCreds(false);
        setErrorText('');

        try {
            const res = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            console.log(res);
            res && setLogin(true);
        } catch(errorText) {
            setIncorrectCreds(true);
            setErrorText(errorsParse(errorText as string))
        } finally {
            setShowLoader(false);
        }
    }

    /** ошибки при логине */
    const [errorText, setErrorText] = useState('');
    const errorsParse = (errorText: string) => {
        const errors = {
            'invalid-email': 'проверьте правильность почты',
            'invalid-credential': 'неправильная почта или пароль',
            'network-request-failed': 'сервер недоступен, попробуйте позже'
        }

        for (const [key, value] of Object.entries(errors)) {
            if (errorText.toString().includes(key)) {
                return value; 
            }
        }

        return 'ошибка авторизации, попробуйте позже';
    }

    /** разлогин */
    const doExit = async() => {
        setEmail('');
        setPassword('');

        await signOut(auth);

        setLogin(false);
    }

    /** пример валидации кнопки входа */
    const getLoginDisabled = email === '' || password === '';

    return (
        <div className="form-container green-container">
            {
                !isLogin ? <>
                    { showLoader ? <>
                        <p>Вход...</p>
                        <div className="loader"></div>;
                    </> : <>
                        <p>Войти в сервис</p>
                        { incorrectCreds && errorText && <p className='warning-text'>{ errorText }</p> }
                        <input 
                            type="text" 
                            className="glass-input" 
                            placeholder="Почта"
                            value={email}
                            onChange={editEmail}
                        />
                        <input 
                            type="text" 
                            className="glass-input" 
                            placeholder="Пароль"
                            value={password}
                            onChange={editPassword}
                        />
                        <button 
                            className="glass-button" 
                            onClick={sendAuth}
                            disabled={getLoginDisabled}
                        >
                            Войти
                        </button>
                    </> }
                </> : <>
                    <p>Вы авторизованы, {email}!</p>
                    <button className="glass-button" onClick={doExit}>Выйти</button>
                </>
            }
        </div>
  );
}