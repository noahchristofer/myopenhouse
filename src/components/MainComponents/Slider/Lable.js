import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts } from '../../../constraints';

const Label = ({ text, ...restProps }) => {
  return (
    <View style={styles.root} {...restProps}>
      <Text style={styles.text}>${text}k</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 8,
    backgroundColor: colors.Bgpurple,
    borderRadius: 4,
  },
  text: {
    fontSize: 14,
    color: colors.white,
    fontFamily:fonts.InterRegular,
    lineHeight:18
  },
});

export default memo(Label);