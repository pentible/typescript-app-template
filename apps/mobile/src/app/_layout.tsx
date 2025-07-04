import "#src/styles/globals.css";
import Feather from "@expo/vector-icons/Feather";
import {
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
} from "@expo-google-fonts/quicksand";
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import {
    hideAsync as hideSplashAsync,
    preventAutoHideAsync as preventAutoHideSplashAsync,
} from "expo-splash-screen";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { TrpcProvider } from "#src/utils/api";

// Catch any errors thrown by the Layout component.
export { ErrorBoundary } from "expo-router";

// NOTE: this file shouldn't change that much, so losing fast refresh is fine
// eslint-disable-next-line react-refresh/only-export-components
export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: "(tabs)",
};

// Keep the splash screen visible while we fetch resources
void preventAutoHideSplashAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        Quicksand_300Light,
        Quicksand_400Regular,
        Quicksand_500Medium,
        Quicksand_600SemiBold,
        Quicksand_700Bold,
        ...Feather.font,
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) {
            throw error;
        }
    }, [error]);

    useEffect(() => {
        if (loaded) {
            // Hide the splash screen after the fonts have loaded and the
            // UI is ready.
            void hideSplashAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return <RootLayoutNav />;
}

function RootLayoutNav() {
    const colorScheme = useColorScheme();

    return (
        <TrpcProvider>
            <ThemeProvider
                value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
            >
                <Stack>
                    <Stack.Screen
                        name="(tabs)"
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="modal"
                        options={{ presentation: "modal" }}
                    />
                </Stack>
            </ThemeProvider>
        </TrpcProvider>
    );
}
