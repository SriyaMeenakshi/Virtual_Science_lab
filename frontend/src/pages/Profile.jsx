import { useGamification } from "../context/GamificationContext";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";

const BADGES_CONFIG = [
  {
    id: "Junior Biologist",
    title: "Junior Biologist",
    description: "Score 100% (3/3) on at least one Biology experiment quiz.",
    emoji: "🔬",
    subject: "Biology",
    color: "from-green-400 to-emerald-600 shadow-emerald-500/20 text-emerald-100"
  },
  {
    id: "Biology Pro",
    title: "Biology Pro",
    description: "Complete all 4 Biology quizzes with a perfect score (3/3).",
    emoji: "🧬",
    subject: "Biology",
    color: "from-emerald-500 to-teal-700 shadow-teal-500/20 text-teal-100"
  },
  {
    id: "Junior Chemist",
    title: "Junior Chemist",
    description: "Score 100% (3/3) on at least one Chemistry experiment quiz.",
    emoji: "🧪",
    subject: "Chemistry",
    color: "from-blue-400 to-indigo-600 shadow-blue-500/20 text-blue-100"
  },
  {
    id: "Chemistry Pro",
    title: "Chemistry Pro",
    description: "Complete all 3 Chemistry quizzes with a perfect score (3/3).",
    emoji: "⚗️",
    subject: "Chemistry",
    color: "from-purple-500 to-violet-700 shadow-violet-500/20 text-violet-100"
  },
  {
    id: "Junior Physicist",
    title: "Junior Physicist",
    description: "Score 100% (3/3) on at least one Physics experiment quiz.",
    emoji: "🧲",
    subject: "Physics",
    color: "from-amber-400 to-orange-600 shadow-orange-500/20 text-orange-100"
  },
  {
    id: "Physics Pro",
    title: "Physics Pro",
    description: "Complete all 4 Physics quizzes with a perfect score (3/3).",
    emoji: "⚛️",
    subject: "Physics",
    color: "from-red-500 to-pink-700 shadow-pink-500/20 text-pink-100"
  },
  {
    id: "Science Champion",
    title: "Science Champion",
    description: "Achieve master comprehension with 100% score on all 11 quizzes!",
    emoji: "🏆",
    subject: "All",
    color: "from-yellow-400 via-amber-500 to-yellow-600 shadow-yellow-500/30 text-yellow-50 font-black animate-pulse"
  }
];

const EXPERIMENTS_ROADMAP = [
  { id: "human-body", title: "Human Body Anatomy", subject: "Biology", link: "/biology/human-body" },
  { id: "mitochondria", title: "Mitochondria Powerhouse", subject: "Biology", link: "/biology/mitochondria" },
  { id: "eye", title: "Eye Anatomy", subject: "Biology", link: "/biology/eye" },
  { id: "kidney", title: "Kidney Filtration", subject: "Biology", link: "/biology/kidney" },
  { id: "chemistry-equipment", title: "Laboratory Equipment Set", subject: "Chemistry", link: "/chemistry/chemistry-equipment" },
  { id: "volcano-experiment", title: "Volcano Chemical Reaction", subject: "Chemistry", link: "/chemistry/volcano-experiment" },
  { id: "condenser", title: "Glass Vapor Condenser", subject: "Chemistry", link: "/chemistry/condenser" },
  { id: "velocity-acceleration", title: "Velocity & Acceleration Laws", subject: "Physics", link: "/physics/velocity-acceleration" },
  { id: "magnetic-field-wires", title: "Magnetic Fields (Two Wires)", subject: "Physics", link: "/physics/magnetic-field-wires" },
  { id: "thumb-rule", title: "Right-Hand Thumb Rule", subject: "Physics", link: "/physics/thumb-rule" },
  { id: "magnetic-field-direction", title: "Field Around Straight Conductor", subject: "Physics", link: "/physics/magnetic-field-direction" }
];

const getRank = (xp) => {
  if (xp < 150) return { level: 1, title: "Apprentice Researcher", nextXp: 150, prevXp: 0 };
  if (xp < 450) return { level: 2, title: "Junior Lab Assistant", nextXp: 450, prevXp: 150 };
  if (xp < 950) return { level: 3, title: "Senior Experimenter", nextXp: 950, prevXp: 450 };
  if (xp < 1800) return { level: 4, title: "Master Innovator", nextXp: 1800, prevXp: 950 };
  return { level: 5, title: "Grand Science Fellow", nextXp: null, prevXp: 1800 };
};

