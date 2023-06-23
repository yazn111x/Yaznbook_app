import '@/styles/globals.css'
import { SessionProvider, getSession, useSession } from "next-auth/react"
import { AppContextProvider } from '../../contexts/AppContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../components/Header';
import Login from '../../components/Login';
import Head from 'next/head';


export default function App({
  Component,
  pageProps: { session, ...pageProps },
  
})

{
  return (
    <div className="bg-[#F0F2F5]" >
    <SessionProvider session={session}>
      <AppContextProvider>
  
        <ToastContainer />
         <Head>
         <meta property="og:url" content="yaznbook.vercel.app" />
          <meta property="og:image" content="/Yaznbook.jpg"></meta>
         <meta property="og:title" content="Yaznbook"></meta>
         <meta property="og:description" content="يزنبوك موقع تواصل اجتماعي  " />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Yaznbook.jpg" />
         </Head>
      <Component {...pageProps} />
      </AppContextProvider>
    </SessionProvider>
    </div>
  )
}


