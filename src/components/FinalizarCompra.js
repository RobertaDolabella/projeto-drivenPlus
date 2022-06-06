import axios from "axios"
import { useContext } from "react"
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext"
export default function FinalizarCompra({ plano, nomeCartao, numeroCartao, validadeCartao, codigoCartao,setFinalizar, finalizar }) {

    const { planoSelecionado, setPlanoSelecionado} = useContext(UserContext);

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
    console.log(dadosCompra)
    function comprarPlano() {
        console.log("entrou no promisse get")
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
        setPlanoSelecionado(planoSelecionado)
        console.log("plano", planoSelecionado)

        navigate('/home')
    }

    return (
        <div className="container-off">
            <div className="close" onClick={setFinalizar(false)}><ion-icon name="close-sharp"></ion-icon></div>
            <div className="finalizar">
                <h3>
                    Tem certeza que deseja assinar o plano {plano.name} (R$ {plano.price})?
                </h3>
                <div className="botao-comprar">
                    <button className="botao-nao" onClick={setFinalizar(false)}>Não</button>
                    <button className="botao-sim" onClick={()=>comprarPlano()}>Sim</button>
                </div>
            </div>
        </div>

    )
}