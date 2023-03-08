import React from 'react'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Comment(props) {

    const [score, setScore] = useState(props.score)
    const [content, setContent] = useState(props.content)
    const [replies, setReplies] = useState(props.replies)
    const [userScore, setUserScore] = useState(0)
    const [isVisible, setIsVisible] = useState(true)

    const isReply = props.hasOwnProperty('replyingTo') ? true : false
    function like() {
        if (userScore === 1) return
        setScore(score + 1)
        setUserScore(userScore + 1)
    }

    function dislike() {
        if (userScore === - 1) return
        setScore(score - 1)
        setUserScore(userScore - 1)
    }

    function removeComment() {
        setIsVisible(false)
    }

    return (
        <>
            {isVisible && (
                <div className='bg-White m-3 p-5 rounded-lg max-w-5xl space-y-3'>
                    <div className='flex justify-start items-center space-x-4'>
                        <img src={props.image.png} width={35} height={35} alt='pfp' />
                        <Username currentUser={props.currentUser} username={props.username} />
                        <span className='text-Grayish-Blue'>{props.createdAt}</span>
                    </div>
                    <Content replyingTo={props.replyingTo} content={props.content} />
                    <div className='flex justify-between my-3'>
                        <div className='flex space-x-4 bg-Very-light-gray px-3 py-1 rounded-md'>
                            <button onClick={like}>
                                <img src='images/icon-plus.svg' alt='like' />
                            </button>
                            <span className='text-Moderate-blue'>{score}</span>
                            <button onClick={dislike}>
                                <img src='images/icon-minus.svg' alt='dislike' />
                            </button>
                        </div>

                        <div className='flex space-x-4'>
                            <CommentButtons removeComment={removeComment} currentUser={props.currentUser} username={props.username} />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

function Content(props) {
    const replyTag = props.replyingTo ? `@${props.replyingTo}` : null
    return (
        <p className='text-Grayish-Blue'><span className='text-Moderate-blue font-bold'>{replyTag}</span> {props.content}</p>
    )
}

function Username(props) {
    if (props.username === props.currentUser) {
        return (
            <>
                <span className='text-Dark-blue font-bold'>{props.currentUser}</span>
                <span className='bg-Moderate-blue px-2'>you</span>
            </>
        )
    }
    return (
        <>
            <span className='text-Dark-blue font-bold'>{props.username}</span>
        </>
    )
}

function CommentButtons(props) {
    if (props.username === props.currentUser) {
        return (
            <>
                <button onClick={props.removeComment} className='flex space-x-2 items-center py-1 '>
                    <img src='images/icon-delete.svg' alt='delete' />
                    <p className='text-Moderate-blue '>Delete</p>
                </button>
                <button className='flex space-x-2 items-center py-1 '>
                    <img src='images/icon-edit.svg' alt='edit' />
                    <p className='text-Moderate-blue '>Edit</p>
                </button>
            </>
        )
    }
    return (
        <button className='flex space-x-2 items-center py-1 '>
            <img src='images/icon-reply.svg' alt='reply' />
            <p className='text-Moderate-blue '>Reply</p>
        </button>
    )
}
