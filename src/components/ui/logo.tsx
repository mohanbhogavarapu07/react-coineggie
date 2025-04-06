// import React from 'react';
// import { cn } from '@/lib/utils';

// interface LogoProps {
//   className?: string;
//   size?: 'sm' | 'md' | 'lg';
//   variant?: 'default' | 'light';
// }

// const Logo: React.FC<LogoProps> = ({ 
//   className, 
//   size = 'md', 
//   variant = 'default' 
// }) => {
//   const sizeClasses = {
//     sm: 'text-xl',
//     md: 'text-2xl',
//     lg: 'text-4xl',
//   };

//   const variantClasses = {
//     default: 'text-brand-primary-dark-green',
//     light: 'text-white'
//   };

//   return (
//     <div className={cn('font-display font-bold flex items-center', 
//       sizeClasses[size], 
//       variantClasses[variant], 
//       className
//     )}>
//       <div className="relative mr-2">
//         <div className="absolute inset-0 bg-brand-secondary-mint-green rounded-full opacity-30 animate-pulse"></div>
//         <svg 
//           width={size === 'sm' ? 24 : size === 'md' ? 32 : 48} 
//           height={size === 'sm' ? 24 : size === 'md' ? 32 : 48} 
//           viewBox="0 0 64 64" 
//           fill="none" 
//           xmlns="http://www.w3.org/2000/svg"
//           className="relative z-10"
//         >
//           <path 
//             d="M32 4C16.536 4 4 16.536 4 32C4 47.464 16.536 60 32 60C47.464 60 60 47.464 60 32C60 16.536 47.464 4 32 4Z" 
//             stroke={variant === 'default' ? '#245e4f' : '#FFFFFF'} 
//             strokeWidth="4" 
//             strokeLinecap="round" 
//             strokeLinejoin="round"
//           />
//           <path 
//             d="M32 16V48" 
//             stroke={variant === 'default' ? '#245e4f' : '#FFFFFF'} 
//             strokeWidth="4" 
//             strokeLinecap="round" 
//             strokeLinejoin="round"
//           />
//           <path 
//             d="M16 32H48" 
//             stroke={variant === 'default' ? '#245e4f' : '#FFFFFF'} 
//             strokeWidth="4" 
//             strokeLinecap="round" 
//             strokeLinejoin="round"
//           />
//           <path 
//             d="M20 20L44 44" 
//             stroke="#7ac9a7" 
//             strokeWidth="4" 
//             strokeLinecap="round" 
//             strokeLinejoin="round"
//           />
//           <path 
//             d="M20 44L44 20" 
//             stroke="#7ac9a7" 
//             strokeWidth="4" 
//             strokeLinecap="round" 
//             strokeLinejoin="round"
//           />
//         </svg>
//       </div>
//       <span>Coin<span className="text-brand-secondary-mint-green">eggie</span></span>
//     </div>
//   );
// };

// export default Logo;


// import type React from "react";
// import { cn } from "@/lib/utils";

// interface LogoProps {
//   className?: string;
//   size?: "sm" | "md" | "lg";
//   variant?: "default" | "light";
// }

// const Logo: React.FC<LogoProps> = ({
//   className,
//   size = "md",
//   variant = "default",
// }) => {
//   const sizeClasses = {
//     sm: "text-xl",
//     md: "text-2xl",
//     lg: "text-4xl",
//   };

//   const variantClasses = {
//     default: "text-brand-primary-dark-green",
//     light: "text-white",
//   };

//   const betaSizeClasses = {
//     sm: "text-[8px]",
//     md: "text-[10px]",
//     lg: "text-xs", // ~12px
//   };

