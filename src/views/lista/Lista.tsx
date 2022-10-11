import {useEffect, useState} from "react";
import './Lista.scss';
import {loadPaginationList} from "../../class/Common";
import Lottie from "lottie-react";
import * as reqresServices from "../../services/ReqresServices";
import {AxiosError} from "axios";
import SideBar from "../../components/side-bar/SideBar";
import {UserModel} from "../../models/UserModel";
import {Pagination} from "react-bootstrap";
import {PagesUsersModel} from "../../models/PagesUsersModel";

import loadingLottie from "../../assets/lottie/99274-loading.json";
import {useDispatch, useSelector} from "react-redux";
import {GetUser} from "../../actions/UserActions";
import {GetUsers} from "../../actions/ListUserActions";
import {User} from "../../components/user/User";
import {RootStore} from "../../Store";

export const Lista = (): JSX.Element => {

    const dispatch = useDispatch();



    const listUserState = useSelector((state: RootStore) => state.listUsers);

    const [listUsers, setListUsers] = useState<UserModel []>([]);

    const [loadingUsers, setLoadingUsers] = useState(false);


    const [paginacion, setPaginacion] = useState<PagesUsersModel>({
        page:1,
        per_page:3,
        total:0,
        total_pages:0,
        data:[]
        }
    );

    const [listPaginacion, setListPaginacion] = useState<number[]>([]);



    useEffect(()=> {
        getUsers(paginacion.page, paginacion.per_page)
        },[]);


    const getUsers = async (page: number, perPage: number) => {


        setLoadingUsers(true);
        try {
            const res = await reqresServices.getUsers(page,perPage);
            setLoadingUsers(false);
            const auxListUsers: UserModel[] = res.data.data
            setListUsers(auxListUsers);
            dispatch(GetUsers(auxListUsers));
            setPaginacion(res.data)
            setListPaginacion(loadPaginationList(res.data.total_pages,res.data.page));


        } catch (error) {
            const err = error as AxiosError

            if (err.response) {
                setLoadingUsers(false);

            }
        }
    }

    const clickGoToPage = (page: number) => {
        const totalPages: number = paginacion.total_pages;
        if (page>=1 &&  page <= totalPages){
            const auxPaginacion = paginacion;
            auxPaginacion.page = page
            setPaginacion(auxPaginacion);
            getUsers(page,auxPaginacion.per_page);
        }
    }

    const selectUser = (idUser: number) => {
        dispatch(GetUser(idUser))
    };

    return <>
        <div className="" id="lista">
            <SideBar/>
            <div className="container-fluid">
                <div className="container">
                    <h3>
                        Lista de Usuarios <br/>
                    </h3>

                    {(!loadingUsers)?(
                        <>
                            <div className="row">
                                {(listUserState.listUser != undefined) &&
                                <>
                                    {listUsers.map((user,index) =>
                                        <div
                                            key={index}
                                            className="col-md-4 text-center user-card"
                                            onClick={()=> {
                                                selectUser(user.id)
                                            }}

                                        >
                                            <User
                                                user={user}
                                                editable={false}
                                            />


                                        </div>
                                    )}
                                </>


                                }

                            </div>

                            <div className="row">
                                <div className="col-md-9"></div>
                                <div className="col-md-3 text-center">
                                    <Pagination >
                                        <Pagination.First
                                            onClick={()=>{
                                                clickGoToPage((listPaginacion.length==0)? 1:listPaginacion[0])
                                            }}
                                        />
                                        <Pagination.Prev
                                            onClick={()=>{
                                                clickGoToPage((paginacion.page-1)==0? 1:(paginacion.page-1)  )
                                            }}
                                        />
                                        {
                                            listPaginacion.map((i, index) =>
                                                ( <Pagination.Item
                                                        key={i}
                                                        active={i === paginacion.page}
                                                        onClick={()=>{
                                                            clickGoToPage(i)
                                                        }}>
                                                        {i}
                                                    </Pagination.Item>

                                                ))
                                        }
                                        <Pagination.Next
                                            onClick={()=>{
                                                clickGoToPage(listPaginacion[listPaginacion.length-1]+1)
                                            }}
                                        />
                                        <Pagination.Last
                                            onClick={()=>{
                                                clickGoToPage(listPaginacion[listPaginacion.length-1])
                                            }}
                                        />
                                    </Pagination>
                                </div>


                            </div>
                        </>
                    ):<>
                        <div className="col-12 text-center">

                            <div className="loading d-block mx-auto">
                                Cargando...
                                <Lottie  animationData={loadingLottie}/>
                            </div>

                        </div>

                    </>}



                </div>




            </div>


        </div>


    </>
}