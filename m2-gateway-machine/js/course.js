// Course App — ISU–GSA Spaceport Leadership Series
// Module 2 — The Gateway Machine: Operations & Staffing
// Manages: segment navigation, progress tracking, quiz logic, state persistence

const CourseApp = (function() {

  // ── STATE ────────────────────────────────────────────────────────
  const STATE_KEY = 'isu_gsa_m2_progress';

  const defaultState = {
    currentSegment: 'intro',
    completed: [],
    quizAnswers: {},
    quizSubmitted: false,
  };

  function loadState() {
    try {
      const raw = localStorage.getItem(STATE_KEY);
      return raw ? Object.assign({}, defaultState, JSON.parse(raw)) : { ...defaultState };
    } catch(e) { return { ...defaultState }; }
  }

  function saveState(state) {
    try { localStorage.setItem(STATE_KEY, JSON.stringify(state)); } catch(e) {}
  }

  // ── SEGMENTS MANIFEST ────────────────────────────────────────────
  const SEGMENTS = [
    { id: 'intro',  code: 'INTRO', name: 'Course Opener',                           dur: '8 min',  group: 'Introduction' },
    { id: 's2-1',   code: '2.1',   name: 'From Blueprint to Bedlam',                dur: '12 min', group: 'Module 2 — The Gateway Machine' },
    { id: 's2-2',   code: '2.2',   name: 'The Three Phases',                        dur: '14 min', group: 'Module 2 — The Gateway Machine' },
    { id: 's2-3',   code: '2.3',   name: 'The Three Domains',                       dur: '15 min', group: 'Module 2 — The Gateway Machine' },
    { id: 's2-4',   code: '2.4',   name: 'Who Runs It? Staffing & Workforce',       dur: '14 min', group: 'Module 2 — The Gateway Machine' },
    { id: 's2-5',   code: '2.5',   name: 'Culture Before Countdown',                dur: '12 min', group: 'Module 2 — The Gateway Machine' },
    { id: 's2-6',   code: '2.6',   name: 'The Multi-User Operations Problem',       dur: '10 min', group: 'Module 2 — The Gateway Machine' },
    { id: 's2-7',   code: '2.7',   name: 'Future Operations — 2035',                dur: '12 min', group: 'Module 2 — The Gateway Machine' },
    { id: 'case',   code: 'CASE',  name: 'Case Study — KSC: Government to Hub',    dur: '20 min', group: 'Case Study' },
    { id: 'check',  code: 'CHECK', name: 'Module Knowledge Check',                  dur: '10 min', group: 'Assessment' },
  ];

  // ── QUIZ DATA ────────────────────────────────────────────────────
  const QUIZ = [
    {
      id: 'q1',
      lo: 'LO2.1',
      text: 'The three phases of spaceport launch operations are typically sequenced in which order?',
      options: [
        { id: 'a', text: 'Launch day → Pre-launch preparation → Post-launch recovery and analysis.' },
        { id: 'b', text: 'Pre-launch preparation → Launch day operations → Post-launch recovery and analysis.' },
        { id: 'c', text: 'Site readiness → Vehicle integration → Mission execution.' },
        { id: 'd', text: 'Range clearance → Pre-launch → Pad activation.' },
      ],
      correct: 'b',
      rationale: 'Correct. The three-phase model follows: Pre-launch preparation (vehicle arrival through launch readiness review), Launch day operations (countdown, hold management, commit), and Post-launch recovery and analysis (pad inspection, anomaly review, mission outcome debrief, turnaround). This sequence governs everything from staffing plans to regulatory compliance timing.',
    },
    {
      id: 'q2',
      lo: 'LO2.2',
      text: 'A multi-user spaceport is hosting three launch operators simultaneously, each with active payload integrations and competing launch windows within the same 14-day period. What is the most significant structural challenge this creates for facility management?',
      options: [
        { id: 'a', text: 'Increased inspections required under FAA Part 420 when more than two operators are present.' },
        { id: 'b', text: 'Governance of shared resources — airspace, pad access, propellant logistics, range safety scheduling — across competing commercial interests.' },
        { id: 'c', text: 'A requirement to appoint a separate Launch Director for each concurrent operator.' },
        { id: 'd', text: 'Mandatory separation of all ground support equipment pools to prevent liability cross-contamination.' },
      ],
      correct: 'b',
      rationale: 'Correct. The defining challenge of multi-user operations is not regulatory or technical — it is governance. Shared resources (range safety assets, command and control systems, propellant infrastructure, pad access windows) must be allocated across operators with different launch readiness timelines, different customer commitments, and different risk tolerances. The absence of clear governance frameworks is the primary cause of multi-user spaceport operational disputes.',
    },
    {
      id: 'q3',
      lo: 'LO2.3',
      text: 'During a final countdown at T-2 minutes, a Range Safety Officer (RSO) calls a hold due to a flight termination system anomaly. The Launch Director reviews the telemetry, disagrees with the RSO\'s assessment, and instructs the countdown to resume. What is the correct outcome under the established range safety authority model?',
      options: [
        { id: 'a', text: 'The Launch Director has final authority on launch day and may resume the countdown after documenting the disagreement.' },
        { id: 'b', text: 'Range safety authority is independent of the launch operator. The RSO\'s hold stands until the RSO clears it — the Launch Director cannot override it.' },
        { id: 'c', text: 'The FAA must be consulted before the countdown can resume when there is a disagreement between the RSO and the Launch Director.' },
        { id: 'd', text: 'The Vehicle Launch Director and the Range Launch Director must jointly resolve the anomaly within 30 minutes or the launch window expires under standing FAA rules.' },
      ],
      correct: 'b',
      rationale: 'Correct. Range safety authority is structurally independent from the launch operator for a critical reason: the RSO\'s mandate is public safety, not mission success. An RSO hold cannot be overridden by the Launch Director under any circumstance. The RSO determines when — and whether — range safety concerns are resolved and the countdown may resume. This independence is one of the fundamental architecture principles of U.S. range safety practice.',
    },
    {
      id: 'q4',
      lo: 'LO2.4',
      text: 'A commercial spaceport is considering contracting its Launch Director role to an external services firm to reduce fixed labor costs. Which risk is most significant and most commonly underweighted in this analysis?',
      options: [
        { id: 'a', text: 'Contractor Launch Directors are not recognized by the FAA under current licensing regulations.' },
        { id: 'b', text: 'A contracted Launch Director may lack the safety culture and institutional memory that are embedded in a career operations professional — creating accountability gaps that are invisible until a near-miss or mishap.' },
        { id: 'c', text: 'Contract staffing for the Launch Director role requires a separate Part 420 amendment, adding 18–24 months to the licensing process.' },
        { id: 'd', text: 'Contractor Launch Directors typically decline to participate in anomaly investigation processes, creating regulatory non-compliance.' },
      ],
      correct: 'b',
      rationale: 'Correct. The financial case for contracting out the Launch Director role often appears sound — the labor cost savings are real and quantifiable, while the safety culture risks are diffuse and hard to price. But the institutional memory and safety culture vested in a career Launch Director represent genuine operational value. A contractor accountable to a services agreement, rather than to the mission and its workforce, changes the decision-making environment in subtle but consequential ways. This is not a theoretical concern — it is a documented pattern in aviation outsourcing analysis and is increasingly recognized in launch operations.',
    },
    {
      id: 'q5',
      lo: 'LO2.5',
      text: '"Normalization of deviance," as identified by sociologist Diane Vaughan in her analysis of the Challenger disaster, refers to which organizational phenomenon?',
      options: [
        { id: 'a', text: 'The tendency of frontline workers to deliberately conceal safety anomalies from management to avoid delays.' },
        { id: 'b', text: 'The gradual organizational process by which a known anomalous condition is repeatedly accepted as an acceptable risk, until it is no longer perceived as deviant.' },
        { id: 'c', text: 'The structural failure that occurs when safety reporting systems allow anonymous submissions that undermine management accountability.' },
        { id: 'd', text: 'A pattern in which external regulators normalize deviation from certification standards in exchange for faster licensing timelines.' },
      ],
      correct: 'b',
      rationale: 'Correct. Vaughan\'s concept of normalization of deviance describes how organizations incrementally accept known risk. In the Challenger case, O-ring erosion had been observed and documented across multiple flights. Rather than triggering escalating concern, each incident without catastrophic outcome was used to justify continued flight. The "deviant" condition (erosion) became routine. The organizational lesson — applicable directly to spaceport operations — is that the absence of immediate consequence does not constitute evidence of acceptable risk.',
    },
    {
      id: 'q6',
      lo: 'LO2.6',
      text: 'A launch operator targets a 24-hour turnaround for its reusable vehicle, compared to the industry\'s historical 6–18 month campaign cycle. What is the primary workforce implication of this operating model for the spaceport?',
      options: [
        { id: 'a', text: 'A 24-hour turnaround requires the spaceport to hire approximately 12× more range safety officers to cover continuous shifts.' },
        { id: 'b', text: 'A continuous operations model requiring 24/7 staffing across all technical domains — rather than the traditional lumpy campaign model that allows workforce to surge and stand down between campaigns.' },
        { id: 'c', text: 'FAA regulations require additional crew rest periods after every 10 launches that effectively prevent true 24-hour turnaround.' },
        { id: 'd', text: 'The primary workforce implication is geographic — 24-hour turnaround requires on-site residential quarters for all technical staff.' },
      ],
      correct: 'b',
      rationale: 'Correct. The campaign model allowed spaceports to staff up for a launch campaign and draw down between events. The continuous operations model — demanded by reusable vehicle economics — requires sustained 24/7 coverage across propellant operations, pad maintenance, range safety, and ground support. This is a fundamentally different workforce architecture, not just a scheduling change. It requires different hiring profiles, different training pipelines, different shift structures, and significantly higher fixed labor costs.',
    },
    {
      id: 'q7',
      lo: 'LO2.3',
      text: 'Which of the following best describes the operational role of a Launch Weather Officer (LWO) within the Range Operations domain?',
      options: [
        { id: 'a', text: 'The LWO is responsible for ground safety operations during severe weather events and has authority to evacuate the launch site.' },
        { id: 'b', text: 'The LWO provides forecast data to the Launch Director, who makes the final weather-related go/no-go decision independently.' },
        { id: 'c', text: 'The LWO evaluates atmospheric conditions against FAA-defined launch commit criteria and certifies compliance — or issues a non-compliance hold — before the countdown can proceed past the terminal count.' },
        { id: 'd', text: 'The LWO role is advisory only; final weather authority rests with the FAA duty officer on range.' },
      ],
      correct: 'c',
      rationale: 'Correct. Launch Commit Criteria (LCC) include a set of meteorological constraints defined under FAA 14 C.F.R. Part 417, Appendix G. The LWO evaluates real-time and forecast atmospheric data against these criteria and issues a formal certification of compliance — or a weather hold — as part of the launch countdown sequence. This is not advisory; a weather non-compliance hold carries the same operational weight as a range safety hold. The Launch Director cannot proceed through a weather hold without LWO certification.',
    },
    {
      id: 'q8',
      lo: 'LO2.1',
      text: 'During a post-launch debrief, a senior technician mentions that the procedure for connecting the propellant quick-disconnect has been "informally simplified" over the last six launches to save 20 minutes — and that no anomaly has resulted. What is the appropriate response from the operations leadership?',
      options: [
        { id: 'a', text: 'Accept the informal procedure change and update the formal operations manual to reflect current practice.' },
        { id: 'b', text: 'Document the deviation in the anomaly log but allow the informal procedure to continue pending a formal review.' },
        { id: 'c', text: 'Immediately suspend the informal procedure, restore the certified process, and treat this as a safety culture finding requiring root cause analysis — not just a procedure update.' },
        { id: 'd', text: 'Conduct a risk analysis meeting and allow the informal procedure under a temporary waiver while awaiting formal change control approval.' },
      ],
      correct: 'c',
      rationale: 'Correct. This scenario is a textbook example of normalization of deviance in progress. Six successful launches without consequence has led the team to treat an uncertified procedure as acceptable. The correct response is not risk analysis or waiver — it is immediate restoration of certified procedure and a safety culture investigation. The question is not whether the informal procedure is safe. The question is: what does the willingness to deviate from certified procedures without formal change control tell us about the safety culture? That question requires a root cause analysis, not a risk meeting.',
    },
  ];

  // ── RENDER ENGINE ────────────────────────────────────────────────
  let state = loadState();

  function totalSegments() { return SEGMENTS.length; }
  function completedCount() { return state.completed.length; }
  function progressPct() { return Math.round((completedCount() / totalSegments()) * 100); }

  function markCompleted(id) {
    if (!state.completed.includes(id)) {
      state.completed.push(id);
      saveState(state);
    }
  }

  function segIndex(id) { return SEGMENTS.findIndex(s => s.id === id); }

  function prevSeg(id) {
    const i = segIndex(id);
    return i > 0 ? SEGMENTS[i-1] : null;
  }

  function nextSeg(id) {
    const i = segIndex(id);
    return i < SEGMENTS.length - 1 ? SEGMENTS[i+1] : null;
  }

  // ── SIDEBAR RENDER ───────────────────────────────────────────────
  function renderSidebar(currentId) {
    const nav = document.getElementById('segmentNav');
    if (!nav) return;

    let lastGroup = null;
    let html = '';

    SEGMENTS.forEach(seg => {
      if (seg.group !== lastGroup) {
        html += `<div class="seg-group-label">${seg.group}</div>`;
        lastGroup = seg.group;
      }

      const isActive = seg.id === currentId;
      const isDone = state.completed.includes(seg.id);
      const classes = ['seg-item', isActive ? 'active' : '', isDone ? 'completed' : ''].filter(Boolean).join(' ');

      html += `
        <div class="${classes}" data-seg="${seg.id}" onclick="CourseApp.navigate('${seg.id}')">
          <div class="seg-dot"></div>
          <div class="seg-text">
            <span class="seg-code">${seg.code}</span>
            <span class="seg-name">${seg.name}</span>
          </div>
          <span class="seg-dur">${seg.dur}</span>
        </div>`;
    });

    nav.innerHTML = html;
  }

  // ── PROGRESS RENDER ──────────────────────────────────────────────
  function renderProgress() {
    const fill = document.getElementById('progressFill');
    const pct = document.getElementById('progressPct');
    if (fill) fill.style.width = progressPct() + '%';
    if (pct) pct.textContent = progressPct() + '%';
  }

  // ── TOPBAR RENDER ────────────────────────────────────────────────
  function renderTopbar(seg) {
    const el = document.getElementById('topbarSegName');
    if (el) el.textContent = seg ? `${seg.code} — ${seg.name}` : '';
  }

  // ── NAV FOOTER RENDER ────────────────────────────────────────────
  function renderNavFooter(currentId) {
    const footer = document.getElementById('segNavFooter');
    if (!footer) return;

    const prev = prevSeg(currentId);
    const next = nextSeg(currentId);

    footer.innerHTML = `
      <button class="seg-nav-btn" onclick="CourseApp.navigate('${prev ? prev.id : ''}')" ${!prev ? 'disabled' : ''}>
        ← ${prev ? prev.name : 'Start'}
      </button>
      <button class="seg-nav-btn next" onclick="CourseApp.navigate('${next ? next.id : ''}')" ${!next ? 'disabled' : ''}>
        ${next ? next.name : 'Complete'} →
      </button>`;
  }

  // ── CONTENT LOADER ───────────────────────────────────────────────
  function navigate(id) {
    if (!id) return;
    const seg = SEGMENTS.find(s => s.id === id);
    if (!seg) return;

    state.currentSegment = id;
    saveState(state);

    const container = document.getElementById('segmentContainer');
    if (!container) return;

    container.style.opacity = '0';
    container.style.transform = 'translateY(8px)';

    setTimeout(() => {
      loadSegmentContent(id, container);
      renderSidebar(id);
      renderProgress();
      renderTopbar(seg);
      setTimeout(() => renderNavFooter(id), 20);

      container.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      container.style.opacity = '1';
      container.style.transform = 'translateY(0)';

      const main = document.getElementById('courseMain');
      if (main) main.scrollTop = 0;
    }, 150);
  }

  // ── SEGMENT CONTENT REGISTRY ─────────────────────────────────────
  function loadSegmentContent(id, container) {
    const contentFn = CONTENT[id];
    if (contentFn) {
      container.innerHTML = contentFn();
      if (id === 'check') initQuiz();
    } else {
      container.innerHTML = `<div class="segment-content"><p style="color:var(--slate)">Content loading…</p></div>`;
    }
  }

  // ── QUIZ LOGIC ───────────────────────────────────────────────────
  function initQuiz() {
    const container = document.getElementById('quizContainer');
    if (!container) return;

    let html = '';
    QUIZ.forEach((q, qi) => {
      const saved = state.quizAnswers[q.id];
      html += `
        <div class="kc-question" id="q-${q.id}">
          <div class="kc-q-num">Question ${qi+1} of ${QUIZ.length}  ·  ${q.lo}</div>
          <p class="kc-q-text">${q.text}</p>
          <div class="kc-options">
            ${q.options.map(opt => `
              <button class="kc-option ${saved === opt.id ? 'selected' : ''} ${state.quizSubmitted ? 'disabled' : ''} ${state.quizSubmitted && opt.id === q.correct ? 'correct' : ''} ${state.quizSubmitted && saved === opt.id && saved !== q.correct ? 'incorrect' : ''}"
                data-q="${q.id}" data-opt="${opt.id}"
                onclick="CourseApp.selectOption('${q.id}', '${opt.id}')">
                <span class="option-letter">${opt.id.toUpperCase()}</span>
                ${opt.text}
              </button>`).join('')}
          </div>
          ${state.quizSubmitted ? `
            <div class="kc-feedback ${saved === q.correct ? 'correct-fb' : 'incorrect-fb'} show">
              ${saved === q.correct ? '✓ Correct. ' : '✗ Incorrect. '} ${q.rationale}
            </div>` : ''}
        </div>`;
    });

    let scoreHtml = '';
    if (state.quizSubmitted) {
      const score = QUIZ.filter(q => state.quizAnswers[q.id] === q.correct).length;
      const pct = Math.round((score / QUIZ.length) * 100);
      const pass = pct >= 70;
      scoreHtml = `
        <div class="kc-score">
          Score: <span style="color: ${pass ? 'var(--success)' : 'var(--danger)'}">${score}/${QUIZ.length} (${pct}%)</span>
          ${pass ? ' — <span style="color:var(--success)">Pass ✓</span>' : ' — <span style="color:var(--danger)">Retry recommended</span>'}
        </div>`;
    }

    container.innerHTML = `
      <div class="knowledge-check">
        <div class="kc-header">
          <div class="kc-icon">◈</div>
          <div>
            <div class="kc-title">Module 2 Knowledge Check</div>
            <div class="kc-subtitle">8 questions · 70% to proceed · Immediate feedback</div>
          </div>
        </div>
        ${html}
        <div class="kc-submit">
          ${scoreHtml}
          ${!state.quizSubmitted ? `
            <button class="btn-primary" onclick="CourseApp.submitQuiz()">Submit answers</button>` : `
            <button class="btn-secondary" onclick="CourseApp.resetQuiz()">Retake quiz</button>
            <button class="seg-nav-btn next" onclick="CourseApp.completeModule()" style="margin-left:auto">
              Complete module →
            </button>`}
        </div>
      </div>`;
  }

  function selectOption(qId, optId) {
    if (state.quizSubmitted) return;
    state.quizAnswers[qId] = optId;
    saveState(state);

    const qBlock = document.getElementById(`q-${qId}`);
    if (qBlock) {
      qBlock.querySelectorAll('.kc-option').forEach(btn => {
        btn.classList.toggle('selected', btn.dataset.opt === optId);
      });
    }
  }

  function submitQuiz() {
    const answered = Object.keys(state.quizAnswers).length;
    if (answered < QUIZ.length) {
      alert(`Please answer all ${QUIZ.length} questions before submitting.`);
      return;
    }
    state.quizSubmitted = true;
    saveState(state);
    markCompleted('check');
    initQuiz();
  }

  function resetQuiz() {
    state.quizAnswers = {};
    state.quizSubmitted = false;
    saveState(state);
    initQuiz();
  }

  function completeModule() {
    markCompleted('check');
    const container = document.getElementById('segmentContainer');
    if (container) {
      const score = QUIZ.filter(q => state.quizAnswers[q.id] === q.correct).length;
      const pct = Math.round((score / QUIZ.length) * 100);
      container.innerHTML = completionScreen(score, pct);
    }
  }

  function completionScreen(score, pct) {
    return `
      <div class="segment-content" style="text-align:center; padding: 6rem 2rem;">
        <div style="font-size:3rem; margin-bottom:1.5rem;">◎</div>
        <div style="font-size:0.7rem; letter-spacing:0.16em; text-transform:uppercase; color:var(--gold); margin-bottom:1rem;">Module complete</div>
        <h1 style="font-family:var(--font-display); font-size:3rem; font-weight:300; margin-bottom:1rem; color:var(--white);">
          The Gateway Machine
        </h1>
        <p style="color:var(--slate-light); font-size:1rem; max-width:50ch; margin:0 auto 2rem; line-height:1.75;">
          You've completed Module 2 of the ISU–GSA Global Spaceport Leadership Series.
          Your knowledge check score: <strong style="color:var(--gold)">${score}/8 (${pct}%)</strong>.
        </p>
        <div style="display:flex; justify-content:center; gap:1rem; flex-wrap:wrap; margin-bottom:3rem;">
          <div style="background:var(--surface-2); border:1px solid var(--surface-3); border-radius:12px; padding:1.25rem 2rem; text-align:center;">
            <div style="font-family:var(--font-display); font-size:2rem; color:var(--gold); font-weight:300;">${pct}%</div>
            <div style="font-size:0.72rem; text-transform:uppercase; letter-spacing:0.1em; color:var(--slate);">Knowledge check</div>
          </div>
          <div style="background:var(--surface-2); border:1px solid var(--surface-3); border-radius:12px; padding:1.25rem 2rem; text-align:center;">
            <div style="font-family:var(--font-display); font-size:2rem; color:var(--gold); font-weight:300;">${completedCount()}</div>
            <div style="font-size:0.72rem; text-transform:uppercase; letter-spacing:0.1em; color:var(--slate);">Segments completed</div>
          </div>
        </div>
        <div style="background:var(--surface); border:1px solid rgba(201,168,76,0.2); border-radius:16px; padding:2rem; max-width:560px; margin:0 auto 2rem;">
          <div style="font-size:0.65rem; letter-spacing:0.14em; text-transform:uppercase; color:var(--gold); margin-bottom:0.75rem;">Up next</div>
          <div style="font-family:var(--font-display); font-size:1.4rem; color:var(--white); margin-bottom:0.5rem;">Module 3 — The Rules of Space</div>
          <div style="font-size:0.85rem; color:var(--slate-light);">Regulatory Frameworks &amp; Licensing · ~2.5 hours · Coming soon</div>
        </div>
        <a href="index.html" class="btn-ghost">← Back to module home</a>
      </div>`;
  }

  // ── INIT ─────────────────────────────────────────────────────────
  function init() {
    const seg = SEGMENTS.find(s => s.id === state.currentSegment) || SEGMENTS[0];
    renderSidebar(seg.id);
    renderProgress();
    renderTopbar(seg);
    renderNavFooter(seg.id);
    loadSegmentContent(seg.id, document.getElementById('segmentContainer'));
  }

  // ── PUBLIC API ───────────────────────────────────────────────────
  return {
    init,
    navigate,
    selectOption,
    submitQuiz,
    resetQuiz,
    completeModule,
    markCompleted,
    state: () => state,
  };

})();

