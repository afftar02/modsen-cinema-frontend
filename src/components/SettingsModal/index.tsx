import { memo, useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from 'constants/languages';
import { THEMES } from 'constants/themes';
import { useClickOutside } from 'hooks/useClickOutside';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectThemeValue } from 'redux/selectors/theme';
import { changeTheme } from 'redux/slices/ThemeSlice';
import { useTheme } from 'styled-components';

import CloseIcon from 'components/CloseIcon';
import ErrorBoundary from 'components/ErrorBoundary';
import ErrorFallback from 'components/ErrorFallback';
import ModalPortal from 'components/ModalPortal';
import RadioButton from 'components/RadioButton';

import {
  ApplyButton,
  Modal,
  SettingsItemBlock,
  SettingsItems,
  SettingsItemTitle,
  SettingsItemValues,
  TextBlock,
} from './styled';
import { SettingsModalProps } from './types';

function SettingsModal({ onClose }: SettingsModalProps) {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const currentTheme = useAppSelector(selectThemeValue);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const [selectedTheme, setSelectedTheme] = useState(currentTheme);
  const modalRef = useRef(null);

  const dispatch = useAppDispatch();

  useClickOutside(modalRef, onClose);

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
        ref={modalRef}
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
                    checkedColor={theme.radioCheckedColor}
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
                    checkedColor={theme.radioCheckedColor}
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

export default memo(SettingsModal);
