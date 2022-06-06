import { useContext } from "react"
import UserContext from "../UserContext"
import './TelaHome.css'

export default function TelaHome() {
    
    const { planoSelecionado } = useContext(UserContext);

    const nameLocalSerializada = localStorage.getItem('userName')
    const nameDesSerelizada = JSON.parse(nameLocalSerializada)
    const nameLocal = nameDesSerelizada

    const dataLocalSerializada = localStorage.getItem('token')
    const dataDesSerelizada = JSON.parse(dataLocalSerializada)
    const tokenLocal = dataDesSerelizada


    const planoSelecionadoSere = localStorage.getItem("planoSelecionado")
    const planoSelecionadoDes = JSON.parse(planoSelecionadoSere)
    const planoSelecionadoLocal = planoSelecionadoDes

    const perks = planoSelecionadoLocal .membership.perks
   
    console.log(perks)
    console.log("membership",planoSelecionadoLocal .membership)

    return (
        <div className="container-home">
            <div className="cabecalho" >
                <img src={planoSelecionadoLocal .membership.image} alt="" width="50px" height="50px"/>
                <ion-icon name="person-circle-outline"></ion-icon>
            </div>
            <h2>Olá, {nameLocal}</h2>
            <div className="itens-plano">
                {perks.map((infos) =>
                    <a href={infos.link}><button className="item-plano">{infos.title}</button></a>)}
            </div>
            <div className="alterar-plano">
                <button className="item-plano">Mudar Plano</button>
                <button className="cancelar">Cancelar</button> 
            </div>
        </div>


    )
}