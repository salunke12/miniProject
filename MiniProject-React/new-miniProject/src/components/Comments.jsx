import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";

const BASE_URL = "https://json-placeholder.mock.beeceptor.com";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedComment, setSelectedComment] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`${BASE_URL}/comments`);
        if (!response.ok) throw new Error("Failed to fetch comments");
        const data = await response.json();
        setComments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  // Fetch details of a single comment
  const fetchCommentDetails = async (commentId) => {
    console.log("Fetching details for comment ID:", commentId); // Debugging log

    setDetailsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/comments/${commentId}`);
      if (!response.ok) throw new Error("Failed to fetch comment details");
      const data = await response.json();
      console.log("Fetched comment details:", data); // Debugging log
      setSelectedComment(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setDetailsLoading(false);
    }
  };

  // Close the comment details dialog
  const handleCloseDialog = () => {
    setSelectedComment(null);
  };

  if (loading) {
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <Typography color="error">Error: {error}</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Comments List
      </Typography>
      <List>
        {comments.map((comment) => (
          <ListItem key={comment.id} divider>
            <ListItemText
              primary={comment.body} // Now showing the comment first
              secondary={`By: ${comment.name}`} // Showing name instead of email
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => fetchCommentDetails(comment.id)}
            >
              View Details
            </Button>
          </ListItem>
        ))}
      </List>

      {/* Comment Details Dialog */}
      <Dialog
        open={Boolean(selectedComment)}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Comment Details</DialogTitle>
        <DialogContent>
          {detailsLoading ? (
            <CircularProgress />
          ) : selectedComment ? (
            <>
              <Typography>
                <strong>Post ID:</strong> {selectedComment.postId}
              </Typography>
              <Typography>
                <strong>Comment:</strong> {selectedComment.body}
              </Typography>
              <Typography>
                <strong>By:</strong> {selectedComment.name}
              </Typography>
              <Typography>
                <strong>Email:</strong> {selectedComment.email}
              </Typography>
            </>
          ) : (
            <Typography color="error">Error fetching details</Typography>
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Comments;
