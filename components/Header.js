import { signOut } from 'next-auth/react';
import React, { useState } from 'react';

 import {useSession} from "next-auth/react"
import { BsApp, BsArrowBarLeft, BsMenuApp, BsMenuButton, BsMenuUp } from "react-icons/bs"
import { FaSignOutAlt } from 'react-icons/fa';
import Link from 'next/link';
import Search from './Search';
const Header = () => {
    const {data: session} = useSession();
    const [showIframe, setShowIframe] = useState(false)
  
    function handleClick() {
      setShowIframe(true)  
    }
    

    return (
        <div className="fixed flex top-0 right-0 shadow-md left-0  w-[100%] h-[50px] p-[2px] bg-white  justify-between" >
          <div className="flex items-center p-2" >
          {
        showIframe && (
          <div className="w-[17em] cursor-pointer top-10  rounded-[12px] shadow-md bg-[#fff] fixed " >
           <a onClick={signOut} className="flex items-center gap-3 w-[300px] py-2 pl-1 cursor-pointer hover:bg-gray-300  " style={{ borderRadius: '10px' }}>
     <BsArrowBarLeft className="h-[30px] w-[30px] "  alt="icon" />
     <h1 className="text-[16px] font-medium"> تسجيل خروج</h1>
   </a>
          </div>   
        ) 
      }
      <img title={session?.user?.name}  className="w-[40px] cursor-pointer m-[2px] h-[40px] rounded-[20px]"  onClick={() => setShowIframe(prev => !prev)} src={session?.user?.image} />
      <div className='bg-[#e0e0e0] m-[5px] w-[35px] h-[35px] rounded-full grid place-items-center cursor-pointer'> <BsApp className="text-[19px]" /> </div>
      <div className='bg-[#e0e0e0] m-[5px] w-[35px] h-[35px] rounded-full grid place-items-center cursor-pointer'> <BsMenuButton className="text-[19px]" /> </div>
   </div>
     <div>
     
     </div>
     <div className="flex" >
       <Search />
           <Link href="/" ><img className="  w-[40px] m-[3px] h-[40px] rounded-[12px] cursor-pointer"  src="/Yaznbook.jpg" /></Link>
      
 </div>   
        </div>
    );
}

export default Header;
