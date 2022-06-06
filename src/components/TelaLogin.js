import logo from '../Shared/logo-driven-plus.jpg'
import { useState } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components';
import UserContext from '../UserContext'


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
        const infoUsuario ={
            name: response.data.name,
            cpf: response.data.cpf,
            email: response.data.email,
            currentPassword: response.data.password,
        }
        const NameSerializada = JSON.stringify(userName)
        localStorage.setItem("userName",NameSerializada)

        const infoSerializada = JSON.stringify(infoUsuario)
        localStorage.setItem("userInfo",infoSerializada)
gerarToken(response)
    }
    function irParaTElaCadastro() {
        navigate('./sign-up')
    }
    return (
        <>
            <ContainerLogin>
                <img src={logo} width="300px" height="70px" />
                <input placeholder='E-mail' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input placeholder='Senha' type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
                <Enter onClick={gerarFormulario}>ENTRAR</Enter>
                <Redirecionamento onClick={irParaTElaCadastro}> Não possuí uma conta? Cadastre-se </Redirecionamento>
            </ContainerLogin>
        </>
    )

}

const ContainerLogin = styled.div`

    padding: 40% 46px 0px 46px;
    display: flex;
    flex-direction: column;
    align-items: center;
    img{
        margin-bottom: 20%;
    }
    input{
        width: 85vw;
        height: 7vh;
        margin-bottom: 16px;
        background: #FFFFFF;
        border-radius: 8px;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 16px;
    
        color: #7E7E7E;
        border: 0px;
    }`

    const Enter = styled.button`

    width: 85vw;
    height: 7vh;
    background: #FF4791;
    border-radius: 8px;
    border: 0px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 16px;
    color: #FFFFFF;
    `

    const Redirecionamento= styled.button`
    background-color: #0E0E13;
    margin-top: 6px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    text-decoration-line: underline;
    color: #FFFFFF;
    border: 0px;
    `