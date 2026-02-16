/**
 * Virtual Interview Practice App
 * Handles category selection, random questions, timer, scoring, and local storage
 */

// ===== QUESTIONS DATA (10+ per category, per difficulty) =====
const questionsData = {
    html: {
        easy: [
            { q: "What does HTML stand for?", keywords: ["hypertext", "markup", "language"], sample: "HTML stands for HyperText Markup Language. It is the standard markup language for creating web pages." },
            { q: "What is the purpose of the <!DOCTYPE> declaration?", keywords: ["document", "type", "html5", "standard"], sample: "The <!DOCTYPE> declaration tells the browser which HTML version the document uses, ensuring proper rendering." },
            { q: "What is the difference between <div> and <span>?", keywords: ["block", "inline", "division", "span"], sample: "<div> is a block-level element that starts on a new line. <span> is an inline element used within text." },
            { q: "What does the <a> tag do?", keywords: ["anchor", "link", "hyperlink", "href"], sample: "The <a> tag creates hyperlinks. Use the href attribute to specify the link destination." },
            { q: "What is semantic HTML?", keywords: ["semantic", "meaning", "structure", "header", "footer", "article"], sample: "Semantic HTML uses tags that convey meaning (e.g., <header>, <footer>, <article>) for better accessibility and SEO." },
            { q: "What is the role of the <meta> tag?", keywords: ["meta", "metadata", "charset", "viewport", "description"], sample: "<meta> provides metadata about the document, like charset, viewport settings, and description for SEO." },
            { q: "Explain the purpose of alt attribute in <img>", keywords: ["alt", "alternative", "accessibility", "image"], sample: "The alt attribute provides alternative text for images, crucial for accessibility and when images fail to load." },
            { q: "What is the difference between id and class?", keywords: ["id", "class", "unique", "multiple"], sample: "id is unique per page; class can be used on multiple elements for styling or scripting." },
            { q: "What does the <form> element do?", keywords: ["form", "input", "submit", "data"], sample: "The <form> element collects user input and can submit data to a server for processing." },
            { q: "What is the purpose of the <table> element?", keywords: ["table", "rows", "columns", "tabular"], sample: "<table> displays data in rows and columns. Use <tr>, <td>, <th> for structure." }
        ],
        medium: [
            { q: "Explain the HTML5 document structure.", keywords: ["html5", "header", "main", "footer", "section", "article"], sample: "HTML5 uses semantic elements: <header>, <main>, <footer>, <section>, <article> for clearer structure." },
            { q: "What are data attributes and how do you use them?", keywords: ["data", "attribute", "custom", "dataset"], sample: "Data attributes (data-*) store custom data. Access via element.dataset in JavaScript." },
            { q: "How does the HTML form validation work?", keywords: ["validation", "required", "pattern", "type"], sample: "HTML5 offers built-in validation: required, pattern, type (email, number), min/max attributes." },
            { q: "What is the difference between GET and POST in forms?", keywords: ["get", "post", "method", "url", "body"], sample: "GET sends data in URL (bookmarkable). POST sends data in request body (more secure, no URL limits)." },
            { q: "Explain iframe and its use cases.", keywords: ["iframe", "embed", "frame", "external"], sample: "iframe embeds another document. Use for maps, videos, or external content." },
            { q: "What is the role of <head> vs <body>?", keywords: ["head", "body", "metadata", "content"], sample: "<head> contains metadata, scripts, styles. <body> contains visible content." },
            { q: "How do you create an accessible form?", keywords: ["label", "aria", "accessibility", "id"], sample: "Use <label> with for/id, ARIA attributes, and proper input types for screen readers." },
            { q: "What are HTML entities and when to use them?", keywords: ["entity", "&lt;", "&gt;", "&amp;", "special"], sample: "Entities like &lt; &gt; &amp; display special characters that would otherwise be parsed as code." },
            { q: "Explain the difference between async and defer in scripts.", keywords: ["async", "defer", "script", "loading"], sample: "async loads script in parallel and executes immediately. defer waits for DOM parsing, then executes in order." },
            { q: "What is the purpose of the <canvas> element?", keywords: ["canvas", "graphics", "draw", "javascript"], sample: "<canvas> provides a drawing surface for 2D/3D graphics via JavaScript APIs." }
        ],
        hard: [
            { q: "How would you implement a responsive image solution with multiple sources?", keywords: ["srcset", "sizes", "picture", "responsive"], sample: "Use <picture> with <source> or img with srcset and sizes for responsive images." },
            { q: "Explain Web Components and custom elements.", keywords: ["web components", "custom", "shadow dom", "template"], sample: "Web Components use Custom Elements, Shadow DOM, and HTML Templates for reusable encapsulated UI." },
            { q: "What is the Critical Rendering Path and how does HTML affect it?", keywords: ["critical", "rendering", "path", "dom", "cssom"], sample: "HTML parsing builds DOM. CSS builds CSSOM. Together they create the render tree for layout and paint." },
            { q: "How do you optimize HTML for SEO?", keywords: ["seo", "meta", "semantic", "heading", "structure"], sample: "Use semantic HTML, proper heading hierarchy, meta tags, alt text, and clean URL structure." },
            { q: "Explain the Content Security Policy (CSP) header in relation to HTML.", keywords: ["csp", "content security", "xss", "policy"], sample: "CSP restricts script/style sources to prevent XSS. Can use meta tag or HTTP header." },
            { q: "What is preload vs prefetch?", keywords: ["preload", "prefetch", "link", "resource"], sample: "preload fetches critical resources early. prefetch hints at resources for future navigation." },
            { q: "How does the browser handle lazy loading of images?", keywords: ["loading", "lazy", "native", "intersection"], sample: "Use loading='lazy' on img for native lazy loading. Fallback: Intersection Observer." },
            { q: "Explain the HTML dialog element and its accessibility.", keywords: ["dialog", "modal", "accessibility", "focus"], sample: "<dialog> creates modal dialogs with built-in focus trap and accessibility." },
            { q: "What are microdata and JSON-LD for SEO?", keywords: ["microdata", "json-ld", "schema", "structured"], sample: "Structured data (microdata or JSON-LD) helps search engines understand content for rich results." },
            { q: "How do you implement offline-first HTML apps?", keywords: ["service worker", "manifest", "offline", "pwa"], sample: "Use a web app manifest and Service Worker for caching and offline support in PWAs." }
        ]
    },
    css: {
        easy: [
            { q: "What does CSS stand for?", keywords: ["cascading", "style", "sheets"], sample: "CSS stands for Cascading Style Sheets. It styles HTML elements." },
            { q: "What is the difference between margin and padding?", keywords: ["margin", "padding", "outside", "inside", "border"], sample: "Margin is space outside the border. Padding is space inside the border, around content." },
            { q: "What are the three ways to include CSS?", keywords: ["inline", "internal", "external", "stylesheet"], sample: "Inline (style attr), internal (<style>), external (<link> to .css file)." },
            { q: "What is a CSS selector?", keywords: ["selector", "element", "class", "id"], sample: "Selectors target HTML elements for styling (e.g., .class, #id, element)." },
            { q: "What is the box model?", keywords: ["box", "content", "padding", "border", "margin"], sample: "Box model: content, padding, border, margin. Total width = content + padding + border + margin." },
            { q: "What is the default display value for div?", keywords: ["block", "display"], sample: "div has display: block by default, taking full width and starting on a new line." },
            { q: "How do you center text horizontally?", keywords: ["text-align", "center"], sample: "Use text-align: center on the parent or element." },
            { q: "What does flexbox do?", keywords: ["flex", "layout", "row", "column"], sample: "Flexbox creates flexible layouts. Use display: flex and properties like justify-content, align-items." },
            { q: "What is a CSS class?", keywords: ["class", ".", "reusable"], sample: "A class groups elements for shared styling. Use .className in CSS." },
            { q: "What is the :hover pseudo-class?", keywords: ["hover", "mouse", "pseudo"], sample: ":hover applies styles when the user hovers over an element." }
        ],
        medium: [
            { q: "Explain the CSS specificity hierarchy.", keywords: ["specificity", "inline", "id", "class", "element"], sample: "Specificity: inline > ID > class/attribute > element. Higher specificity wins." },
            { q: "What is the difference between em and rem?", keywords: ["em", "rem", "relative", "root"], sample: "em is relative to parent font. rem is relative to root (html) font size." },
            { q: "How does z-index work?", keywords: ["z-index", "stack", "layers", "position"], sample: "z-index controls stacking order. Requires position other than static." },
            { q: "What is BEM naming convention?", keywords: ["bem", "block", "element", "modifier"], sample: "BEM: Block__element--modifier (e.g., card__title--large)." },
            { q: "Explain CSS Grid vs Flexbox.", keywords: ["grid", "flexbox", "2d", "1d"], sample: "Grid is 2D (rows+columns). Flexbox is 1D (row or column). Use both for complex layouts." },
            { q: "What are CSS custom properties (variables)?", keywords: ["variable", "custom", "--", "var()"], sample: "Define with --name: value; use with var(--name). Scoped to selector." },
            { q: "What is the cascade in CSS?", keywords: ["cascade", "order", "specificity", "inherit"], sample: "Cascade determines which rules apply: source order, specificity, inheritance." },
            { q: "How do you create a responsive layout?", keywords: ["media", "query", "responsive", "viewport"], sample: "Use @media queries and flexible units (%, rem, vw) for breakpoints." },
            { q: "What is the difference between transform and position?", keywords: ["transform", "position", "gpu", "layout"], sample: "transform uses GPU, doesn't trigger layout. position changes layout flow." },
            { q: "Explain pseudo-elements ::before and ::after.", keywords: ["before", "after", "pseudo", "content"], sample: "Create virtual elements before/after content. Require content property." }
        ],
        hard: [
            { q: "How does the stacking context work?", keywords: ["stacking", "context", "z-index", "isolation"], sample: "Stacking context is created by position, opacity, transform. Elements stack within their context." },
            { q: "What is the difference between contain and isolation?", keywords: ["contain", "isolation", "layout", "paint"], sample: "contain optimizes layout/paint. isolation creates a new stacking context." },
            { q: "Explain CSS-in-JS pros and cons.", keywords: ["css-in-js", "styled", "scoped", "dynamic"], sample: "Pros: scoped, dynamic. Cons: runtime cost, learning curve. Examples: styled-components." },
            { q: "How do you achieve 60fps animations?", keywords: ["transform", "opacity", "will-change", "gpu"], sample: "Use transform and opacity. Avoid layout-triggering properties. Use will-change sparingly." },
            { q: "What is the difference between @import and link?", keywords: ["import", "link", "blocking", "parallel"], sample: "link loads in parallel. @import is blocking and can cause FOUC." },
            { q: "Explain CSS containment for performance.", keywords: ["contain", "performance", "layout", "paint"], sample: "contain: layout paint limits recalculations to the element subtree." },
            { q: "How do you implement dark mode with CSS?", keywords: ["dark", "prefers-color-scheme", "variable", "media"], sample: "Use @media (prefers-color-scheme: dark) and CSS variables for theming." },
            { q: "What is the aspect-ratio property?", keywords: ["aspect-ratio", "ratio", "responsive"], sample: "aspect-ratio maintains proportions without padding hacks (e.g., 16/9)." },
            { q: "Explain logical properties in CSS.", keywords: ["logical", "inline", "block", "start", "end"], sample: "Logical props (margin-inline-start) adapt to writing direction (RTL/LTR)." },
            { q: "What is subgrid and when to use it?", keywords: ["subgrid", "grid", "nested", "inherit"], sample: "subgrid lets nested grids inherit parent track sizes for alignment." }
        ]
    },
    javascript: {
        easy: [
            { q: "What is JavaScript?", keywords: ["scripting", "language", "web", "browser"], sample: "JavaScript is a scripting language for web pages. It runs in the browser and adds interactivity." },
            { q: "What is the difference between let and var?", keywords: ["let", "var", "block", "scope"], sample: "let is block-scoped. var is function-scoped. Prefer let/const." },
            { q: "What is an array?", keywords: ["array", "list", "index", "ordered"], sample: "An array is an ordered list of values, accessed by index (0-based)." },
            { q: "What is a function?", keywords: ["function", "reusable", "block", "code"], sample: "A function is a reusable block of code that performs a task." },
            { q: "What does typeof return?", keywords: ["typeof", "type", "string", "number"], sample: "typeof returns a string indicating the type (e.g., 'number', 'string', 'object')." },
            { q: "What is the DOM?", keywords: ["dom", "document", "object", "model", "tree"], sample: "DOM is the Document Object Model—a tree representation of HTML that JS can manipulate." },
            { q: "What is an event listener?", keywords: ["addEventListener", "event", "click", "callback"], sample: "Event listeners attach handlers to events (click, submit) via addEventListener." },
            { q: "What is null vs undefined?", keywords: ["null", "undefined", "absence"], sample: "undefined means variable declared but not assigned. null is an intentional empty value." },
            { q: "What is === vs ==?", keywords: ["strict", "equality", "type", "coercion"], sample: "=== checks value and type (strict). == coerces types before comparing." },
            { q: "What is const?", keywords: ["const", "constant", "immutable", "block"], sample: "const declares a block-scoped constant. The binding cannot be reassigned." }
        ],
        medium: [
            { q: "Explain closure in JavaScript.", keywords: ["closure", "scope", "function", "lexical"], sample: "Closure is when a function retains access to variables from its outer scope after that scope has closed." },
            { q: "What is the event loop?", keywords: ["event loop", "async", "callback", "queue"], sample: "The event loop handles async operations. Call stack executes, then task queue callbacks run." },
            { q: "What is a Promise?", keywords: ["promise", "async", "then", "resolve"], sample: "A Promise represents async operation result. Use .then() and .catch() or async/await." },
            { q: "What is hoisting?", keywords: ["hoisting", "var", "function", "declaration"], sample: "Hoisting moves var and function declarations to the top of their scope before execution." },
            { q: "Explain this keyword.", keywords: ["this", "context", "object", "binding"], sample: "this refers to the execution context—usually the object calling the method." },
            { q: "What is the spread operator?", keywords: ["spread", "...", "array", "object"], sample: "The spread operator (...) copies array/object elements. Used for cloning and merging." },
            { q: "What is destructuring?", keywords: ["destructuring", "array", "object", "extract"], sample: "Destructuring extracts values from arrays/objects into variables: const {a} = obj." },
            { q: "What is map vs forEach?", keywords: ["map", "forEach", "return", "array"], sample: "map returns a new array. forEach returns undefined. Use map when you need a transformed array." },
            { q: "What is async/await?", keywords: ["async", "await", "promise", "syntax"], sample: "async/await is syntactic sugar for Promises. async functions return Promises; await pauses until resolved." },
            { q: "What is local storage?", keywords: ["localStorage", "storage", "persist", "browser"], sample: "localStorage persists key-value data in the browser across sessions." }
        ],
        hard: [
            { q: "Explain the prototype chain.", keywords: ["prototype", "chain", "inheritance", "__proto__"], sample: "Objects inherit from prototypes. The prototype chain is traversed for property lookup." },
            { q: "What is the difference between call, apply, and bind?", keywords: ["call", "apply", "bind", "this"], sample: "call/apply invoke with this. apply takes args as array. bind returns a new function with bound this." },
            { q: "What are Web Workers?", keywords: ["worker", "thread", "background", "parallel"], sample: "Web Workers run JS in background threads, avoiding UI blocking." },
            { q: "Explain debounce vs throttle.", keywords: ["debounce", "throttle", "rate", "limit"], sample: "Debounce delays until pause. Throttle limits execution to once per interval." },
            { q: "What is the Module pattern?", keywords: ["module", "closure", "private", "encapsulation"], sample: "Module pattern uses closures for private variables and public API." },
            { q: "What is the Event Delegation pattern?", keywords: ["delegation", "event", "bubbling", "parent"], sample: "Attach listener to parent; use event.target. Reduces listeners and works for dynamic content." },
            { q: "Explain garbage collection in JS.", keywords: ["garbage", "collection", "memory", "reference"], sample: "GC reclaims unreachable objects. Avoid global refs and circular refs for large objects." },
            { q: "What is the difference between shallow and deep copy?", keywords: ["shallow", "deep", "copy", "clone"], sample: "Shallow copy copies top level. Deep copy copies nested objects. Use structuredClone or libs." },
            { q: "What is the Microtask queue?", keywords: ["microtask", "promise", "queue", "event loop"], sample: "Microtasks (Promises, queueMicrotask) run after current task, before next macrotask." },
            { q: "Explain Symbol and its use cases.", keywords: ["symbol", "unique", "key", "private"], sample: "Symbol creates unique identifiers. Used for object keys to avoid collisions." }
        ]
    }
};

