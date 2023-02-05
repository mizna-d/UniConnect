import { Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useUser } from "../../../Contexts/UserContext";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { IconButton } from "@mui/material";
import { useHistory } from "react-router";
import axios from "../../../api";
import Tooltip from '@mui/material/Tooltip';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';


const NavbarMenu = () => {
  const { currentUser, setCurrentUser } = useUser();
  const history = useHistory();

  function logouthandler() {
    axios({
      method: 'get',
      url: '/api/users/logout'
    }).then(response => {
        console.log(response)
        setCurrentUser(response.data)
    }).catch(function (error) {
      console.log(error);
    }).then(() => {setCurrentUser(null)
      window.location.reload();
    })
  }

  function navbarMenuRender(logouthandler) {
    if (!currentUser) {
      return (
        <Toolbar>
          <Button component={Link} to="/login"
          // color="inherit"
          >
            Login
          </Button>
          <Button component={Link} to="/signup"
          // color="inherit"
          >
            Signup
          </Button>
        </Toolbar>
      );
    } else {
      return (
        <Toolbar>
          
          <Tooltip title="Find Events">
              <IconButton color="secondary" component="span" size="large" component={Link} to="/timeline">
                <TravelExploreIcon />
              </IconButton>
          </Tooltip>

          <Tooltip title="My Profile">
            <IconButton color="secondary" component="span" size="large" component={Link} to="/Profile">
              <AccountCircleTwoToneIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Dashboard">
          <IconButton color="secondary" component="span" size="large" component={Link} to="/dashboard">
            <DashboardRoundedIcon />
          </IconButton>
          </Tooltip>

          <Tooltip title="Logout">
          <IconButton color="secondary" component="span" size="large" onClick={logouthandler}>
            <LogoutRoundedIcon />
          </IconButton>
          </Tooltip>
        </Toolbar>
      );
    }
  }

  return navbarMenuRender(logouthandler);
};

export default NavbarMenu;
