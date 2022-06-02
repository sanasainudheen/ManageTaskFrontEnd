import http from "./http-common";


const getAll = () => { 
  return http.get("/user/list");
};

const getTheUsers = () => { 
  return http.get("/User/getTheUsers");
};

const getUserById = (id) => {
  console.log(id);
  return http.get(`/user/get/${id}`);
};
const getUsersByGroupId = (groupId) => {  
  return http.get(`/user/getUsersByGroupId/${groupId}`);
};

const create = (data) => {
  return http.post("/user", data);
};
const update = (id, data) => {
  return http.put(`/user/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/user/${id}`);
};

const block = (id,value) => {
  return http.put(`/user/blockuser/${id}/${value}`);
};
const searchUserByName = (userName) => {  
  return http.get(`/user/searchUserByName/${userName}`);
};
const resetPassword = (userName,oldPassword,newPassword) => { 
  return http.put(`/user/resetPassword/${userName}/${oldPassword}/${newPassword}`);
};
const UserService = {
  getAll,
  getUserById,
  create,
  update,
  remove,
  block,
  getTheUsers,
  getUsersByGroupId,
  searchUserByName,
  resetPassword
};

export default UserService;