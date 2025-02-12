import React from 'react';
import { Text, View } from '../ui';

import { newTitle, positive } from '@/lib/string';
import { wp } from '@/lib/dimensions';

type DetailItemProps = {
  title: string,
  detail: string
} 

export const DetailItem: React.FC<DetailItemProps> = ({ title, detail }) => {
  return (
    <View
      className="flex-row justify-end items-start py-4"
      style={{ borderRadius: 1, borderBottomWidth: 1, borderColor: 'grey' }}
    >
      <Text className="flex-1 uppercase font-light mr-5" style={{ fontSize: wp(4) }}>
        {newTitle(title)}
      </Text>
      <Text className="flex-1 font-bold" style={{ fontSize: wp(4) }}>
        {positive(title, detail)}
      </Text>
    </View>
  );
};
