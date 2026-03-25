import React, { useState, createContext, useContext } from 'react';

// ==========================================================
// 1. 建立「模擬雲端資料庫」 (Fake Database Context)
// ==========================================================
const DBContext = createContext();

// ==========================================================
// 2. 共用圖示與樣式 (Shared Icons & Styles)
// ==========================================================
const Icon = ({ children, className = "", onClick }) => (
  <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>{children}</svg>
);
const BookOpen = ({ className }) => <Icon className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></Icon>;
const ListTodo = ({ className }) => <Icon className={className}><path d="M14 14h6"/><path d="M14 19h6"/><path d="M14 9h6"/><path d="M4 14h.01"/><path d="M4 19h.01"/><path d="M4 9h.01"/></Icon>;
const User = ({ className }) => <Icon className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></Icon>;
const Trash2 = ({ className }) => <Icon className={className}><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></Icon>;
const PlusCircle = ({ className }) => <Icon className={className}><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></Icon>;
const Save = ({ className }) => <Icon className={className}><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></Icon>;
const Lock = ({ className }) => <Icon className={className}><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></Icon>;
const LogOut = ({ className }) => <Icon className={className}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></Icon>;
const Store = ({ className }) => <Icon className={className}><path d="m2 7 4.38-5.46a2 2 0 0 1 1.56-.78h8.12a2 2 0 0 1 1.56.78L22 7"/><path d="M2 13v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"/></Icon>;
const ShieldAlert = ({ className }) => <Icon className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v4"/><path d="M12 16h.01"/></Icon>;
const Users = ({ className }) => <Icon className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></Icon>;
const CheckCircle2 = ({ className }) => <Icon className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></Icon>;
const XCircle = ({ className }) => <Icon className={className}><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></Icon>;
const ShieldCheck = ({ className }) => <Icon className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></Icon>;
const Database = ({ className }) => <Icon className={className}><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></Icon>;
const UploadCloud = ({ className }) => <Icon className={className}><polyline points="16 16 12 12 8 16"/><line x1="12" x2="12" y1="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/><polyline points="16 16 12 12 8 16"/></Icon>;
const Edit = ({ className }) => <Icon className={className}><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></Icon>;
const Briefcase = ({ className }) => <Icon className={className}><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></Icon>;
const SproutLeaf = ({ className }) => <Icon className={className}><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></Icon>;
const Bell = ({ className }) => <Icon className={className}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></Icon>;
const Plus = ({ className }) => <Icon className={className}><path d="M5 12h14"/><path d="M12 5v14"/></Icon>;
const CircleDot = ({ className }) => <Icon className={className}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="1"/></Icon>;

const customStyles = `
  .badge-solid-rainbow { background: linear-gradient(90deg, #ef4444, #eab308, #3b82f6, #a855f7, #ef4444); background-size: 200% 200%; color: white; }
  .badge-solid-gold { background-color: #eab308; color: white; }
  .badge-solid-silver { background-color: #94a3b8; color: white; }
  .badge-solid-bronze { background-color: #b45309; color: white; }
  .badge-solid-black { background-color: #1f2937; color: white; }
  .badge-solid-green { background-color: #22c55e; color: white; }
  .badge-solid-gray { background-color: #f3f4f6; color: #4b5563; }

  @keyframes border-glow-rainbow { 0%, 100% { box-shadow: 0 0 8px #ef4444; border-color: #ef4444; } 33% { box-shadow: 0 0 14px #eab308; border-color: #eab308; } 66% { box-shadow: 0 0 14px #3b82f6; border-color: #3b82f6; } }
  @keyframes border-glow-gold { 0%, 100% { box-shadow: 0 0 6px #ca8a04; border-color: #ca8a04; } 50% { box-shadow: 0 0 16px #fde047; border-color: #fde047; } }
  @keyframes border-glow-silver { 0%, 100% { box-shadow: 0 0 5px #94a3b8; border-color: #94a3b8; } 50% { box-shadow: 0 0 14px #cbd5e1; border-color: #cbd5e1; } }
  @keyframes border-glow-bronze { 0%, 100% { box-shadow: 0 0 6px #b45309; border-color: #b45309; } 50% { box-shadow: 0 0 14px #d97706; border-color: #d97706; } }
  @keyframes border-glow-black { 0%, 100% { box-shadow: 0 0 5px #1f2937; border-color: #1f2937; } 50% { box-shadow: 0 0 12px #4b5563; border-color: #4b5563; } }
  @keyframes border-glow-green { 0%, 100% { box-shadow: 0 0 6px #16a34a; border-color: #16a34a; } 50% { box-shadow: 0 0 16px #4ade80; border-color: #4ade80; } }

  .card-glow-rainbow { animation: border-glow-rainbow 3s infinite; border-width: 2px; border-style: solid; }
  .card-glow-gold { animation: border-glow-gold 2s infinite; border-width: 2px; border-style: solid; }
  .card-glow-silver { animation: border-glow-silver 2s infinite; border-width: 2px; border-style: solid; }
  .card-glow-bronze { animation: border-glow-bronze 2s infinite; border-width: 2px; border-style: solid; }
  .card-glow-black { animation: border-glow-black 2.5s infinite; border-width: 2px; border-style: solid; }
  .card-glow-green { animation: border-glow-green 2s infinite; border-width: 2px; border-style: solid; }
`;

const RoleBadge = ({ role }) => {
  let badgeClass = "badge-solid-gray"; 
  let icon = null;
  if (role === '店長') badgeClass = "badge-solid-rainbow";
  else if (role === '副店長') badgeClass = "badge-solid-gold";
  else if (role === '組長') badgeClass = "badge-solid-silver";
  else if (role === '儲備') badgeClass = "badge-solid-bronze";
  else if (role === '正職' || role === '兼職') badgeClass = "badge-solid-black";
  else if (role === '實習正職' || role === '實習兼職') { badgeClass = "badge-solid-green"; icon = <SproutLeaf className="w-3.5 h-3.5 mr-1 fill-current" />; }
  return (
    <span className={`px-2.5 py-1 rounded text-[10px] font-bold inline-flex items-center tracking-wider shadow-sm ${badgeClass}`}>
      {icon}{role}
    </span>
  );
};

