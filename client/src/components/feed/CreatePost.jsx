import React, { useContext, useState } from "react";
import { createPost } from "../../services/post.services";
import { PostContext } from "../../context/PostContext.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";

const CreatePost = ({}) => {
  const { user } = useContext(AuthContext);
  const { fetchPosts } = useContext(PostContext);
  const [postData, setPostData] = useState({
    caption: "",
  });
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const handleInputChange = (e) => {
    e.preventDefault();
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => {
      const updated = [...prev, ...files];
      return updated.slice(0, 5); // limit to 5
    });
    const preview = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => {
      const updated = [...prev, ...preview];
      return updated.slice(0, 5);
    });
  };
  const handleRemoveImage = (indexToRemove) => {
    setImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove),
    );

    setPreviewImages((prevPreview) =>
      prevPreview.filter((_, index) => index !== indexToRemove),
    );
  };

  const handelSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append("caption", postData.caption);

      images.forEach((image) => {
        formData.append("postPhoto", image);
      });
      console.log([...formData.entries()]);

      await createPost(formData);
      fetchPosts();
      setImages([]);
      setPostData({ text: "" });
      setPreviewImages([]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center gap-3 mb-4">
        <img
          src={user?.profilePhoto}
          alt="User"
          className="w-11 h-11 rounded-full"
        />
        <input
          type="text"
          name="caption"
          value={postData.caption}
          onChange={handleInputChange}
          placeholder={`What's on your mind, ${user?.name}? `}
          className="flex-1 bg-gray-100 rounded-full px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#004953]/20"
        />
      </div>
      {previewImages.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-4">
          {previewImages.map((img, index) => (
            <div key={index} className="relative">
              {/* Image */}
              <img
                src={img}
                alt="Preview"
                className="w-24 h-24 object-cover rounded-lg border border-gray-400"
              />

              {/* Remove Button */}
              <button
                onClick={() => handleRemoveImage(index)}
                className="absolute -top-2 -right-2 bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-500 transition"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-between items-center border-t pt-4">
        <label className="cursor-pointer text-sm text-gray-600 hover:text-[#004953]">
          📷 Photo
          <input type="file" multiple hidden onChange={handleImageChange} />
        </label>

        <button
          onClick={handelSubmit}
          className="bg-[#004953] text-white px-5 py-2 rounded-lg text-sm hover:opacity-90 transition"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
