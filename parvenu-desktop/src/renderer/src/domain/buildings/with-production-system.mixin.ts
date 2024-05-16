import { ProductionSystem } from './production.system';

/* eslint-disable-next-line @typescript-eslint/ban-types  */
type GConstructor<T = {}> = new (...args: any[]) => T;

type HasProductionSystem = GConstructor<{ productionSystem: ProductionSystem }>;

export function WithProductionSystem<TBase extends HasProductionSystem>(
  Base: TBase
) {
  return class Producify extends Base {
    // this might be the first case in which I need to use declare. Without the declare, the actual Building's productionSystem value gets overwritten by undefined.
    declare productionSystem: ProductionSystem;

    produce() {
      this.productionSystem.produce();
    }

    payWorkers(days: number) {
      this.productionSystem.payWorkers(days);
    }

    payUpkeep() {
      this.productionSystem.payUpkeep();
    }

    addWorkers(count: number) {
      this.productionSystem.addWorkers(count);
    }

    removeWorkers(count: number) {
      this.productionSystem.removeWorkers(count);
    }

    hireWorkers() {
      this.productionSystem.hireWorkers();
    }

    setDesiredWorkers(amount: number) {
      this.productionSystem.setDesiredWorkers(amount);
    }

    incrementDesiredWorkers(amount: number) {
      this.productionSystem.incrementDesiredWorkers(amount);
    }

    decrementDesiredWorkers(amount: number) {
      this.productionSystem.decrementDesiredWorkers(amount);
    }

    fireWorkers() {
      this.productionSystem.fireWorkers();
    }
  };
}

export type Producify = InstanceType<ReturnType<typeof WithProductionSystem>>;

export const hasProductionSystem = (
  instance: object
): instance is { productionSystem: ProductionSystem } => {
  return (
    'productionSystem' in instance &&
    instance.productionSystem instanceof ProductionSystem
  );
};
