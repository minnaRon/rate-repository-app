import {useState} from 'react'
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import * as React from 'react';
import { Searchbar } from 'react-native-paper';
import { useNavigate } from 'react-router-dom';
import {Picker} from '@react-native-picker/picker';
import { useDebouncedCallback } from 'use-debounce';
import {useRepositories} from '../hooks/useRepositories';
import theme from '../theme';
import RepositoryInfo from './RepositoryInfo';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.backgroundColors.lightGrey
  },
});

export const ListHeader = ({ selectedOrder, setSelectedOrder, searchQuery, setSearchQuery }) => {
  const onChangeSearch = query => debounced(query);  
  
  const debounced = useDebouncedCallback(value => {
    setSearchQuery(value)
  }, 
    500
  );

  const options = {
    CREATED_AT: "Latest repositories",
    DESC: "Highest rated repositories",
    ASC: "Lowest rated repositories"
  }

  return (
    <View>
    <Searchbar placeholder="Search" onChangeText={onChangeSearch} value={searchQuery} />
    <Picker
      selectedValue={selectedOrder}
      onValueChange={(itemValue) => setSelectedOrder(itemValue)}
    >
    {Object.keys(options).map(o =>
      <Picker.Item key={o} label={options[o]} value={o} />
    )}
    </Picker>
    </View>
  )
}

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, onEndReach, setSearchQuery, searchQuery, selectedOrder, setSelectedOrder }) => {
  const navigate = useNavigate()

  const repositoryNodes = repositories
  ? repositories.edges.map(edge => edge.node)
  : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={({id}) => id}
      renderItem={({ item }) =>
        <Pressable onPress={() => navigate(`/${item.id}`)}>
          <RepositoryInfo item={item} />
        </Pressable>
      }
      ListHeaderComponent={() => <ListHeader setSearchQuery={setSearchQuery}
      searchQuery={searchQuery} selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder}/>} 
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
}

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const first = 8
  const { repositories, fetchMore } = useRepositories(first, selectedOrder, searchQuery);

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      onEndReach={onEndReach}
      selectedOrder={selectedOrder}
      setSelectedOrder={setSelectedOrder}
      setSearchQuery={setSearchQuery}
      searchQuery={searchQuery}
    />
  )
};

export default RepositoryList;
