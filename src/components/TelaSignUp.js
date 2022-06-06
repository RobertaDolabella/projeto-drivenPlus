import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import UserContext from "../UserContext"
import logo from '../Shared/logo-driven-plus.jpg'
export default function TelaSingUp(){
    const {token, setToken , email, setEmail, senha, setSenha, nome, setNome} = useContext(UserContext);
    const navigate = useNavigate();
    const[cpf, setCpf] = useState()
    const POSTCADASTRO = 'https://mock-api.driven.com.br/api/v4/driven-plus/auth/sign-up'
    function gerarUsuario(event){
        event.preventDefault();
        const body=            {
                email: email,
                name: nome,
                cpf: cpf,
                password: senha
            }
            console.log(body)
            const promiseCadastro = axios.post(POSTCADASTRO, body)
            promiseCadastro.then(mudarParaLogin)
        }
    function colocarCpf(e){
        if(e.target.value.length===3){
            e.target.value = e.target.value+"."
        }
        if(e.target.value.length===7){
            e.target.value = e.target.value+"."
        }
        if(e.target.value.length===11){
            e.target.value = e.target.value+"-"
        }
        if(e.target.value.length>14){
            alert("Por favor, digite um CPF correto")
        }
        else{
        const cpf = e.target.value
        console.log(cpf)
        setCpf(cpf)
        console.log(cpf)
        }
        }
        function mudarParaLogin(){
            navigate("/")
        }
    
    return(
         <ContainerLogin>
            <img src={logo} width="300px" height="70px"/>
            <div className='container-login'>
                <input className='login' placeholder='Nome' type="name" value={nome} onChange={(e)=>setNome(e.target.value)} required/>
                <input className='login' placeholder='CPF' type="text" value={cpf} onChange={(e)=>colocarCpf(e)} required/>
                <input className='login' placeholder='E-mail' type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
                <input className='login' placeholder='Senha' type="password" value={senha} onChange={(e)=>setSenha(e.target.value)} required/>
                <Enter type="submit" onClick={gerarUsuario}>CADASTRAR</Enter>
                <Redirecionamento onClick={mudarParaLogin}>Já possuí uma conta? Entre</Redirecionamento>
            </div>
            </ContainerLogin>
        
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