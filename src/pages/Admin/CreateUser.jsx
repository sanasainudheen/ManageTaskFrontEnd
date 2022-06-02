import  React, { useState } from "react";
import UserDataService from "./../../services/UserService";
import Button from '@mui/material/Button';
import './../../Styles/Styles.css'
import { useFormik} from 'formik'
import * as Yup from 'yup'
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
const CreateUser = (props) => {
  const [joinDate, setJoinDate] = useState(new Date()); 
  const [showPassword,setShowPassword]=useState(false);  
  const [showConfirmPassword,setShowConfirmPassword]=useState(false);  
  const initialValues = {
    name:'',
    email:'',
    phoneNumber:'',
    jobTitle:'',
    joinDate:joinDate,
    userName:'',
    password:'',
    confirmPassword:''
  }
 
  const phoneRegExp =/^[0-9]{10}$/;
  const passwordLength = /^.{6,}$/;
  const nameRegExp=/^[a-zA-Z ]*$/;
  

  const validationSchema = Yup.object({
              name: Yup.string()
             .required("Required!").matches(nameRegExp,'Alphabets are only allowed')
             .max(50),
            email: Yup.string()
           .email('Invalid email format'),
              phoneNumber: Yup.string()
             .matches(phoneRegExp, 'Phone Number should be 10 digits!!!'),
             jobTitle: Yup.string()
              .matches(nameRegExp,'Please enter valid Job Title'),
             joinDate: Yup.string()
              .required("Required!"),
              userName: Yup.string()
                .required("Required!")
                .max(600),
                password: Yup.string()
           .matches(passwordLength, 'Minimum 6 characters required!!'),
            confirmPassword: Yup
            .string()            
            .oneOf([Yup.ref('password')], 'Password mismatch...')
});
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit:(values,{resetForm })=>{      
      saveUser(values.name,values.email,values.phoneNumber,values.jobTitle,values.userName,values.password,values.confirmPassword);
      resetForm();
     
    }
  })  
 const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
const  handleMouseDownPassword = event => {
    event.preventDefault();
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
const  handleMouseDownConfirmPassword = event => {
    event.preventDefault();
  };
  const saveUser = (name,email,phoneNumber,jobTitle,userName,password,confirmPassword) => {   
    var data = {
        name: name,
        email: email,
        phoneNumber:phoneNumber,
        jobTitle:jobTitle,      
        joinDate: moment(new Date()).format('YYYY-MM-DD'),
        userName: userName,
        password:password,
        confirmPassword:confirmPassword,
        isBlock:"0"
    };
    
if(joinDate !== null){
     UserDataService.create(data)
       .then((response) => {
         console.log(response.data.isSuccess);
         if (response.data.isSuccess) {    
           toast.success(response.data.message,{position:toast.POSITION.TOP_RIGHT});    

        }
         else {
          toast.error(response.data.message,{position:toast.POSITION.TOP_RIGHT});     
        }
     })
}
  }; 
  return (
    <div  >
             <div className="CreateUser">  
         <form autoComplete="off" onSubmit={formik.handleSubmit}>      
  <div className="row">
        <div className="col-5" >
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
        </div>
        <div className="form-group col-5">
        
          <TextField 
          required
            id="email"   
            label="Email"     
            value={formik.values.email}
            onChange={formik.handleChange}           
            name="email"
            margin="normal"
            helperText="Format:aaa@bbb.com"
            error={formik.touched.email && Boolean(formik.errors.email)}
          />  
                 
        </div>
        </div>
<div className="row">
       
        <div className="col-5">
        <TextField 
        required
            id="phoneNumber"   
            label="Contact Number"     
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}           
            name="phoneNumber"
            margin="normal"
            error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
            helperText="10 digits required"
          />
       
        </div>
        <div className="form-group col-5 ">
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
        </div>
        </div>
      
        <div className="row">
        <div className="form-group col-5">
        <TextField 
        required
            id="userName"   
            label="Username"     
            value={formik.values.userName}
            onChange={formik.handleChange}           
            name="userName"
            margin="normal"
            error={formik.touched.jobTitle && Boolean(formik.errors.jobTitle)}     
          />         
        </div>
        </div>
        <div className="row">
        <div className="col-5">
        <FormControl>
          <InputLabel htmlFor="adornment-password">Password</InputLabel>
          <Input
          required
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={formik.values.password}
            onChange={formik.handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
         
          {formik.errors.password ? 
      <div className="myDiv">{formik.errors.password}</div> : null}
        </div>
        <div className="form-group col-5">
        <FormControl>
          <InputLabel htmlFor="adornment-password">Confirm Password</InputLabel>
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownConfirmPassword}
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      
          {formik.errors.confirmPassword ? 
      <div className="myDiv">{formik.errors.confirmPassword}</div> : null}
        </div>
        </div> 
            
        <Button type="submit"
                         
                 variant="contained"
                 sx={{ mt: 3, mb: 2 }}
                 color="primary">                 
                  <span>Register</span>
                 
                </Button>  
               
         </form>
        </div>  
    </div>
  );
};

export default CreateUser;