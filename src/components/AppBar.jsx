import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Link } from "react-router-native";
import Constants from 'expo-constants';
import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight,
    paddingBottom: Constants.statusBarHeight / 2,
    paddingLeft: 10,
    backgroundColor: theme.backgroundColors.dark,
  },
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

const AppBar = () => {

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text={'Repositories'} path={'/'} /> 
        <AppBarTab text={'Sign in'} path={'/signIn'} /> 
      </ScrollView>
    </View>
  );
};

export default AppBar;
