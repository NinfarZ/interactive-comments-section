import React from 'react'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Comment(props) {

    const [score, setScore] = useState(props.score)
    const [id, setId] = useState(props.id)

    return (
        <div className='bg-White m-3 p-5 rounded-lg max-w-5xl space-y-3'>
            <div className='flex justify-start items-center space-x-4'>
                <img src={props.image} width={35} height={35} alt='pfp' />
                <span className='text-Dark-blue'>{props.username}</span>
                <span className='text-Grayish-Blue'>{props.createdAt}</span>
            </div>
            <p className='text-Grayish-Blue'>{props.content}</p>
            <div className='flex justify-between my-3'>
                <div className='flex space-x-4 bg-Very-light-gray px-3 py-1 rounded-md'>
                    <button>
                        <img src='images/icon-plus.svg' alt='like' />
                    </button>
                    <span className='text-Moderate-blue'>{score}</span>
                    <button>
                        <img src='images/icon-minus.svg' alt='dislike' />
                    </button>
                </div>

                <div>
                    <button className='flex space-x-2 items-center py-1 '>
                        <img src='images/icon-reply.svg' />
                        <p className='text-Moderate-blue '>Reply</p>
                    </button>

                </div>
            </div>
        </div>
    )
}
