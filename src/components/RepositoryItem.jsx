import { View, Image, StyleSheet } from 'react-native'
import theme from '../theme'
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    backgroundColor: theme.backgroundColors.white,
  },
  image: {
    flexGrow:0,
    paddingRight:15
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 5
  },
  intro: {
    flexDirection: 'row',
    marginBottom: 10
  },
  tag: {
    color: theme.colors.white,
    backgroundColor: theme.colors.primary,
    borderRadius: 2,
    alignSelf: 'flex-start',
    fontSize: theme.fontSizes.body,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  review: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  reviewItem: {
    flexGrow:0,
    alignItems:'center'  
  }
});

const ReviewItem = ({count, text}) => {
  const format = (number) => number >= 1000 ? `${(number/1000).toFixed(1)}k` : number
  return (
    <View style={styles.reviewItem}>
      <Text fontWeight={'bold'} >{format(count)}</Text>
      <Text>{text}</Text>
    </View>  
  )
}

const RepositoryItem = ({ item }) => {
  const { fullName, description, language, stargazersCount, forksCount, ratingAverage, reviewCount, ownerAvatarUrl } = item
  return (
    <View style={styles.container}>
      <View style={styles.intro}>
        <View style={styles.image}>
          <Image
          style={styles.tinyLogo}
          source={{uri:ownerAvatarUrl}}
          />
        </View>
        <View style={styles.image}>
          <Text fontWeight={'bold'} fontSize={'subheading'}>{fullName}</Text>
          <Text style={{marginTop: 5, marginBottom: 5}}>{description}</Text>
          <Text style={styles.tag}>{language}</Text>
        </View>
      </View>
      <View style={styles.review}>
        <ReviewItem count={stargazersCount} text={'Stars'} />
        <ReviewItem count={forksCount} text={'Forks'} />
        <ReviewItem count={reviewCount} text={'Reviews'} />
        <ReviewItem count={ratingAverage} text={'Rating'} />
      </View>
    </View>
  )
}

export default RepositoryItem
