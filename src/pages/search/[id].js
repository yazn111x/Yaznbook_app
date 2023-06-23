import { getSession, useSession } from 'next-auth/react';
import React from 'react';
import Login from '../../../components/Login';
import Header from '../../../components/Header';
import Script from 'next/script';
import { useRouter } from 'next/router';
import Head from 'next/head';

const Room = ({id}) => {
  id = `Yaznbook - نتائج بحث`
  const {data : session} = useSession();
  if (!session) return <Login />

  return (
    <div>
      <Head>
        <title>{id}</title>
      </Head>
      <Header />
      <br />
      <br />
      <div className="flex m-2" >
        <div>
        <a className="text-[20px]" >نتائج بحث: </a>
        <br />
        <br />
        <div className="p-2 flex bg-[#fff] shadow-md rounded-[10px]" > 
        <img title={session?.user?.name}  className="w-[30px]  cursor-pointer m-[2px] h-[30px] rounded-[20px]"   src={session?.user?.image} />
   <a  >يا {session?.user?.name} لا توجد نتائج بحث</a>
  </div>   
   </div>
      </div>
<a>شاهد اخر اخبار</a>

      <br />
      <div className="flex" >
     <Post img="/مشروع جديد.png" text="تعلن بوكي انك انشاء محرك بحث لجميع برامج بوكي انك محرك بحث اسمه  بوكي انك للبحث" />
     <Post img="/علم-روسيا.jpg" text="تعلن بوكي انك بدعم روسيا واضافه ميزات لروسيين" />
</div>

    </div>
  );
}

function Post({text, img}){
  return(
    <div  className=" w-[15em]  flex-wrap m-2 p-2 bg-[#fff] rounded-[10px] shadow-sm" >
 <img src="/Yaznbook.jpg " className="w-[30px] m-1" />

  <img className=" rounded-[12px] w-[100%] h-[10em] object-cover" src={img} />
   <a>{text}</a>
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

export default Room;
