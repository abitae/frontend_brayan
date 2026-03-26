import { Link } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import type { AuthLayoutProps } from '@/types';
import { home } from '@/routes';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-slate-50 p-6 md:p-10">
            <div className="w-full max-w-md">
                <div className="flex flex-col gap-6">
                    <Link
                        href={home()}
                        className="flex items-center justify-center gap-2 font-medium text-slate-800"
                    >
                        <div className="flex h-10 w-10 items-center justify-center">
                            <AppLogoIcon className="size-10 fill-current text-slate-900" />
                        </div>
                        <span className="sr-only">{title}</span>
                    </Link>

                    <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-xl md:p-10">
                        <div className="mb-8 space-y-2 text-center">
                            <h1 className="text-2xl font-black tracking-tight text-slate-900">
                                {title}
                            </h1>
                            <p className="text-sm font-medium text-slate-600">
                                {description}
                            </p>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
