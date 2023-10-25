import { ThemeVariantsType } from 'types/ThemeVariants';

export const THEMES: ThemeVariantsType = {
  Dark: {
    value: 'Dark',
    bgColor: '#1e1f27',
    color: '#ffffff',
    buttonBgColor: '#ffffff',
    buttonColor: '#000000',
    logoColor: '#DBDBDB',
    shadowColor: '#1e1f27',
    closeIconBgColor: '#D9D9D9',
    closeIconColor: '#DBDBDB',
    footerInputBgColor: 'rgba(255,255,255,0.15)',
    googleButtonBorderColor: 'transparent',
    profileMenuBgColor: '#1c1c1c',
  },
  Light: {
    value: 'Light',
    bgColor: '#ffffff',
    color: '#000000',
    buttonBgColor: '#000000',
    buttonColor: '#ffffff',
    logoColor: '#000000',
    shadowColor: '#ffffff',
    closeIconBgColor: '#000000',
    closeIconColor: '#000',
    footerInputBgColor: 'rgba(0,0,0,0.15)',
    googleButtonBorderColor: '#000000',
    profileMenuBgColor: '#d3d3d3',
  },
};
