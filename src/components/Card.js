import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Card = (props) => {
  return (
    <View style={{...styles.card, ...props.style}}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 3,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 20,
  },
});
export default Card;
