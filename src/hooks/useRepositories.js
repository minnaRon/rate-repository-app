import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES, GET_REPOSITORY, GET_REVIEWS } from '../graphql/quaries';

export const useRepositories = (first, order, searchKeyword='') => {
  
  const orderOptions = {
    CREATED_AT: {orderBy: "CREATED_AT"},
    ASC: {orderBy: "RATING_AVERAGE", orderDirection: "ASC"},
    DESC: {orderBy: "RATING_AVERAGE", orderDirection: "DESC"}
  }

  const response = useQuery(
      GET_REPOSITORIES, {
        variables: {...orderOptions[order], first, searchKeyword},
        fetchPolicy: 'cache-and-network'
      }
  );

  if(!response) return null

  const { loading, error, data, fetchMore } = response

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) return;

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...orderOptions[order], first, searchKeyword,
      },
    });
  };

  return { repositories: data?.repositories, fetchMore: handleFetchMore, loading, error }
};

export const useRepository = (variables, option) => {
  if (!option) return

  const queryOptions = {
    'reviews': GET_REVIEWS,
    'repository': GET_REPOSITORY
  }

  const response = useQuery(
    queryOptions[option], { variables:{...variables}, fetchPolicy: 'cache-and-network' }
  );

  if(!response) return null

  const { loading, error, data, fetchMore } = response

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) return;
    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables
      },
    });
  };

  return { repository: data?.repository, fetchMore: handleFetchMore, loading, error }
};
