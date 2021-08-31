import { IsArray, IsDefined, IsString } from "class-validator";

export class CategoryDto {

    @IsDefined()
    @IsString()
    name: string;
    childrens: object[];
}