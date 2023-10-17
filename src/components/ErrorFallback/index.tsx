import { styled } from 'styled-components';

const FallbackContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-grow: 1;
`;

const FallbackText = styled.span`
  color: ${(props) => props.theme.color};
  font-family: 'Inria Sans', sans-serif;
  font-size: 32px;
  font-weight: 300;
`;

function ErrorFallback() {
  return (
    <FallbackContainer>
      <FallbackText>Oops... Something went wrong!😢</FallbackText>
    </FallbackContainer>
  );
}

export default ErrorFallback;
