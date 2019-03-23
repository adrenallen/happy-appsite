import { FactorType } from "../enums/factor-type.enum";

export class RelatedFactorsToRatingsChartDTO{
    data: number[];
    labels: string[];
    factorType: FactorType;
    rating: number;
  }