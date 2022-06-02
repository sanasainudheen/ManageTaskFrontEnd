// Pages
import {
  dragdrop2,
 TaskDetails
  } from './pages';
  
  
  import AppsIcon from '@material-ui/icons/Apps';
  import BookmarkIcon from '@material-ui/icons/Bookmark';
  import EqualizerIcon from '@material-ui/icons/Equalizer';
  // Icons
  import ExploreIcon from '@material-ui/icons/Explore';  
  import PagesIcon from '@material-ui/icons/Pages';
import ViewGroupTasks from './pages/User/ViewGroupTasks';
import UserHome from './pages/Home/UserHome';

  
  export default {
   
    items: [
    
      {
        path: '/',
        name: 'Home',
        type: 'link',
        icon: ExploreIcon,
        component: UserHome,
        
      },
     
     
     
      {
        path: '/pages',
        name: 'Pages',
        type: 'submenu',
        icon: PagesIcon,
        children: [
          {
            path: '/grouptasks',
            name: 'Pending  Tasks',
            component: ViewGroupTasks
          },   
          {
            path: '/dragdrop2',
            name: 'Completed & Done',
            component: dragdrop2
          },         
          
          
        ]
      },
      {
        path: '/taskdetails',
        name: '.',
        type: 'link',
        icon: ExploreIcon,
        component: TaskDetails
        
      },
      {
        path: '/grouptasks',
        name: '..',
        type: 'link',
        icon: ExploreIcon,
        component: ViewGroupTasks
        
      },
     
     
    ]
  };
  