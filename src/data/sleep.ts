export interface EvidenceCard {
  id: string;
  claim: string;
  explanation: string;
  evidence: string;
}

export interface WindDownStep {
  id: string;
  mark: string;
  title: string;
  summary: string;
  why: string;
  evidence?: string;
  link?: { href: string; label: string };
}

export interface BedroomRule {
  id: string;
  label: string;
  detail: string;
}

export interface TroubleshootingItem {
  id: string;
  question: string;
  answer: string;
}

export const SLEEP_SCHEDULE = {
  bed: "10:30 PM",
  wake: "6:30 AM",
  duration: "8+ hours",
};

export const SLEEP_INTRO = [
  "Sleep isn't recovery from the plan — it's the thing that makes the rest of the plan work.",
  "When you're short on sleep, hunger rises, training quality drops, and fat loss shifts toward muscle. When you're rested, the same calories and workouts do more.",
  "Fit 60 treats sleep as non-negotiable: same bedtime, same wake time, all sixty days.",
];

export const EVIDENCE_CARDS: EvidenceCard[] = [
  {
    id: "fat-loss",
    claim: "Short sleep makes you lose muscle instead of fat.",
    explanation:
      "Same calories, different sleep: dieters sleeping 5.5 hours lost 55% less fat and 60% more lean mass than when sleeping 8.5 hours.",
    evidence: "Nedeltcheva et al., 2010, Annals of Internal Medicine",
  },
  {
    id: "hormones",
    claim: "Short sleep lowers your hormones.",
    explanation:
      "One week of ~5-hour nights reduced daytime testosterone in healthy young men by roughly 10–15%; controlled sleep-restriction studies also show worsened glucose handling and elevated stress hormones.",
    evidence: "Leproult & Van Cauter, 2011, JAMA; sleep-restriction metabolic studies",
  },
  {
    id: "caffeine",
    claim: "Caffeine steals more sleep than you feel.",
    explanation:
      "A meta-analysis of controlled trials found caffeine cuts total sleep by ~45 minutes and sleep efficiency by 7% — and a strong dose still disrupts sleep taken a full six hours before bed. That's why the cutoff here is noon.",
    evidence: "Gardiner et al., 2023 systematic review & meta-analysis, Sleep Medicine Reviews",
  },
  {
    id: "duration",
    claim: "7–9 hours is the adult recommendation, and athletes do better at the top of it.",
    explanation:
      "Major sleep bodies recommend 7+ hours for adults; in young athletes, sleeping under 8 hours has been associated with substantially higher injury rates.",
    evidence: "AASM/Sleep Research Society consensus recommendation; Milewski et al., 2014",
  },
];

export const WIND_DOWN: WindDownStep[] = [
  {
    id: "t90",
    mark: "T-90",
    title: "Warm shower or bath",
    summary: "Sounds backwards — works because of the cooldown after.",
    why: "The post-bath drop in core temperature is a natural sleep trigger.",
    evidence:
      "Haghayegh et al., 2019 meta-analysis: warm bathing 1–2 h before bed shortens time to fall asleep and improves sleep quality.",
  },
  {
    id: "t60",
    mark: "T-60",
    title: "Lights down, screens dim",
    summary: "Bright evening light delays melatonin and shifts your clock later.",
    why: "Lamps instead of overheads; night mode on everything that stays on.",
  },
  {
    id: "t45",
    mark: "T-45",
    title: "Sleep supplements, if you use them",
    summary: "Magnesium glycinate and glycine — details on the Supplements page.",
    why: "Only if they're part of your protocol. Food and sleep hygiene come first.",
    link: { href: "/supplements", label: "Supplements" },
  },
  {
    id: "t30",
    mark: "T-30",
    title: "Screens off. Analog only.",
    summary: "Read your 10 pages, stretch, journal the evening page.",
    why: "This is where the Life page's evening habits and the sleep plan are the same habit.",
    link: { href: "/life#journal", label: "Evening journal on Life" },
  },
  {
    id: "t0",
    mark: "T-0",
    title: "10:30, lights out",
    summary: "Phone across the room, charging. It's your alarm.",
    why: "Morning-you has to stand up. The bed is for sleep only.",
  },
];

export const BEDROOM_RULES: BedroomRule[] = [
  {
    id: "cool",
    label: "Cool",
    detail: "65–68°F — core temperature has to drop to initiate sleep",
  },
  {
    id: "dark",
    label: "Dark",
    detail: "Blackout curtains or a mask; even dim light degrades sleep quality",
  },
  {
    id: "quiet",
    label: "Quiet",
    detail: "Or steady white noise if you can't control the environment",
  },
  {
    id: "empty",
    label: "Empty-handed",
    detail: "The bed is for sleep only — no laptop, no scrolling, so your brain learns bed = off",
  },
];

export const DAYTIME_RULES = [
  "Morning sunlight, 10–15 min within 30 minutes of waking — the strongest signal your body clock gets all day, and it makes 10:30 arrive naturally.",
  "Caffeine ends at noon. Period.",
  "Finish hard training 3+ hours before bed when you can; late intensity delays sleep onset.",
  "Last meal ~2 hours out — the 8 PM meal fits the 10:30 bedtime exactly.",
  "Same schedule on weekends. \"Catching up\" Saturday just re-jetlags you for Monday.",
];

export const NAP_GUIDANCE = {
  title: "Naps, done right",
  body: "15–20 minutes, before 3 PM, or none at all. Long or late naps drain the sleep pressure you need at 10:30. If you're needing naps daily, the fix is the night, not the nap.",
};

export const TROUBLESHOOTING: TroubleshootingItem[] = [
  {
    id: "cant-fall-asleep",
    question: "Can't fall asleep after 20 minutes?",
    answer:
      "Get up, keep lights dim, read something dull, return when drowsy. Lying awake teaches your brain that bed = worrying.",
  },
  {
    id: "wide-awake-3am",
    question: "Wide awake at 3 AM?",
    answer:
      "Don't check the phone — light + dopamine ends the night. Same rule: dull reading in dim light until sleepy. If it's a pattern, look at alcohol, late caffeine, or stress carried to bed (the evening journal helps unload it).",
  },
  {
    id: "racing-mind",
    question: "Racing mind?",
    answer:
      "Do tomorrow's first task and the worry list on paper before bed — the evening page exists exactly for this.",
  },
  {
    id: "slept-badly",
    question: "Slept badly anyway?",
    answer:
      "Don't nap long, don't caffeinate late, don't sleep in more than an hour. One bad night costs little; the rescue behaviors are what create bad weeks.",
  },
];

export const TROUBLESHOOTING_CLOSING =
  "Persistent loud snoring, gasping awake, or months of insomnia deserve a doctor, not a protocol.";

export const SUPPLEMENTS_CROSS_LINK = {
  title: "Sleep supplements",
  body: "Magnesium glycinate, glycine, tart cherry — what to take, when, and what to skip. Full details on the Supplements page.",
};
