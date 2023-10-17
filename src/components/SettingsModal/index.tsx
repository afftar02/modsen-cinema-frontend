import ErrorBoundary from 'components/ErrorBoundary';
import ErrorFallback from 'components/ErrorFallback';
import { styled } from 'styled-components';
import Button from 'components/Button';
import RadioButton from 'components/RadioButton';
import { useCallback, useState } from 'react';
import { LANGUAGES } from 'constants/Languages';
import { THEMES } from 'constants/Themes';
import ModalPortal from 'components/ModalPortal';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from 'redux/slices/ThemeSlice';
import { selectThemeValue } from 'redux/selectors/theme';
import CloseIcon from 'components/CloseIcon';

type SettingsModalProps = {
  onClose: () => void;
};

const Modal = styled(motion.div)`
  position: relative;
  width: 840px;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.bgColor};
  padding: 40px 107px;
`;

const TextBlock = styled.div`
  width: 430px;
  height: 123px;

  color: ${(props) => props.theme.color};
  text-shadow: 10px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: 'Inria Sans', sans-serif;
  font-size: 32px;
  font-style: italic;
  font-weight: 300;
`;

const ApplyButton = styled(Button)`
  width: 100%;
  margin-top: 80px;
`;

const SettingsItems = styled.div`
  display: flex;
  justify-content: space-around;
  flex-grow: 1;
  align-items: center;
`;

const SettingsItemBlock = styled.div`
  display: flex;
`;

const SettingsItemTitle = styled.span`
  color: ${(props) => props.theme.color};
  font-family: 'Poppins', sans-serif;
  font-size: 24px;
  font-weight: 300;
`;

const SettingsItemValues = styled.div`
  margin-left: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 5px;
`;

function SettingsModal({ onClose }: SettingsModalProps) {
  const currentTheme = useSelector(selectThemeValue);
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0].value);
  const [selectedTheme, setSelectedTheme] = useState(currentTheme);

  const dispatch = useDispatch();

  const applySettings = useCallback(() => {
    if (currentTheme !== selectedTheme) {
      dispatch(changeTheme(selectedTheme));
    }
    onClose();
  }, [currentTheme, dispatch, onClose, selectedTheme]);

  return (
    <ModalPortal isFixed>
      <Modal
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{
          duration: 0.3,
        }}
      >
        <CloseIcon onClick={onClose} />
        <ErrorBoundary fallback={<ErrorFallback />}>
          <TextBlock>
            <span>Choose settings:</span>
          </TextBlock>
          <SettingsItems>
            <SettingsItemBlock>
              <SettingsItemTitle>Language:</SettingsItemTitle>
              <SettingsItemValues>
                {LANGUAGES.map((language, index) => (
                  <RadioButton
                    key={index}
                    id={language.value}
                    name={'language'}
                    value={language.value}
                    text={language.description}
                    checked={selectedLanguage === language.value}
                    onClick={() => setSelectedLanguage(language.value)}
                  />
                ))}
              </SettingsItemValues>
            </SettingsItemBlock>
            <SettingsItemBlock>
              <SettingsItemTitle>Theme:</SettingsItemTitle>
              <SettingsItemValues>
                {Object.values(THEMES).map((theme, index) => (
                  <RadioButton
                    key={index}
                    id={theme.value}
                    name={'theme'}
                    value={theme.value}
                    text={theme.value}
                    checked={selectedTheme === theme.value}
                    onClick={() => setSelectedTheme(theme.value)}
                  />
                ))}
              </SettingsItemValues>
            </SettingsItemBlock>
          </SettingsItems>
          <ApplyButton onClick={applySettings}>Apply</ApplyButton>
        </ErrorBoundary>
      </Modal>
    </ModalPortal>
  );
}

export default SettingsModal;
