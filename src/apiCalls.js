import {
  startProcess,
  failedProcess,
  getAllUsersData,
  updateUserData,
} from "./redux/usersDataSlice";

export const getAllUsers = async (dispatch, privateRequest) => {
  dispatch(startProcess);
  try {
    const res = await privateRequest.get("users/findall");
    console.log(res.data);
    dispatch(getAllUsersData(res.data));
  } catch (error) {
    dispatch(failedProcess(error));
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
