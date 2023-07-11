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
  const [total, setTotal] = useState();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('')

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
      setName(resposta.data.name)
      setEmail(resposta.data.email)
      sessionStorage.setItem('day', JSON.stringify(resposta.data.day));
    })
    promise.catch((erro) => alert(erro.response.data))
  }

  function loadTransactions(){
    const promise = axios.get(`${import.meta.env.VITE_API_URL}/transactions`, config)
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
    let valor = 0;
    for (let i = 0; i < transactions.length; i++){
      if (transactions[i].type === "entrada"){
        valor += Number(transactions[i].value);
      }else{
        valor -= transactions[i].value;
      }
    }
    setTotal(valor.toFixed(2))
  }

  console.log(total)

  useEffect(getData, [])
  useEffect(loadTransactions, [])

  function logOut(){
    const promise = axios.delete(`${import.meta.env.VITE_API_URL}/sign-out`, config)
    promise.then(resposta => {
      sessionStorage.clear()
      if (deleted.data.deletedCount > 0) return navigateTo("/")
    })
    promise.catch((erro) => alert(erro.response.data))
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
            <Value data-test="registry-amount" color={t.type === "entrada" ? "positivo" : "negativo"}>{(t.value).replace('.', ',')}</Value>
          </ListItemContainer>
          ))
          }
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value data-test="total-amount" color={"positivo"}>{total.replace('.', ',')}</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <Link to='/nova-transacao/entrada'>
          <button data-test="new-income">
            <AiOutlinePlusCircle />
            <p>Nova <br /> entrada</p>
          </button>
        </Link>
        <Link to='/nova-transacao/saida'>
          <button data-test="new-expense">
            <AiOutlineMinusCircle />
            <p>Nova <br />saída</p>
          </button>
        </Link>
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