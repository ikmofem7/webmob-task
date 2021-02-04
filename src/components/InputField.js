import React, {Fragment} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

const InputField = (props) => {
  return (
    <View style={{paddingBottom: 8}}>
      <Text>{props.label}</Text>
      <TextInput
        returnKeyType="next"
        onChangeText={props.onChange}
        onBlur={props.onBlur}
        placeholder={props.label}
        value={props.value}
        style={styles.input}
      />
      {props.touched && props.error && (
        <Text style={styles.error} style={styles.errorMsg}>
          {props.error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {borderBottomColor: '#dad8d8', borderBottomWidth: 1},
  errorMsg: {color: 'red', fontSize: 12},
});
export default InputField;
