import {
  startProcess,
  failedProcess,
  getAllUsersData,
  updateUserData,
} from "./redux/usersDataSlice";
import { resetUser } from "./redux/userSlice";

const getAllUsers = async (navigate, location, dispatch, privateRequest) => {
  dispatch(startProcess);
  try {
    const res = await privateRequest.get("users/findall");
    console.log(res.data);
    dispatch(getAllUsersData(res.data));
  } catch (error) {
    dispatch(failedProcess(error));
    // if (error?.response?.status === 403) {
    //   dispatch(resetUser()); // any error status from private request === 403 have to reset currnt user data and consequently navigate to login page
    // }
  }
};

const updateNewUserData = async (dispatch, id, privateRequest, userNewData) => {
  dispatch(startProcess);
  try {
    const res = await privateRequest.put(`/users/${id}`, userNewData);
    dispatch(updateUserData({ id, userNewData }));
  } catch (error) {
    dispatch(failedProcess(error));
  }
};

const createNewUser = async (privateRequest, newUser) => {
  try {
    const res = await privateRequest.post("/auth/register", newUser);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export { createNewUser, updateNewUserData, getAllUsers };
