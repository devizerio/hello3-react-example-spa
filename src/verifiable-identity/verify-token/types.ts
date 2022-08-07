import { JwtCredentialPayload, JwtPresentationPayload } from "did-jwt-vc";

export type DID = string;
export type Timestamp = number;

export type VerifiableIdentityCredential = string;
export type VerifiableIdentityToken = string;

export type VerifiableIdentityCredentialPayload = JwtCredentialPayload & {
  iss: DID;
  sub: DID;
  nbf?: Timestamp;
  exp: Timestamp;
  iat: Timestamp;
  vc: {
    id: string;
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      "https://www.w3.org/2018/credentials/examples/v1"
    ];
    type: ["VerifiableCredential", "VerifiableIdentity"];
    nbf?: Timestamp;
    exp: Timestamp;
    iat: Timestamp;
    credentialSubject: {
      issuer: DID;
      holder: DID;
    };
  };
};

export type VerifiableIdentityTokenPayload = JwtPresentationPayload & {
  iss: DID;
  sub: DID;
  nbf?: Timestamp;
  exp: Timestamp;
  iat: Timestamp;
  domain: string;
  session?: string;
  vp: {
    "@context": ["https://www.w3.org/2018/credentials/v1"];
    type: ["VerifiablePresentation", "VerifiableIdentity"];
    verifiableCredential: [VerifiableIdentityCredential];
  };
};

export type VerifiableIdentityTokenData = {
  issuer: string;
  holder: string;
};

export type VerifyErrorCode =
  | "HolderMismatch"
  | "IssuerMismatch"
  | "TokenExpired"
  | "TokenNotYetValid"
  | "CredentialExpired"
  | "CredentialNotYetValid"
  | "CredentialMissing"
  | "MoreThanOneCredential";
