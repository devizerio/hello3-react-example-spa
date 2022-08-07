import { verifyPresentation } from "did-jwt-vc";
import { Resolver } from "did-resolver";
import { getDefaultResolver } from "./default-resolver";
import { VerifyError } from "./verify-error";
import { VerifiableIdentityToken, VerifiableIdentityTokenData } from "./types";

export const verifyToken = async (
  token: VerifiableIdentityToken,
  customResolver?: Resolver
): Promise<VerifiableIdentityTokenData> => {
  const resolver = customResolver ?? getDefaultResolver();
  const tokenVerification = await verifyPresentation(token, resolver);

  const vp = tokenVerification.verifiablePresentation;

  if (!vp.verifiableCredential || vp.verifiableCredential.length === 0) {
    throw new VerifyError("CredentialMissing");
  }

  if (vp.verifiableCredential.length > 1) {
    throw new VerifyError("MoreThanOneCredential");
  }

  const cred = vp.verifiableCredential[0];

  if (cred.credentialSubject.holder !== vp.sub) {
    throw new VerifyError("HolderMismatch");
  }

  return {
    // @ts-ignore
    issuer: cred.credentialSubject.id ?? cred.credentialSubject.issuer, // should be issuer
    holder: cred.credentialSubject.target ?? cred.credentialSubject.holder, // should be holder
  };
};
