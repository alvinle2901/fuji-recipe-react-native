import { Text } from 'react-native';

type ErrorProps = {
  text: string;
};

export const Error: React.FC<ErrorProps> = ({ text }) => {
  return <Text style={{ fontSize: 12, color: 'red', marginTop: 3 }}>{text}</Text>;
};
