import React, { useState, useRef } from "react";
import { Typography, TextField, Button, Divider } from "@material-ui/core/";
import { useDispatch } from "react-redux";

import { commentPost } from "../../actions/posts";
import useStyles from "./styles";

const CommentSection = ({ post }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const userId = user?.result.googleId || user?.result?._id;
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const [comments, setComments] = useState(post?.comments);
  const classes = useStyles();
  const commentsRef = useRef();

  const handleComment = async () => {
    const newComments = await dispatch(
      commentPost(`${user?.result?.name}: ${comment}`, post._id)
    );

    setComment("");
    setComments(newComments);

    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {userId && (
        <>
          <div className={classes.commentsOuterContainer}>
            <div style={{ width: "100%" }}>
              <Typography gutterBottom variant="h6">
                Write a comment
              </Typography>
              <TextField
                fullWidth
                rows={4}
                variant="outlined"
                label="Comment"
                multiline
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <br />
              <Button
                style={{ marginTop: "10px" }}
                fullWidth
                disabled={!comment.length}
                color="primary"
                variant="contained"
                onClick={handleComment}
              >
                Comment
              </Button>
            </div>
          </div>
          <Divider style={{ margin: "20px 0" }} />
        </>
      )}
      <div>
        {comments.length > 0 && (
          <Typography gutterBottom variant="h4" style={{ paddingTop: "15px" }}>
            Comments
          </Typography>
        )}
        {comments?.map((c, i) => (
          <Typography key={i} gutterBottom variant="subtitle1">
            <strong>{c.split(": ")[0]}</strong>
            {c.split(":")[1]}
          </Typography>
        ))}
        <div ref={commentsRef} />
      </div>
    </div>
  );
};

export default CommentSection;
