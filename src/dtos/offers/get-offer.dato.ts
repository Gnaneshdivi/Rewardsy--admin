// get-offer.dto.ts

import { IsOptional, IsString, IsNumber, } from 'class-validator';

export class GetOfferDto {
  
  limit?: number; // Limit the number of results

  
  location?: string; // Optional location filter

  
  storeId?: string; // Optional store ID filter

  
  tags?: string; // Optional tags filter
}