// ── CONTENT LIBRARY ──────────────────────────────────────────────
// Each segment returns an HTML string. Rich, substantive, designed.
const CONTENT = {};

CONTENT['intro'] = () => `
<div class="segment-content">
  <div class="seg-header">
    <div class="seg-header-eyebrow">
      <span class="seg-header-code">COURSE OPENER</span>
      <span class="seg-header-meta">8 min · Context &amp; framing</span>
    </div>
    <h1 class="seg-header-title">The Machine<br>Behind the<br><em>Launch</em></h1>
    <p class="seg-header-subtitle">Welcome to Module 2. The site is selected. The infrastructure is built. Now everything has to actually work.</p>
    <div class="seg-header-tags">
      <span class="tag">ISU × GSA</span>
      <span class="tag">Module 2 of 6</span>
      <span class="tag">Executive Certificate</span>
    </div>
  </div>
  <div class="seg-body">
    <div class="callout callout-insight">
      <div class="callout-label">Continuing from Module 1</div>
      <p>Module 1 gave you the analytical foundation: what a spaceport is, how sites are selected, and what infrastructure is required. Module 2 moves from the static to the dynamic — from the facility to the <em>operation</em>. The decisions in this module are made not by developers or investors, but by the people who run the site every day. Understanding those decisions is essential to evaluating the operational capabilities — and risks — of any spaceport.</p>
    </div>
    <h2>From George Nield — Global Spaceport Alliance</h2>
    <p>In Module 1, we talked about spaceports as infrastructure assets. We looked at site selection, at the physical systems that have to be in place to support a launch. That foundation matters. But I've spent the last three decades in this industry — first as a military test pilot, then as an FAA regulator, then building the Global Spaceport Alliance — and I can tell you that most of the decisions that determine whether a launch succeeds or fails are not about the concrete and the steel. They're about the people and the processes.</p>
    <p>A spaceport is not just a facility. It's an operating organization. And operating organizations — especially ones where the margin for error is measured in milliseconds and kilograms — require a specific kind of discipline. Not just technical competence, though that is necessary. A specific kind of disciplined culture.</p>
    <p>What we're going to cover in this module is the substance of that culture: how launch operations are structured, who does what, why the authority relationships are designed the way they are, and what happens when the human side of the organization fails to match the capability of the physical infrastructure. That last question has a history. It's a history that every executive in this sector needs to understand.</p>
    <div class="pull-quote">
      <div class="pull-quote-text">"Most of the decisions that determine whether a launch succeeds or fails are not about the concrete and the steel. They're about the people and the processes."</div>
      <div class="pull-quote-attr">George Nield — President, Global Spaceport Alliance · Former FAA Associate Administrator for Commercial Space Transportation</div>
    </div>
    <h2>From John Wensveen — International Space University</h2>
    <p>At ISU, we think a great deal about what it means to lead in complex technical environments. Every sector we study — aviation, maritime, nuclear, space — has had moments when the gap between organizational performance and technical capability became visible in the worst possible way. The space sector is no exception.</p>
    <p>What makes the operations module different from a technical briefing is that we're asking you to look at these systems from the outside in — not as an engineer designing them, but as an executive responsible for the organization that runs them. What questions should you be asking? What does a healthy operational organization look like versus one that is quietly accumulating risk? How do you evaluate the operational maturity of a spaceport you're considering as a partner, a client, or an investment?</p>
    <p>Those are the executive questions. Module 2 gives you the foundation to answer them.</p>
    <h2>What You Will Learn</h2>
    <p>This module maps the full operational lifecycle of a launch — from vehicle arrival to post-launch analysis — and examines the three domains of authority that govern it. You will learn who holds the critical roles, why the staffing pipeline for those roles is under pressure, and what the data says about safety culture failures in the sector. The module closes with the KSC case study: how the world's most consequential launch site adapted from the Space Shuttle era to the commercial era — and what that transition required organizationally.</p>
    <div class="callout callout-insight">
      <div class="callout-label">Learning Outcomes — Module 2</div>
      <p>By the end of this module you will be able to: describe the three operational phases of a launch campaign; identify the three authority domains and their key roles; apply a staffing framework to a multi-user spaceport model; explain normalization of deviance and its implications for operations leadership; analyze the governance challenges of multi-user launch scheduling; and evaluate the operational transformation required for continuous, high-cadence operations.</p>
    </div>
  </div>
  <div id="segNavFooter"></div>
</div>`;

