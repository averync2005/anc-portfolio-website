/**
 * App-wide providers (theme, preloader, tooltips, toasts)
 */




// ---------------------------------
// Imports
// ---------------------------------

import Preloader from "./preloader";
import { ThemeProvider } from "./theme/theme-provider";
import { Toaster } from "./ui/toaster";
import { TooltipProvider } from "./ui/tooltip";




// ---------------------------------
// Providers
// ---------------------------------

/**
 * Wraps every page (dark theme by default, preloader runs before content)
 */
export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
      <Preloader>
        <TooltipProvider>
          {children}
        </TooltipProvider>
        <Toaster />
      </Preloader>
    </ThemeProvider>
  );
};