// Course App — ISU–GSA Spaceport Leadership Series
// Module 4 — The Business of Launch: Finance, Investment & Commercial Models

const CourseApp = (function() {

  const STATE_KEY = 'isu_gsa_m4_progress';

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
    { id: 's4-1',   code: '4.1',   name: 'The Commercial Space Economy',               dur: '12 min', group: 'Module 4 — The Business of Launch' },
    { id: 's4-2',   code: '4.2',   name: 'Launch Market Economics',                    dur: '14 min', group: 'Module 4 — The Business of Launch' },
    { id: 's4-3',   code: '4.3',   name: 'Spaceport Revenue Architecture',             dur: '13 min', group: 'Module 4 — The Business of Launch' },
    { id: 's4-4',   code: '4.4',   name: 'Capital and Investment',                     dur: '12 min', group: 'Module 4 — The Business of Launch' },
    { id: 's4-5',   code: '4.5',   name: 'The Anchor Tenant Problem',                  dur: '10 min', group: 'Module 4 — The Business of Launch' },
    { id: 's4-6',   code: '4.6',   name: 'Financial Performance Metrics',              dur: '11 min', group: 'Module 4 — The Business of Launch' },
    { id: 's4-7',   code: '4.7',   name: 'The 2030 Business Case',                     dur: '11 min', group: 'Module 4 — The Business of Launch' },
    { id: 'case',   code: 'CASE',  name: 'Case Study — Spaceport America',             dur: '20 min', group: 'Case Study' },
    { id: 'check',  code: 'CHECK', name: 'Module Knowledge Check',                     dur: '10 min', group: 'Assessment' },
  ];

  const QUIZ = [
    {
      id: 'q1',
      lo: 'LO4.1',
      text: 'The commercial space economy is often described as having an "upstream" and "downstream" segment. Which of the following correctly characterizes this distinction?',
      options: [
        { id: 'a', text: 'Upstream refers to launch services; downstream refers to satellite manufacturing and ground infrastructure.' },
        { id: 'b', text: 'Upstream encompasses launch and satellite manufacturing (getting to space); downstream encompasses satellite services, data analytics, and applications (value derived from space).' },
        { id: 'c', text: 'Upstream is the government sector; downstream is the commercial sector.' },
        { id: 'd', text: 'Upstream refers to orbital operations; downstream refers to suborbital and atmospheric operations.' },
      ],
      correct: 'b',
      rationale: 'Correct. The upstream/downstream distinction divides the space economy at the point of orbit. Upstream encompasses everything required to reach space: launch vehicles, launch services, satellites and spacecraft manufacturing, and ground infrastructure to support launch operations. Downstream encompasses the value derived from being in space: satellite communications services, Earth observation data products, navigation services, and the applications built on them. The downstream segment is significantly larger in revenue terms — estimated at over $300 billion annually as of 2024, versus roughly $12–15 billion for launch services. Understanding this distribution is essential for evaluating the commercial spaceport business case.',
    },
    {
      id: 'q2',
      lo: 'LO4.2',
      text: 'SpaceX\'s Falcon 9 dramatically reduced launch costs beginning around 2015. Which factor was the single most significant driver of that cost reduction?',
      options: [
        { id: 'a', text: 'Government subsidies and NASA anchor contracts that spread development costs over a large launch volume.' },
        { id: 'b', text: 'Vertical integration — manufacturing most major components in-house — combined with reusability of the first-stage booster.' },
        { id: 'c', text: 'Lower regulatory compliance costs under the FAA\'s streamlined Part 450 licensing framework.' },
        { id: 'd', text: 'Propellant cost reductions driven by the commercial natural gas market for methane-fueled engines.' },
      ],
      correct: 'b',
      rationale: 'Correct. SpaceX\'s cost structure advantage has two primary drivers: vertical integration (manufacturing engines, structures, avionics, and most major subsystems in-house eliminates contractor margins and enables rapid design iteration) and first-stage reusability (recovering and reflying the booster — the most expensive single component of the vehicle — transforms the launch cost model from "new vehicle per launch" to "fuel plus refurbishment per launch"). Government anchor contracts were important for SpaceX\'s development, but the structural cost advantage derives from the manufacturing and reuse model, not from government subsidy.',
    },
    {
      id: 'q3',
      lo: 'LO4.3',
      text: 'A commercial spaceport\'s revenue model typically includes launch-related fees and non-launch revenue streams. Which of the following is the most commercially significant non-launch revenue category for a mature multi-user spaceport?',
      options: [
        { id: 'a', text: 'Tourism and visitor center admissions.' },
        { id: 'b', text: 'Tenant fees from aerospace companies, system integrators, and technology firms co-locating at the spaceport.' },
        { id: 'c', text: 'Government grants and state economic development subsidies.' },
        { id: 'd', text: 'Revenue from licensing the spaceport\'s operational procedures to other spaceports.' },
      ],
      correct: 'b',
      rationale: 'Correct. For commercially mature multi-user spaceports, the tenant ecosystem — aerospace firms, system integrators, research institutions, and commercial technology companies co-locating to be adjacent to launch operations — represents the most commercially significant and most stable non-launch revenue stream. Tenant revenues are recurring, contractually based, and not subject to the cadence variability that characterizes launch fee revenue. Cape Canaveral\'s Space Coast and Spaceport Colorado\'s Front Range ecosystem illustrate how spaceport-adjacent commercial activity can exceed the revenue generated by launch fees themselves. Government grants and subsidies are capital, not operational revenue — they fund the facility but do not sustain it.',
    },
    {
      id: 'q4',
      lo: 'LO4.4',
      text: 'A state government is evaluating a $200 million investment in a commercial spaceport facility on its coast. The projected return on investment is based primarily on direct launch-fee revenue from contracted operators. What is the most significant analytical error in this investment thesis?',
      options: [
        { id: 'a', text: 'The state should only invest in spaceports that are already operating, not greenfield developments.' },
        { id: 'b', text: 'Launch-fee revenue alone is rarely sufficient to service $200 million in capital investment — the investment case must include the full economic impact (jobs, induced economic activity, tenant revenues, and regional development) which is broader than direct facility revenue.' },
        { id: 'c', text: 'State governments should not invest in commercial infrastructure because it distorts the market.' },
        { id: 'd', text: 'The 180-day FAA licensing process means the spaceport cannot generate revenue for at least 18 months.' },
      ],
      correct: 'b',
      rationale: 'Correct. Most commercial spaceport investment cases by state and regional governments are justified primarily on economic impact — jobs created, regional economic activity stimulated, technology sector development — rather than on direct launch-fee return. A $200 million facility that generates $3–5 million per year in direct launch fees does not justify the investment on a direct return basis. The investment is justified by the broader economic development argument: the spaceport as a catalyst for an aerospace ecosystem that generates multiples of the direct facility revenue in regional economic activity. An analysis that looks only at direct launch-fee return misses the primary investment rationale — and risks dramatically overstating the financial viability of the standalone facility.',
    },
    {
      id: 'q5',
      lo: 'LO4.5',
      text: 'A commercial spaceport has signed a 10-year Launch Services Agreement with a single operator that will account for 85% of projected revenue. The operator represents an excellent customer — reliable, high-launch-cadence, well-funded. What is the primary risk this concentration creates?',
      options: [
        { id: 'a', text: 'The FAA may require the spaceport to limit its contractual commitment to any single operator to 60% of capacity under anti-monopoly provisions.' },
        { id: 'b', text: 'Extreme customer concentration means any change in the operator\'s business — vehicle transition, market disruption, corporate restructuring, or budget cut — becomes an existential threat to the spaceport rather than a manageable customer issue.' },
        { id: 'c', text: 'The operator will be able to renegotiate the contract terms at renewal, since the spaceport has no viable alternative customers.' },
        { id: 'd', text: 'Insurance for the spaceport will be unavailable or prohibitively expensive with such a concentrated revenue base.' },
      ],
      correct: 'b',
      rationale: 'Correct. The anchor tenant concentration risk is not primarily contractual — it is existential. A spaceport with 85% revenue concentration in a single operator has effectively become a captive service provider to that operator. Any disruption to that operator\'s program — SpaceX\'s Starship transition affecting Falcon 9 cadence, a Blue Origin launch vehicle anomaly grounding the fleet, a government contract cancellation — translates directly into a financial crisis for the spaceport. The spaceport\'s fixed costs (debt service, operations, safety staffing) do not decrease when launches decrease. This is precisely the situation Spaceport America found itself in when Virgin Galactic\'s commercial operations were slower than projected — a cautionary case examined in this module\'s case study.',
    },
    {
      id: 'q6',
      lo: 'LO4.6',
      text: 'Which financial metric is most useful for comparing the operational efficiency of two commercial spaceports with different revenue scales and different capital structures?',
      options: [
        { id: 'a', text: 'Total annual launch revenue.' },
        { id: 'b', text: 'Net profit margin (net income as a percentage of total revenue).' },
        { id: 'c', text: 'EBITDA margin (earnings before interest, taxes, depreciation, and amortization, as a percentage of revenue).' },
        { id: 'd', text: 'Return on equity (net income divided by shareholders\' equity).' },
      ],
      correct: 'c',
      rationale: 'Correct. EBITDA margin removes the distortions of different capital structures (interest expense varies based on how the facility was financed), different tax situations (public vs. private vs. government-owned entities have different tax profiles), and different depreciation schedules (a newly built facility has high depreciation; a fully depreciated facility shows artificially high net income). EBITDA margin measures operational profitability — how efficiently the facility converts revenue into operating cash flow — independent of financing and accounting choices. For comparing two facilities with different ownership structures, different debt loads, and different asset ages, EBITDA margin is the most informative profitability comparison.',
    },
    {
      id: 'q7',
      lo: 'LO4.2',
      text: 'The total cost of a commercial launch includes the launch price paid by the customer, but the "true" launch cost structure includes additional elements that are not always visible in the list price. Which element is most commonly underestimated by launch customers in total cost of ownership analysis?',
      options: [
        { id: 'a', text: 'Range safety fees charged by the FAA.' },
        { id: 'b', text: 'Mission integration and interface costs — the engineering work required to integrate a payload with a specific launch vehicle.' },
        { id: 'c', text: 'Insurance premiums required by the launch operator before they will accept the payload.' },
        { id: 'd', text: 'Export control compliance costs for regulated payload components.' },
      ],
      correct: 'b',
      rationale: 'Correct. Mission integration and interface costs — the engineering resources required to design and verify the mechanical, thermal, electrical, and communications interface between a customer\'s payload and the specific launch vehicle — are consistently underestimated in total launch cost analyses. These costs are highly variable (simple cubesat deployment versus complex GEO satellite integration are orders of magnitude different) and are typically the customer\'s responsibility rather than the launch operator\'s. For an organizational customer launching for the first time, integration costs can equal or exceed the launch price. All of the other options — range safety fees, insurance, export control — are real costs, but they are more consistently anticipated and documented in procurement planning.',
    },
    {
      id: 'q8',
      lo: 'LO4.7',
      text: 'Commercial space market projections consistently show the total market growing from approximately $570 billion in 2024 to over $1 trillion by 2035. What is the primary driver of this growth, and what is the most significant execution risk to the projection?',
      options: [
        { id: 'a', text: 'Driver: government space program expansion. Risk: political budget cycles.' },
        { id: 'b', text: 'Driver: commercial satellite services expansion (broadband, Earth observation, navigation). Risk: whether customer demand for space-based services materializes at projected scale.' },
        { id: 'c', text: 'Driver: launch cost reductions driving new applications. Risk: whether SpaceX maintains its cost leadership.' },
        { id: 'd', text: 'Driver: space tourism market development. Risk: safety incidents damaging consumer confidence.' },
      ],
      correct: 'b',
      rationale: 'Correct. The projected growth in the total space economy to $1 trillion is primarily driven by the expansion of commercial satellite services — particularly broadband internet (Starlink, Kuiper, OneWeb), Earth observation analytics, and precision navigation services. Launch cost reductions enable this growth by making deployment economically viable, but they are an enabler rather than a primary driver. The most significant execution risk to the projection is demand-side: whether enterprises and consumers will actually pay for space-derived services at the scale that justifies the infrastructure investment. Satellite broadband economics, in particular, depend on achieving user adoption rates that have historically been more optimistic in projections than in practice — Iridium, Globalstar, and the original OneWeb all provide cautionary data points.',
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
    container.innerHTML = `<div class="knowledge-check"><div class="kc-header"><div class="kc-icon">◈</div><div><div class="kc-title">Module 4 Knowledge Check</div><div class="kc-subtitle">8 questions · 70% to proceed · Immediate feedback</div></div></div>${html}<div class="kc-submit">${scoreHtml}${!state.quizSubmitted ? `<button class="btn-primary" onclick="CourseApp.submitQuiz()">Submit answers</button>` : `<button class="btn-secondary" onclick="CourseApp.resetQuiz()">Retake quiz</button><button class="seg-nav-btn next" onclick="CourseApp.completeModule()" style="margin-left:auto">Complete module →</button>`}</div></div>`;
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
      <div style="font-size:3rem; margin-bottom:1.5rem;">◎</div>
      <div style="font-size:0.7rem; letter-spacing:0.16em; text-transform:uppercase; color:var(--gold); margin-bottom:1rem;">Module complete</div>
      <h1 style="font-family:var(--font-display); font-size:3rem; font-weight:300; margin-bottom:1rem; color:var(--white);">The Business of Launch</h1>
      <p style="color:var(--slate-light); font-size:1rem; max-width:50ch; margin:0 auto 2rem; line-height:1.75;">You've completed Module 4 of the ISU–GSA Global Spaceport Leadership Series. Your knowledge check score: <strong style="color:var(--gold)">${score}/8 (${pct}%)</strong>.</p>
      <div style="display:flex; justify-content:center; gap:1rem; flex-wrap:wrap; margin-bottom:3rem;">
        <div style="background:var(--surface-2); border:1px solid var(--surface-3); border-radius:12px; padding:1.25rem 2rem; text-align:center;"><div style="font-family:var(--font-display); font-size:2rem; color:var(--gold); font-weight:300;">${pct}%</div><div style="font-size:0.72rem; text-transform:uppercase; letter-spacing:0.1em; color:var(--slate);">Knowledge check</div></div>
        <div style="background:var(--surface-2); border:1px solid var(--surface-3); border-radius:12px; padding:1.25rem 2rem; text-align:center;"><div style="font-family:var(--font-display); font-size:2rem; color:var(--gold); font-weight:300;">${completedCount()}</div><div style="font-size:0.72rem; text-transform:uppercase; letter-spacing:0.1em; color:var(--slate);">Segments completed</div></div>
      </div>
      <div style="background:var(--surface); border:1px solid rgba(201,168,76,0.2); border-radius:16px; padding:2rem; max-width:560px; margin:0 auto 2rem;">
        <div style="font-size:0.65rem; letter-spacing:0.14em; text-transform:uppercase; color:var(--gold); margin-bottom:0.75rem;">Up next</div>
        <div style="font-family:var(--font-display); font-size:1.4rem; color:var(--white); margin-bottom:0.5rem;">Module 5 — The Partnership Architecture</div>
        <div style="font-size:0.85rem; color:var(--slate-light);">Government Relations · Contracts · Stakeholders · ~2.5 hours</div>
      </div>
      <a href="../m5-partnership-architecture/index.html" class="btn-primary" style="margin-right:1rem;">Go to Module 5 →</a>
      <a href="index.html" class="btn-ghost">← Back to module home</a>
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
      <span class="seg-header-meta">8 min · Context &amp; framing</span>
    </div>
    <h1 class="seg-header-title">The Economics<br>Behind the<br><em>Countdown</em></h1>
    <p class="seg-header-subtitle">Welcome to Module 4. The regulations are understood. The operations are mapped. Now we ask: how does the money work — and what does it take to make a spaceport financially viable?</p>
    <div class="seg-header-tags">
      <span class="tag">ISU × GSA</span>
      <span class="tag">Module 4 of 6</span>
      <span class="tag">Executive Certificate</span>
    </div>
  </div>
  <div class="seg-body">
    <div class="callout callout-insight">
      <div class="callout-label">Continuing from Module 3</div>
      <p>Module 3 built the regulatory map: the international legal architecture, the FAA licensing framework, and the evolving regulatory environment. Module 4 adds the financial dimension — the market structure that determines who is paying for what, the economic models that determine whether a commercial spaceport is viable, and the financial metrics that separate a healthy operation from an expensive piece of infrastructure waiting for customers that never quite arrive in sufficient numbers.</p>
    </div>
    <h2>From George Nield — Global Spaceport Alliance</h2>
    <p>When I was at the FAA, the financial viability of commercial spaceports wasn't my problem — my job was safety. But I watched enough facilities struggle over the years to understand that financial fragility is itself a safety issue. A spaceport that is under financial pressure cuts corners. It defers maintenance. It loses its best people to employers who can pay competitively. It accepts customers it shouldn't, under contract terms it can't support. Financial health and operational safety are not independent variables in this business.</p>
    <p>What I've seen from the Global Spaceport Alliance perspective is that many of the facilities that are struggling today are struggling for a predictable reason: they built to a demand projection that was optimistic, they structured their revenue around a single customer, and they didn't build enough non-launch revenue to sustain operations through the inevitable cadence variability. The financial model problem is not unique to any one facility — it's a pattern.</p>
    <div class="pull-quote">
      <div class="pull-quote-text">"Financial fragility is itself a safety issue. A spaceport under financial pressure cuts corners, defers maintenance, and loses its best people."</div>
      <div class="pull-quote-attr">George Nield — President, Global Spaceport Alliance</div>
    </div>
    <h2>What You Will Learn</h2>
    <p>This module maps the commercial space economy as the market context within which spaceports operate, then builds the financial architecture of the spaceport business: revenue models, cost structures, capital investment, and the financial metrics that executives use to evaluate operational performance. The case study examines Spaceport America — the most instructive example in the current market of what happens when a sophisticated facility is built without a viable financial model.</p>
    <div class="callout callout-insight">
      <div class="callout-label">Learning Outcomes — Module 4</div>
      <p>By the end of this module you will be able to: describe the structure and scale of the commercial space economy; explain launch market economics and the impact of reusability on launch pricing; map the revenue architecture of a commercial spaceport; identify the key capital investment characteristics of spaceport development; analyze the anchor tenant risk and its mitigation strategies; apply financial performance metrics to a spaceport operating profile; and evaluate a 2030 commercial space market projection.</p>
    </div>
  </div>
  <div id="segNavFooter"></div>
</div>`;

CONTENT['s4-1'] = () => `
<div class="segment-content">
  <div class="seg-header">
    <div class="seg-header-eyebrow">
      <span class="seg-header-code">SEGMENT 4.1</span>
      <span class="seg-header-meta">12 min · ~1,550 words</span>
    </div>
    <h1 class="seg-header-title">The Commercial<br><em>Space Economy</em></h1>
    <p class="seg-header-subtitle">Market architecture, size, and growth. Where the money actually is — and what it means for the spaceport sector.</p>
    <div class="seg-header-tags">
      <span class="tag-lo tag">LO4.1 — Understand</span>
      <span class="tag">Market Structure</span>
      <span class="tag">Upstream/Downstream</span>
      <span class="tag">Market Size</span>
    </div>
  </div>
  <div class="seg-body">
    <p>The commercial space economy is frequently described in terms of launch — rockets, launch cadence, launch costs, launch market share. This is understandable: launches are the most visible commercial space activity, and the growth in launch cadence over the past decade is genuinely dramatic. But launches account for only a fraction of the total commercial space economy. Understanding where the money actually is requires a more complete map.</p>

    <h2>The Space Economy Structure</h2>
    <div class="axis-grid">
      <div class="axis-card">
        <span class="axis-num">SEGMENT A</span>
        <div class="axis-title">Upstream — Getting to Space</div>
        <div class="axis-body">
          <p>Launch services: the direct revenue from launch contracts between launch operators and satellite operators/government customers. Estimated at $12–15 billion annually as of 2024. Growing at approximately 8–12% annually, driven by commercial smallsat deployment and government launch demand.</p>
          <p>Satellite manufacturing: the design, construction, and testing of satellites and spacecraft. Estimated at $20–25 billion annually. The smallsat revolution has created a bifurcated market — high-volume low-cost smallsats (Starlink, Kuiper, Planet Labs) and lower-volume high-cost GEO communications satellites.</p>
          <p>Ground infrastructure: launch facilities, mission control systems, and the ground segment supporting space operations. Spaceport development globally — new facilities in the U.S., UK, Norway, New Zealand, Australia, and multiple other markets — represents significant capital deployment.</p>
        </div>
      </div>
      <div class="axis-card">
        <span class="axis-num">SEGMENT B</span>
        <div class="axis-title">Downstream — Value from Space</div>
        <div class="axis-body">
          <p>Satellite telecommunications: satellite TV, broadband internet (traditional geostationary and emerging LEO broadband), and satellite voice. The largest segment of the space economy — estimated at $130–150 billion annually. Dominated by established players (SES, Intelsat, Eutelsat) and increasingly by LEO broadband (SpaceX Starlink reached $7 billion ARR in 2024).</p>
          <p>Earth observation and geospatial analytics: commercial satellite imagery, synthetic aperture radar, hyperspectral sensing, and the analytics products derived from them. The fastest-growing segment in percentage terms — driven by demand from government intelligence, commercial agriculture, insurance, maritime, and urban planning sectors.</p>
          <p>Navigation and positioning services: GPS-dependent services (estimated at $100+ billion annually in derived value, though most is captured by device manufacturers and application developers rather than satellite operators).</p>
          <p>Space tourism and exploration: currently small in absolute revenue terms ($1–2 billion annually), but the segment with the highest growth projections and the most uncertainty in execution.</p>
        </div>
      </div>
    </div>

    <h2>What This Means for Spaceport Economics</h2>
    <p>The fundamental implication of this market structure for spaceport economics is that spaceports sit at the upstream-most point of a value chain in which the largest economic value is created downstream. The satellite broadband business generates billions of dollars per year in revenue — but the spaceport that facilitated the launch of those satellites earns launch fees that are a small fraction of that downstream value.</p>
    <p>This is not a failure of pricing; it reflects the fundamental economics of infrastructure. Airports earn runway landing fees, but the airline industry and the passenger economy it enables generate far more value than the airports themselves capture. Rail networks earn track access charges, but the goods and passenger transport they enable generates most of the economic value. Spaceports are infrastructure — their direct revenue capture will always be small relative to the value they enable.</p>
    <p>The investment case for spaceports, therefore, must be built on the full economic impact of the facility — including the downstream value it enables and the regional economic activity it catalyzes — rather than solely on the launch fees it collects. This is the analysis framework that state and regional governments apply when justifying spaceport infrastructure investment, and it is the framework that private investors must use to understand why a spaceport may have strategic value that exceeds its direct revenue potential.</p>

    <div class="callout callout-insight">
      <div class="callout-label">The $1 Trillion Milestone</div>
      <p>Multiple industry analyses (Morgan Stanley, Bank of America, the Space Foundation) project the total space economy reaching $1 trillion by 2030–2035, from approximately $570 billion in 2024. The growth is overwhelmingly in downstream segments — satellite services, Earth observation analytics, navigation — with upstream launch and manufacturing growing more slowly in proportional terms as launch costs decline. The executive implication: the total commercial space market is genuinely large and growing, but spaceport operators capture a small and diminishing percentage of it. Building a spaceport business case on "the space economy is growing" without specifying which part of the space economy the facility participates in — and at what margin — is analytically incomplete.</p>
    </div>
  </div>
  <div id="segNavFooter"></div>
</div>`;

CONTENT['s4-2'] = () => `
<div class="segment-content">
  <div class="seg-header">
    <div class="seg-header-eyebrow">
      <span class="seg-header-code">SEGMENT 4.2</span>
      <span class="seg-header-meta">14 min · ~1,750 words</span>
    </div>
    <h1 class="seg-header-title">Launch Market<br><em>Economics</em></h1>
    <p class="seg-header-subtitle">Cost structure. Pricing dynamics. The reusability revolution and what it did to the competitive landscape. The numbers that determine who wins and who exits.</p>
    <div class="seg-header-tags">
      <span class="tag-lo tag">LO4.2 — Understand</span>
      <span class="tag">Launch Pricing</span>
      <span class="tag">Cost Structure</span>
      <span class="tag">Market Competition</span>
    </div>
  </div>
  <div class="seg-body">
    <p>The economics of commercial launch changed more dramatically in the decade 2012–2022 than in the preceding four decades of commercial launch history. The primary driver was SpaceX's development of reusable first-stage boosters — a technical achievement whose economic consequences were as significant as its engineering ones.</p>

    <h2>The Pre-Reusability Launch Economics Baseline</h2>
    <p>Before the Falcon 9's first booster landing in December 2015, the commercial launch market had a relatively stable cost structure. Expendable launch vehicles — Ariane 5, Atlas V, Delta IV, the original Falcon 9 — were manufactured new for each flight. The cost structure reflected this: manufacturing costs dominated, and launch prices to GTO were typically $60–$120 million for medium-to-heavy lift vehicles.</p>
    <p>The cost breakdown for a typical expendable launch vehicle was approximately:</p>
    <ul>
      <li>First stage (engines, structure, guidance): 60–70% of vehicle cost</li>
      <li>Second stage and fairing: 20–25% of vehicle cost</li>
      <li>Launch operations, propellants, range costs: 10–15% of total launch cost</li>
    </ul>
    <p>The implication: most of the cost of a launch was in hardware that flew once and was discarded. The entire first stage — nine engines, the most complex and expensive element — fell into the ocean. The economics were structurally analogous to aviation in an era when commercial airlines burned a new jet engine on every flight.</p>

    <h2>The Reusability Revolution — The Numbers</h2>
    <p>Falcon 9 booster reuse changed the cost structure fundamentally. By 2024, SpaceX had flown individual boosters as many as 20+ times. The refurbishment cost for a Falcon 9 booster is not public, but industry analysis suggests it is roughly $3–5 million per reflight — versus a new first stage cost of $30–40 million. The math is straightforward: a booster reflown 10 times, with $4 million average refurbishment cost per flight, adds $40 million in manufacturing cost for 10 flights versus $300–400 million for ten new first stages. That's a savings of $260–360 million across a ten-flight booster life.</p>
    <p>The competitive consequence was a significant reduction in commercial launch prices. Falcon 9 to LEO pricing dropped from approximately $60 million per launch to $67 million per launch (2024 list price) — but that price includes the cost-efficiency gains from reuse. Newer commercial competitors (Rocket Lab's Electron, ABL Space Systems, Relativity Space, and others) have had to price against SpaceX's cost-efficient model rather than the pre-reusability baseline.</p>

    <div class="domain-grid">
      <div class="domain-card domain-launch">
        <div class="domain-label">SMALL LAUNCH MARKET</div>
        <div class="domain-title">Sub-1,000 kg to LEO</div>
        <div class="domain-body">
          <p>Rocket Lab Electron: ~$7–8M per launch. ABL Space RS1: ~$12M (before company difficulties). Virgin Orbit LauncherOne: ~$12–15M (pre-closure). Firefly Alpha: ~$15M. This market serves dedicated smallsat operators who need a specific orbit on their schedule — and are willing to pay a premium over rideshare pricing for that control. The commercial viability of small launchers is under pressure from SpaceX's Transporter rideshare program, which offers smallsat deployment at $5,750/kg to SSO.</p>
        </div>
      </div>
      <div class="domain-card domain-range">
        <div class="domain-label">MEDIUM/HEAVY LAUNCH MARKET</div>
        <div class="domain-title">1,000–20,000 kg to LEO</div>
        <div class="domain-body">
          <p>SpaceX Falcon 9: ~$67M to LEO, ~$97M to GTO. SpaceX Falcon Heavy: ~$97M to LEO. United Launch Alliance Vulcan: ~$110–150M estimated. Ariane 6: ~$115M to GTO. The medium/heavy market is dominated by SpaceX, with Falcon 9's combination of price, reliability, and cadence giving it a competitive position that has captured approximately 60–65% of global commercial launch market share as of 2024.</p>
        </div>
      </div>
      <div class="domain-card domain-gse">
        <div class="domain-label">SUPER-HEAVY MARKET</div>
        <div class="domain-title">20,000+ kg to LEO</div>
        <div class="domain-body">
          <p>SpaceX Starship (projected): target price below $10M per launch at scale — potentially sub-$1M at very high cadence with full reusability. If Starship achieves its projected cost structure, it will restructure the entire launch market: the economics of everything built on current launch pricing assumptions — satellite constellation deployment, space station resupply, planetary missions — will change materially. The trajectory of Starship's development is the single most consequential variable in commercial launch economics for 2025–2030.</p>
        </div>
      </div>
    </div>

    <h2>The Spaceport Implications of Launch Market Economics</h2>
    <p>Launch market price competition affects spaceports directly. As launch prices decline, the fees spaceports can charge as a percentage of total launch cost face downward pressure. A launch site fee of $1 million is a significant add-on when the launch costs $10 million; it is trivial when the launch costs $100 million. The reusability revolution that reduced launch prices also reduced the relative leverage of spaceport location advantages.</p>
    <div class="callout callout-insight">
      <div class="callout-label">The Spaceport Price-Taking Problem</div>
      <p>Spaceports are generally price-takers relative to launch operators. A launch operator with a technically capable, commercially competitive vehicle can choose among multiple licensed launch sites — and will negotiate the facility's fees against alternatives. A spaceport with a single operator has no pricing leverage. A spaceport with multiple operators competing for pad time has pricing leverage. This is one of the financial arguments for multi-user development: competitive tension among operators provides the facility with pricing power it does not have in a captive single-operator relationship.</p>
    </div>
  </div>
  <div id="segNavFooter"></div>
</div>`;

CONTENT['s4-3'] = () => `
<div class="segment-content">
  <div class="seg-header">
    <div class="seg-header-eyebrow">
      <span class="seg-header-code">SEGMENT 4.3</span>
      <span class="seg-header-meta">13 min · ~1,650 words</span>
    </div>
    <h1 class="seg-header-title">Spaceport Revenue<br><em>Architecture</em></h1>
    <p class="seg-header-subtitle">The full revenue picture — launch fees, tenant revenues, ancillary income, and public funding. What a viable model actually looks like versus what most business plans assume.</p>
    <div class="seg-header-tags">
      <span class="tag-lo tag">LO4.3 — Apply</span>
      <span class="tag">Revenue Streams</span>
      <span class="tag">Business Model</span>
      <span class="tag">Non-Launch Revenue</span>
    </div>
  </div>
  <div class="seg-body">
    <p>The revenue architecture of a commercial spaceport is more complex — and in healthy facilities, more diversified — than is typically captured in the promotional materials that accompany new spaceport development proposals. Understanding the full revenue picture is essential for anyone evaluating a spaceport as an investment, a partner, or a customer.</p>

    <h2>Revenue Stream 1 — Launch Services Fees</h2>
    <p>Launch services fees are the most visible component of spaceport revenue: the fees charged to launch operators for use of the launch pad, propellant systems, range safety services, and associated launch support. The structure varies by facility, but typically includes:</p>
    <ul>
      <li><strong>Pad use fees:</strong> charged per launch attempt, regardless of whether the attempt results in a launch. Include the cost of pad preparation, propellant system activation and deactivation, and facility cleanup.</li>
      <li><strong>Propellant supply fees:</strong> where the spaceport provides propellant logistics (LOX delivery, LN2, GN2, RP-1 or other propellants), marked up above cost.</li>
      <li><strong>Range safety fees:</strong> covering the cost of RSO staffing, flight safety systems operation, and range clearance activities.</li>
      <li><strong>Integration facility fees:</strong> for use of payload processing facilities, clean rooms, and integration equipment.</li>
    </ul>
    <p>The key characteristic of launch services fees: they are highly variable. They correlate directly with launch cadence — which is driven by the operator's vehicle, the operator's customer demand, and factors (weather, vehicle readiness, regulatory holds) outside the spaceport's control. A facility projected to host 12 launches per year that actually hosts 4 will have dramatically lower fee revenue with nearly the same fixed cost base. This variability is the primary financial risk driver for commercial spaceports.</p>

    <h2>Revenue Stream 2 — Tenant and Ecosystem Revenue</h2>
    <p>Tenant and ecosystem revenue is the most stable and highest-potential non-launch revenue category. This encompasses:</p>
    <ul>
      <li><strong>Long-term leases</strong> to aerospace companies, technology firms, defense contractors, and research institutions that co-locate at or near the spaceport facility.</li>
      <li><strong>Hangar and storage fees</strong> for aircraft, vehicles, and equipment used by tenants or visiting operators.</li>
      <li><strong>Research and development facilities</strong> leased to universities and research institutions conducting work adjacent to the launch environment.</li>
      <li><strong>Manufacturing space</strong> leased to companies producing components or systems for the aerospace industry.</li>
    </ul>
    <p>The model here is the aerospace industrial park or research park — using the spaceport's unique assets (the launch capability, the cleared airspace, the technical workforce concentration) to attract a commercial ecosystem that generates recurring, contractual revenue independent of specific launch cadence. This model has worked at Space Coast Florida (where the aerospace ecosystem around Cape Canaveral and KSC generates significant regional economic activity) and at the Colorado Front Range (where aerospace firms cluster around existing space industry infrastructure).</p>

    <h2>Revenue Stream 3 — Government and Public Funding</h2>
    <p>Most commercial spaceports — particularly those developed outside of the established U.S. government ranges — have received significant government investment: federal grants, state economic development funds, tax incentives, and direct state ownership of facilities. This funding is typically capital (building the facility) rather than operational (sustaining it), but in some cases includes operational subsidies.</p>
    <p>The key financial risk with government funding: it is not renewable commercial revenue. A facility that requires ongoing government subsidy to cover operating costs has not established a commercially viable operating model — it has established a government-dependent operating model. Government funding priorities change, state administrations change, and the political support for a commercial spaceport can shift in response to factors entirely unrelated to the facility's performance.</p>

    <div class="callout callout-warning">
      <div class="callout-label">The Sustainable Revenue Test</div>
      <p>A commercially viable spaceport revenue model should pass the following test: remove all non-recurring government capital grants and all ongoing government subsidies from the revenue picture, and ask whether the remaining revenue — launch fees at realistic cadence plus tenant revenue plus ancillary income — covers the facility's operating costs and debt service, with a margin. If the answer is no without government funding, the facility is not commercially viable — it is a government-subsidized infrastructure asset. There is nothing inherently wrong with that model (many airports, ports, and rail networks operate on it), but it must be clearly understood as what it is, and its financial sustainability depends on continued government commitment rather than commercial performance.</p>
    </div>
  </div>
  <div id="segNavFooter"></div>
</div>`;

CONTENT['s4-4'] = () => `
<div class="segment-content">
  <div class="seg-header">
    <div class="seg-header-eyebrow">
      <span class="seg-header-code">SEGMENT 4.4</span>
      <span class="seg-header-meta">12 min · ~1,500 words</span>
    </div>
    <h1 class="seg-header-title">Capital and<br><em>Investment</em></h1>
    <p class="seg-header-subtitle">How spaceports get built and funded. The capital requirements, the investment sources, the return expectations, and why the investment thesis for spaceport infrastructure is structurally different from most sectors.</p>
    <div class="seg-header-tags">
      <span class="tag-lo tag">LO4.4 — Apply</span>
      <span class="tag">Capital Structure</span>
      <span class="tag">Investment Thesis</span>
      <span class="tag">Public Funding</span>
    </div>
  </div>
  <div class="seg-body">
    <p>Spaceport infrastructure is capital-intensive, long-lived, and purpose-specific. These three characteristics define its investment profile — and explain why the capital sources for commercial spaceport development are different from most commercial infrastructure sectors.</p>

    <h2>Capital Requirements</h2>
    <p>The capital cost of a commercial spaceport varies enormously by scope, but useful reference points:</p>
    <div class="axis-grid">
      <div class="axis-card">
        <span class="axis-num">SCALE A</span>
        <div class="axis-title">Greenfield Commercial Spaceport</div>
        <div class="axis-body">A purpose-built commercial launch facility with a single pad, minimal integration facilities, and basic infrastructure: $100–300 million. Spaceport America in New Mexico cost approximately $220 million in public funds for its initial development (2008–2011). Spaceport Colorado's initial phases have been funded in the $50–100 million range with state and federal grants. These costs do not include operator-specific pad modifications, which are typically borne by the launch operator under a use agreement.</div>
      </div>
      <div class="axis-card">
        <span class="axis-num">SCALE B</span>
        <div class="axis-title">Full Commercial Hub</div>
        <div class="axis-body">A multi-user facility with multiple launch complexes, comprehensive integration facilities, full range safety infrastructure, tenant facilities, and supporting infrastructure: $500 million — $2+ billion. Cape Canaveral's infrastructure represents tens of billions in cumulative government investment. Boca Chica/Starbase represents billions in SpaceX private investment. No private commercial multi-user spaceport has yet been built to this scale without significant government funding.</div>
      </div>
      <div class="axis-card">
        <span class="axis-num">SCALE C</span>
        <div class="axis-title">Incremental Expansion</div>
        <div class="axis-body">Adding a launch complex to an existing facility with infrastructure: $30–80 million per additional pad complex. This is the most common investment decision for established spaceports — expanding capability based on demonstrated demand rather than building comprehensive infrastructure in anticipation of demand. The incremental model manages capital risk but limits the facility's ability to attract operators who need capabilities that don't yet exist.</div>
      </div>
    </div>

    <h2>Investment Sources</h2>
    <p>The investor landscape for commercial spaceport capital includes:</p>
    <ul>
      <li><strong>State and local governments:</strong> The primary capital source for most commercial spaceports in the U.S. and internationally. Motivated by economic development objectives — job creation, tax revenue, technology sector development — rather than direct financial return on the spaceport investment. This is appropriate: the investment thesis is economic development, not financial return.</li>
      <li><strong>Federal government:</strong> FAA's Commercial Space Transportation Infrastructure Development program, NASA's launch site modernization programs, and DoD range investment have all contributed to commercial spaceport infrastructure. Federal investment is generally directed toward specific capabilities (range safety upgrades, environmental review, technical facility improvements) rather than comprehensive facility development.</li>
      <li><strong>Launch operators:</strong> SpaceX's investment at Boca Chica, Rocket Lab's investment at Launch Complex 1 in New Zealand — operators with specific vehicle programs have been willing to invest in facilities they control. This is the single-user model applied at scale: the operator builds a facility optimized for their operations, bearing the capital cost in exchange for exclusive control.</li>
      <li><strong>Private equity and infrastructure funds:</strong> Very limited to date. The absence of demonstrated financial returns from commercial spaceport operations, combined with the high capex and low near-term cash yield, has made spaceports unattractive to financial investors. This may change as the market matures and as facilities with sustained commercial operations begin generating positive returns.</li>
    </ul>
    <div class="callout callout-insight">
      <div class="callout-label">The Infrastructure Fund Problem</div>
      <p>Infrastructure funds seek predictable, long-term cash flows — toll roads, airports, ports, pipelines. These assets generate revenue that is directly correlated with utilization, and utilization is driven by deeply embedded demand patterns that are highly predictable. Commercial spaceports do not currently have this profile: launch cadence is variable, customer concentration is high, and the long-term revenue trajectory depends on market development that has not yet occurred. Until commercial spaceports can demonstrate 10+ years of stable, diversified revenue at adequate coverage ratios, they are unlikely to attract institutional infrastructure capital at scale. The gap between the capital the sector needs and the capital that is commercially available on market terms is one of the persistent structural challenges of commercial spaceport development.</p>
    </div>
  </div>
  <div id="segNavFooter"></div>
</div>`;

CONTENT['s4-5'] = () => `
<div class="segment-content">
  <div class="seg-header">
    <div class="seg-header-eyebrow">
      <span class="seg-header-code">SEGMENT 4.5</span>
      <span class="seg-header-meta">10 min · ~1,300 words</span>
    </div>
    <h1 class="seg-header-title">The Anchor<br><em>Tenant Problem</em></h1>
    <p class="seg-header-subtitle">Why most commercial spaceports are structurally one contract away from financial crisis — and what the most resilient facilities do differently.</p>
    <div class="seg-header-tags">
      <span class="tag-lo tag">LO4.5 — Analyze</span>
      <span class="tag">Customer Concentration</span>
      <span class="tag">Strategic Dependency</span>
      <span class="tag">Risk Management</span>
    </div>
  </div>
  <div class="seg-body">
    <p>The anchor tenant problem is the defining financial risk of commercial spaceport development. Almost every commercial spaceport has it, few have solved it, and the ones that haven't are operating with a structural financial fragility that makes them vulnerable to disruptions they cannot control and may not even anticipate.</p>

    <h2>The Anatomy of Anchor Tenant Dependency</h2>
    <p>Anchor tenant dependency develops in a predictable sequence:</p>
    <ol>
      <li><strong>Facility development.</strong> A spaceport is built — usually with significant government investment — based on a demand projection that assumes multiple commercial operators will use the facility. The business plan shows revenue from three to five operators, diversified by vehicle type and mission profile.</li>
      <li><strong>Anchor tenant arrival.</strong> One operator arrives, commits to a long-term Launch Services Agreement, and provides the revenue that justifies continued facility investment. This operator becomes the anchor tenant: the customer without whom the facility cannot service its obligations.</li>
      <li><strong>Concentration solidifies.</strong> Additional operators either don't materialize at projected pace, or use the facility on terms that don't add meaningful revenue. The anchor tenant, as the primary revenue source, gains negotiating leverage — and uses it at contract renewal.</li>
      <li><strong>Dependency becomes structural.</strong> The facility's fixed costs — debt service, operations staffing, safety certification, maintenance — are sized to a revenue base that requires the anchor tenant to operate at projected cadence. Any reduction in the anchor's cadence creates an immediate cash flow problem.</li>
    </ol>

    <h2>Mitigation Strategies</h2>
    <div class="domain-grid">
      <div class="domain-card domain-launch">
        <div class="domain-label">STRATEGY 01</div>
        <div class="domain-title">Minimum Annual Guarantees</div>
        <div class="domain-body">Negotiate minimum annual payments (MAGs) into Launch Services Agreements — floor payments that the operator owes regardless of actual launch cadence. MAGs protect the facility from cadence variability while giving the operator flexibility in actual launch timing. The commercial negotiation challenge: operators resist MAGs because they create obligations in periods of delay or program transition. Spaceports with pricing leverage (few alternative launch sites) can secure MAGs; those without cannot.</div>
      </div>
      <div class="domain-card domain-range">
        <div class="domain-label">STRATEGY 02</div>
        <div class="domain-title">Revenue Diversification</div>
        <div class="domain-body">Actively develop tenant ecosystem revenue, R&D partnerships, training programs, and other non-launch revenue streams that provide a stable base independent of launch cadence. The goal is to reduce the percentage of total revenue tied to any single operator below 50% — ideally below 40%. This requires deliberate business development effort that many launch-focused facilities have not historically invested in.</div>
      </div>
      <div class="domain-card domain-gse">
        <div class="domain-label">STRATEGY 03</div>
        <div class="domain-title">Multi-Operator Development</div>
        <div class="domain-body">Invest proactively in attracting multiple operators — accepting lower short-term revenue from each in exchange for reduced concentration risk. This requires facility investment in capabilities that serve multiple vehicle types (not just the anchor's vehicle), active marketing to potential operators, and pricing structures that create commercial viability for operators at lower initial cadences. It is harder than deepening the anchor relationship — but it is the only structural solution to the concentration problem.</div>
      </div>
    </div>
    <div class="callout callout-warning">
      <div class="callout-label">The Spaceport America Warning</div>
      <p>Spaceport America's financial situation — examined in this module's case study — illustrates what happens when anchor tenant dependency is not managed. The facility was built for Virgin Galactic, which became its anchor tenant and its primary revenue source. When Virgin Galactic's commercial operations scaled more slowly than projected, the spaceport's revenues fell well below its operating cost structure. The facility required ongoing New Mexico state funding to remain operational. This is not a failure of the facility's management — it is the predictable consequence of a concentrated revenue structure that wasn't adequately protected by contract or offset by diversification. The lesson applies to every spaceport that currently has more than 60% of its revenue in a single customer relationship.</p>
    </div>
  </div>
  <div id="segNavFooter"></div>
</div>`;

CONTENT['s4-6'] = () => `
<div class="segment-content">
  <div class="seg-header">
    <div class="seg-header-eyebrow">
      <span class="seg-header-code">SEGMENT 4.6</span>
      <span class="seg-header-meta">11 min · ~1,400 words</span>
    </div>
    <h1 class="seg-header-title">Financial Performance<br><em>Metrics</em></h1>
    <p class="seg-header-subtitle">What good looks like. The metrics that matter for evaluating spaceport financial health — and the ones that are most commonly misused in investment presentations.</p>
    <div class="seg-header-tags">
      <span class="tag-lo tag">LO4.6 — Apply</span>
      <span class="tag">EBITDA</span>
      <span class="tag">Debt Coverage</span>
      <span class="tag">Financial Health Indicators</span>
    </div>
  </div>
  <div class="seg-body">
    <p>Evaluating a commercial spaceport's financial health requires a set of metrics appropriate for an infrastructure business with high fixed costs, variable revenue, and long asset life. The metrics commonly used for technology companies or retail businesses do not translate directly. What follows is the analytical framework that financial professionals use when evaluating spaceport operations.</p>

    <h2>The Core Metrics</h2>
    <div class="phase-block">
      <div class="phase-header"><span class="phase-num">METRIC 01</span><div class="phase-title">EBITDA and EBITDA Margin</div></div>
      <div class="phase-body">
        <p>EBITDA (Earnings Before Interest, Taxes, Depreciation, and Amortization) measures operating cash generation before the effects of financing structure, tax treatment, and accounting for capital asset consumption. For infrastructure businesses — where debt levels, depreciation schedules, and tax treatment vary significantly — EBITDA is the most comparable measure of operational performance.</p>
        <p><strong>EBITDA margin</strong> (EBITDA as a percentage of revenue) is the operational efficiency metric. A mature, commercially healthy spaceport should target EBITDA margins of 25–40%. Facilities below 20% are likely not covering their cost of capital; facilities above 40% are likely under-investing in maintenance or workforce.</p>
      </div>
    </div>
    <div class="phase-block">
      <div class="phase-header"><span class="phase-num">METRIC 02</span><div class="phase-title">Debt Service Coverage Ratio (DSCR)</div></div>
      <div class="phase-body">
        <p>DSCR measures the facility's ability to service its debt obligations from operating cash flow: DSCR = EBITDA / (annual principal + interest payments). A DSCR below 1.0 means the facility cannot service its debt from operations — it is either drawing down reserves, requiring equity injection, or relying on government subsidy. Lenders and rating agencies typically require DSCRs of 1.2–1.5 for infrastructure debt; government bonds issued for spaceport development typically model similar coverage requirements.</p>
      </div>
    </div>
    <div class="phase-block">
      <div class="phase-header"><span class="phase-num">METRIC 03</span><div class="phase-title">Revenue Concentration Ratio</div></div>
      <div class="phase-body">
        <p>The percentage of total revenue attributable to the largest single customer. This is the quantified expression of anchor tenant risk. A revenue concentration above 60% in a single customer is a significant concentration risk; above 80%, it is effectively a single-customer business with no meaningful diversification. Spaceport boards and government sponsors should monitor this metric and set explicit targets for diversification.</p>
      </div>
    </div>
    <div class="phase-block">
      <div class="phase-header"><span class="phase-num">METRIC 04</span><div class="phase-title">Cost per Launch</div></div>
      <div class="phase-body">
        <p>Total facility operating cost divided by number of launches in the period. This metric captures the facility's efficiency in converting its cost structure into launch operations. A facility that costs $30 million per year to operate and conducts 6 launches has a cost of $5 million per launch — meaning it must charge at least $5 million per launch to cover operating costs alone, before debt service or capital reserve. At higher cadence (12 launches), the cost per launch halves to $2.5 million. This is the fundamental economic argument for launch cadence: higher cadence spreads fixed costs over more revenue events.</p>
      </div>
    </div>
    <div class="callout callout-insight">
      <div class="callout-label">The Metrics Most Commonly Misused</div>
      <p>In investment presentations and government funding applications for commercial spaceports, two metrics are consistently misused: <strong>total economic impact</strong> (the multiplier-inflated estimate of regional economic activity attributed to the facility) and <strong>cumulative jobs supported</strong> (a count that typically includes indirect and induced employment across the regional economy). These metrics are legitimate for economic development analysis, but they are not spaceport operating metrics. They cannot service debt, pay operations staff, or fund maintenance. An investment presentation that leads with $2 billion in regional economic impact and buries the facility's direct EBITDA (which may be negative) is structuring the analysis to obscure the commercial viability question rather than answer it.</p>
    </div>
  </div>
  <div id="segNavFooter"></div>
</div>`;

CONTENT['s4-7'] = () => `
<div class="segment-content">
  <div class="seg-header">
    <div class="seg-header-eyebrow">
      <span class="seg-header-code">SEGMENT 4.7</span>
      <span class="seg-header-meta">11 min · ~1,400 words</span>
    </div>
    <h1 class="seg-header-title">The 2030<br><em>Business Case</em></h1>
    <p class="seg-header-subtitle">Market projections, investment outlook, and the key variables that will determine whether commercial spaceports reach commercial viability at scale over the next five years.</p>
    <div class="seg-header-tags">
      <span class="tag-lo tag">LO4.7 — Evaluate</span>
      <span class="tag">Market Projections</span>
      <span class="tag">Investment Outlook</span>
      <span class="tag">Scenario Planning</span>
    </div>
  </div>
  <div class="seg-body">
    <p>The commercial spaceport business case has two versions. Version one: the rapidly growing commercial space market creates sustained demand for launch services, enabling facilities to achieve commercial viability on a 10–15 year horizon. Version two: demand growth is slower than projected, launch cost reductions compress fee revenues, and most commercial spaceports remain government-dependent for the foreseeable future. The difference between these scenarios is not primarily technological — it is commercial.</p>

    <h2>The Demand Growth Scenario</h2>
    <p>The bull case for commercial spaceports rests on three demand drivers:</p>
    <ul>
      <li><strong>Constellation deployment and replacement cycles.</strong> SpaceX's Starlink and Amazon's Kuiper require sustained high-cadence launch operations for initial deployment and ongoing replacement of satellites with 5-year design lives. The replacement demand alone — 1,200+ Starlink satellites per year at current constellation size — creates a structural launch demand floor independent of new market development.</li>
      <li><strong>Government launch market growth.</strong> DoD, NASA, and international government agencies are expanding their commercial launch procurement. Space Force alone has shifted dramatically toward commercial launch for NSSL (National Security Space Launch) missions, creating contracted revenue streams for launch operators and associated spaceport activity.</li>
      <li><strong>New commercial applications.</strong> Earth observation at high revisit rates, in-space manufacturing, commercial space stations, point-to-point transportation — each creates incremental launch demand if and when commercial viability is demonstrated.</li>
    </ul>

    <h2>The Key Variables — What Must Go Right</h2>
    <div class="axis-grid">
      <div class="axis-card">
        <span class="axis-num">VARIABLE 01</span>
        <div class="axis-title">Starship Cost Trajectory</div>
        <div class="axis-body">If Starship achieves target costs of $10M per launch (or lower at scale), it will enable business models that are currently economically marginal — space-based solar power, asteroid mining, large space stations. It will also make some existing launch market segments uncompetitive and some existing launch infrastructure over-built for the new cost environment. Spaceports that are dependent on medium-lift launch economics (Falcon 9 pricing) will face structural revenue pressure if Starship captures significant medium-lift market share.</div>
      </div>
      <div class="axis-card">
        <span class="axis-num">VARIABLE 02</span>
        <div class="axis-title">LEO Broadband Adoption</div>
        <div class="axis-body">Starlink's financial performance is the most important data point in the entire commercial space business case. If LEO broadband achieves sustained profitability at scale, it validates the demand projections for high-cadence launch and creates the financial model that can justify continued Starship development and further constellation expansion. If LEO broadband adoption plateaus below the projections embedded in the business case, the downstream demand for launch services will be materially lower than projected.</div>
      </div>
    </div>

    <h2>Scenario Planning for Spaceport Investment Decisions</h2>
    <p>Given the uncertainty in the 2030 commercial space market trajectory, responsible financial planning for commercial spaceport investment requires scenario analysis rather than point estimates:</p>
    <ul>
      <li><strong>Optimistic scenario:</strong> Demand growth at or above current projections, Starship achieves commercial operations by 2027, LEO broadband achieves 5M+ paying subscribers, NSSL launch cadence increases 20% by 2028. Under this scenario, facilities with capacity and operational capability could achieve commercial viability by 2028–2030.</li>
      <li><strong>Base scenario:</strong> Demand growth at roughly current trajectory, Starship enters commercial service in 2027–2028 at limited initial cadence, LEO broadband growth continues but slower than projected. Commercial spaceport viability achievable for well-positioned facilities by 2030–2032.</li>
      <li><strong>Conservative scenario:</strong> Multiple launch vehicle development setbacks, LEO broadband adoption below projections, government budget constraints reducing NSSL procurement. Commercial spaceport viability for most non-SpaceX/non-government facilities delayed to post-2035.</li>
    </ul>
    <div class="callout callout-warning">
      <div class="callout-label">The Investment Decision Framework</div>
      <p>For any spaceport capital investment decision — whether a state government's $200M facility development, a private operator's $50M pad complex addition, or a tenant's long-term lease commitment — the disciplined approach is to test the business case against the conservative scenario. If the investment is viable under conservative demand assumptions, proceed with confidence. If it requires the optimistic scenario, structure the commitment to preserve optionality — phased investment, shorter lease terms, contractual break options — so that a conservative outcome does not produce an irreversible loss.</p>
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
    <h1 class="seg-header-title">Spaceport America:<br>The <em>Revenue Gap</em><br>Problem</h1>
    <p class="seg-header-subtitle">A $220 million public investment. A world-class facility. One major tenant. And the financial gap that became the defining challenge of the world's first purpose-built commercial spaceport.</p>
    <div class="seg-header-tags">
      <span class="tag-lo tag">LO4.3 · LO4.5 · LO4.6 — Evaluate</span>
      <span class="tag">Case Study</span>
      <span class="tag">Spaceport America</span>
      <span class="tag">Revenue Model</span>
    </div>
  </div>
  <div class="seg-body">
    <div class="callout callout-insight">
      <div class="callout-label">How to Use This Case</div>
      <p>Spaceport America is not a failure story — it is a valuable case in commercial spaceport development strategy. It illustrates what happens when excellent infrastructure meets a revenue model that depends on customer cadence that hasn't materialized at projections. Work through the analysis questions before reviewing discussion notes.</p>
    </div>

    <h2>Part I — The Facility</h2>
    <p>Spaceport America, located in the New Mexico desert approximately 45 miles north of Las Cruces, is the world's first purpose-built commercial spaceport. Designed by renowned architect Norman Foster and Partners, it features a 12,000-foot Runway and Gateway to Space terminal, a launch complex for vertical launch operations, and supporting infrastructure built to serve multiple commercial operators.</p>
    <p>The State of New Mexico invested approximately $220 million in public funds for the initial development, completed in 2011. The design philosophy was ambitious: a world-class facility that would attract the leading commercial space operators and establish New Mexico as a hub of the commercial space industry. The facility is managed by the New Mexico Spaceport Authority (NMSA), a state government entity.</p>

    <h2>Part II — The Virgin Galactic Relationship</h2>
    <p>From the outset, Spaceport America's development was closely tied to Virgin Galactic's commercial spaceflight program. Virgin Galactic was the anchor tenant — and effectively the primary design customer — for the facility. The Gateway to Space terminal was designed specifically for Virgin Galactic's VSS Unity (and later VSS Eve) operations. Virgin Galactic signed a 20-year lease agreement with the NMSA.</p>
    <p>The business model assumed Virgin Galactic would commence regular commercial spaceflights from Spaceport America, generating sustained facility revenue from: lease payments, launch fees per flight, propellant and logistics fees, and the tourism and visitor economy generated by commercial spaceflight operations at the facility. The commercial space tourism business — at the price point Virgin Galactic was targeting ($250,000–$450,000 per seat) — was projected to be a significant and growing revenue stream for both Virgin Galactic and the facility.</p>

    <h2>Part III — The Gap</h2>
    <p>Virgin Galactic's commercial operations scaled significantly more slowly than projected. The VSS Enterprise fatal accident in 2014 set the program back by years. The VSS Unity achieved commercial flights beginning in 2019, but at very low cadence — a handful of flights per year rather than the multiple-flights-per-month cadence that the business model assumed. Through 2023, Virgin Galactic had conducted commercial spaceflights, but at a cadence that generated a small fraction of the projected revenue.</p>
    <p>The financial consequence for Spaceport America was predictable: facility operating costs (staff, maintenance, utilities, debt service on NMSA bonds) continued at the level required to maintain a world-class facility, while revenue — primarily from Virgin Galactic's lease and limited launch fees — was a fraction of projections. The NMSA required ongoing New Mexico state government funding to cover the gap between facility revenues and operating costs.</p>
    <p>Spaceport America has continued to attract other tenants and operators: Virgin Orbit (before its closure), EXOS Aerospace, SXSW shoots and media events, and various other commercial activities. But the non-Virgin Galactic revenue has not been sufficient to close the operating gap.</p>

    <h2>Part IV — The Structural Problem</h2>
    <p>The financial challenge at Spaceport America is not the result of operational failures by NMSA management — the facility is genuinely well-managed and is regarded as one of the most advanced commercial spaceport facilities in the world. The structural problem is the revenue model: a $220 million facility designed for a commercial space tourism cadence that has not yet materialized, with a cost structure that is fixed at "world-class facility" scale regardless of launch cadence.</p>
    <p>Three structural issues are identifiable in retrospect:</p>
    <ol>
      <li><strong>Demand timing risk.</strong> The commercial space tourism market — specifically the price point and cadence that Virgin Galactic was targeting — was a bet on a market that had not been proven when the investment was made. The $220 million capital commitment preceded commercial validation by more than a decade.</li>
      <li><strong>Concentration without contractual protection.</strong> The facility was effectively designed for a single tenant. The NMSA did not have, or did not enforce, minimum annual revenue guarantees that would have protected the facility's operating budget from Virgin Galactic's slower-than-projected commercial ramp.</li>
      <li><strong>Operating cost structure mismatch.</strong> The facility was built to "world-class" standards — which is appropriate for the facility's long-term commercial aspirations, but creates a fixed cost structure that requires significant, sustained commercial revenue to sustain. A less ambitious facility (or a phased facility development approach) would have been more defensible against demand uncertainty.</li>
    </ol>

    <div class="callout callout-warning">
      <div class="callout-label">Analysis Questions</div>
      <div class="analysis-questions">
        <div class="aq-item">
          <div class="aq-num">Q1</div>
          <p>The New Mexico state government made a $220 million investment in Spaceport America before commercial space tourism was commercially validated. Was this a reasonable public investment decision at the time — and what additional information or contractual structures would have made it more defensible?</p>
        </div>
        <div class="aq-item">
          <div class="aq-num">Q2</div>
          <p>NMSA's financial challenge is primarily driven by the gap between a world-class facility's fixed operating costs and the actual revenue generated by current launch cadence. What strategic options does NMSA have for closing that gap — and which would you recommend?</p>
        </div>
        <div class="aq-item">
          <div class="aq-num">Q3</div>
          <p>Virgin Galactic signed a 20-year lease with the NMSA. What contractual provisions should the NMSA have negotiated in that agreement to protect the facility's financial position against the scenario that actually played out?</p>
        </div>
        <div class="aq-item">
          <div class="aq-num">Q4</div>
          <p>A new state government in New Mexico is reviewing the NMSA's annual operating budget request, which requires a state subsidy to cover the gap between revenues and costs. The governor's office asks: should we continue to fund this facility, and at what level? What analytical framework would you apply to answer that question?</p>
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
    <h1 class="seg-header-title">Module 4<br><em>Knowledge Check</em></h1>
    <p class="seg-header-subtitle">Apply what you've learned about launch market economics, spaceport revenue models, and financial performance analysis.</p>
    <div class="seg-header-tags">
      <span class="tag">LO4.1 · LO4.2 · LO4.3 · LO4.4 · LO4.5 · LO4.6</span>
      <span class="tag">Assessment</span>
    </div>
  </div>
  <div class="seg-body" id="quizContainer"></div>
</div>`;
