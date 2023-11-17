import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Icon } from 'modsen-library';
import { styled } from 'styled-components';

export const CardContainer = styled(motion.div)`
  display: flex;
  width: 600px;
  height: 200px;
  flex-shrink: 0;
  border-radius: 18px;
  background: rgba(118, 118, 120, 0.9);
  align-items: center;

  @media (max-width: 650px) {
    width: 100%;
    height: 160px;
  }
  @media (max-width: 430px) {
    height: 200px;
  }
`;

export const StyledImage = styled.img`
  width: 145px;
  height: 200px;
  border-radius: 18px;
  box-shadow: 0 7px 7px 0 rgba(0, 0, 0, 0.25);
  cursor: pointer;

  @media (max-width: 650px) {
    width: 120px;
    height: 160px;
  }
`;

export const InfoBlock = styled.div`
  width: 100%;
  position: relative;
  padding: 16px 30px 0 20px;

  @media (max-width: 650px) {
    padding: 6px 14px 0 8px;
  }
`;

export const TitleBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const Title = styled.span`
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 26px;
  font-weight: 700;

  @media (max-width: 430px) {
    font-size: 22px;
    max-width: 140px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

export const Rating = styled.span`
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 23px;
  font-weight: 700;
  margin-right: 8px;
`;

export const AdditionalInfoBlock = styled.div`
  margin-top: 14px;

  @media (max-width: 650px) {
    margin-top: 0;
  }
`;

export const DateText = styled.span`
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 22px;
  font-weight: 300;
`;

export const TicketNumberBlock = styled.div`
  display: flex;
  align-items: center;
  height: 24px;
`;

export const TicketNumber = styled.span`
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  font-weight: 300;
  margin-left: 7px;
`;

export const Divider = styled.div`
  width: 364px;
  height: 2px;
  border-radius: 18px;
  background: #d9d9d9;
  margin-top: 12px;
  margin-bottom: 10px;

  @media (max-width: 650px) {
    width: 50%;
    margin-top: 6px;
    margin-bottom: 4px;
  }
`;

export const TicketSumContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SeatsNumber = styled.span`
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-weight: 300;
`;

export const Price = styled.span`
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  font-weight: 500;
`;

export const CancelButton = styled.button`
  position: absolute;
  right: 27px;
  bottom: 9px;
  color: #000;
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  font-weight: 300;
  width: 120px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  background: #d98639;
  border: none;
  cursor: pointer;
  transition: background 0.1s ease-in-out;

  &:hover {
    background: #bd6f28;
  }

  @media (max-width: 430px) {
    right: 10px;
  }
`;

export const CancelIcon = styled(Icon)`
  margin-left: 10px;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  height: 100%;
  display: flex;
  align-items: center;
`;
