// create-offer.dto.ts
import { IsString, IsBoolean, IsOptional, IsArray, IsNumber } from 'class-validator';

export class CreateOfferDto {
  
  title: string;

  
  description?: string;

  
  startDate?: string;

  
  endDate?: string;

  
  image?: string;

  
  store: string;

  
  active?: boolean= false;

  
  numberOfOffers?: number;

  

  
  tags?: string[];
}
