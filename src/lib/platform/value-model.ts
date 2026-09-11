export const VALUE_ASSUMPTIONS = {
  incidentsPerMonth: 300,
  currentEffortMinutes: 12,
  disclaimer:
    "Illustrative workload forecast. Replace these assumptions with pilot measurements.",
} as const;

export const VALUE_SCENARIOS = [
  { label: "Low", minutesRemoved: 3, hoursRecovered: 15, barPercent: 43 },
  { label: "Base", minutesRemoved: 5, hoursRecovered: 25, barPercent: 71 },
  { label: "High", minutesRemoved: 7, hoursRecovered: 35, barPercent: 100 },
] as const;

export const ADOPTION_RAMP = [
  { month: "M1", hours: 6.25, adoption: "25%" },
  { month: "M2", hours: 12.5, adoption: "50%" },
  { month: "M3", hours: 18.75, adoption: "75%" },
  { month: "M4", hours: 25, adoption: "100%" },
  { month: "M5", hours: 25, adoption: "100%" },
  { month: "M6", hours: 25, adoption: "100%" },
] as const;

export const VALUE_FORMULAS = [
  {
    title: "Current effort",
    formula: "Eligible incidents × coordination/reporting minutes ÷ 60",
  },
  {
    title: "Recovered capacity",
    formula:
      "Eligible incidents × minutes removed ÷ 60 × adoption",
  },
  {
    title: "Optional capacity value",
    formula: "Recovered hours × customer-approved loaded hourly cost",
  },
  {
    title: "Full project cost",
    formula:
      "License + integration + infrastructure + training + support",
  },
] as const;

export const CUMULATIVE_CAPACITY = "112.5 h cumulative capacity over six months";
