// Course App — ISU–GSA Spaceport Leadership Series
// Module 6 — The Strategic Leader: Decision Frameworks, Leadership & Synthesis

const CourseApp = (function() {

  const STATE_KEY = 'isu_gsa_m6_progress';

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

  const SEGMENTS = [
    { id: 'intro',  code: 'INTRO', name: 'Course Opener',                              dur: '8 min',  group: 'Introduction' },
    { id: 's6-1',   code: '6.1',   name: 'What Leadership Requires',                   dur: '11 min', group: 'Module 6 — The Strategic Leader' },
    { id: 's6-2',   code: '6.2',   name: 'Decision Frameworks',                        dur: '13 min', group: 'Module 6 — The Strategic Leader' },
    { id: 's6-3',   code: '6.3',   name: 'Strategic Risk Management',                  dur: '12 min', group: 'Module 6 — The Strategic Leader' },
    { id: 's6-4',   code: '6.4',   name: 'Leading Organizational Transformation',      dur: '11 min', group: 'Module 6 — The Strategic Leader' },
    { id: 's6-5',   code: '6.5',   name: 'Crisis Leadership',                          dur: '13 min', group: 'Module 6 — The Strategic Leader' },
    { id: 's6-6',   code: '6.6',   name: 'The Synthesis',                              dur: '14 min', group: 'Module 6 — The Strategic Leader' },
    { id: 's6-7',   code: '6.7',   name: 'Your Leadership Agenda',                     dur: '10 min', group: 'Module 6 — The Strategic Leader' },
    { id: 'case',   code: 'CASE',  name: 'Case Study — Wallops Island, 2014',          dur: '20 min', group: 'Case Study' },
    { id: 'check',  code: 'CHECK', name: 'Module Knowledge Check',                     dur: '10 min', group: 'Assessment' },
  ];

  const QUIZ = [
    {
      id: 'q1',
      lo: 'LO6.1',
      text: 'What distinguishes leadership of a commercial spaceport from general executive leadership of a comparably sized infrastructure organization?',
      options: [
        { id: 'a', text: 'Spaceport leaders must have engineering degrees because the technical content of the work requires domain expertise.' },
        { id: 'b', text: 'The regulatory requirements are more complex than in comparable infrastructure sectors.' },
        { id: 'c', text: 'Spaceport leaders are accountable to more stakeholders than leaders of other infrastructure organizations.' },
        { id: 'd', text: 'The combination of absolute safety accountability (where failure can be catastrophic), multi-party authority structures (no single party controls all variables), government-commercial ambiguity, and the pace of market change creates a leadership complexity that is qualitatively different from most infrastructure leadership roles.' },
      ],
      correct: 'd',
      rationale: 'Correct. The distinguishing characteristics of spaceport leadership are qualitative, not quantitative. The absolute nature of safety accountability — where a launch accident is a catastrophic, public, politically consequential event — creates a leadership standard that differs from most infrastructure leadership. The multi-party authority structure means the executive cannot rely on organizational authority to ensure operational outcomes — they must achieve alignment through influence, relationships, and shared culture. The government-commercial ambiguity (many spaceports are simultaneously government entities and commercial enterprises) creates governance complexity that is unusual. And the pace of change in the commercial space market means the strategic environment is shifting faster than most comparable infrastructure sectors. These factors in combination create a distinctive leadership challenge.',
    },
    {
      id: 'q2',
      lo: 'LO6.2',
      text: 'A spaceport executive must make a launch go/no-go decision with incomplete information: weather is marginal but within limits, a ground support equipment sensor has given one anomalous reading but has not recurred, and the launch operator\'s operations director is recommending a launch attempt. The executive has 30 minutes before the window closes. Which decision framework element is most important in this situation?',
      options: [
        { id: 'a', text: 'Defer to the launch operator\'s operations director — they have greater technical expertise than the spaceport executive.' },
        { id: 'b', text: 'Apply the "Return to Green" standard: if any single unresolved anomaly would cause concern if discovered post-launch, it warrants either resolution or a scrub — even at the cost of the window.' },
        { id: 'c', text: 'Evaluate the probability of a successful launch versus the cost of a scrub, and proceed if the expected value favors launching.' },
        { id: 'd', text: 'Accept the launch operator\'s recommendation unless the FAA RSO objects.' },
      ],
      correct: 'b',
      rationale: 'Correct. The "Return to Green" standard — also known as the "unresolved anomaly" rule — reflects a fundamental principle of aviation and aerospace safety: a decision-maker should not proceed with a launch when there is a known, unresolved anomaly, even if that anomaly seems minor, even if previous similar anomalies did not result in adverse outcomes, and even if the cost of scrubbing is high. The asymmetry of consequences in launch operations (a successful launch with an unresolved anomaly appears to vindicate the decision to proceed, but a failure traces back to that decision) creates a systematic bias toward normalization of deviance. The "Return to Green" standard combats this bias by requiring that anomalies be resolved — not accepted as within acceptable limits — before proceeding. The spaceport executive, not the launch operator\'s director, holds final authority over the launch decision at the facility level, and must exercise that authority independently.',
    },
    {
      id: 'q3',
      lo: 'LO6.3',
      text: 'A commercial spaceport\'s strategic risk register identifies "loss of primary operator" as a high-probability, high-impact risk. The risk owner proposes mitigating it by negotiating a longer-term contract with the primary operator. Why is this mitigation strategy insufficient?',
      options: [
        { id: 'a', text: 'A longer-term contract with the same operator reduces the probability of voluntary operator departure but does not mitigate the risk of involuntary loss — vehicle grounding, company financial failure, program cancellation, or regulatory suspension — which are often the highest-probability drivers of operator loss.' },
        { id: 'b', text: 'Longer-term contracts are not enforceable in commercial launch services.' },
        { id: 'c', text: 'The FAA will not approve launch licenses that include long-term exclusivity provisions.' },
        { id: 'd', text: 'Longer contracts increase legal exposure if the operator subsequently fails to perform.' },
      ],
      correct: 'a',
      rationale: 'Correct. Contract extension addresses the risk of voluntary operator departure — the operator choosing to leave — but is ineffective against the risk scenarios that are often more likely: a vehicle anomaly that grounds the fleet for an extended period (like the Falcon 9 AMOS-6 explosion in 2016, which grounded the fleet for four months), a company financial crisis, or a government regulatory action that suspends launch license operations. These events are not controllable by contract — an operator whose vehicle has been grounded cannot launch regardless of contractual commitments. Effective mitigation of the "loss of primary operator" risk requires: operator diversification (multiple operators so no single loss is existential), financial reserves (cash reserves to sustain operations through an extended cadence disruption), and financial structures that reduce fixed cost exposure during low-cadence periods.',
    },
    {
      id: 'q4',
      lo: 'LO6.4',
      text: 'A newly appointed spaceport executive director inherits an organization with a culture of deference to the incumbent launch operator — staff routinely accommodates operator requests that exceed contract terms, safety documentation is submitted late without consequence, and operations meetings are managed by the operator\'s personnel rather than the spaceport\'s. The executive director wants to shift to a more balanced, contract-based relationship. What is the most important first step?',
      options: [
        { id: 'a', text: 'Immediately invoke the contract\'s notice provisions and place the operator on a formal performance improvement plan.' },
        { id: 'b', text: 'Renegotiate the Launch Services Agreement to remove the provisions the operator has been violating.' },
        { id: 'c', text: 'Build internal organizational capability and confidence first: ensure the spaceport\'s own staff have the training, authority, and leadership support to exercise their professional responsibilities — then begin the process of resetting the operator relationship from a position of organizational competence.' },
        { id: 'd', text: 'Commission an independent operational audit to document the current situation before taking any action.' },
      ],
      correct: 'c',
      rationale: 'Correct. The most important first step is internal: building the organizational capability and confidence that has been eroded by a culture of deference. An executive director who attempts to reset the external operator relationship without first rebuilding internal organizational competence will find that their own staff — who have been accommodating the operator\'s requests because they didn\'t feel empowered to do otherwise — will not be able to maintain the new posture. The sequence matters: (1) signal to staff that they have executive support for exercising their professional responsibilities; (2) invest in training and process clarity so staff understand what the expected standard is; (3) establish internal accountability for meeting that standard; (4) begin the external relationship reset from a position where the spaceport\'s team is capable of performing to the standard you are asserting. Confronting the operator before the internal organization is ready creates a conflict the spaceport cannot sustain.',
    },
    {
      id: 'q5',
      lo: 'LO6.5',
      text: 'A launch vehicle has a mid-air anomaly that results in vehicle breakup. No injuries occur — the safety systems worked as designed and the range was clear. The launch operator issues a statement within 2 hours. As spaceport executive director, what is your primary communication responsibility in the first 24 hours?',
      options: [
        { id: 'a', text: 'No independent communication is needed — the launch operator is the FAA licensee and is responsible for all public communication about the event.' },
        { id: 'b', text: 'Issue a statement confirming the event, affirming that all safety protocols performed correctly, expressing support for the investigation process, and committing to cooperation with the FAA investigation — without speculating on cause or assigning responsibility.' },
        { id: 'c', text: 'Preserve all communications until legal counsel has reviewed the liability implications.' },
        { id: 'd', text: 'Issue a comprehensive technical statement explaining the anomaly and its root cause.' },
      ],
      correct: 'b',
      rationale: 'Correct. The spaceport operator has independent communication responsibilities even when the launch operator is the FAA licensee and the event occurred on the launch operator\'s vehicle. The spaceport is a visible, identifiable actor in the event — it is the physical location, and its staff and community will be asking questions. Silence communicates either complicity or incompetence. The appropriate statement in the first 24 hours is: factual (confirms what is known), safety-affirming (the range was clear, safety systems performed), process-committed (supporting the investigation), and non-speculative (does not assign cause or responsibility). The statement does not require legal review delay — it contains no liability admissions, only factual confirmation and process commitment. Organizations that go silent after incidents, waiting for legal clearance, lose the communication initiative to speculation and misinformation, which is much harder to correct after the fact.',
    },
    {
      id: 'q6',
      lo: 'LO6.6',
      text: 'Module 6 synthesizes the five preceding modules into an integrated strategic architecture. Which pairing correctly identifies the primary dependency between two of the module topics?',
      options: [
        { id: 'a', text: 'The regulatory framework (M3) determines site selection (M1) — the FAA\'s geographic licensing criteria dictate where spaceports can be located.' },
        { id: 'b', text: 'The leadership model (M6) determines the financial model (M4) — a good leader can make any financial model work.' },
        { id: 'c', text: 'The operations model (M2) determines the regulatory framework (M3) — the facility\'s operational capabilities shape the FAA\'s licensing requirements.' },
        { id: 'd', text: 'The business model (M4) determines the partnership architecture (M5) — the revenue model determines which partners the spaceport needs and what it can offer them.' },
      ],
      correct: 'd',
      rationale: 'Correct. The business model (M4 — finance, revenue structure, investment thesis) has a primary dependency relationship with the partnership architecture (M5 — government, operators, stakeholders, contracts). The revenue model determines: which operators the spaceport needs (the anchor tenant analysis); what the spaceport can offer government partners (economic development returns vs. subsidy requirements); what the spaceport can commit to in contracts (minimum revenue, operational service levels); and how much investment the spaceport can attract (capital structure vs. revenue coverage). A spaceport that cannot demonstrate a viable revenue model cannot attract the government partners, the institutional capital, or the operator commitments that constitute a viable partnership architecture. M4 and M5 are interdependent — but the causal flow from financial model to partnership architecture is stronger than the reverse.',
    },
    {
      id: 'q7',
      lo: 'LO6.7',
      text: 'A newly appointed spaceport director is developing their 90-day leadership agenda. They have identified 12 priorities from the course content. What is the most important discipline in converting a 12-priority list into an executable plan?',
      options: [
        { id: 'a', text: 'Sequence the priorities: identify which priorities are foundational (must be in place before others can proceed), which are urgent (time-sensitive window), which are strategic (define long-term direction), and execute in that order — starting with the foundational and urgent items regardless of their strategic significance.' },
        { id: 'b', text: 'Delegate all 12 priorities to direct reports simultaneously to accelerate execution.' },
        { id: 'c', text: 'Address priorities in order of political visibility — starting with the most publicly visible initiatives to build credibility with stakeholders.' },
        { id: 'd', text: 'Complete the most analytically tractable priorities first to build organizational momentum.' },
      ],
      correct: 'a',
      rationale: 'Correct. A 12-priority agenda is not an agenda — it is a list. Effective executive leadership requires sequencing priorities according to their dependencies and urgency. The discipline is: identify foundational priorities (the safety culture assessment, the financial model review, the operator relationship status — things that inform all other priorities) and urgent priorities (time-sensitive windows — a contract renewal coming up in 60 days, a budget request due to the state legislature, an FAA license renewal in 90 days) and execute those first, regardless of their strategic significance. Strategic priorities — the multi-year initiatives that will define the facility\'s trajectory — are important but they are typically not time-sensitive in the first 90 days. An executive who leads with strategic initiatives before understanding the foundational state of the organization risks investing energy in the wrong priorities based on an incomplete picture.',
    },
    {
      id: 'q8',
      lo: 'LO6.6',
      text: 'A new executive director\'s first week surfaces five simultaneous findings: (1) the primary launch pad has an unresolved structural anomaly from the most recent campaign; (2) the anchor operator has notified intent to transition to a new vehicle requiring pad modification within 18 months; (3) the facility\'s debt service coverage ratio is 0.87 — below the bond covenant threshold; (4) the Operations Director retires in 60 days; (5) the state governor\'s office requests a briefing within two weeks for an economic development press release. Applying the integrated framework from this course, what is the correct sequencing?',
      options: [
        { id: 'a', text: 'Prioritize the governor\'s briefing first: maintaining state political support is the foundation for operational and financial flexibility, and early engagement signals institutional competence.' },
        { id: 'b', text: 'Address the DSCR covenant breach as the first action: lender notification and a remediation plan must precede all other commitments to preserve the facility\'s financial capacity to act on anything else.' },
        { id: 'c', text: 'Resolve the pad structural anomaly before all other items — a known safety finding cannot be deferred while other priorities compete — then address the Operations Director succession, DSCR covenant, and vehicle transition in that order, with the governor\'s briefing scheduled once there are facts worth reporting.' },
        { id: 'd', text: 'Treat the anchor operator vehicle transition as the highest-priority item because it defines the capital program and revenue model for the next decade, and the 18-month planning window is already compressed.' },
      ],
      correct: 'c',
      rationale: 'Correct. The integrated framework from this course produces a clear sequence. Safety (M3, M6.5): a known, unresolved structural anomaly is non-negotiable — operations cannot proceed with a documented safety finding open, and no other priority justifies deferring it. Succession (M6.1): the Operations Director departure is a 60-day clock that starts now; this is a foundational capability risk that must be addressed in parallel with the safety resolution. Financial triage (M4): the DSCR covenant breach requires creditor engagement, but the remediation plan takes weeks to develop — begin this in parallel, not sequentially. Strategic planning (M5, M4): the vehicle transition is an 18-month horizon item requiring informed analysis, not a day-one action. Political (M6.4): the governor\'s briefing is scheduled, manageable, and is most valuable once you have concrete facts to report. Beginning with the politically visible item (option a) inverts the priority stack. Treating finance first (option b) is correct in sequence behind safety, not ahead of it.',
    },
  ];

  let state = loadState();

  function totalSegments() { return SEGMENTS.length; }
  function completedCount() { return state.completed.length; }
  function progressPct() { return Math.round((completedCount() / totalSegments()) * 100); }

  function markCompleted(id) {
    if (!state.completed.includes(id)) { state.completed.push(id); saveState(state); }
  }

  function segIndex(id) { return SEGMENTS.findIndex(s => s.id === id); }
  function prevSeg(id) { const i = segIndex(id); return i > 0 ? SEGMENTS[i-1] : null; }
  function nextSeg(id) { const i = segIndex(id); return i < SEGMENTS.length - 1 ? SEGMENTS[i+1] : null; }

  function renderSidebar(currentId) {
    const nav = document.getElementById('segmentNav');
    if (!nav) return;
    let lastGroup = null;
    let html = '';
    SEGMENTS.forEach(seg => {
      if (seg.group !== lastGroup) { html += `<div class="seg-group-label">${seg.group}</div>`; lastGroup = seg.group; }
      const isActive = seg.id === currentId;
      const isDone = state.completed.includes(seg.id);
      const classes = ['seg-item', isActive ? 'active' : '', isDone ? 'completed' : ''].filter(Boolean).join(' ');
      html += `<div class="${classes}" data-seg="${seg.id}" onclick="CourseApp.navigate('${seg.id}')"><div class="seg-dot"></div><div class="seg-text"><span class="seg-code">${seg.code}</span><span class="seg-name">${seg.name}</span></div><span class="seg-dur">${seg.dur}</span></div>`;
    });
    nav.innerHTML = html;
  }

  function renderProgress() {
    const fill = document.getElementById('progressFill');
    const pct = document.getElementById('progressPct');
    if (fill) fill.style.width = progressPct() + '%';
    if (pct) pct.textContent = progressPct() + '%';
  }

  function renderTopbar(seg) {
    const el = document.getElementById('topbarSegName');
    if (el) el.textContent = seg ? `${seg.code} — ${seg.name}` : '';
  }

  function renderNavFooter(currentId) {
    const footer = document.getElementById('segNavFooter');
    if (!footer) return;
    const prev = prevSeg(currentId);
    const next = nextSeg(currentId);
    footer.innerHTML = `
      <button class="seg-nav-btn" onclick="CourseApp.navigate('${prev ? prev.id : ''}')" ${!prev ? 'disabled' : ''}>← ${prev ? prev.name : 'Start'}</button>
      <button class="seg-nav-btn next" onclick="CourseApp.navigate('${next ? next.id : ''}')" ${!next ? 'disabled' : ''}>${next ? next.name : 'Complete'} →</button>`;
  }

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

  function loadSegmentContent(id, container) {
    const contentFn = CONTENT[id];
    if (contentFn) { container.innerHTML = contentFn(); if (id === 'check') initQuiz(); }
    else container.innerHTML = `<div class="segment-content"><p style="color:var(--slate)">Content loading…</p></div>`;
  }

  function initQuiz() {
    const container = document.getElementById('quizContainer');
    if (!container) return;
    let html = '';
    QUIZ.forEach((q, qi) => {
      const saved = state.quizAnswers[q.id];
      html += `<div class="kc-question" id="q-${q.id}"><div class="kc-q-num">Question ${qi+1} of ${QUIZ.length}  ·  ${q.lo}</div><p class="kc-q-text">${q.text}</p><div class="kc-options">${q.options.map(opt => `<button class="kc-option ${saved === opt.id ? 'selected' : ''} ${state.quizSubmitted ? 'disabled' : ''} ${state.quizSubmitted && opt.id === q.correct ? 'correct' : ''} ${state.quizSubmitted && saved === opt.id && saved !== q.correct ? 'incorrect' : ''}" data-q="${q.id}" data-opt="${opt.id}" onclick="CourseApp.selectOption('${q.id}', '${opt.id}')"><span class="option-letter">${opt.id.toUpperCase()}</span>${opt.text}</button>`).join('')}</div>${state.quizSubmitted ? `<div class="kc-feedback ${saved === q.correct ? 'correct-fb' : 'incorrect-fb'} show">${saved === q.correct ? '✓ Correct. ' : '✗ Incorrect. '} ${q.rationale}</div>` : ''}</div>`;
    });
    let scoreHtml = '';
    if (state.quizSubmitted) {
      const score = QUIZ.filter(q => state.quizAnswers[q.id] === q.correct).length;
      const pct = Math.round((score / QUIZ.length) * 100);
      const pass = pct >= 70;
      scoreHtml = `<div class="kc-score">Score: <span style="color: ${pass ? 'var(--success)' : 'var(--danger)'}">${score}/${QUIZ.length} (${pct}%)</span>${pass ? ' — <span style="color:var(--success)">Pass ✓</span>' : ' — <span style="color:var(--danger)">Retry recommended</span>'}</div>`;
    }
    container.innerHTML = `<div class="knowledge-check"><div class="kc-header"><div class="kc-icon">◈</div><div><div class="kc-title">Module 6 Knowledge Check</div><div class="kc-subtitle">8 questions · 70% to proceed · Immediate feedback</div></div></div>${html}<div class="kc-submit">${scoreHtml}${!state.quizSubmitted ? `<button class="btn-primary" onclick="CourseApp.submitQuiz()">Submit answers</button>` : `<button class="btn-secondary" onclick="CourseApp.resetQuiz()">Retake quiz</button><button class="seg-nav-btn next" onclick="CourseApp.completeModule()" style="margin-left:auto">Complete course →</button>`}</div></div>`;
  }

  function selectOption(qId, optId) {
    if (state.quizSubmitted) return;
    state.quizAnswers[qId] = optId;
    saveState(state);
    const qBlock = document.getElementById(`q-${qId}`);
    if (qBlock) qBlock.querySelectorAll('.kc-option').forEach(btn => btn.classList.toggle('selected', btn.dataset.opt === optId));
  }

  function submitQuiz() {
    if (Object.keys(state.quizAnswers).length < QUIZ.length) { alert(`Please answer all ${QUIZ.length} questions before submitting.`); return; }
    state.quizSubmitted = true;
    saveState(state);
    markCompleted('check');
    initQuiz();
  }

  function resetQuiz() { state.quizAnswers = {}; state.quizSubmitted = false; saveState(state); initQuiz(); }

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
    return `<div class="segment-content" style="text-align:center; padding: 6rem 2rem;">
      <div style="font-size:3rem; margin-bottom:1.5rem;">✦</div>
      <div style="font-size:0.7rem; letter-spacing:0.16em; text-transform:uppercase; color:var(--gold); margin-bottom:1rem;">Course complete</div>
      <h1 style="font-family:var(--font-display); font-size:3rem; font-weight:300; margin-bottom:1rem; color:var(--white);">ISU–GSA Global Spaceport<br>Leadership Series</h1>
      <p style="color:var(--slate-light); font-size:1rem; max-width:55ch; margin:0 auto 2rem; line-height:1.75;">Congratulations. You have completed all six modules of the Foundations of Spaceport Leadership executive certificate program. Module 6 knowledge check score: <strong style="color:var(--gold)">${score}/8 (${pct}%)</strong>.</p>
      <div style="display:flex; justify-content:center; gap:1rem; flex-wrap:wrap; margin-bottom:3rem;">
        <div style="background:var(--surface-2); border:1px solid var(--surface-3); border-radius:12px; padding:1.25rem 2rem; text-align:center;"><div style="font-family:var(--font-display); font-size:2rem; color:var(--gold); font-weight:300;">6/6</div><div style="font-size:0.72rem; text-transform:uppercase; letter-spacing:0.1em; color:var(--slate);">Modules completed</div></div>
        <div style="background:var(--surface-2); border:1px solid var(--surface-3); border-radius:12px; padding:1.25rem 2rem; text-align:center;"><div style="font-family:var(--font-display); font-size:2rem; color:var(--gold); font-weight:300;">${pct}%</div><div style="font-size:0.72rem; text-transform:uppercase; letter-spacing:0.1em; color:var(--slate);">Final assessment</div></div>
        <div style="background:var(--surface-2); border:1px solid var(--surface-3); border-radius:12px; padding:1.25rem 2rem; text-align:center;"><div style="font-family:var(--font-display); font-size:2rem; color:var(--gold); font-weight:300;">~15h</div><div style="font-size:0.72rem; text-transform:uppercase; letter-spacing:0.1em; color:var(--slate);">Total learning</div></div>
      </div>
      <div style="background:var(--surface); border:1px solid rgba(201,168,76,0.2); border-radius:16px; padding:2rem; max-width:600px; margin:0 auto 2rem; text-align:left;">
        <div style="font-size:0.65rem; letter-spacing:0.14em; text-transform:uppercase; color:var(--gold); margin-bottom:0.75rem;">What you've covered</div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem;">
          <div style="font-size:0.85rem; color:var(--slate-light);">M1 — The Strategic Site</div>
          <div style="font-size:0.85rem; color:var(--slate-light);">M2 — The Gateway Machine</div>
          <div style="font-size:0.85rem; color:var(--slate-light);">M3 — The Rules of Space</div>
          <div style="font-size:0.85rem; color:var(--slate-light);">M4 — The Business of Launch</div>
          <div style="font-size:0.85rem; color:var(--slate-light);">M5 — The Partnership Architecture</div>
          <div style="font-size:0.85rem; color:var(--gold);">M6 — The Strategic Leader ✓</div>
        </div>
      </div>
      <a href="../index.html" class="btn-primary" style="margin-right:1rem;">Return to course home →</a>
      <a href="index.html" class="btn-ghost">← Module 6 home</a>
    </div>`;
  }

  function init() {
    const seg = SEGMENTS.find(s => s.id === state.currentSegment) || SEGMENTS[0];
    renderSidebar(seg.id);
    renderProgress();
    renderTopbar(seg);
    renderNavFooter(seg.id);
    loadSegmentContent(seg.id, document.getElementById('segmentContainer'));
  }

  return { init, navigate, selectOption, submitQuiz, resetQuiz, completeModule, markCompleted, state: () => state };

})();

