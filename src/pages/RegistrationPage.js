import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../contexT/AuthContext";

export const RegistrationPage=()=>{
   const auth = useContext(AuthContext)
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/items/register', 'POST', {...form})
            message(data.message)
            auth.login(data.token, data.userId)
        } catch (e) {
            console.log(e+'eeeeeeeee')
        }
    }


    return(
        <div>
            <div className="row col s6 offset-s3">
            <div className="card col s6 offset-s3" >
                        <div className="card-content white-text col s6 offset-s3 m8 ">
                            <span
                                className="card-title col s6 offset-s5"
                            >Registration</span>
                        </div>


                        <div  className="input-field col s7 offset-s1 ">
                            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
                            <i className="material-icons prefix">person</i>
                            <input
                                placeholder="Name"
                                id="name"
                                type="text"
                                name="name"
                                className="yellow-input"
                                onChange={changeHandler}
                            />
                        </div>

                        <div className="input-field col s7 offset-s1">
                            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
                            <i className="material-icons prefix">email</i>
                            <input
                                placeholder="Email"
                                id="email"
                                type="text"
                                name="email"
                                className="yellow-input"
                                onChange={changeHandler}
                            />

                        </div>

                        <div className="input-field col s7 offset-s1">
                            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
                            <i className="material-icons prefix">lock</i>
                            <input placeholder="Password"
                                   id="password"
                                   type="password"
                                   name="password"
                                   className="yellow-input"
                                   onChange={changeHandler}
                            />
                        </div>

                        <div className="card-action col s6 offset-s4">

                            <button
                                className="btn yellow accent-3 black-text  "
                                onClick={registerHandler}
                                disabled={loading}
                            >
                                Register
                            </button>
                        </div>
                    </div>

            </div>
        </div>
    )
}