CONTENT['s2-1'] = () => `
<div class="segment-content">
  <div class="seg-header">
    <div class="seg-header-eyebrow">
      <span class="seg-header-code">SEGMENT 2.1</span>
      <span class="seg-header-meta">12 min · ~1,550 words</span>
    </div>
    <h1 class="seg-header-title">From Blueprint<br>to <em>Bedlam</em></h1>
    <p class="seg-header-subtitle">The operational reality behind the launch countdown. What actually happens when a rocket is on the pad.</p>
    <div class="seg-header-tags">
      <span class="tag-lo tag">LO2.1 — Understand</span>
      <span class="tag">Operations Overview</span>
      <span class="tag">Vertical vs. Horizontal</span>
      <span class="tag">Single vs. Multi-User</span>
    </div>
  </div>
  <div class="seg-body">
    <p>Every launch looks clean from the outside. The countdown clock runs. The rocket lifts. The tracking cameras follow it into the sky. What the broadcast doesn't show is the operational machinery required to produce that moment: a sequence of approximately 4,000 discrete procedural steps executed by hundreds of people working across multiple organizations, in a choreography that has almost no tolerance for error and no pause button once the terminal count begins.</p>
    <p>This is what we mean when we call a spaceport a gateway machine. It is a machine — a highly engineered, highly coordinated system — designed to do one thing: transform a vehicle sitting inert in a hangar into a functioning spacecraft on its way to orbit. Everything in launch operations is oriented toward that transformation.</p>
    <h2>Two Fundamental Operational Models</h2>
    <p>Before we map the specific phases and domains of launch operations, we need to establish the two axes along which operational models vary most significantly. These are the axes that determine almost everything about staffing, infrastructure utilization, and organizational complexity.</p>
    <div class="axis-grid">
      <div class="axis-card">
        <span class="axis-num">AXIS 01</span>
        <div class="axis-title">Vehicle Orientation: Vertical vs. Horizontal</div>
        <div class="axis-body">
          <strong>Vertical launch</strong> operations are organized around the pad. The vehicle is processed in a hangar or integration facility, transported to the launch pad (by crawler, rail, or road), erected, fueled, and launched from a fixed or mobile ground-based position. The pad becomes the hub of the operational universe — all activity radiates outward from it. The operational team is structured around pad readiness, propellant systems, and range safety. Think: SpaceX Falcon 9 at LC-40, Artemis SLS at LC-39B.
          <br><br>
          <strong>Horizontal launch</strong> operations are organized around the aircraft. The carrier aircraft is the critical asset, and the operational model has more in common with aviation maintenance operations than with traditional rocket launch. Runway access, aircraft readiness, and airspace management replace pad management as the primary operational concerns. Think: Virgin Orbit LauncherOne (pre-closure), Stratolaunch with Roc.
        </div>
      </div>
      <div class="axis-card">
        <span class="axis-num">AXIS 02</span>
        <div class="axis-title">User Model: Single vs. Multi-User</div>
        <div class="axis-body">
          <strong>Single-user</strong> operations are the simplest — one operator, one vehicle type, one set of procedures, one organizational command structure. SpaceX Starbase is the definition: every process is optimized for Starship/Super Heavy. There is no scheduling conflict because there is only one scheduler. The operational culture, the tooling, the procedures, and the infrastructure are all owned and controlled by the same organization.
          <br><br>
          <strong>Multi-user</strong> operations introduce a category of complexity that has no analogue in single-user environments. Multiple operators. Multiple vehicle types. Multiple payload customers. Multiple regulatory files open simultaneously. Multiple countdown clocks on different timelines. Multiple organizations with authority over different parts of the same system. This is the governance challenge at the heart of Module 2 — and it is the challenge that most proposed commercial spaceports are not adequately prepared for.
        </div>
      </div>
    </div>
    <h2>The Operational Spine</h2>
    <p>Regardless of orientation or user model, every launch operation has the same basic spine: a defined sequence of activities running from vehicle arrival to launch day execution to post-flight close-out. In Segment 2.2, we will examine this sequence in detail as the three phases of a launch campaign. Before we go there, it is worth understanding two concepts that define the operational tempo of the entire sequence.</p>
    <div class="callout callout-warning">
      <div class="callout-label">Concept 1 — The Launch Window</div>
      <p>A launch window is a finite interval of time — sometimes hours, sometimes minutes — during which the orbital mechanics permit the vehicle to reach its intended orbit. Miss the window, and you may wait days, weeks, or in some cases, months for the next viable window. Everything in the pre-launch sequence is oriented toward being ready when the window opens. This is not a preference — it is a hard physical constraint. The launch window is the operational clock that drives everything else.</p>
    </div>
    <div class="callout callout-warning">
      <div class="callout-label">Concept 2 — The Launch Commit Criteria (LCC)</div>
      <p>Launch Commit Criteria are a set of technical and environmental conditions that must all be satisfied simultaneously before the countdown can proceed past the terminal count. They include weather constraints (Part 417 Appendix G), vehicle health parameters, range safety system status, and flight termination system readiness. The LCC are not a checklist that can be shortened for schedule pressure — they are operational prerequisites. A single LCC violation holds the countdown regardless of all other conditions being green.</p>
    </div>
    <p>Together, the launch window and the LCC create the operating environment that makes launch operations uniquely demanding. The window creates a hard deadline. The LCC creates a long list of prerequisites. The operational team's job is to satisfy every prerequisite before the window closes — on a schedule that may be compressed by a weather hold, a vehicle anomaly, a range conflict, or any combination of factors that are outside their control.</p>
    <div class="callout callout-insight">
      <div class="callout-label">Executive Application</div>
      <p>When evaluating a spaceport's operational capability, one of the most revealing metrics is its <strong>scrub rate</strong> — the percentage of launch attempts that do not result in a launch on the first attempt. A high scrub rate is not simply a weather story; it is an operational story. It reflects the cumulative probability of encountering an LCC violation on any given attempt. A spaceport with a 40% scrub rate imposes a significant operational cost on its customers: doubled or tripled workforce deployment days, extended range safety holds, repeat propellant loading cycles. This cost is real, and it is rarely reflected in the promotional materials.</p>
    </div>
  </div>
  <div id="segNavFooter"></div>
</div>`;