const CONTENT = {};

CONTENT['intro'] = () => `
<div class="segment-content">
  <div class="seg-header">
    <div class="seg-header-eyebrow">
      <span class="seg-header-code">COURSE OPENER</span>
      <span class="seg-header-meta">8 min · Final module framing</span>
    </div>
    <h1 class="seg-header-title">The Integration<br>of Everything<br><em>You've Learned</em></h1>
    <p class="seg-header-subtitle">Five modules. Eighty-plus segments. Tens of thousands of words. Module 6 does not add to that body of knowledge — it integrates it. And it asks the question that only you can answer: what will you do with it?</p>
    <div class="seg-header-tags">
      <span class="tag">ISU × GSA</span>
      <span class="tag">Module 6 of 6 — Final</span>
      <span class="tag">Executive Certificate</span>
    </div>
  </div>
  <div class="seg-body">
    <div class="callout callout-insight">
      <div class="callout-label">Where You Are</div>
      <p>If you have reached Module 6, you have worked through the full map of commercial spaceport leadership: the strategic site (M1), the operational machine (M2), the regulatory framework (M3), the business model (M4), and the partnership architecture (M5). You have the knowledge. Module 6 is about developing the judgment to apply it — and the agenda to act on it.</p>
    </div>
    <h2>From George Nield — Global Spaceport Alliance</h2>
    <p>After thirty years in this industry — at the FAA and now with the Global Spaceport Alliance — the question I'm most often asked by people entering senior leadership roles is: "What should I prioritize first?" My answer is always the same. First, understand where you actually are. Not where the strategic plan says you are. Not where the previous leadership said you were. Where you actually are — in safety culture, in financial health, in operator relationships, in staff capability, in community standing.</p>
    <p>The reason this matters: your next decisions will be built on your current situation. If you don't understand your current situation accurately, your decisions will be built on a foundation that doesn't exist. The most expensive mistakes I've seen in this industry came from leaders who inherited a situation and proceeded as if the inherited narrative were accurate. It wasn't, and the consequences were significant.</p>
    <div class="pull-quote">
      <div class="pull-quote-text">"First, understand where you actually are — not where the strategic plan says you are. The most expensive mistakes come from leaders who proceed as if the inherited narrative were accurate."</div>
      <div class="pull-quote-attr">George Nield — President, Global Spaceport Alliance</div>
    </div>
    <div class="callout callout-insight">
      <div class="callout-label">Learning Outcomes — Module 6</div>
      <p>By the end of this module you will be able to: describe the unique leadership demands of commercial spaceport executive roles; apply structured decision frameworks to high-stakes, time-pressured launch operations decisions; develop a strategic risk assessment for a commercial spaceport; lead organizational transformation in a multi-stakeholder environment; apply crisis communication principles to a launch incident scenario; integrate all six module topics into a coherent strategic architecture; and develop a 90-day leadership agenda that prioritizes foundational over strategic actions.</p>
    </div>
  </div>
  <div id="segNavFooter"></div>
</div>`;

