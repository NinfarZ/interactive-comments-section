import Comment from './Comment'
import React, { useState } from 'react'

export default function CommentBlock(props) {

    const [replies, setReplies] = useState(props.replies)
    const [replyCount, setReplyCount] = useState(0)


    function buildComment() {
        const userData = props.user

        return <Comment currentUser={props.currentUser}
            key={props.commentId}
            handleReply={addReply}
            content={props.content}
            createdAt={props.createdAt}
            score={props.score}
            replies={props.replies}
            replyingTo={props.replyingTo}
            {...userData}
        />
    }

    function mapReplies(replies) {
        if (!replies) return
        return replies.map(reply => buildComment(reply))
    }

    function addReply(reply, replyingTo) {
        const myReply = buildReply(reply, replyingTo)
        setReplies(previousReplies => [...previousReplies, myReply])


    }

    function buildReply(text, replyingTo) {
        const newComment = {
            id: `reply-${replyCount}`,
            content: text,
            createdAt: "a second ago",
            score: 0,
            user: props.currentUser,
            replyingTo: replyingTo,

        }
        setReplyCount(replyCount + 1)

        return newComment
    }



    return (

        <>
            <div>
                <div>
                    {buildComment()}
                </div>
                <div className=' before:absolute before:left-0 before:bottom-0 before:top-0 before:translate-x-9 before:border-l before:border-l-Light-grayish-blue relative'>
                    <div className='w-[90%] ml-auto'>
                        {mapReplies(replies)}
                    </div>
                </div>
            </div>
        </>


    )
}
