// Pages
import {
  AppBar,
  Autocomplete,
  Avatars,
  BackendError,
  Badges,
  Blank,
  ButtonNavigation,
  Buttons,
  Calendar,
  Cards,
  Charts,
  Chat,
  Chips,
  Detail,
  Dialogs,
  Dividers,
  Drawers,
  Editor,
  ExpansionPanels,
  Google,
  GridList,
  Home,
  Invoice,
  Leaflet,
  Lists,
  Lockscreen,
  Media,
  Menus,
  Messages,
  NotFound,
  Paper,
  PasswordReset,
  Pickers,
  PricingPage,
  Products,
  Progress,
  SelectionControls,
  Selects,
  Signin,
  Signup,
  Snackbars,
  Social,
  Steppers,
  Tables,
  Tabs,
  Taskboard,
  TextFields,
  TimelinePage,
  Tooltips,
  Widgets,
  CreateUser,
  RegisteredUsers,
  CreateGroup,
  CreateTask,
  GroupsList,ViewGroupUsers, TasksList
} from './pages';


import AppsIcon from '@material-ui/icons/Apps';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import EqualizerIcon from '@material-ui/icons/Equalizer';
// Icons
import ExploreIcon from '@material-ui/icons/Explore';
import FaceIcon from '@material-ui/icons/Face';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import Looks3Icon from '@material-ui/icons/Looks3';
import Looks4Icon from '@material-ui/icons/Looks4';
import NavigationIcon from '@material-ui/icons/Navigation';
import PagesIcon from '@material-ui/icons/Pages';
import PersonIcon from '@material-ui/icons/Person';
import PhotoIcon from '@material-ui/icons/Photo';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import EditUser from './pages/Admin/EditUser';
import AssignTasks from './pages/Admin/AssignTasks';
const role =localStorage.getItem("role");

export default {
 
  items: [
  
    {
      path: '/',
      name: 'Home',
      type: 'link',
      icon: ExploreIcon,
      component: Home,
      
    },   
       
   
  
    {
      path: '/pages',
      name: 'Pages',
      type: 'submenu',
      icon: PagesIcon,
      children: [
        {
          path: '/createuser',
          name: 'New Registration',
          component: CreateUser
        },
        {
          path: '/registeredusers',
          name: 'Registered Users',
          component: RegisteredUsers
        },
        {
          path: '/creategroup',
          name: 'Create Group',
          component: CreateGroup
        },
        {
          path: '/createtask',
          name: 'Create Task',
          component: CreateTask
        },
        {
          path: '/groupslist',
          name: 'Groups List',
          component: GroupsList
        },
        {
          path: '/taskslist',
          name: 'Tasks List',
          component: TasksList
        },
        {
          path: '/assigntasks',
          name: 'Assign Tasks',
          component: AssignTasks
        },
       
        
      ]
    },
    // {
    //   path: '/taskboard',
    //   name: 'Taskboard',
    //   type: 'link',
    //   icon: ViewColumnIcon,
    //   component: Taskboard
    // },  
    {
      path: '/viewgroupusers',
      name: '.',
      type: 'link',
      icon: ExploreIcon,
      component: ViewGroupUsers,
      
    },   
    {
      path: '/edituser',
      name: '..',
      type: 'link',
      icon: ExploreIcon,
      component: EditUser,
      
    },  
   
    {
      path: '/registeredusers',
      name: '...',
      type: 'link',
      icon: ExploreIcon,
      component: RegisteredUsers,
      
    }, 
      {
        path: '/groupslist',
        name: '....',
        type: 'link',
        icon: ExploreIcon,
        component: GroupsList,
        
      }, 


      // {
      //   path: '/editor',
      //   name: 'Editor',
      //   type: 'link',
      //   icon: Looks3Icon,
      //   component: Editor
      // },
      // {
      //   path: '/ecommerce',
      //   name: 'Ecommerce',
      //   type: 'submenu',
      //   icon: Looks4Icon,
      //   badge: {
      //     type: 'secondary',
      //     value: 'N'
      //   },
      //   children: [
      //     {
      //       path: '/products',
      //       name: 'Products',
      //       component: Products
      //     },
      //     {
      //       path: '/detail',
      //       name: 'Detail',
      //       component: Detail
      //     }
      //   ]
      // },
      // {
      //   path: '/taskboard',
      //   name: 'Taskboard',
      //   type: 'link',
      //   icon: ViewColumnIcon,
      //   component: Taskboard
      // },
      // {
      //   path: '/charts',
      //   name: 'Charts',
      //   type: 'link',
      //   icon: ShowChartIcon,
      //   component: Charts
      // },
      // {
      //   path: '/maps',
      //   name: 'Maps',
      //   type: 'submenu',
      //   icon: NavigationIcon,
      //   children: [
      //     {
      //       path: '/google',
      //       name: 'Google',
      //       component: Google
      //     },
      //     {
      //       path: '/leaflet',
      //       name: 'Leaflet',
      //       component: Leaflet
      //     }
      //   ]
      // },
      // {
      //   path: '/pages',
      //   name: 'Pages',
      //   type: 'submenu',
      //   icon: PagesIcon,
      //   children: [
      //     {
      //       path: '/invoice',
      //       name: 'Invoice',
      //       component: Invoice
      //     },
      //     {
      //       path: '/timeline',
      //       name: 'Timeline',
      //       component: TimelinePage
      //     },
      //     {
      //       path: '/blank',
      //       name: 'Blank',
      //       component: Blank
      //     },
      //     {
      //       path: '/pricing',
      //       name: 'Pricing',
      //       component: PricingPage
      //     }
      //   ]
      // },
      // {
      //   name: 'Authentication',
      //   type: 'submenu',
      //   icon: PersonIcon,
      //   children: [
      //     {
      //       path: '/signin',
      //       name: 'Signin',
      //       component: Signin
      //     },
      //     {
      //       path: '/signup',
      //       name: 'Signup',
      //       component: Signup
      //     },
      //     {
      //       path: '/forgot',
      //       name: 'Forgot',
      //       component: PasswordReset
      //     },
      //     {
      //       path: '/lockscreen',
      //       name: 'Lockscreen',
      //       component: Lockscreen
      //     }
      //   ]
      // },
      // {
      //   name: 'Error',
      //   type: 'submenu',
      //   icon: FaceIcon,
      //   children: [
      //     {
      //       path: '/404',
      //       name: '404',
      //       component: NotFound
      //     },
      //     {
      //       path: '/500',
      //       name: 'Error',
      //       component: BackendError
      //     }
      //   ]
      // },
    


   
    
    
  
 
  ]
};
