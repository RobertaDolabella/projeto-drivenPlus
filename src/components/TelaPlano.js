import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import UserContext from '../UserContext'
import FinalizarCompra from "./FinalizarCompra"
import './TelaPlanos.css'

export default function TelaPlano() {
    
    const navigate = useNavigate();

    const {setIdPlano} = useContext(UserContext);

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

    function editarNumeroCartao(e) {

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


    function editarValidadeCartao(e) {

        if (e.target.value.length ===2) {
            e.target.value = e.target.value + "/"
        }
        setValidadeCartao(e.target.value)
    }
   
    function chamarTelaFinalizar(event){
        event.preventDefault();
        setFinalizar(true)
        console.log(finalizar)
    }
    
    function voltarHome(){
        setIdPlano(null)
        navigate('/subscriptions')
    }
  
    return (
        <>
        {!finalizar ? <></>: < FinalizarCompra plano={plano} nomeCartao={nomeCartao} numeroCartao={numeroCartao} validadeCartao={validadeCartao} codigoCartao={codigoCartao} setFinalizar={setFinalizar} finalizar={finalizar}/>}
            <div className={finalizar? "off":""}>
                <ion-icon className="botao-home" name="arrow-back" onClick={voltarHome} ></ion-icon>

                <div className="container-plano">
                    <img src={plano.image} />
                    <h1>{plano.name}</h1>
                    <div className="infos">
                        <h4 className="itens"><ion-icon name="calculator-outline"></ion-icon> Beneficios:</h4>
                        {plano.perks.map(({ title }, index) =>
                            <p>{index + 1}.{title}</p>
                        )}
                        <h4 className="itens"><ion-icon name="cash-outline"></ion-icon> Price</h4>
                        <p> R$ {plano.price} cobrados</p>
                        <div className="container-pagamento">
                            <form>
                                <input disabled={finalizar} className="input-principal" placeholder="Nome impresso no cartão" value={nomeCartao} onChange={(e) => setNomeCartao(e.target.value)} />
                                <input disabled={finalizar}  className="input-principal" placeholder="Digitos do cartão" value={numeroCartao} onChange={(e) => editarNumeroCartao(e)} />
                                <div className="box-secundario-pagamento">
                                    <input disabled={finalizar}  className="input-secundario" placeholder="Código de segurança" value={codigoCartao} onChange={(e) => setCodigoCartao(e.target.value)} />
                                    <input disabled={finalizar}  className="input-secundario" placeholder="Validade" value={validadeCartao} onChange={(e) => editarValidadeCartao(e)} />
                                </div>
                                <button className="assinar" disabled={finalizar} onClick={(event)=>chamarTelaFinalizar(event)}>Assinar</button>
                            </form>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}