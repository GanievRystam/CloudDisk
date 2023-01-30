import React from 'react'
import './file.css'
import {useDispatch, useSelector} from "react-redux"
import dirLogo from '../../../../assets/dir.svg'
import fileLogo from '../../../../assets/file.svg'
import { pushToStack, setCurrentDir } from '../../../../reducers/fileReducer'
import { deleteFile, downloadFile } from '../../../../action/file'
import sizeFormat from '../../../../utils/sizeFormat'

const File = ({file}) =>  {
    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.files.currentDir);
    const filesView = useSelector(state => state.files.view)
    
    function OpenDirHandler(file){
        if(file.type === "dir"){
            dispatch(pushToStack(currentDir));
            dispatch(setCurrentDir(file._id));
        }
    }
    function downloadClickHandler(e){
        e.stopPropagation();
        downloadFile(file);
    }
    function deleteClickHandler(e){
        e.stopPropagation();
        dispatch(deleteFile(file));
    }
    if(filesView === "list"){
    return (
        <div className='file' onClick={() => OpenDirHandler(file)}>
            <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className="file__img"/>
            <div className="file__name">{file.name}</div>
            <div className="file__date">{file.date.slice(0, 10)}</div>
            <div className="file__size">{sizeFormat(file.size)}</div>
        { file.type !== "dir" && <button onClick={(e) => { downloadClickHandler(e) }} className='file__btn file__download text-slate-500 flex-initial w-24 border bg-[#44944A] text-[white] h-8  hover:border-[#2F4538]-900 ml-8'>download</button> }
            <button onClick={(e) => deleteClickHandler(e)} className='file__btn file__delete text-slate-500 border bg-[#EE204D] text-[#412227] hover:text-[#EE204D] h-8 hover:bg-transparent hover:border-red-900 w-24 ml-8'>delete</button>
        </div>
        )
    }
    if (filesView === 'plate') {
        return (
            <div className='file-plate' onClick={() => OpenDirHandler(file)}>
                <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className="file-plate__img"/>
                <div className="file-plate__name">{file.name}</div>
                <div className="file-plate__btns">
                    {file.type !== 'dir' &&
                    <button onClick={(e) => downloadClickHandler(e)} className="file-plate__btn file-plate__download text-slate-500 flex-initial w-24 border bg-[#44944A] text-[white] h-8  hover:border-[#2F4538]-900 ml-8">download</button>}
                    <button onClick={(e) => deleteClickHandler(e)} className="file-plate__btn file-plate__delete text-slate-500 border bg-[#EE204D] text-[#412227] hover:text-[#EE204D] h-8 hover:bg-transparent hover:border-red-900 w-24 ml-8">delete</button>
                </div>
            </div>
        );
    }
}

export default File;