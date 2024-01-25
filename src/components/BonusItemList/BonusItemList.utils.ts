import { BonusItemList_fragment$data } from 'queries/__generated__/BonusItemList_fragment.graphql';

export const filterBonuses = (
  isActive: boolean,
  data: BonusItemList_fragment$data,
) => {
  if (!data?.bonusesCursor?.edges) {
    return [];
  }

  return data?.bonusesCursor?.edges.filter(
    (bonus) => bonus.node.active === isActive,
  );
};
