import { User } from "../auth/models/user.model";

export interface iJob {
    ownerId: number;
    id: number;
    img: string;
    title: string;
    type: string;
    category: string;
    description: string;
    likes: User[];
    applied: User[],
    hired: User;
}