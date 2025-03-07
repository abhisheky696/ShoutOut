import axios from "axios";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux"
import { getProfile } from "../redux/userSlice";

const useGetProfile = (id) => {
    const dispatch = useDispatch();
    const refreshUser=useSelector((state)=>state.user.refresh);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/api/v1/user/profile/${id}`,
                    {
                        withCredentials: true,
                    }
                );
                // console.log("profile of the User:", response.data.user);
                dispatch(getProfile(response?.data?.user));
                // console.log("profile get refreshed in the hook sections")
            } catch (error) {
                console.error(
                    "Error occurred while fetching user profile:",
                    error
                );
            }
        };
        fetchUser();
    },[id,refreshUser]);
};

export default useGetProfile;
