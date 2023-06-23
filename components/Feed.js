import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { HiOutlineSparkles } from "react-icons/hi"
import Input from "./Input"
import Post from "./Post";
import { useSession } from "next-auth/react";

import { toast } from 'react-toastify';
import Link from "next/link";

function handleSubmit(event) {
  event.preventDefault();
  // إرسال نموذج
  // عرض إشعار عندما يتم إرسال النموذج بنجاح
  toast.success('تم إرسال النموذج بنجاح!');
}

const Feed = () => {
    const [copyText, setCopyText] = useState('<a href="https://yaznbook.com/" >تسجيل باستخدام يزنبوك</a>');
const {data:session} = useSession();
    const handleCopyClick = () => {
      navigator.clipboard.writeText(copyText);

    };

const [postss, setPostss] = useState([])

useEffect(
    () => onSnapshot(
    query(collection(db, "postss"), orderBy("timestamp", "desc")),
    (snapshot) => {
        setPostss(snapshot.docs)
    }
    ), [db]
)

function handleClick() {
    setShowIframe(true)  
  }

    return(
        <section className='    -scroll-m-0 sm:ml-[81px] xl:ml-[340px] w-[600px]   py-2 h-[100%]'>

       <br />
       <br />
     
       <div className="p-2 flex bg-[#fff] m-2 shadow-md rounded-[10px]" > 
        <img title={session?.user?.name}  className="w-[30px]  cursor-pointer m-[2px] h-[30px] rounded-[20px]"   src={session?.user?.image} />
  <a>مرحبا يا {session?.user?.name} يمكنك تنظيم مهامك في يزنبوك</a>
  </div> 
      <div>
    
      
         
    </div>
      <Input />
     
      <div className=" p-2 flex px-2 m-[6px] bg-[#fff]  rounded-[12px] shadow-md" >
           <img className="w-[30px] m-0.2 h-[30px] rounded-[50px]" src={session?.user?.image} />
           <p>@{session?.user?.tag}</p>
           <div>
            <Link className="m-2" href="/Market" >Yaznbook Market</Link>
            <Link className="m-2" href="/games" >Yaznbook Gaming</Link>
           </div>
            </div>
           {postss.map((post) => (
            <Post key={post.id} id={post.id} post={post.data()}
            />
           ))}

          
           </section>
    )
}



export default Feed;