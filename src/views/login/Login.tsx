import {FormEvent, useEffect, useState} from "react";
import './Login.scss';
import {InputChange} from "../../class/Common";
import {LoginModel} from "../../models/LoginModel";
import {validateEmail} from "../../class/Validaciones";
import * as reqresServices from "../../services/ReqresServices";
import {LocalStorageClass} from "../../class/LocalStorageClass";
import {AxiosError} from "axios";
import {useNavigate} from "react-router";
import SideBar from "../../components/side-bar/SideBar";

export const Login = (): JSX.Element => {

    const localStorageClass = new LocalStorageClass();

    const navigate = useNavigate();

    const initialLogin: LoginModel = {
        username: '',
        email: 'eve.holt@reqres.in',
        password: 'cityslicka',
    }

    const [login, setLogin] = useState<LoginModel>(initialLogin);

    const [validEmail, setValidEmail] = useState<string>('');

    const [validPasword, setValidPasword] = useState<string>('');

    const [sending, setSending] = useState(false);

    const [errorSignin, setErrorSing] = useState(false);

    useEffect(()=> {

        },[]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isValidForm()){
            try {
                const res = await reqresServices.postLogin(login);
                setSending(false);
                await localStorageClass.setSomeString(localStorageClass.TOKEN, JSON.stringify(res.data.token));
                navigate('/lista',{replace: true})


            } catch (error) {
                const err = error as AxiosError


                if (err.response) {
                    if (err.response.status == 401){
                        setSending(false);
                        setErrorSing(true);
                    }else{
                        setSending(false);
                        setErrorSing(true);
                        console.log(err.response.status)
                        console.log(err.response.data)
                    }

                }
            }
        }
    }

    const handleInputChange = (e: InputChange) => {
        setLogin({...login,[e.target.name]: e.target.value})
    }

    const isValidForm = () : boolean => {

        if (!validateEmail(login.email)){
            setValidEmail('Ingresa por favor una dirección de correo válida.')
            return false;
        }
        if (!login.password){
            setValidPasword('Ingresa por favor una contraseña.')
            return false;
        }

        return true;
    }

    return <>
        <div className="" id="login">
            <div className="container-fluid">
                <div className="container-lg">
                    <div className="card">
                        <div className="header text-center">
                            <h2>
                                Sign in
                            </h2>
                            <p className="lead">
                                Lorem ipsum dolor sit amet, consectetur <br/>
                                adipiscing elit. in nec nobh vitae...
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="form">
                            <input type="text"
                                   placeholder="Email"
                                   onChange={handleInputChange}
                                   name="email"
                                   value={login.email}
                                   className="form-control"/>
                            <span className="text-danger">
                                       {(validEmail) && validEmail}
                            </span>

                            <input type="password"
                                   placeholder="Password"
                                   onChange={handleInputChange}
                                   name="password"
                                   value={login.password}
                                   className="form-control"/>
                            <span className="text-danger">
                                         {(validPasword) && validPasword}
                            </span>


                            <button type="submit" className="btn btn-secondary w-100">
                                Sign In
                            </button>
                        </form>


                        <div className="footer">
                            <a href="src/views/login/Login#" id="forget-psw">
                                Forgot your Password?
                            </a>

                        </div>

                    </div>

                </div>
            </div>


        </div>


    </>
}