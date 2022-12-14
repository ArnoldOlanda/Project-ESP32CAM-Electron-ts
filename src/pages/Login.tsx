import React, { useContext, useState } from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import jwt from 'jwt-decode'
import styled from 'styled-components'

import cam from '../images/webcam.png'
import url_base from "../config/variables"

import { StoreContext } from '../context/StoreProvider'
import { types } from '../context/StoreReducer'

import { LoadingScreen } from '../Components'
import { useForm } from '../hooks/useForm'
import { ResponseLogin } from '@/interfaces'

import { AES_en, AES_de } from '@/service/Encryption'
import { EncryptionRSA } from '@/service/EncryptionRSA'

interface Iform{
  user: string;
  password: string;
  msg: string;
}

export const Login:React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const { store, dispatch } = useContext(StoreContext);

  const { formState, onInputChange, onSetNewState }= useForm({
    user: '',
    password: '',
    msg:''
  });

  const { msg, password, user } = formState as Iform;

  const onPressLogin = async () => {

    if(user=='' || password=='') {
      onSetNewState('msg','*Debe llenar todos los campos')
      return false;
    }

    try {

      const encryptedPassword = EncryptionRSA( password )
      //console.log({encryptedPassword});


      const body = JSON.stringify({
        user: AES_en(user),
        password: encryptedPassword
      });

      setLoading(true)

      const response = await fetch(`${url_base}/api/auth/login`,{
        method:'POST',
        body,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      })

      if(response.status == 404){
        setLoading(false)
        alert("Error: Server not found")

      } else if (response.status == 400){

        setLoading(false);

        const data: ResponseLogin = await response.json();

        onSetNewState('msg',`*${ data.msg }`);

        return

      } else {
        setLoading(false)
        const data: ResponseLogin = await response.json();
        const { user, cameras, token, users} = data;
        // console.log(data)
        let user1 = JSON.parse(AES_de(user))
        


        dispatch({
          type: types.Login,
          body: {
            user: user1.user,
            id:user1.id,
            cameras: JSON.parse(AES_de(cameras)),
            token: AES_de(token),
            users: JSON.parse(AES_de(users)),
            type: user1.type_
        }});

        navigate('/MainPage');
      }

    } catch (error) {
      setLoading(false)
      console.log(error)
      alert("Error: Server not found")
    }


  }

  return (
    <div style={{display: 'flex', alignContent: 'center', height: '100vh'}}>
      <Box>
        <p style={{color: 'black', textAlign: 'center', fontSize: '22px'}}> Sistema de Visualizaci??n de C??maras ESP32 UCSM <img height="16px" src={cam}/></p>
        <p style={{color: 'black', textAlign: 'center', fontSize: '20px'}}>Iniciar Sesion</p>
        <div style={{display: 'block', textAlign: 'center'}} >
          <InputLogin onChange={ onInputChange } name='user'  placeholder="Usuario" required></InputLogin>
          <InputPassword onChange={ onInputChange } name='password' type="password" placeholder="Contrase??a"  required></InputPassword>
          <p style={{color: 'black', textAlign: 'left', fontSize: '14px'}}>??No tiene una cuenta? <NavL to="/register" >Cree una</NavL>.</p>

          <ButtonLogin type ="submit"   value="Entrar" onClick={onPressLogin} />

          <Error>{ msg }</Error>
        </div>

      </Box>
      {
          isLoading ? <LoadingScreen/>: <></>
      }
    </div>

  )
}

const Box= styled.div`
  box-sizing: border-box;
  margin:auto;
  background-color: white;
  padding: 48px 40px 36px;
  max-height: 500px;
  max-width: 448px;
  height: 100%;
  width: 100%;
  border-radius: 10px;

`
const InputLogin= styled.input`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border-style: none;
  border-radius: 4px;
  border: solid 1px #cacaca;
  height: 54px;
  margin-bottom: 20px;
  font-size: 14px;
  &:focus{
    outline: solid 2px #3578E5;

  }

`
const InputPassword= styled.input`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border-style: none;
  border-radius: 4px;
  border: solid 1px #cacaca;
  height: 54px;
  margin-bottom: 5px;
  font-size: 14px;
  &:focus{
    outline: solid 2px #3578E5;

  }

`
const ButtonLogin= styled.input`
  margin-top: 5px;
  height: 49px;
  width: 100px;
  color: white;
  font-size: 16px;
  border-style: none;
  border-radius: 4px;
  background-color: black;
  &:hover{
    background-color: #494949;

  }

`
const NavL = styled(NavLink)`

 text-decoration: none;
 color:#3578E5;
 &:hover{
  text-decoration: underline;
 }

`

const Error = styled.p`
  color: red;
  font-size: 12px;
  text-align: left;

`
