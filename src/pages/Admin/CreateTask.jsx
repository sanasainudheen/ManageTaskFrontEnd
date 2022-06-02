import  React, { useState} from "react";
import TaskService from "./../../services/TaskService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from '@mui/material/Button';
import './../../Styles/Styles.css'
import { useFormik } from 'formik'
import moment from 'moment';
import * as Yup from 'yup'
import { toast } from "react-toastify";
import TextField from '@material-ui/core/TextField';
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// import Stack from '@mui/material/Stack';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const minDate=new Date();
const CreateTask = () => {  
  const initialValues = {
    taskName:'',
    taskDescription: '',
    startDate: '',
    endDate:''
  }
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const nameRegExp=/^[a-zA-Z ]*$/;
  const validationSchema = Yup.object({
              taskName: Yup.string()
             .required("Required!").matches(nameRegExp,'Alphabets are only allowed!!')
             .max(50),
             taskDescription: Yup.string()
              .required("Required!"),                    
});
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit:(values,{resetForm })=>{      
      saveTask(values.taskName,values.taskDescription,startDate,endDate);
      resetForm();
    }
  })  
 
  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
  };

  const saveTask = (taskName,taskDescription,startDate,endDate) => {    
    var data = {
        taskName: taskName,
        taskDescription: taskDescription,
        startDate: moment(startDate).format('YYYY-MM-DD'),
        endDate:moment(endDate).format('YYYY-MM-DD'),      
        statusId:"1",
        createdDate:moment(new Date()).format('YYYY-MM-DD'),  
        isActive:"1",

    };
if(startDate !==null && endDate !==null){
    TaskService.createTask(data)
      .then((response) => {
        if (response.data.isSuccess) {
            toast.success(response.data.message);          
        
        }
        else {
            toast.error(response.data.errors);
        }
    })
  }
  };

  return (
    <div>
           <div className="CreateUser">  
         <form onSubmit={formik.handleSubmit}>      
  <div className="row">
        <div className="form-group col-6" >
        <TextField 
        required
            id="taskName"   
            label="Task Name"     
            value={formik.values.taskName}
            onChange={formik.handleChange}     
            error={formik.touched.taskName && Boolean(formik.errors.taskName)}      
            name="taskName"
            margin="normal"
          />       
          {/* <input
            type="text"
            className="form-control"
            id="taskName"
           placeholder="Title"
            value={formik.values.taskName}
            onChange={formik.handleChange}
            name="taskName"
          />
          {formik.errors.taskName ? 
      <div className="myDiv">{formik.errors.taskName}</div> : null} */}
        </div>
</div>
<div className="row">
        <div className="col-6">   
        <TextField
            required
          id="taskDescription"
          label="Description"
          multiline
          rows="4"         
          margin="normal"
          value={formik.values.taskDescription}
          onChange={formik.handleChange}
          name="taskDescription"
          error={formik.touched.taskDescription && Boolean(formik.errors.taskDescription)}    
        />      
          {/* <textarea          
            className="form-control"
            id="taskDescription"
            placeholder="Description"
            value={formik.values.taskDescription}
            onChange={formik.handleChange}
            name="taskDescription"          />
          {formik.errors.taskDescription ? 
      <div className="myDiv">{formik.errors.taskDescription}</div> : null} */}
        </div>
        </div>
        <div className="row">       
        <div className="col-md-6">
    <label htmlFor="sdate">Start Date</label>
<DatePicker className="form-control" selected={startDate} dateFormat='dd/MMM/yyyy'
      onChange={date=>setStartDate(date)}  minDate={minDate}/>
        {startDate ? 
       null:<div className="myDiv">Start Date Is Required</div>}
    </div>
    </div>
    <div className="row">
    <div className="col-md-6">
    <label htmlFor="edate">End Date</label>
 <DatePicker className="form-control" selected={endDate}  minDate={minDate}
      onChange={date=>setEndDate(date)} dateFormat='dd/MMM/yyyy'/>
      
        {endDate ? 
       null:<div className="myDiv">End Date Is Required</div>}
    </div>
       </div>
         
      
        
        <Button type="submit"
                 
                 variant="contained"
                 sx={{ mt: 3, mb: 2 }}
                className="btn btn-primary btn-block" >
                 
                  <span>Create Task</span>
                </Button>        
         
         </form>
        </div>        
        </div>
  );
};

export default CreateTask;