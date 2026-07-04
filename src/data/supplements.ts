export interface Supplement {
  id: string;
  name: string;
  dose: string;
  when: string;
  does: string;
  naturalSource: string;
  evidence?: string;
}

export interface SupplementGroup {
  id: string;
  title: string;
  items: Supplement[];
}

export const SUPPLEMENTS_THESIS =
  "Food first. Supplements are the last 5% — and every one on this page is a natural compound. Nothing artificial, nothing proprietary, no shortcuts that don't exist.";

export const SUPPLEMENTS_HONESTY =
  "Where evidence is weak, we say so. Where it's strong, we cite it.";

export const SUPPLEMENTS_DISCLAIMER =
  "This is a general guide, not medical advice. Check with your doctor before starting anything new.";

export const SUPPLEMENT_GROUPS: SupplementGroup[] = [
  {
    id: "foundation",
    title: "The foundation",
    items: [
      {
        id: "creatine",
        name: "Creatine Monohydrate",
        dose: "5g daily",
        when: "Any time, every day",
        does: "The most-proven supplement in existence for strength and muscle retention. Expect 1–2 lbs of water weight — that's not fat.",
        naturalSource: "Red meat and fish (in smaller amounts)",
        evidence:
          "Hundreds of trials and meta-analyses show creatine monohydrate increases strength and lean mass; endorsed by the ISSN position stand (Kreider et al., 2017).",
      },
      {
        id: "vitd",
        name: "Vitamin D3",
        dose: "2,000–4,000 IU",
        when: "With a meal if you don't get regular sun",
        does: "Supports hormones, bone, mood, and immunity.",
        naturalSource: "Sunlight on skin, fatty fish, egg yolks",
      },
      {
        id: "fish-oil",
        name: "Fish Oil (EPA/DHA)",
        dose: "2–3g combined EPA/DHA daily",
        when: "With food",
        does: "Joint comfort, heart and brain support.",
        naturalSource: "Salmon, sardines, mackerel — 2–3 fish meals a week can replace it",
      },
      {
        id: "mag",
        name: "Magnesium Glycinate",
        dose: "300–400mg",
        when: "1 hour before bed",
        does: "Most people run low; supports sleep depth, muscle relaxation, and recovery.",
        naturalSource: "Leafy greens, pumpkin seeds, almonds, dark chocolate",
        evidence: "Evidence for sleep is modest but favorable — don't oversell it.",
      },
      {
        id: "electrolytes",
        name: "Electrolytes / Sea Salt",
        dose: "Salt meals to taste",
        when: "High-step, high-sweat, or low-calorie days; a pinch of sea salt in morning water works",
        does: "Replaces sodium lost through sweat and high water intake.",
        naturalSource: "Salt, potatoes, fruit (potassium)",
      },
    ],
  },
  {
    id: "joints",
    title: "For joints",
    items: [
      {
        id: "collagen",
        name: "Collagen Peptides",
        dose: "10–15g daily",
        when: "With a vitamin C source (berries, citrus); 30–60 min before training may benefit tendons",
        does: "Supports connective tissue and joint comfort.",
        naturalSource: "Bone broth, skin-on meats, fish skin",
      },
      {
        id: "glucosamine",
        name: "Glucosamine + Chondroitin",
        dose: "1,500mg / 1,200mg daily",
        when: "Daily",
        does: "Optional; evidence is mixed but some people see meaningful relief after 4–8 weeks.",
        naturalSource: "Shellfish shells, animal cartilage (bone broth)",
        evidence: "Trial results are mixed; some individuals report meaningful relief.",
      },
      {
        id: "turmeric",
        name: "Turmeric (Curcumin) with black pepper",
        dose: "500–1,000mg curcumin with piperine",
        when: "With food",
        does: "A natural anti-inflammatory with decent evidence for joint comfort.",
        naturalSource: "Turmeric root",
      },
    ],
  },
  {
    id: "sleep",
    title: "For sleep",
    items: [
      {
        id: "mag-sleep",
        name: "Magnesium Glycinate",
        dose: "300–400mg",
        when: "1 hour before bed",
        does: "The first thing to try for sleep depth and muscle relaxation.",
        naturalSource: "Leafy greens, pumpkin seeds, almonds, dark chocolate",
        evidence: "Evidence for sleep is modest but favorable — don't oversell it.",
      },
      {
        id: "glycine",
        name: "Glycine",
        dose: "3g",
        when: "Before bed",
        does: "Can modestly deepen sleep and lower core temperature.",
        naturalSource: "Collagen, bone broth, meat skin",
        evidence: "Evidence is modest but favorable — don't oversell it.",
      },
      {
        id: "tart-cherry",
        name: "Tart Cherry Juice",
        dose: "8 oz",
        when: "Evening",
        does: "One of nature's few real melatonin sources, with recovery benefits. Count its ~120 calories.",
        naturalSource: "Tart cherries",
        evidence:
          "Tart cherries are a natural melatonin source with small trials showing modest sleep improvements.",
      },
      {
        id: "chamomile",
        name: "Chamomile Tea",
        dose: "1 warm cup",
        when: "At T-30",
        does: "Mild, pleasant, and doubles as the wind-down ritual itself.",
        naturalSource: "Chamomile flowers",
      },
      {
        id: "melatonin",
        name: "Melatonin",
        dose: "0.5–1mg",
        when: "Only when needed (travel, off nights), not nightly",
        does: "It's a hormone your body already makes; more is not better.",
        naturalSource: "Your own pineal gland — protect it by dimming lights at T-60",
      },
    ],
  },
  {
    id: "performance",
    title: "For performance (all-natural pre-workout)",
    items: [
      {
        id: "coffee",
        name: "Black Coffee",
        dose: "1–2 cups",
        when: "30–45 min before training; hard cutoff at noon",
        does: "Caffeine is the most effective legal performance aid there is.",
        naturalSource: "Coffee beans",
        evidence:
          "Caffeine (~3–6 mg/kg pre-exercise) reliably improves strength and endurance performance (ISSN position stand, Guest et al., 2021).",
      },
      {
        id: "beetroot",
        name: "Beetroot",
        dose: "Beetroot juice or 2 medium beets",
        when: "~2 hours before endurance work",
        does: "Natural nitrates improve blood flow and endurance.",
        naturalSource: "Beets",
      },
      {
        id: "watermelon",
        name: "Watermelon or citrulline-rich fruit",
        dose: "A serving pre-lift",
        when: "Before training",
        does: "A light natural pump aid; mostly a bonus, listed for completeness.",
        naturalSource: "Watermelon, other citrulline-rich fruit",
      },
      {
        id: "honey",
        name: "Honey",
        dose: "1 tsp",
        when: "In pre-run coffee or on the pre-workout banana",
        does: "Fast natural fuel before hard intervals.",
        naturalSource: "Honey",
      },
    ],
  },
];

