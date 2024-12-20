import { getDefaultConfig } from 'expo/metro-config';
import { withNativeWind } from 'nativewind/metro';
  
const config = getDefaultConfig(_dirname);
  
export default withNativeWind(config, { input: './global.css' });