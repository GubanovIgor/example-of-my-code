import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import { styles } from './TabView.styles';
import { TabBar } from './components/TabBar';

interface Title {
  value: string;
  key: number;
}

interface Props {
  titles: Title[];
  scenes: { [key: number]: JSX.Element };
  contaninerStyles?: StyleProp<ViewStyle>;
  setSceneIndex: (index: number) => void;
  sceneIndex: number;
}

export const TabView = ({
  titles,
  scenes,
  contaninerStyles,
  setSceneIndex,
  sceneIndex,
}: Props) => {
  const renderScene = () => scenes[sceneIndex];

  return (
    <View style={[styles.container, contaninerStyles]}>
      <TabBar
        scenesAmount={Object.keys(scenes).length}
        titles={titles}
        sceneIndex={sceneIndex}
        setSceneIndex={setSceneIndex}
        scenes={scenes}
      />
      {renderScene()}
    </View>
  );
};
