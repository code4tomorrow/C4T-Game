import bcrypt from "bcrypt";

export default class PasswordUtil {
    private static readonly saltRounds:number = 10; 

    public static async hash(pass:string) : Promise<string> {
        const salt = await bcrypt.genSalt(this.saltRounds);
        const hash = await bcrypt.hash(pass, salt);
        return hash; 
    }

    public static async compare(pass:string, hash:string) : Promise<boolean> {
        const result = await bcrypt.compare(pass, hash);
        return result; 
    }
}