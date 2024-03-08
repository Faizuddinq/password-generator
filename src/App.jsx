import { useCallback, useEffect, useRef, useState } from "react"
import './App.css'
function App() {
  const [len, setLen]=useState(8);
  const [numAll, setNum ]=useState(false);
  const [charAll, setChars ]=useState(false);
  const [pwd, setPwd ]=useState("");
  const pwdRef = useRef(null);
  //not nessacry to use callback in every function and remove array
  const pwdGen = useCallback(()=>{
      let pass="";
      let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      if(numAll){
        str+="0123456789";
      }
      if(charAll){
        str+="!@#$%&";
      }

      for(let i=0;i<=len;i++){
        let char = Math.floor(Math.random()*str.length+1);
        pass += str.charAt(char);
        setPwd(pass);
      }
  }, [len, numAll, charAll, setPwd]);

  const copyToClipboard = useCallback(()=>{
    pwdRef.current?.select();
    // pwdRef.current?.setSelectionRange(0, 9);
    window.navigator.clipboard.writeText(pwd);
  }, [pwd]);

   useEffect(()=>{
    pwdGen();
   }, [len, numAll, charAll, pwdGen]);

  return(
    <>
    <div className=" w-full max-w-md mx-auto shadow-md rounded-lg text-black-400 bg-slate-400 my-10 px-4">
      <h1 className=" text-white text-center text-3xl p-3">Password Generator</h1>
      <div className="flex shadow-sm rounded-lg overflow-hidden mb-4">
        <input type="text"
        value={pwd} 
        placeholder="Password" 
        className=" outline-none w-full px-3 py-1" readOnly
        ref={pwdRef}
        />
        <button 
        onClick={copyToClipboard}
        className=" text-white bg-slate-500 py-1 px-3 shrink-0" id="copy-btn">copy</button>
      </div>
      <div className=" flex text-sm gap-x-2 pb-1">
        <div className=" flex items-center gap-x-1">
          <input type="range" 
          min={8}
          max={100}
          value={len}
          className=" cursor-pointer"
          onChange={(e)=>{setLen(e.target.value)}}
          />
          <label className=" text-white text-lg"> Length: {len}</label>
        </div>
        <div className="text-white flex flex-row gap-2  pt-1.5">
          <input type="checkbox" defaultChecked={numAll} id="numberInput" onChange={()=>{
            setNum((prev)=>!prev);
          }} ></input>
          <label className="check-btn" htmlFor="numberInput">Numbers</label>
          <input className="bg-black" type="checkbox" defaultChecked={numAll} id="characterInput" onChange={()=>{
            setChars((prev)=>!prev);
          }} ></input>
          <label  
          className="check-btn"
          htmlFor="characterInput">Characters</label> 
        </div>
      </div>
    </div>
    </>
  )
}

export default App
