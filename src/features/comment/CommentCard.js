import React from "react";
import { Avatar, Box, IconButton, Menu, MenuItem, Paper, Stack, Typography } from "@mui/material";
import { fDate } from "../../utils/formatTime";
import CommentReaction from "./CommentReaction";
import {  MoreHoriz  } from "@mui/icons-material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteComment } from "./commentSlice";


// Add a MoreHorz button icon 
// onClick => handle the event (commentId, postId) => dispatch => update state. 

function CommentCard({ comment, postId }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const dispatch = useDispatch();
  const commentId = comment._id;
  
  const handleCommentOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteComment = ({ commentId, postId }) => {
    const res = window.confirm("Are you sure you want to delete this comment?");
    if (res) {
      dispatch(deleteComment({ commentId, postId }));
    }
    return;
  };

  const menuId = "primary-comment-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => handleDeleteComment({commentId, postId})} sx={{ m: 1 }}>
        Delete
      </MenuItem>
    </Menu>
  );

  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt={comment.author?.name} src={comment.author?.avatarUrl} />
      <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: "background.neutral" }}>
        <Stack
          direction="row"
          alignItems={{ sm: "center" }}
          justifyContent="space-between"
          sx={{ mb: 0.5 }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {comment.author?.name}
          </Typography>
          <Box>
          <Typography variant="caption" sx={{ color: "text.disabled" }}>
            {fDate(comment.createdAt)}
          </Typography>
          <IconButton>
            <MoreHoriz sx={{ fontSize: 30 }} onClick={handleCommentOpen} />
          </IconButton>
          </Box>
        </Stack>
        {renderMenu}
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {comment.content}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <CommentReaction comment={comment} />
        </Box>
      </Paper>
    </Stack>
  );
}

export default CommentCard;
