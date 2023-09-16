import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import Text from './Text';
import Pressable from './Pressable';
import FormikTextInput from './FormikTextInput';

const initialValues = { 
  username: '', 
  password: '' 
}

const validationSchema = yup.object().shape({
  username: yup
  .string()
  .min(3, 'Minimum length of the username is 3 characters') 
  .required('Username is required'),
  password: yup
  .string()
  .min(8, 'Minimum length of the password is 8 characters')
  .required('Password is required'),
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

const SignInForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry={true}/>
      <Pressable style={styles.logBox} onPress={onSubmit}>
        <Text>Sign in</Text>
      </Pressable>
    </View>
  )
};

const SignIn = () => {
  
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

export default SignIn;
