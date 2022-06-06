import axios from "axios"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styled from 'styled-components';
import UserContext from '../UserContext'
export default function GerarPlanos() {

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

        <Containerplanos>
            {planos.map((plano) =>
                <button onClick={()=>setIdPlano(plano.id)}>
                    <Plano>
                        <img src={plano.image} alt='' width='140px' height='96px' />
                        <h3>R$ {plano.price} </h3>
                    </Plano>
                </button >
                )}
        </Containerplanos>
    )
}

const Containerplanos = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
font-family: 'Roboto', sans-serif;
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 38px;
color: #FFFFFF;

button{
    position: relative;
    width: 80vw;
    height: 25vh;
    margin: 10px 0px;
    background: #0E0E13;
    border: 3px solid #7E7E7E;
    border-radius: 12px;
    font-family: 'Roboto';
}


`

const Plano = styled.div`
width: 100%;
height: 30%;
display: flex;
flex-direction: row;
align-items : center;
font-style: normal;
font-weight: 700;
font-size: 24px;
line-height: 28px;

color: #FFFFFF;

img{
    margin: 10px;
}
h3{
    position:absolute;
    right:15px; 
}
`