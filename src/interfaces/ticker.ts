export class Ticker {
  constructor(
    public currency: string,
    public closing_price: number,
    public day_before_price: number,
    public day_before_percent: number,
    public volume_1day: number,
    public volume_price: number,
    public closing_price_toString: string,
    public day_before_price_toString: string,
    public volume_1day_toString: string,
    public volume_price_toString: string
  ) {}
}
