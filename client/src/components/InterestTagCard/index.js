import { Card, CardContent, Typography, Container, Button } from "@mui/material";
import { useState } from "react";

const InterestTagCard = ({ title, selected, onClick }) => {
  //const [selected, setSelected] = useState(false);
  return (
    <Card
      sx={{
        padding:1,
        maxWidth: 400,
        borderWidth: "2px", 
        borderColor: "rgba(255, 0, 0, 0)",
        borderStyle: "solid",
        backgroundColor:"#A9BF5A",
        ...(selected
          ? { 
            // borderColor: "#4B592D", 
          backgroundColor:"#4B592D", 
          color:"#C9D991" }
          : null),
      }}
      onClick={onClick}
      value={title}
    >
      {/* <CardContent> */}
        {/* <Typography variant="h5" component="div" align="center"> */}
          {title}
        {/* </Typography> */}
      {/* </CardContent> */}
    </Card>
  );
};

export default InterestTagCard;