//   return (
//     <div
//       className={cn(
//         "font-display font-bold flex items-center",
//         sizeClasses[size],
//         variantClasses[variant],
//         className
//       )}
//     >
//       <div className="relative mr-2">
//         <div className="absolute inset-0 bg-brand-secondary-mint-green rounded-full opacity-30 animate-pulse"></div>
//         <svg
//           width={size === "sm" ? 24 : size === "md" ? 32 : 48}
//           height={size === "sm" ? 24 : size === "md" ? 32 : 48}
//           viewBox="0 0 64 64"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//           className="relative z-10"
//         >
//           <path
//             d="M32 4C16.536 4 4 16.536 4 32C4 47.464 16.536 60 32 60C47.464 60 60 47.464 60 32C60 16.536 47.464 4 32 4Z"
//             stroke={variant === "default" ? "#245e4f" : "#FFFFFF"}
//             strokeWidth="4"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//           <path
//             d="M32 16V48"
//             stroke={variant === "default" ? "#245e4f" : "#FFFFFF"}
//             strokeWidth="4"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//           <path
//             d="M16 32H48"
//             stroke={variant === "default" ? "#245e4f" : "#FFFFFF"}
//             strokeWidth="4"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//           <path
//             d="M20 20L44 44"
//             stroke="#7ac9a7"
//             strokeWidth="4"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//           <path
//             d="M20 44L44 20"
//             stroke="#7ac9a7"
//             strokeWidth="4"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//         </svg>
//       </div>

//       <div className="flex flex-col items-start leading-none">
//         <span className="relative">
//           Coin
//           <span className="text-brand-secondary-mint-green relative inline-block">
//             eggie
//             <span
//               className={cn(
//                 "absolute left-[60%] translate-x-1/2 italic font-medium -bottom-2",
//                 betaSizeClasses[size]
//               )}
//               style={{ color: "#D4AF37" }}
//             >
//               Beta
//             </span>
//           </span>
//         </span>
//       </div>
//     </div>
//   );
// };

// export default Logo;



// import React from 'react';
// import { cn } from '@/lib/utils';

// interface LogoProps {
//   className?: string;
//   size?: 'sm' | 'md' | 'lg';
//   variant?: 'default' | 'light';
// }

// const Logo: React.FC<LogoProps> = ({ 
//   className, 
//   size = 'md', 
//   variant = 'default' 
// }) => {
//   const sizeClasses = {
//     sm: 'text-xl',
//     md: 'text-2xl',
//     lg: 'text-4xl',
//   };

//   const variantClasses = {
//     default: 'text-brand-primary-dark-green',
//     light: 'text-white'
//   };

//   return (
//     <div className={cn('font-display font-bold flex items-center', 
//       sizeClasses[size], 
//       variantClasses[variant], 
//       className
//     )}>
//       <div className="relative mr-2">
//         <div className="absolute inset-0 bg-brand-secondary-mint-green rounded-full opacity-30 animate-pulse"></div>
//         <svg 
//           width={size === 'sm' ? 24 : size === 'md' ? 32 : 48} 
//           height={size === 'sm' ? 24 : size === 'md' ? 32 : 48} 
//           viewBox="0 0 64 64" 
//           fill="none" 
//           xmlns="http://www.w3.org/2000/svg"
//           className="relative z-10"
//         >
//           <path 
//             d="M32 4C16.536 4 4 16.536 4 32C4 47.464 16.536 60 32 60C47.464 60 60 47.464 60 32C60 16.536 47.464 4 32 4Z" 
//             stroke={variant === 'default' ? '#245e4f' : '#FFFFFF'} 
//             strokeWidth="4" 
//             strokeLinecap="round" 
//             strokeLinejoin="round"
//           />
//           <path 
//             d="M32 16V48" 
//             stroke={variant === 'default' ? '#245e4f' : '#FFFFFF'} 
//             strokeWidth="4" 
//             strokeLinecap="round" 
//             strokeLinejoin="round"
//           />
//           <path 
//             d="M16 32H48" 
//             stroke={variant === 'default' ? '#245e4f' : '#FFFFFF'} 
//             strokeWidth="4" 
//             strokeLinecap="round" 
//             strokeLinejoin="round"
//           />
//           <path 
//             d="M20 20L44 44" 
//             stroke="#7ac9a7" 
//             strokeWidth="4" 
//             strokeLinecap="round" 
//             strokeLinejoin="round"
//           />
//           <path 
//             d="M20 44L44 20" 
//             stroke="#7ac9a7" 
//             strokeWidth="4" 
//             strokeLinecap="round" 
//             strokeLinejoin="round"
//           />
//         </svg>
//       </div>
//       <span>Coin<span className="text-brand-secondary-mint-green">eggie</span></span>
//     </div>
//   );
// };

