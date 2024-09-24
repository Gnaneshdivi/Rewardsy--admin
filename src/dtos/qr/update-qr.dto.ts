import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateQrDto {
 
  active?: boolean;

 
  ads?: boolean;

 
  ads_link?: string;

 
  link?: string;
}
