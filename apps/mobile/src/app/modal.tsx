import { StatusBar } from "expo-status-bar";
import { Platform, Text, View } from "react-native";

export default function ModalScreen() {
    return (
        <View className="flex-1 items-center justify-center">
            <Text className="font-sans-bold text-xl">Modal</Text>
            <View className="my-8 h-px w-4/5 bg-slate-600" />

            {/* Use a light status bar on iOS to account for the black space above the modal */}
            <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
        </View>
    );
}
