import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import Profile from '../components/Profile';

export default function ProfileScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const {userId, displayName} = route.params ?? {};

  useLayoutEffect(() => {
    navigation.setOptions({
      title: displayName,
    });
  }, [navigation, displayName]);

  return <Profile userId={userId} />;
}
