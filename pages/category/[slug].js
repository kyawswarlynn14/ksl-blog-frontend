import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { PostCard, Categories, Loader } from '../../components';

const CategoryPost = () => {
  const router = useRouter();
  const id = router.query.slug;
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get(`http://localhost:8080/api/posts/categoryposts/${id}`)
        setPosts(data.data)
      } catch (err) {
        console.log(err)
      }
    }

    if (id) {
      fetchData();
    }
  }, [id])

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          {posts.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-14">
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CategoryPost;
