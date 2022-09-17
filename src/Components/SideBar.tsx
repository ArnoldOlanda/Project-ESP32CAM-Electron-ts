import React, { useContext, useState, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent, SidebarFooter, } from 'react-pro-sidebar';
import { IoLogOutOutline, IoClose, IoPersonOutline, IoReload } from 'react-icons/io5';
import { TbDeviceComputerCamera } from "react-icons/tb";
import styled from 'styled-components'
import jwtDecode from 'jwt-decode';

import { isValidIP } from '../helpers';
import url_base from "../config/variables"
import { StoreContext } from '../context/StoreProvider';
import { types } from '../context/StoreReducer';

import { Camera, AddCamera, LoadingScreen, User, AddUser } from './';

import '../styles.scss';
import menu from '../images/menu2.svg'
import close from '../images/Recurso 1.svg'

export const SideBar = (props: any) => {
    const navigate = useNavigate();

    const { store, dispatch } = useContext(StoreContext);

    const { token, type, cameras } = store;

    const [isLoading, setLoading] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const [isModalSelectedCam, setisModalSelectedCam] = useState(false);
    const [isModalSelectedUse, setisModalSelectedUse] = useState(false);
    const [error, setError] = useState("");
    const [refreshStatus, setRefreshStatus] = useState(false);

    const nameRef = useRef<HTMLInputElement>(null);
    const ipRef = useRef<HTMLInputElement>(null);

    const userRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);
    const pass2Ref = useRef<HTMLInputElement>(null);

    const changeCam = () => {
        setisModalSelectedCam(!isModalSelectedCam)
    }

    const changeUser = () => {
        setisModalSelectedUse(!isModalSelectedUse)
    }

    const changeLoading = (e: any) => {
        setLoading(e)
    }

    const BuildCameras = useCallback(() => {
        if (props.cameras.length > 0)
            return props.cameras.map((e: any, i: number) => (
                <Menu key={i}>
                    <Camera
                        change={changeLoading}
                        id={e.id}
                        name={e.name}
                        ip={e.ip}
                        onClickCamera={props.onClickCamera}
                        refreshStatus={refreshStatus}
                    />
                </Menu>))
        else
            return (<p style={{ marginLeft: '20px', marginTop: '20px', marginBottom: '20px' }}> Aun no tienes ninguna camara </p>)
    }, [props.cameras, refreshStatus])

    const BuildUsers = () => {
        if (props.users.length > 0) {
            return props.users.map((e: any, i: number) => (
                <Menu key={i}>
                    <User change={changeLoading} id={e.id} user={e.user} password={e.password} />
                </Menu>
            ))
        } else return (<p style={{ marginLeft: '20px', marginTop: '20px', marginBottom: '20px' }}> Aun no tienes usuarios registrados </p>)
    }

    const logout = () => {
        dispatch({ type: types.Logout, });
        navigate('/');
    }

    const addCamera = async () => {
        //@ts-ignore
        const { uid } = jwtDecode(token)

        if (nameRef.current && ipRef.current) {
            if (nameRef.current.value == "" || ipRef.current.value == "") {
                setError('*Debe llenar todos los campos')
                return false;
            }

            if (!isValidIP(ipRef.current.value)) {
                setError('*Formato de la dirección IP es incorrecta')
                return false;
            }

            try {
                const body = JSON.stringify({
                    name: nameRef.current.value,
                    ip: ipRef.current.value,
                    owner: uid
                })

                setLoading(true)
                const response = await fetch(`${url_base}/api/camera`, {
                    method: 'POST',
                    body,
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                })

                if (response.status == 404) {
                    setLoading(false)
                    alert("Error: Server not found")

                }
                else if (response.status == 400) {
                    setLoading(false)
                    const data = await response.json()
                    setError(data.msg)

                    return

                } else {
                    setLoading(false)
                    const data = await response.json();
                    const { user, cameras, token } = data;

                    dispatch({
                        type: types.AddCamera,
                        body: { name: nameRef.current.value, ip: ipRef.current.value }
                    });
                    setisModalSelectedCam(!isModalSelectedCam)
                    setError('')
                }



            } catch (error) {
                console.error(error)
                setLoading(false)
            }

        }

    }

    const addUser = async () => {

        //@ts-ignore
        const { uid } = jwtDecode(token)

        if (userRef.current && passRef.current && pass2Ref.current) {
            if (userRef.current.value == "" || passRef.current.value == "" || pass2Ref.current.value == "") {
                setError('*Debe llenar todos los campos')
                return false;
            }
            if (passRef.current.value.length < 6) {
                setError('*La contraseña debe ser mayor a 6 caracteres')
                return false;
            }
            if (passRef.current.value != pass2Ref.current.value) {
                setError('*Las contraseñas deben ser iguales')
                return false;
            }




            try {
                const body = JSON.stringify({
                    user: userRef.current.value,
                    password: passRef.current.value,
                    owner: uid,
                    type: false
                })

                setLoading(true)
                const response = await fetch(`${url_base}/api/users`, {
                    method: 'POST',
                    body,
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                })

                if (response.status == 404) {
                    setLoading(false)
                    alert("Error: Server not found")

                }
                else if (response.status == 400) {
                    setLoading(false)
                    const data = await response.json()
                    setError(data.msg)
                    console.log(data.error)
                    console.log(data.body)

                    return

                } else {
                    setLoading(false)
                    const data = await response.json();
                    const { users } = data;

                    dispatch({
                        type: types.UpdateUsers,
                        body: users
                    });
                    setisModalSelectedUse(!isModalSelectedUse)
                    setError('')
                    userRef.current.value = ''
                    passRef.current.value = ''
                    pass2Ref.current.value = ''
                }



            } catch (error) {
                console.error(error)
                setLoading(false)
            }
        }


    }

    const onClickRefreshStatus = () => {
        setRefreshStatus(!refreshStatus)
    }

    return (
        <SideBarDiv>
            <ProSidebar collapsed={isSelected} collapsedWidth="0px">
                {/* Cabecera */}
                <SidebarHeader>
                    <BoxUser>
                        <h2 style={{ textAlign: 'center', width: '90%' }}>{props.name}</h2>
                        <Close onClick={onClickRefreshStatus}>
                            <IoReload size="1.5em" />
                        </Close>
                        <Close hidden={isSelected} onClick={() => { setIsSelected(!isSelected) }} >
                            <IoClose size="2em" style={{ margin: "auto" }}></IoClose>
                        </Close>
                    </BoxUser>
                </SidebarHeader>

                {/* Cuerpo */}
                <SidebarContent>
                    <Menu>
                        <SubMenu title="Camaras" icon={<TbDeviceComputerCamera size="1.8em" />} >
                            {/* Renderizado de las camaras */}


                            <BuildCameras />
                            {
                                type ?
                                    <div hidden={isModalSelectedCam}>
                                        <BoxButtonAdd
                                            onClick={() => {
                                                if(nameRef.current && ipRef.current){
                                                    nameRef.current.value = "";
                                                    ipRef.current.value = "";
                                                }
                                                setisModalSelectedCam(!isModalSelectedCam);
                                            }}>
                                            <ButtonAdd >
                                                Agregar camara
                                            </ButtonAdd>
                                        </BoxButtonAdd>
                                    </div> : <></>
                            }


                            <div hidden={!isModalSelectedCam}>
                                <AddCamera change={changeCam} error={error} nameRef={nameRef} ipRef={ipRef} ></AddCamera>
                                <BoxButtonAdd onClick={addCamera}>
                                    <ButtonAdd>
                                        Aceptar
                                    </ButtonAdd>
                                </BoxButtonAdd>
                            </div>


                        </SubMenu>
                        {type ?
                            <SubMenu title="Usuarios" icon={<IoPersonOutline size="1.8em" />} >
                                <BuildUsers></BuildUsers>

                                <div hidden={isModalSelectedUse}>
                                    <BoxButtonAdd onClick={() => { setisModalSelectedUse(!isModalSelectedUse) }}>
                                        <ButtonAdd >
                                            Agregar usuario
                                        </ButtonAdd>
                                    </BoxButtonAdd>
                                </div>

                                <div hidden={!isModalSelectedUse}>
                                    <AddUser userRef={userRef} passRef={passRef} pass2Ref={pass2Ref} change={changeUser} error={error}></AddUser>
                                    <BoxButtonAdd onClick={addUser}>
                                        <ButtonAdd>
                                            Aceptar
                                        </ButtonAdd>
                                    </BoxButtonAdd>
                                </div>
                            </SubMenu> : <></>
                        }
                    </Menu>
                </SidebarContent>

                <SidebarFooter>
                    <Menu>

                        <div onClick={logout}>
                            <MenuItem icon={<Close style={{ borderRadius: "50%" }}>
                                <IoLogOutOutline size="1.8em" style={{ margin: "auto" }}></IoLogOutOutline>
                            </Close>}>
                                Cerrar Sesión
                            </MenuItem>
                        </div>
                    </Menu>
                </SidebarFooter>

            </ProSidebar>
            <ButtonSidebar
                onClick={() => {
                    setIsSelected(!isSelected)
                }}
                hidden={!isSelected}>
                <img height="100%" width="60%" src={menu} ></img>
            </ButtonSidebar>
            {
                isLoading ? <LoadingScreen /> : <></>
            }
        </SideBarDiv>
    )
}

const SideBarDiv = styled.div`
    height: 100%;
    display: flex;
    position: absolute;
    left: 0;
`
const BoxUser = styled.div`
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  display:flex;
  align-items:center;
  align-content: center;
  justify-content: space-between;
  padding: 0 4%;
`
const ButtonSidebar = styled.div`
    height: 50px;
    width: 50px;
    text-align: center;
    
    &:hover{
        background-color: #323232;
    }
`
const Close = styled.div`
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
const BoxButtonAdd = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 0px;
    
`

const ButtonAdd = styled.div`
    height: 30px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 16px;
    margin: 0px 10px;
    background-color: #ff3034;
    border-radius: 10px;
    &:hover{
        background-color: #fc4d50;
    }    
`
