import { useMutation } from '@apollo/client';
import { SIGN_UP } from '../graphql/mutations'

const useSignUp = () => {
  const [mutate, result] = useMutation(SIGN_UP);

  const signUp = async ({username, password}) => {
    const response = await mutate({variables: {credentials :{ username, password }}})
    return response.data.createUser.username
  }

  return [signUp, result];
};

export default useSignUp;
