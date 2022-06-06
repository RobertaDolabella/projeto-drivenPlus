import axios from "axios"
import { useContext } from "react"
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../UserContext"
export default function FinalizarCompra({ plano, nomeCartao, numeroCartao, validadeCartao, codigoCartao, setFinalizar }) {

    const { planoSelecionado, setPlanoSelecionado, setDadosCartao, dadosCartao } = useContext(UserContext);

    const navigate = useNavigate();

    const dataLocalSerializada = localStorage.getItem('token')
    const dataDesSerelizada = JSON.parse(dataLocalSerializada)
    const tokenLocal = dataDesSerelizada

    const POSTASSINATURA = 'https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions'

    const config = {
        headers: {
            "Authorization": `Bearer ${tokenLocal}`
        }
    }

    const dadosCompra = {
        membershipId: plano.id,
        cardName: nomeCartao,
        cardNumber: numeroCartao,
        securityNumber: codigoCartao,
        expirationDate: validadeCartao
    }
  


    function comprarPlano() {
       
        console.log(dadosCompra)
        const promiseAssinatura = axios.post(POSTASSINATURA, dadosCompra, config)
        promiseAssinatura.then((response) => selecionarPlano(response))
    }
    function selecionarPlano(response) {
        console.log("resposta do promise get")
        console.log(response.data)
        const planoSelecionado = {
            "id": response.data.id,
            "userId": response.data.userId,
            "membership": {
                "id": response.data.membership.id,
                "name": response.data.membership.name,
                "image": response.data.membership.image,
                "price": response.data.membership.price,
                "perks": response.data.membership.perks

            }
        }

        setDadosCartao(true)

        const cartaoSerializada = JSON.stringify(dadosCompra)
        localStorage.setItem("cartao", cartaoSerializada)
        setPlanoSelecionado(planoSelecionado)
        console.log("plano", planoSelecionado)


        const selecionadoSerializada = JSON.stringify(planoSelecionado)
        localStorage.setItem("planoSelecionado", selecionadoSerializada)


        navigate('/home')
    }
    function voltar(event) {
        event.preventDefault();
        setFinalizar(false)
    }
    return (
        <ContainerOff>
            <Close onClick={(e) => voltar(e)}><ion-icon name="close-sharp"></ion-icon></Close>
            <Finalizar>
                <h3>
                    Tem certeza que deseja assinar o plano {plano.name} (R$ {plano.price})?
                </h3>
                <BotoesComprar>
                    <Nao onClick={(e) => voltar(e)}>Não</Nao>
                    <Sim onClick={() => comprarPlano()}>Sim</Sim>
                </BotoesComprar>
            </Finalizar>
        </ContainerOff>

    )
}

const ContainerOff = styled.div` 
position: absolute;
top:0px;
left: 0px;
width: 100vw;
height: 100vh;
filter:rgba(171, 51, 51, 0.7);
`
const Close = styled.div`
box-sizing: border-box;
position: fixed;
right: 20px ;
top:26px;
width:40px;
height: 40px;
border-radius: 5px;
padding: 5px;
background: #FFFFFF;
border:0px;


ion-icon{
    margin: 0 auto;
    font-size: 30px;
    color: #0E0E13;
    --ionicon-stroke-width: 32px;
}`

const Finalizar = styled.div` 
position: absolute;
top: 40vh;
left: 15vw;
width: 55vw;
height: 20vh;
padding: 30px 22px;
z-index: 1;
display: flex;
flex-direction: column;
border-radius: 12px;
background-color: #FFFFFF;
`

const BotoesComprar = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
`
const Sim = styled.button`
width:95px ;
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
`

const Nao = styled.button`
width:95px ;
height: 52px ;
font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 16px;
color: #FFFFFF;    
border-radius: 8px;
border: 0px;
background: #CECECE;
`