import React from 'react'
import Pic from '../images/pic.jpg'
import { BASE_URL_IMG } from '@/api'
import { FormatDate } from '@/services/fortmatDate';
import { Link } from 'react-router-dom';
const CardFooter = ({post}) => {
  return (
    <Link to={`/profile/${post.author.username}`}>
      <div className='flex items-center gap-4 justify-between text-[#97989F]'>
        <span className='flex items-center gap-2'>
          <div className='w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700'>
            <img src={`${BASE_URL_IMG}${post.author.profile_picture}`} className='rounded-full' alt='Author' />
          </div>
          <small className="text-[#97989F] text-[12px] font-semibold">
            {post.author.first_name} {post.author.last_name}
          </small>
        </span>
        <small className="text-[#97989F] text-[12px] font-semibold ml-3">
          {FormatDate(post.published_date)}
        </small>
      </div>
    </Link>
  )
}

export default CardFooter