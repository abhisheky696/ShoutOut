import React, { useState } from 'react';
import Avatar from 'react-avatar';

const CreateComment = ({ isOpen, onClose }) => {
  const [content, setContent] = useState("");
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-red-50 z-50  bg-opacity-30 flex items-center justify-center">
      <div className="bg-white rounded-xl w-[90%] max-w-lg shadow-lg p-5">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold">Post a Comment</h2>
          <button onClick={onClose} className="text-gray-500 text-xl font-bold">&times;</button>
        </div>
        <div className="flex flex-col">
          <div className="flex border border-black px-4 rounded-lg my-2 p-2">
            <div className="cursor-pointer">
              <Avatar name={"Abhishek Yadav"} size="40" round="40px" />
            </div>
            <div className="flex-1">
              <textarea
                className="py-2 px-3 mx-4 text-md outline-none w-full h-20 resize-none"
                placeholder="Post your Reply!!!"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex justify-end items-center">
            <button
              type="submit"
              className="bg-gray-400 text-white rounded-full px-6 py-2 cursor-pointer hover:bg-gray-500"
              onClick={() => {
                console.log("Posted:", content);
                setContent("");
                onClose(); 
              }}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateComment;
