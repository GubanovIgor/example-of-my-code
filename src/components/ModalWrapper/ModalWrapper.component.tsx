import React, { ReactNode } from 'react';
import { ScrollView } from 'react-native';

import { DragTopToBottomLine } from '../DragTopToBottomLine';
import { SubHeader } from '..';

type Props = {
  children: ReactNode;
  title?: string | null;
  isBackButton?: boolean;
  needScrollView?: boolean;
};

const renderContent = (needScrollView: boolean, children: ReactNode) =>
  needScrollView ? (
    <ScrollView
      scrollEnabled={needScrollView}
      keyboardShouldPersistTaps="always"
    >
      {children}
    </ScrollView>
  ) : (
    children
  );

export const ModalWrapper = ({
  children,
  title,
  isBackButton,
  needScrollView = true,
}: Props) => (
  <>
    <DragTopToBottomLine />
    <SubHeader
      shouldUseInsets={false}
      title={title}
      isBackButton={isBackButton}
    />
    {renderContent(needScrollView, children)}
  </>
);
