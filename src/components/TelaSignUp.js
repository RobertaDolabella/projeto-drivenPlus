import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
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
         <div className='container-login'>
            <img src={logo} width="300px" height="70px"/>
            <div className='container-login'>
                <input className='login' placeholder='Nome' type="name" value={nome} onChange={(e)=>setNome(e.target.value)} required/>
                <input className='login' placeholder='CPF' type="text" value={cpf} onChange={(e)=>colocarCpf(e)} required/>
                <input className='login' placeholder='E-mail' type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
                <input className='login' placeholder='Senha' type="password" value={senha} onChange={(e)=>setSenha(e.target.value)} required/>
                <button className="submit" type="submit" onClick={gerarUsuario}>CADASTRAR</button>
                <button className="redirecionamento" onClick={mudarParaLogin}>Já possuí uma conta? Entre</button>
            </div>
            </div>
        
    )
}