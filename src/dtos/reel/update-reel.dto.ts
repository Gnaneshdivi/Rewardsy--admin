// update-reel.dto.ts
import { IsString, IsOptional, IsArray } from 'class-validator';

export class UpdateReelDto {
  
  description?: string;

  
  link?: string;

  
  store?: string;

  
  tags?: string[];

  
  url?: string;
}
