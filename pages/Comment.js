import React from 'react'
import { useState, useEffect, useRef } from 'react'
import SendComment from './SendComment'
import moment from 'moment/moment'
import DeleteWarning from './DeleteWarning'


export default function Comment(props) {

    const [score, setScore] = useState(props.score)
    const [isEditing, setIsEditing] = useState(false)
    const [isReplying, setIsReplying] = useState(false)
    const [userScore, setUserScore] = useState(0)
    const [isVisible, setIsVisible] = useState(true)
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);

    function handleShowWarning() {
        setShowDeleteWarning(true)
    }

    function like() {
        if (userScore === -1) return
        if (userScore === 1) {
            setScore(score - 1)
            setUserScore(0)
        } else {
            setScore(score + 1)
            setUserScore(1)
        }

        console.log("score: ", score)
        console.log("userscore: ", userScore)
    }

    function dislike() {
        if (userScore === 1) return
        if (userScore === -1) {
            setScore(score + 1)
            setUserScore(0)
        } else {
            setScore(score - 1)
            setUserScore(-1)
        }
    }

    function handleHasReplied() {
        setIsReplying(false)
    }

    function confirmDelete() {
        setIsVisible(false)
        setShowDeleteWarning(false)
    }

    function cancelDelete() {
        setShowDeleteWarning(false)
    }

    function editComment() {
        setIsEditing(true)
    }


    function Username() {
        return (
            <>
                {props.username === props.currentUser.username && (
                    <div>
                        <span className='text-Dark-blue font-bold'>{props.currentUser.username}</span>
                        <span className='bg-Moderate-blue px-3 mx-3'>you</span>
                    </div>
                ) || <span className='text-Dark-blue font-bold'>{props.username}</span>}
            </>
        )
    }

    function CommentButtons() {
        const handleIsReplying = () => {
            setIsReplying(true)
        }

        if (props.username === props.currentUser.username) {
            return (
                <>
                    <button onClick={handleShowWarning} className='flex space-x-2 items-center py-1 hover:opacity-50'>
                        <img src='images/icon-delete.svg' alt='delete' />
                        <p className='text-Moderate-blue '>Delete</p>
                    </button>
                    <button onClick={editComment} className='flex space-x-2 items-center py-1 hover:opacity-50'>
                        <img src='images/icon-edit.svg' alt='edit' />
                        <p className='text-Moderate-blue '>Edit</p>
                    </button>
                </>
            )
        }
        return (
            <button onClick={handleIsReplying} className='flex space-x-2 items-center py-1 hover:opacity-50'>
                <img src='images/icon-reply.svg' alt='reply' />
                <p className='text-Moderate-blue '>Reply</p>
            </button>
        )
    }

    return (
        <>
            {showDeleteWarning && (<>
                <div className='fixed inset-0 flex items-center justify-center z-10 bg-Dark-blue bg-opacity-50'>
                    <DeleteWarning onCancel={cancelDelete} onDelete={confirmDelete} />
                </div>
            </>)}

            {isVisible && (<div>
                <div className='bg-White m-3 p-5 rounded-lg max-w-3xl space-y-3'>
                    <div>
                        <div className='flex justify-start items-center space-x-4'>
                            <img src={props.image.png} width={35} height={35} alt='pfp' />
                            <Username />
                            <span className='text-Grayish-Blue'>{props.createdAt}</span>
                        </div>
                        <Content setIsEditing={setIsEditing} replyingTo={props.replyingTo} content={props.content} isEditing={isEditing} />
                    </div>
                    <div className='flex justify-between my-3'>
                        <div className='flex md:flex-col space-x-4 bg-Very-light-gray px-3 py-1 rounded-md'>
                            <button onClick={like}>
                                <img src='images/icon-plus.svg' alt='like' />
                            </button>
                            <span className='text-Moderate-blue'>{score}</span>
                            <button onClick={dislike}>
                                <img src='images/icon-minus.svg' alt='dislike' />
                            </button>
                        </div>

                        <div className='flex space-x-4'>
                            <CommentButtons />
                        </div>
                    </div>
                </div>
                {isReplying && (
                    <SendComment buttonText={'REPLY'} hasReplied={handleHasReplied} submitComment={props.handleReply} image={props.currentUser.image.png} replyingTo={props.username} />
                )}
            </div>)}
        </>
    )
}


function Content(props) {
    const [content, setContent] = useState(props.content)
    console.log(content)
    const replyTag = props.replyingTo ? `@${props.replyingTo}` : null
    return (
        <>
            {!props.isEditing && (

                <p className='text-Grayish-Blue'><span className='text-Moderate-blue font-bold'>{replyTag}</span> {content}</p>

            ) || <ContentEdit contentToEdit={content} setContent={setContent} setIsEditing={props.setIsEditing} />}
        </>
    )
}

function ContentEdit(props) {
    const handleContentChange = (event) => {
        props.setContent(event.target.value)

    }

    const handleEditSubmit = () => {
        props.setIsEditing(false)
    }

    return (
        <div className='flex flex-col'>
            <textarea onChange={handleContentChange} value={props.contentToEdit}
                rows='5'
                className='bg-White border resize-none border-Light-gray py-2 px-5 rounded-md placeholder:text-start text-Grayish-Blue'
                placeholder='Add a comment...' />
            <div className='flex justify-end my-4'>
                <button onClick={handleEditSubmit} className='bg-Moderate-blue px-3 py-1 rounded-md hover:opacity-50'>UPDATE</button>
            </div>

        </div>
    )
}







