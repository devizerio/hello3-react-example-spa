import {
  DIDResolutionOptions,
  DIDResolutionResult,
  parse,
  Resolvable,
} from "did-resolver";

const EMPTY_RESULT: DIDResolutionResult = {
  didResolutionMetadata: {},
  didDocument: null,
  didDocumentMetadata: {},
};

export class Resolver implements Resolvable {
  async resolve(
    didUrl: string,
    options: DIDResolutionOptions = {}
  ): Promise<DIDResolutionResult> {
    const parsed = parse(didUrl);
    if (parsed === null) {
      return {
        ...EMPTY_RESULT,
        didResolutionMetadata: { error: "invalidDid" },
      };
    }

    return {
      didResolutionMetadata: {
        contentType: "application/did+ld+json",
      },
      didDocument: {
        "@context": [
          "https://www.w3.org/ns/did/v1",
          "https://w3id.org/security/suites/secp256k1recovery-2020/v2",
        ],
        id: didUrl,
        verificationMethod: [
          {
            id: `${didUrl}#controller`,
            type: "EcdsaSecp256k1RecoveryMethod2020",
            controller: didUrl,
            blockchainAccountId: `eip155:1:${parsed.id}`,
          },
        ],
        assertionMethod: [`${didUrl}#controller`],
        authentication: [`${didUrl}#controller`],
      },
      didDocumentMetadata: {},
    };
  }
}

export const getDefaultResolver = () => {
  return new Resolver();
};
