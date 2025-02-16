import { TextInput, View } from 'react-native';

import { Icons } from './icons';

type SearchBarProps = {
  searchTerm: string;
  handleSearchTerm: (text: string) => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, handleSearchTerm }) => {
  return (
    <View className="px-4 py-2 bg-[#f0eff2] rounded-xl flex-1 flex-row items-center mr-4">
      <Icons.search size={20} color="#7f7f7f" />
      <TextInput
        className="text-base text=[#555] flex-1"
        placeholder="Search..."
        value={searchTerm}
        onChangeText={handleSearchTerm}
      />
    </View>
  );
};