// export default Logo;


// import type React from "react";
// import { cn } from "@/lib/utils";

// interface LogoProps {
//   className?: string;
//   size?: "sm" | "md" | "lg";
//   variant?: "default" | "light";
// }

// const Logo: React.FC<LogoProps> = ({
//   className,
//   size = "md",
//   variant = "default",
// }) => {
//   const sizeClasses = {
//     sm: "text-xl",
//     md: "text-2xl",
//     lg: "text-4xl",
//   };

//   const variantClasses = {
//     default: "text-brand-primary-dark-green",
//     light: "text-white",
//   };

//   const betaSizeClasses = {
//     sm: "text-[8px]",
//     md: "text-[10px]",
//     lg: "text-xs", // ~12px
//   };

//   return (
//     <div
//       className={cn(
//         "font-display font-bold flex items-center",
//         sizeClasses[size],
//         variantClasses[variant],
//         className
//       )}
//     >
//       <div className="relative mr-2">
//         <div className="absolute inset-0 bg-brand-secondary-mint-green rounded-full opacity-30 animate-pulse"></div>
//         <svg
//           width={size === "sm" ? 24 : size === "md" ? 32 : 48}
//           height={size === "sm" ? 24 : size === "md" ? 32 : 48}
//           viewBox="0 0 64 64"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//           className="relative z-10"
//         >
//           <path
//             d="M32 4C16.536 4 4 16.536 4 32C4 47.464 16.536 60 32 60C47.464 60 60 47.464 60 32C60 16.536 47.464 4 32 4Z"
//             stroke={variant === "default" ? "#245e4f" : "#FFFFFF"}
//             strokeWidth="4"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//           <path
//             d="M32 16V48"
//             stroke={variant === "default" ? "#245e4f" : "#FFFFFF"}
//             strokeWidth="4"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//           <path
//             d="M16 32H48"
//             stroke={variant === "default" ? "#245e4f" : "#FFFFFF"}
//             strokeWidth="4"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//           <path
//             d="M20 20L44 44"
//             stroke="#7ac9a7"
//             strokeWidth="4"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//           <path
//             d="M20 44L44 20"
//             stroke="#7ac9a7"
//             strokeWidth="4"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//         </svg>
//       </div>

//       <div className="flex flex-col items-start leading-none">
//         <span className="relative">
//           Coin
//           <span className="text-brand-secondary-mint-green relative inline-block">
//             eggie
//             <span
//               className={cn(
//                 "absolute left-[60%] translate-x-1/2 italic font-medium -bottom-2",
//                 betaSizeClasses[size]
//               )}
//               style={{ color: "#D4AF37" }}
//             >
//               Beta
//             </span>
//           </span>
//         </span>
//       </div>
//     </div>
//   );
// };

// export default Logo;


// import type React from "react";
// import { cn } from "@/lib/utils";

// interface LogoProps {
//   className?: string;
//   size?: "sm" | "md" | "lg";
//   variant?: "default" | "light";
// }

// const Logo: React.FC<LogoProps> = ({
//   className,
//   size = "md",
//   variant = "default",
// }) => {
//   const sizeClasses = {
//     sm: "text-xl",
//     md: "text-2xl",
//     lg: "text-4xl",
//   };

//   const variantClasses = {
//     default: "text-brand-primary-dark-green",
//     light: "text-white",
//   };

//   const betaSizeClasses = {
//     sm: "text-[8px] px-1 py-[1px]",
//     md: "text-[10px] px-1.5 py-[2px]",
//     lg: "text-xs px-2 py-0.5", // ~12px
//   };

