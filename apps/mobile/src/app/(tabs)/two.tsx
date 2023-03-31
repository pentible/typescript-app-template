import { Text, View } from "react-native";

export default function TabTwoScreen() {
    return (
        <View className="flex-1 items-center justify-center">
            <Text className="font-sans-bold text-xl">Tab Two</Text>
            <View className="my-8 h-px w-4/5 bg-slate-600" />
        </View>
    );
}
