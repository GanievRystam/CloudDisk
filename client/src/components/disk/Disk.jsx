import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles, createDir, uploadFile } from '../../action/file';
import FileList from './fileList/FileList';
import "./disk.css"
import Popup from "./popup.jsx"
import { setCurrentDir, setPopupDisplay, setView } from '../../reducers/fileReducer';
import Uploader from './uploader/Uploader';
const Disk = () => {
    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.files.currentDir);
    const dirStack = useSelector(state => state.files.dirStack);
    const loader = useSelector(state => state.app.loader);
    const [dragEnter, setDragEnter] = useState(false);
    const [sort, setSort] = useState('type');

    useEffect(() => {
        dispatch(getFiles(currentDir, sort))
    }, [currentDir, sort]);

    
    function showPopupHandler (){
        dispatch(setPopupDisplay("flex"))
    }
    
    function backClickHandler(){
        const backDirId = dirStack.pop();
        dispatch(setCurrentDir(backDirId));
    }

    function fileUploadHandler(event) {
        const files = [...event.target.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
    }

    function dragEnterHandler(event){
        event.preventDefault();
        event.stopPropagation();
        setDragEnter(true);
        
    }
    function dragLeaveHandler(event){
        event.preventDefault();
        event.stopPropagation();
        setDragEnter(false);
        
    }

    function dropHandler (event) {
        event.preventDefault();
        event.stopPropagation();
        let files = [...event.dataTransfer.files];
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
        setDragEnter(false);
    }
    if(loader){
        return(
            <div className='loader'>
                <div className='lds-dual-ring'></div>
            </div>
        )
    }
    return ( !dragEnter ?
        <div className="disk" onDragEnter={dragEnterHandler} onDragLeave = {dragLeaveHandler} onDragOver = {dragEnterHandler}>
            <div className="disk__btns justify-around">
                <button className="disk__back" onClick={() => backClickHandler()}>Назад</button>
                <button className="disk__create" onClick={() => showPopupHandler ()}>Создать папку</button>
                <div className="disk__upload">
                    <label htmlFor="disk__upload-input" className="disk__upload-label">Загрузить файл</label>
                    <input multiple={true} onChange={(event)=> fileUploadHandler(event)} type="file" id="disk__upload-input" className="disk__upload-input"/>
                </div>
                <select className='disk__select cursor-pointer
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding bg-no-repeat
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"' value={sort} onChange = {(e) => setSort(e.target.value)}>
                    <option value="name">По имени</option>
                    <option value="type">По типу</option>
                    <option value="date">По дате</option>
                </select>
                <button className='disk__list' onClick={() => dispatch(setView('plate'))}/>
                <button className='disk__plate' onClick={() => dispatch(setView('list'))}/>
            </div>
            <FileList/>
            <Popup />
            <Uploader/>
        </div>
        :
        <div className='drop-area' onDrop={(event) => dropHandler (event)} onDragEnter={dragEnterHandler} onDragLeave = {dragLeaveHandler} onDragOver = {dragEnterHandler}>
            Перетащите файлы сюда
        </div>
    )
}

export default Disk;