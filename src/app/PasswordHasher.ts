import sha256, { Hash, HMAC } from "fast-sha256";
import { encode, decode} from '@stablelib/utf8';


export class PasswordHasher
{
    public static hashPassword(password: string): string
    {
        let encodedPwd: Uint8Array = encode(password);
        let hashedPwdBin: Uint8Array = sha256(encodedPwd);
        let hashedPwdHex: string = "";

        for (let i=0; i < hashedPwdBin.length; i++)
        {
            hashedPwdHex += hashedPwdBin[i].toString(16);
        }
        return hashedPwdHex;
    }
}
