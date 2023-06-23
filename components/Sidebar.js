import React, { useState } from 'react';
import { BsCreditCard, BsListTask, BsPeople, BsX } from 'react-icons/bs';
import Stripe from 'stripe'

const Sidebar = () => {
    const [showIframe, setShowIframe] = useState(false)
    function handleClick() {
        setShowIframe(true)  
      }
      const [task, setTask] = useState('');
      const [tasks, setTasks] = useState([]);
    
  const [taskIndex , setTaskIndex] = useState([]);
  function deleteTask(index) {
    const newTasks = [...tasks];
    newTasks.splice(index, 1); 
    setTasks(newTasks);
    setTaskIndex(Math.max(0, taskIndex - 1));
  }
  
  function addTask() {
    if(task !== '') {
       setTasks([...tasks, task]);
       setTask('');
     }
   }
    return (
        <div className="fixed w-[20%] hidden xl:block top-16 right-0   mt-6 px-4 h-screen overflow-y-scroll scrollbar-hide" >
       
            <a className="flex justify-center items-center" >الممول</a>
            <hr />
            <br />

            <div className="w-[100%] p-2 flex rounded-[12px] h-[11em] bg-[#fff]   shadow-md" >
<img src="https://www.viewsaudi.com/ar/wp-content/uploads/2021/10/Tourist-places-in-Tabuk-1.jpg" className="w-[59.2%] m-2 rounded-[13px] h-[9em]" />
           <a>تبوك جميله </a>
            </div>
            <br />

<a className="flex justify-center items-center" >مهام</a>
<hr />
<a onClick={() => setShowIframe(prev => !prev)} className="flex items-center gap-3 w-[300px] rounded-[10px] py-2 pl-1 cursor-pointer hover:bg-gray-300  " style={{ borderRadius: '10px' }}>
    <BsListTask  className="h-[30px]  w-[30px] rounded-[10px]"  alt="icon" />
      <h1 className="text-[16px] font-medium"> اضافه مهام</h1>
    </a>
    {
    showIframe && (
        <div className="w-[17em] p-2 text-center cursor-pointer top-10  rounded-[12px] shadow-md bg-[#fff] fixed " >
       <div>
        <a className="text-[19px]" >مهام يزنبوك</a>
      <input 
        value={task} 
        className="h-[26px] shadow-md rounded-[10px]"
        onChange={e => setTask(e.target.value)}
      />
      <button onClick={addTask}>اضافه </button>   
        
      <ul>
      {tasks.map((task, index) => (  
  <li className="w-[100%] flex justify-between rounded-[10px] p-2 shadow-md" key={index}>
     <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600"/> 
       {task}  
    
     <button 
  onClick={() => deleteTask(index)}>
  <BsX />
</button>
  </li>
))}
      </ul>    
    </div> 
        </div> 
      )}
        </div>
    );
}

export default Sidebar;
