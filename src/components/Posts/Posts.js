import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";

import Post from "./Post/Post";
import useStyles from "./styles";

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();
  // console.log("posts : " + posts);
  // console.log("isLoading : " + isLoading);
  if (!isLoading && !posts.length) return "No Stories";

  return isLoading ? (
    <div style={{ width: "100%", height: "auto", paddingTop: "10%" }}>
      <CircularProgress
        size="5%"
        style={{
          //width: "40px",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          color: "white",
        }}
      />
    </div>
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts?.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
