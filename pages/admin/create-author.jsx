import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";


const CreatePost = () => {
    const router = useRouter();

    const [values, setValues] = useState({
        name: "",
        bio: "",
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

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("bio", values.bio);
        if (values.photo) {
        formData.append("photo", values.photo);
        }
    
        axios.post(`http://localhost:8080/api/authors`, formData)
        .then((res) => {
            console.log(res);
            // window.location.reload();
            router.push('/');
        })
        .catch((err) => alert(err));
    };
    
    const formStyle =
      "flex-1 px-4 py-2 border bg-gray-700 text-white placeholder-gray-400 border-gray-600 rounded-md focus:outline-none focus:ring focus:border-blue-300";
      
  return (
    <div className="min-h-screen  flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className=" bg-slate-800 mx-2 text-white shadow-md rounded-lg p-6 space-y-4 w-full md:w-[50%]"
      >
        <h2 className="text-3xl font-semibold text-center text-pink-400">
          Create a New Author
        </h2>

        <div className="flex flex-col justify-between gap-4">
            <div className="flex gap-4">
              <label className="font-medium mt-3 text-lg tracking-wider">Add Profile :</label>
              <input
                type="file"
                className={`${formStyle}`}
                name="photo"
                onChange={handleFileChange}
              />
            </div>

            <input
            type="text"
            placeholder="Enter Author's Name"
            className={formStyle}
            name="name"
            value={values.name}
            onChange={handleChange}
            />

            <textarea
            rows={3}
            placeholder="Enter Author's Bio"
            className={formStyle}
            name="bio"
            value={values.bio}
            onChange={handleChange}
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

export default CreatePost;