CONTENT['s2-2'] = () => `
<div class="segment-content">
  <div class="seg-header">
    <div class="seg-header-eyebrow">
      <span class="seg-header-code">SEGMENT 2.2</span>
      <span class="seg-header-meta">14 min · ~1,800 words</span>
    </div>
    <h1 class="seg-header-title">The Three<br><em>Phases</em></h1>
    <p class="seg-header-subtitle">Pre-launch preparation. Launch day operations. Post-launch recovery and analysis. The operational lifecycle of a launch campaign — mapped for executives.</p>
    <div class="seg-header-tags">
      <span class="tag-lo tag">LO2.1 — Understand</span>
      <span class="tag">Campaign Phases</span>
      <span class="tag">MRR</span>
      <span class="tag">Countdown Management</span>
    </div>
  </div>
  <div class="seg-body">
    <p>A launch campaign — the full operational cycle from vehicle arrival to mission outcome debrief — is organized into three phases. Each phase has a defined start point, a set of required activities, and a gate that must be passed before proceeding to the next phase. Understanding these phases is the foundation for understanding how any launch organization is structured, how staffing is planned, and where operational risk accumulates.</p>

    <div class="phase-block">
      <div class="phase-header">
        <span class="phase-num">PHASE 01</span>
        <div class="phase-title">Pre-Launch Preparation</div>
        <div class="phase-dur">Typically 2–8 weeks before launch day, depending on vehicle type and payload complexity</div>
      </div>
      <div class="phase-body">
        <p>Pre-launch preparation begins when the vehicle arrives at the launch site — by ship, aircraft, or road transport — and ends with the successful completion of the <strong>Mission Readiness Review (MRR)</strong>. In between, the operational team completes:</p>
        <ul>
          <li><strong>Facility preparation.</strong> Pad inspection, propellant system checks, GSE (ground support equipment) verification, and range safety system validation. The pad must be certified clean before the vehicle arrives.</li>
          <li><strong>Vehicle integration.</strong> For payloads requiring on-site integration (most orbital missions), this is the complex and high-risk phase where the satellite or spacecraft is mated to the launch vehicle. Payload integration facilities at major spaceports are purpose-built clean rooms with specialized handling equipment and environmental controls.</li>
          <li><strong>Vehicle erection and pad operations.</strong> The integrated stack is transported to the pad and erected. For large vehicles, this operation alone involves significant logistics.</li>
          <li><strong>Pre-launch checkouts.</strong> A structured sequence of functional tests validating all vehicle and ground systems prior to loading propellants. Any anomaly identified during checkout may require pad rollback — a significant cost and schedule impact.</li>
          <li><strong>Propellant loading operations.</strong> For cryogenic vehicles (liquid oxygen, liquid hydrogen, liquid methane), propellant loading begins a day before launch and continues through the terminal count. The propellant team manages one of the highest-energy, highest-risk operations on the range.</li>
        </ul>
        <div class="callout callout-insight">
          <div class="callout-label">The Mission Readiness Review (MRR)</div>
          <p>The MRR is the formal gate between pre-launch preparation and launch day operations. It is a structured review — attended by the launch operator, payload customer, range safety authority, and facility management — in which each responsible party formally certifies readiness to proceed to the launch day countdown. The MRR is not a formality. Items identified as open at MRR are assigned dispositions (accepted with rationale, closed, or elevated to launch commit criteria). Any item that cannot be dispositioned blocks the MRR. The MRR is the executive's last formal visibility into the cumulative readiness status — after MRR, operational accountability shifts to the Launch Director.</p>
        </div>
      </div>
    </div>

    <div class="phase-block">
      <div class="phase-header">
        <span class="phase-num">PHASE 02</span>
        <div class="phase-title">Launch Day Operations</div>
        <div class="phase-dur">T-24 hours through T+0 (lift-off)</div>
      </div>
      <div class="phase-body">
        <p>Launch day operations begin with the terminal countdown — the structured sequence of events that begins at T-24 hours (for most large vehicles) and runs to ignition. The Launch Director has operational command authority from T-24 hours forward.</p>
        <p><strong>The terminal countdown</strong> is a scripted sequence with built-in holds at defined points (T-6 hours, T-3 hours, T-20 minutes, T-4 minutes for Falcon 9). Holds allow time to resolve anomalies, extend weather observation windows, or synchronize with range safety or FAA requirements. The ability to manage holds — to make rapid, high-quality decisions about whether to extend, scrub, or proceed — under time pressure and organizational complexity is the defining skill of an experienced Launch Director.</p>
        <p><strong>The scrub decision</strong> is one of the hardest operational calls in the business. Scrub too early and you've wasted a countdown cycle, disappointed customers, and incurred costs. Scrub too late and you may not have time to safely de-fuel the vehicle. Continue through a questionable condition and you are accepting risk that may not be authorized. The Launch Director must make this determination in real time, with incomplete information, with stakeholders watching.</p>
        <div class="callout callout-warning">
          <div class="callout-label">Hold Management vs. Real-Time Decision Making</div>
          <p>Experienced launch directors distinguish between <em>hold management</em> — working a known anomaly within a built-in hold window — and <em>real-time decision making</em> — responding to a condition that emerges outside a scripted hold during the terminal countdown. Real-time decisions under time pressure are where organizational culture shows. An organization with strong safety culture will have a clearly defined decision authority, clear escalation paths, and a strong norm of calling holds when uncertain. An organization with eroded safety culture may have informal pressure to continue — subtle or not — that compromises the Launch Director's independence.</p>
        </div>
      </div>
    </div>

    <div class="phase-block">
      <div class="phase-header">
        <span class="phase-num">PHASE 03</span>
        <div class="phase-title">Post-Launch Recovery &amp; Analysis</div>
        <div class="phase-dur">T+0 through mission debrief and closeout — days to weeks</div>
      </div>
      <div class="phase-body">
        <p>The rocket is gone. The mission clock is running. Post-launch operations begin immediately — and this phase is operationally underweighted in most executive discussions of launch operations.</p>
        <p><strong>Pad inspection and restoration.</strong> Within hours of lift-off, the pad inspection team is on site. The pad has just been subjected to the acoustic energy of millions of pounds of thrust, the thermal energy of engine exhaust, and the hydraulic force of the water deluge system. Pad damage assessment is immediate — both for the next launch campaign timeline and for the insurance record.</p>
        <p><strong>Vehicle recovery (reusable vehicles).</strong> For SpaceX Falcon 9 and Falcon Heavy, the booster recovery operation is happening simultaneously with post-launch pad inspection — a drone ship or landing zone recovery requiring its own crew, safety perimeter, and logistics chain. The recovery operation is time-critical: a floating booster on the Atlantic must be secured and transported within a finite weather window.</p>
        <p><strong>Mission debrief and anomaly review.</strong> Every launch, including successful ones, generates an anomaly log — a record of every off-nominal condition observed during the campaign. The post-launch debrief is where those anomalies are reviewed, dispositioned, and either closed or elevated to corrective action. The quality of the anomaly review process is one of the clearest indicators of organizational safety culture. Organizations that treat the debrief as a formality, or that systematically close anomalies without root cause investigation, are the ones that appear in accident investigation reports.</p>
        <p><strong>Turnaround and reuse.</strong> For reusable vehicles, post-launch operations immediately feed into the next campaign's pre-launch preparation. The inspection, refurbishment, and recertification of a reused booster stage is a new operational domain that has no historical precedent in expendable launch vehicle operations. SpaceX has iteratively developed the procedures and standards for this domain — and those procedures are not public.</p>
      </div>
    </div>
  </div>
  <div id="segNavFooter"></div>
</div>`;

