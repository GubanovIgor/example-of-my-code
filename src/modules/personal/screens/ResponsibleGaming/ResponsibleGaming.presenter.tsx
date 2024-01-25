import { CollapsibleCard } from 'components/CollapsibleCard';
import { SubHeader } from 'components/SubHeader';
import { GUTTER_SIZE } from 'config/theme';
import { LockDurationEnum } from 'core/enums/selfLimits';
import { LimitType } from 'queries/__generated__/ResponsibleGamingLimitsMutation.graphql';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { LockUntilBlock, DeleteAccountBlock, LimitBlock } from './components';
import { styles } from './ResponsibleGaming.styles';
import { SelfLimits } from './ResponsibleGaming.types';

interface Props {
  userFirstName?: string | null;
  currencySymbol: string | null;
  isSavingMaxLimit: boolean;
  isLockingUser: boolean;
  isSaveTrioLimitsLoading: boolean;
  selfLimits?: SelfLimits;
  onSaveLimits: (data: any, type?: LimitType) => void;
  onPressLock: (value: LockDurationEnum) => void;
}
export const ResponsibleGamingPresenter: FC<Props> = ({
  currencySymbol,
  isSavingMaxLimit,
  isSaveTrioLimitsLoading,
  isLockingUser,
  selfLimits,
  userFirstName,
  onPressLock,
  onSaveLimits,
}) => {
  const { t } = useTranslation();
  const { bottom } = useSafeAreaInsets();

  return (
    <>
      <SubHeader isBackButton title={t('RESPONSIBLE_GAMING')} />
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { paddingBottom: bottom + GUTTER_SIZE * 3 },
        ]}
      >
        <CollapsibleCard
          border="top"
          renderCollapsible={
            <LimitBlock
              isLoading={isSaveTrioLimitsLoading}
              currencySymbol={currencySymbol}
              type="STAKE"
              onSaveLimits={onSaveLimits}
              limits={selfLimits?.stakeLimits}
            />
          }
          title={t('STAKE_LIMITS.TITLE')}
          description={t('STAKE_LIMITS.DESC')}
        />
        <CollapsibleCard
          renderCollapsible={
            <LimitBlock
              isLoading={isSaveTrioLimitsLoading}
              currencySymbol={currencySymbol}
              type="LOSS"
              onSaveLimits={onSaveLimits}
              limits={selfLimits?.lossLimits}
            />
          }
          title={t('LOSS_LIMITS.TITLE')}
          description={t('STAKE_LIMITS.DESC')}
        />
        <CollapsibleCard
          renderCollapsible={
            <LimitBlock
              isLoading={isSaveTrioLimitsLoading}
              currencySymbol={currencySymbol}
              type="DEPOSIT"
              onSaveLimits={onSaveLimits}
              limits={selfLimits?.depositLimits}
            />
          }
          title={t('DEPOSIT_LIMITS.TITLE')}
          description={t('DEPOSIT_LIMITS.DESC')}
        />
        <CollapsibleCard
          renderCollapsible={
            <LimitBlock
              isLoading={isSavingMaxLimit}
              maxSessionTime={selfLimits?.maxSessionTimeLimit}
              onSaveLimits={onSaveLimits}
            />
          }
          title={t('MAX_SESSION_TIME_LIMIT')}
        />
        <CollapsibleCard
          renderCollapsible={
            <LockUntilBlock
              isLoading={isLockingUser}
              firstName={userFirstName}
              onPressLock={onPressLock}
            />
          }
          title={t('LOCK_UNTILL_FUNCTION.TITLE')}
        />
        <CollapsibleCard
          border="bottom"
          renderCollapsible={
            <DeleteAccountBlock
              isLoading={isLockingUser}
              onPressLock={onPressLock}
            />
          }
          title={t('LOCK_INDEFINETELY_FUNCTION.TITLE')}
        />
      </ScrollView>
    </>
  );
};
