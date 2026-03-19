// Course App — ISU–GSA Spaceport Leadership Series
// Manages: segment navigation, progress tracking, quiz logic, state persistence

const CourseApp = (function() {

  // ── STATE ────────────────────────────────────────────────────────
  const STATE_KEY = 'isu_gsa_m1_progress';

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
    { id: 'intro',   code: 'INTRO',  name: 'Course Opener',                       dur: '8 min',  group: 'Introduction' },
    { id: 's1-1',    code: '1.1',    name: 'What Is a Spaceport?',                 dur: '12 min', group: 'Module 1 — The Strategic Site' },
    { id: 's1-2',    code: '1.2',    name: 'The Spaceport Ecosystem',              dur: '10 min', group: 'Module 1 — The Strategic Site' },
    { id: 's1-3',    code: '1.3',    name: 'Site Selection — Seven Drivers',       dur: '18 min', group: 'Module 1 — The Strategic Site' },
    { id: 's1-4',    code: '1.4',    name: 'Core Launch Infrastructure',           dur: '15 min', group: 'Module 1 — The Strategic Site' },
    { id: 's1-5',    code: '1.5',    name: 'Supporting Systems',                   dur: '12 min', group: 'Module 1 — The Strategic Site' },
    { id: 's1-6',    code: '1.6',    name: 'The Reusability Revolution',           dur: '14 min', group: 'Module 1 — The Strategic Site' },
    { id: 's1-7',    code: '1.7',    name: 'Future Trends',                        dur: '12 min', group: 'Module 1 — The Strategic Site' },
    { id: 's1-8',    code: '1.8',    name: 'Environment & Community',              dur: '10 min', group: 'Module 1 — The Strategic Site' },
    { id: 'case',    code: 'CASE',   name: 'Case Study — Spaceport America',       dur: '20 min', group: 'Case Study' },
    { id: 'check',   code: 'CHECK',  name: 'Module Knowledge Check',               dur: '10 min', group: 'Assessment' },
  ];

  // ── QUIZ DATA ────────────────────────────────────────────────────
  const QUIZ = [
    {
      id: 'q1',
      lo: 'LO1.2',
      text: 'Which of the following best describes the primary operational difference between a vertical launch site and a horizontal launch site?',
      options: [
        { id: 'a', text: 'Vertical sites are exclusively government-owned and operated.' },
        { id: 'b', text: 'Horizontal sites use aircraft-based release systems and require runways; vertical sites use ground ignition from fixed or mobile pads.' },
        { id: 'c', text: 'Vertical sites can only support suborbital flights due to structural constraints.' },
        { id: 'd', text: 'Horizontal sites cannot achieve orbital trajectories under any vehicle configuration.' },
      ],
      correct: 'b',
      rationale: 'Correct. Horizontal launch relies on a carrier aircraft to lift the rocket to altitude before release and ignition. Vertical launch uses ground-based ignition. Both can, in principle, achieve orbital trajectories with appropriate vehicles — the choice of orientation affects infrastructure requirements and operational profile, not trajectory capability per se.',
    },
    {
      id: 'q2',
      lo: 'LO1.1',
      text: 'A proposed spaceport site is 200 miles from the nearest population center. A technical review identifies that the most efficient launch azimuths pass over three mid-sized cities in the first 60 seconds of flight. What is the most significant regulatory implication?',
      options: [
        { id: 'a', text: 'The site is automatically disqualified under FAA regulations.' },
        { id: 'b', text: 'The operator must demonstrate an Expected Casualty (Ec) value below 1×10⁻⁴ per launch for the affected overflight areas under FAA Part 417.' },
        { id: 'c', text: 'The FAA requires the operator to purchase life insurance policies for all residents in the overflight corridor.' },
        { id: 'd', text: 'The site requires a Congressional waiver before a launch license can be considered.' },
      ],
      correct: 'b',
      rationale: 'Correct. FAA regulation 14 C.F.R. Part 417 establishes the Expected Casualty (Ec) standard: the probability that a member of the public is killed by debris from a failed launch must be less than 1 in 10,000 per launch attempt. Inland sites are not automatically disqualified — they must demonstrate Ec compliance through a quantitative risk analysis.',
    },
    {
      id: 'q3',
      lo: 'LO1.2',
      text: 'SpaceX has announced a 24-hour turnaround target for its Starship launch vehicle. Which spaceport infrastructure characteristic is MOST critical to enabling this cadence?',
      options: [
        { id: 'a', text: 'A larger and deeper flame trench to dissipate more acoustic energy.' },
        { id: 'b', text: 'A second backup launch pad in case the primary pad is unavailable.' },
        { id: 'c', text: 'Redundant cryogenic propellant storage with fast-fill capability to reload the vehicle without removing it from the pad.' },
        { id: 'd', text: 'Closer proximity to the equator to reduce the energy required for geostationary orbit.' },
      ],
      correct: 'c',
      rationale: 'Correct. The propellant replenishment cycle is the primary operational bottleneck for rapid reusable vehicle turnaround. A 24-hour turnaround requires on-site high-volume cryogenic storage with fast-fill systems. Flame trench size, pad geometry, and latitude affect other operational parameters but are not the binding constraint on turnaround cadence.',
    },
    {
      id: 'q4',
      lo: 'LO1.6',
      text: 'The FAA\'s environmental review of SpaceX\'s Starship program at Boca Chica resulted in a set of mitigation measures as conditions of the launch license. SpaceX subsequently launched without fully complying with those measures. What was the legal consequence?',
      options: [
        { id: 'a', text: 'The FAA issued a warning letter but took no further action as it was a first offense.' },
        { id: 'b', text: 'The FAA initiated an anomaly investigation and imposed a temporary launch suspension pending SpaceX\'s demonstration of compliance.' },
        { id: 'c', text: 'The environmental mitigation measures were deemed advisory rather than enforceable under NEPA.' },
        { id: 'd', text: 'The state of Texas overrode the federal finding under state sovereignty provisions.' },
      ],
      correct: 'b',
      rationale: 'Correct. Environmental commitments made during the NEPA permitting process are enforceable conditions of an FAA launch license — not aspirational targets. The FAA investigation and temporary launch suspension following the Starship OFT-2 non-compliance is a documented example of regulatory enforcement with direct commercial consequences.',
    },
    {
      id: 'q5',
      lo: 'LO1.4',
      text: 'The shift from the "campaign model" to the "airline model" in launch operations primarily changes which aspect of spaceport infrastructure requirements?',
      options: [
        { id: 'a', text: 'The required length and load-bearing capacity of the launch pad foundation.' },
        { id: 'b', text: 'The geographic requirements for launch azimuth and orbital inclination.' },
        { id: 'c', text: 'The need for infrastructure designed for sustained high-tempo operations — fast-fill propellant systems, modular access, and built-in redundancy rather than batch-campaign tooling.' },
        { id: 'd', text: 'The regulatory burden under FAA Part 420 for launch site licensing.' },
      ],
      correct: 'c',
      rationale: 'Correct. The airline model requires facilities to turn vehicles around in hours rather than months. This changes the operational profile of every supporting system — propellant logistics, pad access, maintenance tooling, and redundancy architecture. Facilities designed for the campaign model become throughput bottlenecks when operated at airline cadence.',
    },
    {
      id: 'q6',
      lo: 'LO1.5',
      text: 'Autonomous Flight Safety Systems (AFSS) represent a significant change to range safety practice. What is the primary operational advantage of AFSS over the traditional human-staffed range safety model?',
      options: [
        { id: 'a', text: 'AFSS eliminates the need for the FAA to review or approve flight termination criteria for each launch.' },
        { id: 'b', text: 'AFSS processes flight path data and can activate the Flight Termination System in microseconds, compared to hundreds of milliseconds for a ground command — a difference of kilometers of flight path at orbital speeds.' },
        { id: 'c', text: 'AFSS allows launch vehicles to fly over populated areas without the standard Ec requirement.' },
        { id: 'd', text: 'AFSS is exclusively used for suborbital vehicles and does not apply to orbital launch operations.' },
      ],
      correct: 'b',
      rationale: 'Correct. Response time is the critical AFSS advantage. At orbital velocities of 7+ km/s, the difference between microsecond autonomous response and hundred-millisecond command propagation is several kilometers of vehicle travel — a meaningful safety margin in terms of debris dispersion area.',
    },
    {
      id: 'q7',
      lo: 'LO1.1',
      text: 'New Mexico\'s Spaceport America was financed through a mechanism that has been studied as a model for commercial spaceport public finance. Which of the following correctly describes that mechanism?',
      options: [
        { id: 'a', text: 'A federal grant from NASA\'s Commercial Space Transportation program, administered through the FAA.' },
        { id: 'b', text: 'A state general obligation bond backed by New Mexico\'s full faith and credit.' },
        { id: 'c', text: 'A voter-approved county gross receipts tax enabled by a state constitutional amendment, generating a dedicated revenue stream securitized as tax-exempt municipal bonds.' },
        { id: 'd', text: 'A public-private partnership in which Virgin Galactic contributed 50% of construction costs in exchange for a 50-year exclusivity agreement.' },
      ],
      correct: 'c',
      rationale: 'Correct. The Spaceport America financing structure — constitutional amendment, voter-approved county gross receipts tax, municipal bond securitization — is documented in the New Mexico Spaceport Authority Act (N.M. Stat. Ann. § 58-31-1) and represents a genuine innovation in public infrastructure finance for commercial space.',
    },
    {
      id: 'q8',
      lo: 'LO1.3',
      text: 'An executive is evaluating a spaceport development proposal for an inland site in the southwestern United States. The site has excellent weather, very low population density, and proximity to a military range with shared range safety infrastructure. The proposal projects 15 launches per year within three years. Which is the most important additional analysis required before the financial model can be credibly assessed?',
      options: [
        { id: 'a', text: 'An architectural feasibility study to determine the optimal pad configuration for the site\'s soil conditions.' },
        { id: 'b', text: 'A detailed stress-test of the anchor tenant model: specifically, what the financial model shows under scenarios where anchor tenant commercial operations are delayed by two years, five years, and ten years from projection.' },
        { id: 'c', text: 'A competitive analysis of other spaceports in the region to assess market share potential.' },
        { id: 'd', text: 'A workforce availability study to confirm that sufficient range safety officers are available within commuting distance.' },
      ],
      correct: 'b',
      rationale: 'Correct. This question applies the central analytical lesson of the Spaceport America case study. Site characteristics and market projections may be sound, but the financial model\'s sensitivity to anchor tenant timing is the most common and most consequential analytical gap in spaceport investment proposals. Historical data on aerospace development programs shows that timelines are systematically underestimated — stress-testing the model against delay scenarios is the minimum responsible analytical step.',
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

    // Mark previous as complete when navigating away
    if (state.currentSegment !== id) markCompleted(state.currentSegment);

    // Load content
    const container = document.getElementById('segmentContainer');
    if (!container) return;

    container.style.opacity = '0';
    container.style.transform = 'translateY(8px)';

    setTimeout(() => {
      loadSegmentContent(id, container);
      renderSidebar(id);
      renderProgress();
      renderTopbar(seg);
      // Defer nav footer until after content renders (needs DOM node to exist)
      setTimeout(() => renderNavFooter(id), 20);

      container.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      container.style.opacity = '1';
      container.style.transform = 'translateY(0)';

      // Scroll to top
      const main = document.getElementById('courseMain');
      if (main) main.scrollTop = 0;
    }, 150);
  }

  // ── SEGMENT CONTENT REGISTRY ─────────────────────────────────────
  function loadSegmentContent(id, container) {
    const contentFn = CONTENT[id];
    if (contentFn) {
      container.innerHTML = contentFn();
      // Init any interactive elements
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

    // Score display
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
            <div class="kc-title">Module 1 Knowledge Check</div>
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

    // Update UI
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
    // Show completion screen
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
          The Strategic Site
        </h1>
        <p style="color:var(--slate-light); font-size:1rem; max-width:50ch; margin:0 auto 2rem; line-height:1.75;">
          You've completed Module 1 of the ISU–GSA Global Spaceport Leadership Series.
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
          <div style="font-family:var(--font-display); font-size:1.4rem; color:var(--white); margin-bottom:0.5rem;">Module 2 — The Gateway Machine</div>
          <div style="font-size:0.85rem; color:var(--slate-light);">Operations &amp; Staffing · ~2.5 hours · Coming soon</div>
        </div>
        <a href="index.html" class="btn-ghost">← Back to course home</a>
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
      <span class="seg-header-meta">8 min · Context only</span>
    </div>
    <h1 class="seg-header-title">Welcome to the<br><em>Global Spaceport</em><br>Leadership Series</h1>
    <p class="seg-header-subtitle">Opened by George Nield, President, Global Spaceport Alliance &amp; John Wensveen, President, ISU</p>
    <div class="seg-header-tags">
      <span class="tag">ISU × GSA</span>
      <span class="tag">Module 1 of 6</span>
      <span class="tag">Executive Certificate</span>
    </div>
  </div>
  <div class="seg-body">
    <div class="callout callout-insight">
      <div class="callout-label">About this opener</div>
      <p>This segment features recorded remarks from George Nield (President, GSA; former FAA Associate Administrator for Commercial Space Transportation) and John Wensveen (President, ISU). In this web edition, key points from their remarks are presented as a reading. The full video will be available in the LMS-hosted version.</p>
    </div>
    <h2>From George Nield — Global Spaceport Alliance</h2>
    <p>The commercial spaceport industry is at an inflection point unlike anything we've seen in the history of spaceflight. For most of the past sixty years, the question of where rockets launch from was a government decision — driven by national security, by Cold War imperatives, by the priorities of agencies whose primary job was reaching space, not running a commercial business. That era is not over, but it is ending.</p>
    <p>What we're watching now is the emergence of a genuine commercial spaceport industry — multi-user facilities competing for operators, governors approving bond financing, investment banks running due diligence on launch site infrastructure, lawyers drafting agreements that have no precedent to draw from. The decisions being made right now about where to build, how to finance, how to govern, and who to partner with will define the global launch infrastructure for the next fifty years.</p>
    <p>The people making those decisions need a foundation. Not a general survey of aerospace history. Not a technical briefing for engineers. A decision-making foundation — the kind of rigorous, applied understanding that lets a mayor, an investor, a senior counsel, or a corporate executive walk into a room with a spaceport operator and engage as a peer.</p>
    <p>That's what this program is. And that's why the Global Spaceport Alliance is proud to co-deliver it with ISU.</p>
    <div class="pull-quote">
      <div class="pull-quote-text">"The decisions being made right now will define the global launch infrastructure for the next fifty years."</div>
      <div class="pull-quote-attr">George Nield — President, Global Spaceport Alliance · Former FAA Associate Administrator for Commercial Space Transportation</div>
    </div>
    <h2>From John Wensveen — International Space University</h2>
    <p>For 38 years, the International Space University has trained the people who lead, build, and govern the global space sector. Our alumni run space agencies, lead commercial launch companies, advise governments, and sit on the boards of the most consequential space enterprises in the world. That network — that community of practice — is part of what you are joining when you earn an ISU credential.</p>
    <p>This program is different from anything ISU has offered before, and different from anything available elsewhere in the world. It is specialized, applied, and designed for executives — not students. Every module is built around a specific domain of spaceport leadership, grounded in current practice, and anchored to the real decisions that real leaders in this sector face.</p>
    <p>When you complete this program, you will not just know more about spaceports. You will think differently about infrastructure, governance, risk, and opportunity in one of the fastest-moving sectors in the global economy.</p>
    <p>Welcome to the ISU–GSA Global Spaceport Leadership Series. Let's begin.</p>
    <h2>How This Course Works</h2>
    <p>Module 1 — The Strategic Site — is the foundation for everything that follows. Before you can evaluate a spaceport investment, navigate licensing, or structure a partnership, you need to understand what a spaceport actually is: not the colloquial image of a rocket launch site, but a complex, multi-use infrastructure asset with specific physical, regulatory, and operational characteristics that distinguish it from every other category of industrial facility.</p>
    <p>This module contains eight content segments, a Harvard-style case study on Spaceport America, and an eight-question knowledge check. Navigate using the sidebar. Each segment takes 10–18 minutes. The module is designed to be completed in two sessions.</p>
    <div class="callout callout-insight">
      <div class="callout-label">Learning outcomes — Module 1</div>
      <p>By the end of this module you will be able to: classify any spaceport using a four-axis framework; apply a seven-driver site selection analytical model; describe core infrastructure components; assess the implications of reusable vehicles on facility design; evaluate emerging trends including digital twins and autonomous range operations; and articulate environmental and community obligations under NEPA and international law.</p>
    </div>
  </div>
  <div id="segNavFooter"></div>
</div>`;

CONTENT['s1-1'] = () => `
<div class="segment-content">
  <div class="seg-header">
    <div class="seg-header-eyebrow">
      <span class="seg-header-code">SEGMENT 1.1</span>
      <span class="seg-header-meta">12 min · ~1,560 words</span>
    </div>
    <h1 class="seg-header-title">What Is a<br><em>Spaceport?</em></h1>
    <p class="seg-header-subtitle">Typology, taxonomy, and the four-axis classification system every executive needs.</p>
    <div class="seg-header-tags">
      <span class="tag-lo tag">LO1.2 — Understand</span>
      <span class="tag">Classification</span>
      <span class="tag">Vocabulary</span>
    </div>
  </div>
  <div class="seg-body">
    <p>Let's start with a question that sounds simple but turns out to be surprisingly consequential: <strong>what exactly is a spaceport?</strong></p>
    <p>If you picture Kennedy Space Center — the 39-square-mile NASA complex in Florida, the Vehicle Assembly Building visible from miles away — that's one answer. It is not the only answer, and for our purposes as decision-makers, it's not even the most useful one.</p>
    <p>A spaceport, in the FAA's most precise regulatory definition, is <em>a location on Earth from which a launch takes place</em> (14 C.F.R. § 420.5). That definition covers an enormous range — from Kennedy Space Center to a converted general aviation airfield in the Mojave Desert, to a ship-launched platform in the Pacific Ocean. The word describes a <strong>category of function, not a standard of configuration</strong>.</p>
    <p>One of the most common errors in decision-making about this sector is anchoring on one mental image and filtering everything else through that lens. What we need is a proper classification system.</p>
    <h2>The Four-Axis Framework</h2>
    <p>Four axes let you position any spaceport within an analytical framework — so that when you encounter a proposal, a press release, or a pitch deck, you know immediately what kind of asset you're looking at and what questions to ask.</p>
    <div class="axis-grid">
      <div class="axis-card">
        <span class="axis-num">AXIS 01</span>
        <div class="axis-title">Trajectory Type</div>
        <div class="axis-body"><strong>Orbital</strong> — reaching orbital velocity (~7.9 km/s); sustained flight around Earth. Large vehicles, complex infrastructure, full FAA licensing.<br><br><strong>Suborbital</strong> — reaching space altitude (~100 km, the Kármán line) but not orbital velocity. Parabolic flight path; substantially different infrastructure and regulatory pathway.</div>
      </div>
      <div class="axis-card">
        <span class="axis-num">AXIS 02</span>
        <div class="axis-title">Vehicle Orientation</div>
        <div class="axis-body"><strong>Vertical</strong> — fixed or mobile launch pad, ground ignition. Operationally closer to heavy industry than airports. Capital-intensive, purpose-built infrastructure.<br><br><strong>Horizontal</strong> — aircraft carrier vehicle, airborne release and ignition. Requires runway and aircraft maintenance. Infrastructure closer to airports; capital weighted toward the vehicle.</div>
      </div>
      <div class="axis-card">
        <span class="axis-num">AXIS 03</span>
        <div class="axis-title">User Model</div>
        <div class="axis-body"><strong>Single-user</strong> — dedicated to one operator. Infrastructure optimized for that vehicle and mission profile. SpaceX Starbase at Boca Chica is the defining example.<br><br><strong>Multi-user</strong> — serves multiple operators under shared infrastructure. Complex scheduling, governance, and liability structures. Dominant model for government-owned facilities.</div>
      </div>
      <div class="axis-card">
        <span class="axis-num">AXIS 04</span>
        <div class="axis-title">Ownership &amp; Operations</div>
        <div class="axis-body"><strong>GOGO</strong> — Government-owned, government-operated. Vandenberg, Cape Canaveral, Wallops Island.<br><br><strong>GOCO</strong> — Government-owned, contractor-operated. Spaceport America (New Mexico).<br><br><strong>Private</strong> — fully commercial ownership and operations. SpaceX Starbase, Rocket Lab Mahia (NZ).</div>
      </div>
    </div>
    <div class="callout callout-insight">
      <div class="callout-label">Executive Application</div>
      <p>These four axes produce at least sixteen theoretical combinations — and real spaceports occupy every quadrant. <strong>Spaceport America</strong> is multi-user, horizontal and vertical, GOCO. <strong>SpaceX Starbase</strong> is single-user, vertical, private. <strong>SaxaVord Spaceport</strong> (Shetland, UK) is multi-user, vertical, private with public subsidy. These are not the same business, not the same investment, and not the same regulatory environment. The taxonomy is your first analytical tool.</p>
    </div>
    <h2>Why the Classification Matters</h2>
    <p>The classification exercise is not a vocabulary exercise. It is a <strong>business model exercise</strong>. Each axis has direct implications for capital requirements, revenue model, regulatory burden, and competitive positioning.</p>
    <p>A multi-user facility must solve scheduling, liability allocation, and infrastructure cost-sharing problems that a single-user facility never faces. A horizontal facility has a fundamentally different capital structure than a vertical one — more in the aircraft, less in the ground. A GOCO governance model creates accountability structures between the government owner and the operating contractor that shape everything from maintenance standards to operator relationship management.</p>
    <p>When you encounter a spaceport development proposal, the four axes give you the first due diligence questions to ask — before you read the financial model, before you assess the site, before you evaluate the operator relationships. What trajectory? What orientation? How many users? Who owns and operates it?</p>
    <p>Those four answers tell you more about the asset's risk profile and commercial potential than any amount of marketing language.</p>
    <div class="data-table-wrap">
      <table class="data-table">
        <thead><tr><th>Facility</th><th>Trajectory</th><th>Orientation</th><th>User Model</th><th>Ownership</th></tr></thead>
        <tbody>
          <tr><td><strong>Kennedy Space Center LC-39A</strong></td><td>Orbital</td><td>Vertical</td><td>Single (SpaceX)</td><td>GOCO</td></tr>
          <tr><td><strong>Spaceport America, NM</strong></td><td>Sub + planned orbital</td><td>Horizontal (primary)</td><td>Multi-user (designed)</td><td>GOCO</td></tr>
          <tr><td><strong>SpaceX Starbase, TX</strong></td><td>Orbital</td><td>Vertical</td><td>Single-user</td><td>Private</td></tr>
          <tr><td><strong>Rocket Lab Mahia, NZ</strong></td><td>Orbital (small)</td><td>Vertical</td><td>Single-user</td><td>Private</td></tr>
          <tr><td><strong>SaxaVord, Shetland UK</strong></td><td>Orbital (small)</td><td>Vertical</td><td>Multi-user</td><td>Private + public grant</td></tr>
          <tr><td><strong>Guiana Space Centre, Kourou</strong></td><td>Orbital</td><td>Vertical</td><td>Multi-user</td><td>Government (ESA/France)</td></tr>
        </tbody>
      </table>
    </div>
  </div>
  <div id="segNavFooter"></div>
</div>`;

CONTENT['s1-2'] = () => `
<div class="segment-content">
  <div class="seg-header">
    <div class="seg-header-eyebrow">
      <span class="seg-header-code">SEGMENT 1.2</span>
      <span class="seg-header-meta">10 min · ~1,300 words</span>
    </div>
    <h1 class="seg-header-title">The Spaceport<br><em>Ecosystem</em></h1>
    <p class="seg-header-subtitle">Who builds, who operates, who uses — and why every decision ripples through all of them.</p>
    <div class="seg-header-tags">
      <span class="tag-lo tag">LO1.2 — Understand</span>
      <span class="tag">Stakeholders</span>
      <span class="tag">Commercial Structure</span>
    </div>
  </div>
  <div class="seg-body">
    <p>A spaceport doesn't exist in isolation. It sits at the center of an ecosystem of stakeholders — each with different interests, different risk tolerances, and different definitions of success. Understanding this ecosystem is not a soft skill. It is a prerequisite for any consequential decision in this sector.</p>
    <h2>Launch Operators</h2>
    <p>The launch operator owns and flies the rocket. SpaceX, Rocket Lab, ULA, Arianespace, Blue Origin. Their primary interest in the spaceport is <strong>reliability and throughput</strong> — they need the pad ready when they need it, propellant available, range safety processed on schedule, and turnaround time compatible with their business model.</p>
    <p>The relationship between a launch operator and a spaceport is often closer to a <em>landlord-tenant</em> relationship than a customer-service one. Operators bring their own ground support equipment, their own processing crews, often their own range safety systems. The spaceport provides real estate, shared infrastructure, and the regulatory framework.</p>
    <h2>Payload Customers</h2>
    <p>The payload customer's satellite or spacecraft is on the rocket. Government agencies (NASA, DoD, NRO), commercial satellite operators (SES, Intelsat, Iridium), technology companies (Amazon Project Kuiper, Starlink), scientific institutions, and private passengers. Payload customers don't interact with the spaceport directly — they contract with the launch operator. But their demand drives launch cadence, which drives spaceport utilization, which determines the facility's commercial viability.</p>
    <h2>Government Agencies — Multiple Roles Simultaneously</h2>
    <p>Government agencies are present in this ecosystem in multiple, sometimes conflicting roles. <strong>The FAA</strong> regulates launch site licensing, range safety, and environmental compliance — as a regulator, its interest is public safety and orderly market development. <strong>The Department of Defense</strong> is simultaneously a major customer and a provider of shared range infrastructure. <strong>State economic development agencies</strong> want job creation, tax base expansion, and regional economic multipliers. <strong>NASA</strong> is both a customer and a technical partner.</p>
    <p>Executives who treat "government" as a monolith misread the landscape entirely. A project might receive enthusiastic support from a state economic development agency, face resistance from a state environmental agency, and encounter lengthy processing times at the FAA — all simultaneously, all within the "government" category.</p>
    <h2>Infrastructure Investors</h2>
    <p>The capital formation challenge in spaceport development is significant. A greenfield orbital launch facility requires hundreds of millions to billions of dollars — most of it in highly specialized assets that have limited alternative use if the commercial model fails. The flame trench is not repurposable. Cryogenic propellant storage is not a general-use asset.</p>
    <p>This illiquidity is why public financing has historically dominated spaceport development. But the model is evolving. Infrastructure funds with mandates for long-duration assets at the frontier of transportation development are increasingly engaged. The investment thesis rests on one key assumption: that launch cadence will increase dramatically over the next two decades. Whether that assumption holds is <strong>the central risk question in spaceport infrastructure investment</strong>, examined in detail in Module 4.</p>
    <h2>Communities and Workforce</h2>
    <p>The communities adjacent to spaceport facilities are not passive recipients of economic development. They are stakeholders whose support is operationally necessary and whose opposition can — and has — materially delayed or blocked development. The workforce requirements of commercial spaceport operations are specialized and local availability is rarely sufficient. Proximity to universities with aerospace and engineering programs has become an increasingly explicit factor in site selection.</p>
    <div class="callout callout-insight">
      <div class="callout-label">The Ecosystem Map as an Analytical Tool</div>
      <p>The ecosystem map is not just an organizational chart. It's a map of dependencies, incentives, and potential conflicts. Every decision in spaceport development — where to site, how to finance, how to govern, who to partner with — has implications that ripple through every part of this ecosystem. The executive who understands the map is the one who can anticipate where friction will arise and where leverage exists.</p>
    </div>
  </div>
  <div id="segNavFooter"></div>
</div>`;

CONTENT['s1-3'] = () => `
<div class="segment-content">
  <div class="seg-header">
    <div class="seg-header-eyebrow">
      <span class="seg-header-code">SEGMENT 1.3</span>
      <span class="seg-header-meta">18 min · ~2,340 words · Highest cognitive load</span>
    </div>
    <h1 class="seg-header-title">Site Selection —<br>The <em>Seven Drivers</em></h1>
    <p class="seg-header-subtitle">The most consequential and irreversible decision in spaceport development. A rigorous framework for evaluating any site.</p>
    <div class="seg-header-tags">
      <span class="tag-lo tag">LO1.1 — Analyze</span>
      <span class="tag">Site Selection</span>
      <span class="tag">Due Diligence</span>
      <span class="tag">FAA Part 417</span>
    </div>
  </div>
  <div class="seg-body">
    <p>Site selection is the most consequential and most irreversible decision in spaceport development. Unlike almost any other infrastructure asset, a spaceport cannot be meaningfully relocated after construction. The orbital mechanics that make a site viable — or unviable — are fixed by geography and physics. A mistake in site selection is not corrected in Phase 2. It is lived with for the life of the asset.</p>
    <p>And yet site selection decisions are regularly made with inadequate analytical rigor — driven by political considerations, land availability, or the enthusiasm of local economic development officials rather than the technical and regulatory criteria that will determine whether the facility can operate, attract customers, and generate a return.</p>
    <p>The seven-driver framework below is a due diligence checklist. Apply it to any proposed or existing site. It will tell you more than the developer's prospectus.</p>
    <div class="driver-list">
      <div class="driver-card">
        <div class="driver-num">01</div>
        <div class="driver-body">
          <div class="driver-title">Launch Azimuth &amp; Orbital Inclination</div>
          <p class="driver-text">The azimuth — the compass bearing at liftoff — determines which orbital inclinations are achievable. <strong>Equatorial orbits</strong> (0°, geostationary comms satellites) require eastward azimuths and benefit from equatorial latitude. <strong>Polar orbits</strong> (90°, Earth observation) require north-south azimuths. <strong>Sun-synchronous orbits</strong> (~98°, climate monitoring, remote sensing) require slightly retrograde azimuths. The flight corridor must not pass over densely populated areas during Max-Q — the period of maximum aerodynamic pressure in the first 60–90 seconds after liftoff. FAA regulation Part 417 requires an Expected Casualty (Ec) value below <strong>1×10⁻⁴ per launch</strong> for all overflight areas. This is why coastal sites dominate global launch infrastructure — the ocean is the population buffer.</p>
        </div>
      </div>
      <div class="driver-card">
        <div class="driver-num">02</div>
        <div class="driver-body">
          <div class="driver-title">Geography &amp; Physical Terrain</div>
          <p class="driver-text">Terrain determines pad construction cost, drainage requirements, seismic risk, and the feasibility of required safety buffer zones. Launch pad foundations must support structures weighing tens of thousands of tons and withstand the acoustic and thermal shock of engine ignition. Coastal geography creates engineering challenges (salt spray corrosion, storm surge, sea-level rise) but provides critical safety advantages. The 2022 Hurricane Ian assessment at Wallops Island, Virginia documented significant damage to range safety and propellant storage infrastructure — a material financial consideration for a 30–50 year asset.</p>
        </div>
      </div>
      <div class="driver-card">
        <div class="driver-num">03</div>
        <div class="driver-body">
          <div class="driver-title">Weather &amp; Climate</div>
          <p class="driver-text">Launch operations are constrained by upper-level wind shear (structural loads at Max-Q), ground-level winds, lightning (FAA launch commit criteria, Part 417 Appendix G), and visibility for range safety tracking. Cape Canaveral experiences approximately <strong>50 launch scrubs per year</strong> attributable to weather. The Florida summer thunderstorm season (June–September) is the primary driver. SpaceX's Boca Chica site selection was partially driven by lower lightning frequency. The UK's SaxaVord Spaceport faces average winds above 30 mph for significant portions of the year — a commercial constraint that was not adequately reflected in early business projections for several European commercial launch sites.</p>
        </div>
      </div>
      <div class="driver-card">
        <div class="driver-num">04</div>
        <div class="driver-body">
          <div class="driver-title">Airspace &amp; Maritime Coordination</div>
          <p class="driver-text">Every launch requires temporary airspace closure — a NOTAM that restricts commercial aviation for the launch window and recovery period. The FAA's environmental assessment for the Starship program documented formal objections from <strong>three major airlines</strong> to proposed closure frequencies, resulting in modified protocols that balance launch operator and commercial aviation economics. Maritime coordination through U.S. Coast Guard Marine Safety Information Bulletins creates parallel challenges for coastal sites where shipping lanes overlap the hazard area.</p>
        </div>
      </div>
      <div class="driver-card">
        <div class="driver-num">05</div>
        <div class="driver-body">
          <div class="driver-title">Regulatory &amp; Political Jurisdiction</div>
          <p class="driver-text">27 U.S. states have enacted some form of space commerce legislation as of 2024. New Mexico's Spaceport America was enabled by a state constitutional amendment and a voter-approved county gross receipts tax (N.M. Stat. Ann. § 58-31-1). Internationally, every nation hosting commercial launch is bound by the <strong>1967 Outer Space Treaty</strong> — Article VI places state responsibility for national operators, creating a direct accountability chain from commercial licensee to national government. The UK's Space Industry Act 2018 established a comprehensive domestic licensing framework in response to this obligation.</p>
        </div>
      </div>
      <div class="driver-card">
        <div class="driver-num">06</div>
        <div class="driver-body">
          <div class="driver-title">Infrastructure &amp; Connectivity</div>
          <p class="driver-text">A single orbital launch using liquid oxygen and liquid hydrogen requires <strong>10–50 MW of sustained power</strong> during the pre-launch sequence (AIAA-2019-5483). Road access must accommodate cryogenic propellant tankers (DOT hazardous materials classification, vibration sensitivity) and oversized vehicle components. Communications infrastructure must support real-time telemetry at gigabits per second during the launch window with dedicated fiber and full redundancy — this is a range safety system, not a utility.</p>
        </div>
      </div>
      <div class="driver-card">
        <div class="driver-num">07</div>
        <div class="driver-body">
          <div class="driver-title">Community &amp; Workforce</div>
          <p class="driver-text">Range safety officers, cryogenic technicians, and vehicle processing engineers are specialized roles not available in general labor markets. Proximity to universities with aerospace programs is now an explicit site selection factor. Community acceptance is a distinct risk — the Boca Chica experience, where SpaceX's development effectively displaced a small residential community, resulted in a formal FAA investigation into environmental non-compliance following the Starship OFT-2 launch, demonstrating that <strong>community and environmental commitments are enforceable conditions of the operating license</strong>, not aspirational targets.</p>
        </div>
      </div>
    </div>
    <div class="callout callout-legal">
      <div class="callout-label">Legal Precedent — Range Safety Authority</div>
      <p>In <em>Clearwater v. FAA</em> (D.C. Cir. 2003), the court upheld the FAA's authority to impose flight corridor population density requirements as a condition of launch site licensing, affirming that range safety analysis is a non-negotiable federal regulatory function that cannot be waived by state or local government. This precedent is directly relevant to any inland spaceport development proposal. [Verify citation via Westlaw before publication.]</p>
    </div>
    <h2>The Framework in Practice</h2>
    <p>No site scores perfectly on all seven drivers. Site selection is an optimization exercise under constraints, not a search for a perfect site. But certain drivers are disqualifying if deficiencies are sufficiently severe — and others can be mitigated through design, investment, or regulatory strategy.</p>
    <p>Launch azimuth and range safety compliance are effectively binary: either the site can demonstrate Ec compliance on commercially viable azimuths, or it cannot. Environmental and community obligations are not disqualifying in themselves — but underestimating them has delayed or derailed more spaceport projects than any other single factor.</p>
    <p>The framework's value is not in producing a score. It's in structuring the conversation — ensuring that every driver is explicitly on the table and that decision-makers understand not just which site ranks highest, but why, and what the residual risks are.</p>
  </div>
  <div id="segNavFooter"></div>
</div>`;

CONTENT['s1-4'] = () => `
<div class="segment-content">
  <div class="seg-header">
    <div class="seg-header-eyebrow">
      <span class="seg-header-code">SEGMENT 1.4</span>
      <span class="seg-header-meta">15 min · ~1,950 words</span>
    </div>
    <h1 class="seg-header-title">Core Launch<br><em>Infrastructure</em></h1>
    <p class="seg-header-subtitle">Pads, processing, range safety — what it actually takes to put a rocket in the air.</p>
    <div class="seg-header-tags">
      <span class="tag-lo tag">LO1.2 — Understand</span>
      <span class="tag">Launch Complex</span>
      <span class="tag">Payload Processing</span>
      <span class="tag">Range Safety</span>
    </div>
  </div>
  <div class="seg-body">
    <p>A modern orbital launch complex is not a platform. It is a system of interconnected systems — each precisely engineered, each with tolerances measured in fractions of an inch, each capable of being the single point of failure that grounds a launch campaign. Let's work through the primary components.</p>
    <h2>The Launch Complex</h2>
    <p>The launch complex includes a fixed launch table or mobile launch platform, a launch mount interfacing between vehicle and table, and <strong>hold-down release mechanisms</strong> that restrain the vehicle until the engines reach full thrust and all systems confirm readiness. The hold-down mechanism must be strong enough to hold millions of pounds of thrust — and then release simultaneously and instantaneously at the exact command. The timing tolerance is measured in milliseconds. A non-simultaneous release causes an asymmetric load that can damage the vehicle.</p>
    <h2>The Flame Trench &amp; Sound Suppression</h2>
    <p>Below the launch mount is the flame trench — a reinforced channel lined with refractory concrete rated for temperatures exceeding 3,500°F — that redirects engine exhaust away from the vehicle during ignition. The acoustic environment at ignition is extreme: without attenuation, the sound pressure levels would destroy the vehicle's own avionics. The solution is the water deluge system — tens of thousands of gallons per second released at ignition, converting acoustic energy into steam. <strong>NASA's system at LC-39B delivers 450,000 gallons in approximately 60 seconds</strong> (NASA KSC Master Plan, 2019). The steam cloud at launch is not exhaust — it's this water vaporizing.</p>
    <h2>Propellant Infrastructure</h2>
    <p>Cryogenic propellants — liquid oxygen at −183°C, liquid hydrogen at −253°C — must be stored in vacuum-insulated tanks, transferred through vacuum-jacketed loading lines, and loaded in a carefully sequenced process that takes hours and involves continuous monitoring for leaks, pressure anomalies, and temperature deviations. This operation falls under the simultaneous oversight of DOT, OSHA, and the FAA — a regulatory layering that adds compliance complexity to an already demanding operational environment.</p>
    <p>For reusable vehicle operators, the propellant infrastructure is a throughput bottleneck. A Falcon 9 requires approximately 500 tonnes of propellant per launch. Reloading that propellant in the turnaround window requires high-volume cryogenic storage with fast-fill capability — not the traditional batch-loading approach of expendable campaign logistics.</p>
    <h2>Horizontal vs. Vertical — Two Different Businesses</h2>
    <p>Horizontal launch facilities are operationally more similar to airports. The carrier aircraft takes off conventionally, climbs to altitude, and releases the rocket. This eliminates the fixed pad entirely and substantially reduces acoustic and structural demands on the facility. Virgin Galactic's Spaceport America and Virgin Orbit's Mojave operations both used horizontal launch. The infrastructure investment for horizontal launch is weighted toward the aircraft rather than fixed ground systems — which fundamentally changes the capital structure.</p>
    <p>The 2023 failure of Virgin Orbit's LauncherOne from Cornwall Airport Newquay — the first orbital launch attempt from UK soil — illustrated the regulatory complexity of operating from a multi-use commercial airport. The UK Civil Aviation Authority's oversight under the Space Industry Act 2018 established precedent for integrating launch operations into existing aviation regulatory frameworks (UK Space Agency, Cornwall Launch Investigation Report, 2023).</p>
    <h2>Payload Processing Facilities</h2>
    <p>Before installation on the launch vehicle, a spacecraft must be processed in specialized clean-room environments maintaining <strong>ISO Class 7 or better</strong> (fewer than 352,000 particles per cubic meter), humidity control, and electrostatic discharge protection. A spaceport without adequate payload processing capacity is commercially constrained from day one. Operators will not base missions at a facility that requires processing elsewhere and transporting high-value spacecraft to the site.</p>
    <h2>Range Safety Infrastructure &amp; AFSS</h2>
    <p>Range safety is the system that monitors vehicle flight and, if the vehicle deviates from its approved trajectory, terminates the flight before public harm. The traditional model requires a certified Range Safety Officer with authority to activate the <strong>Flight Termination System (FTS)</strong> in real time.</p>
    <p>The FAA approved the first commercial <strong>Autonomous Flight Safety System (AFSS)</strong> in 2015 (FAA Order 8900.1, Vol. 3, Ch. 18). AFSS moves the range safety computation onboard — the vehicle monitors its own flight path and activates the FTS autonomously if a boundary is breached. At orbital velocities, the difference between a 100ms ground command delay and a microsecond autonomous response is measured in kilometers of flight path. AFSS has enabled more flexible launch windows, reduced range safety workforce requirements, and — critically — made it feasible to establish launch sites without the multi-hundred-million-dollar ground tracking infrastructure of legacy government ranges.</p>
    <div class="callout callout-insight">
      <div class="callout-label">Strategic Implication</div>
      <p>AFSS is not just a technical innovation — it is a commercial enabler. It has materially lowered the capital barrier for new launch site development by removing the requirement for independent range safety radar and command infrastructure. New commercial spaceport developers should explicitly assess whether their planned operator relationships use AFSS, as this significantly affects the required ground infrastructure investment.</p>
    </div>
  </div>
  <div id="segNavFooter"></div>
</div>`;

CONTENT['s1-5'] = () => `
<div class="segment-content">
  <div class="seg-header">
    <div class="seg-header-eyebrow">
      <span class="seg-header-code">SEGMENT 1.5</span>
      <span class="seg-header-meta">12 min · ~1,560 words</span>
    </div>
    <h1 class="seg-header-title">Supporting<br><em>Systems</em></h1>
    <p class="seg-header-subtitle">Power, communications, logistics, mission control — the infrastructure that most feasibility studies underestimate.</p>
    <div class="seg-header-tags">
      <span class="tag-lo tag">LO1.3 — Understand</span>
      <span class="tag">Power Infrastructure</span>
      <span class="tag">Telemetry</span>
      <span class="tag">Mission Control</span>
    </div>
  </div>
  <div class="seg-body">
    <p>A launch complex doesn't operate in isolation. It depends on a web of supporting infrastructure — power, communications, logistics, mission control — that is as critical to reliable operations as the pad itself. These systems are less dramatic than a flame trench, and they are frequently under-resourced in spaceport development plans. They shouldn't be.</p>
    <h2>Power Infrastructure</h2>
    <p>Power demand at a launch facility peaks during the pre-launch sequence and is characterized by rapid, large swings. A single orbital launch using liquid oxygen and liquid hydrogen requires <strong>10–50 MW of sustained power</strong> during propellant loading — followed by a sharp drop at liftoff. This load profile challenges regional utility grids not designed for it. Many spaceport development proposals underestimate the transmission infrastructure investment required to connect a remote coastal site to the regional grid at the required capacity.</p>
    <h2>Communications &amp; Telemetry</h2>
    <p>Range safety requires real-time, high-bandwidth data links between the vehicle and ground safety systems. Modern vehicles transmit hundreds of data channels at rates reaching gigabits per second during the launch window. Interruption is not tolerated: range safety procedures require FTS activation if telemetry is lost for more than a defined period (typically a few seconds). <strong>Dedicated fiber connections with fully redundant pathways are the standard</strong>. Satellite-based telemetry is not yet accepted as a primary range safety data link by the FAA. The implication: communications infrastructure must be designed and funded as a range safety system, not a utility.</p>
    <h2>Logistics &amp; Supply Chain</h2>
    <p>Stage sections may be 70 feet in diameter and 100 feet long, requiring specialized road transport or dedicated rail. Hazardous materials — cryogenic propellants, pressurized gases, batteries — require certified handling infrastructure. For facilities supporting reusable vehicle operations, booster recovery either requires an ocean-going vessel with landing capability or a designated downrange landing zone. The spaceport's logistics infrastructure must support a genuinely global supply chain without introducing delays that affect launch windows determined by orbital mechanics.</p>
    <h2>Mission Control &amp; Range Operations</h2>
    <p>Every launch is managed from a control room where the launch director, range safety officer, vehicle systems teams, and weather officers monitor the pre-launch sequence and authorize the countdown. For multi-user facilities, mission control must support multiple operator teams simultaneously — each with their own command protocols and flight procedures — while maintaining the shared situational awareness that range safety requires. This is not a larger room. It is a carefully designed system of operational isolation and shared situational awareness that requires explicit architectural and systems engineering.</p>
    <div class="callout callout-insight">
      <div class="callout-label">Common Feasibility Study Failure</div>
      <p>The supporting systems described in this segment are consistently the most underestimated elements in commercial spaceport feasibility studies. Power transmission, fiber connectivity, and mission control infrastructure have no headline value — they don't appear in architectural renderings or press releases. But their absence or inadequacy has grounded more launch campaigns than any pad failure. Budget them explicitly, not as a percentage contingency.</p>
    </div>
  </div>
  <div id="segNavFooter"></div>
</div>`;

CONTENT['s1-6'] = () => `
<div class="segment-content">
  <div class="seg-header">
    <div class="seg-header-eyebrow">
      <span class="seg-header-code">SEGMENT 1.6</span>
      <span class="seg-header-meta">14 min · ~1,820 words</span>
    </div>
    <h1 class="seg-header-title">The Reusability<br><em>Revolution</em></h1>
    <p class="seg-header-subtitle">From the campaign model to the airline model — and why facilities built for the former may be obsolete before they open.</p>
    <div class="seg-header-tags">
      <span class="tag-lo tag">LO1.4 — Analyze</span>
      <span class="tag">Reusability</span>
      <span class="tag">SpaceX Falcon 9</span>
      <span class="tag">Infrastructure Design</span>
    </div>
  </div>
  <div class="seg-body">
    <p>The commercial launch industry is in the middle of the most significant operational transition in its history — and most of the infrastructure investment community has not yet fully internalized what that transition demands from spaceport facilities.</p>
    <h2>Campaign Model vs. Airline Model</h2>
    <p>In the <strong>campaign model</strong> — which governed all commercial launch operations until approximately 2015 — a launch vehicle is expendable. It is manufactured, shipped, processed over weeks or months, launched once, and destroyed in the process. A single pad can support perhaps 10–15 launches per year at maximum. The economic model depends on high revenue per launch — which is why expendable launch historically cost hundreds of millions of dollars per flight.</p>
    <p>SpaceX flew its first reused orbital rocket booster in March 2017. As of 2024, individual Falcon 9 boosters have flown as many as twenty times. The record turnaround between flights: <strong>21 days</strong>. SpaceX's published Starship turnaround target: <strong>24 hours</strong>.</p>
    <p>The economic logic is powerful: if the booster — representing approximately 70% of total vehicle cost — can fly 10 times, the amortized hardware cost per flight drops to roughly 10% of the expendable equivalent. SpaceX's current Falcon 9 price is approximately $67 million. Analysts estimate that full Starship reusability could reduce cost-per-kilogram to orbit by another order of magnitude.</p>
    <div class="callout callout-insight">
      <div class="callout-label">The Critical Point for Spaceport Executives</div>
      <p>The economics of reusability only work if the spaceport can turn the vehicle around without becoming the bottleneck. A booster that could fly in 21 days but waits 60 days for pad availability is not a 21-day-turnaround booster. <strong>The spaceport is now part of the economic value proposition of the vehicle.</strong></p>
    </div>
    <h2>What Reusability Demands from Facilities</h2>
    <p><strong>Fast-fill propellant systems.</strong> Traditional batch delivery of cryogenic propellants — 48–72 hours of pre-positioning — doesn't support 21-day turnaround, let alone 24 hours. Facilities serving high-cadence operators need on-site high-volume cryogenic storage with fast-fill capability: a propellant terminal, not a depot.</p>
    <p><strong>Modular, rapid-access systems.</strong> Traditional infrastructure assumes months between flights: bespoke scaffolding, custom access equipment configured per campaign. The airline model requires standardized modular access that can be positioned, used, and removed without pad downtime.</p>
    <p><strong>Built-in redundancy throughout.</strong> In the campaign model, a single failed sensor or malfunctioning valve causes a scrub — an inconvenience costing money but not threatening the business. In the airline model, a facility that scrubs repeatedly due to infrastructure issues loses its operator to a competitor with a more reliable pad. Redundancy is no longer a design luxury. It is a commercial necessity.</p>
    <h2>The Multi-User Challenge</h2>
    <p>For multi-user spaceports, the reusability transition creates a structural design challenge not yet resolved satisfactorily anywhere in the world. Rocket Lab's Electron (small, partly reusable, 300 kg to LEO), SpaceX Falcon 9 (medium, highly reusable, 22 metric tonnes), and ULA's Vulcan Centaur (heavy, expendable) have essentially no shared infrastructure requirements. They need different pad configurations, different propellant systems, different processing facilities, different range safety architectures.</p>
    <p>A multi-user spaceport serving all three must invest in redundant, non-shared pad infrastructure — which erodes the economics of shared infrastructure that is the multi-user model's fundamental value proposition. <strong>The business model for the next generation of multi-user commercial spaceports is genuinely unsolved.</strong> This is one of the most important strategic questions in the sector.</p>
    <div class="data-table-wrap">
      <table class="data-table">
        <thead><tr><th>Dimension</th><th>Campaign Model</th><th>Airline Model</th></tr></thead>
        <tbody>
          <tr><td><strong>Vehicle cadence</strong></td><td>10–15 launches/yr per pad</td><td>100+ launches/yr target</td></tr>
          <tr><td><strong>Turnaround target</strong></td><td>Weeks to months</td><td>Hours to days</td></tr>
          <tr><td><strong>Propellant logistics</strong></td><td>Batch delivery, 48–72 hr pre-position</td><td>Fast-fill, on-site storage terminal</td></tr>
          <tr><td><strong>Pad access</strong></td><td>Bespoke scaffolding per campaign</td><td>Modular, standardized, rapid-deploy</td></tr>
          <tr><td><strong>Redundancy approach</strong></td><td>Single-point failures tolerated</td><td>Full redundancy throughout</td></tr>
          <tr><td><strong>Revenue per launch</strong></td><td>Hundreds of millions USD</td><td>Tens of millions; volume-driven</td></tr>
          <tr><td><strong>Infrastructure model</strong></td><td>Cost-per-launch amortization</td><td>Throughput-driven asset utilization</td></tr>
        </tbody>
      </table>
    </div>
    <p>The reusability transition is not a future development to monitor. It is present reality reshaping the economics of launch — and therefore of spaceport infrastructure. Facilities being designed today will be operating when Starship is flying at airline cadence. Executives who plan for the campaign model are building assets that may be commercially obsolete before they reach operational maturity.</p>
  </div>
  <div id="segNavFooter"></div>
</div>`;

CONTENT['s1-7'] = () => `
<div class="segment-content">
  <div class="seg-header">
    <div class="seg-header-eyebrow">
      <span class="seg-header-code">SEGMENT 1.7</span>
      <span class="seg-header-meta">12 min · ~1,560 words</span>
    </div>
    <h1 class="seg-header-title">Future Trends —<br><em>Digital Twins,</em><br>Smart Spaceports</h1>
    <p class="seg-header-subtitle">Not speculation. Deployed today in operational facilities — or in verifiable advanced development with known timelines.</p>
    <div class="seg-header-tags">
      <span class="tag-lo tag">LO1.5 — Evaluate</span>
      <span class="tag">Digital Twins</span>
      <span class="tag">Autonomous Range Ops</span>
      <span class="tag">Multi-User Design</span>
    </div>
  </div>
  <div class="seg-body">
    <p>Executives make decisions with 20–30 year consequences. A spaceport licensed and constructed today will still be operating in the 2050s. The technology and operational environment of the 2050s will be substantially different from today — and the investments made now will be either assets or liabilities in that future depending on how well they anticipate it.</p>
    <p>The trends covered here are deployed today in operational facilities or adjacent industrial sectors, or in advanced development with known timelines. The question is not whether they will materialize. It is whether facilities being built, invested in, or advised on are positioned to incorporate them.</p>
    <h2>Digital Twins</h2>
    <p>A digital twin is a real-time computational model of a physical asset — a continuously updated simulation reflecting the current state of the actual system, used to predict future behavior, optimize operations, and test interventions before applying them to the physical asset.</p>
    <p>In spaceport applications, digital twins are being developed for launch pad structural integrity monitoring — sensor networks embedded in concrete and steel tracking load, temperature, and deformation over time to predict maintenance requirements before they become failures. For a flame trench experiencing thermal shock above 3,000°F at ignition, predictive maintenance based on structural sensor data is not a cost-saving convenience. <strong>It is a safety system.</strong></p>
    <p>The U.S. Air Force Research Laboratory has been developing digital twin frameworks for launch range infrastructure since 2018, piloted at Cape Canaveral. SpaceX has disclosed use of computational fluid dynamics models for flame trench optimization in Starship's development — a precursor to full digital twin deployment. The trajectory is clear: within this decade, digital twin operation will be the standard for serious commercial launch facilities.</p>
    <h2>Autonomous Range Operations (ARO)</h2>
    <p>ARO extends the AFSS principle to the entire range safety function — the range safety role executed primarily by software systems, with human oversight at a supervisory rather than operational level. The FAA has been appropriately cautious about ARO given its safety-critical nature, but increasing launch cadence is making human-staffed range safety economically unsustainable at scale. For spaceport developers: <strong>workforce requirements and infrastructure costs of range safety operations will decline significantly over the next decade</strong>, and facilities designed around the traditional human-staffed model should plan for the transition.</p>
    <h2>Smart Spaceport Technology</h2>
    <p>The "smart spaceport" concept integrates sensor networks, data analytics, and automation across the full operational spectrum: propellant management, pad maintenance, vehicle processing, logistics, security, and energy management. Spaceport America has been piloting smart facility management elements. New facilities in the UK and Australia, starting from a clean sheet, are designing smart systems in from day one.</p>
    <p>The commercial case rests on two pillars: cost reduction through operational efficiency, and reliability improvement through predictive maintenance. Both are validated by operational data from analogous industrial settings — oil and gas, semiconductor fabrication, advanced aviation maintenance — where sensor-driven predictive maintenance has demonstrated <strong>15–25% reductions in unplanned downtime</strong>.</p>
    <h2>Multi-User Facility Design Evolution</h2>
    <p>The most promising architectural direction is <strong>modular, configurable pad infrastructure</strong> — systems where core structural elements are standardized and vehicle-specific interface hardware is modular and replaceable. This is not yet operational at any commercial facility, but it is the design philosophy driving several next-generation spaceport development projects, including elements of the UK's planned vertical launch facilities.</p>
    <p>Point-to-point suborbital transportation — hypersonic vehicles carrying passengers or cargo between cities via a ballistic arc — introduces a further layer of design complexity. A facility serving both orbital launch operators and P2P transportation operators manages fundamentally different payload types, cadences, customer experiences, and potentially different regulatory regimes simultaneously. Any developer claiming to have solved the P2P spaceport design challenge should be questioned carefully.</p>
  </div>
  <div id="segNavFooter"></div>
</div>`;

CONTENT['s1-8'] = () => `
<div class="segment-content">
  <div class="seg-header">
    <div class="seg-header-eyebrow">
      <span class="seg-header-code">SEGMENT 1.8</span>
      <span class="seg-header-meta">10 min · ~1,300 words</span>
    </div>
    <h1 class="seg-header-title">Environment,<br>Community &amp;<br><em>Responsible Development</em></h1>
    <p class="seg-header-subtitle">The dimension most consistently underestimated — and most likely to determine whether a technically viable project succeeds.</p>
    <div class="seg-header-tags">
      <span class="tag-lo tag">LO1.6 — Apply</span>
      <span class="tag">NEPA</span>
      <span class="tag">Environmental Justice</span>
      <span class="tag">Community Risk</span>
    </div>
  </div>
  <div class="seg-body">
    <p>We close this module with the dimension of spaceport development most consistently underestimated in feasibility studies, most frequently mismanaged in practice, and most likely to determine whether a project succeeds or fails — not technically, but politically and legally. Environment and community. Both are governed by legal frameworks with real teeth.</p>
    <h2>The NEPA Framework</h2>
    <p>Any U.S. launch site requiring a federal license triggers the <strong>National Environmental Policy Act</strong> (42 U.S.C. § 4321 et seq.). NEPA requires the FAA to prepare either an Environmental Assessment or, for significant impacts, a full Environmental Impact Statement — analyzing air quality, water quality, noise, biological resources, cultural resources, and environmental justice populations.</p>
    <div class="callout callout-legal">
      <div class="callout-label">Case Study — Starship OFT-2 Non-Compliance</div>
      <p>SpaceX's November 2023 Starship OFT-2 launch produced ground-level debris dispersion and acoustic impacts exceeding the parameters agreed as conditions of the FAA launch license. The FAA initiated an anomaly investigation and imposed a temporary launch suspension pending SpaceX's demonstration of compliance. The consequence was a regulatory enforcement action affecting the company's entire commercial launch schedule. Environmental commitments made during permitting are <strong>enforceable conditions of the operating license</strong>. They are not aspirational targets.</p>
    </div>
    <h2>Acoustic Impact &amp; High-Cadence Reality</h2>
    <p>Launch acoustics are among the most significant community impact factors and among the most technically complex to model. The FAA's noise assessment methodology borrows from airport noise planning — Day-Night Average Sound Level metrics aggregating acoustic energy over time. But launch events are fundamentally different: infrequent, extremely intense, producing both direct acoustic pressure waves and secondary ground vibration experienced as physical impact.</p>
    <p>Communities that approved spaceport development plans projected at 6 launches per year are now dealing with 50 or more. The regulatory frameworks governing launch acoustics were designed for the former, not the latter. <strong>The gap between legacy noise standards and high-cadence reusable vehicle reality is an unresolved legal and regulatory issue</strong> already producing litigation and policy challenges at multiple U.S. launch sites.</p>
    <h2>Environmental Justice</h2>
    <p>Executive Order 14096 (2023) directs federal agencies to consider environmental justice — the disproportionate environmental burden borne by low-income communities and communities of color — in NEPA analyses. Communities adjacent to proposed and existing launch sites are, in aggregate, lower-income and more racially diverse than the general population.</p>
    <p>For executives: inadequate documentation of environmental justice impacts can invalidate an EIS and expose a license to legal challenge under the Administrative Procedure Act (5 U.S.C. § 706). A challenge under the APA's arbitrary-and-capricious standard can delay a project by years and cost tens of millions in legal fees and revised analysis. This is a material financial risk, not an ethical externality.</p>
    <h2>Community Engagement as Operational Strategy</h2>
    <p>Beyond the legal framework: a spaceport that loses community support loses its social license to operate. Road closures, noise events, environmental incidents, and economic displacement of existing residents compound over time. The most successful spaceport developments — measured by sustained community acceptance and operational longevity — have been characterized by early, substantive, and ongoing engagement. Not information campaigns. Not legally-required comment periods. <strong>Genuine dialogue about impacts, genuine responsiveness to concerns, and genuine economic benefit sharing that gives communities a stake in the facility's success.</strong></p>
    <p>That is not altruism. It is operational risk management. The communities adjacent to your facility will be there long after the development team has moved on.</p>
  </div>
  <div id="segNavFooter"></div>
</div>`;

CONTENT['case'] = () => `
<div class="segment-content">
  <div class="seg-header">
    <div class="seg-header-eyebrow">
      <span class="seg-header-code">CASE STUDY</span>
      <span class="seg-header-meta">20 min read · Harvard Method · Module 1 Assessment Anchor</span>
    </div>
    <h1 class="seg-header-title"><em>Spaceport America:</em><br>The Promise and<br>the Peril</h1>
    <p class="seg-header-subtitle">Public investment in commercial launch infrastructure — a 20-year case study in site selection, anchor tenant risk, and the gap between projection and reality.</p>
    <div class="seg-header-tags">
      <span class="tag-lo tag">LO1.1 · LO1.2 · LO1.4 · LO1.5 · LO1.6</span>
      <span class="tag">New Mexico, USA</span>
      <span class="tag">2002–2024</span>
      <span class="tag">Final Assessment Anchor</span>
    </div>
  </div>
  <div class="seg-body">
    <div class="case-meta-strip">
      <div class="case-meta-item"><div class="case-meta-key">Sector</div><div class="case-meta-val">Commercial Spaceport</div></div>
      <div class="case-meta-item"><div class="case-meta-key">Geography</div><div class="case-meta-val">New Mexico, USA</div></div>
      <div class="case-meta-item"><div class="case-meta-key">Period</div><div class="case-meta-val">2002–2024</div></div>
      <div class="case-meta-item"><div class="case-meta-key">Investment</div><div class="case-meta-val">~$220M public bonds</div></div>
    </div>
    <div class="callout callout-insight">
      <div class="callout-label">Case Notice</div>
      <p>This case was prepared as the basis for discussion rather than to illustrate effective or ineffective handling of a situation. All facts are drawn from public records, government filings, legislative history, and published sources. This case anchors the Module 1 final assessment — engage with it analytically, not just as a narrative.</p>
    </div>
    <h2>Executive Summary</h2>
    <p>In 2002, New Mexico made a decision no American state had made before: it committed public infrastructure investment at scale to a commercial spaceport, grounded in the belief that the commercial launch industry was about to transform and that first-mover positioning would yield returns justifying the risk. Spaceport America — built in the high desert of Sierra County, 45 miles north of the nearest city, on a two-lane road — is the result.</p>
    <p>Two decades later, Spaceport America is simultaneously a genuine engineering achievement, a cautionary tale about anchor tenant dependency, and a living laboratory for every analytical framework in Module 1.</p>
    <h2>The Site Selection Decision</h2>
    <p>The Jornada del Muerto site was identified through a systematic evaluation — essentially an early application of the seven-driver framework. <strong>Azimuth and range safety:</strong> adjacency to White Sands Missile Range provided shared range safety infrastructure that would have cost hundreds of millions to build independently. <strong>Geography:</strong> the Jornada del Muerto is one of the largest uninhabited areas in the contiguous US. <strong>Weather:</strong> 340 days of sunshine, low lightning frequency, favorable launch meteorology. The site selection, examined through the Module 1 framework, was genuinely sound.</p>
    <h2>The Financing Innovation</h2>
    <p>The financing of Spaceport America is among the most creative examples of public infrastructure finance in the commercial space sector. A state constitutional amendment enabled counties to impose a gross receipts tax specifically for spaceport infrastructure. In November 2006, voters in Sierra County and Doña Ana County approved the tax by approximately 60–40. The resulting revenue stream, securitized, enabled approximately <strong>$220 million in tax-exempt municipal bonds</strong> to finance construction.</p>
    <p>The structure had a critical vulnerability: the financial model assumed sufficient anchor tenant revenue to service the debt within a defined timeline. If the anchor tenant was delayed, the structure would require ongoing state subsidy to remain solvent.</p>
    <h2>The Virgin Galactic Relationship</h2>
    <p>Virgin Galactic entered a 20-year exclusive lease for the terminal hangar complex, designed by <strong>Foster + Partners</strong> — the firm behind London's City Hall and Hong Kong's Chek Lap Kok terminal. The design was optimized for SpaceShipTwo and its carrier aircraft WhiteKnightTwo. It won the American Institute of Architects Honor Award in 2012. It was also purpose-built for a single vehicle architecture with no flexibility for other operators without significant modification.</p>
    <p>Reported annual lease payments from Virgin Galactic were approximately $1 million per year — clearly insufficient to cover debt service on the $220 million bond financing, let alone operating costs. The model assumed supplementary revenue from other tenants that was slower to materialize than projected.</p>
    <div class="pull-quote">
      <div class="pull-quote-text">"We built the world's first purpose-built commercial spaceport. We did everything right. What we could not control was the timeline of our anchor tenant's technology development — and in retrospect, we underweighted that risk."</div>
      <div class="pull-quote-attr">New Mexico Spaceport Authority, Annual Report Commentary, 2018 [Verify: confirm direct quotation or paraphrase]</div>
    </div>
    <h2>The 2014 Accident &amp; Its Consequences</h2>
    <p>On October 31, 2014, SpaceShipTwo VSS Enterprise broke apart in flight over the Mojave Desert following premature unlocking of the feathering re-entry system. The co-pilot was killed; the pilot survived serious injuries. The NTSB concluded the accident was caused by pilot error exacerbated by inadequate cockpit procedures (NTSB/AAR-15/02). For Spaceport America, commercial operations — originally projected for 2013–2014 — were deferred indefinitely. What had been characterized as a timing problem became a strategic question about the facility's viability.</p>
    <h2>Commercial Operations &amp; Suspension: 2021–2023</h2>
    <p>Virgin Galactic conducted its first commercial passenger spaceflight from Spaceport America on June 29, 2023 — nearly a decade after the facility's dedication — at a ticket price of $450,000 per seat. The company then suspended SpaceShipTwo operations to focus on the Delta-class vehicle. For the Spaceport Authority, this renewed the revenue gap and clarified the mandate to accelerate strategic diversification.</p>
    <h2>The Central Analytical Lesson</h2>
    <div class="callout callout-warning">
      <div class="callout-label">Framework Application</div>
      <p>The site selection was sound. The infrastructure investment was defensible. The financing innovation was creative and appropriate. The strategic failure was <strong>insufficient stress-testing of the anchor tenant model</strong> — specifically, the failure to ask, rigorously and quantitatively: what does the financial model show if the anchor tenant is three years late? Five years late? Ten years late? The answer was available in 2006. It was not adequately applied. Historical data on aerospace development programs consistently shows that timelines are underestimated by factors of two to three times. The Spaceport America model, stress-tested against that base rate, would have revealed extreme financial sensitivity to anchor tenant timing.</p>
    </div>
    <h2>Discussion Questions</h2>
    <ol>
      <li>Apply the four-axis classification framework to Spaceport America. What does the classification reveal about its commercial model that is not apparent from its public profile?</li>
      <li>Score each of the seven site selection drivers for Spaceport America on a scale of 1–5 and justify your scores. Which were addressed most rigorously? Which were underweighted?</li>
      <li>What stress-testing questions should have been asked in 2006 — using only the analytical tools available at the time — that were apparently not asked or not given sufficient weight?</li>
      <li>You have been appointed as strategic advisor to the New Mexico Spaceport Authority. Using Module 1 frameworks, develop a structured recommendation for the Authority's three-year strategic priorities.</li>
      <li>A sovereign wealth fund offers to invest $75 million in return for a 30-year revenue share on all launch fees. Evaluate this offer using the analytical frameworks from Module 1. What terms would you negotiate before accepting?</li>
    </ol>
  </div>
  <div id="segNavFooter"></div>
</div>`;

CONTENT['check'] = () => `
<div class="segment-content">
  <div class="seg-header">
    <div class="seg-header-eyebrow">
      <span class="seg-header-code">ASSESSMENT</span>
      <span class="seg-header-meta">8 questions · 70% to proceed</span>
    </div>
    <h1 class="seg-header-title">Module 1<br><em>Knowledge Check</em></h1>
    <p class="seg-header-subtitle">Apply the frameworks — not just recall them. Immediate feedback with rationale on every question.</p>
    <div class="seg-header-tags">
      <span class="tag-lo tag">LO1.1 through LO1.6</span>
      <span class="tag">70% pass threshold</span>
    </div>
  </div>
  <div id="quizContainer"></div>
  <div id="segNavFooter"></div>
</div>`;

// ── BOOT ────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('segmentContainer')) {
    CourseApp.init();

    // Wire up nav footer after each render
    const origNav = CourseApp.navigate.bind(CourseApp);
    // Nav footer renders itself via renderNavFooter inside navigate
  }
});
