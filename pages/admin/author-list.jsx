import { getAuthors } from '@/services';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

function AuthorList() {
    const [authors, setAuthors] = useState([])

    useEffect(() => {
        getAuthors().then(data => {
            setAuthors(data);
        })
    }, [])

    const handleDelete = (id) => {
        axios
          .delete(`http://localhost:8080/api/authors/${id}`)
          .then((res) => {
            console.log("Deleted")
            window.location.reload();
          })
          .catch((err) => console.log(err));
    };

  return (
    <div className='container mx-auto flex gap-4 justify-center md:justify-between flex-wrap mb-4'>
        {authors.map(au => (
            <div key={au.id} className='relative w-full mx-4 md:mx-0 md:w-[400px] md:min-h-[400px] bg-slate-200 rounded-lg '>
                <Image
                    unoptimized
                    alt={au?.name}
                    height="100"
                    width="100"
                    className="w-full h-[220px] rounded-lg object-cover "
                    src={`http://localhost:8080/uploads/${au?.photo}`}
                    priority={false}
                />

                <h1 className='text-center my-4 font-bold text-lg'>
                    {au.name}
                </h1>

                <p className='px-4'>
                    {au.bio}
                </p>

                <button
                    onClick={() => handleDelete(au.id)}
                    className="absolute bottom-2 right-2 px-3 py-1 text-white bg-red-500 rounded-lg hover:bg-red-600"
                >
                    Delete
                </button>
            </div>
        ))}
    </div>
  )
}

export default AuthorList