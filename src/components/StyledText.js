import React from 'react';

import {StyleSheet, Text, View} from 'react-native';

const StyledText = (props) => {
  return (
    <Text style={{fontSize: 16}}>
      <Text style={{fontWeight: 'bold'}}>{props.left}  </Text>
      <Text>{props.right}</Text>
    </Text>
  );
};

export default StyledText;

const styles = StyleSheet.create({});
