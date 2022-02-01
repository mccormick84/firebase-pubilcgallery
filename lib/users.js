import firestore from '@react-native-firebase/firestore';

// 컬렉션 레퍼런스 : 컬렉션에 있는 특정 값을 조회, 등록, 삭제하는 메서드를 포함
export const usersCollection = firestore().collection('users');

// 주어진 파라미터를 고유 ID로 가지고 있는 문서에 주어진 정보들을 설정해 저장
export function createUser({id, displayName, photoURL}) {
  return usersCollection.doc(id).set({
    id,
    displayName,
    photoURL,
  });
}

// 주어진 파라미터를 고유 ID로 가지고 있는 문서를 조회해 그 정보를 반환
export async function getUser(id) {
  const doc = await usersCollection.doc(id).get();
  return doc.data();
}

/*
컬렉션 레퍼런스에는 add 라는 메서드가 있어서 이 메서드를 사용하면 고유 ID를 firestore에서 자동으로 생성
사용자의 uid 값을 고유 ID로 사용할 예정이므로 add가 아닌 doc과 set을 통해 구현
*/
