import React from 'react'
import { FcGoogle } from "react-icons/fc"
import { signIn } from "next-auth/react"
import Head from 'next/head'

const Login = () => {

 

  return (
    <div className="grid grid-cols-2" >
      
      <Head>
        <title>Yaznbook | تسجيل دخول</title>

        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Yaznbook.jpg" />
      </Head>
       
<div className="grid w-screen h-screen  justify-center place-items-center bg-[#ebebeb]" >



<div className="text-center ; w-[18em] p-[0.2em]  bg-[#fff] shadow-md rounded-[15px] h-[29em]" >
 <div className="justify-center  items-center   place-items-center" >
  <div className="flex justify-center " >

  <img
  src="/Yaznbook.jpg"

  className="w-[40px] m-2 h-[40px] ; rounded-[12px]"
  />


</div>
  <br />
  <br />
<br />
<div className="flex gap-4 justify-center  bg-[#f8f8f8] p-4 px-6 items-center rounded-[10px] cursor-pointer shadow-md"  onClick={() => signIn("google") }  >

<FcGoogle className="text-[30px]" />
تسجيل دخول بحسابك قوقل

</div>
<br />
<br />
<br />

<br />
<h1>Booke inc ©</h1>
<br /> <h1>صنع يزنبوك | في تبوك    </h1>
<br /><br />
<div className="dd" >
  <h1>ميزه لايكات في يزنبوك </h1>
  <br />
  <h1> , جرب يزنبوك الان</h1>
</div>
</div>
</div>
</div>

    </div>
  )
}

export default Login;