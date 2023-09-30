import { View, FlatList, StyleSheet } from 'react-native'
import { useReviews } from '../../hooks/useReview'
import theme from '../../theme'
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.backgroundColors.lightGrey
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { reviews } = useReviews();
  if (!reviews)  return null

  const reviewNodes = reviews
  ? reviews.edges.map(edge => edge.node)
  : [];

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => <ReviewItem review={item}/>}
    />
  );
};

export default MyReviews;
