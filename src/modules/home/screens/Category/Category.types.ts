import { GetTranslationValue } from 'core/interfaces';
import { ISubCategory } from 'core/interfaces/subCategory';
import { CategoryScreenFilteredGamesQuery$data } from 'queries/__generated__/CategoryScreenFilteredGamesQuery.graphql';
import { HomeGameCard_fragment$data } from 'queries/__generated__/HomeGameCard_fragment.graphql';
import { UseFormReturn } from 'react-hook-form';

export interface CategoryPresenterProps {
  title: string | null;
  formMethods: UseFormReturn<{ filter: string; sorting: string }, any>;
  handlerBackButton: () => void;
  gamesData: CategoryScreenFilteredGamesQuery$data;
  handlePressGameCard?: (data?: HomeGameCard_fragment$data) => void;
  handlePressSubCategory: (data: ISubCategory) => void;
  openSelectorModal?: () => void;
  openSortingTypeSelector: () => void;
  openProviderSelector: () => void;
  t: GetTranslationValue;
  filters: {
    [key: string]: string;
  };
  subCategoriesData?:
    | readonly ({
        readonly id: string;
        readonly name: string | null;
      } | null)[]
    | null;
}
