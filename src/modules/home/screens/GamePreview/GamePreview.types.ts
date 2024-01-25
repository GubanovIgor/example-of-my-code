import { GetTranslationValue, VoidFunction } from 'core/interfaces';

import { HomeGameCard_fragment$data } from '../../../../queries/__generated__/HomeGameCard_fragment.graphql';

export interface GamePreviewPresenterProps {
  game?: HomeGameCard_fragment$data;
  handlePressGoToSession: (isDemo?: boolean) => () => void;
  handlePressLike: () => void;
  handlePressProvider: VoidFunction;
  isLiked: boolean;
  t: GetTranslationValue;
}
