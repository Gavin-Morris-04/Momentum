/** Named evidence anchors referenced across Fit 60 pages. */
export interface EvidenceEntry {
  id: string;
  topic: string;
  citation: string;
  summary: string;
  group: string;
}

export const EVIDENCE: EvidenceEntry[] = [
  {
    id: "nedeltcheva-2010",
    topic: "Sleep and fat loss",
    citation: "Nedeltcheva et al., 2010, Annals of Internal Medicine",
    summary:
      "Dieters sleeping 5.5 h lost 55% less fat and 60% more lean mass than the same people sleeping 8.5 h at identical calories.",
    group: "Sleep",
  },
  {
    id: "leproult-2011",
    topic: "Sleep restriction and hormones",
    citation: "Leproult & Van Cauter, 2011, JAMA",
    summary:
      "One week of ~5-hour nights reduced daytime testosterone in healthy young men by roughly 10–15%.",
    group: "Sleep",
  },
  {
    id: "gardiner-2023",
    topic: "Caffeine and sleep",
    citation: "Gardiner et al., 2023, Sleep Medicine Reviews",
    summary:
      "Meta-analysis of controlled trials: caffeine cuts total sleep by ~45 minutes and sleep efficiency by 7%; strong doses still disrupt sleep taken six hours before bed.",
    group: "Sleep",
  },
  {
    id: "aasm-consensus",
    topic: "Adult sleep duration",
    citation: "AASM/Sleep Research Society consensus recommendation",
    summary: "Major sleep bodies recommend 7+ hours for adults.",
    group: "Sleep",
  },
  {
    id: "milewski-2014",
    topic: "Sleep and injury in athletes",
    citation: "Milewski et al., 2014",
    summary:
      "In young athletes, sleeping under 8 hours has been associated with substantially higher injury rates.",
    group: "Sleep",
  },
  {
    id: "haghayegh-2019",
    topic: "Warm bathing before bed",
    citation: "Haghayegh et al., 2019 meta-analysis",
    summary:
      "Warm bathing 1–2 h before bed shortens time to fall asleep and improves sleep quality.",
    group: "Sleep",
  },
];

export function evidenceByGroup(group: string): EvidenceEntry[] {
  return EVIDENCE.filter((e) => e.group === group);
}