CONTENT['s6-1'] = () => `
<div class="segment-content">
  <div class="seg-header">
    <div class="seg-header-eyebrow">
      <span class="seg-header-code">SEGMENT 6.1</span>
      <span class="seg-header-meta">11 min · ~1,400 words</span>
    </div>
    <h1 class="seg-header-title">What Leadership<br><em>Requires</em></h1>
    <p class="seg-header-subtitle">The distinctive demands of commercial spaceport executive leadership — and why the combination of safety accountability, multi-party authority, and market uncertainty creates a leadership challenge that is qualitatively different from most infrastructure roles.</p>
    <div class="seg-header-tags">
      <span class="tag-lo tag">LO6.1 — Understand</span>
      <span class="tag">Executive Leadership</span>
      <span class="tag">Accountability</span>
      <span class="tag">Leadership Competencies</span>
    </div>
  </div>
  <div class="seg-body">
    <p>The title "Spaceport Director" or "Executive Director" covers an enormous range of responsibilities — from the operator of a small horizontal launch facility with three staff and one operator to the director of a major multi-user facility managing 200 employees, multiple launch operators, government partners, and a hundred-million-dollar operating budget. What these roles share is a leadership complexity that distinguishes them from comparably scaled infrastructure leadership positions in other sectors.</p>

    <h2>The Three Distinctive Demands</h2>
    <div class="phase-block">
      <div class="phase-header"><span class="phase-num">DEMAND 01</span><div class="phase-title">Absolute Safety Accountability</div></div>
      <div class="phase-body">
        <p>A launch vehicle accident is not a recoverable event in the conventional management sense. It is a catastrophic, public, politically consequential event that will be covered by every major news organization, will trigger an FAA investigation, will affect the facility's commercial relationships, and may affect the careers of everyone in the leadership chain. The standard is not "acceptable safety performance" — it is "no accidents attributable to facility failure," and the pressure to compromise that standard for schedule, commercial, or political reasons is constant.</p>
        <p>This absolute accountability creates a leadership standard that most executives in comparable infrastructure roles do not carry. An airport director whose airline has a runway excursion is accountable — but the accountability is distributed across the airline, the aircraft manufacturer, the air traffic control system, and weather. A spaceport director whose facility contributed to a launch accident has concentrated, personal accountability that is more like a military commander's accountability for battlefield outcomes than a typical infrastructure executive's accountability for service delivery.</p>
      </div>
    </div>
    <div class="phase-block">
      <div class="phase-header"><span class="phase-num">DEMAND 02</span><div class="phase-title">Multi-Party Authority Without Unified Command</div></div>
      <div class="phase-body">
        <p>As established in Module 5, no single party has authority over all elements of a commercial launch operation. The spaceport director cannot command the launch operator, cannot override the FAA RSO, cannot preempt DoD range scheduling, and cannot direct the governor's political priorities for the facility. But they are accountable for the facility's operational outcomes, which depend on all of these parties performing well.</p>
        <p>This creates a leadership requirement for influence without authority — the ability to achieve alignment, build consensus, and create conditions for coordinated performance across parties over whom the director has no formal authority. This competency — often called "leading across boundaries" or "lateral leadership" — is different from hierarchical leadership and requires different skills: relationship investment, credibility construction, shared objective alignment, and conflict resolution without escalation.</p>
      </div>
    </div>
    <div class="phase-block">
      <div class="phase-header"><span class="phase-num">DEMAND 03</span><div class="phase-title">Strategic Navigation Under Market Uncertainty</div></div>
      <div class="phase-body">
        <p>The commercial space market is evolving faster than most strategic planning cycles. A five-year strategic plan developed in 2020 — before Starship development accelerated, before Starlink's commercial trajectory became clear, before multiple new entrant launch vehicles either succeeded or failed — would require fundamental revision by 2023. The spaceport director's strategy function must be continuous and adaptive rather than periodic and static. This requires a tolerance for uncertainty, a systematic approach to scenario planning, and the discipline to avoid over-committing to a specific market trajectory that may not materialize.</p>
      </div>
    </div>
    <div class="callout callout-insight">
      <div class="callout-label">The Three Non-Negotiables</div>
      <p>Across all of this complexity, three competencies are non-negotiable for effective spaceport executive leadership: <strong>uncompromising safety judgment</strong> (the ability to make and sustain the right call even under intense schedule and commercial pressure); <strong>relationship capital</strong> (the accumulated trust with operators, government partners, and staff that enables influence without authority); and <strong>strategic clarity</strong> (the ability to maintain a clear, adaptive, well-communicated direction for the facility even as the market evolves around it). Everything else is context-dependent. These three are universal.</p>
    </div>
  </div>
  <div id="segNavFooter"></div>
</div>`;

