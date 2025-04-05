interface EOQInputs {
  annualDemand: number;
  orderCost: number;
  holdingCost: number;
  unitCost: number;
}

interface EOQResult {
  eoq: number;
  totalAnnualCost: number;
  orderCyclesPerYear: number;
  daysBetweenOrders: number;
  annualHoldingCost: number;
  annualOrderCost: number;
  totalInventoryCost: number;
}

interface EOQData {
  orderQuantity: number;
  holdingCost: number;
  orderCost: number;
  totalCost: number;
}

export const calculateEOQ = (inputs: EOQInputs): EOQResult => {
  const { annualDemand, orderCost, holdingCost, unitCost } = inputs;

  // Calculate EOQ using the formula: EOQ = √(2DS/H)
  const eoq = Math.sqrt((2 * annualDemand * orderCost) / holdingCost);

  // Calculate number of orders per year
  const orderCyclesPerYear = annualDemand / eoq;

  // Calculate days between orders
  const daysBetweenOrders = 365 / orderCyclesPerYear;

  // Calculate annual holding cost
  const annualHoldingCost = (eoq / 2) * holdingCost;

  // Calculate annual ordering cost
  const annualOrderCost = (annualDemand / eoq) * orderCost;

  // Calculate total inventory cost
  const totalInventoryCost = annualHoldingCost + annualOrderCost;

  // Calculate total annual cost including unit costs
  const totalAnnualCost = totalInventoryCost + (annualDemand * unitCost);

  return {
    eoq,
    totalAnnualCost,
    orderCyclesPerYear,
    daysBetweenOrders,
    annualHoldingCost,
    annualOrderCost,
    totalInventoryCost,
  };
};

export const generateEOQCostData = (inputs: EOQInputs): EOQData[] => {
  const { annualDemand, orderCost, holdingCost } = inputs;
  const eoq = Math.sqrt((2 * annualDemand * orderCost) / holdingCost);

  // Generate data points for the chart
  const dataPoints: EOQData[] = [];
  const minQty = Math.max(1, Math.round(eoq * 0.5));
  const maxQty = Math.round(eoq * 2);
  const step = Math.round((maxQty - minQty) / 50);

  for (let qty = minQty; qty <= maxQty; qty += step) {
    const holdingCostValue = (qty / 2) * holdingCost;
    const orderCostValue = (annualDemand / qty) * orderCost;
    const totalCostValue = holdingCostValue + orderCostValue;

    dataPoints.push({
      orderQuantity: qty,
      holdingCost: holdingCostValue,
      orderCost: orderCostValue,
      totalCost: totalCostValue,
    });
  }

  return dataPoints;
};

export const formatIndianRupees = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}; 