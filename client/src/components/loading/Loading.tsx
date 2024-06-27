import styled from 'styled-components';
import loading from '@/assets/images/loading.gif';

export default function Loading() {
  return (
    <BlurBackground>
      <LoadingImage src={loading} />
    </BlurBackground>
  );
}

const BlurBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: white;
  opacity: 0.9;
  z-index: 10;
`;

const LoadingImage = styled.img`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 11;
`;
