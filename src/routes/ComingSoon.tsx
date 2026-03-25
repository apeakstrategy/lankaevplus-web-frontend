import { Link } from 'react-router-dom';

const ComingSoon = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center relative overflow-hidden bg-dark-950">
      {/* Background patterns exactly like in 404/Login pages for consistency */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto px-4 py-20 flex flex-col items-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-400/20 to-emerald-500/20 mb-8 border border-primary-500/20 shadow-lg shadow-primary-500/10">
          <svg className="w-10 h-10 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
          Feature Available <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-emerald-400">Soon</span>
        </h1>
        
        <p className="text-dark-400 text-lg md:text-xl mb-10 max-w-xl leading-relaxed">
          We are currently working hard to integrate our social media channels to bring you more exciting updates, community interactions, and electric vehicle news. Stay tuned!
        </p>

        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-dark-950 rounded-xl hover:bg-dark-100 transition-colors duration-200 font-semibold shadow-lg shadow-white/5 active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default ComingSoon;
