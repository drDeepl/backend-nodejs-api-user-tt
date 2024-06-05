import { Request } from "express";

export interface RequestExtended extends Request{
    user: {[key:string]:[value:number]}
}