import { JwtCredentialPayload, JwtPresentationPayload } from "did-jwt-vc";

export type DID = string;
export type Timestamp = number;

export type DethCredential = string;
export type DethToken = string;

export type DethCredentialPayload = JwtCredentialPayload & {
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
    type: ["VerifiableCredential", "DethCredential"];
    nbf?: Timestamp;
    exp: Timestamp;
    iat: Timestamp;
    credentialSubject: {
      issuer: DID;
      holder: DID;
    };
  };
};

export type DethTokenPayload = JwtPresentationPayload & {
  iss: DID;
  sub: DID;
  nbf?: Timestamp;
  exp: Timestamp;
  iat: Timestamp;
  domain: string;
  session?: string;
  vp: {
    "@context": ["https://www.w3.org/2018/credentials/v1"];
    type: ["VerifiablePresentation", "DethToken"];
    verifiableCredential: [DethCredential];
  };
};

export type DethTokenData = {
  issuer: string;
  holder: string;
};

export type DethVerifyErrorCode =
  | "HolderMismatch"
  | "IssuerMismatch"
  | "TokenExpired"
  | "TokenNotYetValid"
  | "CredentialExpired"
  | "CredentialNotYetValid"
  | "CredentialMissing"
  | "MoreThanOneCredential";
