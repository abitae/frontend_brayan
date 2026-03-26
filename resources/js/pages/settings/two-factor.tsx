import { Head, router } from '@inertiajs/react';
import { useEffect } from 'react';
import { edit as editProfile } from '@/routes/profile';

/**
 * 2FA está desactivado. Redirigir a perfil.
 */
export default function TwoFactor() {
    useEffect(() => {
        router.visit(editProfile());
    }, []);

    return (
        <>
            <Head title="Configuración" />
            <p className="p-4 text-muted-foreground">Redirigiendo...</p>
        </>
    );
}
