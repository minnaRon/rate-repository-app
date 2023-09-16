import theme from '../theme';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  input: {
    font: theme.fonts.main,
    color: theme.colors.textSecondary,
    margin: 12,
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    padding: 10,
    borderRadius: 5
  },
  errorBorder: {
    borderColor: theme.colors.error
  }
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [styles.input, style, error && styles.errorBorder];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
