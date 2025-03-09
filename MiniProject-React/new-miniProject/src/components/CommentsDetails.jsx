import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";

const CommentDetails = () => {
  const { comment_id } = useParams();
  const [comment, setComment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCommentDetails = async () => {
      try {
        const response = await fetch(
          `https://json-placeholder.mock.beeceptor.com/comments/${comment_id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch comment details");
        }
        const data = await response.json();
        setComment(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCommentDetails();
  }, [comment_id]);

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Comment Details
      </Typography>

      {loading && (
        <Container sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <CircularProgress />
        </Container>
      )}

      {error && <Alert severity="error">{error}</Alert>}

      {comment && (
        <Card sx={{ p: 2, mt: 3 }}>
          <CardContent>
            <Typography variant="h6">{comment.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {comment.email}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              {comment.body}
            </Typography>
            <Button onClick={() => navigate(`/comments/${comment.id}`)}>
              View Details
            </Button>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default CommentDetails;
