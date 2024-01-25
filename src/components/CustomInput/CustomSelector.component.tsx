import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Text,
  View,
  ViewStyle,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { COLORS, TEXT_VARIANTS } from 'config/theme';
import ArrowToBottomIcon from 'assets/icons/arrowToBottom.svg';
import ArrowToTopIcon from 'assets/icons/arrowToTop.svg';

import { styles } from './CustomSelector.styles';

interface Props {
  data: string[];
  styleProps?: ViewStyle;
  onChangeText: (value: string) => void;
  caption?: string;
}

export const CustomSelector = ({
  data,
  styleProps,
  caption,
  onChangeText,
}: Props) => {
  const [selectedItem, setSelectedItem] = useState(data[0]);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput | null>(null);
  const [filteredData, setFilteredData] = useState([...data]);

  useEffect(() => {
    onChangeText(selectedItem);
  }, [onChangeText, selectedItem]);

  const selectItem = useCallback(
    (item: string) => {
      setIsFocused(false);
      inputRef?.current?.blur();
      setSelectedItem(item);
      onChangeText(item);
    },
    [onChangeText],
  );

  const onChangeInputText = (text: string) => {
    setSelectedItem(text);
    const newFilteredData = data.filter((item) =>
      item.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredData(newFilteredData);
  };

  const renderInput = () => (
    <View style={styles.inputContainer}>
      <TextInput
        ref={inputRef}
        style={[TEXT_VARIANTS.font14, styles.inputText]}
        value={selectedItem}
        onFocus={() => {
          setIsFocused(true);
          setSelectedItem('');
          setFilteredData([...data]);
        }}
        onBlur={() => setIsFocused(false)}
        onChangeText={(text) => onChangeInputText(text)}
      />
      {isFocused ? (
        <ArrowToTopIcon />
      ) : (
        <ArrowToBottomIcon fill={COLORS.TEXT_LIGHT} />
      )}
    </View>
  );

  const renderItemList = () => (
    <ScrollView
      horizontal
      style={styles.itemListContainer}
      scrollEnabled={false}
      keyboardShouldPersistTaps="always"
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        style={styles.itemList}
        data={filteredData}
        renderItem={renderItem}
      />
    </ScrollView>
  );

  const renderItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => selectItem(item)}
    >
      <Text style={[TEXT_VARIANTS.font14]}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, styleProps]}>
      {renderInput()}
      {isFocused && renderItemList()}
      {Boolean(caption) && (
        <Text style={[TEXT_VARIANTS.font10, styles.captionText]}>
          {caption}
        </Text>
      )}
    </View>
  );
};
