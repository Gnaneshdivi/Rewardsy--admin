// create-qr.dto.ts
import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateQrDto {
 
  link: string;

  
  ads?: boolean=false;

  
  ads_link?: string;
}
