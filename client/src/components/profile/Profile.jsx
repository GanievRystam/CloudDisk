import React, { useState } from "react"
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { changeEmail, deleteAvatar, uploadAvatar } from "../../action/user";

const Profile = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user.currentUser);
    const email = useSelector(state => state.user.currentUser.email)
    const [newEmail, setNewEmail] = useState('');
    function changeHandler(e){
        const file = e.target.files[0];
        dispatch(uploadAvatar(file))
    }
    function changeHandlerEmail(){
        dispatch(changeEmail(newEmail, currentUser));
        setNewEmail('');
    }
    return (
        <div className="container mx-auto flex flex-col">
            <div className="flex my-10 w-full">
                <input className="block w-full text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-violet-50 file:text-violet-700
                        hover:file:bg-violet-100" 
                        accept="image/*" onChange={e => changeHandler(e)} type="file"/>
                        <button onClick={() => dispatch(deleteAvatar())} className = "ml-10 text-slate-500 flex-initial w-64 border bg-[#EE204D] text-[#412227] hover:text-[#EE204D] h-10 hover:bg-transparent hover:border-red-900">Удалить аватар</button>
            </div>
            <div className="w-full text-center">
            <input
                type="text"
                className="
                    mb-5
                    form-control
                    block
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-gray-100 bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                "
                id="currendName"
                placeholder={email}
                disabled
                />
                <input
                    type="text"
                    className="
                        form-control
                        block
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                    "
                    id="exampleFormControlInput1"
                    placeholder="Новое имя"
                    value={newEmail}
                    onChange = {(event) => {setNewEmail(event.target.value)}}
                    />
                    
                    <button onClick={() => changeHandlerEmail()} className = "mt-10 text-slate-500 flex-initial w-64 border bg-[#44944A] text-[white] h-10  hover:border-[#2F4538]-900">Изменить</button>
            </div>
        </div>
    )
}


export default Profile;