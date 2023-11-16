import { motion } from 'framer-motion';
import { Icon } from 'modsen-library';
import { styled } from 'styled-components';

export const Wrapper = styled(motion.div)`
  position: absolute;
  width: 600px;
  height: 100%;
  flex-shrink: 0;
  background: ${(props) => props.theme.profileMenuBgColor};
  top: 0;
  right: 0;
  z-index: 15;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding-top: 70px;
  padding-bottom: 40px;
  transition: background 1.3s ease-in-out;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const BackArrowIcon = styled(Icon)`
  position: absolute;
  left: 65px;
  top: 80px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateX(5px);
    opacity: 0.5;
  }

  @media (max-width: 500px) {
    position: static;
  }
`;

export const ProfileTitle = styled.span`
  color: ${(props) => props.theme.color};
  font-family: 'Poppins', sans-serif;
  font-size: 40px;
  font-weight: 300;
`;

export const ProfileInfoContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AvatarIcon = styled(Icon)`
  margin-top: 80px;
`;

export const UserDetailsBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
  gap: 10px;
`;

export const UserNameText = styled.span`
  color: ${(props) => props.theme.color};
  font-family: 'Poppins', sans-serif;
  font-size: 36px;
  font-weight: 600;
`;

export const UserIdText = styled.span`
  color: ${(props) => props.theme.color};
  font-family: 'Poppins', sans-serif;
  font-size: 26px;
  font-weight: 600;
`;

export const GenderText = styled.span`
  color: ${(props) => props.theme.color};
  font-family: 'Poppins', sans-serif;
  font-size: 26px;
  font-weight: 600;
`;

export const ActionBlock = styled.div`
  margin-top: 40px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 45px;
`;

export const ActionText = styled.span`
  color: ${(props) => props.theme.color};
  font-family: 'Poppins', sans-serif;
  font-size: 36px;
  font-weight: 600;
  text-decoration-line: underline;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;
  text-align: center;

  &:hover {
    opacity: 0.5;
  }
`;

export const AvatarContainer = styled.div`
  margin-top: 80px;
  width: 250px;
  height: 250px;
  border-radius: 999px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AvatarImage = styled.img`
  width: 100%;
`;
