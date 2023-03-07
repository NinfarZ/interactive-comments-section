import React from 'react'

export default function SendComment(props) {
    return (
        <div className=' bg-White m-3 p-5 rounded-lg flex flex-col max-w-5xl space-y-3'>

            <textarea rows='5' className='bg-White border resize-none border-Light-gray py-2 px-5 rounded-md placeholder:text-start text-Grayish-Blue' placeholder='Add a comment...' />

            <div className='flex justify-between py-2'>
                <img src={props.image} width={35} height={35} alt='pfp' />
                <button className='bg-Moderate-blue px-5 py-1 rounded-md'>SEND</button>
            </div>
        </div>
    )
}
