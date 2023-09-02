import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";


const CreateCategory = () => {
    const router = useRouter();
    const [name, setName] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
    
        axios.post(`http://localhost:8080/api/categories`, {
          "name": name
        })
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
        className=" bg-slate-800 mx-2 text-white shadow-md rounded-lg p-6 space-y-4 w-full md:w-[50%]"
      >
        <h2 className="text-3xl font-semibold text-center text-pink-400">
          Create a New Category
        </h2>

        <div className="flex justify-between gap-4 w-full">
          <input
            type="text"
            placeholder="Enter Category Name"
            className={formStyle}
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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

export default CreateCategory;