CONTENT['s2-3'] = () => `
<div class="segment-content">
  <div class="seg-header">
    <div class="seg-header-eyebrow">
      <span class="seg-header-code">SEGMENT 2.3</span>
      <span class="seg-header-meta">15 min · ~1,950 words</span>
    </div>
    <h1 class="seg-header-title">The Three<br><em>Domains</em></h1>
    <p class="seg-header-subtitle">Launch Operations. Range Operations. Ground Support. How authority is divided — and why the divisions matter more than most executives realize.</p>
    <div class="seg-header-tags">
      <span class="tag-lo tag">LO2.3 — Explain</span>
      <span class="tag">Authority Structure</span>
      <span class="tag">Range Safety</span>
      <span class="tag">RSO</span>
    </div>
  </div>
  <div class="seg-body">
    <p>The three phases tell you <em>when</em> things happen. The three domains tell you <em>who</em> is responsible for what — and, critically, who has authority over whom when those responsibilities come into conflict on launch day.</p>
    <p>The three-domain structure is not intuitive to executives coming from most other industries. In most organizations, authority flows down a hierarchy. In launch operations, authority in certain domains is deliberately structured to be <em>independent of hierarchy</em> — by design, not accident. Understanding why is not a technical exercise. It is a risk management exercise.</p>

    <div class="domain-grid">
      <div class="domain-card domain-launch">
        <div class="domain-icon">◎</div>
        <div class="domain-label">DOMAIN 01</div>
        <div class="domain-title">Launch Operations</div>
        <div class="domain-body">
          <p>Launch Operations encompasses the activities directly associated with the vehicle: integration, countdown management, vehicle health monitoring, and the go/no-go decision on behalf of the launch operator. The key authority in this domain is the <strong>Launch Director (LD)</strong>.</p>
          <p>The Launch Director has overall mission responsibility from MRR through lift-off. They chair the launch team, manage holds, interpret LCC waivers, and make the final launch commit decision — subject to range safety and weather constraints (which are independent of LD authority). The LD position is the most demanding operational leadership role in the sector. An experienced LD carries institutional knowledge that cannot be captured in a procedure manual.</p>
          <p><strong>Key roles in Launch Operations:</strong> Propellant Operations Director, Mission Flight Control Officer (MFCO), Payload Test Conductor, Countdown Manager, Vehicle Test Conductor.</p>
        </div>
      </div>

      <div class="domain-card domain-range">
        <div class="domain-icon">◈</div>
        <div class="domain-label">DOMAIN 02</div>
        <div class="domain-title">Range Operations</div>
        <div class="domain-body">
          <p>Range Operations governs the use of the range — the airspace, sea space, or land area that must be cleared and monitored for the duration of the launch and any vehicle debris dispersion. The Range Operations domain includes the most structurally independent authority in all of launch operations: the <strong>Range Safety Officer (RSO)</strong>.</p>
          <p>The RSO's mandate is public safety — not mission success. The RSO monitors the vehicle's flight path in real time and has unilateral authority to activate the Flight Termination System (FTS) — destroying the vehicle in flight — if it deviates from its approved flight corridor in a way that threatens populated areas or safety zones. No one outranks the RSO on a range safety call. The Launch Director cannot override an RSO hold. The payload customer cannot override it. The vehicle program manager cannot override it.</p>
          <p>This structural independence is the defining feature of U.S. range safety architecture — and understanding it is essential for any executive involved in launch operations agreements. When you see a contract with a launch operator, the RSO's authority is non-negotiable and non-waivable.</p>
          <p><strong>Key roles in Range Operations:</strong> Range Safety Officer (RSO), Range Launch Director (RLD), Launch Weather Officer (LWO), Frequency Management Officer, Airspace Coordination Officer.</p>
          <div class="callout callout-warning">
            <div class="callout-label">The Launch Weather Officer (LWO)</div>
            <p>The LWO evaluates atmospheric conditions against Launch Commit Criteria (LCC) defined under FAA 14 C.F.R. Part 417, Appendix G. The constraints include: lightning detection within defined radii, anvil cloud rules, thick cloud layer rules, and upper-level wind shear. The LWO issues a formal weather certification — or a weather hold — before the terminal countdown proceeds. This is not advisory; a weather non-compliance hold is equivalent to a range safety hold in operational authority.</p>
          </div>
        </div>
      </div>

      <div class="domain-card domain-gse">
        <div class="domain-icon">◇</div>
        <div class="domain-label">DOMAIN 03</div>
        <div class="domain-title">Ground Support &amp; Facility Operations</div>
        <div class="domain-body">
          <p>Ground Support and Facility Operations encompasses the physical infrastructure that makes the launch possible: propellant supply and storage, electrical power distribution, gaseous nitrogen purge systems, communications infrastructure, pad access equipment, and the network of sensors and monitoring systems that feed real-time data to both the Launch Director and the RSO.</p>
          <p>In a government-owned facility like Cape Canaveral, the Ground Support domain is often operated by a contractor — the 45th Space Wing's range operations contractor has historically been a major defense firm managing thousands of range systems. In a private single-user facility like SpaceX Starbase, the launch operator controls all three domains, which is one of the operational advantages of the single-user model: no coordination overhead across domain boundaries.</p>
          <p>In multi-user commercial spaceports, the Ground Support domain is typically operated by the spaceport management authority, while Launch Operations is operator-controlled and Range Operations is either FAA-delegated or conducted by the spaceport under an FAA Range Safety Responsibility Agreement (RSRA). The boundary between these domains is where most commercial spaceport operational disputes originate.</p>
          <p><strong>Key roles in Ground Support:</strong> Facility Operations Manager, Propellant Operations Supervisor, Range Systems Manager, Communications Officer, Safety and Health Officer, Emergency Response Coordinator.</p>
        </div>
      </div>
    </div>

    <h2>Why Domain Independence Creates Executive Risk</h2>
    <p>The structural independence of Range Operations — particularly RSO authority — is a feature of the system, not a bug. But it creates a category of risk that executives must understand before entering any commercial launch agreement.</p>
    <p>Range safety holds are not subject to commercial penalty clauses. A launch operator cannot contractually require a spaceport to proceed through an RSO hold. The operational reality of launch windows means that a hold called at T-4 minutes may result in a scrub, a mission delay, and a customer penalty — none of which can be recovered from the RSO's decision. Any launch services agreement that does not clearly exclude range safety authority-related delays from commercial penalty provisions is poorly drafted. This is not a hypothetical — it has been litigated.</p>
    <div class="callout callout-insight">
      <div class="callout-label">Executive Application — Evaluating Domain Governance</div>
      <p>When evaluating a commercial spaceport's operational maturity, map the domain governance explicitly: Who operates the facility (Domain 3)? Who is the Range Safety authority and under what delegation (Domain 2)? Who controls launch operations (Domain 1)? Where are the domain boundaries — and are there written interface agreements defining how conflicts between domains are resolved? A spaceport that cannot clearly answer these questions has not solved its operational governance problem, regardless of how impressive its physical infrastructure is.</p>
    </div>
  </div>
  <div id="segNavFooter"></div>
</div>`;

