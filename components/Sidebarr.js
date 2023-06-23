import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { SiMarketo } from "react-icons/si"
import { BsApp, BsPaypal, BsPeople, BsWallet } from 'react-icons/bs';
import { RiCalculatorLine, RiGameFill, RiGamepadLine } from 'react-icons/ri';
import { FaMarker, FaStore } from 'react-icons/fa';
import { BiFlag } from 'react-icons/bi';
import Link from 'next/link';

const Sidebarr = () => {

    const [showMore, setShowMore] = useState(false);
  
    const handleClick = () => {
      setShowMore(!showMore);
    };
    
    const {data: session} = useSession();
    return (
      <div>

 
        <br />
        <br />
        <div  className="px-2  top-4 right-0  h-screen  mt-6  w-[27%]  left-0 fixed  hidden lg:block">
           <br />
           <br />
           <br />
            <p>قائمه يزنبوك</p>
            <br />

            <div  className="flex items-center gap-3 w-[300px] py-2 pl-1 cursor-pointer hover:bg-gray-300  " style={{ borderRadius: '10px' }}>
      <img className="h-[30px] w-[30px] rounded-full" src={session?.user?.image} alt="icon" />
      <h1 className="text-[16px] font-medium">@{session?.user?.tag}</h1>
    </div>
   
    <div  className="flex items-center gap-3 w-[300px] py-2 pl-1 cursor-pointer hover:bg-gray-300  " style={{ borderRadius: '10px' }}>
      <BsApp className="h-[30px] w-[30px] rounded-full"  alt="icon" />
      <h1 className="text-[16px] font-medium">المنشورات</h1>
    </div>
     <div  className="flex items-center gap-3 w-[300px] py-2 pl-1 cursor-pointer hover:bg-gray-300  " style={{ borderRadius: '10px' }}>
     <BsPeople className="h-[30px] w-[30px] "  alt="icon" />
     <h1 className="text-[16px] font-medium">جهات اتصال</h1>
   </div>

<div  className="flex items-center gap-3 w-[300px] py-2 pl-1 cursor-pointer hover:bg-gray-300  " style={{ borderRadius: '10px' }}>
<BsWallet className="h-[30px] w-[30px] "  alt="icon" />
<h1 className="text-[16px] font-medium">طرق دفع</h1>
</div>

<div  className="flex items-center gap-3 w-[300px] py-2 pl-1 cursor-pointer hover:bg-gray-300  " style={{ borderRadius: '10px' }}>
     <RiGamepadLine className="h-[30px] w-[30px] rounded-full"  alt="icon" />
     <Link href={'/games'} className="text-[16px] font-medium">Yaznbook Gameing</Link>
   </div>

   {showMore && (<div>
      <div  className="flex items-center gap-3 w-[300px] py-2 pl-1 cursor-pointer hover:bg-gray-300  " style={{ borderRadius: '10px' }}>
      <FaStore className="h-[30px] w-[30px] rounded-full"  alt="icon" />
      <Link className="text-[16px] font-medium" href="/Market" >Yaznbook Market</Link>
   
    </div>

    <div  className="flex items-center gap-3 w-[300px] py-2 pl-1 cursor-pointer hover:bg-gray-300  " style={{ borderRadius: '10px' }}>
      <BiFlag className="h-[30px] w-[30px] rounded-full"  alt="icon" />
      <h1 className="text-[16px] font-medium">Yaznbook صفحات</h1>
   
    </div>
      </div>
      )}
      <button onClick={handleClick}>
        {showMore ? 'عرض أقل' : 'عرض المزيد'}
      </button>
        </div>
        </div>
    );
}

export default Sidebarr;
