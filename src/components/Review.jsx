import { useNavigate } from "react-router-dom";
import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import useReview from '../hooks/useReview';
import Pressable from './Pressable';
import FormikTextInput from './FormikTextInput';

const initialValues = { 
  ownerName: '', 
  repositoryName: '',
  rating: '',
  text: ''
}

const validationSchema = yup.object().shape({
  ownerName: yup
  .string()
  .required('Repository owner name is required'),
  repositoryName: yup
  .string()
  .required('Repository name is required'),
  rating: yup
  .number()
  .positive('Rating should be a number between 0-100')
  .max(100, 'Rating should be a number between 0-100')
  .required('Rating is required'),
  text: yup
  .string()
});

const styles = {
  logBox: {
    padding: 20,
    margin: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#f0f0f0',
    backgroundColor: '#f9f9f9',
  },
}

export const ReviewForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput name="ownerName" placeholder="Repository owner name" />
      <FormikTextInput name="repositoryName" placeholder="Repository name" />
      <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
      <FormikTextInput name="text" placeholder="Review" multiline textAlignVertical='top' />
      <Pressable style={styles.logBox} onPress={onSubmit} text={'Create a review'} />
    </View>
  )
};

const Review = () => {
  const [addReview] = useReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values
    try {
      const id = await addReview({ ownerName, repositoryName, rating: Number(rating), text });
      navigate(`/${id}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

export default Review;
