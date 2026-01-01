import {useHook, useEffect, useState} from "react"

export default function App(){
  const [users,setUsers] = useState([])
  const [textValue, setTextValue] = useState("");

  async function getUsers(value=30){
    const url = `https://api.github.com/users?per_page=${value}`
    const response = await fetch(url);
    const data = await response.json();
    console.log("hello");
    setUsers(data);
  }

  useEffect(()=>{
    getUsers();
  }, [])

  function handlleInput(e){
    setTextValue(e.target.value.toUpperCase());
  }

  return (
  <>
    <h1>Github Users</h1>
    <input type = "text" onChange={handlleInput} value={textValue} placeholder="type anything"></input>
    <input type="number" onChange={(e)=>{getUsers(e.target.value)}}></input>
    <div style = {{display:"flex", justifyContent:"center", alignItems:"center", flexWrap:"wrap", gap:"10px"}}>{
      users.map((user)=>{
        return <img src={user.avatar_url} style={{height:"100px", width:"100px"}} key={user.login}></img>
      })
    }</div>
  </>
  )
}

//can also do like
export function App2(){
  const [users,setUsers] = useState([])
  const [textValue, setTextValue] = useState("");
  const [limit, setLimit] = useState(30);

  
  useEffect(()=>{
    async function getUsers(value=30){
      const url = `https://api.github.com/users?per_page=${limit}`
      const response = await fetch(url);
      const data = await response.json();
      console.log("hello");
      setUsers(data);
    }
    getUsers();
  }, [limit])

  function handlleInput(e){
    setTextValue(e.target.value.toUpperCase());
  }

  return (
  <>
    <h1>Github Users</h1>
    <input type = "text" onChange={handlleInput} value={textValue} placeholder="type anything"></input>
    <input type="number" onChange={(e)=>{setLimit(e.target.value)}}></input>
    <div style = {{display:"flex", justifyContent:"center", alignItems:"center", flexWrap:"wrap", gap:"10px"}}>{
      users.map((user)=>{
        return <img src={user.avatar_url} style={{height:"100px", width:"100px"}} key={user.login}></img>
      })
    }</div>
  </>
  )
}

export function Clock(){
  const [isVisible, setIsVisible] = useState(true);
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(()=>{
    if(!isVisible)return;
    const id = setInterval(()=>{
      setTime(new Date().toLocaleTimeString());
      console.log("hi");
    },1000)
    return ()=>{clearInterval(id)}
  }, [isVisible])

  return(
    <>
      <button onClick={()=>{setIsVisible(!isVisible)}}>{isVisible?"Hide and Stop Time":"Show and Start Time"}</button>
      {
        isVisible && <h1>Date: {time}</h1>
      }
    </>
  )
}