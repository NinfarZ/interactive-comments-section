import React, { useState } from 'react'
import SendComment from './SendComment'
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
                    <button onClick={handleShowWarning} className='flex space-x-2 items-center py-1 hover:opacity-50 text-Moderate-blue '>
                        <img className='mr-2' src='/icon-delete.svg' alt='deleteImg' />
                        Delete
                    </button>
                    <button onClick={editComment} className='flex space-x-2 items-center py-1 hover:opacity-50 text-Moderate-blue '>
                        <img className='mr-2' src='/icon-edit.svg' alt='editImg' />
                        Edit
                    </button>
                </>
            )
        }
        return (
            <button onClick={handleIsReplying} className='flex space-x-2 items-center py-1 hover:opacity-50 text-Moderate-blue '>
                <img className='mr-2' src='/icon-reply.svg' alt='replyImg' />
                Reply
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
                <div className='flex flex-col bg-White m-3 p-4 md:pl-20 rounded-lg max-w-3xl min-h-[10rem] space-y-3 relative'>
                    <div className='md:order-2 '>
                        <div className='flex justify-start items-center space-x-4'>
                            <img src={props.image.png} width={35} height={35} alt='pfp' />
                            <Username />
                            <span className='text-Grayish-Blue'>{props.createdAt}</span>
                        </div>
                        <Content setIsEditing={setIsEditing} replyingTo={props.replyingTo} content={props.content} isEditing={isEditing} />
                    </div>
                    <div className='flex my-3 md:order-1'>
                        <div className='flex md:absolute left-6 md:flex-col md:items-center justify-around space-x-4 md:space-x-0 bg-Very-light-gray px-3 py-1 mr-5 rounded-md md:h-24'>
                            <button onClick={like}>
                                <img src='/icon-plus.svg' alt='like' />
                            </button>
                            <span className='text-Moderate-blue'>{score}</span>
                            <button onClick={dislike}>
                                <img src='/icon-minus.svg' alt='dislike' />
                            </button>
                        </div>
                    </div>
                    <div className='flex space-x-4 absolute right-0 bottom-0 p-4 md:top-0 md:bottom-full '>
                        <CommentButtons />
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
    const replyTag = props.replyingTo ? `@${props.replyingTo}` : null
    return (
        <>
            {!props.isEditing && (

                <p className='text-Grayish-Blue m-3 break-words'><span className='text-Moderate-blue font-bold'>{replyTag}</span> {content}</p>

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
        <div className='m-3 flex flex-col'>
            <textarea onChange={handleContentChange} value={props.contentToEdit}
                rows='5'
                className='bg-White border resize-none border-Light-gray py-2 px-5 rounded-md placeholder:text-start text-Grayish-Blue '
                placeholder='Add a comment...' />
            <div className='flex justify-end my-4'>
                <button onClick={handleEditSubmit} className='bg-Moderate-blue px-3 py-1 rounded-md hover:opacity-50'>UPDATE</button>
            </div>

        </div>
    )
}







