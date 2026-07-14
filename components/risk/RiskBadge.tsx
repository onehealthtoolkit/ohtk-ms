import React from "react";
import { useTranslation } from "react-i18next";
import { RiskFilterLevel, RiskLevel } from "lib/services/report/report";

type RiskBadgeTone = {
  label: string;
  text: string;
  background: string;
  border: string;
  dot: string;
  dashed?: boolean;
};

export const RISK_LEVEL_OPTIONS: RiskFilterLevel[] = [
  "NO_ASSESSMENT",
  "LOW",
  "MEDIUM",
  "HIGH",
  "CRITICAL",
];

const RISK_BADGE_TONES: Record<RiskFilterLevel, RiskBadgeTone> = {
  NO_ASSESSMENT: {
    label: "No assessment",
    text: "#64748b",
    background: "#f1f5f9",
    border: "#dbe2ea",
    dot: "#94a3b8",
    dashed: true,
  },
  LOW: {
    label: "Low",
    text: "#157347",
    background: "#dcfce7",
    border: "#b3eccb",
    dot: "#22a35a",
  },
  MEDIUM: {
    label: "Medium",
    text: "#a8620a",
    background: "#fdf0d2",
    border: "#f6dca0",
    dot: "#f59e0b",
  },
  HIGH: {
    label: "High",
    text: "#b5400d",
    background: "#ffe7d4",
    border: "#fdc9a3",
    dot: "#f97316",
  },
  CRITICAL: {
    label: "Critical",
    text: "#a1141b",
    background: "#fde2e2",
    border: "#f6bcbc",
    dot: "#c81e1e",
  },
};

const riskKey = (level?: RiskLevel | RiskFilterLevel | null): RiskFilterLevel =>
  level || "NO_ASSESSMENT";

export const getRiskLabel = (
  t: ReturnType<typeof useTranslation>["t"],
  level?: RiskLevel | RiskFilterLevel | null
) => {
  const key = riskKey(level);
  return t(`risk.level.${key.toLowerCase()}`, RISK_BADGE_TONES[key].label);
};

export const getRiskRowStyle = (
  level?: RiskLevel | null
): React.CSSProperties | undefined => {
  if (level === "CRITICAL") {
    return {
      boxShadow: "inset 4px 0 0 #b91c1c",
      backgroundColor: "#fff7f7",
    };
  }
  if (level === "HIGH") {
    return {
      boxShadow: "inset 4px 0 0 #ea580c",
    };
  }
  return undefined;
};

type RiskBadgeProps = {
  level?: RiskLevel | RiskFilterLevel | null;
};

const RiskBadge = ({ level }: RiskBadgeProps) => {
  const { t } = useTranslation();
  const key = riskKey(level);
  const tone = RISK_BADGE_TONES[key];

  return (
    <span
      className="inline-flex items-center"
      style={{
        gap: 6,
        padding: "4px 10px",
        borderRadius: 999,
        border: `1px ${tone.dashed ? "dashed" : "solid"} ${tone.border}`,
        background: tone.background,
        color: tone.text,
        fontSize: 12.5,
        lineHeight: "16px",
        fontWeight: 600,
        whiteSpace: "nowrap",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: 8,
          height: 8,
          borderRadius: 999,
          background: tone.dot,
          display: "inline-block",
          flex: "0 0 auto",
        }}
      />
      {getRiskLabel(t, key)}
    </span>
  );
};

export default RiskBadge;
