import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Colors from '../Colors';
import Card from '../components/Card';
import StyledText from '../components/StyledText';
import UserDetail from '../components/UserDetail';

const UserListScreen = () => {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [token, setToken] = useState(null);
  const [loadMore, setLoadMore] = useState(false);
  const fetchList = async () => {
    if (token) {
      try {
        const config = {
          headers: {Authorization: `Bearer ${token}`},
        };
        const url = `list?page=${page}`;
        const response = await Axios.get(url, config);
        const users =
          page === 1
            ? response.data.data.users
            : [...list, ...response.data.data.users];
        setList(users);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const loadUsers = () => {
    setLoadMore(true);
    setPage(page + 1);
  };

  const getList = async () => {
    const storedToken = await AsyncStorage.getItem('token');
    setToken(storedToken);
  };
  useEffect(() => {
    getList();
  }, []);
  useEffect(() => {
    fetchList();
  }, [token, page]);
  return (
    <FlatList
      data={list}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item}) => (
        <Card style={styles.cardAlign}>
          <UserDetail item={item} />
        </Card>
      )}
      onEndReached={loadUsers}
      onEndReachedThreshold={0.5}
      initialNumToRender={7}
      ListFooterComponent={() => {
        if (!loadMore) {
          return false;
        } else {
          return (
            <View style={styles.bottomView}>
              <ActivityIndicator size="large" color={Colors.primary} />
            </View>
          );
        }
      }}
    />
  );
};

const styles = StyleSheet.create({
  bottomView: {
    width: '100%',
    height: 30,
    paddingVertical: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  cardAlign: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
});
export default UserListScreen;
