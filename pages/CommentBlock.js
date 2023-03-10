import React from 'react'
import Comment from './Comment'
import { useState } from 'react'
import moment from 'moment/moment'


export default function CommentBlock(props) {

    const [replies, setReplies] = useState(props.comment.replies)
    const [replyCount, setReplyCount] = useState(0)


    function buildComment(comment) {
        const userData = comment.user
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
        const date = moment()
        const newComment = {
            id: `reply-${replyCount}`,
            content: text,
            createdAt: date.fromNow(),
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
                <div className=' before:absolute before:bottom-0 before:top-0 before:left-12 before:border-l before:border-l-Light-grayish-blue relative'>
                    <div className='w-[90%] ml-auto'>
                        {mapReplies(replies)}
                    </div>
                </div>
            </div>
        </>


    )
}
