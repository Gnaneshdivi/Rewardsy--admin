// update-offer.dto.ts

import { CreateOfferDto } from './create-offer.dto';
import { IsNumber, IsOptional } from 'class-validator';

// The UpdateOfferDto makes all fields optional for updating
export class UpdateOfferDto extends CreateOfferDto {
  
  redemptions?: number=0;
}
