import { View, StyleSheet, ScrollView } from 'react-native';
import { useQuery } from '@apollo/client';
import { ME } from '../../graphql/quaries'
import Constants from 'expo-constants';
import theme from '../../theme'
import AppBarTab from './AppBarTab';
import SignOutAppBarTab from './SignOutAppBarTab';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight,
    paddingBottom: Constants.statusBarHeight / 2,
    paddingLeft: 10,
    backgroundColor: theme.backgroundColors.dark,
  },
});

const AppBar = () => {
  const {data} = useQuery(ME)
  const authorized = data && data.me

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text={'Repositories'} path={'/'} />
        { !authorized
          ? <>
              <AppBarTab text={'Sign in'} path={'/signIn'} /> 
              <AppBarTab text={'Sign up'} path={'/signUp'} /> 
            </>
          : <> 
              <AppBarTab text={'Create a review'} path={'/createReview'} />
              <AppBarTab text={'My reviews'} path={'/myReviews'} />
              <SignOutAppBarTab text={'Sign out'} />
            </>
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;
