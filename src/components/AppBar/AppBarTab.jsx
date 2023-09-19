import { StyleSheet, Text } from 'react-native';
import { Link } from "react-router-native";
import theme from '../../theme'

const styles = StyleSheet.create({
  text: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    paddingRight: 20,
  }
});

const AppBarTab = ({text, path}) => {
  return (
    <Link to={path}>
        <Text style={styles.text}>{text}</Text>
    </Link>
  )
}

export default AppBarTab