// ===== STATE =====
let state = {
    category: null,
    difficulty: 'easy',
    questions: [],
    shownIndices: new Set(),
    currentQuestion: null,
    score: 0,
    totalAttempted: 0,
    timerInterval: null,
    timeLeft: 60
};

const TIMER_DURATION = 60;

// ===== DOM ELEMENTS =====
const categorySection = document.getElementById('categorySection');
const quizSection = document.getElementById('quizSection');
const resultsSection = document.getElementById('resultsSection');
const categoryBtns = document.querySelectorAll('.category-btn');
const difficultyBtns = document.querySelectorAll('.difficulty-btn');
const questionText = document.getElementById('questionText');
const questionNumber = document.getElementById('questionNumber');
const answerInput = document.getElementById('answerInput');
const sampleAnswer = document.getElementById('sampleAnswer');
const sampleAnswerText = document.getElementById('sampleAnswerText');
const submitBtn = document.getElementById('submitBtn');
const nextBtn = document.getElementById('nextBtn');
const timerEl = document.getElementById('timer');
const progressBar = document.getElementById('progressBar');
const currentScoreEl = document.getElementById('currentScore');
const totalAttemptedEl = document.getElementById('totalAttempted');
const themeToggle = document.getElementById('themeToggle');
const restartBtn = document.getElementById('restartBtn');
const startBtn = document.getElementById('startBtn');
const backBtn = document.getElementById('backBtn');

