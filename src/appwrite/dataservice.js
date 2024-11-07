import conf from "../config/conf";
import {Client,ID,Databases,Storage,Query} from "appwrite";

export class databaseservice{
    client=new Client();
    database;
    storage;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.database=new Databases(this.client)
        this.storage=new Storage(this.client)
    }

    async CreatePost({title,slug,content,featuredImage,status,UserId}) {
        try {
           return await this.database.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
                UserId
            }
           ) 
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);

        }
    }

    async UpdatePost(slug,{title,content,featuredImage,status}) {
        try {
           return await this.database.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status
            }
           ) 
        } catch (error) {
            throw error;
        }
    }


    async DeletePost(slug) {
        try {
            await this.database.deleteDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
           ) 
           return true;
        } catch (error) {
            throw error;
            return false;
        }
    }

    async getPost(slug) {
        try {
           return await this.database.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
           )
        } catch (error) {
            throw error;
        }
    }

    async getPosts(queries = [Query.equal('status','active')]) {
        try {
           return await this.database.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            queries
           )
        } catch (error) {
            throw error;
        }
    }

    //file upload 
    async uploadfile(file) {
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            throw error;
        }
    }

    async deletefile(fileID) {
        try {
            await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileID
            )
        } catch (error) {
            throw error;
        }
    }
  
    getfilepreview(fileId) {
        return this.storage.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}




const service=new databaseservice()
export default service