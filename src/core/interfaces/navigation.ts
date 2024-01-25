import type { NavigatorScreenParams } from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { Item } from 'modules/common/screens/SelectorModal/SelectorModal.types';
import { DepositMethodItem_fragment$key } from 'queries/__generated__/DepositMethodItem_fragment.graphql';
import { GameTags } from 'queries/__generated__/CategoryScreenFilteredGamesQuery.graphql';
import { Source } from 'react-native-pdf';
import { ICategoryData } from 'components/CategoryItem/CategoryItem.component';

import { ISubCategory } from './subCategory';
import { PATHS } from '../../constants/PATHS';
import { HomeGameCard_fragment$data } from '../../queries/__generated__/HomeGameCard_fragment.graphql';
import { HandleSelectorItemProps } from './selectorModal';
import { PhoneOption } from './phoneOption';
import { CustomPickerValue } from './componentsTypes';

export type MainStackProp = StackNavigationProp<RootStackParamList>;

export type RootStackParamList = {
  [PATHS.SEARCH]: undefined;
  [PATHS.DATE_PICKER]: {
    currentValue?: string;
    onValueChange: (date: string) => void;
  };
  [PATHS.MENU_STACK]: undefined;
  [PATHS.HOME_STACK]: undefined;
  [PATHS.MY_GAMES]: undefined;
  [PATHS.CHANGE_PASSWORD]: undefined;
  [PATHS.SIGN_UP]: undefined;
  [PATHS.SIGN_IN]: undefined;
  [PATHS.RESET_PASSWORD]: { resetToken?: string };
  [PATHS.DEPOSIT_PAYMENT]: {
    paymentMethodRef: DepositMethodItem_fragment$key;
    paymentHandlerType: 'withdrawal' | 'deposit';
  };
  [PATHS.PROVIDER]: { providerName: string };
  [PATHS.PROVIDERS]: undefined;
  [PATHS.DEPOSIT_SUCCESS]: undefined;
  [PATHS.WITHDRAWAL_SUCCESS]: undefined;
  [PATHS.RESET_PASSWORD_SUCCESS]: undefined;
  [PATHS.PASSWORD_RECOVERY]: undefined;
  [PATHS.GAME_PREVIEW]: { game?: HomeGameCard_fragment$data };
  [PATHS.GAME_SESSION]: {
    game?: HomeGameCard_fragment$data;
    isPaidMode: boolean;
  };
  [PATHS.SIGN_UP_CONFIRMATION]: undefined;
  [PATHS.DRAWER]: NavigatorScreenParams<RootDrawerParamList>;
  [PATHS.SUB_CATEGORY]: { subCategoryData: ISubCategory };
  [PATHS.BALANCE_PAYMENT]: undefined;
  [PATHS.BALANCE]: undefined;
  [PATHS.VERIFICATION]: undefined;
  [PATHS.SELECTOR_MODAL]: {
    data: Item[];
    handleSelectorItem: (data: HandleSelectorItemProps) => void;
    selectorName: string;
  };
  [PATHS.CUSTOM_PICKER]: {
    showSearch?: boolean;
    data: CustomPickerValue[];
    handleSelectorItem: (data: CustomPickerValue) => void;
    itemsAlign?: 'default' | 'center';
    adjustToContentHeight?: boolean;
  };
  [PATHS.CATEGORY]: {
    categoryData: {
      tag?: GameTags | null;
      title?: string | null;
      id?: string;
      subCategories?:
        | readonly ({
            readonly id: string;
            readonly name: string | null;
          } | null)[]
        | null;
    };
  };
  [PATHS.WEB_VIEW]: {
    uri: string;
  };
  [PATHS.PDF_VIEWER]: {
    source: number | Source;
  };
  [PATHS.COUNTRY_CODE_PICKER]: {
    chosenValue?: PhoneOption | null;
    onValueChange: (value: PhoneOption) => void;
  };
};

export type HomeStackParamList = {
  [PATHS.HOME]: undefined;
  [PATHS.SUB_CATEGORY]: { subCategoryData: ISubCategory };
  [PATHS.CATEGORY]: { categoryData: ICategoryData };
  [PATHS.GAME_SESSION]: {
    game?: HomeGameCard_fragment$data;
    isPaidMode: boolean;
  };
  [PATHS.PROVIDER]: { providerName: string };
  [PATHS.PROVIDERS]: undefined;
  [PATHS.GAME_PREVIEW]: {
    game: HomeGameCard_fragment$data;
    isPaidMode: boolean;
  };
  [PATHS.MY_GAMES]: undefined;
  [PATHS.SUPPORT]: undefined;
  [PATHS.ABOUT_COMPANY]: undefined;
  [PATHS.TOURNAMENT]: undefined;
  [PATHS.FAQ]: undefined;
};

export type MenuStackParamList = {
  [PATHS.MENU]: undefined;
  [PATHS.SUPPORT]: undefined;
  [PATHS.ABOUT_COMPANY]: undefined;
  [PATHS.WINNINGS]: undefined;
  [PATHS.FAQ]: undefined;
  [PATHS.CHANGE_PASSWORD]: undefined;
  [PATHS.ABOUT]: undefined;
  [PATHS.TOURNAMENTS]: undefined;
  [PATHS.BONUSES]: undefined;
  [PATHS.RESPONISBLE_GAMING]: undefined;
  [PATHS.RESULTS]: undefined;
  [PATHS.BET_HISTORY]: undefined;
  [PATHS.PROFILE]: undefined;
  [PATHS.SUB_CATEGORY]: { subCategoryData: ISubCategory };
  [PATHS.CATEGORY]: { categoryData: ICategoryData };
  [PATHS.GAME_SESSION]: {
    game?: HomeGameCard_fragment$data;
    isPaidMode: boolean;
  };
  [PATHS.PROVIDER]: { providerName: string };
  [PATHS.PROVIDERS]: undefined;
  [PATHS.GAME_PREVIEW]: {
    game: HomeGameCard_fragment$data;
    isPaidMode: boolean;
  };
  [PATHS.TOURNAMENT]: undefined;
};

export type PersonalTabsStackParamList = {
  [PATHS.PERSONAL_TABS]: { tabIndex: number };
  [PATHS.CHANGE_PASSWORD]: undefined;
  [PATHS.PROVIDER]: { providerName: string };
  [PATHS.GAME_SESSION]: {
    game?: HomeGameCard_fragment$data;
    isPaidMode: boolean;
  };
};

export type RootDrawerParamList = {
  [PATHS.HOME_STACK]: undefined;
  [PATHS.PERSONAL_TABS_STACK]: { screen: string; options: any };
  [PATHS.TOURNAMENTS]: undefined;
  [PATHS.JACKPOT]: undefined;
  [PATHS.PROMOTIONS]: undefined;
  [PATHS.BALANCE]: undefined;
  [PATHS.WINNINGS]: undefined;
  [PATHS.TRANSACTION_HISTORY]: undefined;
  [PATHS.PERSONAL_TABS]: undefined;
  [PATHS.BONUSES]: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export type PersonalTabsStackScreenProps<
  T extends keyof PersonalTabsStackParamList,
> = StackScreenProps<PersonalTabsStackParamList, T>;
