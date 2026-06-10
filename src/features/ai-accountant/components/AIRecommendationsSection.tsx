"use client";

import { motion } from "framer-motion";
import { AIRecommendation, RecommendationType } from "../types";
import { AIRecommendationCard } from "./AIRecommendationCard";

interface AIRecommendationsSectionProps {
  recommendations: AIRecommendation[];
  title: string;
  typeLabels: Record<RecommendationType, string>;
}

export function AIRecommendationsSection({
  recommendations,
  title,
  typeLabels,
}: AIRecommendationsSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.05 }}
      className="space-y-3"
    >
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {recommendations.map((rec) => (
          <AIRecommendationCard key={rec.id} recommendation={rec} typeLabels={typeLabels} />
        ))}
      </div>
    </motion.section>
  );
}
