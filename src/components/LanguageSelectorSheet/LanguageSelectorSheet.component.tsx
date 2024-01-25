import React, { FC, RefObject } from 'react';
import { ModalizeWrapper } from 'components/ModalizeWrapper';
import { View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { useLocalisationStore } from 'store/localisationStore';
import { LanguageCard } from 'components/LanguageCard';
import { ILanguage, VoidFunction } from 'core/interfaces';
import { shallow } from 'zustand/shallow';

import { styles } from './LanguageSelectorSheet.styles';

interface LanguageSelectorSheetProps {
  sheetRef: RefObject<Modalize>;
}

const getLanguageCardRenderer =
  (getLanguagePressHandler: (lang: ILanguage) => VoidFunction) =>
  (lang: ILanguage) => {
    const onPress = getLanguagePressHandler(lang);

    return (
      <LanguageCard
        key={lang?.key}
        onPress={onPress}
        langKey={lang?.key}
        langTitle={lang?.name}
        showRightIcon={false}
      />
    );
  };

export const LanguageSelectorSheet: FC<LanguageSelectorSheetProps> = ({
  sheetRef,
}) => {
  const { languages, setCurrentLanguage } = useLocalisationStore(
    (state) => ({
      setCurrentLanguage: state.setCurrentLanguage,
      languages: state.languages,
    }),
    shallow,
  );

  const getLanguagePressHandler = (lang: ILanguage) => () => {
    setCurrentLanguage(lang);
    sheetRef?.current?.close();
  };

  const renderLanguageCard = getLanguageCardRenderer(getLanguagePressHandler);

  return (
    <ModalizeWrapper ref={sheetRef}>
      <View style={styles.container}>{languages?.map(renderLanguageCard)}</View>
    </ModalizeWrapper>
  );
};
