import React from 'react'
import  Pic from '@/images/pic.jpg'
import { FormatDate } from '@/services/fortmatDate'
import { BASE_URL_IMG } from '@/api'
const BlogWriter = ({blog}) => {
  return (
    <div>
      <div className="flex items-center gap=4 ">
      <span className="flex items-center gap-2">
        <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
          <img
            src={`${BASE_URL_IMG}${blog?.author?.profile_picture}`}
            className="c rounded-full w-full h-full object-cover"
          />
        </div>

        <small className="text-[#696A75] text-[14px]">
          {blog?.author?.first_name} {blog?.author?.last_name}
        </small>
      </span>

      <small className="text-[#696A75] text-[14px] ml-3">
        {FormatDate(blog?.published_date)}
      </small>
    </div>
    </div>
  )
}

export default BlogWriter