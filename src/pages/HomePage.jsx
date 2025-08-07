import React from 'react'
import  Header from '@/ui_components/Header'
import BlogContainer from '@/ui_components/BlogContainer'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { fetchPosts } from '@/services/apiBlog'
import PagePagination from '@/ui_components/PagePagination'
const HomePage = () => {
  const [page, setPage] = React.useState(1)
  const numOfBlogsPerPage = 3 // Assuming you have a fixed number of pages or can calculate it based on total posts
  const { data, isLoading, error } = useQuery({
    queryKey: ['blogs', page],
    queryFn: () => fetchPosts(page),
    placeholderData: keepPreviousData,
  })

  const blogs = data?.results || []
  const numOfPages = Math.ceil(data?.count / numOfBlogsPerPage)

  const handleSetPage = (newPage) => {
    setPage(newPage)
  }

  function increasePageValue() {
    setPage((curr) => curr + 1);
  }

  function decreasePageValue() {
    setPage((curr) => curr - 1);
  }

  return (
    <>
      <Header />
      <BlogContainer isLoading={isLoading} error={error} posts={blogs} />
      <PagePagination
        increasePageValue={increasePageValue}
        decreasePageValue={decreasePageValue}
        page={page}
        numOfPages={numOfPages}
        handleSetPage={handleSetPage}
      />
    </>
  )
}

export default HomePage