import React from 'react';
import PersonalInformationIcon from 'assets/icons/personalInformation.svg';
import BalanceIcon from 'assets/icons/balance.svg';
import BonusesIcon from 'assets/icons/bonuses.svg';
import MyWinningsIcon from 'assets/icons/myWinnings.svg';
// import PromotionsIcon from 'assets/icons/promotions.svg';
// import JackpotIcon from 'assets/icons/jackpot.svg';
import TournamentIcon from 'assets/icons/tournament.svg';
import BetHistoryIcon from 'assets/icons/betHistory.svg';
import ResultsIcon from 'assets/icons/results.svg';
import ResponsibleGamingIcon from 'assets/icons/warning.svg';
import AboutIcon from 'assets/icons/info.svg';
import { GetTranslationValue } from 'core/interfaces';

import { PATHS } from 'constants/PATHS';

export const getSignedInStateDrawerItems = (t: GetTranslationValue) => [
  {
    title: t('PROFILE'),
    name: PATHS.PROFILE,
    icon: () => <PersonalInformationIcon width={22} height={22} />,
  },
  {
    title: t('BALANCE'),
    name: PATHS.BALANCE,
    icon: () => <BalanceIcon width={22} height={22} />,
  },
  {
    title: t('BET_HISTORY'),
    name: PATHS.BET_HISTORY,
    icon: () => <BetHistoryIcon width={22} height={22} />,
  },

  {
    title: t('HEADER.BONUSES'),
    name: PATHS.BONUSES,
    icon: () => <BonusesIcon width={22} height={22} />,
  },
  {
    title: t('RESULTS.HEADER'),
    name: PATHS.RESULTS,
    icon: () => <ResultsIcon width={22} height={22} />,
  },
  {
    title: t('RESPONSIBLE_GAMING'),
    name: PATHS.RESPONISBLE_GAMING,
    icon: () => <ResponsibleGamingIcon width={22} height={22} />,
  },
  {
    title: t('MY_WINNINGS'),
    name: PATHS.WINNINGS,
    icon: () => <MyWinningsIcon width={22} height={22} />,
  },
];

export const getSignedOutStateDrawerItems = (t: GetTranslationValue) => [
  {
    title: t('HEADER.TOURNAMENTS'),
    name: PATHS.TOURNAMENTS,
    icon: () => <TournamentIcon width={22} height={22} />,
  },
  {
    title: t('ABOUT'),
    name: PATHS.ABOUT,
    icon: () => <AboutIcon width={22} height={22} />,
  },
  // {
  //   title: t('HEADER.JACKPOT'),
  //   name: PATHS.JACKPOT,
  //   icon: () => (
  //     <JackpotIcon width={18} height={18} fill={COLORS.DRAWER_ICON} />
  //   ),
  // },
  // {
  //   title: t('HEADER.PROMOTIONS'),
  //   name: PATHS.PROMOTIONS,
  //   icon: () => (
  //     <PromotionsIcon width={20} height={20} fill={COLORS.DRAWER_ICON} />
  //   ),
  // },
];
