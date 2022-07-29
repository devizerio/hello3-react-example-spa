import { verifyPresentation } from "did-jwt-vc";
import { Resolver } from "did-resolver";
import { getDefaultResolver } from "./default-resolver";
import { DethVerifyError } from "./deth-verify-error";
import { DethToken, DethTokenData } from "./types";

export const verifyToken = async (
  token: DethToken,
  customResolver?: Resolver
): Promise<DethTokenData> => {
  const resolver = customResolver ?? getDefaultResolver();
  const tokenVerification = await verifyPresentation(token, resolver);

  const vp = tokenVerification.verifiablePresentation;

  if (!vp.verifiableCredential || vp.verifiableCredential.length === 0) {
    throw new DethVerifyError("CredentialMissing");
  }

  if (vp.verifiableCredential.length > 1) {
    throw new DethVerifyError("MoreThanOneCredential");
  }

  const cred = vp.verifiableCredential[0];

  if (cred.credentialSubject.holder !== vp.sub) {
    throw new DethVerifyError("HolderMismatch");
  }

  console.log(cred);

  return {
    // @ts-ignore
    issuer: cred.credentialSubject.id ?? cred.credentialSubject.issuer, // should be issuer
    holder: cred.credentialSubject.target ?? cred.credentialSubject.holder, // should be holder
  };
};
