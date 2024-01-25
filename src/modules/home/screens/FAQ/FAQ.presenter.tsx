import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { TEXT_VARIANTS } from 'config/theme';
import { useTranslation } from 'react-i18next';
import { CollapsibleCard } from 'components/CollapsibleCard';
import { GetTranslationValue } from 'core/interfaces';
import { SubHeader } from 'components/SubHeader';

import { styles } from './FAQ.styles';

interface Props {
  title: string;
}

interface FaqType {
  TITLE: string;
  QUESTIONS: Array<{
    Q: string;
    A: string;
  }>;
}

const getQuestionRenderer =
  (t: GetTranslationValue) => (question: { Q: string; A: string }) =>
    (
      <CollapsibleCard
        key={question.Q}
        title={t(question.Q)}
        renderCollapsible={
          <Text style={TEXT_VARIANTS.font14}>{t(question.A)}</Text>
        }
        containerStyleProp={styles.collapsibleCardContainer}
        border="bottom"
      />
    );

const getSectionRenderer = (t: GetTranslationValue) => (section: FaqType) => {
  const renderQuestion = getQuestionRenderer(t);

  return (
    <View style={styles.section} key={section.TITLE}>
      <Text style={[TEXT_VARIANTS.font24Bold, styles.sectionTitle]}>
        {t(section.TITLE)}
      </Text>
      {section.QUESTIONS.map(renderQuestion)}
    </View>
  );
};

export const FAQPresenter = ({ title }: Props) => {
  const { t } = useTranslation();
  const faqList: FaqType[] = t('FAQ', { returnObjects: true });

  const renderSection = getSectionRenderer(t);

  return (
    <>
      <SubHeader title={title} isBackButton shouldUseInsets />

      <ScrollView contentContainerStyle={styles.container}>
        {faqList.map(renderSection)}
      </ScrollView>
    </>
  );
};
