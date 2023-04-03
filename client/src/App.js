import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  // const [filePath,setfilePath] =  useState("")
  const [fileDetail,setfileDetail] = useState("")
  const [img,setImg] = useState("")

  const handlefile = ({target})=>{
    setfileDetail(target.files[0]);
    console.log(fileDetail);
  } 
  const upload = async ()=>{
    // e.preventDefault();
   const imagedata = { "image": fileDetail};
    const res = await axios.post("http://localhost:5000/upload",imagedata,{
    headers: {
      "Content-Type": "multipart/form-data"
    }
   });
   const data =  res
   console.log(data.data);
   setImg(res.data.url);
  }
  useEffect(()=>{
      upload();
  },[fileDetail])
  
  return (
    <div >
    <input type="file" name ="image" accept="image/png, image/jpeg"  onChange = {handlefile}/>
    {/* <button onClick={upload} >Upload</button> */}
    <img  src={img} alt=""/>
    </div>
  );
}

export default App;
