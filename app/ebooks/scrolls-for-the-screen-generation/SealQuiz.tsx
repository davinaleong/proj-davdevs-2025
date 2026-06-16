'use client'

import { useState } from 'react'

// ── Seal data ─────────────────────────────────────────────────────────────

const SEALS = [
    {
        num: 1,
        icon: '/books/scrolls-for-the-screen-generation/01-heart.png',
        seal: 'The Beloved',
        volumeTitle: "Your Father isn't done with you yet",
        theme: 'Beloved / Identity',
        description:
            "This is your season of being reminded whose you are. You don't need to earn it — you just need to receive it. Vol. 1 was written for exactly this moment.",
        teaser: 'A reminder that you are His beloved — no matter what.',
    },
    {
        num: 2,
        icon: '/books/scrolls-for-the-screen-generation/02-sword.png',
        seal: 'The Fighter',
        volumeTitle: "The battle was never yours to fight alone",
        theme: 'Deliverance / Spiritual Warfare',
        description:
            "You're in a battle, and you're not losing — you just need to remember who's fighting for you. Vol. 2 will help you stand firm.",
        teaser: 'For when the battle feels bigger than you.',
    },
    {
        num: 3,
        icon: '/books/scrolls-for-the-screen-generation/03-podcast.png',
        seal: 'The Discerning',
        volumeTitle: "Wise words. Wise friends. Wise you.",
        theme: 'Wisdom / Words / Friendships',
        description:
            "You're in a season of discernment — about what you say, who you listen to, and the kind of person you're becoming. Vol. 3 speaks right into this.",
        teaser: 'For the words you speak and the friends you keep.',
    },
    {
        num: 4,
        icon: '/books/scrolls-for-the-screen-generation/04-lamp.png',
        seal: 'The Faithful Worker',
        volumeTitle: "Faith that shows up to work",
        theme: 'Labour / Integrity / Provision',
        description:
            "Your hands are full and your heart is asking if it's worth it. It is. Vol. 4 is your companion for the faithful grind.",
        teaser: 'For the faithful worker who wonders if it counts.',
    },
    {
        num: 5,
        icon: '/books/scrolls-for-the-screen-generation/05-keyboard.png',
        seal: 'The Long-Lived',
        volumeTitle: "More days. More peace. More wisdom.",
        theme: 'Long Life / Peace / Fruitfulness',
        description:
            "You're in a season of wanting more — more meaning, more peace, more days that count. Vol. 5 holds promises that'll anchor that longing.",
        teaser: 'For the soul that wants to live well and long.',
    },
    {
        num: 6,
        icon: '/books/scrolls-for-the-screen-generation/06-anchor.png',
        seal: 'The Valley Walker',
        volumeTitle: "Even in the valley, His eyes are on you",
        theme: 'Hope / Dark Seasons / God\'s Presence',
        description:
            "It's dark right now, but you're not alone and this isn't the end. Vol. 6 was written for the valley — and it will find you there.",
        teaser: 'For the darkest seasons — and the God who stays.',
    },
]

// ── Volume codes → pool size ───────────────────────────────────────────────

const CODES: Record<string, number> = {
    HEART01: 1,
    SWORD02: 2,
    WISDOM03: 3,
    LAMP04: 4,
    PEACE05: 5,
    ANCHOR06: 6,
}

// ── Questions ─────────────────────────────────────────────────────────────

const QUESTIONS = [
    {
        question: "What's been heavy on your heart lately?",
        options: [
            { text: "Feeling like I'm not enough", seal: 1 },
            { text: "Something feels like it's fighting against me", seal: 2 },
            { text: "I keep making the same mistakes", seal: 3 },
            { text: "I'm working so hard but nothing feels like it's moving", seal: 4 },
            { text: "I feel like time is slipping", seal: 5 },
            { text: "I feel invisible", seal: 6 },
        ],
    },
    {
        question: "If you could sit with Jesus over coffee right now, what would you say first?",
        options: [
            { text: '"Do You actually love me, even knowing all of this?"', seal: 1 },
            { text: '"I\'m so tired of fighting this alone"', seal: 2 },
            { text: '"I don\'t know what I\'m doing and I need help"', seal: 3 },
            { text: '"I\'m showing up every day — does it count for anything?"', seal: 4 },
            { text: '"I just want to live well. Is that enough?"', seal: 5 },
            { text: '"Are You there? Because it feels really dark"', seal: 6 },
        ],
    },
    {
        question: "What do you most need to hear from Him today?",
        options: [
            { text: '"You are Mine and I love you"', seal: 1 },
            { text: '"I\'ve got this — stand back and watch"', seal: 2 },
            { text: '"Here\'s what I\'d do in your shoes"', seal: 3 },
            { text: '"I see your effort and I\'m in it with you"', seal: 4 },
            { text: '"I\'m not done with you yet"', seal: 5 },
            { text: '"I see you. I haven\'t moved"', seal: 6 },
        ],
    },
    {
        question: "What's the thought that keeps coming back uninvited?",
        options: [
            { text: "I'm too much of a mess", seal: 1 },
            { text: "This is never going to get better", seal: 2 },
            { text: "Why do others seem to have it together", seal: 3 },
            { text: "What if all this effort amounts to nothing", seal: 4 },
            { text: "I don't have much time left", seal: 5 },
            { text: "Nobody really knows what I'm going through", seal: 6 },
        ],
    },
    {
        question: "What kind of reminder do you need most right now?",
        options: [
            { text: "That I'm loved as-is", seal: 1 },
            { text: "That I'm not fighting alone", seal: 2 },
            { text: "That God gives wisdom to those who ask", seal: 3 },
            { text: "That faithful work is never wasted", seal: 4 },
            { text: "That a good long life is still ahead", seal: 5 },
            { text: "That even here, He hasn't looked away", seal: 6 },
        ],
    },
]

