import { type VariantProps, cva } from 'class-variance-authority';

export { default as Button } from './Button.vue';

export const buttonVariants = cva(
    'inline-flex disabled:cursor-not-allowed items-center justify-center transition duration:3ms font-semibold justify-center whitespace-nowrap rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-slate-300',
    {
        variants: {
            variant: {
                primary:
                    'bg-indigo-500 !text-white hover:bg-indigo-600 dark:hover:bg-indigo-600 dark:text-white',
                default: 'bg-slate-900 text-slate-50 shadow hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90',
                destructive:
                    'bg-red-500 text-slate-50 shadow-sm hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90',
                outline:
                    'border border-slate-200 bg-white shadow-sm hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50',
                secondary:
                    'bg-slate-300 text-slate-900 shadow-sm hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80',
                ghost: 'hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50',
                link: 'text-slate-900 underline-offset-4 hover:underline dark:text-slate-50',
                none: 'bg-transparent hover:bg-slate-100 px-1'
            },
            size: {
                default: 'h-9 px-4 py-2',
                lg: 'h-10 rounded-md px-8',
                sm: 'h-8 rounded-md px-3 text-xs',
                xs: 'h-auto rounded px-2 py-2 text-xs',
                xxs: 'rounded px-2 py-1 text-xs',
                icon: 'h-9 w-9',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'default',
        },
    },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
