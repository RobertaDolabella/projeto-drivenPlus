import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import UserContext from './UserContext';
import './App.css';
import TelaLogin from './components/TelaLogin';
import TelaSingUp from './components/TelaSignUp';
import TelaHome from './components/TelaHome';
import TelaSubscriptions from './components/TelaSubscription';
import TelaPlano from './components/TelaPlano';
import TelaUser from './components/TelaUser';
import TelaUpdate from './components/TelaUpdate';


function App() {
  const [idPlano, setIdPlano] = useState(null)
  const [planos, setPlanos] = useState([])
  const [dadosCartao, setDadosCartao] = useState(false)
  const [planoSelecionado, setPlanoSelecionado] = useState({"id": "loading",
  "userId": "loading",
  "membership": {
    "id": "loading",
    "name": "loading",
    "image": "loading",
    "price": "loading",
    "perks":  "loading"
    
  }
})


  return (
    <div className='container-geral'>
      <BrowserRouter >

        <UserContext.Provider value={{ idPlano, setIdPlano,  planos, setPlanos, planoSelecionado, setPlanoSelecionado, dadosCartao, setDadosCartao }}>
          <Routes>
            <Route path="/" element={<TelaLogin />} />
            <Route path="/sign-up" element={<TelaSingUp />} />
            <Route path="/home" element={< TelaHome />} />
            <Route path="/subscriptions" element={< TelaSubscriptions />} />
            <Route path="/subscriptions/:idPlano" element={<TelaPlano />} />
            <Route path="/users/:idUsuario" element={<TelaUser />} />
            <Route path="/users/:idUsuario/update" element={<TelaUpdate />}/>

          </Routes>
        </UserContext.Provider>

      </BrowserRouter>
    </div>

  );
}

export default App;
