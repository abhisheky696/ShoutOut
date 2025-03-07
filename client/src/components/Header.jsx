import React from 'react'
import { useDispatch } from 'react-redux';
import { doRefresh } from '../redux/tweetSlice';

const Header = ({followingTweets}) => {
  //console.log("data received at the header section",followingTweets)
  const dispatch=useDispatch();
  return (
    <div className='flex h-12 font-semibold border-b sticky'>
        <button onClick={()=>followingTweets(false)} className='w-[50%] focus:bg-gray-300 flex justify-center items-center border-r cursor-pointer'>
            For You
        </button>
        <button onClick={()=>{followingTweets(true);dispatch(doRefresh())}} className='w-[50%] focus:bg-gray-300 flex justify-center items-center cursor-pointer'>
            Followings
        </button>
    </div>
  )
}

export default Header;