import React, { useState,  ChangeEvent} from 'react';
import '../style/main.scss'

import { createUserWithEmailAndPassword } from 'firebase/auth'

/** форма авторизации */
export function CreateAccountForm({auth}) {
    /** статус создания акааунта */
    const [showLoader, setShowLoader] = useState(false);
    const [incorrectCreds, setIncorrectCreds] = useState(false);
    const [isCreated, setIsCreated] = useState(false);
    const setCreate = (state: boolean) => { setIsCreated(state) };

    /** почта для входа */
    const [email, setEmail] = useState('');
    const editEmail = (e: ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value) };

    /** пароль для входа */
    const [password, setPassword] = useState('');
    const editPassword = (e: ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value) };

    /** создать аккаунт */
    const sendNewAccount = async() => {
        console.log(`sending ${email} ${password}`)
        setShowLoader(true);
        setIncorrectCreds(false);
        setErrorText('');

        try {
            const res = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            console.log(res);
            res && setIsCreated(true);
        } catch(errorText) {
            setIncorrectCreds(true);
            setErrorText(errorsParse(errorText as string))
        } finally {
            setShowLoader(false);
        }
    }

    /** ошибки при регистрации */
        const [errorText, setErrorText] = useState('');
        const errorsParse = (errorText: string) => {
            const errors = {
                'invalid-email': 'проверьте правильность почты',
                'weak-password': 'пароль должен содержать минимум 6 символов',
                'email-already-in-use': 'эта почта уже занята'
            }
    
            for (const [key, value] of Object.entries(errors)) {
                if (errorText.toString().includes(key)) {
                    return value; 
                }
            }
    
            return 'не удалось зарегистрироваться, попробуйте позже';
        }

    /** вернуться на форму создания */
    const backToCreate = async() => {
        setEmail('');
        setPassword('');
        setIsCreated(false);
    }

    /** пример валидации кнопки создания */
    const getCreateDisabled = email === '' || password === '';

    return (
        <div className="form-container orange-container">
            {
                !isCreated ? <>
                    { showLoader ? <>
                        <p>Регистрация...</p>
                        <div className="loader"></div>;
                    </> : <>
                        <p>Зарегистрироваться</p>
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
                            onClick={sendNewAccount}
                            disabled={getCreateDisabled}
                        >
                            Создать
                        </button>
                    </> }
                </> : <>
                    <p>Пользователь {email} создан!</p>
                    <button className="glass-button" onClick={backToCreate}>Создать еще пользователя</button>
                </>
            }
        </div>
  );
}