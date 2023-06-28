import { Grid, Stack } from "@mui/material";
import ProfileAbout from "./ProfileAbout";
import ProfileSocialInfo from "./ProfileSocialInfo";
import PostForm from "../post/PostForm";
import ProfileScorecard from "./ProfileScorecard";
import PostList from "../post/PostList";
import useAuth from "../../hooks/useAuth";
import { useRef, useState } from "react";

function Profile({ profile }) {
  const { user } = useAuth();
  const [currentPost, setCurrentPost] = useState(null);
  const postFormRef = useRef();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <ProfileScorecard profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileSocialInfo profile={profile} />
        </Stack>
      </Grid>

      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          {user._id === profile._id &&  <PostForm currentPost={currentPost} setCurrentPost={setCurrentPost} postFormRef={postFormRef} />}
          <PostList userId={profile._id} setCurrentPost={setCurrentPost} postFormRef={postFormRef} />
        </Stack>
      </Grid>
    </Grid>
  );
}

export default Profile;
