import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';
import React, { useState } from 'react';
import Login from '../../../components/Login';
import { BsX } from 'react-icons/bs';
import Header from '../../../components/Header';

const Index = () => {
    const { data: session } = useSession()
 const [showIframe, setShowIframe] = useState(false);
  
    if (!session) return <Login />
  
   
    function handleClick() {
        setShowIframe(true)  
      }

    return (
        <div>
            <Head>
                <title>Yaznbook</title>
            </Head>
            <Header />
            <br />
            <br />
            <br />
            <div className="m-1 text-[19px] w-[96%] " >
                <a>مرحبا يا {session?.user?.name}</a> <a>, ابدا بالعب</a>
            </div>
            <br />  {
                    showIframe && (
                        <div className="w-[96%] h-[50%] flex justify-center items-center fixed" >
                        <div className="w-[90%] h-[30em] p-2 justify-self-center rounded-[12px] bg-[#fff] shadow-md fixed" >
<div className="flex justify-between">
  <a>Territoral.io</a> <BsX onClick={() => setShowIframe(prev => !prev)} className="cursor-pointer" />
    </div>
<iframe src="https://territorial.io/" className="w-[100%] h-[95%] rounded-[10px]" ></iframe>
                        </div></div>
                    )
            }
            <Project name="لعبه سيارات" />
            <Project name="لعبه كرات" />
            <Project name="لعبه Territoral.io" link={() => setShowIframe(prev => !prev)} />
          
        </div>
    );
}

function Project({name, img, link}){
    return(
        <div className="w-[15em]  m-2 rounded-[10px] p-2 bg-[#fff] shadow-md" >  
     
        <a> {name}</a>
        <br />
        <button onClick={link} className=" m-2 hover:opacity-[0.8] p-[8px] text-[#fff] rounded-[10px] bg-[#006eff]" > ابدا بالعب {name}</button>
        
                    </div>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
  
    return {
      props: {
        session,
      },
    };
  }

export default Index;
