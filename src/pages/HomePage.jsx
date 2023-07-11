import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

export default function HomePage() {

  const token = JSON.parse(sessionStorage.getItem("token"));

  const [transaction, setTransactions] = ([])
  const [total, setTotal] = useState(0);
  const [name, setName] = useState('');

  const navigateTo = useNavigate();

  console.log(token)

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
        setTransactions(resposta.data)
      }
    })
    promise.catch((erro) => alert(erro.response.data))
  }

  useEffect(getData, [])
  useEffect(loadTransactions, [])

  return (
    <HomeContainer>
      <Header>
        <h1 data-test="user-name">Olá, {name}</h1>
        <BiExit data-test="logout"/>
      </Header>

      <TransactionsContainer>
        <ul>
          <ListItemContainer>
            <div>
              <span>30/11</span>
              <strong data-test="registry-name">Almoço mãe</strong>
            </div>
            <Value data-test="registry-amount" color={"negativo"}>120,00</Value>
          </ListItemContainer>

          <ListItemContainer>
            <div>
              <span>15/11</span>
              <strong>Salário</strong>
            </div>
            <Value color={"positivo"}>3000,00</Value>
          </ListItemContainer>
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value data-test="total-amount" color={"positivo"}>{total}</Value>
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