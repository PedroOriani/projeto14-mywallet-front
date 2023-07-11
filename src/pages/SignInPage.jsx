import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react";
import axios from "axios";

export default function SignInPage() {

  const navigateTo = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function signIn(e){
    e.preventDefault();

    const userData = {
      email: email,
      password: password
    }

    const promise = axios.post(`${import.meta.env.VITE_API_URL}/sign-in`, userData)
      promise.then(resposta => {
        console.log(resposta.data)
        navigateTo('/home')
      })
      promise.catch((erro) => alert(erro.response.data))

  }

  return (
    <SingInContainer>
      <form onSubmit={signIn}>
        <MyWalletLogo />
        <input 
        data-test='email'
        placeholder="E-mail" 
        type="text" 
        value={email}
        onChange={e => setEmail(e.target.value)}
        />
        <input 
        data-test='password'
        placeholder="Senha" 
        type="password" 
        autoComplete="new-password" 
        value={password}
        onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>

      <Link to='/cadastro'>
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
