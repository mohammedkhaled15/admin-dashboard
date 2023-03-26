import {
  startProcess,
  failedProcess,
  getAllUsersData,
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
