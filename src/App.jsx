import { useState } from 'react';

// ─── Malaysian Life Expectancy Data ──────────────────────────────────────────
// Baseline 2024: DOSM Abridged Life Tables Malaysia 2024
// Ethnic projections: Islam et al. exponential growth model (2014–2050)
const ETHNIC_LE = {
  Malay:   { male: { base2024: 72.99, annualGain: 0.155 }, female: { base2024: 78.37, annualGain: 0.155 } },
  Chinese: { male: { base2024: 77.08, annualGain: 0.155 }, female: { base2024: 81.39, annualGain: 0.130 } },
  Indian:  { male: { base2024: 69.30, annualGain: 0.160 }, female: { base2024: 78.57, annualGain: 0.155 } },
  Other:   { male: { base2024: 73.0,  annualGain: 0.155 }, female: { base2024: 77.8,  annualGain: 0.150 } },
};

function computeLifeExpectancy(birthYear, gender, ethnicity) {
  const gKey = gender === 'Male' ? 'male' : 'female';
  const { base2024, annualGain } = ETHNIC_LE[ethnicity][gKey];
  const leAtBirth = base2024 - (2024 - birthYear) * annualGain;
  const expectedDeathYear = birthYear + leAtBirth;
  const futureGainYears = Math.max(0, Math.min(expectedDeathYear, 2060) - 2026);
  return Math.round((leAtBirth + futureGainYears * annualGain * 0.5) * 10) / 10;
}

const getPopulationAtYear = (year) => {
  const data = { 1950:2.5,1960:3.0,1970:3.7,1980:4.4,1990:5.3,2000:6.1,2010:6.9,2020:7.8,2025:8.1 };
  const years = Object.keys(data).map(Number);
  const closest = years.reduce((p,c) => Math.abs(c-year) < Math.abs(p-year) ? c : p);
  return Math.round(data[closest] * 1e9);
};

const fmt = (n) => new Intl.NumberFormat('en-MY').format(n);

