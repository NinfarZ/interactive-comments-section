import Comment from './Comment'
import React, { useState } from 'react'

export default function CommentBlock(props) {

    const [replies, setReplies] = useState(props.comment.replies)
    const [replyCount, setReplyCount] = useState(0)


    function buildComment(comment) {
        const userData = comment.user
        if (!userData) return null;
        return <Comment currentUser={props.currentUser}
            key={comment.id}
            handleReply={addReply}
            content={comment.content}
            createdAt={comment.createdAt}
            score={comment.score}
            replies={comment.replies ? comment.replies : []}
            replyingTo={comment.replyingTo || null}
            {...userData}
        />
    }

    function mapReplies(replies) {
        if (!replies.length) return
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
                    {buildComment(props.comment)}
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
