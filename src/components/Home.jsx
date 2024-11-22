import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {
    const [title, setTitle] = useState('')
    const [value, setValue] = useState('')
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId")
    const dispatch = useDispatch();
    const allPastes = useSelector((state) => state.paste.pastes);

    useEffect(() => {
        if(pasteId){
            const paste = allPastes.find((p) => p._id === pasteId)
            setTitle(paste.title)
            setValue(paste.content)
        }
    }, [pasteId])

    function createPaste() {
        const paste = {
            title: title,
            content: value,
            _id: pasteId ||
                Date.now().toString(36),
            createdAt: new Date().toISOString()
        }


        if(pasteId) {
            //update
            dispatch(updateToPastes(paste))
        }
        else{
            //create
            dispatch(addToPastes(paste))
        }

        //after createion or updation
        setTitle('');
        setValue('')
        setSearchParams({})
    }

    return (
        <div>
            <div className='flex flex-row gap-7 place-content-between'>
                <input className='p-1 rounded-2xl bg-black mt-3 text-white w-[60%] pl-4'
                    type="text"
                    placeholder='Enter title here'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />

                <button onClick={createPaste}
                className='text-white mt-3 bg-green-600'>
                    {
                        pasteId ? "Update My paste" : "Create My Paste"
                    }
                </button>
            </div>
            <div>
                <textarea className='bg-zinc-700 min-w-[500px] rounded mt-8 p-4 text-white'
                value={value}
                placeholder='enter content here'
                onChange={(e) => setValue(e.target.value)}
                rows={20}
                />
            </div>
        </div>
    )
}

export default Home
