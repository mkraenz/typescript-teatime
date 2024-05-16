import { range } from 'lodash';
import { Citizens } from './citizens';
import { Storage } from './storage';
import { Treasury } from './treasury';
import { waresData } from './wares.data';

const sum = (a: number, b: number) => a + b;

const bidAskSpread = 0.95;

export class TradingPost {
  private readonly cityStorage: Storage;
  private readonly cityTreasury: Treasury;
  private readonly citizens: Citizens;
  private merchantStorage!: Storage;
  private merchantTreasury!: Treasury;

  constructor(params: {
    cityStorage: Storage;
    cityTreasury: Treasury;
    citizens: Citizens;
  }) {
    this.cityStorage = params.cityStorage;
    this.cityTreasury = params.cityTreasury;
    this.citizens = params.citizens;
  }

  setMerchant(merchant: { storage: Storage; treasury: Treasury }) {
    this.merchantStorage = merchant.storage;
    this.merchantTreasury = merchant.treasury;
  }

  getQuoteForBuyingFromMerchant(ware: string, amountTraded: number = 1) {
    // future goal
    // quote = function(ware type, citizens consumption, wares in storage , city-owned production building consumption, (global availability of ware?? - not now), )
    // quote = basePrice(type) * fn(how many days do the current stocks satisfy total consumption)

    const consumptionPerDay = this.citizens.getResourceConsumption(ware);
    // FUTURE should we include the city-owned production building consumption?
    const basePrice = waresData[ware].basePrice;
    const daysInAMonth = 30;
    const daysInAWeek = 7;
    // simulating buying one item at a time
    const totalPrice = range(amountTraded)
      .map((n) => {
        const waresLeft = Math.max(this.cityStorage.getStock(ware) + n, 0);
        const daysOfStock = waresLeft / consumptionPerDay;
        const stockForLessThanAWeek = daysOfStock < daysInAWeek;
        const stockForLessthanAMonth = daysOfStock < daysInAMonth;
        if (stockForLessThanAWeek)
          // baseprice * (1 + m/7), m <= 7, thus factor between 1 and 2
          return basePrice * (1 + (daysInAWeek - daysOfStock) / daysInAWeek);
        if (stockForLessthanAMonth)
          return (
            // baseprice * (0.5 + 0.5*m/30 ), m <= 30. thus factor between 0.5 and 1
            basePrice * (0.5 + (daysInAMonth - daysOfStock) / daysInAMonth / 2)
          );
        // 30+ days
        return basePrice * 0.5;
      })
      .reduce(sum, 0);
    // return totalPrice * split;
    return Math.ceil(totalPrice * bidAskSpread);
  }

  getQuoteForSellingToMerchant(ware: string, amountTraded: number = 1) {
    const consumptionPerDay = this.citizens.getResourceConsumption(ware);
    // FUTURE should we include the city-owned production building consumption?
    const basePrice = waresData[ware].basePrice;
    const daysInAMonth = 30;
    const daysInAWeek = 7;
    // simulating buying one item at a time
    const totalPrice = range(amountTraded)
      .map((n) => {
        const waresLeft = Math.max(this.cityStorage.getStock(ware) - n, 0);
        const daysOfStock = waresLeft / consumptionPerDay;
        const stockForLessThanAWeek = daysOfStock < daysInAWeek;
        const stockForLessthanAMonth = daysOfStock < daysInAMonth;
        if (stockForLessThanAWeek)
          return basePrice * (1 + (daysInAWeek - daysOfStock) / daysInAWeek);
        if (stockForLessthanAMonth)
          return (
            basePrice * (0.5 + (daysInAMonth - daysOfStock) / daysInAMonth / 2)
          );
        // 30+ days
        return basePrice * 0.5;
      })
      .reduce(sum, 0);
    // return totalPrice;
    return Math.ceil(totalPrice);
  }

  canSellToMerchant(ware: string, amount: number = 1) {
    const inStock = this.cityStorage.hasResources([{ amount, ware }]);
    const price = this.getQuoteForSellingToMerchant(ware, amount);
    const merchantCanPay = this.merchantTreasury.hasEnough(price);
    const merchantCanStore = this.merchantStorage.hasCapacity([
      { amount, ware },
    ]);
    return inStock && merchantCanPay && merchantCanStore;
  }

  canBuyFromMerchant(ware: string, amount: number = 1) {
    const inStock = this.merchantStorage.hasResources([{ amount, ware }]);
    return inStock;
  }

  sellToMerchant(ware: string, amount: number = 1) {
    const price = this.getQuoteForSellingToMerchant(ware, amount);
    if (this.canSellToMerchant(ware, amount)) {
      this.cityTreasury.debit(price);
      this.cityStorage.remove(ware, amount);
      this.merchantTreasury.credit(price);
      this.merchantStorage.add(ware, amount);
    }
  }

  buyFromMerchant(ware: string, amount: number = 1) {
    const price = this.getQuoteForBuyingFromMerchant(ware, amount);
    if (this.canBuyFromMerchant(ware, amount)) {
      this.merchantStorage.remove(ware, amount);
      this.cityStorage.add(ware, amount);
      this.merchantTreasury.debit(price);
      // this.cityTreasury.credit(price); // question: should the city have finite money?
    }
  }
}
