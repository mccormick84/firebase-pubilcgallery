import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet} from 'react-native';
import PostCard from '../components/PostCard';
import {getPosts, getOlderPosts, PAGE_SIZE} from '../lib/posts';

export default function FeedScreen() {
  const [posts, setPosts] = useState(null);
  //마지막 포스트까지 조회했음을 명시하는 상태
  const [noMorePost, setNoMorePost] = useState(false);
  useEffect(() => {
    //컴포넌트가 처음 마운트 될 때 포스트 목록을 조회한 후 post 상태에 담기
    getPosts().then(setPosts);
  }, []);

  const onLoadMore = async () => {
    if (noMorePost || !posts || posts.length < PAGE_SIZE) {
      return;
    }
    const lastPost = posts[posts.length - 1];
    const olderPosts = await getOlderPosts(lastPost.id);
    if (olderPosts.length < PAGE_SIZE) {
      setNoMorePost(true);
    }
    setPosts(posts.concat(olderPosts));
  };

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.75}
      // ListFooterComponent={
      //   !noMorePost && (
      //     <ActivityIndicator style={styles.spinner} size={32} color="#6200ee" />
      //   )
      // }
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
