import React, { useState, useEffect ,useRef } from "react";
import TaskService from "../../services/TaskService";
import {Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";

const ViewGroupTasks=()=>{
    const [posts, setPosts] = useState([]);
    const [usersForRender, setUsersForRender] = useState([]);     
    const [groupTaskList, setGroupTaskList] = useState([]);
    const tasksRef = useRef();
    tasksRef.current = groupTaskList;
    React.useEffect(()=>{
        async function GetGroupTasksByUser(){
           // string userId=localStorage.getItem("userId")
            TaskService.GetGroupTasksByUser(localStorage.getItem("userId"),"0","1") .then((response) => {              
                setPosts(response.data);    
                })
                .catch((e) => {
                  console.log(e);
                });
        }    
      
        GetGroupTasksByUser();
    },[]);
    const generateSortingIndicator = column => {
      return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""
    }
    useEffect(() => {
        let postsArray = JSON.parse(JSON.stringify(posts));
        let groupData = [];
        postsArray.map((item, index) => {
          item.id = (
            <div style={{ fontWeight: "bold", fontSize: "1.2em" }}>{item.id}</div>
          );
          item.action = (
            <div style={{ display: "flex"}}> 
                      <Link to={{  pathname: "/TaskDetails",  state: posts[index].taskId}}>
                    <button type="button" className="btn btn-link">View Details</button>
                </Link>              
            </div>
          );
          groupData.push(item);
        });
        setUsersForRender(groupData);
      }, [posts]);
    
      const data = {
        columns: [
         
          {
            label: "Group Name",
            field: "groupName",
            sort: "asc",
            width: 270,
          },
    
          {     
            label: "Task",
            field: "taskName",
            sort: "asc",
            width: 200,
          },        
       
            {
              label: "Status",
              field: "status",
              sort: "asc",
              width: 200,
            },
          {
            label: "Action",
            field: "action",
            width: 100,
          },
        ],
    
        rows: usersForRender,
      };
  

    return(
        <div className="App">
        <MDBDataTable
          responsive
          bordered
          striped 
          hover
          data={data}
          entriesOptions={[4, 8, 20]}
          entries={8}   
    
        />
        </div>      
    )
}
export default ViewGroupTasks;