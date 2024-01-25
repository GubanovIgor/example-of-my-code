import React from 'react';
import { ScrollView } from 'react-native';
import { GetTranslationValue } from 'core/interfaces';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LeaderBoard } from 'components/LeaderBoard';
import { SubHeader } from 'components/SubHeader';

import { styles } from './Tournament.styles';
import { TournamentView } from './subComponents/TournamentView';
import { AboutTournamentText } from './subComponents/AboutTournamentText';
import { TournamentRules } from './subComponents/TournamentRules';

interface Props {
  t: GetTranslationValue;
}

export const TournamentPresenter = ({ t }: Props) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <>
      <SubHeader isBackButton shouldUseInsets title={t('HEADER.TOURNAMENTS')} />
      <ScrollView
        contentContainerStyle={[styles.container, { paddingBottom: bottom }]}
      >
        <TournamentView />
        <LeaderBoard />
        <AboutTournamentText />
        <TournamentRules />
      </ScrollView>
    </>
  );
};
