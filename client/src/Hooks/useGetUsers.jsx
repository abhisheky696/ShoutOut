import { useDispatch, useSelector } from "react-redux";
import { doRefreshUser, getOtherUsers } from "../redux/userSlice";
import axios from "axios";
import { useEffect } from "react";
import BASE_URL from "../utils/constant";
const useGetUsers = (id) => {
    const dispatch=useDispatch();
    const refreshUser=useSelector((state)=>state.user.refresh);
    useEffect(()=> {
        const fetchUsers = async () => {
            try {
                const response=await axios.get(`${BASE_URL}/api/v1/user/allusers/${id}`,
                    {
                        withCredentials: true,
                    }
                )
                // console.log("other users data is",response.data.data);
                dispatch(getOtherUsers(response?.data?.data));
                // console.log("all users get refrehed in the hooks sections")
            } catch(error) {
                console.log("error occured while fetching all other users",error.message);
            }
        }
        fetchUsers();
    },[id]);
}
export default useGetUsers