//   return (
//     <div
//       className={cn(
//         "font-display font-bold flex items-center",
//         sizeClasses[size],
//         variantClasses[variant],
//         className
//       )}
//     >
//       <div className="relative mr-2">
//         <div className="absolute inset-0 bg-brand-secondary-mint-green rounded-full opacity-30 animate-pulse"></div>
//         <svg
//           width={size === "sm" ? 24 : size === "md" ? 32 : 48}
//           height={size === "sm" ? 24 : size === "md" ? 32 : 48}
//           viewBox="0 0 64 64"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//           className="relative z-10"
//         >
//           <path
//             d="M32 4C16.536 4 4 16.536 4 32C4 47.464 16.536 60 32 60C47.464 60 60 47.464 60 32C60 16.536 47.464 4 32 4Z"
//             stroke={variant === "default" ? "#245e4f" : "#FFFFFF"}
//             strokeWidth="4"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//           <path
//             d="M32 16V48"
//             stroke={variant === "default" ? "#245e4f" : "#FFFFFF"}
//             strokeWidth="4"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//           <path
//             d="M16 32H48"
//             stroke={variant === "default" ? "#245e4f" : "#FFFFFF"}
//             strokeWidth="4"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//           <path
//             d="M20 20L44 44"
//             stroke="#7ac9a7"
//             strokeWidth="4"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//           <path
//             d="M20 44L44 20"
//             stroke="#7ac9a7"
//             strokeWidth="4"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//         </svg>
//       </div>

//       <div className="relative">
//         <span>
//           Coin
//           <span className="text-brand-secondary-mint-green relative">
//             eggi
//             <span className="relative inline-block">
//               e
//               <span
//                 className={cn(
//                   "absolute -top-2 left-3 -translate-x-0 px-2 py-2 rounded text-[10px] font-medium italic",
//                 )}
//                 style={{
//                   backgroundColor: "#D4AF37",
//                   color: "black",
//                   whiteSpace: "nowrap",
//                   lineHeight: "0.1",
//                 }}
//               >
//                 Beta 0.1
//               </span>
//             </span>

//           </span>
//         </span>
//       </div>
//     </div>
//   );
// };

// export default Logo;

import type React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "light";
}

const Logo: React.FC<LogoProps> = ({
  className,
  size = "md",
  variant = "default",
}) => {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl",
  };

  // Make sure these color classes are defined in your Tailwind config
  const variantClasses = {
    default: "text-brand-primary-dark-green",
    light: "text-white",
  };

  const betaSizeClasses = {
    sm: "text-[8px] px-1 py-[1px]",
    md: "text-[10px] px-1.5 py-[2px]",
    lg: "text-xs px-2 py-0.5", // ~12px
  };

  return (
    <div
      className={cn(
        "font-display font-bold flex items-center",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      style={{ color: variant === "default" ? "#245e4f" : "#FFFFFF" }} // Adding inline style as backup
    >
      <div className="relative mr-2">
        <div className="absolute inset-0 bg-brand-secondary-mint-green rounded-full opacity-30 animate-pulse" 
             style={{ backgroundColor: "#7ac9a7" }}></div>
        <svg
          width={size === "sm" ? 24 : size === "md" ? 32 : 48}
          height={size === "sm" ? 24 : size === "md" ? 32 : 48}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10"
        >
          <path
            d="M32 4C16.536 4 4 16.536 4 32C4 47.464 16.536 60 32 60C47.464 60 60 47.464 60 32C60 16.536 47.464 4 32 4Z"
            stroke={variant === "default" ? "#245e4f" : "#FFFFFF"}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M32 16V48"
            stroke={variant === "default" ? "#245e4f" : "#FFFFFF"}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 32H48"
            stroke={variant === "default" ? "#245e4f" : "#FFFFFF"}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 20L44 44"
            stroke="#7ac9a7"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 44L44 20"
            stroke="#7ac9a7"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="relative">
        <span>
          Coin
          <span className="text-brand-secondary-mint-green relative" style={{ color: "#7ac9a7" }}>
            eggi
            <span className="relative inline-block">
              e
              <span
                className={cn(
                  "absolute -top-2 left-3 -translate-x-0 px-2 py-2 rounded text-[10px] font-medium italic",
                )}
                style={{
                  backgroundColor: "#D4AF37",
                  color: "black",
                  whiteSpace: "nowrap",
                  lineHeight: "0.1",
                }}
              >
                Beta 0.1
              </span>
            </span>
          </span>
        </span>
      </div>
    </div>
  );
};

export default Logo;