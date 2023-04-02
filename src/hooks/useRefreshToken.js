import { useDispatch } from "react-redux";
import { publicRequest } from "../redux/requestMethods";
import { updateAccessToken } from "../redux/userSlice";
import { useLocation, useNavigate } from "react-router-dom";

const useRefreshToken = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getAccessToken = async () => {
    try {
      const res = await publicRequest.get("/auth/refresh", {
        withCredentials: true,
      });
      const { accessToken } = res.data;
      // console.log(`new One ${accessToken}`);
      dispatch(updateAccessToken(accessToken));
      return accessToken;
    } catch (error) {
      console.log(error);
      // navigate("/login", { state: { from: location } });
    }
  };
  return getAccessToken;
};

export default useRefreshToken;
