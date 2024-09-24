// update-store.dto.ts
import { IsString, IsBoolean, IsOptional, IsArray, Matches } from 'class-validator';

export class UpdateStoreDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  area?: string;

  @IsString()
  @IsOptional()
  background?: string;

  @IsArray()
  @IsOptional()
  category?: string[];

  @IsString()
  @IsOptional()
  desc?: string;

  @IsString()
  @IsOptional()
  dp?: string;

  @IsArray()
  @IsOptional()
  links?: string[];

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  @Matches(/^\d{10,15}$/, { message: 'Phone number must be between 10 to 15 digits' })
  phoneNumber?: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
