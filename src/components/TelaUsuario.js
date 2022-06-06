export default function TelaUsuario() {

    return (
        <ContainerUsuario>

            <input placeholder='E-mail' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input placeholder='Senha' type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
            <input placeholder='Senha' type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
        </ContainerUsuario>
    )
}