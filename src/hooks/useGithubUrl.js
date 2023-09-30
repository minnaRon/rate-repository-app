import { useQuery } from '@apollo/client';
import { GET_URL } from '../graphql/quaries';

const useGithubUrl = ( id ) => {

  const { loading, error, data } = useQuery(
    GET_URL, { variables: { id }, fetchPolicy: 'cache-and-network'}
    );

  const {url} = data ? data.repository : ''

  return { url, loading, error }
};

export default useGithubUrl;
