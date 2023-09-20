import { styled } from 'styled-components';
import Icon from '../Icon';
import Button from '../Button';
import Navigation from '../Navigation';
import { Link } from 'react-router-dom';

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 65px 85px 0;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const StyledContainer = styled.div`
  margin-right: 60px;
`;

const StyledIcon = styled(Icon)`
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const SignInButton = styled(Button)`
  background: #ffffff;
  color: #000000;

  margin-left: 30px;
`;

function Header() {
  return (
    <StyledHeader>
      <Flex>
        <Icon id="logo" width={245} height={55} />
        <Navigation />
      </Flex>
      <Flex>
        <StyledContainer>
          <Link to={'/signup'}>
            <Button>Sign up</Button>
          </Link>
          <Link to={'/signin'}>
            <SignInButton>Sign in</SignInButton>
          </Link>
        </StyledContainer>
        <StyledIcon id="settings" width={48} height={48} />
      </Flex>
    </StyledHeader>
  );
}

export default Header;
