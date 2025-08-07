import React from 'react'

const Badge = ({post}) => {
  return (
    <span className="px-2 py-[3px] text-[12px] font-semibold bg-[#4B6BFB] text-[#FFFFFF] rounded-sm self-start">
      {post?.category}
    </span>
  );
}

export default Badge