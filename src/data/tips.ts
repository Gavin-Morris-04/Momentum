export type TipCategory =
  | "home"
  | "lift"
  | "diet"
  | "run"
  | "sleep"
  | "life";

export interface Tip {
  category: TipCategory;
  group: string;
  title: string;
  body: string;
  /** Optional one-sentence evidence line with named source */
  evidence?: string;
}

export const TIPS: Tip[] = [
  // HOME
  {
    category: "home",
    group: "Rules that make everything else work",
    title: "Consistency beats intensity.",
    body: "A B-grade plan done for 12 weeks beats a perfect plan done for 12 days.",
  },
  {
    category: "home",
    group: "Rules that make everything else work",
    title: "Track honestly.",
    body: "The scale, the food scale, and the logbook only help if the numbers are true.",
  },
  {
    category: "home",
    group: "Rules that make everything else work",
    title: "Weigh in daily, judge weekly.",
    body: "Same time, same conditions, and only trust the 7-day average — daily weight swings 2–4 lbs on water alone.",
    evidence:
      "Daily body weight varies with water, sodium, and glycogen; weekly averages track true change — standard dietetics guidance.",
  },
  {
    category: "home",
    group: "Rules that make everything else work",
    title: "Take start photos and measurements.",
    body: "Front, side, back, plus waist at the navel. The mirror lies day to day; photos every 2 weeks don't.",
  },
  {
    category: "home",
    group: "Rules that make everything else work",
    title: "Never miss twice.",
    body: "One missed workout or blown meal is noise. Two in a row is the start of a new habit.",
  },
  {
    category: "home",
    group: "Rules that make everything else work",
    title: "Prepare the night before.",
    body: "Gym clothes laid out, meals prepped, tomorrow's first task written down. Discipline is mostly preparation.",
  },
  {
    category: "home",
    group: "Rules that make everything else work",
    title: "Make it stupid-convenient.",
    body: "Gym on your commute, food already cooked, shoes by the door. Willpower is for emergencies, not daily use.",
  },
  {
    category: "home",
    group: "Rules that make everything else work",
    title: "One goal at a time.",
    body: "Cut or bulk — commit for 8–12 weeks. Changing direction every two weeks produces nothing.",
  },
  {
    category: "home",
    group: "Rules that make everything else work",
    title: "Steps are the secret weapon.",
    body: "15–20k daily steps burns more over a week than any single workout and costs almost no recovery.",
  },
  {
    category: "home",
    group: "Rules that make everything else work",
    title: "Tell someone.",
    body: "State your goal out loud to a friend or train with a partner. Public commitments survive bad days.",
  },
  {
    category: "home",
    group: "Rules that make everything else work",
    title: "Expect the dip.",
    body: "Motivation peaks at Day 1 and dips around weeks 2–3 of Fit 60. That dip is normal, not a sign the plan is broken.",
  },
  {
    category: "home",
    group: "Rules that make everything else work",
    title: "The plan doesn't change on weekends.",
    body: "Saturdays count exactly as much as Tuesdays.",
  },

  // LIFT — TECHNIQUE
  {
    category: "lift",
    group: "Technique & execution",
    title: "Ramp into your first lift.",
    body: "2–3 warm-up sets on the first compound: bar × 10, ~50% × 5, ~75% × 3, then work sets. Warm muscles lift more and tear less.",
  },
  {
    category: "lift",
    group: "Technique & execution",
    title: "Full range of motion, especially the stretch.",
    body: "The deep stretched position (bottom of an incline press, dead-hang of a pullup) drives the most growth. Never cut depth to add weight.",
  },
  {
    category: "lift",
    group: "Technique & execution",
    title: "Control the negative.",
    body: "Lower in 2–3 controlled seconds, lift with intent. Anyone can drop a weight; growth lives in the lowering.",
  },
  {
    category: "lift",
    group: "Technique & execution",
    title: "Brace before every heavy rep.",
    body: "Big breath into the belly, tighten like you're about to be punched, then move. Exhale through the sticking point.",
  },
  {
    category: "lift",
    group: "Technique & execution",
    title: "Film your top sets.",
    body: "Your phone against a water bottle is a free coach — check depth, bar path, and back position weekly.",
  },
  {
    category: "lift",
    group: "Technique & execution",
    title: "Grip is a silent limiter.",
    body: "Chalk or straps on heavy rows, deadlifts, and pulldowns — never let your hands end a back set early.",
  },

  // LIFT — PROGRESSION
  {
    category: "lift",
    group: "Progression",
    title: "Double progression is the whole game.",
    body: "Pick a rep range (say 8–12). Hit the top of the range on all sets → add weight → drop to the bottom → climb again. Log every session.",
  },
  {
    category: "lift",
    group: "Progression",
    title: "Keep a logbook.",
    body: "Notes app or paper — weight, sets, reps, and how it felt. If you're not writing it down, you're guessing.",
  },
  {
    category: "lift",
    group: "Progression",
    title: "On a cut, holding strength IS progress.",
    body: "Don't chase PRs in a deficit; keep your weights and reps and you're keeping your muscle.",
  },
  {
    category: "lift",
    group: "Progression",
    title: "Train 1–3 reps shy of failure on compounds.",
    body: "RPE 7–9 grows muscle with far less joint cost. Isolation work (curls, raises) can go to failure safely.",
  },
  {
    category: "lift",
    group: "Progression",
    title: "Deload every 6–8 weeks.",
    body: "One week at ~60% of normal weights. You don't lose progress in a week; you lose it grinding through a month of junk sessions.",
  },
  {
    category: "lift",
    group: "Progression",
    title: "Plateau checklist, in order.",
    body: "Sleep, food, effort, then program. The program is almost never the actual problem.",
  },

  // LIFT — SESSION
  {
    category: "lift",
    group: "Session efficiency",
    title: "Superset opposites, not everything.",
    body: "Pair antagonists (curls + pushdowns, rows + presses) or throw core between sets to cut 15 minutes without hurting strength.",
  },
  {
    category: "lift",
    group: "Session efficiency",
    title: "Rest long enough to actually perform.",
    body: "2–3 min on compounds, 60–90s on isolation. Racing the clock on squats just makes set 3 worse, not more effective.",
  },
  {
    category: "lift",
    group: "Session efficiency",
    title: "Order by priority.",
    body: "Whatever you want to grow most goes first, when you're freshest. Weak shoulders? Presses before chest work.",
  },
  {
    category: "lift",
    group: "Session efficiency",
    title: "Have a crowded-gym plan B.",
    body: "Know one dumbbell or machine substitute for every barbell lift so a taken rack never wrecks a session.",
  },

  // LIFT — RECOVERY
  {
    category: "lift",
    group: "Recovery & mindset",
    title: "Soreness isn't the scoreboard.",
    body: "Judge sessions by the logbook, not how crippled you feel. Zero soreness with climbing numbers is perfect.",
  },
  {
    category: "lift",
    group: "Recovery & mindset",
    title: "Protein and sleep are half your program.",
    body: "The gym makes the signal; food and 8 hours build the muscle.",
  },
  {
    category: "lift",
    group: "Recovery & mindset",
    title: "Sharp pain = stop; ache = manage.",
    body: "Joint pain that persists 2+ sessions means swap the exercise for a pain-free variation — there's always one.",
  },
  {
    category: "lift",
    group: "Recovery & mindset",
    title: "Stick with a split for at least 8 weeks.",
    body: "Program-hopping resets progress. Boredom is usually a sign it's working.",
  },

  // DIET — SETUP
  {
    category: "diet",
    group: "Setup & tracking",
    title: "Buy a food scale. Use it for everything.",
    body: '"One serving" of oats eyeballed can be off by 200 calories. The scale is the difference between a deficit on paper and a deficit in reality.',
  },
  {
    category: "diet",
    group: "Setup & tracking",
    title: "Weigh food raw when possible, and be consistent.",
    body: "Raw vs cooked changes weights dramatically (rice triples, meat shrinks ~25%). Pick one method per food and never switch.",
  },
  {
    category: "diet",
    group: "Setup & tracking",
    title: "Batch-cook twice a week.",
    body: "Sunday and Wednesday: cook all protein and starches for 3–4 days. Decisions cause diet breaks; prepped food removes the decision.",
  },
  {
    category: "diet",
    group: "Setup & tracking",
    title: "Shop the perimeter.",
    body: "Produce, meat, dairy, eggs — the outer ring of the store is where natural food lives. If it has more than a few ingredients on the label, it stays on the shelf.",
  },
  {
    category: "diet",
    group: "Setup & tracking",
    title: "Judge by the weekly average.",
    body: "Daily scale weight swings 2–4 lbs from water, sodium, and carbs. Average Mon–Sun and compare week to week.",
  },
  {
    category: "diet",
    group: "Setup & tracking",
    title: "Recalculate as you shrink or grow.",
    body: "Every 10 lbs of change, rerun the calculator — a lighter body burns less.",
  },

  // DIET — HUNGER
  {
    category: "diet",
    group: "Hunger management",
    title: "Protein and volume first.",
    body: "Lean protein and fibrous vegetables fill you for the fewest calories. A 300g potato out-satisfies 60g of rice at the same calories.",
  },
  {
    category: "diet",
    group: "Hunger management",
    title: "Drink water before meals.",
    body: "16 oz about 15 minutes before eating measurably reduces how much you eat.",
  },
  {
    category: "diet",
    group: "Hunger management",
    title: "Eat slowly, from a plate, sitting down.",
    body: "Fullness lags ~20 minutes behind eating. Grazing from packages is how untracked calories happen.",
  },
  {
    category: "diet",
    group: "Hunger management",
    title: "Fruit is dessert.",
    body: "Cold grapes, frozen berries, a crisp apple — sweet cravings answered for 100 calories of natural food.",
  },
  {
    category: "diet",
    group: "Hunger management",
    title: "Black coffee and sparkling water are appetite tools.",
    body: "Both blunt hunger between meals for zero calories. Caffeine still ends at noon.",
  },
  {
    category: "diet",
    group: "Hunger management",
    title: "Hungry at night? Push carbs later.",
    body: "Moving more of your carbs to the evening meal makes cutting dramatically easier for most people — total calories matter, timing is comfort.",
  },
  {
    category: "diet",
    group: "Hunger management",
    title: "A 10-minute walk kills most cravings.",
    body: "Hunger spikes pass in 15–20 minutes whether you eat or not.",
  },

  // DIET — HIDDEN
  {
    category: "diet",
    group: "Hidden calories",
    title: "Don't drink calories.",
    body: "Juice, soda, sweetened coffee, alcohol — hundreds of calories with zero fullness. Water, black coffee, plain tea.",
  },
  {
    category: "diet",
    group: "Hidden calories",
    title: "Measure your oils.",
    body: "One careless glug of olive oil is 200+ calories. Use a spray or measure by the teaspoon; cook lean proteins in nonstick.",
  },
  {
    category: "diet",
    group: "Hidden calories",
    title: "Sauces are stealth calories.",
    body: "Mustard, hot sauce, vinegar, salsa, herbs, and lemon are free. Creamy dressings, mayo, and sugary BBQ sauce are not.",
  },
  {
    category: "diet",
    group: "Hidden calories",
    title: "Restaurant survival rule.",
    body: "Order a grilled protein + a plain starch + vegetables, sauces on the side, skip the bread basket, and log it generously. One meal out never broke a diet; not logging it did.",
  },

  // DIET — TRACK
  {
    category: "diet",
    group: "Staying on track",
    title: "Never let a bad meal become a bad week.",
    body: "Overate at lunch? The next meal is back on plan — not tomorrow, not Monday. No compensating by starving, either.",
  },
  {
    category: "diet",
    group: "Staying on track",
    title: "Plateau protocol (2+ weeks, no change).",
    body: "First verify tracking honesty, then add 1,500 steps, then drop 100 calories. In that order, one lever at a time.",
  },
  {
    category: "diet",
    group: "Staying on track",
    title: "Salt your food on a cut.",
    body: "High water intake + high steps (especially in heat) demands sodium. Potatoes and fruit cover your potassium.",
  },
  {
    category: "diet",
    group: "Staying on track",
    title: "A 60-day cut is the maximum before a break.",
    body: "Fit 60's cut ends exactly where a diet break should begin — days 61+ are for maintenance, and maintenance is a skill this plan already taught you. Bulking: gain no faster than ~2 lbs a month — faster is just fat.",
  },
  {
    category: "diet",
    group: "Staying on track",
    title: "Keep protein at every meal.",
    body: "30–55g per sitting keeps muscle protein synthesis topped up and hunger quiet — both diets are already built this way.",
  },

  // RUN — PACING
  {
    category: "run",
    group: "Pacing & training",
    title: "Run your easy runs embarrassingly slow.",
    body: "80% of your running should be truly conversational. Running easy days too hard is the #1 amateur mistake — it steals recovery and makes hard days mediocre.",
    evidence:
      "Elite endurance athletes cluster ~80% of training at low intensity; polarized/pyramidal distributions outperform threshold-heavy training (Seiler's training-intensity-distribution research).",
  },
  {
    category: "run",
    group: "Pacing & training",
    title: "Heart rate is the target, not pace.",
    body: "In heat and humidity your HR rises at the same speed; slow down and hold the zone. The fitness adaptation follows HR, not the pace on your watch.",
  },
  {
    category: "run",
    group: "Pacing & training",
    title: "Add mileage ~10% per week, with a down week every 4th.",
    body: "Bones and tendons adapt slower than lungs. Patience here is injury prevention.",
  },
  {
    category: "run",
    group: "Pacing & training",
    title: "Walk breaks are a tool, not a failure.",
    body: "New runners: alternate run/walk until continuous running is comfortable. Finishing fresh beats limping home.",
  },
  {
    category: "run",
    group: "Pacing & training",
    title: "On intervals, the last rep should match the first.",
    body: "If rep 8 is way slower than rep 1, you started too fast. Even effort across all rounds is the skill.",
  },
  {
    category: "run",
    group: "Pacing & training",
    title: "Don't race your watch every day.",
    body: 'Fitness shows up over months. One "proving it" run per month maximum.',
  },

  // RUN — FORM
  {
    category: "run",
    group: "Form & breathing",
    title: "Shorten your stride, quicken your steps.",
    body: "Aim for light, quick steps (~170–180/min) landing under your hips — the cheapest fix for knee and shin pain.",
  },
  {
    category: "run",
    group: "Form & breathing",
    title: "Run tall, look ahead.",
    body: "Eyes on the horizon, slight forward lean from the ankles, relaxed shoulders, loose hands.",
  },
  {
    category: "run",
    group: "Form & breathing",
    title: "Breathe in a rhythm.",
    body: "Try 3 steps in / 2 out on easy runs, 2/2 on hard efforts. Rhythmic breathing calms pace and side stitches alike.",
  },
  {
    category: "run",
    group: "Form & breathing",
    title: "Side stitch fix.",
    body: "Exhale hard as the foot on the opposite side of the stitch strikes, slow down, press the spot. Usually gone in a minute.",
  },

  // RUN — GEAR
  {
    category: "run",
    group: "Gear & conditions",
    title: "Buy real running shoes, replace at 300–500 miles.",
    body: "Comfort at a run-shop fitting beats brand or looks. Rotating two pairs cuts injury risk and extends both.",
  },
  {
    category: "run",
    group: "Gear & conditions",
    title: "Beat the heat by scheduling around it.",
    body: "Run at dawn, pick shade, slow your pace expectation ~30–60s/mile in real humidity. Evening intensity also delays sleep.",
  },
  {
    category: "run",
    group: "Gear & conditions",
    title: "Hydrate before, sip during, salt after.",
    body: "16 oz an hour before; carry water past 45 minutes; salt your next meal after sweaty runs.",
  },
  {
    category: "run",
    group: "Gear & conditions",
    title: "Dress for mile 2, not mile 0.",
    body: "You warm up ~15–20°F worth once moving. If you're comfortable standing still at the start, you're overdressed.",
  },
  {
    category: "run",
    group: "Gear & conditions",
    title: "Treadmill: set 1% incline.",
    body: "Matches outdoor effort, and use it guilt-free in dangerous heat or darkness.",
  },

  // RUN — RECOVERY
  {
    category: "run",
    group: "Recovery & injury",
    title: "Shins or knees complaining for 2+ runs?",
    body: "Swap one run for incline walking for a week and check your shoe mileage and cadence. Steps still count toward the 15–20k.",
  },
  {
    category: "run",
    group: "Recovery & injury",
    title: "Fuel the long run.",
    body: "Easy runs under an hour need nothing; before longer or harder sessions, a banana 30–60 min prior improves the whole workout.",
  },
  {
    category: "run",
    group: "Recovery & injury",
    title: "Runs count toward your steps — plan them in.",
    body: "A 4-mile run is roughly 6–7k steps. Morning run + normal day usually clears 20k without trying.",
  },

  // SLEEP
  {
    category: "sleep",
    group: "Sleep tips",
    title: "Same bedtime and wake time, seven days a week.",
    body: 'Consistency sets your body clock more than any supplement. "Catching up" on weekends just re-jetlags you Monday.',
    evidence:
      "Nedeltcheva et al., 2010, Annals of Internal Medicine — short sleep shifts fat loss toward lean mass.",
  },
  {
    category: "sleep",
    group: "Sleep tips",
    title: "Sunlight within 30 minutes of waking.",
    body: "Ten to fifteen minutes anchors your circadian rhythm and makes 10:30 arrive naturally.",
  },
  {
    category: "sleep",
    group: "Sleep tips",
    title: "Caffeine ends at noon.",
    body: "Its half-life means an afternoon coffee is still in your blood at bedtime — see the evidence card above.",
    evidence: "Gardiner et al., 2023 systematic review & meta-analysis, Sleep Medicine Reviews.",
  },
  {
    category: "sleep",
    group: "Sleep tips",
    title: "Hot shower 1–2 hours before bed.",
    body: "The body-temperature drop afterward is a natural sleep trigger.",
    evidence: "Haghayegh et al., 2019 meta-analysis.",
  },
  {
    category: "sleep",
    group: "Sleep tips",
    title: "Can't sleep after 20 minutes? Get up.",
    body: "Read something dull in dim light until drowsy. Lying awake teaches your brain that bed = worrying.",
  },
  {
    category: "sleep",
    group: "Sleep tips",
    title: "The bed is for sleep only.",
    body: "No laptop, no scrolling, no eating. Your brain should associate lying down with switching off.",
  },
  {
    category: "sleep",
    group: "Sleep tips",
    title: "Alcohol fakes sleep.",
    body: "Sedation in, fragmented and REM-poor sleep out — one more reason for the no-alcohol rule.",
  },
  {
    category: "sleep",
    group: "Sleep tips",
    title: "Wake time is the anchor, even after a late night.",
    body: "Get up at 6:30 anyway. Sleeping in more than an hour shifts your clock and makes the next night harder.",
  },
  {
    category: "sleep",
    group: "Sleep tips",
    title: "Dim the bathroom light during wind-down.",
    body: "A five-minute blast of bright light at T-10 undoes an hour of dimming. Night light or a dim lamp only.",
  },
  {
    category: "sleep",
    group: "Sleep tips",
    title: "Socks or a warm foot bath help cold sleepers.",
    body: "Peripheral warming speeds heat loss from your core — the same mechanism as a warm bath.",
  },
  {
    category: "sleep",
    group: "Sleep tips",
    title: "Track mornings, not hours.",
    body: "Waking without the alarm most days means it's working. Obsessing over sleep-app scores usually makes sleep worse.",
  },
  {
    category: "sleep",
    group: "Sleep tips",
    title: "One bad night costs little.",
    body: "Don't nap long, don't caffeinate late, don't sleep in. The rescue behaviors are what create bad weeks.",
  },

  // LIFE — MIND
  {
    category: "life",
    group: "Mind & habits",
    title: "Win the first hour.",
    body: "Sunlight, water, made bed, journal — before the phone. The first hour untouched by other people's noise sets the whole day.",
  },
  {
    category: "life",
    group: "Mind & habits",
    title: "No phone for the first 30 minutes and last 60.",
    body: "Your morning attention and evening melatonin are too valuable to donate to a feed.",
  },
  {
    category: "life",
    group: "Mind & habits",
    title: "Name the frog, eat it first.",
    body: "The task you're avoiding costs more energy avoided than done. Write it in the morning journal and do it before noon.",
  },
  {
    category: "life",
    group: "Mind & habits",
    title: "Do one hard thing a week on purpose.",
    body: "Dawn run in the cold, a skill that embarrasses you, the conversation you've delayed. Confidence is a pile of kept promises to yourself.",
  },
  {
    category: "life",
    group: "Mind & habits",
    title: "Two-minute rule for a tidy life.",
    body: "If it takes under two minutes — dish, email, made bed — do it now. Clutter is a tax on every other habit.",
  },
  {
    category: "life",
    group: "Mind & habits",
    title: "Motivation follows action.",
    body: "You will almost never feel like starting. Start anyway; the feeling shows up around minute five.",
  },

  // LIFE — ADVENTURE & PRESENCE
  {
    category: "life",
    group: "Adventure & presence",
    title: "Schedule microadventures like appointments.",
    body: "Pick the day and put it on the calendar Thursday. \"Sometime this week\" becomes never.",
  },
  {
    category: "life",
    group: "Adventure & presence",
    title: "Take one photo, then put it away.",
    body: "Document the moment, then be in it. The adventure is for you, not your feed.",
  },
  {
    category: "life",
    group: "Adventure & presence",
    title: "The best adventure partner is a friend you've been meaning to see.",
    body: "Invite someone. Shared memory beats solo bragging rights every time.",
  },
  {
    category: "life",
    group: "Adventure & presence",
    title: "One screenless meal a day.",
    body: "Taste the food you weighed so carefully. No phone, no TV — just the plate.",
  },
  {
    category: "life",
    group: "Adventure & presence",
    title: "Walk without input once a day.",
    body: "No podcast, no music. Boredom is where your best thinking lives.",
  },

  // LIFE — PEOPLE
  {
    category: "life",
    group: "People & meaning",
    title: "One real conversation a day.",
    body: "Call, don't text, at least one person. Decades of research say relationships are the strongest predictor of happiness there is.",
    evidence:
      "The Harvard Study of Adult Development — running since 1938 — finds relationship quality is the strongest predictor of long-term happiness and health.",
  },
  {
    category: "life",
    group: "People & meaning",
    title: "Serve someone weekly who can't repay you.",
    body: "Service reliably outperforms self-care for lifting mood — and it gets your eyes off your own scale.",
  },
  {
    category: "life",
    group: "People & meaning",
    title: "Tell people your standard.",
    body: "Announcing the no-alcohol month or the 6 AM lift recruits your friends as accountability instead of temptation.",
  },
  {
    category: "life",
    group: "People & meaning",
    title: "Guard a Sabbath block.",
    body: "A half-day of genuine rest each week isn't lost progress; it's what makes the other six and a half days sustainable.",
  },
  {
    category: "life",
    group: "People & meaning",
    title: "Touch grass, literally.",
    body: "Walks outside, sunlight, green space — nature time measurably lowers stress. Stack it with your step count.",
    evidence:
      "Time in green space is associated with lower stress hormones and better mood; ~120 min/week in nature is associated with higher well-being (2019 Scientific Reports).",
  },
  {
    category: "life",
    group: "People & meaning",
    title: "Compare backward, not sideways.",
    body: "Measure against yourself 90 days ago, not someone else's highlight reel. The photos and the logbook exist for exactly this.",
  },
];

export function tipsFor(category: TipCategory): Tip[] {
  return TIPS.filter((t) => t.category === category);
}

export function groupTips(tips: Tip[]): { group: string; tips: Tip[] }[] {
  const order: string[] = [];
  const map = new Map<string, Tip[]>();
  for (const tip of tips) {
    if (!map.has(tip.group)) {
      map.set(tip.group, []);
      order.push(tip.group);
    }
    map.get(tip.group)!.push(tip);
  }
  return order.map((group) => ({ group, tips: map.get(group)! }));
}
