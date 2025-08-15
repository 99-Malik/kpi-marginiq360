import { Suspense } from 'react';
import IdentityVerification from '../../../components/SignIn/IdentityVerification';

export default function IdentityVerificationPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <IdentityVerification />
        </Suspense>
    );
} 