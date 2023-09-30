import { useNavigate } from "react-router-dom";
import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';
import Pressable from './Pressable';
import FormikTextInput from './FormikTextInput';

const initialValues = { 
  username: '', 
  password: '',
  confirmPassword: ''
}

const validationSchema = yup.object().shape({
  username: yup
  .string()
  .min(3, 'Minimum length of the username is 3 characters').trim()
  .required('Username is required'),
  password: yup
  .string()
  .min(8, 'Minimum length of the password is 8 characters').trim()
  .required('Password is required'),
  confirmPassword: yup
  .string()
  .oneOf([yup.ref('password'), null], 'Passwords are different')
  .required('Password confirm is required')
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

export const SignUpForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry={true}/>
      <FormikTextInput name="confirmPassword" placeholder="Password confirmation" secureTextEntry={true}/>
      <Pressable style={styles.logBox} onPress={onSubmit} text={'Sign up'} />
    </View>
  )
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const {username, password} = values
    try {
      const createdUsername = await signUp({ username, password });
      await signIn({ username: createdUsername, password });
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

export default SignUp;
