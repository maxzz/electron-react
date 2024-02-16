import plugin from "tailwindcss/plugin";
// import { fontFamily } from "tailwindcss/defaultTheme";

//https://ui.jln.dev/feedback-colors-generator-for-shadcn-ui
//https://github.com/jln13x/ui.jln.dev/blob/main/src/app/feedback-colors-generator-for-shadcn-ui/generator.tsx

export const shadcnFeedbackPlugin = plugin(

    // 1. Add CSS variable definitions to the base layer
    function ({ addBase, theme }) {
        addBase({
            ":root": {
                "--destructive": "8 91% 45%",
                "--destructive-foreground": "0 0% 100%",
                "--success": "144 91% 45%",
                "--success-foreground": "144 91% 5%",
                "--warning": "36 91% 45%",
                "--warning-foreground": "36 91% 5%",
                "--info": "217 91% 45%",
                "--info-foreground": "0 0% 100%"
            },
            ".dark": {
                "--destructive": "3 91% 15%",
                "--destructive-foreground": "3 91% 75%",
                "--success": "114 91% 15%",
                "--success-foreground": "114 91% 55%",
                "--warning": "17 91% 15%",
                "--warning-foreground": "17 91% 75%",
                "--info": "228 91% 15%",
                "--info-foreground": "228 91% 75%"
            }
        });
    },

    // 2. Extend the Tailwind theme with "themable" utilities
    {
        theme: {
            extend: {
                colors: {
                    destructive: {
                        DEFAULT: "hsl(var(--destructive))",
                        foreground: "hsl(var(--destructive-foreground))",
                    },
                    success: {
                        DEFAULT: "hsl(var(--success))",
                        foreground: "hsl(var(--success-foreground))",
                    },
                    warning: {
                        DEFAULT: "hsl(var(--warning))",
                        foreground: "hsl(var(--warning-foreground))",
                    },
                    info: {
                        DEFAULT: "hsl(var(--info))",
                        foreground: "hsl(var(--info-foreground))",
                    },
                },
            }
        }
    }
);

export default shadcnFeedbackPlugin;
