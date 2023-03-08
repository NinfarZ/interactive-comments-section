import React from 'react'
import Comment from './Comment'

export default function CommentBlock(props) {

    function buildComment(comment) {
        const userData = comment.user
        return <Comment currentUser={props.currentUser.username}
            key={comment.id}
            content={comment.content}
            createdAt={comment.createdAt}
            score={comment.score}
            replies={comment.replies}
            replyingTo={comment.replyingTo || null}
            {...userData}
        />
    }

    function buildReplies(comment) {
        if (!comment.replies.length) return
        console.log(comment.replies.length)
        return comment.replies.map(reply => buildComment(reply))
    }

    return (
        <div>
            {buildComment(props.comment)}
            <div className='before:content-[""] before:absolute before:bottom-0 before:top-0 before:left-5 before:border-l before:border-l-Light-grayish-blue relative'>
                <div className='w-[95%] ml-auto'>
                    {buildReplies(props.comment)}
                </div>
            </div>
        </div>
    )
}
