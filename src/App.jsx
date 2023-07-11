import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import TransactionsPage from "./pages/TransactionPage"
import { useState } from "react"

export default function App() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')

  return (
    <PagesContainer>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/cadastro" element={<SignUpPage name={name} setName={setName} email={email} setEmail={setEmail} password={password} setPassword={setPassword} confirmPass={confirmPass} setConfirmPass={setConfirmPass}/>} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/nova-transacao/:tipo" element={<TransactionsPage />} />
        </Routes>
      </BrowserRouter>
    </PagesContainer>
  )
}

const PagesContainer = styled.main`
  background-color: #8c11be;
  width: calc(100vw - 50px);
  max-height: 100vh;
  padding: 25px;
`
