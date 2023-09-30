import { View, StyleSheet } from 'react-native'
import { useNavigate } from 'react-router-dom';
import {format} from 'date-fns'
import theme from '../../theme'
import Text from '../Text';
import Pressable from '../Pressable'
import DeleteReviewButton from './DeleteReviewButton'

const styles = StyleSheet.create({
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
  buttonRow: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'center'
  },
});


const ReviewItem = ({ review }) => {
  const navigate = useNavigate()
  const {id, repository, createdAt, rating, text} = review
  
  return (
    <View style={styles.container} testID="reviewItem">
      <View style={styles.intro}>
        <View style={styles.ratingCircle}>
          <Text color={'primary'} fontWeight={'bold'} style={{fontSize:20, textAlign: 'center'}}>{rating}</Text>
        </View>
        <View style={styles.ratingInfo}>
          <Text fontWeight={'bold'} fontSize={'subheading'} >{repository.fullName}</Text>
          <Text style={{marginTop: 5, marginBottom: 5}}>{format(new Date(createdAt), 'd.M.yyyy')}</Text>
          <View style={styles.ratingText}>
            <Text >{text}</Text>
          </View>
          <View style={styles.buttonRow}>
          <Pressable onPress={() => navigate(`/${repository.id}`)} text={'View repository'} />
          <DeleteReviewButton id={id} />
          </View>
        </View>
      </View>
    </View>
  )
};

export default ReviewItem
