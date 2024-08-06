const getContainersURL = ({
  hostname = 'http://localhost:3000',
  appName,
  version,
  platform,
}) => {
  console.log('hostname', hostname)
  console.log('appName', appName)
  console.log('version', version)
  console.log('platform', platform)
  return `${hostname}/${appName}?platform=${platform}&appVersion=${version}`;
};

export default getContainersURL;
