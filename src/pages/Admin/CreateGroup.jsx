import React, { useState } from "react";
import TaskService from "./../../services/TaskService";
import './../../Styles/Styles.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Button from '@mui/material/Button';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import { toast } from "react-toastify";
import TextField from '@material-ui/core/TextField';


const CreateGroup = (props) => {

  const initialValues = {
    groupName: '',
    description: '',
    noOfMembers: '',
    createdDate: ''
  }
  const membersRegExp =/^[0-9]{1,2}$/;
  const nameRegExp=/^[a-zA-Z ]*$/;
  const validationSchema = Yup.object({
    groupName: Yup.string()
      .required("Required!").matches(nameRegExp,'Alphabets are only allowed!!')
      .max(50),
    description: Yup.string()
      .required("Required!"),
    noOfMembers: Yup.string()
      .required("Required!!!").matches(membersRegExp,'Numbers are only allowed upto 2 digits'),
             
  });
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      saveUser(values.groupName, values.description, values.noOfMembers);
      resetForm();
    }
  })
  const saveUser = (groupName, description, noOfMembers) => {
    var data = {
      groupName: groupName,
      description: description,
      noOfMembers: noOfMembers,
      createdDate: moment(new Date()).format('YYYY-MM-DD'),
      isActive: "1"
    };

    TaskService.CreateGroup(data)
      .then((response) => {
        if (response.data.isSuccess) {
          toast.success(response.data.message);
        }
        else {
          toast.error(response.data.message);
        }
      })
  };
  return (
    <div  >
      <div className="CreateUser">
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div className="row">
            <div className="form-group col-8" >
            <TextField 
        required
            id="groupName"   
            label="Group Name"     
            value={formik.values.groupName}
            onChange={formik.handleChange}     
            error={formik.touched.groupName && Boolean(formik.errors.groupName)}      
            name="groupName"
            margin="normal"
          />   
           {formik.errors.groupName ?
                <div className="myDiv">{formik.errors.groupName}</div> : null}                  
            </div>
          </div>
          <div className="row">
            <div className="col-8">
            <TextField
            required
          id="description"
          label="Description"
          multiline
          rows="4"         
          margin="normal"
          value={formik.values.description}
          onChange={formik.handleChange}
          name="description"
          error={formik.touched.description && Boolean(formik.errors.description)}    
        />
             
            </div>
          </div>
          <div className="row">
            <div className="form-group col-8">
            <TextField 
        required
            id="noOfMembers"   
            label="No Of Members"     
            value={formik.values.noOfMembers}
            onChange={formik.handleChange}     
            error={formik.touched.noOfMembers && Boolean(formik.errors.noOfMembers)}      
            name="noOfMembers"
            margin="normal"
          />    
            
              {formik.errors.noOfMembers ?
                <div className="myDiv">{formik.errors.noOfMembers}</div> : null} 
            </div>
          </div>      


          <Button type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            className="btn btn-primary btn-block" >
            <span>Create Group</span>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateGroup;