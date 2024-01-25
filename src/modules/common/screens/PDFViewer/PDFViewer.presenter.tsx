import React from 'react';
import { StyleSheet } from 'react-native';
import Pdf, { Source } from 'react-native-pdf';

import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'constants/DIMENSIONS';

interface Props {
  source: number | Source;
}

export const PDFViewerPresenter = ({ source }: Props) => (
  <Pdf source={source} style={styles.pdf} />
);

const styles = StyleSheet.create({
  pdf: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
});
