import { BaseLoginProvider } from "../entities/base-login-provider";
import { SocialUser } from "../entities";
import { LoginOpt } from "../auth.service";

declare let BLAuth: any;

export class BlinfoLoginProvider extends BaseLoginProvider {

    public static readonly PROVIDER_ID: string = 'BLINFO';

    constructor(private clientId: string, private opt: LoginOpt = { scope: '' }) { super(); }

    initialize(): Promise<SocialUser> {
        return new Promise((resolve, reject) => {
            this.loadScript(BlinfoLoginProvider.PROVIDER_ID,
                '//localhost:5000/blauth.js',
                () => {

                });
        });
    }
    signIn(): Promise<SocialUser> {
        return new Promise((resolve, reject) => {
            BLAuth.login((blUser: any) => {
                let user: SocialUser = new SocialUser();

                user.name = blUser.name;
                user.firstName = blUser.firstName;
                user.lastName = blUser.lastName;
                user.email = blUser.email;
                user.authToken = blUser.authToken;

                resolve(user);
            });
        });
    }
    signOut(): Promise<any> {
        throw new Error("Method not implemented.");
    }
}