"use client";

import { useQuery } from "@tanstack/react-query";
import type { CSSProperties } from "react";
import { FiRefreshCw } from "react-icons/fi";
import { useTrpc } from "#src/utils/api";

export default function Home() {
    const api = useTrpc();
    const examples = useQuery(api.example.getAll.queryOptions());

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
                <p className="text-2xl">no examples?</p>
            )}
            <FontWeightPreview fontWeight="normal" />
            <FontWeightPreview fontWeight="100" />
            <FontWeightPreview fontWeight="200" />
            <FontWeightPreview fontWeight="300" />
            <FontWeightPreview fontWeight="400" />
            <FontWeightPreview fontWeight="500" />
            <FontWeightPreview fontWeight="600" />
            <FontWeightPreview fontWeight="700" />
            <FontWeightPreview fontWeight="800" />
            <FontWeightPreview fontWeight="900" />
            <FontWeightPreview fontWeight="bold" />
        </main>
    );
}

interface FontWeightPreviewProps {
    fontWeight: CSSProperties["fontWeight"];
}

function FontWeightPreview({ fontWeight }: FontWeightPreviewProps) {
    return (
        <p className="text-4xl" style={{ fontWeight }}>
            font-weight-{fontWeight}
        </p>
    );
}
