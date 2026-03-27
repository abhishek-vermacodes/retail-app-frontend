import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;
const scaleSize = (size: any) => (width / BASE_WIDTH) * size;
const VerticalScaleSize = (size: any) => (height / BASE_HEIGHT) * size;
const responsiveFontSize = (size: any) => {
  const scaleFactor = Math.min(width / BASE_WIDTH, height / BASE_HEIGHT);
  return Math.round(size * scaleFactor);
};
export const responsive = {
  width: (size: number) => scaleSize(size),
  height: (size: number) => VerticalScaleSize(size),
  fontSize: (size: number) => responsiveFontSize(size),

  // spacing
  margin: (size: number) => scaleSize(size),
  marginVertical: (size: number) => VerticalScaleSize(size),
  marginHorizontal: (size: number) => scaleSize(size),
  padding: (size: number) => scaleSize(size),
  paddingVertical: (size: number) => VerticalScaleSize(size),
  paddingHorizontal: (size: number) => scaleSize(size),

  // positioning
  top: (size: number) => VerticalScaleSize(size),
  bottom: (size: number) => VerticalScaleSize(size),
  left: (size: number) => scaleSize(size),
  right: (size: number) => scaleSize(size),
  gap: (size: number) => scaleSize(size),
};
