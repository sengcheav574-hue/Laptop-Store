import React,{useState} from 'react';

function State (){

    const [count, setCount] = useState(0)
    return (
        <div className='flex h-screen justify-center items-center gap-5 '>
            <button onClick={() => setCount(count - 1)} className='px-5 py-2 bg-blue-600 rounded-md cursor-pointer'>-</button>
            <p>{count}</p>
            <button onClick={() => setCount(count +1)} className='px-5 py-2 bg-blue-600 rounded-md cursor-pointer'>+</button>
        </div>
    )
}
export default State;