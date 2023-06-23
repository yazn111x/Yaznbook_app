import React, { useEffect, useState } from 'react'
import { BsArrowLeft } from "react-icons/bs"
import Input from './Input'
import Post from './Post'
import { onSnapshot, collection, query, orderBy, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useRouter } from 'next/router';
import Comment from './Comment';

const SinglePost = () => {

    const [post, setPost] = useState([])
    const router = useRouter()
    const { id } = router.query;
    const [comments, setComments] = useState([])

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
            onSnapshot(doc(db, "postss", id), (snapshot) => {
                setPost(snapshot.data());
            }),
        [db]
    )

    return (
        <section className='sm:ml-[81px] xl:ml-[340px] w-[600px] min-h-screen   text-white py-2'>
     
            <div className='sticky text-[#000] top-0 flex items-center gap-4 font-medium text-[20px] px-4 py-2'>
                <BsArrowLeft className='cursor-pointer' onClick={() => router.push(`/`)} />
                منشورات
            </div>

            <Post id={id} post={post} />

          
                {comments.length > 0 && (
                    <div className="pb-72">
                        {comments.map((comment) => (
                            <Comment
                                key={comment.id}
                                id={comment.id}
                                comment={comment.data()}
                            />
                        ))}
                    </div>
                )}



        </section>
    )
}

export default SinglePost