import material from "../../native-base-theme/variables/material";
import { Platform } from "react-native";
import color from "color"

const platform = Platform.OS;
const customMaterial = {
    ...material,

    // Цвета
    brandPrimary: '#b59bc8',
    brandDanger: '#e22134',

    // Основной контейнер
    containerBgColor: '#191919',


    // Шапка
    toolbarDefaultBg: '#191919',
    toolbarDefaultBorder: '#1d1d1d',
    get statusBarColor() {
        return color(this.toolbarDefaultBg).hex()
    },

    // Навигационное меню
    footerDefaultBg: '#2c2d2f',
    tabActiveBgColor: '#b59bc8',

    // Текст
    textColor: '#ffffff',
    inverseTextColor: '#000000',
    fontFamily: 'System',

    // Кнопки


    // Иконки


    // Инпуты
    inputErrorBorderColor: '#e22134',
    inputSuccessBorderColor: '#1db954',

    // Спиннер
    defaultSpinnerColor: '#b59bc8',

    // Табы
    tabBgColor: '#191919',
    tabDefaultBg: '#191919',

    topTabBarActiveTextColor: '#b59bc8',
    topTabBarTextColor: '#cbcbcb',

    topTabBarActiveBorderColor: '#b59bc8',
    topTabBarBorderColor: '#191919',

    // Карточки
    cardDefaultBg: '#191919',
    cardBorderColor: '#232323',
    cardBorderRadius: 10
};

export default customMaterial;