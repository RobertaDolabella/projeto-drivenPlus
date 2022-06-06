import styled from "styled-components"

import { useNavigate } from "react-router-dom"
export default function TelaUser() {
    const userLocalSerializada = localStorage.getItem("userInfo")
    const userDesSerelizada = JSON.parse(userLocalSerializada)
    const userLocal = userDesSerelizada


    const navigate = useNavigate();

    function voltarHome() {
        navigate('/home')
    }
    function atualizar(){
        navigate(`/users/:${userLocal.id}/update`)
    }
    return (

        <ContainerUsuario>
            <Cabecalho>
                <ion-icon className="botao-home" name="arrow-back" onClick={voltarHome} ></ion-icon>
            </Cabecalho>
            <ContainerInfo>
            <Info>
                {userLocal.name}
            </Info>

            <Info>
                {userLocal.cpf}
            </Info>
            <Info>
                {userLocal.email}
            </Info>
            <Atualizar onClick={atualizar}>
                ATUALIZAR
            </Atualizar>
            </ContainerInfo>
        </ContainerUsuario>
    )
}

const ContainerUsuario = styled.div`

    padding: 40% 46px 0px 46px;
    display: flex;
    flex-direction: column;
    align-items: center;`

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

const Atualizar = styled.button`

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
    color: #FFFFFF;`

const Cabecalho = styled.div`
    position: absolute;
    top:24px;
    left:22px;
    ion-icon {
    margin-top: 25px;
    margin-left: 22px;
    font-size: 40px;
    color: #FFFFFF;
}`
const ContainerInfo = styled.div`
margin-top: 160px;`