import { Token } from "./token";

export interface TokenResponse{
    message:string;
    success:boolean;
    token:Token
}