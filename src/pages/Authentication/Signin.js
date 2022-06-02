import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Link } from "react-router-dom";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik} from 'formik'
import * as Yup from 'yup'
import AuthService from "./../../services/AuthService";
import { useState } from 'react'
import { toast } from "react-toastify";

const useStyles = makeStyles(theme => ({
  card: {
    overflow: "visible"
  },
  session: {
    position: "relative",
    zIndex: 4000,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column"
  },
  background: {    
    backgroundColor: theme.palette.primary.main
  },
  content: {
    padding: `40px ${theme.spacing(1)}px`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: "1 0 auto",
    flexDirection: "column",
    minHeight: "100%",
    textAlign: "center"
  },
  wrapper: {
    flex: "none",
    maxWidth: "400px",
    width: "100%",
    margin: "0 auto"
  },
  fullWidth: {
    width: "100%"
  },
  logo: {
    display: "flex",
    flexDirection: "column"
  }
}));

const Signin = (props) => {
  const classes = useStyles();
  const [message,setMessage]=useState("");
  const initialValues = {
    userName:'',
    password:''
  }
  const validationSchema=()=> {
    return Yup.object().shape({
      userName: Yup.string().required("Please enter username!!!"),
      password: Yup.string().required("Please enter password!!!"),
    });
  }
  const saveUser=(userName, password)=>{
    
 AuthService.login(userName, password) .then((response) => {   
   console.log(response.data.isSuccess);
  if (response.data.isSuccess) {
    localStorage.clear();
    localStorage.setItem("token", response.data.message);
    localStorage.setItem("role",response.data.roleName);
    localStorage.setItem("userId",response.data.userId);
    localStorage.setItem("name", response.data.name);
    const role =localStorage.getItem("role");
    (role == "Admin") ?
  (props.history.push('/')):(props.history.push('/'))

  }
  else {
    localStorage.clear();
    toast.warning(response.data.message, {position: toast.POSITION.TOP_RIGHT});
}
 });
}
 
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit:(values,{resetForm })=>{
      saveUser(values.userName,values.password);
      resetForm();
    }
  })  
  return (
    <div className={classNames(classes.session, classes.background)}>
      <div className={classes.content}>
        <div className={classes.wrapper}>
          <Card>
            <CardContent>
              <form onSubmit={formik.handleSubmit}>
                {/* <div
                  className={classNames(classes.logo, `text-xs-center pb-xs`)}
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/static/images/logo-dark.svg`}
                    alt=""
                    className="block"
                  />
                  <Typography variant="caption">
                    Sign in with your app id to continue.
                  </Typography>
                </div> */}
                <TextField
                  id="userName"
                  label="Username"                  
                  fullWidth
                  margin="normal"
                  value={formik.values.userName}
                  onChange={formik.handleChange}
                />
                <p> {formik.errors.userName ? 
      <div className="myDiv">{formik.errors.userName}</div> : null}</p>
                <TextField
                  id="password"
                  label="Password"                  
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  fullWidth
                  margin="normal"
                />
                  <p> {formik.errors.password ? 
      <div className="myDiv">{formik.errors.password}</div> : null}</p>
                {/* <FormControlLabel
                  control={<Checkbox value="checkedA" />}
                  label="Stayed logged in"
                  className={classes.fullWidth}
                /> */}
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                >
                  Login
                </Button>
                {/* <div className="pt-1 text-md-center">
                  <Link to="/forgot">
                    <Button>Forgot password?</Button>
                  </Link>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Link to="/signup">
                    <Button>Create new account.</Button>
                  </Link>
                </div> */}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Signin;
