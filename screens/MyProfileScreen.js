import React, {useEffect} from 'react';
import Profile from '../components/Profile';
import {useNavigation} from '@react-navigation/native';
import {useUserContext} from '../contexts/UserContext';
import IconRightButton from '../components/IconRightButton';

export default function MyProfileScreen() {
  const {user} = useUserContext();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: user.displayName,
      headerRight: () => (
        <IconRightButton
          name={'settings'}
          onPress={() => navigation.push('Setting')}
        />
      ),
    });
  }, [navigation, user]);

  return <Profile userId={user.id} />;
}
