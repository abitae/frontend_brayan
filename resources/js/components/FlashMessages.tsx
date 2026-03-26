import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import Swal from 'sweetalert2';

export default function FlashMessages() {
    const { flash } = usePage().props as any;

    useEffect(() => {
        if (!flash) return;

        const baseOptions = {
            toast: true,
            position: 'top-end' as const,
            showConfirmButton: false,
            timerProgressBar: true,
        };

        if (flash.success) {
            Swal.fire({
                ...baseOptions,
                icon: 'success',
                title: 'Éxito',
                text: flash.success,
                timer: 3000,
            });
        }
        if (flash.error) {
            Swal.fire({
                ...baseOptions,
                icon: 'error',
                title: 'Error',
                text: flash.error,
                timer: 4000,
            });
        }
        if (flash.warning) {
            Swal.fire({
                ...baseOptions,
                icon: 'warning',
                title: 'Atención',
                text: flash.warning,
                timer: 4000,
            });
        }
        if (flash.info) {
             Swal.fire({
                ...baseOptions,
                icon: 'info',
                title: 'Información',
                text: flash.info,
                timer: 3000,
            });
        }
    }, [flash]);

    return null;
}
