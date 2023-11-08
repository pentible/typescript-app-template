"use client";

import { FiRefreshCw } from "react-icons/fi";
import { api } from "~/utils/api";

export default function Home() {
    const examples = api.example.getAll.useQuery();

    return (
        <main className="container mx-auto flex flex-col items-center p-4">
            <button
                type="button"
                onClick={() => {
                    void examples.refetch();
                }}
                aria-label="Refresh"
            >
                <FiRefreshCw />
            </button>
            {examples.data && examples.data.length > 0 ? (
                examples.data.map((e) => (
                    <p key={e.id} className="text-2xl">
                        {e.id}
                    </p>
                ))
            ) : (
                <p className="text-2xl">no guys?</p>
            )}
            {(
                [
                    "normal",
                    "100",
                    "200",
                    "300",
                    "400",
                    "500",
                    "600",
                    "700",
                    "800",
                    "900",
                    "bold",
                ] as const
            ).map((fontWeight) => (
                <p key={fontWeight} className="text-4xl" style={{ fontWeight }}>
                    QQ mf
                </p>
            ))}
        </main>
    );
}
