import { DOCUMENTS_URL } from 'constants/URLS';

import { IDoc } from './Documents.types';

const TERMS_PATH = 'TermsOfService.pdf';
const RESPONSIBILITY_PATH = 'ResponsibleGaming.pdf';
const PRIVACY_MANAGEMENT_PATH = 'PrivacyPersonalData.pdf';
const SELF_EXCLUSION_PATH = 'SelfExclusion.pdf';
const AML_POLICY_PATH = 'AntiMoneyLaundry.pdf';
const KYC_PATH = 'KYC.pdf';
const PAYOUTS_BONUSES_PATH = 'PayoutsBonuses.pdf';
const DISPUTE_RESOLUTION_PATH = 'DisputeResolution.pdf';
const FAIRNESS_PATH = 'Fairness.pdf';

const getDocUrlWithLang = (path: string, lang: string) =>
  `${DOCUMENTS_URL}${lang}/${path}`;

export const getDocs = (lang: string): IDoc[] => [
  {
    titleKey: 'TERMS_AND_CONDITIONS',
    link: getDocUrlWithLang(TERMS_PATH, lang),
  },
  {
    titleKey: 'RESPONSIBILITY',
    link: getDocUrlWithLang(RESPONSIBILITY_PATH, lang),
  },
  {
    titleKey: 'PRIVACY_AND_MANAGEMENT_OF_PERSONAL_DATA',
    link: getDocUrlWithLang(PRIVACY_MANAGEMENT_PATH, lang),
  },
  {
    titleKey: 'SELF_EXCLUSION',
    link: getDocUrlWithLang(SELF_EXCLUSION_PATH, lang),
  },
  { titleKey: 'AML_POLICY', link: getDocUrlWithLang(AML_POLICY_PATH, lang) },
  { titleKey: 'KYC_AML_PROCEDURES', link: getDocUrlWithLang(KYC_PATH, lang) },
  {
    titleKey: 'ACCOUNT_PAY_OUTS_BONUSES',
    link: getDocUrlWithLang(PAYOUTS_BONUSES_PATH, lang),
  },
  {
    titleKey: 'DISPUTE_RESOLUTION',
    link: getDocUrlWithLang(DISPUTE_RESOLUTION_PATH, lang),
  },
  {
    titleKey: 'FAIRNESS_TESTING_METHODS',
    link: getDocUrlWithLang(FAIRNESS_PATH, lang),
  },
];
