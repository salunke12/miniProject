import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  TextField,
  Box,
} from "@mui/material";

const BASE_URL = "https://json-placeholder.mock.beeceptor.com/posts";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [postId, setPostId] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const fetchPostDetails = async (id) => {
    if (!id) return;
    setLoading(true);
    setSelectedPost(null); // Reset previous post details
    try {
      const response = await fetch(`${BASE_URL}/${id}`);
      if (!response.ok) throw new Error("Post not found");
      const data = await response.json();
      setSelectedPost(data);
    } catch (error) {
      console.error("Error fetching post details:", error);
      setSelectedPost(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Blog Posts
      </Typography>

      {/* Search by Post ID */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          label="Enter Post ID"
          variant="outlined"
          size="small"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={() => fetchPostDetails(postId)}
          disabled={!postId}
        >
          Search
        </Button>
      </Box>

      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card
              sx={{ p: 2, cursor: "pointer" }}
              onClick={() => fetchPostDetails(post.id)} // ✅ Fetch post details on click
            >
              <CardContent>
                <Typography variant="h6">{post.title}</Typography>
                <Typography variant="body2">
                  {post.body.substring(0, 50)}...
                </Typography>
                <Button sx={{ mt: 1 }} variant="outlined">
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Post Details Modal */}
      <Dialog
        open={Boolean(selectedPost)}
        onClose={() => setSelectedPost(null)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Post Details</DialogTitle>
        <DialogContent>
          {loading ? (
            <CircularProgress />
          ) : selectedPost ? (
            <>
              <Typography variant="h5">{selectedPost.title}</Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                {selectedPost.body}
              </Typography>
            </>
          ) : (
            <Typography variant="body2">No details available.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedPost(null)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Blog;
