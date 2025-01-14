export default function LoadingLogin({title} : {title: string}) {
     return (
          <>
               <div className="nebula"></div>
               <div className="glass-panel">
                    <div className="space-particles">
                         <div className="particle"></div>
                         <div className="particle"></div>
                         <div className="particle"></div>
                         <div className="particle"></div>
                         <div className="particle"></div>
                    </div>

                    <div className="space-loader">
                         <div className="loader-ring"></div>
                         <div className="loader-ring"></div>
                         <div className="loader-ring"></div>
                         <div className="loader-core"></div>
                    </div>

                    <div className="space-text dark:text-white/80">{title}</div>
               </div>
          </>
     );
}
