/**
 * @format
 */

import { Federated, Script, ScriptManager } from '@callstack/repack/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppRegistry, Platform } from 'react-native';
import getContainersURL from '../catalog-server/utils/getContainersURL';
import { name as appName } from './app.json';
import { version as appVersion } from './package.json';
import App from './src/App';

!__DEV__ && ScriptManager.shared.setStorage(AsyncStorage);

ScriptManager.shared.addResolver(async (scriptId, caller) => {
  const containersURL = getContainersURL({
    hostname: process.env.SAS_CATALOG_SERVER_URL,
    version: appVersion,
    platform: Platform.OS,
    appName,
  });
  // console.log('containersURL', containersURL);
  // const containersResponse = await fetch(containersURL);
  // setTimeout(() => {
  //   console.log('hen hen now');
  // }, 5000);
  // const containers = await containersResponse.json();
  // console.log('heheheheh', containers);
  const RealContainers = {
    auth: 'https://github.com/vlack-coder/repacbundle/releases/download/repack/[name][ext]',
    booking:
      'https://github.com/vlack-coder/repacbundle/releases/download/booking/[name][ext]',
    dashboard:
      'https://github.com/vlack-coder/repacbundle/releases/download/dashboard/[name][ext]',
    news: 'https://github.com/vlack-coder/repacbundle/releases/download/news/[name][ext]',
    shopping:
      'https://github.com/vlack-coder/repacbundle/releases/download/shopping/[name][ext]',
  };
  const resolveURL = Federated.createURLResolver({
    containers: RealContainers,
    // containers,
  });

  let url;
  if (false) {
    // if (__DEV__ && caller === 'main') {
    url = Script.getDevServerURL(scriptId);
  } else {
    console.log('hahahhahahahah');
    url = resolveURL(scriptId, caller);
  }
  console.log('repackurl', url);

  if (!url) {
    return undefined;
  }

  return {
    url,
    cache: !__DEV__,
    query: {
      platform: Platform.OS, // only needed in development
    },
    // verifyScriptSignature: __DEV__ ? 'off' : 'strict',
  };
});

AppRegistry.registerComponent(appName, () => App);