CONTENT['s2-4'] = () => `
<div class="segment-content">
  <div class="seg-header">
    <div class="seg-header-eyebrow">
      <span class="seg-header-code">SEGMENT 2.4</span>
      <span class="seg-header-meta">14 min · ~1,800 words</span>
    </div>
    <h1 class="seg-header-title">Who Runs It?<br><em>Staffing &amp; Workforce</em></h1>
    <p class="seg-header-subtitle">The RSO pipeline is tightening. The Launch Director position is under commercial pressure. What the workforce data actually shows — and why it matters for the next decade of growth.</p>
    <div class="seg-header-tags">
      <span class="tag-lo tag">LO2.4 — Apply</span>
      <span class="tag">Workforce</span>
      <span class="tag">RSO Pipeline</span>
      <span class="tag">Staffing Models</span>
    </div>
  </div>
  <div class="seg-body">
    <p>The physical infrastructure of a spaceport can be built in years. The workforce required to operate it safely takes decades to develop. This asymmetry — fast iron, slow people — is one of the least discussed and most consequential risk factors in the current commercial spaceport expansion.</p>
    <h2>The Range Safety Officer Pipeline</h2>
    <p>The RSO is the most specialized and most constrained role in spaceport operations. An RSO must be trained and certified to manage real-time flight safety monitoring, operate the Flight Termination System, and make instantaneous decisions that may result in the destruction of a billion-dollar launch vehicle. The training pipeline — historically rooted in the U.S. military's range safety program — takes approximately three years from initial qualification to independent certification.</p>
    <p>The demand side of the pipeline is expanding rapidly. Every new commercial spaceport requires at least two certified RSOs per operational shift (redundancy is mandatory). The growth in launch cadence means existing facilities need more RSOs per year. The emergence of new spaceports in Texas, Virginia, New Mexico, Alaska, Florida, and internationally means entirely new RSO cadres must be built. The supply side of the pipeline — which has historically been anchored to Air Force and Navy range safety programs — has not expanded at the same rate.</p>
    <div class="callout callout-warning">
      <div class="callout-label">The RSO Gap — Industry Assessment</div>
      <p>Industry and government assessments conducted between 2022 and 2025 consistently identified the RSO workforce as one of the two or three most significant operational constraints on commercial launch growth in the United States. The gap is being addressed through FAA certification pathway expansion and commercial training programs, but the time constants are long. An RSO shortage does not show up in a financial model — until a launch campaign has to be delayed because no certified RSO is available to staff the countdown.</p>
    </div>
    <h2>The Launch Director — A Role Under Pressure</h2>
    <p>The Launch Director position is experiencing a different kind of pressure: the commercial imperative to reduce fixed labor costs. As spaceports compete for launch operator business, the temptation to treat the Launch Director as a variable cost — either by contracting the role out, or by creating lighter "commercial" versions of the role — is real and documented.</p>
    <p>The risk is subtler than it appears. A contracted Launch Director is not inherently less competent. But the institutional context is different. A career LD at Kennedy Space Center has spent two to three decades accumulating the anomaly history, the failure mode knowledge, and the organizational relationships that are invisible in their job description. That institutional memory is how they recognize a condition they've seen before in a different form — how they make the call to hold at T-4 minutes that turns out to be the right call. Contract an external LD without transferring the institutional context, and you haven't saved money — you've just made the risk invisible.</p>
    <h2>Staffing Models for Multi-User Spaceports</h2>
    <p>Multi-user spaceports face a workforce challenge that single-user facilities do not: staffing for variable, often unpredictable launch cadence across multiple operators with different vehicle types, different procedures, and different crew resource requirements.</p>
    <div class="axis-grid">
      <div class="axis-card">
        <span class="axis-num">MODEL A</span>
        <div class="axis-title">Campaign Staffing Model</div>
        <div class="axis-body">The legacy model. Staff is surged for a launch campaign, then drawn down between campaigns. Allows for a smaller permanent workforce. Creates significant operational risk: the surged campaign staff may not have deep institutional knowledge; the draw-down model is incompatible with continuous operations targets; and the management overhead of surge-and-draw creates its own coordination burden. Still the dominant model at many government ranges.</div>
      </div>
      <div class="axis-card">
        <span class="axis-num">MODEL B</span>
        <div class="axis-title">Continuous Operations Model</div>
        <div class="axis-body">The emerging commercial model. Permanent, fully staffed 24/7 operations center with all critical roles filled on rotating shifts. Higher fixed labor cost, but enables the high-cadence launch model that commercial operators increasingly require. SpaceX's operational model at LC-39A approaches this architecture. Requires reliable launch demand to justify the fixed cost base — the commercial risk is demand shortfall, not staffing.</div>
      </div>
      <div class="axis-card">
        <span class="axis-num">MODEL C</span>
        <div class="axis-title">Hybrid / On-Call Model</div>
        <div class="axis-body">The current practice at most commercial spaceports. A core permanent staff for facility operations and safety, supplemented by on-call or contract personnel for launch campaigns. Manages fixed cost while attempting to maintain some continuity. Creates a two-tier workforce dynamic that can undermine safety culture uniformity. The hybrid model is a transitional state — most facilities are trying to move toward a continuous model as their launch cadence increases.</div>
      </div>
    </div>
    <div class="callout callout-insight">
      <div class="callout-label">Workforce as a Commercial Due Diligence Item</div>
      <p>Workforce readiness is genuinely underweighted in commercial spaceport due diligence. Most financial models capture infrastructure capital and operating costs; few explicitly model workforce development cost, RSO certification timeline, or the cost of launch delays attributable to staffing constraints. When evaluating a spaceport investment or partnership, ask specifically: How many certified RSOs does the facility have? What is the plan if one leaves? What is the LD profile and what is the succession plan? If the answer is vague, the operational risk is real even if the financial model looks clean.</p>
    </div>
  </div>
  <div id="segNavFooter"></div>
</div>`;

CONTENT['s2-5'] = () => `
<div class="segment-content">
  <div class="seg-header">
    <div class="seg-header-eyebrow">
      <span class="seg-header-code">SEGMENT 2.5</span>
      <span class="seg-header-meta">12 min · ~1,550 words</span>
    </div>
    <h1 class="seg-header-title">Culture<br>Before <em>Countdown</em></h1>
    <p class="seg-header-subtitle">Challenger. Columbia. The normalization of deviance. Why safety culture failures in this sector look like operational successes — right up until they don't.</p>
    <div class="seg-header-tags">
      <span class="tag-lo tag">LO2.5 — Explain</span>
      <span class="tag">Safety Culture</span>
      <span class="tag">Normalization of Deviance</span>
      <span class="tag">Challenger</span>
      <span class="tag">CRM</span>
    </div>
  </div>
  <div class="seg-body">
    <p>In 1986, the Space Shuttle Challenger was destroyed 73 seconds after launch when an O-ring seal in the right solid rocket booster failed, allowing hot combustion gases to breach the booster casing. Seven astronauts died. The subsequent Rogers Commission investigation identified the technical cause in days. It took years to understand the organizational cause — and the organizational cause is the lesson that has not been fully absorbed by the commercial space industry.</p>
    <h2>Normalization of Deviance</h2>
    <p>The sociologist Diane Vaughan, in her landmark 1996 study of the Challenger disaster, introduced the concept of <strong>normalization of deviance</strong> to describe what had happened at NASA in the years before January 28, 1986.</p>
    <p>O-ring erosion had been observed and documented in multiple Shuttle flights before Challenger. Engineers at Morton Thiokol, the booster manufacturer, had flagged the concern. Each time erosion was observed without catastrophic consequence, the organization made an implicit decision: we flew with this condition before and nothing happened, therefore the risk is acceptable. The deviant condition — O-ring erosion — gradually ceased to be perceived as deviant. It became routine. Expected. Managed.</p>
    <p>On the night before the Challenger launch, engineers urgently recommended a launch delay based on cold-temperature O-ring performance concerns. Management overrode them. The decision was not made by people who wanted to hurt anyone. It was made by people who had been conditioned, over years of accumulated experience-without-consequence, to see a known anomaly as an acceptable risk. They had normalized the deviance.</p>
    <div class="pull-quote">
      <div class="pull-quote-text">"The absence of immediate consequence does not constitute evidence of acceptable risk."</div>
      <div class="pull-quote-attr">Core principle of safety culture, derived from the Challenger accident investigation</div>
    </div>
    <h2>Columbia — The Same Disease, Seventeen Years Later</h2>
    <p>In 2003, the Space Shuttle Columbia disintegrated during atmospheric re-entry. The cause was foam debris that struck the leading edge of the left wing at launch, damaging the thermal protection system. Seven more astronauts died. The Columbia Accident Investigation Board (CAIB), in one of the most rigorous organizational accident analyses ever produced, found the same root cause as Challenger: <strong>normalization of deviance</strong>.</p>
    <p>Foam shedding from the External Tank had been observed in multiple previous flights. It had been documented. It had been classified as an "in-flight anomaly" — which in NASA's system meant it was a known, managed condition rather than a blocker. Over the history of the program, the classification of foam shedding as an acceptable condition had solidified. By the time of Columbia, no one in the management chain perceived it as a safety-of-flight issue. It was just foam.</p>
    <p>The CAIB concluded that NASA's organizational culture — specifically its normalization of foam-shedding as an acceptable risk — was as much a cause of the accident as the physical failure of the TPS tiles. The organizational disease that killed Challenger had not been cured. It had gone into remission and come back.</p>
    <h2>Crew Resource Management (CRM) — The Operational Response</h2>
    <p>Aviation's response to analogous organizational failure — most visibly the Tenerife disaster of 1977 and a series of controlled-flight-into-terrain accidents — was the development of <strong>Crew Resource Management (CRM)</strong>: a structured framework for communication, authority, and decision-making in high-risk operational environments that deliberately counters the tendency to defer to hierarchy when hierarchy may be wrong.</p>
    <p>CRM's core principle: the person with the most relevant information must be empowered to speak, and the person with formal authority must be trained to listen. In cockpit terms, this means a first officer must be able to say "Captain, I disagree with that decision" without career consequence. In launch operations terms, it means a junior technician must be able to flag an anomaly without social pressure to stay quiet.</p>
    <p>CRM has been adapted for launch operations through programs like NASA's Launch Team Effectiveness (LTE) training and commercial analogs. The principles are well understood. The implementation is uneven.</p>
    <div class="callout callout-warning">
      <div class="callout-label">What Safety Culture Failure Looks Like From the Outside</div>
      <p>Safety culture failures are almost invisible until they're catastrophic. The leading indicators exist — they show up in anomaly log closure rates, in the ratio of concerns raised vs. concerns escalated, in whether the post-launch debrief generates corrective actions or just sign-offs, in whether the Launch Director is the kind of person who says "let's hold and think about this" or the kind who says "we're already behind, let's keep moving." None of these indicators appear in a financial model or a marketing deck. They appear when you talk to the operations team. This is why operational due diligence — not just facility inspection — is essential.</p>
    </div>
    <h2>Applying This to Commercial Spaceport Leadership</h2>
    <p>The commercial spaceport expansion is creating pressure across every dimension of operations: launch cadence targets, cost reduction, workforce outsourcing, schedule pressure from paying customers. All of these pressures push in the same direction: toward accepting known anomalies rather than stopping to resolve them, toward moving faster rather than holding to investigate, toward normalizing what should remain deviant.</p>
    <p>The executive application is not to become an operations safety auditor. It is to recognize that a spaceport which has never had an anomaly is not necessarily safer than one that has a robust anomaly log. The safest operational cultures are the ones that surface and document concerns most aggressively — not the ones with the cleanest record. The cleanest records are sometimes the ones where no one feels safe enough to write anything down.</p>
  </div>
  <div id="segNavFooter"></div>
</div>`;

