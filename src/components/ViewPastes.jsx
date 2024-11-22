import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const ViewPastes = () => {

    const {id} = useParams();

    const allPastes = useSelector((state) => state.paste.pastes);

    const paste = allPastes.filter((p) => p._id === id)[0];
    console.log("Final Pastes: ", paste)

    return(
        <div>
            <div className='flex flex-row gap-7 place-content-between'>
                <input className='p-1 rounded-2xl bg-black mt-3 text-white w-[60%] pl-4'
                    type="text"
                    placeholder='Enter title here'
                    value={paste.title}
                    disabled
                    onChange={(e) => setTitle(e.target.value)} />

                {/* <button onClick={createPaste}
                className='bg-zinc-700 text-white mt-3 bg-green-600'>
                    {
                        pasteId ? "Update My paste" : "Create My Paste"
                    }
                </button> */}
            </div>
            <div>
                <textarea className='bg-zinc-700 min-w-[500px] rounded mt-8 p-4 text-white'
                value={paste.content}
                placeholder='enter content here'
                onChange={(e) => setValue(e.target.value)}
                disabled
                rows={20}
                />
            </div>
        </div>
    )
}

export default ViewPastes
