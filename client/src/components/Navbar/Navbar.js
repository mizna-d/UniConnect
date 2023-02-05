import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { TextField, Autocomplete } from "@mui/material";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import { green } from "@mui/material/colors";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { Stack } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import NavbarMenu from "./NavbarMenu";

const Navbar = ({tags, selectedTags, setSelectedTags}) => {
  const [drop, setDrop] = useState(false);

  const handleDrop = (e) => {
    console.log("hello");
    setDrop(!drop);
  };

  const autocompleteValue = () => {
    const arr = []
    for (const property in selectedTags) {
      if (selectedTags[property]) arr.push(property)
    }
    return arr  
  }

  const handleTagChange = (event, value) => {
    setSelectedTags(prevState => {
      const temp = {}
      for (const property in prevState) {
        if(value.includes(property)){
          temp[property] = true
        }
        else{
          temp[property] = false
        }
      }
      return temp
    });
  }

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    height: "80%",
    transform: "translate(0, 20%)",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha('#4b592d', 0.15),
    color: "#4b592d",
    "&:hover": {
      backgroundColor: alpha('#4b592d', 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#4b592d"
  }));


  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      paddingRight: `calc(1em + ${theme.spacing(4)})`,
      //transition: theme.transitions.create('width'),
      width: "40vw",
      [theme.breakpoints.up("md")]: {
        width: "40vw",
      },
    },
  }));

  const StyledButton = styled(Button)(({ theme }) => ({
    maxHeight: "50px"
  }))

  const classes = useStyles();
  return (
    <AppBar elevation={0} className={classes.appbar} position="fixed">
      <Stack direction="row" spacing={1} alignItems="center">
        <div>
          <Link to="/">
            <img
              className={classes.logoImage}
              src="https://cdn.discordapp.com/attachments/886450083346915328/903444358714490900/globe-removebg-preview.png"
              alt="logo"
            />
          </Link>
        </div>
        <Search>
        <Autocomplete
            multiple
            limitTags={3}
            fullWidth
            sx={{ width: "40vw"}}
            options={tags}
            getOptionLabel={(option) => option}
            value={autocompleteValue()}
            onChange={handleTagChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Find Events!"
                placeholder="Add all related tags"
              />
            )}
          />
        </Search>
        <Link to={{
          pathname : "/timeline",
          state : {
            fromSearch: true
          }
          }} style={{ textDecoration: 'none' }}>
        <StyledButton sx={{mt:'15px', minHeight:'50px', 
        
         backgroundColor:'#4B592D',
          color: "#C9D991",
        "&:hover": {
          // variant: 'outlined',
          backgroundColor:'#C9D991',
         color: "#4B592D",
            },
          }} variant="outlined" startIcon={
        <SearchIcon color='#C9D991'
        />} >
          Search
        </StyledButton>
        </Link>

      </Stack>
      <NavbarMenu />
    </AppBar>
  );
};

export default Navbar;
