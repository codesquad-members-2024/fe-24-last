import styled from 'styled-components';
import themes from '@/styles/themes';

const { BackgroudColor: defaultBackGroundColor, ShadowColor } = themes.Color;

interface CustomPopupImageProps {
  className?: string;
  BackgroudColor?: string;
  width?: number;
  height?: number;
  src: string;
}
interface StyledImgProps {
  $width: number;
  $height: number;
  $backgroudColor: string;
}

export default function CustomPopupImage({
  className,
  BackgroudColor = defaultBackGroundColor,
  width = 23,
  height = 23,
  src = '',
}: CustomPopupImageProps) {
  return <StyledImg className={className} $backgroudColor={BackgroudColor} $width={width} $height={height} src={src} />;
}

const StyledImg = styled.img<StyledImgProps>`
  display: block;
  object-fit: cover;
  border-radius: 4px;
  background: ${({ $backgroudColor }) => $backgroudColor};
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
  border: 1px solid ${ShadowColor};
`;
