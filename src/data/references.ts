export interface Reference {
  topic: string;
  source: string;
  summary: string;
  group: string;
}

export const REFERENCES: Reference[] = [
  {
    group: "Calculator",
    topic: "Calculator accuracy",
    source:
      "Frankenfield et al., 2005; Academy of Nutrition and Dietetics comparative review",
    summary:
      "The Mifflin-St Jeor equation predicts resting metabolic rate within ~10% of measured values more reliably than other common equations — which is why it's the default formula here and on calculator.net.",
  },
  {
    group: "Diet",
    topic: "Protein for muscle",
    source:
      "Morton et al., 2018 meta-analysis, British Journal of Sports Medicine; Helms et al., 2014 review",
    summary:
      "Protein intakes up to ~1.6 g/kg/day (plateauing around 2.2 g/kg) maximize resistance-training muscle gain; higher intakes around 2.3–3.1 g/kg of lean mass help preserve muscle in a deficit — the basis for higher protein on cut tiers.",
  },
  {
    group: "Diet",
    topic: "Weight fluctuation",
    source: "Standard dietetics guidance",
    summary:
      "Daily body weight varies with water, sodium, and glycogen; weekly averages track true change — hence “judge weekly.”",
  },
  {
    group: "Sleep",
    topic: "Sleep and fat loss",
    source: "Nedeltcheva et al., 2010, Annals of Internal Medicine",
    summary:
      "Dieters sleeping 5.5 h lost 55% less fat and 60% more lean mass than the same people sleeping 8.5 h at identical calories.",
  },
  {
    group: "Sleep",
    topic: "Sleep restriction and hormones",
    source: "Leproult & Van Cauter, 2011, JAMA",
    summary:
      "One week of ~5-hour nights reduced daytime testosterone in healthy young men by roughly 10–15%.",
  },
  {
    group: "Sleep",
    topic: "Caffeine and sleep",
    source: "Gardiner et al., 2023, Sleep Medicine Reviews",
    summary:
      "Meta-analysis: caffeine cuts total sleep by ~45 minutes and sleep efficiency by 7%; strong doses still disrupt sleep taken six hours before bed.",
  },
  {
    group: "Sleep",
    topic: "Adult sleep duration",
    source: "AASM/Sleep Research Society consensus recommendation",
    summary: "Major sleep bodies recommend 7+ hours for adults.",
  },
  {
    group: "Sleep",
    topic: "Sleep and injury in athletes",
    source: "Milewski et al., 2014",
    summary:
      "In young athletes, sleeping under 8 hours has been associated with substantially higher injury rates.",
  },
  {
    group: "Sleep",
    topic: "Warm bathing before bed",
    source: "Haghayegh et al., 2019 meta-analysis",
    summary:
      "Warm bathing 1–2 h before bed shortens time to fall asleep and improves sleep quality.",
  },
  {
    group: "Supplements",
    topic: "Creatine",
    source: "Kreider et al., 2017, International Society of Sports Nutrition position stand",
    summary:
      "Creatine monohydrate increases strength and lean mass with a strong safety record across hundreds of trials and multiple meta-analyses.",
  },
  {
    group: "Supplements",
    topic: "Caffeine",
    source: "Guest et al., 2021, ISSN position stand",
    summary:
      "Caffeine (~3–6 mg/kg pre-exercise) reliably improves strength and endurance performance.",
  },
  {
    group: "Supplements",
    topic: "Tart cherry",
    source: "Small clinical trials on tart cherry and sleep",
    summary:
      "Tart cherries are a natural melatonin source with modest sleep improvements in small trials.",
  },
  {
    group: "Supplements",
    topic: "Magnesium and glycine for sleep",
    source: "Modest favorable evidence",
    summary:
      "Evidence is modest but favorable — Fit 60 does not oversell these.",
  },
  {
    group: "Supplements",
    topic: "Glucosamine and chondroitin",
    source: "Mixed clinical trials",
    summary:
      "Trial results are mixed; some individuals report meaningful relief after several weeks.",
  },
  {
    group: "Run",
    topic: "Easy-run distribution",
    source: "Seiler's training-intensity-distribution research",
    summary:
      "Elite endurance athletes cluster ~80% of training at low intensity; polarized and pyramidal distributions outperform threshold-heavy training in studies of runners.",
  },
  {
    group: "Life",
    topic: "Gratitude journaling",
    source: "Emmons & McCullough, 2003",
    summary:
      "Participants keeping weekly gratitude journals showed higher well-being than controls.",
  },
  {
    group: "Life",
    topic: "Relationships and happiness",
    source: "Harvard Study of Adult Development (ongoing since 1938)",
    summary:
      "Relationship quality is the strongest predictor of long-term happiness and health.",
  },
  {
    group: "Life",
    topic: "Nature time",
    source: "2019 Scientific Reports and related green-space research",
    summary:
      "Time in green space is associated with lower stress hormones and better mood; about 120 minutes per week in nature is associated with higher well-being.",
  },
];

export const REFERENCE_GROUPS = Array.from(
  new Set(REFERENCES.map((r) => r.group)),
);
