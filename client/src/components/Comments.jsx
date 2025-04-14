import React, { useState } from "react";
import CommentCard from "./CommentCard";
import CreateComment from "./CreateComment";
import { commentData } from "./tweetdata.jsx";

const Comments = () => {
    return (
        <div>
            <div className="text-2xl font-bold ml-3">Comments:</div>
            <div>
                {commentData.map((comment) => {
                    return <CommentCard key={comment.commentid} comment={comment} />;
                })}
            </div>
        </div>
    );
};

export default Comments;