const Profile = () => {
  const { xp, completedQuizzes, unlockedBadges, loading } = useGamification();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-violet-600 border-t-transparent mx-auto" />
          <p className="mt-4 font-bold text-slate-500 dark:text-slate-400">Loading student stats...</p>
        </div>
      </div>
    );
  }

  const rank = getRank(xp);
  
  // Calculate level progress percentage
  let progressPercent = 100;
  if (rank.nextXp) {
    const range = rank.nextXp - rank.prevXp;
    const currentInRange = xp - rank.prevXp;
    progressPercent = Math.min(Math.max((currentInRange / range) * 100, 0), 100);
  }

  return (
    <div className="fade-in max-w-6xl mx-auto px-4 py-8 bg-transparent min-h-screen">
      <BackButton label="Back to Lab" />
      
      {/* 1. HEADER HERO PANEL */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white shadow-xl mb-8">
        {/* Dynamic circular backdrop vectors */}
        <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -left-10 -bottom-10 w-48 h-48 rounded-full bg-white/5 blur-xl" />

        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6 flex-col sm:flex-row text-center sm:text-left">
            <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-4xl border border-white/20 shadow-inner">
              👨‍🔬
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-widest bg-white/25 px-3 py-1 rounded-full text-white/95">
                Level {rank.level}
              </span>
              <h2 className="text-3xl font-black mt-2 tracking-tight">{rank.title}</h2>
              <p className="text-white/80 text-xs font-bold mt-1">Virtual Science Lab Student</p>
            </div>
          </div>

          <div className="text-center md:text-right shrink-0">
            <p className="text-[10px] uppercase font-bold text-white/60 tracking-wider">Total Experience Points</p>
            <p className="text-5xl font-black tracking-tighter bg-gradient-to-b from-white to-slate-200 bg-clip-text text-transparent">
              {xp} <span className="text-2xl font-black text-amber-300">XP</span>
            </p>
          </div>
        </div>

        {/* Level progress bar */}
        <div className="mt-8 border-t border-white/15 pt-6">
          <div className="flex justify-between items-center text-xs font-bold mb-2">
            <span>Level {rank.level} Progress</span>
            {rank.nextXp ? (
              <span>{xp} / {rank.nextXp} XP ({rank.nextXp - xp} XP to Level {rank.level + 1})</span>
            ) : (
              <span>Max Rank Achieved! 🎓</span>
            )}
          </div>
          <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden border border-white/5 shadow-inner">
            <div
              className="bg-gradient-to-r from-amber-300 to-yellow-400 h-full rounded-full transition-all duration-500 shadow-md shadow-amber-300/10"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 2. BADGES SHOWCASE SECTION (2/3 width on desktop) */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 h-full">
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400 mb-6 flex items-center gap-2">
              🏆 Subject & Comprehension Badges ({unlockedBadges.length} / 7)
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {BADGES_CONFIG.map((badge) => {
                const isUnlocked = unlockedBadges.includes(badge.id);
                return (
                  <div
                    key={badge.id}
                    className={`relative overflow-hidden rounded-xl border p-4 flex gap-4 transition-all duration-300 ${
                      isUnlocked
                        ? `bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800/80 shadow-sm hover:scale-[1.02]`
                        : "bg-slate-100/50 dark:bg-slate-900/10 border-slate-200/50 dark:border-slate-900/40 opacity-40 grayscale"
                    }`}
                  >
                    {/* Badge Emoji container */}
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center text-3xl shadow-md shrink-0 ${
                      isUnlocked ? badge.color : "from-slate-300 to-slate-400 text-slate-100 dark:from-slate-700 dark:to-slate-800"
                    }`}>
                      {badge.emoji}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-extrabold text-sm text-slate-800 dark:text-slate-100 truncate">
                          {badge.title}
                        </h4>
                        {isUnlocked ? (
                          <span className="text-[9px] font-black tracking-wide uppercase bg-emerald-500/10 text-emerald-500 py-0.5 px-2 rounded-full border border-emerald-500/10">
                            Active
                          </span>
                        ) : (
                          <span className="text-[9px] font-black tracking-wide uppercase bg-slate-300 text-slate-600 dark:bg-slate-800 dark:text-slate-400 py-0.5 px-2 rounded-full">
                            Locked
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase mt-1">
                        {badge.subject} Suite
                      </p>
                      <p className="text-slate-500 dark:text-slate-400 text-xs mt-1.5 leading-snug">
                        {badge.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3. EXPERIMENT LAB CHECKLIST (1/3 width on desktop) */}
        <div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 h-full">
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400 mb-6 flex items-center gap-2">
              🧪 Lab Roadmap
            </h3>
            
            <p className="text-slate-400 text-xs font-bold mb-4 uppercase tracking-wider">
              Experiments Checklist
            </p>

            <div className="flex flex-col gap-3 max-h-[420px] overflow-y-auto pr-1">
              {EXPERIMENTS_ROADMAP.map((exp) => {
                const score = completedQuizzes[exp.id];
                const isCompleted = score !== undefined;
                
                return (
                  <Link
                    key={exp.id}
                    to={exp.link}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-200 text-left hover:scale-[1.01] hover:shadow-md ${
                      isCompleted
                        ? "bg-slate-50/60 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800/50"
                        : "bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-violet-500 dark:hover:border-violet-500"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${
                        isCompleted
                          ? "bg-emerald-500/10 text-emerald-500"
                          : "bg-slate-100 text-slate-400 dark:bg-slate-800"
                      }`}>
                        {isCompleted ? "✓" : "○"}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-xs text-slate-700 dark:text-slate-200">
                          {exp.title}
                        </h4>
                        <span className="text-[9px] font-black uppercase text-slate-400 dark:text-slate-500">
                          {exp.subject}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      {isCompleted ? (
                        <div className={`text-xs font-black px-2 py-0.5 rounded-full ${
                          score === 3
                            ? "bg-emerald-500/10 text-emerald-500"
                            : "bg-amber-500/10 text-amber-500"
                        }`}>
                          {score}/3 ⭐
                        </div>
                      ) : (
                        <div className="text-[10px] text-violet-500 dark:text-violet-400 font-bold hover:underline">
                          Start →
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
