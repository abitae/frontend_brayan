import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';
import FlashMessages from '@/components/FlashMessages';

export default function AuthLayout({
    children,
    title,
    description,
    ...props
}: {
    children: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <AuthLayoutTemplate title={title} description={description} {...props}>
            <FlashMessages />
            {children}
        </AuthLayoutTemplate>
    );
}

