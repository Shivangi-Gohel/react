import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

const Paste = () => {

    const pastes = useSelector((state) => state.paste.pastes);
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();

    const filteredData = pastes.filter(
        (paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    function handleDelete(pasteId) {
        dispatch(removeFromPastes(pasteId));
    }

    return (
        <div>
            <input className='p-2 rounded-2xl min-w-[600px] mt-5 bg-black text-white'
            type="search"
            placeholder='search here'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <div className='flex flex-col gap-5 text-white mt-5'>
                {
                    filteredData.length > 0 &&
                    filteredData.map(
                        (paste) => {
                            return(
                                <div className='border'>
                                    <div>
                                        {paste.title}
                                    </div>
                                    <div>
                                        {paste.content}
                                    </div>
                                    <div className='text-white'>
                                        <button className='bg-black h-auto m-2'>
                                            <a href={`/?pasteId=${paste?._id}`}>
                                            Edit
                                            </a>
                                        </button>
                                        <button className='bg-black h-auto m-1'>
                                            <a href={`pastes/${paste?._id}`}>
                                                View
                                            </a>
                                        </button>
                                        <button className='bg-black h-auto m-1'
                                        onClick={() => handleDelete(paste._id)}
                                        >Delete</button>
                                        <button className='bg-black h-auto m-1'
                                        onClick={() => {
                                            navigator.clipboard.writeText(paste?.content)
                                            toast.success("coppied to clipboard")
                                        }}
                                        >Copy</button>
                                        <button className='bg-black h-auto m-1'>Share</button>
                                    </div>
                                    <div>
                                        {paste.createdAt}
                                    </div>
                                </div>
                            )
                        }
                    )
                }
            </div>
        </div>
    )
}

export default Paste
