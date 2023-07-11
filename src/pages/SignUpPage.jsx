import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import axios from "axios"

export default function SignUpPage() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  
  const navigateTo = useNavigate();

  function signUp(e){
    e.preventDefault();
    if (password === confirmPass){

      const userData = {
        name: name,
        email: email,
        password: password
      }

      const promise = axios.post(`${import.meta.env.VITE_API_URL}/sign-up`, userData)
      promise.then(resposta => {
        alert(resposta.data)
        navigateTo('/')
      })
      promise.catch((erro) => alert(erro.response.data))
      
    }else{
      alert("As senhas digitadas estão diferentes")
    }
    
  }

  return (
    <SingUpContainer>
      <form onSubmit={signUp}>
        <MyWalletLogo />
        <input
        data-test="name"
        placeholder="Nome" 
        type="text" 
        value={name}
        onChange={e => setName(e.target.value)}
        />
        <input
        data-test="email"
        placeholder="E-mail" 
        type="text" 
        value={email}
        onChange={e => setEmail(e.target.value)}
        />
        <input
        data-test="password"
        placeholder="Senha" 
        type="password" 
        autoComplete="new-password" 
        value={password}
        onChange={e => setPassword(e.target.value)}
        />
        <input
        data-test="conf-password"
        placeholder="Confirme a senha" 
        type="password" 
        autoComplete="new-password"
        value={confirmPass}
        onChange={e => setConfirmPass(e.target.value)}
        />
        <button
        data-test="sign-up-submit"
        type="submit"
        >Cadastrar</button>
      </form>

      <Link to='/'>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
