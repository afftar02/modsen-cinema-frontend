import ErrorBoundary from 'components/ErrorBoundary';
import ErrorFallback from 'components/ErrorFallback';
import { styled, useTheme } from 'styled-components';
import { useCallback, useState } from 'react';
import { THEMES } from 'constants/Themes';
import ModalPortal from 'components/ModalPortal';
import { motion } from 'framer-motion';
import { changeTheme } from 'redux/slices/ThemeSlice';
import { selectThemeValue } from 'redux/selectors/theme';
import CloseIcon from 'components/CloseIcon';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from 'constants/Languages';
import { Button, RadioButton } from 'modsen-library';

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
  transition: background-color 1s ease-in-out;
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
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const currentTheme = useAppSelector(selectThemeValue);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const [selectedTheme, setSelectedTheme] = useState(currentTheme);

  const dispatch = useAppDispatch();

  const applySettings = useCallback(async () => {
    if (currentTheme !== selectedTheme) {
      dispatch(changeTheme(selectedTheme));
    }
    if (i18n.language !== selectedLanguage) {
      await i18n.changeLanguage(selectedLanguage);
      localStorage.setItem('language', selectedLanguage);
    }
    onClose();
  }, [currentTheme, dispatch, i18n, onClose, selectedLanguage, selectedTheme]);

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
            <span>{t('settings_title')}</span>
          </TextBlock>
          <SettingsItems>
            <SettingsItemBlock>
              <SettingsItemTitle>{t('language_title')}</SettingsItemTitle>
              <SettingsItemValues>
                {LANGUAGES.map((item, index) => (
                  <RadioButton
                    key={index}
                    id={item}
                    name={'language'}
                    value={item}
                    text={t(item)}
                    checked={selectedLanguage === item}
                    checkedColor={'#d98639'}
                    buttonBgColor={theme.buttonBgColor}
                    textColor={theme.color}
                    onClick={() => setSelectedLanguage(item)}
                  />
                ))}
              </SettingsItemValues>
            </SettingsItemBlock>
            <SettingsItemBlock>
              <SettingsItemTitle>{t('theme_title')}</SettingsItemTitle>
              <SettingsItemValues>
                {Object.values(THEMES).map((item, index) => (
                  <RadioButton
                    key={index}
                    id={item.value}
                    name={'theme'}
                    value={item.value}
                    text={t(`${item.value.toLowerCase()}_theme`)}
                    checked={selectedTheme === item.value}
                    checkedColor={'#d98639'}
                    buttonBgColor={theme.buttonBgColor}
                    textColor={theme.color}
                    onClick={() => setSelectedTheme(item.value)}
                  />
                ))}
              </SettingsItemValues>
            </SettingsItemBlock>
          </SettingsItems>
          <ApplyButton onClick={applySettings}>{t('apply_text')}</ApplyButton>
        </ErrorBoundary>
      </Modal>
    </ModalPortal>
  );
}

export default SettingsModal;
