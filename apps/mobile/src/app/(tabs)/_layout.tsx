import Feather from "@expo/vector-icons/Feather";
import { Link, Tabs } from "expo-router";
import { View } from "react-native";

function TabBarCodeIcon({ color }: { color: string }) {
    return <Feather size={28} name="refresh-cw" color={color} />;
}

function HeaderRight() {
    return (
        <View className="mr-2 flex flex-row gap-2">
            <Link href="/modal" asChild>
                <Feather name="info" size={28} />
            </Link>
            <Link href="https://google.com">
                <Feather name="external-link" size={28} />
            </Link>
        </View>
    );
}

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "black",
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Tab One",
                    tabBarIcon: TabBarCodeIcon,
                    headerRight: HeaderRight,
                }}
            />
            <Tabs.Screen
                name="two"
                options={{
                    title: "Tab Two",
                    tabBarIcon: TabBarCodeIcon,
                }}
            />
        </Tabs>
    );
}
