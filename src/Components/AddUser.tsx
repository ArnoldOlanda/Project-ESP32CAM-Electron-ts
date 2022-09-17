import React from 'react'
import styled from 'styled-components'

import { IoTrashOutline } from "react-icons/io5";

interface Props{
  userRef: React.RefObject<HTMLInputElement>;
  passRef: React.RefObject<HTMLInputElement>;
  pass2Ref:React.RefObject<HTMLInputElement>;
  change: () => void;
  error: string;
}

export const AddUser = ({userRef, passRef, pass2Ref, change, error}:Props) => {
  return (
    <Container>
      <Box >
          <BoxInput>
              <Input ref={ userRef } placeholder='Usuario' />
              <Input type="password" ref={ passRef } placeholder='Ingrese contraseña' />
              <Input type="password" ref={ pass2Ref } placeholder='Repita contraseña' />
          </BoxInput>
          <Close onClick={change}>
            <IoTrashOutline size="1.5em"/>
          </Close>
          
      </Box>
      <Error> { error } </Error>
    </Container> 
  )
}

const Container = styled.div`
    height: 100%;
    margin: 0px 10px;
    background-color: #4b4b4b;
    justify-content: space-between;
    border-radius:10px;
    align-items: center;
    padding: 8px 3%;
    &:hover{
        background-color: #4b4b4b;
    }
`
const Box = styled.div`
    height: 100%;
    width : 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const BoxInput= styled.div`
  margin-top: auto;
  margin-bottom: auto;
`
const Input = styled.input`
  height: 10px;
  display: flex;
  padding: 10px;
  box-sizing: border-box;
  border-style: none;
  border-radius: 4px;
  border: solid 1px #cacaca;
  margin: 5px 0px;
  font-size: 14px;
  &:focus{
    outline: solid 2px #000000;
   
  }
`
const Close= styled.div`
    height: 30px;
    width: 30px;
    border-radius: 50%;
    display: flex;
    align-items:center;
    justify-content: center;
    &:hover{
        background-color: #585858;
    }
`
const Error = styled.p`
  color: #ff3b3b;
  font-size: 12px;
  text-align: left;
  margin: 3px 2px;
`