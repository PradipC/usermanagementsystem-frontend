import { User } from "./user";

export class Page {

    content: User[];
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number = 5;
    first: boolean;
    sort: string;
    numberOfElements: number;
    number: number = 0;
  

}
