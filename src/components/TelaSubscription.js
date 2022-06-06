import GerarPlanos from './GerarPlanos'
import './TelaSubscription.css'

export default function TelaSubscriptions() {

    return (
        <div className='container-planos'>
            <h1>Escolha seu plano</h1>
            <GerarPlanos />
        </div >
    )
}