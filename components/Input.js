import React, { useState } from 'react'
import { BsImage, BsEmojiSmile, BsX } from "react-icons/bs"
import { AiOutlineGif, AiOutlineClose } from "react-icons/ai"
import { RiBarChart2Line } from "react-icons/ri"
import { IoCalendarNumberOutline } from "react-icons/io5"
import { HiOutlineLocationMarker } from "react-icons/hi"
import { useSession } from 'next-auth/react'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db, storage } from '../firebase'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import Link from 'next/link'



const Input = () => {
    const { data: session } = useSession()
    const [selectedFile, setSelectedFile] = useState(null)
    const [showEmojis, setShowEmojis] = useState(false)
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)


    const addImageToPost = (e) => {

        const reader = new FileReader()
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
        }

        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result)
        }

    }

    const addEmoji = (e) => {
        let sym = e.unified.split("-")
        let codesArray = []
        sym.forEach((el) => codesArray.push("0x" + el))
        let emoji = String.fromCodePoint(...codesArray)
        setInput(input + emoji)
    }

    const sendPost = async () => {
        if (loading)
            return

        setLoading(true)

        const docRef = await addDoc(collection(db, 'postss'), {
            id: session.user.uid,
            username: session.user.name,
            userImg: session.user.image,
            tag: session.user.tag,
            text: input,
            timestamp: serverTimestamp(),
        })

        const imageRef = ref(storage, `postss/${docRef.id}/image`)

        if (selectedFile) {
            await uploadString(imageRef, selectedFile, "data_url")
                .then(async () => {
                    const downloadURL = await getDownloadURL(imageRef);
                    await updateDoc(doc(db, "postss", docRef.id), {
                        image: downloadURL,
                    })
                })
        }

        setLoading(false)
        setInput("")
        setSelectedFile(null)
        setShowEmojis(false)

    }
    const [showIframe, setShowIframe] = useState(false)
    const [showIframes, setShowIframes] = useState(false)
    function handleClick() {
        setShowIframe(true)  
      }
      function handleClicks() {
        setShowIframes(true)  
      }
    return (
        <div className={` p-2    m-[6px] bg-[#fff]  rounded-[12px] shadow-md ${loading && "opacity-60"}`} >
            <div className="gird  gap-4" >
<div className="flex p-2" >
    <img  className="rounded-[59.8px] m-[2px]  cursor-pointer object-contain w-[40px]" onClick={() => setShowIframe(prev => !prev)} src={session.user?.image} />
<a className="text-[19px]" >{session?.user?.name}</a>
<div className="" >
    <br />
<a className="text-[16px] " >@{session?.user?.tag}</a>

</div>
</div>

<div className="w-[90%]  " >
    <input value={input} className="   p-2 m-2 w-[100%] h-[40px] bg-[#ebebeb] rounded-[12px]" onChange={(e) => setInput(e.target.value)} placeholder={`ماذا تفكر يا ${session?.user?.name} ?`} />
    {selectedFile && (
                 <div className="relative mb-4">
                 <div className='absolute w-8 h-8 bg-[#15181c] hover:[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer' onClick={() => setSelectedFile(null)}>
                     <AiOutlineClose className='text-white h-5' />
                 </div>

                 <img
                     src={selectedFile}
                     alt=""
                     className='rounded-2xl max-h-80 object-contain' />

             </div>
    )}
    
  
{!loading && (
                        <div className='flex justify-between items-center'>

                            <div className='flex gap-4 text-[20px] text-[#000000]'>

                                <label htmlFor="file">
                                    <BsImage className='cursor-pointer' />
                                </label>

                                <input id="file" type="file"
                                    hidden

                                    onChange={addImageToPost}
                                />

                                <div className='border-[#000000] border rounded h-[18px] text-[16px] grid place-items-center'>
                                    <AiOutlineGif />
                                </div>
                          
                                <BsEmojiSmile className='cursor-pointer' onClick={() => setShowEmojis(!showEmojis)} />
                                <IoCalendarNumberOutline />
                                <HiOutlineLocationMarker className="cursor-pointer" onClick={() => setShowIframes(prev => !prev)} />
                            </div>
                          
                            <button
                                className="bg-[#0f56ee] text-white rounded-[12px] px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
                                disabled={!input.trim() && !selectedFile}
                                onClick={sendPost} >
                                نشر
                            </button>

                          

                        </div>
                    )}

{showEmojis && (
                        <div className='absolute mt-[10px] -ml-[40px] max-w-[320px] rounded-[20px]'>
                            <Picker
                                onEmojiSelect={addEmoji}
                                data={data}
  className="w-[100%]"
                                theme="white"
                            />
                        </div>
                    )}
                    {
                          showIframes && (
                            <div className="w-[14em] h-[20em] p-2 justify-self-center rounded-[12px] bg-[#fff] shadow-md fixed" >  
                          <div  className="flex justify-between items-center" >   <a className="text-[19px]" >Yaznbook Map</a> <BsX className="cursor-pointer"  onClick={() => setShowIframes(prev => !prev)} /></div>
                           
                             <a className="text-[13px]" >نشر خريطه في منشورك</a>
                             <br />
                             <br />
                             <input disabled title='قريبا...' className="w-[100%] p-2 h-[28px] bg-[#fff] shadow-md rounded-[10px] " />
                                </div>
                          )
                    }
                    {
    showIframe && (
       
       <div className="w-[14em] h-[20em] p-2 justify-self-center rounded-[12px] bg-[#fff] shadow-md fixed" >
 <div className="flex items-center" >
     <img  className="rounded-[59.8px] m-[2px]  cursor-pointer object-contain w-[40px]"  src={session.user?.image} />
<a>{session?.user?.name}</a>
<a className="text-[16px] m-2 " >@{session?.user?.tag}</a>
</div>
<a>الايميل | {session?.user?.email}</a>
      <br />
      <br />
      <Link className="text-[#141414] hover:text-[#3a3a3a]" href="https://myaccount.google.com/">تغير صوره حسابك / اسم حسابك</Link>
        </div>
    )
}

</div>
            </div>
        </div>
    );
}

export default Input;
