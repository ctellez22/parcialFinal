import { IsNotEmpty, IsString } from "class-validator";

export class CreateAppintmentDto {


    @IsString()
    id: string;

    @IsString()
    @IsNotEmpty({ message: 'El estaddo es obligatorio' })
    status: string;
    dateTime: Date;

    @IsString()
    @IsNotEmpty({ message: 'El id del usuario es obligatorio' })
    userId: string;

}
