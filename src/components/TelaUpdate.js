import { useState } from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function TelaUpdate() {
    const userLocalSerializada = localStorage.getItem("userInfo")
    const userDesSerelizada = JSON.parse(userLocalSerializada)
    const userLocal = userDesSerelizada

    const dataLocalSerializada = localStorage.getItem('token')
    const dataDesSerelizada = JSON.parse(dataLocalSerializada)
    const tokenLocal = dataDesSerelizada

    const navigate = useNavigate();

    const [senha, setSenha] = useState()
    const [nome, setNome] = useState()
    const [email, setEmail] = useState()
    const [novasenha, setNovasenha] = useState();

    const PUT = 'https://mock-api.driven.com.br/api/v4/driven-plus/users/'

    const config = {
        headers: {
            "Authorization": `Bearer ${tokenLocal}`
        }
    }

  

    function voltar() {
        navigate(`/users/:${userLocal.id}`)
    }

    function enviarAtualizacao(event) {
        event.preventDefault();
        const novoCadastro =
        {
            name: nome,
            cpf: userLocal.cpf,
            email: email,
            currentPassword: senha,
            newPassword: novasenha
        }

        const promiseAtualizarCadastro = axios.put(PUT, novoCadastro, config)
        promiseAtualizarCadastro.then(navigate('/home'))
    }
    return (
        <>
            <ContainerUser>
                <Cabecalho>
                    <ion-icon className="botao-home" name="arrow-back" onClick={voltar} ></ion-icon>
                </Cabecalho>
                <ContainerInfo>
                    <form>
                        <input placeholder='Nome' type="name" value={nome} onChange={(e) => setNome(e.target.value)} required />
                        <input  type="text" value={userLocal.cpf} onChange={(e) => setSenha(e.target.value)} disabled={true} />
                        <input placeholder='email' type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <input placeholder='Senha atual' type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
                        <input placeholder='Nova senha' type="password" value={novasenha} onChange={(e) => setNovasenha(e.target.value)} required />

                        <Salvar type="submit" onClick={enviarAtualizacao}>SALVAR</Salvar>
                    </form>
                </ContainerInfo>
            </ContainerUser>
        </>
    )


}

const ContainerUser = styled.div`

    padding: 40% 46px 0px 46px;
    display: flex;
    flex-direction: column;
    align-items: center;
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
const Info = styled.div`

    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 10px;
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
    `
const Salvar = styled.button`

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
const ContainerInfo = styled.div`
margin-top: 90px;`

const Cabecalho = styled.div`
position: absolute;
top:24px;
left:22px;
ion-icon{
margin-top: 25px;
margin-left: 22px;
font-size: 40px;
color: #FFFFFF;
}`