CONTENT['s6-2'] = () => `
<div class="segment-content">
  <div class="seg-header">
    <div class="seg-header-eyebrow">
      <span class="seg-header-code">SEGMENT 6.2</span>
      <span class="seg-header-meta">13 min · ~1,650 words</span>
    </div>
    <h1 class="seg-header-title">Decision<br><em>Frameworks</em></h1>
    <p class="seg-header-subtitle">Structured approaches to decisions under time pressure, uncertainty, and multi-party accountability. The frameworks that experienced spaceport executives use when the stakes are high and the clock is running.</p>
    <div class="seg-header-tags">
      <span class="tag-lo tag">LO6.2 — Apply</span>
      <span class="tag">Decision Making</span>
      <span class="tag">Go/No-Go</span>
      <span class="tag">Risk-Based Decisions</span>
    </div>
  </div>
  <div class="seg-body">
    <p>Experienced decision-makers in high-stakes, time-pressured environments do not make better decisions by thinking faster — they make better decisions by having prepared better. The frameworks described here are not used in real time as a procedural checklist; they are internalized through preparation, practiced in simulations and tabletop exercises, and applied as structured intuition when time pressure is real.</p>

    <h2>Framework 1 — The Return to Green Standard</h2>
    <p>For launch operational decisions, the most widely applied framework among experienced launch site executives is the Return to Green standard. Its application:</p>
    <ol>
      <li>Before a launch decision, identify all known anomalies and deviations from the established baseline.</li>
      <li>For each anomaly, apply the test: "If I were writing the incident report after a failure, would the presence of this unresolved anomaly be an element of the probable cause chain?"</li>
      <li>If the answer is "possibly yes" — even with low probability — the anomaly requires resolution before proceeding.</li>
      <li>An anomaly is "resolved" when the technical team has explained it, understood its cause, and confirmed it does not pose an increased risk. "We've seen this before without incident" is not resolution — it is normalization of deviance.</li>
    </ol>
    <p>The Return to Green standard is conservative. It will produce scrubs that turn out to have been unnecessary. The alternative — applying expected value analysis to anomalies and accepting some as acceptable risk — is what Challenger and Columbia both illustrate at the extreme end of consequence.</p>

    <h2>Framework 2 — The OODA Decision Cycle</h2>
    <p>For strategic decisions with shorter time horizons than a full analysis cycle, the OODA loop (Observe — Orient — Decide — Act), developed by military strategist John Boyd, provides a useful framework:</p>
    <ul>
      <li><strong>Observe:</strong> What is actually happening? What are the data points, not the interpretations? What is the timeline?</li>
      <li><strong>Orient:</strong> What does this mean in context? What framework explains this situation? What analogues apply?</li>
      <li><strong>Decide:</strong> What are the options? What are their consequences? What option best fits the current strategic objective?</li>
      <li><strong>Act:</strong> Execute the decision. Commit. Monitor the consequences. Begin the cycle again.</li>
    </ul>
    <p>The OODA framework's insight is that speed of decision is not primarily about cognitive speed — it is about the quality of orientation. An executive who has a comprehensive mental model of the spaceport's strategic environment (built through the preparation this course represents) can orient rapidly to new situations because they understand the context. An executive without that preparation must build orientation from scratch under time pressure — a significantly slower and error-prone process.</p>

    <h2>Framework 3 — The Reversibility Test</h2>
    <p>For strategic decisions with long-term consequences, the reversibility test asks: "If this decision turns out to be wrong, how reversible is it?" The framework applies different levels of deliberation to different levels of reversibility:</p>
    <div class="domain-grid">
      <div class="domain-card domain-launch">
        <div class="domain-label">HIGH REVERSIBILITY</div>
        <div class="domain-title">Two-Way Doors</div>
        <div class="domain-body">Decisions that can be undone with acceptable cost. An example: assigning a particular staff member to a project, scheduling a marketing event, committing to a conference presentation. These decisions warrant rapid execution — the cost of delay typically exceeds the risk of being wrong. As Amazon's Jeff Bezos framed it: use one standard for two-way doors (act quickly) and a different standard for one-way doors (deliberate carefully).</div>
      </div>
      <div class="domain-card domain-range">
        <div class="domain-label">LOW REVERSIBILITY</div>
        <div class="domain-title">One-Way Doors</div>
        <div class="domain-body">Decisions with high irreversibility: signing a 10-year exclusive Launch Services Agreement, committing $50M in capital to a new pad complex, restructuring the organization's senior leadership team. These decisions warrant structured, deliberate analysis — scenario planning, stakeholder consultation, financial modeling, risk assessment. The cost of a wrong decision far exceeds the cost of additional deliberation time.</div>
      </div>
    </div>
  </div>
  <div id="segNavFooter"></div>
</div>`;

