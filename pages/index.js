"use client"

import { FeaturedPosts } from '../sections/index';
import { PostCard, Categories, PostWidget } from '../components';
import { useEffect, useState } from 'react';
import {getPosts} from '../services'
import Link from 'next/link';

export default function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPosts() || [];
        console.log(data);
        setPosts(data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData();
  }, [])

  return (
    <div className="container mx-auto px-2 md:px-10 mb-8">
      <FeaturedPosts />
      <div className='flex gap-6'>
        <Link href={'/admin/create-post'}>
          <button className=' bg-pink-600 p-2 px-4 rounded-lg text-white mb-4 hover:bg-pink-700'>
            Add Post + 
          </button>
        </Link>

        <Link href={'/admin/create-category'}>
          <button className=' bg-pink-600 p-2 px-4 rounded-lg text-white mb-4 hover:bg-pink-700'>
            Add Category +
          </button>
        </Link>

        <Link href={'/admin/create-author'}>
          <button className=' bg-pink-600 p-2 px-4 rounded-lg text-white mb-4 hover:bg-pink-700'>
            Add Author +
          </button>
        </Link>

        <Link href={'/admin/author-list'}>
          <button className=' bg-pink-600 p-2 px-4 rounded-lg text-white mb-4 hover:bg-pink-700'>
            View Authors
          </button>
        </Link>

      </div>
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-12">
        <div className="lg:col-span-6 col-span-1">

          {posts.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-2 pb-2">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}