
import React, { useState } from 'react';
import LoginCard from './components/LoginCard';

const App: React.FC = () => {
  const [showPanel, setShowPanel] = useState(true);

  return (
    <div className="flex h-screen w-full overflow-hidden relative">
      {/* Test Account & Instruction Panel */}
      <div className={`absolute top-6 left-6 z-50 transition-all duration-500 ${showPanel ? 'w-80' : 'w-12 h-12 overflow-hidden'}`}>
        <div className="bg-white/90 backdrop-blur shadow-2xl rounded-2xl border border-indigo-100 overflow-hidden">
          <div className="flex items-center justify-between p-4 bg-indigo-600 text-white">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <span className="font-bold text-sm tracking-wide">测试演示说明</span>
            </div>
            <button 
              onClick={() => setShowPanel(!showPanel)}
              className="hover:bg-indigo-500 rounded p-1 transition-colors"
            >
              {showPanel ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              )}
            </button>
          </div>
          
          {showPanel && (
            <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">场景 A: 个人号密码</h4>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 font-mono text-xs">
                  <p className="text-gray-600">账号: <span className="text-indigo-600">user@personal.com</span></p>
                  <p className="text-gray-600">密码: <span className="text-indigo-600">password123</span></p>
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">场景 B: 手机号登录</h4>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 font-mono text-xs">
                  <p className="text-gray-600">手机: <span className="text-indigo-600">13800138000</span></p>
                  <p className="text-gray-600">验证码: <span className="text-indigo-600">123456</span></p>
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">场景 C: 企业账号识别 (SSO)</h4>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 font-mono text-xs">
                  <p className="text-gray-600">账号: <span className="text-indigo-600">admin@huawei.com</span></p>
                  <p className="text-gray-300 mt-1 italic">交互: 点击切换企业登录 -> 选择识别流 -> 输入账号</p>
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">场景 D: 企业代码登录</h4>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 font-mono text-xs">
                  <p className="text-gray-600">代码: <span className="text-indigo-600">PROINNOVA</span></p>
                  <p className="text-gray-300 mt-1 italic">交互: 点击切换企业登录 -> 默认代码流 -> 输入代码</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Header (Floating Right) */}
      <header className="absolute top-6 right-10 z-20 flex items-center space-x-6 text-sm text-gray-500">
        <a href="#" className="hover:text-indigo-600 transition-colors">应用市场</a>
        <a href="#" className="hover:text-indigo-600 transition-colors">文档中心</a>
        <div className="flex items-center space-x-1 cursor-pointer hover:text-indigo-600">
          <span>简体中文</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </header>

      {/* Left: Branding & Illustration */}
      <div className="hidden lg:flex w-[40%] h-full login-bg-illustration relative items-center justify-center p-12 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] opacity-40">
           <img 
             src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1470&auto=format&fit=crop" 
             alt="Tech background" 
             className="w-full h-full object-cover filter blur-3xl opacity-20"
           />
        </div>
        
        <div className="relative z-10 w-full max-w-lg">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-800 leading-tight">
              构建更智能的<br />
              <span className="text-indigo-600">数字化业务平台</span>
            </h1>
            <p className="text-gray-500 text-lg">
              环境级统一登录入口，多维度认证体系支撑，<br />
              一站式企业数字化转型低代码底座。
            </p>
            
            <div className="mt-12">
               <div className="relative group">
                 <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                 <div className="relative px-7 py-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
                    <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <div className="space-y-2">
                      <p className="text-slate-800 font-semibold">快速响应 极致体验</p>
                      <p className="text-slate-500 text-sm">通过分流架构识别身份，无缝对接企业 SSO。</p>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-[20%] right-[-5%] w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob"></div>
        <div className="absolute top-[20%] left-[-5%] w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000"></div>
      </div>

      {/* Right: Dynamic Login Container */}
      <div className="flex-1 h-full bg-white lg:bg-transparent flex items-center justify-center p-4">
        <LoginCard />
      </div>
    </div>
  );
};

export default App;
