import React, { useState, useRef } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Mail, Download, Plus, Trash2, HelpCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { CalculatorLayout } from '@/layouts/CalculatorLayout';
// Types
interface StockPurchase {
  id: string;
  quantity: number;
  price: number;
}

interface PDFData {
  stockName: string;
  stockPurchases: StockPurchase[];
  averagePrice: number;
  totalShares: number;
  totalInvestment: number;
}

// Utility Functions
const formatIndianRupee = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2
  }).format(amount);
};

const generatePDF = (data: PDFData) => {
  try {
    const { stockName, stockPurchases, averagePrice, totalShares, totalInvestment } = data;
    const doc = new jsPDF();
    const currentDate = new Date().toLocaleDateString('en-IN');
    
    // Add logo and header
    doc.setFillColor(36, 94, 79); // #245e4f
    doc.rect(0, 0, doc.internal.pageSize.width, 30, 'F');
    
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.text("Stock Sage Visualizer Pro", 105, 15, { align: "center" });
    
    // Report title
    doc.setFont("helvetica", "bold");
    doc.setTextColor(36, 94, 79);
    doc.setFontSize(18);
    doc.text(`Stock Average Report: ${stockName}`, 105, 40, { align: "center" });
    
    // Report date
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(10);
    doc.text(`Generated on: ${currentDate}`, 105, 48, { align: "center" });
    
    // Summary box
    doc.setFillColor(248, 248, 248); // light background
    doc.setDrawColor(200, 200, 200);
    doc.roundedRect(14, 55, 182, 40, 3, 3, 'FD');
    
    doc.setFont("helvetica", "bold");
    doc.setTextColor(36, 94, 79);
    doc.setFontSize(12);
    doc.text("Summary", 20, 65);
    
    // Format values
    const formattedAverage = formatIndianRupee(averagePrice);
    const formattedTotal = formatIndianRupee(totalInvestment);
    
    // Add summary details
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 60, 60);
    doc.setFontSize(10);
    
    doc.text(`Average Purchase Price: ${formattedAverage}`, 20, 75);
    doc.text(`Total Shares: ${totalShares.toLocaleString('en-IN')}`, 20, 85);
    doc.text(`Total Investment: ${formattedTotal}`, 20, 95);
    
    // Purchases table data
    const tableColumn = ["Purchase #", "Quantity", "Price per Share (₹)", "Investment (₹)"];
    const tableRows = stockPurchases.map((purchase, index) => {
      const investment = purchase.quantity * purchase.price;
      return [
        (index + 1).toString(),
        purchase.quantity.toLocaleString('en-IN'),
        purchase.price.toLocaleString('en-IN'),
        investment.toLocaleString('en-IN')
      ];
    });
    
    // Add purchases table
    doc.setFont("helvetica", "bold");
    doc.setTextColor(36, 94, 79);
    doc.setFontSize(12);
    doc.text("Purchase History", 20, 115);
    
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 120,
      theme: 'grid',
      styles: { 
        fontSize: 10,
        cellPadding: 3,
        lineColor: [200, 200, 200]
      },
      headStyles: {
        fillColor: [36, 94, 79],
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [248, 248, 248]
      }
    });
    
    // Add footer
    const finalY = (doc as any).lastAutoTable.finalY + 20;
    
    doc.setFont("helvetica", "italic");
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(10);
    doc.text("This report is for informational purposes only. Not financial advice.", 105, finalY, { align: "center" });
    
    doc.setFontSize(9);
    doc.text("© Stock Sage Visualizer Pro", 105, finalY + 10, { align: "center" });
    
    // Save the PDF
    doc.save(`${stockName.replace(/\s+/g, '_')}_Stock_Average_Report.pdf`);
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};

const sendEmail = (data: PDFData & { to: string }) => {
  // This is a mock implementation. In a real application, this would send an actual email.
  console.log(`Sending email to ${data.to} with stock average data for ${data.stockName}`);
  return Promise.resolve();
};

