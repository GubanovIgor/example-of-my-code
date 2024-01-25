import React, { FC } from 'react';
import { TextField } from 'components/TextField';
import { TEXT_VARIANTS } from 'config/theme';
import { ScrollView, Text, View } from 'react-native';
import { useFragment } from 'react-relay';
import { ActionRow } from 'components/ActionRow';
import { DefaultCard } from 'components/DefaultCard';
import { Trans, useTranslation } from 'react-i18next';
import { SubHeader } from 'components/SubHeader';

import { ProfileFragment } from './Profile.queries';
import { styles } from './Profile.styles';
import { ProfilePresenterProps } from './Profile.types';
import { getNormalizedUserProfile } from './Profile.helpers';

export const ProfilePresenter: FC<ProfilePresenterProps> = ({
  personalInformationRef,
  onPressSupport,
  onPressChangePasword,
  onPressVerification,
}) => {
  const { t } = useTranslation();

  const userProfileData = useFragment(ProfileFragment, personalInformationRef);

  const {
    id,
    birthday,
    firstName,
    lastName,
    email,
    phoneNumber,
    streetAddress,
  } = getNormalizedUserProfile(userProfileData);

  return (
    <>
      <SubHeader title={t('PROFILE')} isBackButton />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.previewInfoContainer}>
          <TextField label="ID" value={id} />
          <TextField label={t('BIRTHDAY')} value={birthday} />
          <TextField label={t('FIRST_NAME')} value={firstName} />
          <TextField label={t('LAST_NAME')} value={lastName} />
          <TextField label={t('PHONE.FIELD')} value={phoneNumber} />
          <TextField label={t('EMAIL')} value={email} />
          <TextField label={t('ADDRESS')} value={streetAddress} />
        </View>
        <DefaultCard
          content={
            <Text style={[TEXT_VARIANTS.font12, styles.supportText]}>
              <Trans
                i18nKey="CONTACT_SUPPORT"
                t={t}
                components={[
                  <Text
                    onPress={onPressSupport}
                    key="0"
                    style={styles.supportTextActive}
                  />,
                ]}
                values={{ firstName }}
              />
            </Text>
          }
        />
        <ActionRow
          title={t('CHANGE_PASSWORD')}
          onPress={onPressChangePasword}
        />
        <ActionRow
          title={t('VERIFICATION')}
          onPress={onPressVerification}
          hasSeparator={false}
          description={t('VERIFY_ACCOUNT_INFO') || ''}
        />
      </ScrollView>
    </>
  );
};
