import { Card, CardContent, Typography, Container, Grid } from "@mui/material";
import { useState } from "react";
import useStyles from "./styles";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const InterestCategory = ({title, children}) => {
    const [collapse, setCollapse] = useState(false)
    const classes = useStyles();
  return (
    <Card sx={{ mt: 3, backgroundColor:"#C8D9A3", 
    cursor: "pointer", }} >
        <CardContent>
        <Grid
        container
        justifyContent='space-between'
        direction='row'
        onClick={(e) => {setCollapse(!collapse)}}
        >
          <Grid
          item>
            <Typography variant="h6" component="div">
              {title}
            </Typography>
          </Grid>

          <Grid
          item>
          <ArrowDropDownIcon/>
          </Grid>
          
        </Grid>
        {collapse ? null : children}
        </CardContent>
    </Card>
  );
};

export default InterestCategory;