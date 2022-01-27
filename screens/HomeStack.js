import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FeedScreen from './FeedScreen';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={'Feed'} component={FeedScreen} />
    </Stack.Navigator>
  );
}
