import React from "react";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";
import axios from "axios";

// import { grpahCMSImageLoader } from "../util";

const PostCard = ({ post }) => {

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/api/posts/${id}`)
      .then((res) => {
        console.log("Deleted")
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return(
    <div className="bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8 relative">

      <Link
        href={`/admin/updatepost/${post.id}`}
        className="absolute top-2 left-2 z-10 bg-[#e93b8c] hover:bg-[#f14b99] text-white py-1 px-3 rounded-lg"
      >
        Edit
      </Link>

      <button
        onClick={() => handleDelete(post.id)}
        className="absolute top-2 right-2 z-10 px-3 py-1 text-white bg-red-500 rounded-lg hover:bg-red-600"
      >
        Delete
      </button>
      
      <div className="relative overflow-hidden shadow-md pb-80 mb-6">
        <img
          src={`http://localhost:8080/uploads/${post.photo}`}
          alt=""
          className="object-top absolute h-80 w-full object-cover  shadow-lg rounded-t-lg lg:rounded-lg"
        />
      </div>

      <h1 className="transition duration-700 text-center mb-4 cursor-pointer text-black hover:text-pink-600 text-xl md:text-3xl font-semibold">
        <Link href={`/post/${post.id}`}>{post.title}</Link>
      </h1>

      <div className="flex mb-4 px-2 w-full mx-auto justify-between">
        <div className="flex items-center justify-center">
          <Image
            unoptimized
            // loader={grpahCMSImageLoader}
            alt={post?.author?.name}
            height="30"
            width="30"
            className="align-middle rounded-full"
            src={`http://localhost:8080/uploads/${post?.author?.photo}`}
          />
          <p className="inline align-middle text-gray-700 ml-2 font-medium md:text-lg">
            {post?.author?.name}
          </p>
        </div>

        <div className="font-medium text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 inline mr-2 text-pink-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="align-middle">
            {moment(post.createdAt).format("MMM DD, YYYY")}
          </span>
        </div>

      </div>

      <p className="text-center font-mono text-xl text-gray-700 font-normal px-2 lg:px-10 mb-8">
        {post.excerpt}
      </p>

      <div className="text-center">
        <Link href={`/post/${post.id}`}>
          <span className="transition duration-500 ease transform hover:-translate-y-1 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">
            Continue Reading
          </span>
        </Link>
      </div>
    </div>
  )
};

export default PostCard;
