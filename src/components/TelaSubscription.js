import GerarPlanos from './GerarPlanos'
import styled from 'styled-components';

export default function TelaSubscriptions() {

    return (
        <Containerplanos>
            <h1>Escolha seu plano</h1>
            <GerarPlanos />
        </Containerplanos >
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

h1{
    margin-top: 50px;
}`
