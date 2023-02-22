import { AuthUserActions } from "../enums/sqs.enum";
import { GenericMatch } from "./utility.interface";


export interface SqsBody extends GenericMatch {
    action: AuthUserActions
} 