// ===== INIT =====
function init() {
    loadTheme();
    setupEventListeners();
}

function setupEventListeners() {
    // Category selection
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => selectCategory(btn.dataset.category));
    });
    // Difficulty selection
    difficultyBtns.forEach(btn => {
        btn.addEventListener('click', () => selectDifficulty(btn.dataset.difficulty));
    });
    // Start quiz when user clicks Start Quiz button
    startBtn.addEventListener('click', startQuiz);
    submitBtn.addEventListener('click', handleSubmit);
    nextBtn.addEventListener('click', handleNext);
    themeToggle.addEventListener('click', toggleTheme);
    restartBtn.addEventListener('click', restartQuiz);
    backBtn.addEventListener('click', goBack);
}

// ===== THEME =====
function loadTheme() {
    const saved = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
    themeToggle.querySelector('.theme-icon').textContent = saved === 'dark' ? '🌙' : '☀️';
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    themeToggle.querySelector('.theme-icon').textContent = next === 'dark' ? '🌙' : '☀️';
}

// ===== CATEGORY & DIFFICULTY =====
function selectCategory(cat) {
    categoryBtns.forEach(b => b.classList.remove('active'));
    document.querySelector(`[data-category="${cat}"]`).classList.add('active');
    state.category = cat;
}

