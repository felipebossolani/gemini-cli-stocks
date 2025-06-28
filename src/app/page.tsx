
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react"; // Importar ícone de carregamento

export default function Home() {
  const [ticker, setTicker] = useState('');
  const [stockData, setStockData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchStockData = async () => {
    if (!ticker) {
      setError('Por favor, digite um ticker de ação.');
      return;
    }
    setLoading(true);
    setError(null);
    setStockData(null);

    try {
      const response = await fetch(`/api/stock/${ticker}`);
      if (!response.ok) {
        throw new Error('Ticker não encontrado ou erro na API. Verifique o ticker e tente novamente.');
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
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8 lg:p-24 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-50">
      <Card className="w-full max-w-lg p-6 space-y-6 shadow-xl rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-extrabold text-blue-700 dark:text-blue-400 mb-2">Consulta de Ações</CardTitle>
          <p className="text-gray-600 dark:text-gray-300">Obtenha informações em tempo real sobre ações brasileiras.</p>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <div className="flex w-full gap-2">
            <Input
              type="text"
              value={ticker}
              onChange={(e) => setTicker(e.target.value.toUpperCase())}
              placeholder="Ex: PETR4, VALE3"
              className="flex-grow text-lg p-3 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
            />
            <Button
              onClick={fetchStockData}
              disabled={loading}
              className="px-6 py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-200"
            >
              {loading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : null}
              {loading ? 'Consultando...' : 'Consultar'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {error && (
        <Card className="mt-8 w-full max-w-lg p-4 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-200 shadow-md rounded-lg">
          <CardContent className="text-center font-medium">
            {error}
          </CardContent>
        </Card>
      )}

      {stockData && (
        <Card className="mt-8 w-full max-w-2xl p-6 shadow-xl rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {stockData.longName} ({stockData.symbol})
            </CardTitle>
            <Separator className="my-4 bg-gray-200 dark:bg-gray-700" />
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                <p className="font-semibold text-gray-700 dark:text-gray-200">Preço Atual:</p>
                <p className="font-bold text-xl text-blue-600 dark:text-blue-400">R$ {stockData.regularMarketPrice?.toFixed(2)}</p>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                <p className="font-semibold text-gray-700 dark:text-gray-200">Variação (dia):</p>
                <p className={`font-bold text-xl ${stockData.regularMarketChangePercent > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {stockData.regularMarketChangePercent?.toFixed(2)}%
                </p>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                <p className="font-semibold text-gray-700 dark:text-gray-200">Volume:</p>
                <p className="font-bold text-xl text-gray-800 dark:text-gray-100">{stockData.regularMarketVolume?.toLocaleString()}</p>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                <p className="font-semibold text-gray-700 dark:text-gray-200">Nome Completo:</p>
                <p className="font-bold text-xl text-gray-800 dark:text-gray-100 text-right">{stockData.longName}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
