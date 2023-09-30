import { StyleSheet, Text, Pressable } from 'react-native';
import { useNavigate } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import useAuthStorage  from '../../hooks/useAuthStorage';
import theme from '../../theme'

const styles = StyleSheet.create({
  text: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    paddingRight: 20,
  }
});

const SignOutAppBarTab = ({text}) => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate('/')
  }

  return (
    <Pressable onPress={handleSignOut} >
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  )
}

export default SignOutAppBarTab
