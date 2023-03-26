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

export const getTotallTrasactionsForUser = async (id, privateRequest) => {
  try {
    const res = await privateRequest.get(`orders/find/${id}`);
    const totalAmount = res.data.reduce((acc, curr) => (acc += curr.amount), 0);
    return t
  } catch (error) {
    console.log(error)
  }
};