CONTENT['s6-3'] = () => `
<div class="segment-content">
  <div class="seg-header">
    <div class="seg-header-eyebrow">
      <span class="seg-header-code">SEGMENT 6.3</span>
      <span class="seg-header-meta">12 min · ~1,550 words</span>
    </div>
    <h1 class="seg-header-title">Strategic Risk<br><em>Management</em></h1>
    <p class="seg-header-subtitle">Uncertainty at scale. The risk categories that are specific to commercial spaceport operations, and the management frameworks that turn risk awareness into risk action.</p>
    <div class="seg-header-tags">
      <span class="tag-lo tag">LO6.3 — Apply</span>
      <span class="tag">Risk Register</span>
      <span class="tag">Risk Mitigation</span>
      <span class="tag">Scenario Planning</span>
    </div>
  </div>
  <div class="seg-body">
    <p>Strategic risk management for a commercial spaceport is not primarily about insurance or compliance — it is about understanding the scenarios that could materially affect the facility's mission and ensuring the organization is positioned to detect early indicators and respond effectively. The goal is not to eliminate risk (which is impossible in a high-technology commercial operation) but to manage it: making deliberate choices about which risks to accept, which to mitigate, which to transfer, and which to avoid.</p>

    <h2>The Spaceport Risk Taxonomy</h2>
    <div class="axis-grid">
      <div class="axis-card">
        <span class="axis-num">CATEGORY A</span>
        <div class="axis-title">Safety and Operational Risks</div>
        <div class="axis-body">Launch vehicle anomalies, pad incidents, propellant system failures, personnel injuries, range safety system failures. These are the risks that can result in catastrophic outcomes — injury, death, major property damage — and are the risks that receive the most formal risk management attention (launch safety programs, formal safety review processes, redundant safety systems). The management approach: formal, documented, continuously reviewed. Never delegated from executive accountability.</div>
      </div>
      <div class="axis-card">
        <span class="axis-num">CATEGORY B</span>
        <div class="axis-title">Commercial and Financial Risks</div>
        <div class="axis-body">Customer concentration, launch cadence variability, contract default, capital structure stress, government funding reduction. These risks can threaten the facility's financial viability without producing safety consequences — but financial fragility eventually becomes a safety risk. The management approach: financial risk register with explicit concentration thresholds, revenue diversification targets, and cash reserve requirements. Board-level visibility required.</div>
      </div>
      <div class="axis-card">
        <span class="axis-num">CATEGORY C</span>
        <div class="axis-title">Regulatory and Reputational Risks</div>
        <div class="axis-body">FAA license suspension, environmental compliance violations, community opposition that affects political support, media incidents that damage reputation. These risks are often underestimated by operators who focus on safety and financial risks. A regulatory or reputational incident can have operational consequences as severe as a financial crisis — and is often harder to recover from, because trust, once damaged, rebuilds slowly. The management approach: proactive compliance culture, transparent community engagement, media relations capability, and regulatory relationship investment.</div>
      </div>
      <div class="axis-card">
        <span class="axis-num">CATEGORY D</span>
        <div class="axis-title">Strategic and Market Risks</div>
        <div class="axis-body">Market disruption from new vehicle capabilities (Starship), operator exit from the launch market (Virgin Orbit's closure), geopolitical changes affecting international commercial access, government policy shifts affecting commercial space development. These risks operate on longer time horizons but can have large-magnitude consequences. The management approach: scenario planning, strategic option preservation (avoiding over-commitment to a specific market trajectory), and continuous environmental scanning.</div>
      </div>
    </div>
    <div class="callout callout-insight">
      <div class="callout-label">The Risk Register as Management Tool</div>
      <p>A strategic risk register is only useful if it is maintained, reviewed, and acted upon. The common failure mode: a risk register is developed as part of a strategic planning exercise, filed, and not reviewed until the next planning cycle — by which time some of the identified risks have materialized and the register is no longer current. An effective risk register is a living document: reviewed quarterly, with explicit ownership for each risk, explicit thresholds that trigger escalation, and explicit mitigation actions with timelines. Risk owners should be accountable for the status of their risks at the same level they are accountable for their operational performance.</p>
    </div>
  </div>
  <div id="segNavFooter"></div>
</div>`;

CONTENT['s6-4'] = () => `
<div class="segment-content">
  <div class="seg-header">
    <div class="seg-header-eyebrow">
      <span class="seg-header-code">SEGMENT 6.4</span>
      <span class="seg-header-meta">11 min · ~1,400 words</span>
    </div>
    <h1 class="seg-header-title">Leading Organizational<br><em>Transformation</em></h1>
    <p class="seg-header-subtitle">The commercial space market is changing faster than most organizational cultures can adapt. The approaches that enable spaceport organizations to evolve at the pace the market demands — without losing the safety discipline that the mission requires.</p>
    <div class="seg-header-tags">
      <span class="tag-lo tag">LO6.4 — Apply</span>
      <span class="tag">Change Management</span>
      <span class="tag">Culture Change</span>
      <span class="tag">Organizational Development</span>
    </div>
  </div>
  <div class="seg-body">
    <p>Commercial spaceport organizations face a distinctive change challenge: they operate in a safety-critical environment that requires consistency, discipline, and procedural adherence — while the commercial market around them requires adaptability, speed, and willingness to change established patterns. Balancing these demands requires a nuanced approach to organizational transformation: knowing which elements of the organization's culture and operations must be stable, and which must evolve.</p>

    <h2>The Stable Core — What Must Not Change in Transformation</h2>
    <p>Not all organizational change is improvement. In safety-critical operations, some elements of the organizational culture are too important to risk in a transformation initiative:</p>
    <ul>
      <li><strong>Safety reporting culture:</strong> The norm that anomalies are reported promptly, that escalation is welcomed rather than penalized, and that safety concerns can be raised without professional consequence. This culture, once damaged, is very difficult to rebuild — and its loss is typically not detected until after a serious incident reveals that problems had been visible but unreported.</li>
      <li><strong>Technical standards and procedural discipline:</strong> The requirement that operations follow established procedures, that deviations are documented and reviewed, and that shortcuts are not accepted even under schedule pressure.</li>
      <li><strong>Regulatory relationship integrity:</strong> The norm that the organization's communications with regulatory authorities — FAA, DoD range, state environmental agencies — are accurate, complete, and timely. An organization that develops a pattern of strategic communication with its regulators — telling them what they want to hear rather than what is accurate — has created a liability that will eventually materialize in enforcement or worse.</li>
    </ul>

    <h2>The Adaptive Periphery — What Must Change</h2>
    <ul>
      <li><strong>Commercial model and revenue structure:</strong> As the launch market evolves, the facility's revenue model must evolve with it. Fixed revenue structures that made sense for a 2015 market may be inappropriate for a 2025 market.</li>
      <li><strong>Technology and operational infrastructure:</strong> Automation of routine operations, digital twin capabilities, predictive maintenance systems, and AI-assisted scheduling are transforming the operational capability of leading spaceports. Organizations that resist these changes on grounds of familiarity will find their operational costs increasingly disadvantaged relative to competitors who adopt them.</li>
      <li><strong>Workforce development:</strong> The skills required to operate a Falcon 9 launch complex are different from those required to operate a Starship facility. Workforce transformation — reskilling, upskilling, recruiting for new capabilities — is a continuous imperative in a sector where the technical baseline is advancing rapidly.</li>
    </ul>
  </div>
  <div id="segNavFooter"></div>
</div>`;

