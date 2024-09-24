// create-reel.dto.ts
import { IsString, IsOptional, IsArray, IsNumber } from 'class-validator';

export class CreateReelDto {
  
  description: string;

  
  link: string;

  
  store: string;

  
  tags?: string[];

  
  url: string;
}
