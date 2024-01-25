import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS } from '../config/theme';
import { DRAWER_ICON_MARGIN_LEFT } from '../config/theme';

const accordionItems = [
  {
    title: 'ENGLISH',
  },
  {
    title: 'ITALIAN',
  },
  {
    title: 'GERMAN',
  },
  {
    title: 'RUSSIAN',
  },
];

export const LanguageSelector = () => {
  const [language, setLanguage] = useState('LANGUAGE');
  const [isExpanded, setIsExpanded] = useState(false);

  const chooseLanguage = (title: string) => {
    setLanguage(title);
    setIsExpanded(false);
  };

  // const renderAccordionItem = (item: { title: string }, index: number) => {
  //   return (
  //     <List.Item
  //       key={index}
  //       style={styles.accordionItem}
  //       title={item.title}
  //       onPress={() => chooseLanguage(item.title)}
  //       left={() => (
  //         <View style={styles.accordionItemIconContainer}>
  //           <FlagIcon />
  //         </View>
  //       )}
  //     />
  //   );
  // };

  return (
    // <List.Accordion
    //   titleStyle={[theme.TEXT_VARIANTS.font16, styles.accordionTitle]}
    //   style={styles.accordion}
    //   title={language}
    //   left={() => <FlagIcon style={styles.icon} />}
    //   right={() => <ArrowToBottomIcon />}
    //   expanded={isExpanded}
    //   onPress={() => setIsExpanded(!isExpanded)}
    // >
    //   {accordionItems.map((item, index) => renderAccordionItem(item, index))}
    // </List.Accordion>
    <View></View>
  );
};

const styles = StyleSheet.create({
  accordion: {
    backgroundColor: COLORS.LIGHT_BACKGROUND,
    paddingHorizontal: 17,
    opacity: 1,
  },
  accordionTitle: {
    marginLeft: 12,
  },
  accordionItem: {
    marginLeft: 56,
  },
  accordionItemIconContainer: {
    marginTop: 5,
  },
  icon: {
    marginLeft: DRAWER_ICON_MARGIN_LEFT,
  },
});