function selectDifficulty(diff) {
    difficultyBtns.forEach(b => b.classList.remove('active'));
    document.querySelector(`[data-difficulty="${diff}"]`).classList.add('active');
    state.difficulty = diff;
}

// ===== QUIZ LOGIC =====
function startQuiz() {
    if (!state.category) {
        alert('Please select a category first.');
        return;
    }
    state.questions = questionsData[state.category][state.difficulty];
    state.shownIndices.clear();
    state.score = 0;
    state.totalAttempted = 0;
    categorySection.classList.add('hidden');
    quizSection.classList.remove('hidden');
    backBtn.classList.remove('hidden');
    showNextQuestion();
}

function getRandomQuestion() {
    if (state.shownIndices.size >= state.questions.length) return null;
    let idx;
    do {
        idx = Math.floor(Math.random() * state.questions.length);
    } while (state.shownIndices.has(idx));
    state.shownIndices.add(idx);
    return { ...state.questions[idx], index: idx };
}

function showNextQuestion() {
    const q = getRandomQuestion();
    if (!q) {
        showResults();
        return;
    }
    state.currentQuestion = q;
    resetForNewQuestion();
    questionNumber.textContent = `Question ${state.totalAttempted + 1}`;
    questionText.textContent = q.q;
    questionText.parentElement.style.animation = 'none';
    questionText.offsetHeight; // Force reflow for animation restart
    questionText.parentElement.style.animation = 'fadeIn 0.5s ease';
    answerInput.value = '';
    answerInput.disabled = false;
    sampleAnswer.classList.add('hidden');
    submitBtn.disabled = false;
    nextBtn.disabled = true;
    startTimer();
}