export const PROTEIN_NATURAL = {
  title: "Protein, the natural way",
  foodFirst:
    "Food first, always: chicken, fish, lean beef, eggs, Greek yogurt, cottage cheese — both diets already hit protein targets from whole food.",
  whey:
    "Whey or casein protein (optional): a natural milk protein, useful only when a whole-food meal isn't possible. Buy single-ingredient or unflavored versions; skip anything with a long artificial ingredient list.",
};

export const SKIP_LIST = [
  {
    name: "Fat burners and \"detox\" anything",
    body: "Caffeine in a costume, sold on false promises.",
  },
  {
    name: "Testosterone boosters",
    body: "Herbal blends that don't move hormones; sleep, food, and lifting do.",
  },
  {
    name: "Proprietary-blend pre-workouts",
    body: "Undisclosed doses of artificial stimulants; black coffee beats them.",
  },
  {
    name: "Mass gainers",
    body: "Processed sugar shakes; if bulking, add rice, oats, and olive oil instead.",
  },
  {
    name: "BCAAs",
    body: "Redundant if you eat enough protein, which this guide guarantees.",
  },
  {
    name: "Anything that hides its doses",
    body: "If the label won't tell you what's inside, the answer is no.",
  },
];

export const BUYING_TIPS = [
  "Choose third-party-tested products (NSF Certified for Sport or Informed Sport logos).",
  "Single-ingredient products beat blends — you control the dose.",
  "Creatine: plain monohydrate, nothing fancier; it's the cheapest and best-studied form.",
  "Store fish oil in the fridge; if it tastes rancid, toss it.",
  "If a supplement's marketing promises fat loss or muscle without training, it's lying — natural or not.",
];
