import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import colors from "tailwindcss/colors";
import { api } from "~/utils/api";

export default function TabOneScreen() {
    const examples = api.example.getAll.useQuery();

    return (
        <View className="flex-1 items-center justify-center bg-indigo-900">
            <Text className="font-sans-bold text-2xl text-indigo-50">
                Tab One
            </Text>
            <View className="my-8 h-px w-4/5 bg-slate-100" />

            {examples.data && examples.data.length > 0 ? (
                examples.data.map((e) => (
                    <Text className="text-2xl text-indigo-50" key={e.id}>
                        {e.id}
                    </Text>
                ))
            ) : (
                <Text className="text-2xl">no guys?</Text>
            )}
            <Link href="/nope">
                <Feather
                    name="alert-octagon"
                    color={colors.red[400]}
                    size={32}
                />
            </Link>
            {[
                "font-sans-light",
                "font-sans",
                "font-sans-medium",
                "font-sans-semibold",
                "font-sans-bold",
            ].map((font) => (
                <Text key={font} className={`${font} text-3xl text-indigo-50`}>
                    Q: {font}
                </Text>
            ))}
        </View>
    );
}
