import http from "./http-common";

 const getAllGroups = () => { 
      return http.get("/Task/GetAllGroups");
 };
 const CreateGroup = (data) => {
   return http.post("/Task/CreateGroup", data);
 };
 const createTask = (data) => {
  return http.post("/Task/CreateTask", data);
};
const createUserGroup = (data) => {
  return http.post("/Task/CreateUserGroup", data);
};
const createUserGroupTask = (data) => {
  return http.post("/Task/CreateUserGroupTask", data);
};
const uploadDoc = (formData) => {
  return http.post("/FileUploadApi", formData);
};
const getAllUserGroups = () => { 
  return http.get("/Task/GetAllUserGroups");
};
const getAllTasksByAdmin = (taskId,flag) => { 
  return http.get(`/Task/getAllTasksByAdmin/${taskId}/${flag}`);
};
const getAllTasks = () => { 
  return http.get("/Task/getAllTasks");
};
const getAllPendingTasks = () => { 
  return http.get("/Task/getAllPendingTasks");
};
const GetGroupTasksByUser = (userId,taskId,flag) => { 
  return http.get( `/Task/GetGroupTasksByUser/${userId}/${taskId}/${flag}`);  
};
const GetDoneGroupTasksByUser = (userId,taskId,flag) => { 
  return http.get( `/Task/GetDoneGroupTasksByUser/${userId}/${taskId}/${flag}`);  
};
const AssignedTasksByUser = (id,statusId) => { 
  return http.get( `/Task/AssignedTasksByUser/${id}/${statusId}`);  
};

const AssignedTaskDetails = (userGroupTaskId,userId) => { 
  return http.get( `/Task/ViewTaskDetails/${userGroupTaskId}/${userId}`);  
};

const AssignTaskToUser = (data) => {
  return http.post("/Task/AssignTaskToUser", data);
};
const AssignTaskToGroup = (data) => {
  return http.post("/Task/AssignTaskToGroup", data);
};
const AssignUserToGroup = (data) => {
  return http.post("/Task/AssignUserToGroup", data);
};
const updateUserStatus = (data) => {
  return http.post("/Task/UpdateUserStatus", data);
};
const enableDisable = (groupId,value) => {
  return http.put(`/Task/enableDisable/${groupId}/${value}`);
};
const getStatusCount = (flag) => {
  return http.get(`/Task/GetStatusCount/${flag}`);
};



const TaskService = {
    getAllGroups,
    getAllUserGroups,
    getAllTasks,
    CreateGroup,
   createTask,
   createUserGroup,
   createUserGroupTask,
   getAllTasksByAdmin,
   AssignTaskToUser,
   uploadDoc,
   GetGroupTasksByUser,
   GetDoneGroupTasksByUser,
   AssignedTasksByUser,
   AssignedTaskDetails,
   updateUserStatus,
   enableDisable,
   getAllPendingTasks,
   AssignTaskToGroup,
   AssignUserToGroup,
   getStatusCount
};

export default TaskService;