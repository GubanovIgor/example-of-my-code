import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS, SPACING, TEXT_VARIANTS } from 'config/theme';

interface ICustomTextCheckBox {
  helpText: () => JSX.Element;
  isChecked: boolean;
  onChange: (value: boolean) => void;
  caption?: string;
  containerStyles?: StyleProp<ViewStyle>;
  inactiveCheckboxStyles?: StyleProp<ViewStyle>;
  activeCheckboxStyles?: StyleProp<ViewStyle>;
}

export const CustomTextCheckbox = ({
  helpText,
  isChecked,
  onChange,
  caption = '',
  containerStyles,
  inactiveCheckboxStyles,
  activeCheckboxStyles,
}: ICustomTextCheckBox) => (
  <View>
    <TouchableOpacity
      style={[styles.container, containerStyles]}
      onPress={() => onChange(!isChecked)}
    >
      <View
        style={
          isChecked
            ? [styles.activeCheckbox, activeCheckboxStyles]
            : [styles.inactiveCheckbox, inactiveCheckboxStyles]
        }
      >
        {isChecked && (
          <>
            <View style={styles.tickLeftLine} />
            <View style={styles.tickRightLine} />
          </>
        )}
      </View>
      {helpText && helpText()}
    </TouchableOpacity>
    {Boolean(caption) && (
      <View style={styles.helpTextContainer}>
        <Text style={[TEXT_VARIANTS.font10, styles.captionText]}>
          {caption}
        </Text>
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 20,
  },
  inactiveCheckbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.WHITE,
  },
  activeCheckbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    backgroundColor: COLORS.PRIMARY,
  },
  tickLeftLine: {
    position: 'absolute',
    top: 9,
    left: 2,
    width: 6,
    height: 1.5,
    backgroundColor: COLORS.LIGHT_BACKGROUND,
    transform: [{ rotate: '45deg' }],
    borderRadius: 2,
  },
  tickRightLine: {
    position: 'absolute',
    top: 7,
    left: 5.2,
    width: 9,
    height: 1.5,
    backgroundColor: COLORS.LIGHT_BACKGROUND,
    transform: [{ rotate: '-48deg' }],
    borderRadius: 2,
  },
  captionText: {
    marginTop: SPACING.XS,
    color: COLORS.TEXT_DANGER,
  },
  helpTextContainer: {
    alignItems: 'flex-start',
  },
});
