import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

export default function HomePage() {

  const token = JSON.parse(sessionStorage.getItem("token"));

  const [transactions, setTransactions] = useState([])
  const [name, setName] = useState('');
  const [id, setId] = useState('')

  let total = 0;

  const navigateTo = useNavigate();

  useEffect(() => {
    if (!token) {
      navigateTo('/');
    }
  }, []);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  function getData() {
    const promise = axios.get(`${import.meta.env.VITE_API_URL}/userInfos`, config)
    promise.then(resposta => {
      setId(resposta.data.user._id)
      setName(resposta.data.name)
      sessionStorage.setItem('day', JSON.stringify(resposta.data.day));
    })
    promise.catch((erro) => alert(erro.response.data))
  }

  const configId = {
    headers: {
      Authorization: `Bearer ${token}`,
      id: id
    },
  };

  function loadTransactions(){
    const promise = axios.get(`${import.meta.env.VITE_API_URL}/transactions`, configId)
    promise.then(resposta => {
      if(resposta.data.length === 0){
        alert('Você não fez nenhuma transação')
      }else{
        const dados = resposta.data;
        const reversed = dados.reverse()
        setTransactions(reversed)
      }
    })
    promise.catch((erro) => alert(erro.response.data))

    calcTotal()
  }

  function calcTotal(){
    for (let i = 0; i < transactions.length; i++){
      if (transactions[i].type === "entrada"){
        total += Number(transactions[i].value);
      }else{
        total -= Number(transactions[i].value);
      }
    }
  }

  calcTotal();

  useEffect(getData, [])
  useEffect(loadTransactions, [])

  function logOut(){
      sessionStorage.clear()
      navigateTo("/")
  }

  function entrada(){
    navigateTo("/nova-transacao/entrada")
  }

  function saida(){
    navigateTo("/nova-transacao/saida")
  }

  return (
    <HomeContainer>
      <Header>
        <h1 data-test="user-name">Olá, {name}</h1>
        <BiExit onClick={logOut} data-test="logout"/>
      </Header>

      <TransactionsContainer>
        <ul>
          {transactions.map(t => (
            <ListItemContainer key = {t._id}>
            <div>
              <span>{t.day}</span>
              <strong data-test="registry-name">{t.description}</strong>
            </div>
            <Value data-test="registry-amount" color={t.type === "entrada" ? "positivo" : "negativo"}>{(t.value)}</Value>
          </ListItemContainer>
          ))
          }
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value data-test="total-amount" color={total >= 0 ? "positivo" : "negativo"}>{total.toFixed(2)}</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
          <button data-test="new-income" onClick={entrada}>
            <AiOutlinePlusCircle />
            <p>Nova <br /> entrada</p>
          </button>
          <button data-test="new-expense" onClick={saida}>
            <AiOutlineMinusCircle />
            <p>Nova <br />saída</p>
          </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`