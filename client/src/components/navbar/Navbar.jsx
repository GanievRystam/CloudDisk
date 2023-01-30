
import React from 'react';
import './navbar.css'
import Logo from '../../assets/navbar-logo.svg'
import {NavLink} from "react-router-dom";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../reducers/userReducer';
import { getFiles, searchFiles } from '../../action/file';
import { showLoader } from '../../reducers/appReducer';
import avatarLogo from '../../assets/carbon_user-avatar-filled.svg'
import { API_URL } from '../../config';
const Navbar = () => {
    const isAuth = useSelector(state => state.user.isAuth);
    const currentDir = useSelector(state => state.files.currentDir);
    const currentUser = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch()
    const [searchName, setSearchName] = useState('');
    const [searchTimeout, setSearchTimeout] = useState(false);
    const avatar = currentUser.avatar ? `${API_URL +  currentUser.avatar}`: avatarLogo;
    const email = useSelector(state => state.user.currentUser.email)
    function seatchChangeHandler(e) {
        setSearchName(e.target.value);
        if(searchTimeout != false){
            clearTimeout(searchTimeout);
        }
        dispatch(showLoader());
        if(e.target.value != ""){
            setSearchTimeout(setTimeout( (value) => {
                dispatch(searchFiles(value));
            }, 500, e.target.value))    
        }else{
            dispatch(getFiles(currentDir))
        }
        
    }
    return (
        
        <div className="relative
        w-full
        flex flex-wrap
        items-center
        justify-between
        bg-gray-100
        text-gray-500
        hover:text-gray-700
        focus:text-gray-700
        shadow-lg
        navbar navbar-expand-lg navbar-light h-16">
            <div className="container m-auto">
                <img src={Logo} alt="" className="h-12 w-12 object-cover rounded-full"/>
                <div className="navbar__header">MERN CLOUD</div>
                {!isAuth &&
                    <div className="navbar__login"><NavLink to="/login">Войти</NavLink></div>
                }
                {isAuth &&
                    <input type="text" className='navbar__search' placeholder='What do you need?' value={searchName} onChange = {(e) => seatchChangeHandler(e)}/>
                }
                
                {isAuth &&
                    <div className="navbar__login" onClick={() => dispatch(logout())}>Выйти</div>
                }
                {!isAuth &&
                <div className="navbar__registration"><NavLink to="/registration">Регистрация</NavLink></div>
                }
                {isAuth && <NavLink to ='/profile'>
                <div className="shrink-0">
                    <img className="h-12 w-12 object-cover rounded-full" src={avatar} alt="Current profile photo" />
                </div>
                </NavLink>
                }
                <div className="shrink-0 ml-2">
                    <h5>{email}</h5>
                </div>
            </div>
        </div>
    );
};

export default Navbar;