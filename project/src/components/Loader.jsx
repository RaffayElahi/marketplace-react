// import React, { useEffect, useRef, useState } from 'react';
// import gsap from 'gsap';

// const words = ["fiction", "life", "chance", "choice", "fact", "dream", "hope"];

// const Loader = () => {
//   const wordListRef = useRef(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const timeline = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 1 });

//     words.forEach((word, index) => {
//       if (index === words.length - 1) {
//         timeline.to(wordListRef.current, { y: -index * 40, duration: 0.5 });
//       } else {
//         timeline.to(wordListRef.current, { y: -index * 40, duration: 0.5, delay: 0.5 });
//       }
//     });

//     const timeout = setTimeout(() => {
//       timeline.pause();
//       gsap.to(wordListRef.current, { y: -words.indexOf("fact") * 40, duration: 0.5 });
//       setLoading(false);
//     }, 5000);

//     return () => clearTimeout(timeout);
//   }, []);

//   return (
//     <div className="flex items-center justify-center h-screen">
//       <span className="text-2xl">matter of</span>
//       <div className=" h-10 ml-2">
//         <div ref={wordListRef} className="flex flex-col">
//           {words.map((word, index) => (
//             <div key={index} className="h-10 flex items-center justify-center text-2xl">{word}</div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Loader;
import React, { useRef } from 'react'
import {useGSAP} from "@gsap/react"
import gsap from 'gsap';

function Loader() {
  const newRef = useRef()
  const animateRef = useRef()
  const wordRef = useRef()
  const timetl = useRef()
  const names = ["Friends", "Clients", "People", "Shapers", "Traders", "Citizens", "Allies", "Partners", "Consumers", "Visitors", "Seekers", "Everyone", "Workers", "Leaders"];
  useGSAP(()=>{
    const scroll = wordRef.current.clientHeight*9;
    timetl.current = gsap.
      timeline()
      .from(".containerrr .words",{
        y:50,
        duration:.8,
        opacity:0,
      })
      .to(".containerrr",{y: `-${scroll}px`, duration: .7,  repeat: 0, delay:.2})
      .to(".containerrr",{opacity:0}, 'same')
      .to(newRef.current,{y:'-100%', duration:1},'same')
      .to(newRef.current, {display:"none"})
    
  
  }, {scope: newRef})
  return (
    <div ref={newRef} className='w-full flex items-center justify-center h-screen bg-white overflow-hidden'>
      <div className='text-center font-display text-8xl font-bold tracking-wider text-black uppercase'>Marketplace for</div>
      <div className='containerrr h-full w-fit grid flex-col items-start justify-center '>
        {
          names.map((name, index) => (
            <div ref={wordRef} key={index} className='words text-left h-[20vh] justify-self-center flex items-center leading-normal font-display text-8xl font-bold tracking-wider text-black uppercase ml-10'>
              {name}
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Loader
