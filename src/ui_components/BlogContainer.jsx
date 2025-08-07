import React from 'react'
import BlogCard from './BlogCard'
import Spinner from './Spinner'
const BlogContainer = ({ isLoading, error, posts=[] }) => {

  if (isLoading) return <Spinner />
  if (error) return <div>Error loading posts</div>
  return (
    <section className="max-container padding-x py-6 dark:bg-[#232533] bg-white">
      <h2 className="text-2xl mb-6 items-center text-center font-semibold dark:text-white">Latest Blogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 container mx-auto justify-items-center">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
}

export default BlogContainer