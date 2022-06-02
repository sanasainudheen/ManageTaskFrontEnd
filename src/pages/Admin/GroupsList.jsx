import React, { useState, useEffect  } from "react";
import TaskService from "./../../services/TaskService";
import {Link } from "react-router-dom";
import { toast } from "react-toastify";
import { MDBDataTable } from "mdbreact";

const GroupsList = (props) => {
    const [posts, setPosts] = useState([]);
    const [usersForRender, setUsersForRender] = useState([]);  
    useEffect(() => {   
        retrieveGroups();    
      }, []);
      const retrieveGroups = () => {    
          TaskService.getAllGroups().then((response) => {
            setPosts(response.data);    
          })
          .catch((e) => {
            console.log(e);
          });
      };
      const enableGroup=(rowIndex)=>{
        if (window.confirm('Are you sure you wish to enable the group?'))
        TaskService.enableDisable(rowIndex,1)
          .then((response) => {
            if (response.data.isSuccess) {
                toast.success(response.data.message);          
                retrieveGroups();  
                props.history.push("/GroupsList");   
            }
            else {
                toast.error("response.data.errors");
            }
        })    
      }
      const disableGroup=(rowIndex)=>{
        if (window.confirm('Are you sure you wish to disable the group?'))
        TaskService.enableDisable(rowIndex,0)
          .then((response) => {
            if (response.data.isSuccess) {
                toast.success(response.data.message);          
                retrieveGroups();  
                props.history.push("/GroupsList");   
            }
            else {
                toast.error("response.data.errors");
            }
        })    
          
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
              <Link to={{ 
     pathname: "/viewgroupusers", 
     state: posts[index].groupId
    }}>
    <button type="button" className="btn btn-link">View Users</button>
    </Link>  
    {posts[index].isActive=="1"?
               ( <button type="button" className="btn btn-link" onClick={() => disableGroup(posts[index].groupId)}>Disable</button>)
               :
               ( <button type="button" className="btn btn-link" onClick={() => enableGroup(posts[index].groupId)}>Enable</button>)
    }          
             
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
          label: "Description",
          field: "description",
          sort: "asc",
          width: 200,
        },
        {
          label: "Members",
          field: "noOfMembers",
          sort: "asc",
          width: 200,
          
        },
        {
            label: "Created Date",
            field: "createdDate",
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
  
    return (
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
    );
  }
  
  export default GroupsList;