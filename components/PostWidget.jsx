import React, { useState, useEffect } from "react";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";

// import { grpahCMSImageLoader } from "../util";
import { getRecentPosts } from "../services";

const PostWidget = () => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    getRecentPosts().then((data) => {
      setRelatedPosts(data);
    });
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 pb-2 mb-4 text-black">
      <h3 className="text-xl mb-4 font-semibold border-b pb-4">
        {/* {slug ? "Related Posts" : "Recent Posts"} */} Recent Posts
      </h3>
      {relatedPosts.map((post, index) => (
        <div key={index} className="flex items-center w-full mb-4">
          <div className="w-16 flex-none">
            <Image
              // loader={grpahCMSImageLoader}
              alt={post.title}
              height="60"
              width="60"
              unoptimized
              className="align-middle rounded-full"
              src={`http://localhost:8080/uploads/${post.photo}`}
            />
          </div>
          <div className="flex-grow ml-4">
            <p className="text-gray-500 font-xs">
              {moment(post.createdAt).format("MMM DD, YYYY")}
            </p>
            <Link
              href={`/post/${post.id}`}
              className="text-md hover:underline underline-offset-2"
              key={index}
            >
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
