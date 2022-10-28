import { JSEncrypt } from "jsencrypt";

const publicKey = `
-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEAzkdzV9hqwpWMuXw7LxtMMFtUjyDn6oqY7K3Y4tpN+cRMz6TnYaMJ
25SQLlvZI826u3dpRwHC+KDtK6gL4iCEgsENvMeVMV2WMG/5XcWlymXJKDg5Nw0k
F149H+/UHNWGcOx/o+3Uv8FKG7eDKsyZSKUR7eKvvARqR0TLVLRArenM65BCrdSo
f9M9xJmUgjT1AucloVUfBpklDdW/uNmSu85LaWrG+S2CQKLxr4BvHJ0TmMGLFwrF
pXZZjBrvyZ+dQAIU7A8Jz2DozZ9KJzyFHqbO14bM7b/bfrt4yp90A19Cb+t38xTF
1f+YNZNXIQo9EoIXaLodTywoUgWfU6OwlwIDAQAB
-----END RSA PUBLIC KEY-----`


export const EncryptionRSA = (value:string) => {
    const encrypt = new JSEncrypt()

    encrypt.setPublicKey(publicKey)
    const encrypted = encrypt.encrypt(value) as string

    console.log(encrypted);
    

    return encrypted
}