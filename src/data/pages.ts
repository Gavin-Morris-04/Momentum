export interface SectionNavItem {
  id: string;
  label: string;
}

export interface PageClosing {
  text: string;
  href: string;
  label: string;
  lifelongNote?: string;
}

export interface PageMeta {
  readingMinutes: number;
  threeThings: [string, string, string];
  pullQuote: string;
  closing?: PageClosing;
}

export const PAGE_META: Record<string, PageMeta> = {
  lift: {
    readingMinutes: 8,
    threeThings: [
      "Pick one split and run it for eight weeks — boredom means it's working.",
      "Hold your weights across the cut; adding reps is a win.",
      "Week 5 is a deload. Take it. A recovered week beats a broken one.",
    ],
    pullQuote: "Motivation follows action, not the other way around.",
    closing: {
      text: "Training's set.",
      href: "/diet",
      label: "Now feed it → Diet",
      lifelongNote:
        "Sixty days teaches you to train. The logbook keeps going as long as you do.",
    },
  },
  diet: {
    readingMinutes: 10,
    threeThings: [
      "Run your numbers first — the meal plan won't appear until you do.",
      "Protein is the lever; everything else fills in around it.",
      "Weigh your food. The scale is the difference between a deficit on paper and a deficit in reality.",
    ],
    pullQuote:
      "You don't need a perfect diet. You need principles you'll actually live by.",
    closing: {
      text: "Food's handled.",
      href: "/run",
      label: "Now move → Run",
      lifelongNote:
        "The plan portions your food for sixty days. The principles portion it forever.",
    },
  },
  run: {
    readingMinutes: 6,
    threeThings: [
      "Easy days stay embarrassingly slow — that's the point.",
      "Heart rate is the target, not pace.",
      "Week 4 is a down week on the long run. Tissues adapt slower than lungs.",
    ],
    pullQuote: "Run your easy runs embarrassingly slow.",
    closing: {
      text: "Runs are scheduled.",
      href: "/sleep",
      label: "Recover → Sleep",
      lifelongNote: "By day 60 you're a runner. That doesn't expire.",
    },
  },
  sleep: {
    readingMinutes: 12,
    threeThings: [
      "Sleep isn't recovery from the plan — it's what makes the plan work.",
      "Same schedule every night, including weekends. No catching up.",
      "Caffeine ends at noon. A 3 PM coffee is still in your blood at bedtime.",
    ],
    pullQuote: "Sleep is where fat loss, muscle retention, and willpower are decided.",
    closing: {
      text: "Rest is scheduled.",
      href: "/life",
      label: "Live well → Life",
      lifelongNote:
        "The bedtime isn't a rule for the plan. It's a gift you keep giving yourself.",
    },
  },
  life: {
    readingMinutes: 10,
    threeThings: [
      "Five minutes morning, five at night — the journal is the habit, not perfection.",
      "One microadventure a week. Schedule it like an appointment.",
      "Ten pages a night replaces the hour of scrolling that was stealing your sleep.",
    ],
    pullQuote:
      "Journals fill up. Adventures accumulate. This is the part you were always going to keep.",
    closing: {
      text: "The quiet work is mapped.",
      href: "/supplements",
      label: "Support it → Supplements",
      lifelongNote:
        "Journals fill up. Adventures accumulate. This page is the part you were always going to keep.",
    },
  },
  supplements: {
    readingMinutes: 6,
    threeThings: [
      "Food first — supplements are the last 5%, not the foundation.",
      "Natural compounds only. If it needs a lab to exist, skip it.",
      "Read labels like you'll be doing it for decades — because you will.",
    ],
    pullQuote: "Food first, forever — the label-reading habit outlasts any bottle.",
    closing: {
      text: "The basics are covered.",
      href: "/calendar",
      label: "Schedule it → Calendar",
      lifelongNote:
        "Food first, forever — the label reading habit outlasts any bottle.",
    },
  },
};

export const SECTION_TRANSITIONS: Record<string, Record<string, string>> = {
  lift: {
    splits: "You've picked your split — here's how to actually progress on it.",
    tips: "The programming is set. These are the habits that make sessions count.",
  },
  diet: {
    calculator: "Start with honest numbers — everything downstream depends on them.",
    plan: "Your numbers are in. Here's the food that matches them.",
    tips: "The portions are solved. These are the habits that keep you honest.",
  },
  run: {
    structure: "You know when to run. Here's how to run those days well.",
    tips: "The miles are on the calendar. These keep them productive.",
  },
  sleep: {
    evidence: "Here's why we're strict about this.",
    winddown: "You know why it matters. Here's how the night actually goes.",
    tips: "The schedule is set. These are the small habits that protect it.",
  },
  life: {
    journal: "The body plan is running. Here's the part no calculator can portion.",
    adventures: "You've got structure. Now make room for something memorable.",
    tips: "The practices are simple. These keep them alive when motivation dips.",
  },
};

export function getTransition(page: string, sectionId: string): string | undefined {
  return SECTION_TRANSITIONS[page]?.[sectionId];
}
