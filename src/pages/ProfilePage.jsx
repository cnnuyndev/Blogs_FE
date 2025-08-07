import React, { useState } from 'react'
import Hero from '@/ui_components/Hero'
import BlogContainer from '@/ui_components/BlogContainer'
import { useQuery } from '@tanstack/react-query'
import { getInforUser } from '@/services/apiBlog'
import { useParams } from "react-router-dom";
import Modal from "@/ui_components/Modal";
import SignUpPage from './SignUpPage'
import Spinner from '@/ui_components/Spinner'

const ProfilePage = ({ authUsername }) => {

  const [showModal, setShowModal] = useState(false);
  const {username} = useParams();

  const toggleModal = () => {
    setShowModal(curr => !curr)
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["users", username],
    queryFn: () => getInforUser(username),
  })


  const blogs = data?.author_posts;

  if (isLoading){
    return <Spinner/>
  }

  return (  
    <>
      <Hero userInfo={data}  authUsername = {authUsername} toggleModal={toggleModal} />
      <BlogContainer isLoading = {isLoading} error = {isError} posts={blogs}/>
      {showModal && (
        <Modal toggleModal={toggleModal}>
          <SignUpPage userInfo={data} updateForm={true} toggleModal={toggleModal} />
        </Modal>
      )}
    </>
  )
}

export default ProfilePage