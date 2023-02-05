import { Container, Grid, Button, Typography, TextField, Autocomplete } from "@mui/material";
import InterestTagCard from "../../components/InterestTagCard";
import InterestCategory from "../../components/InterestCategory";
import uniqid from "uniqid";
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import React, { useState, useEffect } from 'react';
import { getAllCategories, getCategorieTags, getAllTags, checkSession, updateUserTags } from "../../api/functions";
import { useUser } from '../../Contexts/UserContext'
import { useHistory } from 'react-router-dom';

const InterestFinder = () => {
  const [tagCategoryArray, setTagCategoryArray] = useState([])
  const [tags, setTags] = useState([])
  const [selectedTags, setSelectedTags] = useState({})
  const [autoTags, setAutoTags] = useState([])
  const { currentUser, setCurrentUser } = useUser()
  const history = useHistory();
  
  useEffect(async () => {
    const categories = await getAllCategories()
    const temp = []
    for (const category of categories) {
      const categoryTags = await getCategorieTags(category.name)
      const arr = []
      categoryTags.forEach(tag => arr.push(tag.name))
      temp.push({title: category.name, tags: arr})
    }
    //console.log(temp)
    setTagCategoryArray(temp)

    const allTags = await getAllTags()
    const arr2 = []
    allTags.forEach(tag => arr2.push(tag.name))
    setTags(arr2)
    const obj1 = {}
    allTags.forEach(tag => {obj1[tag.name] = false})
    setSelectedTags(obj1)

    const tempUser = await checkSession(setCurrentUser)
    allTags.forEach(tag => {
      if(tempUser.tags.includes(tag._id)){
        setSelectedTags(prevState => ({
          ...prevState,
          [tag.name]: true
        }));
      }
    })
  }, [])

  const handleSelect = (event) => {
    setSelectedTags(prevState => ({
      ...prevState,
      [event.target.innerText]: !prevState[event.target.innerText]
    }));
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

  const tagCardRender = (tag) => {
    return (
      <Grid item justifyContent="flex-start">
        <InterestTagCard title={tag} key={uniqid()} selected={selectedTags[tag]} onClick={handleSelect}/>
      </Grid>
    );
  };

  const tagCategoyRender = () => {
    const result = [];
    tagCategoryArray.forEach((category) => {
      const tags = [];
      category.tags.forEach((tag) => {
        tags.push(tagCardRender(tag));
      });
      result.push(
        <InterestCategory title={category.title} key={uniqid()}>
          <Grid container 
          spacing={1} 
          mt={1} 
          alignItems="center"
            sx={{ cursor: "pointer" }}>
            {tags}
          </Grid>
        </InterestCategory>
      );
    });
    return result;
  };

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    height: "80%",
    transform: "translate(0, 20%)",
    borderWidth: "3px",
    borderColor: "#C8D9A3",
    borderStyle: "solid",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
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
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "80vw",
      [theme.breakpoints.up("md")]: {
        width: "80vw",
      },
    },
  }));

  const handleTags = event => {
    //add tags to an array of tags
  }

  const handleSubmit = async (event) => {

    await updateUserTags(selectedTags)
    history.push("/dashboard")
    //add array of tags to user tags
  }

  return (
    <Grid
      justifyContent='center'
      sx={{
        background: 'linear-gradient(360deg, #C9D991 4%, #F2F2F2 51%, #d0f0c0 80%);',
        backgroundSize: 'cover', paddingTop: '20vh',
        height: '100%'
      }}
    >

      <Container>
        <Search>
          <Autocomplete
            multiple
            fullWidth
            options={tags}
            getOptionLabel={(option) => option}
            value={autocompleteValue()}
            onChange={handleTagChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Find your interests!"
                placeholder="Add all related tags"
              />
            )}
          />
          {/* <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        /> */}
        </Search>
        {tagCategoyRender()}
        <Grid
        container
        justifyContent="flex-end"
        >
        <Button
          variant="contained"
          sx={{mt:'15px', 
        
         backgroundColor:'#4B592D',
          color: "#C9D991",
        "&:hover": {
          backgroundColor:'#C9D991',
         color: "#4B592D",
            },
          }}
          // href="/login"
          size="medium"
          onClick={handleTags}
        >
          <Typography variant="button" component="div" sx={{ cursor: "pointer" }}
            onClick={handleSubmit}>
            Submit
          </Typography>
        </Button>
        </Grid>
      </Container>
    </Grid>
  );
};

export default InterestFinder;

//sx={{display: "flex", justifyContent: "center"}}
