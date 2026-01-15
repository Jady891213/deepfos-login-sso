import React, { useState } from 'react';
import LoginCard from './components/LoginCard';

const App: React.FC = () => {
  const [showPanel, setShowPanel] = useState(true);

  return (
    <div className="flex h-screen w-full overflow-hidden relative">
      {/* Floating Test Account Panel (Top-Left) */}
      <div className={`absolute top-6 left-6 z-50 transition-all duration-500 ease-in-out ${showPanel ? 'w-80' : 'w-12 h-12'}`}>
        <div className="bg-white/95 backdrop-blur-md shadow-[0_15px_40px_rgba(0,0,0,0.1)] rounded-2xl border border-indigo-100 overflow-hidden">
          <div className="flex items-center justify-between p-4 bg-indigo-600 text-white">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <span className="font-bold text-sm">测试环境说明</span>
            </div>
            <button 
              onClick={() => setShowPanel(!showPanel)}
              className="hover:bg-indigo-500 rounded-lg p-1 transition-colors outline-none"
            >
              {showPanel ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              )}
            </button>
          </div>
          
          {showPanel && (
            <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto custom-scrollbar">
              <p className="text-xs text-gray-500 leading-relaxed">
                {"您可以利用以下预设账号在统一入口进行不同登录流程的复测。"}
              </p>
              
              <div className="space-y-3">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <h4 className="text-[10px] font-bold text-indigo-500 uppercase mb-2">{"场景 1: 个人号 - 密码"}</h4>
                  <p className="text-xs font-mono text-gray-700">{"账号: user@personal.com"}</p>
                  <p className="text-xs font-mono text-gray-700">{"密码: password123"}</p>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <h4 className="text-[10px] font-bold text-indigo-500 uppercase mb-2">{"场景 2: 个人号 - 验证码"}</h4>
                  <p className="text-xs font-mono text-gray-700">{"手机: 13800138000"}</p>
                  <p className="text-xs font-mono text-gray-700">{"验证码: 123456"}</p>
                </div>

                <div className="bg-indigo-50/50 p-3 rounded-xl border border-indigo-100">
                  <h4 className="text-[10px] font-bold text-indigo-600 uppercase mb-2">{"场景 3: 企业登录 - 代码流"}</h4>
                  <p className="text-xs font-mono text-gray-700">{"代码: PROINNOVA"}</p>
                  <p className="text-[10px] text-gray-400 mt-1 italic">{"路径: 点击'切换企业登录' -> 直接输入代码"}</p>
                </div>

                <div className="bg-indigo-50/50 p-3 rounded-xl border border-indigo-100">
                  <h4 className="text-[10px] font-bold text-indigo-600 uppercase mb-2">{"场景 4: 企业登录 - 识别流"}</h4>
                  <p className="text-xs font-mono text-gray-700">{"账号: admin@huawei.com"}</p>
                  <p className="text-[10px] text-gray-400 mt-1 italic">{"路径: 切换企业登录 -> 点击'通过账号识别' -> 输入"}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Header (Top-Right) */}
      <header className="absolute top-6 right-10 z-20 flex items-center space-x-6 text-sm text-gray-400 font-medium">
        <a href="#" className="hover:text-indigo-600 transition-colors">{"产品文档"}</a>
        <a href="#" className="hover:text-indigo-600 transition-colors">{"开发者社区"}</a>
        <div className="flex items-center space-x-1 cursor-pointer hover:text-indigo-600">
          <span>{"简体中文"}</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </header>

      {/* Brand Section */}
      <div className="hidden lg:flex w-[42%] h-full login-bg-illustration relative items-center justify-center p-16 overflow-hidden">
        <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] opacity-30">
           <img 
             src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
             alt="Grid" 
             className="w-full h-full object-cover filter blur-3xl"
           />
        </div>
        
        <div className="relative z-10 w-full max-w-lg animate-in fade-in slide-in-from-left-8 duration-1000">
          <div className="space-y-8">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg"></div>
            </div>
            <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
              {"引领未来的"}<br />
              <span className="text-indigo-600">{"企业数字化底座"}</span>
            </h1>
            <p className="text-gray-500 text-xl font-light leading-relaxed">
              {"环境级统一登录架构，支撑多租户 SSO、"}<br />
              {"全域身份识别与精细化权限管控。"}
            </p>
            
            <div className="pt-8">
               <div className="inline-flex items-center space-x-4 bg-white/60 backdrop-blur p-4 rounded-2xl border border-white shadow-sm">
                  <div className="flex -space-x-3">
                    {[1,2,3].map(i => (
                      <div key={i} className={`w-10 h-10 rounded-full border-2 border-white bg-indigo-${i*100} flex items-center justify-center text-white text-xs font-bold`}>
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    {"已有 5000+ 企业部署该认证体系"}
                  </div>
               </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-[10%] right-[-10%] w-96 h-96 bg-indigo-200/40 rounded-full mix-blend-multiply filter blur-[100px] animate-blob"></div>
        <div className="absolute top-[10%] left-[-10%] w-80 h-80 bg-purple-200/40 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-2000"></div>
      </div>

      {/* Login Interaction Container */}
      <div className="flex-1 h-full bg-white lg:bg-transparent flex items-center justify-center p-6 relative">
        <LoginCard />
      </div>
    </div>
  );
};

export default App;