import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from 'styled-components';
import UserContext from '../UserContext'
import FinalizarCompra from "./FinalizarCompra"


export default function TelaPlano() {

    const navigate = useNavigate();

    const { setIdPlano, dadosCartao, setDadosCartao } = useContext(UserContext);
 
    const [plano, setPlano] = useState(
        {
            "id": "loading",
            "name": "loading",
            "image": "loading",
            "price": "loading",
            "perks": [
                {
                    "id": "loading",
                    "membershipId": "loading",
                    "title": "loading",
                    "link": "loading",
                },
                {
                    "id": "loading",
                    "membershipId": "loading",
                    "title": "loading",
                    "link": "loading",
                }
            ]
        }
    );
    const [nomeCartao, setNomeCartao] = useState()
    const [numeroCartao, setNumeroCartao] = useState()
    const [validadeCartao, setValidadeCartao] = useState()
    const [codigoCartao, setCodigoCartao] = useState()
    const [finalizar, setFinalizar] = useState(false)

    const dataLocalSerializada = localStorage.getItem('token')
    const dataDesSerelizada = JSON.parse(dataLocalSerializada)
    const tokenLocal = dataDesSerelizada

    const planoEscolhidoSerializada = localStorage.getItem('planoEscolhido')
    const planoEscolhidoSerelizada = JSON.parse(planoEscolhidoSerializada)
    const planoEscolhidoLocal = planoEscolhidoSerelizada

    const GETPLANO = `https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${planoEscolhidoLocal}`
    const config = {
        headers: {
            "Authorization": `Bearer ${tokenLocal}`
        }
    }

    useEffect(() => {
        const promisePlano = axios.get(GETPLANO, config);
        promisePlano.then((response) => gerarPlano(response.data))
    }, [])
    function gerarPlano(element) {
        setPlano(element)
    }

    function autoComplete(){
        if (dadosCartao === true) {
            const cartaoLocalSerializada = localStorage.getItem('cartao')
            const cartaoDesSerelizada = JSON.parse(cartaoLocalSerializada)
            const dadosCartaolocal = cartaoDesSerelizada
            setNumeroCartao(dadosCartaolocal.cardNumber)
            setCodigoCartao(dadosCartaolocal.securityNumber)
            setValidadeCartao(dadosCartaolocal.expirationDate)
            setNomeCartao(dadosCartaolocal.cardName)
        }
    }
    useEffect(()=>{
        autoComplete()
    })

    function editarNumeroCartao(e) {
        setDadosCartao(false)
        if (e.target.value.length === 4) {
            e.target.value = e.target.value + " "
        }

        if (e.target.value.length === 9) {
            e.target.value = e.target.value + " "
        }

        if (e.target.value.length === 14) {
            e.target.value = e.target.value + " "
        }
        if (e.target.value.length > 20) {
            alert("Numero de cartão inválido")
        }
        setNumeroCartao(e.target.value)
    }

    function editarCodigoCartao(e) {
        setDadosCartao(false)
        if (e.target.value.length> 3) {
            alert("Codigo do cartao invalido")
        }
        setCodigoCartao(e.target.value)
    }

    function editarValidadeCartao(e) {
        setDadosCartao(false)
        if (e.target.value.length === 2) {
            e.target.value = e.target.value + "/"
        }
        setValidadeCartao(e.target.value)
    }
    function editarNomeCartao(e) {
        setDadosCartao(false)
        setNomeCartao(e.target.value)
    }

    function chamarTelaFinalizar(event) {
        event.preventDefault();
        setFinalizar(true)
        console.log(finalizar)
    }

    function voltarHome() {
        setIdPlano(null)
        navigate('/subscriptions')
    }

    console.log(dadosCartao)

    return (
        <>
            {!finalizar?   <></> : < FinalizarCompra plano={plano} nomeCartao={nomeCartao} numeroCartao={numeroCartao} validadeCartao={validadeCartao} codigoCartao={codigoCartao} setFinalizar={setFinalizar}/> }
            <ContainerCompra finalizar={finalizar} >
                <Cabecalho>
                    <ion-icon className="botao-home" name="arrow-back" onClick={voltarHome} ></ion-icon>
                    </Cabecalho>
            
                <ContainerPlano>
                    <img src={plano.image} />
                    <h1>{plano.name}</h1>
                    <Infos>
                        <h4><ion-icon name="calculator-outline"></ion-icon> Beneficios:</h4>
                        {plano.perks.map(({ title }, index) =>
                            <p>{index + 1}.{title}</p>
                        )}
                        <h4><ion-icon name="cash-outline"></ion-icon> Price</h4>
                        <p> R$ {plano.price} cobrados</p>
                        <ContainerPagamento>
                            <form>
                                <input disabled={finalizar} placeholder="Nome impresso no cartão" value={nomeCartao} onChange={(e) => editarNomeCartao(e)} />
                                <input disabled={finalizar} placeholder="Digitos do cartão" value={numeroCartao} onChange={(e) => editarNumeroCartao(e)} />
                                <PagamentoSecundario>
                                    <input disabled={finalizar} placeholder="Código de segurança" value={codigoCartao} onChange={(e) => editarCodigoCartao(e)} />
                                    <input disabled={finalizar} placeholder="Validade" value={validadeCartao} onChange={(e) => editarValidadeCartao(e)} />
                                </PagamentoSecundario>
                                <button disabled={finalizar} onClick={(event) => chamarTelaFinalizar(event)}>Assinar</button>
                            </form>
                        </ContainerPagamento>
                    </Infos>
                </ContainerPlano>


            </ContainerCompra>
        </>
    )
}

const ContainerPlano = styled.div`
display: flex;
flex-direction: column;
margin-top: 36px;
align-items: center;
justify-content: space-between;
width: 100vw;

h1{
    margin-top: 12px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 38px;
    color: #FFFFFF; 
}
ion-icon{
    font-size: 10px;
    margin-left: 0px;
}
`
const Infos = styled.div`
display: flex;
flex-direction: column;
text-align: left;
margin-top: 22px;
width: 80vw;

h4{
    margin-bottom: 10px;
    margin-bottom: 2px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #FFFFFF;
}
p{
        margin: 0px;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        color: #FFFFFF;
}
button{
    width: 82vw;
    height: 52px;
    left: 40px;
    top: 581px;
    background: #FF4791;
    border-radius: 8px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;

    color: #FFFFFF;
}

`
const ContainerPagamento = styled.div`
margin-top: 36px;
input{
    width: 100%;
    height: 50px;
    margin-bottom: 8px;
    background: #FFFFFF;
    border-radius: 8px;
}
`
const PagamentoSecundario = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
width: 82vw;
input{
    width: 47%;
    height: 50px;
    margin-bottom: 8px;
    background: #FFFFFF;
    border-radius: 8px;
}
`
const ContainerCompra = styled.div`
filter: ${(props)=>props.finalizar=== true? 'opacity(25%)': 'opacity(100%)'};

`
const Cabecalho = styled.div`
ion-icon {
    margin-top: 25px;
    margin-left: 22px;
    font-size: 40px;
    color: #FFFFFF;
}
`