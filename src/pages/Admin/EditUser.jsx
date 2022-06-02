import React, { useState,useEffect } from "react";
import UserDataService from "./../../services/UserService";
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import './../../Styles/Styles.css'
import { useFormik} from 'formik'
import * as Yup from 'yup'
import { toast } from "react-toastify";
import TextField from '@material-ui/core/TextField';


const EditUser = (props) => {
 
   const initialUserState = {
    id: null,
    name:"",
    email: "",
    phoneNumber:"",
    jobTitle:"",
    joinDate:"",
  };
  const [user, setUser] = useState(initialUserState);
  const [joinDate, setJoinDate] = useState(new Date());    
  const nameRegExp=/^[a-zA-Z ]*$/;
  const phoneRegExp =/^[0-9]{10}$/;
  useEffect(() => {   
    retrieveUserDetails();    
  }, []);
  const validationSchema = Yup.object({
            name : Yup.string()
             .required("Required!").matches(nameRegExp,'Alphabets are only allowed')
             .max(50),
             email: Yup.string()
              .required("Required!").email('Invalid email format'),
              phoneNumber: Yup.string()
              .required("Required!").matches(phoneRegExp, 'Phone Number should be 10 digits!!!'),
             jobTitle: Yup.string()
              .required("Required!").matches(nameRegExp,'Please enter valid Job Title'),
             joinDate: Yup.string()
              .required("Required!"),           
});
  const formik = useFormik({
    enableReinitialize:true,
    initialValues: user,
    validationSchema: validationSchema,
    onSubmit: values => {      
     updateUser(values.name,values.email,values.phoneNumber,values.jobTitle,joinDate)
    },
}); 
   const retrieveUserDetails = () => { 
     
     UserDataService.getUserById(props.location.state)   
      .then((response) => { 
        setUser(response.data);    
        setJoinDate(new Date(response.data.joinDate));
         
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const updateUser = (name,email,phoneNumber,jobTitle,joinDate) => {   
    var data = {
        name: name,
        email: email,
        phoneNumber:phoneNumber,
        jobTitle:jobTitle,
        joinDate:moment(joinDate).format('YYYY-MM-DD'),
        userName: '',
        password:'',
        confirmPassword:'',
        isBlock:"0"
    };   
    if(joinDate !== null){
    UserDataService.update(props.location.state,data)
      .then((response) => {
        if (response.data.isSuccess) {
            toast.success(response.data.message);           
            props.history.push("/registeredusers");       
      
        }
        else {
            toast.error(response.data.errors);
        }
    })
  }
  }; 
const cancelEdit=()=>{
  props.history.push("/registeredusers");       
}
  return (
    <div >  
        <div className="CreateUser">  
         <form onSubmit={formik.handleSubmit} autoComplete="off">      
  <div className="row">
        <div className="form-group col-10" >
        <TextField 
        required
            id="name"   
            label="Name"     
            value={formik.values.name}
            onChange={formik.handleChange}     
            error={formik.touched.name && Boolean(formik.errors.name)}      
            name="name"
            margin="normal"
          />       
         
          {formik.errors.name ? 
      <div className="myDiv">{formik.errors.name}</div> : null}
        </div>
        </div>
<div className="row">
        <div className="form-group col-5">
        <TextField 
        required
            id="email"   
            label="Email Id"     
            value={formik.values.email}
            onChange={formik.handleChange}     
            error={formik.touched.email && Boolean(formik.errors.email)}      
            name="email"
            margin="normal"
          />       
        
          {formik.errors.email ? 
      <div className="myDiv">{formik.errors.email}</div> : null}
        </div>
        <div className="form-group col-5">
        <TextField 
        required
            id="phoneNumber"   
            label="Contact Number"     
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}     
            error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}      
            name="phoneNumber"
            margin="normal"
          />      
         
          {formik.errors.phoneNumber ? 
      <div className="myDiv">{formik.errors.phoneNumber}</div> : null}
        </div>      
        </div>
        <div className="row">
        <div className="col-5 ">
        <TextField 
        required
            id="jobTitle"   
            label="Job Title"     
            value={formik.values.jobTitle}
            onChange={formik.handleChange}     
            error={formik.touched.jobTitle && Boolean(formik.errors.jobTitle)}      
            name="jobTitle"
            margin="normal"
          />      
         
         
          {formik.errors.jobTitle ? 
      <div className="myDiv">{formik.errors.jobTitle}</div> : null}
        </div>        
        </div>  
          <button type="submit" className="btn btn-primary me-4 mt-2" >Update</button>
          <button type="button" className="btn btn-primary mt-2 " onClick={cancelEdit}>Cancel</button>
         </form>
        </div>  
    </div>
  );
};

export default EditUser;