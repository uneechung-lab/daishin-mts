import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import logoImg from './assets/logo.png';

// Mock Tick data for selected ETFs/REITs
const stockData = {
  '신대증 30': {
    price: 29550,
    nxtPrice: 29600,
    change: 1750,
    changePercent: 6.29,
    nxtChange: 1800,
    nxtChangePercent: 6.47,
    prevClose: 27800,
    volume: 96547,
    nxtVolume: 50225,
    open: 28000,
    high: 29800,
    low: 27700,
    limitUp: 36100,
    limitDown: 19500,
    viUp: 31000,
    viDown: 25000,
    market: 'KOSPI',
    hogaList: [
      { price: 29900, percent: '+7.55%', type: 'ask', size: 310 },
      { price: 29850, percent: '+7.37%', type: 'ask', size: 420 },
      { price: 29800, percent: '+7.19%', type: 'ask', size: 120 },
      { price: 29750, percent: '+7.01%', type: 'ask', size: 240 },
      { price: 29700, percent: '+6.83%', type: 'ask', size: 856 },
      { price: 29650, percent: '+6.65%', type: 'ask', size: 1200 },
      { price: 29600, percent: '+6.47%', type: 'ask', size: 4920 },
      { price: 29550, percent: '+6.29%', type: 'bid', size: 5200 },
      { price: 29500, percent: '+6.12%', type: 'bid', size: 6800 },
      { price: 29450, percent: '+5.94%', type: 'bid', size: 11000 },
      { price: 29400, percent: '+5.76%', type: 'bid', size: 15400 },
      { price: 29350, percent: '+5.58%', type: 'bid', size: 22000 },
      { price: 29300, percent: '+5.40%', type: 'bid', size: 18000 },
      { price: 29250, percent: '+5.22%', type: 'bid', size: 14200 }
    ],
    chartData: [
      { time: '09:00', open: 27800, close: 28200, high: 28500, low: 27700, vol: 15000 },
      { time: '10:00', open: 28200, close: 28800, high: 29000, low: 28100, vol: 24000 },
      { time: '11:00', open: 28800, close: 29100, high: 29400, low: 28700, vol: 18000 },
      { time: '12:00', open: 29100, close: 29300, high: 29500, low: 29000, vol: 12000 },
      { time: '13:00', open: 29300, close: 29450, high: 29700, low: 29200, vol: 21000 },
      { time: '14:00', open: 29450, close: 29550, high: 29800, low: 29350, vol: 32000 }
    ]
  },
  'DAISHIN343 K200': {
    price: 101265,
    change: -520,
    changePercent: -0.51,
    prevClose: 101785,
    volume: 6651,
    open: 102640,
    high: 102640,
    low: 100890,
    limitUp: 132320,
    limitDown: 71250,
    viUp: 112905,
    viDown: 92375,
    mid: 101095,
    midPercent: '-0.68%',
    market: 'KOSPI',
    hogaList: [
      { price: 103500, percent: '+1.69%', type: 'ask', size: 120 },
      { price: 103200, percent: '+1.39%', type: 'ask', size: 85 },
      { price: 103000, percent: '+1.19%', type: 'ask', size: 1400 },
      { price: 102800, percent: '+0.99%', type: 'ask', size: 950 },
      { price: 102640, percent: '+0.84%', type: 'ask', size: 460 },
      { price: 102365, percent: '+0.57%', type: 'ask', size: 3 },
      { price: 102355, percent: '+0.56%', type: 'ask', size: 5 },
      { price: 101660, percent: '-0.12%', type: 'ask', size: 2500 },
      { price: 101610, percent: '-0.17%', type: 'ask', size: 2500 },
      { price: 101120, percent: '-0.65%', type: 'ask', size: 4920 },
      { price: 101070, percent: '-0.70%', type: 'bid', size: 856 },
      { price: 100555, percent: '-1.21%', type: 'bid', size: 2500 },
      { price: 100505, percent: '-1.26%', type: 'bid', size: 2500 },
      { price: 100300, percent: '-1.46%', type: 'bid', size: 1200 },
      { price: 100100, percent: '-1.66%', type: 'bid', size: 3400 },
      { price: 99800, percent: '-1.96%', type: 'bid', size: 750 },
      { price: 99500, percent: '-2.26%', type: 'bid', size: 150 },
      { price: 99000, percent: '-2.75%', type: 'bid', size: 2100 }
    ],
    chartData: [
      { time: '09:00', open: 101785, close: 102100, high: 102300, low: 101700, vol: 1500 },
      { time: '10:00', open: 102100, close: 102640, high: 102800, low: 102000, vol: 2200 },
      { time: '11:00', open: 102640, close: 102300, high: 102640, low: 102100, vol: 1100 },
      { time: '12:00', open: 102300, close: 101660, high: 102400, low: 101500, vol: 1900 },
      { time: '13:00', open: 101660, close: 101120, high: 101800, low: 101000, vol: 3100 },
      { time: '14:00', open: 101120, close: 101265, high: 101400, low: 100890, vol: 2400 }
    ]
  },
'TIGER 미국S&P500': {
    price: 18450,
    change: 230,
    changePercent: 1.26,
    prevClose: 18220,
    volume: 124503,
    open: 18300,
    high: 18520,
    low: 18250,
    limitUp: 23680,
    limitDown: 12760,
    viUp: 20100,
    viDown: 16400,
    market: 'KOSPI',
    hogaList: [
      { price: 18520, percent: '+1.65%', type: 'ask', size: 1200 },
      { price: 18500, percent: '+1.54%', type: 'ask', size: 8400 },
      { price: 18480, percent: '+1.43%', type: 'ask', size: 3200 },
      { price: 18470, percent: '+1.37%', type: 'ask', size: 1540 },
      { price: 18460, percent: '+1.32%', type: 'ask', size: 9000 },
      { price: 18450, percent: '+1.26%', type: 'ask', size: 100 },
      { price: 18440, percent: '+1.21%', type: 'bid', size: 4200 },
      { price: 18430, percent: '+1.15%', type: 'bid', size: 6800 },
      { price: 18420, percent: '+1.10%', type: 'bid', size: 11000 },
      { price: 18400, percent: '+0.99%', type: 'bid', size: 24500 }
    ],
    chartData: [
      { time: '09:00', open: 18220, close: 18310, high: 18350, low: 18210, vol: 15000 },
      { time: '10:00', open: 18310, close: 18380, high: 18420, low: 18300, vol: 24000 },
      { time: '11:00', open: 18380, close: 18400, high: 18450, low: 18350, vol: 18000 },
      { time: '12:00', open: 18400, close: 18420, high: 18480, low: 18390, vol: 12000 },
      { time: '13:00', open: 18420, close: 18440, high: 18500, low: 18400, vol: 21000 },
      { time: '14:00', open: 18440, close: 18450, high: 18520, low: 18420, vol: 32000 }
    ]
  },
  '대신 우량 K-REITs': {
    price: 5240,
    change: 45,
    changePercent: 0.87,
    prevClose: 5195,
    volume: 38400,
    open: 5195,
    high: 5280,
    low: 5180,
    limitUp: 6750,
    limitDown: 3640,
    viUp: 5710,
    viDown: 4680,
    market: 'KOSPI',
    hogaList: [
      { price: 5280, percent: '+1.64%', type: 'ask', size: 500 },
      { price: 5270, percent: '+1.44%', type: 'ask', size: 1200 },
      { price: 5260, percent: '+1.25%', type: 'ask', size: 3000 },
      { price: 5250, percent: '+1.06%', type: 'ask', size: 10400 },
      { price: 5240, percent: '+0.87%', type: 'ask', size: 4500 },
      { price: 5230, percent: '+0.67%', type: 'bid', size: 8900 },
      { price: 5220, percent: '+0.48%', type: 'bid', size: 7400 },
      { price: 5210, percent: '+0.29%', type: 'bid', size: 12000 },
      { price: 5200, percent: '+0.10%', type: 'bid', size: 16500 },
      { price: 5190, percent: '-0.10%', type: 'bid', size: 22000 }
    ],
    chartData: [
      { time: '09:00', open: 5195, close: 5210, high: 5220, low: 5180, vol: 8000 },
      { time: '10:00', open: 5210, close: 5230, high: 5240, low: 5200, vol: 12000 },
      { time: '11:00', open: 5230, close: 5240, high: 5260, low: 5220, vol: 6000 },
      { time: '12:00', open: 5240, close: 5220, high: 5250, low: 5210, vol: 5000 },
      { time: '13:00', open: 5220, close: 5230, high: 5240, low: 5200, vol: 9000 },
      { time: '14:00', open: 5230, close: 5240, high: 5280, low: 5230, vol: 15000 }
    ]
  }
};

function PhoneEmulator({
  isToBe,
  isDark,
  accountBalance,
  setAccountBalance,
  addNotification,
  selectedStock,
  setSelectedStock,
  activeTab,
  setActiveTab,
  activeBottomTab,
  setActiveBottomTab,
  showOrderPanel,
  setShowOrderPanel,
  orderType,
  setOrderType,
  orderPrice,
  setOrderPrice,
  orderQty,
  setOrderQty,
  stockSelectorOpen,
  setStockSelectorOpen,
  isDrawerOpen,
  onSearchClick,
  onBackClick,
  hideFrame
}) {
  const activeData = stockData[selectedStock];
  const [marketMode, setMarketMode] = useState('통합'); // '통합', 'NXT', 'KRX'

  const toggleMarketMode = () => {
    if (marketMode === '통합') setMarketMode('NXT');
    else if (marketMode === 'NXT') setMarketMode('KRX');
    else setMarketMode('통합');
  };

  const handlePriceClick = (price) => {
    setOrderPrice(price);
  };

  const handleOrderSubmit = () => {
    const totalCost = orderPrice * orderQty;

    if (orderType === 'buy' && totalCost > accountBalance.cash) {
      addNotification('주문 가능 현금 잔고가 부족합니다.', 'warning');
      return;
    }

    if (orderType === 'sell') {
      const held = accountBalance.etfBalance.find(item => item.name === selectedStock);
      if (!held || held.qty < orderQty) {
        addNotification('매도 가능한 수량이 부족합니다.', 'warning');
        return;
      }
    }

    const newOrderId = Date.now();
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const newOrder = {
      id: newOrderId,
      time: timeStr,
      name: selectedStock,
      type: orderType === 'buy' ? '매수' : '매도',
      price: orderPrice,
      qty: orderQty,
      status: '접수대기'
    };

    let updatedCash = accountBalance.cash;
    if (orderType === 'buy') {
      updatedCash -= totalCost;
    }

    setAccountBalance(prev => ({
      ...prev,
      cash: updatedCash,
      orderHistory: [newOrder, ...prev.orderHistory]
    }));

    setShowOrderPanel(false);
    addNotification(`${selectedStock} ${orderQty}주 ${orderType === 'buy' ? '매수' : '매도'} 주문이 접수되었습니다.`, 'success');

    setTimeout(() => {
      setAccountBalance(prev => {
        const updatedHistory = prev.orderHistory.map(ord => 
          ord.id === newOrderId ? { ...ord, status: '체결완료' } : ord
        );

        let updatedEtfBalance = [...prev.etfBalance];
        const existingIdx = updatedEtfBalance.findIndex(item => item.name === selectedStock);

        if (orderType === 'buy') {
          if (existingIdx > -1) {
            const current = updatedEtfBalance[existingIdx];
            const newQty = current.qty + orderQty;
            const newAvg = Math.round(((current.avgPrice * current.qty) + (orderPrice * orderQty)) / newQty);
            updatedEtfBalance[existingIdx] = {
              ...current,
              qty: newQty,
              avgPrice: newAvg,
              currentPrice: activeData.price,
              evalProfit: (activeData.price - newAvg) * newQty,
              yield: parseFloat((((activeData.price - newAvg) / newAvg) * 100).toFixed(2))
            };
          } else {
            updatedEtfBalance.push({
              name: selectedStock,
              qty: orderQty,
              avgPrice: orderPrice,
              currentPrice: activeData.price,
              evalProfit: 0,
              yield: 0.00
            });
          }
        } else {
          if (existingIdx > -1) {
            const current = updatedEtfBalance[existingIdx];
            const newQty = current.qty - orderQty;
            let finalCash = prev.cash + (orderPrice * orderQty);
            if (newQty <= 0) {
              updatedEtfBalance = updatedEtfBalance.filter(item => item.name !== selectedStock);
            } else {
              updatedEtfBalance[existingIdx] = {
                ...current,
                qty: newQty,
                evalProfit: (activeData.price - current.avgPrice) * newQty,
                yield: parseFloat((((activeData.price - current.avgPrice) / current.avgPrice) * 100).toFixed(2))
              };
            }
            addNotification(`${selectedStock} ${orderQty}주 매도 체결완료!`, 'success');
            return {
              ...prev,
              cash: finalCash,
              etfBalance: updatedEtfBalance,
              orderHistory: updatedHistory
            };
          }
        }

        addNotification(`${selectedStock} ${orderQty}주 매수 체결완료!`, 'success');
        return {
          ...prev,
          etfBalance: updatedEtfBalance,
          orderHistory: updatedHistory
        };
      });
    }, 1500);
  };

  // Chart
  const chartHeight = 150;
  const chartWidth = 330;
  const padding = 20;
  const minPrice = Math.min(...activeData.chartData.map(c => c.low)) * 0.998;
  const maxPrice = Math.max(...activeData.chartData.map(c => c.high)) * 1.002;
  const getX = (index) => padding + (index * (chartWidth - padding * 2) / (activeData.chartData.length - 1));
  const getY = (price) => chartHeight - padding - ((price - minPrice) * (chartHeight - padding * 2) / (maxPrice - minPrice));

  const content = (
    <>
      {/* Galaxy S20 Central Punch-hole Camera */}
      <div style={styles.phoneCamera} />

      {/* Phone Status Bar */}
      <div style={styles.phoneHeaderBar}>
        <span style={{ fontSize: '0.75rem', fontWeight: '700', color: isDark ? '#94a3b8' : '#475569' }}>SKT 2:45</span>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.65rem', fontWeight: '800', color: isDark ? '#94a3b8' : '#333' }}>5G</span>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1px', height: '10px' }}>
            <div style={{ width: '2px', height: '3px', backgroundColor: isDark ? '#94a3b8' : '#333' }}></div>
            <div style={{ width: '2px', height: '5px', backgroundColor: isDark ? '#94a3b8' : '#333' }}></div>
            <div style={{ width: '2px', height: '7px', backgroundColor: isDark ? '#94a3b8' : '#333' }}></div>
            <div style={{ width: '2px', height: '9px', backgroundColor: isDark ? '#94a3b8' : '#333' }}></div>
          </div>
          <div style={{
            border: isDark ? '1px solid #94a3b8' : '1px solid #333',
            borderRadius: '3px',
            padding: '0px 3px',
            fontSize: '0.62rem',
            fontWeight: '900',
            height: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isDark ? '#94a3b8' : '#333',
            color: isDark ? '#0b0f19' : '#fff',
            lineHeight: 1
          }}>
            97
          </div>
        </div>
      </div>

      {/* MTS Toolbar Header */}
      <div style={{
        ...styles.mtsHeader,
        borderBottom: isDark ? '1px solid #1e293b' : (isToBe ? '1px solid #dddddd' : '1px solid #eee'),
        backgroundColor: isDark ? '#121826' : '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '44px',
        padding: '0 12px'
      }}>
        {/* Left side: Menu & Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button 
            onClick={onBackClick}
            style={{ ...styles.menuBtn, color: isDark ? '#fff' : '#000', padding: 0, display: 'flex', alignItems: 'center' }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ 
              fontSize: isToBe ? '17px' : '1.02rem', 
              fontWeight: '700', 
              color: isDark ? '#fff' : '#222222', 
              letterSpacing: '-0.3px' 
            }}>
              {selectedStock === '신대증 30' ? 'DAISHIN343 K200' : selectedStock}
            </span>
            {isToBe && selectedStock === '대신증권' && (
              <span style={{
                fontSize: '10px',
                fontWeight: '700',
                color: '#de201e',
                border: '1px solid #de201e',
                padding: '1px 3px',
                borderRadius: '2px',
                lineHeight: 1
              }}>위험자산</span>
            )}
          </div>
        </div>

        {/* Right side: Dropdown arrow trigger & Search & Bookmark */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <button
            onClick={() => setStockSelectorOpen(!stockSelectorOpen)}
            style={{
              border: 'none',
              background: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: isDark ? '#334155' : '#f1f3f5',
              cursor: 'pointer',
              padding: 0
            }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" style={{ transform: stockSelectorOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', color: isDark ? '#fff' : '#555' }}><polyline points="6 9 12 15 18 9" /></svg>
          </button>
          
          <button 
            onClick={onSearchClick}
            style={{ ...styles.toolBtn, color: isDark ? '#fff' : '#111', padding: 0, display: 'flex', alignItems: 'center' }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          </button>
          
          <button style={{ ...styles.toolBtn, color: isDark ? '#fff' : '#111', padding: 0, display: 'flex', alignItems: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
          </button>
        </div>

        {/* Selector options dropdown */}
        {stockSelectorOpen && (
          <div style={{
            ...styles.stockDropdownMenu,
            backgroundColor: isDark ? '#1e293b' : '#ffffff',
            boxShadow: '0 10px 25px rgba(0,0,0,0.25)'
          }}>
            {Object.keys(stockData).map((stock) => (
              <div
                key={stock}
                onClick={() => {
                  setSelectedStock(stock);
                  setStockSelectorOpen(false);
                }}
                style={{
                  ...styles.dropdownItem,
                  backgroundColor: selectedStock === stock ? (isDark ? '#334155' : '#f1f5f9') : 'transparent',
                  color: isDark ? '#cbd5e1' : '#334155'
                }}
              >
                <span>{stock}</span>
                <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>{stockData[stock].price.toLocaleString()}원</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ 
        ...styles.quoteBar, 
        borderBottom: isDark ? '1px solid #1e293b' : '1px solid #f1f5f9', 
        backgroundColor: isDark ? '#0b0f19' : '#fff',
        display: 'flex',
        flexDirection: 'column',
        padding: isToBe ? '8px 10px 8px 10px' : '8px 12px 8px 12px',
        height: isToBe ? '74px' : 'auto',
        justifyContent: 'center',
        boxSizing: 'border-box',
        position: 'relative'
      }}>
        {isToBe && isDrawerOpen && (
          <div style={{
            position: 'absolute',
            top: '4px',
            left: '4px',
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            backgroundColor: '#00c3a5',
            color: '#fff',
            fontSize: '11px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10
          }}>
            1
          </div>
        )}
        {!isToBe ? (
          <>
            {/* Row 1: KRX Badge */}
            <div style={{ alignSelf: 'flex-start', marginBottom: '4px' }}>
              <span style={{
                backgroundColor: '#e2f2ef',
                color: '#00977d',
                border: '1px solid #bce3db',
                fontSize: '9px',
                fontWeight: '800',
                padding: '1px 3px',
                borderRadius: '2px',
                lineHeight: 1
              }}>KRX</span>
            </div>

            {/* Row 2: Price+Change (left) and Buttons (right) */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
              {/* Left: Price + Change Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
                {/* Price with Candle Icon on Left */}
                {(() => {
                  const isPriceDown = activeData.change < 0;
                  const candleColor = isPriceDown ? '#2366ca' : '#de201e';
                  return (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      {/* Candle Icon */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '10px', height: '26px', position: 'relative' }}>
                        <div style={{ width: '2px', height: '26px', backgroundColor: candleColor, position: 'absolute', top: 0, zIndex: 1 }} />
                        <div style={{ width: '8px', height: '16px', backgroundColor: candleColor, position: 'relative', zIndex: 2 }} />
                      </div>
                      {/* Price */}
                      <span style={{
                        fontSize: '34px',
                        fontWeight: '500',
                        color: isPriceDown ? '#2366ca' : '#de201e',
                        lineHeight: 1,
                        letterSpacing: '-0.5px'
                      }}>
                        {activeData.price.toLocaleString()}
                      </span>
                    </div>
                  );
                })()}
                {/* Change */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '3px' }}>
                  <span style={{
                    fontSize: '8px',
                    color: activeData.change < 0 ? '#2366ca' : '#de201e',
                    lineHeight: 1
                  }}>{activeData.change < 0 ? '▼' : '▲'}</span>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: '500',
                    color: activeData.change < 0 ? '#2366ca' : '#de201e',
                    lineHeight: 1
                  }}>
                    {Math.abs(activeData.change).toLocaleString()} ({activeData.changePercent >= 0 ? '+' : ''}{activeData.changePercent}%)
                  </span>
                </div>
              </div>

              {/* Right: Sell/Buy Buttons */}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <button
                  onClick={() => { setOrderType('sell'); setShowOrderPanel(true); }}
                  style={{
                    border: 'none',
                    color: '#fff',
                    fontSize: '13px',
                    fontWeight: '700',
                    padding: '0',
                    cursor: 'pointer',
                    backgroundColor: '#2366ca',
                    width: '53px',
                    height: '45px',
                    borderRadius: '0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  매도
                </button>
                <button
                  onClick={() => { setOrderType('buy'); setShowOrderPanel(true); }}
                  style={{
                    border: 'none',
                    color: '#fff',
                    fontSize: '13px',
                    fontWeight: '700',
                    padding: '0',
                    cursor: 'pointer',
                    backgroundColor: '#de201e',
                    width: '53px',
                    height: '45px',
                    borderRadius: '0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  매수
                </button>
              </div>
            </div>
          </>
        ) : (
          /* TO BE Screen: Dynamic Layout based on marketMode */
          (() => {
            const krxVal = activeData.price;
            const nxtVal = activeData.nxtPrice || (activeData.price + 50);
            const krxChg = activeData.change;
            const nxtChg = activeData.nxtChange || (activeData.change >= 0 ? activeData.change + 50 : activeData.change - 50);
            const krxPercent = activeData.changePercent;
            const nxtPercent = activeData.nxtChangePercent || parseFloat((nxtChg / (activeData.prevClose || 1) * 100).toFixed(2));

            const isKrxDown = krxChg < 0;
            const isNxtDown = nxtChg < 0;

            const krxCandleColor = isKrxDown ? '#2366ca' : '#de201e';
            const nxtCandleColor = isNxtDown ? '#2366ca' : '#de201e';

            if (marketMode === '통합') {
              return (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                    {/* KRX Block */}
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{
                        backgroundColor: '#e2f2ef',
                        color: '#00977d',
                        border: '1px solid #bce3db',
                        fontSize: '9px',
                        fontWeight: '800',
                        padding: '1px 3px',
                        borderRadius: '2px',
                        lineHeight: 1,
                        alignSelf: 'flex-start',
                        marginBottom: '2px'
                      }}>KRX</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '6px', height: '20px', position: 'relative' }}>
                          <div style={{ width: '1.5px', height: '20px', backgroundColor: krxCandleColor, position: 'absolute', top: 0, zIndex: 1 }} />
                          <div style={{ width: '5px', height: '12px', backgroundColor: krxCandleColor, position: 'relative', zIndex: 2 }} />
                        </div>
                        <span style={{ fontSize: '23px', fontWeight: '700', color: krxCandleColor, lineHeight: 1, letterSpacing: '-0.5px' }}>
                          {krxVal.toLocaleString()}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '2px', marginTop: '2px' }}>
                        <span style={{ fontSize: '7px', color: krxCandleColor }}>{isKrxDown ? '▼' : '▲'}</span>
                        <span style={{ fontSize: '10px', fontWeight: '500', color: krxCandleColor, lineHeight: 1 }}>
                          {Math.abs(krxChg).toLocaleString()}({krxPercent >= 0 ? '+' : ''}{krxPercent}%)
                        </span>
                      </div>
                    </div>

                    {/* Separator */}
                    <div style={{ width: '1px', height: '36px', backgroundColor: isDark ? '#2d3748' : '#e2e8f0', margin: '0 4px' }} />

                    {/* NXT Block */}
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{
                        backgroundColor: '#fef3c7',
                        color: '#d97706',
                        border: '1px solid #fde68a',
                        fontSize: '9px',
                        fontWeight: '800',
                        padding: '1px 3px',
                        borderRadius: '2px',
                        lineHeight: 1,
                        alignSelf: 'flex-start',
                        marginBottom: '2px'
                      }}>NXT</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '6px', height: '20px', position: 'relative' }}>
                          <div style={{ width: '1.5px', height: '20px', backgroundColor: nxtCandleColor, position: 'absolute', top: 0, zIndex: 1 }} />
                          <div style={{ width: '5px', height: '12px', backgroundColor: nxtCandleColor, position: 'relative', zIndex: 2 }} />
                        </div>
                        <span style={{ fontSize: '23px', fontWeight: '700', color: nxtCandleColor, lineHeight: 1, letterSpacing: '-0.5px' }}>
                          {nxtVal.toLocaleString()}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '2px', marginTop: '2px' }}>
                        <span style={{ fontSize: '7px', color: nxtCandleColor }}>{isNxtDown ? '▼' : '▲'}</span>
                        <span style={{ fontSize: '10px', fontWeight: '500', color: nxtCandleColor, lineHeight: 1 }}>
                          {Math.abs(nxtChg).toLocaleString()}({nxtPercent >= 0 ? '+' : ''}{nxtPercent}%)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button
                      onClick={() => { setOrderType('sell'); setShowOrderPanel(true); }}
                      style={{
                        border: 'none',
                        color: '#fff',
                        fontSize: '13px',
                        fontWeight: '700',
                        backgroundColor: '#2366ca',
                        width: '53px',
                        height: '45px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      매도
                    </button>
                    <button
                      onClick={() => { setOrderType('buy'); setShowOrderPanel(true); }}
                      style={{
                        border: 'none',
                        color: '#fff',
                        fontSize: '13px',
                        fontWeight: '700',
                        backgroundColor: '#de201e',
                        width: '53px',
                        height: '45px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      매수
                    </button>
                  </div>
                </div>
              );
            } else if (marketMode === 'NXT') {
              return (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                    {/* Primary NXT Block */}
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{
                        backgroundColor: '#fef3c7',
                        color: '#d97706',
                        border: '1px solid #fde68a',
                        fontSize: '9px',
                        fontWeight: '800',
                        padding: '1px 3px',
                        borderRadius: '2px',
                        lineHeight: 1,
                        alignSelf: 'flex-start',
                        marginBottom: '2px'
                      }}>NXT</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '8px', height: '24px', position: 'relative' }}>
                          <div style={{ width: '2px', height: '24px', backgroundColor: nxtCandleColor, position: 'absolute', top: 0, zIndex: 1 }} />
                          <div style={{ width: '6px', height: '14px', backgroundColor: nxtCandleColor, position: 'relative', zIndex: 2 }} />
                        </div>
                        <span style={{ fontSize: '28px', fontWeight: '700', color: nxtCandleColor, lineHeight: 1, letterSpacing: '-0.5px' }}>
                          {nxtVal.toLocaleString()}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginTop: '2px' }}>
                        <span style={{ fontSize: '7px', color: nxtCandleColor }}>{isNxtDown ? '▼' : '▲'}</span>
                        <span style={{ fontSize: '11px', fontWeight: '500', color: nxtCandleColor, lineHeight: 1 }}>
                          {Math.abs(nxtChg).toLocaleString()}({nxtPercent >= 0 ? '+' : ''}{nxtPercent}%)
                        </span>
                      </div>
                    </div>

                    {/* Separator */}
                    <div style={{ width: '1px', height: '36px', backgroundColor: isDark ? '#2d3748' : '#e2e8f0', margin: '0 4px' }} />

                    {/* Secondary KRX Block */}
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <span style={{
                        backgroundColor: '#e2f2ef',
                        color: '#00977d',
                        border: '1px solid #bce3db',
                        fontSize: '9px',
                        fontWeight: '800',
                        padding: '1px 3px',
                        borderRadius: '2px',
                        lineHeight: 1,
                        alignSelf: 'flex-start',
                        marginBottom: '2px'
                      }}>KRX</span>
                      <span style={{ fontSize: '20px', fontWeight: '600', color: krxCandleColor, lineHeight: 1 }}>
                        {krxVal.toLocaleString()}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '2px', marginTop: '2px' }}>
                        <span style={{ fontSize: '7px', color: krxCandleColor }}>{isKrxDown ? '▼' : '▲'}</span>
                        <span style={{ fontSize: '10px', color: krxCandleColor, lineHeight: 1 }}>
                          {Math.abs(krxChg).toLocaleString()}({krxPercent >= 0 ? '+' : ''}{krxPercent}%)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button
                      onClick={() => { setOrderType('sell'); setShowOrderPanel(true); }}
                      style={{
                        border: 'none',
                        color: '#fff',
                        fontSize: '13px',
                        fontWeight: '700',
                        backgroundColor: '#2366ca',
                        width: '53px',
                        height: '45px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      매도
                    </button>
                    <button
                      onClick={() => { setOrderType('buy'); setShowOrderPanel(true); }}
                      style={{
                        border: 'none',
                        color: '#fff',
                        fontSize: '13px',
                        fontWeight: '700',
                        backgroundColor: '#de201e',
                        width: '53px',
                        height: '45px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      매수
                    </button>
                  </div>
                </div>
              );
            } else {
              return (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                    {/* Primary KRX Block */}
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{
                        backgroundColor: '#e2f2ef',
                        color: '#00977d',
                        border: '1px solid #bce3db',
                        fontSize: '9px',
                        fontWeight: '800',
                        padding: '1px 3px',
                        borderRadius: '2px',
                        lineHeight: 1,
                        alignSelf: 'flex-start',
                        marginBottom: '2px'
                      }}>KRX</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '8px', height: '24px', position: 'relative' }}>
                          <div style={{ width: '2px', height: '24px', backgroundColor: krxCandleColor, position: 'absolute', top: 0, zIndex: 1 }} />
                          <div style={{ width: '6px', height: '14px', backgroundColor: krxCandleColor, position: 'relative', zIndex: 2 }} />
                        </div>
                        <span style={{ fontSize: '28px', fontWeight: '700', color: krxCandleColor, lineHeight: 1, letterSpacing: '-0.5px' }}>
                          {krxVal.toLocaleString()}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginTop: '2px' }}>
                        <span style={{ fontSize: '7px', color: krxCandleColor }}>{isKrxDown ? '▼' : '▲'}</span>
                        <span style={{ fontSize: '11px', fontWeight: '500', color: krxCandleColor, lineHeight: 1 }}>
                          {Math.abs(krxChg).toLocaleString()}({krxPercent >= 0 ? '+' : ''}{krxPercent}%)
                        </span>
                      </div>
                    </div>

                    {/* Separator */}
                    <div style={{ width: '1px', height: '36px', backgroundColor: isDark ? '#2d3748' : '#e2e8f0', margin: '0 4px' }} />

                    {/* Secondary NXT Block */}
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <span style={{
                        backgroundColor: '#fef3c7',
                        color: '#d97706',
                        border: '1px solid #fde68a',
                        fontSize: '9px',
                        fontWeight: '800',
                        padding: '1px 3px',
                        borderRadius: '2px',
                        lineHeight: 1,
                        alignSelf: 'flex-start',
                        marginBottom: '2px'
                      }}>NXT</span>
                      <span style={{ fontSize: '20px', fontWeight: '600', color: nxtCandleColor, lineHeight: 1 }}>
                        {nxtVal.toLocaleString()}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '2px', marginTop: '2px' }}>
                        <span style={{ fontSize: '7px', color: nxtCandleColor }}>{isNxtDown ? '▼' : '▲'}</span>
                        <span style={{ fontSize: '10px', color: nxtCandleColor, lineHeight: 1 }}>
                          {Math.abs(nxtChg).toLocaleString()}({nxtPercent >= 0 ? '+' : ''}{nxtPercent}%)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button
                      onClick={() => { setOrderType('sell'); setShowOrderPanel(true); }}
                      style={{
                        border: 'none',
                        color: '#fff',
                        fontSize: '13px',
                        fontWeight: '700',
                        backgroundColor: '#2366ca',
                        width: '53px',
                        height: '45px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      매도
                    </button>
                    <button
                      onClick={() => { setOrderType('buy'); setShowOrderPanel(true); }}
                      style={{
                        border: 'none',
                        color: '#fff',
                        fontSize: '13px',
                        fontWeight: '700',
                        backgroundColor: '#de201e',
                        width: '53px',
                        height: '45px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      매수
                    </button>
                  </div>
                </div>
              );
            }
          })()
        )}
      </div>

      {/* Market banner row for TO BE screen */}
      {isToBe && (
        <div style={{
          height: '28px',
          backgroundColor: isDark ? '#111827' : '#f3f4f6',
          borderBottom: isDark ? '1px solid #1e293b' : '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 8px 0 28px',
          fontSize: '9.5px',
          color: isDark ? '#cbd5e1' : '#4b5563',
          fontWeight: '500',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          position: 'relative'
        }}>
          {isDrawerOpen && (
            <div style={{
              position: 'absolute',
              top: '3px',
              left: '4px',
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              backgroundColor: '#00c3a5',
              color: '#fff',
              fontSize: '11px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10
            }}>
              3
            </div>
          )}
          <div style={{ fontWeight: '700' }}>{selectedStock}</div>
          {marketMode === '통합' ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                <span style={{ backgroundColor: '#e2f2ef', color: '#00977d', padding: '0px 2px', borderRadius: '2px', fontSize: '8px', fontWeight: '800', border: '1px solid #bce3db', lineHeight: 1 }}>K</span>
                <span style={{ backgroundColor: '#fef3c7', color: '#d97706', padding: '0px 2px', borderRadius: '2px', fontSize: '8px', fontWeight: '800', border: '1px solid #fde68a', lineHeight: 1 }}>N</span>
                <span style={{ marginLeft: '1px', fontSize: '9px' }}>차이 50 (0.17%)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                  <span style={{ backgroundColor: '#e2f2ef', color: '#00977d', padding: '0px 2px', borderRadius: '2px', fontSize: '8px', fontWeight: '800', border: '1px solid #bce3db', lineHeight: 1 }}>K</span>
                  <span style={{ fontSize: '9px' }}>{activeData.volume?.toLocaleString() || '96,547'} (60.89%)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                  <span style={{ backgroundColor: '#fef3c7', color: '#d97706', padding: '0px 2px', borderRadius: '2px', fontSize: '8px', fontWeight: '800', border: '1px solid #fde68a', lineHeight: 1 }}>N</span>
                  <span style={{ fontSize: '9px' }}>{activeData.nxtVolume?.toLocaleString() || '50,225'} (47.17%)</span>
                </div>
              </div>
            </div>
          ) : marketMode === 'NXT' ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
              <span style={{ backgroundColor: '#fef3c7', color: '#d97706', padding: '0px 2px', borderRadius: '2px', fontSize: '8px', fontWeight: '800', border: '1px solid #fde68a', lineHeight: 1 }}>NXT</span>
              <span style={{ fontSize: '9px' }}>{activeData.nxtVolume?.toLocaleString() || '50,226'} (47.17%)</span>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
              <span style={{ backgroundColor: '#e2f2ef', color: '#00977d', padding: '0px 2px', borderRadius: '2px', fontSize: '8px', fontWeight: '800', border: '1px solid #bce3db', lineHeight: 1 }}>KRX</span>
              <span style={{ fontSize: '9px' }}>{activeData.volume?.toLocaleString() || '96,547'} (60.89%)</span>
            </div>
          )}
        </div>
      )}

      {/* Tab menu */}
      <div style={styles.subTabs}>
        {isToBe && (
          <div
            onClick={toggleMarketMode}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#1c1c1e',
              color: '#ffffff',
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              fontWeight: '800',
              padding: '0 8px',
              cursor: 'pointer',
              gap: '4px',
              borderRight: isDark ? '1px solid #1e293b' : '1px solid #e5e7eb',
              boxSizing: 'border-box',
              minWidth: '55px',
              position: 'relative'
            }}
          >
            {isDrawerOpen && (
              <div style={{
                position: 'absolute',
                top: '-6px',
                left: '-6px',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                backgroundColor: '#00c3a5',
                color: '#fff',
                fontSize: '11px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10
              }}>
                2
              </div>
            )}
            <span>{marketMode}</span>
            <span style={{ fontSize: '9px' }}>☰</span>
          </div>
        )}
        {['호가', '차트', '시간', '일자', '거래원'].map((tab) => {
          const isActive = activeTab === tab;
          return (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                ...styles.subTabItem,
                fontWeight: isActive ? '800' : '400',
                color: isActive ? (isDark ? '#fff' : '#222') : (isDark ? '#888' : '#777'),
                borderBottomColor: isActive ? '#00c3a5' : 'transparent',
                borderBottomWidth: '2px',
                borderBottomStyle: 'solid'
              }}
            >
              {tab}
            </div>
          );
        })}
      </div>

      {/* Simulated Panel content */}
      <div style={{ ...styles.screenContent, overflowY: activeTab === '호가' ? 'hidden' : 'auto' }}>
        {activeTab === '호가' && (
          <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: isDark ? '#0b0f19' : '#fff', width: '100%', height: '100%', overflow: 'hidden' }}>
            <div style={{ flex: 1, overflowY: 'auto', width: '100%' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed', borderSpacing: 0 }}>
                <tbody>
                  {/* Ask Rows */}
                  {(() => {
                    const asks = activeData.hogaList.filter(h => h.type === 'ask');
                    const maxAskSize = Math.max(...asks.map(h => h.size), 1);
                    
                    return asks.map((h, i) => {
                      const changePercent = ((h.price - activeData.prevClose) / activeData.prevClose * 100).toFixed(2);
                      const isUp = h.price >= activeData.prevClose;
                      
                      const rowHeight = '34px';
                      const cellBg = isDark ? '#111b2b' : '#edf4fe';
                      const barBg = isDark ? '#1b2d47' : '#cbdffd';
                      const priceColor = isUp ? '#e51d2e' : '#0266da';
                      const sizeColor = isDark ? '#cbd5e1' : '#333333';
                      const borderColor = isDark ? '1px solid #1e293b' : '1px solid #f1f5f9';
                      const borderRightColor = isDark ? '1px solid #1e293b' : '1px solid #e2e8f0';
                      
                      const barWidth = ((h.size / maxAskSize) * 100) + '%';
                      
                      return (
                        <tr key={"ask-" + i} style={{ height: rowHeight, borderBottom: borderColor }}>
                          {/* Col 1: Ask Size */}
                          <td style={{
                            width: '30%',
                            padding: 0,
                            position: 'relative',
                            backgroundColor: cellBg,
                            verticalAlign: 'middle',
                            borderRight: borderRightColor
                          }}>
                            {h.size > 0 && (
                              <div style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                bottom: 0,
                                width: barWidth,
                                backgroundColor: barBg,
                                zIndex: 1
                              }} />
                            )}
                            <span style={{
                              position: 'relative',
                              zIndex: 2,
                              float: 'right',
                              paddingRight: '8px',
                              fontSize: '0.8rem',
                              fontWeight: '600',
                              color: sizeColor
                            }}>
                              {h.size.toLocaleString()}
                            </span>
                          </td>
                          
                          {/* Col 2: Ask Price */}
                          <td onClick={() => handlePriceClick(h.price)} style={{
                            width: '40%',
                            borderRight: borderRightColor,
                            textAlign: 'center',
                            fontSize: '0.82rem',
                            fontWeight: '800',
                            cursor: 'pointer',
                            verticalAlign: 'middle',
                            backgroundColor: cellBg,
                            color: priceColor
                          }}>
                            <span>{h.price.toLocaleString()}</span>
                            <span style={{ fontSize: '0.68rem', fontWeight: '600', marginLeft: '4px' }}>
                              {changePercent >= 0 ? '+' : ''}{changePercent}%
                            </span>
                          </td>
                          
                          {/* Col 3: Right Panel (Info Column) */}
                          {i === 0 && (
                            <td rowSpan={asks.length - 1} style={{
                              width: '30%',
                              backgroundColor: isDark ? '#121826' : '#fafafa',
                              verticalAlign: 'top',
                              padding: '6px',
                              fontSize: '0.7rem',
                              borderRight: 'none'
                            }}>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                {[
                                  { label: '전종', val: activeData.prevClose.toLocaleString(), color: isDark ? '#cbd5e1' : '#222222' },
                                  { label: '전거', val: activeData.volume.toLocaleString(), color: isDark ? '#cbd5e1' : '#222222' },
                                  { label: '시가', val: activeData.open.toLocaleString(), color: '#e51d2e' },
                                  { label: '고가', val: activeData.high.toLocaleString(), color: '#e51d2e' },
                                  { label: '저가', val: activeData.low.toLocaleString(), color: '#0266da' },
                                  { label: '상한', val: activeData.limitUp.toLocaleString(), color: '#e51d2e' },
                                  { label: '하한', val: activeData.limitDown.toLocaleString(), color: '#0266da' },
                                  { label: '상승VI', val: activeData.viUp.toLocaleString(), color: '#e51d2e' },
                                  { label: '하락VI', val: activeData.viDown.toLocaleString(), color: '#0266da' }
                                ].map((item, idx) => (
                                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', lineHeight: 1.1 }}>
                                    <span style={{ color: '#888888', fontSize: '0.65rem' }}>{item.label}</span>
                                    <span style={{ fontWeight: '700', color: item.color, fontSize: '0.68rem' }}>{item.val}</span>
                                  </div>
                                ))}
                              </div>
                            </td>
                          )}
                          
                          {i === asks.length - 1 && (
                            <td style={{
                              width: '30%',
                              backgroundColor: isDark ? '#0b0f19' : '#ffffff',
                              padding: '4px 6px',
                              verticalAlign: 'middle'
                            }}>
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                border: isDark ? '1px solid #334155' : '1px solid #ccd0d7',
                                borderRadius: '4px',
                                padding: '4px 8px',
                                fontSize: '0.75rem',
                                fontWeight: '700',
                                color: isDark ? '#cbd5e1' : '#222222',
                                cursor: 'pointer'
                              }}>
                                <span>10호가</span>
                                <span>▼</span>
                              </div>
                            </td>
                          )}
                        </tr>
                      );
                    });
                  })()}
                  
                  {/* Reference Row */}
                  {(() => {
                    const midPrice = activeData.mid || activeData.prevClose;
                    const midPercent = activeData.midPercent || '0.00%';
                    const isUp = midPrice >= activeData.prevClose;
                    const midColor = isUp ? '#e51d2e' : '#0266da';
                    
                    return (
                      <tr style={{
                        height: '34px',
                        borderBottom: isDark ? '1px solid #1e293b' : '1px solid #cbd2dc',
                        backgroundColor: isDark ? '#082522' : '#edfcf9'
                      }}>
                        <td style={{
                          backgroundColor: isDark ? '#082522' : '#edfcf9',
                          borderRight: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0'
                        }} />
                        <td onClick={() => handlePriceClick(midPrice)} style={{
                          borderRight: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0',
                          textAlign: 'center',
                          fontSize: '0.82rem',
                          fontWeight: '800',
                          cursor: 'pointer',
                          verticalAlign: 'middle',
                          backgroundColor: isDark ? '#082522' : '#edfcf9',
                          color: midColor
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                            <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
                              <span style={{
                                position: 'absolute',
                                left: '-12px',
                                top: '-3px',
                                color: '#00977d',
                                fontSize: '0.55rem',
                                fontWeight: '800',
                                lineHeight: 1
                              }}>중</span>
                              <span>{midPrice.toLocaleString()}</span>
                            </div>
                            <span style={{ fontSize: '0.68rem', fontWeight: '600', marginLeft: '4px' }}>
                              {midPercent}
                            </span>
                          </div>
                        </td>
                        <td style={{ backgroundColor: isDark ? '#082522' : '#edfcf9' }} />
                      </tr>
                    );
                  })()}

                  {/* Bid Rows */}
                  {(() => {
                    const bids = activeData.hogaList.filter(h => h.type === 'bid');
                    const maxBidSize = Math.max(...bids.map(h => h.size), 1);
                    
                    const tickHistory = selectedStock === 'DAISHIN343 K200' ? [
                      { price: '101,265', qty: '1' },
                      { price: '100,890', qty: '5' },
                      { price: '100,960', qty: '1' },
                      { price: '100,950', qty: '5' },
                      { price: '101,655', qty: '70' },
                      { price: '102,130', qty: '3' },
                      { price: '102,140', qty: '5' },
                      { price: '102,365', qty: '3' },
                      { price: '102,355', qty: '5' },
                      { price: '102,037', qty: '1' }
                    ] : [
                      { price: '15,800', qty: '10' },
                      { price: '15,795', qty: '5' },
                      { price: '15,790', qty: '5' },
                      { price: '15,785', qty: '6' },
                      { price: '15,780', qty: '44' }
                    ];

                    return bids.map((h, i) => {
                      const changePercent = ((h.price - activeData.prevClose) / activeData.prevClose * 100).toFixed(2);
                      const isUp = h.price >= activeData.prevClose;
                      
                      const rowHeight = '34px';
                      const cellBg = isDark ? '#22161b' : '#fff5f6';
                      const barBg = isDark ? '#3d1f27' : '#fcdfe2';
                      const priceColor = isUp ? '#e51d2e' : '#0266da';
                      const sizeColor = isDark ? '#cbd5e1' : '#333333';
                      const borderColor = isDark ? '1px solid #1e293b' : '1px solid #f1f5f9';
                      const borderRightColor = isDark ? '1px solid #1e293b' : '1px solid #e2e8f0';
                      
                      const barWidth = ((h.size / maxBidSize) * 100) + '%';
                      const tickContainerHeight = (bids.length * 34 - 12) + 'px';
                      
                      return (
                        <tr key={"bid-" + i} style={{ height: rowHeight, borderBottom: borderColor }}>
                          {/* Col 1: Left Panel (Tick History) */}
                          {i === 0 && (
                            <td rowSpan={bids.length} style={{
                              width: '30%',
                              backgroundColor: isDark ? '#0b0f19' : '#ffffff',
                              verticalAlign: 'top',
                              padding: '6px',
                              fontSize: '0.68rem',
                              borderRight: borderRightColor
                            }}>
                              <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: tickContainerHeight,
                                overflowY: 'hidden',
                                gap: '2px',
                                lineHeight: '1.2'
                              }}>
                                {tickHistory.slice(0, bids.length + 5).map((tick, idx) => {
                                  const tickPriceNum = parseFloat(tick.price.replace(/,/g, ''));
                                  const isTickUp = tickPriceNum >= activeData.prevClose;
                                  const tickColor = isTickUp ? '#e51d2e' : '#0266da';
                                  return (
                                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', color: tickColor }}>
                                      <span>{tick.price}</span>
                                      <span style={{ fontWeight: '600' }}>{tick.qty}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </td>
                          )}
                          
                          {/* Col 2: Bid Price */}
                          <td onClick={() => handlePriceClick(h.price)} style={{
                            width: '40%',
                            borderRight: borderRightColor,
                            textAlign: 'center',
                            fontSize: '0.82rem',
                            fontWeight: '800',
                            cursor: 'pointer',
                            verticalAlign: 'middle',
                            backgroundColor: cellBg,
                            color: priceColor
                          }}>
                            <span>{h.price.toLocaleString()}</span>
                            <span style={{ fontSize: '0.68rem', fontWeight: '600', marginLeft: '4px' }}>
                              {changePercent >= 0 ? '+' : ''}{changePercent}%
                            </span>
                          </td>
                          
                          {/* Col 3: Bid Size */}
                          <td style={{
                            width: '30%',
                            padding: 0,
                            position: 'relative',
                            backgroundColor: cellBg,
                            verticalAlign: 'middle'
                          }}>
                            {h.size > 0 && (
                              <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                bottom: 0,
                                width: barWidth,
                                backgroundColor: barBg,
                                zIndex: 1
                              }} />
                            )}
                            <span style={{
                              position: 'relative',
                              zIndex: 2,
                              float: 'left',
                              paddingLeft: '8px',
                              fontSize: '0.8rem',
                              fontWeight: '600',
                              color: sizeColor
                            }}>
                              {h.size.toLocaleString()}
                            </span>
                          </td>
                        </tr>
                      );
                    });
                  })()}
                </tbody>
              </table>
            </div>

            {/* Totals Row (Fixed at the bottom of the Hoga tab viewport) */}
            {(() => {
              const asks = activeData.hogaList.filter(h => h.type === 'ask');
              const bids = activeData.hogaList.filter(h => h.type === 'bid');
              const totalAskVol = selectedStock === 'DAISHIN343 K200' ? 10778 : asks.reduce((sum, h) => sum + h.size, 0);
              const totalBidVol = selectedStock === 'DAISHIN343 K200' ? 5856 : bids.reduce((sum, h) => sum + h.size, 0);
              
              return (
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0 12px',
                  height: '32px',
                  borderTop: isDark ? '1px solid #1e293b' : '1px solid #cbd2dc',
                  backgroundColor: isDark ? '#121826' : '#f8fafc',
                  fontSize: '0.8rem',
                  fontWeight: '700',
                  width: '100%',
                  boxSizing: 'border-box'
                }}>
                  <span style={{ color: '#0266da' }}>{totalAskVol.toLocaleString()}</span>
                  <span style={{ color: isDark ? '#fff' : '#222222' }}>14:45</span>
                  <span style={{ color: '#e51d2e' }}>{totalBidVol.toLocaleString()}</span>
                </div>
              );
            })()}
          </div>
        )}
{activeTab === '차트' && (
          <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px', height: '100%' }}>
            <div style={{
              backgroundColor: isDark ? '#111827' : '#fafafa',
              borderRadius: '6px',
              border: isDark ? '1px solid #1e293b' : '1px solid #eee',
              padding: '8px'
            }}>
              <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} width="100%" height={chartHeight}>
                <line x1={padding} y1={getY(minPrice)} x2={chartWidth - padding} y2={getY(minPrice)} stroke={isDark ? '#2e3a4e' : '#e5e7eb'} strokeWidth="1" strokeDasharray="2" />
                <line x1={padding} y1={getY((minPrice + maxPrice) / 2)} x2={chartWidth - padding} y2={getY((minPrice + maxPrice) / 2)} stroke={isDark ? '#2e3a4e' : '#e5e7eb'} strokeWidth="1" strokeDasharray="2" />
                <line x1={padding} y1={getY(maxPrice)} x2={chartWidth - padding} y2={getY(maxPrice)} stroke={isDark ? '#2e3a4e' : '#e5e7eb'} strokeWidth="1" strokeDasharray="2" />

                <path
                  d={activeData.chartData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY((d.open + d.close) / 2)}`).join(' ')}
                  fill="none"
                  stroke="#ffb81c"
                  strokeWidth="2"
                />

                {activeData.chartData.map((c, i) => {
                  const x = getX(i);
                  const yOpen = getY(c.open);
                  const yClose = getY(c.close);
                  const yHigh = getY(c.high);
                  const yLow = getY(c.low);
                  const isUp = c.close >= c.open;
                  const candleColor = isUp ? '#e51d2e' : '#0266da';

                  return (
                    <g key={i}>
                      <line x1={x} y1={yHigh} x2={x} y2={yLow} stroke={candleColor} strokeWidth="1.5" />
                      <rect
                        x={x - 6}
                        y={Math.min(yOpen, yClose)}
                        width="12"
                        height={Math.max(2, Math.abs(yOpen - yClose))}
                        fill={isUp ? 'none' : candleColor}
                        stroke={candleColor}
                        strokeWidth="1.5"
                      />
                    </g>
                  );
                })}
              </svg>
              <div style={styles.chartLegend}>
                <span style={{ color: '#e51d2e' }}>■ 양봉(상승)</span>
                <span style={{ color: '#0266da' }}>■ 음봉(하락)</span>
                <span style={{ color: '#ffb81c' }}>━ 5평균선</span>
              </div>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: '800', color: isDark ? '#fff' : '#000' }}>실시간 체결량</span>
              <div style={{
                flex: 1,
                overflowY: 'auto',
                backgroundColor: isDark ? '#111827' : '#fafafa',
                borderRadius: '6px',
                padding: '6px',
                fontSize: '0.72rem',
                fontFamily: 'monospace'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #555', paddingBottom: '2px', marginBottom: '2px', opacity: 0.6 }}>
                  <span>체결시간</span><span>체결가</span><span>대비</span><span>거래량</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: activeData.change >= 0 ? '#e51d2e' : '#0266da' }}>
                  <span>14:45:02</span><span>{activeData.price.toLocaleString()}</span><span>{activeData.change >= 0 ? '▲' : '▼'} {Math.abs(activeData.change).toLocaleString()}</span><span>12주</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: activeData.change >= 0 ? '#e51d2e' : '#0266da' }}>
                  <span>14:44:50</span><span>{(activeData.price - (activeData.change >= 0 ? 5 : -5)).toLocaleString()}</span><span>{activeData.change >= 0 ? '▲' : '▼'} {Math.abs(activeData.change + (activeData.change >= 0 ? -5 : 5)).toLocaleString()}</span><span>46주</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {(activeTab === '시간' || activeTab === '일자' || activeTab === '거래원') && (
          <div style={styles.tabPlaceholder}>
            <span style={{ fontSize: '2rem' }}>📊</span>
            <span style={{ fontSize: '0.82rem', fontWeight: '700', marginTop: '10px' }}>{activeTab} 탭 데이터</span>
            <span style={{ fontSize: '0.75rem', opacity: 0.7, marginTop: '4px', textAlign: 'center' }}>
              본 화면은 호가 및 차트 중심의 개선안 시뮬레이션을 타겟으로 구현되었습니다.
            </span>
          </div>
        )}
      </div>



      {/* Bottom Marquee Index ticker */}
      <div style={{
        ...styles.marqueeBar,
        borderTop: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0',
        backgroundColor: isDark ? '#111b2b' : '#edf4fe',
        padding: '0 12px',
        boxSizing: 'border-box',
        width: '100%'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <span style={{ width: '30%', textAlign: 'left', fontSize: '0.75rem', fontWeight: '800', color: isDark ? '#cbd5e1' : '#333' }}>KOSDAQ</span>
          <span style={{ width: '40%', textAlign: 'center', fontSize: '0.75rem', fontWeight: '800', color: '#0266da' }}>1,196.29</span>
          <span style={{ width: '30%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '2px', fontSize: '0.72rem', fontWeight: '700', color: '#0266da' }}>
            ▼ 23.97 (1.96%)
          </span>
        </div>
      </div>

      {/* Phone Footer Tabs */}
      <div style={{
        height: '44px',
        display: 'flex',
        alignItems: 'stretch',
        borderTop: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0',
        backgroundColor: isDark ? '#121826' : '#fff'
      }}>
        {/* Home button */}
        <button style={{ width: '48px', border: 'none', background: 'none', borderRight: isDark ? '1px solid #1e293b' : '1px solid #f1f5f9', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ color: isDark ? '#cbd5e1' : '#333' }}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
        </button>

        {/* Middle text tabs */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'stretch' }}>
          {[
            { key: '보유상품 현황', label: `보유상품\n현황` },
            { key: 'ETF/리츠 잔고', label: `ETF/리츠\n잔고` },
            { key: 'ETF/리츠 체결/미체결', label: `ETF/리츠\n체결/미체결` }
          ].map((tab, idx) => {
            const isActive = activeBottomTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveBottomTab(tab.key)}
                style={{
                  flex: 1,
                  border: 'none',
                  background: 'none',
                  borderRight: idx < 2 ? (isDark ? '1px solid #1e293b' : '1px solid #f1f5f9') : 'none',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  color: isDark ? '#cbd5e1' : '#333',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  whiteSpace: 'pre-line',
                  lineHeight: '1.2',
                  padding: '2px 4px'
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Back/Exit button */}
        <button 
          onClick={onBackClick}
          style={{ width: '48px', border: 'none', background: 'none', borderLeft: isDark ? '1px solid #1e293b' : '1px solid #f1f5f9', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ color: isDark ? '#cbd5e1' : '#333' }}><path d="M9 14L4 9l5-5" /><path d="M4 9h10a5 5 0 0 1 5 5v5" /></svg>
        </button>
      </div>
    </>
  );

  if (hideFrame) {
    return content;
  }

  return (
    <div style={{
      ...styles.phoneMockup,
      backgroundColor: isDark ? '#0b0f19' : '#fff'
    }}>
      {content}
    </div>
  );
}

function AsIsCurrentPriceView({ setAsIsSubScreen, isDark }) {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: '#ffffff',
    color: '#333333'
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '46px',
    padding: '0 12px',
    borderBottom: '1px solid #e2e8f0',
    backgroundColor: '#ffffff'
  };

  const topPriceSectionStyle = {
    padding: '12px 14px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  };

  const tabContainerStyle = {
    display: 'flex',
    borderBottom: '1px solid #e2e8f0',
    backgroundColor: '#ffffff',
    fontSize: '0.85rem'
  };

  const tabStyle = (active) => ({
    flex: 1,
    textAlign: 'center',
    padding: '10px 0',
    fontWeight: active ? '800' : '500',
    color: active ? '#de201e' : '#666666',
    borderBottom: active ? '2px solid #de201e' : '2px solid transparent',
    cursor: 'pointer'
  });

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.2rem', cursor: 'pointer' }}>☰</span>
          <span style={{ fontWeight: '800', fontSize: '0.98rem', letterSpacing: '-0.3px' }}>DAISHIN343 K200</span>
          <span style={{ fontSize: '0.65rem', color: '#666' }}>▼</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span 
            onClick={() => setAsIsSubScreen('stockSearch')}
            style={{ fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            🔍
          </span>
          <span style={{ fontSize: '1.1rem', cursor: 'pointer' }}>☆</span>
        </div>
      </div>

      {/* Top summary section */}
      <div style={topPriceSectionStyle}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'inline-flex', alignSelf: 'flex-start', backgroundColor: '#e2f2ef', color: '#00977d', fontSize: '0.55rem', fontWeight: '800', padding: '1px 3px', borderRadius: '2px', border: '1px solid #bce3db', marginBottom: '2px' }}>KRX</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
            <span style={{ fontSize: '1.75rem', fontWeight: '900', color: '#de201e', letterSpacing: '-0.5px' }}>140,955</span>
            <span style={{ fontSize: '0.75rem', color: '#de201e', fontWeight: '700' }}>▲ 470 (0.33%)</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button style={{ backgroundColor: '#2366ca', color: '#ffffff', border: 'none', borderRadius: '2px', padding: '8px 14px', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer' }}>매도</button>
          <button style={{ backgroundColor: '#de201e', color: '#ffffff', border: 'none', borderRadius: '2px', padding: '8px 14px', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer' }}>매수</button>
        </div>
      </div>

      {/* Tabs */}
      <div style={tabContainerStyle}>
        {['호가', '차트', '시간', '일자', '거래원'].map((t) => (
          <div key={t} style={tabStyle(t === '호가')}>{t}</div>
        ))}
      </div>

      {/* Bid/Ask Table Area */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', fontSize: '0.78rem' }}>
        <div style={{ display: 'flex', flex: 1 }}>
          {/* Columns */}
          <div style={{ width: '90px', borderRight: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column' }}>
            {/* Ask volumes (Top half) */}
            <div style={{ height: '32px', backgroundColor: '#f0f6ff', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '8px', borderBottom: '1px solid #f8fafc', color: '#64748b' }}>205</div>
            <div style={{ height: '32px', backgroundColor: '#f0f6ff', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '8px', borderBottom: '1px solid #f8fafc', color: '#64748b' }}>2,500</div>
            <div style={{ height: '32px', backgroundColor: '#f0f6ff', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '8px', borderBottom: '1px solid #f8fafc', color: '#64748b' }}>2,500</div>
            <div style={{ height: '32px', backgroundColor: '#f0f6ff', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '8px', borderBottom: '1px solid #f8fafc', color: '#64748b' }}>4,979</div>
            <div style={{ height: '32px', backgroundColor: '#f0f6ff', borderBottom: '1px solid #f8fafc' }}></div>
            {/* Bid volumes (Bottom half - empty) */}
            <div style={{ flex: 1, backgroundColor: '#ffffff' }}></div>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', borderRight: '1px solid #f1f5f9' }}>
            {/* Prices Column */}
            {/* Ask Prices */}
            <div style={{ height: '32px', backgroundColor: '#f0f6ff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px', borderBottom: '1px solid #f8fafc' }}>
              <span style={{ color: '#de201e', fontWeight: '700' }}>148,800</span>
              <span style={{ color: '#de201e', fontSize: '0.68rem' }}>+5.92%</span>
            </div>
            <div style={{ height: '32px', backgroundColor: '#f0f6ff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px', borderBottom: '1px solid #f8fafc' }}>
              <span style={{ color: '#de201e', fontWeight: '700' }}>142,380</span>
              <span style={{ color: '#de201e', fontSize: '0.68rem' }}>+1.35%</span>
            </div>
            <div style={{ height: '32px', backgroundColor: '#f0f6ff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px', borderBottom: '1px solid #f8fafc' }}>
              <span style={{ color: '#de201e', fontWeight: '700' }}>142,370</span>
              <span style={{ color: '#de201e', fontSize: '0.68rem' }}>+1.34%</span>
            </div>
            <div style={{ height: '32px', backgroundColor: '#f0f6ff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px', borderBottom: '1px solid #f8fafc' }}>
              <span style={{ color: '#de201e', fontWeight: '700' }}>141,920</span>
              <span style={{ color: '#de201e', fontSize: '0.68rem' }}>+1.02%</span>
            </div>
            <div style={{ height: '32px', backgroundColor: '#f0f6ff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px', borderBottom: '1px solid #f8fafc' }}>
              <span style={{ color: '#2366ca', fontWeight: '700' }}>141,787</span>
              <span style={{ color: '#2366ca', fontSize: '0.68rem' }}>-0.93%</span>
            </div>
            {/* Bid Prices */}
            <div style={{ height: '32px', backgroundColor: '#fff5f5', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px', borderBottom: '1px solid #fdf2f2' }}>
              <span style={{ color: '#de201e', fontWeight: '700' }}>141,655</span>
              <span style={{ color: '#de201e', fontSize: '0.68rem' }}>+0.83%</span>
            </div>
            <div style={{ height: '32px', backgroundColor: '#fff5f5', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px', borderBottom: '1px solid #fdf2f2' }}>
              <span style={{ color: '#de201e', fontWeight: '700' }}>141,060</span>
              <span style={{ color: '#de201e', fontSize: '0.68rem' }}>+0.41%</span>
            </div>
            <div style={{ height: '32px', backgroundColor: '#fff5f5', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px', borderBottom: '1px solid #fdf2f2' }}>
              <span style={{ color: '#de201e', fontWeight: '700' }}>141,050</span>
              <span style={{ color: '#de201e', fontSize: '0.68rem' }}>+0.40%</span>
            </div>
            <div style={{ height: '32px', backgroundColor: '#fff5f5', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px', borderBottom: '1px solid #fdf2f2' }}>
              <span style={{ color: '#2366ca', fontWeight: '700' }}>140,140</span>
              <span style={{ color: '#2366ca', fontSize: '0.68rem' }}>-0.25%</span>
            </div>
            <div style={{ height: '32px', backgroundColor: '#fff5f5', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px', borderBottom: '1px solid #fdf2f2' }}>
              <span style={{ color: '#2366ca', fontWeight: '700' }}>134,000</span>
              <span style={{ color: '#2366ca', fontSize: '0.68rem' }}>-4.62%</span>
            </div>
            <div style={{ height: '32px', backgroundColor: '#fff5f5', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px', borderBottom: '1px solid #fdf2f2' }}>
              <span style={{ color: '#2366ca', fontWeight: '700' }}>126,875</span>
              <span style={{ color: '#2366ca', fontSize: '0.68rem' }}>-9.69%</span>
            </div>
          </div>

          <div style={{ width: '110px', display: 'flex', flexDirection: 'column' }}>
            {/* Info Panel & Bid Volumes */}
            {/* Info Panel */}
            <div style={{ padding: '6px', fontSize: '0.68rem', lineHeight: '1.25', color: '#555555', borderBottom: '1px solid #f1f5f9', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>거래량</span><span style={{ fontWeight: '700', color: '#111' }}>187</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>체결강도</span><span style={{ fontWeight: '700', color: '#00977d' }}>25.50%</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>전종</span><span style={{ fontWeight: '700' }}>140,485</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>전거</span><span style={{ fontWeight: '700' }}>164</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>시가</span><span style={{ color: '#2366ca' }}>139,210</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>고가</span><span style={{ color: '#de201e' }}>140,975</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>저가</span><span style={{ color: '#2366ca' }}>139,210</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2px' }}><span style={{ color: '#de201e' }}>▲ 상한</span><span style={{ color: '#de201e', fontWeight: '700' }}>182,630</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#2366ca' }}>▼ 하한</span><span style={{ color: '#2366ca', fontWeight: '700' }}>98,340</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#de201e' }}>상승VI</span><span style={{ color: '#de201e' }}>155,065</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#2366ca' }}>하락VI</span><span style={{ color: '#2366ca' }}>126,865</span></div>
            </div>
            {/* Bid volumes */}
            <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#fff5f5' }}>
              <div style={{ height: '32px', display: 'flex', alignItems: 'center', paddingLeft: '8px', borderBottom: '1px solid #fdf2f2', color: '#64748b' }}>4,919</div>
              <div style={{ height: '32px', display: 'flex', alignItems: 'center', paddingLeft: '8px', borderBottom: '1px solid #fdf2f2', color: '#64748b' }}>2,500</div>
              <div style={{ height: '32px', display: 'flex', alignItems: 'center', paddingLeft: '8px', borderBottom: '1px solid #fdf2f2', color: '#64748b' }}>2,500</div>
              <div style={{ height: '32px', display: 'flex', alignItems: 'center', paddingLeft: '8px', borderBottom: '1px solid #fdf2f2', color: '#64748b' }}>1</div>
              <div style={{ height: '32px', display: 'flex', alignItems: 'center', paddingLeft: '8px', borderBottom: '1px solid #fdf2f2', color: '#64748b' }}>10</div>
              <div style={{ height: '32px', display: 'flex', alignItems: 'center', paddingLeft: '8px', borderBottom: '1px solid #fdf2f2', color: '#64748b' }}>300</div>
            </div>
          </div>
        </div>
      </div>

      {/* KOSDAQ footer */}
      <div style={{ height: '24px', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px', borderTop: '1px solid #e2e8f0', fontSize: '0.72rem' }}>
        <span style={{ fontWeight: '800' }}>KOSDAQ</span>
        <span style={{ color: '#de201e', fontWeight: '800' }}>1,033.61 ▲ 14.93 (1.47%)</span>
      </div>

      {/* Bottom bar */}
      <div style={{ height: '48px', borderTop: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-around', backgroundColor: '#f8fafc', fontSize: '0.62rem', fontWeight: '800', color: '#666' }}>
        <div style={{ cursor: 'pointer', textAlign: 'center' }}><div>보유상품</div><div>현황</div></div>
        <div style={{ cursor: 'pointer', textAlign: 'center' }}><div>ETF/리츠</div><div>잔고</div></div>
        <div style={{ cursor: 'pointer', textAlign: 'center' }}><div>ETF/리츠</div><div>체결/미체결</div></div>
        <div style={{ cursor: 'pointer', textAlign: 'center' }}><div>ETF/리츠</div><div>주문</div></div>
        <div 
          onClick={() => setAsIsSubScreen('menu')}
          style={{ cursor: 'pointer', fontSize: '1.2rem', color: '#111111' }}
        >
          ⎌
        </div>
      </div>

      {/* Bottom Sheet for Sorting Options */}
      {isBottomSheetOpen && (
        <>
          {/* Backdrop */}
          <div 
            onClick={() => setIsBottomSheetOpen(false)}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 999,
              backdropFilter: 'blur(1px)'
            }}
          />
          {/* Bottom Sheet Menu */}
          <div style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: isDark ? '#1e293b' : '#ffffff',
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
            padding: '24px 20px 24px 20px',
            zIndex: 1000,
            boxShadow: '0 -4px 20px rgba(0,0,0,0.15)',
            boxSizing: 'border-box',
            animation: 'slideUp 0.22s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
            <style>{`
              @keyframes slideUp {
                from { transform: translateY(100%); }
                to { transform: translateY(0); }
              }
            `}</style>
            <div style={{
              fontSize: '1.05rem',
              fontWeight: '700',
              color: isDark ? '#ffffff' : '#111111',
              marginBottom: '18px',
              letterSpacing: '-0.3px'
            }}>
              정렬 기준
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {[
                '1주일',
                '1개월',
                '3개월',
                '6개월',
                '1년'
              ].map((option) => {
                const isSelected = sortOption === option;
                return (
                  <div
                    key={option}
                    onClick={() => {
                      setSortOption(option);
                      setIsBottomSheetOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 0',
                      cursor: 'pointer',
                      fontSize: '0.94rem',
                      fontWeight: isSelected ? '600' : '400',
                      color: isSelected ? (isDark ? '#ffffff' : '#111111') : (isDark ? '#94a3b8' : '#666666')
                    }}
                  >
                    <span>{option}</span>
                    {isSelected && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isDark ? '#ffffff' : '#111111'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function AsIsStockSearchView({ setAsIsSubScreen, isDark, searchQuery, setSearchQuery }) {

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: '#ffffff',
    color: '#333333'
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    height: '46px',
    padding: '0 12px',
    borderBottom: '1px solid #e2e8f0',
    backgroundColor: '#ffffff'
  };

  const tabsStyle = {
    display: 'flex',
    borderBottom: '1px solid #e2e8f0',
    fontSize: '0.85rem'
  };

  const tabItemStyle = (active) => ({
    flex: 1,
    padding: '12px 0',
    textAlign: 'center',
    fontWeight: active ? '800' : '500',
    color: active ? '#111' : '#999',
    borderBottom: active ? '2.5px solid #111' : 'none',
    cursor: 'pointer'
  });

  const searchRowStyle = {
    display: 'flex',
    gap: '8px',
    padding: '8px 12px',
    alignItems: 'center',
    borderBottom: '1px solid #f1f5f9'
  };

  const stocks = [
    { name: 'BNK 27-12 특수채(AAA이상)액티', code: 'A0193M0' },
    { name: 'SOL 우주항공밸류체인', code: 'A0207G0' },
    { name: 'KIWOOM 미국우주데이터센터인프', code: 'A0207Z0' },
    { name: 'KODEX 현대차로보틱스밸류체인TO', code: 'A0204D0' },
    { name: 'DAISHIN343 금융&지주고배당', code: 'A0189Z0' },
    { name: 'ACE 고배당주Plus커버드콜액티브', code: 'A0199C0' },
    { name: 'MIDAS 코스닥액티브', code: 'A0191B0' },
    { name: 'TIME 글로벌휴머노이드로봇산업', code: 'A0185L0' }
  ];

  const filteredStocks = searchQuery.trim() === ''
    ? stocks
    : stocks.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.code.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div style={containerStyle}>
      {/* Galaxy S20 Central Punch-hole Camera */}
      <div style={{
        width: '8px',
        height: '8px',
        backgroundColor: '#000000',
        borderRadius: '50%',
        position: 'absolute',
        top: '12px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 999
      }} />

      {/* Phone Status Bar */}
      <div style={{
        height: '32px',
        padding: '0 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: isDark ? '#121826' : '#ffffff',
        borderBottom: 'none',
        color: isDark ? '#cbd5e1' : '#475569',
        fontSize: '0.75rem'
      }}>
        <span style={{ fontWeight: '700' }}>SKT 2:45</span>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.65rem', fontWeight: '800' }}>5G</span>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1px', height: '10px' }}>
            <div style={{ width: '2px', height: '3px', backgroundColor: isDark ? '#cbd5e1' : '#475569' }}></div>
            <div style={{ width: '2px', height: '5px', backgroundColor: isDark ? '#cbd5e1' : '#475569' }}></div>
            <div style={{ width: '2px', height: '7px', backgroundColor: isDark ? '#cbd5e1' : '#475569' }}></div>
            <div style={{ width: '2px', height: '9px', backgroundColor: isDark ? '#cbd5e1' : '#475569' }}></div>
          </div>
          <div style={{
            border: isDark ? '1px solid #cbd5e1' : '1px solid #475569',
            borderRadius: '3px',
            padding: '0px 3px',
            fontSize: '0.62rem',
            fontWeight: '900',
            height: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isDark ? '#cbd5e1' : '#475569',
            color: isDark ? '#0b0f19' : '#fff',
            lineHeight: 1
          }}>
            97
          </div>
        </div>
      </div>

      {/* Header */}
      <div style={headerStyle}>
        <button 
          onClick={() => setAsIsSubScreen('currentPrice')}
          style={{ border: 'none', background: 'none', padding: '0 16px 0 0', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'inherit', position: 'relative', zIndex: 10 }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>
        <span style={{ fontWeight: '800', fontSize: '1.25rem', flex: 1, textAlign: 'center', marginLeft: '-24px', pointerEvents: 'none' }}>종목 검색</span>
      </div>

      {/* Tabs */}
      <div style={{ ...tabsStyle, fontSize: '0.95rem' }}>
        <div style={tabItemStyle(true)}>ETF</div>
        <div style={tabItemStyle(false)}>ETN</div>
        <div style={tabItemStyle(false)}>리츠</div>
      </div>

      {/* Search Input Row */}
      <div style={{ display: 'flex', gap: '8px', padding: '10px 12px', alignItems: 'center', borderBottom: '1px solid #f1f5f9' }}>
        {/* 전체 dropdown */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
          padding: '0 10px',
          height: '36px',
          boxSizing: 'border-box',
          fontSize: '0.88rem',
          fontWeight: '600',
          cursor: 'pointer',
          color: '#222',
          backgroundColor: '#ffffff',
          whiteSpace: 'nowrap',
          flexShrink: 0
        }}>
          전체
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
        {/* Search input */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
          padding: '0 12px',
          height: '36px',
          boxSizing: 'border-box',
          gap: '8px',
          backgroundColor: '#ffffff'
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#bbbbbb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="종목명(공백 제외), 종목코드"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              border: 'none',
              background: 'none',
              width: '100%',
              outline: 'none',
              fontSize: '0.83rem',
              color: '#222',
              letterSpacing: '-0.2px',
              height: '100%'
            }}
          />
        </div>
      </div>

      {/* List */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        {searchQuery.trim() !== '' && /^[ㄱ-ㅎ\s]+$/.test(searchQuery) ? (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '24px',
            color: '#888888',
            fontSize: '0.88rem',
            lineHeight: '1.6'
          }}>
            <span style={{ fontSize: '0.95rem', fontWeight: '500', color: '#6b7280', marginBottom: '4px' }}>검색 결과가 없습니다.</span>
            <span style={{ fontSize: '0.95rem', fontWeight: '500', color: '#6b7280', marginBottom: '4px' }}>초성검색은 지원되지 않습니다.</span>
            <span style={{ fontSize: '0.88rem', color: '#9ca3af' }}>종목명 또는 종목코드로 다시 검색해보세요.</span>
          </div>
        ) : (
          filteredStocks.map((s, idx) => (
            <div 
              key={idx} 
              onClick={() => setAsIsSubScreen('currentPrice')}
              style={{ padding: '14px 16px', borderBottom: '1px solid #f1f5f9', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '4px' }}
            >
              <span style={{ fontSize: '1.05rem', fontWeight: '600', color: '#222' }}>{s.name}</span>
              <span style={{ fontSize: '0.82rem', color: '#888' }}>{s.code}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function ToBeEtfMallView({ setToBeSubScreen, isDark, isDrawerOpen, setToBePrevSubScreen, etfMallNavMode, setEtfMallNavMode, activeMallTab, setActiveMallTab, ownedDisplayOption, setOwnedDisplayOption, ownedSortOption, setOwnedSortOption, isOwnedSortBsheetOpen, setIsOwnedSortBsheetOpen, isFavoriteBsheetOpen, setIsFavoriteBsheetOpen, searchQuery, setSearchQuery, selectedChip, setSelectedChip, isPeriodBsheetOpen: isBottomSheetOpen, setIsPeriodBsheetOpen: setIsBottomSheetOpen }) {
  const [activeTab, setActiveTab] = useState('1주일 매수고객순'); // '1주일 매수고객순', '1주일 매수금액순'
  const [sortOption, setSortOption] = useState('1주일');
  const [favorites, setFavorites] = useState(['A0207Z0', 'A390140']);
  const [favoritePosition, setFavoritePosition] = useState('bottom');
  const [pendingFavoriteCode, setPendingFavoriteCode] = useState(null);
  const [showKeyboard, setShowKeyboard] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('showKeyboard') === 'true';
  });
  const [checkedItems, setCheckedItems] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const checked = params.get('checkedCodes');
    if (checked) {
      const initialChecked = {};
      checked.split(',').forEach(code => {
        initialChecked[code] = true;
      });
      return initialChecked;
    }
    return {};
  });

  const toggleCheck = (code) => {
    setCheckedItems(prev => ({
      ...prev,
      [code]: !prev[code]
    }));
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (showKeyboard) {
      params.set('showKeyboard', 'true');
    } else {
      params.delete('showKeyboard');
    }
    const codes = Object.keys(checkedItems).filter(key => checkedItems[key]);
    if (codes.length > 0) {
      params.set('checkedCodes', codes.join(','));
    } else {
      params.delete('checkedCodes');
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    if (window.location.search !== `?${params.toString()}`) {
      window.history.replaceState({}, '', newUrl);
    }
  }, [showKeyboard, checkedItems]);

  useEffect(() => {
    if (etfMallNavMode === 'search' && activeMallTab !== '전체') {
      setActiveMallTab('전체');
    }
  }, [etfMallNavMode, activeMallTab, setActiveMallTab]);

  const toggleFavorite = (code) => {
    setFavorites(prev => 
      prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
    );
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: isDark ? '#0b0f19' : '#ffffff',
    color: isDark ? '#cbd5e1' : '#333333',
    position: 'relative'
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    height: '46px',
    padding: '0 12px',
    borderBottom: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0',
    backgroundColor: isDark ? '#121826' : '#ffffff',
    position: 'relative'
  };

  const menuTabsStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0',
    backgroundColor: isDark ? '#121826' : '#ffffff',
    fontSize: '0.82rem'
  };

  const sectionHeaderStyle = {
    padding: '6px 14px',
    marginTop: '8px',
    backgroundColor: isDark ? '#171e2e' : '#f1f3f5',
    fontSize: '0.82rem',
    fontWeight: '500',
    color: isDark ? '#94a3b8' : '#777777',
    border: 'none',
    textAlign: 'left'
  };

  const menuTabItemStyle = (active) => ({
    flexShrink: 0,
    padding: '11px 10px',
    textAlign: 'center',
    fontWeight: active ? '700' : '400',
    color: active ? (isDark ? '#ffffff' : '#111111') : (isDark ? '#64748b' : '#999999'),
    borderBottom: active ? (isDark ? '2.5px solid #ffffff' : '2.5px solid #111111') : '2.5px solid transparent',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    letterSpacing: '-0.3px',
    lineHeight: '1.2'
  });

  const searchContainerStyle = {
    padding: '10px 12px',
    backgroundColor: isDark ? '#0b0f19' : '#ffffff',
    borderBottom: isDark ? '1px solid #1e293b' : '1px solid #f1f5f9'
  };

  const searchInputWrapperStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: isDark ? '1px solid #334155' : '1.5px solid #7c86a2',
    borderRadius: '6px',
    padding: '10px 14px',
    backgroundColor: isDark ? '#121826' : '#ffffff'
  };

  const rankingSectionStyle = {
    flex: 1,
    overflowY: 'auto',
    padding: '16px 12px',
    backgroundColor: isDark ? '#0b0f19' : '#ffffff'
  };

  const pillContainerStyle = {
    display: 'flex',
    gap: '8px',
    margin: '12px 0 16px 0'
  };

  const pillStyle = (active) => ({
    border: 'none',
    borderRadius: '20px',
    padding: '6px 14px',
    fontSize: '0.78rem',
    fontWeight: '700',
    cursor: 'pointer',
    backgroundColor: active ? (isDark ? '#3b82f6' : '#22252a') : (isDark ? '#1e293b' : '#f1f3f5'),
    color: active ? '#ffffff' : (isDark ? '#94a3b8' : '#777777')
  });

  // Top 10 lists
  const customerRank = [
    { rank: 1, name: 'TIGER 미국S&P500', limit: '투자한도70%', price: 28165, change: 165, pct: 0.59, medalColor: '#ffd700' },
    { rank: 2, name: 'RISE 삼성전자SK하이닉스채권혼합', limit: '투자한도100%', price: 14550, change: 160, pct: 1.11, medalColor: '#c0c0c0' },
    { rank: 3, name: 'TIGER 미국10년국채액티브', limit: '투자한도70%', price: 200750, change: 2000, pct: 1.01, medalColor: '#cd7f32' }
  ];

  const amountRank = [
    { rank: 1, name: 'KODEX 200', limit: '투자한도100%', price: 32450, change: -120, pct: -0.37, medalColor: '#ffd700' },
    { rank: 2, name: 'TIGER 미국S&P500', limit: '투자한도70%', price: 28165, change: 165, pct: 0.59, medalColor: '#c0c0c0' },
    { rank: 3, name: 'ACE 미국S&P500 채권혼합액티브', limit: '투자한도100%', price: 11200, change: 80, pct: 0.72, medalColor: '#cd7f32' }
  ];

  const currentList = activeTab === '1주일 매수고객순' ? customerRank : amountRank;

  const recentViewedList = [
    { name: 'TIGER 미국우주테크', code: 'A0185L0', limit: '투자한도70%', price: 109760, pct: -5.17, positive: false },
    { name: 'SOL AI반도체TOP2플러스', code: 'A0207Z0', limit: '투자한도70%', price: 12840, pct: 2.56, positive: true },
    { name: 'KODEX 미국나스닥100레버리지', code: 'A0225D0', limit: '투자한도70%', price: 19850, pct: 4.12, positive: true },
    { name: 'ACE 미국S&P500채권혼합', code: 'A0226E0', limit: '투자한도100%', price: 11450, pct: 0.25, positive: true },
    { name: 'KBSTAR 미국S&P500', code: 'A0227F0', limit: '투자한도70%', price: 18900, pct: -0.45, positive: false },
    { name: 'TIGER 일본반도체FACTSET', code: 'A0228G0', limit: '투자한도70%', price: 13540, pct: -1.25, positive: false },
    { name: 'SOL 미국30년국채커버드콜', code: 'A0229H0', limit: '투자한도100%', price: 9240, pct: 0.65, positive: true },
    { name: 'KODEX 반도체', code: 'A009120', limit: '투자한도70%', price: 34100, pct: 2.45, positive: true }
  ];

  const ownedList = [
    { name: 'KODEX 현대차로보틱스밸류체인TO', code: 'A0204D0', limit: '투자한도70%', price: 15300, pct: 3.0, positive: true, quantity: 10, avgPrice: 14850, volume: 152000 },
    { name: 'DAISHIN343 금융&지주고배당', code: 'A0189Z0', limit: '투자한도70%', price: 125400, pct: -0.5, positive: false, quantity: 5, avgPrice: 126030, volume: 12000 },
    { name: '대신글로벌코어리츠', code: 'A390140', limit: '투자한도100%', price: 2950, pct: 1.2, positive: true, quantity: 100, avgPrice: 2915, volume: 850000 },
    { name: 'TIGER 미국S&P500', code: 'A0191B0', limit: '투자한도70%', price: 28325, pct: 0.21, positive: true, quantity: 20, avgPrice: 28165, volume: 2100000 },
    { name: 'RISE 삼성전자SK하이닉스채권혼합50', code: 'A0192C0', limit: '투자한도100%', price: 14550, pct: 1.11, positive: true, quantity: 50, avgPrice: 14390, volume: 32000 },
    { name: 'ACE 미국나스닥100', code: 'A0193D0', limit: '투자한도70%', price: 21050, pct: -1.05, positive: false, quantity: 15, avgPrice: 21270, volume: 450000 },
    { name: 'KODEX 200', code: 'A005930', limit: '투자한도100%', price: 32450, pct: -0.37, positive: false, quantity: 30, avgPrice: 32570, volume: 3200000 }
  ];

  const getSortedOwnedList = () => {
    let list = [...ownedList];
    if (ownedSortOption === '평가금 많은 순') {
      list.sort((a, b) => (b.quantity * b.price) - (a.quantity * a.price));
    } else if (ownedSortOption === '수익률 높은 순') {
      list.sort((a, b) => {
        const yieldA = ((a.price - a.avgPrice) / a.avgPrice) * 100;
        const yieldB = ((b.price - b.avgPrice) / b.avgPrice) * 100;
        return yieldB - yieldA;
      });
    } else if (ownedSortOption === '등락률 높은 순') {
      list.sort((a, b) => b.pct - a.pct);
    } else if (ownedSortOption === '거래량 많은 순') {
      list.sort((a, b) => (b.volume || 0) - (a.volume || 0));
    }
    return list;
  };

  const recentViewedOwnedList = [
    ownedList[0],
    ownedList[2],
    ownedList[3],
    ownedList[4]
  ];

  const tdfList = [
    { name: 'KB온국민TDF2055', code: 'A0198F0', limit: '투자한도100%', price: 13500, pct: 0.85, positive: true },
    { name: '신한마음편한TDF2050', code: 'A0199G0', limit: '투자한도100%', price: 12200, pct: -0.15, positive: false },
    { name: '미래에셋전략배분TDF2045', code: 'A0201A0', limit: '투자한도100%', price: 14800, pct: 1.1, positive: true },
    { name: '삼성ETF를담은TDF2050', code: 'A0202B0', limit: '투자한도100%', price: 11950, pct: 0.35, positive: true },
    { name: '하나평생소득TDF2040', code: 'A0203C0', limit: '투자한도100%', price: 12640, pct: -0.05, positive: false },
    { name: '한국투자TDF알아서2050', code: 'A0204E0', limit: '투자한도100%', price: 15120, pct: 1.25, positive: true },
    { name: '키움키워드TDF2045', code: 'A0205F0', limit: '투자한도100%', price: 10840, pct: -0.75, positive: false }
  ];

  const recentViewedTdfList = [
    tdfList[0],
    tdfList[2],
    tdfList[5]
  ];

  const goDividendList = [
    { name: 'TIGER 코리아배당다우존스', code: 'A0052D0', limit: '투자한도70%', price: 15355, pct: -3.25, positive: false, hasK: true, hasN: true },
    { name: 'PLUS 고배당주', code: 'A161510', limit: '투자한도70%', price: 24885, pct: -2.89, positive: false, hasK: true, hasN: false },
    { name: 'RISE 금융채액티브', code: 'A336160', limit: '투자한도100%', price: 100340, pct: -0.14, positive: false, hasK: false, hasN: true },
    { name: 'TIME Korea플러스배당액티브', code: 'A441800', limit: '투자한도70%', price: 37420, pct: 0.35, positive: true, hasK: false, hasN: false },
    { name: 'KODEX 한국부동산리츠인프라', code: 'A476800', limit: '투자한도100%', price: 4260, pct: -1.50, positive: false, hasK: true, hasN: true },
    { name: 'KoAct 배당성장액티브', code: 'A476850', limit: '투자한도70%', price: 27545, pct: 1.21, positive: true, hasK: true, hasN: false }
  ];

  const etnList = [
    { name: '삼성 레버리지 천연가스 선물 ETN', code: 'A530001', limit: '투자한도70%', price: 9250, pct: 4.85, positive: true },
    { name: '신한 인버스 2X WTI원유 선물 ETN', code: 'A500015', limit: '투자한도70%', price: 12400, pct: -3.12, positive: false },
    { name: '메리츠 S&P 국채 10년 ETN', code: 'A570021', limit: '투자한도100%', price: 10050, pct: 0.15, positive: true },
    { name: 'KB 레버리지 구리 선물 ETN', code: 'A580012', limit: '투자한도70%', price: 15420, pct: 2.30, positive: true }
  ];

  const reitsList = [
    { name: 'SK리츠', code: 'A395400', limit: '투자한도100%', price: 4120, pct: -0.85, positive: false },
    { name: '제이알글로벌리츠', code: 'A348950', limit: '투자한도100%', price: 3850, pct: 0.52, positive: true },
    { name: '롯데리츠', code: 'A330590', limit: '투자한도100%', price: 3200, pct: -1.23, positive: false },
    { name: '신한서부티엔디리츠', code: 'A388720', limit: '투자한도100%', price: 3010, pct: 0.00, positive: true },
    { name: '한화플러스액티브리츠', code: 'A412210', limit: '투자한도100%', price: 4890, pct: 1.88, positive: true }
  ];

  // Merge lists to form a general list
  const allList = [
    { rank: 1, name: 'RISE 삼성전자SK하이닉스채권혼합50', code: 'A0189Z0', limit: '투자한도100%', price: 14550, pct: 1.76,  positive: true  },
    { rank: 2, name: 'SOL AI반도체TOP2플러스',             code: 'A0207Z0', limit: '투자한도70%',  price: 12840, pct: 2.56,  positive: true  },
    { rank: 3, name: 'TIGER 미국S&P500',                   code: 'A0191B0', limit: '투자한도70%',  price: 28165, pct: -0.32, positive: false },
    { rank: 4, name: 'TIGER 미국우주테크',                  code: 'A0185L0', limit: '투자한도70%',  price: 11730, pct: -5.17, positive: false },
    { rank: 5, name: 'TIGER 반도체TOP10',                   code: 'A0199C0', limit: '투자한도100%', price: 9850,  pct: 1.28,  positive: true  },
    ...recentViewedList,
    ...ownedList,
    ...tdfList,
    ...goDividendList,
    ...etnList,
    ...reitsList
  ].filter((item, index, self) => 
    self.findIndex(t => t.name === item.name) === index
  );

  const getChoseong = (str) => {
    const CHOSEONG = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
    let result = '';
    for (let i = 0; i < str.length; i++) {
      const code = str.charCodeAt(i) - 0xAC00;
      if (code >= 0 && code <= 11171) {
        result += CHOSEONG[Math.floor(code / 588)];
      } else {
        result += str.charAt(i);
      }
    }
    return result;
  };

  const filterByChip = (list) => {
    let filtered = list;
    if (selectedChip !== '전체') {
      filtered = list.filter(item => {
        if (selectedChip === 'ETF') {
          return item.name.includes('ETF') || item.name.includes('반도체') || item.name.includes('채권') || item.name.includes('S&P500') || item.name.includes('우주') || item.name.includes('배당') || item.name.includes('TDF');
        }
        if (selectedChip === 'ETN') {
          return item.name.includes('ETN');
        }
        if (selectedChip === '리츠') {
          return item.name.includes('리츠') || item.name.includes('부동산');
        }
        return true;
      });
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      if (/^[ㄱ-ㅎ\s]+$/.test(q)) {
        filtered = filtered.filter(item => {
          const nameChoseong = getChoseong(item.name);
          return nameChoseong.includes(q) || item.code.toLowerCase().includes(q);
        });
      } else {
        filtered = filtered.filter(item => item.name.toLowerCase().includes(q) || item.code.toLowerCase().includes(q));
      }
    }
    return filtered;
  };

  const renderEmptyState = () => (
    <div style={{ padding: '40px 20px', textAlign: 'center', color: isDark ? '#64748b' : '#999999', fontSize: '0.88rem' }}>
      해당 조건의 종목이 없습니다.
    </div>
  );

  const renderStockList = (list, hidePriceInfo = false) => {
    return filterByChip(list).length === 0 ? renderEmptyState() : filterByChip(list).map((item, idx, arr) => {
      const absChange = Math.round(item.price * (Math.abs(item.pct) / 100));
      return (
        <div key={idx} 
          onClick={() => {
            if (etfMallNavMode === 'search') {
              toggleCheck(item.code);
            } else {
              setToBePrevSubScreen('etfMall');
              setToBeSubScreen('tigerDetail');
            }
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '12px 10px 12px 14px',
            borderBottom: idx < arr.length - 1 ? (isDark ? '1px solid #1e293b' : '1px solid #f1f5f9') : 'none',
            cursor: 'pointer',
            gap: '8px',
            position: 'relative'
          }}
        >
          {etfMallNavMode === 'search' && (
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '4px',
                cursor: 'pointer',
                flexShrink: 0
              }}
            >
              <div style={{
                width: '18px',
                height: '18px',
                borderRadius: '4px',
                border: checkedItems[item.code]
                  ? (isDark ? '1.5px solid #ffffff' : '1.5px solid #000000')
                  : (isDark ? '1.5px solid #475569' : '1.5px solid #cbd5e1'),
                backgroundColor: checkedItems[item.code]
                  ? (isDark ? '#ffffff' : '#000000')
                  : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {checkedItems[item.code] && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={isDark ? '#000000' : '#ffffff'} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
            </div>
          )}
          {/* 원숫자 1번을 수량/평단가 앞에 위치시킴 */}
          {isDrawerOpen && activeMallTab === '보유' && idx === 0 && (
            <div style={{
              position: 'absolute',
              left: '1px',
              top: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '17px',
              height: '17px',
              borderRadius: '50%',
              backgroundColor: '#00c3a5',
              color: '#fff',
              fontSize: '11px',
              fontWeight: 'bold',
              zIndex: 12
            }}>1</div>
          )}

          {/* Col 1 */}
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '3px', minWidth: 0 }}>
            <span style={{
              fontSize: item.name.length > 12 ? '0.74rem' : '0.85rem',
              fontWeight: '600',
              color: isDark ? '#e2e8f0' : '#111111',
              letterSpacing: '-0.2px',
              wordBreak: 'break-all',
              whiteSpace: 'normal',
              lineHeight: '1.2'
            }}>{item.name}</span>
            {item.quantity !== undefined && item.avgPrice !== undefined && activeMallTab === '보유' && ownedDisplayOption === '평가금' && (
              <div style={{ display: 'flex', alignItems: 'center', marginTop: '1px' }}>
                <span style={{ fontSize: '0.72rem', color: isDark ? '#94a3b8' : '#555555' }}>
                  {item.quantity}주 · 내 평균 {item.avgPrice.toLocaleString()}원
                </span>
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap', fontSize: '0.72rem', color: isDark ? '#94a3b8' : '#888888' }}>
              <span>
                {item.limit.startsWith('투자한도') ? '투자한도 ' + item.limit.replace('투자한도', '') : item.limit}
              </span>
              <span>|</span>
              <span>
                {item.code}
              </span>
            </div>
          </div>

          {/* Col 2 & 3 Group */}
          {etfMallNavMode !== 'search' && !hidePriceInfo && (
            item.quantity !== undefined && item.avgPrice !== undefined && activeMallTab === '보유' && ownedDisplayOption === '평가금' ? (
              /* 평가금 선택 시 단일 그룹으로 이미지처럼 정보 표기 */
              (() => {
                const valuationAmount = item.quantity * item.price;
                const profitLoss = (item.price - item.avgPrice) * item.quantity;
                const returnRate = ((item.price - item.avgPrice) / item.avgPrice) * 100;
                const isProfit = profitLoss > 0;
                const isLoss = profitLoss < 0;
                const color = isProfit ? '#de201e' : (isLoss ? '#2366ca' : (isDark ? '#e2e8f0' : '#111111'));
                const sign = isProfit ? '+' : '';

                return (
                  <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                    {isDrawerOpen && activeMallTab === '보유' && idx === 0 && (
                      <div style={{
                        position: 'absolute',
                        left: '-24px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '17px',
                        height: '17px',
                        borderRadius: '50%',
                        backgroundColor: '#00c3a5',
                        color: '#fff',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        zIndex: 11
                      }}>3</div>
                    )}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '3px', flexShrink: 0 }}>
                      {/* 평가금액 */}
                      <span style={{
                        fontSize: '0.92rem',
                        fontWeight: '700',
                        color: isDark ? '#e2e8f0' : '#111111',
                        letterSpacing: '-0.3px'
                      }}>
                        {valuationAmount.toLocaleString()}원
                      </span>
                      {/* 수익률 및 평가손익 */}
                      <span style={{
                        fontSize: '0.74rem',
                        fontWeight: '600',
                        color: color,
                        letterSpacing: '-0.1px'
                      }}>
                        {sign}{returnRate.toFixed(2)}% ({sign}{profitLoss.toLocaleString()}원)
                      </span>
                    </div>
                  </div>
                );
              })()
            ) : (
              /* 기존 Col 2 & 3 Group */
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
                {/* Col 2 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                    {/* Row 1: Price and K Badge */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{
                        fontSize: '0.92rem',
                        fontWeight: '700',
                        color: item.positive ? '#de201e' : (item.pct === 0 ? (isDark ? '#e2e8f0' : '#111111') : '#2366ca'),
                        letterSpacing: '-0.3px'
                      }}>{item.price.toLocaleString()}</span>
                      {item.hasK !== false && (
                        <div style={{
                          width: '12px',
                          height: '12px',
                          border: isDark ? '1px solid #144b3e' : '1px solid #cce8e2',
                          backgroundColor: isDark ? '#0f2420' : '#f0f9f6',
                          color: isDark ? '#52c4a5' : '#007a5a',
                          fontSize: '8px',
                          fontWeight: '800',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '1px',
                          lineHeight: 1
                        }}>K</div>
                      )}
                    </div>
                    {/* Row 2: Volume and N Badge */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{
                        fontSize: '0.72rem',
                        color: isDark ? '#64748b' : '#888888',
                        letterSpacing: '-0.1px'
                      }}>
                        {(item.volume || 109760).toLocaleString()}
                      </span>
                      {item.hasN !== false && (
                        <div style={{
                          width: '12px',
                          height: '12px',
                          backgroundColor: '#d99a06',
                          color: '#ffffff',
                          fontSize: '8px',
                          fontWeight: '800',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '1px',
                          lineHeight: 1
                        }}>N</div>
                      )}
                    </div>
                  </div>

                  {/* Arrow next to badges */}
                  <span style={{
                    fontSize: '0.62rem',
                    color: item.positive ? '#de201e' : (item.pct === 0 ? 'transparent' : '#2366ca'),
                    marginRight: '2px',
                    flexShrink: 0
                  }}>
                    {item.positive ? '▲' : (item.pct === 0 ? '' : '▼')}
                  </span>
                </div>

                {/* Col 3 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '3px', flexShrink: 0 }}>
                  <span style={{
                    fontSize: '0.88rem',
                    fontWeight: '600',
                    color: item.positive ? '#de201e' : (item.pct === 0 ? (isDark ? '#64748b' : '#888888') : '#2366ca'),
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2px'
                  }}>
                    {absChange.toLocaleString()}
                  </span>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: item.positive ? '#de201e' : (item.pct === 0 ? (isDark ? '#64748b' : '#888888') : '#2366ca')
                  }}>{item.positive ? '+' : ''}{item.pct}%</span>
                </div>
              </div>
            )
          )}

          {/* Col 4 */}
          {etfMallNavMode !== 'search' && !hidePriceInfo && (
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <div 
                style={{ width: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0, cursor: 'pointer' }}
                onClick={(e) => {
                  e.stopPropagation();
                  setPendingFavoriteCode(item.code);
                  setIsFavoriteBsheetOpen(true);
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill={favorites.includes(item.code) ? '#f59e0b' : 'none'} stroke={favorites.includes(item.code) ? '#f59e0b' : '#888888'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              {isDrawerOpen && activeMallTab === '보유' && idx === 0 && (
                <div style={{
                  position: 'absolute',
                  left: '-18px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '17px',
                  height: '17px',
                  borderRadius: '50%',
                  backgroundColor: '#00c3a5',
                  color: '#fff',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  zIndex: 11
                }}>5</div>
              )}
            </div>
          )}
        </div>
      );
    });
  };

  const getCurrentlyDisplayedCodes = () => {
    if (searchQuery.trim() !== '') {
      return filterByChip(allList).map(item => item.code);
    } else {
      const list1 = filterByChip(recentViewedList.slice(0, 3));
      const list2 = filterByChip(allList);
      const combined = [...list1, ...list2];
      return [...new Set(combined.map(item => item.code))];
    }
  };

  const displayedCodes = getCurrentlyDisplayedCodes();
  const isAllChecked = displayedCodes.length > 0 && displayedCodes.every(code => checkedItems[code]);

  const toggleAll = () => {
    setCheckedItems(prev => {
      const next = { ...prev };
      if (isAllChecked) {
        displayedCodes.forEach(code => {
          next[code] = false;
        });
      } else {
        displayedCodes.forEach(code => {
          next[code] = true;
        });
      }
      return next;
    });
  };

  const recentCodes = filterByChip(recentViewedList.slice(0, 3)).map(item => item.code);
  const isRecentAllChecked = recentCodes.length > 0 && recentCodes.every(code => checkedItems[code]);
  const toggleRecentAll = () => {
    setCheckedItems(prev => {
      const next = { ...prev };
      if (isRecentAllChecked) {
        recentCodes.forEach(code => {
          next[code] = false;
        });
      } else {
        recentCodes.forEach(code => {
          next[code] = true;
        });
      }
      return next;
    });
  };

  const popularCodes = filterByChip(allList).map(item => item.code);
  const isPopularAllChecked = popularCodes.length > 0 && popularCodes.every(code => checkedItems[code]);
  const togglePopularAll = () => {
    setCheckedItems(prev => {
      const next = { ...prev };
      if (isPopularAllChecked) {
        popularCodes.forEach(code => {
          next[code] = false;
        });
      } else {
        popularCodes.forEach(code => {
          next[code] = true;
        });
      }
      return next;
    });
  };

  const selectedStocks = [...recentViewedList, ...allList].filter(
    (item, idx, self) => checkedItems[item.code] && self.findIndex(t => t.code === item.code) === idx
  );

  return (
    <div style={containerStyle} onClick={() => setShowKeyboard(false)}>
      {/* Galaxy S20 Central Punch-hole Camera */}
      <div style={{
        width: '8px',
        height: '8px',
        backgroundColor: '#000000',
        borderRadius: '50%',
        position: 'absolute',
        top: '12px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 999
      }} />

      {/* Phone Status Bar */}
      <div style={{
        height: '32px',
        padding: '0 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: isDark ? '#121826' : '#ffffff',
        color: isDark ? '#cbd5e1' : '#475569',
        fontSize: '0.75rem'
      }}>
        <span style={{ fontWeight: '700' }}>SKT 2:45</span>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.65rem', fontWeight: '800' }}>5G</span>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1px', height: '10px' }}>
            <div style={{ width: '2px', height: '3px', backgroundColor: isDark ? '#cbd5e1' : '#475569' }}></div>
            <div style={{ width: '2px', height: '5px', backgroundColor: isDark ? '#cbd5e1' : '#475569' }}></div>
            <div style={{ width: '2px', height: '7px', backgroundColor: isDark ? '#cbd5e1' : '#475569' }}></div>
            <div style={{ width: '2px', height: '9px', backgroundColor: isDark ? '#cbd5e1' : '#475569' }}></div>
          </div>
          <div style={{
            border: isDark ? '1px solid #cbd5e1' : '1px solid #475569',
            borderRadius: '3px',
            padding: '0px 3px',
            fontSize: '0.62rem',
            fontWeight: '900',
            height: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isDark ? '#cbd5e1' : '#475569',
            color: isDark ? '#0b0f19' : '#fff',
            lineHeight: 1
          }}>
            97
          </div>
        </div>
      </div>

      {/* Header */}
      <div style={headerStyle}>
        {etfMallNavMode === 'search' ? (
          <button 
            onClick={() => {
              setEtfMallNavMode('default');
              setActiveMallTab('전체');
            }}
            style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'inherit', position: 'relative', zIndex: 10 }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
        ) : (
          <button 
            onClick={() => setToBeSubScreen('menu')}
            style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'inherit', position: 'relative', zIndex: 10 }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        )}
        <span style={{ fontWeight: '700', fontSize: '1.15rem', flex: 1, textAlign: 'center', pointerEvents: 'none' }}>
          {etfMallNavMode === 'search' ? '종목검색' : 'ETF/리츠 몰'}
        </span>
        <div style={{ width: '22px' }} />
      </div>

      {/* Horizontal Tabs Menu */}
      {etfMallNavMode !== 'search' && (
        <div style={menuTabsStyle}>
          {['추천', '보유', 'GO배당GO금리', 'TDF', '전체'].map((tab) => (
            <span 
              key={tab} 
              onClick={() => {
                setActiveMallTab(tab);
                if (tab !== '전체') {
                  setSelectedChip('전체');
                }
              }}
              style={{ ...menuTabItemStyle(activeMallTab === tab), position: 'relative' }}
            >
              {tab}
              {tab === '추천' && activeMallTab === '추천' && isDrawerOpen && (
                <div style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-10px',
                  width: '17px',
                  height: '17px',
                  borderRadius: '50%',
                  backgroundColor: '#00c3a5',
                  color: '#ffffff',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
                  zIndex: 15
                }}>1</div>
              )}
            </span>
          ))}
        </div>
      )}

      {/* Search Input Filter Row with Chips (from Stock Search screen) */}
      {(etfMallNavMode === 'search' || activeMallTab === '전체') && (
        <div style={{ 
          padding: '10px 14px 4px 14px', 
          borderBottom: 'none', 
          backgroundColor: isDark ? '#0b0f19' : '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <div 
            onClick={(e) => {
              e.stopPropagation();
              if (etfMallNavMode !== 'search') {
                setEtfMallNavMode('search');
                setActiveMallTab('전체');
              }
              setShowKeyboard(true);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              border: isDark ? '1px solid #334155' : '1px solid #d1d5db',
              borderRadius: '8px',
              padding: '0 12px',
              height: '38px',
              gap: '8px',
              backgroundColor: isDark ? '#121826' : '#ffffff',
              cursor: 'pointer'
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#888888" strokeWidth="2.5" style={{ flexShrink: 0 }}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            <input 
              type="text"
              placeholder="종목명, 종목코드, 초성입력"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClick={(e) => {
                e.stopPropagation();
                if (etfMallNavMode !== 'search') {
                  setEtfMallNavMode('search');
                  setActiveMallTab('전체');
                }
                setShowKeyboard(true);
              }}
              onFocus={(e) => {
                e.stopPropagation();
                if (etfMallNavMode !== 'search') {
                  setEtfMallNavMode('search');
                  setActiveMallTab('전체');
                }
                setShowKeyboard(true);
              }}
              style={{
                border: 'none',
                background: 'none',
                width: '100%',
                outline: 'none',
                fontSize: '0.82rem',
                color: isDark ? '#ffffff' : '#222222'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  border: 'none',
                  background: 'none',
                  color: isDark ? '#94a3b8' : '#888888',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  padding: '4px 0px 4px 8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter Chips Row */}
          {activeMallTab === '전체' && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
              <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', scrollbarWidth: 'none', flex: 1 }}>
                {['전체', 'ETF', 'ETN', '리츠'].map((chip) => {
                  const isSelected = selectedChip === chip;
                  return (
                    <span
                      key={chip}
                      onClick={() => setSelectedChip(chip)}
                      style={{
                        padding: '9px 18px',
                        borderRadius: '24px',
                        fontSize: '0.78rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        backgroundColor: isSelected 
                          ? (isDark ? '#334155' : '#e0e0e0') 
                          : (isDark ? '#1e293b' : '#f1f1f1'),
                        color: isSelected 
                          ? (isDark ? '#ffffff' : '#111111') 
                          : (isDark ? '#94a3b8' : '#666666'),
                        whiteSpace: 'nowrap',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {chip}
                    </span>
                  );
                })}
              </div>
              {selectedStocks.length > 0 && etfMallNavMode === 'default' && (
                <button
                  onClick={() => setCheckedItems({})}
                  style={{
                    border: 'none',
                    background: 'none',
                    padding: '4px 6px',
                    fontSize: '0.74rem',
                    fontWeight: '600',
                    color: isDark ? '#94a3b8' : '#666666',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    whiteSpace: 'nowrap',
                    outline: 'none'
                  }}
                >
                  초기화
                </button>
              )}
            </div>
          )}
        </div>
      )}      {/* Ranking and List Area */}
      <div style={{ ...rankingSectionStyle, padding: '0 0 ' + (etfMallNavMode === 'search' ? '60px' : '0') + ' 0' }}>
        {activeMallTab === '추천' && (
          <>
            {/* Section Title + Tabs */}
            {etfMallNavMode !== 'search' && (
              <div style={{ padding: '14px 14px 0 14px' }}>
                {/* Title */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ fontSize: '1.12rem', fontWeight: '600', color: isDark ? '#ffffff' : '#111111', letterSpacing: '-0.3px' }}>퇴직연금 ETF 순위</span>
                  <div 
                    onClick={() => setIsBottomSheetOpen(true)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.76rem',
                      fontWeight: '600',
                      color: isDark ? '#94a3b8' : '#555555',
                      cursor: 'pointer',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      backgroundColor: isDark ? '#1e293b' : '#f8fafc',
                      border: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
                      userSelect: 'none'
                    }}
                  >
                    <span>{sortOption}</span>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '1px' }}><polyline points="6 9 12 15 18 9" /></svg>
                  </div>
                </div>

                {/* 거래 고객순 / 거래 금액순 Tabs */}
                <div style={{ display: 'flex', borderBottom: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0' }}>
                  {['수익률', '거래량', '거래대금'].map((tab) => {
                    const isActive = tab === '수익률';
                    return (
                      <span key={tab} style={{
                        padding: '8px 0',
                        marginRight: '20px',
                        fontSize: '0.88rem',
                        fontWeight: isActive ? '700' : '400',
                        color: isActive ? (isDark ? '#ffffff' : '#111111') : (isDark ? '#64748b' : '#999999'),
                        borderBottom: isActive ? (isDark ? '2.5px solid #ffffff' : '2.5px solid #111111') : '2.5px solid transparent',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                      }}>{tab}</span>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ETF Ranked List */}
            <div>
              {filterByChip([
                { rank: 1, name: 'RISE 삼성전자SK하이닉스채권혼합50', code: 'A0189Z0', limit: '투자한도100%', price: 14550, pct: 1.76,  positive: true, hasK: true, hasN: true  },
                { rank: 2, name: 'SOL AI반도체TOP2플러스',             code: 'A0207Z0', limit: '투자한도70%',  price: 12840, pct: 2.56,  positive: true, hasK: true, hasN: false },
                { rank: 3, name: 'TIGER 미국S&P500',                   code: 'A0191B0', limit: '투자한도70%',  price: 28165, pct: -0.32, positive: false, hasK: false, hasN: true },
                { rank: 4, name: 'TIGER 미국우주테크',                  code: 'A0185L0', limit: '투자한도70%',  price: 11730, pct: -5.17, positive: false, hasK: false, hasN: false },
                { rank: 5, name: 'TIGER 반도체TOP10',                   code: 'A0199C0', limit: '투자한도100%', price: 9850,  pct: 1.28,  positive: true, hasK: true, hasN: true }
              ]).length === 0 ? renderEmptyState() : filterByChip([
                { rank: 1, name: 'RISE 삼성전자SK하이닉스채권혼합50', code: 'A0189Z0', limit: '투자한도100%', price: 14550, pct: 1.76,  positive: true, hasK: true, hasN: true  },
                { rank: 2, name: 'SOL AI반도체TOP2플러스',             code: 'A0207Z0', limit: '투자한도70%',  price: 12840, pct: 2.56,  positive: true, hasK: true, hasN: false },
                { rank: 3, name: 'TIGER 미국S&P500',                   code: 'A0191B0', limit: '투자한도70%',  price: 28165, pct: -0.32, positive: false, hasK: false, hasN: true },
                { rank: 4, name: 'TIGER 미국우주테크',                  code: 'A0185L0', limit: '투자한도70%',  price: 11730, pct: -5.17, positive: false, hasK: false, hasN: false },
                { rank: 5, name: 'TIGER 반도체TOP10',                   code: 'A0199C0', limit: '투자한도100%', price: 9850,  pct: 1.28,  positive: true, hasK: true, hasN: true }
              ]).map((item, idx, arr) => {
                const absChange = Math.round(item.price * (Math.abs(item.pct) / 100));
                return (
                  <div key={idx} 
                    onClick={() => {
                      setToBePrevSubScreen('etfMall');
                      setToBeSubScreen('tigerDetail');
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '12px 10px 12px 14px',
                      borderBottom: idx < arr.length - 1 ? (isDark ? '1px solid #1e293b' : '1px solid #f1f5f9') : 'none',
                      cursor: 'pointer',
                      gap: '10px'
                    }}>
                    {/* Rank number */}
                    {etfMallNavMode !== 'search' && (
                      <span style={{
                        fontSize: '1.05rem',
                        fontWeight: '800',
                        fontStyle: 'italic',
                        color: isDark ? '#ffffff' : '#111111',
                        width: '18px',
                        flexShrink: 0
                      }}>{item.rank}</span>
                    )}

                    {/* Left: ETF Name + subtitle */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3px', minWidth: 0 }}>
                      {/* ETF Name only */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0, flexWrap: 'wrap' }}>
                        <span style={{
                          fontSize: item.name.length > 12 ? '0.74rem' : '0.85rem',
                          fontWeight: '600',
                          color: isDark ? '#e2e8f0' : '#111111',
                          letterSpacing: '-0.2px',
                          wordBreak: 'break-all',
                          whiteSpace: 'normal',
                          lineHeight: '1.2',
                          flex: 1,
                          minWidth: 0
                        }}>{item.name}</span>
                        {item.rank === 1 && isDrawerOpen && etfMallNavMode !== 'search' && (
                          <div style={{
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            backgroundColor: '#00c3a5',
                            color: '#ffffff',
                            fontSize: '11px',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
                            flexShrink: 0
                          }}>2</div>
                        )}
                        {item.rank === 3 && isDrawerOpen && etfMallNavMode !== 'search' && (
                          <div style={{
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            backgroundColor: '#00c3a5',
                            color: '#ffffff',
                            fontSize: '11px',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
                            flexShrink: 0
                          }}>3</div>
                        )}
                      </div>
                      {/* 투자한도 + code + 구분 (matches style of renderStockList) */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
                        <span style={{ fontSize: '0.72rem', fontWeight: '500', color: '#3b82f6', flexShrink: 0 }}>
                          {item.limit.startsWith('투자한도') ? '투자한도 ' + item.limit.replace('투자한도', '') : item.limit}
                        </span>
                        <span style={{ width: '1px', height: '10px', backgroundColor: isDark ? '#334155' : '#d1d5db', flexShrink: 0 }} />
                        <span style={{ fontSize: '0.72rem', color: isDark ? '#64748b' : '#888888', whiteSpace: 'nowrap', flexShrink: 0 }}>
                          {item.code}
                        </span>
                      </div>
                    </div>

                    {/* Right side aligned to renderStockList layout */}
                    {etfMallNavMode !== 'search' && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
                        {/* Col 2 */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '3px' }}>
                            <span style={{
                              fontSize: '0.92rem',
                              fontWeight: '700',
                              color: item.positive ? '#de201e' : (item.pct === 0 ? (isDark ? '#e2e8f0' : '#111111') : '#2366ca'),
                              letterSpacing: '-0.3px'
                            }}>{item.price.toLocaleString()}</span>
                            <span style={{
                              fontSize: '0.72rem',
                              color: isDark ? '#64748b' : '#888888',
                              letterSpacing: '-0.1px'
                            }}>
                              {(item.volume || 109760).toLocaleString()}
                            </span>
                          </div>
                          
                          {/* K / N Stack */}
                          {(item.hasK !== false || item.hasN !== false) && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flexShrink: 0 }}>
                              {item.hasK !== false && (
                                <div style={{
                                  width: '12px',
                                  height: '12px',
                                  border: isDark ? '1px solid #144b3e' : '1px solid #cce8e2',
                                  backgroundColor: isDark ? '#0f2420' : '#f0f9f6',
                                  color: isDark ? '#52c4a5' : '#007a5a',
                                  fontSize: '8px',
                                  fontWeight: '800',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  borderRadius: '1px',
                                  lineHeight: 1
                                }}>K</div>
                              )}
                              {item.hasN !== false && (
                                <div style={{
                                  width: '12px',
                                  height: '12px',
                                  backgroundColor: '#d99a06',
                                  color: '#ffffff',
                                  fontSize: '8px',
                                  fontWeight: '800',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  borderRadius: '1px',
                                  lineHeight: 1
                                }}>N</div>
                              )}
                            </div>
                          )}

                          {/* Arrow next to badges */}
                          <span style={{
                            fontSize: '0.62rem',
                            color: item.positive ? '#de201e' : (item.pct === 0 ? 'transparent' : '#2366ca'),
                            marginLeft: '2px',
                            flexShrink: 0
                          }}>
                            {item.positive ? '▲' : (item.pct === 0 ? '' : '▼')}
                          </span>
                        </div>

                        {/* Col 3 */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '3px', flexShrink: 0 }}>
                          <span style={{
                            fontSize: '0.88rem',
                            fontWeight: '600',
                            color: item.positive ? '#de201e' : (item.pct === 0 ? (isDark ? '#64748b' : '#888888') : '#2366ca'),
                            display: 'flex',
                            alignItems: 'center',
                            gap: '2px'
                          }}>
                            {absChange.toLocaleString()}
                          </span>
                          <span style={{
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            color: item.positive ? '#de201e' : (item.pct === 0 ? (isDark ? '#64748b' : '#888888') : '#2366ca')
                          }}>{item.positive ? '+' : ''}{item.pct}%</span>
                        </div>
                      </div>
                    )}

                    {/* Col 4: Favorite star icon */}
                    {etfMallNavMode !== 'search' && (
                      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', marginLeft: '6px' }}>
                        <div 
                          style={{ width: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0, cursor: 'pointer' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setPendingFavoriteCode(item.code);
                            setIsFavoriteBsheetOpen(true);
                          }}
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill={favorites.includes(item.code) ? '#f59e0b' : 'none'} stroke={favorites.includes(item.code) ? '#f59e0b' : '#888888'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Grey Bar Separator */}
            {etfMallNavMode !== 'search' && (
              <div style={{
                height: '8px',
                backgroundColor: isDark ? '#121826' : '#f1f5f9',
                flexShrink: 0
              }} />
            )}

            {/* GO배당GO금리 퇴직연금 ETF Section */}
            <div style={{ padding: etfMallNavMode === 'search' ? '0' : '16px 0 0 0', backgroundColor: isDark ? '#0b0f19' : '#ffffff' }}>
              {etfMallNavMode !== 'search' && (
                <div style={{ padding: '0 14px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '1.12rem', fontWeight: '600', color: isDark ? '#ffffff' : '#111111', letterSpacing: '-0.3px' }}>GO배당GO금리</span>
                </div>
              )}
              <div>
                {filterByChip(goDividendList).length === 0 ? renderEmptyState() : filterByChip(goDividendList).map((item, idx, arr) => {
                  const absChange = Math.round(item.price * (Math.abs(item.pct) / 100));
                  return (
                    <div key={idx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '12px 10px 12px 14px',
                      borderBottom: idx < arr.length - 1 ? (isDark ? '1px solid #1e293b' : '1px solid #f1f5f9') : 'none',
                      cursor: 'pointer',
                      gap: '10px'
                    }}>
                      {/* Left: ETF Name + subtitle */}
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3px', minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0, flexWrap: 'wrap' }}>
                          <span style={{
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            color: isDark ? '#e2e8f0' : '#111111',
                            letterSpacing: '-0.2px',
                            wordBreak: 'break-all',
                            whiteSpace: 'normal',
                            lineHeight: '1.2',
                            flex: 1,
                            minWidth: 0
                          }}>{item.name}</span>
                        </div>
                        {/* 투자한도 + code */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
                          <span style={{
                            fontSize: '0.72rem',
                            fontWeight: '500',
                            color: '#3b82f6',
                            letterSpacing: '-0.1px',
                            flexShrink: 0
                          }}>
                            {item.limit.startsWith('투자한도') ? '투자한도 ' + item.limit.replace('투자한도', '') : item.limit}
                          </span>
                          <span style={{ width: '1px', height: '10px', backgroundColor: isDark ? '#334155' : '#d1d5db', flexShrink: 0 }} />
                          <span style={{
                            fontSize: '0.72rem',
                            color: isDark ? '#64748b' : '#888888',
                            letterSpacing: '-0.1px',
                            whiteSpace: 'nowrap',
                            flexShrink: 0
                          }}>{item.code}</span>
                        </div>
                      </div>

                      {/* Right side aligned to renderStockList layout */}
                      {etfMallNavMode !== 'search' && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
                          {/* Col 2 */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '3px' }}>
                              <span style={{
                                fontSize: '0.92rem',
                                fontWeight: '700',
                                color: item.positive ? '#de201e' : (item.pct === 0 ? (isDark ? '#e2e8f0' : '#111111') : '#2366ca'),
                                letterSpacing: '-0.3px'
                              }}>{item.price.toLocaleString()}</span>
                              <span style={{
                                fontSize: '0.72rem',
                                color: isDark ? '#64748b' : '#888888',
                                letterSpacing: '-0.1px'
                              }}>
                                {(item.volume || 109760).toLocaleString()}
                              </span>
                            </div>
                            
                            {/* K / N Stack */}
                            {(item.hasK !== false || item.hasN !== false) && (
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flexShrink: 0 }}>
                                {item.hasK !== false && (
                                  <div style={{
                                    width: '12px',
                                    height: '12px',
                                    border: isDark ? '1px solid #144b3e' : '1px solid #cce8e2',
                                    backgroundColor: isDark ? '#0f2420' : '#f0f9f6',
                                    color: isDark ? '#52c4a5' : '#007a5a',
                                    fontSize: '8px',
                                    fontWeight: '800',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '1px',
                                    lineHeight: 1
                                  }}>K</div>
                                )}
                                {item.hasN !== false && (
                                  <div style={{
                                    width: '12px',
                                    height: '12px',
                                    backgroundColor: '#d99a06',
                                    color: '#ffffff',
                                    fontSize: '8px',
                                    fontWeight: '800',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '1px',
                                    lineHeight: 1
                                  }}>N</div>
                                )}
                              </div>
                            )}

                            {/* Arrow next to badges */}
                            <span style={{
                              fontSize: '0.62rem',
                              color: item.positive ? '#de201e' : (item.pct === 0 ? 'transparent' : '#2366ca'),
                              marginLeft: '2px',
                              flexShrink: 0
                            }}>
                              {item.positive ? '▲' : (item.pct === 0 ? '' : '▼')}
                            </span>
                          </div>

                          {/* Col 3 */}
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '3px', flexShrink: 0 }}>
                            <span style={{
                              fontSize: '0.88rem',
                              fontWeight: '600',
                              color: item.positive ? '#de201e' : (item.pct === 0 ? (isDark ? '#64748b' : '#888888') : '#2366ca'),
                              display: 'flex',
                              alignItems: 'center',
                              gap: '2px'
                            }}>
                              {absChange.toLocaleString()}
                            </span>
                            <span style={{
                              fontSize: '0.75rem',
                              fontWeight: '600',
                              color: item.positive ? '#de201e' : (item.pct === 0 ? (isDark ? '#64748b' : '#888888') : '#2366ca')
                            }}>{item.positive ? '+' : ''}{item.pct}%</span>
                          </div>
                        </div>
                      )}

                      {/* Col 4: Favorite star icon */}
                      {etfMallNavMode !== 'search' && (
                        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', marginLeft: '6px' }}>
                          <div 
                            style={{ width: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0, cursor: 'pointer' }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setPendingFavoriteCode(item.code);
                              setIsFavoriteBsheetOpen(true);
                            }}
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill={favorites.includes(item.code) ? '#f59e0b' : 'none'} stroke={favorites.includes(item.code) ? '#f59e0b' : '#888888'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* 보유 Tab View */}
        {activeMallTab === '보유' && (
          <div style={{ padding: '0px 0' }}>
            {/* 정렬 & 옵션 선택 Row */}
            {etfMallNavMode !== 'search' && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 12px 8px 12px',
                backgroundColor: isDark ? '#0b0f19' : '#ffffff',
                borderBottom: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0',
                position: 'sticky',
                top: 0,
                zIndex: 10
              }}>
                {/* 수익률 정렬 Dropdown */}
                <div 
                  onClick={() => setIsOwnedSortBsheetOpen(true)}
                  style={{
                    flex: 1, 
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: isDark ? '#1e293b' : '#ffffff',
                    border: isDark ? '1px solid #334155' : '1px solid #cccccc',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    fontWeight: '500',
                    color: isDark ? '#e2e8f0' : '#111111',
                    padding: '0 24px 0 10px',
                    cursor: 'pointer',
                    height: '30px',
                    boxSizing: 'border-box'
                  }}
                >
                  <span>{ownedSortOption}</span>
                  <span style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: '0.55rem',
                    pointerEvents: 'none',
                    color: isDark ? '#94a3b8' : '#777777'
                  }}>▼</span>
                  {isDrawerOpen && activeMallTab === '보유' && (
                    <div style={{
                      position: 'absolute',
                      right: '25px',
                      top: '-10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '17px',
                      height: '17px',
                      borderRadius: '50%',
                      backgroundColor: '#00c3a5',
                      color: '#fff',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      zIndex: 11
                    }}>2</div>
                  )}
                </div>

                {/* 평가금 / 현재가 Toggle Button Group */}
                <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                  <div style={{
                    display: 'flex',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    border: isDark ? '1px solid #334155' : '1px solid #cccccc',
                    height: '30px'
                  }}>
                    <button
                      onClick={() => setOwnedDisplayOption('평가금')}
                      style={{
                        border: 'none',
                        padding: '0 12px',
                        fontSize: '0.78rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        backgroundColor: ownedDisplayOption === '평가금' 
                          ? (isDark ? '#475569' : '#555e69') 
                          : (isDark ? '#1e293b' : '#ffffff'),
                        color: ownedDisplayOption === '평가금' 
                          ? '#ffffff' 
                          : (isDark ? '#94a3b8' : '#777777'),
                        transition: 'all 0.2s',
                        outline: 'none'
                      }}
                    >
                      평가금
                    </button>
                    <button
                      onClick={() => setOwnedDisplayOption('현재가')}
                      style={{
                        border: 'none',
                        borderLeft: isDark ? '1px solid #334155' : '1px solid #cccccc',
                        padding: '0 12px',
                        fontSize: '0.78rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        backgroundColor: ownedDisplayOption === '현재가' 
                          ? (isDark ? '#475569' : '#555e69') 
                          : (isDark ? '#1e293b' : '#ffffff'),
                        color: ownedDisplayOption === '현재가' 
                          ? '#ffffff' 
                          : (isDark ? '#94a3b8' : '#777777'),
                        transition: 'all 0.2s',
                        outline: 'none'
                      }}
                    >
                      현재가
                    </button>
                  </div>
                  {isDrawerOpen && activeMallTab === '보유' && (
                    <>
                      {/* 평가금 버튼용 배지 3 */}
                      <div style={{
                        position: 'absolute',
                        left: '16px',
                        top: '-10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '17px',
                        height: '17px',
                        borderRadius: '50%',
                        backgroundColor: '#00c3a5',
                        color: '#fff',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        zIndex: 11
                      }}>3</div>
                      {/* 현재가 버튼용 배지 4 */}
                      <div style={{
                        position: 'absolute',
                        right: '16px',
                        top: '-10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '17px',
                        height: '17px',
                        borderRadius: '50%',
                        backgroundColor: '#00c3a5',
                        color: '#fff',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        zIndex: 11
                      }}>4</div>
                    </>
                  )}
                </div>
              </div>
            )}

            <div>
              {renderStockList(recentViewedOwnedList.slice(0, 3))}
            </div>

            <div>
              {renderStockList(getSortedOwnedList())}
            </div>
          </div>
        )}

        {/* GO배당GO금리 Tab View */}
        {activeMallTab === 'GO배당GO금리' && (
          <div style={{ padding: '0px 0' }}>
            <div>
              {renderStockList(goDividendList)}
            </div>
          </div>
        )}

        {/* TDF Tab View */}
        {activeMallTab === 'TDF' && (
          <div style={{ padding: '0px 0' }}>
            <div>
              {renderStockList(recentViewedTdfList.slice(0, 3))}
            </div>

            <div>
              {renderStockList(tdfList)}
            </div>
          </div>
        )}

        {/* 전체 Tab View */}
        {activeMallTab === '전체' && (
          <div style={{ padding: '0px 0' }}>
            {etfMallNavMode === 'default' && selectedStocks.length > 0 && selectedChip === '전체' && (
              <>
                {/* 검색한 종목 Section */}
                <div style={sectionHeaderStyle}>
                  검색한 종목
                </div>
                <div>
                  {renderStockList(selectedStocks)}
                </div>
              </>
            )}

            {(searchQuery.trim() !== '' || selectedChip !== '전체') ? (
              <div>
                {selectedChip === 'ETF' && (
                  <div style={sectionHeaderStyle}>시가총액 순</div>
                )}
                {selectedChip === 'ETN' && (
                  <div style={sectionHeaderStyle}>시가총액 순</div>
                )}
                {selectedChip === '리츠' && (
                  <div style={sectionHeaderStyle}>종목명 순</div>
                )}
                {etfMallNavMode === 'search' && (
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleAll();
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 14px 4px 14px',
                      cursor: 'pointer',
                      userSelect: 'none',
                      backgroundColor: isDark ? '#0b0f19' : '#ffffff',
                      borderBottom: isDark ? '1px solid #1e293b' : '1px solid #f1f5f9'
                    }}
                  >
                    <div style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '4px',
                      border: isAllChecked
                        ? (isDark ? '1.5px solid #ffffff' : '1.5px solid #000000')
                        : (isDark ? '1.5px solid #475569' : '1.5px solid #cbd5e1'),
                      backgroundColor: isAllChecked
                        ? (isDark ? '#ffffff' : '#000000')
                        : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {isAllChecked && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={isDark ? '#000000' : '#ffffff'} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                    <span style={{ fontSize: '0.82rem', fontWeight: '600', color: isDark ? '#ffffff' : '#111111' }}>전체</span>
                  </div>
                )}
                {renderStockList(allList, false)}
              </div>
            ) : (
              <>
                {/* 최근 본 종목 Section */}
                <div style={sectionHeaderStyle}>
                  최근 본 종목
                </div>
                {etfMallNavMode === 'search' && (
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleRecentAll();
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 14px 4px 14px',
                      cursor: 'pointer',
                      userSelect: 'none',
                      backgroundColor: isDark ? '#0b0f19' : '#ffffff',
                      borderBottom: isDark ? '1px solid #1e293b' : '1px solid #f1f5f9'
                    }}
                  >
                    <div style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '4px',
                      border: isRecentAllChecked
                        ? (isDark ? '1.5px solid #ffffff' : '1.5px solid #000000')
                        : (isDark ? '1.5px solid #475569' : '1.5px solid #cbd5e1'),
                      backgroundColor: isRecentAllChecked
                        ? (isDark ? '#ffffff' : '#000000')
                        : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {isRecentAllChecked && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={isDark ? '#000000' : '#ffffff'} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                    <span style={{ fontSize: '0.82rem', fontWeight: '600', color: isDark ? '#ffffff' : '#111111' }}>전체</span>
                  </div>
                )}
                <div>
                  {renderStockList(recentViewedList.slice(0, 3))}
                </div>

                {/* 인기 종목 Section */}
                <div style={sectionHeaderStyle}>
                  인기 종목
                </div>
                {etfMallNavMode === 'search' && (
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePopularAll();
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 14px 4px 14px',
                      cursor: 'pointer',
                      userSelect: 'none',
                      backgroundColor: isDark ? '#0b0f19' : '#ffffff',
                      borderBottom: isDark ? '1px solid #1e293b' : '1px solid #f1f5f9'
                    }}
                  >
                    <div style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '4px',
                      border: isPopularAllChecked
                        ? (isDark ? '1.5px solid #ffffff' : '1.5px solid #000000')
                        : (isDark ? '1.5px solid #475569' : '1.5px solid #cbd5e1'),
                      backgroundColor: isPopularAllChecked
                        ? (isDark ? '#ffffff' : '#000000')
                        : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {isPopularAllChecked && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={isDark ? '#000000' : '#ffffff'} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                    <span style={{ fontSize: '0.82rem', fontWeight: '600', color: isDark ? '#ffffff' : '#111111' }}>전체</span>
                  </div>
                )}
                <div>
                  {renderStockList(allList)}
                </div>
              </>
            )}
          </div>
        )}
      </div>



      {/* 보유 탭 정렬 바텀시트 */}
      {isOwnedSortBsheetOpen && (
        <>
          {/* Backdrop */}
          <div 
            onClick={() => setIsOwnedSortBsheetOpen(false)}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 9999,
              backdropFilter: 'blur(1px)'
            }}
          />
          {/* Bottom Sheet Menu */}
          <div style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: isDark ? '#1e293b' : '#ffffff',
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
            padding: '24px 20px 24px 20px',
            zIndex: 10000,
            boxShadow: '0 -4px 20px rgba(0,0,0,0.15)',
            boxSizing: 'border-box',
            animation: 'ownedSlideUp 0.22s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
            <style>{`
              @keyframes ownedSlideUp {
                from { transform: translateY(100%); }
                to { transform: translateY(0); }
              }
            `}</style>
            <div style={{
              fontSize: '1.05rem',
              fontWeight: '700',
              color: isDark ? '#ffffff' : '#111111',
              marginBottom: '18px',
              letterSpacing: '-0.3px'
            }}>
              정렬 기준 선택
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {[
                '수익률 높은 순',
                '등락률 높은 순',
                '평가금 많은 순',
                '거래량 많은 순'
              ].map((option) => {
                const isSelected = ownedSortOption === option;
                return (
                  <div
                    key={option}
                    onClick={() => {
                      setOwnedSortOption(option);
                      setIsOwnedSortBsheetOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '14px 0',
                      borderBottom: isDark ? '1px solid #334155' : '1px solid #f1f5f9',
                      cursor: 'pointer',
                      color: isSelected ? (isDark ? '#ffffff' : '#000000') : (isDark ? '#94a3b8' : '#777777'),
                      fontWeight: isSelected ? '700' : '400',
                      fontSize: '0.9rem'
                    }}
                  >
                    <span>{option}</span>
                    {isSelected && (
                      <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>✓</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* 관심종목 추가 바텀시트 */}
      {isFavoriteBsheetOpen && (
        <>
          {/* Backdrop */}
          <div 
            onClick={() => setIsFavoriteBsheetOpen(false)}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 9999,
              backdropFilter: 'blur(1px)'
            }}
          />
          {/* Bottom Sheet Menu */}
          <div style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: isDark ? '#1e293b' : '#ffffff',
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
            padding: '24px 20px 24px 20px',
            zIndex: 10000,
            boxShadow: '0 -4px 20px rgba(0,0,0,0.15)',
            boxSizing: 'border-box',
            animation: 'favSlideUp 0.22s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
            <style>{`
              @keyframes favSlideUp {
                from { transform: translateY(100%); }
                to { transform: translateY(0); }
              }
            `}</style>
            
            {/* Title */}
            <div style={{
              fontSize: '1.05rem',
              fontWeight: '700',
              color: isDark ? '#ffffff' : '#111111',
              marginBottom: '18px',
              letterSpacing: '-0.3px'
            }}>
              관심종목 추가
            </div>

            {/* 그룹1 선택 Row */}
            <div 
              onClick={() => {
                if (pendingFavoriteCode) {
                  toggleFavorite(pendingFavoriteCode);
                }
                setIsFavoriteBsheetOpen(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 0',
                cursor: 'pointer',
                borderBottom: isDark ? '1px solid #334155' : '1px solid #f1f5f9'
              }}
            >
              <span style={{ fontSize: '0.95rem', fontWeight: '600', color: isDark ? '#ffffff' : '#222222' }}>그룹1</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.85rem', color: isDark ? '#94a3b8' : '#777777' }}>
                  {favorites.length} 종목
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
            </div>

            {/* 추가할 위치 선택 Section */}
            <div style={{ marginTop: '20px' }}>
              <div style={{
                fontSize: '0.95rem',
                fontWeight: '700',
                color: isDark ? '#ffffff' : '#111111',
                marginBottom: '14px',
                letterSpacing: '-0.3px'
              }}>
                추가할 위치 선택
              </div>
              <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                {/* 맨 아래 추가 */}
                <div 
                  onClick={() => setFavoritePosition('bottom')}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                >
                  <div style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    border: favoritePosition === 'bottom' 
                      ? (isDark ? '5px solid #3b82f6' : '5px solid #111111') 
                      : (isDark ? '2px solid #475569' : '2px solid #cccccc'),
                    boxSizing: 'border-box'
                  }} />
                  <span style={{ fontSize: '0.85rem', fontWeight: '500', color: isDark ? '#cbd5e1' : '#333333' }}>맨 아래 추가</span>
                </div>

                {/* 맨 위에 추가 */}
                <div 
                  onClick={() => setFavoritePosition('top')}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                >
                  <div style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    border: favoritePosition === 'top' 
                      ? (isDark ? '5px solid #3b82f6' : '5px solid #111111') 
                      : (isDark ? '2px solid #475569' : '2px solid #cccccc'),
                    boxSizing: 'border-box'
                  }} />
                  <span style={{ fontSize: '0.85rem', fontWeight: '500', color: isDark ? '#cbd5e1' : '#333333' }}>맨 위에 추가</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* 1주일/1개월 등 기간 정렬 바텀시트 */}
      {isBottomSheetOpen && (
        <>
          {/* Backdrop */}
          <div 
            onClick={() => setIsBottomSheetOpen(false)}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 9999,
              backdropFilter: 'blur(1px)'
            }}
          />
          {/* Bottom Sheet Menu */}
          <div style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: isDark ? '#1e293b' : '#ffffff',
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
            padding: '24px 20px 24px 20px',
            zIndex: 10000,
            boxShadow: '0 -4px 20px rgba(0,0,0,0.15)',
            boxSizing: 'border-box',
            animation: 'sortSlideUp 0.22s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
            <style>{`
              @keyframes sortSlideUp {
                from { transform: translateY(100%); }
                to { transform: translateY(0); }
              }
            `}</style>
            <div style={{
              fontSize: '1.05rem',
              fontWeight: '700',
              color: isDark ? '#ffffff' : '#111111',
              marginBottom: '18px',
              letterSpacing: '-0.3px'
            }}>
              조회 기간
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {[
                '1주일',
                '1개월',
                '3개월',
                '6개월',
                '1년'
              ].map((option) => {
                const isSelected = sortOption === option;
                return (
                  <div
                    key={option}
                    onClick={() => {
                      setSortOption(option);
                      setIsBottomSheetOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '14px 0',
                      borderBottom: isDark ? '1px solid #334155' : '1px solid #f1f5f9',
                      cursor: 'pointer',
                      color: isSelected ? (isDark ? '#ffffff' : '#000000') : (isDark ? '#94a3b8' : '#777777'),
                      fontWeight: isSelected ? '700' : '400',
                      fontSize: '0.9rem'
                    }}
                  >
                    <span>{option}</span>
                    {isSelected && (
                      <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>✓</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
      {/* Virtual Korean Keyboard */}
      {showKeyboard && (
        <div 
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: isDark ? '#151b26' : '#d2d5db',
            padding: '8px 4px 10px 4px',
            borderTop: isDark ? '1px solid #2d3748' : '1px solid #acafb5',
            zIndex: 10005,
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            boxShadow: '0 -4px 15px rgba(0, 0, 0, 0.15)',
            boxSizing: 'border-box'
          }}
        >
          {/* Row 1 */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '4px' }}>
            {['ㅂ', 'ㅈ', 'ㄷ', 'ㄱ', 'ㅅ', 'ㅛ', 'ㅕ', 'ㅑ', 'ㅐ', 'ㅔ'].map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setSearchQuery(prev => prev + key)}
                style={{
                  flex: 1,
                  height: '42px',
                  borderRadius: '5px',
                  border: 'none',
                  backgroundColor: isDark ? '#2a3547' : '#ffffff',
                  color: isDark ? '#ffffff' : '#000000',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                  outline: 'none'
                }}
              >
                {key}
              </button>
            ))}
          </div>

          {/* Row 2 */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', padding: '0 10px' }}>
            {['ㅁ', 'ㄴ', 'ㅇ', 'ㄹ', 'ㅎ', 'ㅗ', 'ㅓ', 'ㅏ', 'ㅣ'].map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setSearchQuery(prev => prev + key)}
                style={{
                  flex: 1,
                  height: '42px',
                  borderRadius: '5px',
                  border: 'none',
                  backgroundColor: isDark ? '#2a3547' : '#ffffff',
                  color: isDark ? '#ffffff' : '#000000',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                  outline: 'none'
                }}
              >
                {key}
              </button>
            ))}
          </div>

          {/* Row 3 */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '4px' }}>
            {/* Shift */}
            <button
              type="button"
              onClick={() => {}}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '5px',
                border: 'none',
                backgroundColor: isDark ? '#1a2230' : '#aaadb5',
                color: isDark ? '#ffffff' : '#000000',
                fontSize: '1rem',
                cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                outline: 'none'
              }}
            >
              ⇧
            </button>
            {['ㅋ', 'ㅌ', 'ㅊ', 'ㅍ', 'ㅠ', 'ㅜ', 'ㅡ'].map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setSearchQuery(prev => prev + key)}
                style={{
                  flex: 1,
                  height: '42px',
                  borderRadius: '5px',
                  border: 'none',
                  backgroundColor: isDark ? '#2a3547' : '#ffffff',
                  color: isDark ? '#ffffff' : '#000000',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                  outline: 'none'
                }}
              >
                {key}
              </button>
            ))}
            {/* Backspace */}
            <button
              type="button"
              onClick={() => setSearchQuery(prev => prev.slice(0, -1))}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '5px',
                border: 'none',
                backgroundColor: isDark ? '#1a2230' : '#aaadb5',
                color: isDark ? '#ffffff' : '#000000',
                fontSize: '1.1rem',
                cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                outline: 'none'
              }}
            >
              ⌫
            </button>
          </div>

          {/* Row 4 */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}>
            {/* Number Toggle */}
            <button
              type="button"
              style={{
                width: '75px',
                height: '42px',
                borderRadius: '5px',
                border: 'none',
                backgroundColor: isDark ? '#1a2230' : '#aaadb5',
                color: isDark ? '#ffffff' : '#000000',
                fontSize: '0.85rem',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
                outline: 'none'
              }}
            >
              123
            </button>
            {/* Space */}
            <button
              type="button"
              onClick={() => setSearchQuery(prev => prev + ' ')}
              style={{
                flex: 1,
                height: '42px',
                borderRadius: '5px',
                border: 'none',
                backgroundColor: isDark ? '#2a3547' : '#ffffff',
                color: isDark ? '#ffffff' : '#000000',
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
                outline: 'none'
              }}
            >
            </button>
            {/* Done */}
            <button
              type="button"
              onClick={() => setShowKeyboard(false)}
              style={{
                width: '75px',
                height: '42px',
                borderRadius: '5px',
                border: 'none',
                backgroundColor: '#3b82f6',
                color: '#ffffff',
                fontSize: '0.85rem',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
                outline: 'none'
              }}
            >
              완료
            </button>
          </div>
        </div>
      )}
      {etfMallNavMode === 'search' && (
        <div style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          width: '100%',
          zIndex: 100
        }}>
          <button
            onClick={() => {
              setEtfMallNavMode('default');
              setActiveMallTab('전체');
            }}
            style={{
              width: '100%',
              height: '50px',
              backgroundColor: '#000000',
              color: '#ffffff',
              border: 'none',
              borderRadius: '0',
              fontSize: '0.95rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.opacity = '0.9';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            확인
          </button>
        </div>
      )}
    </div>
  );
}

function ToBeTigerDetailView({ setToBeSubScreen, isDark, setToBePrevSubScreen, isDrawerOpen, setEtfMallNavMode }) {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: isDark ? '#0b0f19' : '#ffffff',
    color: isDark ? '#cbd5e1' : '#333333',
    position: 'relative',
    userSelect: 'none'
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    height: '46px',
    padding: '0 12px',
    borderBottom: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0',
    backgroundColor: isDark ? '#121826' : '#ffffff'
  };

  const priceSectionStyle = {
    padding: '8px 14px',
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    borderBottom: isDark ? '1px solid #1e293b' : '1px solid #f1f5f9'
  };

  const krxTabStyle = {
    padding: '10px 16px',
    fontSize: '0.88rem',
    fontWeight: '800',
    color: '#ffffff',
    backgroundColor: isDark ? '#1e293b' : '#22252a',
    borderRadius: '0px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    whiteSpace: 'nowrap'
  };

  const infoTabStyle = (active) => ({
    flex: 1,
    padding: '8px 4px',
    fontSize: '0.82rem',
    fontWeight: active ? '800' : '500',
    color: active ? (isDark ? '#ffffff' : '#222222') : (isDark ? '#94a3b8' : '#777777'),
    borderBottom: active ? (isDark ? '2.5px solid #ffffff' : '2.5px solid #222222') : '2.5px solid transparent',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    whiteSpace: 'nowrap'
  });

  const subTabItemStyle = (active) => ({
    flex: 1,
    textAlign: 'center',
    padding: '10px 0',
    fontSize: '0.82rem',
    fontWeight: active ? '800' : '500',
    color: active ? (isDark ? '#ffffff' : '#222222') : (isDark ? '#64748b' : '#777777'),
    borderBottom: active ? (isDark ? '2.5px solid #ffffff' : '2.5px solid #222222') : '2.5px solid transparent',
    cursor: 'pointer'
  });

  return (
    <div style={containerStyle}>
      {/* Galaxy S20 Central Punch-hole Camera */}
      <div style={{
        width: '8px',
        height: '8px',
        backgroundColor: '#000000',
        borderRadius: '50%',
        position: 'absolute',
        top: '12px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 999
      }} />

      {/* Phone Status Bar */}
      <div style={{
        height: '32px',
        padding: '0 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: isDark ? '#121826' : '#ffffff',
        color: isDark ? '#cbd5e1' : '#475569',
        fontSize: '0.75rem',
        flexShrink: 0
      }}>
        <span style={{ fontWeight: '700' }}>SKT 10:27</span>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.8 }}><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/></svg>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.8 }}><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
          <span style={{ fontSize: '0.65rem', fontWeight: '800' }}>5G</span>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1px', height: '10px' }}>
            <div style={{ width: '2px', height: '3px', backgroundColor: isDark ? '#cbd5e1' : '#475569' }}></div>
            <div style={{ width: '2px', height: '5px', backgroundColor: isDark ? '#cbd5e1' : '#475569' }}></div>
            <div style={{ width: '2px', height: '7px', backgroundColor: isDark ? '#cbd5e1' : '#475569' }}></div>
            <div style={{ width: '2px', height: '9px', backgroundColor: isDark ? '#cbd5e1' : '#475569' }}></div>
          </div>
          <div style={{
            border: isDark ? '1px solid #cbd5e1' : '1px solid #475569',
            borderRadius: '3px',
            padding: '0px 3px',
            fontSize: '0.62rem',
            fontWeight: '900',
            height: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isDark ? '#cbd5e1' : '#475569',
            color: isDark ? '#0b0f19' : '#fff',
            lineHeight: 1
          }}>
            100
          </div>
        </div>
      </div>

      {/* Header */}
      <div style={headerStyle}>
        <button 
          onClick={() => setToBeSubScreen('menu')}
          style={{ border: 'none', background: 'none', padding: '0 10px 0 0', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'inherit' }}
        >
          {/* Hamburger menu icon instead of back arrow */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px', flex: 1, justifyContent: 'flex-start' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            {isDrawerOpen && (
              <div style={{
                position: 'absolute',
                top: '-7px',
                left: '-8px',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                backgroundColor: '#00c3a5',
                color: '#ffffff',
                fontSize: '11px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
                zIndex: 10
              }}>1</div>
            )}
            <span style={{ fontWeight: '800', fontSize: '1.05rem', letterSpacing: '-0.3px' }}>TIGER 미국S&P500</span>
          </div>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ color: isDark ? '#94a3b8' : '#777777' }}>
            <path d="M7 10l5 5 5-5z" />
          </svg>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', color: isDark ? '#94a3b8' : '#333333' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            {isDrawerOpen && (
              <div style={{
                position: 'absolute',
                top: '-7px',
                left: '-8px',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                backgroundColor: '#00c3a5',
                color: '#ffffff',
                fontSize: '11px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
                zIndex: 10
              }}>2</div>
            )}
            <div 
              onClick={() => {
                setEtfMallNavMode('search');
                setToBePrevSubScreen('tigerDetail');
                setToBeSubScreen('etfMall');
              }}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            </div>
          </div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /></svg>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
        </div>
      </div>

      {/* Main content area (scrollable) */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        
        {/* Price & Trade Buttons Row */}
        <div style={priceSectionStyle}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '0.62rem', fontWeight: 'bold', color: '#fff', backgroundColor: '#00c3a5', padding: '1px 3px', borderRadius: '2px' }}>KRX</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {/* Candlestick (봉차트) Icon */}
              <div style={{
                display: 'inline-flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '6px',
                height: '24px',
                position: 'relative',
                marginRight: '6px',
                alignSelf: 'center'
              }}>
                <div style={{ width: '2px', height: '100%', backgroundColor: '#de201e', position: 'absolute' }}></div>
                <div style={{ width: '6px', height: '14px', backgroundColor: '#de201e', zIndex: 1 }}></div>
              </div>
              <span style={{ fontSize: '2.15rem', fontWeight: 'normal', color: '#de201e', letterSpacing: '-0.5px', lineHeight: 1 }}>28,325</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', color: '#de201e', fontSize: '0.75rem', fontWeight: '700', lineHeight: 1.1 }}>
                <span style={{ fontSize: '0.65rem' }}>▲ 60</span>
                <span>(0.21%)</span>
              </div>
              <div style={{ display: 'flex', gap: '4px' }}>
                <button style={{ backgroundColor: '#2b66d2', color: '#ffffff', border: 'none', width: '58px', height: '48px', fontSize: '0.92rem', fontWeight: '800', cursor: 'pointer' }}>매도</button>
                <button style={{ backgroundColor: '#de201e', color: '#ffffff', border: 'none', width: '58px', height: '48px', fontSize: '0.92rem', fontWeight: '800', cursor: 'pointer' }}>매수</button>
              </div>
            </div>
          </div>
          {/* Slider dots & Notice Banner */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
            <div style={{ display: 'flex', gap: '4px' }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#222' }}></span>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#ccc' }}></span>
            </div>
            <span style={{ color: '#de201e', fontSize: '0.7rem', fontWeight: '600' }}>ⓘ RIA 공제 축소 상품</span>
          </div>
        </div>

        {/* Sub Info Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 14px', borderBottom: isDark ? '1px solid #1e293b' : '1px solid #f1f5f9', fontSize: '0.74rem', backgroundColor: isDark ? '#121826' : '#f8fafc' }}>
          <span style={{ color: isDark ? '#94a3b8' : '#555555', fontWeight: '600' }}>신 대 증 40</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.58rem', fontWeight: 'bold', color: '#00c3a5', border: '1px solid #00c3a5', padding: '0px 2px', borderRadius: '2px', lineHeight: '1' }}>KRX</span>
            <div style={{ fontWeight: '700', color: isDark ? '#e2e8f0' : '#111111' }}>
              7,707,508 <span style={{ color: '#2b66d2', fontSize: '0.74rem', fontWeight: '600' }}>(16.97%)</span>
            </div>
          </div>
        </div>

        {/* Market Select Tabs */}
        <div style={{ display: 'flex', height: '40px', alignItems: 'center', backgroundColor: isDark ? '#121826' : '#ffffff', borderBottom: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', height: '100%', flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
            <div style={krxTabStyle}>KRX</div>
            <div style={infoTabStyle(true)}>호가</div>
            <div style={infoTabStyle(false)}>거래원</div>
            <div style={infoTabStyle(false)}>시간</div>
            <div style={infoTabStyle(false)}>일자</div>
            <div style={infoTabStyle(false)}>차트</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', padding: '0 10px', height: '100%', borderLeft: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9" /></svg>
          </div>
        </div>

        {/* Order Book Table */}
        <div style={{ flex: 1, backgroundColor: isDark ? '#0b0f19' : '#ffffff', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed', borderSpacing: 0 }}>
              <tbody>
                {[
                  { size: 757, price: 28375, pct: '+0.39%', label: 'S&P 500', val: '0.00' },
                  { size: 1541, price: 28370, pct: '+0.37%', label: 'NAV', val: '28,071.93(-143.86)', valColor: '#2b66d2' },
                  { size: 831, price: 28365, pct: '+0.35%', label: '추적오차율', val: '+0.10', valColor: '#de201e' },
                  { size: 1453, price: 28360, pct: '+0.34%', label: '괴리율', val: '+0.90', valColor: '#de201e' },
                  { size: 1757, price: 28355, pct: '+0.32%', label: '거래량', val: '7,707,508', valColor: '#2b66d2', subVal: '(16.97%)' },
                  { size: 18122, price: 28350, pct: '+0.30%', label: '체결강도', val: '93.40%' },
                  { size: 24867, price: 28345, pct: '+0.28%', label: '전종', val: '28,265' },
                  { size: 30444, price: 28340, pct: '+0.27%', label: '전거', val: '4,542만' },
                  { size: 81612, price: 28335, pct: '+0.25%', hasTag: '고', label: '시가', val: '28,265' },
                  { size: 141807, price: 28330, pct: '+0.23%', label: '고가\n저가', val: '28,335\n28,265', isHighLow: true }
                ].map((row, i) => {
                  const maxAskSize = 141807;
                  const barWidth = ((row.size / maxAskSize) * 100) + '%';
                  return (
                    <tr key={'ask-' + i} style={{ height: '34px', borderBottom: isDark ? '1px solid #1e293b' : '1px solid #f1f5f9' }}>
                      {/* Left: Ask size */}
                      <td style={{
                        width: '30%',
                        position: 'relative',
                        backgroundColor: isDark ? '#111b2b' : '#edf4fe',
                        borderRight: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0',
                        textAlign: 'right',
                        paddingRight: '8px',
                        verticalAlign: 'middle'
                      }}>
                        <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: barWidth, backgroundColor: isDark ? '#1b2d47' : '#d2e4ff', zIndex: 1 }} />
                        <span style={{ position: 'relative', zIndex: 2, fontSize: '0.8rem', fontWeight: '600', color: isDark ? '#cbd5e1' : '#333' }}>
                          {row.size.toLocaleString()}
                          {row.hasTag && <span style={{ color: '#de201e', fontSize: '0.6rem', fontWeight: 'bold', marginLeft: '2px', verticalAlign: 'top' }}>{row.hasTag}</span>}
                        </span>
                      </td>
                      {/* Center: Price */}
                      <td style={{
                        width: '40%',
                        borderRight: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0',
                        backgroundColor: isDark ? '#111b2b' : '#edf4fe',
                        color: '#de201e',
                        textAlign: 'center',
                        fontSize: '0.82rem',
                        fontWeight: '800',
                        verticalAlign: 'middle'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px' }}>
                          <span>{row.price.toLocaleString()}</span>
                          <span style={{ fontSize: '0.68rem', fontWeight: '600' }}>{row.pct}</span>
                        </div>
                      </td>
                      {/* Right: Market Info Panel */}
                      <td style={{
                        width: '30%',
                        backgroundColor: isDark ? '#0b0f19' : '#ffffff',
                        fontSize: '0.65rem',
                        color: isDark ? '#94a3b8' : '#555555',
                        padding: '2px 6px',
                        verticalAlign: 'middle'
                      }}>
                        {row.isHighLow ? (
                          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span>고가</span>
                              <span style={{ color: '#de201e', fontWeight: '600' }}>28,335</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span>저가</span>
                              <span style={{ color: '#333333', fontWeight: '600' }}>28,265</span>
                            </div>
                          </div>
                        ) : (
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <span style={{ fontWeight: '500' }}>{row.label}</span>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', lineHeight: 1.1 }}>
                              <span style={{ color: row.valColor || 'inherit', fontWeight: '600' }}>{row.val}</span>
                              {row.subVal && <span style={{ color: row.valColor || 'inherit', fontSize: '0.6rem' }}>{row.subVal}</span>}
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}

                {/* Spread Line */}
                <tr style={{ height: '34px', borderBottom: isDark ? '1px solid #1e293b' : '1px solid #f1f5f9' }}>
                  <td style={{ width: '30%', borderRight: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0', paddingLeft: '8px', verticalAlign: 'middle' }}>
                    {/* Empty or simple dot slide indicator */}
                    <div style={{ display: 'flex', gap: '3px' }}>
                      <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#999' }}></span>
                      <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#ddd' }}></span>
                      <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#ddd' }}></span>
                    </div>
                  </td>
                  <td style={{
                    width: '40%',
                    borderRight: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0',
                    textAlign: 'center',
                    fontSize: '0.82rem',
                    fontWeight: '800',
                    color: '#de201e',
                    verticalAlign: 'middle',
                    backgroundColor: isDark ? '#121826' : '#ffffff'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px' }}>
                      <span>28,327</span>
                      <span style={{ fontSize: '0.68rem', fontWeight: '600' }}>+0.22%</span>
                    </div>
                  </td>
                  <td style={{ width: '30%', padding: '0 6px', verticalAlign: 'middle', backgroundColor: isDark ? '#0b0f19' : '#ffffff' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: isDark ? '1px solid #334155' : '1px solid #ccd0d7', borderRadius: '2px', padding: '1px 4px', fontSize: '0.68rem', fontWeight: '700', cursor: 'pointer' }}>
                      <span>10호가</span>
                      <span>▼</span>
                    </div>
                  </td>
                </tr>

                {/* Bid Rows */}
                {[
                  { price: 28325, pct: '+0.21%', size: 96333, isCurrent: true, label: '상한', val: '36,740', color: '#de201e', label2: '하한', val2: '19,790', color2: '#2b66d2' },
                  { price: 28320, pct: '+0.19%', size: 118054, label: '상승VI', val: '31,095', color: '#de201e', label2: '하락VI', val2: '25,435', color2: '#2b66d2' },
                  { price: 28315, pct: '+0.18%', size: 145044, isNxt: true }
                ].map((row, i) => {
                  const maxBidSize = 145044;
                  const barWidth = ((row.size / maxBidSize) * 100) + '%';
                  return (
                    <tr key={'bid-' + i} style={{ height: '34px', borderBottom: isDark ? '1px solid #1e293b' : '1px solid #f1f5f9' }}>
                      {/* Left column: Recent Transaction Feed or 증 badge */}
                      <td style={{ 
                        width: '30%', 
                        borderRight: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0', 
                        backgroundColor: isDark ? '#0b0f19' : '#ffffff',
                        fontSize: '0.62rem',
                        padding: '1px 6px',
                        verticalAlign: 'middle',
                        lineHeight: 1.1
                      }}>
                        {i === 0 && (
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#de201e' }}>
                              <span>28,325</span>
                              <span>5</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#de201e' }}>
                              <span>28,325</span>
                              <span>5</span>
                            </div>
                          </div>
                        )}
                        {i === 1 && (
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#de201e' }}>
                              <span>28,330</span>
                              <span>14</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#de201e' }}>
                              <span>28,330</span>
                              <span>1</span>
                            </div>
                          </div>
                        )}
                        {i === 2 && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span style={{ fontSize: '0.58rem', fontWeight: 'bold', color: '#047857', border: '1px solid #047857', padding: '0px 2px', borderRadius: '2px', lineHeight: '1' }}>증</span>
                          </div>
                        )}
                      </td>
                      {/* Center column: Price */}
                      <td style={{
                        width: '40%',
                        borderRight: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0',
                        backgroundColor: isDark ? '#2b1b1b' : '#ffefef',
                        color: '#de201e',
                        textAlign: 'center',
                        fontSize: '0.82rem',
                        fontWeight: '800',
                        verticalAlign: 'middle',
                        border: row.isCurrent ? '2px solid #111111' : 'none'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px' }}>
                          <span>{row.price.toLocaleString()}</span>
                          <span style={{ fontSize: '0.68rem', fontWeight: '600' }}>{row.pct}</span>
                        </div>
                      </td>
                      {/* Right column: Bid size or special badges */}
                      <td style={{
                        width: '30%',
                        position: 'relative',
                        backgroundColor: isDark ? '#2b1b1b' : '#ffefef',
                        textAlign: 'left',
                        paddingLeft: '8px',
                        verticalAlign: 'middle'
                      }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: barWidth, backgroundColor: isDark ? '#4c2626' : '#ffd0d0', zIndex: 1 }} />
                        <span style={{ position: 'relative', zIndex: 2, fontSize: '0.8rem', fontWeight: '600', color: isDark ? '#cbd5e1' : '#333' }}>
                          {row.size.toLocaleString()}
                        </span>
                        
                        {/* Overlay market VI values on the right side if they exist */}
                        {!row.isNxt && (
                          <div style={{
                            position: 'absolute',
                            right: '6px',
                            top: 0,
                            bottom: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            fontSize: '0.62rem',
                            zIndex: 3,
                            lineHeight: 1.1,
                            pointerEvents: 'none',
                            color: '#555555'
                          }}>
                            <div style={{ display: 'flex', gap: '4px', justifyContent: 'flex-end' }}>
                              <span>{row.label}</span>
                              <span style={{ color: row.color, fontWeight: '600' }}>{row.val}</span>
                            </div>
                            <div style={{ display: 'flex', gap: '4px', justifyContent: 'flex-end' }}>
                              <span>{row.label2}</span>
                              <span style={{ color: row.color2, fontWeight: '600' }}>{row.val2}</span>
                            </div>
                          </div>
                        )}

                        {row.isNxt && (
                          <div style={{
                            position: 'absolute',
                            right: '6px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            zIndex: 3
                          }}>
                            <span style={{ fontSize: '0.58rem', fontWeight: 'bold', color: '#fff', backgroundColor: '#e28700', padding: '1px 3px', borderRadius: '2px' }}>NXT</span>
                            <span style={{ fontSize: '0.62rem', color: '#777777', fontWeight: '600' }}>거래불가</span>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Cumulative Row */}
          <div style={{
            height: '30px',
            borderTop: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0',
            backgroundColor: isDark ? '#121826' : '#ffffff',
            display: 'flex',
            alignItems: 'center',
            fontSize: '0.76rem',
            fontWeight: '700',
            color: isDark ? '#cbd5e1' : '#475569',
            flexShrink: 0
          }}>
            <div style={{ width: '30%', textAlign: 'right', paddingRight: '8px', backgroundColor: '#d2e4ff', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', color: '#2b66d2' }}>303,191</div>
            <div style={{ width: '40%', textAlign: 'center' }}>10:27</div>
            <div style={{ width: '30%', textAlign: 'left', paddingLeft: '8px', backgroundColor: '#ffd0d0', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', color: '#de201e' }}>604,039</div>
          </div>
        </div>

        {/* Nasdaq Composite Banner */}
        <div style={{
          height: '32px',
          backgroundColor: '#f1f5f9',
          color: '#333333',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 14px',
          fontSize: '0.78rem',
          fontWeight: '700',
          flexShrink: 0,
          borderTop: '1px solid #e2e8f0'
        }}>
          <span>나스닥 종합</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#2b66d2' }}>26,021.66</span>
            <span style={{ color: '#2b66d2', display: 'flex', alignItems: 'center', gap: '2px' }}>▼ 354.68 (1.34%)</span>
          </div>
        </div>
      </div>

      {/* Bottom Menu Bar */}
      <div style={{
        height: '54px',
        borderTop: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0',
        backgroundColor: isDark ? '#121826' : '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        fontSize: '0.72rem',
        fontWeight: 'bold',
        color: isDark ? '#64748b' : '#555555',
        flexShrink: 0,
        position: 'relative'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', cursor: 'pointer' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1px' }}>
          <span>관심</span>
          <span>종목</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1px', color: '#00c3a5' }}>
          <span>주식</span>
          <span>현재가</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1px' }}>
          <span>주식</span>
          <span>차트</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1px' }}>
          <span>주식</span>
          <span>주문</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1px' }}>
          <span>주식</span>
          <span>잔고</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1px' }}>
          <span>주식미체</span>
          <span>/체결</span>
        </div>
        {/* Floating return indicator / back arrow next to the tabs */}
        <div 
          onClick={() => setToBeSubScreen('etfMall')}
          style={{
            position: 'absolute',
            right: '8px',
            top: '50%',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '26px',
            height: '26px',
            borderRadius: '50%',
            backgroundColor: '#f1f5f9',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 10 4 15 9 20" />
            <path d="M20 4v7a4 4 0 0 1-4 4H4" />
          </svg>
        </div>
      </div>

    </div>
  );
}

function ToBeStockSearchView({ setToBeSubScreen, toBePrevSubScreen, isDark, enteredViaEtfMall }) {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: isDark ? '#0b0f19' : '#ffffff',
    color: isDark ? '#cbd5e1' : '#333333',
    position: 'relative',
    userSelect: 'none'
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    height: '46px',
    padding: '0 12px',
    borderBottom: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0',
    backgroundColor: isDark ? '#121826' : '#ffffff'
  };

  const tabStyle = (active) => ({
    flex: 1,
    textAlign: 'center',
    padding: '12px 14px',
    fontSize: '0.94rem',
    fontWeight: active ? '800' : '500',
    color: active ? (isDark ? '#ffffff' : '#222222') : (isDark ? '#64748b' : '#888888'),
    borderBottom: active ? (isDark ? '2.5px solid #222222' : '2.5px solid #222222') : (isDark ? '1px solid #1e293b' : '1px solid #e2e8f0'),
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    flexShrink: 0
  });

  const stocks = [
    { name: 'KODEX 잘살아보세 반도체 액티브', code: 'A000000', price: '10,000원', diff: '▲ 1,000원', rate: '10%', tags: ['ETF', '70%', 'KRX', '해외'], isFavorite: false },
    { name: 'BNK 27-12 특수채(AAA이상)액티', code: 'A0193M0', price: '12,450원', diff: '▲ 150원', rate: '+1.2%', tags: ['ETF', '70%', 'KRX', '해외'], isFavorite: false },
    { name: 'SOL 우주항공밸류체인', code: 'A0207G0', price: '9,820원', diff: '▼ 80원', rate: '-0.8%', tags: ['ETF', '50%', 'KRX', '해외'], isFavorite: false },
    { name: 'KIWOOM 미국우주데이터센터인프', code: 'A0207Z0', price: '10,150원', diff: '▲ 320원', rate: '+3.2%', tags: ['ETF', '70%', 'KRX', '해외'], isFavorite: true },
    { name: 'KODEX 현대차로보틱스밸류체인TO', code: 'A0204D0', price: '15,300원', diff: '▲ 450원', rate: '+3.0%', tags: ['ETF', '70%', 'KRX', '국내'], isFavorite: false },
    { name: 'DAISHIN343 금융&지주고배당', code: 'A0189Z0', price: '21,050원', diff: '▼ 100원', rate: '-0.5%', tags: ['ETF', '30%', 'KRX', '국내'], isFavorite: false },
    { name: 'ACE 고배당주Plus커버드콜액티브', code: 'A0199C0', price: '10,000원', diff: '▲ 1,000원', rate: '+10%', tags: ['ETF', '70%', 'KRX', '해외'], isFavorite: true },
    { name: 'MIDAS 코스닥액티브', code: 'A0191B0', price: '8,400원', diff: '▲ 210원', rate: '+2.5%', tags: ['ETF', '70%', 'KRX', '국내'], isFavorite: false },
    { name: 'TIME 글로벌휴머니드로봇산업', code: 'A0185L0', price: '11,100원', diff: '▲ 120원', rate: '+1.1%', tags: ['ETF', '70%', 'KRX', '해외'], isFavorite: false },
    { name: 'IBK 코스닥150', code: 'A0190X0', price: '14,200원', diff: '▼ 50원', rate: '-0.3%', tags: ['ETF', '70%', 'KRX', '국내'], isFavorite: false }
  ];

  const isEtfOnly = enteredViaEtfMall;
  const tabs = isEtfOnly ? ['추천', '보유', 'GO배당GO금리', 'TDF', '전체'] : ['국내주식', '해외주식', 'ETF', '리츠'];
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [selectedChip, setSelectedChip] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');

  const getFilteredStocks = () => {
    if (isEtfOnly) {
      if (activeTabIdx === 0) { // 추천
        return stocks.filter(s => s.name.includes('우주') || s.name.includes('반도체') || s.name.includes('S&P500'));
      }
      if (activeTabIdx === 1) { // 보유
        return [
          { name: 'KODEX 현대차로보틱스밸류체인TO', code: 'A0204D0' },
          { name: 'DAISHIN343 금융&지주고배당', code: 'A0189Z0' }
        ];
      }
      if (activeTabIdx === 2) { // GO배당GO금리
        return stocks.filter(s => s.name.includes('고배당') || s.name.includes('금융&지주'));
      }
      if (activeTabIdx === 3) { // TDF
        return [
          { name: 'KB온국민TDF2055', code: 'A0198F0' },
          { name: '신한마음편한TDF2050', code: 'A0199G0' }
        ];
      }
      if (activeTabIdx === 4) { // 전체
        return stocks;
      }
    } else {
      if (activeTabIdx === 0) { // 국내주식
        return [
          { name: '삼성전자', code: '005930' },
          { name: 'SK하이닉스', code: '000660' },
          { name: '현대차', code: '005380' },
          { name: 'NAVER', code: '035420' }
        ];
      }
      if (activeTabIdx === 1) { // 해외주식
        return [
          { name: 'Apple Inc.', code: 'AAPL' },
          { name: 'Microsoft Corp.', code: 'MSFT' },
          { name: 'NVIDIA Corp.', code: 'NVDA' },
          { name: 'Tesla Inc.', code: 'TSLA' }
        ];
      }
      if (activeTabIdx === 2) { // ETF
        return stocks;
      }
      if (activeTabIdx === 3) { // 리츠
        return [
          { name: '신한서부티엔디리츠', code: 'A388720' },
          { name: '대신글로벌코어리츠', code: 'A390140' }
        ];
      }
    }
    return stocks;
  };

  const getChippedStocks = (stockList) => {
    let result = stockList;
    if (selectedChip !== '전체') {
      result = stockList.filter(s => {
        if (selectedChip === 'ETF') return s.name.includes('ETF') || s.name.includes('밸류') || s.name.includes('인프') || s.name.includes('액티') || s.name.includes('S&P500') || s.name.includes('코스닥') || s.name.includes('TDF');
        if (selectedChip === 'ETN') return s.name.includes('ETN');
        if (selectedChip === '리츠') return s.name.includes('리츠');
        return true;
      });
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(s => s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q));
    }
    return result;
  };

  const displayStocks = getChippedStocks(getFilteredStocks()).map((stock) => {
    const isUp = stock.diff ? stock.diff.includes('▲') : Math.random() > 0.4;
    return {
      ...stock,
      price: stock.price || (isUp ? '11,000원' : '9,500원'),
      diff: stock.diff || (isUp ? '▲ 1,000원' : '▼ 500원'),
      rate: stock.rate || (isUp ? '+10%' : '-5%'),
      tags: stock.tags || ['ETF', '70%', 'KRX', '해외'],
      isFavorite: stock.isFavorite !== undefined ? stock.isFavorite : false
    };
  });

  return (
    <div style={containerStyle}>
      {/* Galaxy S20 Central Punch-hole Camera */}
      <div style={{
        width: '8px',
        height: '8px',
        backgroundColor: '#000000',
        borderRadius: '50%',
        position: 'absolute',
        top: '12px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 999
      }} />

      {/* Phone Status Bar */}
      <div style={{
        height: '32px',
        padding: '0 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: isDark ? '#121826' : '#ffffff',
        color: isDark ? '#cbd5e1' : '#475569',
        fontSize: '0.75rem',
        flexShrink: 0
      }}>
        <span style={{ fontWeight: '700' }}>SKT 10:27</span>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.65rem', fontWeight: '800' }}>5G</span>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1px', height: '10px' }}>
            <div style={{ width: '2px', height: '3px', backgroundColor: isDark ? '#cbd5e1' : '#475569' }}></div>
            <div style={{ width: '2px', height: '5px', backgroundColor: isDark ? '#cbd5e1' : '#475569' }}></div>
            <div style={{ width: '2px', height: '7px', backgroundColor: isDark ? '#cbd5e1' : '#475569' }}></div>
            <div style={{ width: '2px', height: '9px', backgroundColor: isDark ? '#cbd5e1' : '#475569' }}></div>
          </div>
          <div style={{
            border: isDark ? '1px solid #cbd5e1' : '1px solid #475569',
            borderRadius: '3px',
            padding: '0px 3px',
            fontSize: '0.62rem',
            fontWeight: '900',
            height: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isDark ? '#cbd5e1' : '#475569',
            color: isDark ? '#0b0f19' : '#fff',
            lineHeight: 1
          }}>
            100
          </div>
        </div>
      </div>

      {/* Header */}
      <div style={headerStyle}>
        <button 
          onClick={() => setToBeSubScreen(toBePrevSubScreen)}
          style={{ border: 'none', background: 'none', padding: '0 12px 0 0', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'inherit', position: 'relative', zIndex: 10 }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
        <span style={{ fontWeight: '800', fontSize: '1.25rem', flex: 1, textAlign: 'center', marginLeft: '-34px', pointerEvents: 'none' }}>종목 검색</span>
      </div>

      {/* Top Tabs */}
      <div style={{ 
        display: 'flex', 
        backgroundColor: isDark ? '#121826' : '#ffffff',
        overflowX: 'auto',
        whiteSpace: 'nowrap',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none'
      }}>
        {tabs.map((tab, idx) => (
          <div 
            key={tab} 
            onClick={() => setActiveTabIdx(idx)}
            style={tabStyle(idx === activeTabIdx)}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Search Input Filter Row with Chips */}
      <div style={{ 
        padding: '10px 14px 12px 14px', 
        borderBottom: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0', 
        backgroundColor: isDark ? '#0b0f19' : '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          border: isDark ? '1px solid #334155' : '1px solid #d1d5db',
          borderRadius: '8px',
          padding: '0 12px',
          height: '38px',
          gap: '8px',
          backgroundColor: isDark ? '#121826' : '#ffffff'
        }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#888888" strokeWidth="2.5" style={{ flexShrink: 0 }}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <input 
            type="text"
            placeholder="종목명, 종목코드, 초성입력"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              border: 'none',
              background: 'none',
              width: '100%',
              outline: 'none',
              fontSize: '0.82rem',
              color: isDark ? '#ffffff' : '#222222'
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                border: 'none',
                background: 'none',
                color: isDark ? '#94a3b8' : '#888888',
                cursor: 'pointer',
                fontSize: '0.9rem',
                padding: '4px 0px 4px 8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter Chips Row */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {['전체', 'ETF', 'ETN', '리츠'].map((chip) => {
            const isSelected = selectedChip === chip;
            return (
              <span
                key={chip}
                onClick={() => setSelectedChip(chip)}
                style={{
                  padding: '9px 18px',
                  borderRadius: '24px',
                  fontSize: '0.78rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  backgroundColor: isSelected 
                    ? (isDark ? '#334155' : '#e0e0e0') 
                    : (isDark ? '#1e293b' : '#f1f1f1'),
                  color: isSelected 
                    ? (isDark ? '#ffffff' : '#111111') 
                    : (isDark ? '#94a3b8' : '#666666'),
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease'
                }}
              >
                {chip}
              </span>
            );
          })}
        </div>
      </div>

      {/* Stock List */}
      <div style={{ flex: 1, overflowY: 'auto', backgroundColor: isDark ? '#0b0f19' : '#ffffff' }}>
        {displayStocks.map((stock, idx) => {
          const isUp = stock.diff.includes('▲');
          const isDown = stock.diff.includes('▼');
          const changeColor = isUp ? '#de201e' : (isDown ? '#2366ca' : (isDark ? '#94a3b8' : '#888888'));

          return (
            <div 
              key={idx}
              onClick={() => setToBeSubScreen(toBePrevSubScreen)}
              style={{
                padding: '20px 16px',
                borderBottom: isDark ? '1px solid #1e293b' : '1px solid #f1f5f9',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'flex-start',
                backgroundColor: isDark ? '#0b0f19' : '#ffffff'
              }}
            >
              {/* Left Column: Name, Code & Tags */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px', minWidth: 0, paddingRight: '8px' }}>
                <div style={{ 
                  fontSize: '0.98rem', 
                  fontWeight: '800', 
                  color: isDark ? '#ffffff' : '#111111',
                  wordBreak: 'keep-all',
                  whiteSpace: 'normal',
                  lineHeight: '1.25',
                  maxWidth: '135px'
                }}>
                  {stock.name}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'nowrap', marginTop: '4px' }}>
                  <span style={{ 
                    fontSize: '0.82rem', 
                    color: isDark ? '#94a3b8' : '#888888', 
                    fontWeight: '600'
                  }}>
                    {stock.code}
                  </span>
                  <div style={{ display: 'flex', gap: '5px', alignItems: 'flex-start', flexWrap: 'nowrap' }}>
                    {stock.tags.map((tag, tIdx) => {
                      const isHaeoe = tag === '해외';
                      return (
                        <span 
                          key={tIdx} 
                          style={{
                            backgroundColor: '#c20f0f',
                            color: '#ffffff',
                            fontSize: '0.65rem',
                            fontWeight: '800',
                            padding: isHaeoe ? '2px 5px' : '4px 6px',
                            borderRadius: '4px',
                            lineHeight: isHaeoe ? '1.1' : '1',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            whiteSpace: 'pre-line',
                            width: isHaeoe ? '15px' : 'auto',
                            minHeight: '18px',
                            boxSizing: 'border-box'
                          }}
                        >
                          {isHaeoe ? '해\n외' : tag}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Center Column: 현재가 */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', width: '85px', marginRight: '16px', flexShrink: 0, marginTop: '2px' }}>
                <span style={{ fontSize: '0.7rem', color: isDark ? '#94a3b8' : '#888888', marginBottom: '8px', fontWeight: '500' }}>현재가</span>
                <span style={{ fontSize: '1.05rem', fontWeight: '800', color: isDark ? '#ffffff' : '#111111', letterSpacing: '-0.5px' }}>
                  {stock.price}
                </span>
              </div>

              {/* Right Column: 전일대비 */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', width: '80px', marginRight: '10px', flexShrink: 0, marginTop: '2px' }}>
                <span style={{ fontSize: '0.7rem', color: isDark ? '#94a3b8' : '#888888', marginBottom: '8px', fontWeight: '500' }}>전일대비</span>
                <span style={{ fontSize: '0.98rem', fontWeight: '800', color: changeColor, display: 'flex', alignItems: 'center', gap: '2px', letterSpacing: '-0.5px' }}>
                  {stock.diff}
                </span>
                <span style={{ fontSize: '0.95rem', fontWeight: '800', color: changeColor, letterSpacing: '-0.5px', marginTop: '2px' }}>
                  {stock.rate}
                </span>
              </div>

              {/* Far Right: Favorite Star Outline */}
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  padding: '4px 0',
                  flexShrink: 0,
                  marginTop: '18px'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <span style={{ color: '#c20f0f', fontSize: '1.4rem', cursor: 'pointer' }}>
                  {stock.isFavorite ? '★' : '☆'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


function PensionReceiptRequestView({ isDark, isToBe, onBackClick, isDrawerOpen, isFigmaExportMode }) {
  const [selectedDay, setSelectedDay] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const prefix = isToBe ? 'tobe' : 'asis';
    return params.get(`${prefix}SelectedDay`) || '25일';
  });
  const [agreed, setAgreed] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showMethodPicker, setShowMethodPicker] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const prefix = isToBe ? 'tobe' : 'asis';
    return params.get(`${prefix}SelectedMethod`) || '기간 선택형';
  });
  const [customAmount, setCustomAmount] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const prefix = isToBe ? 'tobe' : 'asis';
    return params.get(`${prefix}CustomAmount`) || '2,500,000 원';
  });
  const [customPeriod, setCustomPeriod] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const prefix = isToBe ? 'tobe' : 'asis';
    return params.get(`${prefix}CustomPeriod`) || '';
  });
  const [showPeriodPicker, setShowPeriodPicker] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const prefix = isToBe ? 'tobe' : 'asis';
    return params.get(`${prefix}SelectedPeriod`) || '월';
  });
  const [showBankPicker, setShowBankPicker] = useState(false);
  const [selectedBank, setSelectedBank] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const prefix = isToBe ? 'tobe' : 'asis';
    return params.get(`${prefix}SelectedBank`) || '';
  });
  const [selectedYear, setSelectedYear] = useState(2032);
  const [selectedMonth, setSelectedMonth] = useState(2);
  const [selectedDate, setSelectedDate] = useState(23);
  const [startDateStr, setStartDateStr] = useState(isToBe ? '2032.02.23' : '2032.02');
  const [showProductBottomSheet, setShowProductBottomSheet] = useState(false);
  const [showAccountBottomSheet, setShowAccountBottomSheet] = useState(false);
  const [currentAccount, setCurrentAccount] = useState('200-233354(41) 김대신');

  // Keypad & Inputs Editable States
  const [showNumericKeypad, setShowNumericKeypad] = useState(false);
  const [activeField, setActiveField] = useState(null); // 'amount', 'account', 'phone', 'immediateAmount'
  const [phoneNumber, setPhoneNumber] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const prefix = isToBe ? 'tobe' : 'asis';
    return params.get(`${prefix}PhoneNumber`) || '';
  });
  const [directAccountNumber, setDirectAccountNumber] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const prefix = isToBe ? 'tobe' : 'asis';
    return params.get(`${prefix}DirectAccountNumber`) || '';
  });
  const [immediateAmount, setImmediateAmount] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const prefix = isToBe ? 'tobe' : 'asis';
    return params.get(`${prefix}ImmediateAmount`) || '';
  });
  const [showNoticePopup, setShowNoticePopup] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  const contentRef = useRef(null);

  // Restore scroll position on load
  useEffect(() => {
    const timer = setTimeout(() => {
      if (contentRef.current) {
        const params = new URLSearchParams(window.location.search);
        const prefix = isToBe ? 'tobe' : 'asis';
        const urlScrollTop = params.get(`${prefix}ScrollTop`);
        if (urlScrollTop) {
          contentRef.current.scrollTop = parseInt(urlScrollTop, 10);
        } else {
          const savedScroll = sessionStorage.getItem(`${prefix}PensionRequestScrollTop`);
          if (savedScroll) {
            contentRef.current.scrollTop = parseInt(savedScroll, 10);
          }
        }
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    const prefix = isToBe ? 'tobe' : 'asis';
    sessionStorage.setItem(`${prefix}PensionRequestScrollTop`, scrollTop);
    
    // Dynamically update URL param silently
    const params = new URLSearchParams(window.location.search);
    params.set(`${prefix}ScrollTop`, scrollTop);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, '', newUrl);
  };

  // New interactive states for application/cancellation modal flows
  const [receiptStatus, setReceiptStatus] = useState('form'); // 'form', 'inquiry'
  const [showDateLimitPopup, setShowDateLimitPopup] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showCancelConfirmModal, setShowCancelConfirmModal] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const prefix = isToBe ? 'tobe' : 'asis';
    if (params.get(`${prefix}ShowDatePicker`) === 'true') setShowDatePicker(true);
    if (params.get(`${prefix}ShowMethodPicker`) === 'true') setShowMethodPicker(true);
    if (params.get(`${prefix}ShowPeriodPicker`) === 'true') setShowPeriodPicker(true);
    if (params.get(`${prefix}ShowBankPicker`) === 'true') setShowBankPicker(true);
    if (params.get(`${prefix}ShowProductBottomSheet`) === 'true') setShowProductBottomSheet(true);
    if (params.get(`${prefix}ShowAccountBottomSheet`) === 'true') setShowAccountBottomSheet(true);
    if (params.get(`${prefix}ShowNoticePopup`) === 'true') setShowNoticePopup(true);
    if (params.get(`${prefix}ShowNumericKeypad`) === 'true') {
      setShowNumericKeypad(true);
      const act = params.get(`${prefix}ActiveField`);
      if (act) setActiveField(act);
    }

    // Load new modal flow states from URL parameters
    const statusParam = params.get(`${prefix}ReceiptStatus`);
    if (statusParam) setReceiptStatus(statusParam);
    if (params.get(`${prefix}ShowConfirmModal`) === 'true') setShowConfirmModal(true);
    if (params.get(`${prefix}ShowSuccessModal`) === 'true') setShowSuccessModal(true);
    if (params.get(`${prefix}ShowCancelConfirmModal`) === 'true') setShowCancelConfirmModal(true);
    if (params.get(`${prefix}IsCancelled`) === 'true') setIsCancelled(true);
    if (params.get(`${prefix}ShowDateLimitPopup`) === 'true') setShowDateLimitPopup(true);
  }, [isToBe]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const prefix = isToBe ? 'tobe' : 'asis';
    if (showDatePicker) params.set(`${prefix}ShowDatePicker`, 'true'); else params.delete(`${prefix}ShowDatePicker`);
    if (showMethodPicker) params.set(`${prefix}ShowMethodPicker`, 'true'); else params.delete(`${prefix}ShowMethodPicker`);
    if (showPeriodPicker) params.set(`${prefix}ShowPeriodPicker`, 'true'); else params.delete(`${prefix}ShowPeriodPicker`);
    if (showBankPicker) params.set(`${prefix}ShowBankPicker`, 'true'); else params.delete(`${prefix}ShowBankPicker`);
    if (showProductBottomSheet) params.set(`${prefix}ShowProductBottomSheet`, 'true'); else params.delete(`${prefix}ShowProductBottomSheet`);
    if (showAccountBottomSheet) params.set(`${prefix}ShowAccountBottomSheet`, 'true'); else params.delete(`${prefix}ShowAccountBottomSheet`);
    if (showNoticePopup) params.set(`${prefix}ShowNoticePopup`, 'true'); else params.delete(`${prefix}ShowNoticePopup`);
    if (showNumericKeypad) {
      params.set(`${prefix}ShowNumericKeypad`, 'true');
      if (activeField) params.set(`${prefix}ActiveField`, activeField);
    } else {
      params.delete(`${prefix}ShowNumericKeypad`);
      params.delete(`${prefix}ActiveField`);
    }
    
    // Sync new modal flow states to URL parameters
    if (receiptStatus !== 'form') params.set(`${prefix}ReceiptStatus`, receiptStatus); else params.delete(`${prefix}ReceiptStatus`);
    if (showConfirmModal) params.set(`${prefix}ShowConfirmModal`, 'true'); else params.delete(`${prefix}ShowConfirmModal`);
    if (showSuccessModal) params.set(`${prefix}ShowSuccessModal`, 'true'); else params.delete(`${prefix}ShowSuccessModal`);
    if (showCancelConfirmModal) params.set(`${prefix}ShowCancelConfirmModal`, 'true'); else params.delete(`${prefix}ShowCancelConfirmModal`);
    if (isCancelled) params.set(`${prefix}IsCancelled`, 'true'); else params.delete(`${prefix}IsCancelled`);
    if (showDateLimitPopup) params.set(`${prefix}ShowDateLimitPopup`, 'true'); else params.delete(`${prefix}ShowDateLimitPopup`);
    
    params.set(`${prefix}SelectedDay`, selectedDay);
    params.set(`${prefix}SelectedMethod`, selectedMethod);
    params.set(`${prefix}SelectedPeriod`, selectedPeriod);
    params.set(`${prefix}SelectedBank`, selectedBank);
    params.set(`${prefix}CustomAmount`, customAmount);
    params.set(`${prefix}PhoneNumber`, phoneNumber);
    params.set(`${prefix}DirectAccountNumber`, directAccountNumber);
    params.set(`${prefix}CustomPeriod`, customPeriod);
    params.set(`${prefix}ImmediateAmount`, immediateAmount);

    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    if (window.location.search !== (params.toString() ? `?${params.toString()}` : '')) {
      window.history.replaceState({}, '', newUrl);
    }
  }, [showDatePicker, showMethodPicker, showPeriodPicker, showBankPicker, showProductBottomSheet, showAccountBottomSheet, showNoticePopup, showNumericKeypad, activeField, selectedDay, selectedMethod, selectedPeriod, selectedBank, customAmount, isToBe, receiptStatus, showConfirmModal, showSuccessModal, showCancelConfirmModal, isCancelled, showDateLimitPopup, phoneNumber, directAccountNumber, customPeriod, immediateAmount]);
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: isFigmaExportMode ? 'auto' : '100%',
    width: '100%',
    backgroundColor: isDark ? '#0b0f19' : '#ffffff',
    color: isDark ? '#cbd5e1' : '#333333',
    fontFamily: 'sans-serif',
    boxSizing: 'border-box',
    position: 'relative'
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    borderBottom: isDark ? '1px solid #1e293b' : '1px solid #eeeeee',
    backgroundColor: isDark ? '#111827' : '#ffffff',
    height: '44px',
    boxSizing: 'border-box'
  };

  const contentStyle = {
    flex: isFigmaExportMode ? 'none' : 1,
    overflowY: isFigmaExportMode ? 'visible' : 'auto',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    boxSizing: 'border-box'
  };

  const footerStyle = {
    padding: '16px',
    backgroundColor: isDark ? '#111827' : '#ffffff',
    borderTop: isDark ? '1px solid #1e293b' : '1px solid #eeeeee',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  };

  const buttonRowStyle = {
    display: 'flex',
    gap: '8px',
    marginTop: '6px'
  };

  const dateButtonStyle = (day) => ({
    flex: 1,
    padding: '10px 0',
    borderRadius: '4px',
    border: selectedDay === day 
      ? '1px solid #2563eb' 
      : (isDark ? '1px solid #334155' : '1px solid #e2e8f0'),
    backgroundColor: selectedDay === day 
      ? (isDark ? 'rgba(37, 99, 235, 0.15)' : '#f0f7ff') 
      : 'transparent',
    color: selectedDay === day 
      ? '#2563eb' 
      : (isDark ? '#94a3b8' : '#64748b'),
    fontSize: '0.85rem',
    fontWeight: '700',
    cursor: 'pointer',
    textAlign: 'center'
  });

  const inputStyle = {
    width: '100%',
    padding: '10px 0px 8px 0px',
    borderRadius: '0px',
    border: 'none',
    borderBottom: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
    backgroundColor: 'transparent',
    color: isDark ? '#f8fafc' : '#0f172a',
    fontSize: '1.05rem',
    fontWeight: '500',
    fontFamily: 'SF Pro Display, -apple-system, Roboto, sans-serif',
    boxSizing: 'border-box',
    marginTop: '6px'
  };

  const selectStyle = {
    ...inputStyle,
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'%3E%3Cpath d='M7 10l5 5 5-5H7z'/%3E%3C/svg%3E")`,
    backgroundPosition: 'right 0px center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '1.25rem',
    paddingRight: '20px'
  };

  const renderStyledInput = (value, setValue, placeholder, fieldName, isNumericKeypad = false, readOnly = false, extraStyle = {}) => {
    const isFocused = activeField === fieldName || focusedInput === fieldName;
    return (
      <div style={{ position: 'relative', width: '100%' }}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          readOnly={readOnly}
          inputMode={isNumericKeypad ? "none" : undefined}
          onFocus={() => {
            setFocusedInput(fieldName);
            if (isNumericKeypad) {
              setActiveField(fieldName);
              setShowNumericKeypad(true);
            }
          }}
          onBlur={() => {
            setFocusedInput(null);
          }}
          style={{
            ...inputStyle,
            marginTop: 0,
            paddingRight: readOnly ? '0px' : '28px',
            borderBottom: isFocused ? '2px solid #2563eb' : (isDark ? '1px solid #334155' : '1px solid #e2e8f0'),
            outline: 'none',
            transition: 'border-color 0.2s',
            ...extraStyle
          }}
        />
        {!readOnly && value && (
          <div
            onClick={() => setValue('')}
            style={{
              position: 'absolute',
              right: '2px',
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '4px',
              zIndex: 5
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#cbd5e1">
              <circle cx="12" cy="12" r="10" />
              <path d="M9 9l6 6M15 9l-6 6" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        )}
      </div>
    );
  };

  const labelStyle = {
    fontSize: '0.78rem',
    fontWeight: '500',
    color: isDark ? '#94a3b8' : '#64748b'
  };

  const titleStyle = {
    fontSize: '1rem',
    fontWeight: '600',
    color: isDark ? '#f8fafc' : '#0f172a'
  };

  const formatWon = (val) => {
    if (!val) return '';
    const cleanNum = val.replace(/\D/g, '');
    if (!cleanNum) return '';
    return cleanNum.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' 원';
  };

  const handleKeypadPress = (key) => {
    if (activeField === 'amount') {
      if (key === 'backspace') {
        setCustomAmount(prev => {
          const raw = prev.replace(/\D/g, '');
          const nextVal = raw.slice(0, -1);
          return formatWon(nextVal);
        });
      } else if (key === 'done' || key === 'dismiss') {
        setShowNumericKeypad(false);
        setActiveField(null);
      } else if (/^\d$/.test(key)) {
        setCustomAmount(prev => {
          const raw = prev.replace(/\D/g, '');
          if (raw.length >= 12) return prev;
          return formatWon(raw + key);
        });
      }
    } else if (activeField === 'account') {
      if (key === 'backspace') {
        setDirectAccountNumber(prev => prev.slice(0, -1));
      } else if (key === 'done' || key === 'dismiss') {
        setShowNumericKeypad(false);
        setActiveField(null);
      } else if (/^\d$/.test(key)) {
        setDirectAccountNumber(prev => {
          if (prev.length >= 16) return prev;
          return prev + key;
        });
      }
    } else if (activeField === 'phone') {
      if (key === 'backspace') {
        setPhoneNumber(prev => prev.slice(0, -1));
      } else if (key === 'done' || key === 'dismiss') {
        setShowNumericKeypad(false);
        setActiveField(null);
      } else if (/^\d$/.test(key)) {
        setPhoneNumber(prev => {
          if (prev.length >= 13) return prev;
          return prev + key;
        });
      }
    } else if (activeField === 'immediateAmount') {
      if (key === 'backspace') {
        setImmediateAmount(prev => {
          const raw = prev.replace(/\D/g, '');
          const nextVal = raw.slice(0, -1);
          return formatWon(nextVal);
        });
      } else if (key === 'done' || key === 'dismiss') {
        setShowNumericKeypad(false);
        setActiveField(null);
      } else if (/^\d$/.test(key)) {
        setImmediateAmount(prev => {
          const raw = prev.replace(/\D/g, '');
          if (raw.length >= 12) return prev;
          return formatWon(raw + key);
        });
      }
    }
  };

  const handleConfirmDate = () => {
    const formattedMonth = String(selectedMonth).padStart(2, '0');
    const formattedDate = String(selectedDate).padStart(2, '0');
    if (isToBe) {
      // Calculate date difference from today (2026-07-15)
      const selected = new Date(selectedYear, selectedMonth - 1, selectedDate);
      const today = new Date(2026, 6, 15); // Month index 6 is July
      const diffTime = selected - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays > 60 || diffDays < 0) {
        setShowDatePicker(false);
        setShowDateLimitPopup(true);
        return;
      }
      setStartDateStr(`${selectedYear}.${formattedMonth}.${formattedDate}`);
    } else {
      setStartDateStr(`${selectedYear}.${formattedMonth}`);
    }
    setShowDatePicker(false);
  };

  return (
    <div style={containerStyle}>
      {/* Top Phone Header Mock */}
      <div style={{
        height: '24px',
        padding: '0 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: isDark ? '#0b0f19' : '#ffffff',
        fontSize: '0.7rem',
        fontWeight: '700',
        color: isDark ? '#94a3b8' : '#64748b'
      }}>
        <span>SKT 2:28</span>
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <span>100</span>
        </div>
      </div>

      {/* Header */}
      <div style={headerStyle}>
        {(onBackClick || receiptStatus === 'inquiry') ? (
          <button 
            onClick={() => {
              if (receiptStatus === 'inquiry') {
                setReceiptStatus('form');
              } else if (onBackClick) {
                onBackClick();
              }
            }}
            style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, color: isDark ? '#fff' : '#000', display: 'flex', alignItems: 'center' }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        ) : (
          <button style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, color: isDark ? '#fff' : '#000' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        )}
        <span style={{ fontSize: '0.95rem', fontWeight: '800' }}>
          {receiptStatus === 'inquiry' ? '연금수령 신청 조회/취소' : '연금수령 신청'}
        </span>
        <button style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, color: isDark ? '#fff' : '#000' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
        </button>
      </div>      {/* Content */}
      {/* Content & Footer Area */}
      {receiptStatus === 'inquiry' ? (
        <div style={{
          ...contentStyle,
          backgroundColor: isDark ? '#0b0f19' : '#f3f4f6',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {/* Dropdown 703-134065(41) 오정한_IRP */}
          <div style={{ position: 'relative', marginTop: '4px' }}>
            <div style={{
              ...selectStyle,
              backgroundColor: isDark ? '#1e293b' : '#ffffff',
              border: isDark ? '1px solid #334155' : '1px solid #d2d6dc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              padding: '12px 14px',
              marginTop: 0
            }}>
              <span>703-134065(41) 오정한_IRP</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ opacity: 0.7 }}><path stroke={isDark ? '#cbd5e1' : '#6b7280'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m6 8 4 4 4-4"/></svg>
            </div>
          </div>

          {/* Details White Box */}
          <div style={{
            backgroundColor: isDark ? '#1e293b' : '#ffffff',
            borderRadius: '12px',
            padding: '24px 20px',
            border: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
              <span style={{ color: isDark ? '#94a3b8' : '#718096' }}>신청일자</span>
              <span style={{ fontWeight: '600', color: isDark ? '#cbd5e1' : '#1a202c' }}>2026.06.22</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
              <span style={{ color: isDark ? '#94a3b8' : '#718096' }}>수령방법</span>
              <span style={{ fontWeight: '600', color: isDark ? '#cbd5e1' : '#1a202c' }}>기간선택형</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
              <span style={{ color: isDark ? '#94a3b8' : '#718096' }}>입금 계좌번호</span>
              <span style={{ fontWeight: '600', color: isDark ? '#cbd5e1' : '#1a202c' }}>대신증권 145-109999-82</span>
            </div>

            {/* Divider line */}
            <div style={{ height: '1px', backgroundColor: isDark ? '#334155' : '#f1f5f9', margin: '8px 0' }} />

            {/* Button / Action text */}
            <div style={{ display: 'flex', justifyContent: 'center', padding: '6px 0' }}>
              {isCancelled ? (
                <span style={{ color: '#de201e', fontWeight: '800', fontSize: '0.95rem' }}>
                  취소 (고객확인)
                </span>
              ) : (
                <button 
                  onClick={() => setShowCancelConfirmModal(true)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#2563eb',
                    fontWeight: '800',
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    padding: '4px 16px',
                    textDecoration: 'none'
                  }}
                >
                  신청취소
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div ref={contentRef} onScroll={handleScroll} style={contentStyle}>
            {/* Account Dropdown */}
            <div style={{ position: 'relative' }}>
              {isToBe ? (
                <div 
                  onClick={() => setShowProductBottomSheet(true)}
                  style={{ 
                    ...selectStyle, 
                    cursor: 'pointer', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    paddingRight: '35px'
                  }}
                >
                  <span>{currentAccount}</span>
                </div>
              ) : (
                <select style={selectStyle}>
                  <option>200-233354(41) 김대신</option>
                </select>
              )}
              {isToBe && isDrawerOpen && (
                <span style={{
                  position: 'absolute',
                  top: '2px',
                  right: isToBe ? '35px' : '25px',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  backgroundColor: '#00c3a5',
                  color: '#ffffff',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.15)'
                }}>1</span>
              )}
            </div>

            {/* Section Title */}
            <div style={{ ...titleStyle, borderBottom: 'none', paddingBottom: 0 }}>
              연금수령 신청내역
            </div>

            {/* 기산일자 */}
            <div>
              <label style={labelStyle}>연금수령 기산일자</label>
              <input type="text" value="2032.02.23" readOnly style={{ ...inputStyle, borderBottom: 'none', backgroundColor: isDark ? '#1e293b' : '#f1f5f9', padding: '10px 12px', borderRadius: '4px' }} />
            </div>

            {/* 개시 일자 */}
            <div style={{ position: 'relative' }}>
              <label style={labelStyle}>수령 개시 일자</label>
              {isToBe ? (
                <>
                  <div 
                    onClick={() => {
                      setSelectedYear(2032);
                      setSelectedMonth(2);
                      setSelectedDate(23);
                      setShowDatePicker(true);
                    }}
                    style={{ ...selectStyle, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                  >
                    {startDateStr}
                  </div>
                  {isDrawerOpen && (
                    <span style={{
                      position: 'absolute',
                      top: '18px',
                      right: '25px',
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      backgroundColor: '#00c3a5',
                      color: '#ffffff',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 10,
                      boxShadow: '0 2px 4px rgba(0,0,0,0.15)'
                    }}>2</span>
                  )}
                </>
              ) : (
                <div 
                  onClick={() => {
                    setSelectedYear(2032);
                    setSelectedMonth(2);
                    setSelectedDate(23);
                    setShowDatePicker(true);
                  }}
                  style={{ ...selectStyle, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                >
                  {startDateStr}
                </div>
              )}
            </div>

            {/* 수령 희망일 */}
            {!isToBe && (
              <div>
                <div style={buttonRowStyle}>
                  {['5일', '10일', '15일', '20일', '25일'].map(day => (
                    <div 
                      key={day} 
                      onClick={() => setSelectedDay(day)} 
                      style={dateButtonStyle(day)}
                    >
                      {day}
                    </div>
                  ))}
                </div>
                <span style={{ fontSize: '0.68rem', color: '#94a3b8', marginTop: '6px', display: 'block' }}>
                  ※ [ 연금수령 기산일자 ] 이후의 5,10,15,20,25일 중 선택 가능
                </span>
              </div>
            )}

            {isToBe && (
              <div style={{ marginTop: '-8px' }}>
                <span style={{ fontSize: '0.74rem', color: '#6b7280', display: 'block', lineHeight: '1.4' }}>
                  ※ 개시일자는 신청일로부터 최장 60일 이내로 설정 가능
                </span>
              </div>
            )}

            {/* 수령 주기 / 수령 방법 (유형) 순서 분기 처리 */}
            {isToBe ? (
              <>
                {/* TO BE: 수령 주기 (위로 이동) */}
                <div>
                  <label style={labelStyle}>수령 주기</label>
                  <div 
                    onClick={() => setShowPeriodPicker(true)}
                    style={{ ...selectStyle, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                  >
                    {selectedPeriod}
                  </div>
                </div>

                {/* TO BE: 수령 방법 */}
                <div>
                  <label style={labelStyle}>수령 방법</label>
                  <div 
                    onClick={() => setShowMethodPicker(true)}
                    style={{ ...selectStyle, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                  >
                    {selectedMethod}
                  </div>
                  {/* 각 항목 선택 시 노출될 하단 정보 카드 분기 */}
                  {selectedMethod === '기간 선택형' && (
                    <>
                      {renderStyledInput(customPeriod, setCustomPeriod, "10 년", "period")}
                      <span style={{ fontSize: '0.72rem', color: '#6b7280', display: 'block', marginTop: '6px', paddingLeft: '4px' }}>
                        ※ 최소1년 ~ 최대50년 까지 가능합니다.
                      </span>
                    </>
                  )}
                  {selectedMethod === '한도 수령형' && (
                    renderStyledInput("11,876 원", () => {}, "", "limit", false, true)
                  )}
                  {selectedMethod === '금액 선택형' && (
                    renderStyledInput(customAmount, setCustomAmount, "2,500,000 원", "amount", true)
                  )}
                </div>
              </>
            ) : (
              <>
                {/* AS IS: 수령 주기 */}
                <div>
                  <label style={labelStyle}>수령 주기</label>
                  <div 
                    onClick={() => setShowPeriodPicker(true)}
                    style={{ ...selectStyle, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                  >
                    {selectedPeriod}
                  </div>
                </div>

                {/* AS IS: 수령 방법 */}
                <div>
                  <label style={labelStyle}>수령 방법</label>
                  <div 
                    onClick={() => setShowMethodPicker(true)}
                    style={{ ...selectStyle, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                  >
                    {selectedMethod}
                  </div>
                  
                  {/* 각 항목 선택 시 노출될 하단 정보 카드 분기 */}
                  {selectedMethod === '기간 선택형' && (
                    <>
                      {renderStyledInput(customPeriod, setCustomPeriod, "10 년", "period")}
                      <span style={{ fontSize: '0.72rem', color: '#6b7280', display: 'block', marginTop: '6px', paddingLeft: '4px' }}>
                        ※ 최소1년 ~ 최대50년 까지 가능합니다.
                      </span>
                    </>
                  )}
                  {selectedMethod === '한도 수령형' && (
                    renderStyledInput("11,876 원", () => {}, "", "limit", false, true)
                  )}
                  {selectedMethod === '금액 선택형' && (
                    <>
                      {renderStyledInput(customAmount, setCustomAmount, "2,500,000 원", "amount", true)}
                      <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                        <div style={{ flex: 1 }}>
                          {renderStyledInput(directAccountNumber, setDirectAccountNumber, "계좌번호 직접입력", "account", true)}
                        </div>
                        {selectedBank && directAccountNumber ? (
                          <button style={{
                            padding: '0 12px',
                            borderRadius: '4px',
                            border: '1px solid #e2e8f0',
                            backgroundColor: '#ffffff',
                            color: '#94a3b8',
                            fontSize: '0.75rem',
                            fontWeight: '700',
                            cursor: 'not-allowed'
                          }}>확인완료</button>
                        ) : (
                          <button style={{
                            padding: '0 12px',
                            borderRadius: '4px',
                            border: '1px solid #e2e8f0',
                            backgroundColor: '#ffffff',
                            color: '#4b5563',
                            fontSize: '0.75rem',
                            fontWeight: '700',
                            cursor: 'pointer'
                          }}>계좌확인</button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </>
            )}

            {/* 수령계좌 정보 */}
            <div style={{ position: 'relative' }}>
              <label style={labelStyle}>수령계좌 정보</label>
              <div 
                onClick={() => setShowBankPicker(true)}
                style={{ ...selectStyle, cursor: 'pointer', display: 'flex', alignItems: 'center', color: selectedBank ? (isDark ? '#cbd5e1' : '#333333') : '#a0aec0' }}
              >
                {selectedBank || '수령계좌 선택'}
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                  {renderStyledInput(directAccountNumber, setDirectAccountNumber, "계좌번호 직접입력", "account", true, false, { boxSizing: 'border-box' })}
                  {isToBe && isDrawerOpen && (
                    <span style={{
                      position: 'absolute',
                      top: '12px',
                      right: '28px',
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      backgroundColor: '#00c3a5',
                      color: '#ffffff',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 10,
                      boxShadow: '0 2px 4px rgba(0,0,0,0.15)'
                    }}>4</span>
                  )}
                </div>
                {selectedBank && directAccountNumber ? (
                  <button style={{
                    padding: '0 12px',
                    borderRadius: '4px',
                    border: '1px solid #e2e8f0',
                    backgroundColor: '#ffffff',
                    color: '#94a3b8',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    cursor: 'not-allowed'
                  }}>확인완료</button>
                ) : (
                  <button style={{
                    padding: '0 12px',
                    borderRadius: '4px',
                    border: '1px solid #e2e8f0',
                    backgroundColor: '#ffffff',
                    color: '#4b5563',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}>계좌확인</button>
                )}
              </div>
              {selectedBank && directAccountNumber && (
                <span style={{ fontSize: '0.68rem', color: '#2563eb', marginTop: '4px', display: 'block' }}>
                  계좌가 확인되었습니다.
                </span>
              )}
              {isToBe && isDrawerOpen && (
                <span style={{
                  position: 'absolute',
                  top: '18px',
                  right: '25px',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  backgroundColor: '#00c3a5',
                  color: '#ffffff',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.15)'
                }}>3</span>
              )}
            </div>

            {/* 연락처 */}
            <div style={{ position: 'relative' }}>
              <label style={labelStyle}>수령 개시 신청 내역 확인 시 연락처</label>
              {renderStyledInput(phoneNumber, setPhoneNumber, "전화번호 입력", "phone", true)}
              {isToBe && isDrawerOpen && (
                <span style={{
                  position: 'absolute',
                  top: '18px',
                  right: '10px',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  backgroundColor: '#00c3a5',
                  color: '#ffffff',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.15)'
                }}>4</span>
              )}
            </div>

            {/* 즉시 인출 금액 */}
            <div>
              <label style={labelStyle}>즉시 인출 금액(선택)</label>
              {renderStyledInput(immediateAmount, setImmediateAmount, "금액 입력", "immediateAmount", true)}
            </div>
          </div>

          {/* Footer */}
          <div style={footerStyle}>
            {/* Checkbox agreement */}
            <div style={{ position: 'relative' }}>
              <label 
                onClick={() => setShowNoticePopup(true)}
                style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', cursor: 'pointer', userSelect: 'none' }}
              >
                <input 
                  type="checkbox" 
                  checked={agreed} 
                  onChange={(e) => setAgreed(e.target.checked)} 
                  style={{ marginTop: '3px', cursor: 'pointer' }} 
                />
                <span style={{ fontSize: '0.72rem', color: isDark ? '#f8fafc' : '#2563eb', fontWeight: '800', lineHeight: '1.4' }}>
                  연금수령 관련 유의사항을 제공 받았고, 그 주요 내용을 읽고 동의합니다.
                </span>
              </label>
              {isToBe && isDrawerOpen && (
                <span style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-4px',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  backgroundColor: '#00c3a5',
                  color: '#ffffff',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.15)'
                }}>5</span>
              )}
            </div>

            {/* Submit button */}
            <button 
              onClick={() => {
                if (isToBe) {
                  setShowConfirmModal(true);
                }
              }}
              style={{
                width: '100%',
                padding: '14px 0',
                backgroundColor: '#1e293b',
                color: '#ffffff',
                border: 'none',
                borderRadius: '4px',
                fontSize: '0.95rem',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              신청
            </button>
          </div>
        </>
      )}

      {/* S&P500 Footer bar */}
      <div style={{
        height: '24px',
        borderTop: isDark ? '1px solid #1e293b' : '1px solid #eeeeee',
        backgroundColor: isDark ? '#111827' : '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 12px',
        fontSize: '0.7rem'
      }}>
        <span style={{ fontWeight: '600' }}>S&P500</span>
        <span style={{ color: '#de201e', fontWeight: '700' }}>7,440.43 ▲ 86.41 (1.18%)</span>
      </div>

      {/* Navigation Footer */}
      <div style={{
        height: '44px',
        display: 'flex',
        alignItems: 'stretch',
        borderTop: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0',
        backgroundColor: isDark ? '#121826' : '#ffffff',
        position: 'relative',
        color: isDark ? '#cbd5e1' : '#333333'
      }}>
        {/* Home button */}
        <button style={{ width: '48px', border: 'none', background: 'none', borderRight: isDark ? '1px solid #1e293b' : '1px solid #f1f5f9', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ color: isDark ? '#cbd5e1' : '#333333' }}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
        </button>

        {/* Middle text tabs */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'stretch', position: 'relative' }}>
          {[
            { key: '보유상품 현황', label: `보유상품\n현황` },
            { key: 'ETF/리츠 잔고', label: `ETF/리츠\n잔고` },
            { key: 'ETF/리츠 체결/미체결', label: `ETF/리츠\n체결/미체결` },
            { key: 'ETF/리츠 주문', label: `ETF/리츠\n주문` }
          ].map((tab, idx) => {
            return (
              <button
                key={tab.key}
                style={{
                  flex: 1,
                  border: 'none',
                  background: 'none',
                  borderRight: idx < 3 ? (isDark ? '1px solid #1e293b' : '1px solid #f1f5f9') : 'none',
                  cursor: 'pointer',
                  fontSize: '0.72rem',
                  fontWeight: '600',
                  color: isDark ? '#cbd5e1' : '#333333',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  whiteSpace: 'pre-line',
                  lineHeight: '1.2',
                  padding: '2px 4px'
                }}
              >
                {tab.label}
              </button>
            );
          })}
          
          {/* Small up chevron Indicator */}
          <div style={{
            position: 'absolute',
            bottom: '0px',
            left: '50%',
            transform: 'translateX(-50%)',
            lineHeight: '1',
            fontSize: '0.55rem',
            color: isDark ? '#64748b' : '#94a3b8',
            pointerEvents: 'none'
          }}>
            ▲
          </div>
        </div>

        {/* Back button */}
        <button 
          onClick={onBackClick}
          style={{ width: '48px', border: 'none', background: 'none', borderLeft: isDark ? '1px solid #1e293b' : '1px solid #f1f5f9', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ color: isDark ? '#cbd5e1' : '#333333' }}><path d="M9 14L4 9l5-5" /><path d="M4 9h10a5 5 0 0 1 5 5v5" /></svg>
        </button>
      </div>

      {/* Date Picker Modal Overlay */}
      {showDatePicker && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxSizing: 'border-box'
        }}>
          {/* Modal Container */}
          <div style={{
            width: '280px',
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            border: '1px solid #e2e8f0'
          }}>
            {/* Picker Wheels Area */}
            <div style={{
              display: 'flex',
              padding: '24px 16px',
              justifyContent: 'space-around',
              alignItems: 'center',
              position: 'relative',
              backgroundColor: '#ffffff',
              height: '160px',
              boxSizing: 'border-box'
            }}>
              {/* Highlight Lines */}
              <div style={{
                position: 'absolute',
                top: '62px',
                left: '16px',
                right: '16px',
                height: '1.5px',
                backgroundColor: '#3b82f6',
                pointerEvents: 'none'
              }} />
              <div style={{
                position: 'absolute',
                top: '94px',
                left: '16px',
                right: '16px',
                height: '1.5px',
                backgroundColor: '#3b82f6',
                pointerEvents: 'none'
              }} />

              {/* Year Column */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 2 }}>
                <span 
                  onClick={() => setSelectedYear(2031)}
                  style={{ fontSize: '0.88rem', color: selectedYear === 2031 ? '#a0aec0' : '#d2d6dc', cursor: 'pointer', transition: 'color 0.2s' }}
                >
                  2031
                </span>
                <span style={{ fontSize: '1.05rem', fontWeight: 'bold', color: '#1a202c' }}>
                  2032
                </span>
                <span 
                  onClick={() => setSelectedYear(2033)}
                  style={{ fontSize: '0.88rem', color: selectedYear === 2033 ? '#a0aec0' : '#d2d6dc', cursor: 'pointer', transition: 'color 0.2s' }}
                >
                  2033
                </span>
              </div>

              {/* Month Column */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 2 }}>
                <span 
                  onClick={() => setSelectedMonth(prev => Math.max(1, prev - 1))}
                  style={{ fontSize: '0.88rem', color: '#d2d6dc', cursor: 'pointer' }}
                >
                  {selectedMonth - 1 < 1 ? 12 : selectedMonth - 1}
                </span>
                <span style={{ fontSize: '1.05rem', fontWeight: 'bold', color: '#1a202c' }}>
                  {selectedMonth}
                </span>
                <span 
                  onClick={() => setSelectedMonth(prev => Math.min(12, prev + 1))}
                  style={{ fontSize: '0.88rem', color: '#d2d6dc', cursor: 'pointer' }}
                >
                  {selectedMonth + 1 > 12 ? 1 : selectedMonth + 1}
                </span>
              </div>

              {/* Date Column */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 2 }}>
                <span 
                  onClick={() => setSelectedDate(prev => Math.max(1, prev - 1))}
                  style={{ fontSize: '0.88rem', color: '#d2d6dc', cursor: 'pointer' }}
                >
                  {selectedDate - 1 < 1 ? 31 : selectedDate - 1}
                </span>
                <span style={{ fontSize: '1.05rem', fontWeight: 'bold', color: '#1a202c' }}>
                  {String(selectedDate).padStart(2, '0')}
                </span>
                <span 
                  onClick={() => setSelectedDate(prev => Math.min(31, prev + 1))}
                  style={{ fontSize: '0.88rem', color: '#d2d6dc', cursor: 'pointer' }}
                >
                  {selectedDate + 1 > 31 ? 1 : selectedDate + 1}
                </span>
              </div>
            </div>

            {/* Buttons Area */}
            <div style={{
              display: 'flex',
              borderTop: '1px solid #f0f4f8',
              height: '48px',
              backgroundColor: '#fbfcfd'
            }}>
              <button 
                onClick={() => setShowDatePicker(false)}
                style={{
                  flex: 1,
                  border: 'none',
                  background: 'none',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: '#4a5568',
                  cursor: 'pointer',
                  borderRight: '1px solid #f0f4f8'
                }}
              >
                취소
              </button>
              <button 
                onClick={handleConfirmDate}
                style={{
                  flex: 1,
                  border: 'none',
                  background: 'none',
                  fontSize: '0.9rem',
                  fontWeight: '700',
                  color: '#2b6cb0',
                  cursor: 'pointer'
                }}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Method Picker Overlay Page */}
      {showMethodPicker && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#ffffff',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
          color: '#333333'
        }}>
          {/* Header Close button */}
          <div style={{
            display: 'flex',
            padding: '16px',
            boxSizing: 'border-box'
          }}>
            <button 
              onClick={() => setShowMethodPicker(false)}
              style={{
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                padding: 0,
                color: '#333333',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Title Area */}
          <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '1.45rem', fontWeight: '600', color: '#1a202c', letterSpacing: '-0.5px' }}>수령방법을</span>
            <span style={{ fontSize: '1.45rem', fontWeight: '600', color: '#1a202c', letterSpacing: '-0.5px' }}>선택해 주세요</span>
          </div>

          {/* Selection Items Container */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '12px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxSizing: 'border-box'
          }}>
            {/* 1. 기간 선택형 */}
            <div 
              onClick={() => {
                setSelectedMethod('기간 선택형');
                setShowMethodPicker(false);
              }}
              style={{
                padding: '20px',
                borderRadius: '8px',
                border: selectedMethod === '기간 선택형' ? '1.5px solid #2563eb' : '1px solid #e2e8f0',
                backgroundColor: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <span style={{ fontSize: '1.05rem', fontWeight: '600', color: '#1a202c' }}>기간 선택형</span>
              <span style={{ fontSize: '0.78rem', color: '#718096', lineHeight: '1.4', wordBreak: 'keep-all' }}>
                연금을 수령할 기간을 지정하고 그 기간동안 산정된 금액을 수령하는 방법
              </span>
            </div>

            {/* 2. 한도 수령형 (TO BE 에서는 제거) */}
            {!isToBe && (
              <div 
                onClick={() => {
                  setSelectedMethod('한도 수령형');
                  setShowMethodPicker(false);
                }}
                style={{
                  padding: '20px',
                  borderRadius: '8px',
                  border: selectedMethod === '한도 수령형' ? '1.5px solid #2563eb' : '1px solid #e2e8f0',
                  backgroundColor: '#ffffff',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <span style={{ fontSize: '1.05rem', fontWeight: '600', color: '#1a202c' }}>한도 수령형</span>
                <span style={{ fontSize: '0.78rem', color: '#718096', lineHeight: '1.4', wordBreak: 'keep-all' }}>
                  세법상 정해진 연금수령한도액 내에서 수령기간에 따라 연금을 수령하는 방법
                </span>
              </div>
            )}

            {/* 3. 금액 선택형 */}
            <div 
              onClick={() => {
                setSelectedMethod('금액 선택형');
                setShowMethodPicker(false);
              }}
              style={{
                padding: '20px',
                borderRadius: '8px',
                border: selectedMethod === '금액 선택형' ? '1.5px solid #2563eb' : '1px solid #e2e8f0',
                backgroundColor: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <span style={{ fontSize: '1.05rem', fontWeight: '600', color: '#1a202c' }}>금액 선택형</span>
              <span style={{ fontSize: '0.78rem', color: '#718096', lineHeight: '1.4', wordBreak: 'keep-all' }}>
                수령할 금액을 지정하여 연금을 수령하는 방법
              </span>
            </div>

            <span style={{
              fontSize: '0.72rem',
              color: '#a0aec0',
              lineHeight: '1.4',
              marginTop: '8px',
              wordBreak: 'keep-all'
            }}>
              ※ 기간 선택형과 금액 선택형의 경우 퇴직/기타 소득세가 발생할 수 있습니다.
            </span>
          </div>
        </div>
      )}
      {/* Period Picker Overlay (수령 주기 선택 모달) */}
      {showPeriodPicker && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'flex-end',
          boxSizing: 'border-box'
        }}>
          {/* Bottom Sheet Container */}
          <div style={{
            width: '100%',
            backgroundColor: '#ffffff',
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
            boxShadow: '0 -4px 20px rgba(0,0,0,0.15)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            padding: '24px 20px',
            boxSizing: 'border-box',
            animation: 'slideUp 0.25s ease-out'
          }}>
            {/* Title */}
            <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1a202c', marginBottom: '20px' }}>
              수령 주기 선택
            </div>
            
            {/* Option List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {['월', '분기', '반기', '년'].map((period) => (
                <div 
                  key={period} 
                  onClick={() => {
                    setSelectedPeriod(period);
                    setShowPeriodPicker(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 0',
                    fontSize: '1.02rem',
                    fontWeight: selectedPeriod === period ? '700' : '500',
                    color: selectedPeriod === period ? '#111827' : '#4b5563',
                    cursor: 'pointer'
                  }}
                >
                  <span>{period}</span>
                  {selectedPeriod === period && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bank Picker Overlay (금융기관 선택 모달 - 바텀시트 레이아웃) */}
      {showBankPicker && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'flex-end',
          boxSizing: 'border-box'
        }}>
          {/* Bottom Sheet Container */}
          <div style={{
            width: '100%',
            height: 'calc(100% - 68px)', // 헤더 영역 바로 아래까지 오도록 높이 지정
            backgroundColor: '#ffffff',
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
            boxShadow: '0 -4px 20px rgba(0,0,0,0.15)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            padding: '24px 20px 12px 20px',
            boxSizing: 'border-box',
            animation: 'slideUp 0.25s ease-out'
          }}>
            {/* Header Close button */}
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginBottom: '10px'
            }}>
              <button 
                onClick={() => setShowBankPicker(false)}
                style={{
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  color: '#333333'
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Title Area */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '16px' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: '800', color: '#1a202c', letterSpacing: '-0.5px' }}>금융기관 선택</span>
              <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#718096', marginTop: '12px' }}>은행</span>
            </div>

            {/* Bank List Container */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              paddingBottom: '20px',
              boxSizing: 'border-box'
            }}>
              {[
                { name: '경남은행', code: '039', color: '#d32f2f' },
                { name: '광주은행', code: '034', color: '#0288d1' },
                { name: '국민은행', code: '004', color: '#fbc02d' },
                { name: '기업은행', code: '003', color: '#1976d2' },
                { name: '도이치은행', code: '055', color: '#0d47a1' },
                { name: '부산은행', code: '032', color: '#d32f2f' },
                { name: '비엔피파리바은행', code: '056', color: '#388e3c' },
                { name: '산림조합중앙회', code: '064', color: '#388e3c' },
                { name: '산업은행', code: '002', color: '#0288d1' },
                { name: '새마을금고', code: '045', color: '#1976d2' },
                { name: '수협은행', code: '007', code: '#0288d1' },
                { name: '신한은행', code: '088', color: '#1565c0' }
              ].map((bank) => (
                <div 
                  key={bank.name} 
                  onClick={() => {
                    setSelectedBank(bank.name);
                    setShowBankPicker(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    cursor: 'pointer',
                    padding: '4px 0'
                  }}
                >
                  {/* Simulated circular icon representing the bank */}
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: bank.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontSize: '0.62rem',
                    fontWeight: '800'
                  }}>
                    {bank.name.substring(0, 2)}
                  </div>
                  <span style={{ fontSize: '1.02rem', fontWeight: '500', color: '#1a202c' }}>
                    {bank.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Bottom Sheet 1: 상품 선택 */}
      {isToBe && showProductBottomSheet && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 1001,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          boxSizing: 'border-box'
        }}>
          {/* Backdrop Click */}
          <div style={{ flex: 1 }} onClick={() => setShowProductBottomSheet(false)} />
          {/* Sheet Panel */}
          <div style={{
            backgroundColor: isDark ? '#1e293b' : '#ffffff',
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
            padding: '24px 20px 30px 20px',
            color: isDark ? '#f8fafc' : '#111827',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            boxShadow: '0 -4px 20px rgba(0,0,0,0.15)',
            boxSizing: 'border-box'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: '800' }}>상품 선택</span>
              <button 
                onClick={() => {
                  setShowProductBottomSheet(false);
                  setShowAccountBottomSheet(true);
                }}
                style={{
                  backgroundColor: 'transparent',
                  border: '1px solid #2563eb',
                  color: '#2563eb',
                  borderRadius: '4px',
                  padding: '5px 12px',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                다른 계좌 선택
              </button>
            </div>

            <div 
              onClick={() => {
                setShowProductBottomSheet(false);
              }}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 0',
                borderBottom: isDark ? '1px solid #334155' : '1px solid #f1f3f5',
                cursor: 'pointer'
              }}
            >
              <span style={{ fontSize: '1.02rem', fontWeight: '600' }}>(41) 개인형퇴직연금(IRP)</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Sheet 2: 사용하실 계좌 선택 */}
      {isToBe && showAccountBottomSheet && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 1002,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          boxSizing: 'border-box'
        }}>
          {/* Backdrop Click */}
          <div style={{ flex: 1 }} onClick={() => setShowAccountBottomSheet(false)} />
          {/* Sheet Panel */}
          <div style={{
            backgroundColor: isDark ? '#1e293b' : '#ffffff',
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
            padding: '24px 20px 30px 20px',
            color: isDark ? '#f8fafc' : '#111827',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            boxShadow: '0 -4px 20px rgba(0,0,0,0.15)',
            boxSizing: 'border-box'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: '800' }}>사용하실 계좌 선택</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: 'pointer', opacity: 0.7 }}>
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06-.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* Account 1 */}
              <div 
                onClick={() => {
                  setCurrentAccount('200-233354(41) 김대신');
                  setShowAccountBottomSheet(false);
                }}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 0',
                  borderBottom: isDark ? '1px solid #334155' : '1px solid #f1f3f5',
                  cursor: 'pointer'
                }}
              >
                <div>
                  <div style={{ fontSize: '1.02rem', fontWeight: '700' }}>200-233354</div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '4px' }}>최근사용일자 : 2026.07.01</div>
                </div>
                {currentAccount.includes('200-233354') && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>

              {/* Account 2 */}
              <div 
                onClick={() => {
                  setCurrentAccount('161-119731(41) 김대신');
                  setShowAccountBottomSheet(false);
                }}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 0',
                  borderBottom: isDark ? '1px solid #334155' : '1px solid #f1f3f5',
                  cursor: 'pointer'
                }}
              >
                <div>
                  <div style={{ fontSize: '1.02rem', fontWeight: '700' }}>161-119731</div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '4px' }}>최근사용일자 : 2026.06.22</div>
                </div>
                {currentAccount.includes('161-119731') && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Numeric Keypad Render Helpers */}
      {(() => {
        const renderKeypadKey = (num) => (
          <div 
            onClick={() => handleKeypadPress(num)}
            style={{
              backgroundColor: isDark ? '#334155' : '#ffffff',
              color: isDark ? '#ffffff' : '#000000',
              borderRadius: '6px',
              height: '46px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(0,0,0,0.15)'
            }}
          >
            {num}
          </div>
        );

        const renderKeypadActionKey = (action, content, customStyle = {}) => (
          <div 
            onClick={() => handleKeypadPress(action)}
            style={{
              backgroundColor: isDark ? '#1e293b' : '#b0b3b8',
              color: isDark ? '#cbd5e1' : '#000000',
              borderRadius: '6px',
              height: '46px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
              ...customStyle
            }}
          >
            {content}
          </div>
        );

        if (!showNumericKeypad) return null;

        return (
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: isDark ? '#1e293b' : '#d2d5db',
            padding: '6px',
            borderTop: isDark ? '1px solid #334155' : '1px solid #b0b3b8',
            zIndex: 2000,
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '6px',
            userSelect: 'none',
            boxSizing: 'border-box'
          }}>
            {/* Row 1 */}
            {renderKeypadKey('1')}
            {renderKeypadKey('2')}
            {renderKeypadKey('3')}
            {renderKeypadActionKey('backspace', (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/>
                <line x1="18" y1="9" x2="12" y2="15"/>
                <line x1="12" y1="9" x2="18" y2="15"/>
              </svg>
            ))}

            {/* Row 2 */}
            {renderKeypadKey('4')}
            {renderKeypadKey('5')}
            {renderKeypadKey('6')}
            {renderKeypadActionKey('done', '완료', { color: '#2563eb', fontWeight: '800' })}

            {/* Row 3 */}
            {renderKeypadKey('7')}
            {renderKeypadKey('8')}
            {renderKeypadKey('9')}
            {renderKeypadActionKey('dot', '.')}

            {/* Row 4 */}
            {renderKeypadActionKey('mic', '🎙️')}
            {renderKeypadKey('0')}
            {renderKeypadActionKey('dismiss', (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            ))}
            {renderKeypadActionKey('comma', ',')}
          </div>
        );
      })()}

      {/* Notice Fullscreen Popup Overlay */}
      {showNoticePopup && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: isDark ? '#0b0f19' : '#ffffff',
          zIndex: 2500,
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box'
        }}>
          {/* Header */}
          <div style={{
            height: '48px',
            padding: '0 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            borderBottom: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
            backgroundColor: isDark ? '#1e293b' : '#ffffff'
          }}>
            <button 
              onClick={() => setShowNoticePopup(false)}
              style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, color: isDark ? '#fff' : '#000', display: 'flex', alignItems: 'center' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <span style={{ fontSize: '0.92rem', fontWeight: '800', color: isDark ? '#f8fafc' : '#0f172a' }}>
              연금저축계좌 개시/해지 및 중도인출 관련 안내
            </span>
          </div>

          {/* Scrollable Content */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px 16px',
            boxSizing: 'border-box',
            backgroundColor: isDark ? '#0b0f19' : '#ffffff'
          }}>
          </div>

          {/* Bottom Agree Button */}
          <div 
            onClick={() => {
              setAgreed(true);
              setShowNoticePopup(false);
            }}
            style={{
              height: '52px',
              backgroundColor: '#1c1c1e',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem',
              fontWeight: '800',
              cursor: 'pointer',
              borderTop: isDark ? '1px solid #334155' : 'none'
            }}
          >
            동의
          </div>
        </div>
      )}

      {/* 1. 신청 확인 모달 (Attachment 1) */}
      {showConfirmModal && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 3000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxSizing: 'border-box'
        }}>
          <div style={{
            width: '280px',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            border: '1px solid #e2e8f0',
          }}>
            <div style={{
              padding: '30px 20px',
              textAlign: 'center',
              fontSize: '0.95rem',
              fontWeight: '500',
              color: '#222222',
              lineHeight: '1.4',
              backgroundColor: '#ffffff'
            }}>
              연금 수령 신청 하시겠습니까?
            </div>
            <div style={{ display: 'flex', borderTop: '1px solid #e2e8f0' }}>
              <button 
                onClick={() => setShowConfirmModal(false)}
                style={{
                  flex: 1,
                  height: '48px',
                  border: 'none',
                  backgroundColor: '#f1f5f9',
                  color: '#475569',
                  fontWeight: '700',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  borderRight: '1px solid #e2e8f0'
                }}
              >
                아니오
              </button>
              <button 
                onClick={() => {
                  setShowConfirmModal(false);
                  setShowSuccessModal(true);
                }}
                style={{
                  flex: 1,
                  height: '48px',
                  border: 'none',
                  backgroundColor: '#1e293b',
                  color: '#ffffff',
                  fontWeight: '700',
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                네
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. 신청 완료 모달 (Attachment 2) */}
      {showSuccessModal && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 3000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxSizing: 'border-box'
        }}>
          <div style={{
            width: '280px',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{
              padding: '24px 20px 20px 20px',
              textAlign: 'center',
              backgroundColor: '#ffffff'
            }}>
              <div style={{
                fontSize: '1.05rem',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '14px'
              }}>
                연금수령 신청완료
              </div>
              <div style={{
                fontSize: '0.8rem',
                color: '#4b5563',
                lineHeight: '1.5',
                textAlign: 'center',
                wordBreak: 'keep-all'
              }}>
                영업점 및 고객센터에서 확인 후 유선으로 안내 드리고 진행될 예정입니다.
                <br /><br />
                신청한 날로부터 +1 영업일까지 유선 연결이 불가능한 경우 신청이 취소 될 수 있습니다.
              </div>
            </div>
            <div style={{ display: 'flex', borderTop: '1px solid #e2e8f0' }}>
              <button 
                onClick={() => setShowSuccessModal(false)}
                style={{
                  flex: 1,
                  height: '48px',
                  border: 'none',
                  backgroundColor: '#f1f5f9',
                  color: '#475569',
                  fontWeight: '700',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  borderRight: '1px solid #e2e8f0'
                }}
              >
                확인
              </button>
              <button 
                onClick={() => {
                  setShowSuccessModal(false);
                  setReceiptStatus('inquiry');
                }}
                style={{
                  flex: 1,
                  height: '48px',
                  border: 'none',
                  backgroundColor: '#1e293b',
                  color: '#ffffff',
                  fontWeight: '700',
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                신청내역 조회
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. 취소 확인 모달 (Attachment 4) */}
      {showCancelConfirmModal && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 3000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxSizing: 'border-box'
        }}>
          <div style={{
            width: '280px',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{
              padding: '30px 20px',
              textAlign: 'center',
              fontSize: '0.95rem',
              fontWeight: '500',
              color: '#222222',
              lineHeight: '1.4',
              backgroundColor: '#ffffff'
            }}>
              연금 수령 신청을
              <br />
              취소 하시겠습니까?
            </div>
            <div style={{ display: 'flex', borderTop: '1px solid #e2e8f0' }}>
              <button 
                onClick={() => setShowCancelConfirmModal(false)}
                style={{
                  flex: 1,
                  height: '48px',
                  border: 'none',
                  backgroundColor: '#f1f5f9',
                  color: '#475569',
                  fontWeight: '700',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  borderRight: '1px solid #e2e8f0'
                }}
              >
                아니오
              </button>
              <button 
                onClick={() => {
                  setShowCancelConfirmModal(false);
                  setIsCancelled(true);
                }}
                style={{
                  flex: 1,
                  height: '48px',
                  border: 'none',
                  backgroundColor: '#1e293b',
                  color: '#ffffff',
                  fontWeight: '700',
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                네
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Date limit warning popup (Attachment 2) */}
      {showDateLimitPopup && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 4000
        }}>
          <div style={{
            width: '260px',
            backgroundColor: '#ffffff',
            borderRadius: '2px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '32px 20px',
              fontSize: '0.86rem',
              color: '#333333',
              textAlign: 'center',
              lineHeight: '1.5',
              fontWeight: '600',
              wordBreak: 'keep-all'
            }}>
              수령 개시일자는 신청일로부터 최장60일 
              <br />
              이내로 설정 할 수있습니다.
            </div>
            <button 
              onClick={() => setShowDateLimitPopup(false)}
              style={{
                height: '42px',
                backgroundColor: '#222222',
                color: '#ffffff',
                border: 'none',
                fontSize: '0.88rem',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function PensionReceiptStatusView({ isDark, isToBe, activeTab, setActiveTab, viewMode, setViewMode, selectedItem, setSelectedItem, onBackClick }) {


  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '4px',
    border: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
    backgroundColor: isDark ? '#1e293b' : '#f8fafc',
    color: isDark ? '#f8fafc' : '#0f172a',
    fontSize: '0.92rem',
    fontWeight: '500',
    fontFamily: 'SF Pro Display, -apple-system, Roboto, sans-serif',
    boxSizing: 'border-box',
    marginTop: '6px'
  };

  const selectStyle = {
    ...inputStyle,
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
    backgroundPosition: 'right 10px center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '1.25rem'
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    backgroundColor: isDark ? '#0b0f19' : '#ffffff',
    color: isDark ? '#cbd5e1' : '#333333',
    fontFamily: 'sans-serif',
    boxSizing: 'border-box',
    position: 'relative'
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    borderBottom: isDark ? '1px solid #1e293b' : '1px solid #eeeeee',
    backgroundColor: isDark ? '#111827' : '#ffffff',
    height: '44px',
    boxSizing: 'border-box'
  };

  const contentStyle = {
    flex: 1,
    overflowY: 'auto',
    backgroundColor: isDark ? '#0b0f19' : '#f8fafc',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box'
  };

  // Receipt History Data Array
  const historyData = [
    { date: '2026.06.19', total: '10,000,000', actual: '10,000,000', pensionTax: '0', localTax: '0' },
    { date: '2026.06.17', total: '170,078', actual: '170,078', pensionTax: '0', localTax: '0' },
    { date: '2026.05.15', total: '1,361,736', actual: '1,326,676', pensionTax: '31,880', localTax: '3,180' },
    { date: '2026.04.15', total: '1,188,627', actual: '1,158,027', pensionTax: '27,810', localTax: '2,790' },
    { date: '2026.03.13', total: '1,270,857', actual: '1,243,597', pensionTax: '24,780', localTax: '2,480' },
    { date: '2026.02.13', total: '1,225,202', actual: '1,198,912', pensionTax: '23,900', localTax: '2,390' },
    { date: '2026.01.15', total: '1,110,358', actual: '1,077,008', pensionTax: '30,310', localTax: '3,040' }
  ];

  if (viewMode === 'detail' && selectedItem) {
    // Attachment 3 Detail Screen Layout
    return (
      <div style={containerStyle}>
        {/* Back navigation header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '12px 16px',
          height: '44px',
          borderBottom: isDark ? '1px solid #1e293b' : 'none',
          backgroundColor: isDark ? '#111827' : '#ffffff'
        }}>
          <button 
            onClick={() => {
              setViewMode('list');
              setSelectedItem(null);
            }}
            style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, color: isDark ? '#fff' : '#000', display: 'flex', alignItems: 'center' }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
        </div>

        {/* Detailed Screen Body */}
        <div style={{ flex: 1, padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '30px', backgroundColor: isDark ? '#0b0f19' : '#ffffff' }}>
          <div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: '700', margin: '0 0 8px 0', color: isDark ? '#f8fafc' : '#111827' }}>상세 지급내역입니다.</h2>
            <p style={{ fontSize: '1.02rem', color: isDark ? '#94a3b8' : '#4b5563', margin: 0 }}>
              실지급액은 <span style={{ color: '#2563eb', fontWeight: '700' }}>{selectedItem.actual}</span> 원 입니다
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '10px' }}>
            {[
              { label: '총 지급금액', value: `${selectedItem.total} 원` },
              { label: '퇴직소득세', value: '0 원' },
              { label: '퇴직지방소득세', value: '0 원' },
              { label: '기타소득세', value: '0 원' },
              { label: '기타지방소득세', value: '0 원' },
              { label: '연금소득세', value: `${selectedItem.pensionTax} 원` },
              { label: '연금지방소득세', value: `${selectedItem.localTax} 원` },
              { label: '세금 합계', value: `${(parseInt(selectedItem.pensionTax.replace(/,/g, '')) + parseInt(selectedItem.localTax.replace(/,/g, ''))).toLocaleString()} 원` }
            ].map((row, idx) => (
              <div 
                key={idx} 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  fontSize: '0.92rem', 
                  fontWeight: row.label.includes('합계') || row.label.includes('총') ? '700' : '500',
                  color: row.label.includes('합계') ? (isDark ? '#f8fafc' : '#111827') : (isDark ? '#cbd5e1' : '#4b5563')
                }}
              >
                <span>{row.label}</span>
                <span>{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Confirm Button Footer */}
        <div style={{ backgroundColor: '#1c1c1e' }}>
          <button 
            onClick={() => {
              setViewMode('list');
              setSelectedItem(null);
            }}
            style={{
              width: '100%',
              height: '56px',
              backgroundColor: '#1c1c1e',
              color: '#ffffff',
              border: 'none',
              borderRadius: '0',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            확인
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {/* Top Phone Header Mock */}
      <div style={{
        height: '24px',
        padding: '0 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: isDark ? '#0b0f19' : '#ffffff',
        fontSize: '0.7rem',
        fontWeight: '700',
        color: isDark ? '#94a3b8' : '#64748b'
      }}>
        <span>SKT 6:29</span>
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <span>88%</span>
        </div>
      </div>

      {/* Header */}
      <div style={headerStyle}>
        <button 
          onClick={onBackClick}
          style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, color: isDark ? '#fff' : '#000', display: 'flex', alignItems: 'center' }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <span style={{ fontSize: '0.95rem', fontWeight: '800' }}>연금수령 현황</span>
        <button style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, color: isDark ? '#fff' : '#000' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
        </button>
      </div>

      <div style={contentStyle}>
        {/* Dropdown 601-140641(41) 류억형 */}
        <div style={{ padding: '12px 16px 8px 16px', backgroundColor: isDark ? '#0b0f19' : '#ffffff' }}>
          <div style={{
            ...inputStyle,
            backgroundColor: isDark ? '#1e293b' : '#ffffff',
            border: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            padding: '10px 12px',
            marginTop: 0
          }}>
            <span>601-140641(41) 류억형</span>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" style={{ opacity: 0.7 }}><path stroke={isDark ? '#cbd5e1' : '#6b7280'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m6 8 4 4 4-4"/></svg>
          </div>
        </div>

        {/* Tab Row */}
        <div style={{
          display: 'flex',
          borderBottom: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0',
          backgroundColor: isDark ? '#0b0f19' : '#ffffff'
        }}>
          <div 
            onClick={() => setActiveTab('status')}
            style={{
              flex: 1,
              padding: '14px 0',
              textAlign: 'center',
              fontSize: '0.95rem',
              fontWeight: activeTab === 'status' ? '700' : '500',
              color: activeTab === 'status' ? '#111827' : '#718096',
              borderBottom: activeTab === 'status' ? '2.5px solid #111827' : 'none',
              cursor: 'pointer'
            }}
          >
            수령현황
          </div>
          <div 
            onClick={() => setActiveTab('details')}
            style={{
              flex: 1,
              padding: '14px 0',
              textAlign: 'center',
              fontSize: '0.95rem',
              fontWeight: activeTab === 'details' ? '700' : '500',
              color: activeTab === 'details' ? '#111827' : '#718096',
              borderBottom: activeTab === 'details' ? '2.5px solid #111827' : 'none',
              cursor: 'pointer'
            }}
          >
            수령내역
          </div>
        </div>

        {activeTab === 'status' ? (
          /* Tab 1: 수령현황 (Attachment 1) */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '16px' }}>
            {/* Top Quick Status */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              padding: '14px 16px',
              backgroundColor: isDark ? '#1e293b' : '#ffffff',
              borderRadius: '8px',
              border: isDark ? '1px solid #334155' : '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: '#718096' }}>연금 수령방식</span>
                <span style={{ fontWeight: '700', color: isDark ? '#f8fafc' : '#111827' }}>기간선택형</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: '#718096' }}>연금 수령주기</span>
                <span style={{ fontWeight: '700', color: isDark ? '#f8fafc' : '#111827' }}>월단위</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: '#718096' }}>연금 수령일</span>
                <span style={{ fontWeight: '700', color: '#2563eb' }}>15일</span>
              </div>
            </div>

            {/* 기본정보 Card */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h3 style={{ fontSize: '0.98rem', fontWeight: '700', margin: '4px 0', color: isDark ? '#f8fafc' : '#111827' }}>기본정보</h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                padding: '16px',
                backgroundColor: isDark ? '#1e293b' : '#ffffff',
                borderRadius: '8px',
                border: isDark ? '1px solid #334155' : '1px solid #e2e8f0'
              }}>
                {[
                  { label: '연금 수령 개시 신청일', value: '2016.04.01' },
                  { label: '연금 수령 개시 재 신청일', value: '2026.06.19' },
                  { label: '연금 수령 종료일', value: '2041.07.15' },
                  { label: '세법상 연금 수령 연차', value: '12' },
                  { label: '실제수령 연차', value: '11' },
                  { label: '잔여지급 횟수', value: '57' }
                ].map((row, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span style={{ color: '#718096' }}>{row.label}</span>
                    <span style={{ fontWeight: '600', color: isDark ? '#f8fafc' : '#111827' }}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 평가액 정보 Card */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h3 style={{ fontSize: '0.98rem', fontWeight: '700', margin: '4px 0', color: isDark ? '#f8fafc' : '#111827' }}>평가액 정보</h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                padding: '16px',
                backgroundColor: isDark ? '#1e293b' : '#ffffff',
                borderRadius: '8px',
                border: isDark ? '1px solid #334155' : '1px solid #e2e8f0'
              }}>
                {[
                  { label: '현재 평가액', value: '85,000,067' },
                  { label: '당해연도 세법상 연금 수령 한도(120%)', value: '0' },
                  { label: '연금 기수령액', value: '120,458,881' },
                  { label: '당해연도 총 수령액', value: '16,326,858' },
                  { label: '당해연도 연금 수령 가능 금액', value: '85,000,067' }
                ].map((row, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span style={{ color: '#718096' }}>{row.label}</span>
                    <span style={{ fontWeight: '600', color: isDark ? '#f8fafc' : '#111827' }}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 소득 구분 및 세후수령액 예상 Card */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: '700', margin: '4px 0', color: isDark ? '#f8fafc' : '#111827', lineHeight: '1.4' }}>
                소득 구분 및 세후수령액 예상(지방소득세 포함)
              </h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                padding: '16px',
                backgroundColor: isDark ? '#1e293b' : '#ffffff',
                borderRadius: '8px',
                border: isDark ? '1px solid #334155' : '1px solid #e2e8f0'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: '#718096' }}>수수료</span>
                  <span style={{ fontWeight: '600', color: isDark ? '#f8fafc' : '#111827' }}>0</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: '#718096' }}>수령액</span>
                  <span style={{ fontWeight: '700', color: isDark ? '#f8fafc' : '#111827' }}>80,595,147</span>
                </div>

                {/* Grid Table */}
                <div style={{
                  marginTop: '12px',
                  border: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  {/* Table Header */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1.2fr 1fr 1fr',
                    backgroundColor: isDark ? '#334155' : '#f1f5f9',
                    padding: '8px 4px',
                    fontSize: '0.78rem',
                    fontWeight: '700',
                    textAlign: 'center',
                    borderBottom: isDark ? '1px solid #334155' : '1px solid #e2e8f0'
                  }}>
                    <span>소득</span>
                    <span>지급액</span>
                    <span>세금계</span>
                  </div>

                  {/* Row 1: 과세 제외 금액 */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1.2fr 1fr 1fr',
                    padding: '8px 4px',
                    fontSize: '0.78rem',
                    textAlign: 'right',
                    borderBottom: isDark ? '1px solid #1e293b' : '1px solid #edf2f7'
                  }}>
                    <span style={{ textAlign: 'left', paddingLeft: '8px', color: '#718096' }}>과세 제외 금액</span>
                    <span style={{ paddingRight: '8px' }}>0</span>
                    <span style={{ paddingRight: '8px' }}>0</span>
                  </div>

                  {/* Row 2: 연금 소득 (종합과세) */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1.2fr 1fr 1fr',
                    padding: '8px 4px',
                    fontSize: '0.78rem',
                    textAlign: 'right',
                    borderBottom: isDark ? '1px solid #1e293b' : '1px solid #edf2f7'
                  }}>
                    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', paddingLeft: '8px' }}>
                      <span style={{ fontWeight: '600' }}>연금소득</span>
                      <span style={{ fontSize: '0.7rem', color: '#718096', marginLeft: '4px' }}>- 종합과세</span>
                    </div>
                    <span style={{ paddingRight: '8px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>75,766,083</span>
                    <span style={{ paddingRight: '8px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>4,167,130</span>
                  </div>

                  {/* Row 3: 연금 소득 (무조건분리과세) */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1.2fr 1fr 1fr',
                    padding: '8px 4px',
                    fontSize: '0.78rem',
                    textAlign: 'right',
                    borderBottom: isDark ? '1px solid #1e293b' : '1px solid #edf2f7'
                  }}>
                    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', paddingLeft: '8px' }}>
                      <span style={{ fontWeight: '600' }}>연금소득</span>
                      <span style={{ fontSize: '0.7rem', color: '#718096', marginLeft: '4px' }}>- 무조건분리과세</span>
                    </div>
                    <span style={{ paddingRight: '8px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>9,233,984</span>
                    <span style={{ paddingRight: '8px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>237,790</span>
                  </div>

                  {/* Row 4: 퇴직소득 */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1.2fr 1fr 1fr',
                    padding: '8px 4px',
                    fontSize: '0.78rem',
                    textAlign: 'right',
                    borderBottom: isDark ? '1px solid #1e293b' : '1px solid #edf2f7'
                  }}>
                    <span style={{ textAlign: 'left', paddingLeft: '8px', color: '#718096' }}>퇴직소득</span>
                    <span style={{ paddingRight: '8px' }}>0</span>
                    <span style={{ paddingRight: '8px' }}>0</span>
                  </div>

                  {/* Row 5: 기타소득 */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1.2fr 1fr 1fr',
                    padding: '8px 4px',
                    fontSize: '0.78rem',
                    textAlign: 'right',
                    borderBottom: isDark ? '1px solid #1e293b' : '1px solid #edf2f7'
                  }}>
                    <span style={{ textAlign: 'left', paddingLeft: '8px', color: '#718096' }}>기타소득</span>
                    <span style={{ paddingRight: '8px' }}>0</span>
                    <span style={{ paddingRight: '8px' }}>0</span>
                  </div>

                  {/* Row 6: 합계 */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1.2fr 1fr 1fr',
                    padding: '8px 4px',
                    fontSize: '0.78rem',
                    textAlign: 'right',
                    fontWeight: '700',
                    backgroundColor: isDark ? '#1e293b' : '#f8fafc'
                  }}>
                    <span style={{ textAlign: 'left', paddingLeft: '8px' }}>합계</span>
                    <span style={{ paddingRight: '8px', color: '#2563eb' }}>85,000,067</span>
                    <span style={{ paddingRight: '8px', color: '#2563eb' }}>4,404,920</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Tab 2: 수령내역 (Attachment 2) */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px' }}>
            {/* Filter buttons */}
            <div style={{ display: 'flex', gap: '6px', justifyContent: 'space-between' }}>
              {['당일', '1개월', '3개월', '6개월', '기간설정'].map(btn => (
                <div 
                  key={btn}
                  style={{
                    flex: 1,
                    padding: '8px 0',
                    borderRadius: '4px',
                    textAlign: 'center',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    border: btn === '기간설정' ? '1.5px solid #111827' : '1px solid #e2e8f0',
                    backgroundColor: btn === '기간설정' ? '#ffffff' : 'transparent',
                    color: btn === '기간설정' ? '#111827' : '#94a3b8'
                  }}
                >
                  {btn}
                </div>
              ))}
            </div>

            {/* Date Picker row */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <div style={{
                flex: 1,
                padding: '8px 12px',
                border: '1px solid #e2e8f0',
                borderRadius: '4px',
                backgroundColor: '#ffffff',
                fontSize: '0.85rem',
                display: 'flex',
                justifyContent: 'space-between',
                cursor: 'pointer'
              }}>
                <span>2025.12.23</span>
                <span style={{ fontSize: '0.65rem', color: '#94a3b8' }}>▼</span>
              </div>
              <span style={{ color: '#94a3b8' }}>-</span>
              <div style={{
                flex: 1,
                padding: '8px 12px',
                border: '1px solid #e2e8f0',
                borderRadius: '4px',
                backgroundColor: '#ffffff',
                fontSize: '0.85rem',
                display: 'flex',
                justifyContent: 'space-between',
                cursor: 'pointer'
              }}>
                <span>2026.06.22</span>
                <span style={{ fontSize: '0.65rem', color: '#94a3b8' }}>▼</span>
              </div>
            </div>

            {/* Summary statistics row */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.85rem',
              padding: '4px 0',
              borderBottom: '1px solid #edf2f7'
            }}>
              <div>
                <span style={{ color: '#718096' }}>지급건수</span>
                <span style={{ fontWeight: '700', marginLeft: '6px', color: '#111827' }}>7</span>
              </div>
              <div>
                <span style={{ color: '#718096' }}>총 지급금액</span>
                <span style={{ fontWeight: '700', marginLeft: '6px', color: '#111827' }}>16,326,858</span>
              </div>
            </div>

            {/* History Table */}
            <div style={{
              border: '1px solid #e2e8f0',
              borderRadius: '4px',
              overflow: 'hidden',
              backgroundColor: '#ffffff'
            }}>
              {/* Header */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                backgroundColor: '#f1f5f9',
                padding: '10px 4px',
                fontSize: '0.82rem',
                fontWeight: '700',
                textAlign: 'center',
                borderBottom: '1px solid #e2e8f0'
              }}>
                <span>지급일자</span>
                <span>총 지급금액</span>
                <span>실지급액</span>
              </div>

              {/* Rows */}
              {historyData.map((row, idx) => (
                <div 
                  key={idx}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    padding: '10px 4px',
                    fontSize: '0.82rem',
                    textAlign: 'right',
                    borderBottom: idx === historyData.length - 1 ? 'none' : '1px solid #edf2f7'
                  }}
                >
                  <span style={{ textAlign: 'center', color: '#4b5563' }}>{row.date}</span>
                  <span style={{ paddingRight: '8px' }}>{row.total}</span>
                  <span 
                    onClick={() => {
                      setSelectedItem(row);
                      setViewMode('detail');
                    }}
                    style={{ 
                      paddingRight: '8px', 
                      color: '#2563eb', 
                      textDecoration: 'underline', 
                      cursor: 'pointer',
                      fontWeight: '600'
                    }}
                  >
                    {row.actual}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* KOSDAQ Footer bar */}
      <div style={{
        height: '24px',
        borderTop: isDark ? '1px solid #1e293b' : '1px solid #eeeeee',
        backgroundColor: isDark ? '#111827' : '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 12px',
        fontSize: '0.7rem'
      }}>
        <span style={{ fontWeight: '600' }}>KOSDAQ</span>
        <span style={{ color: '#de201e', fontWeight: '700' }}>1,009.92 ▲ 10.59 (1.06%)</span>
      </div>
    </div>
  );
}

// Component for AS IS Pension Initiation Simulation (연금개시 시뮬레이션)
function PensionSimulationView({ isDark, isToBe, step, setStep, onBackClick }) {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    backgroundColor: isDark ? '#0b0f19' : '#ffffff',
    color: isDark ? '#cbd5e1' : '#333333',
    fontFamily: 'sans-serif',
    boxSizing: 'border-box',
    position: 'relative'
  };

  const customTopBar = (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '4px 12px',
      backgroundColor: isDark ? '#111827' : '#ffffff',
      color: isDark ? '#555555' : '#777777',
      fontSize: '0.72rem',
      fontWeight: '600',
      height: '24px',
      boxSizing: 'border-box',
      borderBottom: isDark ? '1px solid #1e293b' : '1px solid #f1f5f9'
    }}>
      <span style={{ fontWeight: '500' }}>SKT 2:28</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <span style={{ fontWeight: '500' }}>100</span>
        {/* battery icon mock */}
        <div style={{
          width: '18px',
          height: '10px',
          border: isDark ? '1px solid #cbd5e1' : '1px solid #475569',
          borderRadius: '2px',
          padding: '1px',
          display: 'flex',
          alignItems: 'center',
          boxSizing: 'border-box'
        }}>
          <div style={{ width: '100%', height: '100%', backgroundColor: isDark ? '#cbd5e1' : '#1e293b' }}></div>
        </div>
      </div>
    </div>
  );

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    borderBottom: isDark ? '1px solid #1e293b' : 'none',
    backgroundColor: isDark ? '#111827' : '#ffffff',
    height: '44px',
    boxSizing: 'border-box'
  };

  const contentStyle = {
    flex: 1,
    overflowY: 'auto',
    padding: '24px 20px',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    backgroundColor: isDark ? '#0b0f19' : '#ffffff'
  };

  const inputGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    marginBottom: '20px'
  };

  const labelStyle = {
    fontSize: '0.78rem',
    fontWeight: '500',
    color: isDark ? '#94a3b8' : '#718096'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 0px',
    border: 'none',
    borderBottom: isDark ? '1.5px solid #334155' : '1.5px solid #e2e8f0',
    backgroundColor: 'transparent',
    color: isDark ? '#f8fafc' : '#111827',
    fontSize: '1.25rem',
    fontWeight: '500',
    boxSizing: 'border-box',
    outline: 'none'
  };

  const linkButtonStyle = {
    display: 'block',
    width: '100%',
    padding: '16px 0',
    backgroundColor: '#e9f2ff',
    color: '#005bc4',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.98rem',
    fontWeight: '500',
    textAlign: 'center',
    cursor: 'pointer',
    textDecoration: 'none'
  };

  // Step 1: Main (Attachment 1)
  if (step === 'main') {
    return (
      <div style={containerStyle}>
        {customTopBar}

        {/* Header */}
        <div style={headerStyle}>
          <button 
            onClick={onBackClick}
            style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, color: isDark ? '#fff' : '#000', display: 'flex', alignItems: 'center' }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <span style={{ fontSize: '0.95rem', fontWeight: '600' }}>연금개시 시뮬레이션</span>
          <button style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, color: isDark ? '#fff' : '#000' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
          </button>
        </div>

        {/* Content */}
        <div style={{ ...contentStyle, padding: '40px 24px', gap: '30px' }}>
          <div>
            <h1 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              lineHeight: '1.45',
              color: isDark ? '#f8fafc' : '#111827',
              margin: 0,
              wordBreak: 'keep-all'
            }}>
              연금 수령방법에 따라
              <br />
              시뮬레이션하여
              <br />
              연금을 미리 계산해보세요.
            </h1>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' }}>
            <button 
              onClick={() => setStep('daishin_form')}
              style={linkButtonStyle}
            >
              대신증권 {isToBe ? '연금' : 'IRP'} 계좌만 있습니다
            </button>
            <button 
              onClick={() => setStep('other_q1')}
              style={linkButtonStyle}
            >
              타사 {isToBe ? '연금' : 'IRP'} 계좌도 있습니다
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Daishin Form (Attachment 2)
  if (step === 'daishin_form') {
    return (
      <div style={containerStyle}>
        {customTopBar}

        {/* Header */}
        <div style={{ ...headerStyle, justifyContent: 'flex-start' }}>
          <button 
            onClick={() => setStep('main')}
            style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, color: isDark ? '#fff' : '#000', display: 'flex', alignItems: 'center' }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div style={contentStyle}>
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.45rem', fontWeight: '600', margin: '0 0 4px 0', color: isDark ? '#f8fafc' : '#111827' }}>{isToBe ? '연금' : 'IRP'} 시뮬레이션</h2>
            <h2 style={{ fontSize: '1.45rem', fontWeight: '600', margin: 0, color: isDark ? '#f8fafc' : '#111827' }}>같이 한번 해볼까요?</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Q1. 수령 개시 희망 연령이 언제 인가요?</label>
              <input type="text" readOnly value="60 세" style={inputStyle} />
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Q2. 기대수익률을 알려주세요.</label>
              <input type="text" readOnly value="5 %" style={inputStyle} />
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Q3. 추가 예상 퇴직금을 알려주세요.</label>
              <input type="text" readOnly value="50,000,000 원" style={inputStyle} />
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Q4. 예상 근속년수를 알려주세요.</label>
              <input type="text" readOnly value="10 년" style={inputStyle} />
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Q5. 추가 입금할 금액을 알려주세요.</label>
              <input type="text" readOnly value="50,000,000 원" style={inputStyle} />
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Q6. 연금 수령을 어떻게 하고 싶으신가요?</label>
              <div style={{
                ...inputStyle,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer'
              }}>
                <span>기간 선택형</span>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>▼</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div style={{ backgroundColor: '#1c1c1e' }}>
          <button 
            onClick={() => setStep('daishin_result')}
            style={{
              width: '100%',
              height: '56px',
              backgroundColor: '#1c1c1e',
              color: '#ffffff',
              border: 'none',
              borderRadius: '0',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            시뮬레이션
          </button>
        </div>
      </div>
    );
  }

  // Step 3: Daishin Result (Attachment 3)
  if (step === 'daishin_result') {
    return (
      <div style={containerStyle}>
        {customTopBar}

        {/* Header */}
        <div style={{ ...headerStyle, justifyContent: 'flex-start' }}>
          <button 
            onClick={() => setStep('daishin_form')}
            style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, color: isDark ? '#fff' : '#000', display: 'flex', alignItems: 'center' }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div style={{ ...contentStyle, gap: '20px' }}>
          <div>
            <div style={{
              fontSize: '1.25rem',
              color: isDark ? '#cbd5e1' : '#4a5568',
              fontWeight: '500',
              marginBottom: '18px',
              fontFamily: 'sans-serif'
            }}>
              김대진님의 {isToBe ? '연금' : '퇴직연금'}
            </div>
            <h2 style={{
              fontSize: '1.3rem',
              fontWeight: '600',
              lineHeight: '1.45',
              margin: 0,
              color: isDark ? '#f8fafc' : '#111827'
            }}>
              기간 선택형 <span style={{
                borderBottom: '1.5px solid ' + (isDark ? '#cbd5e1' : '#111827'),
                paddingBottom: '2px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                cursor: 'pointer',
                margin: '0 4px'
              }}>10 년 <span style={{ fontSize: '0.65rem', color: '#718096' }}>▼</span></span> 의 경우
              <br />
              최초 연금수령액은
              <br />
              <span style={{ color: '#2563eb' }}>24,586,668원</span> 이고
              <br />
              세액은 <span style={{ color: '#2563eb' }}>246,998원</span> 입니다
            </h2>
            <span style={{ display: 'block', fontSize: '0.78rem', color: '#718096', marginTop: '14px', lineHeight: '1.4', wordBreak: 'keep-all' }}>
              세법상 한도금액은 <strong>110,548,967</strong>이고, 이 경우 부담하실 세금(지방소득세 포함)은 <strong>246,998</strong>입니다.
            </span>
          </div>

          {/* Table */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>회차별 연금 수령액</span>
              <span style={{ fontSize: '0.78rem', color: '#2563eb', cursor: 'pointer', textDecoration: 'underline' }}>상세보기</span>
            </div>

            <div style={{
              border: '1px solid #e2e8f0',
              borderRadius: '4px',
              overflow: 'hidden',
              backgroundColor: '#ffffff'
            }}>
              {/* Header */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '0.6fr 1.2fr 1fr 1.2fr',
                backgroundColor: '#f1f5f9',
                padding: '8px 4px',
                fontSize: '0.76rem',
                fontWeight: '600',
                textAlign: 'center',
                borderBottom: '1px solid #e2e8f0',
                color: '#111827'
              }}>
                <span>회차</span>
                <span>세전 수령액</span>
                <span>세금</span>
                <span>세후 수령액</span>
              </div>

              {/* Rows */}
              {[
                { round: 1, pre: '24,586,668', tax: '246,998', post: '24,339,670' },
                { round: 2, pre: '24,586,668', tax: '257,470', post: '24,329,198' },
                { round: 3, pre: '24,586,668', tax: '1,270,927', post: '23,315,741' },
                { round: 4, pre: '24,586,668', tax: '1,352,266', post: '23,234,402' },
                { round: 5, pre: '24,586,668', tax: '1,352,266', post: '23,234,402' }
              ].map((roundRow, idx) => (
                <div 
                  key={idx}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '0.6fr 1.2fr 1fr 1.2fr',
                    padding: '10px 4px',
                    fontSize: '0.76rem',
                    textAlign: 'right',
                    color: '#111827',
                    borderBottom: idx === 4 ? 'none' : '1px solid #edf2f7'
                  }}
                >
                  <span style={{ textAlign: 'center', color: '#718096' }}>{roundRow.round}</span>
                  <span style={{ paddingRight: '4px' }}>{roundRow.pre}</span>
                  <span style={{ paddingRight: '4px' }}>{roundRow.tax}</span>
                  <span style={{ paddingRight: '4px', fontWeight: '500' }}>{roundRow.post}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div style={{ backgroundColor: '#1c1c1e' }}>
          <button 
            onClick={() => setStep('daishin_form')}
            style={{
              width: '100%',
              height: '56px',
              backgroundColor: '#1c1c1e',
              color: '#ffffff',
              border: 'none',
              borderRadius: '0',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            다시 계산하기
          </button>
        </div>
      </div>
    );
  }

  // Step 4: Other IRP Question 1 (Attachment 4)
  if (step === 'other_q1') {
    return (
      <div style={containerStyle}>
        {customTopBar}

        {/* Header */}
        <div style={{ ...headerStyle, justifyContent: 'flex-start' }}>
          <button 
            onClick={() => setStep('main')}
            style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, color: isDark ? '#fff' : '#000', display: 'flex', alignItems: 'center' }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div style={{ ...contentStyle, padding: '40px 24px', gap: '30px' }}>
          <div>
            <div style={{
              fontSize: '1.25rem',
              color: isDark ? '#cbd5e1' : '#4a5568',
              fontWeight: '500',
              marginBottom: '18px',
              fontFamily: 'sans-serif'
            }}>
              김대신님의 타사 {isToBe ? '연금' : 'IRP'}
            </div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: '600', margin: '0 0 10px 0', color: '#2563eb' }}>Start.</h1>
            <h2 style={{ fontSize: '1.45rem', fontWeight: '600', margin: 0, color: isDark ? '#f8fafc' : '#111827' }}>퇴직금을 수령하셨나요?</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' }}>
            <button 
              onClick={() => setStep('other_result')}
              style={linkButtonStyle}
            >
              네, 수령했습니다.
            </button>
            <button 
              onClick={() => setStep('main')}
              style={linkButtonStyle}
            >
              아니오, 수령하지 않았습니다.
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 5: Other Result (Attachment 5)
  if (step === 'other_result') {
    return (
      <div style={containerStyle}>
        {customTopBar}

        {/* Header */}
        <div style={{ ...headerStyle, justifyContent: 'flex-start' }}>
          <button 
            onClick={() => setStep('other_q1')}
            style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, color: isDark ? '#fff' : '#000', display: 'flex', alignItems: 'center' }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div style={{ ...contentStyle, gap: '20px' }}>
          <div>
            <div style={{
              fontSize: '1.25rem',
              color: isDark ? '#cbd5e1' : '#4a5568',
              fontWeight: '500',
              marginBottom: '18px',
              fontFamily: 'sans-serif'
            }}>
              김대신님의 예상 퇴직소득세
            </div>
            <h2 style={{
              fontSize: '1.3rem',
              fontWeight: '600',
              lineHeight: '1.45',
              margin: 0,
              color: isDark ? '#f8fafc' : '#111827'
            }}>
              100,000,000원에 대한
              <br />
              퇴직 소득세(지방소득세 포함)
              <br />
              는 약 <span style={{ color: '#2563eb' }}>167,180원</span> 이고
              <br />
              실효세율은 <span style={{ color: '#2563eb' }}>0.1%</span> 입니다
            </h2>
            <span style={{ display: 'block', fontSize: '0.78rem', color: '#718096', marginTop: '14px', lineHeight: '1.4' }}>
              세법 개정에 따라 실제 퇴직 소득세(지방소득세 포함)가 다를 수 있습니다.
            </span>
          </div>

          {/* Process details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>계산과정</span>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              padding: '16px',
              backgroundColor: isDark ? '#1e293b' : '#ffffff',
              borderRadius: '8px',
              border: isDark ? '1px solid #334155' : '1px solid #e2e8f0'
            }}>
              {[
                { label: '퇴직소득', value: '100,000,000 원' },
                { label: '근속연수 공제', value: '73,000,000 원' },
                { label: '환산급여', value: '10,451,612 원' },
                { label: '환산 급여별 공제', value: '9,470,967 원' },
                { label: '퇴직소득 과세 표준', value: '980,645 원' },
                { label: '환산산출 세액', value: '58,838 원' },
                { label: '퇴직소득 산출 세액', value: '151,998 원' },
                { label: '기 납부 세액 합계', value: '0 원' },
                { label: '퇴직 소득세', value: '151,990 원' }
              ].map((row, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: '#718096' }}>{row.label}</span>
                  <span style={{ fontWeight: '500', color: isDark ? '#cbd5e1' : '#1a202c' }}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div style={{ backgroundColor: '#1c1c1e' }}>
          <button 
            onClick={() => setStep('other_q1')}
            style={{
              width: '100%',
              height: '56px',
              backgroundColor: '#1c1c1e',
              color: '#ffffff',
              border: 'none',
              borderRadius: '0',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            다시 계산하기
          </button>
        </div>
      </div>
    );
  }

  return null;
}

function App() {

  const [isDark, setIsDark] = useState(false);
  const [isFigmaExportMode, setIsFigmaExportMode] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('figmaExport') === 'true';
  });
  const [notifications, setNotifications] = useState([]);
  const [selectedStock, setSelectedStock] = useState('신대증 30');
  const [activeTab, setActiveTab] = useState('호가');
  const [activeBottomTab, setActiveBottomTab] = useState('보유상품 현황');
  const [showOrderPanel, setShowOrderPanel] = useState(false);
  const [orderType, setOrderType] = useState('buy');
  const [orderPrice, setOrderPrice] = useState(stockData['신대증 30'].price);
  const [orderQty, setOrderQty] = useState(10);
  const [stockSelectorOpen, setStockSelectorOpen] = useState(false);
   const [activeScreen, setActiveScreen] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const num = parseInt(params.get('screen'), 10);
    return (num >= 1 && num <= 9) ? num : 1;
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [asIsSubScreen, setAsIsSubScreen] = useState(() => {
    return new URLSearchParams(window.location.search).get('asis') || 'menu';
  });
  const [toBeSubScreen, setToBeSubScreen] = useState(() => {
    return new URLSearchParams(window.location.search).get('tobe') || 'menu';
  });
  const [screen6AsIsCautionQ1, setScreen6AsIsCautionQ1] = useState(null);
  const [screen6AsIsCautionQ2, setScreen6AsIsCautionQ2] = useState(null);
  const [screen6ToBeCautionQ1, setScreen6ToBeCautionQ1] = useState(null);
  const [screen6ToBeCautionQ2, setScreen6ToBeCautionQ2] = useState(null);
  const [screen6CalcAmount, setScreen6CalcAmount] = useState('');
  const [screen6ActiveAccount, setScreen6ActiveAccount] = useState(() => {
    return new URLSearchParams(window.location.search).get('screen6account') || '200-233354(01)';
  });
  const [screen6DepositTab, setScreen6DepositTab] = useState('고객납입금');
  useEffect(() => {
    if (screen6ActiveAccount === '200-233354(43)') {
      setScreen6DepositTab('사용자');
    } else {
      setScreen6DepositTab('고객납입금');
    }
  }, [screen6ActiveAccount]);
  const [screen6AsIsModalOpen, setScreen6AsIsModalOpen] = useState(false);
  const [screen6CompanyBondModalOpen, setScreen6CompanyBondModalOpen] = useState(() => {
    return new URLSearchParams(window.location.search).get('screen6companybondmodal') === 'true';
  });
  const [screen6AsIsUpdateModalOpen, setScreen6AsIsUpdateModalOpen] = useState(() => {
    return new URLSearchParams(window.location.search).get('screen6asisupdate-modal') === 'true';
  });
  const [screen6ToBeNoPlanModalOpen, setScreen6ToBeNoPlanModalOpen] = useState(() => {
    return new URLSearchParams(window.location.search).get('screen6tobeno-plan-modal') === 'true';
  });
  const [screen6SelectedBond, setScreen6SelectedBond] = useState(null);
  const [screen6AsIsSubScreen, setScreen6AsIsSubScreen] = useState(() => {
    return new URLSearchParams(window.location.search).get('screen6asis') || 'splash';
  });
  const [screen6AsIsSelectedTab, setScreen6AsIsSelectedTab] = useState('상품');
  const [screen6ToBeSubScreen, setScreen6ToBeSubScreen] = useState(() => {
    return new URLSearchParams(window.location.search).get('screen6tobe') || 'menu';
  });
  const [screen5ToBeSubScreen, setScreen5ToBeSubScreen] = useState('menu');
  const [screen6ToBeSwitchOn, setScreen6ToBeSwitchOn] = useState(() => {
    return new URLSearchParams(window.location.search).get('screen6tobeswitch') !== 'false';
  });
  const [screen6AsIsSearchOpen, setScreen6AsIsSearchOpen] = useState(() => {
    return new URLSearchParams(window.location.search).get('screen6asissearch') === 'true';
  });
  const [screen6ToBeSearchOpen, setScreen6ToBeSearchOpen] = useState(() => {
    return new URLSearchParams(window.location.search).get('screen6tobesearch') === 'true';
  });
  const [screen6CalcActiveBondId, setScreen6CalcActiveBondId] = useState('kr133');
  const [screen6CalcYieldInput, setScreen6CalcYieldInput] = useState('4.800');
  const [screen6CalcKeypadOpen, setScreen6CalcKeypadOpen] = useState(() => {
    return new URLSearchParams(window.location.search).get('screen6keypad') === 'true';
  });
  const [screen6SearchTab, setScreen6SearchTab] = useState('장내채권');

  const renderScreen6Search = (mode, onClose) => {
    const handleSelectBond = (bond) => {
      if (mode === 'tobe') {
        setScreen6SelectedBond(bond);
        setScreen6ToBeSubScreen('bondDetails');
        onClose();
      } else {
        onClose();
      }
    };
    const bondSearchList = [
      { name: '한국투자캐피탈133', code: 'B214341G2', retail: '', interest: '이표' },
      { name: '신한은행15-08이15A', code: 'B00C01118', retail: '', interest: '이표' },
      { name: '신한은행18-07이15A', code: 'B00C01147', retail: '', interest: '이표' },
      { name: '신한은행18-09이15A', code: 'B00C01149', retail: '', interest: '이표' },
      { name: '신한은행19-11단15A', code: 'B00C0115B', retail: '', interest: '단리' },
      { name: '신한은행20-01이15A', code: 'B00C01161', retail: '', interest: '이표' },
      { name: '신한은행20-02이15A', code: 'B00C01162', retail: '', interest: '이표' },
      { name: '신한은행20-12이15A', code: 'B00C0116C', retail: '', interest: '이표' },
      { name: '신한은행21-02-단15-A', code: 'B00C01172', retail: '', interest: '단리' },
      { name: '신한은행21-03-이-15-A', code: 'B00C01173', originalInterest: '이표', interest: '이표' },
      { name: '신한은행21-08-이-15-A', code: 'B00C01178', retail: '', interest: '이표' },
      { name: '신한은행22-02-이-15-A', code: 'B00C01182', retail: '', interest: '이표' },
      { name: '신한은행22-04-이-15-A', code: 'B00C01184', retail: '', interest: '' },
      { name: '신한은행22-08-복-20-A', code: 'B00C01188', retail: '', interest: '복리' },
      { name: '신한은행24-01-복-20-A', code: 'B00C011A1', retail: '', interest: '복리' }
    ];

    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#ffffff',
        color: '#111111',
        fontFamily: 'sans-serif',
        position: 'relative'
      }}>
        {/* Phone Camera & Status Bar */}
        <div style={styles.phoneCamera} />
        <div style={styles.phoneHeaderBar}>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', color: isDark ? '#94a3b8' : '#475569' }}>SKT 10:39</span>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.65rem', fontWeight: '800', color: isDark ? '#94a3b8' : '#333' }}>5G</span>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1px', height: '10px' }}>
              <div style={{ width: '2px', height: '3px', backgroundColor: isDark ? '#94a3b8' : '#333' }}></div>
              <div style={{ width: '2px', height: '5px', backgroundColor: isDark ? '#94a3b8' : '#333' }}></div>
              <div style={{ width: '2px', height: '7px', backgroundColor: isDark ? '#94a3b8' : '#333' }}></div>
              <div style={{ width: '2px', height: '9px', backgroundColor: isDark ? '#94a3b8' : '#333' }}></div>
            </div>
            <div style={{
              border: isDark ? '1px solid #94a3b8' : '1px solid #333',
              borderRadius: '3px',
              padding: '0px 3px',
              fontSize: '0.62rem',
              fontWeight: '900',
              height: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: isDark ? '#94a3b8' : '#333',
              color: isDark ? '#0b0f19' : '#fff',
              lineHeight: 1
            }}>
              86
            </div>
          </div>
        </div>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          height: '48px',
          padding: '0 12px',
          borderBottom: '1px solid #f1f5f9',
          gap: '12px'
        }}>
          <button 
            onClick={onClose}
            style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
          <span style={{ fontSize: '1.05rem', fontWeight: '800', flex: 1, textAlign: 'center', marginLeft: '-22px' }}>종목찾기</span>
        </div>

        {/* Scrollable Tabs */}
        {mode !== 'tobe' ? (
        <div style={{
          display: 'flex',
          gap: '16px',
          overflowX: 'auto',
          padding: '0 12px',
          borderBottom: '1px solid #f1f5f9',
          scrollbarWidth: 'none',
          whiteSpace: 'nowrap'
        }}>
          {[
            { label: '선물옵션', active: false },
            { label: '야간선물옵션', active: false },
            { label: '해외선물', active: false },
            { label: '장내채권', active: true },
            { label: '금현물', active: false }
          ].map((tab) => (
            <div 
              key={tab.label}
              style={{
                padding: '12px 4px',
                fontSize: '0.85rem',
                fontWeight: tab.active ? '800' : '500',
                color: tab.active ? '#111111' : '#777777',
                borderBottom: tab.active ? '2.5px solid #111111' : '2.5px solid transparent',
                cursor: 'pointer'
              }}
            >
              {tab.label}
            </div>
          ))}
        </div>
        ) : (
        <div style={{
          display: 'flex',
          borderBottom: '1px solid #f1f5f9',
          whiteSpace: 'nowrap'
        }}>
          {[
            { label: '최근조회', active: screen6SearchTab === '최근조회' },
            { label: '장내채권', active: screen6SearchTab === '장내채권' }
          ].map((tab) => (
            <div 
              key={tab.label}
              onClick={() => setScreen6SearchTab(tab.label)}
              style={{
                flex: 1,
                textAlign: 'center',
                padding: '12px 0',
                fontSize: '0.85rem',
                fontWeight: tab.active ? '800' : '500',
                color: tab.active ? '#111111' : '#777777',
                borderBottom: tab.active ? '2.5px solid #111111' : '2.5px solid transparent',
                cursor: 'pointer'
              }}
            >
              {tab.label}
            </div>
          ))}
        </div>
        )}

        {/* Search bar input wrapper */}
        <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            padding: '0 12px',
            height: '38px',
            gap: '8px',
            backgroundColor: '#ffffff'
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#777777" strokeWidth="2.5"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            <input 
              type="text" 
              placeholder="종목명, 종목코드, 초성입력" 
              style={{ border: 'none', background: 'none', outline: 'none', fontSize: '0.8rem', width: '100%', color: '#333333' }}
              readOnly
            />
          </div>

          {/* Select filter dropdowns */}
          {mode !== 'tobe' && (
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              border: '1px solid #e2e8f0',
              borderRadius: '4px',
              padding: '6px 10px',
              fontSize: '0.8rem',
              color: '#333',
              backgroundColor: '#fff',
              cursor: 'pointer'
            }}>
              <span>전체</span>
              <span style={{ fontSize: '8px', color: '#888' }}>▼</span>
            </div>
            <div style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              border: '1px solid #e2e8f0',
              borderRadius: '4px',
              padding: '6px 10px',
              fontSize: '0.8rem',
              color: '#333',
              backgroundColor: '#fff',
              cursor: 'pointer'
            }}>
              <span>전체</span>
              <span style={{ fontSize: '8px', color: '#888' }}>▼</span>
            </div>
          </div>
          )}
        </div>

        {/* Table header */}
        <div style={{
          display: 'flex',
          backgroundColor: '#f8fafc',
          padding: '6px 12px',
          fontSize: '0.75rem',
          fontWeight: '700',
          color: '#64748b',


        }}>
          <span style={{ flex: 1 }}>종목명</span>
          <span style={{ width: '40px', textAlign: 'center' }}>소매</span>
          <span style={{ width: '50px', textAlign: 'center' }}>이자</span>
        </div>

        {/* List of items */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          {bondSearchList.map((bond, idx) => (
            <div 
              key={idx}
              onClick={() => handleSelectBond(bond)}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px',
                borderBottom: '1px solid #f1f5f9',
                cursor: 'pointer',
                transition: 'background-color 0.15s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontSize: '0.86rem', fontWeight: '800', color: '#222' }}>{bond.name}</span>
                <span style={{ fontSize: '0.7rem', color: '#888' }}>{bond.code}</span>
              </div>
              <span style={{ width: '40px', textAlign: 'center', fontSize: '0.8rem', color: '#333' }}>{bond.retail}</span>
              <span style={{ width: '50px', textAlign: 'center', fontSize: '0.8rem', color: '#333', fontWeight: '600' }}>{bond.interest}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  const [screen6AsIsPaymentType, setScreen6AsIsPaymentType] = useState('고객');
  const [screen6ToBePaymentType, setScreen6ToBePaymentType] = useState('고객');
  const [screen6AsIsBsheetState, setScreen6AsIsBsheetState] = useState('closed'); // 'closed', 'product', 'account', 'balance_select', 'hold_balance', 'tax_select'
  const [screen6ToBeBsheetState, setScreen6ToBeBsheetState] = useState('closed'); // 'closed', 'product', 'account', 'balance_select', 'hold_balance', 'tax_select'
  const [screen6AsIsBalanceType, setScreen6AsIsBalanceType] = useState('잔고선택');
  const [screen6AsIsHoldBalanceType, setScreen6AsIsHoldBalanceType] = useState('보유잔고');
  const [screen6AsIsTaxType, setScreen6AsIsTaxType] = useState(() => {
    return new URLSearchParams(window.location.search).get('screen6AsIsTaxType') || '정상과세';
  });
  const [screen6ToBeBalanceType, setScreen6ToBeBalanceType] = useState('잔고선택');
  const [screen6ToBeHoldBalanceType, setScreen6ToBeHoldBalanceType] = useState('보유잔고');
  const [screen6ToBeTaxType, setScreen6ToBeTaxType] = useState(() => {
    return new URLSearchParams(window.location.search).get('screen6ToBeTaxType') || '연금소득세(연금수령 시)';
  });
  const [screen6AsIsUnexecutedOpen, setScreen6AsIsUnexecutedOpen] = useState(() => {
    return new URLSearchParams(window.location.search).get('screen6AsIsUnexecutedOpen') === 'true';
  });
  const [screen6ToBeUnexecutedOpen, setScreen6ToBeUnexecutedOpen] = useState(() => {
    return new URLSearchParams(window.location.search).get('screen6ToBeUnexecutedOpen') === 'true';
  });
  const [screen6ToBeHoldBalancePopupOpen, setScreen6ToBeHoldBalancePopupOpen] = useState(() => {
    return new URLSearchParams(window.location.search).get('screen6ToBeHoldBalancePopupOpen') === 'true';
  });
  const [screen6BalanceActiveTab, setScreen6BalanceActiveTab] = useState(() => {
    return new URLSearchParams(window.location.search).get('screen6BalanceActiveTab') || '잔고';
  });
  const [screen6AsIsOrderTab, setScreen6AsIsOrderTab] = useState(() => {
    return new URLSearchParams(window.location.search).get('screen6AsIsOrderTab') || '매수';
  });
  const [screen6ToBeOrderTab, setScreen6ToBeOrderTab] = useState(() => {
    return new URLSearchParams(window.location.search).get('screen6ToBeOrderTab') || '매수';
  });

  const renderScreen6Caution = (mode) => {
    const q1 = mode === 'asis' ? screen6AsIsCautionQ1 : screen6ToBeCautionQ1;
    const q2 = mode === 'asis' ? screen6AsIsCautionQ2 : screen6ToBeCautionQ2;
    const setQ1 = mode === 'asis' ? setScreen6AsIsCautionQ1 : setScreen6ToBeCautionQ1;
    const setQ2 = mode === 'asis' ? setScreen6AsIsCautionQ2 : setScreen6ToBeCautionQ2;
    
    const handleClose = () => {
      if (mode === 'asis') {
        setScreen6AsIsSubScreen('bondOrder');
      } else {
        setScreen6ToBeSubScreen('bondOrder');
      }
    };
    
    const handleConfirm = () => {
      if (q1 === 'yes' || q2 === 'yes') {
        alert('선택하신 채권의 매수가 불가능합니다.');
        return;
      }
      if (q1 === null || q2 === null) {
        alert('모든 유의사항 항목에 응답해 주시기 바랍니다.');
        return;
      }
      alert('매수 주문이 성공적으로 접수되었습니다.');
      if (mode === 'asis') {
        setScreen6AsIsSubScreen('bondCurrentPrice');
        setScreen6AsIsCautionQ1(null);
        setScreen6AsIsCautionQ2(null);
      } else {
        setScreen6ToBeSubScreen('bondCurrentPrice');
        setScreen6ToBeCautionQ1(null);
        setScreen6ToBeCautionQ2(null);
      }
    };

    const isConfirmDisabled = q1 === null || q2 === null;

    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#ffffff',
        color: '#111111',
        fontFamily: 'sans-serif',
        position: 'relative'
      }}>
        {/* Phone Camera & Status Bar */}
        {mode === 'tobe' && (
          <>
        <div style={styles.phoneCamera} />
        <div style={styles.phoneHeaderBar}>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#475569' }}>SKT 12:30</span>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.65rem', fontWeight: '800', color: '#333' }}>5G</span>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1px', height: '10px' }}>
              <div style={{ width: '2px', height: '3px', backgroundColor: '#333' }}></div>
              <div style={{ width: '2px', height: '5px', backgroundColor: '#333' }}></div>
              <div style={{ width: '2px', height: '7px', backgroundColor: '#333' }}></div>
              <div style={{ width: '2px', height: '9px', backgroundColor: '#333' }}></div>
            </div>
            <div style={{
              border: '1px solid #333',
              borderRadius: '3px',
              padding: '0px 3px',
              fontSize: '0.62rem',
              fontWeight: '900',
              height: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#333',
              color: '#fff',
              lineHeight: 1
            }}>
              86
            </div>
          </div>
        </div>
          </>
        )}

        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          height: '48px',
          padding: '0 12px',
          borderBottom: '1px solid #f1f5f9'
        }}>
          <button 
            onClick={handleClose}
            style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: isFigmaExportMode ? 'none' : 1, padding: '24px 20px', overflowY: isFigmaExportMode ? 'visible' : 'auto' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '800', margin: '0 0 12px 0', lineHeight: 1.3 }}>
            이해관계인 등 확인
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#666666', margin: '0 0 24px 0', lineHeight: 1.5 }}>
            채권 매수를 진행하기 위해 아래 문항을 읽고 본인의 해당 여부를 정확하게 확인해 주시기 바랍니다. 고객님과 발행자(회사)의 관계에 따라 투자가 불가능 할수 있습니다.
          </p>

          {/* Question 1 */}
          <div style={{ marginBottom: '24px' }}>
            <p style={{ fontSize: '0.92rem', fontWeight: '700', color: '#111111', margin: '0 0 10px 0', lineHeight: 1.4 }}>
              1. 김대신 님께서는 발행자 대신에프앤아이, 또는 그 지배회사/종속회사에 이해관계인에 해당하시나요?
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                onClick={() => setQ1('yes')}
                style={{
                  flex: 1,
                  height: '42px',
                  borderRadius: '6px',
                  border: q1 === 'yes' ? '2.5px solid #de201e' : '1px solid #cbd5e1',
                  backgroundColor: q1 === 'yes' ? '#fef2f2' : '#ffffff',
                  color: q1 === 'yes' ? '#de201e' : '#334155',
                  fontWeight: '700',
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                네
              </button>
              <button 
                onClick={() => setQ1('no')}
                style={{
                  flex: 1,
                  height: '42px',
                  borderRadius: '6px',
                  border: q1 === 'no' ? '2.5px solid #2366ca' : '1px solid #cbd5e1',
                  backgroundColor: q1 === 'no' ? '#eff6ff' : '#ffffff',
                  color: q1 === 'no' ? '#2366ca' : '#334155',
                  fontWeight: '700',
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                아니오
              </button>
            </div>
            {q1 === 'yes' && (
              <div style={{ color: '#de201e', fontSize: '0.78rem', fontWeight: '800', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                선택하신 채권의 매수가 불가능합니다.
              </div>
            )}
          </div>

          {/* Question 2 */}
          <div style={{ marginBottom: '24px' }}>
            <p style={{ fontSize: '0.92rem', fontWeight: '700', color: '#111111', margin: '0 0 10px 0', lineHeight: 1.4 }}>
              2. 김대신 님께서는 발행자 대신에프앤아이의 계열회사 등 지본법 적용관계에 있는 회사에 재직중이신가요?
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                onClick={() => setQ2('yes')}
                style={{
                  flex: 1,
                  height: '42px',
                  borderRadius: '6px',
                  border: q2 === 'yes' ? '2.5px solid #de201e' : '1px solid #cbd5e1',
                  backgroundColor: q2 === 'yes' ? '#fef2f2' : '#ffffff',
                  color: q2 === 'yes' ? '#de201e' : '#334155',
                  fontWeight: '700',
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                네
              </button>
              <button 
                onClick={() => setQ2('no')}
                style={{
                  flex: 1,
                  height: '42px',
                  borderRadius: '6px',
                  border: q2 === 'no' ? '2.5px solid #2366ca' : '1px solid #cbd5e1',
                  backgroundColor: q2 === 'no' ? '#eff6ff' : '#ffffff',
                  color: q2 === 'no' ? '#2366ca' : '#334155',
                  fontWeight: '700',
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                아니오
              </button>
            </div>
            {q2 === 'yes' && (
              <div style={{ color: '#de201e', fontSize: '0.78rem', fontWeight: '800', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                선택하신 채권의 매수가 불가능합니다.
              </div>
            )}
          </div>
        </div>

        {/* Bottom buttons */}
        <div style={{ display: 'flex', height: '52px' }}>
          <button 
            onClick={handleClose}
            style={{
              flex: 1,
              backgroundColor: '#f3f4f6',
              color: '#111111',
              border: 'none',
              fontSize: '1rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            취소
          </button>
          <button 
            onClick={handleConfirm}
            disabled={isConfirmDisabled}
            style={{
              flex: 2,
              backgroundColor: isConfirmDisabled ? '#f3f4f6' : '#222222',
              color: isConfirmDisabled ? '#a1a1aa' : '#ffffff',
              border: 'none',
              fontSize: '1rem',
              fontWeight: '700',
              cursor: isConfirmDisabled ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            확인
          </button>
        </div>
      </div>
    );
  };

  const renderScreen6Details = (mode) => {
    const handleClose = () => {
      setScreen6ToBeSubScreen('bondCurrentPrice');
      setScreen6ToBeSearchOpen(true); // Open the search screen again
    };

    const handleBuy = () => {
      setScreen6ToBeSubScreen('bondOrder');
    };

    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#ffffff',
        color: '#111111',
        fontFamily: 'sans-serif',
        position: 'relative'
      }}>
        {/* Phone Camera & Status Bar */}
        <div style={styles.phoneCamera} />
        <div style={styles.phoneHeaderBar}>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#475569' }}>SKT 5:02</span>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.65rem', fontWeight: '800', color: '#333' }}>5G</span>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1px', height: '10px' }}>
              <div style={{ width: '2px', height: '3px', backgroundColor: '#333' }}></div>
              <div style={{ width: '2px', height: '5px', backgroundColor: '#333' }}></div>
              <div style={{ width: '2px', height: '7px', backgroundColor: '#333' }}></div>
              <div style={{ width: '2px', height: '9px', backgroundColor: '#333' }}></div>
            </div>
            <div style={{
              border: '1px solid #333',
              borderRadius: '3px',
              padding: '0px 3px',
              fontSize: '0.62rem',
              fontWeight: '900',
              height: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#333',
              color: '#fff',
              lineHeight: 1
            }}>
              94
            </div>
          </div>
        </div>

        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          height: '48px',
          padding: '0 12px',
          borderBottom: '1px solid #f1f5f9'
        }}>
          <button 
            onClick={handleClose}
            style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
        </div>

        {/* Details Content */}
        <div style={{ flex: isFigmaExportMode ? 'none' : 1, overflowY: isFigmaExportMode ? 'visible' : 'auto', padding: '16px' }}>
          {/* Badges */}
          <div style={{ display: 'flex', gap: '6px', marginBottom: '8px', fontSize: '0.75rem', fontWeight: '800' }}>
            <span style={{ color: '#10b981' }}>보통위험</span>
            <span style={{ color: '#64748b' }}>•</span>
            <span style={{ color: '#475569' }}>A</span>
            <span style={{ color: '#64748b' }}>•</span>
            <span style={{ color: '#475569' }}>금융회사채</span>
          </div>

          {/* Title */}
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', margin: '0 0 4px 0', color: '#111111' }}>
            한국투자캐피탈133
          </h2>
          <div style={{ fontSize: '0.8rem', color: '#888888', marginBottom: '20px' }}>
            B214341G2
          </div>

          {/* Key Rates Info Grid */}
          <div style={{ display: 'flex', padding: '12px 0', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9', marginBottom: '16px' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: '#888888', marginBottom: '4px' }}>매수수익률</span>
              <span style={{ fontSize: '1.05rem', fontWeight: '800', color: '#de201e' }}>4.800%</span>
            </div>
            <div style={{ width: '1px', backgroundColor: '#e2e8f0' }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: '#888888', marginBottom: '4px' }}>매수단가</span>
              <span style={{ fontSize: '1.05rem', fontWeight: '800', color: '#111111' }}>10,005.1원</span>
            </div>
            <div style={{ width: '1px', backgroundColor: '#e2e8f0' }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: '#888888', marginBottom: '4px' }}>가능수량</span>
              <span style={{ fontSize: '1.05rem', fontWeight: '800', color: '#111111' }}>1,146,593,000</span>
            </div>
          </div>

          {/* Card: Return & Period */}
          <div style={{
            backgroundColor: '#f8fafc',
            borderRadius: '8px',
            padding: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '0.78rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '3px' }}>
                은행환산수익률(세전,연) 
                <span style={{ border: '1px solid #94a3b8', borderRadius: '50%', width: '12px', height: '12px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px', color: '#94a3b8', fontWeight: 'bold' }}>i</span>
              </span>
              <span style={{ fontSize: '1.25rem', fontWeight: '800', color: '#de201e' }}>4.848%</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
              <span style={{ fontSize: '0.78rem', color: '#64748b' }}>투자기간</span>
              <span style={{ fontSize: '1.1rem', fontWeight: '800', color: '#111111' }}>1년 6개월 26일</span>
              <span style={{ fontSize: '0.7rem', color: '#888888' }}>2028.02.04 만기</span>
            </div>
          </div>

          {/* Section: Expected Returns */}
          <div style={{ borderTop: '8px solid #f8fafc', margin: '0 -16px 20px -16px', padding: '20px 16px 0 16px' }}>
            <h3 style={{ fontSize: '0.98rem', fontWeight: '800', margin: '0 0 16px 0' }}>투자 수익 예상 하기</h3>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                borderBottom: '2px solid #111111',
                padding: '4px 20px',
                fontSize: '1.1rem',
                fontWeight: '800',
                color: '#111111'
              }}>
                1,000
              </div>
              <span style={{ fontSize: '0.95rem', fontWeight: '800', color: '#333' }}>만원 매수 신청 시</span>
            </div>

            {/* Yield Table Card */}
            <div style={{
              backgroundColor: '#f8fafc',
              borderRadius: '8px',
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              {[
                { label: '예상투자금액', val: '9,999,096원', color: '#2366ca', weight: 'bold' },
                { label: '총 수령금액(세전)', val: '10,749,720원', color: '#111111', weight: 'bold' },
                { label: '이자지급액(세전)', val: '678,271원', color: '#555555' },
                { label: '만기(매도)상환금', val: '10,071,449원', color: '#555555' },
                { label: '총 수령금액(세후)', val: '10,645,310원', color: '#111111', weight: '800' }
              ].map((row, rIdx) => (
                <div key={rIdx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: '#475569', fontWeight: row.weight ? '700' : 'normal' }}>{row.label}</span>
                  <span style={{ color: row.color, fontWeight: row.weight || '500' }}>{row.val}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0 10px 0' }}>
              <span style={{ fontSize: '0.78rem', color: '#2366ca', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '2px' }}>
                더보기
                <svg width="6" height="10" viewBox="0 0 10 18" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="3 3 8 9 3 15" /></svg>
              </span>
            </div>
            <p style={{ fontSize: '0.68rem', color: '#94a3b8', margin: '0 0 20px 0', lineHeight: 1.4 }}>
              * 상기 금액은 이해를 돕기 위한 예상 금액으로 실제와 차이가 발생할 수 있습니다.
            </p>
          </div>

          {/* Section: Basic Info */}
          <div style={{ borderTop: '8px solid #f8fafc', margin: '0 -16px 0 -16px', padding: '20px 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '0.98rem', fontWeight: '800', margin: 0 }}>기본정보</h3>
              <span style={{ border: '1px solid #94a3b8', borderRadius: '50%', width: '14px', height: '14px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', color: '#94a3b8', fontWeight: 'bold', cursor: 'pointer' }}>i</span>
            </div>

            {/* Info Table */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: '위험등급', val: '4등급(보통위험)' },
                { label: '신용등급', val: 'A' },
                { label: '표면금리', val: '4.321 %' },
                { label: '매수수익률', val: '4.800 %' },
                { label: '매수단가', val: '10,005.1 원' },
                { label: '민평금리', val: '5.182 %' },
                { label: '민평단가', val: '9,948.1 원' },
                { label: '매매단가차이(비율)', val: '57원(0.57%)' },
                { label: '발행일', val: '2026.02.04' },
                { label: '만기일', val: '2028.02.04' },
                { label: '채권종류', val: '금융회사채' },
                { label: '이자지급방법', val: '이표채(고정)' },
                { label: '이자계산주기', val: '3개월' },
                { label: '변제순위', val: '선순위' }
              ].map((row, rIdx) => (
                <div key={rIdx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', borderBottom: '1px solid #f8fafc', paddingBottom: '8px' }}>
                  <span style={{ color: '#64748b' }}>{row.label}</span>
                  <span style={{ color: '#111111', fontWeight: '700' }}>{row.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Actions Bar */}
        <div style={{ display: 'flex', height: '52px', borderTop: '1px solid #e2e8f0' }}>
          <button onClick={() => setScreen6ToBeSubScreen('bondCalc')} style={{
            flex: 1,
            backgroundColor: '#ffffff',
            color: '#111111',
            border: 'none',
            fontSize: '0.95rem',
            fontWeight: '700',
            cursor: 'pointer'
          }}>
            투자 수익 가계산
          </button>
          <button 
            onClick={handleBuy}
            style={{
              flex: 1,
              backgroundColor: '#de201e',
              color: '#ffffff',
              border: 'none',
              fontSize: '0.95rem',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            매수
          </button>
        </div>
      </div>
    );
  };

  const renderScreen6Calc = (mode) => {
    const handleClose = () => {
      if (mode === 'asis') {
        setScreen6AsIsSubScreen('menu');
      } else {
        setScreen6ToBeSubScreen('bondDetails');
      }
    };

    const isAsIs = mode === 'asis';

    // List of recently viewed bonds for TO-BE mode
    const tobeBonds = [
      { id: 'kr133', label: '한국투자캐피탈133', risk: '보통위험', type: '금융회사채', grade: 'A', code: 'KR6214341G28', baseYield: 4.800, basePrice: 10005.1, duration: 1.57, buyDate: '2026.07.09', sellDate: '2028.02.04' },
      { id: 'g03250', label: '국고채03250-5303', risk: '매우낮은위험', type: '국채', grade: 'AAA', code: 'KR103502G338', baseYield: 3.250, basePrice: 9850.0, duration: 26.65, buyDate: '2026.07.15', sellDate: '2053.03.10' },
      { id: 'energy', label: '경기에너지채권', risk: '보통위험', type: '회사채', grade: 'AA-', code: 'KR6034231E12', baseYield: 5.100, basePrice: 10120.0, duration: 3.33, buyDate: '2026.07.15', sellDate: '2029.11.15' },
      { id: 'samchok', label: '삼척블루파워9', risk: '보통위험', type: '회사채', grade: 'A+', code: 'KR6382103E38', baseYield: 4.500, basePrice: 10084.4, duration: 2.20, buyDate: '2026.07.15', sellDate: '2028.09.25' }
    ];

    // Find active bond for TO-BE
    const currentBond = isAsIs 
      ? { id: 'asis_bond', label: '경기지역개발채권26-05', risk: '매우낮은위험', type: '지방채', grade: '', code: 'KR2044022G52', baseYield: 4.180, basePrice: 9040.5, duration: 4.88, buyDate: '2026.07.15', sellDate: '2031.05.31' }
      : (tobeBonds.find(b => b.id === screen6CalcActiveBondId) || tobeBonds[0]);

    // Yield value
    const yieldInputVal = isAsIs ? '4.180' : screen6CalcYieldInput;
    const numericYield = Number(yieldInputVal) || 0;

    // Calculate Purchase Unit Price based on Yield dynamically (Pre-tax average evaluation yield simulation logic)
    // Base formula: unitPrice = basePrice - (numericYield - baseYield) * 150
    const calculatedUnitPrice = isAsIs 
      ? 9040.5 
      : Math.max(1000, currentBond.basePrice - (numericYield - currentBond.baseYield) * 150);

    // Expected quantity (Math.floor(Amount / unitPrice) * 10)
    const calculatedQuantity = screen6CalcAmount 
      ? (isAsIs 
          ? Math.floor(Number(screen6CalcAmount) / 9040.5 * 10000) 
          : Math.floor(Number(screen6CalcAmount) / calculatedUnitPrice * 10000))
      : 0;

    // Expected Return (Total receivable amount)
    // Pension mode has tax-deferral, using CM bond evaluation profit/loss return logic
    const calculatedReturnAmount = screen6CalcAmount 
      ? Math.round(Number(screen6CalcAmount) * (1 + (numericYield * currentBond.duration) / 100))
      : 0;

    const handleCalculate = () => {
      if (!screen6CalcAmount) return;
      alert(`입력하신 ${Number(screen6CalcAmount).toLocaleString()}원 기준 투자 수익 가계산이 완료되었습니다.\n예상 세후(또는 세전) 총 수령금액은 ${calculatedReturnAmount.toLocaleString()}원 입니다.`);
    };

    const isCalcDisabled = !screen6CalcAmount;

    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#ffffff',
        color: '#111111',
        fontFamily: 'sans-serif',
        position: 'relative'
      }}>
        {/* Phone Camera & Status Bar */}
        {!isAsIs && (
          <>
            <div style={styles.phoneCamera} />
            <div style={styles.phoneHeaderBar}>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#475569' }}>SKT 10:47</span>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: '800', color: '#333' }}>5G</span>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1px', height: '10px' }}>
                  <div style={{ width: '2px', height: '3px', backgroundColor: '#333' }}></div>
                  <div style={{ width: '2px', height: '5px', backgroundColor: '#333' }}></div>
                  <div style={{ width: '2px', height: '7px', backgroundColor: '#333' }}></div>
                  <div style={{ width: '2px', height: '9px', backgroundColor: '#333' }}></div>
                </div>
                <div style={{
                  border: '1px solid #333',
                  borderRadius: '3px',
                  padding: '0px 3px',
                  fontSize: '0.62rem',
                  fontWeight: '900',
                  height: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#333',
                  color: '#fff',
                  lineHeight: 1
                }}>
                  100
                </div>
              </div>
            </div>
          </>
        )}

        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '48px',
          padding: '0 16px',
          borderBottom: '1px solid #f1f5f9'
        }}>
          <button 
            onClick={handleClose}
            style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <span style={{ fontSize: '1rem', fontWeight: '800' }}>투자 수익 가계산</span>
          <span style={{ border: '1px solid #94a3b8', borderRadius: '50%', width: '15px', height: '15px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', color: '#94a3b8', fontWeight: 'bold', cursor: 'pointer' }}>!</span>
        </div>

        {/* Content */}
        <div style={{ flex: isFigmaExportMode ? 'none' : 1, overflowY: isFigmaExportMode ? 'visible' : 'auto' }}>


          {/* Top Bond Info Block */}
          <div style={{ padding: '16px 20px', borderBottom: '8px solid #f8fafc' }}>
            <div style={{ display: 'flex', gap: '6px', marginBottom: '8px', fontSize: '0.75rem', fontWeight: '800' }}>
              <span style={{ color: currentBond.risk === '매우낮은위험' ? '#2563eb' : '#10b981' }}>{currentBond.risk}</span>
              {currentBond.grade && (
                <>
                  <span style={{ color: '#64748b' }}>•</span>
                  <span style={{ color: '#475569' }}>{currentBond.grade}</span>
                </>
              )}
              <span style={{ color: '#64748b' }}>•</span>
              <span style={{ color: '#475569' }}>{currentBond.type}</span>
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '800', margin: '0 0 4px 0', color: '#111111' }}>
              {currentBond.label}
            </h2>
            <div style={{ fontSize: '0.78rem', color: '#888888' }}>
              {currentBond.code}
            </div>
          </div>

          {/* Investment Amount Input Section */}
          <div style={{ padding: '20px', borderBottom: '8px solid #f8fafc' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: '800', color: '#111111' }}>투자금액/수량</span>
              <div style={{ display: 'flex', border: '1px solid #cbd5e1', borderRadius: '4px', overflow: 'hidden' }}>
                <span style={{ padding: '3px 8px', fontSize: '0.72rem', fontWeight: '800', backgroundColor: '#f1f5f9', color: '#111111' }}>금액</span>
                <span style={{ padding: '3px 8px', fontSize: '0.72rem', backgroundColor: '#ffffff', color: '#64748b' }}>수량</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #cbd5e1', paddingBottom: '6px' }}>
              <span style={{ fontSize: '0.88rem', color: '#64748b', width: '60px' }}>금액</span>
              <input 
                type="number"
                value={screen6CalcAmount}
                onChange={(e) => setScreen6CalcAmount(e.target.value)}
                placeholder="1,000원 이상 입력"
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  fontSize: '1rem',
                  fontWeight: '700',
                  textAlign: 'right',
                  paddingRight: '6px'
                }}
              />
              <span style={{ fontSize: '0.9rem', fontWeight: '800', color: '#111111' }}>원</span>
            </div>
            <div style={{ textAlign: 'right', marginTop: '6px', fontSize: '0.75rem', color: '#2366ca', fontWeight: '700' }}>
              예상매수수량 {calculatedQuantity.toLocaleString()}원
            </div>
          </div>

          {/* Trade Info Section */}
          <div style={{ padding: '20px', borderBottom: '8px solid #f8fafc' }}>
            <h3 style={{ fontSize: '0.92rem', fontWeight: '800', margin: '0 0 16px 0' }}>매매정보</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <span style={{ fontSize: '0.78rem', color: '#64748b', display: 'block', marginBottom: '6px' }}>매수일자</span>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '6px', cursor: 'pointer' }}>
                  <span style={{ fontSize: '0.92rem', fontWeight: '700' }}>{currentBond.buyDate}</span>
                  <span style={{ fontSize: '8px', color: '#888' }}>▼</span>
                </div>
              </div>
              <div 
                onClick={isAsIs ? undefined : () => setScreen6CalcKeypadOpen(true)}
                style={{ cursor: isAsIs ? 'default' : 'pointer' }}
              >
                <span style={{ 
                  fontSize: '0.78rem', 
                  color: (!isAsIs && screen6CalcKeypadOpen) ? '#2563eb' : '#64748b', 
                  display: 'block', 
                  marginBottom: '6px',
                  fontWeight: (!isAsIs && screen6CalcKeypadOpen) ? '700' : 'normal'
                }}>
                  매수수익률
                </span>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  borderBottom: isAsIs ? 'none' : ((!isAsIs && screen6CalcKeypadOpen) ? '2px solid #2563eb' : '1px solid #e2e8f0'), 
                  paddingBottom: '6px' 
                }}>
                  <span style={{ 
                    fontSize: '0.92rem', 
                    fontWeight: '700', 
                    color: (!isAsIs && screen6CalcKeypadOpen) ? '#2563eb' : '#111111' 
                  }}>
                    {numericYield.toFixed(3)} %
                  </span>
                  {!isAsIs && screen6CalcKeypadOpen && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setScreen6CalcYieldInput('0');
                      }}
                      style={{
                        border: 'none',
                        background: '#cbd5e1',
                        color: '#ffffff',
                        borderRadius: '50%',
                        width: '16px',
                        height: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '10px',
                        cursor: 'pointer',
                        padding: 0,
                        lineHeight: 1
                      }}
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
              <div>
                <span style={{ fontSize: '0.78rem', color: '#64748b', display: 'block', marginBottom: '6px' }}>매수단가</span>
                <div style={{ borderBottom: 'none', paddingBottom: '6px' }}>
                  <span style={{ fontSize: '0.92rem', fontWeight: '700' }}>{calculatedUnitPrice.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })} 원</span>
                </div>
              </div>
              <div>
                <span style={{ fontSize: '0.78rem', color: '#64748b', display: 'block', marginBottom: '6px' }}>매도일자</span>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '6px', cursor: 'pointer' }}>
                  <span style={{ fontSize: '0.92rem', fontWeight: '700' }}>{currentBond.sellDate}</span>
                  <span style={{ fontSize: '8px', color: '#888' }}>▼</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tax Type Section */}
          <div style={{ padding: '20px', borderBottom: '8px solid #f8fafc' }}>
            <h3 style={{ fontSize: '0.92rem', fontWeight: '800', margin: '0 0 16px 0' }}>과세유형</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <span style={{ fontSize: '0.78rem', color: '#64748b', display: 'block', marginBottom: '4px' }}>과세기준</span>
                <span style={{ fontSize: '1.05rem', fontWeight: '800', color: '#111111' }}>개인</span>
              </div>
              <div>
                <span style={{ fontSize: '0.78rem', color: '#64748b', display: 'block', marginBottom: '6px' }}>과세구분</span>
                <div 
                  onClick={() => {
                    if (isAsIs) setScreen6AsIsBsheetState('tax_select');
                    else setScreen6ToBeBsheetState('tax_select');
                  }}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '6px', cursor: 'pointer' }}
                >
                  <span style={{ fontSize: '0.92rem', fontWeight: '700' }}>{isAsIs ? screen6AsIsTaxType : screen6ToBeTaxType}</span>
                  <span style={{ fontSize: '8px', color: '#888' }}>▼</span>
                </div>
              </div>
            </div>
          </div>

          {/* Notice Section */}
          <div style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '0.88rem', fontWeight: '800', color: '#475569', margin: '0 0 8px 0' }}>유의사항</h3>
            <p style={{ fontSize: '0.72rem', color: '#94a3b8', margin: 0, lineHeight: 1.4 }}>
              • 투자 수익 계산은 단순 참고자료로 실제 매수 시 현금흐름 및 수익률은 예상 결과와 다를 수 있습니다.
            </p>
          </div>
        </div>

        {/* Bottom Button */}
        <button 
          onClick={handleCalculate}
          disabled={isCalcDisabled}
          style={{
            height: '52px',
            backgroundColor: isCalcDisabled ? '#e2e8f0' : '#222222',
            color: isCalcDisabled ? '#a1a1aa' : '#ffffff',
            border: 'none',
            fontSize: '1rem',
            fontWeight: '700',
            cursor: isCalcDisabled ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          예상 결과보기
        </button>

        {/* Custom bottom numeric keypad */}
        {screen6CalcKeypadOpen && (() => {
          const handleNumPress = (val) => {
            if (screen6CalcYieldInput.includes('.') && screen6CalcYieldInput.split('.')[1]?.length >= 3) return;
            setScreen6CalcYieldInput(prev => {
              if (prev === '0') return val;
              return prev + val;
            });
          };

          const handleActionPress = (action) => {
            if (action === 'delete') {
              setScreen6CalcYieldInput(prev => {
                const next = prev.slice(0, -1);
                return next === '' ? '0' : next;
              });
            } else if (action === 'done') {
              setScreen6CalcKeypadOpen(false);
            } else if (action === '.') {
              if (!screen6CalcYieldInput.includes('.')) {
                setScreen6CalcYieldInput(prev => prev + '.');
              }
            }
          };

          const keypadStyles = {
            whiteKey: {
              height: '46px',
              backgroundColor: '#ffffff',
              border: 'none',
              borderRadius: '5px',
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#111111',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
            },
            greyKey: {
              height: '46px',
              backgroundColor: '#cbd5e1',
              border: 'none',
              borderRadius: '5px',
              fontSize: '1.1rem',
              fontWeight: '600',
              color: '#475569',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
            },
            emptyKey: {
              height: '46px',
              backgroundColor: '#cbd5e1',
              border: 'none',
              borderRadius: '5px',
              opacity: 0.5
            }
          };

          return (
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: '#e2e8f0',
              borderTop: '1px solid #cbd5e1',
              boxShadow: '0 -4px 12px rgba(0,0,0,0.15)',
              zIndex: 999,
              display: 'flex',
              flexDirection: 'column',
              fontFamily: 'sans-serif',
              padding: '8px 6px 16px 6px'
            }}>
              {/* Keypad Keys Grid (4 columns, 4 rows) */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '6px',
                width: '100%',
                boxSizing: 'border-box'
              }}>
                {/* Row 1 */}
                <button onClick={() => handleNumPress('1')} style={keypadStyles.whiteKey}>1</button>
                <button onClick={() => handleNumPress('2')} style={keypadStyles.whiteKey}>2</button>
                <button onClick={() => handleNumPress('3')} style={keypadStyles.whiteKey}>3</button>
                <button onClick={() => handleActionPress('delete')} style={keypadStyles.greyKey}>⌫</button>

                {/* Row 2 */}
                <button onClick={() => handleNumPress('4')} style={keypadStyles.whiteKey}>4</button>
                <button onClick={() => handleNumPress('5')} style={keypadStyles.whiteKey}>5</button>
                <button onClick={() => handleNumPress('6')} style={keypadStyles.whiteKey}>6</button>
                <button onClick={() => handleActionPress('done')} style={{ ...keypadStyles.greyKey, color: '#2563eb', fontWeight: '800' }}>완료</button>

                {/* Row 3 */}
                <button onClick={() => handleNumPress('7')} style={keypadStyles.whiteKey}>7</button>
                <button onClick={() => handleNumPress('8')} style={keypadStyles.whiteKey}>8</button>
                <button onClick={() => handleNumPress('9')} style={keypadStyles.whiteKey}>9</button>
                <button onClick={() => handleActionPress('.')} style={keypadStyles.greyKey}>.</button>

                {/* Row 4 */}
                <div style={keypadStyles.emptyKey}></div>
                <button onClick={() => handleNumPress('0')} style={keypadStyles.whiteKey}>0</button>
                <div style={keypadStyles.emptyKey}></div>
                <button onClick={() => handleActionPress(',')} style={keypadStyles.greyKey}>,</button>
              </div>
            </div>
          );
        })()}
      </div>
    );
  };

  const renderScreen6ToBeNoPlanModal = () => {
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        zIndex: 1010,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 24px',
        boxSizing: 'border-box',
        borderRadius: '0px'
      }}>
        <div style={{
          width: '280px',
          backgroundColor: '#ffffff',
          borderRadius: '0px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          border: 'none',
          animation: 'fadeIn 0.2s ease-out'
        }}>
          <div style={{
            padding: '32px 20px 28px 20px',
            textAlign: 'center',
            fontFamily: 'sans-serif'
          }}>
            <div style={{
              fontSize: '14px',
              color: '#111111',
              lineHeight: '1.6',
              fontWeight: '500',
              wordBreak: 'keep-all'
            }}>
              선택하신 계좌는<br />
              연금 플랜 미생성 계좌입니다.<br />
              플랜 등록 후<br />
              장내채권 매매가 가능합니다.
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            height: '48px'
          }}>
            <button
              onClick={() => setScreen6ToBeNoPlanModalOpen(false)}
              style={{
                flex: '3.5',
                border: 'none',
                backgroundColor: '#eeeeee',
                color: '#111111',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              확인
            </button>
            <button
              onClick={() => {
                setScreen6ToBeNoPlanModalOpen(false);
                alert('플랜 설정 등록 화면으로 이동합니다.');
              }}
              style={{
                flex: '6.5',
                border: 'none',
                backgroundColor: '#222222',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              플랜 설정하러 가기
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderScreen6Bsheet = (mode) => {
    const bsheetState = mode === 'asis' ? screen6AsIsBsheetState : screen6ToBeBsheetState;
    const setBsheetState = mode === 'asis' ? setScreen6AsIsBsheetState : setScreen6ToBeBsheetState;

    if (bsheetState === 'closed') return null;

    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        borderRadius: '0px'
      }}>
        <div 
          onClick={() => setBsheetState('closed')}
          style={{ flex: 1 }} 
        />
        
        <div style={{
          backgroundColor: '#ffffff',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
          padding: '20px 16px 24px 16px',
          boxShadow: '0 -4px 16px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          color: '#111111',
          fontFamily: 'sans-serif'
        }}>
          {bsheetState === 'product' ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <span style={{ fontSize: '18px', fontWeight: 'bold' }}>상품 선택</span>
                <button 
                  onClick={() => setBsheetState('account')}
                  style={{
                    border: '1px solid #2366ca',
                    color: '#2366ca',
                    backgroundColor: '#ffffff',
                    borderRadius: '4px',
                    padding: '4px 10px',
                    fontSize: '12px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  다른 계좌 선택
                </button>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {mode === 'asis' ? (
                  <div 
                    onClick={() => { setScreen6ActiveAccount('200-233354(01)'); setBsheetState('closed'); }}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '16px 4px',
                      cursor: 'pointer',
                      borderBottom: '1px solid #f1f5f9'
                    }}
                  >
                    <span style={{ fontSize: '14px', fontWeight: '700', color: '#111111' }}>
                      (01) 종합투자상품
                    </span>
                    <span style={{ color: '#2366ca', fontSize: '16px', fontWeight: 'bold' }}>✓</span>
                  </div>
                ) : (
                  [
                    { id: '200-233354(01)', label: '(01) 종합투자상품' },
                    { id: '200-233354(41)', label: '(41) 퇴직연금상품' },
                    { id: '200-233354(43)', label: '(43) 퇴직연금(DC_가입자)' }
                  ].map((item) => {
                    const isSelected = screen6ActiveAccount === item.id || (item.id === '200-233354(01)' && screen6ActiveAccount === '200-233354');
                    return (
                      <div
                        key={item.id}
                        onClick={() => { setScreen6ActiveAccount(item.id); setBsheetState('closed'); }}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '16px 4px',
                          cursor: 'pointer',
                          borderBottom: '1px solid #f1f5f9'
                        }}
                      >
                        <span style={{ fontSize: '14px', fontWeight: isSelected ? '700' : '400', color: '#111111' }}>
                          {item.label}
                        </span>
                        {isSelected && <span style={{ color: '#2366ca', fontSize: '16px', fontWeight: 'bold' }}>✓</span>}
                      </div>
                    );
                  })
                )}
              </div>
            </>
          ) : bsheetState === 'balance_select' ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{ fontSize: '16px', fontWeight: 'bold' }}>잔고선택</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {['매수', '입고', '취결', '실물'].map((item) => {
                  const isSelected = (mode === 'asis' ? screen6AsIsBalanceType : screen6ToBeBalanceType) === item;
                  return (
                    <div 
                      key={item}
                      onClick={() => {
                        if (mode === 'asis') setScreen6AsIsBalanceType(item);
                        else setScreen6ToBeBalanceType(item);
                        setBsheetState('closed');
                      }}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '12px 4px',
                        cursor: 'pointer',
                        borderBottom: '1px solid #f1f5f9'
                      }}
                    >
                      <span style={{ fontSize: '14px', fontWeight: isSelected ? '700' : '500', color: isSelected ? '#de201e' : '#111111' }}>{item}</span>
                      {isSelected && <span style={{ color: '#de201e', fontSize: '14px', fontWeight: 'bold' }}>✓</span>}
                    </div>
                  );
                })}
              </div>
            </>
          ) : bsheetState === 'hold_balance' ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{ fontSize: '16px', fontWeight: 'bold' }}>보유잔고 선택</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {['보유잔고', '보유잔고 전체', '매수가능 잔고', '담보 잔고'].map((item) => {
                  const isSelected = (mode === 'asis' ? screen6AsIsHoldBalanceType : screen6ToBeHoldBalanceType) === item;
                  return (
                    <div 
                      key={item}
                      onClick={() => {
                        if (mode === 'asis') setScreen6AsIsHoldBalanceType(item);
                        else setScreen6ToBeHoldBalanceType(item);
                        setBsheetState('closed');
                      }}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '12px 4px',
                        cursor: 'pointer',
                        borderBottom: '1px solid #f1f5f9'
                      }}
                    >
                      <span style={{ fontSize: '14px', fontWeight: isSelected ? '700' : '500', color: isSelected ? '#de201e' : '#111111' }}>{item}</span>
                      {isSelected && <span style={{ color: '#de201e', fontSize: '14px', fontWeight: 'bold' }}>✓</span>}
                    </div>
                  );
                })}
              </div>
            </>
          ) : bsheetState === 'tax_select' ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{ fontSize: '16px', fontWeight: 'bold' }}>과세 구분 선택</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {(mode === 'asis' 
                  ? ['정상과세', '비과세', '세금우대', '분리과세']
                  : ['연금소득세(연금수령 시)', '기타소득세(중도 해지나 일시금 인출 시)']
                ).map((item) => {
                  const isSelected = (mode === 'asis' ? screen6AsIsTaxType : screen6ToBeTaxType) === item;
                  return (
                    <div 
                      key={item}
                      onClick={() => {
                        if (mode === 'asis') setScreen6AsIsTaxType(item);
                        else setScreen6ToBeTaxType(item);
                        setBsheetState('closed');
                      }}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '14px 4px',
                        cursor: 'pointer',
                        borderBottom: '1px solid #f1f5f9'
                      }}
                    >
                      <span style={{ fontSize: '14px', fontWeight: isSelected ? '700' : '400', color: '#111111' }}>{item}</span>
                      {isSelected && <span style={{ color: '#111111', fontSize: '14px', fontWeight: 'bold' }}>✓</span>}
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <span style={{ fontSize: '18px', fontWeight: 'bold' }}>상품선택</span>
                {mode === 'tobe' ? (
                  <button 
                    onClick={() => setBsheetState('account')}
                    style={{
                      border: '1px solid #2366ca',
                      color: '#2366ca',
                      backgroundColor: '#ffffff',
                      borderRadius: '4px',
                      padding: '4px 10px',
                      fontSize: '12px',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    다른 계좌 선택
                  </button>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555555" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: 'pointer' }}>
                      <circle cx="12" cy="12" r="3" />
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
                    <span 
                      onClick={() => setBsheetState('closed')}
                      style={{ fontSize: '20px', fontWeight: '300', cursor: 'pointer', lineHeight: 1, color: '#333' }}
                    >
                      ✕
                    </span>
                  </div>
                )}
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {mode === 'tobe' ? (
                  [
                    { id: '200-233354(01)', label: '(01) 종합투자상품' },
                    { id: '200-233354(41)', label: '(41) 퇴직연금상품' },
                    { id: '200-233354(43)', label: '(43) 퇴직연금(DC_가입자)' }
                  ].map((item) => {
                    const isSelected = screen6ActiveAccount === item.id || (item.id === '200-233354(01)' && screen6ActiveAccount === '200-233354');
                    return (
                      <div
                        key={item.id}
                        onClick={() => { setScreen6ActiveAccount(item.id); setBsheetState('closed'); }}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '16px 4px',
                          cursor: 'pointer',
                          borderBottom: '1px solid #f1f5f9'
                        }}
                      >
                        <span style={{ fontSize: '14px', fontWeight: isSelected ? '700' : '400', color: '#111111' }}>
                          {item.label}
                        </span>
                        {isSelected && <span style={{ color: '#2366ca', fontSize: '16px', fontWeight: 'bold' }}>✓</span>}
                      </div>
                    );
                  })
                ) : (
                  <>
                    {/* First Account (AS-IS: 200-233354) */}
                    <div 
                      onClick={() => { setScreen6ActiveAccount('200-233354'); setBsheetState('closed'); }}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '14px 4px',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span style={{ fontSize: '14px', fontWeight: '700', color: '#111111' }}>200-233354</span>
                        <span style={{ fontSize: '11px', color: '#888888' }}>최근사용일자 : 2026.07.09</span>
                      </div>
                      {screen6ActiveAccount === '200-233354' && <span style={{ color: '#2366ca', fontSize: '16px', fontWeight: 'bold' }}>✓</span>}
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  const renderScreen6UnexecutedPopup = (mode, onClose) => {
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#ffffff',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'sans-serif',
        color: '#111111'
      }}>
        {/* Title Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          height: '48px',
          borderBottom: '1px solid #e2e8f0',
          position: 'relative',
          padding: '0 16px',
          boxSizing: 'border-box'
        }}>
          {/* Close button */}
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
              color: '#333333',
              padding: '0',
              lineHeight: 1
            }}
          >
            ✕
          </button>
          
          <div style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            fontWeight: '700',
            fontSize: '15px'
          }}>
            미체결 내역
          </div>
        </div>

        {/* Table Header */}
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '11px',
          textAlign: 'center',
          backgroundColor: '#f8fafc',
          borderBottom: '1px solid #e2e8f0'
        }}>
          <thead>
            <tr style={{ color: '#475569', borderBottom: '1px solid #f1f5f9' }}>
              <th rowSpan="2" style={{ width: '15%', padding: '6px 2px', borderRight: '1px solid #f1f5f9', fontWeight: '500' }}>주문<br/>번호</th>
              <th rowSpan="2" style={{ width: '35%', padding: '6px 2px', borderRight: '1px solid #f1f5f9', fontWeight: '500' }}>종목명</th>
              <th style={{ width: '25%', padding: '4px 2px', borderRight: '1px solid #f1f5f9', fontWeight: '500' }}>매매구분</th>
              <th style={{ width: '25%', padding: '4px 2px', fontWeight: '500' }}>수량</th>
            </tr>
            <tr style={{ color: '#475569' }}>
              <th style={{ padding: '4px 2px', borderRight: '1px solid #f1f5f9', fontWeight: '500' }}>단가</th>
              <th style={{ padding: '4px 2px', fontWeight: '500' }}>미체결</th>
            </tr>
          </thead>
        </table>

        {/* Empty state content */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#94a3b8',
          fontSize: '13px',
          fontWeight: '500'
        }}>
          미체결내역이 없습니다.
        </div>
      </div>
    );
  };

    const renderScreen6HoldBalancePopup = (onClose) => {
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#ffffff',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'sans-serif',
        color: '#111111'
      }}>
        {/* Title Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          height: '48px',
          borderBottom: '1px solid #e2e8f0',
          position: 'relative',
          padding: '0 16px',
          boxSizing: 'border-box'
        }}>
          {/* Close button */}
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
              color: '#333333',
              padding: '0',
              lineHeight: 1
            }}
          >
            ✕
          </button>
          
          <div style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            fontWeight: '700',
            fontSize: '15px'
          }}>
            보유잔고
          </div>
        </div>

        {/* Table Header (Identical to 장내(외)채권 잔고 그리드) */}
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '9px',
          textAlign: 'center',
          backgroundColor: '#f1f5f9',
          color: '#555555',
          borderBottom: '1px solid #cbd5e1'
        }}>
          <thead>
            <tr style={{ color: '#555555', borderBottom: '1px solid #cbd5e1' }}>
              <th style={{ width: '22%', padding: '4px 2px', borderRight: '1px solid #cbd5e1', fontWeight: '600' }}>종목명</th>
              <th style={{ width: '20%', padding: '4px 2px', borderRight: '1px solid #cbd5e1', fontWeight: '600' }}>수량</th>
              <th style={{ width: '20%', padding: '4px 2px', borderRight: '1px solid #cbd5e1', fontWeight: '600' }}>매수단가</th>
              <th style={{ width: '18%', padding: '4px 2px', borderRight: '1px solid #cbd5e1', fontWeight: '600' }}></th>
              <th style={{ width: '20%', padding: '4px 2px', fontWeight: '600' }}>과세구분</th>
            </tr>
            <tr style={{ color: '#555555', borderBottom: '1px solid #cbd5e1' }}>
              <th rowSpan="2" style={{ padding: '4px 2px', borderRight: '1px solid #cbd5e1', fontWeight: '500', verticalAlign: 'middle' }}>종목코드</th>
              <th style={{ padding: '4px 2px', borderRight: '1px solid #cbd5e1', fontWeight: '500' }}>주문가능수량</th>
              <th style={{ padding: '4px 2px', borderRight: '1px solid #cbd5e1', fontWeight: '500' }}>매수금액</th>
              <th style={{ padding: '4px 2px', borderRight: '1px solid #cbd5e1', fontWeight: '600' }}>수익률</th>
              <th rowSpan="2" style={{ padding: '4px 2px', fontWeight: '500', verticalAlign: 'middle' }}>잔고구분</th>
            </tr>
            <tr style={{ color: '#555555' }}>
              <th style={{ padding: '4px 2px', borderRight: '1px solid #cbd5e1', fontWeight: '500' }}>매수일</th>
              <th style={{ padding: '4px 2px', borderRight: '1px solid #cbd5e1', fontWeight: '500' }}>만기일</th>
              <th style={{ padding: '4px 2px', borderRight: '1px solid #cbd5e1', fontWeight: '600' }}></th>
            </tr>
          </thead>
        </table>

        {/* Table Body (Identical to 장내(외)채권 잔고 그리드) */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#ffffff',
          color: '#111111',
          overflowY: 'auto'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '9.5px',
            textAlign: 'center',
            backgroundColor: '#ffffff',
            color: '#111111'
          }}>
            <tbody>
              <tr style={{ borderBottom: '1px solid #cbd5e1' }}>
                <td style={{ width: '22%', padding: '6px 2px', borderRight: '1px solid #cbd5e1', textAlign: 'left', paddingLeft: '4px' }}>
                  <div style={{ fontWeight: '700', color: '#111111' }}>삼척블루파워10</div>
                  <div style={{ fontSize: '8px', color: '#888888', marginTop: '4px' }}>KR6002361A97</div>
                </td>
                <td style={{ width: '20%', padding: '6px 2px', borderRight: '1px solid #cbd5e1', textAlign: 'right', paddingRight: '4px' }}>
                  <div style={{ fontWeight: '700' }}>10,000</div>
                  <div style={{ color: '#555555', marginTop: '2px' }}>10,000</div>
                  <div style={{ color: '#888888', marginTop: '2px', fontSize: '8px' }}>2026.07.10</div>
                </td>
                <td style={{ width: '20%', padding: '6px 2px', borderRight: '1px solid #cbd5e1', textAlign: 'right', paddingRight: '4px' }}>
                  <div style={{ fontWeight: '700' }}>10,065.0원</div>
                  <div style={{ color: '#555555', marginTop: '2px' }}>10,065,000원</div>
                  <div style={{ color: '#888888', marginTop: '2px', fontSize: '8px' }}>2029.09.15</div>
                </td>
                <td style={{ width: '18%', padding: '6px 2px', borderRight: '1px solid #cbd5e1', textAlign: 'center', color: '#de201e', fontWeight: '700', verticalAlign: 'middle' }}>
                  +0.19%
                </td>
                <td style={{ width: '20%', padding: '6px 2px', textAlign: 'center', verticalAlign: 'middle' }}>
                  <div style={{ fontWeight: '700' }}>종합과세</div>
                  <div style={{ fontSize: '9px', fontWeight: '700', marginTop: '4px' }}>퇴직납입금</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

const renderScreen6Ratio = (mode) => {
    const isAsIs = mode === 'asis';
    const setSubScreen = isAsIs ? setScreen6AsIsSubScreen : setScreen6ToBeSubScreen;

    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#ffffff',
        color: '#111111',
        fontFamily: 'sans-serif'
      }}>
        {/* Status Bar (Only in TO-BE mode and when switch is ON, since parent container or Switch OFF wrapper already renders a status bar) */}
        {(!isAsIs && screen6ToBeSwitchOn) && (
          <div style={{
            ...styles.phoneHeaderBar,
            backgroundColor: '#ffffff',
            color: '#333333',
            borderBottom: 'none'
          }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '700' }}>SKT 2:28</span>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <span style={{ fontSize: '0.65rem', fontWeight: '800' }}>5G</span>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1px', height: '10px' }}>
                <div style={{ width: '2px', height: '3px', backgroundColor: '#333' }}></div>
                <div style={{ width: '2px', height: '5px', backgroundColor: '#333' }}></div>
                <div style={{ width: '2px', height: '7px', backgroundColor: '#333' }}></div>
                <div style={{ width: '2px', height: '9px', backgroundColor: '#333' }}></div>
              </div>
              <div style={{
                border: '1px solid #333',
                borderRadius: '3px',
                padding: '0px 3px',
                fontSize: '0.62rem',
                fontWeight: '900',
                height: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#333',
                color: '#fff',
                lineHeight: 1
              }}>
                52
              </div>
            </div>
          </div>
        )}

        {/* MTS Toolbar Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '44px',
          padding: '0 12px',
          borderBottom: '1px solid #eee',
          backgroundColor: '#fff',
          position: 'relative'
        }}>
          <button 
            onClick={() => setSubScreen('menu')}
            style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0, zIndex: 2 }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.2"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
          </button>
          
          <span style={{ 
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '1.02rem', 
            fontWeight: '700', 
            color: '#222222', 
            letterSpacing: '-0.3px',
            zIndex: 1
          }}>
            보유상품 현황
          </span>

          <div>
            <button style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
            </button>
          </div>
        </div>

        {/* Account Selector */}
        <div style={{ padding: '8px 12px', backgroundColor: '#ffffff' }}>
          <div style={{
            border: '1px solid #cbd5e1',
            borderRadius: '4px',
            padding: '8px 12px',
            fontSize: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            cursor: 'pointer'
          }}>
            <span style={{ fontWeight: '600', color: '#333333' }}>200-123454(41) 김대신</span>
            <span style={{ fontSize: '8px', color: '#888888' }}>▼</span>
          </div>
        </div>

        {/* Contents Container */}
        <div style={{ flex: 1, overflowY: 'auto', backgroundColor: '#ffffff' }}>
          {/* My Asset Ratio Section */}
          <div style={{ padding: '16px 14px' }}>
            <h3 style={{ fontSize: '0.98rem', fontWeight: '800', margin: '0 0 16px 0', color: '#111' }}>내 자산비율</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#666' }}>총 평가금액</span>
                <span style={{ fontWeight: '700', color: '#111' }}>97,213</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#666' }}>위험자산 매수가능한도</span>
                <span style={{ fontWeight: '700', color: '#111' }}>68,049</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#666' }}>매수가능금액</span>
                <span style={{ fontWeight: '700', color: '#111' }}>85,543</span>
              </div>
            </div>

            {/* Donut Chart & Legend Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'space-between', marginBottom: '16px' }}>
              {/* SVG Donut Chart with Path Sectors */}
              <div style={{ width: '130px', height: '130px', position: 'relative' }}>
                <svg width="130" height="130" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)', display: 'block' }}>
                  {mode === 'tobe' ? (
                    <>
                      {/* TO-BE: 현금 65% (0% to 65% -> 0 to 234 deg) */}
                      <path d="M 90 50 A 40 40 0 1 1 26.48 17.64 L 38.24 33.82 A 20 20 0 1 0 70 50 Z" fill="#00b094" />
                      {/* TO-BE: 채권 23% (65% to 88% -> 234 to 316.8 deg) */}
                      <path d="M 26.48 17.64 A 40 40 0 0 1 79.16 22.62 L 64.58 36.31 A 20 20 0 0 0 38.24 33.82 Z" fill="#a3e635" />
                      {/* TO-BE: ETF 12% (88% to 100% -> 316.8 to 360 deg) */}
                      <path d="M 79.16 22.62 A 40 40 0 0 1 90 50 L 70 50 A 20 20 0 0 0 64.58 36.31 Z" fill="#ff6b00" />
                    </>
                  ) : (
                    <>
                      {/* AS-IS: 현금 76.5% (0% to 76.5% -> 0 to 275.4 deg) */}
                      <path d="M 90 50 A 40 40 0 1 1 53.77 10.18 L 51.88 30.09 A 20 20 0 1 0 70 50 Z" fill="#00b094" />
                      {/* AS-IS: 장외채권 11.5% (76.5% to 88% -> 275.4 to 316.8 deg) */}
                      <path d="M 53.77 10.18 A 40 40 0 0 1 79.16 22.62 L 64.58 36.31 A 20 20 0 0 0 51.88 30.09 Z" fill="#a3e635" />
                      {/* AS-IS: ETF 12% (88% to 100% -> 316.8 to 360 deg) */}
                      <path d="M 79.16 22.62 A 40 40 0 0 1 90 50 L 70 50 A 20 20 0 0 0 64.58 36.31 Z" fill="#ff6b00" />
                    </>
                  )}
                </svg>
              </div>

              {/* Chart Legend */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.78rem', flex: 1 }}>
                {[
                  { label: '현금', color: '#00b094', val: mode === 'tobe' ? '65.00%' : '76.50%' },
                  { label: '펀드', color: '#f39c12', val: '0.00%' },
                  { label: 'ETF/ETN/리츠', color: '#ff6b00', val: '12.00%' },
                  { label: mode === 'tobe' ? '채권' : '장외채권', color: '#a3e635', val: mode === 'tobe' ? '23.00%' : '11.50%' },
                  { label: '원리금보장', color: '#00b094', val: '0.00%' },
                  { label: '디폴트옵션', color: '#facc15', val: '0.00%' }
                ].map((leg, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ width: '8px', height: '8px', backgroundColor: leg.color, display: 'inline-block', borderRadius: '1px' }}></span>
                      <span style={{ color: '#555' }}>{leg.label}</span>
                    </div>
                    <span style={{ fontWeight: '700', color: '#111' }}>{leg.val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ fontSize: '0.72rem', color: '#999', lineHeight: '1.45', marginBottom: '16px' }}>
              ※ 당일 결제 기준 잔고입니다.<br />
              (단, ETF/ETN/리츠는 전영업일 종가 기준)
            </div>
          </div>

          <div style={{ height: '8px', backgroundColor: '#f1f5f9' }} />

          {/* List items from image */}
          <div style={{ padding: '16px 14px' }}>
            <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.65rem', backgroundColor: '#fee2e2', color: '#ef4444', padding: '2px 6px', borderRadius: '3px', fontWeight: '800' }}>위험자산</span>
              <span style={{ fontSize: '0.65rem', backgroundColor: '#fef3c7', color: '#d97706', padding: '2px 6px', borderRadius: '3px', fontWeight: '800' }}>높은위험</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: '800', color: '#222', lineHeight: '1.3', wordBreak: 'keep-all' }}>
                  HANARO 미국AI메모리반도체TOP4+
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: '800', color: '#222' }}>11,670 원</span>
                <span style={{ fontSize: '0.78rem', color: '#2563eb', fontWeight: '700', marginTop: '2px' }}>-2,910</span>
                <span style={{ fontSize: '0.72rem', color: '#2563eb', fontWeight: '700' }}>(-19.96%)</span>
              </div>
            </div>

            {/* Row Actions */}
            <div style={{ display: 'flex', border: '1px solid #cbd5e1', borderRadius: '4px', overflow: 'hidden', height: '36px', marginBottom: '24px' }}>
              <button style={{ flex: 1, border: 'none', backgroundColor: '#ffffff', color: '#333', fontSize: '0.82rem', fontWeight: '700', cursor: 'pointer', borderRight: '1px solid #cbd5e1' }}>잔고현황</button>
              <button style={{ flex: 1, border: 'none', backgroundColor: '#2563eb', color: '#ffffff', fontSize: '0.82rem', fontWeight: '700', cursor: 'pointer', borderRight: '1px solid #cbd5e1' }}>매도</button>
              <button style={{ flex: 1, border: 'none', backgroundColor: '#ef4444', color: '#ffffff', fontSize: '0.82rem', fontWeight: '700', cursor: 'pointer' }}>추가매수</button>
            </div>

            {/* Sample 1: 장외채권 (Available in both AS-IS and TO-BE) */}
            <div style={{ height: '1px', backgroundColor: '#e2e8f0', margin: '16px 0' }} />
            <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.65rem', backgroundColor: '#eff6ff', color: '#2563eb', padding: '2px 6px', borderRadius: '3px', fontWeight: '800' }}>장외채권</span>
              <span style={{ fontSize: '0.65rem', backgroundColor: '#f3f4f6', color: '#4b5563', padding: '2px 6px', borderRadius: '3px', fontWeight: '800' }}>저위험</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: '800', color: '#222', lineHeight: '1.3', wordBreak: 'keep-all' }}>
                  대우건설95-1
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: '800', color: '#222' }}>10,120 원</span>
                <span style={{ fontSize: '0.78rem', color: '#de201e', fontWeight: '700', marginTop: '2px' }}>+120</span>
                <span style={{ fontSize: '0.72rem', color: '#de201e', fontWeight: '700' }}>(+1.20%)</span>
              </div>
            </div>
            <div style={{ display: 'flex', border: '1px solid #cbd5e1', borderRadius: '4px', overflow: 'hidden', height: '36px', marginBottom: '24px' }}>
              <button style={{ flex: 1, border: 'none', backgroundColor: '#ffffff', color: '#333', fontSize: '0.82rem', fontWeight: '700', cursor: 'pointer', borderRight: '1px solid #cbd5e1' }}>잔고현황</button>
              <button style={{ flex: 1, border: 'none', backgroundColor: '#2563eb', color: '#ffffff', fontSize: '0.82rem', fontWeight: '700', cursor: 'pointer', borderRight: '1px solid #cbd5e1' }}>매도</button>
              <button style={{ flex: 1, border: 'none', backgroundColor: '#ef4444', color: '#ffffff', fontSize: '0.82rem', fontWeight: '700', cursor: 'pointer' }}>추가매수</button>
            </div>

            {/* Sample 2: 장내채권 (TO-BE only) */}
            {mode === 'tobe' && (
              <>
                <div style={{ height: '1px', backgroundColor: '#e2e8f0', margin: '16px 0' }} />
                <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.65rem', backgroundColor: '#eff6ff', color: '#2563eb', padding: '2px 6px', borderRadius: '3px', fontWeight: '800' }}>장내채권</span>
                  <span style={{ fontSize: '0.65rem', backgroundColor: '#f3f4f6', color: '#4b5563', padding: '2px 6px', borderRadius: '3px', fontWeight: '800' }}>저위험</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: '800', color: '#222', lineHeight: '1.3', wordBreak: 'keep-all' }}>
                      삼척블루파워10
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: '800', color: '#222' }}>10,065 원</span>
                    <span style={{ fontSize: '0.78rem', color: '#de201e', fontWeight: '700', marginTop: '2px' }}>+19</span>
                    <span style={{ fontSize: '0.72rem', color: '#de201e', fontWeight: '700' }}>(+0.19%)</span>
                  </div>
                </div>
                <div style={{ display: 'flex', border: '1px solid #cbd5e1', borderRadius: '4px', overflow: 'hidden', height: '36px', marginBottom: '24px' }}>
                  <button style={{ flex: 1, border: 'none', backgroundColor: '#ffffff', color: '#333', fontSize: '0.82rem', fontWeight: '700', cursor: 'pointer', borderRight: '1px solid #cbd5e1' }}>잔고현황</button>
                  <button style={{ flex: 1, border: 'none', backgroundColor: '#2563eb', color: '#ffffff', fontSize: '0.82rem', fontWeight: '700', cursor: 'pointer', borderRight: '1px solid #cbd5e1' }}>매도</button>
                  <button style={{ flex: 1, border: 'none', backgroundColor: '#ef4444', color: '#ffffff', fontSize: '0.82rem', fontWeight: '700', cursor: 'pointer' }}>추가매수</button>
                </div>
              </>
            )}

            {/* Cash asset section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '16px', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.96rem', fontWeight: '800', color: '#222' }}>현금성자산</span>
              <span style={{ fontSize: '1rem', fontWeight: '800', color: '#222' }}>85,543 원</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button style={{ border: 'none', backgroundColor: '#ef4444', color: '#ffffff', padding: '8px 18px', fontSize: '0.85rem', fontWeight: '800', borderRadius: '2px', cursor: 'pointer' }}>상품매수</button>
            </div>
          </div>
        </div>

        {/* Index Marquee Ticker */}
        <div style={{ height: '24px', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px', borderTop: '1px solid #e2e8f0', fontSize: '0.72rem' }}>
          <span style={{ fontWeight: '800' }}>KOSDAQ</span>
          <span style={{ color: '#ef4444', fontWeight: '800' }}>818.71 ▲ 34.73 (4.43%)</span>
        </div>

        {/* Phone Footer Navigation */}
        <div style={{
          height: '44px',
          display: 'flex',
          alignItems: 'stretch',
          borderTop: '1px solid #e2e8f0',
          backgroundColor: '#ffffff'
        }}>
          <button style={{ width: '48px', border: 'none', background: 'none', borderRight: '1px solid #f1f5f9', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
          </button>
          <div style={{ flex: 1, display: 'flex', alignItems: 'stretch' }}>
            {[
              { key: '보유상품 현황', label: `보유상품\n현황` },
              { key: 'ETF/리츠 잔고', label: `ETF/리츠\n잔고` },
              { key: 'ETF/리츠 체결/미체결', label: `ETF/리츠\n체결/미체결` },
              { key: 'ETF/리츠 주문', label: `ETF/리츠\n주문` }
            ].map((tab, idx) => {
              return (
                <button
                  key={tab.key}
                  style={{
                    flex: 1,
                    border: 'none',
                    background: 'none',
                    borderRight: idx < 3 ? '1px solid #f1f5f9' : 'none',
                    cursor: 'pointer',
                    fontSize: '0.73rem',
                    fontWeight: '500',
                    color: '#666',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    whiteSpace: 'pre-line',
                    lineHeight: '1.2',
                    padding: '2px 2px'
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
          <button 
            onClick={() => setSubScreen('menu')}
            style={{ width: '48px', border: 'none', background: 'none', borderLeft: '1px solid #f1f5f9', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.2"><path d="M9 14L4 9l5-5" /><path d="M4 9h10a5 5 0 0 1 5 5v5" /></svg>
          </button>
        </div>
      </div>
    );
  };

const renderScreen6Balance = (mode, isSwitchOff = false) => {
    const isAsIs = mode === 'asis';
    const subScreen = isAsIs ? screen6AsIsSubScreen : screen6ToBeSubScreen;
    const setSubScreen = isAsIs ? setScreen6AsIsSubScreen : setScreen6ToBeSubScreen;
    const setOrderTab = isAsIs ? setScreen6AsIsOrderTab : setScreen6ToBeOrderTab;
    const showFiveTabs = !isAsIs;

    const accountText = isAsIs 
      ? (isSwitchOff ? '200-233354(41) 김대신' : '200-233354(01) 김대신')
      : '782-000000(41) 김대신';

    return (
      <>
        {/* Render status bar only in TO-BE mode, since AS-IS parent wrapper already renders it */}
        {!isAsIs && (
          <>
            {/* Galaxy S20 Central Punch-hole Camera */}
            <div style={styles.phoneCamera} />

            {/* Phone Status Bar (Consistent with other TO-BE screens) */}
            <div style={styles.phoneHeaderBar}>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: isDark ? '#94a3b8' : '#475569' }}>SKT 10:39</span>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: '800', color: isDark ? '#94a3b8' : '#333' }}>5G</span>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1px', height: '10px' }}>
                  <div style={{ width: '2px', height: '3px', backgroundColor: isDark ? '#94a3b8' : '#333' }}></div>
                  <div style={{ width: '2px', height: '5px', backgroundColor: isDark ? '#94a3b8' : '#333' }}></div>
                  <div style={{ width: '2px', height: '7px', backgroundColor: isDark ? '#94a3b8' : '#333' }}></div>
                  <div style={{ width: '2px', height: '9px', backgroundColor: isDark ? '#94a3b8' : '#333' }}></div>
                </div>
                <div style={{
                  border: isDark ? '1px solid #94a3b8' : '1px solid #333',
                  borderRadius: '3px',
                  padding: '0px 3px',
                  fontSize: '0.62rem',
                  fontWeight: '900',
                  height: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: isDark ? '#94a3b8' : '#333',
                  color: isDark ? '#0b0f19' : '#fff',
                  lineHeight: 1
                }}>
                  86
                </div>
              </div>
            </div>
          </>
        )}

        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '46px',
          padding: '0 12px',
          borderBottom: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0',
          backgroundColor: isDark ? '#121826' : '#ffffff',
          position: 'relative'
        }}>
          {/* Far Left: Hamburger Menu */}
          <span 
            onClick={() => setSubScreen('menu')}
            style={{ fontSize: '1.4rem', cursor: 'pointer', color: isDark ? '#cbd5e1' : '#111111', display: 'flex', alignItems: 'center' }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </span>

          {/* Absolute Center: Title & Refresh */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span style={{ fontWeight: '800', fontSize: '1.05rem', color: isDark ? '#ffffff' : '#111111', letterSpacing: '-0.3px' }}>장내채권</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a0a0a0" strokeWidth="2.2" style={{ cursor: 'pointer' }}>
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
          </div>

          {/* Far Right: Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {/* Custom ₩종합 Icon */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              lineHeight: 1,
              cursor: 'pointer',
              color: isDark ? '#ffffff' : '#111111',
              marginTop: '2px',
              paddingRight: '2px',
              position: 'relative'
            }}>
              <span style={{ fontSize: '1.25rem', fontWeight: '400', fontFamily: 'sans-serif', marginLeft: '0px', zIndex: 1, display: 'inline-block', transform: 'scaleX(1.35)' }}>₩</span>
              <span style={{
                fontSize: '0.45rem',
                fontWeight: '900',
                marginTop: '-5px',
                marginLeft: '6px',
                letterSpacing: '-0.5px',
                backgroundColor: isDark ? '#121826' : '#ffffff',
                border: isDark ? '0.5px solid #121826' : '0.5px solid #ffffff',
                borderRadius: '1px',
                padding: '0px 1.5px',
                color: isDark ? '#cbd5e1' : '#111111',
                zIndex: 2
              }}>종합</span>
            </div>

            {/* Custom Ribbon Bookmark Icon without Star */}
            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', color: isDark ? '#ffffff' : '#111111' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="miter">
                <path d="M5 3h14v18l-7-4.5L5 21V3z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Tabs: 미체결, 체결, 잔고 */}
        <div style={{
          display: 'flex',
          borderBottom: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0',
          backgroundColor: isDark ? '#121826' : '#ffffff'
        }}>
          {['미체결', '체결', isAsIs ? '잔고' : '장내(외)채권 잔고'].map((tab) => {
            const isActive = (tab === '미체결' && screen6BalanceActiveTab === '미체결') ||
                             (tab === '체결' && screen6BalanceActiveTab === '체결') ||
                             ((tab === '잔고' || tab === '장내(외)채권 잔고') && screen6BalanceActiveTab === '잔고');
            return (
              <div
                key={tab}
                onClick={() => {
                  if (tab === '미체결') setScreen6BalanceActiveTab('미체결');
                  else if (tab === '체결') setScreen6BalanceActiveTab('체결');
                  else setScreen6BalanceActiveTab('잔고');
                }}
                style={{
                  flex: 1,
                  textAlign: 'center',
                  padding: '12px 0',
                  fontSize: '13px',
                  fontWeight: isActive ? '800' : '500',
                  color: isActive ? (isDark ? '#3b82f6' : '#111111') : (isDark ? '#94a3b8' : '#777777'),
                  borderBottom: isActive ? `2px solid ${isDark ? '#3b82f6' : '#111111'}` : 'none',
                  cursor: 'pointer'
                }}
              >
                {tab}
              </div>
            );
          })}
        </div>

        {/* Scrollable Pills Filter Bar (Only in AS-IS mode) */}
        {isAsIs && (
          <div style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            padding: '8px 12px',
            backgroundColor: isDark ? '#0f172a' : '#ffffff',
            scrollbarWidth: 'none',
            whiteSpace: 'nowrap',
            borderBottom: isDark ? '1px solid #1e293b' : '1px solid #f1f5f9'
          }}>
            {['국내주식', '해외주식', '금현물', '펀드', '장내채권'].map((pill) => {
              const isActive = pill === '장내채권';
              return (
                <div
                  key={pill}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '16px',
                    fontSize: '11px',
                    fontWeight: isActive ? '700' : '500',
                    cursor: 'pointer',
                    backgroundColor: isActive 
                      ? (isDark ? 'rgba(59, 130, 246, 0.15)' : '#eff6ff') 
                      : (isDark ? '#1e293b' : '#f1f5f9'),
                    color: isActive 
                      ? (isDark ? '#60a5fa' : '#2563eb') 
                      : (isDark ? '#cbd5e1' : '#555555'),
                    border: '1px solid transparent'
                  }}
                >
                  {pill}
                </div>
              );
            })}
          </div>
        )}

        {/* Dropdown Box */}
        <div style={{ padding: '8px 12px', backgroundColor: isDark ? '#0f172a' : '#ffffff' }}>
          <div style={{
            border: isDark ? '1px solid #334155' : '1px solid #cbd5e1',
            borderRadius: '4px',
            padding: '8px 12px',
            fontSize: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: isDark ? '#1e293b' : '#ffffff',
            cursor: 'pointer'
          }}>
            <span style={{ fontWeight: '600', color: isDark ? '#ffffff' : '#333333' }}>{accountText}</span>
            <span style={{ fontSize: '8px', color: isDark ? '#94a3b8' : '#888888' }}>▼</span>
          </div>
        </div>

        {/* Balance Grid Table Header */}
        {!isAsIs && screen6BalanceActiveTab === '잔고' ? (
          /* TO-BE Mode: Grid Layout with Additional Requested Columns */
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '9px',
            textAlign: 'center',
            backgroundColor: isDark ? '#1e293b' : '#f1f5f9',
            color: isDark ? '#94a3b8' : '#555555',
            borderBottom: isDark ? '1px solid #334155' : '1px solid #cbd5e1'
          }}>
            <thead>
              <tr style={{ color: isDark ? '#94a3b8' : '#555555', borderBottom: isDark ? '1px solid #334155' : '1px solid #cbd5e1' }}>
                <th style={{ width: '22%', padding: '4px 2px', borderRight: isDark ? '1px solid #334155' : '1px solid #cbd5e1', fontWeight: '600' }}>종목명</th>
                <th style={{ width: '20%', padding: '4px 2px', borderRight: isDark ? '1px solid #334155' : '1px solid #cbd5e1', fontWeight: '600' }}>수량</th>
                <th style={{ width: '20%', padding: '4px 2px', borderRight: isDark ? '1px solid #334155' : '1px solid #cbd5e1', fontWeight: '600' }}>매수단가</th>
                <th style={{ width: '18%', padding: '4px 2px', borderRight: isDark ? '1px solid #334155' : '1px solid #cbd5e1', fontWeight: '600' }}></th>
                <th style={{ width: '20%', padding: '4px 2px', fontWeight: '600' }}>과세구분</th>
              </tr>
              <tr style={{ color: isDark ? '#94a3b8' : '#555555', borderBottom: isDark ? '1px solid #334155' : '1px solid #cbd5e1' }}>
                <th rowSpan="2" style={{ padding: '4px 2px', borderRight: isDark ? '1px solid #334155' : '1px solid #cbd5e1', fontWeight: '500', verticalAlign: 'middle' }}>종목코드</th>
                <th style={{ padding: '4px 2px', borderRight: isDark ? '1px solid #334155' : '1px solid #cbd5e1', fontWeight: '500' }}>주문가능수량</th>
                <th style={{ padding: '4px 2px', borderRight: isDark ? '1px solid #334155' : '1px solid #cbd5e1', fontWeight: '500' }}>매수금액</th>
                <th style={{ padding: '4px 2px', borderRight: isDark ? '1px solid #334155' : '1px solid #cbd5e1', fontWeight: '600' }}>수익률</th>
                <th rowSpan="2" style={{ padding: '4px 2px', fontWeight: '500', verticalAlign: 'middle' }}>잔고구분</th>
              </tr>
              <tr style={{ color: isDark ? '#94a3b8' : '#555555' }}>
                <th style={{ padding: '4px 2px', borderRight: isDark ? '1px solid #334155' : '1px solid #cbd5e1', fontWeight: '500' }}>매수일</th>
                <th style={{ padding: '4px 2px', borderRight: isDark ? '1px solid #334155' : '1px solid #cbd5e1', fontWeight: '500' }}>만기일</th>
                <th style={{ padding: '4px 2px', borderRight: isDark ? '1px solid #334155' : '1px solid #cbd5e1', fontWeight: '600' }}></th>
              </tr>
            </thead>
          </table>
        ) : screen6BalanceActiveTab === '잔고' ? (
          /* AS-IS Mode: Default Grid Layout */
          <div style={{
            backgroundColor: isDark ? '#1e293b' : '#f1f5f9',
            borderTop: 'none',
            borderBottom: 'none',
            fontSize: '10px',
            color: isDark ? '#94a3b8' : '#555555',
            padding: '6px 12px',
            display: 'flex',
            textAlign: 'center'
          }}>
            <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
              <span>종목명</span>
              <span style={{ opacity: 0.8 }}>종목코드</span>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
              <span>수량</span>
              <span style={{ opacity: 0.8 }}>매수일</span>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center' }}>
              <span>수익률</span>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
              <span>과세구분</span>
              <span style={{ opacity: 0.8 }}>잔고구분</span>
            </div>
          </div>
        ) : (
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '10px',
            textAlign: 'center',
            backgroundColor: isDark ? '#1e293b' : '#f1f5f9',
            color: isDark ? '#94a3b8' : '#555555',
            borderBottom: isDark ? '1px solid #334155' : '1px solid #cbd5e1'
          }}>
            <thead>
              <tr style={{ color: isDark ? '#94a3b8' : '#555555', borderBottom: isDark ? '1px solid #334155' : '1px solid #cbd5e1' }}>
                <th style={{ width: '20%', padding: '6px 2px', borderRight: isDark ? '1px solid #334155' : '1px solid #e2e8f0', fontWeight: '500' }}>주문#</th>
                <th rowSpan="2" style={{ width: '35%', padding: '6px 2px', borderRight: isDark ? '1px solid #334155' : '1px solid #e2e8f0', fontWeight: '500', verticalAlign: 'middle' }}>종목명</th>
                <th style={{ width: '20%', padding: '6px 2px', borderRight: isDark ? '1px solid #334155' : '1px solid #e2e8f0', fontWeight: '500', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '2px', color: '#a0a0a0' }}>«</span>
                  거래
                </th>
                <th style={{ width: '25%', padding: '6px 2px', fontWeight: '500', position: 'relative' }}>
                  주문수량
                  <span style={{ position: 'absolute', right: '2px', color: '#a0a0a0' }}>»</span>
                </th>
              </tr>
              <tr style={{ color: isDark ? '#94a3b8' : '#555555' }}>
                <th style={{ padding: '6px 2px', borderRight: isDark ? '1px solid #334155' : '1px solid #e2e8f0', fontWeight: '500' }}>원주문#</th>
                <th style={{ padding: '6px 2px', borderRight: isDark ? '1px solid #334155' : '1px solid #e2e8f0', fontWeight: '500' }}>구분</th>
                <th style={{ padding: '6px 2px', fontWeight: '500' }}>{screen6BalanceActiveTab === '미체결' ? '미체결수량' : '체결수량'}</th>
              </tr>
            </thead>
          </table>
        )}

        {/* Table Body Area */}
        <div style={{
          flex: isFigmaExportMode ? 'none' : 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: isDark ? '#0f172a' : '#ffffff',
          color: isDark ? '#cbd5e1' : '#111111',
          overflowY: isFigmaExportMode ? 'visible' : 'auto'
        }}>
          {!isAsIs && screen6BalanceActiveTab === '잔고' ? (
            /* TO-BE Mode: Grid List with Sample Data */
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '9.5px',
              textAlign: 'center',
              backgroundColor: isDark ? '#0f172a' : '#ffffff',
              color: isDark ? '#cbd5e1' : '#111111'
            }}>
              <tbody>
                {/* 1. 삼척블루파워10 (장내채권) */}
                <tr style={{ borderBottom: isDark ? '1px solid #1e293b' : '1px solid #cbd5e1' }}>
                  <td style={{ width: '22%', padding: '6px 2px', borderRight: isDark ? '1px solid #1e293b' : '1px solid #cbd5e1', textAlign: 'left', paddingLeft: '4px' }}>
                    <div style={{ fontWeight: '700', color: isDark ? '#ffffff' : '#111111' }}>삼척블루파워10</div>
                    <div style={{ fontSize: '8px', color: '#888888', marginTop: '4px' }}>KR6002361A97 (장내)</div>
                  </td>
                  <td style={{ width: '20%', padding: '6px 2px', borderRight: isDark ? '1px solid #1e293b' : '1px solid #cbd5e1', textAlign: 'right', paddingRight: '4px' }}>
                    <div style={{ fontWeight: '700' }}>10,000</div>
                    <div style={{ color: '#555555', marginTop: '2px' }}>10,000</div>
                    <div style={{ color: '#888888', marginTop: '2px', fontSize: '8px' }}>2026.07.10</div>
                  </td>
                  <td style={{ width: '20%', padding: '6px 2px', borderRight: isDark ? '1px solid #1e293b' : '1px solid #cbd5e1', textAlign: 'right', paddingRight: '4px' }}>
                    <div style={{ fontWeight: '700' }}>10,065.0원</div>
                    <div style={{ color: '#555555', marginTop: '2px' }}>10,065,000원</div>
                    <div style={{ color: '#888888', marginTop: '2px', fontSize: '8px' }}>2029.09.15</div>
                  </td>
                  <td style={{ width: '18%', padding: '6px 2px', borderRight: isDark ? '1px solid #1e293b' : '1px solid #cbd5e1', textAlign: 'center', color: '#de201e', fontWeight: '700', verticalAlign: 'middle' }}>
                    +0.19%
                  </td>
                  <td style={{ width: '20%', padding: '6px 2px', textAlign: 'center', verticalAlign: 'middle' }}>
                    <div style={{ fontWeight: '700' }}>종합과세</div>
                    <div style={{ fontSize: '9px', fontWeight: '700', marginTop: '4px' }}>퇴직납입금</div>
                  </td>
                </tr>

                {/* 2. 대우건설95-1 (장외채권) */}
                <tr style={{ borderBottom: isDark ? '1px solid #1e293b' : '1px solid #cbd5e1' }}>
                  <td style={{ width: '22%', padding: '6px 2px', borderRight: isDark ? '1px solid #1e293b' : '1px solid #cbd5e1', textAlign: 'left', paddingLeft: '4px' }}>
                    <div style={{ fontWeight: '700', color: isDark ? '#ffffff' : '#111111' }}>대우건설95-1</div>
                    <div style={{ fontSize: '8px', color: '#888888', marginTop: '4px' }}>KR6000242D61 (장외)</div>
                  </td>
                  <td style={{ width: '20%', padding: '6px 2px', borderRight: isDark ? '1px solid #1e293b' : '1px solid #cbd5e1', textAlign: 'right', paddingRight: '4px' }}>
                    <div style={{ fontWeight: '700' }}>5,000</div>
                    <div style={{ color: '#555555', marginTop: '2px' }}>5,000</div>
                    <div style={{ color: '#888888', marginTop: '2px', fontSize: '8px' }}>2026.07.12</div>
                  </td>
                  <td style={{ width: '20%', padding: '6px 2px', borderRight: isDark ? '1px solid #1e293b' : '1px solid #cbd5e1', textAlign: 'right', paddingRight: '4px' }}>
                    <div style={{ fontWeight: '700' }}>10,120.0원</div>
                    <div style={{ color: '#555555', marginTop: '2px' }}>5,060,000원</div>
                    <div style={{ color: '#888888', marginTop: '2px', fontSize: '8px' }}>2028.05.20</div>
                  </td>
                  <td style={{ width: '18%', padding: '6px 2px', borderRight: isDark ? '1px solid #1e293b' : '1px solid #cbd5e1', textAlign: 'center', color: '#de201e', fontWeight: '700', verticalAlign: 'middle' }}>
                    +1.25%
                  </td>
                  <td style={{ width: '20%', padding: '6px 2px', textAlign: 'center', verticalAlign: 'middle' }}>
                    <div style={{ fontWeight: '700' }}>일반과세</div>
                    <div style={{ fontSize: '9px', fontWeight: '700', marginTop: '4px' }}>고객납입금</div>
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            /* AS-IS or other tabs: Empty state */
            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isDark ? '#94a3b8' : '#888888',
              fontSize: '13px'
            }}>
              {screen6BalanceActiveTab === '잔고' ? '잔고 내역이 없습니다.' : screen6BalanceActiveTab === '미체결' ? '미체결내역이 없습니다.' : '체결내역이 없습니다.'}
            </div>
          )}
        </div>

        {/* Bottom Banner */}
        <div style={{
          padding: '8px 12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: isDark ? '1px solid #1e293b' : '1px solid #f1f5f9',
          backgroundColor: isDark ? '#0f172a' : '#ffffff',
          fontSize: '11px'
        }}>
          <span style={{ color: '#2563eb', fontWeight: '600', cursor: 'pointer' }}>프라임 투자상담 &gt;</span>
          <span style={{ color: '#888888', cursor: 'pointer' }}>다시보기 않기</span>
        </div>

        {/* Ticker (Nasdaq) */}
        <div style={{
          height: '24px',
          backgroundColor: isDark ? '#1e293b' : '#f8fafc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 12px',
          borderTop: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
          fontSize: '0.72rem'
        }}>
          <span style={{ fontWeight: '800', color: isDark ? '#cbd5e1' : '#333333' }}>나스닥 종합</span>
          <span style={{ color: '#de201e', fontWeight: '800' }}>26,206.89 ▲ 336.24 (1.30%)</span>
        </div>

        {/* Bottom Bar Navigation */}
        <div style={{
          height: '44px',
          display: 'flex',
          alignItems: 'stretch',
          borderTop: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0',
          backgroundColor: isDark ? '#121826' : '#ffffff'
        }}>
          {/* Home button */}
          <button 
            onClick={() => setSubScreen('menu')}
            style={{ width: '48px', border: 'none', background: 'none', borderRight: isDark ? '1px solid #1e293b' : '1px solid #f1f5f9', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ color: isDark ? '#cbd5e1' : '#333' }}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
          </button>

          {/* Middle text tabs */}
          <div 
            className={showFiveTabs ? "no-scrollbar" : ""} 
            style={{ 
              flex: 1, 
              display: 'flex', 
              alignItems: 'stretch', 
              overflowX: showFiveTabs ? 'auto' : 'visible' 
            }}
          >
            {([
              { key: '장내(외)채권 잔고', label: `장내(외)채권\n잔고` },
              { key: '보유상품 현황', label: `보유상품\n현황` },
              { key: '장외채권 매매', label: `장외채권\n매매` },
              { key: 'ETF/리츠 주문', label: `ETF/리츠\n주문` },
              { key: 'ETF/리츠 현재가', label: `ETF/리츠\n현재가` }
            ]).map((tab, idx) => {
              const isSelected = false;
              const borderRightCount = 4;
              return (
                <button
                  key={tab.key}
                  onClick={() => {
                    if (tab.key === '장내(외)채권 잔고') {
                      setSubScreen('bondBalance');
                    } else if (tab.key === 'ETF/리츠 주문') {
                      setSubScreen('bondOrder');
                    } else if (tab.key === 'ETF/리츠 현재가') {
                      setSubScreen('bondCurrentPrice');
                    } else if (tab.key === '장외채권 매매') {
                      setSubScreen('bondCalc');
                    }
                  }}
                  style={{
                    flex: 'none',
                    width: '76px',
                    flexShrink: 0,
                    border: 'none',
                    background: 'none',
                    borderRight: idx < borderRightCount ? (isDark ? '1px solid #1e293b' : '1px solid #f1f5f9') : 'none',
                    cursor: (tab.key === '장내(외)채권 잔고' || tab.key === 'ETF/리츠 주문' || tab.key === 'ETF/리츠 현재가' || tab.key === '장외채권 매매') ? 'pointer' : 'default',
                    fontSize: showFiveTabs ? '0.7rem' : '0.73rem',
                    fontWeight: '500',
                    color: isDark ? '#cbd5e1' : '#333333',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    whiteSpace: 'pre-line',
                    lineHeight: '1.2',
                    padding: '2px 1px'
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Back/Exit button */}
          <button 
            onClick={() => setSubScreen('menu')}
            style={{ width: '48px', border: 'none', background: 'none', borderLeft: isDark ? '1px solid #1e293b' : '1px solid #f1f5f9', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ color: isDark ? '#cbd5e1' : '#333' }}><path d="M9 14L4 9l5-5" /><path d="M4 9h10a5 5 0 0 1 5 5v5" /></svg>
          </button>
        </div>
      </>
    );
  };

  const renderScreen6AsIs = (isSwitchOff = false) => {
    const outerSubScreen = screen6AsIsSubScreen;
    const outerSetSubScreen = setScreen6AsIsSubScreen;
    const outerOrderTab = screen6AsIsOrderTab;
    const outerSetOrderTab = setScreen6AsIsOrderTab;
    const outerUpdateModalOpen = screen6AsIsUpdateModalOpen;
    const outerSetUpdateModalOpen = setScreen6AsIsUpdateModalOpen;

    return (() => {
      const screen6AsIsSubScreen = isSwitchOff ? screen6ToBeSubScreen : outerSubScreen;
      const setScreen6AsIsSubScreen = isSwitchOff ? setScreen6ToBeSubScreen : outerSetSubScreen;
      const screen6AsIsOrderTab = isSwitchOff ? screen6ToBeOrderTab : outerOrderTab;
      const setScreen6AsIsOrderTab = isSwitchOff ? setScreen6ToBeOrderTab : outerSetOrderTab;
      const screen6AsIsUpdateModalOpen = isSwitchOff ? false : outerUpdateModalOpen;
      const setScreen6AsIsUpdateModalOpen = isSwitchOff ? (() => {}) : outerSetUpdateModalOpen;

      return (
        <>
        {screen6AsIsSubScreen === 'splash' ? (
          <div 
            onClick={() => setScreen6AsIsUpdateModalOpen(true)}
            style={{
              flex: 1,
              backgroundColor: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0px',
              boxSizing: 'border-box',
              cursor: 'pointer',
              height: '100%',
              position: 'relative'
            }}
          >
            {/* Status Bar */}
            <div style={{
              ...styles.phoneHeaderBar,
              backgroundColor: '#ffffff',
              color: '#333333',
              borderBottom: 'none',
              width: '100%',
              padding: '0 16px',
              boxSizing: 'border-box'
            }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '700' }}>SKT 9:44</span>
              <span style={{ fontSize: '0.65rem', fontWeight: '800' }}>12:30</span>
            </div>

            {/* Logo area */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              marginTop: '-50px'
            }}>
              {/* Logo Image with SVG fallback */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img 
                  src={logoImg} 
                  style={{ width: '100px', height: 'auto', objectFit: 'contain' }}
                  alt="CI Logo"
                />
              </div>
            </div>

            {/* Bottom info section */}
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: '30px' }}>
              {/* Security Toast message */}
              <div style={{
                backgroundColor: '#333333',
                color: '#ffffff',
                padding: '12px 16px',
                fontSize: '11px',
                textAlign: 'center',
                width: '82%',
                borderRadius: '0px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                lineHeight: '1.5',
                wordBreak: 'keep-all',
                fontWeight: '500',
                marginBottom: '12px'
              }}>
                고객님의 안전한 금융거래를 위해<br />
                보안프로그램을 실행중입니다(V3)
              </div>
              
              <div style={{
                color: '#666666',
                fontSize: '12px',
                fontWeight: '500',
                textAlign: 'center'
              }}>
                고객인증을 시작합니다.
              </div>
            </div>

            {/* Android Navigation Bar */}
            <div style={{
              width: '100%',
              height: '42px',
              backgroundColor: '#f1f5f9',
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              borderTop: '1px solid #e2e8f0'
            }}>
              <div style={{ width: '16px', height: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '2px' }}>
                <div style={{ width: '2px', height: '12px', backgroundColor: '#94a3b8' }} />
                <div style={{ width: '2px', height: '12px', backgroundColor: '#94a3b8' }} />
                <div style={{ width: '2px', height: '12px', backgroundColor: '#94a3b8' }} />
              </div>
              <div style={{ width: '14px', height: '14px', borderRadius: '4px', border: '2px solid #94a3b8' }} />
              <div style={{ width: '0', height: '0', borderTop: '6px solid transparent', borderBottom: '6px solid transparent', borderRight: '8px solid #94a3b8' }} />
            </div>

            {/* Update Modal Overlay */}
            {screen6AsIsUpdateModalOpen && (
              <div 
                onClick={(e) => e.stopPropagation()}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 1000
                }}
              >
                <div style={{
                  width: '260px',
                  backgroundColor: '#ffffff',
                  borderRadius: '2px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    padding: '36px 20px',
                    fontSize: '0.86rem',
                    color: '#333333',
                    textAlign: 'center',
                    lineHeight: '1.5',
                    fontWeight: '600',
                    wordBreak: 'keep-all'
                  }}>
                    신규 버전 업데이트가 필요합니다.
                  </div>
                  <button 
                    onClick={() => {
                      setScreen6AsIsUpdateModalOpen(false);
                      setScreen6AsIsSubScreen('menu');
                    }}
                    style={{
                      height: '42px',
                      backgroundColor: '#222222',
                      color: '#ffffff',
                      border: 'none',
                      fontSize: '0.88rem',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    최신 버전 업데이트
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : screen6AsIsSubScreen === 'menu' ? (
                    <>
                      {/* Status Bar */}
                      <div style={{
                        ...styles.phoneHeaderBar,
                        backgroundColor: '#4750b3',
                        color: '#ffffff',
                        borderBottom: 'none'
                      }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: '700' }}>SKT 2:45</span>
                        <span style={{ fontSize: '0.65rem', fontWeight: '800' }}>12:30</span>
                      </div>

                      {/* Top user bar (French Blue Theme) */}
                      <div style={{
                        backgroundColor: '#4750b3',
                        padding: '16px 15px 12px 15px',
                        color: '#ffffff',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '1.2rem', fontWeight: '500' }}>김대신님</span>
                            <span style={{ 
                              display: 'inline-flex', 
                              alignItems: 'center', 
                              fontSize: '0.82rem', 
                              opacity: 0.9, 
                              cursor: 'pointer', 
                              gap: '2px', 
                              color: '#ffffff',
                              border: 'none',
                              padding: 0,
                              background: 'none'
                            }}>
                              내 정보
                              <svg width="6" height="10" viewBox="0 0 10 18" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: '2px' }}><polyline points="3 3 8 9 3 15" /></svg>
                            </span>
                          </div>
                          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                            {/* Home White Icon */}
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: 'pointer' }}>
                              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                              <polyline points="9 22 9 12 15 12 15 22" />
                            </svg>
                            {/* Bell Icon with Red Dot */}
                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                              </svg>
                              <span style={{ position: 'absolute', top: '2px', right: '2px', backgroundColor: '#de201e', width: '5px', height: '5px', borderRadius: '50%' }}></span>
                            </div>
                            {/* Settings Icon */}
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: 'pointer' }}>
                              <circle cx="12" cy="12" r="3" />
                              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                            </svg>
                            {/* Close Icon */}
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: 'pointer' }}>
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                          </div>
                        </div>

                        {/* Menu Search Bar */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          backgroundColor: '#ffffff',
                          borderRadius: '4px',
                          padding: '8px 12px',
                          gap: '8px'
                        }}>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#888888" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                          <input
                            type="text"
                            placeholder="메뉴를 검색하세요."
                            disabled
                            style={{
                              border: 'none',
                              background: 'none',
                              outline: 'none',
                              width: '100%',
                              fontSize: '0.82rem',
                              fontWeight: '600'
                            }}
                          />
                        </div>
                      </div>

                       {/* Main Category Tabs */}
                      <div style={{
                        display: 'flex',
                        borderBottom: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0',
                        backgroundColor: isDark ? '#121826' : '#ffffff'
                      }}>
                        {['최근', '트레이딩', '상품', '연금', '자산/뱅킹'].map((tab) => {
                          const isSelected = tab === screen6AsIsSelectedTab;
                          return (
                            <div
                              key={tab}
                              onClick={() => setScreen6AsIsSelectedTab(tab)}
                              style={{
                                flex: 1,
                                textAlign: 'center',
                                padding: '13px 0',
                                fontSize: '0.96rem',
                                fontWeight: '500',
                                color: isSelected ? '#4750b3' : (isDark ? '#cbd5e1' : '#888888'),
                                borderBottom: isSelected ? '3px solid #4750b3' : '3px solid transparent',
                                cursor: 'pointer'
                              }}
                            >
                              {tab}
                            </div>
                          );
                        })}
                      </div>

                      {/* Split Content Area */}
                      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                        {screen6AsIsSelectedTab === '연금' ? (
                          <>
                            {/* Left Submenu Navigation */}
                            <div style={{
                              width: '115px',
                              backgroundColor: isDark ? '#0f172a' : '#f1f3f5',
                              borderRight: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'space-between',
                              paddingBottom: '12px',
                              boxSizing: 'border-box'
                            }}>
                              <div style={{ display: 'flex', flexDirection: 'column' }}>
                                {[
                                  { name: 'IRP/퇴직연금' },
                                  { name: '연금저축' },
                                  { name: '공지사항' }
                                ].map((sub, idx) => {
                                  const isSelected = sub.name === asIsSelectedMenuCategory;
                                  return (
                                    <div
                                      key={idx}
                                      onClick={() => setAsIsSelectedMenuCategory(sub.name)}
                                      style={{
                                        padding: '18px 12px',
                                        fontSize: '0.96rem',
                                        fontWeight: '500',
                                        color: isSelected ? (isDark ? '#ffffff' : '#3b5bdb') : (isDark ? '#94a3b8' : '#777777'),
                                        backgroundColor: isSelected ? (isDark ? '#121826' : '#ffffff') : 'transparent',
                                        cursor: 'pointer'
                                      }}
                                    >
                                      {sub.name}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Right Main Menu Items */}
                            <div style={{
                              flex: 1,
                              padding: '18px 16px',
                              overflowY: 'auto',
                              backgroundColor: isDark ? '#121826' : '#ffffff',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '20px',
                              boxSizing: 'border-box'
                            }}>
                              {asIsSelectedMenuCategory === 'IRP/퇴직연금' ? (
                                <div>
                                  <div style={{ fontSize: '0.98rem', fontWeight: '800', color: '#3b5bdb', marginBottom: '12px' }}>MY 퇴직연금</div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                      <div style={{ fontSize: '1.02rem', color: isDark ? '#cbd5e1' : '#222222', fontWeight: '500', cursor: 'pointer' }} onClick={() => setScreen6AsIsSubScreen('investmentRatio')}>전체자산 현황</div>
                                      <div style={{ fontSize: '1.02rem', color: isDark ? '#cbd5e1' : '#222222', fontWeight: '500', cursor: 'pointer' }} onClick={() => setScreen6AsIsSubScreen('investmentRatio')}>보유상품 현황</div>
                                      <div style={{ fontSize: '1.02rem', color: isDark ? '#cbd5e1' : '#222222', fontWeight: '500', cursor: 'pointer' }} onClick={() => setScreen6AsIsSubScreen('investmentRatio')}>투자비율 현황</div>
                                      <div style={{ fontSize: '1.02rem', color: isDark ? '#cbd5e1' : '#222222', fontWeight: '500' }}>디폴트옵션 현황</div>
                                      <div style={{ fontSize: '1.02rem', color: isDark ? '#cbd5e1' : '#222222', fontWeight: '500' }}>만기예정</div>
                                      <div style={{ fontSize: '1.02rem', color: isDark ? '#cbd5e1' : '#222222', fontWeight: '500' }}>통합 거래내역</div>
                                      <div style={{ fontSize: '1.02rem', color: isDark ? '#cbd5e1' : '#222222', fontWeight: '500' }}>연간납입한도 설정</div>
                                      <div style={{ fontSize: '1.02rem', color: isDark ? '#cbd5e1' : '#222222', fontWeight: '500' }}>가입확인서 발급</div>
                                      <div style={{ fontSize: '1.02rem', color: isDark ? '#cbd5e1' : '#222222', fontWeight: '500' }}>실물이전 사전조회</div>
                                  </div>
                                </div>
                              ) : asIsSelectedMenuCategory === '연금저축' ? (
                                <div>
                                  <div style={{ fontSize: '0.98rem', fontWeight: '800', color: '#3b5bdb', marginBottom: '12px' }}>연금저축</div>
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', opacity: 0.6 }}>
                                    <div style={{ fontSize: '1.02rem', color: isDark ? '#cbd5e1' : '#222222', fontWeight: '500' }}>연금저축 가입</div>
                                    <div style={{ fontSize: '1.02rem', color: isDark ? '#cbd5e1' : '#222222', fontWeight: '500' }}>타사 연금저축 가져오기</div>
                                    <div style={{ fontSize: '1.02rem', color: isDark ? '#cbd5e1' : '#222222', fontWeight: '500' }}>연금저축 보유잔고</div>
                                  </div>
                                </div>
                              ) : (
                                <div style={{ fontSize: '0.92rem', color: '#999', textAlign: 'center', marginTop: '40px' }}>
                                  공지사항이 없습니다.
                                </div>
                              )}
                            </div>
                          </>
                        ) : (
                          <>
                            {/* Left Submenu Navigation */}
                            <div style={{
                              width: '115px',
                              backgroundColor: isDark ? '#0f172a' : '#f1f3f5',
                              borderRight: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'space-between',
                              paddingBottom: '12px',
                              boxSizing: 'border-box'
                            }}>
                              <div style={{ display: 'flex', flexDirection: 'column' }}>
                                {[
                                  { name: '펀드', active: false },
                                  { name: '채권', active: true },
                                  { name: 'CMA/RP/자동투자', active: false },
                                  { name: 'ISA', active: false },
                                  { name: 'ELS/DLS', active: false },
                                  { name: '랩/신탁/조각투자', active: false },
                                  { name: '리츠', active: false },
                                  { name: '로보', active: false },
                                  { name: '금현물', active: false }
                                ].map((sub, idx) => (
                                  <div
                                    key={idx}
                                    style={{
                                      padding: '14px 10px',
                                      fontSize: '0.85rem',
                                      fontWeight: sub.active ? '800' : '500',
                                      color: sub.active ? (isDark ? '#ffffff' : '#4750b3') : (isDark ? '#94a3b8' : '#777777'),
                                      backgroundColor: sub.active ? (isDark ? '#121826' : '#ffffff') : 'transparent',
                                      cursor: 'pointer',
                                      whiteSpace: sub.name.includes('랩/신탁') ? 'nowrap' : 'normal',
                                      wordBreak: 'keep-all'
                                    }}
                                  >
                                    {sub.name === 'CMA/RP/자동투자' ? (
                                      <>CMA/RP/<br />자동투자</>
                                    ) : sub.name}
                                  </div>
                                ))}
                              </div>

                              {/* RIA 가입 Banner */}
                              <div style={{
                                margin: '0 8px',
                                borderRadius: '6px',
                                background: 'linear-gradient(135deg, #a7f3d0 0%, #34d399 100%)',
                                padding: '10px 8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                                cursor: 'pointer'
                              }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                  <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#065f46' }}>RIA</span>
                                  <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#065f46' }}>가입</span>
                                </div>
                                <span style={{ fontSize: '1.5rem' }}>🇰🇷</span>
                              </div>
                            </div>

                            {/* Right Main Menu Items */}
                            <div style={{
                              flex: 1,
                              padding: '18px 16px',
                              overflowY: 'auto',
                              backgroundColor: isDark ? '#121826' : '#ffffff',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '24px',
                              boxSizing: 'border-box'
                            }}>
                              {/* 장외채권 */}
                              <div>
                                <div style={{ fontSize: '0.98rem', fontWeight: '800', color: '#4750b3', marginBottom: '16px' }}>장외채권</div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
                                  {[
                                    { name: '장외채권 매매', onClick: () => setScreen6AsIsSubScreen('bondCalc') },
                                    { name: '장외채권 잔고', onClick: () => setScreen6AsIsSubScreen('bondBalance') }
                                  ].map((item, idx) => (
                                    <div key={idx} onClick={item.onClick} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                      <span style={{ fontSize: '1.02rem', color: isDark ? '#cbd5e1' : '#222222', fontWeight: '500' }}>{item.name}</span>
                                    </div>
                                  ))}
                                </div>
                                <div style={{ height: '1px', backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : '#f1f3f5', margin: '16px 0 12px 0' }} />
                              </div>

                              {/* 단기사채 */}
                              <div>
                                <div style={{ fontSize: '0.98rem', fontWeight: '800', color: '#4750b3', marginBottom: '16px' }}>단기사채</div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
                                  {[
                                    { name: '단기사채 매매' },
                                    { name: '단기사채 잔고' }
                                  ].map((item, idx) => (
                                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                      <span style={{ fontSize: '1.02rem', color: isDark ? '#cbd5e1' : '#222222', fontWeight: '500' }}>{item.name}</span>
                                    </div>
                                  ))}
                                </div>
                                <div style={{ height: '1px', backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : '#f1f3f5', margin: '16px 0' }} />
                              </div>

                              {/* 해외채권 */}
                              <div>
                                <div style={{ fontSize: '0.98rem', fontWeight: '800', color: '#4750b3', marginBottom: '16px' }}>해외채권</div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
                                  {[
                                    { name: '해외채권 매매' },
                                    { name: '해외채권 잔고' }
                                  ].map((item, idx) => (
                                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                      <span style={{ fontSize: '1.02rem', color: isDark ? '#cbd5e1' : '#222222', fontWeight: '500' }}>{item.name}</span>
                                    </div>
                                  ))}
                                </div>
                                <div style={{ height: '1px', backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : '#f1f3f5', margin: '16px 0' }} />
                              </div>

                              {/* 장내채권 */}
                              <div>
                                <div style={{ fontSize: '0.98rem', fontWeight: '800', color: '#4750b3', marginBottom: '16px' }}>장내채권</div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
                                  {[
                                    { name: '장내채권 현재가', onClick: () => setScreen6AsIsSubScreen('bondCurrentPrice') },
                                    { name: '장내채권 주문', onClick: () => { setScreen6AsIsSubScreen('bondOrder'); setScreen6AsIsOrderTab('매수'); } },
                                    { name: '장내채권 미체결/체결', action: () => { setScreen6ToBeSubScreen('bondBalance'); setScreen6BalanceActiveTab('미체결'); } },
                                    { name: '장내채권 잔고', onClick: () => setScreen6AsIsSubScreen('bondBalance') }
                                  ].map((item, idx) => (
                                    <div key={idx} onClick={item.onClick} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                      <span style={{ fontSize: '1.02rem', color: isDark ? '#cbd5e1' : '#222222', fontWeight: '500' }}>{item.name}</span>
                                    </div>
                                  ))}
                                </div>
                                <div style={{ height: '1px', backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : '#f1f3f5', margin: '16px 0' }} />
                              </div>

                              {/* 공지 */}
                              <div>
                                <div style={{ fontSize: '0.98rem', fontWeight: '800', color: '#4750b3', marginBottom: '16px' }}>공지</div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                    <span style={{ fontSize: '1.02rem', color: isDark ? '#cbd5e1' : '#222222', fontWeight: '500' }}>채권 가이드</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Footer Bar */}
                      <div style={{
                        height: '48px',
                        backgroundColor: '#000000',
                        color: '#ffffff',
                        display: 'flex',
                        fontSize: '0.78rem',
                        fontWeight: '800',
                        borderTop: '1px solid rgba(255, 255, 255, 0.15)'
                      }}>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer', borderRight: '1px solid rgba(255, 255, 255, 0.15)' }}>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
                            <line x1="12" y1="2" x2="12" y2="12" />
                          </svg>
                          <span>고객지원</span>
                        </div>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer', borderRight: '1px solid rgba(255, 255, 255, 0.15)' }}>
                          <span>이벤트</span>
                        </div>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer', borderRight: '1px solid rgba(255, 255, 255, 0.15)' }}>
                          <span>업무/거래신청</span>
                        </div>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}>
                          <span>인증/OTP</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      backgroundColor: '#ffffff',
                      color: '#333333'
                    }}>
                      {/* Galaxy S20 Central Punch-hole Camera */}
                      <div style={styles.phoneCamera} />

                      {/* Phone Status Bar */}
                      <div style={styles.phoneHeaderBar}>
                        <span style={{ fontSize: '0.75rem', fontWeight: '700', color: isDark ? '#94a3b8' : '#475569' }}>SKT 10:39</span>
                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.65rem', fontWeight: '800', color: isDark ? '#94a3b8' : '#333' }}>5G</span>
                          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1px', height: '10px' }}>
                            <div style={{ width: '2px', height: '3px', backgroundColor: isDark ? '#94a3b8' : '#333' }}></div>
                            <div style={{ width: '2px', height: '5px', backgroundColor: isDark ? '#94a3b8' : '#333' }}></div>
                            <div style={{ width: '2px', height: '7px', backgroundColor: isDark ? '#94a3b8' : '#333' }}></div>
                            <div style={{ width: '2px', height: '9px', backgroundColor: isDark ? '#94a3b8' : '#333' }}></div>
                          </div>
                          <div style={{
                            border: isDark ? '1px solid #94a3b8' : '1px solid #333',
                            borderRadius: '3px',
                            padding: '0px 3px',
                            fontSize: '0.62rem',
                            fontWeight: '900',
                            height: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: isDark ? '#94a3b8' : '#333',
                            color: isDark ? '#0b0f19' : '#fff',
                            lineHeight: 1
                          }}>
                            86
                          </div>
                        </div>
                      </div>

                      {screen6AsIsSubScreen === 'bondOrder' ? (
                        <>
                          {/* Order Screen Header */}
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            height: '46px',
                            padding: '0 12px',
                            borderBottom: '1px solid #e2e8f0',
                            backgroundColor: '#ffffff'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span 
                                onClick={() => setScreen6AsIsSubScreen('bondCurrentPrice')}
                                style={{ fontSize: '1.2rem', cursor: 'pointer' }}
                              >
                                ☰
                              </span>
                              <span style={{ fontWeight: '800', fontSize: '0.98rem', letterSpacing: '-0.3px' }}>삼척블루파워10</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                              <button onClick={() => { if (isSwitchOff) setScreen6ToBeSearchOpen(true); else setScreen6AsIsSearchOpen(true); }} style={{ border: 'none', background: 'none', color: '#111', padding: 0, display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                              </button>
                              <button style={{ border: 'none', background: 'none', color: '#111', padding: 0, display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
                              </button>
                            </div>
                          </div>

                          {/* Price & Account Bar */}
                          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', backgroundColor: '#fff', alignItems: 'flex-start' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <div style={{ width: '6px', height: '18px', backgroundColor: '#de201e' }}></div>
                                <span style={{ fontSize: '20px', fontWeight: '500', color: '#de201e', lineHeight: 1 }}>10,084.4</span>
                              </div>
                              <span style={{ fontSize: '11px', color: '#de201e', marginTop: '2px', fontWeight: '500' }}>
                                ▲ 19.4 (0.19%)
                              </span>
                            </div>
                            <div onClick={() => { if (isSwitchOff) setScreen6ToBeBsheetState('account'); else setScreen6AsIsBsheetState('product'); }} style={{ border: '1px solid #cbd5e1', borderRadius: '4px', padding: '4px 8px', fontSize: '11px', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', minWidth: '130px', cursor: 'pointer' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: '700' }}>
                                <span>{isSwitchOff ? screen6ActiveAccount : '200-233354(01)'}</span>
                                <span style={{ fontSize: '8px', color: '#666', marginLeft: '4px' }}>▼</span>
                              </div>
                              <div style={{ color: '#333', fontSize: '11px', marginTop: '1px' }}>김대신</div>
                            </div>
                          </div>

                          {/* Order Tabs */}
                          <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', backgroundColor: '#ffffff' }}>
                            {['매수', '매도', '정정/취소'].map((tab) => {
                              const isTabActive = tab === screen6AsIsOrderTab;
                              let activeColor = '#de201e';
                              if (tab === '매도') activeColor = '#2563eb';
                              else if (tab === '정정/취소') activeColor = '#00b050';

                              return (
                                <div 
                                  key={tab} 
                                  onClick={() => setScreen6AsIsOrderTab(tab)}
                                  style={{
                                    flex: 1,
                                    textAlign: 'center',
                                    padding: '12px 0',
                                    fontSize: '13px',
                                    fontWeight: '700',
                                    color: isTabActive ? activeColor : '#888888',
                                    borderBottom: isTabActive ? `2.5px solid ${activeColor}` : 'none',
                                    cursor: 'pointer'
                                  }}
                                >
                                  {tab}
                                </div>
                              );
                            })}
                          </div>

                          {/* Order Contents Panel */}
                          <div style={{ flex: 1, display: 'flex', overflowY: 'auto' }}>
                            {/* Left: Bid/Ask price list */}
                            <div style={{ width: '130px', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', fontSize: '11px' }}>
                              {[
                                { price: '10,099.7', diff: '+0.34%', vol: '14,000', type: 'ask' },
                                { price: '10,095.0', diff: '+0.30%', vol: '20,000', type: 'ask' },
                                { price: '10,094.9', diff: '+0.30%', vol: '10,000', type: 'ask' },
                                { price: '10,094.8', diff: '+0.30%', vol: '19,780', type: 'ask' },
                                { price: '10,084.4', diff: '+0.19%', vol: '64,710', type: 'active' },
                                { price: '10,066.0', diff: '+0.01%', vol: '1,200', type: 'bid' },
                                { price: '10,065.8', diff: '+0.01%', vol: '30,000', type: 'bid' },
                                { price: '10,065.7', diff: '+0.01%', vol: '100,000', type: 'bid' },
                                { price: '10,065.1', diff: '+0.00%', vol: '25,000', type: 'bid' },
                                { price: '10,065.0', diff: '0.00%', vol: '37,800', type: 'bid_zero' }
                              ].map((row, idx) => {
                                let bg = '#ffffff';
                                let color = '#de201e';
                                if (row.type === 'ask') bg = '#f0f6ff';
                                else if (row.type === 'bid') bg = '#fff5f5';
                                else if (row.type === 'active') bg = '#e0f2fe';
                                else if (row.type === 'bid_zero') { bg = '#fff5f5'; color = '#111111'; }
                                return (
                                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 8px', borderBottom: '1px solid #f1f5f9', backgroundColor: bg, alignItems: 'center' }}>
                                    <span style={{ fontWeight: '700', color: color }}>{row.price}</span>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', fontSize: '9px', color: color }}>
                                      <span>{row.diff}</span>
                                      <span style={{ color: '#4b5563' }}>{row.vol}</span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>

                            {/* Right: Form inputs */}
                            <div style={{ flex: 1, padding: '12px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                              {isSwitchOff && (
                                screen6ActiveAccount === '200-233354(43)' ? (
                                  <div style={{
                                    display: 'flex',
                                    border: '1px solid #cbd5e1',
                                    height: '32px',
                                    boxSizing: 'border-box',
                                    overflow: 'hidden',
                                    marginBottom: '4px'
                                  }}>
                                    {['사용자', '가입자1', '가입자2'].map((tab, idx) => {
                                      const isSelected = screen6AsIsPaymentType === tab || (screen6AsIsPaymentType === '고객' && idx === 0);
                                      return (
                                        <div
                                          key={tab}
                                          onClick={() => setScreen6AsIsPaymentType(tab)}
                                          style={{
                                            flex: 1,
                                            backgroundColor: isSelected ? '#525b62' : '#ffffff',
                                            color: isSelected ? '#ffffff' : '#777777',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '11px',
                                            fontWeight: '700',
                                            cursor: 'pointer',
                                            borderLeft: idx > 0 ? '1px solid #cbd5e1' : 'none'
                                          }}
                                        >
                                          {tab}
                                        </div>
                                      );
                                    })}
                                  </div>
                                ) : (
                                  <div style={{
                                    display: 'flex',
                                    border: '1px solid #cbd5e1',
                                    height: '32px',
                                    boxSizing: 'border-box',
                                    overflow: 'hidden',
                                    marginBottom: '4px'
                                  }}>
                                    <div 
                                      onClick={() => setScreen6AsIsPaymentType('고객')}
                                      style={{
                                        flex: 1,
                                        backgroundColor: screen6AsIsPaymentType === '고객' ? '#525b62' : '#ffffff',
                                        color: screen6AsIsPaymentType === '고객' ? '#ffffff' : '#777777',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '11px',
                                        fontWeight: '700',
                                        cursor: 'pointer'
                                      }}
                                    >
                                      고객납입금
                                    </div>
                                    <div 
                                      onClick={() => setScreen6AsIsPaymentType('퇴직')}
                                      style={{
                                        flex: 1,
                                        backgroundColor: screen6AsIsPaymentType === '퇴직' ? '#525b62' : '#ffffff',
                                        color: screen6AsIsPaymentType === '퇴직' ? '#ffffff' : '#777777',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '11px',
                                        fontWeight: '700',
                                        cursor: 'pointer',
                                        borderLeft: '1px solid #cbd5e1'
                                      }}
                                    >
                                      퇴직납입금
                                    </div>
                                  </div>
                                )
                              )}
                              {screen6AsIsOrderTab === '정정/취소' ? (
                                <>
                                  <div onClick={() => {
                                    if (isSwitchOff) setScreen6ToBeUnexecutedOpen(true);
                                    else setScreen6AsIsUnexecutedOpen(true);
                                  }} style={{
                                    border: '1px solid #cbd5e1',
                                    borderRadius: '2px',
                                    padding: '4px 8px',
                                    fontSize: '11px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    backgroundColor: '#ffffff',
                                    cursor: 'pointer',
                                    height: '28px',
                                    boxSizing: 'border-box'
                                  }}>
                                    <span style={{ color: '#333' }}>미체결내역</span>
                                    <span style={{ fontSize: '8px', color: '#888' }}>▼</span>
                                  </div>
                                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: '12px', color: '#333' }}>단가</span>
                                    <div style={{ borderBottom: '1px solid #cbd5e1', padding: '4px 0', fontSize: '12px', width: '120px', textAlign: 'right', color: '#ccc' }}>단가 입력</div>
                                  </div>
                                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: '12px', color: '#333' }}>수량</span>
                                    <div style={{ borderBottom: '1px solid #cbd5e1', padding: '4px 0', fontSize: '12px', width: '120px', textAlign: 'right', color: '#ccc' }}>수량 입력</div>
                                  </div>
                                </>
                              ) : screen6AsIsOrderTab === '매도' ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                  {/* 주문단위 */}
                                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#f1f5f9', padding: '0 12px', fontSize: '12px', height: '32px', boxSizing: 'border-box' }}>
                                    <span style={{ color: '#333' }}>주문단위</span>
                                    <span style={{ fontWeight: '700' }}>10,000</span>
                                  </div>
                                  {/* 단가 */}
                                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #ccc', height: '32px', boxSizing: 'border-box' }}>
                                    <span style={{ fontSize: '12px', color: '#333' }}>단가</span>
                                    <span style={{ fontSize: '12px', color: '#ccc' }}>단가 입력</span>
                                  </div>
                                  {/* 수량 */}
                                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #ccc', height: '32px', boxSizing: 'border-box' }}>
                                    <span style={{ fontSize: '12px', color: '#333' }}>수량</span>
                                    <span style={{ fontSize: '12px', color: '#ccc' }}>수량 입력 <strong style={{ color: '#333' }}>원</strong></span>
                                  </div>
                                  {/* 날짜 선택 */}
                                  <div style={{
                                    border: '1px solid #cbd5e1', borderRadius: '2px', padding: '0 10px', fontSize: '12px',
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff', cursor: 'pointer',
                                    height: '32px', boxSizing: 'border-box'
                                  }}>
                                    <span>2026.07.10</span>
                                    <span style={{ fontSize: '8px', color: '#888' }}>▼</span>
                                  </div>
                                  {/* 잔고선택 & 보유잔고 */}
                                  <div style={{ display: 'flex', gap: '6px' }}>
                                    <div 
                                      onClick={() => {
                                        if (isSwitchOff) setScreen6ToBeBsheetState('balance_select');
                                        else setScreen6AsIsBsheetState('balance_select');
                                      }}
                                      style={{
                                        flex: 1, border: '1px solid #cbd5e1', borderRadius: '2px', padding: '0 10px', fontSize: '12px',
                                        display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff', cursor: 'pointer',
                                        height: '32px', boxSizing: 'border-box'
                                      }}
                                    >
                                      <span>{isSwitchOff ? screen6ToBeBalanceType : screen6AsIsBalanceType}</span>
                                      <span style={{ fontSize: '8px', color: '#888' }}>▼</span>
                                    </div>
                                    <div 
                                      onClick={() => {
                                        if (isSwitchOff) setScreen6ToBeHoldBalancePopupOpen(true);
                                        else setScreen6AsIsBsheetState('hold_balance');
                                      }}
                                      style={{
                                        flex: 1, border: '1px solid #cbd5e1', borderRadius: '2px', padding: '0 10px', fontSize: '12px',
                                        display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff', cursor: 'pointer',
                                        height: '32px', boxSizing: 'border-box'
                                      }}
                                    >
                                      <span>{isSwitchOff ? screen6ToBeHoldBalanceType : screen6AsIsHoldBalanceType}</span>
                                      <span style={{ fontSize: '8px', color: '#888' }}>▼</span>
                                    </div>
                                  </div>
                                  {/* 과세선택 */}
                                  <div 
                                    onClick={() => {
                                      if (isSwitchOff) setScreen6ToBeBsheetState('tax_select');
                                      else setScreen6AsIsBsheetState('tax_select');
                                    }}
                                    style={{
                                      border: '1px solid #cbd5e1', borderRadius: '2px', padding: '0 10px', fontSize: '12px',
                                      display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff', cursor: 'pointer',
                                      height: '32px', boxSizing: 'border-box'
                                    }}
                                  >
                                    <span>{isSwitchOff ? screen6ToBeTaxType : screen6AsIsTaxType}</span>
                                    <span style={{ fontSize: '8px', color: '#888' }}>▼</span>
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: '12px', color: '#333' }}>주문단위</span>
                                    <div style={{ backgroundColor: '#f1f5f9', padding: '6px 12px', borderRadius: '2px', fontSize: '12px', fontWeight: '700', width: '120px', textAlign: 'right' }}>10,000</div>
                                  </div>
                                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: '12px', color: '#333' }}>단가</span>
                                    <div style={{ borderBottom: '1px solid #94a3b8', padding: '4px 0', fontSize: '12px', fontWeight: '700', width: '120px', textAlign: 'right' }}>10,065.0</div>
                                  </div>
                                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: '12px', color: '#333' }}>수량</span>
                                    <div style={{ borderBottom: '1px solid #94a3b8', padding: '4px 0', fontSize: '12px', width: '120px', textAlign: 'right', color: '#94a3b8' }}>수량 입력 <span style={{ color: '#333', fontWeight: '700' }}>원</span></div>
                                  </div>
                                  {screen6AsIsOrderTab === '매수' && (
                                    <div style={{ 
                                      borderTop: '1px solid #f1f5f9', 
                                      paddingTop: '10px', 
                                      display: 'flex', 
                                      flexDirection: 'column', 
                                      gap: '8px',
                                      marginTop: '10px'
                                    }}>
                                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                                        <span style={{ color: '#666' }}>{isSwitchOff ? '최대가능금액(원)' : '주문가능금액(원)'}</span>
                                        <span style={{ fontWeight: '700' }}>0</span>
                                      </div>
                                      {isSwitchOff && (
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                                          <span style={{ color: '#666' }}>위험한도(원)</span>
                                          <span style={{ fontWeight: '700' }}>0</span>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                          </div>

                          {/* Reset & Order Buttons */}
                          <div style={{ display: 'flex', gap: '8px', padding: '8px 14px', backgroundColor: '#fff', justifyContent: 'flex-end', alignItems: 'center' }}>
                            {screen6AsIsOrderTab !== '정정/취소' && (
                              <button 
                                onClick={() => setScreen6AsIsSubScreen('bondCurrentPrice')}
                                style={{ width: '72px', height: '32px', backgroundColor: '#ffffff', border: '1px solid #d1d5db', color: '#111111', fontSize: '11px', fontWeight: '500', cursor: 'pointer', borderRadius: '0px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                              >
                                초기화
                              </button>
                            )}
                            {screen6AsIsOrderTab === '정정/취소' ? (
                              <div style={{ display: 'flex', gap: '6px', width: '212px' }}>
                                <button onClick={() => {}} style={{ flex: 1, height: '32px', backgroundColor: '#de201e', border: 'none', color: '#ffffff', fontSize: '11px', fontWeight: '700', cursor: 'pointer', borderRadius: '0px' }}>취소</button>
                                <button onClick={() => {}} style={{ flex: 1, height: '32px', backgroundColor: '#00b050', border: 'none', color: '#ffffff', fontSize: '11px', fontWeight: '700', cursor: 'pointer', borderRadius: '0px' }}>정정</button>
                              </div>
                            ) : (
                              <button 
                                onClick={() => {
                                  if (screen6ActiveAccount === '200-233354(43)' && screen6AsIsOrderTab === '매수') {
                                    setScreen6CompanyBondModalOpen(true);
                                  } else {
                                    setScreen6AsIsModalOpen(true);
                                  }
                                }}
                                style={{ width: '132px', height: '32px', backgroundColor: screen6AsIsOrderTab === '매도' ? '#2563eb' : '#de201e', border: 'none', color: '#ffffff', fontSize: '11px', fontWeight: '700', cursor: 'pointer', borderRadius: '0px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                              >
                                {screen6AsIsOrderTab}
                              </button>
                            )}
                          </div>

                          {/* Price / Time Info Ticker */}
                          <div style={{
                            height: '24px',
                            backgroundColor: '#ffffff',
                            display: 'flex',
                            alignItems: 'stretch',
                            borderTop: '1px solid #e2e8f0',
                            fontSize: '0.72rem',
                            fontWeight: '700'
                          }}>
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '12px', color: '#2366ca', borderRight: '1px solid #e2e8f0' }}>275,420</div>
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#111111', borderRight: '1px solid #e2e8f0' }}>10:23</div>
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '12px', color: '#de201e' }}>289,000</div>
                          </div>

                          {/* KOSDAQ footer -> S&P500 footer */}
                          <div style={{ height: '24px', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px', borderTop: '1px solid #e2e8f0', fontSize: '0.72rem' }}>
                            <span style={{ fontWeight: '800' }}>S&P500</span>
                            <span style={{ color: '#de201e', fontWeight: '800' }}>7,537.43 ▲ 54.19 (0.72%)</span>
                          </div>

                          {/* Bottom bar */}
                          <div style={{
                            height: '44px',
                            display: 'flex',
                            alignItems: 'stretch',
                            borderTop: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0',
                            backgroundColor: isDark ? '#121826' : '#fff'
                          }}>
                            {/* Home button */}
                            <button style={{ width: '48px', border: 'none', background: 'none', borderRight: isDark ? '1px solid #1e293b' : '1px solid #f1f5f9', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ color: isDark ? '#cbd5e1' : '#333' }}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                            </button>

                            {/* Middle text tabs */}
                            <div 
                              className={isSwitchOff ? "no-scrollbar" : ""} 
                              style={{ 
                                flex: 1, 
                                display: 'flex', 
                                alignItems: 'stretch', 
                                overflowX: isSwitchOff ? 'auto' : 'visible' 
                              }}
                            >
                              {([
                                 { key: '장내(외)채권 잔고', label: `장내(외)채권\n잔고` },
                                 { key: '보유상품 현황', label: `보유상품\n현황` },
                                 { key: '장외채권 매매', label: `장외채권\n매매` },
                                 { key: 'ETF/리츠 주문', label: `ETF/리츠\n주문` },
                                 { key: 'ETF/리츠 현재가', label: `ETF/리츠\n현재가` }
                               ]).map((tab, idx) => {
                                 const isSelected = false;
                                 const borderRightCount = 4;
                                 return (
                                   <button
                                     key={tab.key}
                                     onClick={() => {
                                       if (tab.key === '장내(외)채권 잔고') {
                                         setScreen6AsIsSubScreen('bondBalance');
                                       } else if (tab.key === 'ETF/리츠 주문') {
                                         setScreen6AsIsSubScreen('bondOrder');
                                       } else if (tab.key === 'ETF/리츠 현재가') {
                                         setScreen6AsIsSubScreen('bondCurrentPrice');
                                       } else if (tab.key === '장외채권 매매') {
                                         setScreen6AsIsSubScreen('bondCalc');
                                       }
                                     }}
                                     style={{
                                       flex: 'none',
                                       width: '76px',
                                       flexShrink: 0,
                                       border: 'none',
                                       background: 'none',
                                       borderRight: idx < borderRightCount ? (isDark ? '1px solid #1e293b' : '1px solid #f1f5f9') : 'none',
                                       cursor: (tab.key === '장내(외)채권 잔고' || tab.key === 'ETF/리츠 주문' || tab.key === 'ETF/리츠 현재가' || tab.key === '장외채권 매매') ? 'pointer' : 'default',
                                      fontSize: isSwitchOff ? '0.66rem' : '0.73rem',
                                      fontWeight: '500',
                                      color: isDark ? '#cbd5e1' : '#333333',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      textAlign: 'center',
                                      whiteSpace: 'pre-line',
                                      lineHeight: '1.2',
                                      padding: '2px 1px'
                                    }}
                                  >
                                    {tab.label}
                                  </button>
                                );
                              })}
                            </div>

                            {/* Back/Exit button */}
                            <button 
                              onClick={() => setScreen6AsIsSubScreen('menu')}
                              style={{ width: '48px', border: 'none', background: 'none', borderLeft: isDark ? '1px solid #1e293b' : '1px solid #f1f5f9', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ color: isDark ? '#cbd5e1' : '#333' }}><path d="M9 14L4 9l5-5" /><path d="M4 9h10a5 5 0 0 1 5 5v5" /></svg>
                            </button>
                          </div>
                        </>
                      ) : screen6AsIsSubScreen === 'investmentRatio' ? (
                        renderScreen6Ratio(isSwitchOff ? 'tobe' : 'asis')
                      ) : screen6AsIsSubScreen === 'bondBalance' ? (
                        renderScreen6Balance('asis', isSwitchOff)
                      ) : screen6AsIsSubScreen === 'cautionAgreement' ? (
                        renderScreen6Caution('asis')
                      ) : screen6AsIsSubScreen === 'bondCalc' ? (
                        renderScreen6Calc('asis')
                      ) : (
                        <>
                          {/* Header */}
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            height: '46px',
                            padding: '0 12px',
                            borderBottom: '1px solid #e2e8f0',
                            backgroundColor: '#ffffff'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span 
                                onClick={() => setScreen6AsIsSubScreen('menu')}
                                style={{ fontSize: '1.2rem', cursor: 'pointer' }}
                              >
                                ☰
                              </span>
                              <span style={{ fontWeight: '800', fontSize: '0.98rem', letterSpacing: '-0.3px' }}>삼척블루파워9</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                              <button onClick={() => { if (isSwitchOff) setScreen6ToBeSearchOpen(true); else setScreen6AsIsSearchOpen(true); }} 
                                style={{ border: 'none', background: 'none', color: '#111', padding: 0, display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                              >
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                              </button>
                              <button style={{ border: 'none', background: 'none', color: '#111', padding: 0, display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
                              </button>
                            </div>
                          </div>

                          {/* Top summary section */}
                          <div style={{
                            padding: '12px 14px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            backgroundColor: '#ffffff'
                          }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
                              
                              {/* Price with Candle Icon on Left */}
                              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                {/* Candle Icon */}
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '10px', height: '26px', position: 'relative' }}>
                                  <div style={{ width: '2px', height: '26px', backgroundColor: '#de201e', position: 'absolute', top: 0, zIndex: 1 }} />
                                  <div style={{ width: '8px', height: '16px', backgroundColor: '#de201e', position: 'relative', zIndex: 2 }} />
                                </div>
                                {/* Price */}
                                <span style={{
                                  fontSize: '34px',
                                  fontWeight: '500',
                                  color: '#de201e',
                                  lineHeight: 1,
                                  letterSpacing: '-0.5px'
                                }}>
                                  10,084.4
                                </span>
                              </div>

                              {/* Change */}
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '3px' }}>
                                <span style={{
                                  fontSize: '8px',
                                  color: '#de201e',
                                  lineHeight: 1
                                }}>▲</span>
                                <span style={{
                                  fontSize: '11px',
                                  fontWeight: '500',
                                  color: '#de201e',
                                  lineHeight: 1
                                }}>
                                  19.4 (+0.19%)
                                </span>
                              </div>
                            </div>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                              <button 
                                onClick={() => setScreen6AsIsSubScreen('bondOrder')}
                                style={{
                                  border: 'none',
                                  color: '#fff',
                                  fontSize: '13px',
                                  fontWeight: '700',
                                  padding: '0',
                                  cursor: 'pointer',
                                  backgroundColor: '#2366ca',
                                  width: '53px',
                                  height: '45px',
                                  borderRadius: '0',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                              >
                                매도
                              </button>
                              <button 
                                onClick={() => setScreen6AsIsSubScreen('bondOrder')}
                                style={{
                                  border: 'none',
                                  color: '#fff',
                                  fontSize: '13px',
                                  fontWeight: '700',
                                  padding: '0',
                                  cursor: 'pointer',
                                  backgroundColor: '#de201e',
                                  width: '53px',
                                  height: '45px',
                                  borderRadius: '0',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                              >
                                매수
                              </button>
                            </div>
                          </div>

                          {/* Tabs */}
                          <div style={{
                            display: 'flex',
                            borderBottom: '1px solid #e2e8f0',
                            backgroundColor: '#ffffff',
                            fontSize: '0.85rem'
                          }}>
                            {['호가', '상세', '시간', '일자', '호가현황'].map((t) => (
                              <div key={t} style={{
                                flex: 1,
                                textAlign: 'center',
                                padding: '10px 0',
                                fontWeight: t === '호가' ? '800' : '500',
                                color: t === '호가' ? '#de201e' : '#666666',
                                borderBottom: t === '호가' ? '2px solid #de201e' : '2px solid transparent',
                                cursor: 'pointer'
                              }}>{t}</div>
                            ))}
                          </div>

                          {/* Bid/Ask Table Area */}
                          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', fontSize: '0.78rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '370px', fontSize: '0.78rem', backgroundColor: '#ffffff' }}>
                              {/* Table Header */}
                              <div style={{
                                display: 'flex',
                                backgroundColor: '#f1f5f9',
                                borderBottom: '1px solid #e2e8f0',
                                height: '28px',
                                alignItems: 'center',
                                fontWeight: 'bold',
                                color: '#333333',
                                textAlign: 'center'
                              }}>
                                <div style={{ flex: 1 }}>수익률</div>
                                <div style={{ flex: 1.2 }}>매도잔량</div>
                                <div style={{ flex: 1.5 }}>호가</div>
                                <div style={{ flex: 1.5 }}>매수잔량</div>
                                <div style={{ flex: 1 }}>수익률</div>
                              </div>

                              {/* Table Body */}
                              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                                {/* Top Half (5 rows) */}
                                <div style={{ display: 'flex', height: '170px' }}>
                                  {/* Left side columns 1 & 2: Ask Info (5 rows) */}
                                  <div style={{ flex: 2.2, display: 'flex', flexDirection: 'column' }}>
                                    {[
                                      { yield: '5.805%', qty: '20,000' },
                                      { yield: '5.806%', qty: '10,000' },
                                      { yield: '5.807%', qty: '19,780' },
                                      { yield: '5.918%', qty: '63,350' },
                                      { yield: '5.919%', qty: '14,000' }
                                    ].map((item, idx) => (
                                      <div key={idx} style={{
                                        display: 'flex',
                                        height: '34px',
                                        alignItems: 'center',
                                        backgroundColor: '#f0f6ff',
                                        borderBottom: '1px solid #e8f0fe',
                                        borderRight: '1px solid #e8f0fe'
                                      }}>
                                        <div style={{ flex: 1, paddingLeft: '8px', color: '#de201e', fontWeight: '500' }}>{item.yield}</div>
                                        <div style={{ flex: 1.2, paddingRight: '8px', textAlign: 'right', color: '#334155', fontWeight: '500' }}>{item.qty}</div>
                                      </div>
                                    ))}
                                  </div>

                                  {/* Middle column 3: Ask Prices (5 rows) */}
                                  <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column' }}>
                                    {[
                                      { price: '10,095.0', active: false },
                                      { price: '10,094.9', active: false },
                                      { price: '10,094.8', active: false },
                                      { price: '10,084.4', active: true },
                                      { price: '10,084.3', active: false }
                                    ].map((item, idx) => (
                                      <div key={idx} style={{
                                        display: 'flex',
                                        height: '34px',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: '#f0f6ff',
                                        borderBottom: '1px solid #e8f0fe',
                                        borderRight: '1px solid #e8f0fe'
                                      }}>
                                        {item.active ? (
                                          <div style={{
                                            border: '2px solid #222222',
                                            padding: '1px 6px',
                                            fontWeight: 'bold',
                                            color: '#de201e',
                                            fontSize: '0.85rem'
                                          }}>{item.price}</div>
                                        ) : (
                                          <span style={{ color: '#de201e', fontWeight: 'bold', fontSize: '0.85rem' }}>{item.price}</span>
                                        )}
                                      </div>
                                    ))}
                                  </div>

                                  {/* Right side columns 4 & 5: Spanned Info Panel (170px height) */}
                                  <div style={{
                                    flex: 2.5,
                                    backgroundColor: '#ffffff',
                                    borderBottom: '1px solid #e2e8f0',
                                    padding: '6px 8px 6px 12px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    fontSize: '0.7rem',
                                    color: '#475569',
                                    fontWeight: '500'
                                  }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>거래량</span><span style={{ fontWeight: 'bold', color: '#0f172a' }}>71,570</span></div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>전종</span><span style={{ fontWeight: 'bold', color: '#0f172a' }}>10,065.0</span></div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>시가</span><span style={{ fontWeight: 'bold', color: '#0f172a' }}>10,065.0</span></div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>고가</span><span style={{ fontWeight: 'bold', color: '#de201e' }}>10,084.4</span></div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>저가</span><span style={{ fontWeight: 'bold', color: '#0f172a' }}>10,065.0</span></div>
                                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}><span>주가</span></div>
                                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}><span>전환가</span></div>
                                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}><span>패리티</span></div>
                                  </div>
                                </div>

                                {/* Bottom Half (5 rows) */}
                                <div style={{ display: 'flex', height: '170px' }}>
                                  {/* Left side columns 1 & 2: Spanned Execution History Panel (170px height) */}
                                  <div style={{
                                    flex: 2.2,
                                    backgroundColor: '#ffffff',
                                    borderRight: '1px solid #e2e8f0',
                                    padding: '4px 6px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    fontSize: '0.68rem',
                                    fontWeight: '500'
                                  }}>
                                    {[
                                      { price: '10,084.4', qty: '10', color: '#de201e' },
                                      { price: '10,084.4', qty: '10', color: '#de201e' },
                                      { price: '10,084.4', qty: '1,340', color: '#de201e' },
                                      { price: '10,084.4', qty: '35,090', color: '#de201e' },
                                      { price: '10,084.4', qty: '200', color: '#de201e' },
                                      { price: '10,084.3', qty: '30,710', color: '#de201e' },
                                      { price: '10,065.0', qty: '3,000', color: '#334155' },
                                      { price: '10,065.0', qty: '1,210', color: '#334155' }
                                    ].map((item, idx) => (
                                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '0 2px' }}>
                                        <span style={{ color: item.color }}>{item.price}</span>
                                        <span style={{ color: '#64748b' }}>{item.qty}</span>
                                      </div>
                                    ))}
                                  </div>

                                  {/* Middle column 3: Bid Prices (5 rows) */}
                                  <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column' }}>
                                    {[
                                      { price: '10,066.0', color: '#de201e' },
                                      { price: '10,065.8', color: '#de201e' },
                                      { price: '10,065.7', color: '#de201e' },
                                      { price: '10,065.1', color: '#de201e' },
                                      { price: '10,065.0', color: '#0f172a' }
                                    ].map((item, idx) => (
                                      <div key={idx} style={{
                                        display: 'flex',
                                        height: '34px',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: '#fff5f5',
                                        borderBottom: '1px solid #fdf2f2',
                                        borderRight: '1px solid #fdf2f2'
                                      }}>
                                        <span style={{ color: item.color, fontWeight: 'bold', fontSize: '0.85rem' }}>{item.price}</span>
                                      </div>
                                    ))}
                                  </div>

                                  {/* Right side columns 4 & 5: Bid Info (5 rows) */}
                                  <div style={{ flex: 2.5, display: 'flex', flexDirection: 'column' }}>
                                    {[
                                      { qty: '2,320', yield: '6.113%' },
                                      { qty: '30,000', yield: '6.115%' },
                                      { qty: '100,000', yield: '6.117%' },
                                      { qty: '5,000', yield: '6.123%' },
                                      { qty: '37,800', yield: '6.124%' }
                                    ].map((item, idx) => (
                                      <div key={idx} style={{
                                        display: 'flex',
                                        height: '34px',
                                        alignItems: 'center',
                                        backgroundColor: '#fff5f5',
                                        borderBottom: '1px solid #fdf2f2'
                                      }}>
                                        <div style={{ flex: 1.5, paddingLeft: '8px', color: '#334155', fontWeight: '500' }}>{item.qty}</div>
                                        <div style={{ flex: 1, paddingRight: '8px', textAlign: 'right', color: '#de201e', fontWeight: '500' }}>{item.yield}</div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Price / Time Info Ticker */}
                          <div style={{
                            height: '24px',
                            backgroundColor: '#ffffff',
                            display: 'flex',
                            alignItems: 'stretch',
                            borderTop: '1px solid #e2e8f0',
                            fontSize: '0.72rem',
                            fontWeight: '700'
                          }}>
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '12px', color: '#2366ca', borderRight: '1px solid #e2e8f0' }}>275,420</div>
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#111111', borderRight: '1px solid #e2e8f0' }}>10:23</div>
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '12px', color: '#de201e' }}>289,000</div>
                          </div>

                          {/* KOSDAQ footer -> S&P500 footer */}
                          <div style={{ height: '24px', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px', borderTop: '1px solid #e2e8f0', fontSize: '0.72rem' }}>
                            <span style={{ fontWeight: '800' }}>S&P500</span>
                            <span style={{ color: '#de201e', fontWeight: '800' }}>7,537.43 ▲ 54.19 (0.72%)</span>
                          </div>

                          {/* Bottom bar */}
                          <div style={{
                            height: '44px',
                            display: 'flex',
                            alignItems: 'stretch',
                            borderTop: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0',
                            backgroundColor: isDark ? '#121826' : '#fff'
                          }}>
                            {/* Home button */}
                            <button style={{ width: '48px', border: 'none', background: 'none', borderRight: isDark ? '1px solid #1e293b' : '1px solid #f1f5f9', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ color: isDark ? '#cbd5e1' : '#333' }}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                            </button>

                            {/* Middle text tabs */}
                            <div style={{ flex: 1, display: 'flex', alignItems: 'stretch' }}>
                              {[
                                { key: '장내채권 현재가', label: `장내채권\n현재가` },
                                { key: '장내채권 잔고', label: `장내채권\n잔고` },
                                { key: '장외채권 매매', label: `장외채권\n매매` },
                                { key: '장외채권 잔고', label: `장외채권\n잔고` }
                              ].map((tab, idx) => {
                                const isSelected = tab.key === '장내채권 현재가';
                                return (
                                  <button
                                    key={tab.key}
                                    onClick={() => {
                                      if (tab.key === '장내채권 현재가') {
                                        setScreen6AsIsSubScreen('bondCurrentPrice');
                                      } else if (tab.key === '장내채권 잔고') {
                                        setScreen6AsIsSubScreen('bondBalance');
                                      } else if (tab.key === '장외채권 매매') {
                                        setScreen6AsIsSubScreen('bondCalc');
                                      } else if (tab.key === '장외채권 잔고') {
                                        setScreen6AsIsSubScreen('bondBalance');
                                      }
                                    }}
                                    style={{
                                      flex: 1,
                                      border: 'none',
                                      background: 'none',
                                      borderRight: idx < 3 ? (isDark ? '1px solid #1e293b' : '1px solid #f1f5f9') : 'none',
                                      cursor: 'pointer',
                                      fontSize: '0.73rem',
                                      fontWeight: '500',
                                      color: isDark ? '#cbd5e1' : '#333333',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      textAlign: 'center',
                                      whiteSpace: 'pre-line',
                                      lineHeight: '1.2',
                                      padding: '2px 2px'
                                    }}
                                  >
                                    {tab.label}
                                  </button>
                                );
                              })}
                            </div>

                            {/* Back/Exit button */}
                            <button 
                              onClick={() => setScreen6AsIsSubScreen('menu')}
                              style={{ width: '48px', border: 'none', background: 'none', borderLeft: isDark ? '1px solid #1e293b' : '1px solid #f1f5f9', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ color: isDark ? '#cbd5e1' : '#333' }}><path d="M9 14L4 9l5-5" /><path d="M4 9h10a5 5 0 0 1 5 5v5" /></svg>
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  )}
        {screen6AsIsModalOpen && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              width: '260px',
              backgroundColor: '#ffffff',
              borderRadius: '2px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}>
              <div style={{
                padding: '32px 20px',
                fontSize: '0.86rem',
                color: '#333333',
                textAlign: 'center',
                lineHeight: '1.4',
                fontWeight: '600'
              }}>
                퇴직연금 대상 종목이 아닙니다.
              </div>
              <button 
                onClick={() => setScreen6AsIsModalOpen(false)}
                style={{
                  height: '42px',
                  backgroundColor: '#222222',
                  color: '#ffffff',
                  border: 'none',
                  fontSize: '0.88rem',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                확인
              </button>
            </div>
          </div>
        )}
        {screen6CompanyBondModalOpen && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              width: '260px',
              backgroundColor: '#ffffff',
              borderRadius: '2px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}>
              <div style={{
                padding: '24px 20px',
                fontSize: '0.86rem',
                color: '#333333',
                textAlign: 'center',
                lineHeight: '1.45',
                fontWeight: '600'
              }}>
                재직 중이신 회사(또는 계열사)가 발행한 채권은 관련 법령에 따라 퇴직연금으로 매수할 수 없습니다. 다른 상품을 선택해 주세요.
              </div>
              <button 
                onClick={() => setScreen6CompanyBondModalOpen(false)}
                style={{
                  height: '42px',
                  backgroundColor: '#222222',
                  color: '#ffffff',
                  border: 'none',
                  fontSize: '0.88rem',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                확인
              </button>
            </div>
          </div>
        )}
      </>
    );
  })();
};

  const renderScreen5ToBeInvest = () => {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#ffffff',
        color: '#111111',
        fontFamily: 'sans-serif'
      }}>
        {/* Status Bar */}
        <div style={{
          ...styles.phoneHeaderBar,
          backgroundColor: '#ffffff',
          color: '#333333',
          borderBottom: 'none'
        }}>
          <span style={{ fontSize: '0.75rem', fontWeight: '700' }}>SKT 2:28</span>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.65rem', fontWeight: '800' }}>5G</span>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1px', height: '10px' }}>
              <div style={{ width: '2px', height: '3px', backgroundColor: '#333' }}></div>
              <div style={{ width: '2px', height: '5px', backgroundColor: '#333' }}></div>
              <div style={{ width: '2px', height: '7px', backgroundColor: '#333' }}></div>
              <div style={{ width: '2px', height: '9px', backgroundColor: '#333' }}></div>
            </div>
            <div style={{
              border: '1px solid #333',
              borderRadius: '3px',
              padding: '0px 3px',
              fontSize: '0.62rem',
              fontWeight: '900',
              height: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#333',
              color: '#fff',
              lineHeight: 1
            }}>
              52
            </div>
          </div>
        </div>

        {/* MTS Toolbar Header */}
        <div style={{
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          height: '44px',
          padding: '0 12px',
          borderBottom: '1px solid #eee',
          backgroundColor: '#fff',
          position: 'relative'
        }}>
          <button 
            onClick={() => setScreen5ToBeSubScreen('menu')}
            style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0, zIndex: 2 }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.2"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
          </button>
          
          <span style={{ 
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '1.02rem', 
            fontWeight: '700', 
            color: '#222222', 
            letterSpacing: '-0.3px',
            zIndex: 1
          }}>
            금융상품 투자하기
          </span>

          <div>
            <button style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
            </button>
          </div>
        </div>

        {/* Account Selector */}
        <div style={{ padding: '8px 12px', backgroundColor: '#ffffff' }}>
          <div style={{
            border: '1px solid #cbd5e1',
            borderRadius: '4px',
            padding: '8px 12px',
            fontSize: '12px',
            display: 'flex',
            justify: 'space-between',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            cursor: 'pointer'
          }}>
            <span style={{ fontWeight: '600', color: '#333333' }}>200-123454(41) 김대신</span>
            <span style={{ fontSize: '8px', color: '#888888' }}>▼</span>
          </div>
        </div>

        {/* Contents Container */}
        <div style={{ flex: 1, overflowY: 'auto', backgroundColor: '#ffffff', padding: '16px 14px' }}>
          {/* Asset Summary Section */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '0.98rem', fontWeight: '800', margin: '0 0 12px 0', color: '#111' }}>내 자산현황</h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              fontSize: '0.85rem',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '14px 16px',
              backgroundColor: '#f8fafc'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#666' }}>총 평가 금액</span>
                <span style={{ fontWeight: '700', color: '#111' }}>100,000,000 원</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#666' }}>보유 금융상품 평가금액</span>
                <span style={{ fontWeight: '700', color: '#111' }}>7,000,000 원</span>
              </div>
              <div style={{ height: '1px', backgroundColor: '#e2e8f0', margin: '2px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#111', fontWeight: '700' }}>투자 가능금액 (퇴직/적립)</span>
                <span style={{ fontWeight: '800', color: '#4750b3', fontSize: '1.05rem' }}>93,000,000 원</span>
              </div>
            </div>
          </div>

          {/* Investment Services Section */}
          <div>
            <h3 style={{ fontSize: '0.98rem', fontWeight: '800', margin: '0 0 12px 0', color: '#111' }}>금융상품 매매</h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '4px 16px',
              backgroundColor: '#ffffff'
            }}>
              {/* 일반 매매 */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid #f1f3f5' }}>
                <span style={{ fontSize: '0.92rem', fontWeight: '700', color: '#111' }}>일반 매매</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button style={{
                    backgroundColor: '#de201e',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '6px 16px',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}>
                    매수
                  </button>
                  <button style={{
                    backgroundColor: '#2366ca',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '6px 16px',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}>
                    매도
                  </button>
                </div>
              </div>

              {/* 보유상품 매도 후 매수 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '14px 0', borderBottom: '1px solid #f1f3f5', cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.92rem', fontWeight: '700', color: '#111' }}>보유상품 매도 후 매수</span>
                  <span style={{ color: '#888', fontSize: '1rem', fontWeight: 'bold' }}>›</span>
                </div>
                <span style={{ fontSize: '0.78rem', color: '#666', lineHeight: '1.3' }}>
                  보유 상품을 매도하고 매도 결제일에 선택한 상품을 매수
                </span>
              </div>

              {/* 만기상품 예약 매매 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '14px 0', borderBottom: '1px solid #f1f3f5', cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.92rem', fontWeight: '700', color: '#111' }}>만기상품 예약 매매</span>
                  <span style={{ color: '#888', fontSize: '1rem', fontWeight: 'bold' }}>›</span>
                </div>
                <span style={{ fontSize: '0.78rem', color: '#666', lineHeight: '1.3' }}>
                  만기상환이 예정된 상품을 선택하고 만기상환일에 선택한 상품을 매수
                </span>
              </div>

              {/* 적립식 투자 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '14px 0', borderBottom: '1px solid #f1f3f5', cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.92rem', fontWeight: '700', color: '#111' }}>적립식 투자</span>
                  <span style={{ color: '#888', fontSize: '1rem', fontWeight: 'bold' }}>›</span>
                </div>
                <span style={{ fontSize: '0.78rem', color: '#666', lineHeight: '1.3' }}>
                  투자 기간과 금액 설정 만으로 자동 정기 적립식 투자
                </span>
              </div>

              {/* 매매내역 조회/취소 */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', cursor: 'pointer' }}>
                <span style={{ fontSize: '0.92rem', fontWeight: '700', color: '#111' }}>매매내역 조회/취소</span>
                <span style={{ color: '#888', fontSize: '1rem', fontWeight: 'bold' }}>›</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation Tab Bar (identical to Screen 6) */}
        <div style={{
          height: '50px',
          display: 'flex',
          alignItems: 'stretch',
          borderTop: '1px solid #e2e8f0',
          backgroundColor: '#ffffff'
        }}>
          <button style={{ width: '48px', border: 'none', background: 'none', borderRight: '1px solid #f1f5f9', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
          </button>
          <div style={{ flex: 1, display: 'flex', alignItems: 'stretch' }}>
            {[
              { key: '보유상품 현황', label: `보유상품\n현황` },
              { key: 'ETF/리츠 잔고', label: `ETF/리츠\n잔고` },
              { key: 'ETF/리츠 체결/미체결', label: `ETF/리츠\n체결/미체결` },
              { key: 'ETF/리츠 주문', label: `ETF/리츠\n주문` }
            ].map((tab, idx) => {
              return (
                <button
                  key={tab.key}
                  style={{
                    flex: 1,
                    border: 'none',
                    background: 'none',
                    borderRight: idx < 3 ? '1px solid #f1f5f9' : 'none',
                    cursor: 'pointer',
                    fontSize: '0.73rem',
                    fontWeight: '500',
                    color: '#666',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    whiteSpace: 'pre-line',
                    lineHeight: '1.2',
                    padding: '2px 2px'
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
          <button 
            onClick={() => setScreen5ToBeSubScreen('menu')}
            style={{ width: '48px', border: 'none', background: 'none', borderLeft: '1px solid #f1f5f9', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.2"><path d="M9 14L4 9l5-5" /><path d="M4 9h10a5 5 0 0 1 5 5v5" /></svg>
          </button>
        </div>
      </div>
    );
  };

  const renderScreen6ToBeMenu = (isPage5 = false, isToBe = true) => {
    return (
      <>
        {/* Status Bar */}
        <div style={{
          ...styles.phoneHeaderBar,
          backgroundColor: '#4750b3',
          color: '#ffffff',
          borderBottom: 'none'
        }}>
          <span style={{ fontSize: '0.75rem', fontWeight: '700' }}>SKT 2:45</span>
          <span style={{ fontSize: '0.65rem', fontWeight: '800' }}>12:30</span>
        </div>

        {/* Top user bar (French Blue Theme) */}
        <div style={{
          backgroundColor: '#4750b3',
          padding: '16px 15px 12px 15px',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: '500' }}>김대신님</span>
              <span style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                fontSize: '0.82rem', 
                opacity: 0.9, 
                color: '#ffffff',
                cursor: 'pointer'
              }}>
                내 정보
                <svg width="6" height="10" viewBox="0 0 10 18" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: '2px' }}><polyline points="3 3 8 9 3 15" /></svg>
              </span>
            </div>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
                <span style={{ position: 'absolute', top: '2px', right: '2px', backgroundColor: '#00c3a5', width: '5px', height: '5px', borderRadius: '50%' }}></span>
              </div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            borderRadius: '4px',
            padding: '8px 12px',
            gap: '8px'
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#888888" strokeWidth="3"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            <input type="text" placeholder="메뉴를 검색하세요." disabled style={{ border: 'none', background: 'none', outline: 'none', width: '100%', fontSize: '0.82rem', fontWeight: '600' }} />
          </div>
        </div>

        {/* Main Category Tabs */}
        <div style={{
          display: 'flex',
          borderBottom: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0',
          backgroundColor: isDark ? '#121826' : '#ffffff'
        }}>
          {['최근', '트레이딩', '상품', '연금', '자산/뱅킹'].map((tab) => {
            const isSelected = tab === '연금';
            return (
              <div
                key={tab}
                style={{
                  flex: 1,
                  textAlign: 'center',
                  padding: '13px 0',
                  fontSize: '0.96rem',
                  fontWeight: '500',
                  color: isSelected ? '#4750b3' : (isDark ? '#cbd5e1' : '#888888'),
                  borderBottom: isSelected ? '3px solid #4750b3' : '3px solid transparent',
                }}
              >
                {tab}
              </div>
            );
          })}
        </div>

        {/* Split Content Area */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {/* Left Submenu Navigation */}
          <div style={{
            width: '115px',
            backgroundColor: isDark ? '#0f172a' : '#f1f3f5',
            borderRight: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingBottom: '12px',
            boxSizing: 'border-box'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {[
                { name: 'IRP/퇴직연금', active: true },
                { name: '연금저축', active: false },
                { name: '공지사항', active: false }
              ].map((sub, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '18px 12px',
                    fontSize: '0.96rem',
                    fontWeight: sub.active ? '800' : '500',
                    color: sub.active ? (isDark ? '#ffffff' : '#4750b3') : (isDark ? '#94a3b8' : '#777777'),
                    backgroundColor: sub.active ? (isDark ? '#121826' : '#ffffff') : 'transparent',
                    cursor: 'pointer'
                  }}
                >
                  {sub.name}
                </div>
              ))}
            </div>

            {/* RIA 가입 Banner */}
            <div style={{
              margin: '0 8px',
              borderRadius: '6px',
              background: 'linear-gradient(135deg, #a7f3d0 0%, #34d399 100%)',
              padding: '10px 8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
              cursor: 'pointer'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#065f46' }}>RIA</span>
                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#065f46' }}>가입</span>
              </div>
              <span style={{ fontSize: '1.5rem' }}>🇰🇷</span>
            </div>
          </div>

          {/* Right menu content */}
          <div style={{
            flex: 1,
            padding: '18px 16px',
            overflowY: 'auto',
            backgroundColor: isDark ? '#121826' : '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            boxSizing: 'border-box'
          }}>
            <div>
              {!isPage5 && (
                <>
                  <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#4750b3', marginBottom: '16px' }}>MY 퇴직연금</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
                    {[
                      { name: '전체자산 현황', action: () => { setScreen6ToBeSubScreen('investmentRatio'); setActiveScreen(6); } },
                      { name: '보유상품 현황', action: () => { setScreen6ToBeSubScreen('investmentRatio'); setActiveScreen(6); } },
                      { name: '투자비율 현황', action: () => { setScreen6ToBeSubScreen('investmentRatio'); setActiveScreen(6); } },
                      { name: '디폴트옵션 현황' },
                      { name: '만기예정' },
                      { name: '통합 거래내역' },
                      { name: '연간납입한도 설정' },
                      { name: '가입확인서 발급' },
                      { name: '실물이전 사전조회' }
                    ].map((item, idx) => (
                      <span 
                        key={idx}
                        onClick={item.action}
                        style={{
                          fontSize: '1.02rem',
                          color: isDark ? '#cbd5e1' : '#222222',
                          fontWeight: '500',
                          cursor: item.action ? 'pointer' : 'default',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        {item.name}
                      </span>
                    ))}
                  </div>
                </>
              )}

              <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#4750b3', marginBottom: '16px' }}>상품 매매</div>
              <div style={{ height: '1px', backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : '#f1f3f5', margin: '4px 0 16px 0' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {(isToBe ? [
                  { name: '전체상품검색' },
                  { name: '금융상품 투자하기', action: () => { setScreen5ToBeSubScreen('invest'); } },
                  { name: '장외채권 매매' },
                  { name: '장내채권 매매', action: () => { setScreen6ToBeSubScreen('bondCurrentPrice'); setActiveScreen(6); } },
                  { name: '장내채권 미체결/체결', action: () => { setScreen6ToBeSubScreen('bondBalance'); setScreen6BalanceActiveTab('미체결'); setActiveScreen(6); } },
                  { name: '장내(외)채권 잔고', action: () => { setScreen6ToBeSubScreen('bondBalance'); setScreen6BalanceActiveTab('잔고'); setActiveScreen(6); } },
                  { name: '디폴트옵션 매매' },
                  { name: 'ELB 청약예약' }
                ] : [
                  { name: '전체상품검색' },
                  { name: '자산배분펀드(TDF+디딤펀드)' },
                  { name: '보유상품 매도후매수' },
                  { name: '금융상품 매수' },
                  { name: '금융상품 매도' },
                  { name: '만기 예약매매' },
                  { name: '자동 분할매수' },
                  { name: '장외채권 매매' },
                  { name: '장내채권 매매', action: () => { setScreen6ToBeSubScreen('bondCurrentPrice'); setActiveScreen(6); } },
                  { name: '장내채권 미체결/체결', action: () => { setScreen6ToBeSubScreen('bondBalance'); setScreen6BalanceActiveTab('미체결'); setActiveScreen(6); } },
                  { name: '장내(외)채권 잔고', action: () => { setScreen6ToBeSubScreen('bondBalance'); setScreen6BalanceActiveTab('잔고'); setActiveScreen(6); } },
                  { name: '디폴트옵션 매매' },
                  { name: '매매내역 조회/취소' },
                  { name: 'ELB 청약예약' }
                ]).map((item, idx) => (
                  <span 
                    key={idx}
                    onClick={item.action}
                    style={{
                      fontSize: '1.02rem',
                      color: isDark ? '#cbd5e1' : '#222222',
                      fontWeight: '500',
                      cursor: item.action ? 'pointer' : 'default',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div style={{
          height: '48px',
          backgroundColor: '#000000',
          color: '#ffffff',
          display: 'flex',
          fontSize: '0.78rem',
          fontWeight: '800',
          borderTop: '1px solid rgba(255, 255, 255, 0.15)'
        }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer', borderRight: '1px solid rgba(255, 255, 255, 0.15)' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
              <line x1="12" y1="2" x2="12" y2="12" />
            </svg>
            <span>고객지원</span>
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer', borderRight: '1px solid rgba(255, 255, 255, 0.15)' }}>
            <span>이벤트</span>
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer', borderRight: '1px solid rgba(255, 255, 255, 0.15)' }}>
            <span>업무/거래신청</span>
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}>
            <span>인증/OTP</span>
          </div>
        </div>
      </>
    );
  };

  const [screen4SubScreen, setScreen4SubScreen] = useState('menu'); // 'menu', 'requestForm'
  const [asIsScreen4SubScreen, setAsIsScreen4SubScreen] = useState('menu'); // 'menu', 'requestForm'
  const [asisSimulationStep, setAsisSimulationStep] = useState('main'); // 'main', 'daishin_form', 'daishin_result', 'other_q1', 'other_result'

  // Lifted states for Pension Receipt Status (연금수령 현황) URL sync
  const [statusActiveTab, setStatusActiveTab] = useState('status');
  const [statusViewMode, setStatusViewMode] = useState('list');
  const [statusSelectedItem, setStatusSelectedItem] = useState(null);
  const [asIsSelectedMenuCategory, setAsIsSelectedMenuCategory] = useState('IRP/퇴직연금');
  const [toBeSelectedMenuCategory, setToBeSelectedMenuCategory] = useState('연금수령');
  const [toBePrevSubScreen, setToBePrevSubScreen] = useState('etfMall');
  const [etfMallNavMode, setEtfMallNavMode] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const navParam = params.get('etfMallNavMode');
    if (navParam) return navParam;
    const screenParam = params.get('screen');
    return (!screenParam || screenParam === '1') ? 'search' : 'default';
  });
  const [activeMallTab, setActiveMallTab] = useState('추천');
  const [ownedDisplayOption, setOwnedDisplayOption] = useState('평가금');
  const [ownedSortOption, setOwnedSortOption] = useState('수익률 높은 순');
  const [isOwnedSortBsheetOpen, setIsOwnedSortBsheetOpen] = useState(false);
  const [isFavoriteBsheetOpen, setIsFavoriteBsheetOpen] = useState(false);
  const [isPeriodBsheetOpen, setIsPeriodBsheetOpen] = useState(false);
  const [asisSearchQuery, setAsisSearchQuery] = useState('');
  const [tobeSearchQuery, setTobeSearchQuery] = useState('');
  const [isAsIsToBeExpanded, setIsAsIsToBeExpanded] = useState(false);
  const [enteredViaEtfMall, setEnteredViaEtfMall] = useState(false);
  const [isSearchEnhancementModalOpen, setIsSearchEnhancementModalOpen] = useState(false);
  const [etfMallSelectedChip, setEtfMallSelectedChip] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('etfChip') || '전체';
  });

  // URL Parameter Synchronization
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    
    const screenParam = params.get('screen');
    if (screenParam) {
      const num = parseInt(screenParam, 10);
      if (num >= 1 && num <= 9) setActiveScreen(num);
    }
    
    const asisParam = params.get('asis');
    if (asisParam) setAsIsSubScreen(asisParam);
    
    const tobeParam = params.get('tobe');
    if (tobeParam) setToBeSubScreen(tobeParam);

    const screen6AsIsParam = params.get('screen6asis');
    if (screen6AsIsParam) setScreen6AsIsSubScreen(screen6AsIsParam);

    const screen6ToBeParam = params.get('screen6tobe');
    if (screen6ToBeParam) setScreen6ToBeSubScreen(screen6ToBeParam);
    const screen6ToBeSwitchParam = params.get('screen6tobeswitch');
    if (screen6ToBeSwitchParam) setScreen6ToBeSwitchOn(screen6ToBeSwitchParam === 'true');
    const screen6AsIsBsheetParam = params.get('screen6asisbsheet');
    if (screen6AsIsBsheetParam) setScreen6AsIsBsheetState(screen6AsIsBsheetParam);
    const screen6ToBeBsheetParam = params.get('screen6tobebsheet');
    if (screen6ToBeBsheetParam) setScreen6ToBeBsheetState(screen6ToBeBsheetParam);
    const screen6AsIsSearchParam = params.get('screen6asissearch');
    if (screen6AsIsSearchParam) setScreen6AsIsSearchOpen(screen6AsIsSearchParam === 'true');
    const screen6ToBeSearchParam = params.get('screen6tobesearch');
    if (screen6ToBeSearchParam) setScreen6ToBeSearchOpen(screen6ToBeSearchParam === 'true');
    const screen6asisq1Param = params.get('screen6asisq1');
    if (screen6asisq1Param) setScreen6AsIsCautionQ1(screen6asisq1Param);
    const screen6asisq2Param = params.get('screen6asisq2');
    if (screen6asisq2Param) setScreen6AsIsCautionQ2(screen6asisq2Param);
    const screen6tobeq1Param = params.get('screen6tobeq1');
    if (screen6tobeq1Param) setScreen6ToBeCautionQ1(screen6tobeq1Param);
    const screen6tobeq2Param = params.get('screen6tobeq2');
    if (screen6tobeq2Param) setScreen6ToBeCautionQ2(screen6tobeq2Param);
    const screen6calcamountParam = params.get('screen6calcamount');
    if (screen6calcamountParam) setScreen6CalcAmount(screen6calcamountParam);
    const screen6asismodalParam = params.get('screen6asismodal');
    if (screen6asismodalParam) setScreen6AsIsModalOpen(screen6asismodalParam === 'true');

    const screen4SubParam = params.get('screen4SubScreen');
    if (screen4SubParam) setScreen4SubScreen(screen4SubParam);

    const asisScreen4SubParam = params.get('asisScreen4SubScreen');
    if (asisScreen4SubParam) setAsIsScreen4SubScreen(asisScreen4SubParam);

    const mallTabParam = params.get('mallTab');
    if (mallTabParam) setActiveMallTab(mallTabParam);

    const ownedDisplayParam = params.get('ownedDisplay');
    if (ownedDisplayParam) setOwnedDisplayOption(ownedDisplayParam);

    const ownedSortParam = params.get('ownedSort');
    if (ownedSortParam) setOwnedSortOption(ownedSortParam);

    const ownedBsheetParam = params.get('ownedBsheet');
    if (ownedBsheetParam) setIsOwnedSortBsheetOpen(ownedBsheetParam === 'true');

    const favBsheetParam = params.get('favBsheet');
    if (favBsheetParam) setIsFavoriteBsheetOpen(favBsheetParam === 'true');

    const periodBsheetParam = params.get('periodBsheet');
    if (periodBsheetParam) setIsPeriodBsheetOpen(periodBsheetParam === 'true');

    const asisQueryParam = params.get('asisQuery');
    if (asisQueryParam) setAsisSearchQuery(asisQueryParam);

    const tobeQueryParam = params.get('tobeQuery');
    if (tobeQueryParam) setTobeSearchQuery(tobeQueryParam);

    const etfChipParam = params.get('etfChip');
    if (etfChipParam) setEtfMallSelectedChip(etfChipParam);

    const etfMallNavModeParam = params.get('etfMallNavMode');
    if (etfMallNavModeParam) {
      setEtfMallNavMode(etfMallNavModeParam);
    } else if (screenParam === '1' || (!screenParam && activeScreen === 1)) {
      setEtfMallNavMode('search');
    }

    const figmaExportParam = params.get('figmaExport');
    if (figmaExportParam) setIsFigmaExportMode(figmaExportParam === 'true');
    const asisSimParam = params.get('asisSimulationStep');
    if (asisSimParam) setAsisSimulationStep(asisSimParam);

    // Restore order tabs
    const screen6AsIsOrderTabParam = params.get('screen6AsIsOrderTab');
    if (screen6AsIsOrderTabParam) setScreen6AsIsOrderTab(screen6AsIsOrderTabParam);
    const screen6ToBeOrderTabParam = params.get('screen6ToBeOrderTab');
    if (screen6ToBeOrderTabParam) setScreen6ToBeOrderTab(screen6ToBeOrderTabParam);

    // Restore Pension Receipt Status states from URL params on mount
    const statusActiveTabParam = params.get('statusActiveTab');
    if (statusActiveTabParam) setStatusActiveTab(statusActiveTabParam);
    const statusViewModeParam = params.get('statusViewMode');
    if (statusViewModeParam) setStatusViewMode(statusViewModeParam);
    const statusSelectedItemParam = params.get('statusSelectedItem');
    if (statusSelectedItemParam) {
      if (statusSelectedItemParam === '1326676') {
        setStatusSelectedItem({ date: '2026.05.15', total: '1,361,736', actual: '1,326,676', pensionTax: '31,880', localTax: '3,180' });
      } else if (statusSelectedItemParam === '10000000') {
        setStatusSelectedItem({ date: '2026.06.19', total: '10,000,000', actual: '10,000,000', pensionTax: '0', localTax: '0' });
      } else if (statusSelectedItemParam === '170078') {
        setStatusSelectedItem({ date: '2026.06.17', total: '170,078', actual: '170,078', pensionTax: '0', localTax: '0' });
      } else if (statusSelectedItemParam === '1158027') {
        setStatusSelectedItem({ date: '2026.04.15', total: '1,188,627', actual: '1,158,027', pensionTax: '27,810', localTax: '2,790' });
      } else if (statusSelectedItemParam === '1243597') {
        setStatusSelectedItem({ date: '2026.03.13', total: '1,270,857', actual: '1,243,597', pensionTax: '24,780', localTax: '2,480' });
      } else if (statusSelectedItemParam === '1198912') {
        setStatusSelectedItem({ date: '2026.02.13', total: '1,225,202', actual: '1,198,912', pensionTax: '23,900', localTax: '2,390' });
      } else if (statusSelectedItemParam === '1077008') {
        setStatusSelectedItem({ date: '2026.01.15', total: '1,110,358', actual: '1,077,008', pensionTax: '30,310', localTax: '3,040' });
      }
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set('screen', activeScreen);
    params.set('asis', asIsSubScreen);
    params.set('tobe', toBeSubScreen);
    params.set('screen6asis', screen6AsIsSubScreen);
    params.set('screen6tobe', screen6ToBeSubScreen);
    params.set('screen6tobeswitch', screen6ToBeSwitchOn ? 'true' : 'false');
    params.set('screen6asisbsheet', screen6AsIsBsheetState);
    params.set('screen6tobebsheet', screen6ToBeBsheetState);
    params.set('screen6asissearch', screen6AsIsSearchOpen ? 'true' : 'false');
    params.set('screen6tobesearch', screen6ToBeSearchOpen ? 'true' : 'false');
    if (screen6AsIsCautionQ1) params.set('screen6asisq1', screen6AsIsCautionQ1); else params.delete('screen6asisq1');
    if (screen6AsIsCautionQ2) params.set('screen6asisq2', screen6AsIsCautionQ2); else params.delete('screen6asisq2');
    if (screen6ToBeCautionQ1) params.set('screen6tobeq1', screen6ToBeCautionQ1); else params.delete('screen6tobeq1');
    if (screen6ToBeCautionQ2) params.set('screen6tobeq2', screen6ToBeCautionQ2); else params.delete('screen6tobeq2');
    if (screen6CalcAmount) params.set('screen6calcamount', screen6CalcAmount); else params.delete('screen6calcamount');
    if (screen6AsIsModalOpen) params.set('screen6asismodal', 'true'); else params.delete('screen6asismodal');
    if (screen6CompanyBondModalOpen) params.set('screen6companybondmodal', 'true'); else params.delete('screen6companybondmodal');
    if (screen6AsIsUpdateModalOpen) params.set('screen6asisupdate-modal', 'true'); else params.delete('screen6asisupdate-modal');
    if (screen6ToBeNoPlanModalOpen) params.set('screen6tobeno-plan-modal', 'true'); else params.delete('screen6tobeno-plan-modal');
    params.set('screen6account', screen6ActiveAccount);
    params.set('screen4SubScreen', screen4SubScreen);
    params.set('asisScreen4SubScreen', asIsScreen4SubScreen);
    params.set('mallTab', activeMallTab);
    params.set('ownedDisplay', ownedDisplayOption);
    params.set('ownedSort', ownedSortOption);
    params.set('ownedBsheet', isOwnedSortBsheetOpen ? 'true' : 'false');
    params.set('favBsheet', isFavoriteBsheetOpen ? 'true' : 'false');
    params.set('periodBsheet', isPeriodBsheetOpen ? 'true' : 'false');
    params.set('asisQuery', asisSearchQuery);
    params.set('tobeQuery', tobeSearchQuery);
    params.set('etfMallNavMode', etfMallNavMode);
    params.set('etfChip', etfMallSelectedChip);
    params.set('figmaExport', isFigmaExportMode ? 'true' : 'false');
    
    // Sync Pension Receipt Status states to URL params
    params.set('statusActiveTab', statusActiveTab);
    params.set('statusViewMode', statusViewMode);
    if (statusSelectedItem) {
      params.set('statusSelectedItem', statusSelectedItem.actual.replace(/,/g, ''));
    } else {
      params.delete('statusSelectedItem');
    }
    
    // Sync asisSimulationStep
    params.set('asisSimulationStep', asisSimulationStep);

    // Sync order tabs
    params.set('screen6AsIsOrderTab', screen6AsIsOrderTab);
    params.set('screen6ToBeOrderTab', screen6ToBeOrderTab);

    // Sync unexecuted popups
    params.set('screen6AsIsUnexecutedOpen', screen6AsIsUnexecutedOpen ? 'true' : 'false');
    params.set('screen6ToBeUnexecutedOpen', screen6ToBeUnexecutedOpen ? 'true' : 'false');
    params.set('screen6ToBeHoldBalancePopupOpen', screen6ToBeHoldBalancePopupOpen ? 'true' : 'false');
    params.set('screen6BalanceActiveTab', screen6BalanceActiveTab);
    params.set('screen6keypad', screen6CalcKeypadOpen ? 'true' : 'false');
    
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    if (window.location.search !== `?${params.toString()}`) {
      window.history.replaceState({}, '', newUrl);
    }
  }, [activeScreen, asIsSubScreen, toBeSubScreen, screen6AsIsSubScreen, screen6ToBeSubScreen, screen6ToBeSwitchOn, screen6AsIsBsheetState, screen6ToBeBsheetState, screen4SubScreen, asIsScreen4SubScreen, activeMallTab, ownedDisplayOption, ownedSortOption, isOwnedSortBsheetOpen, isFavoriteBsheetOpen, isPeriodBsheetOpen, asisSearchQuery, tobeSearchQuery, etfMallNavMode, etfMallSelectedChip, isFigmaExportMode, statusActiveTab, statusViewMode, statusSelectedItem, asisSimulationStep, screen6AsIsSearchOpen, screen6ToBeSearchOpen, screen6AsIsCautionQ1, screen6AsIsCautionQ2, screen6ToBeCautionQ1, screen6ToBeCautionQ2, screen6CalcAmount, screen6ActiveAccount, screen6AsIsModalOpen, screen6CompanyBondModalOpen, screen6AsIsUpdateModalOpen, screen6ToBeNoPlanModalOpen, screen6AsIsOrderTab, screen6ToBeOrderTab, screen6AsIsUnexecutedOpen, screen6ToBeUnexecutedOpen, screen6BalanceActiveTab, screen6ToBeHoldBalancePopupOpen, screen6CalcKeypadOpen]);

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const screenParam = params.get('screen');
      if (screenParam) {
        const num = parseInt(screenParam, 10);
        if (num >= 1 && num <= 9) setActiveScreen(num);
      }
      const asisParam = params.get('asis');
      if (asisParam) setAsIsSubScreen(asisParam);
      const tobeParam = params.get('tobe');
      if (tobeParam) setToBeSubScreen(tobeParam);
      const screen6AsIsParam = params.get('screen6asis');
      if (screen6AsIsParam) setScreen6AsIsSubScreen(screen6AsIsParam);
      const screen6ToBeParam = params.get('screen6tobe');
    if (screen6ToBeParam) setScreen6ToBeSubScreen(screen6ToBeParam);
    const screen6ToBeSwitchParam = params.get('screen6tobeswitch');
    if (screen6ToBeSwitchParam) setScreen6ToBeSwitchOn(screen6ToBeSwitchParam === 'true');
      const screen6AsIsBsheetParam = params.get('screen6asisbsheet');
      if (screen6AsIsBsheetParam) setScreen6AsIsBsheetState(screen6AsIsBsheetParam);
      const screen6ToBeBsheetParam = params.get('screen6tobebsheet');
      if (screen6ToBeBsheetParam) setScreen6ToBeBsheetState(screen6ToBeBsheetParam);
      const screen6AsIsSearchParam = params.get('screen6asissearch');
      if (screen6AsIsSearchParam) setScreen6AsIsSearchOpen(screen6AsIsSearchParam === 'true');
      const screen6ToBeSearchParam = params.get('screen6tobesearch');
      if (screen6ToBeSearchParam) setScreen6ToBeSearchOpen(screen6ToBeSearchParam === 'true');
      const screen6asisq1Param = params.get('screen6asisq1');
      if (screen6asisq1Param) setScreen6AsIsCautionQ1(screen6asisq1Param);
      const screen6asisq2Param = params.get('screen6asisq2');
      if (screen6asisq2Param) setScreen6AsIsCautionQ2(screen6asisq2Param);
      const screen6tobeq1Param = params.get('screen6tobeq1');
      if (screen6tobeq1Param) setScreen6ToBeCautionQ1(screen6tobeq1Param);
      const screen6tobeq2Param = params.get('screen6tobeq2');
      if (screen6tobeq2Param) setScreen6ToBeCautionQ2(screen6tobeq2Param);
      const screen6calcamountParam = params.get('screen6calcamount');
      if (screen6calcamountParam) setScreen6CalcAmount(screen6calcamountParam);
      const screen6asismodalParam = params.get('screen6asismodal');
      if (screen6asismodalParam) setScreen6AsIsModalOpen(screen6asismodalParam === 'true');
      const screen6asisupdateParam = params.get('screen6asisupdate-modal');
      if (screen6asisupdateParam) setScreen6AsIsUpdateModalOpen(screen6asisupdateParam === 'true');
      const screen6ActiveAccountParam = params.get('screen6account');
      if (screen6ActiveAccountParam) setScreen6ActiveAccount(screen6ActiveAccountParam);
      const screen6CompanyBondModalParam = params.get('screen6companybondmodal');
      if (screen6CompanyBondModalParam) setScreen6CompanyBondModalOpen(screen6CompanyBondModalParam === 'true');
      const screen6tobenoplanmodalParam = params.get('screen6tobeno-plan-modal');
      if (screen6tobenoplanmodalParam) setScreen6ToBeNoPlanModalOpen(screen6tobenoplanmodalParam === 'true');
      const screen4SubParam = params.get('screen4SubScreen');
      if (screen4SubParam) setScreen4SubScreen(screen4SubParam);
      const asisScreen4SubParam = params.get('asisScreen4SubScreen');
      if (asisScreen4SubParam) setAsIsScreen4SubScreen(asisScreen4SubParam);
      const mallTabParam = params.get('mallTab');
      if (mallTabParam) setActiveMallTab(mallTabParam);
      const ownedDisplayParam = params.get('ownedDisplay');
      if (ownedDisplayParam) setOwnedDisplayOption(ownedDisplayParam);
      const ownedSortParam = params.get('ownedSort');
      if (ownedSortParam) setOwnedSortOption(ownedSortParam);
      const ownedBsheetParam = params.get('ownedBsheet');
      if (ownedBsheetParam) setIsOwnedSortBsheetOpen(ownedBsheetParam === 'true');
      const favBsheetParam = params.get('favBsheet');
      if (favBsheetParam) setIsFavoriteBsheetOpen(favBsheetParam === 'true');
      const asisQueryParam = params.get('asisQuery');
      if (asisQueryParam) setAsisSearchQuery(asisQueryParam);
      const tobeQueryParam = params.get('tobeQuery');
      if (tobeQueryParam) setTobeSearchQuery(tobeQueryParam);
      const etfChipParam = params.get('etfChip');
      if (etfChipParam) setEtfMallSelectedChip(etfChipParam);
      const etfMallNavModeParam = params.get('etfMallNavMode');
      if (etfMallNavModeParam) setEtfMallNavMode(etfMallNavModeParam);
      const figmaExportParam = params.get('figmaExport');
      if (figmaExportParam) setIsFigmaExportMode(figmaExportParam === 'true');
      const asisSimParam = params.get('asisSimulationStep');
      if (asisSimParam) setAsisSimulationStep(asisSimParam);
      const screen6KeypadParam = params.get('screen6keypad');
      if (screen6KeypadParam) setScreen6CalcKeypadOpen(screen6KeypadParam === 'true');

      // Restoring statusActiveTab, statusViewMode, statusSelectedItem
      const statusActiveTabParam = params.get('statusActiveTab');
      if (statusActiveTabParam) setStatusActiveTab(statusActiveTabParam);
      const statusViewModeParam = params.get('statusViewMode');
      if (statusViewModeParam) setStatusViewMode(statusViewModeParam);
      const statusSelectedItemParam = params.get('statusSelectedItem');
      if (statusSelectedItemParam) {
        if (statusSelectedItemParam === '1326676') {
          setStatusSelectedItem({ date: '2026.05.15', total: '1,361,736', actual: '1,326,676', pensionTax: '31,880', localTax: '3,180' });
        } else if (statusSelectedItemParam === '10000000') {
          setStatusSelectedItem({ date: '2026.06.19', total: '10,000,000', actual: '10,000,000', pensionTax: '0', localTax: '0' });
        } else if (statusSelectedItemParam === '170078') {
          setStatusSelectedItem({ date: '2026.06.17', total: '170,078', actual: '170,078', pensionTax: '0', localTax: '0' });
        } else if (statusSelectedItemParam === '1158027') {
          setStatusSelectedItem({ date: '2026.04.15', total: '1,188,627', actual: '1,158,027', pensionTax: '27,810', localTax: '2,790' });
        } else if (statusSelectedItemParam === '1243597') {
          setStatusSelectedItem({ date: '2026.03.13', total: '1,270,857', actual: '1,243,597', pensionTax: '24,780', localTax: '2,480' });
        } else if (statusSelectedItemParam === '1198912') {
          setStatusSelectedItem({ date: '2026.02.13', total: '1,225,202', actual: '1,198,912', pensionTax: '23,900', localTax: '2,390' });
        } else if (statusSelectedItemParam === '1077008') {
          setStatusSelectedItem({ date: '2026.01.15', total: '1,110,358', actual: '1,077,008', pensionTax: '30,310', localTax: '3,040' });
        }
      } else {
        setStatusSelectedItem(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (activeScreen === 2) {
      // Screen 2 always has "주요 핵심 구현 사항"
      setIsAsIsToBeExpanded(false);
    } else if (activeScreen === 1) {
      if (toBeSubScreen === 'etfMall' || toBeSubScreen === 'tigerDetail') {
        setIsAsIsToBeExpanded(false);
      } else {
        setIsAsIsToBeExpanded(true);
      }
    } else {
      setIsAsIsToBeExpanded(true);
    }
  }, [activeScreen, toBeSubScreen]);

  useEffect(() => {
    if (toBeSubScreen === 'menu') {
      setEnteredViaEtfMall(false);
    }
  }, [toBeSubScreen]);

  // Account states (shared across emulators)
  const [accountBalance, setAccountBalance] = useState({
    cash: 5240000,
    ownedProducts: [
      { name: '대신 고배당 국공채 펀드 (채권형)', ratio: 35, amt: 7000000 },
      { name: 'TIGER 미국나스닥100 ETF (주식형)', ratio: 25, amt: 5000000 },
      { name: '삼성 코덱스 단기채 ETF (채권형)', ratio: 20, amt: 4000000 },
      { name: '현금 마일리지 (대기 자금)', ratio: 20, amt: 4000000 }
    ],
    etfBalance: [
      { name: 'DAISHIN343 K200', qty: 50, avgPrice: 101500, currentPrice: 101265, evalProfit: -11750, yield: -0.23 },
      { name: 'TIGER 미국S&P500', qty: 200, avgPrice: 18100, currentPrice: 18450, evalProfit: 70000, yield: 1.93 }
    ],
    orderHistory: [
      { id: 101, time: '14:20', name: 'DAISHIN343 K200', type: '매수', price: 101300, qty: 10, status: '체결완료' },
      { id: 102, time: '14:35', name: 'TIGER 미국S&P500', type: '매수', price: 18420, qty: 50, status: '체결완료' }
    ]
  });

  useEffect(() => {
    setOrderPrice(stockData[selectedStock].price);
  }, [selectedStock]);


  const addNotification = (message, type = 'success') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3500);
  };

  return (
    <div className={isDark ? 'dark-theme' : 'light-theme'} style={styles.appWrapper}>
      {/* Badges 1-9 at Top Left */}
      <div style={{
        position: 'fixed',
        top: '24px',
        left: '24px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
            const isActive = num === activeScreen;
            return (
              <span
                key={num}
                onClick={() => setActiveScreen(num)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: isActive ? '#00c3a5' : (isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'),
                  color: isActive ? '#fff' : (isDark ? '#94a3b8' : '#475569'),
                  border: isActive ? 'none' : '1px solid var(--border-color)',
                  fontSize: '0.9rem',
                  fontWeight: '900',
                  lineHeight: '1',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {num}
              </span>
            );
          })}
        </div>
      </div>

      {/* Floating Description Drawer Trigger (+ Button) */}
      <button
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        style={{
          ...styles.floatingThemeToggle,
          right: isDrawerOpen ? '540px' : '20px',
          top: '38px',
          backgroundColor: '#1c1c1e',
          color: '#ffffff',
          fontSize: '20px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
          transform: isDrawerOpen ? 'rotate(45deg)' : 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 10000
        }}
        aria-label="Toggle Description"
      >
        ＋
      </button>

      {/* Floating Figma Export Mode Toggle Button */}
      {(activeScreen === 4 || activeScreen === 5 || activeScreen === 6) && (
        <button
          onClick={() => setIsFigmaExportMode(!isFigmaExportMode)}
          style={{
            position: 'fixed',
            right: isDrawerOpen ? '540px' : '20px',
            top: '90px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: isFigmaExportMode ? '#de201e' : '#1c1c1e',
            color: '#ffffff',
            fontSize: '20px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            zIndex: 10000
          }}
          title={isFigmaExportMode ? "피그마 익스포트 모드 해제" : "피그마 익스포트 모드 설정"}
        >
          ↕
        </button>
      )}

      <main style={{
        ...styles.mainContent,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '60px',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingTop: '60px',
        paddingBottom: '60px',
        paddingRight: isDrawerOpen ? '580px' : '0px',
        transition: 'padding-right 0.3s cubic-bezier(0.4, 0, 0.2, 1), padding-top 0.3s, padding-bottom 0.3s',
        boxSizing: 'border-box'
      }}>
        {activeScreen === 1 ? (
          /* ETF 주문화면 내 종목검색화면 AS IS TO BE (Screen 1) */
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '32px',
            flexShrink: 0
          }}>
            {/* Emulators Row */}
            <div style={{
              display: 'flex',
              gap: '60px',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              {/* AS IS Emulator */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: '900',
                  color: isDark ? '#f8fafc' : '#0f172a',
                  backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                  padding: '8px 24px',
                  borderRadius: '99px',
                  letterSpacing: '1px',
                  border: '1px solid var(--border-color)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                }}>AS IS</div>
                <div style={{
                  ...styles.phoneMockup,
                  backgroundColor: isDark ? '#0b0f19' : '#fff',
                  width: '360px',
                  height: '800px',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative'
                }}>
                  {asIsSubScreen === 'menu' ? (
                      <>
                        {/* Status Bar */}
                        <div style={{
                          ...styles.phoneHeaderBar,
                          backgroundColor: '#4750b3',
                          color: '#ffffff',
                          borderBottom: 'none'
                        }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: '700' }}>SKT 2:45</span>
                          <span style={{ fontSize: '0.65rem', fontWeight: '800' }}>12:30</span>
                        </div>

                        {/* Top user bar (French Blue Theme) */}
                        <div style={{
                          backgroundColor: '#4750b3',
                          padding: '16px 15px 12px 15px',
                          color: '#ffffff',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '12px'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ fontSize: '1.2rem', fontWeight: '500' }}>김대신님</span>
                              <span style={{ 
                                display: 'inline-flex', 
                                alignItems: 'center', 
                                fontSize: '0.82rem', 
                                opacity: 0.9, 
                                cursor: 'pointer', 
                                gap: '2px', 
                                color: '#ffffff',
                                border: 'none',
                                padding: 0,
                                background: 'none'
                              }}>
                                내 정보
                                <svg width="6" height="10" viewBox="0 0 10 18" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: '2px' }}><polyline points="3 3 8 9 3 15" /></svg>
                              </span>
                            </div>
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                              {/* Home White Icon */}
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: 'pointer' }}>
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                <polyline points="9 22 9 12 15 12 15 22" />
                              </svg>
                              {/* Bell Icon with Red Dot */}
                              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                                </svg>
                                <span style={{ position: 'absolute', top: '2px', right: '2px', backgroundColor: '#de201e', width: '5px', height: '5px', borderRadius: '50%' }}></span>
                              </div>
                              {/* Settings Icon */}
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: 'pointer' }}>
                                <circle cx="12" cy="12" r="3" />
                                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                              </svg>
                              {/* Close Icon */}
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: 'pointer' }}>
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                              </svg>
                            </div>
                          </div>

                          {/* Menu Search Bar */}
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: '#ffffff',
                            borderRadius: '4px',
                            padding: '8px 12px',
                            gap: '8px'
                          }}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#888888" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                            <input
                              type="text"
                              placeholder="메뉴를 검색하세요."
                              disabled
                              style={{
                                border: 'none',
                                background: 'none',
                                outline: 'none',
                                width: '100%',
                                fontSize: '0.82rem',
                                fontWeight: '600'
                              }}
                            />
                          </div>
                        </div>

                        {/* Main Category Tabs */}
                        <div style={{
                          display: 'flex',
                          borderBottom: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0',
                          backgroundColor: isDark ? '#121826' : '#ffffff'
                        }}>
                          {['최근', '트레이딩', '상품', '연금', '자산/뱅킹'].map((tab) => {
                            const isSelected = tab === '연금';
                            return (
                              <div
                                key={tab}
                                style={{
                                  flex: 1,
                                  textAlign: 'center',
                                  padding: '13px 0',
                                  fontSize: '0.96rem',
                                  fontWeight: '500',
                                  color: isSelected ? '#4750b3' : (isDark ? '#cbd5e1' : '#888888'),
                                  borderBottom: isSelected ? '3px solid #4750b3' : '3px solid transparent',
                                  cursor: 'pointer'
                                }}
                              >
                                {tab}
                              </div>
                            );
                          })}
                        </div>

                        {/* Split Content Area (Left Side Menu / Right Main List) */}
                        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                          {/* Left Submenu Navigation */}
                          <div style={{
                            width: '115px',
                            backgroundColor: isDark ? '#0f172a' : '#f1f3f5',
                            borderRight: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            paddingBottom: '12px',
                            boxSizing: 'border-box'
                          }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              {[
                                { name: 'IRP/퇴직연금', active: true },
                                { name: '연금저축', active: false },
                                { name: '공지사항', active: false }
                              ].map((sub, idx) => (
                                <div
                                  key={idx}
                                  style={{
                                    padding: '18px 12px',
                                    fontSize: '0.96rem',
                                    fontWeight: sub.active ? '800' : '500',
                                    color: sub.active ? (isDark ? '#ffffff' : '#4750b3') : (isDark ? '#94a3b8' : '#777777'),
                                    backgroundColor: sub.active ? (isDark ? '#121826' : '#ffffff') : 'transparent',
                                    cursor: 'pointer'
                                  }}
                                >
                                  {sub.name}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Right Main Menu Items */}
                          <div style={{
                            flex: 1,
                            padding: '18px 16px',
                            overflowY: 'auto',
                            backgroundColor: isDark ? '#121826' : '#ffffff',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '24px',
                            boxSizing: 'border-box'
                          }}>
                            {/* Section 1: 자주 찾는 메뉴 */}
                            <div>
                              <div style={{ fontSize: '0.98rem', fontWeight: '800', color: '#4750b3', marginBottom: '16px' }}>자주 찾는 메뉴</div>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
                                {[
                                  { name: '보유상품 현황' },
                                  { name: 'ETF/리츠 잔고' },
                                  { name: 'ETF/리츠 주문' },
                                  { name: 'ETF/리츠 체결/미체결' },
                                  { name: 'ETF/리츠 현재가' },
                                  { name: '금융상품 매수' }
                                ].map((item, idx) => (
                                  <div 
                                    key={idx} 
                                    onClick={() => {
                                      if (item.name === 'ETF/리츠 현재가') {
                                        setAsIsSubScreen('currentPrice');
                                      }
                                    }}
                                    style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                                  >
                                    <span style={{ fontSize: '1.02rem', color: isDark ? '#cbd5e1' : '#222222', fontWeight: '500' }}>{item.name}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Styled ISA Event Banner to fill space beautifully matching Zeplin */}
                            <div style={{
                              background: 'linear-gradient(135deg, #005a4c 0%, #009c84 100%)',
                              borderRadius: '6px',
                              padding: '12px 14px',
                              color: '#ffffff',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '2px',
                              position: 'relative',
                              overflow: 'hidden',
                              cursor: 'pointer',
                              boxShadow: '0 4px 10px rgba(0,0,0,0.06)',
                              flexShrink: 0
                            }}>
                              <span style={{ fontSize: '0.92rem', fontWeight: '800', letterSpacing: '-0.3px' }}>ISA</span>
                              <span style={{ fontSize: '1.05rem', fontWeight: '900', letterSpacing: '-0.5px' }}>만기전환 이벤트</span>
                              <span style={{ fontSize: '0.72rem', opacity: 0.8, marginTop: '2px' }}>대신증권 연금저축</span>
                              {/* Decorative coins graphic */}
                              <div style={{ position: 'absolute', right: '10px', bottom: '6px', fontSize: '1.8rem', opacity: 0.85 }}>🪙</div>
                            </div>

                            {/* Section 2: IRP */}
                            <div style={{ paddingBottom: '12px' }}>
                              <div style={{ fontSize: '0.98rem', fontWeight: '800', color: '#4750b3', marginBottom: '16px' }}>IRP</div>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
                                {[
                                  { name: 'IRP 가입' },
                                  { name: '타사 IRP 가져오기' },
                                  { name: '타사 IRP 가져오기 조회/취소' }
                                ].map((item, idx) => (
                                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                    <span style={{ fontSize: '1.02rem', color: isDark ? '#cbd5e1' : '#222222', fontWeight: '500' }}>{item.name}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Drawer Bottom Action Footer */}
                        <div style={{
                          height: '48px',
                          backgroundColor: '#000000',
                          display: 'flex',
                          alignItems: 'stretch',
                          color: '#ffffff',
                          fontSize: '0.78rem',
                          fontWeight: '700',
                          borderTop: '1px solid rgba(255, 255, 255, 0.15)'
                        }}>
                          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer', borderRight: '1px solid rgba(255, 255, 255, 0.15)' }}>
                            {/* Customer Support Power/Phone Icon */}
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
                              <line x1="12" y1="2" x2="12" y2="12" />
                            </svg>
                            <span>고객지원</span>
                          </div>
                          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer', borderRight: '1px solid rgba(255, 255, 255, 0.15)' }}>
                            <span>이벤트</span>
                          </div>
                          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer', borderRight: '1px solid rgba(255, 255, 255, 0.15)' }}>
                            <span>업무/거래신청</span>
                          </div>
                          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}>
                            <span>인증/OTP</span>
                          </div>
                        </div>
                      </>
                    ) : asIsSubScreen === 'stockSearch' ? (
                      <AsIsStockSearchView setAsIsSubScreen={setAsIsSubScreen} isDark={isDark} searchQuery={asisSearchQuery} setSearchQuery={setAsisSearchQuery} />
                    ) : (
                      <PhoneEmulator
                        isToBe={false}
                        isDark={isDark}
                        accountBalance={accountBalance}
                        setAccountBalance={setAccountBalance}
                        addNotification={addNotification}
                        selectedStock={selectedStock}
                        setSelectedStock={setSelectedStock}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        activeBottomTab={activeBottomTab}
                        setActiveBottomTab={setActiveBottomTab}
                        showOrderPanel={showOrderPanel}
                        setShowOrderPanel={setShowOrderPanel}
                        orderType={orderType}
                        setOrderType={setOrderType}
                        orderPrice={orderPrice}
                        setOrderPrice={setOrderPrice}
                        orderQty={orderQty}
                        setOrderQty={setOrderQty}
                        stockSelectorOpen={stockSelectorOpen}
                        setStockSelectorOpen={setStockSelectorOpen}
                        onSearchClick={() => setAsIsSubScreen('stockSearch')}
                        onBackClick={() => setAsIsSubScreen('menu')}
                        hideFrame={true}
                      />
                    )}
                  </div>
              </div>

              {/* TO BE Search Emulator */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: '900',
                  color: isDark ? '#f8fafc' : '#0f172a',
                  backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                  padding: '8px 24px',
                  borderRadius: '99px',
                  letterSpacing: '1px',
                  border: '1px solid var(--border-color)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                }}>TO BE</div>
                
                <div style={{
                  ...styles.phoneMockup,
                  backgroundColor: isDark ? '#0b0f19' : '#fff',
                  width: '360px',
                  height: '800px',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative'
                }}>
                  {toBeSubScreen === 'etfMall' ? (
                    <ToBeEtfMallView setToBeSubScreen={setToBeSubScreen} isDark={isDark} isDrawerOpen={isDrawerOpen} setToBePrevSubScreen={setToBePrevSubScreen} etfMallNavMode={etfMallNavMode} setEtfMallNavMode={setEtfMallNavMode} activeMallTab={activeMallTab} setActiveMallTab={setActiveMallTab} ownedDisplayOption={ownedDisplayOption} setOwnedDisplayOption={setOwnedDisplayOption} ownedSortOption={ownedSortOption} setOwnedSortOption={setOwnedSortOption} isOwnedSortBsheetOpen={isOwnedSortBsheetOpen} setIsOwnedSortBsheetOpen={setIsOwnedSortBsheetOpen} isFavoriteBsheetOpen={isFavoriteBsheetOpen} setIsFavoriteBsheetOpen={setIsFavoriteBsheetOpen} searchQuery={tobeSearchQuery} setSearchQuery={setTobeSearchQuery} selectedChip={etfMallSelectedChip} setSelectedChip={setEtfMallSelectedChip} isPeriodBsheetOpen={isPeriodBsheetOpen} setIsPeriodBsheetOpen={setIsPeriodBsheetOpen} />
                  ) : toBeSubScreen === 'tigerDetail' ? (
                    <ToBeTigerDetailView setToBeSubScreen={setToBeSubScreen} isDark={isDark} setToBePrevSubScreen={setToBePrevSubScreen} isDrawerOpen={isDrawerOpen} setEtfMallNavMode={setEtfMallNavMode} />
                  ) : toBeSubScreen === 'stockSearch' ? (
                    <ToBeStockSearchView setToBeSubScreen={setToBeSubScreen} toBePrevSubScreen={toBePrevSubScreen} isDark={isDark} enteredViaEtfMall={enteredViaEtfMall} />
                  ) : (
                    <>
                      {/* Status Bar */}
                  <div style={{
                    ...styles.phoneHeaderBar,
                    backgroundColor: '#4750b3',
                    color: '#ffffff',
                    borderBottom: 'none'
                  }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: '700' }}>SKT 2:45</span>
                    <span style={{ fontSize: '0.65rem', fontWeight: '800' }}>12:30</span>
                  </div>

                  {/* Top user bar (French Blue Theme) */}
                  <div style={{
                    backgroundColor: '#4750b3',
                    padding: '16px 15px 12px 15px',
                    color: '#ffffff',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '1.2rem', fontWeight: '500' }}>김대신님</span>
                        <span style={{ 
                          display: 'inline-flex', 
                          alignItems: 'center', 
                          fontSize: '0.82rem', 
                          opacity: 0.9, 
                          cursor: 'pointer', 
                          gap: '2px', 
                          color: '#ffffff',
                          border: 'none',
                          padding: 0,
                          background: 'none'
                        }}>
                          내 정보
                          <svg width="6" height="10" viewBox="0 0 10 18" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: '2px' }}><polyline points="3 3 8 9 3 15" /></svg>
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        {/* Home White Icon */}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: 'pointer' }}>
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                          <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                        {/* Bell Icon with Red Dot */}
                        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                          </svg>
                          <span style={{ position: 'absolute', top: '2px', right: '2px', backgroundColor: '#de201e', width: '5px', height: '5px', borderRadius: '50%' }}></span>
                        </div>
                        {/* Settings Icon */}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: 'pointer' }}>
                          <circle cx="12" cy="12" r="3" />
                          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06-.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06-.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                        </svg>
                        {/* Close Icon */}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: 'pointer' }}>
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </div>
                    </div>

                    {/* Menu Search Bar */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: '#ffffff',
                      borderRadius: '4px',
                      padding: '8px 12px',
                      gap: '8px'
                    }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#888888" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                      <input
                        type="text"
                        placeholder="메뉴를 검색하세요."
                        disabled
                        style={{
                          border: 'none',
                          background: 'none',
                          outline: 'none',
                          width: '100%',
                          fontSize: '0.82rem',
                          fontWeight: '600'
                        }}
                      />
                    </div>
                  </div>

                  {/* Main Category Tabs */}
                  <div style={{
                    display: 'flex',
                    borderBottom: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0',
                    backgroundColor: isDark ? '#121826' : '#ffffff'
                  }}>
                    {['최근', '트레이딩', '상품', '연금', '자산/뱅킹'].map((tab) => {
                      const isSelected = tab === '연금';
                      return (
                        <div
                          key={tab}
                          style={{
                            flex: 1,
                            textAlign: 'center',
                            padding: '13px 0',
                            fontSize: '0.96rem',
                            fontWeight: '500',
                            color: isSelected ? '#4750b3' : (isDark ? '#cbd5e1' : '#888888'),
                            borderBottom: isSelected ? '3px solid #4750b3' : '3px solid transparent',
                            cursor: 'pointer'
                          }}
                        >
                          {tab}
                        </div>
                      );
                    })}
                  </div>

                  {/* Split Content Area (Left Side Menu / Right Main List) */}
                  <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>
                    {/* Left Submenu Navigation */}
                    <div style={{
                      width: '115px',
                      backgroundColor: isDark ? '#0f172a' : '#f1f3f5',
                      borderRight: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      paddingBottom: '12px',
                      boxSizing: 'border-box',
                      position: 'relative'
                    }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {[
                          { name: 'IRP/퇴직연금', active: true },
                          { name: '연금저축', active: false },
                          { name: '공지사항', active: false }
                        ].map((sub, idx) => (
                          <div
                            key={idx}
                            style={{
                              padding: '18px 12px',
                              fontSize: '0.96rem',
                              fontWeight: sub.active ? '800' : '500',
                              color: sub.active ? (isDark ? '#ffffff' : '#4750b3') : (isDark ? '#94a3b8' : '#777777'),
                              backgroundColor: sub.active ? (isDark ? '#121826' : '#ffffff') : 'transparent',
                              cursor: 'pointer'
                            }}
                          >
                            {sub.name}
                          </div>
                        ))}
                      </div>

                      {/* RIA Flag Banner Deleted */}
                    </div>

                    {/* Right Main Menu Items */}
                    <div style={{
                      flex: 1,
                      padding: '18px 16px',
                      overflowY: 'auto',
                      backgroundColor: isDark ? '#121826' : '#ffffff',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '24px',
                      boxSizing: 'border-box'
                    }}>
                      {/* Section 1: 자주 찾는 메뉴 */}
                      <div>
                        <div style={{ fontSize: '0.98rem', fontWeight: '800', color: '#4750b3', marginBottom: '16px' }}>자주 찾는 메뉴</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
                          {[
                            { name: '보유상품 현황' },
                            { name: 'ETF/리츠 잔고' },
                            { name: 'ETF/리츠 주문' },
                            { name: 'ETF/리츠 체결/미체결' },
                            { name: 'ETF/리츠 몰', isNewHighlight: true },
                            { name: '금융상품 매수' }
                          ].map((item, idx) => (
                            <div 
                              key={idx} 
                              onClick={() => {
                                if (item.name === 'ETF/리츠 몰') {
                                  setToBeSubScreen('etfMall');
                                  setEnteredViaEtfMall(true);
                                }
                              }}
                              style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                            >
                              <span style={{
                                fontSize: '1.02rem',
                                color: isDark ? '#cbd5e1' : '#222222',
                                fontWeight: '500'
                              }}>{item.name}</span>
                              {item.isNewHighlight && (
                                <span style={{
                                  backgroundColor: '#ffebeb',
                                  color: '#de201e',
                                  fontSize: '0.68rem',
                                  padding: '2px 8px',
                                  borderRadius: '10px',
                                  fontWeight: '900',
                                  fontStyle: 'italic',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  lineHeight: '1',
                                  letterSpacing: '-0.2px'
                                }}>
                                  NEW!
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Styled ISA Event Banner to fill space beautifully matching Zeplin */}
                      <div style={{
                        background: 'linear-gradient(135deg, #005a4c 0%, #009c84 100%)',
                        borderRadius: '6px',
                        padding: '12px 14px',
                        color: '#ffffff',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px',
                        position: 'relative',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.06)',
                        flexShrink: 0
                      }}>
                        <span style={{ fontSize: '0.92rem', fontWeight: '800', letterSpacing: '-0.3px' }}>ISA</span>
                        <span style={{ fontSize: '1.05rem', fontWeight: '900', letterSpacing: '-0.5px' }}>만기전환 이벤트</span>
                        <span style={{ fontSize: '0.72rem', opacity: 0.8, marginTop: '2px' }}>대신증권 연금저축</span>
                        {/* Decorative coins graphic */}
                        <div style={{ position: 'absolute', right: '10px', bottom: '6px', fontSize: '1.8rem', opacity: 0.85 }}>🪙</div>
                      </div>

                      {/* Section 2: IRP */}
                      <div style={{ paddingBottom: '12px' }}>
                        <div style={{ fontSize: '0.98rem', fontWeight: '800', color: '#4750b3', marginBottom: '16px' }}>IRP</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
                          {[
                            { name: 'IRP 가입' },
                            { name: '타사 IRP 가져오기' },
                            { name: '타사 IRP 가져오기 조회/취소' }
                          ].map((item, idx) => (
                            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                              <span style={{ fontSize: '1.02rem', color: isDark ? '#cbd5e1' : '#222222', fontWeight: '500' }}>{item.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Drawer Bottom Action Footer */}
                  <div style={{
                    height: '48px',
                    backgroundColor: '#000000',
                    display: 'flex',
                    alignItems: 'stretch',
                    color: '#ffffff',
                    fontSize: '0.78rem',
                    fontWeight: '700',
                    borderTop: '1px solid rgba(255, 255, 255, 0.15)'
                  }}>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer', borderRight: '1px solid rgba(255, 255, 255, 0.15)' }}>
                      {/* Customer Support Power/Phone Icon */}
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
                        <line x1="12" y1="2" x2="12" y2="12" />
                      </svg>
                      <span>고객지원</span>
                    </div>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer', borderRight: '1px solid rgba(255, 255, 255, 0.15)' }}>
                      <span>이벤트</span>
                    </div>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer', borderRight: '1px solid rgba(255, 255, 255, 0.15)' }}>
                      <span>업무/거래신청</span>
                    </div>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}>
                      <span>인증/OTP</span>
                    </div>
                  </div>
                  </>
                  )}
                </div>
              </div>
            </div>

            {/* Task Title */}
            <div style={{
              fontSize: '1.35rem',
              fontWeight: '600',
              color: isDark ? '#94a3b8' : '#475569',
              letterSpacing: '-0.5px',
              textAlign: 'center',
              opacity: 0.85,
              marginTop: '8px',
              wordBreak: 'keep-all'
            }}>
              ETF 주문화면 내 종목검색화면
            </div>
          </div>
        ) : activeScreen === 4 ? (
          /* Screen 4: 연금수령 신청 */
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '32px',
            flexShrink: 0
          }}>
            {/* Emulators Row */}
            <div style={{
              display: 'flex',
              gap: '60px',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: isFigmaExportMode ? 'flex-start' : 'center'
            }}>
              {/* AS IS Emulator */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: '900',
                  color: isDark ? '#f8fafc' : '#0f172a',
                  backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                  padding: '8px 24px',
                  borderRadius: '99px',
                  letterSpacing: '1px',
                  border: '1px solid var(--border-color)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                }}>AS IS</div>
                <div style={{
                  ...styles.phoneMockup,
                  backgroundColor: isDark ? '#0b0f19' : '#fff',
                  width: '360px',
                  height: isFigmaExportMode ? 'auto' : '800px',
                  overflow: isFigmaExportMode ? 'visible' : 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative'
                }}>
                  {asIsScreen4SubScreen === 'menu' ? (
                    <>
                      {/* Status Bar */}
                      <div style={{
                        ...styles.phoneHeaderBar,
                        backgroundColor: '#4750b3',
                        color: '#ffffff',
                        borderBottom: 'none'
                      }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: '700' }}>SKT 2:45</span>
                        <span style={{ fontSize: '0.65rem', fontWeight: '800' }}>12:30</span>
                      </div>

                      {/* Top user bar */}
                      <div style={{
                        backgroundColor: '#4750b3',
                        padding: '16px 15px 12px 15px',
                        color: '#ffffff',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '1.2rem', fontWeight: '500' }}>김대신님</span>
                            <span style={{ 
                              display: 'inline-flex', 
                              alignItems: 'center', 
                              fontSize: '0.82rem', 
                              opacity: 0.9, 
                              cursor: 'pointer', 
                              gap: '2px', 
                              color: '#ffffff',
                              border: 'none',
                              padding: 0,
                              background: 'none'
                            }}>
                              내 정보
                              <svg width="6" height="10" viewBox="0 0 10 18" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: '2px' }}><polyline points="3 3 8 9 3 15" /></svg>
                            </span>
                          </div>
                          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                            {/* Home Icon */}
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: 'pointer' }}>
                              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                              <polyline points="9 22 9 12 15 12 15 22" />
                            </svg>
                            {/* Bell Icon */}
                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                              </svg>
                              <span style={{ position: 'absolute', top: '2px', right: '2px', backgroundColor: '#de201e', width: '5px', height: '5px', borderRadius: '50%' }}></span>
                            </div>
                            {/* Settings Icon */}
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: 'pointer' }}>
                              <circle cx="12" cy="12" r="3" />
                              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06-.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                            </svg>
                            {/* Close Icon */}
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: 'pointer' }}>
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                          </div>
                        </div>

                        {/* Search Bar */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          backgroundColor: '#f1f3f5',
                          borderRadius: '4px',
                          padding: '8px 12px',
                          gap: '8px'
                        }}>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#888888" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                          <input
                            type="text"
                            placeholder="메뉴를 검색하세요."
                            disabled
                            style={{
                              border: 'none',
                              background: 'none',
                              outline: 'none',
                              width: '100%',
                              fontSize: '0.82rem',
                              fontWeight: '600'
                            }}
                          />
                        </div>
                      </div>

                      {/* Main Category Tabs */}
                      <div style={{
                        display: 'flex',
                        borderBottom: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0',
                        backgroundColor: isDark ? '#121826' : '#ffffff'
                      }}>
                        {['최근', '트레이딩', '상품', '연금', '자산/뱅킹'].map((tab) => {
                          const isSelected = tab === '연금';
                          return (
                            <div
                              key={tab}
                              style={{
                                flex: 1,
                                textAlign: 'center',
                                padding: '13px 0',
                                fontSize: '0.96rem',
                                fontWeight: '500',
                                color: isSelected ? '#3b5bdb' : (isDark ? '#cbd5e1' : '#888888'),
                                borderBottom: isSelected ? '3px solid #3b5bdb' : '3px solid transparent',
                                cursor: 'pointer'
                              }}
                            >
                              {tab}
                            </div>
                          );
                        })}
                      </div>

                      {/* Split Content Area (Left LNB / Right List) */}
                      <div style={{ flex: isFigmaExportMode ? 'none' : 1, display: 'flex', overflow: isFigmaExportMode ? 'visible' : 'hidden', position: 'relative' }}>
                        {/* Left Submenu Navigation */}
                        <div style={{
                          width: '115px',
                          backgroundColor: isDark ? '#0f172a' : '#f1f3f5',
                          borderRight: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          paddingBottom: '12px',
                          boxSizing: 'border-box',
                          position: 'relative'
                        }}>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {[
                              { name: 'IRP/퇴직연금' },
                              { name: '연금저축' },
                              { name: '공지사항' }
                            ].map((sub, idx) => {
                              const isSelected = sub.name === asIsSelectedMenuCategory;
                              return (
                                <div
                                  key={idx}
                                  onClick={() => setAsIsSelectedMenuCategory(sub.name)}
                                  style={{
                                    padding: '18px 12px',
                                    fontSize: '0.96rem',
                                    fontWeight: '500',
                                    color: isSelected ? (isDark ? '#ffffff' : '#3b5bdb') : (isDark ? '#94a3b8' : '#777777'),
                                    backgroundColor: isSelected ? (isDark ? '#121826' : '#ffffff') : 'transparent',
                                    cursor: 'pointer'
                                  }}
                                >
                                  {sub.name}
                                </div>
                              );
                            })}
                          </div>

                          {/* RIA Flag Banner Deleted */}
                        </div>

                        {/* Right Main Menu Items */}
                        <div style={{
                          flex: isFigmaExportMode ? 'none' : 1,
                          padding: '18px 16px',
                          overflowY: isFigmaExportMode ? 'visible' : 'auto',
                          backgroundColor: isDark ? '#121826' : '#ffffff',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '20px',
                          boxSizing: 'border-box'
                        }}>
                           {asIsSelectedMenuCategory === 'IRP/퇴직연금' ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                              {/* 상품 매매 */}
                              <div style={{ borderBottom: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0', paddingBottom: '20px' }}>
                                <div style={{ fontSize: '0.98rem', fontWeight: '800', color: '#3b5bdb', marginBottom: '12px' }}>상품 매매</div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                  <div style={{ fontSize: '1.02rem', color: isDark ? '#cbd5e1' : '#222222', fontWeight: '500' }}>ELB 청약예약</div>
                                </div>
                              </div>

                              {/* 연금세금 */}
                              <div style={{ borderBottom: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0', paddingBottom: '20px' }}>
                                <div style={{ fontSize: '0.98rem', fontWeight: '800', color: '#3b5bdb', marginBottom: '12px' }}>연금세금</div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                  <div style={{ fontSize: '1.02rem', color: isDark ? '#cbd5e1' : '#222222', fontWeight: '500' }}>예상세금 계산기</div>
                                  <div style={{ fontSize: '1.02rem', color: isDark ? '#cbd5e1' : '#222222', fontWeight: '500' }}>예상퇴직소득세 계산기</div>
                                  <div 
                                    onClick={() => {
                                      setAsIsScreen4SubScreen('simulation');
                                      setAsisSimulationStep('main');
                                    }}
                                    style={{ fontSize: '1.02rem', color: isDark ? '#cbd5e1' : '#222222', fontWeight: '500', cursor: 'pointer' }}
                                  >
                                    연금개시 시뮬레이션
                                  </div>
                                </div>
                              </div>

                              {/* IRP 관리 */}
                              <div>
                                <div style={{ fontSize: '0.98rem', fontWeight: '800', color: '#3b5bdb', marginBottom: '12px' }}>IRP 관리</div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                  <div 
                                    onClick={() => setAsIsScreen4SubScreen('requestForm')}
                                    style={{ fontSize: '1.02rem', color: isDark ? '#cbd5e1' : '#222222', fontWeight: '500', cursor: 'pointer' }}
                                  >
                                    연금수령 신청
                                  </div>
                                  <div style={{ fontSize: '1.02rem', color: isDark ? '#cbd5e1' : '#222222', fontWeight: '500' }}>연금수령 신청 조회/취소</div>
                                  <div style={{ fontSize: '1.02rem', color: isDark ? '#cbd5e1' : '#222222', fontWeight: '500' }}>연금수령 현황</div>
                                  <div style={{ fontSize: '1.02rem', color: isDark ? '#cbd5e1' : '#222222', fontWeight: '500' }}>IRP 해지신청</div>
                                  <div style={{ fontSize: '1.02rem', color: isDark ? '#cbd5e1' : '#222222', fontWeight: '500' }}>IRP 해지신청 조회/취소</div>
                                </div>
                              </div>
                            </div>
                          ) : asIsSelectedMenuCategory === '연금저축' ? (
                            <div>
                              <div style={{ fontSize: '0.98rem', fontWeight: '800', color: '#3b5bdb', marginBottom: '12px' }}>연금저축</div>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', opacity: 0.6 }}>
                                <div style={{ fontSize: '1.02rem', color: isDark ? '#cbd5e1' : '#222222', fontWeight: '500' }}>연금저축 가입</div>
                                <div style={{ fontSize: '1.02rem', color: isDark ? '#cbd5e1' : '#222222', fontWeight: '500' }}>타사 연금저축 가져오기</div>
                                <div style={{ fontSize: '1.02rem', color: isDark ? '#cbd5e1' : '#222222', fontWeight: '500' }}>연금저축 보유잔고</div>
                              </div>
                            </div>
                          ) : (
                            <div style={{ fontSize: '0.92rem', color: '#999', textAlign: 'center', marginTop: '40px' }}>
                              공지사항이 없습니다.
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Drawer Bottom Action Footer */}
                      <div style={{
                        height: '48px',
                        backgroundColor: '#000000',
                        display: 'flex',
                        alignItems: 'stretch',
                        color: '#ffffff',
                        fontSize: '0.78rem',
                        fontWeight: '700',
                        borderTop: '1px solid rgba(255, 255, 255, 0.15)'
                      }}>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer', borderRight: '1px solid rgba(255, 255, 255, 0.15)' }}>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
                            <line x1="12" y1="2" x2="12" y2="12" />
                          </svg>
                          <span>고객지원</span>
                        </div>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer', borderRight: '1px solid rgba(255, 255, 255, 0.15)' }}>
                          <span>이벤트</span>
                        </div>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer', borderRight: '1px solid rgba(255, 255, 255, 0.15)' }}>
                          <span>업무/거래신청</span>
                        </div>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}>
                          <span>인증/OTP</span>
                        </div>
                      </div>
                    </>
                  ) : asIsScreen4SubScreen === 'simulation' ? (
                    <PensionSimulationView 
                      isDark={isDark} 
                      isToBe={false} 
                      step={asisSimulationStep}
                      setStep={setAsisSimulationStep}
                      onBackClick={() => setAsIsScreen4SubScreen('menu')} 
                    />
                  ) : (
                    <PensionReceiptRequestView 
                      isDark={isDark} 
                      isToBe={false}
                      isDrawerOpen={isDrawerOpen}
                      isFigmaExportMode={isFigmaExportMode}
                      onBackClick={() => setAsIsScreen4SubScreen('menu')} 
                    />
                  )}
                </div>
              </div>

              {/* TO BE Emulator */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: '900',
                  color: isDark ? '#f8fafc' : '#0f172a',
                  backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                  padding: '8px 24px',
                  borderRadius: '99px',
                  letterSpacing: '1px',
                  border: '1px solid var(--border-color)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                }}>TO BE</div>
                <div style={{
                  ...styles.phoneMockup,
                  backgroundColor: isDark ? '#0b0f19' : '#fff',
                  width: '360px',
                  height: isFigmaExportMode ? 'auto' : '800px',
                  overflow: isFigmaExportMode ? 'visible' : 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative'
                }}>
                  {screen4SubScreen === 'menu' ? (
                    <>
                      {/* Status Bar */}
                      <div style={{
                        ...styles.phoneHeaderBar,
                        backgroundColor: '#4750b3',
                        color: '#ffffff',
                        borderBottom: 'none'
                      }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: '700' }}>SKT 2:45</span>
                        <span style={{ fontSize: '0.65rem', fontWeight: '800' }}>12:30</span>
                      </div>

                      {/* Top user bar (French Blue Theme) */}
                      <div style={{
                        backgroundColor: '#4750b3',
                        padding: '16px 15px 12px 15px',
                        color: '#ffffff',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '1.2rem', fontWeight: '500' }}>김대신님</span>
                            <span style={{ 
                              display: 'inline-flex', 
                              alignItems: 'center', 
                              fontSize: '0.82rem', 
                              opacity: 0.9, 
                              cursor: 'pointer', 
                              gap: '2px', 
                              color: '#ffffff',
                              border: 'none',
                              padding: 0,
                              background: 'none'
                            }}>
                              내 정보
                              <svg width="6" height="10" viewBox="0 0 10 18" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: '2px' }}><polyline points="3 3 8 9 3 15" /></svg>
                            </span>
                          </div>
                          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                            {/* Home White Icon */}
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: 'pointer' }}>
                              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                              <polyline points="9 22 9 12 15 12 15 22" />
                            </svg>
                            {/* Bell Icon with Red Dot */}
                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                              </svg>
                              <span style={{ position: 'absolute', top: '2px', right: '2px', backgroundColor: '#de201e', width: '5px', height: '5px', borderRadius: '50%' }}></span>
                            </div>
                            {/* Settings Icon */}
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: 'pointer' }}>
                              <circle cx="12" cy="12" r="3" />
                              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06-.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                            </svg>
                            {/* Close Icon */}
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: 'pointer' }}>
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                          </div>
                        </div>

                        {/* Menu Search Bar */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          backgroundColor: '#ffffff',
                          borderRadius: '4px',
                          padding: '8px 12px',
                          gap: '8px'
                        }}>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#888888" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                          <input
                            type="text"
                            placeholder="메뉴를 검색하세요."
                            disabled
                            style={{
                              border: 'none',
                              background: 'none',
                              outline: 'none',
                              width: '100%',
                              fontSize: '0.82rem',
                              fontWeight: '600'
                            }}
                          />
                        </div>
                      </div>

                      {/* Main Category Tabs */}
                      <div style={{
                        display: 'flex',
                        borderBottom: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0',
                        backgroundColor: isDark ? '#121826' : '#ffffff'
                      }}>
                        {['최근', '트레이딩', '상품', '연금', '자산/뱅킹'].map((tab) => {
                          const isSelected = tab === '연금';
                          return (
                            <div
                              key={tab}
                              style={{
                                flex: 1,
                                textAlign: 'center',
                                padding: '13px 0',
                                fontSize: '0.96rem',
                                fontWeight: '500',
                                color: isSelected ? '#4750b3' : (isDark ? '#cbd5e1' : '#888888'),
                                borderBottom: isSelected ? '3px solid #4750b3' : '3px solid transparent',
                                cursor: 'pointer'
                              }}
                            >
                              {tab}
                            </div>
                          );
                        })}
                      </div>

                      {/* Split Content Area (Left Side Menu / Right Main List) */}
                      <div style={{ flex: isFigmaExportMode ? 'none' : 1, display: 'flex', overflow: isFigmaExportMode ? 'visible' : 'hidden', position: 'relative' }}>
                        {/* Left Submenu Navigation */}
                        <div style={{
                          width: '115px',
                          backgroundColor: isDark ? '#0f172a' : '#f1f3f5',
                          borderRight: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          paddingBottom: '12px',
                          boxSizing: 'border-box',
                          position: 'relative'
                        }}>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {[
                              { name: 'IRP/퇴직연금' },
                              { name: '연금저축' },
                              { name: '연금수령' },
                              { name: '공지사항' }
                            ].map((sub, idx) => {
                              const isSelected = sub.name === toBeSelectedMenuCategory;
                              return (
                                <div
                                  key={idx}
                                  style={{
                                    padding: '18px 12px',
                                    fontSize: '0.96rem',
                                    fontWeight: '500',
                                    color: isSelected ? (isDark ? '#ffffff' : '#4750b3') : (isDark ? '#94a3b8' : '#777777'),
                                    backgroundColor: isSelected ? (isDark ? '#121826' : '#ffffff') : 'transparent',
                                    cursor: 'default',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: '4px'
                                  }}
                                >
                                  <span>{sub.name}</span>
                                  {sub.name === '연금수령' && isDrawerOpen && (
                                    <span style={{
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      width: '18px',
                                      height: '18px',
                                      borderRadius: '50%',
                                      backgroundColor: '#00c3a5',
                                      color: '#ffffff',
                                      fontSize: '11px',
                                      fontWeight: 'bold',
                                      lineHeight: 1
                                    }}>1</span>
                                  )}
                                </div>
                              );
                            })}
                          </div>

                          {/* RIA Flag Banner Deleted */}
                        </div>

                        {/* Right Main Menu Items */}
                        <div style={{
                          flex: isFigmaExportMode ? 'none' : 1,
                          padding: '18px 16px',
                          overflowY: isFigmaExportMode ? 'visible' : 'auto',
                          backgroundColor: isDark ? '#121826' : '#ffffff',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '24px',
                          boxSizing: 'border-box'
                        }}>
                          {toBeSelectedMenuCategory === '연금저축' ? (
                            <>
                              {/* 1. 연금저축 */}
                              <div>
                                <div style={{ fontSize: '0.98rem', fontWeight: '800', color: '#4750b3', marginBottom: '16px' }}>연금저축</div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
                                  {[
                                    { name: '연금저축 가입' },
                                    { name: '타사 연금저축 가져오기' },
                                    { name: '연금펀드 자동매수 신청' }
                                  ].map((item, idx) => (
                                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                      <span style={{ fontSize: '1.02rem', color: isDark ? '#cbd5e1' : '#222222', fontWeight: '500' }}>{item.name}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* 2. MY 연금 */}
                              <div>
                                <div style={{ fontSize: '0.98rem', fontWeight: '800', color: '#4750b3', marginBottom: '16px' }}>MY 연금</div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
                                  {[
                                    { name: '연금저축 보유잔고' },
                                    { name: '연금저축 한도/기간 설정' },
                                    { name: '연금저축 출금' }
                                  ].map((item, idx) => (
                                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                      <span style={{ fontSize: '1.02rem', color: isDark ? '#cbd5e1' : '#222222', fontWeight: '500' }}>{item.name}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* 4. ETF/리츠 */}
                              <div>
                                <div style={{ fontSize: '0.98rem', fontWeight: '800', color: '#4750b3', marginBottom: '16px' }}>ETF/리츠</div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
                                  {[
                                    { name: 'ETF/리츠 잔고' },
                                    { name: 'ETF/리츠 주문' },
                                    { name: 'ETF/리츠 현재가' }
                                  ].map((item, idx) => (
                                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                      <span style={{ fontSize: '1.02rem', color: isDark ? '#cbd5e1' : '#222222', fontWeight: '500' }}>{item.name}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </>
                          ) : toBeSelectedMenuCategory === '연금수령' ? (
                            <>
                              <div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
                              {[
                                { name: '연금수령 신청' },
                                { name: '연금수령 신청 조회/취소' },
                                { name: '연금수령 현황' },
                                { name: '연금개시 시뮬레이션' },
                              ].map((item, idx) => (
                                <div 
                                  key={idx} 
                                  onClick={() => {
                                    if (item.name === '연금수령 신청') {
                                      setScreen4SubScreen('requestForm');
                                    } else if (item.name === '연금수령 현황') {
                                      setScreen4SubScreen('status');
                                    } else if (item.name === '연금개시 시뮬레이션') {
                                      setScreen4SubScreen('simulation');
                                      setAsisSimulationStep('main');
                                    }
                                  }}
                                  style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                                >
                                  <span style={{ fontSize: '1.02rem', color: isDark ? '#cbd5e1' : '#222222', fontWeight: '500' }}>{item.name}</span>
                                </div>
                              ))}
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <div style={{ fontSize: '0.98rem', fontWeight: '800', color: '#4750b3', marginBottom: '16px' }}>IRP</div>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
                                {[
                                  { name: 'IRP 가입' },
                                  { name: '타사 IRP 가져오기' },
                                  { name: '타사 IRP 가져오기 조회/취소' }
                                ].map((item, idx) => (
                                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                    <span style={{ fontSize: '1.02rem', color: isDark ? '#cbd5e1' : '#222222', fontWeight: '500' }}>{item.name}</span>
                                  </div>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Drawer Bottom Action Footer */}
                      <div style={{
                        height: '48px',
                        backgroundColor: '#000000',
                        display: 'flex',
                        alignItems: 'stretch',
                        color: '#ffffff',
                        fontSize: '0.78rem',
                        fontWeight: '700',
                        borderTop: '1px solid rgba(255, 255, 255, 0.15)'
                      }}>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer', borderRight: '1px solid rgba(255, 255, 255, 0.15)' }}>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
                            <line x1="12" y1="2" x2="12" y2="12" />
                          </svg>
                          <span>고객지원</span>
                        </div>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer', borderRight: '1px solid rgba(255, 255, 255, 0.15)' }}>
                          <span>이벤트</span>
                        </div>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer', borderRight: '1px solid rgba(255, 255, 255, 0.15)' }}>
                          <span>업무/거래신청</span>
                        </div>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}>
                          <span>인증/OTP</span>
                        </div>
                      </div>
                    </>
                  ) : screen4SubScreen === 'status' ? (
                    <PensionReceiptStatusView 
                      isDark={isDark} 
                      isToBe={true} 
                      activeTab={statusActiveTab}
                      setActiveTab={setStatusActiveTab}
                      viewMode={statusViewMode}
                      setViewMode={setStatusViewMode}
                      selectedItem={statusSelectedItem}
                      setSelectedItem={setStatusSelectedItem}
                      onBackClick={() => setScreen4SubScreen('menu')} 
                    />
                  ) : screen4SubScreen === 'simulation' ? (
                    <PensionSimulationView 
                      isDark={isDark} 
                      isToBe={true}
                      step={asisSimulationStep}
                      setStep={setAsisSimulationStep}
                      onBackClick={() => setScreen4SubScreen('menu')} 
                    />
                  ) : (
                    <PensionReceiptRequestView 
                      isDark={isDark} 
                      isToBe={true} 
                      isDrawerOpen={isDrawerOpen}
                      isFigmaExportMode={isFigmaExportMode}
                      onBackClick={() => setScreen4SubScreen('menu')} 
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Task Title */}
            <div style={{
              fontSize: '1.35rem',
              fontWeight: '600',
              color: isDark ? '#94a3b8' : '#475569',
              letterSpacing: '-0.5px',
              textAlign: 'center',
              opacity: 0.85,
              marginTop: '8px',
              wordBreak: 'keep-all'
            }}>
              연금수령 신청
            </div>
          </div>
        ) : activeScreen === 5 ? (
          /* Screen 5: 장내 채권 매매 시스템 메뉴 (AS IS, TO BE 모두 6페이지 TO BE 메뉴화면) */
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '32px',
            flexShrink: 0
          }}>
            {/* Emulators Row */}
            <div style={{
              display: 'flex',
              gap: '60px',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              {/* AS IS Emulator */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: '900',
                  color: isDark ? '#f8fafc' : '#0f172a',
                  backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                  padding: '8px 24px',
                  borderRadius: '99px',
                  letterSpacing: '1px',
                  border: '1px solid var(--border-color)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                }}>AS IS</div>
                <div style={{
                  ...styles.phoneMockup,
                  backgroundColor: isDark ? '#0b0f19' : '#fff',
                  width: '360px',
                  height: isFigmaExportMode ? 'auto' : '800px',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  borderRadius: '0px',
                  overflow: isFigmaExportMode ? 'visible' : 'hidden'
                }}>
                  {renderScreen6ToBeMenu(true, false)}
                </div>
              </div>

              {/* TO BE Emulator */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: '900',
                  color: isDark ? '#f8fafc' : '#0f172a',
                  backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                  padding: '8px 24px',
                  borderRadius: '99px',
                  letterSpacing: '1px',
                  border: '1px solid var(--border-color)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                }}>TO BE</div>
                <div style={{
                  ...styles.phoneMockup,
                  backgroundColor: isDark ? '#0b0f19' : '#fff',
                  width: '360px',
                  height: isFigmaExportMode ? 'auto' : '800px',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  borderRadius: '0px',
                  overflow: isFigmaExportMode ? 'visible' : 'hidden'
                }}>
                  {screen5ToBeSubScreen === 'invest' ? renderScreen5ToBeInvest() : renderScreen6ToBeMenu(true, true)}
                </div>
              </div>
            </div>

            {/* Task Title */}
            <div style={{
              fontSize: '1.35rem',
              fontWeight: '600',
              color: isDark ? '#94a3b8' : '#475569',
              letterSpacing: '-0.5px',
              textAlign: 'center',
              opacity: 0.85,
              marginTop: '8px',
              wordBreak: 'keep-all'
            }}>
              연금저축 펀드분할매수 시스템
            </div>
          </div>
        ) : activeScreen === 6 ? (
          /* Screen 6: 장내 채권 매매 시스템 */
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '32px',
            flexShrink: 0
          }}>
            {/* Emulators Row */}
            <div style={{
              display: 'flex',
              gap: '60px',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              {/* AS IS Emulator */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: '900',
                  color: isDark ? '#f8fafc' : '#0f172a',
                  backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                  padding: '8px 24px',
                  borderRadius: '99px',
                  letterSpacing: '1px',
                  border: '1px solid var(--border-color)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                }}>AS IS</div>
                <div style={{
                  ...styles.phoneMockup,
                  backgroundColor: isDark ? '#0b0f19' : '#fff',
                  width: '360px',
                  height: isFigmaExportMode ? 'auto' : '800px',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  borderRadius: '0px',
                  overflow: isFigmaExportMode ? 'visible' : 'hidden'
                }}>
                  {screen6AsIsSearchOpen ? (
                    renderScreen6Search('asis', () => setScreen6AsIsSearchOpen(false))
                  ) : (
                    <>
                      {renderScreen6AsIs(false)}
                      {renderScreen6Bsheet('asis')}
                      {screen6AsIsUnexecutedOpen && renderScreen6UnexecutedPopup('asis', () => setScreen6AsIsUnexecutedOpen(false))}
                    </>
                  )}
                </div>
              </div>

              {/* TO BE Emulator */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: '900',
                    color: isDark ? '#f8fafc' : '#0f172a',
                    backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                    padding: '8px 24px',
                    borderRadius: '99px',
                    letterSpacing: '1px',
                    border: '1px solid var(--border-color)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                  }}>TO BE</div>
                  
                  {/* Premium Switch (On/Off) */}
                  <div 
                    onClick={() => {
                      const nextSwitch = !screen6ToBeSwitchOn;
                      setScreen6ToBeSwitchOn(nextSwitch);
                      if (nextSwitch) {
                        // Switch to TO BE: sync to tobe subscreen
                        if (screen6AsIsSubScreen === 'bondCurrentPrice' || screen6AsIsSubScreen === 'bondOrder') {
                          setScreen6ToBeSubScreen(screen6AsIsSubScreen);
                        }
                      } else {
                        // Switch to AS IS: sync to asis subscreen
                        if (screen6ToBeSubScreen === 'bondCurrentPrice' || screen6ToBeSubScreen === 'bondOrder') {
                          setScreen6AsIsSubScreen(screen6ToBeSubScreen);
                        }
                      }
                    }}
                    style={{
                      width: '60px',
                      height: '28px',
                      borderRadius: '14px',
                      backgroundColor: screen6ToBeSwitchOn ? '#00c3a5' : '#cbd5e1',
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '2px',
                      boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.15)'
                    }}
                  >
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: '#ffffff',
                      position: 'absolute',
                      left: screen6ToBeSwitchOn ? '34px' : '2px',
                      transition: 'left 0.2s',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '9px',
                      fontWeight: 'bold',
                      color: screen6ToBeSwitchOn ? '#00c3a5' : '#64748b'
                    }}>
                      {screen6ToBeSwitchOn ? 'ON' : 'OFF'}
                    </div>
                  </div>
                </div>
                <div style={{
                  ...styles.phoneMockup,
                  backgroundColor: isDark ? '#0b0f19' : '#fff',
                  width: '360px',
                  height: isFigmaExportMode ? 'auto' : '800px',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  borderRadius: '0px',
                  overflow: isFigmaExportMode ? 'visible' : 'hidden'
                }}>
                  {screen6ToBeSearchOpen ? (
                    renderScreen6Search('tobe', () => setScreen6ToBeSearchOpen(false))
                  ) : !screen6ToBeSwitchOn ? (
                    (() => {
                      // Dynamically sync subscreen to AS IS renderer
                      const originalAsIsScreen = screen6AsIsSubScreen;
                      // Temporarily match screen6AsIsSubScreen to screen6ToBeSubScreen to render the active page
                      return (
                        <>
                          {renderScreen6AsIs(true)}
                          {renderScreen6Bsheet('tobe')}
                          {screen6ToBeUnexecutedOpen && renderScreen6UnexecutedPopup('tobe', () => setScreen6ToBeUnexecutedOpen(false))}
              {screen6ToBeHoldBalancePopupOpen && renderScreen6HoldBalancePopup(() => setScreen6ToBeHoldBalancePopupOpen(false))}
              {screen6ToBeNoPlanModalOpen && renderScreen6ToBeNoPlanModal()}
                        </>
                      );
                    })()
                  ) : screen6ToBeSubScreen === 'bondCurrentPrice' ? (
                    <>
                      {/* Galaxy S20 Central Punch-hole Camera */}
                      <div style={styles.phoneCamera} />

                      {/* Phone Status Bar */}
                      <div style={styles.phoneHeaderBar}>
                        <span style={{ fontSize: '0.75rem', fontWeight: '700', color: isDark ? '#94a3b8' : '#475569' }}>SKT 10:39</span>
                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.65rem', fontWeight: '800', color: isDark ? '#94a3b8' : '#333' }}>5G</span>
                          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1px', height: '10px' }}>
                            <div style={{ width: '2px', height: '3px', backgroundColor: isDark ? '#94a3b8' : '#333' }}></div>
                            <div style={{ width: '2px', height: '5px', backgroundColor: isDark ? '#94a3b8' : '#333' }}></div>
                            <div style={{ width: '2px', height: '7px', backgroundColor: isDark ? '#94a3b8' : '#333' }}></div>
                            <div style={{ width: '2px', height: '9px', backgroundColor: isDark ? '#94a3b8' : '#333' }}></div>
                          </div>
                          <div style={{
                            border: isDark ? '1px solid #94a3b8' : '1px solid #333',
                            borderRadius: '3px',
                            padding: '0px 3px',
                            fontSize: '0.62rem',
                            fontWeight: '900',
                            height: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: isDark ? '#94a3b8' : '#333',
                            color: isDark ? '#0b0f19' : '#fff',
                            lineHeight: 1
                          }}>
                            86
                          </div>
                        </div>
                      </div>

                      {/* TO BE Header Area */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        height: '46px',
                        padding: '0 12px',
                        borderBottom: '1px solid #e2e8f0',
                        backgroundColor: '#ffffff'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span 
                            onClick={() => setScreen6ToBeSubScreen('menu')}
                            style={{ fontSize: '1.2rem', cursor: 'pointer' }}
                          >
                            ☰
                          </span>
                          <span onClick={() => setScreen6ToBeSearchOpen(true)} style={{ fontSize: '1.2rem', cursor: 'pointer' }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.5"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                          </span>
                          <span style={{ fontWeight: '800', fontSize: '0.98rem', letterSpacing: '-0.3px', marginLeft: '4px' }}>삼척블루파워9</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ color: '#aaa', fontSize: '1.3rem', cursor: 'pointer', lineHeight: 1 }}>★</span>
                          <span style={{ color: '#333', fontSize: '1.1rem', cursor: 'pointer', fontWeight: 'bold', letterSpacing: '1px' }}>···</span>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2.2" style={{ cursor: 'pointer' }}><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
                        </div>
                      </div>

                      {/* Stock Info Bar */}
                      <div style={{ padding: '8px 12px', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', gap: '2px', borderBottom: '1px solid #f3f4f6' }}>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2px' }}>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              {/* Candle Icon */}
                              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '10px', height: '26px', position: 'relative' }}>
                                <div style={{ width: '2px', height: '26px', backgroundColor: '#de201e', position: 'absolute', top: 0, zIndex: 1 }} />
                                <div style={{ width: '8px', height: '16px', backgroundColor: '#de201e', position: 'relative', zIndex: 2 }} />
                              </div>
                              <span style={{ fontSize: '24px', fontWeight: '500', color: '#de201e', lineHeight: 1 }}>10,084.4</span>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '11px', color: '#de201e', fontWeight: '500', marginLeft: '6px' }}>
                                <span>▲ 19.4</span>
                                <span>(0.19%)</span>
                              </div>
                            </div>
                            <div style={{ display: 'flex', fontSize: '10px', color: '#888888', marginTop: '4px', paddingLeft: '1px' }}>
                              <span>288,505 <span style={{ color: '#de201e', marginLeft: '4px' }}>(96.30%)</span></span>
                            </div>
                          </div>
                          <div style={{ display: 'flex', gap: '4px' }}>
                            <button style={{ border: 'none', backgroundColor: '#2366ca', color: '#ffffff', fontSize: '11px', fontWeight: '700', padding: '8px 14px', borderRadius: '4px', cursor: 'pointer' }}>매도</button>
                            <button 
                              onClick={() => setScreen6ToBeSubScreen('bondOrder')}
                              style={{ border: 'none', backgroundColor: '#de201e', color: '#ffffff', fontSize: '11px', fontWeight: '700', padding: '8px 14px', borderRadius: '4px', cursor: 'pointer' }}
                            >
                              매수
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Sub Tabs */}
                      <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', backgroundColor: '#ffffff' }}>
                        {['호가', '상세', '시간', '일자', '호가현황'].map((tab, idx) => (
                          <div key={tab} style={{
                            flex: 1,
                            textAlign: 'center',
                            padding: '10px 0',
                            fontSize: '12px',
                            fontWeight: tab === '호가' ? '800' : '500',
                            color: tab === '호가' ? '#111111' : '#666666',
                            borderBottom: tab === '호가' ? '2.5px solid #111111' : '2.5px solid transparent',
                            cursor: 'pointer'
                          }}>{tab}</div>
                        ))}
                      </div>

                      {/* Content Body */}
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', fontSize: '11px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '370px', fontSize: '0.78rem', backgroundColor: '#ffffff' }}>
                          {/* Table Header */}
                          <div style={{
                            display: 'flex',
                            backgroundColor: '#f1f5f9',
                            borderBottom: '1px solid #e2e8f0',
                            height: '28px',
                            alignItems: 'center',
                            fontWeight: 'bold',
                            color: '#333333',
                            textAlign: 'center'
                          }}>
                            <div style={{ flex: 1 }}>수익률</div>
                            <div style={{ flex: 1.2 }}>매도잔량</div>
                            <div style={{ flex: 1.5 }}>호가</div>
                            <div style={{ flex: 1.5 }}>매수잔량</div>
                            <div style={{ flex: 1 }}>수익률</div>
                          </div>

                          {/* Table Body */}
                          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                            {/* Top Half (5 rows) */}
                            <div style={{ display: 'flex', height: '170px' }}>
                              {/* Left side columns 1 & 2: Ask Info (5 rows) */}
                              <div style={{ flex: 2.2, display: 'flex', flexDirection: 'column' }}>
                                {[
                                  { yield: '5.805%', qty: '20,000' },
                                  { yield: '5.806%', qty: '10,000' },
                                  { yield: '5.807%', qty: '19,780' },
                                  { yield: '5.918%', qty: '63,350' },
                                  { yield: '5.919%', qty: '14,000' }
                                ].map((item, idx) => (
                                  <div key={idx} style={{
                                    display: 'flex',
                                    height: '34px',
                                    alignItems: 'center',
                                    backgroundColor: '#f0f6ff',
                                    borderBottom: '1px solid #e8f0fe',
                                    borderRight: '1px solid #e8f0fe'
                                  }}>
                                    <div style={{ flex: 1, paddingLeft: '8px', color: '#de201e', fontWeight: '500' }}>{item.yield}</div>
                                    <div style={{ flex: 1.2, paddingRight: '8px', textAlign: 'right', color: '#334155', fontWeight: '500' }}>{item.qty}</div>
                                  </div>
                                ))}
                              </div>

                              {/* Middle column 3: Ask Prices (5 rows) */}
                              <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column' }}>
                                {[
                                  { price: '10,095.0', active: false },
                                  { price: '10,094.9', active: false },
                                  { price: '10,094.8', active: false },
                                  { price: '10,084.4', active: true },
                                  { price: '10,084.3', active: false }
                                ].map((item, idx) => (
                                  <div key={idx} style={{
                                    display: 'flex',
                                    height: '34px',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#f0f6ff',
                                    borderBottom: '1px solid #e8f0fe',
                                    borderRight: '1px solid #e8f0fe'
                                  }}>
                                    {item.active ? (
                                      <div style={{
                                        border: '2px solid #222222',
                                        padding: '1px 6px',
                                        fontWeight: 'bold',
                                        color: '#de201e',
                                        fontSize: '0.85rem'
                                      }}>{item.price}</div>
                                    ) : (
                                      <span style={{ color: '#de201e', fontWeight: 'bold', fontSize: '0.85rem' }}>{item.price}</span>
                                    )}
                                  </div>
                                ))}
                              </div>

                              {/* Right side columns 4 & 5: Spanned Info Panel (170px height) */}
                              <div style={{
                                flex: 2.5,
                                backgroundColor: '#ffffff',
                                borderBottom: '1px solid #e2e8f0',
                                padding: '6px 8px 6px 12px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                fontSize: '0.7rem',
                                color: '#475569',
                                fontWeight: '500'
                              }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>거래량</span><span style={{ fontWeight: 'bold', color: '#0f172a' }}>71,570</span></div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>전종</span><span style={{ fontWeight: 'bold', color: '#0f172a' }}>10,065.0</span></div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>시가</span><span style={{ fontWeight: 'bold', color: '#0f172a' }}>10,065.0</span></div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>고가</span><span style={{ fontWeight: 'bold', color: '#de201e' }}>10,084.4</span></div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>저가</span><span style={{ fontWeight: 'bold', color: '#0f172a' }}>10,065.0</span></div>
                                <div style={{ display: 'flex', justifyContent: 'flex-start' }}><span>주가</span></div>
                                <div style={{ display: 'flex', justifyContent: 'flex-start' }}><span>전환가</span></div>
                                <div style={{ display: 'flex', justifyContent: 'flex-start' }}><span>패리티</span></div>
                              </div>
                            </div>

                            {/* Bottom Half (5 rows) */}
                            <div style={{ display: 'flex', height: '170px' }}>
                              {/* Left side columns 1 & 2: Spanned Execution History Panel (170px height) */}
                              <div style={{
                                flex: 2.2,
                                backgroundColor: '#ffffff',
                                borderRight: '1px solid #e2e8f0',
                                padding: '4px 6px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                fontSize: '0.68rem',
                                fontWeight: '500'
                              }}>
                                {[
                                  { price: '10,084.4', qty: '10', color: '#de201e' },
                                  { price: '10,084.4', qty: '10', color: '#de201e' },
                                  { price: '10,084.4', qty: '1,340', color: '#de201e' },
                                  { price: '10,084.4', qty: '35,090', color: '#de201e' },
                                  { price: '10,084.4', qty: '200', color: '#de201e' },
                                  { price: '10,084.3', qty: '30,710', color: '#de201e' },
                                  { price: '10,065.0', qty: '3,000', color: '#334155' },
                                  { price: '10,065.0', qty: '1,210', color: '#334155' }
                                ].map((item, idx) => (
                                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '0 2px' }}>
                                    <span style={{ color: item.color }}>{item.price}</span>
                                    <span style={{ color: '#64748b' }}>{item.qty}</span>
                                  </div>
                                ))}
                              </div>

                              {/* Middle column 3: Bid Prices (5 rows) */}
                              <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column' }}>
                                {[
                                  { price: '10,066.0', color: '#de201e' },
                                  { price: '10,065.8', color: '#de201e' },
                                  { price: '10,065.7', color: '#de201e' },
                                  { price: '10,065.1', color: '#de201e' },
                                  { price: '10,065.0', color: '#0f172a' }
                                ].map((item, idx) => (
                                  <div key={idx} style={{
                                    display: 'flex',
                                    height: '34px',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#fff5f5',
                                    borderBottom: '1px solid #fdf2f2',
                                    borderRight: '1px solid #fdf2f2'
                                  }}>
                                    <span style={{ color: item.color, fontWeight: 'bold', fontSize: '0.85rem' }}>{item.price}</span>
                                  </div>
                                ))}
                              </div>

                              {/* Right side columns 4 & 5: Bid Info (5 rows) */}
                              <div style={{ flex: 2.5, display: 'flex', flexDirection: 'column' }}>
                                {[
                                  { qty: '2,320', yield: '6.113%' },
                                  { qty: '30,000', yield: '6.115%' },
                                  { qty: '100,000', yield: '6.117%' },
                                  { qty: '5,000', yield: '6.123%' },
                                  { qty: '37,800', yield: '6.124%' }
                                ].map((item, idx) => (
                                  <div key={idx} style={{
                                    display: 'flex',
                                    height: '34px',
                                    alignItems: 'center',
                                    backgroundColor: '#fff5f5',
                                    borderBottom: '1px solid #fdf2f2'
                                  }}>
                                    <div style={{ flex: 1.5, paddingLeft: '8px', color: '#334155', fontWeight: '500' }}>{item.qty}</div>
                                    <div style={{ flex: 1, paddingRight: '8px', textAlign: 'right', color: '#de201e', fontWeight: '500' }}>{item.yield}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Ticker values */}
                      <div style={{ display: 'flex', height: '24px', borderTop: '1px solid #e2e8f0', backgroundColor: '#ffffff', alignItems: 'center', fontSize: '10px', fontWeight: '700' }}>
                        <div style={{ flex: 1, textAlign: 'right', paddingRight: '12px', color: '#2366ca', borderRight: '1px solid #e2e8f0' }}>257,312</div>
                        <div style={{ flex: 1, textAlign: 'center', color: '#111111', borderRight: '1px solid #e2e8f0' }}>13:24</div>
                        <div style={{ flex: 1, textAlign: 'left', paddingLeft: '12px', color: '#de201e' }}>257,312</div>
                      </div>

                      {/* Footer Index */}
                      <div style={{ height: '24px', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px', borderTop: '1px solid #e2e8f0', fontSize: '0.72rem' }}>
                        <span style={{ fontWeight: '800' }}>KOSPI</span>
                        <span style={{ color: '#de201e', fontWeight: '800' }}>33,384.03 ▲ 23.14(1.19%)</span>
                      </div>

                      {/* Bottom tab menu bar */}
                      <div style={{
                        height: '44px',
                        display: 'flex',
                        alignItems: 'stretch',
                        borderTop: '1px solid #e2e8f0',
                        backgroundColor: '#ffffff'
                      }}>
                        {/* Home button */}
                        <button style={{ width: '48px', border: 'none', background: 'none', borderRight: '1px solid #f1f5f9', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ color: '#333' }}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                        </button>

                        {/* Middle text tabs */}
                        <div style={{ flex: 1, display: 'flex', alignItems: 'stretch' }}>
                          {[
                            { key: '장내채권 현재가', label: `장내채권\n투자하기` },
                            { key: '장내채권 잔고', label: `장내채권\n잔고` },
                            { key: '장외채권 매매', label: `장외채권\n매매` },
                            { key: '장외채권 잔고', label: `장외채권\n잔고` }
                          ].map((tab, idx) => {
                            const isSelected = tab.key === '장내채권 현재가';
                            return (
                              <button
                                key={tab.key}
                                onClick={() => {
                                  if (tab.key === '장내채권 현재가') {
                                    setScreen6ToBeSubScreen('bondCurrentPrice');
                                  } else if (tab.key === '장내채권 잔고') {
                                    setScreen6ToBeSubScreen('bondBalance');
                                  } else if (tab.key === '장외채권 매매') {
                                    setScreen6ToBeSubScreen('bondCalc');
                                  } else if (tab.key === '장외채권 잔고') {
                                    setScreen6ToBeSubScreen('bondBalance');
                                  }
                                }}
                                style={{
                                  flex: 1,
                                  border: 'none',
                                  background: 'none',
                                  borderRight: idx < 3 ? '1px solid #f1f5f9' : 'none',
                                  cursor: 'pointer',
                                  fontSize: '0.73rem',
                                  fontWeight: '500',
                                  color: isSelected ? '#4750b3' : '#333',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  textAlign: 'center',
                                  whiteSpace: 'pre-line',
                                  lineHeight: '1.2',
                                  padding: '2px 2px'
                                }}
                              >
                                {tab.label}
                              </button>
                            );
                          })}
                        </div>

                        {/* Back */}
                        <button 
                          onClick={() => setScreen6ToBeSubScreen('menu')}
                          style={{ width: '48px', border: 'none', background: 'none', borderLeft: '1px solid #f1f5f9', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ color: '#333' }}><path d="M9 14L4 9l5-5" /><path d="M4 9h10a5 5 0 0 1 5 5v5" /></svg>
                        </button>
                      </div>
                    </>
                  ) : screen6ToBeSubScreen === 'bondOrder' ? (
                    <>
                      {/* Galaxy S20 Central Punch-hole Camera */}
                      <div style={styles.phoneCamera} />

                      {/* Phone Status Bar */}
                      <div style={{
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0 12px',
                        fontSize: '11px',
                        fontWeight: '600',
                        color: '#333333',
                        backgroundColor: '#ffffff'
                      }}>
                        <span>12:30</span>
                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L16.35 6.22C15.15 4.19 13.73 3 12 3zm0 18c4.97 0 9-4.03 9-9 0-2.12-.74-4.07-1.97-5.61L7.65 17.78C8.85 19.81 10.27 21 12 21z"/></svg>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                        </div>
                      </div>

                      {/* Header Area */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        height: '46px',
                        padding: '0 12px',
                        borderBottom: '1px solid #e2e8f0',
                        backgroundColor: '#ffffff'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span 
                            onClick={() => setScreen6ToBeSubScreen('menu')}
                            style={{ fontSize: '1.2rem', cursor: 'pointer' }}
                          >
                            ☰
                          </span>
                          <span onClick={() => setScreen6ToBeSearchOpen(true)} style={{ fontSize: '1.2rem', cursor: 'pointer' }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.5"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                          </span>
                          <span style={{ fontWeight: '800', fontSize: '0.98rem', letterSpacing: '-0.3px', marginLeft: '4px' }}>삼척블루파워9</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ color: '#ccc', fontSize: '1.3rem', cursor: 'pointer', lineHeight: 1 }}>★</span>
                          <span style={{ color: '#333', fontSize: '1.1rem', cursor: 'pointer', fontWeight: 'bold', letterSpacing: '1px' }}>···</span>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2.2" style={{ cursor: 'pointer' }}><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
                        </div>
                      </div>

                      {/* Stock Info Bar */}
                      <div style={{ padding: '8px 12px', backgroundColor: '#ffffff', borderBottom: '1px solid #f3f4f6' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            {/* Candle Icon */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '10px', height: '26px', position: 'relative' }}>
                              <div style={{ width: '2px', height: '26px', backgroundColor: '#de201e', position: 'absolute', top: 0, zIndex: 1 }} />
                              <div style={{ width: '8px', height: '16px', backgroundColor: '#de201e', position: 'relative', zIndex: 2 }} />
                            </div>
                            <span style={{ fontSize: '24px', fontWeight: '500', color: '#de201e', lineHeight: 1 }}>10,084.4</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '11px', color: '#de201e', fontWeight: '500', marginLeft: '6px' }}>
                              <span>▲ 19.4</span>
                              <span>(0.19%)</span>
                            </div>
                            <span style={{ fontSize: '12px', color: '#888888', marginLeft: '4px' }}>:</span>
                          </div>
                          <button 
                            onClick={() => setScreen6ToBeSubScreen('bondCurrentPrice')}
                            style={{
                              border: '1px solid #cbd5e1',
                              backgroundColor: '#ffffff',
                              color: '#333333',
                              fontSize: '11px',
                              fontWeight: '600',
                              padding: '4px 10px',
                              borderRadius: '4px',
                              cursor: 'pointer'
                            }}
                          >
                            현재가
                          </button>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#888888', marginTop: '4px' }}>
                          <span>288,505 <span style={{ color: '#de201e' }}>(96.30%)</span></span>
                        </div>

                        {/* Account selection dropdown */}
                        <div 
                          onClick={() => setScreen6ToBeBsheetState('account')}
                          style={{
                            border: '1px solid #e2e8f0',
                            borderRadius: '6px',
                            padding: '8px 12px',
                            marginTop: '8px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: '#f8fafc',
                            cursor: 'pointer'
                          }}
                        >
                          <span style={{ fontSize: '12px', fontWeight: '600', color: '#333333' }}>{screen6ActiveAccount} 김대신</span>
                          <span style={{ fontSize: '10px', color: '#666666' }}>▼</span>
                        </div>
                      </div>

                      {/* Order Tabs */}
                      <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', backgroundColor: '#ffffff' }}>
                        {['매수', '매도', '정정/취소', '미체결/체결'].map((tab) => (
                          <div key={tab} onClick={() => setScreen6ToBeOrderTab(tab)} style={{
                            flex: 1,
                            textAlign: 'center',
                            padding: '12px 0',
                            fontSize: '12px',
                            fontWeight: '700',
                            color: tab === screen6ToBeOrderTab ? (tab === '매수' ? '#de201e' : tab === '매도' ? '#2563eb' : '#059669') : '#666666',
                            borderBottom: tab === screen6ToBeOrderTab ? `2.5px solid ${tab === '매수' ? '#de201e' : tab === '매도' ? '#2563eb' : '#059669'}` : 'none',
                            cursor: 'pointer'
                          }}>{tab}</div>
                        ))}
                      </div>

                      {/* Main split content */}
                      <div style={{ flex: 1, display: 'flex', backgroundColor: '#ffffff', overflow: 'hidden' }}>
                        {/* Left column: Orderbook (40%) */}
                        <div style={{ width: '40%', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', fontSize: '11px', height: '100%', overflowY: 'auto' }}>
                          {[
                            { price: '10,099.7', diff: '+0.34%', vol: '14,000', type: 'ask' },
                            { price: '10,095.0', diff: '+0.30%', vol: '20,000', type: 'ask' },
                            { price: '10,094.9', diff: '+0.30%', vol: '10,000', type: 'ask' },
                            { price: '10,094.8', diff: '+0.30%', vol: '19,780', type: 'ask' },
                            { price: '10,084.4', diff: '+0.19%', vol: '64,710', type: 'active' },
                            { price: '10,066.0', diff: '+0.01%', vol: '1,200', type: 'bid' },
                            { price: '10,065.8', diff: '+0.01%', vol: '30,000', type: 'bid' },
                            { price: '10,065.7', diff: '+0.01%', vol: '100,000', type: 'bid' },
                            { price: '10,065.1', diff: '+0.00%', vol: '25,000', type: 'bid' },
                            { price: '10,065.0', diff: '0.00%', vol: '37,800', type: 'bid_zero' }
                          ].map((row, idx) => {
                            let bg = '#ffffff';
                            let color = '#de201e';
                            if (row.type === 'ask') bg = '#f0f6ff';
                            else if (row.type === 'bid') bg = '#fff5f5';
                            else if (row.type === 'active') bg = '#e0f2fe';
                            else if (row.type === 'bid_zero') { bg = '#fff5f5'; color = '#111111'; }
                            return (
                              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 8px', borderBottom: '1px solid #f1f5f9', backgroundColor: bg, alignItems: 'center' }}>
                                <span style={{ fontWeight: '700', color: color }}>{row.price}</span>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', fontSize: '9px', color: color }}>
                                  <span>{row.diff}</span>
                                  <span style={{ color: '#4b5563' }}>{row.vol}</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Right column: Form (60%) */}
                        <div style={{ width: '60%', padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px', height: '100%', boxSizing: 'border-box' }}>
                          {/* Segmented Control */}
                          <div style={{
                            display: 'flex',
                            backgroundColor: '#f1f5f9',
                            borderRadius: '6px',
                            padding: '2px',
                            height: '36px',
                            boxSizing: 'border-box',
                            width: '100%'
                          }}>
                            {screen6ActiveAccount === '200-233354(43)' ? (
                              ['사용자', '가입자1', '가입자2'].map((tab) => {
                                const isSelected = screen6DepositTab === tab;
                                return (
                                  <div
                                    key={tab}
                                    onClick={() => setScreen6DepositTab(tab)}
                                    style={{
                                      flex: 1,
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      fontSize: '11px',
                                      fontWeight: isSelected ? '700' : '600',
                                      color: isSelected ? '#333333' : '#666666',
                                      backgroundColor: isSelected ? '#ffffff' : 'transparent',
                                      borderRadius: '4px',
                                      boxShadow: isSelected ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                                      cursor: 'pointer'
                                    }}
                                  >
                                    {tab}
                                  </div>
                                );
                              })
                            ) : (
                              ['고객납입금', '퇴직납입금'].map((tab) => {
                                const isSelected = screen6DepositTab === tab;
                                return (
                                  <div
                                    key={tab}
                                    onClick={() => setScreen6DepositTab(tab)}
                                    style={{
                                      flex: 1,
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      fontSize: '11px',
                                      fontWeight: isSelected ? '700' : '600',
                                      color: isSelected ? '#333333' : '#666666',
                                      backgroundColor: isSelected ? '#ffffff' : 'transparent',
                                      borderRadius: '4px',
                                      boxShadow: isSelected ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                                      cursor: 'pointer'
                                    }}
                                  >
                                    {tab}
                                  </div>
                                );
                              })
                            )}
                          </div>

                           {/* Order Form Content */}
                           {screen6ToBeOrderTab === '매도' ? (
                             <>
                               {/* 주문단위 */}
                               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#f1f5f9', padding: '8px 12px', fontSize: '12px' }}>
                                 <span style={{ color: '#333' }}>주문단위</span>
                                 <span style={{ fontWeight: '700' }}>10,000</span>
                               </div>
                               {/* 단가 */}
                               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #ccc', padding: '6px 0' }}>
                                 <span style={{ fontSize: '12px', color: '#333' }}>단가</span>
                                 <span style={{ fontSize: '12px', color: '#ccc' }}>단가 입력</span>
                               </div>
                               {/* 수량 */}
                               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #ccc', padding: '6px 0' }}>
                                 <span style={{ fontSize: '12px', color: '#333' }}>수량</span>
                                 <span style={{ fontSize: '12px', color: '#ccc' }}>수량 입력 <strong style={{ color: '#333' }}>원</strong></span>
                               </div>
                               {/* 드롭다운 그룹 (행간 일정하게 gap: 6px) */}
                               <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px' }}>
                                 {/* 날짜 선택 */}
                                 <div style={{
                                   border: '1px solid #cbd5e1', borderRadius: '2px', padding: '0 10px', fontSize: '12px',
                                   display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff', cursor: 'pointer',
                                   height: '36px', boxSizing: 'border-box'
                                 }}>
                                   <span>2026.07.10</span>
                                   <span style={{ fontSize: '8px', color: '#888' }}>▼</span>
                                 </div>
                                 {/* 잔고선택 & 보유잔고 */}
                                 <div style={{ display: 'flex', gap: '6px' }}>
                                   <div style={{
                                     flex: 1, border: '1px solid #cbd5e1', borderRadius: '2px', padding: '0 10px', fontSize: '12px',
                                     display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff', cursor: 'pointer',
                                     height: '36px', boxSizing: 'border-box'
                                   }}>
                                     <span>{screen6ToBeBalanceType}</span>
                                     <span style={{ fontSize: '8px', color: '#888' }}>▼</span>
                                   </div>
                                   <div 
                                      onClick={() => setScreen6ToBeHoldBalancePopupOpen(true)}
                                      style={{
                                        flex: 1, border: '1px solid #cbd5e1', borderRadius: '2px', padding: '0 10px', fontSize: '12px',
                                        display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff', cursor: 'pointer',
                                        height: '36px', boxSizing: 'border-box'
                                      }}
                                    >
                                      <span>{screen6ToBeHoldBalanceType}</span>
                                      <span style={{ fontSize: '8px', color: '#888' }}>▼</span>
                                    </div>
                                 </div>
                                 {/* 과세선택 */}
                                 <div style={{
                                   border: '1px solid #cbd5e1', borderRadius: '2px', padding: '0 10px', fontSize: '12px',
                                   display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff', cursor: 'pointer',
                                   height: '36px', boxSizing: 'border-box'
                                 }}>
                                   <span>과세선택</span>
                                   <span style={{ fontSize: '8px', color: '#888' }}>▼</span>
                                 </div>
                               </div>
                             </>
                           ) : screen6ToBeOrderTab === '정정/취소' ? (
                              <>
                                <div onClick={() => setScreen6ToBeUnexecutedOpen(true)} style={{
                                 border: '1px solid #cbd5e1',
                                 borderRadius: '2px',
                                 padding: '4px 8px',
                                 fontSize: '11px',
                                 display: 'flex',
                                 justifyContent: 'space-between',
                                 alignItems: 'center',
                                 backgroundColor: '#ffffff',
                                 cursor: 'pointer',
                                 height: '28px',
                                 boxSizing: 'border-box'
                               }}>
                                 <span style={{ color: '#333' }}>미체결내역</span>
                                 <span style={{ fontSize: '8px', color: '#888' }}>▼</span>
                               </div>
                               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                 <span style={{ fontSize: '12px', color: '#333' }}>단가</span>
                                 <div style={{ borderBottom: '1px solid #cbd5e1', padding: '4px 0', fontSize: '12px', width: '120px', textAlign: 'right', color: '#ccc' }}>단가 입력</div>
                                </div>
                               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                 <span style={{ fontSize: '12px', color: '#333' }}>수량</span>
                                 <div style={{ borderBottom: '1px solid #cbd5e1', padding: '4px 0', fontSize: '12px', width: '120px', textAlign: 'right', color: '#ccc' }}>수량 입력</div>
                               </div>
                             </>
                           ) : (
                             <>
                               {/* Order Unit instead of Dropdown */}
                               <div style={{
                                 display: 'flex',
                                 alignItems: 'center',
                                 justifyContent: 'space-between',
                                 border: '1px solid #cbd5e1',
                                 borderRadius: '4px',
                                 padding: '0 10px',
                                 height: '36px',
                                 boxSizing: 'border-box',
                                 fontSize: '12px',
                                 color: '#333333',
                                 backgroundColor: '#f8fafc'
                               }}>
                                 <span style={{ fontWeight: '500', color: '#666666' }}>주문단위</span>
                                 <span style={{ fontWeight: '700', color: '#333333' }}>10,000</span>
                               </div>

                               {/* Price input */}
                               <div style={{
                                 display: 'flex',
                                 alignItems: 'stretch',
                                 border: '1px solid #fca5a5',
                                 backgroundColor: '#fff5f5',
                                 borderRadius: '4px',
                                 height: '36px',
                                 boxSizing: 'border-box',
                                 overflow: 'hidden'
                               }}>
                                 <button style={{ border: 'none', background: 'none', width: '32px', fontSize: '16px', fontWeight: 'bold', color: '#333333', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>-</button>
                                 <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 'bold', color: '#333333' }}>10,065원</div>
                                 <button style={{ border: 'none', background: 'none', width: '32px', fontSize: '16px', fontWeight: 'bold', color: '#333333', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                               </div>

                               {/* Quantity input */}
                               <div style={{
                                 display: 'flex',
                                 alignItems: 'stretch',
                                 border: '1px solid #cbd5e1',
                                 borderRadius: '4px',
                                 height: '36px',
                                 boxSizing: 'border-box',
                                 overflow: 'hidden'
                               }}>
                                 <button style={{ border: 'none', background: 'none', width: '32px', fontSize: '16px', fontWeight: 'bold', color: '#333333', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>-</button>
                                 <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#94a3b8' }}>수량 입력</div>
                                 <button style={{ border: 'none', background: 'none', width: '32px', fontSize: '16px', fontWeight: 'bold', color: '#333333', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                               </div>

                               {/* Max button */}
                               <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                 <button style={{
                                   border: '1px solid #cbd5e1',
                                   backgroundColor: '#ffffff',
                                   padding: '4px 16px',
                                   borderRadius: '4px',
                                   fontSize: '11px',
                                   color: '#333333',
                                   fontWeight: '600',
                                   cursor: 'pointer'
                                 }}>최대</button>
                               </div>
                             </>
                           )}

                          {/* Info rows */}
                          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 'auto' }}>
                            {screen6ToBeOrderTab !== '정정/취소' && screen6ToBeOrderTab !== '미체결/체결' && (
                              <>
                                {/* Row 1: 주문가능 금액 */}
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginBottom: '8px' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#666666' }}>
                                    <span>주문가능 금액</span>
                                    <span style={{ border: '1px solid #3b82f6', borderRadius: '50%', width: '12px', height: '12px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px', color: '#3b82f6', fontWeight: 'bold' }}>i</span>
                                  </div>
                                  <span style={{ fontSize: '14px', fontWeight: '700', color: '#111111', marginTop: '2px' }}>3,400,000원</span>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginBottom: '8px' }}>
                                  <div style={{ fontSize: '11px', color: '#666666' }}>위험자산 매수 가능 금액</div>
                                  <span style={{ fontSize: '14px', fontWeight: '700', color: '#111111', marginTop: '2px' }}>400,000원</span>
                                </div>

                                {/* Divider line */}
                                <div style={{ height: '1px', backgroundColor: '#e2e8f0', margin: '4px 0' }} />

                                {/* Row 3: 초기화 / 주문금액 */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '12px' }}>
                                  <span style={{ fontSize: '12px', color: '#666666', textDecoration: 'underline', cursor: 'pointer', paddingBottom: '4px' }}>초기화</span>
                                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                    <span style={{ fontSize: '11px', color: '#666666' }}>주문금액</span>
                                    <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#111111', marginTop: '2px' }}>0원</span>
                                  </div>
                                </div>
                              </>
                            )}

                            {/* Action Button */}
                            {screen6ToBeOrderTab === '정정/취소' ? (
                              <div style={{ display: 'flex', gap: '8px' }}>
                                <button onClick={() => {}} style={{ flex: 1, border: 'none', backgroundColor: '#de201e', color: '#ffffff', padding: '12px 0', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}>취소</button>
                                <button onClick={() => {}} style={{ flex: 1, border: 'none', backgroundColor: '#00b050', color: '#ffffff', padding: '12px 0', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}>정정</button>
                              </div>
                            ) : screen6ToBeOrderTab === '미체결/체결' ? null : (
                              <button onClick={() => {
                                if (screen6ActiveAccount === '200-233354(43)' && screen6ToBeOrderTab === '매수') {
                                  setScreen6CompanyBondModalOpen(true);
                                } else {
                                  setScreen6ToBeSubScreen('cautionAgreement');
                                }
                              }} style={{ width: '100%', border: 'none', backgroundColor: screen6ToBeOrderTab === '매도' ? '#2563eb' : '#de201e', color: '#ffffff', padding: '12px 0', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}>
                                {screen6ToBeOrderTab}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Footer Index */}
                      <div style={{ height: '24px', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px', borderTop: '1px solid #e2e8f0', fontSize: '0.72rem' }}>
                        <span style={{ fontWeight: '800' }}>KOSPI</span>
                        <span style={{ color: '#de201e', fontWeight: '800' }}>33,384.03 ▲ 23.14(1.19%)</span>
                      </div>

                      {/* Bottom tab menu bar */}
                      <div style={{
                        height: '44px',
                        display: 'flex',
                        alignItems: 'stretch',
                        borderTop: '1px solid #e2e8f0',
                        backgroundColor: '#ffffff'
                      }}>
                        {/* Home button */}
                        <button style={{ width: '48px', border: 'none', background: 'none', borderRight: '1px solid #f1f5f9', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ color: '#333' }}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                        </button>

                        {/* Middle text tabs */}
                        <div 
                          className="no-scrollbar" 
                          style={{ 
                            flex: 1, 
                            display: 'flex', 
                            alignItems: 'stretch', 
                            overflowX: 'auto' 
                          }}
                        >
                          {([
                            { key: '장내(외)채권 잔고', label: `장내(외)채권\n잔고` },
                            { key: '보유상품 현황', label: `보유상품\n현황` },
                            { key: '장외채권 매매', label: `장외채권\n매매` },
                            { key: 'ETF/리츠 주문', label: `ETF/리츠\n주문` },
                            { key: 'ETF/리츠 현재가', label: `ETF/리츠\n현재가` }
                          ]).map((tab, idx) => {
                            const isSelected = false;
                            const borderRightCount = 4;
                            return (
                              <button
                                key={tab.key}
                                onClick={() => {
                                  if (tab.key === '장내(외)채권 잔고') {
                                    setScreen6ToBeSubScreen('bondBalance');
                                  } else if (tab.key === 'ETF/리츠 주문') {
                                    setScreen6ToBeSubScreen('bondOrder');
                                  } else if (tab.key === 'ETF/리츠 현재가') {
                                    setScreen6ToBeSubScreen('bondCurrentPrice');
                                  } else if (tab.key === '장외채권 매매') {
                                    setScreen6ToBeSubScreen('bondCalc');
                                  }
                                }}
                                style={{
                                  flex: 'none',
                                  width: '76px',
                                  flexShrink: 0,
                                  border: 'none',
                                  background: 'none',
                                  borderRight: idx < borderRightCount ? (isDark ? '1px solid #1e293b' : '1px solid #f1f5f9') : 'none',
                                  cursor: (tab.key === '장내(외)채권 잔고' || tab.key === 'ETF/리츠 주문' || tab.key === 'ETF/리츠 현재가' || tab.key === '장외채권 매매') ? 'pointer' : 'default',
                                  fontSize: !screen6ToBeSwitchOn ? '0.7rem' : '0.73rem',
                                  fontWeight: '500',
                                  color: isDark ? '#cbd5e1' : '#333333',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  textAlign: 'center',
                                  whiteSpace: 'pre-line',
                                  lineHeight: '1.2',
                                  padding: '2px 1px'
                                }}
                              >
                                {tab.label}
                              </button>
                            );
                          })}
                        </div>

                        {/* Back */}
                        <button 
                          onClick={() => setScreen6ToBeSubScreen('menu')}
                          style={{ width: '48px', border: 'none', background: 'none', borderLeft: '1px solid #f1f5f9', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ color: '#333' }}><path d="M9 14L4 9l5-5" /><path d="M4 9h10a5 5 0 0 1 5 5v5" /></svg>
                        </button>
                      </div>
                    </>
                  ) : screen6ToBeSubScreen === 'investmentRatio' ? (
                    renderScreen6Ratio('tobe')
                  ) : screen6ToBeSubScreen === 'bondBalance' ? (
                    renderScreen6Balance('tobe')
                  ) : screen6ToBeSubScreen === 'cautionAgreement' ? (
                    renderScreen6Caution('tobe')
                  ) : screen6ToBeSubScreen === 'bondDetails' ? (
                    renderScreen6Details('tobe')
                  ) : screen6ToBeSubScreen === 'bondCalc' ? (
                    renderScreen6Calc('tobe')
                  ) : (
                    renderScreen6ToBeMenu()
                  )}
              {renderScreen6Bsheet('tobe')}
              {screen6ToBeUnexecutedOpen && renderScreen6UnexecutedPopup('tobe', () => setScreen6ToBeUnexecutedOpen(false))}
              {screen6ToBeNoPlanModalOpen && renderScreen6ToBeNoPlanModal()}
            </div>
              </div>
            </div>

            {/* Task Title */}
            <div style={{
              fontSize: '1.35rem',
              fontWeight: '600',
              color: isDark ? '#94a3b8' : '#475569',
              letterSpacing: '-0.5px',
              textAlign: 'center',
              opacity: 0.85,
              marginTop: '8px',
              wordBreak: 'keep-all'
            }}>
              장내 채권 매매 시스템
            </div>
          </div>
        ) : (
          /* Original Screen 2 */
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '32px',
            flexShrink: 0
          }}>
            {/* Emulators Row */}
            <div style={{
              display: 'flex',
              gap: '60px',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: '900',
                  color: isDark ? '#f8fafc' : '#0f172a',
                  backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                  padding: '8px 24px',
                  borderRadius: '99px',
                  letterSpacing: '1px',
                  border: '1px solid var(--border-color)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                }}>AS IS</div>
                <PhoneEmulator
                  isToBe={false}
                  isDark={isDark}
                  accountBalance={accountBalance}
                  setAccountBalance={setAccountBalance}
                  addNotification={addNotification}
                  selectedStock={selectedStock}
                  setSelectedStock={setSelectedStock}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  activeBottomTab={activeBottomTab}
                  setActiveBottomTab={setActiveBottomTab}
                  showOrderPanel={showOrderPanel}
                  setShowOrderPanel={setShowOrderPanel}
                  orderType={orderType}
                  setOrderType={setOrderType}
                  orderPrice={orderPrice}
                  setOrderPrice={setOrderPrice}
                  orderQty={orderQty}
                  setOrderQty={setOrderQty}
                  stockSelectorOpen={stockSelectorOpen}
                  setStockSelectorOpen={setStockSelectorOpen}
                />
              </div>
      
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: '900',
                  color: isDark ? '#f8fafc' : '#0f172a',
                  backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                  padding: '8px 24px',
                  borderRadius: '99px',
                  letterSpacing: '1px',
                  border: '1px solid var(--border-color)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                }}>TO BE</div>
                <div style={{ position: 'relative' }}>
                  <PhoneEmulator
                    isToBe={true}
                    isDark={isDark}
                    accountBalance={accountBalance}
                    setAccountBalance={setAccountBalance}
                    addNotification={addNotification}
                    selectedStock={selectedStock}
                    setSelectedStock={setSelectedStock}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    activeBottomTab={activeBottomTab}
                    setActiveBottomTab={setActiveBottomTab}
                    showOrderPanel={showOrderPanel}
                    setShowOrderPanel={setShowOrderPanel}
                    orderType={orderType}
                    setOrderType={setOrderType}
                    orderPrice={orderPrice}
                    setOrderPrice={setOrderPrice}
                    orderQty={orderQty}
                    setOrderQty={setOrderQty}
                    stockSelectorOpen={stockSelectorOpen}
                    setStockSelectorOpen={setStockSelectorOpen}
                    isDrawerOpen={isDrawerOpen}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
    
        {/* Right Column: Viewport Fixed Drawer Card */}
        <div style={{
          position: 'fixed',
          right: 0,
          top: 0,
          height: '100vh',
          width: isDrawerOpen ? '520px' : '0px',
          opacity: isDrawerOpen ? 1 : 0,
          transform: isDrawerOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          overflowY: 'auto',
          backgroundColor: isDark ? '#111827' : '#ffffff',
          borderLeft: isDrawerOpen ? (isDark ? '1px solid #1e293b' : '1px solid #e5e7eb') : 'none',
          boxShadow: isDrawerOpen ? '-5px 0 25px rgba(0,0,0,0.08)' : 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          boxSizing: 'border-box',
          padding: isDrawerOpen ? '40px 32px 32px 32px' : '0px',
          textAlign: 'left',
          zIndex: 9999
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            borderBottom: isDark ? '1px solid #1e293b' : '1px solid #e5e7eb',
            paddingBottom: '12px'
          }}>
            <h2 style={{
              fontSize: '1.85rem',
              fontWeight: '800',
              margin: 0,
              color: isDark ? '#f8fafc' : '#111827',
              wordBreak: 'keep-all'
            }}>
              Description
            </h2>
          </div>
    
          {activeScreen === 1 ? (
            /* Descriptions for Screen 1 */
            <>
              {isAsIsToBeExpanded && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                  {toBeSubScreen === 'tigerDetail' ? (
                    <>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ backgroundColor: '#de201e', color: '#fff', fontSize: '13px', fontWeight: 'bold', padding: '3px 8px', borderRadius: '4px', lineHeight: 1 }}>AS-IS</span>
                          <span style={{ fontWeight: '700', fontSize: '19px', color: isDark ? '#cbd5e1' : '#374151', wordBreak: 'keep-all' }}>퇴직연금 전용 현재가 화면 별도 존재</span>
                        </div>
                        <ul style={{ margin: 0, fontSize: '17px', color: '#6b7280', lineHeight: '1.65', paddingLeft: '78px', wordBreak: 'keep-all', listStyleType: 'disc' }}>
                          <li style={{ marginBottom: '6px' }}>퇴직연금 ETF 거래를 위해 일반 현재가와 분리된 별도의 전용 현재가 화면을 사용함</li>
                          <li>이전 화면 구조는 정보 조회가 제한적이고 일반 주식 거래와 화면 흐름이 파편화되어 있음</li>
                        </ul>
                      </div>
              
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ backgroundColor: '#00c3a5', color: '#fff', fontSize: '13px', fontWeight: 'bold', padding: '3px 8px', borderRadius: '4px', lineHeight: 1 }}>TO-BE</span>
                          <span style={{ fontWeight: '700', fontSize: '19px', color: isDark ? '#cbd5e1' : '#374151', wordBreak: 'keep-all' }}>일반 트레이딩에서 사용하는 현재가 화면</span>
                        </div>
                        <ul style={{ margin: 0, fontSize: '17px', color: '#6b7280', lineHeight: '1.65', paddingLeft: '78px', wordBreak: 'keep-all', listStyleType: 'disc' }}>
                          <li style={{ marginBottom: '6px' }}>일반 트레이딩에서 사용하는 표준 현재가 화면을 연동하여 화면 흐름과 기능 일원화</li>
                          <li>선택 시 일반 트레이딩 화면이지만 퇴직연금 &gt; ETF/리츠 몰을 통해 진입한 사용자는 ETF 전용 종목 검색기를 호출하도록 분기 처리</li>
                        </ul>
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ backgroundColor: '#de201e', color: '#fff', fontSize: '13px', fontWeight: 'bold', padding: '3px 8px', borderRadius: '4px', lineHeight: 1 }}>AS-IS</span>
                          <span style={{ fontWeight: '700', fontSize: '19px', color: isDark ? '#cbd5e1' : '#374151', wordBreak: 'keep-all' }}>다단계의 복잡한 검색 진입 경로</span>
                        </div>
                        <ul style={{ margin: 0, fontSize: '17px', color: '#6b7280', lineHeight: '1.65', paddingLeft: '78px', wordBreak: 'keep-all', listStyleType: 'disc' }}>
                          <li style={{ marginBottom: '6px' }}>경로 1: 메뉴 [ETF/리츠 현재가] &gt; 현재가 화면에서 [매수] 버튼 클릭 &gt; 주문화면 내 '종목 돋보기' 버튼 클릭 &gt; 종목 검색 및 변경</li>
                          <li style={{ marginBottom: '6px' }}>경로 2: 메뉴 [ETF/리츠 주문] &gt; 주문화면 &gt; '종목 돋보기' 버튼 클릭 &gt; 종목 검색</li>
                          <li>시사점: 현재는 종목 검색 화면으로 진입하기까지의 뎁스가 다소 복잡하고 돋보기 버튼에 의존하고 있음</li>
                        </ul>
                      </div>
              
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ backgroundColor: '#00c3a5', color: '#fff', fontSize: '13px', fontWeight: 'bold', padding: '3px 8px', borderRadius: '4px', lineHeight: 1 }}>TO-BE</span>
                          <span style={{ fontWeight: '700', fontSize: '19px', color: isDark ? '#cbd5e1' : '#374151', wordBreak: 'keep-all' }}>ETF몰(ETF 전용 종목 검색기) 메뉴 및 화면 신설</span>
                        </div>
                        <ul style={{ margin: 0, fontSize: '17px', color: '#6b7280', lineHeight: '1.65', paddingLeft: '78px', wordBreak: 'keep-all', listStyleType: 'disc' }}>
                          <li style={{ marginBottom: '6px' }}>기존 '퇴직연금 ETF 전용 현재가' 화면을 폐기하고, 일반 트레이딩에서 사용하는 '현재가' 화면과 연동하여 일원화</li>
                          <li>
                            ETF몰 메뉴 및 화면 신설
                            <ul style={{ margin: '4px 0 0 0', paddingLeft: '22px', listStyleType: 'circle' }}>
                              <li style={{ marginBottom: '2px' }}>상단 탭 세분화</li>
                              <li 
                                onClick={() => setIsSearchEnhancementModalOpen(true)}
                                style={{ 
                                  marginBottom: '2px', 
                                  cursor: 'pointer', 
                                  color: '#00c3a5', 
                                  textDecoration: 'underline',
                                  fontWeight: '600'
                                }}
                                title="상세 정보 모달 열기"
                              >
                                검색창 기능 강화...
                              </li>
                              <li>종목 리스트 UX 강화</li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </>
                  )}
                </div>
              )}

              <div 
                onClick={() => setIsAsIsToBeExpanded(!isAsIsToBeExpanded)}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  cursor: 'pointer',
                  padding: '8px 0',
                  userSelect: 'none',
                  marginTop: '10px',
                  marginBottom: '10px',
                  transition: 'opacity 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
              >
                {isAsIsToBeExpanded ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                )}
              </div>
        
              {toBeSubScreen === 'etfMall' && activeMallTab === '추천' && (
                <div style={{
                  backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                  borderRadius: '12px',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  border: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)',
                  marginTop: '22px'
                }}>
                  <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: isDark ? '#cbd5e1' : '#374151', wordBreak: 'keep-all' }}>
                    주요 핵심 구현 사항
                  </h3>
                  <ul style={{ margin: 0, paddingLeft: '0px', listStyle: 'none', fontSize: '16px', color: '#6b7280', display: 'flex', flexDirection: 'column', gap: '14px', lineHeight: '1.5', wordBreak: 'keep-all' }}>
                    <li style={{ wordBreak: 'keep-all', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <span style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#00c3a5', color: '#fff', fontSize: '11px', fontWeight: 'bold' }}>1</span>
                      <div>
                        <strong style={{ color: isDark ? '#cbd5e1' : '#374151' }}>투자 목적별 상단 탭 세분화</strong>
                        <ul style={{ margin: '4px 0 0 0', paddingLeft: '16px', listStyleType: 'disc', fontSize: '15px', color: '#6b7280' }}>
                          <li style={{ marginBottom: '2px' }}>추천(수익률/거래 상위)</li>
                          <li style={{ marginBottom: '2px' }}>보유(실제 보유 종목 및 평단 대비 수익률)</li>
                          <li style={{ marginBottom: '2px' }}>고배당고금리(배당 지표)</li>
                          <li>TDF 상품 탭</li>
                        </ul>
                      </div>
                    </li>
                    <li style={{ wordBreak: 'keep-all', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <span style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#00c3a5', color: '#fff', fontSize: '11px', fontWeight: 'bold' }}>2</span>
                      <div>
                        <strong style={{ color: isDark ? '#cbd5e1' : '#374151' }}>종목 리스트 UX 고도화</strong>
                        <ul style={{ margin: '4px 0 0 0', paddingLeft: '16px', listStyleType: 'disc', fontSize: '15px', color: '#6b7280' }}>
                          <li style={{ marginBottom: '2px' }}>투자한도 제한(70%, 100%)</li>
                          <li style={{ marginBottom: '2px' }}>자산·시장 구분</li>
                          <li style={{ marginBottom: '2px' }}>보유/미보유 종목 UI 이원화</li>
                          <li>관심 종목 추가 기능</li>
                        </ul>
                      </div>
                    </li>
                    <li style={{ wordBreak: 'keep-all', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <span style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#00c3a5', color: '#fff', fontSize: '11px', fontWeight: 'bold' }}>3</span>
                      <div>
                        <strong style={{ color: isDark ? '#cbd5e1' : '#374151' }}>(트레이딩)현재가 화면 연동</strong>
                        <ul style={{ margin: '4px 0 0 0', paddingLeft: '16px', listStyleType: 'disc', fontSize: '15px', color: '#6b7280' }}>
                          <li>일반 트레이딩에서 사용하는 '현재가' 화면 연동</li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              )}

              {toBeSubScreen === 'etfMall' && activeMallTab === '보유' && (
                <div style={{
                  backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                  borderRadius: '12px',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  border: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)',
                  marginTop: '22px'
                }}>
                  <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: isDark ? '#cbd5e1' : '#374151', wordBreak: 'keep-all' }}>
                    주요 핵심 구현 사항
                  </h3>
                  <ul style={{ margin: 0, paddingLeft: '0px', listStyle: 'none', fontSize: '16px', color: '#6b7280', display: 'flex', flexDirection: 'column', gap: '14px', lineHeight: '1.5', wordBreak: 'keep-all' }}>
                    <li style={{ wordBreak: 'keep-all', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <span style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#00c3a5', color: '#fff', fontSize: '11px', fontWeight: 'bold' }}>1</span>
                      <div>
                        <strong style={{ color: isDark ? '#cbd5e1' : '#374151' }}>보유 주수 및 평균매입단가 표시</strong>
                        <ul style={{ margin: '4px 0 0 0', paddingLeft: '16px', listStyleType: 'disc', fontSize: '15px', color: '#6b7280' }}>
                          <li>실제 보유 종목의 종목코드 행 하단에 `(수량)주 · 평균 (평단가)원` 형식의 세부 보유 정보 표기</li>
                        </ul>
                      </div>
                    </li>
                    <li style={{ wordBreak: 'keep-all', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <span style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#00c3a5', color: '#fff', fontSize: '11px', fontWeight: 'bold' }}>2</span>
                      <div>
                        <strong style={{ color: isDark ? '#cbd5e1' : '#374151' }}>정렬기준 선택</strong>
                        <ul style={{ margin: '4px 0 0 0', paddingLeft: '16px', listStyleType: 'disc', fontSize: '15px', color: '#6b7280' }}>
                          <li>좌측 정렬 선택 버튼 클릭 시 바텀시트 정렬 옵션 메뉴(`수익률 높은 순`, `등락률 높은 순`, `평가금 많은 순`, `거래량 많은 순`) 호출 및 정렬 스위칭</li>
                        </ul>
                      </div>
                    </li>
                    <li style={{ wordBreak: 'keep-all', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <span style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#00c3a5', color: '#fff', fontSize: '11px', fontWeight: 'bold' }}>3</span>
                      <div>
                        <strong style={{ color: isDark ? '#cbd5e1' : '#374151' }}>평가금 선택 시 통합 UI 연동</strong>
                        <ul style={{ margin: '4px 0 0 0', paddingLeft: '16px', listStyleType: 'disc', fontSize: '15px', color: '#6b7280' }}>
                          <li>우측 토글에서 [평가금] 선택 시, 종목당 보유 수량과 평단가를 결합한 실시간 총 평가금액 및 손익금액(수익률) 일체형 통합 블록 활성화</li>
                        </ul>
                      </div>
                    </li>
                    <li style={{ wordBreak: 'keep-all', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <span style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#00c3a5', color: '#fff', fontSize: '11px', fontWeight: 'bold' }}>4</span>
                      <div>
                        <strong style={{ color: isDark ? '#cbd5e1' : '#374151' }}>현재가 선택 시 고유 레이아웃 복원</strong>
                        <ul style={{ margin: '4px 0 0 0', paddingLeft: '16px', listStyleType: 'disc', fontSize: '15px', color: '#6b7280' }}>
                          <li>우측 토글에서 [현재가] 선택 시, 평가금액 통합 블록이 개별 [현재가/거래량] 및 [대비금액/대비율] 형태로 전환</li>
                        </ul>
                      </div>
                    </li>
                    <li style={{ wordBreak: 'keep-all', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <span style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#00c3a5', color: '#fff', fontSize: '11px', fontWeight: 'bold' }}>5</span>
                      <div>
                        <strong style={{ color: isDark ? '#cbd5e1' : '#374151' }}>관심종목(별표) 등록 바텀시트 연동</strong>
                        <ul style={{ margin: '4px 0 0 0', paddingLeft: '16px', listStyleType: 'disc', fontSize: '15px', color: '#6b7280' }}>
                          <li>종목 우측 별표 아이콘 클릭 시 관심종목 그룹 지정 및 추가할 위치 선택이 가능한 관심종목 추가 바텀시트 연동</li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              )}

              {toBeSubScreen === 'tigerDetail' && (
                <div style={{
                  backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                  borderRadius: '12px',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  border: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)',
                  marginTop: '22px'
                }}>
                  <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: isDark ? '#cbd5e1' : '#374151', wordBreak: 'keep-all' }}>
                    주요 핵심 구현 사항
                  </h3>
                  <ul style={{ margin: 0, paddingLeft: '0px', listStyle: 'none', fontSize: '16px', color: '#6b7280', display: 'flex', flexDirection: 'column', gap: '14px', lineHeight: '1.5', wordBreak: 'keep-all' }}>
                    <li style={{ wordBreak: 'keep-all', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <span style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#00c3a5', color: '#fff', fontSize: '11px', fontWeight: 'bold' }}>1</span>
                      <div>
                        <strong style={{ color: isDark ? '#cbd5e1' : '#374151' }}>일반 트레이딩에서 사용하는 현재가 화면</strong>
                      </div>
                    </li>
                    <li style={{ wordBreak: 'keep-all', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <span style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#00c3a5', color: '#fff', fontSize: '11px', fontWeight: 'bold' }}>2</span>
                      <div>
                        <strong style={{ color: isDark ? '#cbd5e1' : '#374151' }}>돋보기 버튼 선택 시 분기 처리</strong>
                        <ul style={{ margin: '4px 0 0 0', paddingLeft: '16px', listStyleType: 'disc', fontSize: '15px', color: '#6b7280' }}>
                          <li style={{ marginBottom: '4px' }}>일반 트레이딩 화면에서 [돋보기] 클릭 &gt; 일반 종목 검색 화면 (기존 동일)</li>
                          <li>퇴직연금 ETF/리츠 몰에서 [돋보기] 클릭 &gt; ETF 전용 종목 검색 화면 호출</li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : activeScreen === 4 ? (
            /* Descriptions for Screen 4: 연금수령 신청 */
            screen4SubScreen === 'menu' ? (
              /* Menu Description */
              <>
                {isAsIsToBeExpanded && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ backgroundColor: '#de201e', color: '#fff', fontSize: '13px', fontWeight: 'bold', padding: '3px 8px', borderRadius: '4px', lineHeight: 1 }}>AS-IS</span>
                        <span style={{ fontWeight: '700', fontSize: '19px', color: isDark ? '#cbd5e1' : '#374151', wordBreak: 'keep-all' }}>연금수령 신청 제약</span>
                      </div>
                      <p style={{ margin: 0, fontSize: '17px', color: '#6b7280', lineHeight: '1.65', paddingLeft: '58px', wordBreak: 'keep-all' }}>
                        기존 연금수령 신청 프로세스는 연금개시일 설정 등의 제약 조건이 모호하여 오입력의 가능성이 있었고, 계좌 상태에 따른 필터링이 부족하여 UI 편의성이 낮았습니다.
                      </p>
                    </div>
            
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ backgroundColor: '#00c3a5', color: '#fff', fontSize: '13px', fontWeight: 'bold', padding: '3px 8px', borderRadius: '4px', lineHeight: 1 }}>TO-BE</span>
                        <span style={{ fontWeight: '700', fontSize: '19px', color: isDark ? '#cbd5e1' : '#374151', wordBreak: 'keep-all' }}>연금계좌 통합 및 메뉴 고도화</span>
                      </div>
                      <p style={{ margin: 0, fontSize: '17px', color: '#6b7280', lineHeight: '1.65', paddingLeft: '58px', wordBreak: 'keep-all' }}>
                        기존 IRP에 한정되었던 연금 서비스를 연금저축 계좌까지 확대 적용합니다. 신청 프로세스 최적화와 함께, 연금수령 메뉴를 신설하여 연금 관련 서비스(신청, 조회/취소, 현황, 시뮬레이션)의 접근성을 개선합니다.
                      </p>
                    </div>
                  </div>
                )}

                <div 
                  onClick={() => setIsAsIsToBeExpanded(!isAsIsToBeExpanded)}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    cursor: 'pointer',
                    padding: '8px 0',
                    userSelect: 'none',
                    marginTop: '10px',
                    marginBottom: '10px',
                    transition: 'opacity 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
                  onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                >
                  {isAsIsToBeExpanded ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                      <polyline points="18 15 12 9 6 15" />
                    </svg>
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  )}
                </div>
          
                <div style={{
                  backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                  borderRadius: '12px',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  border: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)'
                }}>
                  <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: isDark ? '#cbd5e1' : '#374151', wordBreak: 'keep-all' }}>
                    주요 핵심 구현 사항
                  </h3>
                  <ul style={{ margin: 0, paddingLeft: '0px', listStyle: 'none', fontSize: '16px', color: '#6b7280', display: 'flex', flexDirection: 'column', gap: '14px', lineHeight: '1.5', wordBreak: 'keep-all' }}>
                    <li style={{ wordBreak: 'keep-all', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <span style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#00c3a5', color: '#fff', fontSize: '11px', fontWeight: 'bold' }}>1</span>
                      <div>
                        <strong style={{ color: isDark ? '#cbd5e1' : '#374151' }}>원스톱 연금 네비게이션:</strong> 연금수령 메뉴를 신규 배치하여 연금수령 신청, 신청 조회/취소, 연금수령 현황, 연금개시 시뮬레이션까지 모든 연금저축 및 퇴직연금 서비스를 뎁스(Depth) 최소화로 손쉽게 오갈 수 있습니다.
                      </div>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              /* Request Form Description */
              <>
                {isAsIsToBeExpanded && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ backgroundColor: '#de201e', color: '#fff', fontSize: '13px', fontWeight: 'bold', padding: '3px 8px', borderRadius: '4px', lineHeight: 1 }}>AS-IS</span>
                      <span style={{ fontWeight: '700', fontSize: '19px', color: isDark ? '#cbd5e1' : '#374151', wordBreak: 'keep-all' }}>연금수령 신청 제약</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '17px', color: '#6b7280', lineHeight: '1.65', paddingLeft: '58px', wordBreak: 'keep-all' }}>
                      기존 연금수령 신청 프로세스는 연금개시일 설정 등의 제약 조건이 모호하여 오입력의 가능성이 있었고, 계좌 상태에 따른 필터링이 부족하여 UI 편의성이 낮았습니다.
                    </p>
                  </div>
          
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ backgroundColor: '#00c3a5', color: '#fff', fontSize: '13px', fontWeight: 'bold', padding: '3px 8px', borderRadius: '4px', lineHeight: 1 }}>TO-BE</span>
                      <span style={{ fontWeight: '700', fontSize: '19px', color: isDark ? '#cbd5e1' : '#374151', wordBreak: 'keep-all' }}>연금계좌 통합 및 메뉴 고도화</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '17px', color: '#6b7280', lineHeight: '1.65', paddingLeft: '58px', wordBreak: 'keep-all' }}>
                      기존 IRP에 한정되었던 연금 서비스를 연금저축 계좌까지 확대 적용합니다. 신청 프로세스 최적화와 함께, 연금수령 메뉴를 신설하여 연금 관련 서비스(신청, 조회/취소, 현황, 시뮬레이션)의 접근성을 개선합니다.
                    </p>
                  </div>
                </div>
              )}

              <div 
                onClick={() => setIsAsIsToBeExpanded(!isAsIsToBeExpanded)}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  cursor: 'pointer',
                  padding: '8px 0',
                  userSelect: 'none',
                  marginTop: '10px',
                  marginBottom: '10px',
                  transition: 'opacity 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
              >
                {isAsIsToBeExpanded ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                )}
              </div>
        
              <div style={{
                backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                borderRadius: '12px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                border: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)'
              }}>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: isDark ? '#cbd5e1' : '#374151', wordBreak: 'keep-all' }}>
                  주요 핵심 구현 사항
                </h3>
                <ul style={{ margin: 0, paddingLeft: '0px', listStyle: 'none', fontSize: '16px', color: '#6b7280', display: 'flex', flexDirection: 'column', gap: '14px', lineHeight: '1.5', wordBreak: 'keep-all' }}>
                  <li style={{ wordBreak: 'keep-all', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#00c3a5', color: '#fff', fontSize: '11px', fontWeight: 'bold' }}>1</span>
                    <div>
                      <strong style={{ color: isDark ? '#cbd5e1' : '#374151' }}>계좌 선택:</strong> 계약점포 상태가 '정상'인 연금상품계좌만 필터링하여 선택 리스트에 노출함.
                    </div>
                  </li>
                  <li style={{ wordBreak: 'keep-all', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#00c3a5', color: '#fff', fontSize: '11px', fontWeight: 'bold' }}>2</span>
                    <div>
                      <strong style={{ color: isDark ? '#cbd5e1' : '#374151' }}>날짜 입력:</strong> 수령 개시 일자 입력 필드 선택 시 모바일 네이티브 달력(Calendar) UI를 팝업함. 신청일 기준 미래 60일 이내의 일자만 활성화하며, 60일 초과 일자 선택 시 "60일 이내의 일자만 선택 가능합니다"라는 안내 팝업을 노출함.
                    </div>
                  </li>
                  <li style={{ wordBreak: 'keep-all', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#00c3a5', color: '#fff', fontSize: '11px', fontWeight: 'bold' }}>3</span>
                    <div>
                      <strong style={{ color: isDark ? '#cbd5e1' : '#374151' }}>수령계좌 선택:</strong> 금융기관 선택 프로세스는 원뎁스(1-Depth) 바텀시트 또는 팝업으로 제공하여 이탈을 방지함.
                    </div>
                  </li>
                  <li style={{ wordBreak: 'keep-all', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#00c3a5', color: '#fff', fontSize: '11px', fontWeight: 'bold' }}>4</span>
                    <div>
                      <strong style={{ color: isDark ? '#cbd5e1' : '#374151' }}>연락처 및 계좌 입력:</strong> 연락처 입력 및 수령계좌 직접 입력 필드 선택 시, 문자가 아닌 '휴대폰 숫자 패드'가 자동으로 활성화되도록 인터랙션을 정의함.
                    </div>
                  </li>
                  <li style={{ wordBreak: 'keep-all', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#00c3a5', color: '#fff', fontSize: '11px', fontWeight: 'bold' }}>5</span>
                    <div>
                      <strong style={{ color: isDark ? '#cbd5e1' : '#374151' }}>유의사항 확인:</strong> 체크박스 선택 시 연금저축계좌 개시/해지 및 중도인출 관련 안내 팝업을 확인해야 체크 가능함.
                    </div>
                  </li>
                </ul>
              </div>
            </>
          )
          ) : activeScreen === 5 ? (
            /* Descriptions for Screen 5: 연금저축 펀드분할매수 시스템 */
            <>
              {isAsIsToBeExpanded && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ backgroundColor: '#de201e', color: '#fff', fontSize: '13px', fontWeight: 'bold', padding: '3px 8px', borderRadius: '4px', lineHeight: 1 }}>AS-IS</span>
                      <span style={{ fontWeight: '700', fontSize: '19px', color: isDark ? '#cbd5e1' : '#374151', wordBreak: 'keep-all' }}>연금 계좌 분할매수 기능 제약 및 메뉴 파편화</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '17px', color: '#6b7280', lineHeight: '1.65', paddingLeft: '58px', wordBreak: 'keep-all' }}>
                      기존 연금저축 펀드 분할매수는 CMS 입금을 통한 매수만 지원되었으며, IRP 및 연금저축 관련 주문/잔고/자동매수 메뉴가 MTS/HTS 내에 여러 개로 파편화되어 있어 사용자 접근성이 떨어지고 매수 재원 선택에 제약이 있었습니다.
                    </p>
                  </div>
          
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ backgroundColor: '#00c3a5', color: '#fff', fontSize: '13px', fontWeight: 'bold', padding: '3px 8px', borderRadius: '4px', lineHeight: 1 }}>TO-BE</span>
                      <span style={{ fontWeight: '700', fontSize: '19px', color: isDark ? '#cbd5e1' : '#374151', wordBreak: 'keep-all' }}>통합 투자 메뉴 신설 및 매수 재원 다양화</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '17px', color: '#6b7280', lineHeight: '1.65', paddingLeft: '58px', wordBreak: 'keep-all' }}>
                      퇴직연금 및 연금저축용 통합 투자 메뉴를 신설하여 메뉴 구조를 일원화합니다. 보유 펀드 매도금액, 단순 예수금, CMS/자동대체 입금액 등 다양한 매수 재원을 직접 선택할 수 있도록 개선하고, 연금저축 전용 '펀드 모으기' 서비스를 신규 제공하여 자산 재투자의 직관성을 강화합니다.
                    </p>
                  </div>
                </div>
              )}

              <div 
                onClick={() => setIsAsIsToBeExpanded(!isAsIsToBeExpanded)}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  cursor: 'pointer',
                  padding: '8px 0',
                  userSelect: 'none',
                  marginTop: '10px',
                  marginBottom: '10px',
                  transition: 'opacity 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
              >
                {isAsIsToBeExpanded ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                )}
              </div>
        
              <div style={{
                backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                borderRadius: '12px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                border: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)'
              }}>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: isDark ? '#cbd5e1' : '#374151', wordBreak: 'keep-all' }}>
                  주요 핵심 구현 사항
                </h3>
                <ul style={{ margin: 0, paddingLeft: '0px', listStyle: 'none', fontSize: '16px', color: '#6b7280', display: 'flex', flexDirection: 'column', gap: '14px', lineHeight: '1.5', wordBreak: 'keep-all' }}>
                  <li style={{ wordBreak: 'keep-all', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#00c3a5', color: '#fff', fontSize: '11px', fontWeight: 'bold' }}>1</span>
                    <div>
                      <strong style={{ color: isDark ? '#cbd5e1' : '#374151' }}>통합 분기 메뉴 구축 및 진입 경로 단권화</strong>
                      <ul style={{ margin: '4px 0 0 0', paddingLeft: '16px', listStyleType: 'disc', fontSize: '15px', color: '#6b7280' }}>
                        <li style={{ marginBottom: '2px' }}>파편화된 메뉴를 퇴직연금 [금융상품 투자하기] 및 연금저축 [연금펀드 투자하기]로 통합 신설합니다.</li>
                        <li>화면 상단 Sticky 영역에 총 평가금액, 보유 금융상품 평가금액, 투자가능금액을 전 계좌 합산하여 실시간 표출합니다.</li>
                      </ul>
                    </div>
                  </li>
                  <li style={{ wordBreak: 'keep-all', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#00c3a5', color: '#fff', fontSize: '11px', fontWeight: 'bold' }}>2</span>
                    <div>
                      <strong style={{ color: isDark ? '#cbd5e1' : '#374151' }}>매수 재원 다변화 및 선택 제어</strong>
                      <ul style={{ margin: '4px 0 0 0', paddingLeft: '16px', listStyleType: 'disc', fontSize: '15px', color: '#6b7280' }}>
                        <li style={{ marginBottom: '2px' }}>보유 현금(예수금) 및 보유 펀드를 매도 재원으로 자유롭게 선택 가능하도록 개선합니다.</li>
                        <li>이미 다른 적립식 투자에 지정된 보유 상품도 중복 선택을 허용하며, 수량 초과 입력 시 경고 팝업을 노출하되 입력 자체는 가능하도록 제약을 완화합니다.</li>
                      </ul>
                    </div>
                  </li>
                  <li style={{ wordBreak: 'keep-all', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#00c3a5', color: '#fff', fontSize: '11px', fontWeight: 'bold' }}>3</span>
                    <div>
                      <strong style={{ color: isDark ? '#cbd5e1' : '#374151' }}>신규 '펀드 모으기' 프로세스 및 자동 재투자 로직 구현</strong>
                      <ul style={{ margin: '4px 0 0 0', paddingLeft: '16px', listStyleType: 'disc', fontSize: '15px', color: '#6b7280' }}>
                        <li style={{ marginBottom: '2px' }}>매수 금액, 매수 일자(1~31일), 모을 기간(3개월~5년) 및 펀드별 비율(합계 100%)을 설정하는 4-Step 신청 Flow를 신설합니다.</li>
                        <li>매수 당일 1차 실패 시 2차 재시도(오후 13~14시) 배치를 실행하여 매수 성공률을 극대화합니다.</li>
                      </ul>
                    </div>
                  </li>
                  <li style={{ wordBreak: 'keep-all', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#00c3a5', color: '#fff', fontSize: '11px', fontWeight: 'bold' }}>4</span>
                    <div>
                      <strong style={{ color: isDark ? '#cbd5e1' : '#374151' }}>직원/WTS 관리 화면 및 알림 체계 고도화</strong>
                      <ul style={{ margin: '4px 0 0 0', paddingLeft: '16px', listStyleType: 'disc', fontSize: '15px', color: '#6b7280' }}>
                        <li style={{ marginBottom: '2px' }}>사이버스(HTS) 내 [분할매수 신청내역] 구획을 분리 신설하고, WTS 내 매도 상품 선택 방식을 단일 선택(Radio Button)으로 UX를 변경합니다.</li>
                        <li>매도/매수 배치 처리 단계별(전일 예고, 당일 실패, 결과) 안내 메시지를 일괄 통합 발송하며, 내역조회 딥링크 버튼을 필수 표출합니다.</li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </>
          ) : activeScreen === 6 ? (
            /* Descriptions for Screen 6: 장내 채권 매매 */
            <>
              {isAsIsToBeExpanded && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ backgroundColor: '#de201e', color: '#fff', fontSize: '13px', fontWeight: 'bold', padding: '3px 8px', borderRadius: '4px', lineHeight: 1 }}>AS-IS</span>
                      <span style={{ fontWeight: '700', fontSize: '19px', color: isDark ? '#cbd5e1' : '#374151', wordBreak: 'keep-all' }}>퇴직연금 계좌로 장내채권 매매 불가</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '17px', color: '#6b7280', lineHeight: '1.65', paddingLeft: '58px', wordBreak: 'keep-all' }}>
                      장내채권 메뉴가 일반 '상품' 탭 하위에만 존재하며 일반 계좌 중심으로 운영되었습니다. 퇴직연금 종합계좌(41, 43)는 주문전용계좌 매핑, 납입금 구분, 자사주 매수 제한 등 연금 전용 프로세스가 지원되지 않아 장내채권 매매 자체가 불가능했습니다.
                    </p>
                  </div>
          
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ backgroundColor: '#00c3a5', color: '#fff', fontSize: '13px', fontWeight: 'bold', padding: '3px 8px', borderRadius: '4px', lineHeight: 1 }}>TO-BE</span>
                      <span style={{ fontWeight: '700', fontSize: '19px', color: isDark ? '#cbd5e1' : '#374151', wordBreak: 'keep-all' }}>연금 전용 장내채권 매매 경로 신설</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '17px', color: '#6b7280', lineHeight: '1.65', paddingLeft: '58px', wordBreak: 'keep-all' }}>
                      '연금' 탭 하위에 퇴직연금 전용 장내채권 매매 메뉴를 최초로 신설합니다. 사용자가 41(43) 종합계좌를 선택하면 백엔드에서 790(799) 주문계좌를 자동 매핑하여 복잡성을 완전히 제거하고, 연금 자산 관점의 직관적인 투자를 지원합니다.
                    </p>
                  </div>
                </div>
              )}

              <div 
                onClick={() => setIsAsIsToBeExpanded(!isAsIsToBeExpanded)}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  cursor: 'pointer',
                  padding: '8px 0',
                  userSelect: 'none',
                  marginTop: '10px',
                  marginBottom: '10px',
                  transition: 'opacity 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
              >
                {isAsIsToBeExpanded ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                )}
              </div>
        
              <div style={{
                backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                borderRadius: '12px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                border: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)'
              }}>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: isDark ? '#cbd5e1' : '#374151', wordBreak: 'keep-all' }}>
                  주요 핵심 구현 사항
                </h3>
                <ul style={{ margin: 0, paddingLeft: '0px', listStyle: 'none', fontSize: '16px', color: '#6b7280', display: 'flex', flexDirection: 'column', gap: '14px', lineHeight: '1.5', wordBreak: 'keep-all' }}>
                  <li style={{ wordBreak: 'keep-all', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#00c3a5', color: '#fff', fontSize: '11px', fontWeight: 'bold' }}>1</span>
                    <div>
                      <strong style={{ color: isDark ? '#cbd5e1' : '#374151' }}>듀얼 진입 프로세스 구축:</strong> '장내채권 현재가' 화면에서 매수 시 연금계좌를 선택하거나, 처음부터 'MY연금 &gt; 채권매매' 경로에서 퇴직연금계좌를 선택하고 시작하는 듀얼 진입을 지원합니다.
                    </div>
                  </li>
                  <li style={{ wordBreak: 'keep-all', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#00c3a5', color: '#fff', fontSize: '11px', fontWeight: 'bold' }}>2</span>
                    <div>
                      <strong style={{ color: isDark ? '#cbd5e1' : '#374151' }}>부담금 납입구분 셀렉터 및 실시간 계산:</strong> 화면 내 [고객납입금 / 퇴직납입금] 선택 탭(라디오 버튼)을 필수 제공하며, 사용자가 선택한 납입구분에 따라 '매수가능금액'과 잔고를 실시간으로 변동하여 바인딩합니다.
                    </div>
                  </li>
                  <li style={{ wordBreak: 'keep-all', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#00c3a5', color: '#fff', fontSize: '11px', fontWeight: 'bold' }}>3</span>
                    <div>
                      <strong style={{ color: isDark ? '#cbd5e1' : '#374151' }}>연금 전용 필터링 및 유의문구 팝업:</strong> 연금상품관리(RK #23608)에 등록된 채권만 검색되도록 필터링하고, DC/IRP 계좌별로 근로자 소속회사의 자사 발행 회사채 매매 시도 시 주문 불가 안내 또는 유의문구 모달 팝업을 강제 노출합니다.
                    </div>
                  </li>
                  <li style={{ wordBreak: 'keep-all', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#00c3a5', color: '#fff', fontSize: '11px', fontWeight: 'bold' }}>4</span>
                    <div>
                      <strong style={{ color: isDark ? '#cbd5e1' : '#374151' }}>장내·외 통합 잔고 화면 신설:</strong> 기존 장외채권 잔고와 신규 장내채권 잔고를 한눈에 볼 수 있는 독립된 통합 잔고 화면을 신설하고, 그리드에 주문가능수량, 매수단가, 만기일, 잔고구분(납입금구분)을 필수 표출합니다.
                    </div>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            /* Descriptions for Screen 2 (Original) */
            <>
              {isAsIsToBeExpanded && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ backgroundColor: '#de201e', color: '#fff', fontSize: '13px', fontWeight: 'bold', padding: '3px 8px', borderRadius: '4px', lineHeight: 1 }}>AS-IS</span>
                      <span style={{ fontWeight: '700', fontSize: '19px', color: isDark ? '#cbd5e1' : '#374151', wordBreak: 'keep-all' }}>단일 시장 정보 조회</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '17px', color: '#6b7280', lineHeight: '1.65', paddingLeft: '58px', wordBreak: 'keep-all' }}>
                      기존 화면은 오직 KRX 시장 데이터와 시세만을 표시하며, 대체거래소(NXT 등)의 가격은 조회하거나 거래할 수 없습니다.
                    </p>
                  </div>
          
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ backgroundColor: '#00c3a5', color: '#fff', fontSize: '13px', fontWeight: 'bold', padding: '3px 8px', borderRadius: '4px', lineHeight: 1 }}>TO-BE</span>
                      <span style={{ fontWeight: '700', fontSize: '19px', color: isDark ? '#cbd5e1' : '#374151', wordBreak: 'keep-all' }}>통합 및 개별 거래 지원</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '17px', color: '#6b7280', lineHeight: '1.65', paddingLeft: '58px', wordBreak: 'keep-all' }}>
                      대체거래소(NXT) 도입으로 두 시장의 가격 비교, 차이 정보 분석, 최적의 가격(SOR)에 맞춘 즉각적인 주문 연동이 가능합니다.
                    </p>
                  </div>
                </div>
              )}

              <div 
                onClick={() => setIsAsIsToBeExpanded(!isAsIsToBeExpanded)}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  cursor: 'pointer',
                  padding: '8px 0',
                  userSelect: 'none',
                  marginTop: '10px',
                  marginBottom: '10px',
                  transition: 'opacity 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
              >
                {isAsIsToBeExpanded ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                )}
              </div>
        
              <div style={{
                backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                borderRadius: '12px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                border: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)'
              }}>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: isDark ? '#cbd5e1' : '#374151', wordBreak: 'keep-all' }}>
                  주요 핵심 구현 사항
                </h3>
                <ul style={{ margin: 0, paddingLeft: '0px', listStyle: 'none', fontSize: '16px', color: '#6b7280', display: 'flex', flexDirection: 'column', gap: '14px', lineHeight: '1.5', wordBreak: 'keep-all' }}>
                  <li style={{ wordBreak: 'keep-all', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#00c3a5', color: '#fff', fontSize: '11px', fontWeight: 'bold' }}>1</span>
                    <div>
                      <strong style={{ color: isDark ? '#cbd5e1' : '#374151' }}>실시간 이중 호가 비교:</strong> 통합 모드에서 KRX 시세(29,550원)와 NXT 시세(29,600원)를 한눈에 볼 수 있습니다.
                    </div>
                  </li>
                  <li style={{ wordBreak: 'keep-all', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#00c3a5', color: '#fff', fontSize: '11px', fontWeight: 'bold' }}>2</span>
                    <div>
                      <strong style={{ color: isDark ? '#cbd5e1' : '#374151' }}>유연한 시장 전환:</strong> 최좌측 토글 탭을 클릭하여 <span style={{ fontFamily: 'var(--font-sans)', fontWeight: '800', color: '#00c3a5', backgroundColor: isDark ? 'rgba(0, 195, 165, 0.15)' : 'rgba(0, 195, 165, 0.08)', padding: '2px 6px', borderRadius: '4px', fontSize: '11px', margin: '0 2px' }}>통합 ☰</span>, <span style={{ fontFamily: 'var(--font-sans)', fontWeight: '800', color: '#d97706', backgroundColor: isDark ? 'rgba(217, 119, 6, 0.15)' : 'rgba(217, 119, 6, 0.08)', padding: '2px 6px', borderRadius: '4px', fontSize: '11px', margin: '0 2px' }}>NXT ☰</span>, <span style={{ fontFamily: 'var(--font-sans)', fontWeight: '800', color: '#00977d', backgroundColor: isDark ? 'rgba(0, 151, 125, 0.15)' : 'rgba(0, 151, 125, 0.08)', padding: '2px 6px', borderRadius: '4px', fontSize: '11px', margin: '0 2px' }}>KRX ☰</span> 모드를 손쉽게 오갈 수 있습니다.
                    </div>
                  </li>
                  <li style={{ wordBreak: 'keep-all', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#00c3a5', color: '#fff', fontSize: '11px', fontWeight: 'bold' }}>3</span>
                    <div>
                      <strong style={{ color: isDark ? '#cbd5e1' : '#374151' }}>시장 지표 배너 탑재:</strong> 두 시장 간 가격 차이 정보 및 점유율/거래량 비교 요약 배너를 상단에 구성했습니다.
                    </div>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Floating toasts */}
      <div style={styles.toastContainer}>
        {notifications.map(n => (
          <div key={n.id} style={{
            ...styles.toast,
            backgroundColor: isDark ? 'rgba(18, 24, 38, 0.95)' : 'rgba(255,255,255,0.95)',
            color: isDark ? '#fff' : '#000',
            borderColor: n.type === 'success' ? '#00c3a5' : n.type === 'warning' ? '#ff9f43' : '#0266da'
          }}>
            <span>{n.message}</span>
          </div>
        ))}
      </div>

      {/* Modal for 검색창 기능 강화 */}
      {isSearchEnhancementModalOpen && (
        <>
          {/* Backdrop with premium blur */}
          <div 
            onClick={() => setIsSearchEnhancementModalOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: isDark ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.45)',
              backdropFilter: 'blur(8px)',
              zIndex: 100000,
              animation: 'fadeIn 0.25s ease-out'
            }}
          />
          {/* Modal Container */}
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: '650px',
            maxHeight: '85vh',
            backgroundColor: isDark ? '#1e293b' : '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
            zIndex: 100001,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            border: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
            animation: 'scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}>
            {/* Modal Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '20px 24px',
              borderBottom: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
              backgroundColor: isDark ? '#0f172a' : '#f8fafc'
            }}>
              <span style={{ fontSize: '1.45rem', fontWeight: '800', color: isDark ? '#ffffff' : '#0f172a' }}>
                퇴직연금 종목 검색기 고도화
              </span>
              <button 
                onClick={() => setIsSearchEnhancementModalOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  fontWeight: '300',
                  color: isDark ? '#94a3b8' : '#64748b',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  lineHeight: '1'
                }}
              >
                &times;
              </button>
            </div>

            {/* Modal Body */}
            <div style={{
              padding: '28px 24px',
              overflowY: 'auto',
              fontSize: '0.98rem',
              lineHeight: '1.7',
              color: isDark ? '#cbd5e1' : '#334155',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              textAlign: 'left',
              wordBreak: 'keep-all'
            }}>
              <section style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <h2 style={{ fontSize: '1.15rem', fontWeight: '700', margin: '0', color: isDark ? '#e2e8f0' : '#0f172a' }}>
                  1. 개요
                </h2>
                <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <li>
                    <strong>현황 및 문제점:</strong> 현재 퇴직연금 종목 검색기는 대소문자 구분이 잘 안 되는 등 일반 트레이딩(리테일) 화면에 비해 성능 및 편의성이 떨어짐. 검색 시마다 매번 서버를 호출하여 정보를 받는 구조임.
                  </li>
                  <li>
                    <strong>개선 목표:</strong> 기존 리테일 트레이딩 시스템과 유사한 수준으로 성능을 끌어올리고 검색 기능을 다양화(고도화)하고자 함.
                  </li>
                </ul>
              </section>

              <section style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
                <h2 style={{ fontSize: '1.15rem', fontWeight: '700', margin: '0', color: isDark ? '#e2e8f0' : '#0f172a' }}>
                  2. 기술적 구현 방식 및 쟁점 사항
                </h2>
                
                <div style={{
                  backgroundColor: isDark ? 'rgba(56, 189, 248, 0.06)' : 'rgba(2, 102, 218, 0.04)',
                  padding: '16px',
                  borderRadius: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: '700', margin: '0 0 4px 0', color: isDark ? '#38bdf8' : '#0266da' }}>
                    ① 검색 방식 전환 (서버 호출 ➡️ 클라이언트 캐싱)
                  </h3>
                  <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <li>
                      <strong>리테일 방식 벤치마킹:</strong> 리테일 앱은 실행 시 주식/ETF의 기본 정보를 클라이언트(프론트엔드)에 미리 다 받아둔 후, 옵션에 따라 내부 리스트를 갱신하는 방식을 사용 중임.
                    </li>
                    <li>
                      <strong>적용 방안:</strong> 글로벌 클라이언트가 가진 정보에 '퇴직연금 플래그(Flag) 값'만 추가할 수 있다면, 서버와 매번 왔다 갔다 할 필요 없이 프론트엔드 내에서 심플하게 구현 가능할 것으로 예상됨. (단, IT 팀과 상의 필요)
                    </li>
                  </ul>
                </div>

                <div style={{
                  backgroundColor: isDark ? 'rgba(234, 179, 8, 0.06)' : 'rgba(217, 119, 6, 0.04)',
                  padding: '16px',
                  borderRadius: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: '700', margin: '0 0 4px 0', color: isDark ? '#eab308' : '#d97706' }}>
                    ② 추가 화면 정보 노출 및 데이터 동기화
                  </h3>
                  <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <li>
                      <strong>요구사항:</strong> 단순 종목명 검색을 넘어 <strong>전일 대비 금액, 현재가, 평균 단가(평가 금액)</strong> 등의 추가 정보를 검색 결과 목록에 함께 보여주기를 원함.
                    </li>
                    <li>
                      <strong>해결 과제:</strong>
                      <ul style={{ margin: '4px 0 0 0', paddingLeft: '20px', listStyleType: 'circle', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <li>'현재가' 및 '전일 대비' 정보는 앱 실행 시 받은 목록을 기반으로 검색 후, 필요시 서버에서 목록 단위로 데이터를 한 번 더 받아오는 작업이 필요함.</li>
                        <li><strong>'평균 단가/평가 금액' 노출의 문제점:</strong> 사용자가 보유한 항목에 대한 정보이므로 반드시 <strong>로그인</strong>이 전제되어야 함. 또한 고객 기준으로 복수 계좌를 모두 조회해야 하므로 리소스 및 데이터 처리 측면에서 이슈가 발생할 수 있음.</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </section>
            </div>
            
            {/* Modal Footer */}
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              padding: '16px 24px',
              borderTop: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
              backgroundColor: isDark ? '#0f172a' : '#f8fafc'
            }}>
              <button 
                onClick={() => setIsSearchEnhancementModalOpen(false)}
                style={{
                  backgroundColor: isDark ? '#38bdf8' : '#0266da',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '10px 20px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = isDark ? '#0284c7' : '#0250b0'}
                onMouseOut={(e) => e.target.style.backgroundColor = isDark ? '#38bdf8' : '#0266da'}
              >
                닫기
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  appWrapper: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    backgroundColor: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    transition: 'background-color 0.3s ease, color 0.3s ease'
  },
  floatingThemeToggle: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 9999,
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '1.2rem',
    backgroundColor: 'var(--bg-secondary)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-color)',
    transition: 'all 0.2s'
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px 24px',
    width: '100%',
    boxSizing: 'border-box'
  },
  phoneMockup: {
    width: '360px',
    height: '800px',
    borderRadius: '0px',
    border: '1px solid #000000',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
  },
  phoneHeaderBar: {
    height: '38px',
    padding: '6px 20px 0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.03)'
  },
  phoneCamera: {
    width: '8px',
    height: '8px',
    backgroundColor: '#000000',
    borderRadius: '50%',
    position: 'absolute',
    top: '12px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 999
  },
  mtsHeader: {
    height: '44px',
    padding: '0 12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative'
  },
  menuBtn: {
    background: 'none',
    border: 'none',
    color: 'inherit',
    cursor: 'pointer'
  },
  titleDropdown: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    cursor: 'pointer',
    padding: '4px 8px',
    borderRadius: '6px'
  },
  toolBtn: {
    background: 'none',
    border: 'none',
    color: 'inherit',
    cursor: 'pointer',
    padding: '4px'
  },
  stockDropdownMenu: {
    position: 'absolute',
    top: '40px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '200px',
    borderRadius: '8px',
    border: '1px solid var(--border-color)',
    zIndex: 99,
    padding: '6px 0'
  },
  dropdownItem: {
    padding: '10px 14px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    fontSize: '0.8rem'
  },
  quoteBar: {
    padding: '10px 14px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  actionBtn: {
    border: 'none',
    borderRadius: '4px',
    color: '#fff',
    fontSize: '0.78rem',
    fontWeight: '900',
    padding: '6px 12px',
    cursor: 'pointer'
  },
  subTabs: {
    display: 'flex',
    height: '32px'
  },
  subTabItem: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.78rem',
    cursor: 'pointer',
    borderBottom: '2px solid transparent',
    transition: 'all 0.2s'
  },
  screenContent: {
    flex: 1,
    overflowY: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  },
  hogaWrapper: {
    flex: 1,
    display: 'flex',
    overflowY: 'hidden'
  },
  hogaRow: {
    display: 'flex',
    height: '32px',
    alignItems: 'center',
    cursor: 'pointer',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    transition: 'background-color 0.15s'
  },
  hogaSizeCol: {
    flex: 1.2,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.72rem',
    fontWeight: '600'
  },
  hogaSizeBar: {
    height: '80%',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '2px',
    fontSize: '0.68rem',
    fontWeight: '700'
  },
  hogaPriceCol: {
    flex: 2,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.8rem',
    gap: '2px'
  },
  hogaDetailsCard: {
    width: '90px',
    display: 'flex',
    flexDirection: 'column',
    padding: '6px'
  },
  detailTextRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.65rem',
    marginBottom: '3px'
  },
  detailLabel: {
    color: '#888'
  },
  detailVal: {
    fontWeight: '700'
  },
  chartLegend: {
    display: 'flex',
    gap: '12px',
    fontSize: '0.68rem',
    marginTop: '6px',
    justifyContent: 'center',
    opacity: 0.8
  },
  tabPlaceholder: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px'
  },
  orderPanelSlide: {
    position: 'absolute',
    bottom: '36px',
    left: 0,
    width: '100%',
    borderTopWidth: '2px',
    borderTopStyle: 'solid',
    borderTopLeftRadius: '16px',
    borderTopRightRadius: '16px',
    padding: '16px',
    zIndex: 100,
    animation: 'slideUp 0.3s ease-out'
  },
  orderPanelHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px'
  },
  closeOrderBtn: {
    background: 'none',
    border: 'none',
    fontSize: '1.25rem',
    fontWeight: '700',
    color: 'inherit',
    cursor: 'pointer'
  },
  orderForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  inputRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  numberInputWrapper: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid var(--border-color)',
    borderRadius: '6px',
    overflow: 'hidden'
  },
  numAdjustBtn: {
    width: '28px',
    height: '28px',
    backgroundColor: 'rgba(0,0,0,0.05)',
    border: 'none',
    color: 'inherit',
    fontWeight: '800',
    cursor: 'pointer'
  },
  orderInput: {
    width: '80px',
    height: '28px',
    textAlign: 'center',
    border: 'none',
    outline: 'none',
    fontSize: '0.8rem',
    fontWeight: '800'
  },
  shortcutBtnGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '4px'
  },
  shortcutBtn: {
    border: 'none',
    borderRadius: '4px',
    padding: '6px 0',
    fontSize: '0.75rem',
    fontWeight: '600',
    cursor: 'pointer'
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 0',
    borderTop: '1px solid var(--border-color)',
    marginTop: '6px'
  },
  submitOrderBtn: {
    border: 'none',
    borderRadius: '6px',
    color: '#fff',
    fontWeight: '900',
    padding: '10px 0',
    cursor: 'pointer',
    fontSize: '0.85rem'
  },
  marqueeBar: {
    height: '22px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    padding: '0 12px'
  },
  marqueeContent: {
    display: 'flex',
    gap: '6px',
    alignItems: 'center'
  },
  phoneBottomNav: {
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 10px',
    backgroundColor: 'rgba(0,0,0,0.05)'
  },
  navBtn: {
    background: 'none',
    border: 'none',
    fontSize: '1rem',
    cursor: 'pointer'
  },
  phoneNavTextBtn: {
    background: 'none',
    border: 'none',
    fontSize: '0.7rem',
    cursor: 'pointer'
  },
  toastContainer: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    zIndex: 9999
  },
  toast: {
    padding: '12px 20px',
    borderRadius: '8px',
    borderLeftWidth: '4px',
    borderLeftStyle: 'solid',
    fontSize: '0.85rem',
    fontWeight: '700',
    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
    display: 'flex',
    alignItems: 'center',
    animation: 'slideUp 0.2s ease-out'
  }
};

export default App;
