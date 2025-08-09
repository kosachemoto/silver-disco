import { useMutation } from '@tanstack/react-query';

import { useAuthPasskeyRequestMutation } from '@/shared/api/auth/passkey/request/hooks';
import { useAuthPasskeyVerifyMutation } from '@/shared/api/auth/passkey/verify/hooks';

import { checkIsPublicKeyCredential } from '@/entities/navigator/credentials/utils';
import { webAuthnErrorHandling } from '@/entities/web-authn-error/utils';

export const useAuthPasskeyMutation = () => {
    const authPasskeyRequestMutation = useAuthPasskeyRequestMutation();
    const authPasskeyVerifyMutation = useAuthPasskeyVerifyMutation();

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
