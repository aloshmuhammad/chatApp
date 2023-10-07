import {React,useEffect,useState} from 'react'
import Logo from './Logo'

const Chat = () => {
    const [ws,setWs]=useState(null)
    const [onlinePeople,setOnlinePeople]=useState({})
    const [selecedtUser,setSelectedUser]=useState(null)
    useEffect(()=>{
  const ws= new WebSocket('ws://localhost:3000')
  setWs(ws)
  ws.addEventListener('message',handleMessage)
    },[])
    const showOnline=(peopleArray)=>{
        const people={}
        peopleArray.forEach(({userId,username})=> {
            people[userId]=username
        
        });
        console.log(people,'pl')
        setOnlinePeople(people)
       
    }
    const selectUser=(userId)=>{

    }
    const handleMessage=(event)=>{
        
        const messageData=JSON.parse(event.data)
        if('online'in messageData){
            showOnline(messageData.online)
        }
    }
  return (
    <div className='flex h-screen'>
      <div className="bg-white w-1/3 ">
        <Logo/>
  
        {Object.keys(onlinePeople).map(userId=>(
            <div key={userId} onClick={()=>setSelectedUser(userId)} className={'border-b border-gray-100 py-2 flex items-center gap-2 cursor-pointer pl-4' +(userId===selecedtUser ? 'bg-blue-50' :'')}>
                <div className='w-8 h-8 bg-red-200 rounded-full flex items-center  '> </div>
                <span className='text-gray-800'>{onlinePeople[userId]}</span> </div>
        ))}
      </div>
      <div className="flex flex-col bg-blue-100 w-2/3 p-2">
        <div className='flex-grow'>
            messages with selected person
            </div>
        <div className='flex gap-2 '>
            <input type='text' placeholder='Type your message here 'className='bg-white flex-grow border rounded-sm p-2'/>
            <button className='bg-blue-500 p-2 text-white rounded-sm '><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
</svg>
</button>
        </div>
      </div>

    </div>
  )
}

export default Chat
