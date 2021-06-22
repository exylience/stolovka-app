<template>
    <nb-container>
        <nb-content class="sidebar-content-wrapper" :bounces="false">
            <nb-content class="sidebar-top">
                <nb-text class="app-name">ТоргСервис</nb-text>

                <nb-grid class="app-info-wrapper">
                    <nb-col class="app-info-block">
                        <nb-icon class="app-info-icon" name="home"/>
                        <nb-text class="app-info-text">ул. Советской армии, 101</nb-text>
                    </nb-col>

                    <nb-col class="app-info-block" :onPress="openMenu">
                        <nb-icon class="app-info-icon" name="call"/>
                        <nb-text class="app-info-text">{{ companyPhone }}</nb-text>
                    </nb-col>
                </nb-grid>

                <image-background
                    :source="drawerCover"
                    class="drawer-cover"
                    :style="stylesObj.drawerCoverObj"
                />
            </nb-content>

            <nb-list class="sidebar-menu">
                <nb-list-item
                    v-for="data in datas"
                    class="list-item-active"
                    :key="data.route"
                    button
                    noBorder
                    :onPress="() => handleListItemClick(data)"
                >
                    <nb-left>
                        <nb-icon
                            active
                            :name="data.icon"
                            class="list-item-icon"
                            :style="{ color: (isActiveRoute(data.route)) ? '#3F51B5' : '#777' }"
                        />

                        <nb-text :style="{
                            color: (isActiveRoute(data.route)) ? '#3F51B5' : '#000',
                            marginLeft: 10
                        }">
                            {{ data.name }}
                        </nb-text>
                    </nb-left>

                    <nb-right v-if="data.types" :style="{ flex: 1 }">
                        <nb-badge
                            class="list-item-badge-container"
                            :style="{ backgroundColor: data.bg }"
                        >
                            <nb-text
                                class="list-item-badge-text"
                                :style="stylesObj.badgeText"
                            >
                                {{ `${data.types} Types` }}
                            </nb-text>
                        </nb-badge>
                    </nb-right>
                </nb-list-item>
            </nb-list>
        </nb-content>
    </nb-container>
</template>

<script>
    import { Dimensions, Platform, Linking } from "react-native";
    import { ActionSheet, Toast } from "native-base";
    import * as ExpoSMS from "expo-sms";

    import drawerCover from "../../assets/drawer-cover.png";

    const deviceHeight = Dimensions.get("window").height;
    const deviceWidth = Dimensions.get("window").width;

    export default {
        name: 'SideBar',
        components: {

        },
        props: {
            navigation: Object
        },
        data() {
            return {
                drawerCover,
                stylesObj: {
                    drawerCoverObj: {
                        height: deviceHeight / 3.5
                    },
                    badgeText: {
                        fontSize: Platform.OS === "android" ? 11 : 13,
                        marginTop: Platform.OS === "android" ? -3 : 0,
                        fontWeight: "700"
                    }
                },
                datas: [
                    {
                        name: "Товары",
                        route: "Categories",
                        icon: "cart",
                    },
                    {
                        name: "Обратная связь",
                        route: "Feedback",
                        icon: "chatbubbles",
                    }
                ],
                btnOptions: [
                    { text: "Позвонить", icon: "call", iconColor: "#3F51B5", action: () => Linking.openURL(`tel:${this.companyPhone}`) },
                    { text: "Отправить SMS", icon: "chatboxes", iconColor: "#3F51B5", action: () => this.sendSMS() },
                    { text: "Отмена", icon: "close", iconColor: "#fa213b", action: () => console.log('Canceled') }
                ],
                clicked: 0,
                optionCancelIndex: 2,
                companyPhone: '+73917331122'
            };
        },
        methods: {
            handleListItemClick(dataObj) {
                this.navigation.navigate(dataObj.route);
            },
            isActiveRoute(route) {
                let childNavigation = this.navigation._childrenNavigation;

                return childNavigation[route].isFocused();
            },
            openMenu() {
                ActionSheet.show(
                    {
                        options: this.btnOptions,
                        cancelButtonIndex: this.optionCancelIndex,
                        //destructiveButtonIndex: this.optionDestructiveIndex,
                        title: "Выберите действие"
                    },
                    buttonIndex => {
                        this.clicked = this.btnOptions[buttonIndex];

                        this.clicked.action();
                    }
                );
            },
            async sendSMS() {
                const isAvailable = await ExpoSMS.isAvailableAsync();
                if (isAvailable) {
                    const result = await ExpoSMS.sendSMSAsync(this.companyPhone, '');
                } else {
                    Toast.show({
                        text: "Вам необходимо предоставить разрешение на отправку SMS!",
                        buttonText: "Закрыть",
                        type: "danger",
                        duration: 3000
                    });
                }
            }
        }
    };
</script>

<style>
    .sidebar-content-wrapper {
        flex: 1;
        background-color: #fff;
    }

    .sidebar-menu {
        padding-top: 5px;
    }

    .list-item-icon {
        width: 30px;
        font-size: 26px;
    }

    .list-item-badge-container {
        border-radius: 3px;
        height: 25px;
        width: 75px;
    }

    .list-item-badge-text {
        font-weight: 700;
        text-align: center;
        line-height: 30px;
    }

    .sidebar-top {
        position: relative;
    }

    .app-info-wrapper {
        flex-direction: column;
        position: absolute;
        bottom: 10px;
        left: 10px;
        z-index: 1;
    }

    .app-info-block {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 10px;
    }

    .app-name {
        font-size: 20px;
        font-weight: 800;
        color: #fff;
        position: absolute;
        top: 10px;
        left: 10px;
        z-index: 1;
    }

    .app-info-icon {
        color: #fff;
        margin-right: 10px;
    }

    .app-info-text {
        color: #fff;
    }
</style>