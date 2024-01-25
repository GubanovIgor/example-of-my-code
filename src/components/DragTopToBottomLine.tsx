import React from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS, SPACING } from 'config/theme';

export const DragTopToBottomLine = () => (
  <View style={styles.container}>
    <View style={styles.line} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginTop: SPACING.M,
  },
  line: {
    width: 70,
    height: 4,
    backgroundColor: COLORS.DRAG_LINE,
    borderRadius: 2,
  },
});
