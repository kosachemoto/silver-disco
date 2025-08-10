import { useMutation } from '@tanstack/react-query';

import { useAuthSignInPasskeyRequestMutation } from '@/shared/api/auth/sign-in/passkey/request/hooks';
import { useAuthSignInPasskeyVerifyMutation } from '@/shared/api/auth/sign-in/passkey/verify/hooks';

import { checkIsPublicKeyCredential } from '@/entities/navigator/credentials/utils';
import { webAuthnErrorHandling } from '@/entities/web-authn-error/utils';

export const useAuthSignInPasskeyMutation = () => {
    const authPasskeyRequestMutation = useAuthSignInPasskeyRequestMutation();
    const authPasskeyVerifyMutation = useAuthSignInPasskeyVerifyMutation();

    return useMutation({
        mutationFn: () =>
            authPasskeyRequestMutation
                .mutateAsync()
                .then((publicKey) => navigator.credentials.get({ publicKey }))
                .catch(webAuthnErrorHandling)
                .then((credential) => {
                    if (!checkIsPublicKeyCredential(credential)) {
                        throw new Error('Invalid credential');
                    }

                    return credential;
                })
                .then((credential) =>
                    authPasskeyVerifyMutation.mutateAsync(credential)
                ),
    });
};
