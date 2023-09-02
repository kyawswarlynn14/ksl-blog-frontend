import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { getCategories } from '../services';
import axios from 'axios';
import { TiDelete } from 'react-icons/ti';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/api/categories/${id}`)
      .then((res) => {
        console.log("Deleted")
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 pb-2 mb-2 text-black">
      <h3 className="text-xl mb-4 font-semibold border-b pb-4">Categories</h3>
      {categories.map((category, index) => (
        <div className='flex w-full justify-between border-b mb-2 pb-2'>
          <Link key={index} href={`/category/${category.id}`}>
            <span className={`cursor-pointer block hover:underline underline-offset-2`}>{category.name}</span>
          </Link>

          <div onClick={() => handleDelete(category.id)} className='cursor-pointer text-red-600'>
            <TiDelete size={30} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categories;