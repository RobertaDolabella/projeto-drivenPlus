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


function App() {
  const [token, setToken] = useState()
  const [senha, setSenha] = useState()
  const [nome, setNome] = useState()
  const [idPlano, setIdPlano] = useState(null)
  const [user, setUser] = useState()
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

        <UserContext.Provider value={{ token, setToken, idPlano, setIdPlano, senha, setSenha, user, setUser, planos, setPlanos, planoSelecionado, setPlanoSelecionado, nome, setNome, dadosCartao, setDadosCartao }}>
          <Routes>
            <Route path="/" element={<TelaLogin />} />
            <Route path="/sign-up" element={<TelaSingUp />} />
            <Route path="/home" element={< TelaHome />} />
            <Route path="/subscriptions" element={< TelaSubscriptions />} />
            <Route path="/subscriptions/:idPlano" element={<TelaPlano />} />
            <Route path="/users/:idUsuario" element={<TelaUser />} />

          </Routes>
        </UserContext.Provider>

      </BrowserRouter>
    </div>

  );
}

export default App;
