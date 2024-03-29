import React, {useState, useEffect} from 'react';
import {View, Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Colors, Metrics} from '../../themes';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import Text from '../Text';
import {ThemeHelper} from '../../helpers';

export default props => {
  return (
    <View  style={styles.main}>
      <TouchableOpacity
        activeOpacity={1}
        style={{
          ...styles.buttonTouch,
        }}
        onPress={() => props.btnPress()}>
        {props.loader ? (
          <ActivityIndicator color={Colors.white} size="large" />
        ) : (
          <Text style={styles.buttonText} type={'heading'}>
            {props.label}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
