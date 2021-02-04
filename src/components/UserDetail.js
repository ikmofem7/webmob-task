import React, {Fragment} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import StyledText from './StyledText';

const UserDetail = ({item}) => {
  return (
    <Fragment>
      <View style={{marginRight: 20}}>
        <Image
          source={{
            uri: item.profile_pic,
          }}
          style={styles.circularImage}
        />
      </View>
      <View>
        <StyledText left="User No:" right={item.id} />
        <StyledText
          left="Name:"
          right={
            item.username.slice(0, 1).toUpperCase() +
            item.username.slice(1, item.username.length)
          }
        />
        <StyledText left="Email:" right={item.email} />
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  circularImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
});
export default UserDetail;
