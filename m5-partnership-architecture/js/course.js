// Course App — ISU–GSA Spaceport Leadership Series
// Module 5 — The Partnership Architecture: Government Relations, Contracts & Stakeholders

const CourseApp = (function() {

  const STATE_KEY = 'isu_gsa_m5_progress';

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
    { id: 's5-1',   code: '5.1',   name: 'The Structural Dependencies',                dur: '11 min', group: 'Module 5 — The Partnership Architecture' },
    { id: 's5-2',   code: '5.2',   name: 'Government as Strategic Partner',            dur: '13 min', group: 'Module 5 — The Partnership Architecture' },
    { id: 's5-3',   code: '5.3',   name: 'The Launch Operator Relationship',           dur: '14 min', group: 'Module 5 — The Partnership Architecture' },
    { id: 's5-4',   code: '5.4',   name: 'Community & Environmental Stakeholders',     dur: '11 min', group: 'Module 5 — The Partnership Architecture' },
    { id: 's5-5',   code: '5.5',   name: 'International Partnership Frameworks',       dur: '12 min', group: 'Module 5 — The Partnership Architecture' },
    { id: 's5-6',   code: '5.6',   name: 'Contract Architecture',                      dur: '13 min', group: 'Module 5 — The Partnership Architecture' },
    { id: 's5-7',   code: '5.7',   name: 'Partnership Failure Modes',                  dur: '10 min', group: 'Module 5 — The Partnership Architecture' },
    { id: 'case',   code: 'CASE',  name: 'Case Study — Vandenberg SFB',               dur: '20 min', group: 'Case Study' },
    { id: 'check',  code: 'CHECK', name: 'Module Knowledge Check',                     dur: '10 min', group: 'Assessment' },
  ];

  const QUIZ = [
    {
      id: 'q1',
      lo: 'LO5.1',
      text: 'A commercial spaceport\'s operations depend on multiple parties whose authority and interests overlap. Which of the following best describes the primary governance challenge this creates?',
      options: [
        { id: 'a', text: 'Difficulty obtaining a single FAA launch license that covers all parties.' },
        { id: 'b', text: 'Conflicting state and federal regulatory requirements that cannot both be satisfied simultaneously.' },
        { id: 'c', text: 'No single party has authority over all the variables that determine operational success — requiring coordination mechanisms that substitute for unified command.' },
        { id: 'd', text: 'The launch operator and the spaceport operator have incompatible safety cultures.' },
      ],
      correct: 'c',
      rationale: 'Correct. The fundamental governance challenge in multi-party spaceport operations is the absence of unified command. The spaceport operator controls the facility but not the launch vehicle. The launch operator controls the vehicle but not the range. The FAA controls licensing but does not conduct operations. DoD range safety controls the range safety function but not commercial operations decisions. Each party has authority over a portion of the operational envelope, and success requires all parties to perform well simultaneously. No single party can unilaterally ensure a successful outcome — coordination mechanisms (contractual interfaces, safety review committees, integrated operations plans) substitute for the unified command authority that does not exist.',
    },
    {
      id: 'q2',
      lo: 'LO5.2',
      text: 'A commercial spaceport operator is negotiating a cooperative agreement with the U.S. Air Force to access range safety infrastructure at a nearby DoD range. The Air Force offers favorable terms but requires the commercial operator to accept Department of Defense operational priorities — meaning commercial launches can be preempted by DoD requirements with 72-hour notice. What is the primary strategic consideration for the commercial operator?',
      options: [
        { id: 'a', text: 'Whether 72-hour preemption notice is contractually compliant with the operator\'s Launch Services Agreements with customers, and whether the operational risk of preemption is acceptable relative to the cost benefit of accessing DoD range infrastructure.' },
        { id: 'b', text: 'Whether the FAA\'s launch license terms are compatible with DoD preemption authority.' },
        { id: 'c', text: 'Whether DoD operational priorities will compromise the facility\'s commercial brand.' },
        { id: 'd', text: 'Whether DoD partnership will disqualify the operator from non-governmental commercial customers.' },
      ],
      correct: 'a',
      rationale: 'Correct. The primary strategic consideration is operational reliability as experienced by the operator\'s commercial customers. Most commercial launch customers — satellite operators, commercial payload owners — have their own contractual and programmatic obligations that depend on launch schedule predictability. If the spaceport\'s launch window can be preempted by DoD priorities with 72 hours notice, the operator must either: (a) accept this risk and disclose it contractually to customers, (b) renegotiate customer Launch Services Agreements to include force majeure provisions covering DoD preemption, or (c) seek a DoD agreement with longer notice periods or commercial priority windows. The cost-benefit calculation is real — DoD range infrastructure access can be highly valuable — but the operational risk must be fully characterized.',
    },
    {
      id: 'q3',
      lo: 'LO5.3',
      text: 'A launch operator is negotiating a Launch Services Agreement with a commercial spaceport. The operator wants a 10-year exclusive use agreement for the primary launch pad. The spaceport, seeking revenue diversification, wants a 5-year non-exclusive agreement with options for additional operators. What is the correct analytical framework for the spaceport to apply?',
      options: [
        { id: 'a', text: 'The spaceport should always prefer the longer agreement because contractual stability is the highest-value outcome.' },
        { id: 'b', text: 'The spaceport must weigh the revenue certainty of a long-term exclusive agreement against the strategic risk of customer concentration — applying the anchor tenant analysis to determine whether the financial guarantee in the exclusive agreement adequately compensates for the loss of diversification optionality.' },
        { id: 'c', text: 'The spaceport should always prefer non-exclusive agreements because competition among operators is the market signal that justifies spaceport investment.' },
        { id: 'd', text: 'The FAA will not license a commercial spaceport with an exclusive use agreement because it restricts fair access to licensed facilities.' },
      ],
      correct: 'b',
      rationale: 'Correct. This is the anchor tenant analysis applied to the contractual negotiation. The key analytical question is: does the financial guarantee embedded in the 10-year exclusive agreement — the minimum annual payments, the volume commitments, the pad maintenance obligations — adequately compensate for what the spaceport gives up by accepting exclusivity? Exclusivity forecloses the ability to attract additional operators during the agreement period, creating concentration risk that persists for a decade. If the exclusive agreement includes robust minimum payment obligations that cover the facility\'s fixed costs regardless of actual cadence, the concentration risk is substantially mitigated. If the exclusive agreement is based primarily on per-launch fees without minimums, the spaceport is accepting all the concentration risk without adequate financial protection.',
    },
    {
      id: 'q4',
      lo: 'LO5.4',
      text: 'A commercial spaceport development in a coastal state faces organized opposition from an environmental advocacy group and a commercial fishing association over the EIS process. The opposition is not legally blocking the project — EIS requirements are being met — but is generating significant negative media coverage and local political attention. What is the most effective management strategy?',
      options: [
        { id: 'a', text: 'Maintain regulatory compliance and do not engage with the opposition, since the legal process does not require their consent.' },
        { id: 'b', text: 'Request that state government pressure the opposition to withdraw their objections in exchange for economic development commitments in their communities.' },
        { id: 'c', text: 'Commission competing scientific studies to rebut the environmental advocates\' claims in the public record.' },
        { id: 'd', text: 'Engage the opposition directly through a structured stakeholder process: understand their specific concerns, identify shared interests, and develop operational commitments (launch schedule coordination, monitoring programs, impact mitigation measures) that address their primary concerns without compromising commercial operations.' },
      ],
      correct: 'd',
      rationale: 'Correct. Regulatory compliance satisfies the legal minimum, but it does not resolve community opposition — and unresolved community opposition creates persistent risks: legislative action, litigation by advocacy groups challenging EIS adequacy, local media coverage affecting political support for state facility investment, and the operational friction of a community relationship characterized by adversarial dynamics rather than mutual benefit. The most effective strategy is direct, structured engagement: convening the stakeholders, conducting facilitated listening sessions to understand specific concerns (acoustic impacts? Marine debris protocols? Overflight coordination?), and developing operational commitments that demonstrate genuine response. Fishing associations, in particular, have legitimate operational concerns about launch windows and safety exclusion zones that can often be addressed through scheduling coordination rather than through conflict.',
    },
    {
      id: 'q5',
      lo: 'LO5.5',
      text: 'A U.S.-licensed commercial launch operator wants to launch satellites for a foreign government customer from a U.S. commercial spaceport. The satellite payload includes components manufactured in a country with which the U.S. has no Technology Safeguards Agreement. What is the primary legal framework that governs this transaction?',
      options: [
        { id: 'a', text: 'The FAA\'s launch license, which covers all aspects of the commercial launch activity.' },
        { id: 'b', text: 'The Outer Space Treaty, which governs all space activities of States Parties regardless of whether the activity is governmental or commercial.' },
        { id: 'c', text: 'The International Traffic in Arms Regulations (ITAR) and Export Administration Regulations (EAR), which control the export of defense-related technology and govern what foreign-manufactured components can be integrated at a U.S. licensed facility.' },
        { id: 'd', text: 'The bilateral trade agreement between the U.S. and the country where the satellite was manufactured.' },
      ],
      correct: 'c',
      rationale: 'Correct. ITAR and EAR are the controlling legal frameworks for foreign payload components at U.S. launch facilities. The FAA launch license does not authorize the export-controlled technology aspects of the transaction — it licenses the launch activity. ITAR (administered by the State Department) controls munitions and defense-related technology; EAR (administered by Commerce) controls dual-use technology. Satellite components — particularly propulsion systems, guidance electronics, and encryption hardware — frequently fall under ITAR. Without a Technology Safeguards Agreement (TSA) with the manufacturing country, specific export licenses or technology transfer authorizations may be required, or certain component integration activities may need to occur outside the U.S. An operator proceeding with a foreign payload launch without understanding the ITAR/EAR implications faces significant legal exposure.',
    },
    {
      id: 'q6',
      lo: 'LO5.6',
      text: 'A spaceport\'s Launch Services Agreement includes a force majeure clause that excuses performance for "acts of God, war, government actions, and other causes beyond the reasonable control of the party." A launch operator claims force majeure protection for a launch delay caused by a failure of their own launch vehicle during a static fire test. Is this a valid force majeure claim?',
      options: [
        { id: 'a', text: 'No — a launch vehicle failure in a static fire test is within the operator\'s operational control and is a foreseeable risk of the launch business, not an external cause beyond reasonable control.' },
        { id: 'b', text: 'Yes — a launch vehicle failure is beyond the operator\'s control because it is a complex technical system failure.' },
        { id: 'c', text: 'It depends on whether the vehicle was manufactured in-house or procured from a third party.' },
        { id: 'd', text: 'Yes — if the failure was caused by a manufacturing defect in a component sourced from a third party supplier.' },
      ],
      correct: 'a',
      rationale: 'Correct. Force majeure clauses protect parties from external events beyond their reasonable control — weather, natural disasters, government-imposed launch holds, and similar circumstances that neither party can anticipate or control. A launch vehicle failure is a foreseeable risk of the launch business — the operator knows that test failures are possible, builds test margins into their development schedule, and carries insurance to cover this risk. It is within the operator\'s operational responsibility sphere. Well-drafted spaceport LSAs explicitly distinguish force majeure (external cause, beyond control) from operator performance failures (internal cause, within control) and provide different remedies for each: force majeure typically results in delayed performance without penalty; operator performance failures result in delay damages, cure periods, and ultimately termination rights.',
    },
    {
      id: 'q7',
      lo: 'LO5.7',
      text: 'During a monthly operations review, your Launch Site Safety Manager mentions that the propellant transfer team has been skipping the post-fill pressure verification step for the past six campaigns because the system "always reads nominal" and the step adds 45 minutes to the pad cycle. No anomalies have occurred. What is the correct response — and why is it urgent?',
      options: [
        { id: 'a', text: 'Accept the informal change and document it as a temporary operational variance pending formal procedure review.' },
        { id: 'b', text: 'Restore the certified procedure immediately, treat this as a safety culture finding requiring root cause analysis, and conduct an audit of other procedures for similar undocumented deviations.' },
        { id: 'c', text: 'Schedule a formal procedure review to evaluate whether the step can be permanently removed given the consistent nominal readings.' },
        { id: 'd', text: 'Normalization of deviance — the gradual acceptance of anomalies and deviations from procedure as normal, without escalation, because previous deviations did not result in adverse outcomes.' },
      ],
      correct: 'd',
      rationale: 'Correct. This scenario is a textbook normalization of deviance event. Six consecutive campaigns without a deviation have created an informal consensus that the procedure step is unnecessary — but the certified procedure exists because a failure of that step could be catastrophic, not because it is expected to fail frequently. The absence of past adverse outcomes is not evidence that the step is unnecessary; it is evidence that the failure mode it guards against is low-probability but not zero. The urgency is organizational: the moment a safety step is informally skipped becomes the moment the safety culture begins to accept that certified procedures are optional when they are inconvenient. The correct response is to restore the procedure immediately, not review whether it should be removed — that review is a separate process that requires engineering justification, not operational convenience as its basis.',
    },
    {
      id: 'q8',
      lo: 'LO5.2',
      text: 'Vandenberg Space Force Base provides range safety services to both DoD launch missions and commercial launch operators. Which statement most accurately describes the strategic benefit of this military-commercial coexistence model for commercial operators?',
      options: [
        { id: 'a', text: 'Commercial operators get free range safety services funded by DoD taxpayers.' },
        { id: 'b', text: 'Commercial operators benefit from world-class, continuously operated range safety infrastructure that would be economically unviable for any single commercial operator to develop and maintain independently.' },
        { id: 'c', text: 'Commercial operators get priority launch windows because DoD prefers to support domestic commercial industry.' },
        { id: 'd', text: 'Commercial operators get expedited FAA licensing because DoD safety certification satisfies FAA requirements.' },
      ],
      correct: 'b',
      rationale: 'Correct. The core strategic benefit of the Vandenberg model is access to world-class infrastructure that is economically prohibitive to develop independently. Range safety systems — tracking radars, telemetry systems, Flight Safety System infrastructure, experienced RSO workforce — represent hundreds of millions of dollars in capital investment maintained at continuous operational readiness by DoD. A commercial launch operator accessing this infrastructure under a reimbursable agreement pays for operational cost at the margin, not capital replacement cost. This dramatically reduces the barrier to commercial launch operations from a polar orbit site and is why Vandenberg/Vandenberg SFB is disproportionately important to the commercial launch market relative to its geographic location.',
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
    container.innerHTML = `<div class="knowledge-check"><div class="kc-header"><div class="kc-icon">◈</div><div><div class="kc-title">Module 5 Knowledge Check</div><div class="kc-subtitle">8 questions · 70% to proceed · Immediate feedback</div></div></div>${html}<div class="kc-submit">${scoreHtml}${!state.quizSubmitted ? `<button class="btn-primary" onclick="CourseApp.submitQuiz()">Submit answers</button>` : `<button class="btn-secondary" onclick="CourseApp.resetQuiz()">Retake quiz</button><button class="seg-nav-btn next" onclick="CourseApp.completeModule()" style="margin-left:auto">Complete module →</button>`}</div></div>`;
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
      <h1 style="font-family:var(--font-display); font-size:3rem; font-weight:300; margin-bottom:1rem; color:var(--white);">The Partnership Architecture</h1>
      <p style="color:var(--slate-light); font-size:1rem; max-width:50ch; margin:0 auto 2rem; line-height:1.75;">You've completed Module 5 of the ISU–GSA Global Spaceport Leadership Series. Your knowledge check score: <strong style="color:var(--gold)">${score}/8 (${pct}%)</strong>.</p>
      <div style="display:flex; justify-content:center; gap:1rem; flex-wrap:wrap; margin-bottom:3rem;">
        <div style="background:var(--surface-2); border:1px solid var(--surface-3); border-radius:12px; padding:1.25rem 2rem; text-align:center;"><div style="font-family:var(--font-display); font-size:2rem; color:var(--gold); font-weight:300;">${pct}%</div><div style="font-size:0.72rem; text-transform:uppercase; letter-spacing:0.1em; color:var(--slate);">Knowledge check</div></div>
        <div style="background:var(--surface-2); border:1px solid var(--surface-3); border-radius:12px; padding:1.25rem 2rem; text-align:center;"><div style="font-family:var(--font-display); font-size:2rem; color:var(--gold); font-weight:300;">${completedCount()}</div><div style="font-size:0.72rem; text-transform:uppercase; letter-spacing:0.1em; color:var(--slate);">Segments completed</div></div>
      </div>
      <div style="background:var(--surface); border:1px solid rgba(201,168,76,0.2); border-radius:16px; padding:2rem; max-width:560px; margin:0 auto 2rem;">
        <div style="font-size:0.65rem; letter-spacing:0.14em; text-transform:uppercase; color:var(--gold); margin-bottom:0.75rem;">Final module</div>
        <div style="font-family:var(--font-display); font-size:1.4rem; color:var(--white); margin-bottom:0.5rem;">Module 6 — The Strategic Leader</div>
        <div style="font-size:0.85rem; color:var(--slate-light);">Decision Frameworks · Leadership · Synthesis · ~2.5 hours</div>
      </div>
      <a href="../m6-strategic-leader/index.html" class="btn-primary" style="margin-right:1rem;">Go to Module 6 →</a>
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
    <h1 class="seg-header-title">No Spaceport<br>Operates<br><em>Alone</em></h1>
    <p class="seg-header-subtitle">Module 5 shifts from financial architecture to relational architecture. Every spaceport that succeeds does so within a web of formal and informal partnerships. Understanding how to build and sustain those relationships is a core leadership competency.</p>
    <div class="seg-header-tags">
      <span class="tag">ISU × GSA</span>
      <span class="tag">Module 5 of 6</span>
      <span class="tag">Executive Certificate</span>
    </div>
  </div>
  <div class="seg-body">
    <div class="callout callout-insight">
      <div class="callout-label">Continuing from Module 4</div>
      <p>Module 4 built the financial architecture: the market context, the revenue models, the investment structures, and the metrics. Module 5 builds the relational architecture: the formal and informal partnerships — with government, with launch operators, with communities, with international partners — that are as essential to spaceport success as any balance sheet metric. Commercial space is fundamentally a multi-party enterprise, and the quality of the relationships is often what determines whether the financial model has a chance to succeed.</p>
    </div>
    <h2>From George Nield — Global Spaceport Alliance</h2>
    <p>What I observed in my years at the FAA was that the facilities that consistently operated well — in safety, in regulatory compliance, in commercial performance — were the ones with the best relationships. Not just with us at the FAA, though that mattered. With their operators. With the Air Force. With their communities. With their state governments. They invested in those relationships before they needed them. When something went wrong — and in this industry, something always eventually goes wrong — they had reserves of trust and goodwill to draw on. The facilities that didn't invest in relationships found that when they needed help, there wasn't much available.</p>
    <div class="pull-quote">
      <div class="pull-quote-text">"The facilities that succeed are the ones that invest in relationships before they need them — so when something goes wrong, they have reserves of trust to draw on."</div>
      <div class="pull-quote-attr">George Nield — President, Global Spaceport Alliance</div>
    </div>
    <div class="callout callout-insight">
      <div class="callout-label">Learning Outcomes — Module 5</div>
      <p>By the end of this module you will be able to: describe the structural multi-party dependencies in commercial spaceport operations; analyze the role of government entities as partners, regulators, and funders simultaneously; identify the key elements of the launch operator relationship and the contract provisions that define it; develop a stakeholder engagement framework for community and environmental partnerships; explain the legal architecture of international commercial launch partnerships; identify the contract provisions in Launch Services Agreements that protect both parties' interests; and recognize the early indicators of partnership failure.</p>
    </div>
  </div>
  <div id="segNavFooter"></div>
</div>`;

CONTENT['s5-1'] = () => `
<div class="segment-content">
  <div class="seg-header">
    <div class="seg-header-eyebrow">
      <span class="seg-header-code">SEGMENT 5.1</span>
      <span class="seg-header-meta">11 min · ~1,400 words</span>
    </div>
    <h1 class="seg-header-title">The Structural<br><em>Dependencies</em></h1>
    <p class="seg-header-subtitle">Why spaceports are fundamentally multi-party enterprises — and the governance implications that follow from that structural reality.</p>
    <div class="seg-header-tags">
      <span class="tag-lo tag">LO5.1 — Understand</span>
      <span class="tag">Governance</span>
      <span class="tag">Multi-Party Operations</span>
      <span class="tag">Authority Mapping</span>
    </div>
  </div>
  <div class="seg-body">
    <p>A commercial spaceport is not a single organization with unified authority over its operations. It is a system of interdependent parties, each with authority over specific elements of the operational envelope, and none with authority over the whole. This structural reality is not a design choice — it follows from the nature of space launch activity and the regulatory architecture governing it.</p>

    <h2>The Authority Map</h2>
    <div class="domain-grid">
      <div class="domain-card domain-launch">
        <div class="domain-label">PARTY 01</div>
        <div class="domain-title">Spaceport Operator</div>
        <div class="domain-body">Authority over: facility operations, infrastructure maintenance, tenant management, on-site safety management (outside the FAA's mission-specific purview), and the commercial relationships that constitute the spaceport's business. Does not have authority over: the launch vehicle, the launch operator's operational decisions, or the range safety function (which sits with the RSO).</div>
      </div>
      <div class="domain-card domain-range">
        <div class="domain-label">PARTY 02</div>
        <div class="domain-title">Launch Operator</div>
        <div class="domain-body">Authority over: the launch vehicle, payload integration, the launch decision (within the operational window), and the launch crew. The FAA licensee responsible for the safety of the mission. Does not have authority over: the launch site infrastructure, the range safety function, or the airspace management function (which sits with FAA ATC). The most operationally powerful party in a launch event — controls whether it proceeds.</div>
      </div>
      <div class="domain-card domain-gse">
        <div class="domain-label">PARTY 03</div>
        <div class="domain-title">FAA / AST</div>
        <div class="domain-body">Authority over: launch licensing — the regulatory go/no-go that authorizes the commercial launch activity. FAA/AST is the regulator, not the operator. Its authority is exercised through the license terms and through the regulatory oversight process. The RSO (Range Safety Officer) function — whether FAA or government range — is the real-time safety authority with the ability to terminate a flight.</div>
      </div>
    </div>
    <div class="domain-grid">
      <div class="domain-card domain-launch">
        <div class="domain-label">PARTY 04</div>
        <div class="domain-title">DoD Range (where applicable)</div>
        <div class="domain-body">At spaceports using federal ranges (Vandenberg, Cape Canaveral, Wallops), the DoD range provides critical infrastructure — tracking, telemetry, range safety — and its Range Safety Officer has authority to terminate a flight if the vehicle deviates from the approved flight corridor. This authority supersedes commercial operational preferences. DoD operational priorities can also pre-empt commercial launch windows.</div>
      </div>
      <div class="domain-card domain-range">
        <div class="domain-label">PARTY 05</div>
        <div class="domain-title">State/Local Government</div>
        <div class="domain-body">Most commercial spaceports are partially or wholly owned by state or local government entities. These entities have authority over: facility ownership decisions, capital investment, the operating entity's board, and potentially operational budget approvals. Their political priorities — economic development, job creation, community impact — shape the spaceport's mission and resource allocation in ways that are distinct from purely commercial imperatives.</div>
      </div>
      <div class="domain-card domain-gse">
        <div class="domain-label">PARTY 06</div>
        <div class="domain-title">Community &amp; Environmental</div>
        <div class="domain-body">No formal operational authority, but significant influence through: EIS processes (which can add years and costs to development), political relationships with state and local government owners, media attention affecting public and political support, and — in organized opposition — litigation that can delay or constrain operations. The community stakeholder relationships are soft power relationships, not hard authority — but soft power, applied persistently, can be highly consequential.</div>
      </div>
    </div>

    <h2>The Coordination Imperative</h2>
    <p>The implication of this authority distribution is clear: no single party can ensure a successful launch. The spaceport operator, launch operator, FAA, DoD range, and local government all hold veto power over some element of the operation. Success requires coordination — specifically, the development of shared protocols, mutual trust, and efficient interfaces among all parties. The quality of these coordination mechanisms is often the differentiating factor between spaceports that operate efficiently and those that operate in constant friction.</p>
    <div class="callout callout-insight">
      <div class="callout-label">The Integration Architecture</div>
      <p>World-class spaceports address the multi-party coordination challenge through formal integration architectures: Joint Operations Procedures (JOPs) that define interface protocols, Launch Readiness Reviews (LRRs) that bring all parties to shared go/no-go criteria, Range Safety Working Groups that maintain continuous communication between the spaceport, the launch operator, and the range authority, and Mission Integration Agreements that document responsibilities at each boundary. These are not bureaucratic instruments — they are the operational infrastructure of a complex multi-party system.</p>
    </div>
  </div>
  <div id="segNavFooter"></div>
</div>`;

CONTENT['s5-2'] = () => `
<div class="segment-content">
  <div class="seg-header">
    <div class="seg-header-eyebrow">
      <span class="seg-header-code">SEGMENT 5.2</span>
      <span class="seg-header-meta">13 min · ~1,600 words</span>
    </div>
    <h1 class="seg-header-title">Government as<br><em>Strategic Partner</em></h1>
    <p class="seg-header-subtitle">The federal, state, and international government entities that are simultaneously partners, funders, and regulators of commercial spaceport operations — and how to navigate this inherent complexity.</p>
    <div class="seg-header-tags">
      <span class="tag-lo tag">LO5.2 — Apply</span>
      <span class="tag">Government Relations</span>
      <span class="tag">Federal Partners</span>
      <span class="tag">Public-Private Partnership</span>
    </div>
  </div>
  <div class="seg-body">
    <p>Government entities are not simply regulators in the commercial spaceport ecosystem. They are funders, partners, landlords, customers, and operators — often simultaneously. Understanding the full role of government in commercial spaceport development and operations is essential for any executive in the sector.</p>

    <h2>Federal Agency Roles</h2>
    <div class="axis-grid">
      <div class="axis-card">
        <span class="axis-num">FAA / AST</span>
        <div class="axis-title">The Licensing Authority and Commercial Advocate</div>
        <div class="axis-body">FAA's Office of Commercial Space Transportation (AST) has a dual statutory mandate: to regulate commercial space launch for safety and national security, and to promote the commercial space transportation industry. This dual mandate means FAA/AST is simultaneously the regulator that commercial operators must satisfy and the advocate that works within the federal government to advance commercial space transportation interests. Spaceport operators who treat FAA/AST only as a regulatory burden — rather than as a potential advocacy partner — miss half the relationship.</div>
      </div>
      <div class="axis-card">
        <span class="axis-num">DoD / USSF</span>
        <div class="axis-title">The Infrastructure Provider and Security Partner</div>
        <div class="axis-body">U.S. Space Force and its predecessors (Air Force Space Command) operate the federal launch ranges — Eastern Range (Cape Canaveral), Western Range (Vandenberg), and Mid-Atlantic Range (Wallops). These ranges provide range safety infrastructure, tracking, telemetry, and flight termination systems that commercial operators access under reimbursable agreements. DoD is also a launch customer (NSSL program) and a national security partner in export control compliance. The relationship is complex: DoD operational priorities can pre-empt commercial schedules, but DoD range access enables commercial operations that would be economically infeasible without the existing government infrastructure.</div>
      </div>
      <div class="axis-card">
        <span class="axis-num">NASA</span>
        <div class="axis-title">The Anchor Customer and Technical Collaborator</div>
        <div class="axis-body">NASA's commercial launch programs — Commercial Crew, Commercial Cargo, Commercial Lunar Payload Services — are anchor revenue sources for commercial launch operators and associated facilities. NASA also collaborates technically with commercial spaceports through Space Act Agreements and cooperative research. NASA's Wallops Flight Facility, in particular, has a unique model as both a NASA research facility and a commercial launch site — providing a template for federal-commercial integration at the facility level.</div>
      </div>
    </div>

    <h2>State Government — The Primary Partnership</h2>
    <p>For most commercial spaceports, the most important government relationship is with the state government. State governments are typically the primary capital source (facility development funding), the ultimate owner or governance authority (state spaceport authorities), and the primary political sponsor whose continued support determines whether the facility receives ongoing operational support.</p>
    <p>Managing the state government relationship requires understanding the different political stakeholders within state government — the governor's office, the state legislature (particularly appropriations committees), the state economic development agency, and the state environmental agency — and maintaining productive relationships with each. A spaceport that has the governor's support but has not invested in relationships with the legislature's appropriations committee will find its annual budget requests vulnerable. A spaceport that has excellent regulatory relationships but has neglected the economic development agency will find itself less competitive for state economic development funds.</p>

    <div class="callout callout-warning">
      <div class="callout-label">The Regulator-Partner Tension</div>
      <p>The most important skill in managing government partnerships is navigating the tension between the government entity's regulatory and partnership roles. FAA/AST is simultaneously the entity that can approve or delay your launch license and the entity whose advocacy within the federal government can advance your business interests. State economic development agencies are simultaneously grant-making partners and political principals whose reporting requirements you must satisfy. DoD ranges are simultaneously infrastructure partners and operators whose operational priorities can conflict with your commercial schedule. Successful spaceport executives do not pretend this tension doesn't exist — they develop the institutional sophistication to manage it explicitly, understanding which role the government entity is playing in each interaction and calibrating the relationship accordingly.</p>
    </div>
  </div>
  <div id="segNavFooter"></div>
</div>`;

CONTENT['s5-3'] = () => `
<div class="segment-content">
  <div class="seg-header">
    <div class="seg-header-eyebrow">
      <span class="seg-header-code">SEGMENT 5.3</span>
      <span class="seg-header-meta">14 min · ~1,750 words</span>
    </div>
    <h1 class="seg-header-title">The Launch Operator<br><em>Relationship</em></h1>
    <p class="seg-header-subtitle">The most commercially significant relationship in the spaceport ecosystem. How to negotiate it, structure it, and sustain it — and what happens when it goes wrong.</p>
    <div class="seg-header-tags">
      <span class="tag-lo tag">LO5.3 — Apply</span>
      <span class="tag">Launch Services Agreement</span>
      <span class="tag">Operator Relations</span>
      <span class="tag">Contract Negotiation</span>
    </div>
  </div>
  <div class="seg-body">
    <p>The launch operator relationship is the commercial spaceport's most important bilateral relationship. It is the relationship that most directly determines revenue, operational intensity, safety culture, and facility reputation. Managing it well is a genuine management competency — not a legal matter to be handled by counsel and filed away.</p>

    <h2>The Asymmetry Problem</h2>
    <p>The launch operator relationship is characterized by structural asymmetry. Launch operators — particularly successful, growing ones — have a level of technical sophistication and operational authority that most spaceport operators do not match. A SpaceX or Blue Origin has deep engineering expertise in their vehicle systems, large operations teams, established safety programs, and significant negotiating leverage based on their ability to choose among alternative launch sites. The spaceport operator brings: a licensed facility, infrastructure access, regulatory relationships, and geographic or orbital trajectory access.</p>
    <p>This asymmetry does not mean the spaceport is powerless — a well-positioned spaceport with the right trajectory access and the right regulatory relationships has genuine leverage. But it does mean that the relationship dynamics often favor the operator, particularly in the early phases when the spaceport needs to attract operators to build its revenue base.</p>

    <h2>The Relationship Lifecycle</h2>
    <div class="phase-block">
      <div class="phase-header"><span class="phase-num">PHASE 01</span><div class="phase-title">Attraction and Negotiation</div></div>
      <div class="phase-body">The initial phase: the spaceport is marketing to potential operators, demonstrating the facility's capability, and negotiating the terms of the first contract. The spaceport's leverage is highest here — the operator has alternatives, but so does the spaceport. The negotiation should establish: financial terms (per-launch fees, minimum annual payments, escalation provisions), operational terms (scheduling priority, launch window allocation, turnaround time commitments), exclusivity (or lack thereof), liability allocation, and termination provisions. Errors made here — insufficient minimums, overly broad exclusivity, inadequate liability caps — will constrain the spaceport's financial and operational position for years.</div>
    </div>
    <div class="phase-block">
      <div class="phase-header"><span class="phase-num">PHASE 02</span><div class="phase-title">Operations and Integration</div></div>
      <div class="phase-body">The sustained operations phase: the operator is launching, the facility is serving them, and the relationship is tested daily. This phase requires: responsive issue resolution (the operator's operations team will identify facility performance gaps — the spaceport's ability to address them quickly determines whether the relationship strengthens or deteriorates), clear escalation paths (technical issues need technical resolution; commercial issues need executive attention), joint operations reviews (regular forums to identify and address recurring issues before they become contractual disputes), and cultural alignment (safety culture, operational rhythm, communication norms).</div>
    </div>
    <div class="phase-block">
      <div class="phase-header"><span class="phase-num">PHASE 03</span><div class="phase-title">Renewal and Evolution</div></div>
      <div class="phase-body">Contract renewals and expansions are when the relationship's quality is most clearly expressed. A relationship characterized by mutual trust and genuine performance on both sides produces renewal negotiations that are substantive but not adversarial. A relationship characterized by accumulated grievances, unresolved issues, and performance shortfalls produces renewal negotiations in which both parties are prepared to walk away — a destructive dynamic that serves neither. The spaceport's leverage at renewal depends almost entirely on: the quality of its facility performance during the preceding term, the depth of the relationship beyond the contractual terms, and the availability of alternative operators if this operator does not renew.</div>
    </div>
    <div class="callout callout-insight">
      <div class="callout-label">The Multi-Operator Strategic Imperative</div>
      <p>The most powerful action a spaceport can take to improve its negotiating position with its existing operators is to develop relationships with other potential operators. This is not a negotiating tactic — it is a strategic reality. A spaceport that has two operators actively competing for launch window priority has genuine market pricing power. A spaceport that has one operator, dependent on that operator's continued engagement, does not. The investment in developing the multi-operator relationship — pad modifications, marketing investment, international outreach — is as much a commercial negotiating investment as it is a revenue diversification one.</p>
    </div>
  </div>
  <div id="segNavFooter"></div>
</div>`;

CONTENT['s5-4'] = () => `
<div class="segment-content">
  <div class="seg-header">
    <div class="seg-header-eyebrow">
      <span class="seg-header-code">SEGMENT 5.4</span>
      <span class="seg-header-meta">11 min · ~1,400 words</span>
    </div>
    <h1 class="seg-header-title">Community &amp; Environmental<br><em>Stakeholders</em></h1>
    <p class="seg-header-subtitle">The non-commercial partners who don't appear on the org chart but can stop a launch program, delay a development by years, or become the community's most enthusiastic advocates.</p>
    <div class="seg-header-tags">
      <span class="tag-lo tag">LO5.4 — Apply</span>
      <span class="tag">Stakeholder Engagement</span>
      <span class="tag">Community Relations</span>
      <span class="tag">Environmental Compliance</span>
    </div>
  </div>
  <div class="seg-body">
    <p>The environmental review and community engagement process is often experienced by spaceport developers as a regulatory obstacle — a lengthy, expensive compliance requirement that delays commercial operations. This framing misses the strategic dimension of the process. The EIS and the community engagement it requires is also a relationship-building process — an opportunity to understand stakeholder concerns, demonstrate the facility's commitment to responsible operation, and build the social license that sustains a spaceport's community context over the long term.</p>

    <h2>The Stakeholder Map</h2>
    <div class="axis-grid">
      <div class="axis-card">
        <span class="axis-num">STAKEHOLDER A</span>
        <div class="axis-title">Adjacent Communities</div>
        <div class="axis-body">Residents and communities near the spaceport facility. Primary concerns: acoustic impact (launch noise, sonic booms from reentry), safety (launch corridor, accident risk, hazardous materials), and operational disruption (road closures, airspace restrictions, traffic). Primary interests: jobs, tax revenue, and the status of living near an aerospace facility. The most effective engagement is direct, regular, and specific — community advisory boards, public launch tracking access, advance notice of planned launches and restrictions, and demonstrated responsiveness to reported concerns.</div>
      </div>
      <div class="axis-card">
        <span class="axis-num">STAKEHOLDER B</span>
        <div class="axis-title">Environmental Organizations</div>
        <div class="axis-body">Range from constructive to adversarial. Primary concerns: impacts to protected species and habitats (particularly relevant for coastal and desert facilities), launch exhaust chemistry and ground contamination, and long-term cumulative impacts. The most effective engagement is substantive: commissioning independent environmental monitoring, publicly releasing results, and demonstrating that environmental compliance is a genuine operational commitment rather than a legal minimum. Organizations that are engaged as substantive partners in monitoring and mitigation are less likely to become litigation adversaries.</div>
      </div>
      <div class="axis-card">
        <span class="axis-num">STAKEHOLDER C</span>
        <div class="axis-title">Commercial Users of Adjacent Resources</div>
        <div class="axis-body">Fishing fleets, aviation operators, maritime shipping, and agriculture are the most common adjacent commercial users affected by spaceport operations. Their primary concerns are operational: launch windows that conflict with their operations, safety exclusion zones that restrict their access, and acoustic and debris impacts. These stakeholders are typically pragmatic — they want their operational concerns addressed, not the spaceport stopped. Operational coordination (advance notice, scheduling flexibility, safety corridor design that minimizes commercial impact) is the primary engagement tool.</div>
      </div>
    </div>

    <h2>Building Social License</h2>
    <p>Social license is the informal, community-granted permission to operate that complements the formal regulatory license. A facility with formal licenses but without social license faces persistent community opposition, political friction, and reputational risk. A facility with both formal licenses and genuine community support operates with a buffer of goodwill that is enormously valuable when inevitable operational challenges arise.</p>
    <p>Social license is built through: consistent performance against environmental commitments, transparency in incident reporting, genuine responsiveness to community concerns, economic benefit that is visible and broadly distributed, and civic engagement that positions the spaceport as a community asset rather than a commercial imposition. It is eroded by: incidents that reveal the gap between commitments and performance, defensive communication that minimizes legitimate concerns, and economic benefits that are narrowly captured by the operator rather than broadly shared with the community.</p>
  </div>
  <div id="segNavFooter"></div>
</div>`;

CONTENT['s5-5'] = () => `
<div class="segment-content">
  <div class="seg-header">
    <div class="seg-header-eyebrow">
      <span class="seg-header-code">SEGMENT 5.5</span>
      <span class="seg-header-meta">12 min · ~1,500 words</span>
    </div>
    <h1 class="seg-header-title">International Partnership<br><em>Frameworks</em></h1>
    <p class="seg-header-subtitle">The legal and commercial architecture of cross-border launch services — from bilateral launch authorization to Technology Safeguards Agreements to the emerging landscape of international spaceport-to-spaceport collaboration.</p>
    <div class="seg-header-tags">
      <span class="tag-lo tag">LO5.5 — Understand</span>
      <span class="tag">ITAR / EAR</span>
      <span class="tag">Technology Safeguards</span>
      <span class="tag">International Partnerships</span>
    </div>
  </div>
  <div class="seg-body">
    <p>Commercial space is inherently international — launch operators serve global customers, satellite operators provide global services, and the industry increasingly features cross-border commercial collaboration at the facility, operator, and mission levels. The legal architecture governing these international partnerships is complex, but understanding its key elements is essential for any spaceport executive operating in the global market.</p>

    <h2>Technology Control: ITAR and EAR</h2>
    <p>The International Traffic in Arms Regulations (ITAR) and the Export Administration Regulations (EAR) are the primary U.S. legal frameworks governing the international transfer of technology in the space sector. ITAR, administered by the State Department's Directorate of Defense Trade Controls (DDTC), controls munitions — including satellites, launch vehicles, and components that meet the relevant technical thresholds on the U.S. Munitions List (USML). EAR, administered by the Commerce Department's Bureau of Industry and Security (BIS), controls dual-use items on the Commerce Control List (CCL).</p>
    <p>For a U.S. spaceport hosting a foreign launch customer, ITAR/EAR implications arise when: foreign national employees of the customer are present at the facility (deemed export implications), foreign-manufactured satellite components are integrated at the facility, technical data about the launch vehicle or facility systems is shared with foreign nationals, or the launch vehicle or its components will depart U.S. territory.</p>

    <h2>Technology Safeguards Agreements (TSAs)</h2>
    <p>Technology Safeguards Agreements are bilateral agreements between the U.S. government and a foreign government that establish the legal framework for commercial launches involving that country's nationals, companies, or payload components. TSAs govern: access by foreign nationals to U.S. launch technology, protection of U.S. export-controlled data during joint launch activities, and the conditions under which foreign-manufactured components can be integrated at U.S. licensed facilities.</p>
    <p>The existence or absence of a TSA between the U.S. and a specific country materially affects the commercial feasibility of cross-border launch services. Countries with current TSAs include major commercial space players including Japan, Australia, UK, Brazil, and others. Countries without TSAs may face significantly higher compliance costs and complexity for any launch activity involving U.S. facilities or technology.</p>

    <h2>International Spaceport Collaboration</h2>
    <p>Beyond bilateral launch services, a growing dimension of international partnership is spaceport-to-spaceport collaboration: joint marketing, operator referrals, technical expertise sharing, and coordinated advocacy in multilateral forums. The Global Spaceport Alliance was established in part to facilitate this type of collaboration — providing a common platform for spaceport operators globally to coordinate on issues of shared interest including regulatory standards, safety best practices, environmental compliance, and workforce development.</p>
    <div class="callout callout-insight">
      <div class="callout-label">The UK Model — Licensed Commercial Spaceports</div>
      <p>The United Kingdom's development of licensed commercial spaceports — Spaceport Cornwall, SaxaVord in Shetland, Sutherland in Scotland, and others — represents the most significant international spaceport development program outside the United States. The UK Civil Aviation Authority regulates these facilities under the Space Industry Act 2018. The UK facilities are developing commercial relationships with U.S. launch operators (Virgin Orbit attempted the UK's first orbital launch from Cornwall in January 2023 — the mission failed to achieve orbit due to a second-stage fuel filter anomaly — before the company's subsequent closure) and are subject to UK-US Technology Safeguards Agreement provisions that govern the technical collaboration. The UK spaceport program provides a real-time case study in the regulatory, commercial, and partnership challenges of building a national commercial spaceport capability from the ground up.</p>
    </div>
  </div>
  <div id="segNavFooter"></div>
</div>`;

CONTENT['s5-6'] = () => `
<div class="segment-content">
  <div class="seg-header">
    <div class="seg-header-eyebrow">
      <span class="seg-header-code">SEGMENT 5.6</span>
      <span class="seg-header-meta">13 min · ~1,650 words</span>
    </div>
    <h1 class="seg-header-title">Contract<br><em>Architecture</em></h1>
    <p class="seg-header-subtitle">The provisions that define the spaceport-operator relationship. What must be in a Launch Services Agreement, what is commonly negotiated poorly, and the provisions that protect both parties when things go wrong.</p>
    <div class="seg-header-tags">
      <span class="tag-lo tag">LO5.6 — Apply</span>
      <span class="tag">Launch Services Agreement</span>
      <span class="tag">Contract Provisions</span>
      <span class="tag">Risk Allocation</span>
    </div>
  </div>
  <div class="seg-body">
    <p>The Launch Services Agreement (LSA) is the foundational commercial contract of the spaceport-operator relationship. It defines the financial terms, operational requirements, risk allocation, and remedies that govern the parties' relationship for its duration. Poorly drafted LSAs are a persistent source of commercial disputes, financial underperformance, and operational friction in the commercial spaceport sector.</p>

    <h2>The Essential Provisions</h2>
    <div class="phase-block">
      <div class="phase-header"><span class="phase-num">PROVISION 01</span><div class="phase-title">Financial Terms and Minimum Annual Guarantees</div></div>
      <div class="phase-body">The fee structure (per-launch, annual fixed, or hybrid), payment schedule, escalation provisions (CPI, fixed percentage, or negotiated), and minimum annual guarantees (MAGs). The MAG is the most financially important provision for the spaceport: it provides a revenue floor independent of actual launch cadence. Without MAGs, the spaceport bears all cadence variability risk. MAG levels should be set to cover at minimum the facility's fixed operating cost allocable to the operator's pad, with margin.</div>
    </div>
    <div class="phase-block">
      <div class="phase-header"><span class="phase-num">PROVISION 02</span><div class="phase-title">Liability Allocation and Cross-Waivers</div></div>
      <div class="phase-body">The Liability Convention framework (Module 3) and the FAA's financial responsibility requirements (Module 3) establish the baseline liability structure for commercial launch. Within that framework, spaceports and operators typically negotiate mutual cross-waivers of liability for their respective property damage and personnel injury — each party waiving claims against the other for losses to its own property and personnel arising from launch activities. This structure, which mirrors the DoD's reciprocal waiver framework for federal range use, allows both parties to rely on their own insurance rather than on each other's liability coverage for most operational scenarios.</div>
    </div>
    <div class="phase-block">
      <div class="phase-header"><span class="phase-num">PROVISION 03</span><div class="phase-title">Scheduling, Priority, and Preemption</div></div>
      <div class="phase-body">The scheduling provisions define how launch windows are allocated, how conflicts among operators are resolved, and the conditions under which either party can preempt or reschedule a launch window. For spaceports using federal ranges, the DoD preemption terms must be flowed down into the LSA — operators must understand the conditions under which their windows can be preempted by DoD priorities. For multi-operator spaceports, the scheduling provisions define the priority allocation mechanism, which is commercially significant when multiple operators compete for the same launch window.</div>
    </div>
    <div class="phase-block">
      <div class="phase-header"><span class="phase-num">PROVISION 04</span><div class="phase-title">Term, Renewal, and Termination</div></div>
      <div class="phase-body">The agreement term (typically 3–10 years for initial agreements), renewal options and process, and termination provisions — the conditions under which either party can exit the agreement, the notice required, and the consequences of early termination. Termination provisions should distinguish between: termination for cause (material breach by either party), termination for convenience (commercial decision to exit), force majeure (external event making performance impossible), and regulatory termination (FAA revocation of a license making performance illegal). Each has different financial consequences — termination for cause typically triggers compensation; termination for convenience typically requires a breakage fee.</div>
    </div>
  </div>
  <div id="segNavFooter"></div>
</div>`;

CONTENT['s5-7'] = () => `
<div class="segment-content">
  <div class="seg-header">
    <div class="seg-header-eyebrow">
      <span class="seg-header-code">SEGMENT 5.7</span>
      <span class="seg-header-meta">10 min · ~1,300 words</span>
    </div>
    <h1 class="seg-header-title">Partnership<br><em>Failure Modes</em></h1>
    <p class="seg-header-subtitle">What goes wrong in spaceport partnerships — the recurring patterns, the early warning indicators, and the management interventions that can prevent small problems from becoming large ones.</p>
    <div class="seg-header-tags">
      <span class="tag-lo tag">LO5.7 — Analyze</span>
      <span class="tag">Risk Management</span>
      <span class="tag">Early Warning</span>
      <span class="tag">Conflict Resolution</span>
    </div>
  </div>
  <div class="seg-body">
    <p>Partnership failures in commercial spaceport operations rarely appear without warning. The warning indicators are typically visible months or years before the relationship reaches a crisis point — but they are often ignored, rationalized, or deferred because addressing them requires difficult conversations. Understanding the failure patterns and their early indicators is a management competency that enables intervention before damage becomes irreversible.</p>

    <h2>The Seven Failure Patterns</h2>
    <div class="axis-grid">
      <div class="axis-card">
        <span class="axis-num">PATTERN 01</span>
        <div class="axis-title">Expectation Misalignment at Inception</div>
        <div class="axis-body">The parties enter the relationship with different understandings of what it will deliver. The most common form: the spaceport assumes the operator will grow to 12 launches per year; the operator's internal plan assumes 4 per year. This misalignment is not discovered until the first contract review, at which point both parties feel the other has performed poorly. Prevention: explicit, documented expectation alignment at contract signing, including shared launch cadence projections and the financial consequences of deviation from those projections.</div>
      </div>
      <div class="axis-card">
        <span class="axis-num">PATTERN 02</span>
        <div class="axis-title">Issue Accumulation Without Resolution</div>
        <div class="axis-body">Operational issues that are identified but not resolved — the spaceport's propellant delivery system is too slow, the operator's ground crew damages facility infrastructure, scheduling communication is consistently late. Each issue is individually manageable, but they accumulate into a pattern of chronic underperformance that erodes trust and eventually produces a contract dispute or non-renewal. Prevention: structured monthly operations reviews with explicit issue tracking and resolution accountability, and executive escalation of issues that are not resolved at the operational level.</div>
      </div>
      <div class="axis-card">
        <span class="axis-num">PATTERN 03</span>
        <div class="axis-title">Normalization of Deviance</div>
        <div class="axis-body">As introduced in the quiz discussion, normalization of deviance is the gradual acceptance of procedural deviations as normal. In partnership context, it manifests as: both parties gradually accepting that standard protocols are not being followed, that required documentation is consistently incomplete, or that safety review commitments are met on paper but not in substance. The early indicators: fewer formal issues raised in safety reviews, shortening LRR meetings, declining participation in joint operations working groups. Prevention: explicit safety culture commitments in the agreement, leadership visibility in safety forums, and anomaly reporting that is rewarded rather than penalized.</div>
      </div>
      <div class="axis-card">
        <span class="axis-num">PATTERN 04</span>
        <div class="axis-title">Financial Stress Cascade</div>
        <div class="axis-body">An operator experiencing financial pressure begins to defer obligations in predictable sequence: first non-core service payments, then maintenance and ground support fees, then infrastructure cost-sharing obligations, and finally launch fees themselves. Each deferral is individually explainable — budget cycle timing, contract dispute, system upgrade in progress — but the pattern reveals a deteriorating financial position that will eventually reach the launch fee itself. By the time the spaceport identifies the true issue, the operator may be in a capital crisis. Prevention: contractual rights to financial reporting, payment milestone tracking with automatic escalation triggers, and executive-level engagement at the first sign of pattern deference rather than waiting for a material default.</div>
      </div>
      <div class="axis-card">
        <span class="axis-num">PATTERN 05</span>
        <div class="axis-title">Communication Failure Under Pressure</div>
        <div class="axis-body">When the operational relationship is running smoothly, communication cadence is maintained and issues surface early. When pressure increases — schedule compression, vehicle anomaly, regulatory investigation — communication typically degrades at the exact moment it is most needed. The operator's team becomes heads-down and stops sending routine updates; the spaceport team interprets silence as a problem signal and escalates; the operator experiences the escalation as distrust; the cycle reinforces itself until the communication breakdown becomes the primary obstacle rather than the original operational problem. Prevention: pre-agreed communication protocols for abnormal conditions — specifying who calls whom, how often, and what information is exchanged when the operation is outside normal parameters — negotiated before the pressure event, not during it.</div>
      </div>
      <div class="axis-card">
        <span class="axis-num">PATTERN 06</span>
        <div class="axis-title">Regulatory Relationship Deterioration</div>
        <div class="axis-body">A partnership can erode through regulatory failures that are technically the operator's responsibility but that the spaceport absorbs politically. If an operator's licensing submissions are chronically late, their anomaly reports incomplete, or their compliance posture adversarial with the FAA, the spaceport's relationship with its primary regulator suffers — even though the spaceport is not the licensed party for the launch operation. The FAA's assessment of the spaceport as a professionally managed facility is affected by the quality of operations conducted there. Prevention: contractual requirements for the operator to notify the spaceport of any regulatory enforcement action or investigation, and executive engagement when the operator's regulatory relationship deteriorates to a level that creates reputational or licensing risk for the spaceport itself.</div>
      </div>
      <div class="axis-card">
        <span class="axis-num">PATTERN 07</span>
        <div class="axis-title">Scope Drift and Authority Erosion</div>
        <div class="axis-body">Over time, an incumbent operator may gradually expand the scope of its activities at the spaceport beyond the terms of its agreement — occupying additional areas, directing facility staff on matters outside their operational responsibility, making modification requests directly to contractors rather than through the spaceport's project management process. Each instance is individually minor, but the cumulative effect is that the operator is functionally managing parts of the facility that the spaceport is contractually and regulatorily responsible for. The spaceport loses operational authority incrementally, which creates safety governance gaps and undermines its position in the relationship. Prevention: annual contract compliance reviews that compare actual operator footprint and conduct against contractual scope, with explicit conversation about any deviations — treating scope drift as a contract management issue rather than an operator courtesy.</div>
      </div>
    </div>
    <div class="callout callout-warning">
      <div class="callout-label">The Early Warning Dashboard</div>
      <p>Experienced spaceport executives monitor a set of leading indicators that signal partnership health before financial or safety consequences materialize: (1) Time to resolve open issues from operations reviews — trending upward signals breakdown. (2) Frequency of executive-level communication — declining frequency signals disengagement. (3) Operator staff turnover in the facility team — high turnover signals internal frustration. (4) Frequency of unplanned scheduling changes — increasing frequency signals planning dysfunction. (5) Quality and completeness of safety documentation submissions — declining quality signals safety culture erosion. None of these indicators is conclusive alone — but a combination of deteriorating trends across several dimensions warrants direct executive engagement before the deterioration progresses further.</p>
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
    <h1 class="seg-header-title">Vandenberg SFB:<br>The <em>Military-Commercial</em><br>Coexistence Model</h1>
    <p class="seg-header-subtitle">How the U.S. Air Force and Space Force created the most successful military-commercial launch integration model in the world — and what the rest of the spaceport sector can learn from it.</p>
    <div class="seg-header-tags">
      <span class="tag-lo tag">LO5.2 · LO5.3 · LO5.6 — Evaluate</span>
      <span class="tag">Case Study</span>
      <span class="tag">Vandenberg SFB</span>
      <span class="tag">Military-Commercial Partnership</span>
    </div>
  </div>
  <div class="seg-body">
    <div class="callout callout-insight">
      <div class="callout-label">How to Use This Case</div>
      <p>Vandenberg is a genuinely successful model — one of the few cases in the spaceport sector where a complex multi-party partnership has produced sustained, world-class operational performance. The analysis questions focus on transferring the lessons, not critiquing the operation.</p>
    </div>

    <h2>Part I — The Facility</h2>
    <p>Vandenberg Space Force Base (formerly Vandenberg Air Force Base), located on California's Central Coast near Lompoc, is the United States' primary launch site for polar orbit missions. Its geographic location — on the Pacific coast with open ocean to the south and west — provides the only polar orbit access point on the U.S. West Coast, making it the essential facility for sun-synchronous orbit (SSO) missions including the vast majority of Earth observation and climate science satellites.</p>
    <p>The installation encompasses approximately 98,000 acres, hosts multiple launch complexes, and employs approximately 15,000 military and civilian personnel. The 30th Space Wing (now 30th Space Delta) provides range safety services, tracking, telemetry, and launch support for both military and commercial missions from the Western Range.</p>

    <h2>Part II — The Commercial Evolution</h2>
    <p>Vandenberg's commercial launch history began in earnest in the 1980s and accelerated dramatically with SpaceX's development of the Falcon 9. Space Launch Complex 4E (SLC-4E) was leased to SpaceX in 2011 and modified for Falcon 9 operations. SpaceX launched its first Falcon 9 from SLC-4E in September 2013. By 2024, SpaceX was conducting 20+ Falcon 9 missions per year from Vandenberg — making Vandenberg one of the highest-cadence commercial launch sites in the world and SpaceX the dominant commercial tenant of the Western Range.</p>
    <p>Other commercial operators at Vandenberg include United Launch Alliance (Delta IV and Atlas V from SLC-6 and SLC-3E), Northrop Grumman (Pegasus air-launch from the Vandenberg airfield), and Firefly Aerospace (Alpha from SLC-2). The diversity of commercial operators — and the continued coexistence with military NSSL and DoD research missions — makes Vandenberg the most operationally complex military-commercial launch integration environment in the world.</p>

    <h2>Part III — The Partnership Structure</h2>
    <p>The formal framework governing commercial access to Vandenberg's Western Range is the Reimbursable Space Launch Agreement (RSLA), under which commercial operators pay the DoD for range safety services at a rate that covers the DoD's incremental cost of providing those services. The RSLA does not give commercial operators access to the launch complexes themselves — those are leased separately through the Air Force Civil Engineering squadron under Launch Complex Use Agreements (LCUAs).</p>
    <p>The key characteristics of the Vandenberg partnership model that have made it successful:</p>
    <ul>
      <li><strong>Separated commercial pad operations.</strong> SpaceX operates SLC-4E as a largely self-sufficient pad complex — managing its own pad operations, ground support equipment, and launch control functions, with 30th Space Delta providing range safety services but not pad-level support. This model gives SpaceX operational control over its pad while maintaining military range authority over the safety function.</li>
      <li><strong>Institutionalized scheduling coordination.</strong> The Range Scheduling Working Group coordinates launch windows among all users — military and commercial — on a rolling 90-day horizon. Launch windows are allocated based on operational requirements, safety corridor analysis, and user priorities. The process is formal, documented, and predictable — commercial operators can plan their customer commitments against a stable window allocation process.</li>
      <li><strong>Consistent safety standards application.</strong> The Western Range applies its flight safety system requirements consistently to all users — military and commercial. This consistency is commercially important: operators know what is required, can plan to those standards, and are not subject to variable requirements that reflect the political relationships of specific missions.</li>
    </ul>

    <h2>Part IV — The Tension Points</h2>
    <p>The Vandenberg model is successful, but it is not frictionless. Tension points that persist in the military-commercial coexistence model include:</p>
    <ul>
      <li><strong>DoD preemption.</strong> DoD mission priority can preempt commercial launch windows with relatively short notice. For commercial operators with tight customer commitments, this preemption risk is a material operational consideration that must be disclosed to customers and reflected in commercial commitments.</li>
      <li><strong>Range modernization investment.</strong> The Western Range's tracking and telemetry infrastructure was designed for the DoD mission profile — large vehicles, complex mission requirements, high redundancy. Commercial operators with simpler mission profiles sometimes find the range infrastructure over-engineered for their needs, and the associated cost of operating a highly capable government range is reflected in their RSLA payments.</li>
      <li><strong>Security requirements.</strong> Personnel access procedures and security requirements appropriate for a military installation add time and cost to commercial operations that would not exist at a purely commercial facility. For high-cadence commercial operations, this friction is manageable; for new commercial operators unfamiliar with military installation operations, it can be a significant barrier.</li>
    </ul>

    <div class="callout callout-warning">
      <div class="callout-label">Analysis Questions</div>
      <div class="analysis-questions">
        <div class="aq-item">
          <div class="aq-num">Q1</div>
          <p>The Vandenberg model separates pad operations (SpaceX controls SLC-4E) from range safety (30th Space Delta controls the range safety function). What are the advantages of this functional separation, and what coordination challenges does it create?</p>
        </div>
        <div class="aq-item">
          <div class="aq-num">Q2</div>
          <p>A purely commercial spaceport in a different state wants to replicate key elements of the Vandenberg scheduling coordination model. What elements are directly transferable to a non-federal commercial facility, and what elements are specific to the military-commercial context?</p>
        </div>
        <div class="aq-item">
          <div class="aq-num">Q3</div>
          <p>SpaceX's launch cadence at Vandenberg has grown to 20+ missions per year. How does this change the power dynamic in SpaceX's relationship with the 30th Space Delta — and how should the government range authority manage a commercial tenant that conducts more launches per year than the DoD?</p>
        </div>
        <div class="aq-item">
          <div class="aq-num">Q4</div>
          <p>The DoD preemption risk is one of the persistent tension points in the Vandenberg model. If you were advising a commercial satellite operator considering Vandenberg as its primary launch site, what contractual and programmatic measures would you recommend to manage the preemption risk?</p>
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
    <h1 class="seg-header-title">Module 5<br><em>Knowledge Check</em></h1>
    <p class="seg-header-subtitle">Apply what you've learned about partnership architecture, government relations, contract design, and stakeholder management.</p>
    <div class="seg-header-tags">
      <span class="tag">LO5.1 · LO5.2 · LO5.3 · LO5.4 · LO5.5 · LO5.6 · LO5.7</span>
      <span class="tag">Assessment</span>
    </div>
  </div>
  <div class="seg-body" id="quizContainer"></div>
</div>`;
