import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Review from "./Review";
import ReviewForm from "./ReviewForm";


const API = process.env.REACT_APP_API_URL;

function Reviews() {
  const [reviews, setReviews] = useState([]);
  let { id } = useParams();

  const handleAdd = (newReview) => {
    axios
      .post(`${API}/bookmarks/${id}/reviews`, newReview)
      .then(
        (response) => {
          setReviews([response.data, ...reviews]);
        },
        (error) => console.error(error)
      )
      .catch((c) => console.warn("catch", c));
  };
  
  useEffect(() => {
    axios.get(`${API}/bookmarks/${id}/reviews`).then((response) => {
      console.log(response.data);
      setReviews(response.data);
    });
  }, [id, API]);


    return (
        <section className="Reviews">
        <h2>Reviews</h2>
        <ReviewForm handleSubmit={handleAdd}>
            <h3>Add a New Review</h3>
        </ReviewForm>
        {reviews.map((review) => (
            <Review key={review.id} review={review} />
        ))}
        </section>
    );
}

export default Reviews;