import React, { useContext, useEffect, useState } from 'react'
import { BsChat } from "react-icons/bs"
import { FaRetweet } from "react-icons/fa"
import { AiOutlineHeart, AiOutlineShareAlt, AiFillHeart } from 'react-icons/ai'
import { RiDeleteBin5Line } from 'react-icons/ri'
import Moment from 'react-moment'

import { db } from "../firebase"
import { useRouter } from 'next/router'
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore'
import { useSession } from "next-auth/react"
import { AppContext } from '../contexts/AppContext'

const Post = ({id, post}) => {
    const [likes, setLikes] = useState([])
    const [liked, setLiked] = useState(false)
    const [comments, setComments] = useState([])
  
    const { data: session } = useSession()
  
  
    const [appContext, setAppContext] = useContext(AppContext)
  
    const router = useRouter()
    useEffect(
      () =>
        onSnapshot(
          query(
            collection(db, "postss", id, "comments"),
            orderBy("timestamp", "desc")
          ),
          (snapshot) => setComments(snapshot.docs)
        ),
      [db, id]
    )

  useEffect(
    () =>
      onSnapshot(collection(db, "postss", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  )

  useEffect(() =>
    setLiked(
      likes.findIndex((like) => like.id === session?.user?.uid) !== -1
    ), [likes]
  )

  const likePost = async () => {
    if (liked) {
      await deleteDoc(doc(db, "postss", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "postss", id, "likes", session.user.uid), {
        username: session.user.name,
      });
    }
  }

  const openModal = () => {
    setAppContext({
      ...appContext, 
      isModalOpen: true,
      post,
      postId: id
    })

    console.log('opening model ', appContext.post);
  }

    return (
        <div  className=" m-2 p-2 bg-[#fff] rounded-[10px] shadow-sm" >
              <div className='grid  gap-4'>
<div className="flex items-center" >
    <img src={post?.userImg} onClick={() => router.push(`posts/${id}`)} alt="Erour" className="w-[40px] h-[40px] rounded-full object-cover m-2" />



            <h1 className='font-medium text-[#000]'>{post?.username}</h1>

            <div className='flex'>
              <p className='text-gray-500'>@{post?.tag} &nbsp;·&nbsp;</p>
              <p className='text-gray-500'>
                <Moment  fromNow>{post?.timestamp?.toDate()}</Moment>
              </p>
            </div>
            </div>
            <a className="text-[#000] w-[100%]" >{post?.text}</a>
          <img
            className='max-h-[300px] w-[99%]  rounded-[20px] mt-2'
            src={post?.image}
            alt="" />
<hr />
<div className='flex justify-between text-[20px] mt-4 w-[80%]'>

<div className='flex gap-1 items-center'>
  <BsChat className='hoverEffect w-7 h-7 text-[#000] p-1' onClick={(e) => {
    e.stopPropagation()
    openModal()
  }} />
  {comments.length > 0 && (<span className='text-sm'>{comments.length}</span>)}
</div>

{session?.user?.uid !== post?.id ? (
              <FaRetweet className='hoverEffect w-7 h-7 p-1 cursor-pointer' />
            ) : (
              <RiDeleteBin5Line className='hoverEffect text-[#000] cursor-pointer w-7 h-7 p-1'
                onClick={(e) => {
                  e.stopPropagation();
                  deleteDoc(doc(db, "postss", id));
                }} />
            )}

<div className='flex gap-1 items-center'
  onClick={(e) => {
    e.stopPropagation()
    likePost()
  }}>
  {liked ? <AiFillHeart className='hoverEffect w-7 h-7 p-1 text-pink-700 cursor-pointer' />
    : <AiOutlineHeart className='hoverEffect text-[#000] w-7 h-7 p-1 cursor-pointer' />}

  {likes.length > 0 && (<span className={`${liked && "text-pink-700"} text-sm`}>{likes.length}</span>)}
</div>

<AiOutlineShareAlt className='hoverEffect text-[#000] w-7 h-7 p-1 cursor-pointer' />
</div>

</div>

          </div>

        


      
    );
}

export default Post;
