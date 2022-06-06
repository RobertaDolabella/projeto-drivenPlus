import logo from '../Shared/logo-driven-plus.jpg'
import { useState } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import UserContext from '../UserContext'
import './TelaLogin.css'

export default function TelaLogin() {
    const POSTLOGIN = 'https://mock-api.driven.com.br/api/v4/driven-plus/auth/login'
    const { token, setToken, senha, setSenha, user, setUser, idPlano } = useContext(UserContext);
    const [email, setEmail] = useState()
    const navigate = useNavigate();
    console.log(idPlano)
    function gerarFormulario(event) {
        event.preventDefault();
        const body = {
            email: email,
            password: senha
        }
        console.log(body)
        const promiseLogin = axios.post(POSTLOGIN, body)
        promiseLogin.then((response) => gerarNome(response))

    }
    function gerarToken(response){
    
        const token = response.data.token
        const dataSerializada = JSON.stringify(token)
        localStorage.setItem("token",dataSerializada)
    
        navigate('/subscriptions')
    }

    function gerarNome(response){
        const userName = response.data.name
        const NameSerializada = JSON.stringify(userName)
        localStorage.setItem("userName",NameSerializada)
gerarToken(response)
    }
    function irParaTElaCadastro() {
        navigate('./sign-up')
    }
    return (
        <>
            <div className='container-login'>
                <img src={logo} width="300px" height="70px" />
                <input className='login' placeholder='E-mail' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className='login' placeholder='Senha' type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
                <button className="submit" type="submit" onClick={gerarFormulario}>ENTRAR</button>
                <button className="redirecionamento" onClick={irParaTElaCadastro}> Não possuí uma conta? Cadastre-se </button>
            </div>
        </>
    )

}