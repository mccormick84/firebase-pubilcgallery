import {useRoute} from '@react-navigation/native';
import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import PostCard from '../components/PostCard';

export default function PostScreen() {
  const route = useRoute();
  // console.log(route);
  const {post} = route.params;
  // console.log(post);
  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <PostCard
        user={post.user}
        photoURL={post.photoURL}
        description={post.description}
        createdAt={post.createdAt}
        id={post.id}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
});
