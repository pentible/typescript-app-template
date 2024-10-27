import { Stack } from "expo-router";
import { NotFound } from "#src/components/not-found";

export default function NotFoundScreen() {
    return (
        <>
            <Stack.Screen options={{ title: "Oops!" }} />
            <NotFound />
        </>
    );
}
