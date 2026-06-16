# Seal Season Quiz — Product Spec

_Scrolls for the Screen Generation — Collector's Interactive Feature_

---

## Overview

A short quiz on the series website that returns the reader's current "season seal" — one of six wax seal emblems from the _Scrolls for the Screen Generation_ series. The result is personalized by the reader's quiz answers, but silently scoped by a volume code they enter at the start. Readers who own more volumes have access to a wider pool of possible results.

---

## Seals Reference

| #   | Volume Title                              | Seal Icon           | Season Theme                         |
| --- | ----------------------------------------- | ------------------- | ------------------------------------ |
| 1   | Your Father isn't done with you yet       | Heart               | Beloved / Identity                   |
| 2   | The battle was never yours to fight alone | Sword               | Deliverance / Spiritual warfare      |
| 3   | Wise words. Wise friends. Wise you.       | Podcast/speech icon | Wisdom / Words / Friendships         |
| 4   | Faith that shows up to work               | Lamp                | Labour / Integrity / Provision       |
| 5   | More days. More peace. More wisdom.       | Keyboard            | Long life / Peace / Fruitfulness     |
| 6   | Even in the valley, His eyes are on you   | Anchor              | Hope / Dark seasons / God's presence |

---

## User Flow

```
[Landing page]
      ↓
[Enter volume code]
      ↓
[Code silently sets seal pool: seals 1..N]
      ↓
[5 quiz questions — one screen each]
      ↓
[Scoring runs against all 6 seals in background]
      ↓
[Result: highest-scoring seal within unlocked pool]
      ↓
[Reveal screen: current season seal — full color]
      ↓
[Peek section: locked seals teased below reveal]
```

---

## Volume Codes

One fixed code per volume. Codes are printed in the back matter of each ebook.

| Volume | Code       | Unlocks Pool |
| ------ | ---------- | ------------ |
| 1      | `HEART01`  | Seal 1 only  |
| 2      | `SWORD02`  | Seals 1–2    |
| 3      | `WISDOM03` | Seals 1–3    |
| 4      | `LAMP04`   | Seals 1–4    |
| 5      | `PEACE05`  | Seals 1–5    |
| 6      | `ANCHOR06` | Seals 1–6    |

> **Note:** Codes are not case-sensitive. No backend required — codes map client-side to a pool size integer (1–6). No user accounts or tracking needed.

---

## Quiz Questions & Answer-to-Seal Mapping

Each answer is weighted toward one seal (1–6). All 5 answers are tallied; highest total within the unlocked pool = result seal.

---

### Q1 — "What's been heavy on your heart lately?"

| Answer                                                 | Seal         |
| ------------------------------------------------------ | ------------ |
| Feeling like I'm not enough                            | 1 — Heart    |
| Something feels like it's fighting against me          | 2 — Sword    |
| I keep making the same mistakes                        | 3 — Wisdom   |
| I'm working so hard but nothing feels like it's moving | 4 — Lamp     |
| I feel like time is slipping                           | 5 — Keyboard |
| I feel invisible                                       | 6 — Anchor   |

---

### Q2 — "If you could sit with Jesus over coffee right now, what would you say first?"

| Answer                                                   | Seal         |
| -------------------------------------------------------- | ------------ |
| "Do You actually love me, even knowing all of this?"     | 1 — Heart    |
| "I'm so tired of fighting this alone"                    | 2 — Sword    |
| "I don't know what I'm doing and I need help"            | 3 — Wisdom   |
| "I'm showing up every day — does it count for anything?" | 4 — Lamp     |
| "I just want to live well. Is that enough?"              | 5 — Keyboard |
| "Are You there? Because it feels really dark"            | 6 — Anchor   |

---

### Q3 — "What do you most need to hear from Him today?"

| Answer                                     | Seal         |
| ------------------------------------------ | ------------ |
| "You are Mine and I love you"              | 1 — Heart    |
| "I've got this — stand back and watch"     | 2 — Sword    |
| "Here's what I'd do in your shoes"         | 3 — Wisdom   |
| "I see your effort and I'm in it with you" | 4 — Lamp     |
| "I'm not done with you yet"                | 5 — Keyboard |
| "I see you. I haven't moved"               | 6 — Anchor   |

---

### Q4 — "What's the thought that keeps coming back uninvited?"

| Answer                                     | Seal         |
| ------------------------------------------ | ------------ |
| I'm too much of a mess                     | 1 — Heart    |
| This is never going to get better          | 2 — Sword    |
| Why do others seem to have it together     | 3 — Wisdom   |
| What if all this effort amounts to nothing | 4 — Lamp     |
| I don't have much time left                | 5 — Keyboard |
| Nobody really knows what I'm going through | 6 — Anchor   |

