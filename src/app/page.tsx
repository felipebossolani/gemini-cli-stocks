"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const [ticker, setTicker] = useState('');
  const [stockData, setStockData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchStockData = async () => {
    if (!ticker) return;
    setLoading(true);
    setError(null);
    setStockData(null);

    try {
      const response = await fetch(`/api/stock/${ticker}`);
      if (!response.ok) {
        throw new Error('Ticker não encontrado ou erro na API.');
      }
      const data = await response.json();
      setStockData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8 lg:p-24 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-50">
      <Card className="w-full max-w-md p-6 space-y-6 shadow-lg rounded-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-blue-600 dark:text-blue-400">Consulta de Ações</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <Input
            type="text"
            value={ticker}
            onChange={(e) => setTicker(e.target.value.toUpperCase())}
            placeholder="Digite o ticker da ação (ex: PETR4)"
            className="w-full"
          />
          <Button
            onClick={fetchStockData}
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Consultando...' : 'Consultar'}
          </Button>
        </CardContent>
      </Card>

      {error && <p className="mt-8 text-red-500 text-center">{error}</p>}

      {stockData && (
        <Card className="mt-8 w-full max-w-2xl p-6 shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-blue-500 dark:text-blue-300">
              {stockData.longName} ({stockData.symbol})
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-lg">
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <p className="font-semibold text-blue-600 dark:text-blue-400">Preço Atual</p>
              <p>R$ {stockData.regularMarketPrice?.toFixed(2)}</p>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <p className="font-semibold text-blue-600 dark:text-blue-400">Variação (dia)</p>
              <p className={`${stockData.regularMarketChangePercent > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {stockData.regularMarketChangePercent?.toFixed(2)}%
              </p>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <p className="font-semibold text-blue-600 dark:text-blue-400">Volume</p>
              <p>{stockData.regularMarketVolume?.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </main>
  );
}