CONTENT['s6-5'] = () => `
<div class="segment-content">
  <div class="seg-header">
    <div class="seg-header-eyebrow">
      <span class="seg-header-code">SEGMENT 6.5</span>
      <span class="seg-header-meta">13 min · ~1,650 words</span>
    </div>
    <h1 class="seg-header-title">Crisis<br><em>Leadership</em></h1>
    <p class="seg-header-subtitle">When the system fails. The decision architecture, communication requirements, and human dimensions of leading through a launch incident or operational crisis.</p>
    <div class="seg-header-tags">
      <span class="tag-lo tag">LO6.5 — Apply</span>
      <span class="tag">Incident Response</span>
      <span class="tag">Crisis Communication</span>
      <span class="tag">Leadership Under Pressure</span>
    </div>
  </div>
  <div class="seg-body">
    <p>Every spaceport executive will eventually face a crisis — a launch anomaly, a personnel injury, an environmental incident, a major customer failure. The quality of leadership during a crisis — and in the hours, days, and weeks that follow — determines whether the crisis becomes a defining inflection point in the facility's trajectory (upward or downward) or a managed event that the organization recovers from and learns from.</p>

    <h2>The First 60 Minutes</h2>
    <p>The first 60 minutes of a launch incident are the most consequential for how the crisis develops. During this window, the following must be accomplished:</p>
    <ol>
      <li><strong>Confirm life safety status.</strong> Before any other action: confirm the range was clear, that no personnel are injured, that first responder protocols have been activated if required. This is not a communications task — it is a command task. The executive must personally confirm these answers, not rely on secondhand reports.</li>
      <li><strong>Activate the crisis protocol.</strong> Every facility should have a pre-established crisis protocol — chain of command, communication authority, decision authority for facility access and operations suspension. Activate it immediately. Ad hoc crisis response is slower and more error-prone than pre-planned response.</li>
      <li><strong>Establish communication authority.</strong> A single spokesperson must be designated for all external communications. This is typically the executive director or an explicitly designated communications director. No other personnel should make public statements about the incident — the risk of conflicting, inaccurate, or legally problematic communications is too high in the first hours when the facts are incomplete.</li>
      <li><strong>Notify key stakeholders.</strong> FAA (required for license holders), DoD range (if applicable), state government owner, key operators, and insurance carriers — in that priority order.</li>
    </ol>

    <h2>The Communication Architecture</h2>
    <p>Crisis communication for a launch incident has two distinct audiences with different information needs:</p>
    <div class="axis-grid">
      <div class="axis-card">
        <span class="axis-num">AUDIENCE A</span>
        <div class="axis-title">Regulatory and Government Authorities</div>
        <div class="axis-body">The FAA, DoD, state government, and law enforcement. These audiences require: complete, accurate factual information; documentation of the timeline and the actions taken; cooperation with investigation processes; and no strategic communication — no withholding of relevant information. Regulatory authorities with whom the facility has a trust deficit will investigate more aggressively, cooperate less readily, and be less flexible in enforcement outcomes. The investment in transparent, accurate regulatory communication in normal operations pays off dramatically in crisis situations.</div>
      </div>
      <div class="axis-card">
        <span class="axis-num">AUDIENCE B</span>
        <div class="axis-title">Public, Media, and Community</div>
        <div class="axis-body">These audiences require: timely initial confirmation that an incident occurred (avoid making the media learn of it through other channels), confirmation of life safety status, a commitment to the investigation process, and a cadence of factual updates as information becomes available. They do not require: speculation on cause, assignment of responsibility before investigation is complete, defensive statements minimizing the incident, or technical detail that will be inaccurate in the absence of a completed investigation. The worst press conference a spaceport executive can give is the one where they say "everything is fine" before the investigation has confirmed that everything is fine.</div>
      </div>
    </div>
    <div class="callout callout-warning">
      <div class="callout-label">The Human Dimension</div>
      <p>Crisis leadership is not only a management and communication challenge — it is a human challenge. The personnel who were on duty during a launch incident — the ground crew, the operations staff, the RSO — will be affected by the event in ways that extend beyond professional accountability. Effective crisis leadership includes: immediate acknowledgment of the emotional and professional impact on staff, rapid establishment of the investigation process (clarity about what happened protects staff from ambiguous professional exposure), support resources for personnel who may be experiencing stress or trauma, and protection from premature external accountability before the investigation is complete. Organizations that care for their people in a crisis retain their people. Organizations that throw their people under the investigation process to manage their own liability exposure lose them — and lose the safety culture that comes with experienced, trusted staff.</p>
    </div>
  </div>
  <div id="segNavFooter"></div>
</div>`;

CONTENT['s6-6'] = () => `
<div class="segment-content">
  <div class="seg-header">
    <div class="seg-header-eyebrow">
      <span class="seg-header-code">SEGMENT 6.6</span>
      <span class="seg-header-meta">14 min · ~1,800 words</span>
    </div>
    <h1 class="seg-header-title">The<br><em>Synthesis</em></h1>
    <p class="seg-header-subtitle">Connecting the six modules. How the strategic site, the operational machine, the regulatory framework, the business model, the partnership architecture, and the leadership approach form an integrated strategic system — and what breaks when any element fails.</p>
    <div class="seg-header-tags">
      <span class="tag-lo tag">LO6.6 — Synthesize</span>
      <span class="tag">Systems Thinking</span>
      <span class="tag">Strategic Integration</span>
      <span class="tag">Course Synthesis</span>
    </div>
  </div>
  <div class="seg-body">
    <p>The six modules of this course are not independent topics — they are components of an integrated strategic system. A spaceport that excels in any one dimension but fails in another will not achieve its mission. Understanding the interdependencies is the final analytical competency this course develops.</p>

    <h2>The Integration Map</h2>
    <div class="domain-grid">
      <div class="domain-card domain-launch">
        <div class="domain-label">M1 → M2</div>
        <div class="domain-title">Site Determines Operations</div>
        <div class="domain-body">The physical characteristics of the site — its trajectory access, its infrastructure, its environmental constraints, its geographic context — directly determine the operational model. A coastal polar orbit site has different safety exclusion zone management requirements, different launch window characteristics, and different range scheduling complexity than an inland suborbital facility. The site selection decisions made in Module 1 constrain and enable the operational architecture of Module 2. A site selection optimized for lowest acquisition cost that creates operational complexity costing $5M per year more than the alternative is not actually the low-cost option.</div>
      </div>
      <div class="domain-card domain-range">
        <div class="domain-label">M3 → M4</div>
        <div class="domain-title">Regulation Shapes Finance</div>
        <div class="domain-body">The regulatory framework (M3) directly constrains the business model (M4). The time and cost of FAA licensing affects how quickly a new operator can begin generating revenue. The liability framework determines insurance costs and risk allocation in Launch Services Agreements. Environmental compliance costs affect the facility's operating cost structure. A business model built without accurate regulatory cost modeling will be consistently wrong — typically over-projecting near-term revenue and under-projecting compliance costs.</div>
      </div>
      <div class="domain-card domain-gse">
        <div class="domain-label">M4 → M5</div>
        <div class="domain-title">Finance Structures Partnerships</div>
        <div class="domain-body">The financial model (M4) determines what the facility can offer its partners (M5). A financially healthy facility can offer government partners an economic development return that justifies continued investment. A facility under financial pressure offers government partners a difficult choice: continued subsidy or facility failure. The financial model also determines contract negotiating posture with operators: a facility with strong cash reserves and multiple operators can negotiate from strength; a facility dependent on a single operator to service its debt cannot. Financial health is a precondition for balanced partnerships.</div>
      </div>
    </div>
    <div class="domain-grid">
      <div class="domain-card domain-launch">
        <div class="domain-label">M5 → M6</div>
        <div class="domain-title">Partnerships Require Leadership</div>
        <div class="domain-body">The partnership architecture (M5) only functions if the leadership (M6) can sustain it. Multi-party coordination requires relationship capital — trust built over time through consistent, honest performance. Safety culture across the multi-party boundary requires leaders who model the standards they require. Government partnerships require leaders who can operate credibly at the government-commercial interface. The partnership architecture is not self-sustaining — it requires active, skilled leadership to maintain, especially under the stress of a financial challenge, an operational incident, or a market disruption.</div>
      </div>
      <div class="domain-card domain-range">
        <div class="domain-label">M2 → M3</div>
        <div class="domain-title">Operations Must Inform Regulation</div>
        <div class="domain-body">The operational model (M2) must be designed with the regulatory framework (M3) in mind — but the relationship also flows in the other direction. Operational experience should inform regulatory development. The most effective Part 450 performance-based safety regulations were developed through dialogue between FAA and operators who had operational experience with the limitations of prescriptive approaches. Spaceport operators who participate in FAA rulemaking, who submit technical comments on proposed regulations, and who engage in the regulatory process are helping to build the framework under which they operate. This is not lobbying — it is the appropriate participation of domain experts in the development of technical regulatory standards.</div>
      </div>
      <div class="domain-card domain-gse">
        <div class="domain-label">M6 → M1</div>
        <div class="domain-title">Leadership Begins with the Site</div>
        <div class="domain-body">The strategic leader's first responsibility is to understand the strategic position of the facility they lead — which is fundamentally a question about the site. What trajectory access does this site provide? What cannot be done here? What is the competitive position of this site relative to alternatives? What is the community context? The site assessment — Module 1's analytical framework — is the foundation on which all strategic leadership decision-making is built. Leaders who don't understand their site's strategic constraints cannot build a coherent strategy.</div>
      </div>
    </div>
    <div class="callout callout-insight">
      <div class="callout-label">The Failure Pattern — What Breaking One Link Does</div>
      <p>When any component of this integrated system fails, the effects propagate. A site with poor trajectory access (M1 failure) creates operational constraints (M2) that require regulatory accommodations (M3) that increase compliance costs (M4) that reduce the facility's attractiveness to operators (M5) that limits the facility's strategic options (M6). A financial crisis (M4 failure) creates pressure on partnership terms (M5) that strains relationships with operators and government (M5 consequence) that reduces political support for the facility (M5 consequence) that makes the financial crisis worse. Spaceport leadership is, fundamentally, systems management — maintaining the integrity of all six components simultaneously, and detecting early indicators of failure in any component before they propagate through the system.</p>
    </div>
  </div>
  <div id="segNavFooter"></div>
</div>`;

