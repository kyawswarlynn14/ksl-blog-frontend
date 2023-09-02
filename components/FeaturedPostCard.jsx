import React from 'react';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';

const FeaturedPostCard = ({ post }) => (
  <div className="relative h-72">
    <div className="absolute rounded-lg bg-center bg-no-repeat bg-cover shadow-md inline-block w-full h-72" style={{ backgroundImage: `url('http://localhost:8080/uploads/${post.photo}')` }} />

    <div className="absolute rounded-lg bg-center bg-gradient-to-b opacity-50 from-gray-600 via-gray-800 to-black w-full h-72" />

    <div className="flex flex-col rounded-lg p-4 items-center justify-center absolute w-full h-full">
      <p className="text-white mb-4 text-shadow font-semibold text-xs">{moment(post.createdAt).format('MMM DD, YYYY')}</p>

      <p className=" mb-4 text-shadow text-lg text-center font-semibold text-white font-mono">{post.title}</p>

      <div className="flex items-center absolute bottom-5 w-full justify-center">
        <Image
          unoptimized
          alt={post?.author?.name}
          height="25"
          width="25"
          className="align-middle drop-shadow-lg rounded-full"
          src={`http://localhost:8080/uploads/${post?.author?.photo}`}
        />
        <p className="inline align-middle text-white text-shadow text-sm ml-2">{post?.author?.name}</p>
      </div>

    </div>
    
    <Link href={`/post/${post.id}`}><span className="cursor-pointer absolute w-full h-full" /></Link>
  </div>
);

export default FeaturedPostCard;