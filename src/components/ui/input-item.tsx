import { wp } from '@/lib/dimensions';
import { Image, TextInput, View } from 'react-native';

type InputItemProps = {
  title: string,
  icon: any,
  handleChange: any,
  value: any
}

const InputItem: React.FC<InputItemProps> = ({ title, icon, handleChange, value }) => {
  return (
    <View
      className="flex-row py-3 items-center"
      style={{
        borderRadius: 1,
        borderBottomWidth: 1,
        borderColor: '#f0eff2',
      }}
    >
      <Image source={icon} style={{ height: wp(7), width: wp(7) }}></Image>
      <TextInput
        className="ml-3 w-full"
        style={{ fontSize: wp(4) }}
        onChangeText={handleChange}
        value={value}
        placeholder={title}
        placeholderTextColor={'black'}
      />
    </View>
  );
};

export default InputItem;
