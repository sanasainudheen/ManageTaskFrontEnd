import  React, { useState ,useEffect} from "react";
import { MDBDataTable } from "mdbreact";
import {useRef } from "react";
import UserDataService from "./../../services/UserService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const RegisteredUsers = (props) => {
  const [posts, setPosts] = useState([]);
  const [usersForRender, setUsersForRender] = useState([]);
  const usersRef = useRef();
  usersRef.current = posts;

  useEffect(() => {
    retrieveUsers();
  }, []);
  const retrieveUsers = () => {
    UserDataService.getAll().then((response) => {
      setPosts(response.data);
    })
      .catch((e) => {
        console.log(e);
      });
  };

  const blockUser = (rowIndex) => {
    if (window.confirm('Are you sure you wish to block this user?'))
      UserDataService.block(rowIndex, 1)
        .then((response) => {
          if (response.data.isSuccess) {
            toast.success(response.data.message, { autoClose: 3000 });
            retrieveUsers();
            props.history.push("/registeredusers");
          }
          else {
            toast.error("response.data.errors");
          }
        })
  };
  const unBlockUser = (rowIndex) => {
    if (window.confirm('Are you sure you wish to unblock this user?'))
      UserDataService.block(rowIndex, 0)
        .then((response) => {
          if (response.data.isSuccess) {
            toast.success(response.data.message, { autoClose: 3000 });
            retrieveUsers();
            props.history.push("/registeredusers");
          }
          else {
            toast.error("response.data.errors");
          }
        })
  };
  const deleteUser = (rowIndex) => {
    if (window.confirm('Are you sure you wish to delete this user?'))
      UserDataService.remove(rowIndex)
        .then((response) => {
          if (response.data.isSuccess) {
            props.history.push("/registeredusers");
            let newUsers = [...usersRef.current];
            newUsers.splice(rowIndex, 1);
            setPosts(newUsers);
            retrieveUsers();
          }
          else {

            toast.error(response.data.message);
          }
        });
  }
  useEffect(() => {
    let postsArray = JSON.parse(JSON.stringify(posts));
    let userData = [];
    postsArray.map((item, index) => {
      item.id = (
        <div style={{ fontWeight: "bold", fontSize: "1.2em" }}>{item.id}</div>
      );
      item.action = (
        <div style={{ display: "flex", justifyContent: "space-between",float: "center"}}>        
            <Link to={{
                pathname: "/edituser",
                state: posts[index].id
              }}>
                 <div
            className="uil-trash-alt"
            style={{
              cursor: "pointer",
              color: "black",
              fontSize: ".7em",
              padding: ".5rem",
              borderRadius: ".3rem",
              background: "#73B9EE",
            }}
          >
            Edit
          </div>               
              </Link>
              {posts[index].isBlock == "0" ?
                (
                  
                  <div
                  className="uil-trash-alt"
                  style={{
                    cursor: "pointer",
                    color: "black",
                    fontSize: ".7em",
                    padding: ".5rem",
                    borderRadius: ".3rem",
                    background: "#73B9EE",
                  }}
                  onClick={() => blockUser(posts[index].id)}
                >
                  Block
                </div>
                )
                :
                (
                  <div
                  className="uil-trash-alt"
                  style={{
                    cursor: "pointer",
                    color: "black",
                    fontSize: ".7em",
                    padding: ".5rem",
                    borderRadius: ".3rem",
                    background: "#73B9EE",
                  }}
                  onClick={() => unBlockUser(posts[index].id)}
                >
                  Unblock
                </div>
                )
              }

<div
                  className="uil-trash-alt"
                  style={{
                    cursor: "pointer",
                    color: "black",
                    fontSize: ".7em",
                    padding: ".5rem",
                    borderRadius: ".3rem",
                    background: "#73B9EE",
                  }}
                  onClick={() => deleteUser(posts[index].id)}
                >
                  Delete
                </div>
           
        </div>
      );
      userData.push(item);
    });
    setUsersForRender(userData);
  }, [posts]);

  const data = {
    columns: [
     
      {
        label: "name",
        field: "name",
        sort: "asc",
        width: 270,
      },

      {
        label: "Email Id",
        field: "email",
        sort: "asc",
        width: 200,
      },
      {
        label: "Username",
        field: "userName",
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

export default RegisteredUsers;