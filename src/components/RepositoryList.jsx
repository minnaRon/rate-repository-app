import { FlatList, View, StyleSheet } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import theme from '../theme';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.backgroundColors.lightGrey
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories } = useRepositories();

  const repositoryNodes = repositories
  ? repositories.edges.map(edge => edge.node)
  : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem key={item.id}  item={item} />}
      keyExtractor={({id}) => id}
    />
  );
};

export default RepositoryList;
