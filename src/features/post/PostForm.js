import React, { useCallback } from "react";
import { Box, Card, alpha, Stack } from "@mui/material";

import { FormProvider, FTextField, FUploadImage } from "../../components/form";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { createPost, editPost } from "./postSlice";
import { LoadingButton } from "@mui/lab";
import { useEffect } from "react";

const yupSchema = Yup.object().shape({
  content: Yup.string().required("Content is required"),
});

const defaultValues = {
  content: "",
  image: null,
};

function PostForm({ currentPost, setCurrentPost, postFormRef }) {
  const { postsById, isLoading } = useSelector((state) => state.post);
  const updatedPostId = useSelector((state) =>
    currentPost
      ? state.post.currentPagePosts.find((p) => p === currentPost)
      : null
  );

  const methods = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = methods;
  const dispatch = useDispatch();

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "image",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  useEffect(() => {
      if (updatedPostId) {
     const updatedPost = postsById[updatedPostId];
     setValue("content", updatedPost.content);
     setValue("image", updatedPost.image); 
    };
  }, [updatedPostId]);
  

  const onSubmit = (data) => {
    if (updatedPostId) {
      dispatch(editPost({updatedPostId, data})).then(() => reset());
      setCurrentPost(null);
    } else  {
      dispatch(createPost(data)).then(() => reset());
    }
  };

  const handleCancelEditing = () => {
    setCurrentPost(null);
    reset(); 
  }

  return (
    <div ref={postFormRef}>
      <Card sx={{ p: 3 }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <FTextField
              name="content"
              multiline
              fullWidth
              rows={4}
              placeholder="Share what you are thinking here..."
              sx={{
                "& fieldset": {
                  borderWidth: `1px !important`,
                  borderColor: alpha("#919EAB", 0.32),
                },
              }}
            />

            <FUploadImage
              name="image"
              accept="image/*"
              maxSize={3145728}
              onDrop={handleDrop}
            />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: 1,
              }}
            >
              <LoadingButton
              type="submit"
                variant="contained"
                size="small"
                loading={isSubmitting || isLoading}
              >
                Post
              </LoadingButton>
              {updatedPostId && (
                <LoadingButton
                  variant="contained"
                  color="error"
                  size="small"
                  loading={isSubmitting || isLoading}
                  onClick={handleCancelEditing}
                >
                  Cancel editing
                </LoadingButton>
              )}
            </Box>
          </Stack>
        </FormProvider>
      </Card>
    </div>
  );
}

export default PostForm;
