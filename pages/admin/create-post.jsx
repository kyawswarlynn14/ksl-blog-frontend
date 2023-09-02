import { useState, useLayoutEffect, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { getAuthors, getCategories } from "@/services";
import { useRouter } from "next/router";


const CreatePost = () => {
    const router = useRouter();
    const [authors, setAuthors] = useState([])
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getAuthors().then(data => {
            setAuthors(data);
        })

        getCategories().then(data => {
            setCategories(data);
        })
    }, [])

    const [values, setValues] = useState({
        title: "",
        excerpt: "",
        content: "",
        featured: true,
        authorId: "",
        categoryId: "",
        photo: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };
    
    const handleFileChange = (e) => {
        const file = e.target.files?.[0] || null;
        setValues({ ...values, photo: file });
    };
  
    const [rows, setRows] = useState(8);

    useLayoutEffect(() => {
        const handleResize = () => {
        if (window.innerWidth >= 768) { // Adjust the breakpoint as needed
            setRows(12); // Rows for medium screens and larger
        } else {
            setRows(8); // Default rows for smaller screens
        }
        };
    
        handleResize(); // Call it initially
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

  

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("excerpt", values.excerpt);
        formData.append("content", values.content);
        formData.append("featured", values.featured);
        formData.append("fees", values.fees);
        formData.append("authorId", values.authorId);
        formData.append("categoryId", values.categoryId);
        if (values.photo) {
        formData.append("photo", values.photo);
        }
    
        axios.post(`http://localhost:8080/api/posts`, formData)
        .then((res) => {
            console.log(res);
            // window.location.reload();
            router.push('/');
        })
        .catch((err) => alert(err));
    };
    
    const formStyle =
      "w-full px-4 py-2 border bg-gray-700 text-white placeholder-gray-400 border-gray-600 rounded-md focus:outline-none focus:ring focus:border-blue-300";
      
  return (
    <div className="min-h-screen  flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className=" bg-slate-800 mx-2 text-white shadow-md rounded-lg p-6 space-y-4 w-full md:w-[70%]"
      >
        <h2 className="text-3xl font-semibold text-center text-pink-400">
          Create a New Post
        </h2>

        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className=" md:w-1/2 flex flex-col justify-between ">
            <div className="flex flex-col gap-1">
              <label className="font-medium">Add Image</label>
              <input
                type="file"
                className={`${formStyle}`}
                name="photo"
                onChange={handleFileChange}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium">Title</label>
              <input
                type="text"
                placeholder="Enter Title"
                className={formStyle}
                name="title"
                value={values.title}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium">Excerpt</label>
              <textarea
                rows={3}
                placeholder="Enter Excerpt"
                className={formStyle}
                name="excerpt"
                value={values.excerpt}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium">Author</label>
                <select
                  required
                  name="authorId"
                  className={formStyle}
                  value={values.authorId}
                  onChange={handleChange}
                >
                    {
                        authors.map(au => (
                            <option key={au.id} value={au.id}>{au.name}</option>
                        ))
                    }
                </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium">Category</label>
                <select
                  required
                  name="categoryId"
                  className={formStyle}
                  value={values.categoryId}
                  onChange={handleChange}
                >
                    {
                        categories.map(ca => (
                            <option key={ca.id} value={ca.id}>{ca.name}</option>
                        ))
                    }
                </select>
            </div>
          </div>

          <div className=" md:w-1/2 flex flex-col gap-2">
            <div className="flex flex-col gap-1">
                <label className="font-medium">Featured</label>
                <select
                required
                name="featured"
                className={formStyle}
                value={values.featured}
                onChange={handleChange}
                >
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                </select>
            </div>
            <label className="font-medium">Post's Content</label>
            <textarea
              rows={rows}
              placeholder="Enter Post's Content"
              className={formStyle}
              name="content"
              value={values.content}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex justify-around">
          <Link href={'/'}>
            <button type="button" className="px-6 py-2 rounded bg-[#e93b8c] hover:bg-[#f14b99]">
              Back
            </button>
          </Link>
          <button
            type="submit"
            className="px-6 py-2 text-white rounded bg-[#e93b8c] hover:bg-[#f14b99] "
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
