import axios from "axios";
import { useEffect } from "react";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import styled from "styled-components"

export default function TransactionsPage() {

  const token = JSON.parse(sessionStorage.getItem("token"));
  const day = JSON.parse(sessionStorage.getItem("day"));

  const navigateTo = useNavigate();

  const [value, setValue] = useState(0)
  const [description, setDescritpion] = useState('')

  useEffect(() => {
    if (!token) {
      navigateTo('/');
    }
  }, []);

  function newTransaction(e){
    e.preventDefault

    const newTransaction ={
      day: day,
      value: Number(value).toFixed(2),
      description: description
    }

    const promise = axios.post(`${import.meta.env.VITE_API_URL}/transaction`, config)
    promise.then(resposta => {
      
    })
    promise.catch((erro) => alert(erro.response.data))
  }

  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form onSubmit={newTransaction}>
        <input 
        data-test="registry-amount-input" 
        placeholder="Valor" 
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        />
        <input 
        data-test="registry-name-input" 
        placeholder="Descrição" 
        type="text"
        value={description}
        onChange={e => setDescritpion(e.target.value)}
        />
        <button data-test="registry-save" type="submit">Salvar TRANSAÇÃO</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
