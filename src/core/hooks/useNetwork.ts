import { useNetInfo } from '@react-native-community/netinfo';
import { showToast } from 'core/utils';
import { useEffect, useState } from 'react';

export const useNetwork = () => {
  const [isConnected, setIsConnected] = useState(true);

  const netInfo = useNetInfo();

  useEffect(() => {
    if (!isConnected && netInfo?.isConnected) return setIsConnected(true);

    //This check should be for false only
    if (
      netInfo?.isConnected === false &&
      isConnected !== netInfo?.isConnected
    ) {
      setIsConnected(false);
      showToast('No internet connection.');
    }
  }, [isConnected, netInfo]);

  return;
};
