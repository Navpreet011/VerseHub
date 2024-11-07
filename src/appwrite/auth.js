import conf from '../config/conf'
import {Client,Account,ID} from "appwrite";

export class Authservice {
    cleint = new Client()
    account;
    constructor() {
        this.cleint
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account=new Account(this.cleint)
    }

    async CreateAccount({email,password,name}){
        try {
            const useraccount=await this.account.create(ID.unique(),email,password,name);
            if(useraccount){
               return this.login({email,password})
            }else{
                return useraccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email,password}){
        try {
           return await this.account.createEmailPasswordSession(email,password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentuser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }
        return null;
    }

    async logout() {
        try {
           await this.account.deleteSessions() 
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);

        }
    }
}



const authservice = new Authservice();

export default authservice