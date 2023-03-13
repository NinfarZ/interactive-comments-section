import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import SendComment from './SendComment'
import CommentBlock from './CommentBlock'

export default function Home({ commentsData }) {
  const [currentUser, setCurrentUser] = useState(commentsData.currentUser)
  const [commentSection, setCommentSection] = useState(commentsData.comments)


  function buildCommentSection(comments) {
    return comments.map(comment => (
      <CommentBlock
        currentUser={currentUser}
        commentId={comment.id}
        key={comment.id}
        comment={comment}
      />
    ))
  }

  function buildCommentObj(text) {
    const newComment = {
      id: commentSection.length + 1,
      content: text,
      createdAt: "a second ago",
      score: 0,
      user: currentUser,
      replies: []
    }

    return newComment
  }

  function addNewComment(text) {
    const newComment = buildCommentObj(text)
    setCommentSection(previousComments => [...previousComments, newComment])
  }

  return (
    <>
      <Head>
        <title>Interactive Comments Section</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className='font-rubik py-5 flex justify-center'>
        <section className='flex flex-col '>
          {buildCommentSection(commentSection)}
          <SendComment buttonText={'SEND'} submitComment={addNewComment} image={currentUser.image.png} />
        </section>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const commentsData = await fetch('../commentsData.json')
  const data = await commentsData.json()
  return {
    props: {
      data,
    },
  }
}

