import React from 'react'
import Badge from './Badge'
import CardFooter from './CardFooter'
import Design from '../images/design_vii.jpg'
import { Link } from 'react-router-dom'
import {BASE_URL_IMG} from '@/api'
const BlogCard = ({ post }) => {
  return (
    <div className="px-3 py-3 rounded-md w-[350px] h-auto flex flex-col gap-4 dark:border-gray-800 border shadow-lg">
      <Link to={`/blogs/${post.slug}`}>
      <div className="w-full h-[200px] border rounded-md overflow-hidden">
        <img
          src={`${BASE_URL_IMG}${post.featured_image}`}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      </Link>

      <Badge post={post} />

      <Link to={`/blogs/${post.slug}`} className="text-[#181A2A] dark:text-white">
        <h3 className="font-semibold  leading-normal text-[#181A2A] mb-0 dark:text-white">
          {post.title}
        </h3>
      </Link>

      <CardFooter post={post} />
    </div>
  );
}

export default BlogCard