function resetForNewQuestion() {
    stopTimer();
    state.timeLeft = TIMER_DURATION;
    timerEl.textContent = state.timeLeft;
    timerEl.classList.remove('warning');
    updateProgress();
}

function startTimer() {
    stopTimer();
    state.timeLeft = TIMER_DURATION;
    timerEl.textContent = state.timeLeft;
    answerInput.disabled = false;
    state.timerInterval = setInterval(() => {
        state.timeLeft--;
        timerEl.textContent = state.timeLeft;
        if (state.timeLeft <= 10) timerEl.classList.add('warning');
        if (state.timeLeft <= 0) {
            stopTimer();
            handleTimeUp();
        }
    }, 1000);
}

function stopTimer() {
    if (state.timerInterval) {
        clearInterval(state.timerInterval);
        state.timerInterval = null;
    }
}

function handleTimeUp() {
    answerInput.disabled = true;
    submitBtn.disabled = true;
    sampleAnswer.classList.remove('hidden');
    sampleAnswerText.textContent = state.currentQuestion.sample;
    nextBtn.disabled = false;
}

function handleSubmit() {
    stopTimer();
    const userAnswer = answerInput.value.trim().toLowerCase();
    const keywords = state.currentQuestion.keywords;
    let found = 0;
    keywords.forEach(kw => {
        if (userAnswer.includes(kw.toLowerCase())) found++;
    });
    const threshold = Math.ceil(keywords.length * 0.4);
    if (found >= threshold) {
        state.score++;
    }
    state.totalAttempted++;
    sampleAnswer.classList.remove('hidden');
    sampleAnswerText.textContent = state.currentQuestion.sample;
    answerInput.disabled = true;
    submitBtn.disabled = true;
    nextBtn.disabled = false;
    updateScoreDisplay();
}

