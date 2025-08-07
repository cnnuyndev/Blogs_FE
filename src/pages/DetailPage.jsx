import Badge from '@/ui_components/Badge'
import {useState} from 'react'
import { HiPencilAlt } from 'react-icons/hi'
import { MdDelete } from 'react-icons/md'
import BlogWriter from '@/ui_components/BlogWriter'
import { useQuery } from '@tanstack/react-query'
import { getBlog, deleteBlog } from '@/services/apiBlog'
import Spinner from '@/ui_components/Spinner'
import { useParams } from "react-router-dom";
import { BASE_URL } from '@/api'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import Modal from '@/ui_components/Modal'
import CreatePostPage from './CreatePostPage'

const DetailPage = ({ username, isAuthenticated }) => {

  const { slug } = useParams();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  function toggleModal(){
    setShowModal(curr => !curr)
  };

  const {
    isPending,
    isError,
    data: blog,
    } = useQuery({
    queryKey: ["blogs", slug],
    queryFn: () => getBlog(slug),
  });

  const blogID = blog?.id

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteBlog(id),
    onSuccess: () => {
      toast.success("Your post has been deleted successfully!")
      navigate("/")
    },

    onError: (err) => {
      console.log(err)
      toast.error(err.message)
    }
  });

  function handleDeleteBlog(){
    const popUp = window.confirm("Are you sure you want to delete this post?")
    if(!popUp){
      return;
    }
    deleteMutation.mutate(blogID);
  };

  if (isPending) return <Spinner />
  if (isError) return <div>Error loading blog post</div>
  return (
    <>
      <div className="max-container dark:bg-[#232533] bg-white">
        <div className='container mx-auto p-4 dark:bg-[#2a2c38] bg-white rounded-md'>
          <Badge post={blog} />
          <div className="flex justify-between items-center gap-4">
            <h2 className="py-6 leading-normal text-2xl md:text-3xl text-[#181A2A] tracking-wide font-semibold dark:text-[#FFFFFF]">
              {blog.title}
            </h2>
            {isAuthenticated && username === blog.author.username && (
            <span className="flex justify-between items-center gap-2">
              <HiPencilAlt onClick={toggleModal} className="dark:text-white text-3xl cursor-pointer" />

               <MdDelete onClick={handleDeleteBlog} className="dark:text-white text-3xl cursor-pointer" />
            </span>
            )}
          </div>
          <BlogWriter blog={blog} />

          <div className="w-full h-[350px] my-9 overflow-hidden rounded-sm">
            <img
              className="w-full h-full object-cover rounded-sm"
              src={`${BASE_URL}${blog?.featured_image}`}
            />
          </div>
          <p className="text-[16px] leading-[2rem] text-justify text-[#3B3C4A] dark:text-[#BABABF]">
            {blog.content}
          </p>
        </div>
      </div>
      {showModal && <Modal toggleModal={toggleModal}> 
        <CreatePostPage blog={blog} />
      </Modal>}
    </>
  )
}

export default DetailPage