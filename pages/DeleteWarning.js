import React from 'react'

export default function DeleteWarning() {
    return (
        <div className='absolute m-auto'>
            <div className='bg-White'>
                <h1 className='text-Dark-blue'>Delete comment</h1>
                <p className='text-Grayish-Blue'>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
            </div>
            <div>
                <button className='bg-Grayish-Blue px-4 py-2'>NO, CANCEL</button>
                <button className='bg-Soft-Red px-4 py-2'>YES, DELETE</button>
            </div>
        </div>
    )
}
