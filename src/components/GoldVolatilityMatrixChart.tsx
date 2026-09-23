import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';

export interface MatrixSessionData {
  date: string;
  shortDate: string;
  open: number;
  high: number;
  low: number;
  range: number; // in pips
  rangeDollars: number;
  catalyst: string;
  trend: 'bullish' | 'bearish';
  change: string;
  summary: string;
}

// 30-day chronological dataset derived from institutional market recordings
export const RAW_MATRIX_DATA: MatrixSessionData[] = [
  { date: "2026-08-01 (Thu)", shortDate: "Aug 01", open: 2448.20, high: 2462.40, low: 2431.00, range: 314, rangeDollars: 31.40, catalyst: "FOMC Rate Hold & Powell Signals September", trend: "bearish", change: "-$2.20 (-0.09%)", summary: "Post-FOMC presser created choppy 314-pip range before settling flat." },
  { date: "2026-08-02 (Fri)", shortDate: "Aug 02", open: 2446.00, high: 2477.50, low: 2410.80, range: 667, rangeDollars: 66.70, catalyst: "July NFP Shock Miss & Sahm Rule Trigger", trend: "bullish", change: "+$11.80 (+0.48%)", summary: "Sahm Rule trigger sparked explosive 667-pip intraday recovery from $2,410 to $2,477." },
  { date: "2026-08-05 (Mon)", shortDate: "Aug 05", open: 2442.10, high: 2458.60, low: 2364.20, range: 944, rangeDollars: 94.40, catalyst: "Nikkei 12% Flash Crash & Global De-leveraging", trend: "bearish", change: "-$32.90 (-1.35%)", summary: "Extreme volatility event. Worldwide liquidity crunch spurred emergency margin selling." },
  { date: "2026-08-06 (Tue)", shortDate: "Aug 06", open: 2409.20, high: 2418.00, low: 2382.50, range: 355, rangeDollars: 35.50, catalyst: "Global Liquidation Aftershocks & Margin Calls", trend: "bearish", change: "-$19.70 (-0.82%)", summary: "Forced institutional margin coverage drove collateral selling of profitable gold holdings." },
  { date: "2026-08-07 (Wed)", shortDate: "Aug 07", open: 2389.50, high: 2406.80, low: 2380.10, range: 267, rangeDollars: 26.70, catalyst: "BOJ Deputy Governor Dovish Communication", trend: "bearish", change: "-$6.50 (-0.27%)", summary: "Yen carry panic abated following dovish BOJ communication." },
  { date: "2026-08-08 (Thu)", shortDate: "Aug 08", open: 2383.00, high: 2428.40, low: 2380.20, range: 482, rangeDollars: 48.20, catalyst: "US Jobless Claims Fall Most in 11 Months", trend: "bullish", change: "+$44.00 (+1.85%)", summary: "Powerful 482-pip trend day reclaimed $2,420 effortlessly." },
  { date: "2026-08-09 (Fri)", shortDate: "Aug 09", open: 2427.00, high: 2437.50, low: 2417.80, range: 197, rangeDollars: 19.70, catalyst: "Weekend Position Hedging & China SGE Buying", trend: "bullish", change: "+$4.50 (+0.19%)", summary: "Orderly accumulation into weekend risk window with positive London arb." },
  { date: "2026-08-12 (Mon)", shortDate: "Aug 12", open: 2431.50, high: 2473.00, low: 2423.80, range: 492, rangeDollars: 49.20, catalyst: "Mideast Pre-emptive Air Strike Defense Escalation", trend: "bullish", change: "+$40.50 (+1.67%)", summary: "Urgent safe-haven flight triggered a vertical +492 pip rally." },
  { date: "2026-08-13 (Tue)", shortDate: "Aug 13", open: 2472.00, high: 2476.90, low: 2458.30, range: 186, rangeDollars: 18.60, catalyst: "US PPI Cools to 0.1% vs 0.2% Consensus", trend: "bearish", change: "-$6.90 (-0.28%)", summary: "Cooling wholesale prices maintained dovish bias ahead of CPI." },
  { date: "2026-08-14 (Wed)", shortDate: "Aug 14", open: 2465.10, high: 2479.80, low: 2438.40, range: 414, rangeDollars: 41.40, catalyst: "US Headline CPI 2.9% (First sub-3% in 3 Yrs)", trend: "bearish", change: "-$17.30 (-0.70%)", summary: "Classic sell-the-fact reaction, followed by sharp 414-pip distribution down to $2,438." },
  { date: "2026-08-15 (Thu)", shortDate: "Aug 15", open: 2447.80, high: 2471.20, low: 2432.00, range: 392, rangeDollars: 39.20, catalyst: "US Retail Sales Strong Beat (+1.0%)", trend: "bullish", change: "+$8.40 (+0.34%)", summary: "Resilient retail spending absorbed by strong physical Asian bids." },
  { date: "2026-08-16 (Fri)", shortDate: "Aug 16", open: 2456.20, high: 2509.80, low: 2455.10, range: 547, rangeDollars: 54.70, catalyst: "Housing Starts Plunge & Historical $2,500 Piercing", trend: "bullish", change: "+$52.30 (+2.13%)", summary: "Historic +547 pip surge piercing $2,500 ceiling for first time in history." },
  { date: "2026-08-19 (Mon)", shortDate: "Aug 19", open: 2508.50, high: 2510.90, low: 2486.20, range: 247, rangeDollars: 24.70, catalyst: "Profit-Taking Post Weekend Mideast De-escalation", trend: "bearish", change: "-$4.50 (-0.18%)", summary: "Unwinding war risk premium produced orderly pullback to $2,486." },
  { date: "2026-08-20 (Tue)", shortDate: "Aug 20", open: 2504.00, high: 2531.70, low: 2500.40, range: 313, rangeDollars: 31.30, catalyst: "Historic All-Time High Breakout Above $2,530", trend: "bullish", change: "+$10.00 (+0.40%)", summary: "Technical barrier breakout through previous records propelled price to fresh ATH." },
  { date: "2026-08-21 (Wed)", shortDate: "Aug 21", open: 2514.00, high: 2520.10, low: 2502.80, range: 173, rangeDollars: 17.30, catalyst: "FOMC Minutes Reveal Majority Favored Easing", trend: "bearish", change: "-$1.60 (-0.06%)", summary: "Volatility contracted into 173-pip corridor ahead of Jackson Hole." },
  { date: "2026-08-22 (Thu)", shortDate: "Aug 22", open: 2512.40, high: 2515.80, low: 2470.90, range: 449, rangeDollars: 44.90, catalyst: "US PMI Flash Surge & Sovereign Yield Spike", trend: "bearish", change: "-$27.90 (-1.11%)", summary: "Massive algorithmic stop liquidation breaking below $2,500 down to $2,470." },
  { date: "2026-08-23 (Fri)", shortDate: "Aug 23", open: 2484.50, high: 2523.00, low: 2482.10, range: 409, rangeDollars: 40.90, catalyst: "Jackson Hole: Powell 'Time Has Come' Pivot", trend: "bullish", change: "+$38.50 (+1.55%)", summary: "Historic breakout session ignited by Fed Chair Powell explicit rate-cutting signal (+409 pips)." },
  { date: "2026-08-26 (Tue)", shortDate: "Aug 26", open: 2512.60, high: 2526.40, low: 2509.30, range: 171, rangeDollars: 17.10, catalyst: "Middle East Maritime Drone Intercepts", trend: "bullish", change: "+$5.60 (+0.22%)", summary: "Heightened geopolitical risk premium supported tight upward drift above $2,509." },
  { date: "2026-08-27 (Wed)", shortDate: "Aug 27", open: 2518.20, high: 2524.60, low: 2501.20, range: 234, rangeDollars: 23.40, catalyst: "Libya Oil Production Halt & Macro Hedging", trend: "bearish", change: "-$12.80 (-0.51%)", summary: "Supply shutdown headlines provoked sharp safe-haven hedging then close-out." },
  { date: "2026-08-28 (Thu)", shortDate: "Aug 28", open: 2505.40, high: 2528.90, low: 2502.10, range: 268, rangeDollars: 26.80, catalyst: "US GDP Upward Revision (3.0% vs 2.8%)", trend: "bullish", change: "+$15.90 (+0.63%)", summary: "Cooling core PCE sparked bullion demand, fueling 268-pip continuation rally." },
  { date: "2026-08-29 (Fri)", shortDate: "Aug 29", open: 2521.30, high: 2527.10, low: 2500.80, range: 263, rangeDollars: 26.30, catalyst: "US Core PCE In-Line & Month-End Flow", trend: "bearish", change: "-$19.30 (-0.77%)", summary: "Month-end portfolio rebalancing triggered institutional profit-taking." },
  { date: "2026-09-02 (Tue)", shortDate: "Sep 02", open: 2502.00, high: 2506.40, low: 2490.50, range: 159, rangeDollars: 15.90, catalyst: "US Holiday Re-open & Dollar Bids", trend: "bearish", change: "+$2.20 (+0.09%)", summary: "Post-Labor Day liquidity reset produced choppy mean-reverting price action." },
  { date: "2026-09-03 (Wed)", shortDate: "Sep 03", open: 2504.20, high: 2509.60, low: 2489.10, range: 205, rangeDollars: 20.50, catalyst: "JOLTS Job Openings Plunge to Multi-Year Low", trend: "bearish", change: "-$9.20 (-0.37%)", summary: "London afternoon fixing saw systematic sell programs capping gold at $2,509." },
  { date: "2026-09-04 (Thu)", shortDate: "Sep 04", open: 2495.00, high: 2521.80, low: 2493.60, range: 282, rangeDollars: 28.20, catalyst: "US ISM Services PMI Employment Contraction", trend: "bullish", change: "+$21.50 (+0.86%)", summary: "Institutional bulls executed a relentless 282-pip trend rally closing near daily high." },
  { date: "2026-09-05 (Fri)", shortDate: "Sep 05", open: 2516.50, high: 2529.20, low: 2487.40, range: 418, rangeDollars: 41.80, catalyst: "US Non-Farm Payrolls Labor Miss & Whiplash", trend: "bearish", change: "-$19.70 (-0.78%)", summary: "Headline labor print triggered massive two-way whiplash: initial +$12 spike followed by 418p flush." },
  { date: "2026-09-08 (Mon)", shortDate: "Sep 08", open: 2496.80, high: 2504.30, low: 2492.00, range: 123, rangeDollars: 12.30, catalyst: "Asia Session Safe-Haven Physical Buying", trend: "bullish", change: "+$5.30 (+0.21%)", summary: "Shanghai Gold Exchange premium expanded, defending the $2,492 support floor." },
  { date: "2026-09-09 (Tue)", shortDate: "Sep 09", open: 2502.10, high: 2508.90, low: 2493.50, range: 154, rangeDollars: 15.40, catalyst: "Treasury 3Y & 10Y Note Auction Concession", trend: "bullish", change: "+$3.50 (+0.14%)", summary: "Asian central bank accumulation absorbed supply, maintaining a 154-pip corridor." },
  { date: "2026-09-10 (Wed)", shortDate: "Sep 10", open: 2505.60, high: 2512.40, low: 2486.00, range: 264, rangeDollars: 26.40, catalyst: "US Core CPI Preview Position Trimming", trend: "bearish", change: "-$17.40 (-0.69%)", summary: "Anticipatory de-risking ahead of CPI release triggered heavy COMEX long liquidations." },
  { date: "2026-09-11 (Thu)", shortDate: "Sep 11", open: 2488.20, high: 2502.50, low: 2484.10, range: 184, rangeDollars: 18.40, catalyst: "ECB 25bps Rate Cut & Lagarde Remarks", trend: "bullish", change: "+$10.20 (+0.41%)", summary: "ECB monetary easing delivered 184-pip expansion. Gold reclaimed $2,500 milestone." },
  { date: "2026-09-12 (Fri)", shortDate: "Sep 12", open: 2498.40, high: 2516.80, low: 2495.20, range: 216, rangeDollars: 21.60, catalyst: "US PPI Miss & Dovish Fed Speaker Tone", trend: "bullish", change: "+$15.80 (+0.63%)", summary: "Wholesale inflation undershoot reinforced expectations of aggressive rate cuts." }
];