CONTENT['s6-7'] = () => `
<div class="segment-content">
  <div class="seg-header">
    <div class="seg-header-eyebrow">
      <span class="seg-header-code">SEGMENT 6.7</span>
      <span class="seg-header-meta">10 min · ~1,300 words</span>
    </div>
    <h1 class="seg-header-title">Your Leadership<br><em>Agenda</em></h1>
    <p class="seg-header-subtitle">From course to action. A structured framework for translating your learning into the first 90 days — and the ongoing discipline that makes the learning durable.</p>
    <div class="seg-header-tags">
      <span class="tag-lo tag">LO6.7 — Apply</span>
      <span class="tag">Action Planning</span>
      <span class="tag">90-Day Agenda</span>
      <span class="tag">Leadership Development</span>
    </div>
  </div>
  <div class="seg-body">
    <p>The value of this course is not in completing it — it is in applying it. The gap between knowing what good spaceport leadership looks like and actually doing it is crossed only through deliberate action. The 90-day agenda is the bridge.</p>

    <h2>The 90-Day Assessment Framework</h2>
    <p>Before setting priorities, understand your current situation. Apply the six-module framework as a diagnostic:</p>
    <div class="phase-block">
      <div class="phase-header"><span class="phase-num">WEEK 01–02</span><div class="phase-title">The Listening Tour</div></div>
      <div class="phase-body">Conduct structured conversations with: each direct report (understand their assessment of the facility's greatest strengths and vulnerabilities); the operations team leads (understand the safety culture, the operational issues, and the operator relationships from those who manage them daily); key government partners (FAA counterparts, state economic development contacts, DoD range liaisons); launch operator operations contacts; and three community representatives. Listen more than you speak. The objective is to develop an honest picture of where you actually are — not confirmation of the narrative you inherited.</div>
    </div>
    <div class="phase-block">
      <div class="phase-header"><span class="phase-num">WEEK 03–04</span><div class="phase-title">The Diagnostic Assessment</div></div>
      <div class="phase-body">Against each of the six module frameworks, assess the facility's current state: Site strategic position (is it well understood and actively leveraged?); Operations model (are procedures current, followed, and safety culture healthy?); Regulatory posture (are licenses current, relationships strong, compliance culture proactive?); Financial model (what is the revenue concentration, DSCR, and cash reserve position?); Partnership architecture (what is the health of key relationships with operators, government, and community?); Leadership team (are the right people in the right roles with the right support?). Identify the two or three areas where the gap between where you are and where you need to be is largest.</div>
    </div>
    <div class="phase-block">
      <div class="phase-header"><span class="phase-num">WEEK 05–12</span><div class="phase-title">The Priority Agenda</div></div>
      <div class="phase-body">Set no more than three priorities for the first 90 days — selected based on: urgency (what cannot wait), foundation (what must be in place before other things can work), and signal (what most clearly communicates the standards and direction of the new leadership). Execute against those three priorities with specificity and accountability. Delegate the rest. Review progress weekly. The discipline of three priorities, executed well, produces more than a list of twelve priorities, executed partially.</div>
    </div>

    <h2>Priority Selection Matrix</h2>
    <p>When your diagnostic assessment surfaces more priorities than you can execute simultaneously, use the following matrix to sequence them. Rate each candidate priority on two dimensions: <strong>Time Sensitivity</strong> (does a delay of 30–90 days materially increase cost, risk, or harm?) and <strong>Foundational Dependency</strong> (do other priorities depend on this one being resolved first?). The quadrant determines sequencing.</p>
    <div class="axis-grid">
      <div class="axis-card">
        <span class="axis-num">QUADRANT 1</span>
        <div class="axis-title">High Time Sensitivity + High Dependency → Execute First</div>
        <div class="axis-body">Examples: an open safety finding; an FAA license renewal deadline; an Operations Director succession with a 60-day window; a bond covenant breach requiring creditor notification. These are non-negotiable first actions. They are often not the most strategically interesting priorities, but they are the ones where delay compounds harm. A leader who defers a safety finding to pursue a strategic initiative has inverted the priority stack in a way that cannot be undone if something goes wrong.</div>
      </div>
      <div class="axis-card">
        <span class="axis-num">QUADRANT 2</span>
        <div class="axis-title">High Time Sensitivity + Low Dependency → Execute in Parallel</div>
        <div class="axis-body">Examples: a state budget request due to the legislature; a media situation requiring a public statement; an operator contract renewal with a fixed deadline. These are time-bounded but do not block other priorities. Execute them in parallel with Q1 items using delegated bandwidth — they should not consume the executive's primary focus.</div>
      </div>
      <div class="axis-card">
        <span class="axis-num">QUADRANT 3</span>
        <div class="axis-title">Low Time Sensitivity + High Dependency → Schedule Early</div>
        <div class="axis-body">Examples: the financial model review; the safety culture assessment; the partnership architecture review. These are not urgent in the 30-day sense, but they are foundational — the insights they produce inform the strategic priorities that will define your tenure. Schedule them as structured work in weeks 3–6, not as background reading. They are the foundation of informed leadership.</div>
      </div>
      <div class="axis-card">
        <span class="axis-num">QUADRANT 4</span>
        <div class="axis-title">Low Time Sensitivity + Low Dependency → Defer or Delegate</div>
        <div class="axis-body">Examples: brand refresh, website redesign, conference attendance strategy, non-critical facility improvements. These are legitimate organizational needs but they are not 90-day leadership priorities. Delegate them with clear ownership and a timeline. The 90-day agenda that includes a brand refresh is a 90-day agenda that has lost its focus.</div>
      </div>
    </div>
    <div class="callout callout-insight">
      <div class="callout-label">The Ongoing Discipline</div>
      <p>The 90-day agenda is a starting point, not an endpoint. The leaders in this industry who have made durable contributions — George Nield's three decades, the executives who have built the Vandenberg commercial ecosystem, the leaders who have navigated multiple market cycles — share a common discipline: they continue learning. They participate in industry forums. They maintain relationships across the sector. They read the technical and commercial literature. They conduct after-action reviews of their own decisions. They build the OODA orientation continuously, so that when decisions must be made quickly, their mental model of the situation is already current and accurate. The ISU–GSA Global Spaceport Leadership Series is designed to build that orientation. What you do with it — in your organization, in your market, in your career — is entirely yours.</p>
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
    <h1 class="seg-header-title">Wallops Island,<br><em>October 2014:</em><br>Leadership Under Fire</h1>
    <p class="seg-header-subtitle">Six seconds after liftoff, Orbital Sciences' Antares rocket fell back onto Pad 0A at the Mid-Atlantic Regional Spaceport and exploded. No one was injured. The Virginia Commercial Space Flight Authority now owned the hardest 90 days of its institutional life.</p>
    <div class="seg-header-tags">
      <span class="tag-lo tag">LO6.1 · LO6.2 · LO6.5 · LO6.6 — Synthesize</span>
      <span class="tag">Case Study</span>
      <span class="tag">Crisis Leadership</span>
      <span class="tag">MARS / Wallops Island</span>
    </div>
  </div>
  <div class="seg-body">
    <div class="callout callout-insight">
      <div class="callout-label">How to Use This Case</div>
      <p>This is a decision case. You are the Executive Director of the Virginia Commercial Space Flight Authority (VCSFA) — the entity that operates the Mid-Atlantic Regional Spaceport. The event has just happened. Read the situation, then work through the analysis questions before reviewing the outcomes. The objective is to apply the integrated frameworks from all six modules to a real, high-stakes leadership situation.</p>
    </div>

    <h2>The Situation: 6:22 PM, October 28, 2014</h2>
    <p>Antares ORB-3 lifted off from Pad 0A at the Mid-Atlantic Regional Spaceport on Wallops Island, Virginia at 6:22 PM Eastern time. It carried a Cygnus cargo spacecraft loaded with approximately 5,000 pounds of ISS resupply cargo — crew provisions, science experiments, spare hardware — under NASA's Commercial Resupply Services (CRS) contract with Orbital Sciences Corporation.</p>
    <p>Approximately six seconds after liftoff, at an altitude of roughly 100 feet, one of the two AJ-26 main engines suffered a catastrophic turbopump failure. The vehicle lost thrust, fell back vertically, and impacted the launch mount. The remaining propellant — approximately 500,000 pounds of kerosene and liquid oxygen — ignited on impact. Pad 0A, the launch mount structure, and surrounding infrastructure were severely damaged. The range had been clear. There were no injuries.</p>
    <p>The AJ-26 engines were refurbished NK-33 engines manufactured in the Soviet Union in the late 1960s and early 1970s, originally intended for the Soviet N1 lunar program. Orbital Sciences had acquired a stock of these engines from a Russian supplier. The turbopump failure mode that destroyed ORB-3 had, in fact, manifested in a less severe form during a 2013 test — a finding that Orbital Sciences had investigated and assessed as acceptable. That assessment would become part of the post-accident investigation record.</p>

    <h2>The First 72 Hours</h2>
    <p>As VCSFA Executive Director, you have the following immediate situation: (1) Pad 0A is destroyed. The fire is out within hours but the structural damage is extensive and the area is a federal accident investigation scene. You have no access and no timeline for access. (2) Orbital Sciences' launch operations are suspended indefinitely. Their next CRS mission — ORB-4 — is scheduled in 2015. There is no launch manifest for MARS until further notice. (3) NASA is dealing with a significant supply chain impact to ISS. The other CRS provider, SpaceX, will cover interim supply needs. The space station is not at risk, but the PR and political environment is charged. (4) The FAA has opened an accident investigation. Your facility's Site Operator License is not suspended, but access to the pad area is restricted pending investigation. (5) Virginia's Governor's office calls within two hours of the accident: what do you tell them?</p>
    <p>You also have a communication challenge. Wallops Island is a relatively rural location on the Virginia Eastern Shore. The explosion was visible and audible across a wide area. Social media is active. Local news crews are on the causeway. Three different federal agencies — NASA, FAA, and the U.S. Fish and Wildlife Service (which manages adjacent refuge land) — will want to coordinate public communications. Orbital Sciences has already issued a brief statement confirming the event. Your staff is waiting for your direction.</p>

    <h2>The Financial Exposure</h2>
    <p>The financial picture clarifies over the following weeks. VCSFA's revenue model was built around Antares launch campaigns: launch fees, pad use charges, and associated tenant and services revenue. With Orbital Sciences' vehicle grounded pending investigation and engine redesign, MARS faces an extended period of zero launch revenue. The state of Virginia's annual appropriation covers VCSFA's baseline operating costs, but capital recovery — the debt service on the pad and infrastructure investment — depends on launch fee revenue.</p>
    <p>The pad reconstruction cost is estimated at approximately $15 million. The state of Virginia will ultimately commit to funding the reconstruction — but that commitment takes months to secure, and the design and contracting process takes additional months beyond that. Orbital Sciences, meanwhile, is evaluating its engine options. The AJ-26 inventory is condemned. The company is in negotiation with Yuzhnoye Design Office in Ukraine for replacement RD-181 engines — a procurement that introduces new ITAR considerations and supply chain dependencies given the geopolitical situation in Ukraine in 2014–2015.</p>
    <p>Orbital Sciences uses the gap period to fulfill its remaining CRS obligations via Atlas V, launched from Cape Canaveral — a decision that keeps the NASA contract alive but generates no revenue for MARS. The facility will not see another Antares launch until October 2016, when Antares 230 — upgraded with RD-181 engines — launches the Cygnus OA-5 mission. The gap is 23 months.</p>

    <h2>The Recovery: Decisions That Defined the Outcome</h2>
    <p>The VCSFA's path through the 23-month gap involved several leadership decisions that are worth analyzing for their transferable content. First, VCSFA maintained its institutional composure and its operator relationship through the crisis. Rather than treating Orbital Sciences as the cause of the problem — which they arguably were — VCSFA treated them as a partner in recovery, facilitating the investigation access they needed, supporting the pad reconstruction design process collaboratively, and maintaining the relationship that would be essential when Antares returned to flight. A facility that had become adversarial with its primary operator during the gap would have been poorly positioned for the return-to-flight campaign.</p>
    <p>Second, VCSFA and the state of Virginia used the gap period to complete infrastructure improvements that would have been difficult to execute during active launch operations. The pad reconstruction incorporated upgrades beyond simple repair. This is a genuine silver lining in an otherwise costly event: forced downtime created an improvement opportunity.</p>
    <p>Third, VCSFA began developing its multi-operator strategy more aggressively during the gap. The ORB-3 event made concrete what had been a theoretical concern: single-operator dependence creates existential revenue risk. The facility began commercial engagement conversations with other potential operators for the Pad 0B complex and supporting infrastructure — investments in operator diversification that the pre-accident cadence had allowed to be deferred.</p>

    <div class="callout callout-warning">
      <div class="callout-label">Analysis Questions</div>
      <div class="analysis-questions">
        <div class="aq-item">
          <div class="aq-num">Q1</div>
          <p><strong>Crisis Communication (M6.5):</strong> As VCSFA Executive Director in the first 72 hours, you must issue a public statement and brief the Governor's office. What are the three non-negotiable elements of your public statement — and what are the two things you must not say, regardless of pressure to say them?</p>
        </div>
        <div class="aq-item">
          <div class="aq-num">Q2</div>
          <p><strong>Financial Architecture (M4):</strong> The 23-month revenue gap exposes a structural vulnerability in VCSFA's financial model. Apply the financial analysis framework from Module 4: what is the specific design flaw in a revenue model that creates this level of exposure — and what are three structural changes (not operational responses) that would reduce the exposure for the next event?</p>
        </div>
        <div class="aq-item">
          <div class="aq-num">Q3</div>
          <p><strong>Partnership Architecture (M5):</strong> The VCSFA chose to maintain a collaborative relationship with Orbital Sciences through the crisis rather than taking an adversarial posture. What is the strategic logic for this decision — and under what circumstances would an adversarial posture have been appropriate?</p>
        </div>
        <div class="aq-item">
          <div class="aq-num">Q4</div>
          <p><strong>Synthesis (M1–M6):</strong> Looking back from October 2016, when Antares 230 successfully launches OA-5, what was the single most important leadership decision made in the 23 months after the ORB-3 accident — and why? Apply the integrated framework from all six modules to justify your answer.</p>
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
      <span class="seg-header-meta">10 min · 8 questions · 70% to proceed · Final module</span>
    </div>
    <h1 class="seg-header-title">Module 6<br><em>Knowledge Check</em></h1>
    <p class="seg-header-subtitle">Final assessment: decision frameworks, strategic risk, crisis leadership, synthesis, and the leadership agenda. Complete this to finish the ISU–GSA Global Spaceport Leadership Series.</p>
    <div class="seg-header-tags">
      <span class="tag">LO6.1 · LO6.2 · LO6.3 · LO6.4 · LO6.5 · LO6.6 · LO6.7</span>
      <span class="tag">Final Assessment</span>
    </div>
  </div>
  <div class="seg-body" id="quizContainer"></div>
</div>`;