const getCardGlowClass = (role) => {
  if (role === '店長') return 'card-glow-rainbow';
  if (role === '副店長') return 'card-glow-gold';
  if (role === '組長') return 'card-glow-silver';
  if (role === '儲備') return 'card-glow-bronze';
  if (role === '正職' || role === '兼職') return 'card-glow-black';
  if (role === '實習正職' || role === '實習兼職') return 'card-glow-green';
  return 'border-gray-200 border-2 border-solid border-gray-100';
};

// ==========================================================
// 3. 【前端】員工視角組件
// ==========================================================
const FrontendPortal = () => {
  const { stores, learningSteps, tasks, employees, setEmployees, setProgressApprovals, pendingAccounts, setPendingAccounts, learningLevelUpThreshold } = useContext(DBContext);
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState('login'); 
  const [toast, setToast] = useState(null);
  const [activeTab, setActiveTab] = useState('learning'); 
  const [loggedInEmpId, setLoggedInEmpId] = useState(null);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3500); };
  
  const currentProfile = employees.find(emp => emp.id === loggedInEmpId);

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (authMode === 'register') {
      const name = e.target.empName.value;
      const store = e.target.store.value;
      const role = e.target.jobRole.value;
      setPendingAccounts(prev => [...prev, { id: `req_${Date.now()}`, name, store, requestedRole: role }]);
      showToast('註冊申請已送出！請通知店長或總部核准。');
      setAuthMode('login'); 
    } else {
      const name = e.target.empName.value;
      const emp = employees.find(e => e.name === name);
      if(emp) {
        setLoggedInEmpId(emp.id);
        setIsAuthenticated(true);
        setActiveTab('learning'); 
      } else {
        showToast('找不到此員工，請確認是否已註冊並通過審核！');
      }
    }
  };

  const handleRequestUnlock = (stepName) => {
    setProgressApprovals(prev => [...prev, {
      id: `pa_${Date.now()}`, employeeName: currentProfile.name, stepName: stepName, store: currentProfile.store
    }]);
    showToast('已送出審核申請，請等待核准！');
  };

  const handleIncrementTask = (taskId) => {
    setEmployees(prev => prev.map(emp => {
      if(emp.id === currentProfile.id) {
        const details = [...emp.tasksDetail];
        const taskIdx = details.findIndex(td => td.id === taskId);
        if(taskIdx >= 0) {
          details[taskIdx].count += 1;
        } else {
          const taskName = tasks.find(t => t.id === taskId)?.name || '未知工作';
          details.push({ id: taskId, name: taskName, count: 1 });
        }
        return { ...emp, tasksDetail: details };
      }
      return emp;
    }));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center font-sans relative">
        <div className="w-full max-w-md bg-white relative min-h-screen flex flex-col justify-center px-8 shadow-2xl sm:border-x border-gray-200">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-indigo-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm transform rotate-3">
              <User className="w-10 h-10 text-indigo-600 transform -rotate-3" />
            </div>
            <h1 className="text-2xl font-black text-gray-800">{authMode === 'login' ? '員工專屬系統' : '註冊員工帳號'}</h1>
            <p className="text-gray-500 text-sm mt-2">{authMode === 'login' ? '請輸入您的姓名登入' : '請填寫基本資料，並等待審核'}</p>
          </div>
          <form onSubmit={handleAuthSubmit} className="space-y-4">
            {authMode === 'register' && (
              <>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">申請門店</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3"><Store className="w-5 h-5 text-gray-400" /></span>
                    <select name="store" required defaultValue="" className="w-full pl-10 pr-10 p-3.5 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-gray-800 appearance-none font-medium">
                      <option value="" disabled>請選擇門店...</option>
                      {stores.map(store => <option key={store} value={store}>{store}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">申請職位別</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3"><Briefcase className="w-5 h-5 text-gray-400" /></span>
                    <select name="jobRole" required defaultValue="" className="w-full pl-10 pr-10 p-3.5 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-gray-800 appearance-none font-medium">
                      <option value="" disabled>請選擇職位...</option>
                      <option value="正職">正職</option><option value="兼職">兼職</option><option value="實習正職">實習正職</option><option value="實習兼職">實習兼職</option>
                    </select>
                  </div>
                </div>
              </>
            )}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">真實姓名 (登入帳號)</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3"><User className="w-5 h-5 text-gray-400" /></span>
                <input type="text" name="empName" required className="w-full pl-10 p-3.5 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-gray-800 font-medium" placeholder="例如：王小明" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">密碼</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3"><Lock className="w-5 h-5 text-gray-400" /></span>
                <input type="password" required minLength="6" maxLength="6" className="w-full pl-10 p-3.5 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-gray-800 font-medium" placeholder="請輸入6碼密碼" />
              </div>
            </div>
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl transition-transform active:scale-95 shadow-lg shadow-indigo-200 mt-6 text-lg">
              {authMode === 'login' ? '登入系統' : '送出註冊申請'}
            </button>
          </form>
          <div className="mt-8 text-center">
            <button onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')} className="text-indigo-600 hover:text-indigo-800 text-sm font-bold transition-colors">
              {authMode === 'login' ? '新進員工？點此註冊帳號' : '已經有帳號了？返回登入'}
            </button>
          </div>
          {toast && <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-5 py-3 rounded-xl shadow-xl z-50 text-sm font-bold whitespace-pre-wrap text-center w-11/12 max-w-[320px]">{toast}</div>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center font-sans">
      <div className="w-full max-w-md bg-slate-50 relative min-h-screen shadow-2xl overflow-hidden sm:border-x border-gray-200 flex flex-col">
        <header className="px-6 py-4 sticky top-0 z-20 shadow-sm flex items-center justify-between bg-white border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5 text-indigo-600" />
            <h1 className="text-lg font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">員工專屬系統</h1>
          </div>
          <button onClick={() => setIsAuthenticated(false)} className="w-8 h-8 rounded-full flex items-center justify-center transition-colors bg-gray-100 hover:bg-gray-200 text-gray-600">
            <LogOut className="w-4 h-4" />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-4 pb-28">
          {activeTab === 'learning' && (
            <div className="p-2">
              <h2 className="text-xl font-bold text-gray-800 mb-6">我的學習解鎖</h2>
              <div className="relative border-l-2 border-indigo-200 ml-4 space-y-8">
                {learningSteps.map((step, index) => (
                  <div key={step.id} className="relative pl-6">
                    <span className="absolute -left-[13px] top-1 bg-gray-50">
                      {step.status === 'completed' && <CheckCircle2 className="w-6 h-6 text-green-500 bg-white rounded-full" />}
                      {step.status === 'current' && <CircleDot className="w-6 h-6 text-indigo-600 animate-pulse bg-white rounded-full" />}
                      {step.status === 'locked' && <Lock className="w-6 h-6 text-gray-300 bg-white rounded-full" />}
                    </span>
                    <div className={`p-4 rounded-xl shadow-sm border ${step.status === 'completed' ? 'bg-white border-green-100' : step.status === 'current' ? 'bg-indigo-50 border-indigo-200 shadow-md ring-1 ring-indigo-100' : 'bg-gray-50 border-gray-100 opacity-70'}`}>
                      <div className="flex justify-between items-center mb-1">
                        <h3 className={`font-bold ${step.status === 'locked' ? 'text-gray-500' : 'text-gray-800'}`}>{index + 1}. {step.title}</h3>
                        {step.status === 'completed' && <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">已完成</span>}
                        {step.status === 'current' && <span className="text-xs font-semibold text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full">進行中</span>}
                      </div>
                      <p className="text-sm text-gray-500 mt-2">{step.description}</p>
                      {step.status === 'current' && (
                        <button onClick={() => handleRequestUnlock(step.title)} className="mt-3 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg text-sm transition-colors shadow-sm">
                          申請審核解鎖
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'tasks' && (
            <div className="p-2 pb-24">
              <h2 className="text-xl font-bold text-gray-800 mb-2">工作成就紀錄</h2>
              <p className="text-gray-500 text-sm mb-6">點擊下方按鈕紀錄你的每一次努力！</p>
              <div className="grid grid-cols-2 gap-4">
                {tasks.map((task) => {
                  const empTaskCount = currentProfile?.tasksDetail?.find(t => t.id === task.id)?.count || 0;
                  return (
                    <div key={task.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center relative overflow-hidden">
                      <div className="bg-indigo-50 p-3 rounded-full mb-3 border border-indigo-100"><ListTodo className="w-6 h-6 text-indigo-500" /></div>
                      <h3 className="text-gray-600 font-bold text-sm">{task.name}</h3>
                      <div className="text-3xl font-black text-gray-800 my-2">{empTaskCount}</div>
                      <button onClick={() => handleIncrementTask(task.id)} className="mt-2 flex items-center justify-center space-x-1 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-xl text-sm font-bold transition-colors w-full shadow-sm">
                        <Plus className="w-4 h-4" /><span>紀錄 +1</span>
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {activeTab === 'profile' && currentProfile && (
            <div className="space-y-6 p-2 pb-24">
              <h2 className="text-xl font-bold text-gray-800 mb-6">個人資料設定</h2>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-gray-200 flex flex-col relative overflow-hidden shadow-sm">
                <div className={`flex justify-between items-start mb-4 p-3 rounded-xl bg-white z-10 ${getCardGlowClass(currentProfile.position || currentProfile.role)}`}>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center border border-gray-200 shadow-inner"><User className="w-5 h-5 text-gray-400" /></div>
                    <div>
                      <h3 className="font-bold text-gray-800">{currentProfile.name}</h3>
                      <div className="mt-1 flex items-center space-x-2"><span className="text-xs text-gray-500">{currentProfile.department || currentProfile.store}</span><RoleBadge role={currentProfile.position || currentProfile.role} /></div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center px-2 mb-1 z-10">
                  <div className="text-center flex-1 flex flex-col justify-center">
                    <p className="text-[10px] text-gray-500 font-bold mb-1">目前等級</p>
                    <div className="bg-indigo-50 py-1.5 px-2 rounded-lg shadow-sm border border-indigo-100 flex items-center justify-center space-x-1 h-full">
                      <span className="text-sm font-black text-indigo-600">Lv. {Math.floor((currentProfile.completedLearning || 0) / learningLevelUpThreshold)}</span>
                      <span className="text-[10px] text-indigo-400 font-bold">({currentProfile.completedLearning || 0}項)</span>
                    </div>
                  </div>
                  <div className="w-px h-8 bg-gray-200 mx-3"></div>
                  <div className="text-center flex-1 flex flex-col justify-center">
                    <p className="text-[10px] text-gray-500 font-bold mb-1">工作次數總計</p>
                    <div className="bg-blue-50 py-1.5 rounded-lg border border-blue-100 flex flex-col items-center h-full justify-center">
                      <p className="text-sm font-black text-blue-600">{currentProfile.tasksDetail?.reduce((sum, t) => sum + t.count, 0) || 0} 次</p>
                    </div>
                  </div>
                </div>
                {currentProfile.tasksDetail && currentProfile.tasksDetail.length > 0 && (
                  <div className="bg-white rounded-lg border border-gray-200 p-2.5 mt-3 z-10 shadow-sm">
                     <p className="text-[10px] text-gray-400 font-bold mb-1.5">我的工作項目明細：</p>
                     <div className="flex flex-wrap gap-2">
                       {currentProfile.tasksDetail.map(t => (
                         <span key={t.id} className="text-xs bg-gray-50 border border-gray-100 text-gray-600 px-2 py-1 rounded-md flex items-center font-medium">
                           {t.name} <span className="font-black text-blue-600 ml-1.5">{t.count}</span>
                         </span>
                       ))}
                     </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>

        <nav className="absolute bottom-0 w-full bg-white border-t border-gray-200 flex justify-around items-center h-20 px-1 pb-safe z-20">
          <button onClick={() => setActiveTab('learning')} className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${activeTab === 'learning' ? 'text-indigo-600' : 'text-gray-400'}`}>
            <BookOpen className={`w-5 h-5 ${activeTab === 'learning' ? 'fill-indigo-50' : ''}`} /><span className="text-[10px] font-bold">學習解鎖</span>
          </button>
          <button onClick={() => setActiveTab('tasks')} className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${activeTab === 'tasks' ? 'text-indigo-600' : 'text-gray-400'}`}>
            <ListTodo className={`w-5 h-5 ${activeTab === 'tasks' ? 'fill-indigo-50' : ''}`} /><span className="text-[10px] font-bold">工作項目</span>
          </button>
          <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${activeTab === 'profile' ? 'text-indigo-600' : 'text-gray-400'}`}>
            <User className={`w-5 h-5 ${activeTab === 'profile' ? 'fill-indigo-50' : ''}`} /><span className="text-[10px] font-bold">資料設定</span>
          </button>
        </nav>
        {toast && <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-5 py-3 rounded-xl shadow-xl z-50 text-sm font-bold whitespace-pre-wrap text-center w-11/12 max-w-[320px] transition-all">{toast}</div>}
      </div>
    </div>
  );
};


// ==========================================================
// 4. 【後端】管理員視角組件
// ==========================================================
const BackendPortal = () => {
  const { stores, setStores, learningSteps, setLearningSteps, tasks, setTasks, employees, setEmployees, pendingAccounts, setPendingAccounts, progressApprovals, setProgressApprovals, approvedHistory, setApprovedHistory, learningLevelUpThreshold, setLearningLevelUpThreshold } = useContext(DBContext);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState('login'); 
  const [currentUserRole, setCurrentUserRole] = useState(null); 
  const [currentUserName, setCurrentUserName] = useState(''); 
  const [toast, setToast] = useState(null);
  const [showSecretModal, setShowSecretModal] = useState(false);
  const [secretPwd, setSecretPwd] = useState('');
  const [secretError, setSecretError] = useState('');
  const [showManagerLearning, setShowManagerLearning] = useState(false);
  
  const jobRoles = ['店長', '副店長', '組長', '儲備', '正職', '兼職', '實習正職', '實習兼職'];
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);
  const [editEmployeeData, setEditEmployeeData] = useState({ name: '', store: '', role: '' });

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3500); };
  const canEdit = currentUserRole === 'super_admin';
  const [activeTab, setActiveTab] = useState('learning'); 

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (authMode === 'register') {
      const name = e.target.empName.value;
      const store = e.target.store.value;
      const role = e.target.jobRole.value;
      setPendingAccounts(prev => [...prev, { id: `req_${Date.now()}`, name, store, requestedRole: role }]);
      showToast('註冊申請已送出！請等待總部審核。');
      setAuthMode('login'); 
    } else {
      setIsAuthenticated(true);
      setCurrentUserRole('manager');
      setCurrentUserName('林大姐 (店長)');
      setActiveTab('learning'); 
      setShowManagerLearning(false); 
    }
  };

  const handleSecretClick = () => { if (authMode !== 'login') return; setShowSecretModal(true); setSecretPwd(''); setSecretError(''); };

  const handleSecretSubmit = (e) => {
    e.preventDefault();
    if (secretPwd.trim() === '0204') {
      setIsAuthenticated(true);
      setCurrentUserRole('super_admin');
      setCurrentUserName('總部管理員');
      setActiveTab('learning');
      setShowSecretModal(false);
    } else { setSecretError('密碼錯誤，無權限進入總部系統！'); }
  };

  const handleApproveProgress = (approval) => {
    setProgressApprovals(prev => prev.filter(p => p.id !== approval.id));
    setApprovedHistory([{ ...approval, id: `ah_${Date.now()}`, date: new Date().toISOString().split('T')[0], approvedBy: currentUserName, status: 'approved' }, ...approvedHistory]);
    setEmployees(prev => prev.map(emp => emp.name === approval.employeeName ? { ...emp, completedLearning: (emp.completedLearning || 0) + 1 } : emp));
    showToast(`已核准學習進度！`);
  };

  const handleApproveAccount = (account) => {
    if (!canEdit) return;
    setPendingAccounts(pendingAccounts.filter(acc => acc.id !== account.id));
    setEmployees([{ id: `emp_${Date.now()}`, name: account.name, role: account.requestedRole, store: account.store, completedLearning: 0, tasksDetail: [] }, ...employees]);
    showToast(`${account.name} 的帳號已核准並加入人員名單！`);
  };
  
  const handleRejectAccount = (id) => {
    if (!canEdit) return;
    setPendingAccounts(pendingAccounts.filter(acc => acc.id !== id));
    showToast('已拒絕該申請');
  };

  const handleDeleteEmployee = (id) => {
    if (!canEdit) return;
    setEmployees(prev => prev.filter(emp => emp.id !== id));
    showToast('人員資料已刪除');
  };

  const startEditEmployee = (emp) => {
    setEditingEmployeeId(emp.id);
    setEditEmployeeData({ name: emp.name, store: emp.store, role: emp.role });
  };

  const saveEditEmployee = (id) => {
    setEmployees(prev => prev.map(emp => 
      emp.id === id ? { ...emp, name: editEmployeeData.name, store: editEmployeeData.store, role: editEmployeeData.role } : emp
    ));
    setEditingEmployeeId(null);
    showToast('人員資料已更新');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center font-sans relative">
        <div className="w-full max-w-md bg-white relative min-h-screen flex flex-col justify-center px-8 shadow-2xl sm:border-x border-gray-200">
          <div className="text-center mb-10">
            <div onClick={handleSecretClick} className="w-20 h-20 bg-indigo-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm transform rotate-3 cursor-pointer hover:bg-indigo-200 transition-colors">
              <ShieldCheck className="w-10 h-10 text-indigo-600 transform -rotate-3 pointer-events-none" />
            </div>
            <h1 className="text-2xl font-black text-gray-800">{authMode === 'login' ? '後台管理系統' : '註冊管理帳號'}</h1>
            <p className="text-gray-500 text-sm mt-2">{authMode === 'login' ? '請選擇登入門店' : '請填寫資料，並等待總部核准'}</p>
          </div>
          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">{authMode === 'login' ? '登入門店' : '申請門店'}</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3"><Store className="w-5 h-5 text-gray-400" /></span>
                <select name="store" required defaultValue="" className="w-full pl-10 pr-10 p-3.5 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-gray-800 appearance-none font-medium">
                  <option value="" disabled>請選擇門店...</option>
                  {stores.map(store => <option key={store} value={store}>{store}</option>)}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>
            {authMode === 'register' && (
              <>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">真實姓名</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3"><User className="w-5 h-5 text-gray-400" /></span>
                    <input type="text" name="empName" required className="w-full pl-10 p-3.5 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-gray-800 font-medium" placeholder="例如：李大明" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">申請職位別</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3"><Briefcase className="w-5 h-5 text-gray-400" /></span>
                    <select name="jobRole" required defaultValue="" className="w-full pl-10 pr-10 p-3.5 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-gray-800 appearance-none font-medium">
                      <option value="" disabled>請選擇職位...</option>
                      {jobRoles.map(role => <option key={role} value={role}>{role}</option>)}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                </div>
              </>
            )}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">密碼</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3"><Lock className="w-5 h-5 text-gray-400" /></span>
                <input type="password" required minLength="6" maxLength="6" className="w-full pl-10 p-3.5 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-gray-800 font-medium" placeholder="請輸入6碼密碼" />
              </div>
            </div>
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl transition-transform active:scale-95 shadow-lg shadow-indigo-200 mt-6 text-lg">
              {authMode === 'login' ? '登入系統' : '送出註冊申請'}
            </button>
          </form>
          <div className="mt-8 text-center">
            <button onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')} className="text-indigo-600 hover:text-indigo-800 text-sm font-bold transition-colors">
              {authMode === 'login' ? '申請管理帳號' : '已經有帳號了？返回登入'}
            </button>
          </div>
          {showSecretModal && (
            <div className="absolute inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center p-4">
              <div className="bg-white p-6 rounded-3xl shadow-2xl w-full max-w-sm transform transition-all">
                <div className="flex items-center space-x-2 mb-2"><Database className="w-6 h-6 text-gray-800" /><h3 className="text-xl font-black text-gray-900">總部最高權限登入</h3></div>
                <p className="text-sm text-gray-500 mb-5 font-medium">請輸入總部專屬管理密碼</p>
                <form onSubmit={handleSecretSubmit}>
                  <input type="password" autoFocus value={secretPwd} onChange={(e) => setSecretPwd(e.target.value)} className="w-full p-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-slate-800 outline-none mb-2 font-medium bg-white text-gray-800" placeholder="輸入密碼" />
                  {secretError && <p className="text-xs text-red-500 mb-3 font-bold">{secretError}</p>}
                  <div className="flex space-x-3 mt-4">
                    <button type="button" onClick={() => setShowSecretModal(false)} className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl font-bold transition-colors">取消</button>
                    <button type="submit" className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-colors shadow-lg">登入</button>
                  </div>
                </form>
              </div>
            </div>
          )}
          {toast && <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-5 py-3 rounded-xl shadow-xl z-50 text-sm font-bold whitespace-pre-wrap text-center w-11/12 max-w-[320px]">{toast}</div>}
        </div>
      </div>
    );
  }

  const addLearningStep = () => {
    if (!canEdit) return;
    setLearningSteps([...learningSteps, { id: Date.now(), title: '新學習項目', description: '', mediaUrl: '', fileName: '', status: 'locked' }]);
  };
  const updateLearningStep = (id, field, value) => {
    if (!canEdit) return;
    setLearningSteps(steps => steps.map(step => step.id === id ? { ...step, [field]: value } : step));
  };
  const deleteLearningStep = (id) => {
    if (!canEdit) return;
    setLearningSteps(steps => steps.filter(step => step.id !== id));
  };

  const handleFileUpload = (id, e) => {
    if (!canEdit) return;
    const file = e.target.files[0];
    if (file) {
      updateLearningStep(id, 'mediaUrl', URL.createObjectURL(file));
      updateLearningStep(id, 'fileName', file.name);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center font-sans">
      <div className="w-full max-w-md bg-slate-50 relative min-h-screen shadow-2xl overflow-hidden sm:border-x border-gray-200 flex flex-col">
        <header className="px-6 py-4 sticky top-0 z-20 shadow-sm flex items-center justify-between bg-white border-b border-gray-100">
          <div className="flex items-center space-x-2">
            {canEdit ? <Database className="w-5 h-5 text-gray-800" /> : <Store className="w-5 h-5 text-indigo-600" />}
            <h1 className={`text-lg font-black ${canEdit ? 'text-gray-900 tracking-wider' : 'bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'}`}>{canEdit ? '總部最高權限' : '人員管理 (店長)'}</h1>
          </div>
          <div className="flex items-center space-x-3">
            {canEdit && (
              <button onClick={() => setActiveTab('pending')} className="relative p-1 text-gray-500 hover:text-indigo-600 transition-colors" title="前往審核名單">
                <Bell className="w-6 h-6" />
                {pendingAccounts.length > 0 && <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>}
              </button>
            )}
            {canEdit && (
              <button onClick={() => showToast('資料庫已同步發布更新！')} className="w-8 h-8 rounded-full flex items-center justify-center transition-colors bg-blue-50 hover:bg-blue-100 text-blue-600 shadow-sm" title="發布變更至全系統"><Save className="w-4 h-4" /></button>
            )}
            <button onClick={handleLogout} className="w-8 h-8 rounded-full flex items-center justify-center transition-colors bg-gray-100 hover:bg-gray-200 text-gray-600"><LogOut className="w-4 h-4" /></button>
          </div>
        </header>

        {canEdit && <div className="bg-blue-50 border-b border-blue-100 p-2 flex items-center justify-center text-xs text-blue-700 font-bold">※ 您正以總部管理員身分登入，具備完整編輯與刪除權限。</div>}

        <main className="flex-1 overflow-y-auto p-4 pb-28">
          {activeTab === 'learning' && (
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-xl shadow-sm border border-indigo-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center"><CheckCircle2 className="w-5 h-5 text-indigo-500 mr-2" />員工進度審核</h2>
                {progressApprovals.length > 0 && (
                  <div className="space-y-3 mb-6">
                    <h3 className="text-sm font-bold text-gray-600">待審核進度</h3>
                    {progressApprovals.map(approval => (
                      <div key={approval.id} className="bg-gray-50 p-3 rounded-lg border border-gray-200 flex justify-between items-center shadow-sm">
                        <div>
                          <p className="font-bold text-gray-800 text-sm">{approval.employeeName}</p>
                          <p className="text-xs text-gray-500 mt-1">申請解鎖：<span className="font-semibold text-indigo-600">{approval.stepName}</span></p>
                        </div>
                        <button onClick={() => handleApproveProgress(approval)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center space-x-1 shadow-sm"><CheckCircle2 className="w-4 h-4" /><span>核准</span></button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="space-y-3 pt-2 border-t border-gray-100">
                  <h3 className="text-sm font-bold text-gray-600">近期已核准紀錄</h3>
                  {approvedHistory.map(history => (
                    <div key={history.id} className="bg-white p-3 rounded-lg border border-green-100 flex flex-col relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-green-400"></div>
                      <div className="flex justify-between items-start">
                        <p className="font-bold text-gray-800 text-sm">{history.employeeName}</p>
                        <span className="text-[10px] text-green-600 bg-green-50 px-2 py-1 rounded font-bold">已核准</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">完成：{history.stepName}</p>
                      <p className="text-[10px] text-gray-400 mt-2 flex items-center"><ShieldCheck className="w-3 h-3 mr-1 text-green-500" />審核者：<span className="font-bold text-gray-600 ml-1">{history.approvedBy}</span></p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <div><h2 className="text-xl font-bold text-gray-800">學習內容設定</h2>{!canEdit && <p className="text-xs text-red-500 mt-1">※ 僅總公司具備修改權限</p>}</div>
                  {canEdit && <button onClick={addLearningStep} className="flex items-center space-x-1 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg text-sm font-bold transition-colors"><PlusCircle className="w-4 h-4" /><span>新增內容</span></button>}
                </div>
                {canEdit && (
                  <div className="mb-6 bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex items-center justify-between shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className="bg-indigo-100 p-2 rounded-lg"><BookOpen className="w-5 h-5 text-indigo-600" /></div>
                      <div><h3 className="text-sm font-bold text-indigo-900">學習升級門檻</h3><p className="text-[10px] text-indigo-600 mt-0.5">每完成指定數量，等級提升 1 級</p></div>
                    </div>
                    <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg border border-indigo-200 shadow-sm">
                      <span className="text-xs font-bold text-gray-600">每</span>
                      <input type="number" min="1" max="10" value={learningLevelUpThreshold} onChange={(e) => setLearningLevelUpThreshold(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))} className="w-10 text-center border-b-2 border-indigo-500 font-black text-indigo-600 text-base outline-none bg-transparent"/>
                      <span className="text-xs font-bold text-gray-600">項 / 1 級</span>
                    </div>
                  </div>
                )}
                {!canEdit && !showManagerLearning ? (
                  <button onClick={() => setShowManagerLearning(true)} className="w-full mt-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 py-3.5 rounded-xl text-sm font-bold transition-colors flex justify-center items-center shadow-sm"><BookOpen className="w-4 h-4 mr-2 text-indigo-500" />展開檢視學習內容</button>
                ) : (
                  <div className="space-y-6">
                    {learningSteps.map((step, index) => (
                      <div key={step.id} className={`flex flex-col gap-3 p-4 rounded-lg border relative ${canEdit ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-100 shadow-sm'}`}>
                        {canEdit && <button onClick={() => deleteLearningStep(step.id)} className="absolute top-2 right-2 p-1.5 text-red-400 hover:bg-red-50 hover:text-red-600 rounded transition-colors"><Trash2 className="w-4 h-4" /></button>}
                        <div className="flex items-center space-x-2">
                          <div className="font-black text-gray-400 text-lg w-5">{index + 1}.</div>
                          <div className="flex flex-1 gap-2 pr-6">
                            <input type="text" value={step.title} disabled={!canEdit} onChange={(e) => updateLearningStep(step.id, 'title', e.target.value)} className="flex-1 p-2 border border-gray-300 rounded font-bold text-gray-800 bg-white disabled:bg-gray-50 disabled:text-gray-500 text-base outline-none focus:ring-2 focus:ring-indigo-500" placeholder="請輸入標題"/>
                            {canEdit && (
                              <select value={step.status} onChange={(e) => updateLearningStep(step.id, 'status', e.target.value)} className="p-1 border border-gray-300 rounded bg-white text-xs font-bold focus:ring-2 focus:ring-indigo-500 text-gray-800">
                                <option value="completed">已完成</option><option value="current">進行中</option><option value="locked">未解鎖</option>
                              </select>
                            )}
                          </div>
                        </div>
                        <div className="pl-7"><textarea value={step.description} disabled={!canEdit} onChange={(e) => updateLearningStep(step.id, 'description', e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg text-sm text-gray-800 bg-white disabled:bg-gray-50 disabled:text-gray-500 disabled:resize-none outline-none focus:ring-2 focus:ring-indigo-500" placeholder="請輸入學習內容或規範說明..." rows="3"/></div>
                        <div className="pl-7 flex items-center space-x-3 mt-1">
                          {canEdit ? (
                            <><label className="flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-3 py-2 rounded-lg cursor-pointer transition-colors text-xs font-bold shadow-sm"><UploadCloud className="w-4 h-4 mr-1.5 text-indigo-500" />上傳相片/影片<input type="file" accept="image/*,video/*" className="hidden" onChange={(e) => handleFileUpload(step.id, e)} /></label><span className="text-xs text-gray-500 truncate max-w-[150px]">{step.fileName || '尚未上傳檔案'}</span></>
                          ) : (
                            <div className="flex items-center space-x-2 text-xs font-medium bg-gray-50 px-3 py-2 rounded-lg border border-gray-100 text-gray-500 w-full"><UploadCloud className="w-4 h-4 text-gray-400" /><span className="truncate">{step.fileName || '無附加媒體檔案'}</span></div>
                          )}
                        </div>
                      </div>
                    ))}
                    {!canEdit && showManagerLearning && <button onClick={() => setShowManagerLearning(false)} className="w-full mt-2 text-gray-400 hover:text-gray-600 py-2 text-xs font-bold transition-colors text-center">▲ 收起學習內容</button>}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'tasks' && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-6"><div><h2 className="text-xl font-bold text-gray-800">工作項目管理</h2><p className="text-xs text-gray-500 mt-1">店長與總部皆可新增項目及修改全局次數</p></div></div>
              <table className="w-full text-left text-sm">
                <thead><tr className="bg-gray-100 border-b border-gray-200"><th className="p-3 text-gray-600">名稱</th><th className="p-3 text-gray-600">全局次數</th><th className="p-3 text-right">操作</th></tr></thead>
                <tbody>
                  {tasks.map(task => (
                    <tr key={task.id} className="border-b border-gray-100">
                      <td className="p-3"><input type="text" value={task.name} onChange={(e) => setTasks(tasks.map(t => t.id === task.id ? { ...t, name: e.target.value } : t))} className="w-full p-2 border border-gray-300 rounded font-medium focus:ring-2 focus:ring-indigo-500 bg-white text-gray-800 outline-none"/></td>
                      <td className="p-3"><input type="number" value={task.count} onChange={(e) => setTasks(tasks.map(t => t.id === task.id ? { ...t, count: parseInt(e.target.value)||0 } : t))} className="w-16 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 bg-white text-gray-800 outline-none"/></td>
                      <td className="p-3 text-right"><button onClick={() => setTasks(tasks.filter(t => t.id !== task.id))} className="text-red-500 p-2 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button onClick={() => setTasks([...tasks, { id: `task_${Date.now()}`, name: '新項目', count: 0 }])} className="mt-4 flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 font-medium p-2 text-sm"><PlusCircle className="w-4 h-4" /><span>新增項目</span></button>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-6">
              {canEdit && (
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center"><Store className="w-4 h-4 mr-2 text-indigo-500" />系統門店類別設定</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {stores.map(store => (
                      <span key={store} className="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full text-xs font-bold border border-indigo-100 flex items-center shadow-sm">
                        {store}<button onClick={() => setStores(stores.filter(s => s !== store))} className="ml-2 text-indigo-400 hover:text-red-500 transition-colors"><XCircle className="w-3.5 h-3.5" /></button>
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <input type="text" value={newStoreName} onChange={e => setNewStoreName(e.target.value)} placeholder="新增門店名稱..." className="flex-1 p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-gray-800"/>
                    <button onClick={() => { if(newStoreName.trim()) { setStores([...stores, newStoreName.trim()]); setNewStoreName(''); } }} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">新增</button>
                  </div>
                </div>
              )}

              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-6">
                  <div><h2 className="text-xl font-bold text-gray-800">人員資料庫</h2>{!canEdit && <p className="text-[10px] text-red-500 mt-1">※ 僅總公司具備修改與刪除權限</p>}</div>
                </div>
                <div className="space-y-4">
                  {employees.map(emp => {
                    const totalTasks = emp.tasksDetail?.reduce((sum, t) => sum + t.count, 0) || 0;
                    return (
                      <div key={emp.id} className="bg-slate-50 p-3.5 rounded-xl border border-gray-200 flex flex-col relative overflow-hidden shadow-sm">
                        {editingEmployeeId === emp.id ? (
                           <div className="flex flex-col space-y-3 bg-blue-50 p-3 rounded-lg border border-blue-100">
                             <input type="text" value={editEmployeeData.name} onChange={(e) => setEditEmployeeData({...editEmployeeData, name: e.target.value})} className="p-2 border border-gray-300 rounded font-medium text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-800" placeholder="修改員工姓名"/>
                             <select value={editEmployeeData.store} onChange={(e) => setEditEmployeeData({...editEmployeeData, store: e.target.value})} className="p-2 border border-gray-300 rounded text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-800">
                               {stores.map(store => <option key={store} value={store}>{store}</option>)}
                             </select>
                             <select value={editEmployeeData.role} onChange={(e) => setEditEmployeeData({...editEmployeeData, role: e.target.value})} className="p-2 border border-gray-300 rounded text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-800">
                               {jobRoles.map(role => <option key={role} value={role}>{role}</option>)}
                             </select>
                             <div className="flex space-x-2 mt-1">
                               <button onClick={() => setEditingEmployeeId(null)} className="flex-1 py-2 bg-gray-200 text-gray-700 text-xs font-bold rounded-lg transition-colors">取消</button>
                               <button onClick={() => saveEditEmployee(emp.id)} className="flex-1 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg shadow-sm transition-colors">儲存</button>
                             </div>
                           </div>
                        ) : (
                          <>
                            <div className={`flex justify-between items-start mb-4 p-3 rounded-xl bg-white z-10 ${getCardGlowClass(emp.role)}`}>
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center border border-gray-200 shadow-inner"><User className="w-5 h-5 text-gray-400" /></div>
                                <div><h3 className="font-bold text-gray-800">{emp.name}</h3><div className="mt-1 flex items-center space-x-2"><span className="text-xs text-gray-500">{emp.store}</span><RoleBadge role={emp.role} /></div></div>
                              </div>
                              {canEdit && (
                                <div className="flex items-center space-x-1">
                                  <button onClick={() => startEditEmployee(emp)} className="text-gray-400 hover:text-indigo-600 p-1.5 hover:bg-gray-100 rounded transition-colors"><Edit className="w-4 h-4" /></button>
                                  <button onClick={() => handleDeleteEmployee(emp.id)} className="text-gray-400 hover:text-red-500 p-1.5 hover:bg-red-50 rounded transition-colors"><Trash2 className="w-4 h-4" /></button>
                                </div>
                              )}
                            </div>
                            <div className="flex justify-between items-center px-2 mb-1 z-10">
                              <div className="text-center flex-1 flex flex-col justify-center">
                                <p className="text-[10px] text-gray-500 font-bold mb-1">等級</p>
                                <div className="bg-indigo-50 py-1.5 px-2 rounded-lg shadow-sm border border-indigo-100 flex items-center justify-center space-x-1 h-full">
                                  <span className="text-sm font-black text-indigo-600">Lv. {Math.floor((emp.completedLearning || 0) / learningLevelUpThreshold)}</span>
                                  <span className="text-[10px] text-indigo-400 font-bold">({emp.completedLearning || 0}項)</span>
                                </div>
                              </div>
                              <div className="w-px h-8 bg-gray-200 mx-3"></div>
                              <div className="text-center flex-1 flex flex-col justify-center">
                                <p className="text-[10px] text-gray-500 font-bold mb-1">工作次數總計</p>
                                <div className="bg-blue-50 py-1.5 rounded-lg border border-blue-100 flex flex-col items-center h-full justify-center"><p className="text-sm font-black text-blue-600">{totalTasks} 次</p></div>
                              </div>
                            </div>
                            {emp.tasksDetail && emp.tasksDetail.length > 0 && (
                              <div className="bg-white rounded-lg border border-gray-200 p-2.5 mt-3 z-10 shadow-sm">
                                 <p className="text-[10px] text-gray-400 font-bold mb-1.5">依據工作項目統計：</p>
                                 <div className="flex flex-wrap gap-2">
                                   {emp.tasksDetail.map(t => (
                                     <span key={t.id} className="text-xs bg-gray-50 border border-gray-100 text-gray-600 px-2 py-1 rounded-md flex items-center font-medium">{t.name} <span className="font-black text-blue-600 ml-1.5">{t.count}</span></span>
                                   ))}
                                 </div>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pending' && canEdit && (
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-4">新進人員審核清單</h2>
              {pendingAccounts.length === 0 ? (
                <div className="bg-white p-8 rounded-xl border border-gray-200 text-center text-gray-500 text-sm">目前沒有待審核的註冊申請。</div>
              ) : (
                <div className="space-y-4">
                  {pendingAccounts.map((account) => (
                    <div key={account.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 relative overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
                      <div className="flex justify-between items-start mb-2">
                        <div><h3 className="font-bold text-gray-800 text-lg">{account.name}</h3><p className="text-xs text-gray-500 font-mono mt-1">申請門店: {account.store}</p></div>
                        <RoleBadge role={account.requestedRole} />
                      </div>
                      <div className="flex space-x-2 pt-3 border-t border-gray-100 mt-3">
                        <button onClick={() => handleApproveAccount(account)} className="flex-1 flex items-center justify-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition-colors"><CheckCircle2 className="w-4 h-4" /><span>核准並加入人員名單</span></button>
                        <button onClick={() => handleRejectAccount(account.id)} className="flex items-center justify-center space-x-1 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors"><XCircle className="w-4 h-4" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </main>

        <nav className="absolute bottom-0 w-full bg-white border-t border-gray-200 flex justify-around items-center h-20 px-1 pb-safe z-20">
          <button onClick={() => setActiveTab('learning')} className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${activeTab === 'learning' ? 'text-blue-600' : 'text-gray-400'}`}>
            <BookOpen className={`w-5 h-5 ${activeTab === 'learning' ? (canEdit ? 'fill-blue-50' : 'fill-indigo-50') : ''}`} /><span className="text-[10px] font-bold">學習解鎖</span>
          </button>
          <button onClick={() => setActiveTab('tasks')} className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${activeTab === 'tasks' ? (canEdit ? 'text-blue-600' : 'text-indigo-600') : 'text-gray-400'}`}>
            <ListTodo className={`w-5 h-5 ${activeTab === 'tasks' ? (canEdit ? 'fill-blue-50' : 'fill-indigo-50') : ''}`} /><span className="text-[10px] font-bold">工作項目</span>
          </button>
          <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${activeTab === 'profile' || activeTab === 'pending' ? 'text-blue-600' : 'text-gray-400'}`}>
            <User className={`w-5 h-5 ${activeTab === 'profile' || activeTab === 'pending' ? 'fill-blue-50' : ''}`} /><span className="text-[10px] font-bold">人員資料庫</span>
          </button>
        </nav>
        {toast && <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-5 py-3 rounded-xl shadow-xl z-50 text-sm font-bold whitespace-pre-wrap text-center w-11/12 max-w-[320px] transition-all">{toast}</div>}
      </div>
    </div>
  );
};

// ==========================================================
// 5. 系統切換入口 App (包含 Context Provider)
// ==========================================================
export default function App() {
  const [systemMode, setSystemMode] = useState('frontend'); 
  
  // 共享的全局狀態
  const [stores, setStores] = useState(['忠孝復興店', '信義威秀店', '中山南西店']);
  const [learningLevelUpThreshold, setLearningLevelUpThreshold] = useState(3);
  const [learningSteps, setLearningSteps] = useState([
    { id: 1, title: '環境介紹與安全規範', description: '認識店內環境、逃生路線與基本安全常識', status: 'completed' },
    { id: 2, title: '收桌與清潔標準', description: '學習正確的收桌流程與桌面消毒方式', status: 'completed' },
    { id: 3, title: '洗碗機操作教學', description: '洗碗機基本操作與故障排除', status: 'current' },
  ]);
  const [tasks, setTasks] = useState([
    { id: 'wash', name: '洗了幾次碗', count: 0 },
    { id: 'clean', name: '收了幾次桌', count: 0 },
  ]);
  const [employees, setEmployees] = useState([
    { id: 'emp1', name: '王小明', role: '實習正職', store: '忠孝復興店', completedLearning: 5, tasksDetail: [ { id: 'wash', name: '洗了幾次碗', count: 120 }, { id: 'clean', name: '收了幾次桌', count: 362 } ] },
    { id: 'emp2', name: '張大頭', role: '正職', store: '忠孝復興店', completedLearning: 8, tasksDetail: [ { id: 'wash', name: '洗了幾次碗', count: 500 }, { id: 'clean', name: '收了幾次桌', count: 1030 } ] },
  ]);
  const [pendingAccounts, setPendingAccounts] = useState([
    { id: 'req_001', name: '李阿明', requestedRole: '副店長', store: '忠孝復興店', date: '2026-03-25' }
  ]);
  const [progressApprovals, setProgressApprovals] = useState([]);
  const [approvedHistory, setApprovedHistory] = useState([]);

  return (
    <DBContext.Provider value={{
      stores, setStores, learningLevelUpThreshold, setLearningLevelUpThreshold,
      learningSteps, setLearningSteps, tasks, setTasks, employees, setEmployees,
      pendingAccounts, setPendingAccounts, progressApprovals, setProgressApprovals,
      approvedHistory, setApprovedHistory
    }}>
      <style>{customStyles}</style>
      <div className="relative h-screen w-full bg-gray-100 overflow-hidden">
        {systemMode === 'frontend' ? <FrontendPortal /> : <BackendPortal />}
        
        {/* 右下角浮動切換按鈕 */}
        <button 
          onClick={() => setSystemMode(systemMode === 'frontend' ? 'backend' : 'frontend')}
          className="fixed bottom-32 right-4 bg-slate-800 hover:bg-slate-700 text-white p-3 rounded-full shadow-2xl font-bold text-sm z-50 transition-transform active:scale-95 flex flex-col items-center"
        >
          <span className="text-xl mb-1">🔄</span>
          切換至{systemMode === 'frontend' ? '後台' : '前台'}
        </button>
      </div>
    </DBContext.Provider>
  );
}