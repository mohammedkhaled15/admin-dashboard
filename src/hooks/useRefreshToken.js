import { useDispatch } from "react-redux";
import { publicRequest } from "../redux/requestMethods";
import { resetUser, updateAccessToken } from "../redux/userSlice";
import { persistor } from "./../redux/store";

const useRefreshToken = () => {
  const dispatch = useDispatch();

  const getAccessToken = async () => {
    try {
      const res = await publicRequest.get("/auth/refresh", {
        withCredentials: true,
      });
      const { accessToken } = res.data;
      dispatch(updateAccessToken(accessToken));
      return accessToken;
    } catch (error) {
      console.log(error);
      if (error.response?.status === 403) {
        dispatch(resetUser());
        persistor.purge();
      }
    }
  };
  return getAccessToken;
};

export default useRefreshToken;