// ── Component ─────────────────────────────────────────────────────────────

type Phase = 'code' | 'quiz' | 'result'

export default function SealQuiz() {
    const [phase, setPhase] = useState<Phase>('code')
    const [codeInput, setCodeInput] = useState('')
    const [codeError, setCodeError] = useState(false)
    const [poolSize, setPoolSize] = useState(0)
    const [questionIndex, setQuestionIndex] = useState(0)
    const [scores, setScores] = useState([0, 0, 0, 0, 0, 0])
    const [selected, setSelected] = useState<number | null>(null)
    const [resultIndex, setResultIndex] = useState(0)

    function submitCode() {
        const normalized = codeInput.trim().toUpperCase()
        const pool = CODES[normalized]
        if (!pool) {
            setCodeError(true)
            return
        }
        setCodeError(false)
        setPoolSize(pool)
        setQuestionIndex(0)
        setScores([0, 0, 0, 0, 0, 0])
        setSelected(null)
        setPhase('quiz')
    }

    function nextQuestion() {
        if (selected === null) return
        const option = QUESTIONS[questionIndex].options[selected]
        const newScores = scores.map((s, i) => (i === option.seal - 1 ? s + 1 : s))
        setScores(newScores)
        setSelected(null)

        if (questionIndex + 1 < QUESTIONS.length) {
            setQuestionIndex(questionIndex + 1)
        } else {
            // Highest score within unlocked pool; tiebreak: higher-numbered seal wins
            let bestScore = -1
            let bestIndex = 0
            for (let i = 0; i < poolSize; i++) {
                if (newScores[i] >= bestScore) {
                    bestScore = newScores[i]
                    bestIndex = i
                }
            }
            setResultIndex(bestIndex)
            setPhase('result')
        }
    }

    function reset() {
        setPhase('code')
        setCodeInput('')
        setCodeError(false)
        setPoolSize(0)
        setQuestionIndex(0)
        setScores([0, 0, 0, 0, 0, 0])
        setSelected(null)
    }

    const progress = (questionIndex / QUESTIONS.length) * 100
    const currentQuestion = QUESTIONS[questionIndex]
    const result = SEALS[resultIndex]
    const lockedSeals = SEALS.slice(poolSize)

    return (
        <section className="sfsg-section-quiz" id="which-seal">
            <div className="sfsg-container">
                <div className="sfsg-section-header">
                    <p className="sfsg-label">Collector&apos;s Feature</p>
                    <h2 className="sfsg-heading sfsg-section-heading">
                        Which Seal Matches Your Season?
                    </h2>
                    <p className="sfsg-prose sfsg-quiz-intro-text">
                        Five questions. Six seals. One volume written for exactly where you are.
                        Enter the code from the back of your ebook to begin.
                    </p>
                </div>

                <div className="sfsg-quiz-card">

                    {/* ── Code Entry ──────────────────────────────────────── */}
                    {phase === 'code' && (
                        <div className="sfsg-quiz-phase sfsg-quiz-phase-code">
                            <div className="sfsg-quiz-seal-row" aria-hidden>
                                {SEALS.map((s) => (
                                    <img
                                        key={s.num}
                                        src={s.icon}
                                        alt=""
                                        className="sfsg-quiz-seal-preview"
                                    />
                                ))}
                            </div>
                            <p className="sfsg-prose sfsg-quiz-body">
                                Each volume of <em>Scrolls for the Screen Generation</em> contains
                                a unique volume code in its back matter. Enter yours below — each
                                volume you own unlocks a wider pool of possible season seals.
                            </p>
                            <div className="sfsg-quiz-code-wrap">
                                <input
                                    className={`sfsg-quiz-code-input${codeError ? ' sfsg-quiz-code-input-error' : ''}`}
                                    type="text"
                                    value={codeInput}
                                    onChange={e => {
                                        setCodeInput(e.target.value)
                                        setCodeError(false)
                                    }}
                                    onKeyDown={e => e.key === 'Enter' && submitCode()}
                                    placeholder="Enter your volume code"
                                    autoComplete="off"
                                    spellCheck={false}
                                    maxLength={12}
                                />
                                <button
                                    onClick={submitCode}
                                    className="sfsg-btn-outline sfsg-quiz-code-btn"
                                >
                                    Unlock →
                                </button>
                            </div>
                            {codeError && (
                                <p className="sfsg-quiz-code-error" role="alert">
                                    That code doesn&apos;t look right — check the back of your volume.
                                </p>
                            )}
                        </div>
                    )}

                    {/* ── Question ────────────────────────────────────────── */}
                    {phase === 'quiz' && (
                        <div className="sfsg-quiz-phase sfsg-quiz-phase-question">
                            <div className="sfsg-quiz-progress-wrap">
                                <div className="sfsg-quiz-progress-bar">
                                    <div
                                        className="sfsg-quiz-progress-fill"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                                <span className="sfsg-quiz-progress-label">
                                    Question {questionIndex + 1} of {QUESTIONS.length}
                                </span>
                            </div>

                            <p className="sfsg-heading sfsg-quiz-question">
                                {currentQuestion.question}
                            </p>

                            <div className="sfsg-quiz-options">
                                {currentQuestion.options.map((opt, i) => (
                                    <button
                                        key={i}
                                        className={`sfsg-quiz-option${selected === i ? ' sfsg-quiz-option-selected' : ''}`}
                                        onClick={() => setSelected(i)}
                                    >
                                        {opt.text}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={nextQuestion}
                                disabled={selected === null}
                                className="sfsg-btn-outline sfsg-quiz-next-btn"
                            >
                                {questionIndex + 1 < QUESTIONS.length ? 'Next →' : 'Reveal My Seal →'}
                            </button>
                        </div>
                    )}

                    {/* ── Result ──────────────────────────────────────────── */}
                    {phase === 'result' && (
                        <>
                            <div className="sfsg-quiz-phase sfsg-quiz-phase-result">
                                <p className="sfsg-label">Your Season Seal</p>
                                <img
                                    src={result.icon}
                                    alt={result.seal}
                                    className="sfsg-quiz-result-seal"
                                />
                                <p className="sfsg-quiz-seal-name">{result.seal}</p>
                                <p className="sfsg-quiz-seal-theme">{result.theme}</p>
                                <p className="sfsg-prose sfsg-quiz-result-message">
                                    {result.description}
                                </p>
                                <div className="sfsg-quiz-result-actions">
                                    <a href="#get-the-series" className="sfsg-btn-outline">
                                        Read Vol. {result.num} — {result.volumeTitle}
                                    </a>
                                    <button onClick={reset} className="sfsg-quiz-retake">
                                        Take it again
                                    </button>
                                </div>
                            </div>

                            {/* ── Peek section ────────────────────────────── */}
                            {lockedSeals.length > 0 && (
                                <div className="sfsg-quiz-peek">
                                    <p className="sfsg-quiz-peek-heading">
                                        More seasons are waiting for you...
                                    </p>
                                    <div className="sfsg-quiz-peek-grid">
                                        {lockedSeals.map((seal) => (
                                            <div key={seal.num} className="sfsg-quiz-peek-item">
                                                <div className="sfsg-quiz-peek-icon-wrap">
                                                    <img
                                                        src={seal.icon}
                                                        alt=""
                                                        className="sfsg-quiz-peek-icon"
                                                    />
                                                    <span className="sfsg-quiz-peek-lock" aria-hidden>
                                                        &#x1F512;
                                                    </span>
                                                </div>
                                                <span className="sfsg-vol-num">
                                                    Vol {String(seal.num).padStart(2, '0')}
                                                </span>
                                                <p className="sfsg-quiz-peek-title">{seal.volumeTitle}</p>
                                                <p className="sfsg-quiz-peek-teaser">{seal.teaser}</p>
                                                <a href="#get-the-series" className="sfsg-quiz-peek-cta">
                                                    Unlock in Vol. {seal.num} →
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                </div>
            </div>
        </section>
    )
}
