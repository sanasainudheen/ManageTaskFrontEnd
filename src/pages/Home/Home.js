
import TaskService from "./../../services/TaskService";
import {  Wrapper} from "../../components";
import React, { useState ,useEffect} from "react";
import {    StatCard} from "../../components";



import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Grid from "@material-ui/core/Grid";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreIcon from "@material-ui/icons/More";

import NotificationsOffIcon from "@material-ui/icons/NotificationsOff";

import SettingsIcon from "@material-ui/icons/Settings";


let id = 0;
function createData(name, date, progress) {
  id += 1;
  return { id, name, date, progress };
}

const data = [
  createData("UI prototyping", "January 23", 67),
  createData("Design", "February 2", 87),
  createData("Development", "March 30", 54),
  createData("Testing and delivery", "April 12", 34),
  createData("Ongoing maintanance", "May 28", 56),
  createData("Extensive review", "December 3", 56),
  createData("Extensive testing", "December 25", 56)
];

const Home = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const[pendingCount,setPendingCount]=useState(0);
  const[processingCount,setProcessingCount]=useState(0);
  const[completedCount,setCompletedCount]=useState(0);
  const[doneCount,setDoneCount]=useState(0);
  const[rejectedCount,setRejectedCount]=useState(0);
 

  const handleClick = event => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  useEffect(() => {   
   retrieveProcessingStatusCount(2);
    retrievePendingStatusCount(1);
    retrieveCompletedStatusCount(3);
    retrieveDoneStatusCount(4);
    retrieveRejectedStatusCount(5);
  }, []);
  const retrieveProcessingStatusCount = (flag) => {    
      TaskService.getStatusCount(flag).then((response) => {
        setProcessingCount(response.data[0].count);       
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const retrievePendingStatusCount = (flag) => {    
    TaskService.getStatusCount(flag).then((response) => {
      setPendingCount(response.data[0].count);   
     
       
    })
    .catch((e) => {
      console.log(e);
    });
};
const retrieveCompletedStatusCount = (flag) => {    
  TaskService.getStatusCount(flag).then((response) => {
    setCompletedCount(response.data[0].count);    
  })
  .catch((e) => {
    console.log(e);
  });
};
const retrieveDoneStatusCount = (flag) => {    
  TaskService.getStatusCount(flag).then((response) => {
    setDoneCount(response.data[0].count);    
  })
  .catch((e) => {
    console.log(e);
  });
};
const retrieveRejectedStatusCount = (flag) => {    
  TaskService.getStatusCount(flag).then((response) => {
    setRejectedCount(response.data[0].count);    
  })
  .catch((e) => {
    console.log(e);
  });
};
  const chartMenu = (
    <Menu
      id="chart-menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <MoreIcon />
        </ListItemIcon>
        <ListItemText primary="View more" />
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <NotificationsOffIcon />
        </ListItemIcon>
        <ListItemText primary="Disable notifications" />
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Remove panel" />
      </MenuItem>
    </Menu>
  );

  return (
    <Wrapper>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            type="fill"
            title="Pending Tasks"
            value={pendingCount}
            icon={<LocalOfferIcon />}
            color="#3f51b5"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            type="fill"
            title="Processing Tasks"
            value={processingCount}
            icon={<LocalOfferIcon />}
            color="#9c27b0"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            type="fill"
            title="Completed Tasks"
            value={completedCount}
            icon={<LocalOfferIcon />}
            color="#f44336"
          />
        </Grid>   
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            type="fill"
            title="Done Tasks"
            value={doneCount}
            icon={<LocalOfferIcon />}
            color="#3f51b5"
          />
        </Grid>   
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            type="fill"
            title="Rejected Tasks"
            value={rejectedCount}
            icon={<LocalOfferIcon />}
            color="#9c27b0"
          />
        </Grid>      
      
        
      </Grid>
    </Wrapper>
  );
};

export default Home;