function handleNext() {
    showNextQuestion();
    updateScoreDisplay();
}

function updateScoreDisplay() {
    currentScoreEl.textContent = state.score;
    totalAttemptedEl.textContent = state.totalAttempted;
    updateProgress();
}

function updateProgress() {
    const total = state.questions.length;
    const done = state.shownIndices.size;
    progressBar.style.width = total ? (done / total) * 100 + '%' : '0%';
}

// ===== RESULTS =====
const messages = {
    high: ["Outstanding! You're interview-ready!", "Incredible! You've mastered this category!"],
    mid: ["Good job! Keep practicing to improve.", "Solid performance! Review the ones you missed."],
    low: ["Keep practicing! Consistency is key.", "Don't give up! Every attempt makes you better."]
};

function showResults() {
    stopTimer();
    quizSection.classList.add('hidden');
    resultsSection.classList.remove('hidden');
    const pct = state.totalAttempted ? Math.round((state.score / state.totalAttempted) * 100) : 0;
    document.getElementById('finalScore').textContent = state.score;
    document.getElementById('finalTotal').textContent = state.totalAttempted;
    document.getElementById('finalPercentage').textContent = pct + '%';
    let arr;
    if (pct >= 80) arr = messages.high;
    else if (pct >= 50) arr = messages.mid;
    else arr = messages.low;
    document.getElementById('motivationalMessage').textContent = arr[Math.floor(Math.random() * arr.length)];
    const highest = parseInt(localStorage.getItem('highestScore') || 0, 10);
    if (state.score > highest) {
        localStorage.setItem('highestScore', state.score);
    }
    document.getElementById('highestScore').textContent = Math.max(state.score, highest);
    const lastDate = new Date().toLocaleDateString();
    localStorage.setItem('lastPracticeDate', lastDate);
    document.getElementById('lastPractice').textContent = lastDate;
}

function goBack() {
    stopTimer();
    resultsSection.classList.add('hidden');
    quizSection.classList.add('hidden');
    categorySection.classList.remove('hidden');
    backBtn.classList.add('hidden');
    state.category = null;
    state.questions = [];
    state.shownIndices.clear();
    categoryBtns.forEach(b => b.classList.remove('active'));
    difficultyBtns.forEach(b => b.classList.remove('active'));
    document.querySelector('[data-difficulty="easy"]').classList.add('active');
    state.difficulty = 'easy';
}

function restartQuiz() {
    resultsSection.classList.add('hidden');
    categorySection.classList.remove('hidden');
    backBtn.classList.add('hidden');
    state.category = null;
    state.questions = [];
    state.shownIndices.clear();
    categoryBtns.forEach(b => b.classList.remove('active'));
    difficultyBtns.forEach(b => b.classList.remove('active'));
    document.querySelector('[data-difficulty="easy"]').classList.add('active');
    state.difficulty = 'easy';
}

// ===== START =====
document.addEventListener('DOMContentLoaded', init);
