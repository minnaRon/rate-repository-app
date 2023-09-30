import { useQuery, useMutation } from '@apollo/client';
import { GET_OWN_REVIEWS } from '../graphql/quaries'
import { ADD_REVIEW, DELETE_REVIEW } from '../graphql/mutations'


export const useReviews = () => {
  const { loading, error, data, refetch } = useQuery(
    GET_OWN_REVIEWS, {fetchPolicy: 'cache-and-network' } 
  );
  const {reviews} = data ? data.me : ''

  return { reviews, loading, error, refetch }
};


export const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW, {
    refetchQueries: () => [{
      query: GET_OWN_REVIEWS, fetchPolicy: 'network-only',
    }],});

  const deleteReview = async (id) => {
    const response = await mutate({variables: {deleteReviewId: id}})
    return response.data.deleteReview
  }

  return [deleteReview, result];
};


const useReview = () => {
  const [mutate, result] = useMutation(ADD_REVIEW);
  
  const addReview = async (props) => {
    const response = await mutate({variables: {review: props}})
    return response.data.createReview.repository.id
  }

  return [addReview, result];
};
export default useReview;
