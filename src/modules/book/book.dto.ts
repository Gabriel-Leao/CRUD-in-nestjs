import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Min,
} from 'class-validator';

export class BookDTO {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsNotEmpty({
    message: 'The book title should not be empty',
  })
  @Length(3)
  @IsString({
    message: 'The book title should be of type string',
  })
  title: string;

  @IsNotEmpty({
    message: 'The book description should not be empty',
  })
  @Length(150)
  @IsString({
    message: 'The book autor should be of type string',
  })
  description: string;

  @IsNotEmpty({
    message: 'The book autor should not be empty',
  })
  @Length(3)
  @IsString({
    message: 'The book autor should be of type string',
  })
  author: string;

  @IsNotEmpty({
    message: 'The book releaseYear should not be empty',
  })
  @IsInt({
    message: 'The book releaseYear should be of type int',
  })
  @Min(1900)
  releaseYear: number;

  @IsNotEmpty({
    message: 'The book barCode should not be empty',
  })
  @IsString({
    message: 'The book barCode should be of type string',
  })
  barCode: string;
}
