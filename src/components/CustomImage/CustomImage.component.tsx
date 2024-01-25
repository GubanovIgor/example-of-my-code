import React, { FC, memo, useEffect, useState } from 'react';
import { StyleProp } from 'react-native';
import QuestionIcon from 'assets/icons/question.svg';
import FastImage, { ImageStyle } from 'react-native-fast-image';
import { SvgUri } from 'react-native-svg';

interface Props {
  url?: string | null;
  shouldReplacePng?: boolean;
  imageStyles?: StyleProp<ImageStyle>;
  width?: string | number;
  shouldCheckForValidSvg?: boolean;
  height?: string | number;
  color?: string;
}

export const CustomImage: FC<Props> = memo(
  ({
    url,
    width,
    height,
    color,
    shouldCheckForValidSvg = false,
    shouldReplacePng,
    imageStyles,
  }) => {
    const [renderAsSvgUri, setRenderAsSvgUri] = useState(false);

    const fetchImg = async () => {
      if (!url) return;

      try {
        const res = await fetch(url);
        const svgRes = await res?.text();

        if (!svgRes.includes('<svg')) return;

        setRenderAsSvgUri(true);
      } catch (error) {}
    };

    useEffect(() => {
      if (!shouldCheckForValidSvg) return;

      fetchImg();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shouldCheckForValidSvg]);

    if (!url || (url?.includes('.png') && shouldReplacePng))
      return <QuestionIcon />;

    return url.includes('.svg') || renderAsSvgUri ? (
      <SvgUri width={width} height={height} uri={url} color={color} />
    ) : (
      <FastImage source={{ uri: url }} style={imageStyles} />
    );
  },
);
