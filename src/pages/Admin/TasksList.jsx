import React, { useState, useEffect } from "react";
import TaskService from "./../../services/TaskService";
import { MDBDataTable } from "mdbreact";
import { Button,Modal} from 'react-bootstrap';
import moment from 'moment';

const TasksList = () => {
    const [posts, setPosts] = useState([]);
    const [usersForRender, setUsersForRender] = useState([]);     
    const [show, setShow] = React.useState(false);
    const [selStatus, setSelStatus] = React.useState("4");
    const[selTask,setSelTask]=React.useState(); 
    useEffect(() => {   
        retrieveAllTasks();    
      }, []);
      const retrieveAllTasks = () => {    
          TaskService.getAllTasksByAdmin(0,1).then((response) => {
            setPosts(response.data);    
          })
          .catch((e) => {
            console.log(e);
          });
      };
      const  handleModalClose=()=>{  
        setShow(!show)  ;               
        }
        const  handleModal=(taskId)=>{  
            setSelTask(taskId);
            setShow(!show)  ;
            retrieveAllTasks(); 
            }
            const ChangeStatus=()=>{
                var data = {
                    taskId:selTask,
                  statusId:selStatus,
                  userId:localStorage.getItem("userId"),
                  createdOn:moment(new Date()).format('YYYY-MM-DD'),

                };        
            TaskService.updateUserStatus(data)
            .then((response) => {
              if (response.data.isSuccess) {
                  alert(response.data.message);    
                  retrieveAllTasks();        
                 handleModalClose();
              }
              else {
                  alert(response.data.errors);
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
              {posts[index].status=="Completed" || posts[index].status=="Done" || posts[index].status=="Rejected"?(<div></div>):(
                  <button type="button" className="btn btn-link" onClick={()=>handleModal(posts[index].taskId)}>Change Status</button>      )                        
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
          label: "Task Name",
          field: "taskName",
          sort: "asc",
          width: 270,
        },
  
        {
          label: "Description",
          field: "taskDescription",
          sort: "asc",
          width: 200,
        },
        {
          label: "Start Date",
          field: "startDate",
          sort: "asc",
          width: 200,
          
        },
        {
            label: "End Date",
            field: "endDate",
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
         <Modal show={show} onHide={()=>handleModal()}>  
          <Modal.Header closeButton>Select the status</Modal.Header>  
          <Modal.Body>
          <select  className="form-control" value={selStatus} onChange={e=>setSelStatus(e.currentTarget.value)}>  
        <option value="4">Done</option>
        <option value="5">Rejected</option>  
   </select> 
              </Modal.Body>  
          <Modal.Footer>  
          <Button onClick={()=>ChangeStatus()}>Save</Button>
            <Button onClick={()=>handleModalClose()}>Close</Button> 
          </Modal.Footer>  
        </Modal>  
      </div>
    );
  }

export default TasksList