---

### Q5 — "What kind of reminder do you need most right now?"

| Answer                                 | Seal         |
| -------------------------------------- | ------------ |
| That I'm loved as-is                   | 1 — Heart    |
| That I'm not fighting alone            | 2 — Sword    |
| That God gives wisdom to those who ask | 3 — Wisdom   |
| That faithful work is never wasted     | 4 — Lamp     |
| That a good long life is still ahead   | 5 — Keyboard |
| That even here, He hasn't looked away  | 6 — Anchor   |

---

## Scoring Logic

```
scores = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }

for each answer:
    scores[mapped_seal] += 1

pool = seals 1..N  (determined by entered code)

result = seal with highest score within pool

// Tiebreak: if two seals tie, prefer the higher-numbered seal
// (rewards readers who own more volumes with a slightly wider result range)
```

---

## Reveal Screen

**Components:**

- Seal icon — full color, large
- Season label (e.g. "Your season seal: The Beloved")
- 2–3 line description of what this season means
- CTA: "Read Vol. [N] — [title]" → links to purchase/download

---

### Reveal Copy per Seal

**Seal 1 — Heart (Beloved)**

> This is your season of being reminded whose you are. You don't need to earn it — you just need to receive it. Vol. 1 was written for exactly this moment.

**Seal 2 — Sword (Deliverance)**

> You're in a battle, and you're not losing — you just need to remember who's fighting for you. Vol. 2 will help you stand firm.

**Seal 3 — Wisdom (Words & Friendships)**

> You're in a season of discernment — about what you say, who you listen to, and the kind of person you're becoming. Vol. 3 speaks right into this.

**Seal 4 — Lamp (Labour)**

> Your hands are full and your heart is asking if it's worth it. It is. Vol. 4 is your companion for the faithful grind.

**Seal 5 — Keyboard (Long life & Peace)**

> You're in a season of wanting more — more meaning, more peace, more days that count. Vol. 5 holds promises that'll anchor that longing.

**Seal 6 — Anchor (Valley)**

> It's dark right now, but you're not alone and this isn't the end. Vol. 6 was written for the valley — and it will find you there.

---

## Peek Section (below Reveal)

Shown after the result seal is revealed. Locked seals are displayed dimmed with a lock icon.

**Heading:** _"More seasons are waiting for you..."_

**For each locked seal (seals above N):**

- Show seal icon — greyscale + lock overlay
- Volume number and title
- One-line teaser

**Teaser copy per locked seal:**

| Seal         | Teaser                                                  |
| ------------ | ------------------------------------------------------- |
| 1 — Heart    | "A reminder that you are His beloved — no matter what." |
| 2 — Sword    | "For when the battle feels bigger than you."            |
| 3 — Wisdom   | "For the words you speak and the friends you keep."     |
| 4 — Lamp     | "For the faithful worker who wonders if it counts."     |
| 5 — Keyboard | "For the soul that wants to live well and long."        |
| 6 — Anchor   | "For the darkest seasons — and the God who stays."      |

**CTA per locked seal:** "Unlock in Vol. [N]" → purchase link

> **Note:** Readers don't see the pool-capping mechanic explained anywhere. The peek section frames locked seals purely as "more of the series to discover" — not as a limitation. The collector framing does the work.

---

## UI States

| State        | Trigger                     | Behaviour                                                                                  |
| ------------ | --------------------------- | ------------------------------------------------------------------------------------------ |
| Invalid code | Unrecognised string entered | "That code doesn't look right — check the back of your volume." No pool set, quiz blocked. |
| Pool of 1    | Vol 1 code                  | Quiz runs, result is always Seal 1 regardless of answers. Peek shows seals 2–6 locked.     |
| Pool of 6    | Vol 6 code                  | Full quiz, all seals in play, no peek section (or peek section hidden).                    |
| Tie          | Two seals score equally     | Higher-numbered seal wins.                                                                 |

---

# Seal Mapping

- Located in the /public folder
- prefixed by numeric sequence: 01-xxx.png, 02-xxx.png, etc

---

## Out of Scope (v1)

- User accounts or saved results
- Email capture on result screen (can be added later)
- Shareable result card (nice future addition)
- Randomised or rotating codes
- Backend code validation

---

## Future Ideas

- **Shareable result card** — "I'm in a [Beloved] season. What's yours?" — with seal image, designed for Instagram Stories
- **Email capture** — "Save your seal" triggers an opt-in, sends result + vol. recommendation by email
- **Re-take logic** — "Seasons change. Re-take the quiz anytime." with localStorage storing last result + date
- **7th secret seal** — unlocked only when all 6 codes have been entered at least once; reveals a "Collector" seal exclusive to the full series
