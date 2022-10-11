import React, { useEffect, useState } from 'react';
import {Accordion, Button, Nav, Navbar} from 'react-bootstrap';
import './SideBar.scss';
import Dropdown from 'react-bootstrap/Dropdown';
import logo from '../../assets/ico/Portada.png';
import {useSelector} from "react-redux";
import {RootStore} from "../../Store";
import {useNavigate} from "react-router";
import {User} from "../user/User";
import * as jsonPlaceHoServices from "../../services/JsonPlaceHolder";
import {AxiosError} from "axios";
import {PostModel} from "../../models/PostModel";
import {Link} from "react-router-dom";
import {LocalStorageClass} from "../../class/LocalStorageClass";

const SideBar = () => {

    const localStorageClass = new LocalStorageClass();

    const navigate = useNavigate();

    const userState = useSelector((state: RootStore) => state.user);

    // side bar
    const [openSideBar, setOpenSideBar] = useState(false);

    const [listPosts, setListPosts] = useState<PostModel []>([]);

    const [loadingPosts, setLoadingPosts] = useState(false);

    const [TOKEN, setTOKEN] = useState<string>(localStorageClass.getSomeString(localStorageClass.TOKEN));

    useEffect(() => {
        if (userState.user != undefined){
            getPostsUser(userState.user.id);
            open();
        }

        //si no hay un token guardado
        if (!TOKEN) {
            // redireccionar
            navigate('/', {replace: true})
        }


    }, [userState]);

    const open = () => {
        if (!openSideBar) {
            setOpenSideBar(true);
            // @ts-ignore
            document.getElementById('mySidenav').style.width = '450px';
            // @ts-ignore
            document.getElementById('coverNav').style.width = '100%';
        } else {
            close()
        }

    };

    const close = () => {
        setOpenSideBar(false);
        // @ts-ignore
        document.getElementById('mySidenav').style.width = '0';
        // @ts-ignore
        document.getElementById('coverNav').style.width = '0';


    };

    const closeSession = () => {
        localStorage.removeItem(localStorageClass.TOKEN);
        redirectLogin();

    }

    const redirectLogin = () => {
        navigate('/',{replace: true})
    }

    const getPostsUser = async (idUser: number) => {
        setLoadingPosts(true);
        try {
            const res = await jsonPlaceHoServices.getPosts(idUser);
            setLoadingPosts(false);
            setListPosts(res.data);


        } catch (error) {
            const err = error as AxiosError
            if (err.response) {
                setLoadingPosts(false);

            }
        }

    }

    const deletePost = (indice: number) => {
      const auxlistPosts = [...listPosts];
      auxlistPosts.splice(indice, 1 )
        setListPosts(auxlistPosts);
    }



    return (
        <div id="nav-bar">

            <Navbar fixed="top">
                <Navbar.Brand>
                    <Link to="/lista">
                        <img
                            src={logo}
                            width="112" height="53.3"
                            onClick={open}
                            className="d-inline-block align-top ico-multiapoyo"
                            alt="Logo Liberty Fianzas"
                        />
                    </Link>

                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Nav className="me-auto">

                    </Nav>
                    <Navbar.Text className="">
                        <Dropdown>
                            <Dropdown.Toggle variant="Primary" id="dropdown-basic">
                                Cerrar Sesión
                            </Dropdown.Toggle>
                            <Dropdown.Menu>

                                <Dropdown.Item
                                onClick={() => {
                                    closeSession();
                                }}>
                                    Salir <i className="bi bi-box-arrow-right"></i>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>

            <div id="mySidenav" className="panel-group bg-light side-nav">


                {(userState.user!= undefined) &&
                    <>
                        <a onClick={()=>{
                            close();
                            navigate('/album/' +userState.user?.id ,{replace:true})
                        }
                        }>
                            <button type="button" className="btn btn-light btn-lg">

                                <i className="bi bi-card-image"></i> Ir al Album
                            </button>
                        </a>

                        <User
                            user={userState.user!}
                            editable={true}/>


                        {listPosts.map((post,index) =>
                            <div
                                key={index}
                                className="col-md-12 post"
                            >
                                <hr/>
                                <br/>
                                {post.body}

                                <br/>
                                <Button variant="outline-danger"
                                        onClick={() => {
                                            deletePost(index)
                                        }}
                                        className="delete">Borrar</Button>


                            </div>
                        )}

                    </>


                }




            </div>

            <div id="coverNav" onClick={close} className="background-nav"></div>



        </div>
    );
};

export default SideBar;