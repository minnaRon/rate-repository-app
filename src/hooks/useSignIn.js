import { useMutation, useApolloClient } from '@apollo/client';
import { SIGN_IN } from '../graphql/mutations'
import  useAuthStorage  from './useAuthStorage';

const useSignIn = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(SIGN_IN);

  const signIn = async ({username, password}) => {
    const response = await mutate({variables: {credentials :{ username, password }}})
    await authStorage.setAccessToken(response.data.authenticate.accessToken);
    apolloClient.resetStore();
    return response
  }

  return [signIn, result];
};

export default useSignIn;
