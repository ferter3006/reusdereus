import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setApiToken, setUserAtributes } from "../../features/reus/reusSlice";
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";


export default function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();    
    const cookies = new Cookies();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if ((cookies.get('reusdereusApiKey')) && (cookies.get('reusdereusUser'))) {
            dispatch(setApiToken(cookies.get('reusdereusApiKey')));
            let cuki = cookies.get('reusdereusUser');
            dispatch(setUserAtributes({
                id: cuki.id,
                name: cuki.name,
                email: cuki.email,
                roles: cuki.roles[0].name
            }));
            navigate('/menu') 
        }
    }, [])

    const changeInputHandle = (e) => {
        e.target.id === 'user' ? setUsername(e.target.value) : setPassword(e.target.value)
    }

    const guardoUserAlState = (response) => {
        dispatch(setApiToken(response.token))
        dispatch(setUserAtributes({
            id: response.user.id,
            name: response.user.name,
            email: response.user.email,
            roles: response.user.roles[0].name
        }));
    }

    const creaCookies = (response) => { //guardo apikey al state y a una cookie
        const { user, token } = response;
        user.token = token
        console.log(user);
        cookies.set('reusdereusUser', JSON.stringify(user));
        cookies.set('reusdereusApiKey', token, { path: '/' });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_ENDPOINT}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                'Accept': "application/json",
            },
            body: JSON.stringify({
                "email": username,
                "password": password
            })
        })
            .then((response) => response.json())
            .then((jsonResponse) => {
                console.log(jsonResponse.message);
                if (jsonResponse.message === 'Invalid Login details') {
                    return alert('Credenciales Incorrectas')
                }
                creaCookies(jsonResponse)
                guardoUserAlState(jsonResponse)
                navigate('/menu')
            });
    }
    return (
        <div>
            <h1 className="h1">L0gin</h1>
            <form onSubmit={handleSubmit}>
                <ul>
                    <li>
                        <input onChange={changeInputHandle} className='inputTeam' type='text' maxLength="25" id='user' placeholder='email'></input>
                    </li>
                    <li>
                        <input onChange={changeInputHandle} className='inputTeam' type='text' maxLength="25" id='password' placeholder='contraseña'></input>
                    </li>
                    <li>
                        <input className="regularButton" type='submit' />
                    </li>
                </ul>
            </form>
        </div>
    )
}