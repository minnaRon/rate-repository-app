import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/quaries';

const useRepositories = () => {
  const { loading, error, data } = useQuery(
    GET_REPOSITORIES, { fetchPolicy: 'cache-and-network' } 
    );
  const {repositories} = data ? data : ''
  
  return { repositories, loading, error }
};

export default useRepositories;
