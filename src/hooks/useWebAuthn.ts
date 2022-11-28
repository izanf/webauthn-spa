import authService from '../services/auth'
import useAuth from './useAuth';

export interface IAssertionOpt {
  challenge: string
}

export interface ICredentialOpt extends IAssertionOpt{
  userId: string;
  userName: string;
  userDisplayName: string;
}

const bufferToBase64 = (buffer: any) => btoa(String.fromCharCode(...new Uint8Array(buffer)));
const base64ToBuffer = (base64: any) => Uint8Array.from(atob(base64), c => c.charCodeAt(0));

const useWebAuthn = () => {
  const { auth } = useAuth();

  const register = async () => {
    try {
      const credentialCreationOptions: any = await authService.authnRegistrationOptions(auth.token)
      
      credentialCreationOptions.challenge = new Uint8Array(credentialCreationOptions.challenge.data);
      credentialCreationOptions.user.id = new Uint8Array(credentialCreationOptions.user.id.data);
      credentialCreationOptions.user.name = auth.username;
      credentialCreationOptions.user.displayName = 'Izanderson Florencio';
      
      const credential: any = await navigator.credentials.create({
        publicKey: credentialCreationOptions
      });
      
      const credentialId = bufferToBase64(credential.rawId);
      
      localStorage.setItem('credential', JSON.stringify({ credentialId }));
      
      const data = {
        rawId: credentialId,
        response: {
          attestationObject: bufferToBase64(credential.response.attestationObject),
          clientDataJSON: bufferToBase64(credential.response.clientDataJSON),
          id: credential.id,
          type: credential.type
        }
      };

      console.log('daaaaata', data)
      
      await authService.authnRegister(auth.token, { credential: data })

      console.log('Registration successful!')
    } catch(error) {
      console.error('registration failed', error);
    }
  }

  const authenticate = async () => {
    const credentialRequestOptions: any = await authService.authnAuthenticateOptions(auth.token)

    const {credentialId} = JSON.parse(localStorage.getItem('credential') || '');

    credentialRequestOptions.challenge = new Uint8Array(credentialRequestOptions.challenge.data);
    credentialRequestOptions.allowCredentials = [
      {
        id: base64ToBuffer(credentialId),
        type: 'public-key',
        transports: ['internal']
      }
    ];

    const credential: any = await navigator.credentials.get({
      publicKey: credentialRequestOptions
    });

    const data = {
      rawId: bufferToBase64(credential.rawId),
      response: {
        authenticatorData: bufferToBase64(credential.response.authenticatorData),
        signature: bufferToBase64(credential.response.signature),
        userHandle: bufferToBase64(credential.response.userHandle),
        clientDataJSON: bufferToBase64(credential.response.clientDataJSON),
        id: credential.id,
        type: credential.type
      }
    };

    await authService.authnAuthenticate(auth.token, { credential: data })
  }

  return { authenticate, register }
}

export default useWebAuthn
