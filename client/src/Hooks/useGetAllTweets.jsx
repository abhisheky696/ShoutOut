import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllTweets } from "../redux/tweetSlice";
import BASE_URL from "../utils/constant";
const useGetAllTweets = (id) => {
    const dispatch = useDispatch();
    const refresh=useSelector((state)=>state.tweet.refresh);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${BASE_URL}/api/v1/tweet/alltweets/${id}`,
                    {
                        withCredentials: true,
                    }
                );
                dispatch(getAllTweets(response?.data?.allTweets));
                // console.log("all tweet refersheds")
                // console.log("data received in the all tweets hooksss ",response?.data?.allTweets);
            } catch (error) {
                console.log(
                    "some error occured while fetching all tweets",
                    error.message
                );
            }
        };
        fetchData();
    }, [id,refresh]);
};

export default useGetAllTweets;
