import { View, Image, StyleSheet } from 'react-native'
import * as Linking from 'expo-linking';
import {useParams} from 'react-router-dom'
import {useRepository} from '../hooks/useRepositories'
import useGithubUrl from '../hooks/useGithubUrl'
import Pressable from './Pressable'
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
  },
  logBox: {
    padding: 20,
    margin: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#f0f0f0',
    backgroundColor: '#f9f9f9',
  },
});

const Figures = ({count, text}) => {
  const format = (number) => number >= 1000 ? `${(number/1000).toFixed(1)}k` : number
  return (
    <View style={styles.reviewItem}>
      <Text fontWeight={'bold'} >{format(count)}</Text>
      <Text>{text}</Text>
    </View>  
  )
}

const OpenInGithubButton = ({ id }) => {
const { url } = useGithubUrl(id);

  return (
    <View>
      <Pressable style={styles.logBox} onPress={() => Linking.openURL(url)} text={'Open in Github'} />
    </View>
  )
}

const RepositoryInfo = ({ item }) => {
  const {id} = useParams()
  const { repository } = useRepository({id}, 'repository');

  item = repository ? repository : item

  if (!item)  return null
  
  const { fullName, description, language, stargazersCount, forksCount, ratingAverage, reviewCount, ownerAvatarUrl } = item
  
  return (
    <View style={styles.container} testID="repositoryItem">
      <View style={styles.intro}>
        <View style={styles.image}>
          <Image
          style={styles.tinyLogo}
          source={{uri:ownerAvatarUrl}}
          />
        </View>
        <View style={styles.image}>
          <Text fontWeight={'bold'} fontSize={'subheading'} >{fullName}</Text>
          <Text style={{marginTop: 5, marginBottom: 5}}>{description}</Text>
          <Text style={styles.tag}>{language}</Text>
        </View>
      </View>
      <View style={styles.review}>
        <Figures count={stargazersCount} text={'Stars'} />
        <Figures count={forksCount} text={'Forks'} />
        <Figures count={reviewCount} text={'Reviews'} />
        <Figures count={ratingAverage} text={'Rating'} />
      </View>
      {id ? <OpenInGithubButton id={id} /> : <Text></Text>}
    </View>
  )
}

export default RepositoryInfo
