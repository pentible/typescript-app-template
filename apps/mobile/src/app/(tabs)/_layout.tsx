import Feather from "@expo/vector-icons/Feather";
import { Link, Tabs } from "expo-router";
import { View } from "react-native";
import type { ColorValue } from "react-native";

function TabOneHeaderRight() {
    return (
        <View className="mr-2 flex flex-row gap-2">
            <Link href="/modal" asChild>
                <Feather name="info" size={28} />
            </Link>
            <Link href="https://google.com" asChild>
                <Feather name="external-link" size={28} />
            </Link>
        </View>
    );
}

export default function TabLayout() {
    const tabBarIcon = ({
        color,
        size,
    }: {
        // TODO: idk maaaan
        // focused: boolean;
        color: ColorValue;
        size: number;
    }) => {
        return <Feather size={size} name="refresh-cw" color={color} />;
    };

    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: "black" }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Tab One",
                    tabBarIcon,
                    headerRight: TabOneHeaderRight,
                }}
            />
            <Tabs.Screen
                name="two"
                options={{
                    title: "Tab Two",
                    tabBarIcon,
                }}
            />
        </Tabs>
    );
}
