import { IsString } from "class-validator";

export class AddCategoryDto {

    @IsString()
    title: string
}