CONTENT['s2-6'] = () => `
<div class="segment-content">
  <div class="seg-header">
    <div class="seg-header-eyebrow">
      <span class="seg-header-code">SEGMENT 2.6</span>
      <span class="seg-header-meta">10 min · ~1,300 words</span>
    </div>
    <h1 class="seg-header-title">The Multi-User<br><em>Operations Problem</em></h1>
    <p class="seg-header-subtitle">Why shared spaceports are operationally harder than anyone's business plan anticipates — and how the best-run facilities have solved it.</p>
    <div class="seg-header-tags">
      <span class="tag-lo tag">LO2.2 — Apply</span>
      <span class="tag">Multi-User Governance</span>
      <span class="tag">Scheduling</span>
      <span class="tag">Shared Infrastructure</span>
    </div>
  </div>
  <div class="seg-body">
    <p>The business case for a multi-user commercial spaceport is straightforward: shared infrastructure, distributed costs, multiple revenue streams. Three operators sharing a facility are more economically efficient than three operators each building their own single-user sites — at least that's the theory. The operational reality is considerably more complex, and the distance between the theory and the reality has been the graveyard of more than one spaceport development model.</p>
    <h2>The Three Multi-User Operations Problems</h2>
    <div class="axis-grid">
      <div class="axis-card">
        <span class="axis-num">PROBLEM 01</span>
        <div class="axis-title">Resource Contention</div>
        <div class="axis-body">
          <p>Multi-user spaceports share physical assets: pad access windows, propellant storage and delivery capacity, command and control systems, range safety assets, and emergency response capability. When two operators have overlapping launch campaigns, every shared asset becomes a negotiation. A propellant delivery system that was sized for one operator's monthly mission can become a bottleneck when three operators want to load simultaneously in the same week.</p>
          <p>Resource contention is worst for the assets that are hardest to add incrementally: range safety systems (certificated equipment, not just hardware), launch window slots (governed by physics and airspace, not commercial preference), and specialized technicians (certifications are not additive).</p>
        </div>
      </div>
      <div class="axis-card">
        <span class="axis-num">PROBLEM 02</span>
        <div class="axis-title">Launch Window Conflict</div>
        <div class="axis-body">
          <p>Launch windows are determined by orbital mechanics. Two operators targeting complementary orbits in the same month may have windows that overlap or that require the same airspace sequence within hours of each other. The range can typically support only one launch at a time — both for range safety clearance and for command and control bandwidth.</p>
          <p>Launch window conflict resolution requires a governance framework: rules for priority determination, transparent scheduling protocols, and a dispute resolution mechanism that operates on launch-day timelines (not legal timelines). The absence of such a framework creates the conditions for informal precedents that favor whoever applies the most commercial pressure — which is not a safety-neutral outcome.</p>
        </div>
      </div>
      <div class="axis-card">
        <span class="axis-num">PROBLEM 03</span>
        <div class="axis-title">Liability Allocation</div>
        <div class="axis-body">
          <p>Multi-user launch agreements must address the question: if an anomaly in Operator A's operations damages Operator B's payload or causes a mission failure, who is liable? The cross-waivers of liability that are standard in the U.S. commercial launch regime (under the Commercial Space Launch Act, 51 U.S.C. § 50914) provide a baseline — but the baseline is designed for the launch operator–launch site relationship, not for the complex multi-operator environment of a shared commercial spaceport operating at high cadence. Multi-user agreement drafting is genuinely difficult legal work, and facilities that have not resolved it before they start taking commercial customers will discover why in the worst possible context.</p>
        </div>
      </div>
    </div>
    <h2>What Effective Multi-User Governance Looks Like</html>
    <p>The best-performing multi-user spaceports share a common governance characteristic: they have separated the <em>facility management function</em> from the <em>launch operations function</em>. The facility authority sets and enforces shared rules (scheduling protocols, shared resource priority frameworks, environmental and safety standards). The launch operators manage their own operations within those rules. The interface is clear. The interface agreement is written. And — crucially — the facility authority has enforcement mechanisms that are not subject to operator override.</p>
    <p>This structure mirrors what airports figured out decades ago: the airport manages the airfield, sets the rules for taxi and runway use, and enforces them uniformly. The airlines manage their own aircraft operations within those rules. The airline with the most passengers on a given day does not get to tell ATC to delay other airlines' departures. That independence — of the infrastructure authority from the commercial operator — is what makes high-density multi-user operations possible.</p>
    <div class="callout callout-insight">
      <div class="callout-label">The Airport Analogy — and Its Limits</div>
      <p>The airport analogy is useful but imperfect. At an airport, an aircraft going off-nominal on the runway affects ground operations — serious, but containable. At a spaceport, a vehicle anomaly during powered flight can result in range safety FTS activation, destruction of the vehicle over a cleared sea or land area, and range closure for hours or days while the anomaly is investigated. The consequences of multi-user conflict in this environment are not just commercial — they can be operational and safety-critical. The governance framework must be designed for that environment, not just for scheduling efficiency.</p>
    </div>
  </div>
  <div id="segNavFooter"></div>
</div>`;

CONTENT['s2-7'] = () => `
<div class="segment-content">
  <div class="seg-header">
    <div class="seg-header-eyebrow">
      <span class="seg-header-code">SEGMENT 2.7</span>
      <span class="seg-header-meta">12 min · ~1,550 words</span>
    </div>
    <h1 class="seg-header-title">Future Operations<br><em>— 2035</em></h1>
    <p class="seg-header-subtitle">What continuous high-cadence operations actually require. The emerging roles. The digital transformation of range operations. The workforce pipelines being built right now.</p>
    <div class="seg-header-tags">
      <span class="tag-lo tag">LO2.1 · LO2.4 — Analyze</span>
      <span class="tag">Future Operations</span>
      <span class="tag">Automation</span>
      <span class="tag">ARO</span>
      <span class="tag">Digital Ops</span>
    </div>
  </div>
  <div class="seg-body">
    <p>The spaceport operations of 2035 will look significantly different from the operations of 2025 — not because the fundamental physics change, but because the cadence, the automation, and the workforce architecture will have been transformed by the reusability revolution and the demands of the continuous operations model.</p>
    <h2>The Continuous Operations Model</h2>
    <p>SpaceX has publicized targets of launching Starship more than once per day from Starbase. Whether or not that specific target is achieved on that specific timeline, the trajectory is clear: the most commercially consequential launch program in the world is designed for continuous operations, not campaigns. This will pull the rest of the industry toward the same model.</p>
    <p>A continuous operations spaceport looks fundamentally different from a campaign spaceport:</p>
    <ul>
      <li><strong>24/7 staffing across all domains.</strong> No more surge-and-draw down. Every shift is a launch shift in principle.</li>
      <li><strong>Compressed inspection and refurbishment timelines.</strong> Vehicle turnaround in hours, not months. Inspection procedures that can be executed under time pressure without sacrificing rigor. This requires significant investment in tooling, procedure redesign, and workforce training.</li>
      <li><strong>Propellant logistics as a supply chain problem.</strong> High cadence means high propellant throughput. LOX and methane (for Starship) or LOX and kerosene (for Falcon 9) must be delivered, stored, and loaded at the rate of launches — which means the propellant supply chain becomes a throughput constraint if not designed for the cadence target.</li>
      <li><strong>Range safety at scale.</strong> The current range safety model — certified RSOs managing individual countdowns — must adapt for high-frequency operations. The emerging Autonomous Range Operations (ARO) model is the response.</li>
    </ul>
    <h2>Autonomous Range Operations (ARO)</h2>
    <p>Autonomous Flight Safety Systems (AFSS) — software-defined flight safety monitoring that can detect vehicle deviation and trigger the Flight Termination System in milliseconds, without human actuation — have been operational at Eastern and Western Range since the mid-2010s. AFSS is faster than human command by orders of magnitude (microsecond response versus hundreds-of-milliseconds command propagation), which is a meaningful safety margin at orbital velocities of 7+ km/s.</p>
    <p>ARO extends the AFSS concept to the broader range safety operation: automated launch commit criteria monitoring, automated range clearance verification, AI-assisted flight safety analysis. The vision is a system where most routine countdowns can proceed with minimal RSO intervention — freeing the RSO to focus on anomaly management and high-consequence decision points rather than routine monitoring.</p>
    <p>This is not a near-term full-automation scenario. The regulatory environment (FAA licensing requires a certified RSO on duty for every launch) and the liability structure (the RSO's independent authority is a legal feature of U.S. commercial space law) mean that ARO will be implemented as a human-machine teaming architecture, not a replacement. But the ARO trend is directionally clear — and the workforce implications are significant.</p>
    <div class="callout callout-insight">
      <div class="callout-label">The New Workforce Roles</div>
      <p>The 2035 spaceport will require workforce profiles that don't exist at scale today: <strong>Vehicle Turnaround Technicians</strong> — multi-system technicians trained for compressed inspection and refurbishment under time pressure. <strong>Propellant Operations Specialists</strong> — high-throughput LOX/methane (or equivalent) logistics experts. <strong>AI-Assisted Range Safety Analysts</strong> — personnel who can manage human-machine teaming in an ARO environment. <strong>Digital Operations Center Managers</strong> — integrating sensor networks, vehicle telemetry, and range status into a continuous situational awareness picture. These roles will compete with commercial aviation, defense, and energy for the same underlying talent base.</p>
    </div>
    <h2>The Digital Operations Center</h2>
    <p>The legacy range operations model is a physical facility — the blockhouse, the firing room, the command and control center — where operators sit in front of displays showing real-time system status. The emerging model is a distributed digital operations architecture: cloud-integrated sensor networks, software-defined displays, remote monitoring capability, and AI-assisted anomaly detection that can flag conditions before a human operator would notice them.</p>
    <p>Kennedy Space Center's modernization of the Launch Control Center represents the most visible example of this transition: integrating commercial vehicle operations (SpaceX) with legacy government range data architecture into a unified operational picture. The technical complexity of that integration — connecting systems designed decades apart with fundamentally different data architectures — has been significant. Every new commercial spaceport will need to make explicit choices about its digital operations architecture, and those choices will constrain or enable the cadence targets its business model assumes.</p>
    <div class="callout callout-warning">
      <div class="callout-label">The 2035 Operational Risk</div>
      <p>The greatest operational risk of the 2035 continuous-operations model is not technical failure. It is the normalization of deviance at high cadence. When a facility launches 300 times per year instead of 20, the anomaly rate — even a very low one — produces more anomalies in absolute terms. If the anomaly review culture does not scale with the cadence, known conditions will accumulate faster than the organization can process them. The 2035 spaceport that has built a high-cadence continuous operations capability without investing equally in its anomaly management culture has built a faster path to the event it most needs to avoid.</p>
    </div>
  </div>
  <div id="segNavFooter"></div>
</div>`;

