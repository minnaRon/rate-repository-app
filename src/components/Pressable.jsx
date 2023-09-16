import theme from '../theme';
import { Pressable as NativePressable, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  logBox: {
    padding: 20,
    margin: 10,
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    alignItems:'center'
  },
  text: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold
  }
})

const Pressable = ({ onPress }) => {

return(
  <NativePressable style={styles.logBox} onPress={ onPress }>
    <Text style={styles.text}>Sign in</Text>
  </NativePressable>
)
}

export default Pressable
