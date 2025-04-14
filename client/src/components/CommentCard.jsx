import React, { useState } from "react";
import Avatar from "react-avatar";
import { MessageCircle, Heart } from "lucide-react";
import { motion } from "framer-motion";
import CreateComment from "./CreateComment";

const CommentCard = ({ comment }) => {
    const [isLike, setIsLike] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="ml-3 flex flex-col border-t border-gray-300 px-4 py-2 m-3 whitespace-normal">
            <div className="ml-10 flex">
                <Avatar name={comment?.authorname} size="40" round="40px" />
                <div>
                    <div className="flex gap-2 mx-3">
                        <span>{comment?.authorname}</span>
                        <span className="cursor-pointer">
                            @{comment?.authorusername}
                        </span>
                    </div>
                    <div className="mx-2">{comment?.content}</div>
                    <div className="flex justify-between px-5 py-2">
                        <div
                            className="flex cursor-pointer rounded-full shadow-2xl"
                            onClick={() => setIsOpen(true)}
                        >
                            <MessageCircle />
                            <span className="ml-1">2</span>
                        </div>
                        <button
                            className="flex items-center space-x-1 cursor-pointer"
                            onClick={() => setIsLike(!isLike)}
                        >
                            <motion.div
                                whileTap={{ scale: 0.8 }}
                                animate={{ scale: isLike ? [1, 1.3, 1] : 1 }}
                                transition={{ duration: 0.6 }}
                            >
                                <Heart
                                    className={`transition ${
                                        isLike
                                            ? "fill-red-500 stroke-red-500"
                                            : "stroke-gray-600"
                                    }`}
                                />
                            </motion.div>
                            <span className="text-sm">32</span>
                        </button>
                    </div>
                </div>
            </div>
            {comment?.commentData && (
                <div className="ml-10">
                    <CommentCard comment={comment.commentData} />
                </div>
            )}
            <CreateComment isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
    );
};

export default CommentCard;
