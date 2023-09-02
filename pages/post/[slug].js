"use client"

import React, { useState, useEffect } from 'react';

import { PostDetail, Categories, PostWidget, Author, Comments, CommentsForm, Loader } from '../../components';
import { AdjacentPosts } from '../../sections';
import axios from 'axios';
import { useRouter } from 'next/router';

const PostDetails = () => {
  const router = useRouter();
  const id = router.query.slug;
  const [postDetail, setPostDetail] = useState([])

    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await axios.get(`http://localhost:8080/api/posts/${id}`)
          setPostDetail(data.data)
        } catch (err) {
          console.log(err)
        }
      }
  
      if (id) {
        fetchData();
      }
    }, [id])
    console.log(id)
    console.log(postDetail)

  return (
    <>
      <div className="container mx-auto px-2 lg:px-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-8">
            <PostDetail post={postDetail} />
            <Author author={postDetail.author} />
            {/* <AdjacentPosts createdAt={postDetail.createdAt} /> */}
            <CommentsForm postId={postDetail.id} />
            <Comments comments={postDetail.comments} />
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky top-2">
              <PostWidget />
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PostDetails;
