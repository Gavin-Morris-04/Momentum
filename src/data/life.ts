export interface JournalSection {
  id: string;
  title: string;
  timing: string;
  prompts: string[];
}

export interface Microadventure {
  id: string;
  title: string;
  note: string;
}

export interface ReadingCategory {
  category: string;
  examples: string;
}

export interface PresenceHabit {
  id: string;
  title: string;
  body: string;
}

export const LIFE_INTRO = [
  "Fit 60 isn't just a body plan.",
  "Stronger, calmer, better rested, more present, closer to your people — here's the part no calculator can portion, and the part you were always going to keep.",
];

export const JOURNAL_SECTIONS: JournalSection[] = [
  {
    id: "morning",
    title: "Morning page",
    timing: "Before the phone · five minutes",
    prompts: [
      'Three specific gratitudes ("coffee on the porch before the heat," not "family")',
      'One intention: "Today I will ______."',
      "The day's hardest task, named in writing",
    ],
  },
  {
    id: "evening",
    title: "Evening page",
    timing: "During wind-down · five minutes",
    prompts: [
      "Where did I hold the standard?",
      "Where did I break it — and what triggered it?",
      "One gratitude tonight",
      "Tomorrow's first task, so the morning starts decided",
    ],
  },
  {
    id: "weekly",
    title: "Weekly review",
    timing: "Sunday · 15 minutes",
    prompts: [
      "Reread the week; what pattern shows up?",
      "Score training / diet / sleep / relationships 1–10",
      "One change next week — only one",
    ],
  },
];

export const JOURNAL_WHY =
  "Writing converts vague stress into decisions, and gratitude practice is among the most consistently supported happiness habits in psychology research.";

export const JOURNAL_EVIDENCE =
  "Participants keeping weekly gratitude journals showed higher well-being than controls (Emmons & McCullough, 2003).";

export const EVENING_STARTER = {
  title: "Your first entry, tonight",
  prompts: [
    "Where did I hold the standard?",
    "Where did I break it — and what triggered it?",
    "One gratitude tonight",
  ],
};

export const MICROADVENTURES_INTRO =
  "Credit the idea to adventurer Alastair Humphreys — an adventure that's small and close to home but big in spirit; it fits around a job and costs almost nothing. The rule for Fit 60: one microadventure a week, eight total.";

export const MICROADVENTURES: Microadventure[] = [
  {
    id: "sunrise",
    title: "Sunrise mission",
    note: "Be somewhere beautiful when the sun comes up; coffee in a thermos. (Doubles as your morning sunlight.)",
  },
  {
    id: "sleep-outside",
    title: "Sleep outside once",
    note: "Backyard counts. Bivvy or tent, one night, back for work by 8.",
  },
  {
    id: "moon-walk",
    title: "Full-moon walk",
    note: "No headphones, let your eyes adjust.",
  },
  {
    id: "swim",
    title: "Swim in natural water",
    note: "River, lake, or sea; safety first, bravado never.",
  },
  {
    id: "tourist",
    title: "Tourist in your own town",
    note: "The museum, quarter, or trail you've never done because it's always there.",
  },
  {
    id: "end-of-line",
    title: "End of the line",
    note: "Ride a train, ferry, or bus to its last stop and explore whatever's there.",
  },
  {
    id: "summit",
    title: "Summit something",
    note: "The highest point within an hour of home, even if it's a hill.",
  },
  {
    id: "fire-cook",
    title: "Cook over fire",
    note: "One meal outdoors, made slowly, eaten slowly.",
  },
  {
    id: "no-map",
    title: "The no-map wander",
    note: "Two hours on foot, phone in pocket, turn wherever looks interesting.",
  },
  {
    id: "phone-free-trip",
    title: "A phone-free day trip",
    note: "Tell someone where you're going, print or write directions, and disappear for a day.",
  },
];

export const MICROADVENTURES_CLOSING =
  "Most of these cost nothing, count toward your steps, and become the stories you actually remember from these sixty days.";

export const READING_INTRO =
  "The habit: 10 pages a night, every night — it's the T-30 wind-down step, ~12 books a year, and it replaces the hour of scrolling that was stealing your sleep.";

export const READING_RULES = [
  "Always have the next book chosen before you finish the current one.",
  "Physical book or e-ink at night (no backlit phone reading in bed).",
  "Quit boring books without guilt — the habit is reading, not finishing.",
];

export const READING_SHELF: ReadingCategory[] = [
  {
    category: "One biography of someone you admire",
    examples: "Pick someone whose discipline you want to borrow, not just admire from afar.",
  },
  {
    category: "One book on your faith or philosophy",
    examples: "Whatever tradition grounds you — read it slowly, not to win.",
  },
  {
    category: "One novel",
    examples: "Fiction trains empathy. Pick something you'll actually look forward to at 9:30.",
  },
  {
    category: "One book about a craft or skill you want",
    examples: "Cooking, writing, woodworking, coding — something that outlasts the sixty days.",
  },
];

export const PRESENCE_HABITS: PresenceHabit[] = [
  {
    id: "one-thing",
    title: "One thing at a time.",
    body: "Single-tasking is a superpower now; when you eat, eat; when you lift, put the phone in the locker.",
  },
  {
    id: "screenless-meal",
    title: "One screenless meal a day.",
    body: "Taste the food you weighed so carefully.",
  },
  {
    id: "feet",
    title: "Be where your feet are.",
    body: "When you catch yourself elsewhere, name five things you can see and two you can hear — a 20-second reset that works anywhere.",
  },
  {
    id: "savor",
    title: "The savoring habit.",
    body: "Once a day, deliberately enjoy a good moment for 20–30 seconds — the first coffee, the post-lift walk, the shower. Savoring reliably lifts mood in wellbeing research.",
  },
  {
    id: "walks",
    title: "Walks without input.",
    body: "One walk a day with no podcast, no music. Boredom is where your best thinking lives.",
  },
  {
    id: "phone-rules",
    title: "Phone rules, restated plainly",
    body: "Not in the first 30 minutes, not at meals, not in bed. The phone is a tool you pick up on purpose, not a place you live.",
  },
];

export const FAITH_OPTIONAL = {
  label: "Optional",
  title: "Faith & stillness",
  items: [
    "Daily 10-minute quiet block — prayer, scripture, or silence. Proverbs a chapter a day fits two months at a relaxed pace, or twice through at one a day.",
    "One weekly gathering with people who hold you to your word.",
    "A weekly Sabbath block — a half-day, no tracking, no training talk, no screens. Rest is commanded, not earned.",
  ],
};

export const PEOPLE_EVIDENCE =
  "The Harvard Study of Adult Development — running since 1938 — finds relationship quality is the strongest predictor of long-term happiness and health.";
