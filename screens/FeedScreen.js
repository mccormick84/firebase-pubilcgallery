import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import PostCard from '../components/PostCard';
import usePosts from '../hooks/usePosts';
import SplashScreen from 'react-native-splash-screen';

export default function FeedScreen() {
  const {posts, noMorePost, refreshing, onLoadMore, onRefresh, removePost} =
    usePosts();

  // 사용자가 로그인한 경우 FeedScreen 보여주기
  const postsReady = posts !== null;
  useEffect(() => {
    if (postsReady) {
      // post 값이 준비 되었을 때 SplashScreen 숨기기
      SplashScreen.hide();
    }
  }, [postsReady]);

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.75}
      disableVirtualization={false}
      ListFooterComponent={
        !noMorePost && (
          <ActivityIndicator style={styles.spinner} size={32} color="#6200ee" />
        )
      }
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }
    />
  );
}

const renderItem = ({item}) => (
  <PostCard
    createdAt={item.createdAt}
    description={item.description}
    id={item.id}
    user={item.user}
    photoURL={item.photoURL}
  />
);

const styles = StyleSheet.create({
  container: {
    paddingBottom: 48,
  },
  spinner: {
    height: 64,
  },
});
