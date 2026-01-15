import React, { useState, useEffect } from 'react';
import { LoginState, AuthPolicy, SocialProvider } from '../types';

const LoginCard: React.FC = () => {
  const [state, setState] = useState<LoginState>(LoginState.PERSONAL);
  const [personalTab, setPersonalTab] = useState<'PASSWORD' | 'SMS'>('PASSWORD');
  const [socialProvider, setSocialProvider] = useState<SocialProvider | null>(null);
  
  // Input states
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [smsCode, setSmsCode] = useState('');
  const [corpCode, setCorpCode] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [authPolicy, setAuthPolicy] = useState<AuthPolicy | null>(null);

  // Success view simulation for Social QR
  useEffect(() => {
    let timer: number;
    if (state === LoginState.SOCIAL_QR) {
      timer = window.setTimeout(() => {
        setState(LoginState.SUCCESS);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [state]);

  const reset = () => {
    setState(LoginState.PERSONAL);
    setAuthPolicy(null);
    setSocialProvider(null);
    setError('');
    setPassword('');
    setSmsCode('');
  };

  // Personal Login Handlers
  const handlePersonalLogin = () => {
    if (!agreed) {
      setError('请阅读并勾选隐私政策及用户协议');
      return;
    }
    if (!account) {
      setError('请输入账号信息');
      return;
    }
    
    // Demo Logic
    if (personalTab === 'PASSWORD') {
      if (account === 'user@personal.com' && password === 'password123') {
        setState(LoginState.SUCCESS);
      } else {
        setError('账号或密码不正确');
      }
    } else {
      if (account === '13800138000' && smsCode === '123456') {
        setState(LoginState.SUCCESS);
      } else {
        setError('手机号或验证码不正确');
      }
    }
  };

  // Enterprise Switch Handler
  const switchToEnterprise = () => {
    setState(LoginState.ENT_CODE);
    setError('');
  };

  // Branch A: Enterprise Code Flow
  const handleCorpCodeSubmit = () => {
    if (!corpCode) {
      setError('请输入企业唯一代码');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (corpCode.toUpperCase() === 'PROINNOVA') {
        setState(LoginState.CORP_AUTH);
      } else {
        setError('无效的企业代码，请联系管理员确认');
      }
    }, 800);
  };

  // Branch B: Enterprise Account Identification Flow
  const handleIdentifyEnterprise = async () => {
    if (!account) {
      setError('请输入您的企业账号以识别策略');
      return;
    }
    setError('');
    setIsLoading(true);

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
        setError('该账号未关联特定的企业单点认证策略');
      }
    }, 1000);
  };

  // Render Logic
  if (state === LoginState.SUCCESS) {
    return (
      <div className="w-full max-w-[480px] bg-white rounded-3xl shadow-[0_30px_70px_rgba(0,0,0,0.08)] p-12 text-center animate-in zoom-in-95 duration-500 border border-indigo-50">
        <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-8">
           <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center animate-in zoom-in-50 duration-700">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
           </div>
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">{"登录成功"}</h2>
        <p className="text-gray-500 mb-10 leading-relaxed font-light">
          {"欢迎进入数字化协同平台。我们将为您跳转至"} <br />
          <span className="text-indigo-600 font-semibold">{"个人工作台 (Space 01)"}</span>
        </p>
        <div className="flex flex-col space-y-4">
          <button className="w-full h-12 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">
            {"立即进入系统"}
          </button>
          <button onClick={reset} className="text-sm text-gray-400 hover:text-indigo-600 transition-colors">
            {"返回登录页"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[480px] bg-white rounded-3xl shadow-[0_30px_70px_rgba(0,0,0,0.08)] p-10 relative border border-gray-100 transition-all duration-300">
      
      {/* Header Info */}
      <div className="mb-10 flex justify-between items-start">
        <div className="animate-in slide-in-from-left-4 duration-500">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            {state === LoginState.PERSONAL && '账号登录'}
            {state === LoginState.SOCIAL_QR && `${socialProvider === 'WECHAT' ? '企业微信' : '飞书'} 扫码`}
            {state === LoginState.ENT_CODE && '企业登录'}
            {state === LoginState.ENT_ACCOUNT && '企业账号识别'}
            {state === LoginState.SSO_REDIRECT && '企业 SSO 认证'}
            {state === LoginState.CORP_AUTH && `${corpCode} 认证服务`}
          </h2>
          <p className="text-gray-400 text-sm mt-2 font-light">
            {state === LoginState.PERSONAL ? '请使用您的个人或通用账号' : '正在通过企业通道进行认证'}
          </p>
        </div>
        {state !== LoginState.PERSONAL && (
           <button onClick={reset} className="p-2 rounded-xl hover:bg-gray-50 text-gray-300 hover:text-gray-600 transition-all">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
           </button>
        )}
      </div>

      {/* State View: PERSONAL */}
      {state === LoginState.PERSONAL && (
        <div className="space-y-7 animate-in fade-in duration-300">
          <div className="flex space-x-8 border-b border-gray-50">
            <button onClick={() => setPersonalTab('PASSWORD')} className={`pb-4 text-sm font-semibold transition-all relative ${personalTab === 'PASSWORD' ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}>
              {"密码登录"}
              {personalTab === 'PASSWORD' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-full" />}
            </button>
            <button onClick={() => setPersonalTab('SMS')} className={`pb-4 text-sm font-semibold transition-all relative ${personalTab === 'SMS' ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}>
              {"验证码登录"}
              {personalTab === 'SMS' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-full" />}
            </button>
          </div>

          <div className="space-y-4">
            <div className="relative group">
              <input 
                type="text" 
                value={account} 
                onChange={(e) => setAccount(e.target.value)} 
                placeholder="手机号 / 邮箱 / 用户名" 
                className="w-full h-14 px-5 rounded-2xl border border-gray-100 bg-gray-50/30 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all placeholder:text-gray-300" 
              />
            </div>
            {personalTab === 'PASSWORD' ? (
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="请输入密码" 
                className="w-full h-14 px-5 rounded-2xl border border-gray-100 bg-gray-50/30 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all placeholder:text-gray-300" 
              />
            ) : (
              <div className="flex space-x-3">
                <input 
                  type="text" 
                  value={smsCode} 
                  onChange={(e) => setSmsCode(e.target.value)} 
                  placeholder="验证码" 
                  className="flex-1 h-14 px-5 rounded-2xl border border-gray-100 bg-gray-50/30 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all placeholder:text-gray-300" 
                />
                <button className="px-6 text-indigo-600 text-sm font-bold border border-indigo-100 rounded-2xl hover:bg-indigo-50 transition-colors whitespace-nowrap">{"获取验证码"}</button>
              </div>
            )}
          </div>

          <div className="flex items-start space-x-3 group cursor-pointer" onClick={() => setAgreed(!agreed)}>
            <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center transition-all ${agreed ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300 bg-white'}`}>
              {agreed && <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" /></svg>}
            </div>
            <p className="text-[11px] text-gray-400 leading-relaxed select-none">
              {"我已仔细阅读并完全同意系统的"} <a href="#" className="text-indigo-500 font-medium hover:underline">{"隐私政策"}</a> {"及"} <a href="#" className="text-indigo-500 font-medium hover:underline">{"用户服务条款"}</a>
            </p>
          </div>

          {error && <div className="p-3 bg-red-50 rounded-xl border border-red-100 text-[11px] text-red-500 animate-in slide-in-from-top-1">{error}</div>}

          <button onClick={handlePersonalLogin} className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-all shadow-xl shadow-indigo-100 hover:scale-[1.01] active:scale-[0.99]">
            {"登录"}
          </button>

          <div className="pt-8">
            <div className="relative flex items-center justify-center">
              <div className="w-full border-t border-gray-50"></div>
              <span className="absolute bg-white px-4 text-[10px] text-gray-300 font-bold uppercase tracking-widest">{"其他登录途径"}</span>
            </div>
            
            <div className="mt-8 flex justify-center space-x-12">
              <button onClick={() => { setSocialProvider('WECHAT'); setState(LoginState.SOCIAL_QR); }} className="group flex flex-col items-center space-y-3">
                <div className="w-14 h-14 rounded-2xl border border-gray-50 bg-gray-50/30 flex items-center justify-center hover:bg-green-50 hover:border-green-200 transition-all text-gray-300 group-hover:text-green-600">
                   <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12.5 4C10 4 8 5.5 8 7.5c0 1.2.8 2.3 2 3 .2.1.3.3.3.5v1.2c0 .2.2.3.4.2l1.3-.7c.2-.1.4-.1.6 0 .6.2 1.3.3 1.9.3 2.5 0 4.5-1.5 4.5-3.5S15 4 12.5 4zM7 11.5c-3 0-5.5 1.8-5.5 4.5 0 1.3.6 2.5 1.6 3.4.3.3.4.7.4 1.1v1.6c0 .4.4.6.8.4l2.2-1.3c.3-.2.7-.2 1.1-.1.9.3 1.9.4 2.9.4 3.3 0 6-2.2 6-5s-2.7-5-6-5z" /></svg>
                </div>
                <span className="text-[10px] font-bold text-gray-400 group-hover:text-gray-600 uppercase">{"企业微信"}</span>
              </button>
              <button onClick={() => { setSocialProvider('FEISHU'); setState(LoginState.SOCIAL_QR); }} className="group flex flex-col items-center space-y-3">
                <div className="w-14 h-14 rounded-2xl border border-gray-50 bg-gray-50/30 flex items-center justify-center hover:bg-blue-50 hover:border-blue-200 transition-all text-gray-300 group-hover:text-blue-500">
                   <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.341-3.369-1.341-.454-1.152-1.11-1.459-1.11-1.459-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
                </div>
                <span className="text-[10px] font-bold text-gray-400 group-hover:text-gray-600 uppercase">{"飞书"}</span>
              </button>
            </div>
            
            <div className="mt-10 text-center">
               <button onClick={switchToEnterprise} className="px-10 py-3 text-sm text-gray-400 font-semibold bg-gray-50 hover:bg-indigo-50 hover:text-indigo-600 rounded-full transition-all border border-gray-100">
                 {"切换至企业登录"}
               </button>
            </div>
          </div>
        </div>
      )}

      {/* State: SOCIAL_QR */}
      {state === LoginState.SOCIAL_QR && (
        <div className="text-center animate-in zoom-in-95 duration-300">
           <div className="mb-8 mx-auto w-64 h-64 bg-white border border-gray-50 rounded-[40px] shadow-sm flex flex-col items-center justify-center p-8 relative group">
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${socialProvider}_LOGIN`} alt="QR" className="w-full h-full object-contain" />
              <div className="absolute inset-0 bg-white/95 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center rounded-[40px] p-6">
                 <p className="text-xs text-gray-400 font-medium mb-3">{"二维码安全扫描中"}</p>
                 <button className="text-indigo-600 font-bold text-sm hover:underline">{"手动刷新"}</button>
              </div>
           </div>
           <div className="flex items-center justify-center space-x-3 text-sm text-gray-600">
              <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${socialProvider === 'WECHAT' ? 'bg-green-500' : 'bg-blue-500'}`}></span>
              <p>{"请使用"} <span className="font-bold text-gray-900">{socialProvider === 'WECHAT' ? '企业微信' : '飞书'}</span> {"扫一扫"}</p>
           </div>
           <p className="mt-10 text-xs text-gray-300 italic">{"模拟环境中，3秒后自动模拟授权成功..."}</p>
        </div>
      )}

      {/* State: ENT_CODE (Default Enterprise Branch) */}
      {state === LoginState.ENT_CODE && (
        <div className="space-y-7 animate-in slide-in-from-right-4 duration-300">
          <div className="p-4 bg-indigo-50/40 border border-indigo-100 rounded-2xl">
            <p className="text-xs text-indigo-700 leading-relaxed font-medium">
              {"请输入您的企业唯一识别码（如 PROINNOVA）以获取专属登录策略。"}
            </p>
          </div>
          <div className="space-y-4">
            <input 
              type="text" 
              value={corpCode} 
              onChange={(e) => setCorpCode(e.target.value)} 
              placeholder="企业代码" 
              className="w-full h-14 px-5 rounded-2xl border border-gray-100 bg-gray-50/30 focus:bg-white focus:border-indigo-500 outline-none transition-all uppercase font-mono tracking-widest text-lg" 
            />
            {error && <p className="text-xs text-red-500 px-2">{error}</p>}
            <button 
              onClick={handleCorpCodeSubmit} 
              disabled={isLoading}
              className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-all shadow-xl shadow-indigo-100"
            >
              {isLoading ? '正在获取配置...' : '下一步'}
            </button>
          </div>
          <div className="pt-4 text-center">
             <button onClick={() => { setState(LoginState.ENT_ACCOUNT); setError(''); }} className="text-sm text-indigo-500 font-bold hover:text-indigo-700 transition-colors">
               {"无法提供代码？点此通过账号识别企业"}
             </button>
          </div>
        </div>
      )}

      {/* State: ENT_ACCOUNT (Enterprise Branch A) */}
      {state === LoginState.ENT_ACCOUNT && (
        <div className="space-y-7 animate-in slide-in-from-left-4 duration-300">
          <p className="text-sm text-gray-500 px-1 font-light leading-relaxed">
            {"请输入您的企业邮箱或主账号。系统将自动判断所属企业并分流至相应的认证中心。"}
          </p>
          <div className="space-y-4">
            <input 
              type="text" 
              value={account} 
              onChange={(e) => setAccount(e.target.value)} 
              placeholder="企业邮箱 / 工号 (如 admin@huawei.com)" 
              className="w-full h-14 px-5 rounded-2xl border border-gray-100 bg-gray-50/30 focus:bg-white focus:border-indigo-500 outline-none transition-all font-mono" 
            />
            {error && <p className="text-xs text-red-500 px-2">{error}</p>}
            <button 
              onClick={handleIdentifyEnterprise} 
              disabled={isLoading}
              className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-all shadow-xl shadow-indigo-100"
            >
              {isLoading ? '正在检测企业策略...' : '执行身份识别'}
            </button>
          </div>
          <div className="pt-4 text-center">
             <button onClick={() => { setState(LoginState.ENT_CODE); setError(''); }} className="text-sm text-indigo-500 font-bold hover:text-indigo-700 transition-colors">
               {"返回使用企业代码登录"}
             </button>
          </div>
        </div>
      )}

      {/* State: SSO_REDIRECT */}
      {state === LoginState.SSO_REDIRECT && (
        <div className="space-y-8 animate-in zoom-in-95 duration-300">
          <div className="text-center p-10 bg-indigo-50/30 rounded-[40px] border border-indigo-100">
            <div className="w-20 h-20 bg-white rounded-3xl shadow-md mx-auto flex items-center justify-center font-black text-indigo-600 text-3xl mb-6 border border-indigo-100/50">
              {authPolicy?.enterpriseName?.[0]}
            </div>
            <h4 className="font-extrabold text-indigo-950 text-xl tracking-tight">{authPolicy?.enterpriseName}</h4>
            <div className="mt-4 inline-flex items-center px-4 py-1.5 bg-indigo-600 text-white text-[10px] font-bold rounded-full uppercase tracking-tighter">
              {"SSO 单点登录"}
            </div>
          </div>
          
          <button 
            onClick={() => setState(LoginState.SUCCESS)}
            className="w-full h-16 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-all shadow-2xl shadow-indigo-100 flex items-center justify-center space-x-4 group"
          >
            <span>{"模拟前往 SSO 认证"}</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </button>
          
          <div className="flex justify-center space-x-8">
            <button onClick={() => setState(LoginState.ENT_ACCOUNT)} className="text-xs text-gray-400 font-bold hover:text-indigo-600 transition-colors">{"更换识别账号"}</button>
            <button onClick={reset} className="text-xs text-gray-400 font-bold hover:text-indigo-600 transition-colors">{"主页登录"}</button>
          </div>
        </div>
      )}

      {/* State: CORP_AUTH */}
      {state === LoginState.CORP_AUTH && (
        <div className="text-center animate-in zoom-in-95 duration-300">
           <div className="mb-8 p-3 bg-gray-50 rounded-2xl border border-gray-100 inline-flex items-center space-x-3">
              <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-bold text-xs uppercase tracking-tighter">{corpCode[0]}</div>
              <span className="text-gray-900 font-extrabold text-sm uppercase tracking-wide">{corpCode} {"企业端授权"}</span>
           </div>
           
           <div 
             className="mx-auto w-64 h-64 bg-white border border-gray-50 rounded-[40px] flex items-center justify-center relative shadow-inner p-6 mb-8 cursor-pointer group"
             onClick={() => setState(LoginState.SUCCESS)}
           >
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PROINNOVA_AUTH" alt="Corp QR" className="opacity-90 transition-opacity group-hover:opacity-20" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                 <div className="bg-indigo-600 text-white px-5 py-2.5 rounded-2xl font-bold shadow-xl shadow-indigo-200">
                   {"点击模拟移动端授权"}
                 </div>
              </div>
           </div>
           
           <p className="text-sm text-gray-400 font-medium">{"请使用该企业官方内勤 App 扫码登录"}</p>
           <button onClick={reset} className="mt-12 text-xs text-gray-300 font-bold hover:text-indigo-600 uppercase transition-colors tracking-widest">{"退出专用通道"}</button>
        </div>
      )}

      {/* Global Agreement Footer (Hidden in Success/Redirect) */}
      {(state === LoginState.PERSONAL) && (
        <div className="mt-12 text-[10px] text-gray-400 leading-relaxed text-center px-4 font-light">
          {"本系统采用渐进式身份识别机制。录入信息即代表您同意"} <a href="#" className="text-indigo-400 font-medium">{"《全球服务协议》"}</a> {"。若为新环境用户，我们将自动进行身份预拨备。"}
        </div>
      )}
    </div>
  );
};

export default LoginCard;