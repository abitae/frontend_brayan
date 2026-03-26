import { Head, router } from '@inertiajs/react';
import { useEffect } from 'react';
import { login } from '@/routes';

/**
 * 2FA está desactivado. Redirigir a login.
 */
export default function TwoFactorChallenge() {
    useEffect(() => {
        router.visit(login());
    }, []);

    return (
        <>
            <Head title="Iniciar sesión" />
            <p className="p-4 text-muted-foreground">Redirigiendo...</p>
        </>
    );
}
