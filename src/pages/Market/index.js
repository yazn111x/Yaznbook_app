import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';
import React, { useState } from 'react';
import Login from '../../../components/Login';
import { BsX } from 'react-icons/bs';
import Header from '../../../components/Header';

const Index = () => {
  
    const { data: session } = useSession()
    if (!session) return <Login />

    return (
        <div>
            <Head>
                <title>Yaznbook Market</title>
                <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Yaznbook.jpg" />
            </Head>
            <Header />
            <br />
            <br />
           
        </div>
    );
}

 function Project(props){
    return(
        <div>

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
