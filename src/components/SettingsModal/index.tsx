import ErrorBoundary from 'components/ErrorBoundary';
import ErrorFallback from 'components/ErrorFallback';
import { styled } from 'styled-components';
import Icon from 'components/Icon';
import Button from 'components/Button';
import RadioButton from 'components/RadioButton';
import { useState } from 'react';
import { LANGUAGES } from 'constants/Languages';
import { THEMES } from 'constants/Themes';

type SettingsModalProps = {
  onClose: () => void;
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  background-color: rgba(30, 31, 39, 0.7);
  z-index: 30;
`;

const Modal = styled.div`
  position: relative;
  width: 840px;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  background-color: #1e1f27;
  padding: 40px 107px;
`;

const CloseIcon = styled(Icon)`
  position: absolute;
  top: 40px;
  right: 50px;
  cursor: pointer;
  opacity: 1;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.7;
  }
`;

const TextBlock = styled.div`
  width: 430px;
  height: 123px;

  color: #fff;
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
  color: #fff;
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
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0].value);
  const [selectedTheme, setSelectedTheme] = useState(THEMES[0].value);

  return (
    <Wrapper>
      <Modal>
        <CloseIcon
          id="close"
          width={50}
          height={50}
          viewBox="0 0 50 50"
          onClick={onClose}
        />
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
                {THEMES.map((theme, index) => (
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
          <ApplyButton onClick={onClose}>Apply</ApplyButton>
        </ErrorBoundary>
      </Modal>
    </Wrapper>
  );
}

export default SettingsModal;
