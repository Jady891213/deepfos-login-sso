
import React, { useState, useEffect } from 'react';
import { LoginState, AuthPolicy, SocialProvider } from '../types';

const LoginCard: React.FC = () => {
  const [state, setState] = useState<LoginState>(LoginState.PERSONAL);
  const [personalTab, setPersonalTab] = useState<'PASSWORD' | 'SMS'>('PASSWORD');
  const [socialProvider, setSocialProvider] = useState<SocialProvider | null>(null);
  
  // Inputs
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [smsCode, setSmsCode] = useState('');
  const [corpCode, setCorpCode] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [authPolicy, setAuthPolicy] = useState<AuthPolicy | null>(null);

  // Auto-redirect simulation for Social QR
  useEffect(() => {
    let timer: number;
    if (state === LoginState.SOCIAL_QR) {
      timer = window.setTimeout(() => {
        setState(LoginState.SUCCESS);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [state, socialProvider]);

  // Path 1: Personal Login
  const handlePersonalLogin = () => {
    if (!agreed) {
      setError('请阅读并勾选隐私政策及用户协议');
      return;
    }
    if (!account) {
      setError('请输入账号');
      return;
    }
    
    // Simulate Login Validation
    if (personalTab === 'PASSWORD') {
      if (account === 'user@personal.com' && password === 'password123') {
        setState(LoginState.SUCCESS);
      } else {
        setError('账号或密码错误');
      }
    } else {
      if (account === '13800138000' && smsCode === '123456') {
        setState(LoginState.SUCCESS);
      } else {
        setError('手机号或验证码错误');
      }
    }
  };

  // Branch A: Enterprise Identification by Account
  const handleIdentifyEnterprise = async () => {
    if (!account) {
      setError('请输入账号以识别所属企业');
      return;
    }
    setError('');
    setIsLoading(true);

    // Simulated API Call
    setTimeout(() => {
      setIsLoading(false);
      if (account.includes('huawei') || account === 'admin@huawei.com') {
        setAuthPolicy({
          type: 'SSO',
          enterpriseName: '华为技术有限公司',
          ssoUrl: 'https://sso.huawei.com/login'
        });
        setState(LoginState.SSO_REDIRECT);
      } else if (account.includes('proinnova')) {
        setCorpCode('PROINNOVA');
        setState(LoginState.CORP_AUTH);
      } else {
        setError('未识别到该账号关联的企业单点配置，请尝试企业代码或联系管理员');
      }
    }, 1000);
  };

  // Branch B: Enterprise Code Submit
  const handleCorpCodeSubmit = () => {
    if (!corpCode) {
      setError('请输入企业代码');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (corpCode.toUpperCase() === 'PROINNOVA') {
        setState(LoginState.CORP_AUTH);
      } else {
        setError('无效的企业代码');
      }
    }, 800);
  };

  const reset = () => {
    setState(LoginState.PERSONAL);
    setAuthPolicy(null);
    setSocialProvider(null);
    setError('');
    setPassword('');
    setSmsCode('');
  };

  // --- RENDERING ---

  if (state === LoginState.SUCCESS) {
    return (
      <div className="w-full max-w-[460px] bg-white rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.06)] p-12 text-center animate-in zoom-in-95 duration-500 border border-indigo-50">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
          <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">登录成功！</h2>
        <p className="text-gray-500 mb-10 leading-relaxed">
          欢迎进入 <span className="text-indigo-600 font-semibold">数字化协同办公平台</span>。<br />
          系统正在为您准备个性化工作空间...
        </p>
        <button 
          onClick={reset}
          className="w-full h-12 border border-gray-200 text-gray-400 hover:text-indigo-600 hover:border-indigo-100 hover:bg-indigo-50/50 rounded-xl transition-all font-medium"
        >
          返回登录演示
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[460px] bg-white rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.06)] p-10 relative border border-gray-100 transition-all duration-300">
      
      {/* Dynamic Header */}
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            {state === LoginState.PERSONAL && '账号登录'}
            {state === LoginState.SOCIAL_QR && `${socialProvider === 'WECHAT' ? '企业微信' : '飞书'} 扫码`}
            {state === LoginState.ENT_CODE && '企业登录'}
            {state === LoginState.ENT_ACCOUNT && '识别企业账号'}
            {state === LoginState.SSO_REDIRECT && '跳转单点登录'}
            {state === LoginState.CORP_AUTH && `${corpCode} 认证中心`}
          </h2>
          {(state === LoginState.PERSONAL || state === LoginState.ENT_CODE || state === LoginState.ENT_ACCOUNT) && (
            <p className="text-gray-400 text-sm mt-2">环境级统一登录，请录入身份信息</p>
          )}
        </div>
        {state !== LoginState.PERSONAL && (
           <button onClick={reset} className="p-2 rounded-full hover:bg-gray-50 text-gray-400 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
           </button>
        )}
      </div>

      {/* State: PERSONAL (Standard UI) */}
      {state === LoginState.PERSONAL && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="flex border-b border-gray-100 space-x-8">
            <button onClick={() => setPersonalTab('PASSWORD')} className={`pb-3 text-sm font-medium transition-all relative ${personalTab === 'PASSWORD' ? 'text-indigo-600' : 'text-gray-400'}`}>
              密码登录
              {personalTab === 'PASSWORD' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-full" />}
            </button>
            <button onClick={() => setPersonalTab('SMS')} className={`pb-3 text-sm font-medium transition-all relative ${personalTab === 'SMS' ? 'text-indigo-600' : 'text-gray-400'}`}>
              验证码登录
              {personalTab === 'SMS' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-full" />}
            </button>
          </div>

          <div className="space-y-4">
            <input 
              type="text" 
              value={account} 
              onChange={(e) => setAccount(e.target.value)} 
              placeholder="手机号/邮箱/用户名" 
              className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all placeholder:text-gray-300" 
            />
            {personalTab === 'PASSWORD' ? (
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="登录密码" 
                className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all placeholder:text-gray-300" 
              />
            ) : (
              <div className="flex space-x-3">
                <input 
                  type="text" 
                  value={smsCode} 
                  onChange={(e) => setSmsCode(e.target.value)} 
                  placeholder="验证码" 
                  className="flex-1 h-12 px-4 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all placeholder:text-gray-300" 
                />
                <button className="px-5 text-indigo-600 text-sm font-medium border border-indigo-100 rounded-xl hover:bg-indigo-50 transition-colors whitespace-nowrap">获取验证码</button>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <input type="checkbox" id="agree-p" className="w-4 h-4 accent-indigo-600 rounded" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
            <label htmlFor="agree-p" className="text-[11px] text-gray-400 leading-relaxed cursor-pointer select-none">
              我已阅读并接受 <a href="#" className="text-indigo-500 hover:underline">隐私政策</a> 及 <a href="#" className="text-indigo-500 hover:underline">用户服务协议</a>
            </label>
          </div>

          {error && <p className="text-xs text-red-500 animate-pulse">{error}</p>}

          <button onClick={handlePersonalLogin} className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-xl shadow-indigo-100">
            登录
          </button>

          <div className="pt-6">
            <div className="relative flex items-center justify-center">
              <div className="w-full border-t border-gray-100"></div>
              <span className="absolute bg-white px-4 text-[10px] text-gray-400 uppercase tracking-widest">第三方/企业登录</span>
            </div>
            
            <div className="mt-6 flex justify-center space-x-8">
              <button onClick={() => { setSocialProvider('WECHAT'); setState(LoginState.SOCIAL_QR); }} className="group flex flex-col items-center space-y-2">
                <div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center hover:bg-green-50 hover:border-green-200 transition-all text-gray-300 group-hover:text-green-600">
                   <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.5 4C10 4 8 5.5 8 7.5c0 1.2.8 2.3 2 3 .2.1.3.3.3.5v1.2c0 .2.2.3.4.2l1.3-.7c.2-.1.4-.1.6 0 .6.2 1.3.3 1.9.3 2.5 0 4.5-1.5 4.5-3.5S15 4 12.5 4zM7 11.5c-3 0-5.5 1.8-5.5 4.5 0 1.3.6 2.5 1.6 3.4.3.3.4.7.4 1.1v1.6c0 .4.4.6.8.4l2.2-1.3c.3-.2.7-.2 1.1-.1.9.3 1.9.4 2.9.4 3.3 0 6-2.2 6-5s-2.7-5-6-5z" /></svg>
                </div>
                <span className="text-[10px] text-gray-400">企业微信</span>
              </button>
              <button onClick={() => { setSocialProvider('FEISHU'); setState(LoginState.SOCIAL_QR); }} className="group flex flex-col items-center space-y-2">
                <div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center hover:bg-blue-50 hover:border-blue-200 transition-all text-gray-300 group-hover:text-blue-500">
                   <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.341-3.369-1.341-.454-1.152-1.11-1.459-1.11-1.459-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
                </div>
                <span className="text-[10px] text-gray-400">飞书</span>
              </button>
            </div>
            
            <div className="mt-8 text-center">
               <button onClick={() => setState(LoginState.ENT_CODE)} className="px-8 py-2.5 text-sm text-gray-500 bg-gray-50 hover:bg-indigo-50 hover:text-indigo-600 rounded-full transition-all border border-gray-100 font-medium">切换至企业登录</button>
            </div>
          </div>
        </div>
      )}

      {/* State: SOCIAL_QR */}
      {state === LoginState.SOCIAL_QR && (
        <div className="text-center animate-in zoom-in-95 duration-300">
           <div className="mb-8 mx-auto w-64 h-64 bg-white border border-gray-100 rounded-3xl shadow-sm flex flex-col items-center justify-center p-6 relative group">
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${socialProvider}_LOGIN_SIMULATION`} alt="QR" className="w-full h-full object-contain" />
              <div className="absolute inset-0 bg-white/95 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center rounded-3xl p-4">
                 <p className="text-xs text-gray-500 font-medium mb-3">二维码实时刷新中</p>
                 <button className="text-indigo-600 font-bold text-sm">手动刷新</button>
              </div>
           </div>
           <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <span className={`w-2 h-2 rounded-full animate-ping ${socialProvider === 'WECHAT' ? 'bg-green-500' : 'bg-blue-500'}`}></span>
              <p>请打开手机 <span className="font-bold text-gray-800">{socialProvider === 'WECHAT' ? '企业微信' : '飞书'}</span> 扫一扫</p>
           </div>
           <p className="mt-10 text-xs text-gray-300 italic tracking-tight">演示环境中，模拟 3 秒后自动成功...</p>
        </div>
      )}

      {/* State: ENT_CODE (Default Enterprise Branch) */}
      {state === LoginState.ENT_CODE && (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
          <div className="p-4 bg-orange-50/50 border border-orange-100 rounded-xl">
            <p className="text-xs text-orange-700 leading-relaxed">
              输入企业专属代码进入特定认证环境
            </p>
          </div>
          <input 
            type="text" 
            value={corpCode} 
            onChange={(e) => setCorpCode(e.target.value)} 
            placeholder="企业代码 (如 PROINNOVA)" 
            className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-indigo-500 outline-none transition-all uppercase font-mono tracking-widest" 
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
          <button 
            onClick={handleCorpCodeSubmit} 
            disabled={isLoading}
            className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-xl"
          >
            {isLoading ? '加载企业配置...' : '下一步'}
          </button>
          <div className="pt-4 text-center">
             <button onClick={() => { setState(LoginState.ENT_ACCOUNT); setError(''); }} className="text-sm text-gray-400 hover:text-indigo-600 font-medium transition-colors">
               无法提供代码？通过账号识别所属企业
             </button>
          </div>
        </div>
      )}

      {/* State: ENT_ACCOUNT (Enterprise Branch A) */}
      {state === LoginState.ENT_ACCOUNT && (
        <div className="space-y-6 animate-in slide-in-from-left-4 duration-300">
          <p className="text-sm text-gray-500">我们将基于您的企业邮箱或账号自动分配登录逻辑</p>
          <input 
            type="text" 
            value={account} 
            onChange={(e) => setAccount(e.target.value)} 
            placeholder="企业账号 (如 admin@huawei.com)" 
            className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-indigo-500 outline-none transition-all font-mono" 
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
          <button 
            onClick={handleIdentifyEnterprise} 
            disabled={isLoading}
            className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-xl"
          >
            {isLoading ? '解析企业策略...' : '执行识别'}
          </button>
          <div className="pt-4 text-center">
             <button onClick={() => { setState(LoginState.ENT_CODE); setError(''); }} className="text-sm text-gray-400 hover:text-indigo-600 font-medium transition-colors">
               返回使用企业代码登录
             </button>
          </div>
        </div>
      )}

      {/* State: SSO_REDIRECT (SSO Branch) */}
      {state === LoginState.SSO_REDIRECT && (
        <div className="space-y-8 animate-in zoom-in-95 duration-300">
          <div className="text-center p-8 bg-indigo-50/50 rounded-3xl border border-indigo-100">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm mx-auto flex items-center justify-center font-bold text-indigo-600 text-2xl mb-4">
              {authPolicy?.enterpriseName?.[0]}
            </div>
            <h4 className="font-bold text-indigo-900 text-lg">{authPolicy?.enterpriseName}</h4>
            <div className="mt-3 inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-[10px] font-bold rounded-full uppercase tracking-widest">SSO Enabled</div>
          </div>
          
          <button 
            onClick={() => setState(LoginState.SUCCESS)}
            className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-all shadow-xl flex items-center justify-center space-x-3"
          >
            <span>模拟前往 SSO 认证并成功</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
          </button>
          
          <div className="flex justify-center space-x-6">
            <button onClick={() => setState(LoginState.ENT_ACCOUNT)} className="text-xs text-gray-400 hover:text-indigo-600 font-medium">切换账号</button>
            <button onClick={reset} className="text-xs text-gray-400 hover:text-indigo-600 font-medium">返回主登录页</button>
          </div>
        </div>
      )}

      {/* State: CORP_AUTH (Custom Enterprise Branch) */}
      {state === LoginState.CORP_AUTH && (
        <div className="text-center animate-in zoom-in-95 duration-300">
           <div className="mb-8 p-4 bg-gray-50 rounded-2xl border border-gray-100 inline-flex items-center space-x-3">
              <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-bold text-xs">{corpCode[0]}</div>
              <span className="text-gray-900 font-bold text-sm tracking-tight">{corpCode} 专享登录</span>
           </div>
           
           <div 
             className="mx-auto w-56 h-56 bg-white border border-gray-100 rounded-3xl flex items-center justify-center relative shadow-inner p-4 mb-8 cursor-pointer group"
             onClick={() => setState(LoginState.SUCCESS)}
           >
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=PROINNOVA_SPECIFIC_AUTH" alt="Corp QR" className="opacity-90 transition-opacity group-hover:opacity-40" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <span className="bg-indigo-600 text-white text-[10px] px-3 py-1 rounded-full font-bold">模拟点击登录</span>
              </div>
           </div>
           
           <p className="text-sm text-gray-500 font-medium">请使用该企业官方内勤端扫码</p>
           <button onClick={reset} className="mt-12 text-xs text-gray-400 hover:text-indigo-600 font-medium transition-colors">退出当前企业入口</button>
        </div>
      )}

      {/* Footer text */}
      {(state === LoginState.PERSONAL) && (
        <div className="mt-12 text-[10px] text-gray-400 leading-relaxed text-center px-4">
          如果您是首次使用该环境，我们将根据您的登录信息自动为您创建账号，您录入信息即表示您同意我们的 <a href="#" className="text-indigo-400">服务协议</a>。
        </div>
      )}
    </div>
  );
};

export default LoginCard;