// Main Component
const StockAverageCalculator: React.FC = function StockAverageCalculator() {
  const { toast } = useToast();
  const [stockName, setStockName] = useState<string>('');
  const [stockPurchases, setStockPurchases] = useState<StockPurchase[]>([
    { id: '1', quantity: 0, price: 0 },
    { id: '2', quantity: 0, price: 0 },
  ]);
  const [averagePrice, setAveragePrice] = useState<number | null>(null);
  const [totalShares, setTotalShares] = useState<number | null>(null);
  const [totalInvestment, setTotalInvestment] = useState<number | null>(null);
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [isCalculated, setIsCalculated] = useState<boolean>(false);
  const resultsSectionRef = useRef<HTMLDivElement>(null);

  const addStockPurchase = () => {
    const newId = (parseInt(stockPurchases[stockPurchases.length - 1].id) + 1).toString();
    setStockPurchases([...stockPurchases, { id: newId, quantity: 0, price: 0 }]);
  };

  const removeStockPurchase = (id: string) => {
    if (stockPurchases.length <= 2) {
      toast({
        title: "Cannot Remove",
        description: "You need at least two stock purchases for comparison.",
        variant: "destructive"
      });
      return;
    }
    setStockPurchases(stockPurchases.filter(purchase => purchase.id !== id));
  };

  const updateStockPurchase = (id: string, field: 'quantity' | 'price', value: number) => {
    setStockPurchases(
      stockPurchases.map(purchase => 
        purchase.id === id ? { ...purchase, [field]: value } : purchase
      )
    );
  };

  const calculateAverage = () => {
    if (!stockName.trim()) {
      toast({
        title: "Stock Name Required",
        description: "Please enter a stock name before calculating.",
        variant: "destructive"
      });
      return;
    }

    // Validate all inputs
    let isValid = true;
    stockPurchases.forEach(purchase => {
      if (purchase.quantity <= 0 || purchase.price <= 0) {
        isValid = false;
      }
    });

    if (!isValid) {
      toast({
        title: "Invalid Input",
        description: "All quantities and prices must be greater than zero.",
        variant: "destructive"
      });
      return;
    }

    // Calculate average price
    const totalQuantity = stockPurchases.reduce((sum, purchase) => sum + purchase.quantity, 0);
    const totalCost = stockPurchases.reduce((sum, purchase) => sum + (purchase.quantity * purchase.price), 0);
    const average = totalCost / totalQuantity;

    setAveragePrice(average);
    setTotalShares(totalQuantity);
    setTotalInvestment(totalCost);
    setIsCalculated(true);

    // Scroll to results
    setTimeout(() => {
      resultsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleDownloadPDF = () => {
    if (!isCalculated) {
      toast({
        title: "No Results",
        description: "Please calculate results before downloading.",
        variant: "destructive"
      });
      return;
    }

    generatePDF({
      stockName,
      stockPurchases,
      averagePrice: averagePrice || 0,
      totalShares: totalShares || 0,
      totalInvestment: totalInvestment || 0
    });

    toast({
      title: "Download Started",
      description: "Your PDF report is being downloaded.",
    });
  };

  const handleSendEmail = () => {
    if (!isCalculated) {
      toast({
        title: "No Results",
        description: "Please calculate results before sending email.",
        variant: "destructive"
      });
      return;
    }

    if (!emailAddress.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    sendEmail({
      to: emailAddress,
      stockName,
      stockPurchases,
      averagePrice: averagePrice || 0,
      totalShares: totalShares || 0,
      totalInvestment: totalInvestment || 0
    });

    toast({
      title: "Email Sent",
      description: `Results have been sent to ${emailAddress}.`,
    });
  };

  return (
    <CalculatorLayout
      title="Stock Average Calculator"
      description="Calculate your average purchase price across multiple stock buys."
      icon={<Mail className="h-6 w-6" />}
      showSeparateAboutSection={false}>
    <div className="container mx-auto px-4 py-8">
      <Card className="calculator-container">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl gradient-text">Stock Average Calculator</CardTitle>
          <CardDescription>
            Calculate your average purchase price across multiple stock buys
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="results" disabled={!isCalculated}>Results</TabsTrigger>
            </TabsList>
            <TabsContent value="calculator" className="space-y-6">
              <div className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="stockName" className="form-label">Stock Name</Label>
                  <Input
                    id="stockName"
                    placeholder="Enter stock name (e.g., HDFC Bank)"
                    value={stockName}
                    onChange={(e) => setStockName(e.target.value)}
                    className="w-full"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Stock Purchases</h3>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="icon" className="h-8 w-8">
                            <HelpCircle className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">Enter the quantity and price for each of your stock purchases. You can add more entries if needed.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  {stockPurchases.map((purchase, index) => (
                    <div key={purchase.id} className="grid grid-cols-12 gap-3 items-center">
                      <div className="col-span-1 text-center text-sm font-medium">{index + 1}</div>
                      <div className="col-span-5 md:col-span-5">
                        <Label htmlFor={`quantity-${purchase.id}`} className="sr-only">Quantity</Label>
                        <Input
                          id={`quantity-${purchase.id}`}
                          type="number"
                          placeholder="Quantity"
                          min="1"
                          value={purchase.quantity || ''}
                          onChange={(e) => updateStockPurchase(purchase.id, 'quantity', parseInt(e.target.value) || 0)}
                        />
                      </div>
                      <div className="col-span-5 md:col-span-5">
                        <Label htmlFor={`price-${purchase.id}`} className="sr-only">Price (₹)</Label>
                        <Input
                          id={`price-${purchase.id}`}
                          type="number"
                          placeholder="Price per share (₹)"
                          min="0.01"
                          step="0.01"
                          value={purchase.price || ''}
                          onChange={(e) => updateStockPurchase(purchase.id, 'price', parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      <div className="col-span-1">
                        {index >= 2 && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeStockPurchase(purchase.id)}
                            className="h-8 w-8 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}

                  <Button
                    variant="outline"
                    onClick={addStockPurchase}
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Another Purchase
                  </Button>
                </div>

                <Button
                  onClick={calculateAverage}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Calculate Average
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="results" className="space-y-6" ref={resultsSectionRef}>
              {isCalculated && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-gradient-to-br from-primary to-primary/90 text-white">
                      <CardContent className="pt-6">
                        <h3 className="text-sm font-medium opacity-80">Average Price</h3>
                        <p className="text-2xl font-bold mt-1">
                          {formatIndianRupee(averagePrice || 0)}
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-secondary to-secondary/90 text-white">
                      <CardContent className="pt-6">
                        <h3 className="text-sm font-medium opacity-80">Total Shares</h3>
                        <p className="text-2xl font-bold mt-1">
                          {totalShares?.toLocaleString('en-IN')}
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-gold-DEFAULT to-gold-DEFAULT/90 text-charcoal-DEFAULT">
                      <CardContent className="pt-6">
                        <h3 className="text-sm font-medium opacity-80">Total Investment</h3>
                        <p className="text-2xl font-bold mt-1">
                          {formatIndianRupee(totalInvestment || 0)}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-4">Purchase Summary</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2">Purchase #</th>
                              <th className="text-right py-2">Quantity</th>
                              <th className="text-right py-2">Price per Share</th>
                              <th className="text-right py-2">Investment</th>
                            </tr>
                          </thead>
                          <tbody>
                            {stockPurchases.map((purchase, index) => (
                              <tr key={purchase.id} className="border-b">
                                <td className="py-2">{index + 1}</td>
                                <td className="text-right">{purchase.quantity.toLocaleString('en-IN')}</td>
                                <td className="text-right">{formatIndianRupee(purchase.price)}</td>
                                <td className="text-right">{formatIndianRupee(purchase.quantity * purchase.price)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="emailAddress">Email Address</Label>
                      <Input
                        id="emailAddress"
                        type="email"
                        placeholder="Enter your email to receive results"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        className="w-full"
                      />
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Button
                        onClick={handleDownloadPDF}
                        className="flex items-center gap-2 bg-primary hover:bg-primary/90"
                      >
                        <Download className="h-4 w-4" />
                        Download PDF
                      </Button>
                      <Button
                        onClick={handleSendEmail}
                        className="flex items-center gap-2 bg-secondary hover:bg-secondary/90"
                      >
                        <Mail className="h-4 w-4" />
                        Email Results
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
    </CalculatorLayout>
  );
};

export default StockAverageCalculator;