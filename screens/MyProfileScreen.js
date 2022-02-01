import React from 'react';
import Profile from '../components/Profile';
import {useNavigation} from '@react-navigation/native';
import {useUserContext} from '../contexts/UserContext';
import useRefEffect from 'react-native/Libraries/Utilities/useRefEffect';

export default function MyProfileScreen() {
  const {user} = useUserContext();
  const navigation = useNavigation();

  useRefEffect(() => {
    navigation.setOptions({
      title: user.displayName,
    });
  }, [navigation, user]);

  return <Profile userId={user.id} />;
}