CONTENT['case'] = () => `
<div class="segment-content">
  <div class="seg-header">
    <div class="seg-header-eyebrow">
      <span class="seg-header-code">CASE STUDY</span>
      <span class="seg-header-meta">20 min · Harvard-style case · Analysis required</span>
    </div>
    <h1 class="seg-header-title">Kennedy Space Center:<br>From <em>Government Giant</em><br>to Commercial Hub</h1>
    <p class="seg-header-subtitle">How the world's most consequential launch site transformed from a single-mission government program to a multi-tenant commercial hub — and what that transition required operationally.</p>
    <div class="seg-header-tags">
      <span class="tag-lo tag">LO2.1 · LO2.3 · LO2.4 — Analyze</span>
      <span class="tag">Case Study</span>
      <span class="tag">KSC</span>
      <span class="tag">Commercial Transition</span>
    </div>
  </div>
  <div class="seg-body">
    <div class="callout callout-insight">
      <div class="callout-label">How to Use This Case</div>
      <p>Read the case, then answer the four analysis questions at the end before reviewing the discussion notes. The goal is not to arrive at a single right answer — it is to practice applying the module's analytical frameworks to a real operational transformation. Your analysis will be most useful if you engage with the discomfort of the operational and organizational tensions the case presents.</p>
    </div>

    <h2>Part I — The Shuttle Era Organization (1981–2011)</h2>
    <p>At its peak, Kennedy Space Center was the operational center of the most complex recurring vehicle program in the history of spaceflight. The Space Shuttle system — a three-component stack comprising the Orbiter, the External Tank, and two Solid Rocket Boosters — required approximately 11 months of processing time between flights at peak efficiency (the program never achieved its design goal of 24 flights per year; the actual average was about four per year). The workforce required to process a single Shuttle mission numbered in the thousands.</p>
    <p>The Shuttle-era KSC operations organization was a deeply integrated government-contractor partnership. NASA provided mission authority, safety oversight, and the organizational framework. A network of prime contractors — Lockheed Martin, United Space Alliance, Boeing — provided the operational workforce. The integration of these organizations was not seamless; the boundary between NASA oversight and contractor execution was a persistent source of organizational friction, documented in multiple GAO reports and examined in depth by the Columbia Accident Investigation Board.</p>
    <p>The Shuttle program created an enormously specialized workforce. Orbiters required specialized technicians, specialized tooling, and specialized procedures that had no application outside the Shuttle program. The Vehicle Assembly Building — at 3.7 million cubic feet of enclosed volume, one of the largest structures in the world by volume — was designed and optimized for a single vehicle stack. The infrastructure, the workforce, and the institutional knowledge of KSC as of 2010 were almost entirely Shuttle-specific.</p>

    <h2>Part II — The Transition (2011–2015)</h2>
    <p>The Shuttle's final mission — STS-135, Atlantis, landing at KSC on July 21, 2011 — ended the program and began one of the most difficult organizational transitions in the history of an institution that had navigated the Apollo program, the Challenger investigation, the Columbia accident, and thirty years of Shuttle processing. The workforce that had been built around the Shuttle had to be transformed into a workforce capable of supporting a fundamentally different operational model.</p>
    <p>The transition period was characterized by three simultaneous imperatives:</p>
    <ul>
      <li><strong>Workforce reduction and retention.</strong> The Shuttle-era contractor workforce declined from approximately 14,000 at the end of the program to roughly 7,000–8,000 by 2015. NASA and its contractors managed this reduction while attempting to retain the specific technical expertise that would be needed for the commercial era. The people who understood liquid hydrogen handling, acoustic suppression system maintenance, and high-bay crane operations were the same people whose Shuttle-specific skills were becoming obsolete. Retaining them while retraining them — without losing the institutional knowledge — was a genuine and not fully solved problem.</li>
      <li><strong>Infrastructure repurposing.</strong> The physical infrastructure of KSC was designed for the Shuttle. The Orbiter Processing Facilities, the crawler-transporter, the Mobile Launcher Platforms, and the VAB itself all required modification or repurposing. Some repurposing was straightforward (office space, storage). Some was complex and expensive (the VAB modifications to support the Space Launch System and commercial vehicles). Some infrastructure was simply retired.</li>
      <li><strong>Cultural transformation.</strong> This was the hardest transition. KSC's operational culture for thirty years had been built around a single vehicle, a single mission authority, and a deeply internalized set of procedures. The commercial era required a multi-tenant, multi-vehicle, multi-operator culture — one in which KSC's role was that of a facility operator and range authority, not a mission operator. The shift from "we fly the Shuttle" to "we support others' launches" was not a slogan change. It was a fundamental reorientation of organizational identity.</li>
    </ul>

    <h2>Part III — The Commercial Layering (2015–Present)</h2>
    <p>The commercial transition at KSC proceeded on multiple tracks simultaneously. The most visible was SpaceX's lease of Launch Complex 39A — the pad from which Apollo 11 and the first Shuttle mission launched — and the integration of SpaceX's Falcon 9 and Falcon Heavy operations into the KSC range fabric. This was not a simple tenant relationship. SpaceX operates with a technical and operational philosophy that is significantly different from NASA's legacy approach: faster turnaround, less documentation overhead, more iteration in the field. The interface between SpaceX's operational culture and KSC's institutional culture has been a subject of formal and informal negotiation since the beginning of the relationship.</p>
    <p>NASA's Space Launch System (SLS) program represented the other track: a new government vehicle, new operations procedures, and a requirement to use and modernize the VAB infrastructure that had been built for the Shuttle. SLS and commercial SpaceX operations at KSC represent an almost unprecedented operational coexistence — a government mega-rocket program and the world's most active commercial launch operator sharing range infrastructure, sharing support services, and sharing a workforce that must be capable of supporting both.</p>
    <p>The reusability layer added by SpaceX at KSC — Falcon 9 booster recovery, turnaround, and reflight — introduced operational requirements for which KSC had no historical procedures. Processing a returned orbital booster for reflight is a new operational domain: inspecting flight hardware that has been to orbit and back, certifying it for reuse, and integrating it into a launch campaign timeline that does not allow for the months-long processing cycles of the Shuttle era. The development of those procedures — at operational tempo, while flying — is one of the most significant operational achievements at KSC in the commercial era.</p>

    <h2>Part IV — The Operational Transformation Required</h2>
    <p>What did the KSC transformation actually require, organizationally and operationally? The gap between the Shuttle-era KSC and the commercial-era KSC is not primarily a technology gap. The facilities were repurposed and rebuilt. The technology evolved. The harder transformation was institutional.</p>
    <p>Three organizational changes were — and continue to be — essential:</p>
    <ol>
      <li><strong>Authority structure clarification.</strong> The Shuttle model gave NASA unambiguous mission authority — it was NASA's vehicle, NASA's mission, NASA's rules. The commercial model gave NASA a different role: range authority, safety oversight, and facility management — but not mission authority over the launch operator. SpaceX decides how to process its vehicle and when it is ready to fly. KSC establishes the range rules under which SpaceX operates. Getting that interface right — clearly, consistently, and without legacy assumptions about who is in charge of what — required years of deliberate negotiation and documentation.</li>
      <li><strong>Safety culture adaptation.</strong> The Shuttle's safety culture — for all its documented failures — was deeply internalized. The data on normalization of deviance was understood, even if not always followed. Bringing commercial operators, with their own corporate safety cultures and their own operational philosophies, into a range environment with KSC's institutional safety expectations required explicit safety culture alignment work. The mechanisms for that alignment — shared safety briefings, safety culture assessments, anomaly review protocols — are not exotic. They require consistent, visible management commitment.</li>
      <li><strong>Workforce versioning.</strong> The KSC workforce of 2026 must be capable of supporting a NASA deep space mission at LC-39B and a SpaceX commercial launch at LC-39A in the same week. These are different operational modes with different procedures, different authority structures, and different safety cultures. The management challenge of maintaining a multi-mode operational workforce — without allowing the cultures to either collide or inappropriately blend — is a live problem at KSC and will be at every major multi-tenant spaceport of the future.</li>
    </ol>

    <div class="callout callout-warning">
      <div class="callout-label">Analysis Questions — Work Through These Before Module Close</div>
      <div class="analysis-questions">
        <div class="aq-item">
          <div class="aq-num">Q1</div>
          <p>The KSC transition from a single-mission government organization to a multi-tenant commercial hub required changes across three dimensions: infrastructure, workforce, and organizational culture. Which of these three was the hardest to change — and what evidence from the case supports your answer?</p>
        </div>
        <div class="aq-item">
          <div class="aq-num">Q2</div>
          <p>SpaceX's operational model at LC-39A introduced a cultural tension with KSC's legacy procedures. Using the framework from Segment 2.5 (normalization of deviance / safety culture), what specific safety culture risks does this tension create — and what governance mechanisms would you put in place to manage those risks?</p>
        </div>
        <div class="aq-item">
          <div class="aq-num">Q3</div>
          <p>The case describes KSC moving from "we fly the Shuttle" to "we support others' launches." This is described as a cultural transformation, not just a process change. In your experience or observation, what organizational interventions are most effective at changing an institution's self-conception — and which ones typically fail?</p>
        </div>
        <div class="aq-item">
          <div class="aq-num">Q4</div>
          <p>A newly built commercial spaceport has signed five-year agreements with three launch operators. The lead operator (60% of projected revenue) has an operational model that requires direct access to the range safety system for pre-launch checks — bypassing the spaceport's standard shared interface. The lead operator argues this is necessary for their turnaround targets. What do you do?</p>
        </div>
      </div>
    </div>
  </div>
  <div id="segNavFooter"></div>
</div>`;

CONTENT['check'] = () => `
<div class="segment-content">
  <div class="seg-header">
    <div class="seg-header-eyebrow">
      <span class="seg-header-code">KNOWLEDGE CHECK</span>
      <span class="seg-header-meta">10 min · 8 questions · 70% to proceed</span>
    </div>
    <h1 class="seg-header-title">Module 2<br><em>Knowledge Check</em></h1>
    <p class="seg-header-subtitle">Apply what you've learned about launch operations, domain authority, safety culture, and workforce management.</p>
    <div class="seg-header-tags">
      <span class="tag">LO2.1 · LO2.2 · LO2.3 · LO2.4 · LO2.5</span>
      <span class="tag">Assessment</span>
    </div>
  </div>
  <div class="seg-body" id="quizContainer">
    <!-- Quiz rendered by initQuiz() -->
  </div>
</div>`;
