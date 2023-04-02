import {
  startProcess,
  failedProcess,
  getAllUsersData,
  updateUserData,
} from "./redux/usersDataSlice";

export const getAllUsers = async (
  navigate,
  location,
  dispatch,
  privateRequest
) => {
  dispatch(startProcess);
  try {
    const res = await privateRequest.get("users/findall");
    console.log(res.data);
    dispatch(getAllUsersData(res.data));
  } catch (error) {
    dispatch(failedProcess(error));
    navigate("/login", { state: { from: location }, replace: true });
  }
};

export const updateNewUserData = async (
  dispatch,
  id,
  privateRequest,
  userNewData
) => {
  dispatch(startProcess);
  try {
    const res = await privateRequest.put(`/users/${id}`, userNewData);
    dispatch(updateUserData({ id, userNewData }));
  } catch (error) {
    dispatch(failedProcess(error));
  }
};

export const createNewUser = async (privateRequest, newUser) => {
  try {
    const res = await privateRequest.post("/auth/register", newUser);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
