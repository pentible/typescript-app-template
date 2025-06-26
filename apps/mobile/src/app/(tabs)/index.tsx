import { Feather } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import colors from "tailwindcss/colors";
import { useTrpc } from "#src/utils/api";

export default function TabOneScreen() {
    const api = useTrpc();
    const examples = useQuery(api.example.getAll.queryOptions());

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
                <Text className="text-2xl">no examples?</Text>
            )}
            <Link href="/nope">
                <Feather
                    name="alert-octagon"
                    color={colors.red[400]}
                    size={32}
                />
            </Link>
            <FontWeightPreview font="font-sans-light" />
            <FontWeightPreview font="font-sans" />
            <FontWeightPreview font="font-sans-medium" />
            <FontWeightPreview font="font-sans-semibold" />
            <FontWeightPreview font="font-sans-bold" />
        </View>
    );
}

interface FontWeightPreviewProps {
    font: string;
}

function FontWeightPreview({ font }: FontWeightPreviewProps) {
    return <Text className={`${font} text-3xl text-indigo-50`}>Q: {font}</Text>;
}
