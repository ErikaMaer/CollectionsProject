import React, {useContext, useEffect, useState} from "react";
import './AddCollectionPage.css'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../contexT/AuthContext";
import {useMessage} from "../hooks/message.hook";
import {useHistory, useParams} from "react-router-dom";



export const AddItemPage=()=>{
    const { request, error, clearError} = useHttp();
    const auth=useContext(AuthContext)
    const history=useHistory();
    const message = useMessage();
    const [item, setItem]=useState({
        title: '', description:''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const createItem = async ()=> {
        try {
            const data = await request('/api/item/generate', 'POST', {...item},
                {Authorization:`Bearer ${auth.token}`})
            console.log(data,'dataaaaaaaaaaaaaaa')
            await history.push(`/cardItems/${CardId}`)
        } catch (e) {
            console.log(e,'errooooooooooooooor')
        }
    }

    const changeHandler = event => {
        setItem({...item, [event.target.name]: event.target.value})
    }

    const CardId = useParams().id

    const back = async () =>{
        try{
            await history.push(`/api/item/${CardId}`)
        }catch (e) {
            console.log(e,'errooooooooooooooor')
        }}




    return (
        <div>
            <ul className="header ">
                <li className="header-title col s4 offset-3">Create Item</li>
            </ul>
            <div className="widget col s1 offset-1 ">
            </div>


            <ul className="collection">
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
                <li className="collection-item img">
                    <div className="input-field col s7 offset-s1">

                        <input
                            placeholder="Name of item"
                            id="title"
                            type="text"
                            name="title"
                            className="yellow-input"
                            value={item.title}
                            onChange={changeHandler}
                        />
                    </div>

                    <div className="input-field col s7 offset-s1">
                        <input
                            placeholder="Description"
                            id="description"
                            type="text"
                            name="description"
                            className="yellow-input"
                            value={item.description}
                            onChange={changeHandler}
                        />
                    </div>

                    <button
                        className="btn brown darken-3 "
                        onClick={createItem}
                    >
                        Create
                    </button>

                </li>

            </ul>
            <a
                className="text black-text"
                onClick={back}
            >
                Back
            </a>
        </div>

    );
};