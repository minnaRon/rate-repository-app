import theme from '../theme';
import { Pressable as NativePressable, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  logBox: {
    flexGrow:1,
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
  },
  deleteButton: {
    backgroundColor: theme.backgroundColors.red

  }
})

const Pressable = ({ backgroundColor, onPress, text }) => {

  const buttonStyle = [
    styles.logBox,
    backgroundColor === 'red' && styles.deleteButton
  ]

  return(
    <NativePressable style={buttonStyle} onPress={ onPress }>
      <Text style={styles.text}>{text}</Text>
    </NativePressable>
  )
}

export default Pressable
