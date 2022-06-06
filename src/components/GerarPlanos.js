import axios from "axios"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import UserContext from '../UserContext'
export default function GerarPlanos() {
    console.log("entrou no gerar")
    const { planos, setPlanos, idPlano, setIdPlano } = useContext(UserContext)

    const navigate = useNavigate();

    const dataLocalSerializada = localStorage.getItem('token')
    const dataDesSerelizada = JSON.parse(dataLocalSerializada)
    const tokenLocal = dataDesSerelizada

    const GETPLANOS = 'https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships'

    const config = {
        headers: {
            "Authorization": `Bearer ${tokenLocal}`
        }
    }
    useEffect(() => {
        const promisePlanos = axios.get(GETPLANOS, config);
        promisePlanos.then((response) => setPlanos(response.data))
    }, [])

    function escolherPlano(element){
        const planoEscolhido = idPlano
        const planoSerializada = JSON.stringify(planoEscolhido)
        localStorage.setItem("planoEscolhido",planoSerializada)
        console.log(idPlano)
        navigate(`/subscriptions/:${idPlano}`)
    
}
if(idPlano!==null){
    escolherPlano()
}

    return (

        <div className="container-planos">
            {planos.map((plano) =>
                <button onClick={()=>setIdPlano(plano.id)}>
                    <div className="plano">
                        <img src={plano.image} className='image' alt='' width='140px' height='96px' />
                        <h3>R$ {plano.price} </h3>
                    </div>
                </button >
                )}
        </div>
    )
}