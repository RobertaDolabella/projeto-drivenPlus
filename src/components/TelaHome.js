import UserContext from "../UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";



export default function TelaHome() {

    const navigate = useNavigate();

    const { setIdPlano } = useContext(UserContext);

    const DELETEPLANO = 'https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions'
    

    const nameLocalSerializada = localStorage.getItem('userName')
    const nameDesSerelizada = JSON.parse(nameLocalSerializada)
    const nameLocal = nameDesSerelizada

    const planoSelecionadoSere = localStorage.getItem("planoSelecionado")
    const planoSelecionadoDes = JSON.parse(planoSelecionadoSere)
    const planoSelecionadoLocal = planoSelecionadoDes

    const dataLocalSerializada = localStorage.getItem('token')
    const dataDesSerelizada = JSON.parse(dataLocalSerializada)
    const tokenLocal = dataDesSerelizada

    const perks = planoSelecionadoLocal .membership.perks

    const config = {
        headers: {
            "Authorization": `Bearer ${tokenLocal}`
        }
    }


   
   
    function cancelarPlano(){
        
         const promisedeletarPlano = axios.delete(DELETEPLANO, config)
         promisedeletarPlano.then(voltarParaSubscription)
    }

    function voltarParaSubscription(){
        setIdPlano(null)
        navigate('/subscriptions')
    }

    function mudarDePlano(){
        setIdPlano(null)
        navigate('/subscriptions')
    }

    function mudarParaTelaUser(){
        navigate(`/users/:${planoSelecionadoLocal.id}`)
    }

    return (
        <ContainerHome>
            <Cabecalho >
                <img src={planoSelecionadoLocal.membership.image} alt="" width="50px" height="50px"/>
                <ion-icon onClick={()=>mudarParaTelaUser()} name="person-circle-outline"></ion-icon>
            </Cabecalho>
            <h2>Olá, {nameLocal}</h2>
            <div>
                {perks.map((infos) =>
                    <a href={infos.link}><ItemPlano>{infos.title}</ItemPlano></a>)}
            </div>
            <Alterar>
                <ItemPlano onClick={()=> mudarDePlano()}>Mudar Plano</ItemPlano>
                <Cancelar onClick={()=> cancelarPlano()}>Cancelar</Cancelar> 
            </Alterar>
        </ContainerHome>


    )
}


const ContainerHome = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
margin: 0px 38px 12px 38px;

h2{
    text-align: center;
    margin-bottom: 52px;
    font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 28px;
line-height: 16px;
color: #FFFFFF;
}
`
const Cabecalho = styled.div`
display: flex;
flex-direction: row;
align-items: baseline;
justify-content: space-between;

ion-icon {
    margin-top: 25px;
    margin-left: 22px;
    font-size: 40px;
    color: #FFFFFF;
    ;`

const ItemPlano = styled.button` 
    width:80vw ;
    height: 52px ;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    color: #FFFFFF;    
    border-radius: 8px;
    border: 0px;
    background: #FF4791;
    margin-bottom: 8px;
`
const Cancelar = styled.button` 
width:80vw ;
height: 52px ;
font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 16px;
color: #FFFFFF;
background: #FF4747;
border: 0px;
border-radius: 8px;
`
const Alterar = styled.div`
position: fixed;
bottom: 0px;
margin-bottom: 12px;
`