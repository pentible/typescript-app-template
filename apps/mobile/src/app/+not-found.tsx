import { Stack, Link } from "expo-router";
import { Text, View } from "react-native";

export default function NotFoundScreen() {
    return (
        <>
            <Stack.Screen options={{ title: "Oops!" }} />
            <View className="flex-1 items-center justify-center p-5">
                <Text className="font-sans text-xl">
                    This screen doesn&apos;t exist.
                </Text>

                <Link href="/" className="mt-4 py-4">
                    <Text className="font-sans text-sm text-blue-500">
                        Go to home screen!
                    </Text>
                </Link>
            </View>
        </>
    );
}
