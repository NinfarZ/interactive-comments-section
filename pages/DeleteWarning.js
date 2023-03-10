import React from 'react'

export default function DeleteWarning(props) {
    return (
        <div className='flex flex-col max-w-sm bg-White p-6 space-y-4 rounded-lg mx-4'>
            <div className=' flex flex-col justify-start'>
                <h1 className='text-Dark-blue text-lg font-medium'>Delete comment</h1>
                <p className='text-Grayish-Blue pt-3'>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
            </div>
            <div className='flex justify-between'>
                <button onClick={props.onCancel} className='bg-Grayish-Blue px-8 py-3 rounded-lg hover:opacity-50'>NO, CANCEL</button>
                <button onClick={props.onDelete} className='bg-Soft-Red px-8 py-3 rounded-lg hover:opacity-50'>YES, DELETE</button>
            </div>
        </div>

    )
}
