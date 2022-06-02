import React, { useState, useEffect, useMemo, useRef  } from "react";
import TaskService from "./../../services/TaskService";
import { toast } from "react-toastify";
import { MDBDataTable } from "mdbreact";
import UserService from "./../../services/UserService";
import { Button,Modal} from 'react-bootstrap';  

const AssignTasks = () => {
    const [posts, setPosts] = useState([]);
    const [usersForRender, setUsersForRender] = useState([]);  
    const [show, setShow] = React.useState(false);
    const [show1, setShow1] = React.useState(false);
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [selTask, setSelTask] = React.useState("");
    const [selUser, setSelUser] = React.useState("");
    const[note,setNote]=React.useState("");
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [groupValue, setGroupValue] = React.useState("");
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
      const  handleModalClose=()=>{  
        setShow(!show)  ;               
        }
        const  handleModalClose1=()=>{  
            setShow1(!show1)  ;               
            }
    
    const  handleModal=(groupId)=>{  
        setGroupValue(groupId);
        setShow(!show)  ;
          getTasks(); 
        }
        const getTasks=()=>{
            TaskService.getAllPendingTasks()
            .then((response) => {
               
                const TaskList = [{taskId: '-1', taskName: 'Please Select A Task...'}, ...response.data];
                setTasks(TaskList);
               
        })
            .catch((e) => {
            });       
        }
        




        const  handleModal1=(groupId)=>{  
            setGroupValue(groupId);
            setShow1(!show)  ;
              getUsers(); 
            }
            const getUsers=()=>{
                UserService.getTheUsers()
                .then((response) => {
                   
                    const userList = [{id: '-1', name: 'Please Select A User...'}, ...response.data];
                    setUsers(userList);                   
            })
                .catch((e) => {
                });       
            }
        const AssignTask=()=>{
            var data = {
                GroupId:groupValue,
        TaskId:selTask,
        isActive:"1",
        Attachment: "Doc"+groupValue+"_"+selTask+"."+selectedFile.name.split('.').pop() ,
        Note:note
            };
          
          TaskService.AssignTaskToGroup(data)
           .then((response) => {
               if (response.data.isSuccess) {
                   toast.success(response.data.message)
                  onFileUpload();
                handleModalClose();                
            } 
                else{               
                   toast.error(response.data.message)
             }
              })
           }
           const onFileUpload = () => {
            const formData = new FormData();
      var fileExtension = selectedFile.name.split('.').pop();
     
      formData.append(
        "myFile",
        selectedFile,
        "Doc"+groupValue+"_"+selTask+"."+fileExtension          
      );     
          TaskService.uploadDoc(formData) .then(          
           (response) => {
              console.log("success");
            }, () => {
              console.log("fail");
            });
         
       };   
       const AssignUser=()=>{
        var data = {
            GroupId:groupValue,
    UserId:selUser,
    isActive:"1"   
        };
    
      TaskService.AssignUserToGroup(data)
       .then((response) => {
           if (response.data.isSuccess) {
               toast.success(response.data.message)             
            handleModalClose1();                
        } 
            else{               
               toast.error(response.data.message)
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
             {posts[index].isActive=="1"?
  (<div> <button type="button" className="btn btn-link" onClick={()=>handleModal(posts[index].groupId)}>Assign Tasks</button>
  <button type="button" className="btn btn-link" onClick={() => handleModal1(posts[index].groupId)}>Assign Users</button>
  </div>)
         :
         (<div className="highlight" >Blocked</div>)
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
         <Modal show={show} onHide={()=>handleModal()}>  
          <Modal.Header closeButton>Select a Task</Modal.Header>  
          <Modal.Body>
          <select  className="form-control" value={selTask} onChange={e=>setSelTask(e.currentTarget.value)}>
   {
       tasks.map(({taskId,taskName})=>(
           <option
           key={taskId} value={taskId}>{taskName}</option>
       ))
   }
   </select>
   <div>
     <label>Enter Note:</label>
   <textarea className="form-control" placeholder="Note"  onChange={(e)=>{setNote(e.target.value)}}></textarea>
   </div>
   <div>
     <label></label>
     <br/>
                <input type="file" onChange={(e)=>{ setSelectedFile(e.target.files[0]);}} />
               
            </div>
              </Modal.Body>  
          <Modal.Footer>  
          <Button onClick={()=>AssignTask()}>Save</Button>
            <Button onClick={()=>handleModalClose()}>Close</Button> 
          </Modal.Footer>  
        </Modal>  

        
        <Modal show={show1} onHide={()=>handleModalClose1()}>  
          <Modal.Header closeButton>Select a User</Modal.Header>  
          <Modal.Body>
          <select  className="form-control" value={selUser} onChange={e=>setSelUser(e.currentTarget.value)}>
   {
       users.map(({id,name})=>(
           <option
           key={id} value={id}>{name}</option>
       ))
   }
   </select>   
              </Modal.Body>  
          <Modal.Footer>  
          <Button onClick={()=>AssignUser()}>Save</Button>
            <Button onClick={()=>handleModalClose1()}>Close</Button> 
          </Modal.Footer>  
        </Modal>  
      </div>
    );
  }

export default AssignTasks