
"use client";

import { useState } from 'react';

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
        throw new Error('Ticker not found');
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
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900 text-white">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-400">Consulta de Ações</h1>
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-1 lg:text-left">
        <div className="flex flex-col items-center">
          <input
            type="text"
            value={ticker}
            onChange={(e) => setTicker(e.target.value.toUpperCase())}
            placeholder="Digite o ticker da ação (ex: PETR4)"
            className="w-full max-w-md p-4 mb-4 text-lg text-gray-900 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={fetchStockData}
            disabled={loading}
            className="w-full max-w-md p-4 text-lg font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-500 transition-colors"
          >
            {loading ? 'Consultando...' : 'Consultar'}
          </button>
        </div>

        {error && <p className="mt-8 text-red-500 text-center">{error}</p>}

        {stockData && (
          <div className="mt-8 w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-blue-300">{stockData.longName} ({stockData.symbol})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-lg">
              <div className="p-4 bg-gray-700 rounded-lg">
                <p className="font-semibold text-blue-400">Preço Atual</p>
                <p>R$ {stockData.regularMarketPrice?.toFixed(2)}</p>
              </div>
              <div className="p-4 bg-gray-700 rounded-lg">
                <p className="font-semibold text-blue-400">Variação (dia)</p>
                <p className={`${stockData.regularMarketChangePercent > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {stockData.regularMarketChangePercent?.toFixed(2)}%
                </p>
              </div>
              <div className="p-4 bg-gray-700 rounded-lg">
                <p className="font-semibold text-blue-400">Volume</p>
                <p>{stockData.regularMarketVolume?.toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