export default function LifeInWeeks() {
  const [step, setStep]           = useState(1);
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender]       = useState('');
  const [ethnicity, setEthnicity] = useState('');
  const [stats, setStats]         = useState(null);
  const [hoveredWeek, setHoveredWeek] = useState(null);

  const calculate = () => {
    const birth     = new Date(birthdate);
    const today     = new Date();
    const birthYear = birth.getFullYear();
    const le        = computeLifeExpectancy(birthYear, gender, ethnicity);
    const totalWeeks  = Math.round(le * 52);
    const msPerWeek   = 1000 * 60 * 60 * 24 * 7;
    const msPerDay    = 1000 * 60 * 60 * 24;
    const weeksLived  = Math.floor((today - birth) / msPerWeek);
    const weeksLeft   = totalWeeks - weeksLived;
    const pctLived    = Math.min(100, Math.round((weeksLived / totalWeeks) * 100));
    const pctLeft     = 100 - pctLived;
    const daysLived   = Math.floor((today - birth) / msPerDay);

    setStats({
      le, totalWeeks, weeksLived, weeksLeft, pctLived, pctLeft,
      daysLived,
      seasons:      Math.floor(daysLived / 91.25),
      heartbeats:   Math.floor(daysLived * 24 * 60 * 70),
      breaths:      Math.floor(daysLived * 24 * 60 * 16),
      hoursSlept:   Math.floor(daysLived * 8),
      lunarCycles:  Math.round(daysLived / 29.53),
      solarTrips:   Math.floor(daysLived / 365.25),
      birthYear, gender, ethnicity,
    });
    setStep(2);
  };

  const WeekGrid = () => {
    const rows = [];
    const perRow = 52;
    for (let r = 0; r < Math.ceil(stats.totalWeeks / perRow); r++) {
      const cells = [];
      for (let c = 0; c < perRow; c++) {
        const wk = r * perRow + c;
        if (wk >= stats.totalWeeks) break;
        const past    = wk < stats.weeksLived;
        const current = wk === stats.weeksLived;
        cells.push(
          <div
            key={wk}
            onMouseEnter={() => setHoveredWeek(wk)}
            onMouseLeave={() => setHoveredWeek(null)}
            className={`w-2 h-2 m-px rounded-sm cursor-default transition-all
              ${past ? 'bg-red-800' : current ? 'bg-yellow-400 animate-pulse' : 'bg-gray-200'}`}
          />
        );
      }
      rows.push(<div key={r} className="flex">{cells}</div>);
    }

    let hoverLabel = null;
    if (hoveredWeek !== null) {
      const yr   = Math.floor(hoveredWeek / 52);
      const wkYr = (hoveredWeek % 52) + 1;
      const type = hoveredWeek < stats.weeksLived ? 'A week from your past'
                 : hoveredWeek === stats.weeksLived ? 'Your current week'
                 : 'A week in your potential future';
      hoverLabel = `Week ${wkYr} of age ${yr} · ${type}`;
    }

    return (
      <div className="bg-white p-6 rounded-xl shadow-sm mt-6">
        <h2 className="text-base font-semibold text-gray-800 mb-1">Your life in weeks</h2>
        <p className="text-xs text-gray-500 mb-4">
          Based on Malaysian {stats.ethnicity} {stats.gender.toLowerCase()} life expectancy —
          projected lifespan <span className="font-medium text-gray-700">{stats.le} years</span>
        </p>
        <div className="flex flex-col">{rows}</div>
        {hoverLabel
          ? <p className="mt-3 text-xs text-gray-500 italic">{hoverLabel}</p>
          : <p className="mt-3 text-xs text-gray-500 italic opacity-0">·</p>}
        <div className="flex gap-4 mt-4 text-xs text-gray-500">
          {[['bg-red-800','Past'],['bg-yellow-400','Present'],['bg-gray-200','Future']].map(([cls,lbl]) => (
            <div key={lbl} className="flex items-center gap-1.5">
              <div className={`w-3 h-3 rounded-sm ${cls}`} />{lbl}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const StatCard = ({ title, children }) => (
    <div className="bg-white p-5 rounded-xl shadow-sm">
      <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">{title}</h3>
      <div className="space-y-2 text-sm text-gray-600">{children}</div>
    </div>
  );

  const Stat = ({ label, value }) => (
    <p>{label} <span className="font-semibold text-gray-900">{value}</span></p>
  );

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-lg mx-auto">

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">🇲🇾</span>
            <h1 className="text-2xl font-bold text-gray-900">Life in Weeks</h1>
          </div>
          <p className="text-gray-500 text-sm">Personalised to Malaysian life expectancy — adjusted for gender, ethnicity & projected gains.</p>
        </div>

        {step === 1 && (
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of birth</label>
              <input
                type="date" value={birthdate}
                onChange={e => setBirthdate(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-red-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <div className="flex gap-3">
                {['Male','Female'].map(g => (
                  <button key={g} onClick={() => setGender(g)}
                    className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-all
                      ${gender===g ? 'bg-red-800 text-white border-red-800' : 'bg-white text-gray-700 border-gray-300 hover:border-red-700'}`}>
                    {g}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ethnicity</label>
              <div className="grid grid-cols-2 gap-2">
                {['Malay','Chinese','Indian','Other'].map(e => (
                  <button key={e} onClick={() => setEthnicity(e)}
                    className={`py-2 rounded-lg border text-sm font-medium transition-all
                      ${ethnicity===e ? 'bg-red-800 text-white border-red-800' : 'bg-white text-gray-700 border-gray-300 hover:border-red-700'}`}>
                    {e}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={calculate} disabled={!birthdate || !gender || !ethnicity}
              className="w-full py-3 rounded-lg bg-red-800 text-white font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-red-900 transition-colors">
              Visualise my time →
            </button>
            <p className="text-xs text-gray-400 text-center">
              Data: DOSM Abridged Life Tables 2024 · Islam et al. ethnic projection model (2014–2050)
            </p>
          </div>
        )}

        {step === 2 && stats && (
          <>
            {/* Summary banner */}
            <div className="bg-red-800 text-white p-5 rounded-xl shadow-sm">
              <p className="text-sm opacity-80 mb-1">Projected lifespan</p>
              <p className="text-4xl font-bold">{stats.le} <span className="text-lg font-normal">years</span></p>
              <p className="text-sm opacity-80 mt-1">{stats.ethnicity} {stats.gender} · born {stats.birthYear} · includes projected future gains</p>
              <div className="mt-4 bg-red-900 rounded-full h-2">
                <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${stats.pctLived}%` }} />
              </div>
              <div className="flex justify-between text-xs mt-2 opacity-80">
                <span><span className="font-bold text-yellow-300">{stats.pctLived}%</span> lived · {fmt(stats.weeksLived)} weeks</span>
                <span>{fmt(stats.weeksLeft)} weeks · <span className="font-bold text-green-300">{stats.pctLeft}%</span> remaining</span>
              </div>
            </div>

            <WeekGrid />

            <div className="mt-4 space-y-3">

              {/* Life highlights */}
              <StatCard title="Life highlights">
                <Stat label="Weeks lived:" value={fmt(stats.weeksLived)} />
                <Stat label="Weeks remaining:" value={fmt(stats.weeksLeft)} />
                <p>
                  You've lived <span className="font-semibold text-gray-900">{fmt(stats.weeksLived)}</span> weeks,
                  which is <span className="font-semibold text-gray-900">{stats.pctLived}%</span> of your projected life.
                </p>
                <Stat label="Days of experience:" value={fmt(stats.daysLived)} />
                <Stat label="Seasons observed:" value={fmt(stats.seasons)} />
                <Stat label="Heartbeats (est.):" value={fmt(stats.heartbeats)} />
                <Stat label="Breaths taken (est.):" value={fmt(stats.breaths)} />
                <Stat label="Hours slept (est.):" value={fmt(stats.hoursSlept)} />
              </StatCard>

              {/* Societal context */}
              <StatCard title="Societal context">
                <p>
                  During your lifetime, humanity's population has grown from{' '}
                  <span className="font-semibold text-gray-900">{fmt(getPopulationAtYear(stats.birthYear))}</span> to
                  over <span className="font-semibold text-gray-900">8 billion</span> people.
                </p>
                <p>
                  The average person meets around <span className="font-semibold text-gray-900">80,000</span> people
                  in their lifetime. You've likely already met approximately{' '}
                  <span className="font-semibold text-gray-900">{fmt(Math.round(80000 * stats.pctLived / 100))}</span> individuals.
                </p>
                <p>
                  Since your birth, humanity has collectively experienced approximately{' '}
                  <span className="font-semibold text-gray-900">{fmt(Math.round(stats.daysLived * 385000))}</span> births
                  and <span className="font-semibold text-gray-900">{fmt(Math.round(stats.daysLived * 166000))}</span> deaths.
                </p>
              </StatCard>

              {/* Cosmic perspective */}
              <StatCard title="Cosmic perspective">
                <p>
                  Since your birth, Earth has traveled approximately{' '}
                  <span className="font-semibold text-gray-900">{fmt(Math.round(stats.daysLived * 1.6e6))}</span> kilometres
                  through space around the Sun.
                </p>
                <p>
                  The observable universe is about <span className="font-semibold text-gray-900">93</span> billion
                  light-years across. Your entire lifespan is just{' '}
                  <span className="font-semibold text-gray-900">{(stats.le / 13.8e9 * 100).toFixed(9)}%</span> of
                  the universe's age.
                </p>
                <p>
                  During your lifetime, our solar system has moved about{' '}
                  <span className="font-semibold text-gray-900">{fmt(Math.round(stats.daysLived * 24 * 828000))}</span> kilometres
                  through the Milky Way galaxy.
                </p>
              </StatCard>

              {/* Natural world */}
              <StatCard title="Natural world">
                <p>
                  You've experienced approximately{' '}
                  <span className="font-semibold text-gray-900">{fmt(stats.lunarCycles)}</span> lunar cycles
                  and <span className="font-semibold text-gray-900">{stats.solarTrips}</span> trips around the Sun.
                </p>
                <p>
                  A giant sequoia tree can live over 3,000 years. Your current age is{' '}
                  <span className="font-semibold text-gray-900">{((stats.daysLived / 365.25) / 3000 * 100).toFixed(2)}%</span> of
                  its potential lifespan.
                </p>
                <p>
                  During your lifetime, your body has replaced most of its cells several times.
                  You are not made of the same atoms you were born with.
                </p>
              </StatCard>

              {/* Methodology */}
              <StatCard title="Assumptions & methodology">
                <p className="text-xs text-gray-500 leading-relaxed">
                  Baseline life expectancy from <span className="font-medium">DOSM Abridged Life Tables Malaysia 2024</span>.
                  Ethnic projections from Islam et al. exponential growth model (2014–2050).
                  Future gains are partially credited (50% capture rate) reflecting uncertainty —
                  medical advances, lifestyle factors, and policy changes may increase or reduce this.
                  "Other" ethnicity uses the national DOSM average.
                </p>
              </StatCard>
            </div>

            <button
              onClick={() => { setStep(1); setStats(null); setBirthdate(''); setGender(''); setEthnicity(''); }}
              className="mt-6 w-full py-2.5 rounded-lg bg-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-300 transition-colors">
              Start over
            </button>
          </>
        )}
      </div>
    </div>
  );
}