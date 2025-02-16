import React, { useEffect } from 'react'
import axios from 'axios'
const Hero = () => {
   let  getData = async()=>{
           let datas = await axios.get('https://javascript-recap.vercel.app/api/get');
           const data = await datas.data
           console.log(data);
           
   }
   useEffect(()=>{
          getData();
   },[])
    return (
        <div className='container'>
            <h1>Rest API</h1>
            <div className="inputs">
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id='name' name='name' />
                </div>
                <div>
                    <label htmlFor="age">Age</label>
                    <input type="number" id='age' name='age' />
                </div>
                <div>
                    <label htmlFor="college">College</label>
                    <input type="text" id='college' name='college' />
                </div>
                <button>Proceed</button>
            </div>
            <div className="contents">
             
            </div>
        </div>
    )
}

export default Hero