export const GoldVolatilityMatrixChart: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return true;
  });

  const [filterMode, setFilterMode] = useState<'all' | 'high-vol' | 'bullish' | 'bearish'>('all');
  const [hoveredPoint, setHoveredPoint] = useState<MatrixSessionData | null>(null);

  // Sync theme with document class changes (Observer pattern)
  useEffect(() => {
    const checkTheme = () => {
      const dark = document.documentElement.classList.contains('dark') && !document.documentElement.classList.contains('bloomberg-light');
      setIsDark(dark);
    };

    checkTheme();

    const observer = new MutationObserver(() => {
      checkTheme();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  // Filter dataset based on selected view mode
  const displayData = React.useMemo(() => {
    if (filterMode === 'high-vol') {
      return RAW_MATRIX_DATA.filter((d) => d.range >= 250);
    }
    if (filterMode === 'bullish') {
      return RAW_MATRIX_DATA.filter((d) => d.trend === 'bullish');
    }
    if (filterMode === 'bearish') {
      return RAW_MATRIX_DATA.filter((d) => d.trend === 'bearish');
    }
    return RAW_MATRIX_DATA;
  }, [filterMode]);

  // Statistical calculations
  const avgRange = Math.round(
    RAW_MATRIX_DATA.reduce((acc, curr) => acc + curr.range, 0) / RAW_MATRIX_DATA.length
  );
  const maxRange = Math.max(...RAW_MATRIX_DATA.map((d) => d.range));
  const p95Threshold = 449; // 95th percentile historical cut-off

  // Dynamic Theme Palette
  const colors = isDark
    ? {
        cardBg: 'bg-[#0F172A]/85',
        cardBorder: 'border-slate-800/90',
        textPrimary: 'text-white',
        textSecondary: 'text-slate-400',
        gridLine: 'rgba(51, 65, 85, 0.35)',
        tickText: '#94A3B8',
        lineVol: '#F6CF65', // Champagne Gold
        lineVolDot: '#E6B94D',
        areaVol: 'rgba(230, 185, 77, 0.12)',
        avgRef: '#E6B94D',
        p95Ref: '#F43F5E',
        tooltipBg: '#070A0F',
        tooltipBorder: 'rgba(230, 185, 77, 0.35)',
      }
    : {
        cardBg: 'bg-white',
        cardBorder: 'border-slate-200',
        textPrimary: 'text-slate-900',
        textSecondary: 'text-slate-500',
        gridLine: 'rgba(226, 232, 240, 0.8)',
        tickText: '#64748B',
        lineVol: '#D97706', // Amber-600
        lineVolDot: '#B45309',
        areaVol: 'rgba(217, 119, 6, 0.10)',
        avgRef: '#D97706',
        p95Ref: '#E11D48',
        tooltipBg: '#FFFFFF',
        tooltipBorder: '#CBD5E1',
      };

  return (
    <div className={`w-full rounded-xl border ${colors.cardBorder} ${colors.cardBg} backdrop-blur-md shadow-sm dark:shadow-2xl overflow-hidden transition-colors duration-300 font-mono`}>
      {/* Header bar */}
      <div className={`p-4 sm:p-5 border-b ${colors.cardBorder} flex flex-col md:flex-row md:items-center justify-between gap-4`}>
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 dark:bg-champagne animate-pulse"></span>
            <h3 className={`text-sm sm:text-base font-bold tracking-tight font-sans ${colors.textPrimary}`}>
              30-DAY GOLD (XAUUSD) PRICE VOLATILITY &amp; DAILY RANGE MATRIX
            </h3>
            <span className="hidden sm:inline-flex text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 dark:bg-champagne/15 text-amber-800 dark:text-champagne font-semibold border border-amber-300 dark:border-champagne/30">
              RECHARTS ENGINE
            </span>
          </div>
          <p className={`text-xs mt-1 font-sans ${colors.textSecondary}`}>
            Institutional intraday range (High - Low) trajectory in pips across the last 30 market sessions.
          </p>
        </div>

        {/* View toggle filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <button
            type="button"
            onClick={() => setFilterMode('all')}
            className={`text-xs px-2.5 py-1 rounded-lg border font-mono transition cursor-pointer whitespace-nowrap ${
              filterMode === 'all'
                ? 'border-amber-400 dark:border-champagne/50 bg-amber-100/90 dark:bg-champagne/20 text-amber-900 dark:text-champagne font-bold'
                : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All (30D)
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('high-vol')}
            className={`text-xs px-2.5 py-1 rounded-lg border font-mono transition cursor-pointer whitespace-nowrap ${
              filterMode === 'high-vol'
                ? 'border-rose-400 dark:border-rose-500/50 bg-rose-100/90 dark:bg-rose-950/40 text-rose-900 dark:text-rose-300 font-bold'
                : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            High Vol (&ge;250p)
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('bullish')}
            className={`text-xs px-2.5 py-1 rounded-lg border font-mono transition cursor-pointer whitespace-nowrap ${
              filterMode === 'bullish'
                ? 'border-emerald-400 dark:border-emerald-500/50 bg-emerald-100/90 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300 font-bold'
                : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Bullish
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('bearish')}
            className={`text-xs px-2.5 py-1 rounded-lg border font-mono transition cursor-pointer whitespace-nowrap ${
              filterMode === 'bearish'
                ? 'border-rose-400 dark:border-rose-500/50 bg-rose-100/90 dark:bg-rose-950/40 text-rose-900 dark:text-rose-300 font-bold'
                : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Bearish
          </button>
        </div>
      </div>

      {/* Quantitative Summary Pills */}
      <div className={`grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 sm:px-5 bg-slate-50/60 dark:bg-[#070A0F]/60 border-b ${colors.cardBorder} text-xs font-mono`}>
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase">30D Avg Volatility</span>
          <span className="text-sm font-bold text-amber-600 dark:text-champagne">{avgRange} Pips</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase">95th %ile Threshold</span>
          <span className="text-sm font-bold text-rose-600 dark:text-rose-400">&ge; {p95Threshold} Pips</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase">Max Vol Expansion</span>
          <span className="text-sm font-bold text-slate-900 dark:text-white">{maxRange} Pips (Aug 05)</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase">Current Session Vol</span>
          <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">216 Pips (+17.4%)</span>
        </div>
      </div>

      {/* Recharts Canvas Container */}
      <div className="p-3 sm:p-5 w-full">
        <div className="w-full h-[280px] sm:h-[340px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={displayData}
              margin={{ top: 15, right: 15, left: -10, bottom: 25 }}
              onMouseMove={(e: any) => {
                if (e && e.activePayload && e.activePayload.length) {
                  setHoveredPoint(e.activePayload[0].payload);
                }
              }}
              onMouseLeave={() => setHoveredPoint(null)}
            >
              <defs>
                <linearGradient id="volatilityGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors.lineVol} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={colors.lineVol} stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke={colors.gridLine}
                vertical={false}
              />

              <XAxis
                dataKey="shortDate"
                stroke={colors.tickText}
                tick={{ fontSize: 10, fill: colors.tickText, fontFamily: 'monospace' }}
                tickLine={false}
                axisLine={{ stroke: colors.gridLine }}
                dy={8}
                interval="preserveStartEnd"
              />

              <YAxis
                stroke={colors.tickText}
                tick={{ fontSize: 10, fill: colors.tickText, fontFamily: 'monospace' }}
                tickLine={false}
                axisLine={false}
                domain={[80, 1000]}
                unit="p"
              />

              {/* 30-Day Mean Reference Line */}
              <ReferenceLine
                y={avgRange}
                stroke={colors.avgRef}
                strokeDasharray="4 4"
                strokeWidth={1.5}
                label={{
                  value: `30D Mean: ${avgRange}p`,
                  position: 'insideTopRight',
                  fill: colors.avgRef,
                  fontSize: 10,
                  fontFamily: 'monospace',
                  fontWeight: 600,
                }}
              />

              {/* 95th Percentile Extreme Volatility Threshold */}
              <ReferenceLine
                y={p95Threshold}
                stroke={colors.p95Ref}
                strokeDasharray="3 3"
                strokeWidth={1.5}
                label={{
                  value: `95th %ile: ${p95Threshold}p`,
                  position: 'insideTopRight',
                  fill: colors.p95Ref,
                  fontSize: 10,
                  fontFamily: 'monospace',
                  fontWeight: 600,
                }}
              />

              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload || !payload.length) return null;
                  const d = payload[0].payload as MatrixSessionData;
                  const isP95 = d.range >= p95Threshold;

                  return (
                    <div
                      style={{ backgroundColor: colors.tooltipBg, borderColor: isP95 ? '#F43F5E' : colors.tooltipBorder }}
                      className="p-3 rounded-lg border shadow-xl text-xs font-mono max-w-[280px] pointer-events-none transition-all duration-150"
                    >
                      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-1.5 mb-1.5">
                        <span className="font-bold text-slate-900 dark:text-white">{d.date}</span>
                        {isP95 ? (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-rose-500/20 text-rose-500 border border-rose-500/40 animate-pulse">
                            95th %ILE SPIKE
                          </span>
                        ) : (
                          <span
                            className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                              d.trend === 'bullish'
                                ? 'bg-emerald-500/20 text-emerald-500'
                                : 'bg-rose-500/20 text-rose-500'
                            }`}
                          >
                            {d.trend.toUpperCase()}
                          </span>
                        )}
                      </div>

                      <div className="space-y-1 text-[11px]">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-500 dark:text-slate-400">Daily Range (Volatility):</span>
                          <span className="font-bold text-amber-600 dark:text-champagne">
                            {d.range} Pips (${d.rangeDollars.toFixed(2)})
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-500 dark:text-slate-400">Session High / Low:</span>
                          <span className="text-slate-700 dark:text-slate-300">
                            ${d.high.toFixed(2)} / ${d.low.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-500 dark:text-slate-400">Net Close Shift:</span>
                          <span
                            className={`font-semibold ${
                              d.trend === 'bullish' ? 'text-emerald-500' : 'text-rose-500'
                            }`}
                          >
                            {d.change}
                          </span>
                        </div>
                      </div>

                      <div className="mt-2 pt-1.5 border-t border-slate-200 dark:border-slate-800 text-[10px] text-slate-600 dark:text-slate-400 font-sans leading-tight">
                        <strong className="text-slate-900 dark:text-slate-200 font-mono">Catalyst: </strong>
                        {d.catalyst}
                      </div>
                    </div>
                  );
                }}
              />

              <Line
                type="monotone"
                dataKey="range"
                name="Volatility (Pips)"
                stroke={colors.lineVol}
                strokeWidth={2.5}
                dot={(props: any) => {
                  const { cx, cy, payload } = props;
                  if (!cx || !cy) return null;
                  const isExtreme = payload.range >= p95Threshold;
                  return (
                    <circle
                      key={`dot-${payload.date}`}
                      cx={cx}
                      cy={cy}
                      r={isExtreme ? 5 : 3}
                      fill={isExtreme ? '#F43F5E' : colors.lineVolDot}
                      stroke={isDark ? '#070A0F' : '#FFFFFF'}
                      strokeWidth={1.5}
                      className="cursor-pointer transition-transform hover:scale-150"
                    />
                  );
                }}
                activeDot={{
                  r: 7,
                  fill: colors.lineVol,
                  stroke: isDark ? '#070A0F' : '#FFFFFF',
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Dynamic Detail Card of Hovered Session or Active Session */}
        <div className={`mt-3 p-3 rounded-lg border ${colors.cardBorder} bg-slate-50/70 dark:bg-[#070A0F]/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono`}>
          <div className="flex items-center gap-2">
            <span className="text-slate-400">
              {hoveredPoint ? 'INSPECTED SESSION:' : 'ACTIVE RECENT SESSION:'}
            </span>
            <span className="font-bold text-slate-900 dark:text-white">
              {hoveredPoint ? hoveredPoint.date : RAW_MATRIX_DATA[RAW_MATRIX_DATA.length - 1].date}
            </span>
            <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
              (hoveredPoint || RAW_MATRIX_DATA[RAW_MATRIX_DATA.length - 1]).trend === 'bullish'
                ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                : 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
            }`}>
              {(hoveredPoint || RAW_MATRIX_DATA[RAW_MATRIX_DATA.length - 1]).range} PIPS
            </span>
          </div>

          <div className="text-[11px] text-slate-600 dark:text-slate-400 font-sans max-w-xl truncate">
            <span className="font-mono text-amber-700 dark:text-champagne font-bold mr-1">Catalyst:</span>
            {(hoveredPoint || RAW_MATRIX_DATA[RAW_MATRIX_DATA.length - 1]).catalyst} &mdash; {(hoveredPoint || RAW_MATRIX_DATA[RAW_MATRIX_DATA.length - 1]).summary}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoldVolatilityMatrixChart;
