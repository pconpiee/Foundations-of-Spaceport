// Course App — ISU–GSA Spaceport Leadership Series
// Module 3 — The Rules of Space: Regulatory Frameworks, Licensing & International Law
// Manages: segment navigation, progress tracking, quiz logic, state persistence

const CourseApp = (function() {

  const STATE_KEY = 'isu_gsa_m3_progress';

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
    { id: 's3-1',   code: '3.1',   name: 'The Five Treaties',                          dur: '12 min', group: 'Module 3 — The Rules of Space' },
    { id: 's3-2',   code: '3.2',   name: 'The U.S. Commercial Framework',              dur: '14 min', group: 'Module 3 — The Rules of Space' },
    { id: 's3-3',   code: '3.3',   name: 'Launch Licensing',                           dur: '13 min', group: 'Module 3 — The Rules of Space' },
    { id: 's3-4',   code: '3.4',   name: 'Range Safety Regulation',                    dur: '12 min', group: 'Module 3 — The Rules of Space' },
    { id: 's3-5',   code: '3.5',   name: 'The Global Legal Framework',                 dur: '11 min', group: 'Module 3 — The Rules of Space' },
    { id: 's3-6',   code: '3.6',   name: 'The New Space Regulatory Challenge',         dur: '10 min', group: 'Module 3 — The Rules of Space' },
    { id: 's3-7',   code: '3.7',   name: 'The Regulatory Horizon — 2030',              dur: '11 min', group: 'Module 3 — The Rules of Space' },
    { id: 'case',   code: 'CASE',  name: 'Case Study — FAA Part 450 Reform',          dur: '20 min', group: 'Case Study' },
    { id: 'check',  code: 'CHECK', name: 'Module Knowledge Check',                     dur: '10 min', group: 'Assessment' },
  ];

  const QUIZ = [
    {
      id: 'q1',
      lo: 'LO3.1',
      text: 'Under the 1967 Outer Space Treaty, which state bears international responsibility for a national commercial launch operator\'s activities in outer space?',
      options: [
        { id: 'a', text: 'The state where the launch vehicle was manufactured.' },
        { id: 'b', text: 'The United Nations Office for Outer Space Affairs (UNOOSA) as custodian of the Treaty.' },
        { id: 'c', text: 'No state bears responsibility for commercial activities; the operator assumes full international liability independently.' },
        { id: 'd', text: 'The launching state — the state from whose territory the launch takes place, or whose nationals conduct the launch.' },
      ],
      correct: 'd',
      rationale: 'Correct. Article VI of the Outer Space Treaty establishes that states bear international responsibility for national activities in outer space, including those conducted by non-governmental entities. This is why every state with commercial launch activity requires national authorization and continuing supervision of its operators — the state\'s international responsibility cannot be delegated away. The "launching state" concept (developed further in the Liability Convention) includes states from whose territory a launch occurs, states that procure a launch, and states whose nationals conduct a launch.',
    },
    {
      id: 'q2',
      lo: 'LO3.2',
      text: 'The FAA\'s Office of Commercial Space Transportation (AST) was created to fulfill two objectives that are explicitly written into the Commercial Space Launch Act. Which pair correctly describes them?',
      options: [
        { id: 'a', text: 'Protecting public safety and the safety of property, while encouraging and facilitating the commercial space industry.' },
        { id: 'b', text: 'Maximizing U.S. commercial launch market share, and ensuring NASA has access to commercial launch services.' },
        { id: 'c', text: 'Ensuring national security launch access and regulating launch site environmental compliance.' },
        { id: 'd', text: 'Licensing orbital launch operators and certifying suborbital vehicle manufacturers.' },
      ],
      correct: 'a',
      rationale: 'Correct. The Commercial Space Launch Act (51 U.S.C. § 50901 et seq.) establishes a dual mandate for FAA/AST: protect the safety of the public and property, and encourage, facilitate, and promote commercial space transportation. This dual mandate creates a structural tension that runs through every regulatory decision FAA/AST makes. Safety requirements that are too burdensome impede the commercial industry; requirements that are too permissive expose the public to risk. The balance between these two objectives is the ongoing project of commercial space regulation.',
    },
    {
      id: 'q3',
      lo: 'LO3.3',
      text: 'A new launch operator has submitted a launch license application to FAA/AST under 14 CFR Part 450 (the streamlined performance-based rule). The FAA has 180 days to issue or deny the license. Under what condition may the FAA clock be paused?',
      options: [
        { id: 'a', text: 'The FAA clock cannot be paused once an application is accepted as complete.' },
        { id: 'b', text: 'The clock is paused when a competing launch operator files a formal objection to the application.' },
        { id: 'c', text: 'The clock is paused whenever the FAA requests additional information from the applicant and is waiting for a response.' },
        { id: 'd', text: 'The clock is automatically paused 90 days into review to allow for public comment.' },
      ],
      correct: 'c',
      rationale: 'Correct. The 180-day statutory clock (established in the Commercial Space Launch Act) is paused — or "tolled" — during periods when the FAA is waiting for the applicant to provide additional information in response to an FAA data request. This means the effective review period can be significantly longer than 180 days if the applicant\'s application is incomplete or requires iterative clarification. The practical implication: well-prepared, complete applications result in faster licensing than applications that require multiple rounds of FAA information requests.',
    },
    {
      id: 'q4',
      lo: 'LO3.4',
      text: 'Under 14 CFR Part 417 (the prescriptive launch safety regulation, pre-Part 450), a launch operator calculating the maximum probable loss (MPL) to third parties is required to demonstrate that the probability of a casualty to any uninvolved member of the public does not exceed which threshold?',
      options: [
        { id: 'a', text: '1 × 10⁻⁴ (1 in 10,000) per launch.' },
        { id: 'b', text: '1 × 10⁻⁵ (1 in 100,000) per launch.' },
        { id: 'c', text: '1 × 10⁻⁶ (1 in 1,000,000) per launch.' },
        { id: 'd', text: '1 × 10⁻³ (1 in 1,000) per launch.' },
      ],
      correct: 'a',
      rationale: 'Correct. The FAA\'s public safety standard — the expected casualty (Ec) criterion under 14 CFR Part 417.107(b) and Part 450.101(a)(1) — requires that the probability of a casualty to an uninvolved member of the public does not exceed 1 × 10⁻⁴ (1 in 10,000) per launch attempt. This threshold has been the foundational public safety standard for U.S. commercial launches since the 1990s. The 1 × 10⁻⁶ figure appears in some individual risk contexts (e.g., nuclear and chemical hazard assessments) but is not the FAA Ec criterion. Part 450 preserves the 1 × 10⁻⁴ threshold as a performance standard while allowing operators flexibility in demonstrating compliance methodology.',
    },
    {
      id: 'q5',
      lo: 'LO3.5',
      text: 'Under the 1972 Liability Convention, absolute liability applies when damage is caused on the surface of the Earth or to aircraft in flight. What standard of liability applies for damage caused in outer space?',
      options: [
        { id: 'a', text: 'Strict liability also applies in outer space — the launching state is liable regardless of fault.' },
        { id: 'b', text: 'Fault-based liability applies in outer space — the claimant state must prove the launching state or its nationals were at fault.' },
        { id: 'c', text: 'No liability applies in outer space — the Convention only covers damage to Earth and Earth\'s atmosphere.' },
        { id: 'd', text: 'Mutual waiver of liability applies automatically in outer space between treaty parties.' },
      ],
      correct: 'b',
      rationale: 'Correct. The Liability Convention establishes a two-tier liability regime: absolute (strict) liability for damage caused on the Earth\'s surface or to aircraft in flight (Article II), and fault-based liability for damage caused in outer space (Article III). This distinction matters practically because fault-based liability requires the claimant state to prove the launching state\'s negligence or wrongful act — a much harder standard to meet. The 1978 Cosmos 954 incident (Soviet satellite reentry over Canada) was resolved under the absolute liability standard, as it involved damage to Earth\'s surface.',
    },
    {
      id: 'q6',
      lo: 'LO3.6',
      text: 'FAA Part 450 (2021) replaced FAA Parts 415 and 431 with a "performance-based" regulatory framework. What is the most significant operational difference between the legacy prescriptive approach and the Part 450 performance-based approach?',
      options: [
        { id: 'a', text: 'Part 450 requires shorter review timelines — 90 days instead of 180.' },
        { id: 'b', text: 'Part 450 eliminates the need for a flight safety analysis for reusable launch vehicles.' },
        { id: 'c', text: 'Part 450 allows operators to use any method to demonstrate safety compliance, as long as the public safety outcomes are met — rather than prescribing specific technical methods.' },
        { id: 'd', text: 'Part 450 transfers range safety authority from the FAA to the launch operator.' },
      ],
      correct: 'c',
      rationale: 'Correct. The fundamental shift in Part 450 is from prescriptive compliance — where the regulation specified the exact methods operators must use to demonstrate safety — to performance-based compliance, where operators must demonstrate that their approach achieves the required safety outcomes (e.g., Ec ≤ 1 × 10⁻⁴) using whatever technically valid methods they choose. This is intended to accommodate new vehicle types and operations that the prescriptive rules were not designed for, including reusable vehicles, air-launched systems, and novel mission profiles. The tradeoff is increased analytical complexity — operators must do more work to define and justify their compliance methodology.',
    },
    {
      id: 'q7',
      lo: 'LO3.2',
      text: 'A foreign launch operator wants to provide commercial launch services to U.S. government customers, using vehicles launched from a non-U.S. launch site. Which U.S. regulatory requirement must be satisfied before U.S. Government launch procurement can proceed?',
      options: [
        { id: 'a', text: 'The operator must obtain an FAA launch license, even for foreign launches, under the extraterritorial provisions of the Commercial Space Launch Act.' },
        { id: 'b', text: 'No U.S. regulatory requirement applies to foreign launches from foreign soil, even for U.S. government payloads.' },
        { id: 'c', text: 'The U.S. Government must obtain a launch license on behalf of the foreign operator under a government-to-government launch agreement.' },
        { id: 'd', text: 'The launch must be authorized by a reciprocal launch authorization agreement between the FAA and the foreign state\'s launch authority.' },
      ],
      correct: 'd',
      rationale: 'Correct. The FAA administers a system of bilateral launch authorization agreements (sometimes called "Launch Trade Agreements") with foreign launch authorities that allow foreign operators to provide launch services to U.S. customers — including U.S. government customers — from foreign launch sites. These agreements ensure that the foreign government has established regulatory oversight equivalent to U.S. standards, protecting U.S. interests and public safety. Without such an agreement, U.S. government procurement from a foreign launch operator is legally constrained.',
    },
    {
      id: 'q8',
      lo: 'LO3.3',
      text: 'A commercial launch site operator in the United States is required to hold a Launch Site Operator License (LSOL) under 14 CFR Part 420. Which of the following is the most significant ongoing obligation of a LSOL holder, beyond the initial site licensing?',
      options: [
        { id: 'a', text: 'Annual financial audits submitted to FAA demonstrating that the operator can cover maximum probable liability.' },
        { id: 'b', text: 'Continuing obligation to ensure that any launch operator using the licensed site complies with its own launch license and that site operations remain within the licensed parameters.' },
        { id: 'c', text: 'Quarterly safety reports to FAA identifying any changes to site infrastructure or operations.' },
        { id: 'd', text: 'Mandatory FAA on-site inspection prior to each commercial launch conducted at the licensed site.' },
      ],
      correct: 'b',
      rationale: 'Correct. The Launch Site Operator License creates a continuing obligation — not just a one-time certification. The LSOL holder is responsible for ensuring that launch operators using its site operate within the parameters established in the launch site license, and that the site itself remains in compliance with its licensed configuration. If the site makes significant changes — adds a new pad, expands its propellant storage capacity, or modifies range safety systems — those changes must be reviewed and approved by FAA. This ongoing compliance obligation is one of the reasons launch site operators must maintain a dedicated regulatory compliance function.',
    },
  ];

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
  function prevSeg(id) { const i = segIndex(id); return i > 0 ? SEGMENTS[i-1] : null; }
  function nextSeg(id) { const i = segIndex(id); return i < SEGMENTS.length - 1 ? SEGMENTS[i+1] : null; }

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
      <button class="seg-nav-btn" onclick="CourseApp.navigate('${prev ? prev.id : ''}')" ${!prev ? 'disabled' : ''}>
        ← ${prev ? prev.name : 'Start'}
      </button>
      <button class="seg-nav-btn next" onclick="CourseApp.navigate('${next ? next.id : ''}')" ${!next ? 'disabled' : ''}>
        ${next ? next.name : 'Complete'} →
      </button>`;
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
    if (contentFn) {
      container.innerHTML = contentFn();
      if (id === 'check') initQuiz();
    } else {
      container.innerHTML = `<div class="segment-content"><p style="color:var(--slate)">Content loading…</p></div>`;
    }
  }

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
            <div class="kc-title">Module 3 Knowledge Check</div>
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
          The Rules of Space
        </h1>
        <p style="color:var(--slate-light); font-size:1rem; max-width:50ch; margin:0 auto 2rem; line-height:1.75;">
          You've completed Module 3 of the ISU–GSA Global Spaceport Leadership Series.
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
          <div style="font-family:var(--font-display); font-size:1.4rem; color:var(--white); margin-bottom:0.5rem;">Module 4 — The Business of Launch</div>
          <div style="font-size:0.85rem; color:var(--slate-light);">Finance · Investment · Commercial Models · ~2.5 hours</div>
        </div>
        <a href="../m4-business-of-launch/index.html" class="btn-primary" style="margin-right:1rem;">Go to Module 4 →</a>
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

// ── CONTENT LIBRARY ──────────────────────────────────────────────
const CONTENT = {};

CONTENT['intro'] = () => `
<div class="segment-content">
  <div class="seg-header">
    <div class="seg-header-eyebrow">
      <span class="seg-header-code">COURSE OPENER</span>
      <span class="seg-header-meta">8 min · Context &amp; framing</span>
    </div>
    <h1 class="seg-header-title">The Law<br>Behind the<br><em>Launch</em></h1>
    <p class="seg-header-subtitle">Welcome to Module 3. The site is selected. The operations are running. Now we ask: what does the law require — and what does it permit?</p>
    <div class="seg-header-tags">
      <span class="tag">ISU × GSA</span>
      <span class="tag">Module 3 of 6</span>
      <span class="tag">Executive Certificate</span>
    </div>
  </div>
  <div class="seg-body">
    <div class="callout callout-insight">
      <div class="callout-label">Continuing from Module 2</div>
      <p>Module 2 mapped the operational architecture of a spaceport: the three phases, the three domains, the workforce, and the safety culture that makes it all work. Module 3 adds the legal and regulatory dimension — the framework of national and international rules within which every launch operation, every spaceport license, and every commercial agreement exists. Understanding that framework is not a lawyer's job. It is an executive's job, because the regulatory environment shapes every commercial decision in this sector.</p>
    </div>
    <h2>From George Nield — Global Spaceport Alliance</h2>
    <p>When I was at the FAA, I was responsible for a regulatory regime that had to do two things simultaneously: keep the public safe, and not kill an industry that was just starting to find its footing. Those two objectives are not always in conflict, but they are always in tension. Every decision I made — every rule we wrote, every license we issued or denied — lived in that tension.</p>
    <p>The regulatory environment for commercial space is more complex today than when I was at the FAA, because the industry is more complex. We have vehicles operating from dozens of sites around the world. We have reusable vehicles that the original regulations weren't designed for. We have operations that don't fit cleanly into the "launch vehicle" category the Outer Space Treaty assumed. We have commercial operators trying to do things that the legal framework imagined would be done by governments.</p>
    <p>What hasn't changed is the fundamental architecture: a body of international law written in the 1960s and 1970s that defines the obligations of states, and national regulatory frameworks that implement those obligations for commercial operators. If you understand that architecture — really understand it, not just the surface — you can navigate almost any regulatory problem in this sector. If you don't understand it, you'll be surprised by problems that were predictable.</p>
    <div class="pull-quote">
      <div class="pull-quote-text">"The regulatory environment shapes every commercial decision in this sector. It is not a constraint to be navigated around. It is the terrain."</div>
      <div class="pull-quote-attr">George Nield — President, Global Spaceport Alliance · Former FAA Associate Administrator for Commercial Space Transportation</div>
    </div>
    <h2>From John Wensveen — International Space University</h2>
    <p>At ISU, we approach space law and regulation the way we approach every domain: not as a technical specialty, but as a strategic context. The executives who have come through ISU programs over thirty years consistently identify regulatory understanding as one of the most underweighted competencies in their development. They knew the technology. They understood the operations. They were surprised by the law.</p>
    <p>What Module 3 gives you is not a law degree. It gives you the conceptual map of the regulatory landscape: where the international obligations come from, how national frameworks implement them, what the licensing process actually requires, and where the system is under stress from the pace of commercial innovation. With that map, you can ask the right questions of the people who do have the law degrees.</p>
    <h2>What You Will Learn</h2>
    <p>This module begins with the international foundation: the five core treaties that constitute the body of space law, and how they create the obligation structure within which all commercial space activity exists. We then move to the U.S. commercial framework — the FAA, the Commercial Space Launch Act, and the regulatory architecture that has evolved since 1984. We examine the launch licensing process in operational detail, followed by the range safety regulatory framework. We close with the international liability and registration system, the regulatory challenges created by new commercial operations, and the near-term regulatory horizon.</p>
    <div class="callout callout-insight">
      <div class="callout-label">Learning Outcomes — Module 3</div>
      <p>By the end of this module you will be able to: identify the five core space law treaties and explain the obligations they create; describe the FAA/AST regulatory mandate and its dual-objective structure; explain the launch licensing process under Part 450; apply the range safety regulatory framework to a commercial launch scenario; analyze the liability implications of the Liability Convention for a commercial spaceport; explain the regulatory challenge created by new commercial operations; and identify the key regulatory developments expected in the 2025–2030 period.</p>
    </div>
  </div>
  <div id="segNavFooter"></div>
</div>`;

CONTENT['s3-1'] = () => `
<div class="segment-content">
  <div class="seg-header">
    <div class="seg-header-eyebrow">
      <span class="seg-header-code">SEGMENT 3.1</span>
      <span class="seg-header-meta">12 min · ~1,550 words</span>
    </div>
    <h1 class="seg-header-title">The Five<br><em>Treaties</em></h1>
    <p class="seg-header-subtitle">Space law's constitutional framework. Written during the Cold War, still governing commercial operations today — and why that matters more than most executives realize.</p>
    <div class="seg-header-tags">
      <span class="tag-lo tag">LO3.1 — Understand</span>
      <span class="tag">Outer Space Treaty</span>
      <span class="tag">Liability Convention</span>
      <span class="tag">Registration Convention</span>
    </div>
  </div>
  <div class="seg-body">
    <p>The legal architecture governing human activity in outer space was built in a decade — roughly 1967 to 1979 — by diplomats who were negotiating against the backdrop of two superpowers racing to establish strategic dominance in a new domain. The resulting treaties are remarkable documents: they establish global norms for the use of space that have held, with modification at the margins, for more than fifty years. They are also documents designed for a world of state actors, and applying them to the commercial era requires interpretation that is sometimes contested and always consequential.</p>
    <p>There are five core treaties. Every executive operating in the commercial space sector should know their names, their core obligations, and — critically — their gaps.</p>

    <div class="phase-block">
      <div class="phase-header">
        <span class="phase-num">TREATY 01</span>
        <div class="phase-title">The Outer Space Treaty (1967)</div>
        <div class="phase-dur">Official title: Treaty on Principles Governing the Activities of States in the Exploration and Use of Outer Space, including the Moon and Other Celestial Bodies</div>
      </div>
      <div class="phase-body">
        <p>The Outer Space Treaty is the constitutional document of space law. Its key provisions:</p>
        <ul>
          <li><strong>Article I:</strong> Space is the "province of all mankind." Exploration and use shall be for the benefit of all countries.</li>
          <li><strong>Article II:</strong> No national appropriation of outer space, the Moon, or other celestial bodies by claim of sovereignty, use, or occupation. This prohibition on national appropriation is the most contested provision in commercial space law — it creates legal ambiguity around resource extraction rights that has not been resolved by international consensus.</li>
          <li><strong>Article VI:</strong> States bear international responsibility for national activities in outer space, including activities of non-governmental entities. This requires states to authorize and supervise their commercial operators — the foundation of every national licensing regime.</li>
          <li><strong>Article VII:</strong> Launching states are internationally liable for damage caused by their space objects. Elaborated by the Liability Convention.</li>
          <li><strong>Article VIII:</strong> The state on whose registry an object is launched retains jurisdiction and control over that object. The foundation of the Registration Convention.</li>
          <li><strong>Article IX:</strong> States shall avoid harmful contamination of space and shall consult with other states regarding activities that might create potential harmful interference.</li>
        </ul>
        <div class="callout callout-warning">
          <div class="callout-label">The Article II Problem for Commercial Space Resource Extraction</div>
          <p>The prohibition on national appropriation of outer space has been interpreted by some states — including the United States (in the Commercial Space Launch Competitiveness Act of 2015) and Luxembourg (in its 2017 space resources law) — as not prohibiting the commercial extraction and ownership of resources extracted from celestial bodies, even if the bodies themselves cannot be claimed. Other states, and many international law scholars, dispute this interpretation. The legal status of commercial asteroid mining and lunar resource extraction remains genuinely unresolved under international law. This is not an academic problem — it is a material risk factor for any business model that depends on property rights over extracted space resources.</p>
        </div>
      </div>
    </div>

    <div class="phase-block">
      <div class="phase-header">
        <span class="phase-num">TREATY 02</span>
        <div class="phase-title">The Rescue Agreement (1968)</div>
        <div class="phase-dur">Official title: Agreement on the Rescue of Astronauts, the Return of Astronauts and the Return of Objects Launched into Outer Space</div>
      </div>
      <div class="phase-body">
        <p>The Rescue Agreement requires states to assist astronauts in distress, regardless of nationality, and to return them safely to the launching state. It also requires return of space objects found in the territory of another state. For commercial human spaceflight, the Rescue Agreement establishes a baseline of international obligation that operates irrespective of commercial agreements — a state that finds a distressed commercial astronaut in its territory is obligated under international law to render assistance and return them.</p>
      </div>
    </div>

    <div class="phase-block">
      <div class="phase-header">
        <span class="phase-num">TREATY 03</span>
        <div class="phase-title">The Liability Convention (1972)</div>
        <div class="phase-dur">Official title: Convention on International Liability for Damage Caused by Space Objects</div>
      </div>
      <div class="phase-body">
        <p>The Liability Convention establishes the international liability framework for damage caused by space objects. Its key provisions:</p>
        <ul>
          <li><strong>Absolute liability (Article II):</strong> Launching states are absolutely liable — without proof of fault — for damage caused by their space objects on the surface of the Earth or to aircraft in flight.</li>
          <li><strong>Fault-based liability (Article III):</strong> In space, liability is fault-based — the claimant state must prove the launching state was at fault.</li>
          <li><strong>The "launching state" definition:</strong> Includes any state that launches or procures a launch, and any state from whose territory or facility a launch takes place. This creates joint and several liability for multiple states involved in a single launch.</li>
          <li><strong>State-to-state claims:</strong> The Convention operates between states, not between private parties. A private party cannot sue a foreign launching state directly under the Convention — only states can bring claims.</li>
        </ul>
        <p>The Cosmos 954 incident of 1978 — when a Soviet satellite with a nuclear reactor fell over Canada — produced the only formal claim under the Liability Convention to date, with Canada seeking $6 billion CAD and settling for $3 million CAD. The Convention has not been tested in the context of commercial operations at scale.</p>
      </div>
    </div>

    <div class="phase-block">
      <div class="phase-header">
        <span class="phase-num">TREATY 04</span>
        <div class="phase-title">The Registration Convention (1976)</div>
        <div class="phase-dur">Official title: Convention on Registration of Objects Launched into Outer Space</div>
      </div>
      <div class="phase-body">
        <p>The Registration Convention requires launching states to maintain a national registry of space objects and to provide registration information to the UN Secretary-General for entry in the UN Register. Registration establishes jurisdiction and control over the space object under OST Article VIII. For commercial operators, registration has practical consequences: the registered state bears international responsibility and liability for the registered object.</p>
        <p>The growth of the commercial smallsat and megaconstellation era has created significant pressure on the registration system. Constellations of thousands of satellites — the SpaceX Starlink constellation had over 6,000 operational satellites by 2025 — generate registration obligations at a scale the Convention was not designed to handle efficiently. Proposals for streamlined registration procedures for large constellations are under active discussion at UNCOPUOS.</p>
      </div>
    </div>

    <div class="phase-block">
      <div class="phase-header">
        <span class="phase-num">TREATY 05</span>
        <div class="phase-title">The Moon Agreement (1979)</div>
        <div class="phase-dur">Official title: Agreement Governing the Activities of States on the Moon and Other Celestial Bodies</div>
      </div>
      <div class="phase-body">
        <p>The Moon Agreement is the most contested and least ratified of the five treaties. It declares the Moon and its natural resources to be the "common heritage of mankind" — a legal concept that implies an international management regime for any extraction. Major spacefaring nations — the United States, Russia, China — have not ratified it, and it is widely regarded as legally marginal for that reason. It has been ratified by only 18 states, none of which have significant current space programs. For practical purposes, the Moon Agreement does not govern current commercial lunar activity.</p>
        <div class="callout callout-insight">
          <div class="callout-label">Executive Application — Navigating the Treaty Framework</div>
          <p>When evaluating a commercial space business with international dimensions, three treaty questions matter most: (1) Which states are "launching states" for purposes of the Liability Convention, and who bears the international liability exposure? (2) Is the registration obligation being properly discharged, and does the registered state's national authorization framework provide adequate legal cover? (3) Does the business model depend on property rights in space resources that are legally contested under Article II of the OST? If the answer to (3) is yes, the legal risk is material and must be disclosed in any serious due diligence or investor presentation.</p>
        </div>
      </div>
    </div>
  </div>
  <div id="segNavFooter"></div>
</div>`;

CONTENT['s3-2'] = () => `
<div class="segment-content">
  <div class="seg-header">
    <div class="seg-header-eyebrow">
      <span class="seg-header-code">SEGMENT 3.2</span>
      <span class="seg-header-meta">14 min · ~1,800 words</span>
    </div>
    <h1 class="seg-header-title">The U.S.<br><em>Commercial Framework</em></h1>
    <p class="seg-header-subtitle">The FAA, the Commercial Space Launch Act, and the regulatory architecture that turned U.S. space law from a government monopoly into the world's most active commercial launch regime.</p>
    <div class="seg-header-tags">
      <span class="tag-lo tag">LO3.2 — Understand</span>
      <span class="tag">FAA/AST</span>
      <span class="tag">Commercial Space Launch Act</span>
      <span class="tag">Dual Mandate</span>
    </div>
  </div>
  <div class="seg-body">
    <p>In 1984, the United States Congress passed the Commercial Space Launch Act — the first law in the world to establish a regulatory framework specifically for commercial space launch. The decision to regulate commercial launch through a civil aviation authority rather than through NASA or the Department of Defense was deliberate and consequential. It placed commercial space in the consumer-facing, safety-and-commerce-oriented tradition of civil aviation regulation, not in the classified, mission-control tradition of the military or NASA.</p>
    <p>The result, forty years later, is a regulatory architecture that is sophisticated, evolving, and — compared to most of its international counterparts — genuinely functional for commercial operations at scale. Understanding it is essential for any executive doing business in the U.S. commercial launch market.</p>

    <h2>The FAA Office of Commercial Space Transportation (AST)</h2>
    <p>The Commercial Space Launch Act delegated regulatory authority over commercial space launch to the FAA, which established the Office of Commercial Space Transportation (known as AST for its original designation as the Office of the Associate Administrator for Commercial Space Transportation). AST is responsible for licensing all commercial launches and reentries from U.S. territory, licensing U.S. launch site operators, and — through international agreements — authorizing certain foreign launches by U.S. operators.</p>
    <p>AST's dual mandate — written into the statute — is the defining feature of U.S. commercial space regulation:</p>
    <div class="axis-grid">
      <div class="axis-card">
        <span class="axis-num">MANDATE 01</span>
        <div class="axis-title">Protect Safety</div>
        <div class="axis-body">AST must protect the safety of the public and the safety of property. This is the foundational purpose of all FAA regulation — applied to a domain where the consequences of failure are measured in public casualty risk, not just financial loss. The public safety standard — the expected casualty (Ec) criterion of 1 × 10⁻⁴ per launch (1 in 10,000) — is the quantitative expression of this mandate. Every launch license requires a demonstration that the operation meets this standard.</div>
      </div>
      <div class="axis-card">
        <span class="axis-num">MANDATE 02</span>
        <div class="axis-title">Encourage Industry</div>
        <div class="axis-body">AST must encourage, facilitate, and promote commercial space transportation. This mandate is unusual for a safety regulator — most safety agencies do not have a statutory obligation to promote the industry they regulate. For AST, it means that regulatory decisions cannot be made purely on safety grounds without weighing the impact on commercial development. The regulatory burden of a proposed rule must be justified not just by safety benefit, but by the net public benefit calculation that includes commercial growth.</div>
      </div>
    </div>
    <p>This dual mandate creates a structural tension that plays out in every significant AST regulatory action. Industry advocates typically argue that AST is over-regulating and slowing commercial development. Safety advocates argue that the commercial promotion mandate creates pressure to accept risks that a pure safety regulator would not accept. The truth, as usual, is that both concerns are real and must be managed.</p>

    <h2>The Regulatory Structure — 14 CFR Subtitle B, Chapter III</h2>
    <p>FAA commercial space regulations appear in Title 14 of the Code of Federal Regulations (14 CFR), Subtitle B, Chapter III. The key parts:</p>
    <div class="domain-grid">
      <div class="domain-card domain-launch">
        <div class="domain-label">14 CFR PART 401</div>
        <div class="domain-title">Definitions</div>
        <div class="domain-body">The foundational definitions for all commercial space regulation. Defines "launch," "reentry," "launch vehicle," "reentry vehicle," "launch site," "launch operator," "launch site operator," and related terms. Definitions matter enormously in regulatory interpretation — a vehicle that meets the definition of "launch vehicle" is subject to all launch vehicle licensing requirements; one that doesn't may fall into a regulatory gap or a different regulatory category.</div>
      </div>
      <div class="domain-card domain-range">
        <div class="domain-label">14 CFR PART 420</div>
        <div class="domain-title">Launch Site Operator Licensing</div>
        <div class="domain-body">Governs the licensing of launch site operators — those who own or manage launch sites used for commercial launches. Requires a Launch Site Operator License (LSOL) for any site used for commercial launches in the U.S. Establishes site safety requirements, operational requirements, and ongoing compliance obligations. The LSOL is the foundational regulatory instrument for spaceport operators.</div>
      </div>
      <div class="domain-card domain-gse">
        <div class="domain-label">14 CFR PART 450</div>
        <div class="domain-title">Launch and Reentry Licensing (2021)</div>
        <div class="domain-body">The 2021 replacement for the prescriptive Parts 415, 431, and 435. A performance-based rule that allows operators to use any technically valid method to demonstrate compliance with public safety outcomes. The most significant regulatory reform in commercial space since the Commercial Space Launch Act itself. Examined in detail in the Case Study for this module.</div>
      </div>
    </div>

    <h2>The Indemnification Framework</h2>
    <p>One of the most commercially significant features of the U.S. regulatory framework is its liability indemnification structure, established under 51 U.S.C. § 50914–50915.</p>
    <p>The structure works as follows: Launch operators must carry insurance for the maximum probable loss (MPL) to third parties, as calculated and required by the FAA. If a launch accident causes damage to third parties in excess of the required insurance, the U.S. government indemnifies the operator up to $1.5 billion (2011 dollars, indexed), subject to Congressional appropriation. Damage above the government indemnification cap is the operator's unindemnified risk.</p>
    <p>This structure — mandatory insurance up to MPL, government backstop above MPL — was designed to make commercial launch economically viable in an era when the tail risks of a launch accident were potentially unlimited. It reflects a deliberate government policy choice to accept the risk of very-large catastrophic accidents as a cost of developing the commercial launch industry, rather than requiring operators to carry unlimited insurance (which would have been unavailable or prohibitively expensive).</p>
    <p>A critical operational caveat: the government indemnification backstop is <em>subject to Congressional appropriation</em>. It is not a guaranteed payment — it is a statutory authorization for payment, which Congress must fund after the fact. In practice, for a catastrophic accident that triggers the backstop, Congressional appropriation is likely — but it is not automatic, and the timing of any payment is uncertain. Operators and spaceport executives who treat the government backstop as equivalent to a funded escrow are misreading the statute. The commercial and contractual significance of this distinction should be explicit in risk analysis and in disclosure to investors.</p>
    <div class="callout callout-warning">
      <div class="callout-label">The Cross-Waiver of Liability</div>
      <p>Commercial launch agreements in the U.S. operate under a mandatory cross-waiver of liability framework (51 U.S.C. § 50914). Launch operators, launch site operators, customers, and their contractors are required to waive claims against each other for damage arising from licensed activities, regardless of fault. The cross-waiver exists to prevent the web of claims between parties to a complex launch program from becoming commercially unworkable. It is a feature of U.S. commercial space law that has no direct equivalent in most other legal systems — a significant factor in the competitiveness of U.S. launch services in international markets.</p>
    </div>
  </div>
  <div id="segNavFooter"></div>
</div>`;

CONTENT['s3-3'] = () => `
<div class="segment-content">
  <div class="seg-header">
    <div class="seg-header-eyebrow">
      <span class="seg-header-code">SEGMENT 3.3</span>
      <span class="seg-header-meta">13 min · ~1,650 words</span>
    </div>
    <h1 class="seg-header-title">Launch<br><em>Licensing</em></h1>
    <p class="seg-header-subtitle">What the FAA actually reviews — and what it means for the executive who needs the license in hand before the countdown can start.</p>
    <div class="seg-header-tags">
      <span class="tag-lo tag">LO3.3 — Apply</span>
      <span class="tag">Part 450</span>
      <span class="tag">License Application</span>
      <span class="tag">Review Process</span>
    </div>
  </div>
  <div class="seg-body">
    <p>A commercial launch license is an authorization from the FAA to conduct a specific commercial launch or class of launches. Without it, a commercial launch in the United States cannot legally proceed. The licensing process is the primary mechanism through which the FAA exercises its safety oversight mandate — and understanding that process is essential for any executive managing a commercial launch program.</p>

    <h2>License Types Under Part 450</h2>
    <p>Under 14 CFR Part 450, FAA issues two types of launch licenses:</p>
    <div class="axis-grid">
      <div class="axis-card">
        <span class="axis-num">LICENSE TYPE A</span>
        <div class="axis-title">Mission-Specific License</div>
        <div class="axis-body">Authorizes a specific launch from a specific site with a specific vehicle and payload. Required for launches that fall outside the parameters of an existing operator license. The most targeted form of authorization — and the most common for operators conducting unusual or one-time missions. Mission-specific licenses require a complete safety analysis for each launch.</div>
      </div>
      <div class="axis-card">
        <span class="axis-num">LICENSE TYPE B</span>
        <div class="axis-title">Operator License</div>
        <div class="axis-body">Authorizes a series of launches using the same vehicle design from the same or multiple sites. The most commercially efficient form of authorization for established operators with defined vehicle types. The FAA reviews the operator's vehicle, its safety analysis methodology, and its compliance framework once — and then issues an operator license that covers multiple launches without a full re-review for each. SpaceX's Falcon 9 and Falcon Heavy operate under operator licenses; each launch requires a safety evaluation, but not a full re-licensing.</div>
      </div>
    </div>

    <h2>The Review Process — Five Major Domains</h2>
    <p>The FAA's review of a launch license application under Part 450 encompasses five major analytical domains. An application is not complete until all five domains have been addressed:</p>
    <div class="phase-block">
      <div class="phase-header"><span class="phase-num">DOMAIN 01</span><div class="phase-title">Policy Review</div></div>
      <div class="phase-body">
        <p>Evaluates whether the proposed launch is consistent with U.S. national security and foreign policy interests. Involves coordination with the Department of Defense, the State Department, and the intelligence community. For most commercial launches, policy review is relatively straightforward. For launches involving technology with national security implications (certain propulsion systems, guidance systems, or dual-use payloads), policy review can be the rate-limiting step.</p>
      </div>
    </div>
    <div class="phase-block">
      <div class="phase-header"><span class="phase-num">DOMAIN 02</span><div class="phase-title">Payload Review</div></div>
      <div class="phase-body">
        <p>Determines whether the payload is subject to FAA payload review — or whether it is exempt (NASA payloads, Department of Defense payloads, and certain other government payloads are exempt from FAA payload review, though they are still subject to other license requirements). For commercial payloads, the FAA evaluates whether the payload could be used as a weapon, whether it has implications for foreign policy or national security, and whether it creates any special range safety issues.</p>
      </div>
    </div>
    <div class="phase-block">
      <div class="phase-header"><span class="phase-num">DOMAIN 03</span><div class="phase-title">Safety Review</div></div>
      <div class="phase-body">
        <p>The core of the licensing process. The safety review evaluates whether the proposed launch meets the public safety standard: Ec ≤ 1 × 10⁻⁴. This requires a flight safety analysis demonstrating the probability of debris impacting a populated area, propellant explosion, or other hazardous event — for all credible failure modes, across the entire trajectory. Under Part 450, operators have flexibility in the methodology used to conduct this analysis; they must justify their methodology as technically valid and demonstrate the required outcome.</p>
        <p>The safety review also covers: flight termination system design and performance, propellant explosive hazard analysis, ground safety analysis (including the pad, the facility, and the surrounding area), and tracking system performance requirements.</p>
      </div>
    </div>
    <div class="phase-block">
      <div class="phase-header"><span class="phase-num">DOMAIN 04</span><div class="phase-title">Financial Responsibility Review</div></div>
      <div class="phase-body">
        <p>The FAA calculates the maximum probable loss (MPL) for the proposed launch — the financial exposure to third-party claims in the event of a worst-case-but-credible accident scenario. The operator must demonstrate the ability to cover the MPL through insurance, self-insurance, or a combination. The FAA then sets the required insurance amount. For most commercial launches, required insurance is in the range of $500 million to $3 billion, depending on the vehicle, the trajectory, and the ground track population density.</p>
      </div>
    </div>
    <div class="phase-block">
      <div class="phase-header"><span class="phase-num">DOMAIN 05</span><div class="phase-title">Environmental Review</div></div>
      <div class="phase-body">
        <p>Evaluates compliance with the National Environmental Policy Act (NEPA). For launches from licensed sites that have already completed environmental review at the site level, this domain is often covered by prior analysis. For new launch sites, new vehicle types with different environmental footprints, or significant increases in launch frequency, new environmental review may be required. Environmental review can add months to the licensing timeline if not initiated early — and it is the domain most frequently underestimated by new operators.</p>
      </div>
    </div>

    <h2>Timeline Management</h2>
    <p>The statutory review clock is 180 days from receipt of a complete application. In practice, the effective timeline is a function of application quality, FAA workload, and the complexity of the specific review domains. An operator who submits a complete, well-prepared application for a vehicle type the FAA has reviewed before, from a licensed site, targeting a standard orbit — can expect a review closer to the 90-day end of the range. An operator with a novel vehicle, a new site, unusual trajectory, or complex payload review can expect the clock to run to 180 days or beyond.</p>
    <div class="callout callout-insight">
      <div class="callout-label">Executive Application — Licensing as a Business Risk</div>
      <p>Licensing timeline risk is real and frequently underweighted in commercial launch business plans. A 180-day licensing clock that runs to its limit — because the application was incomplete, because the safety analysis required multiple iterations, or because an environmental review was not anticipated — can materially delay a program and damage customer relationships. Experienced launch program managers treat the licensing timeline as a parallel critical path alongside vehicle development, not as a final step before launch. Starting the application early, engaging FAA/AST early in the pre-application process (the FAA actively encourages pre-application meetings), and investing in a high-quality first submission are not bureaucratic courtesies — they are schedule risk mitigation.</p>
    </div>
  </div>
  <div id="segNavFooter"></div>
</div>`;

CONTENT['s3-4'] = () => `
<div class="segment-content">
  <div class="seg-header">
    <div class="seg-header-eyebrow">
      <span class="seg-header-code">SEGMENT 3.4</span>
      <span class="seg-header-meta">12 min · ~1,500 words</span>
    </div>
    <h1 class="seg-header-title">Range Safety<br><em>Regulation</em></h1>
    <p class="seg-header-subtitle">The regulatory architecture behind the RSO's authority. How public safety standards are set, how they are enforced, and why they are not negotiable.</p>
    <div class="seg-header-tags">
      <span class="tag-lo tag">LO3.4 — Explain</span>
      <span class="tag">14 CFR Part 417</span>
      <span class="tag">Flight Termination System</span>
      <span class="tag">Launch Commit Criteria</span>
    </div>
  </div>
  <div class="seg-body">
    <p>Range safety regulation is the regulatory expression of the most fundamental obligation in commercial space law: the protection of uninvolved members of the public from the hazards of launch operations. Its authority flows directly from the Outer Space Treaty's requirement that states bear responsibility for national activities — and from the FAA's statutory safety mandate.</p>
    <p>Module 2 examined the operational structure of range safety — the RSO, the domains, the authority relationships. This segment examines the regulatory framework that defines and enforces those structures.</p>

    <h2>14 CFR Part 417 — The Prescriptive Framework</h2>
    <p>14 CFR Part 417 is the legacy range safety regulation — the prescriptive framework that governed commercial launch safety from 2006 until Part 450's 2021 implementation. Part 417 remains in force for operators who have not transitioned to Part 450, and its analytical methods remain important reference points even under the performance-based regime.</p>
    <p>Part 417 establishes requirements in four main areas:</p>
    <ul>
      <li><strong>Flight safety analysis.</strong> Required calculations of probability of debris impact, casualty expectation, and maximum debris distance for all credible failure modes. Specific methods for trajectory dispersion analysis, debris hazard analysis, and casualty estimation are prescribed.</li>
      <li><strong>Flight safety systems.</strong> Requirements for Flight Termination Systems (FTS) — the systems that destroy a vehicle in flight when commanded. Prescribes performance standards: the FTS must achieve vehicle destruct within 6 seconds of command for liquid-propellant vehicles, within 4 seconds for solid-propellant vehicles. Specifies redundancy, reliability, and electromagnetic compatibility requirements.</li>
      <li><strong>Launch safety rules and launch commit criteria.</strong> The framework for establishing the go/no-go conditions that must all be satisfied before launch can proceed. Appendix G of Part 417 contains the weather launch commit criteria — the specific meteorological thresholds that govern launch day weather holds.</li>
      <li><strong>Hazard analysis.</strong> Ground safety requirements covering propellant storage and handling, explosive safety quantities and distances, and personnel protection in the immediate launch area.</li>
    </ul>

    <h2>The Flight Termination System — Regulatory Perspective</h2>
    <p>The Flight Termination System (FTS) is the hardware implementation of the public safety standard. When an RSO observes a vehicle deviating from its approved flight corridor in a way that threatens a populated area, the FTS command destroys the vehicle — preventing a worse outcome at the cost of the mission.</p>
    <p>Part 417 specifies that the FTS must be:</p>
    <ul>
      <li><strong>Independent.</strong> The FTS must be independent of the vehicle's flight computer and flight software. A software failure that causes vehicle deviation cannot also prevent FTS activation.</li>
      <li><strong>Reliable.</strong> The FTS must meet specified reliability standards — typically 0.999 probability of successful activation on command.</li>
      <li><strong>Electromagnetically compatible.</strong> The FTS must not be susceptible to inadvertent activation by radio frequency interference, nor must it be jammable to prevent activation.</li>
      <li><strong>Tested.</strong> FTS performance must be verified through ground testing before each launch campaign.</li>
    </ul>
    <p>The transition to Autonomous Flight Safety Systems (AFSS) — where the FTS is activated by onboard software rather than human command — has been permitted under Part 417 through the performance standard: the AFSS must meet the same reliability and response time standards as the commanded FTS, while providing faster response (microseconds rather than hundreds of milliseconds). The regulatory question for AFSS is not speed — it demonstrably performs better — but auditability: how does the FAA verify that an autonomous algorithm will make the right termination decision in an anomalous flight regime it has never encountered before?</p>

    <h2>Launch Commit Criteria — The Regulatory Architecture</h2>
    <p>Launch Commit Criteria (LCC) are the set of conditions that must simultaneously be satisfied before a launch can proceed past the terminal count. Part 417 requires that operators establish LCC and that those LCC be documented in the license record. Changes to LCC require FAA review and approval before implementation.</p>
    <p>The LCC structure has two components:</p>
    <div class="axis-grid">
      <div class="axis-card">
        <span class="axis-num">COMPONENT A</span>
        <div class="axis-title">Vehicle and Ground Systems LCC</div>
        <div class="axis-body">Operator-defined criteria governing vehicle health, ground support equipment status, and launch operations readiness. These criteria are established by the launch operator and reviewed by the FAA — but they primarily reflect the operator's engineering judgment about what conditions allow for safe vehicle performance. The FAA reviews them for safety adequacy; the operator defines the specific thresholds.</div>
      </div>
      <div class="axis-card">
        <span class="axis-num">COMPONENT B</span>
        <div class="axis-title">Weather LCC (Appendix G)</div>
        <div class="axis-body">Standardized atmospheric constraints established in Part 417 Appendix G. These include: thunderstorm proximity constraints, lightning avoidance rules (both natural and triggered lightning), anvil cloud rules, debris cloud constraints, thick cloud layer constraints, and upper-level wind shear limits. Weather LCC are not operator-negotiable — they are set by the regulation to protect against the known risk of lightning-induced FTS activation and flight path deviation due to atmospheric anomalies.</div>
      </div>
    </div>
    <div class="callout callout-insight">
      <div class="callout-label">Executive Application — LCC and Commercial Commitments</div>
      <p>The non-negotiable nature of LCC — particularly weather LCC — creates a specific commercial risk for launch services providers. A contract that promises a launch within a specific window, at a specific price, without appropriate LCC force majeure provisions, exposes the operator to financial liability for conditions that are outside their operational control. The regulatory requirement that LCC be followed precisely, without operator discretion to proceed through a non-compliant condition, means that any launch contract that does not explicitly address LCC-related holds and scrubs has a material gap. This is one of the most common points of commercial dispute in the launch services market.</p>
    </div>
  </div>
  <div id="segNavFooter"></div>
</div>`;

CONTENT['s3-5'] = () => `
<div class="segment-content">
  <div class="seg-header">
    <div class="seg-header-eyebrow">
      <span class="seg-header-code">SEGMENT 3.5</span>
      <span class="seg-header-meta">11 min · ~1,400 words</span>
    </div>
    <h1 class="seg-header-title">The Global<br><em>Legal Framework</em></h1>
    <p class="seg-header-subtitle">Liability, registration, and the national authorization obligation. How international law works in practice — and where it is being stress-tested by the commercial era.</p>
    <div class="seg-header-tags">
      <span class="tag-lo tag">LO3.5 — Analyze</span>
      <span class="tag">Liability Convention</span>
      <span class="tag">National Authorization</span>
      <span class="tag">International Law</span>
    </div>
  </div>
  <div class="seg-body">
    <p>The international legal framework for space operates at a different level of abstraction than the U.S. regulatory framework. Where the FAA issues licenses to specific operators for specific operations, international law sets the obligations of states — and states then fulfill those obligations through their national legal regimes. Understanding how these two levels interact is essential for any commercial space operation with international dimensions.</p>

    <h2>The National Authorization Obligation</h2>
    <p>The Outer Space Treaty's Article VI creates the foundational obligation for states with commercial space industries: they must authorize and continuously supervise the space activities of their nationals. This obligation cannot be contracted away — a state cannot delegate its international responsibility to the private actor. The private actor can be required to comply with national law, but if the private actor causes harm, the state bears international responsibility.</p>
    <p>This obligation drives the structure of every national space law. The question "does my country need a space law?" is answered by Article VI: if your nationals conduct space activities, your state bears international responsibility for those activities under the OST. The only practical way to manage that responsibility is to require national authorization — which requires a national legal framework. This is why space law development has accelerated globally in recent years: the commercial space boom means more states have nationals conducting space activities, and more states need authorization frameworks to fulfill their OST obligations.</p>

    <h2>The "Launching State" Problem — Multi-State Operations</h2>
    <p>The Liability Convention's definition of "launching state" — which includes any state that launches, procures a launch, or from whose territory a launch takes place — creates a complex liability structure for the multi-national commercial operations that are increasingly common.</p>
    <p>Consider: a U.S. satellite operator procures a launch from a European launch vehicle, lifting off from a launch site in South America, with the operator's satellite insured by a U.K. insurer. In the event of an accident causing damage on the ground, which state bears Liability Convention responsibility?</p>
    <ul>
      <li>The United States (if it is a state from which the operator procures the launch under some interpretations)</li>
      <li>The European state of the launch vehicle manufacturer</li>
      <li>The South American state from whose territory the launch occurs</li>
    </ul>
    <p>All three states could be "launching states" under the Convention's definition. The Convention contemplates this in Article V, which establishes joint and several liability among multiple launching states. But the practical consequence is that no single state has clean, exclusive liability responsibility — which means the private parties must establish their own liability allocation through contract, because the treaty framework does not resolve it.</p>

    <h2>National Space Laws Around the World — A 2025 Snapshot</h2>
    <p>As of 2025, more than 30 countries have enacted national space laws or regulations. The quality and commercial relevance of these frameworks varies significantly:</p>
    <div class="domain-grid">
      <div class="domain-card domain-launch">
        <div class="domain-label">MATURE FRAMEWORKS</div>
        <div class="domain-title">United States, United Kingdom, France, Australia</div>
        <div class="domain-body">Established frameworks with track records of commercial licensing, clear authorization procedures, and some form of liability indemnification or financial responsibility requirement. These are the frameworks within which most current commercial space activity operates.</div>
      </div>
      <div class="domain-card domain-range">
        <div class="domain-label">DEVELOPING FRAMEWORKS</div>
        <div class="domain-title">UAE, New Zealand, Singapore, Japan</div>
        <div class="domain-body">More recent frameworks, typically designed to attract commercial space business and competitive with established frameworks on licensing efficiency and regulatory burden. New Zealand's Outer Space and High-altitude Activities Act (2017) was specifically designed to facilitate Rocket Lab's Electron launches — a case study in responsive national space law development.</div>
      </div>
      <div class="domain-card domain-gse">
        <div class="domain-label">EMERGING FRAMEWORKS</div>
        <div class="domain-title">Saudi Arabia, India, Kenya, Nigeria</div>
        <div class="domain-body">Framework development in progress, often driven by planned national launch programs or by international investment in local launch infrastructure. The quality of these frameworks — particularly their handling of the liability and authorization obligations — will be a significant factor in whether planned launch sites in these countries can attract international commercial operators.</div>
      </div>
    </div>

    <div class="callout callout-warning">
      <div class="callout-label">The "Flag of Convenience" Problem</div>
      <p>The flexibility in national authorization frameworks — and the significant variation in their stringency — has created pressure toward regulatory arbitrage: operators seeking out the least burdensome national authorization framework that still allows them to operate commercially. This "flag of convenience" dynamic (familiar from maritime law) is widely discussed in international space law circles and is a concern raised in UNCOPUOS. The Artemis Accords (2020), bilateral agreements with the U.S. as anchor, represent one approach to establishing baseline standards for national space activity governance that go beyond the minimum OST obligations.</p>
    </div>
  </div>
  <div id="segNavFooter"></div>
</div>`;

CONTENT['s3-6'] = () => `
<div class="segment-content">
  <div class="seg-header">
    <div class="seg-header-eyebrow">
      <span class="seg-header-code">SEGMENT 3.6</span>
      <span class="seg-header-meta">10 min · ~1,300 words</span>
    </div>
    <h1 class="seg-header-title">The New Space<br><em>Regulatory Challenge</em></h1>
    <p class="seg-header-subtitle">Reusable vehicles. Mega-constellations. Space tourism. In-space servicing. Why the regulatory architecture is under stress — and how the U.S. and international community are responding.</p>
    <div class="seg-header-tags">
      <span class="tag-lo tag">LO3.6 — Analyze</span>
      <span class="tag">Regulatory Innovation</span>
      <span class="tag">Mega-Constellations</span>
      <span class="tag">Space Tourism</span>
    </div>
  </div>
  <div class="seg-body">
    <p>The commercial space regulatory framework was built for a world in which launches were infrequent, vehicles were expendable, missions were orbital, and operators were large established defense contractors. In 2025, none of those assumptions hold for a significant and growing portion of the commercial space market. The regulatory system is catching up — but the gap between regulatory design and operational reality is larger today than at any point since the Commercial Space Launch Act was passed.</p>

    <h2>Reusable Launch Vehicles — The Certification Problem</h2>
    <p>Expendable launch vehicles have a natural regulatory advantage: each vehicle is new, and its flight history is the history of the program, not the history of the specific article. Reusable vehicles — boosters that land and fly again, upper stages that are recovered, crew vehicles that return from orbit — present a different regulatory question: how do you certify a vehicle that has flown before, may have experienced stresses different from nominal, and whose refurbishment was conducted by a commercial workforce operating under schedule pressure?</p>
    <p>The FAA's response to reusability has been largely to incorporate it into the performance-based framework of Part 450: the operator must demonstrate that the reused vehicle meets all applicable safety standards for the proposed flight. In practice, this has meant that SpaceX's approach to Falcon 9 booster reuse — including its inspection regime, refurbishment standards, and reuse count limits — is evaluated by the FAA as a matter of flight safety analysis rather than through a specific prescriptive reuse certification standard.</p>
    <p>Whether this approach is adequate at the higher cadence and shorter turnaround targets of the Starship generation remains an open regulatory question. The FAA has acknowledged that its staffing and analytical capacity to review high-cadence reusable operations is a constraint — one that will require both resource investment and potentially new regulatory approaches.</p>

    <h2>Mega-Constellations — The Space Traffic Challenge</h2>
    <p>The deployment of satellite constellations in the thousands-of-satellites scale — SpaceX Starlink, Amazon Kuiper, OneWeb — has created regulatory challenges across multiple domains:</p>
    <ul>
      <li><strong>Spectrum coordination.</strong> Each satellite in a constellation requires ITU frequency coordination. The ITU filing process, designed for single-satellite missions, is under significant strain from constellation filing volumes.</li>
      <li><strong>Orbital debris.</strong> Constellations at low orbital altitudes, if deorbited within 5 years (the current ITU guideline) or 25 years (the older standard), generate manageable long-term debris. But the collision avoidance burden during constellation operation — with thousands of active satellites maneuvering around each other and other operators' satellites — creates operational demands that have no historical precedent.</li>
      <li><strong>Registration.</strong> The UN Registration Convention requires individual registration of each satellite. Registering 6,000 Starlink satellites individually is a compliance burden that existing registration frameworks were not designed for.</li>
    </ul>

    <h2>Space Tourism — The Participant vs. Passenger Problem</h2>
    <p>The Commercial Space Launch Act distinguishes between "crew" (trained commercial spaceflight participants and professional crew with operational responsibilities) and "space flight participants" (paying passengers who are along for the ride). Space flight participants must be informed of risks and provide consent — but they are not regulated with the same safety framework as aircraft passengers. This reflects the deliberate policy choice to allow space tourism to develop under an "informed consent" regime rather than a prescriptive safety standard, on the theory that space tourism is inherently experimental and that prescriptive standards would foreclose innovation.</p>
    <p>This policy choice is being re-examined. The Virgin Galactic VSS Enterprise fatal accident in October 2014 — in which co-pilot Michael Alsbury was killed when the feathering system was prematurely deployed during a test flight over the Mojave Desert — and the September 2022 Blue Origin NS-23 engine anomaly (which triggered the vehicle's in-flight escape system on an unmanned test flight) have renewed debate about whether the "informed consent plus crew training" model is adequate public safety protection. FAA AST's authority to set prescriptive crew safety standards is currently limited by statute — a limitation that Congress has periodically extended and that is a recurring subject of regulatory discussion.</p>
    <div class="callout callout-insight">
      <div class="callout-label">The Regulatory Pace Problem</div>
      <p>The fundamental challenge for space regulation is time. Regulatory rulemaking in the U.S. — with its notice-and-comment requirements, interagency coordination, and Congressional oversight — operates on a 3–7 year cycle for significant rules. The commercial space industry, at its current pace, can undergo multiple technology generations in that same period. The result is a regulatory framework that is perpetually catching up. Part 450 was designed to address this — its performance-based structure is intended to remain valid even as technology changes, because it regulates outcomes rather than methods. Whether Part 450's flexibility is sufficient to keep up with the pace of innovation is the central regulatory question for the next decade.</p>
    </div>
  </div>
  <div id="segNavFooter"></div>
</div>`;

CONTENT['s3-7'] = () => `
<div class="segment-content">
  <div class="seg-header">
    <div class="seg-header-eyebrow">
      <span class="seg-header-code">SEGMENT 3.7</span>
      <span class="seg-header-meta">11 min · ~1,400 words</span>
    </div>
    <h1 class="seg-header-title">The Regulatory<br><em>Horizon — 2030</em></h1>
    <p class="seg-header-subtitle">Space traffic management. In-space servicing regulation. The Artemis Accords. What is coming in the next five years — and what it means for commercial spaceport operations.</p>
    <div class="seg-header-tags">
      <span class="tag-lo tag">LO3.6 · LO3.7 — Evaluate</span>
      <span class="tag">Space Traffic Management</span>
      <span class="tag">Artemis Accords</span>
      <span class="tag">ISAM Regulation</span>
    </div>
  </div>
  <div class="seg-body">
    <p>The commercial space regulatory environment of 2030 will be materially different from that of 2025 — not because the foundational legal architecture will change (the OST is not being revised), but because the operational environment is generating new regulatory requirements faster than existing frameworks can absorb them. Three developments are most likely to shape the near-term regulatory horizon.</p>

    <h2>Space Traffic Management — The Emerging Regime</h2>
    <p>As of 2025, there is no legally binding international regime for space traffic management. Collision avoidance is conducted by individual operators and satellite owners through bilateral coordination, supplemented by U.S. Space Force space surveillance data shared with commercial operators. This model works at current traffic levels. At the traffic levels projected for 2030 — potentially 100,000 active satellites in low Earth orbit, multiple commercial space stations, and regular crewed flights — it is widely assessed as inadequate.</p>
    <p>The United States has assigned responsibility for civil space traffic management to the Department of Commerce (Space Policy Directive 3, 2018), which is developing a civil STM framework. The key regulatory questions:</p>
    <ul>
      <li><strong>Mandatory vs. voluntary coordination.</strong> Will operators be required to register and actively share tracking data with a central STM authority, or will coordination remain voluntary?</li>
      <li><strong>Liability for collision avoidance failure.</strong> If Operator A's satellite collides with Operator B's satellite because Operator A failed to conduct an avoidance maneuver, what is the liability framework? The Liability Convention's fault-based standard for in-space damage provides a starting point, but practical enforcement is nearly impossible.</li>
      <li><strong>International coordination.</strong> An effective STM regime requires international participation — a U.S.-only regime cannot prevent collisions involving non-U.S. satellites. International consensus on STM architecture through UNCOPUOS has been slow, reflecting geopolitical tensions between spacefaring nations.</li>
    </ul>

    <h2>In-Space Servicing, Assembly, and Manufacturing (ISAM) — A Regulatory Gap</h2>
    <p>ISAM — the rendezvous with, servicing, or modification of satellites on orbit by commercial operators — presents a regulatory challenge the current framework was not designed for. A commercial satellite servicer approaching another operator's satellite occupies a legal gray zone: it is not conducting a launch (the activities are on orbit), it may not be conducting a "reentry" (it's not coming back to Earth), and existing categories like "launch vehicle" and "satellite" don't adequately describe what it is.</p>
    <p>The FAA's current position is that ISAM operations that begin with a launch from U.S. territory are subject to launch licensing — but that the on-orbit servicing activities themselves are not regulated under FAA authority. The Department of Commerce and the FCC have overlapping jurisdictional claims. The result is regulatory ambiguity that is a material risk factor for any ISAM business model. Resolution of ISAM regulatory jurisdiction is expected by 2027, driven by the commercial pressure from companies like Astroscale (Japanese parent, operations globally) and Northrop Grumman's MEV program.</p>

    <h2>The Artemis Accords — Bilateral Standard-Setting</h2>
    <p>The Artemis Accords, initiated by the United States in 2020, are bilateral agreements between the U.S. and other space-active nations that establish principles for responsible space exploration activities. As of 2025, over 45 nations have signed. Key provisions:</p>
    <ul>
      <li>Transparency of operations and sharing of scientific data</li>
      <li>Interoperability of space exploration systems</li>
      <li>Registration of space objects</li>
      <li>Release of scientific data from exploration missions</li>
      <li>Preservation of space heritage sites</li>
      <li>Mitigation of orbital debris</li>
      <li>Safe zones around operations (the "safety zones" provision — intended to prevent harmful interference with ongoing activities near the Moon or on celestial bodies)</li>
    </ul>
    <p>The safety zones provision has generated the most international discussion — it is seen by some states (including Russia and China, neither of which has signed) as creating de facto exclusive use rights that are inconsistent with Article II of the OST. The U.S. and Accords signatories maintain that safety zones are operational coordination mechanisms, not sovereignty claims.</p>
    <div class="callout callout-warning">
      <div class="callout-label">Regulatory Horizon Risk — What Executives Must Watch</div>
      <p>The 2025–2030 period is likely to see regulatory development in space traffic management, ISAM licensing, and the legal framework for near-Moon operations. Any commercial space business with operations or planned operations in these areas is operating with material regulatory uncertainty. The prudent executive approach: engage with the regulatory development process (FAA, Department of Commerce, and UNCOPUOS all have formal public engagement mechanisms), understand which aspects of the regulatory framework your business model depends on, and build commercial agreements that can adapt to regulatory changes rather than assuming the current framework is stable.</p>
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
    <h1 class="seg-header-title">FAA Part 450:<br>From <em>Prescriptive</em><br>to Performance</h1>
    <p class="seg-header-subtitle">The most significant U.S. commercial space regulatory reform since 1984. What drove it, what changed, what it means — and whether it worked.</p>
    <div class="seg-header-tags">
      <span class="tag-lo tag">LO3.2 · LO3.3 · LO3.6 — Evaluate</span>
      <span class="tag">Case Study</span>
      <span class="tag">Part 450</span>
      <span class="tag">Regulatory Reform</span>
    </div>
  </div>
  <div class="seg-body">
    <div class="callout callout-insight">
      <div class="callout-label">How to Use This Case</div>
      <p>This case examines a real regulatory reform from its development through its implementation. Read it as a strategic analysis, not a technical briefing. The questions at the end ask you to reason about regulatory design choices, not to recall regulatory details.</p>
    </div>

    <h2>Part I — The Problem FAA Was Trying to Solve</h2>
    <p>By 2015, the U.S. commercial space regulatory framework had a structural problem. The prescriptive rules written in the 2000s — Parts 415, 431, and 435 — were designed for a specific set of vehicle types and operational models that represented the commercial space market of that era. They were written for expendable launch vehicles operating on standard trajectories from licensed government ranges. They were not designed for:</p>
    <ul>
      <li>Reusable launch vehicles with propulsive landing (Falcon 9 booster recovery was already operational by 2015)</li>
      <li>Horizontal air-launch systems (Stratolaunch was in development; Virgin Orbit's LauncherOne was in design)</li>
      <li>Launches from private, non-government ranges with novel infrastructure</li>
      <li>Novel vehicle architectures (VTVL suborbital, winged reentry vehicles, etc.)</li>
      <li>High-cadence operations requiring rapid re-authorization</li>
    </ul>
    <p>The result was that innovative operators spent enormous resources demonstrating compliance with prescriptive rules that didn't fit their vehicles, seeking equivalency determinations and special conditions that had to be negotiated case-by-case. The regulatory cost of innovation was high — and the FAA's review workload was growing faster than its staffing.</p>

    <h2>Part II — The Regulatory Development Process (2015–2019)</h2>
    <p>FAA/AST initiated the rulemaking for what would become Part 450 in 2015. The development process was notably collaborative: over four years, AST engaged in extensive consultation with the commercial industry through public workshops, industry working groups, and formal notice-and-comment periods. The core regulatory design choice was to move from prescribing how operators must demonstrate safety (specific methods for trajectory analysis, specific FTS requirements) to prescribing what safety outcome operators must achieve (Ec ≤ 1 × 10⁻⁴, with operator flexibility to demonstrate compliance by any technically valid method).</p>
    <p>This shift is the difference between prescriptive and performance-based regulation. The analogy: a prescriptive building code says "you must use 2x4 studs on 16-inch centers." A performance-based code says "the wall must support 40 lbs/sq ft load." The structural engineer can meet the performance standard using any validated structural approach — 2x4 studs, 2x6 studs, engineered lumber, steel studs. The prescriptive code locks in a 1960s construction method; the performance code allows innovation while maintaining the safety standard.</p>
    <p>The final rule — the Launch and Reentry Licensing Requirements rule, creating 14 CFR Part 450 — was published in December 2020 and became effective in March 2021. It was the first comprehensive revision of the commercial launch licensing rules since the early 2000s.</p>

    <h2>Part III — What Changed Operationally</h2>
    <p>For operators, the transition to Part 450 meant a different — and more demanding — licensing engagement. Under the prescriptive rules, operators could follow the FAA's specified methods and know they were compliant. Under Part 450, operators must develop their own compliance methodology, justify its technical validity to FAA, and demonstrate that it achieves the required outcome.</p>
    <p>Experienced operators with strong safety analysis capability — SpaceX, Blue Origin, Rocket Lab — found Part 450 genuinely enabling. They could use their own validated analysis methods, which were often more sophisticated than the prescriptive methods, and demonstrate compliance more efficiently. Smaller operators and new entrants found the transition more difficult: the performance-based approach requires more sophisticated analytical capability in-house, because the FAA no longer tells you exactly how to do the analysis.</p>
    <p>For FAA, Part 450 reduced the case-by-case negotiation burden for novel vehicles — but increased the analytical complexity of each review, because reviewers must now evaluate operator-proposed methodologies rather than checking compliance against prescribed methods. The FAA's investment in reviewer training and analytical tooling has not kept pace with the licensing volume growth, creating review backlogs that are a continuing industry concern.</p>

    <h2>Part IV — The Assessment (2021–2025)</h2>
    <p>Four years into Part 450's implementation, the assessment is mixed:</p>
    <ul>
      <li><strong>For innovative operators:</strong> Positive. Falcon 9's operator license, Starship's launch licensing, Rocket Lab's Electron certification — all have benefited from Part 450 flexibility.</li>
      <li><strong>For new operators:</strong> Challenging. The performance-based framework demands analytical sophistication that new entrants may not have. The pre-application consultation process (which FAA offers to help new operators develop their approach) is valuable but adds time.</li>
      <li><strong>For the FAA:</strong> Partially effective. Review quality has improved for complex novel vehicles. But review timelines remain a concern, and the FAA's staffing investment has not kept up with market growth.</li>
      <li><strong>For public safety:</strong> No data yet suggesting Part 450 has reduced safety — but the performance-based framework's adequacy for the next generation of very-high-cadence reusable operations has not been tested at scale.</li>
    </ul>

    <div class="callout callout-warning">
      <div class="callout-label">Analysis Questions</div>
      <div class="analysis-questions">
        <div class="aq-item">
          <div class="aq-num">Q1</div>
          <p>The move from prescriptive to performance-based regulation shifts the compliance burden from the regulator (who specifies the method) to the operator (who must define and justify the method). Who benefits from this shift, and who is disadvantaged? Consider both large established operators and new entrants.</p>
        </div>
        <div class="aq-item">
          <div class="aq-num">Q2</div>
          <p>FAA's review staffing has not kept pace with the growth in licensing volume. Should the response be to hire more government reviewers, to allow industry-funded third-party review, or to change the regulatory model? What are the risks of each approach?</p>
        </div>
        <div class="aq-item">
          <div class="aq-num">Q3</div>
          <p>Part 450's performance-based framework was designed to remain valid as technology changes. A new vehicle type emerges that the existing performance standards do not adequately capture. How should the FAA respond — and how quickly can it respond under current rulemaking procedures?</p>
        </div>
        <div class="aq-item">
          <div class="aq-num">Q4</div>
          <p>You are the head of regulatory affairs for a commercial launch operator. Your legal team tells you that your new vehicle can achieve Ec ≤ 1 × 10⁻⁴ using an analytical method the FAA has never seen before. Your business case requires the license within 120 days. What is your regulatory strategy?</p>
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
    <h1 class="seg-header-title">Module 3<br><em>Knowledge Check</em></h1>
    <p class="seg-header-subtitle">Apply what you've learned about the legal framework, licensing, and regulatory architecture of commercial space.</p>
    <div class="seg-header-tags">
      <span class="tag">LO3.1 · LO3.2 · LO3.3 · LO3.4 · LO3.5 · LO3.6</span>
      <span class="tag">Assessment</span>
    </div>
  </div>
  <div class="seg-body" id="quizContainer">
    <!-- Quiz rendered by initQuiz() -->
  </div>
</div>`;
