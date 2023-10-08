import {React,useEffect,useState,useContext,useRef} from 'react'
import { UserContext } from '../context/UserContext'
import Logo from './Logo'
import { useSelector } from 'react-redux'
import instance from '../Axios/axios'
import { useNavigate } from 'react-router-dom'


const Chat = () => {
    const [ws,setWs]=useState(null)
    const [onlinePeople,setOnlinePeople]=useState({})
    const [selecedtUser,setSelectedUser]=useState(null)
    const [newMessage ,setNewMessage]=useState('')
    const [messages,setMessages]=useState([])
    const [offlinePeople,setOfflinepeople]=useState({})
    const userDetail=useSelector((state)=>state.userSlice.user)
    const { username, id } = useContext(UserContext);
    const messagesBoxref=useRef()
    const navigate=useNavigate()
   
    useEffect(()=>{
  connectoToWs()
    },[])
    const connectoToWs=()=>{
        const ws= new WebSocket('ws://localhost:3000')
        setWs(ws)
        ws.addEventListener('message',handleMessage)
        ws.addEventListener('close',()=>{
            setTimeout(()=>{
   console.log('Diconnected .connecting...')
   connectoToWs()
            },1000)
    })
}
    const showOnline=(peopleArray)=>{
       
        const people={}
        peopleArray.forEach(({userId,username})=> {
            people[userId]=username
        
        });
      
        setOnlinePeople(people)
       
    }
   
    const sendMessage=(event)=>{
    event.preventDefault()
    ws.send(JSON.stringify({
        recipient:selecedtUser,
        text:newMessage,
    }))
    setNewMessage('')
    setMessages(prev=>([...prev,{text:newMessage,sender:id,recipient:selecedtUser,_id:Date.now()}]))
   
    }
   useEffect(()=>{
    if(selecedtUser){
        instance.get('user/messages/'+selecedtUser,{withCredentials:true}).then((response)=>{
        
         setMessages(response.data)
         
        })
    }
   },[selecedtUser])
   useEffect(()=>{

    instance.get('/user/people').then((response)=>{
     
     
     const offlinePeopleArr=response.data.filter(p=>p._id !== id).filter(p=>!Object.keys(onlinePeople).includes(p._id))
  
     const offlinePeople={}
     offlinePeopleArr.forEach(p=>{
        offlinePeople[p._id]=p.username
     })
     
     setOfflinepeople(offlinePeople)
    })
   },[onlinePeople])

  
    const handleMessage=(event)=>{
        
        const messageData=JSON.parse(event.data)
      
        if('online'in messageData){
            showOnline(messageData.online)
        }else if('text' in messageData) {
        

            
          setMessages(prev=>([...prev,{...messageData}]))
            
        }
    }
const OnlineUserExcludingMe={...onlinePeople}

 delete OnlineUserExcludingMe[id]

 const uniqueMessages = Array.from(new Set(messages.map(message => message._id))).map(_id => {
    return messages.find(message => message._id === _id);
  });
  const handleLogout=()=>{
    localStorage.clear()
    navigate('/')
  }
   
  return (
    <div className='flex h-screen'>
       
      <div className="bg-white w-1/3 ">
      <div className='flex items-center justify-between py-2 px-4 bg-gray-200'>
                    <button className='bg-red-500 text-white px-4 py-2 rounded' onClick={handleLogout}>
                        Logout
                    </button>
                    <Logo />
                    <h3 className='text-2xl font-bold'>Welcome {username}</h3>
                </div>
  
        {Object.keys(OnlineUserExcludingMe).map(userId=>(
            <div key={userId} onClick={()=>setSelectedUser(userId)} className={'border-b border-gray-100 flex items-center gap-2 cursor-pointer ' +(userId===selecedtUser ? 'bg-blue-50' :'')}>
                {userId===selecedtUser && (
              <div className='w-1 bg-blue-500 h-12 rounded-r-md'> </div>
                ) }
                <div className='flex gap-2 py-2 pl-4 items-center'> 
                <div className='w-8 h-8 relative bg-red-200 rounded-full flex items-center  '> </div>
                <div className='absolute w-2 h-2 bg-green-400 rounded-full' > </div>
                <span className='text-gray-800'>{onlinePeople[userId]}</span> </div>
                
                </div>
               
        ))}

        <p>Offline People</p>

{Object.keys(offlinePeople).map(userId=>(
            <div key={userId} onClick={()=>setSelectedUser(userId)} className={'border-b border-gray-100 flex items-center gap-2 cursor-pointer ' +(userId===selecedtUser ? 'bg-blue-50' :'')}>
                {userId===selecedtUser && (
              <div className='w-1 bg-blue-500 h-12 rounded-r-md'> </div>
                ) }
                <div className='flex gap-2 py-2 pl-4 items-center'> 
                <div className='w-8 h-8 relative bg-red-200 rounded-full flex items-center  '> </div>
                <div className='absolute w-2 h-2 rounded-full' > </div>
                <span className='text-gray-800'>{offlinePeople[userId]}</span> </div>
                
                </div>
               
        ))}
      </div>
      <div className="flex flex-col bg-blue-100 w-2/3 p-2">
        <div className='flex-grow'>
            {!selecedtUser && (
                <div className='flex h-full flex-grow items-center justify-center'> 
                <div className='text-gray-400'>  Select a person from the sidebar </div>
                
                </div>
            )}
            {!!selecedtUser && (
            


                <div className='relative h-full'>
                    
                    <div   className="overflow-y-scroll absolute top-0 left-0 right-0 bottom-2">
                    {uniqueMessages.map(message=>(
                        
                       <div key={message._id} className={(message.sender==id?'text-right':'text-left')}> 

                       
<div className={'text-left inline-block p-2 m-2 rounded-sm text-sm ' + (message.sender === id ? 'bg-blue-700 text-white' : 'bg-white-500 text-gray-500')}>

                 
                   {message.text}
                   </div>
                   </div>
                    ))}
                    <div ref={messagesBoxref}> </div>
                </div>
                     </div>
             
            )}
            </div>
            {!!selecedtUser && (
   <form className='flex gap-2 ' onSubmit={sendMessage}>
   <input type='text' value={newMessage} onChange={event=>setNewMessage(event.target.value)} placeholder='Type your message here 'className='bg-white flex-grow border rounded-sm p-2'/>
   <button type='submit' className='bg-blue-500 p-2 text-white rounded-sm '><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
</svg>
</button>
</form>
            )}
     
      </div>

    </div>
  )
}

export default Chat
