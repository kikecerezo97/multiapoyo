import {FormEvent, useEffect, useState} from "react";
import './User.scss';
import {UserModel} from "../../models/UserModel";
import {InputChange} from "../../class/Common";
import {GetUsers, UpdatetUser} from "../../actions/ListUserActions";
import {useDispatch, useSelector} from "react-redux";
import {RootStore} from "../../Store";

interface UserProps {
    user: UserModel;
    editable: boolean;
}

export const User = (props: UserProps): JSX.Element => {

    const dispatch = useDispatch();

    const listUserState = useSelector((state: RootStore) => state.listUsers);

    const initialUser: UserModel = {
        id: 0,
        email: '',
        first_name: '',
        last_name:'',
        avatar: ''
    }

    const [user, setUser] = useState<UserModel>(initialUser);

    const [editablefirst_name, setEditablefirst_name] = useState(false);

    const [editablelastname, setEditablelasname] = useState(false);

    const [editableemail, setEditableemail] = useState(false);


    useEffect(()=> {
        setUser(props.user)
    },[props.user]);

    const handleInputChange = (e: InputChange) => {
        const auxUser = {...user,[e.target.name]: e.target.value};
        setUser(auxUser)
        // simular la actizalizar la lista que tenemos en redux
        dispatch(UpdatetUser(listUserState.listUser!,auxUser));
    }
    return <>
        <div className="" id="user-component">
            <img src={user.avatar}
                    className="
                     d-block
                     mx-auto
                     img-fluid
                     rounded-circle
                     img-thumbnail
                     img-avatar"/>

                {props.editable == false ?(
                    <>
                        <h4>
                            {props.user.first_name}
                        </h4>
                    </>
                    ):
                        <div className={(editablefirst_name == false) ? " no-editable": ""}>
                            <div className="input-group">
                            <input type="text"
                                   value={user.first_name}
                                   onChange={handleInputChange}
                                   name="first_name"
                                   disabled={!props.editable || editablefirst_name == false }
                                   className="form-control" id="inputGroupSelect04"/>
                            <button className="btn btn-outline-secondary"
                                    onClick={
                                        ()=> {
                                            setEditablefirst_name(editablefirst_name? false: true);
                                        }
                                    }
                                    type="button">

                                <i className="bi bi-pencil"></i>
                            </button>
                        </div>
                        </div>
                }

                {props.editable == false?(
                        <>
                            <h4>
                                {props.user.last_name}
                            </h4>
                        </>
                    ):
                    <div className={(editablelastname == false) ? " no-editable": ""}>
                        <div className="input-group">
                            <input type="text"
                                   value={user.last_name}
                                   onChange={handleInputChange}
                                   name="last_name"
                                   disabled={!props.editable || editablelastname == false }
                                   className="form-control" id="inputGroupSelect04"/>
                            <button className="btn btn-outline-secondary"
                                    onClick={
                                        ()=> {
                                            setEditablelasname(editablelastname? false: true);
                                        }
                                    }
                                    type="button">

                                <i className="bi bi-pencil"></i>
                            </button>
                        </div>
                    </div>
                }

            {props.editable == false?(
                    <>
                        <h5>
                            {props.user.email}
                        </h5>
                    </>
                ):
                <div className={(editableemail == false) ? " no-editable": ""}>
                    <div className="input-group">
                        <input type="text"
                               value={user.email}
                               onChange={handleInputChange}
                               name="email"
                               disabled={!props.editable || editableemail == false }
                               className="form-control" id="inputGroupSelect04"/>
                        <button className="btn btn-outline-secondary"
                                onClick={
                                    ()=> {
                                        setEditableemail(editableemail? false: true);
                                    }
                                }
                                type="button">

                            <i className="bi bi-pencil"></i>
                        </button>
                    </div>
                </div>
            }

        </div>


    </>
}