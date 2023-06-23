import Link from 'next/link';
import {  useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { AppContext } from '../contexts/AppContext';

const Search = ({id }) => {
    const [showIframe, setShowIframe] = useState(false)
    const [showIframes, setShowIframes] = useState(false)
    const [s, ss] = useState()
    const [appContext, setAppContext] = useContext(AppContext)

    function handleClick() {
        setShowIframe(true)  
      }    


      const router = useRouter();
    
    return (
        <div className="" >
            <input onClick={() => setShowIframe(prev => !prev)} className="w-[96%] rounded-[10px] shadow-md p-2 h-[2em] text-[17px] bg-[#fff] "  />
          <a></a>
            {
    showIframe && (
        <div className="w-[14em] flex justify-center p-2 justify-self-center rounded-[12px] bg-[#fff] shadow-md fixed" >
            <div className="cursor-pointer" >  
                <a>{'ابحث في يزنبوك'}</a>
                <br />
                <br />
                <a onClick={() => router.push(`search/نتائج-بحث-تبوك`)} >تبوك</a>
                <br />
                <a   onClick={() => router.push(`search/نتائج-بحث-كيف-صنع-موقع`)} >كيف صنع موقع</a>
                <br />
                <a  onClick={() => router.push(`search/نتائج-بحث=تعلم-سباحة`)}  >تعلم سباحة</a>
</div>
            </div>
    )}
        </div>
    );
}

export default Search;
