import { View, FlatList, StyleSheet } from 'react-native'
import {useParams} from 'react-router-dom'
import {format} from 'date-fns'
import {useRepository} from '../hooks/useRepositories'
import RepositoryInfo from './RepositoryInfo'
import theme from '../theme'
import Text from './Text';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.backgroundColors.lightGrey
  },
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    backgroundColor: theme.backgroundColors.white,
  },
  intro: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  ratingCircle: {
    width: 50,
    height: 50,
    flexGrow:0,
    marginRight:15,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    borderRadius: 25,
    justifyContent: 'center'

  },
  ratingInfo: {
    flexGrow:1,
    paddingRight:15,
    width: 0,
  },
  ratingText: {
    flexGrow:1,
  },
});

const ReviewItem = ({ review }) => {
  const {createdAt, rating, text, user} = review
  
  return (
    <View style={styles.container} testID="reviewItem">
      <View style={styles.intro}>
        <View style={styles.ratingCircle}>
          <Text color={'primary'} fontWeight={'bold'} style={{fontSize:20, textAlign: 'center'}}>{rating}</Text>
        </View>
        <View style={styles.ratingInfo}>
          <Text fontWeight={'bold'} fontSize={'subheading'} >{user.username}</Text>
          <Text style={{marginTop: 5, marginBottom: 5}}>{format(new Date(createdAt), 'd.M.yyyy')}</Text>
          <View style={styles.ratingText}>
            <Text >{text}</Text>
          </View>
        </View>
      </View>
    </View>
  )};
  
const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const {id} = useParams()
  const first = 2
  const { repository, fetchMore } = useRepository({repositoryId: id, first}, 'reviews');
  
  if (!repository)  return null

  const {reviews} = repository
  
  const reviewNodes = reviews
  ? reviews.edges.map(edge => edge.node)
  : [];

  const onEndReach = () => {
    fetchMore();
  }

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item}/>}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo id={id}/>}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;
