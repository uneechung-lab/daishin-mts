import React, { useState, useEffect } from 'react';
import './App.css';

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

      {/* Android Navigation Keys Bar */}
      <div style={{
        height: '32px',
        backgroundColor: isDark ? '#0b0f19' : '#f8fafc',
        borderTop: isDark ? '1px solid #1e293b' : '1px solid #f1f5f9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '0 40px'
      }}>
        {/* ||| key */}
        <div style={{ display: 'flex', gap: '3px', cursor: 'pointer' }}>
          <div style={{ width: '2px', height: '12px', backgroundColor: '#94a3b8', borderRadius: '1px' }}></div>
          <div style={{ width: '2px', height: '12px', backgroundColor: '#94a3b8', borderRadius: '1px' }}></div>
          <div style={{ width: '2px', height: '12px', backgroundColor: '#94a3b8', borderRadius: '1px' }}></div>
        </div>
        {/* O key */}
        <div style={{
          width: '12px',
          height: '12px',
          border: '2px solid #94a3b8',
          borderRadius: '3px',
          cursor: 'pointer'
        }}></div>
        {/* < key */}
        <div 
          onClick={onBackClick}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="3"><polyline points="15 18 9 12 15 6" /></svg>
        </div>
      </div>
    </>
  );

  if (hideFrame) {
    return content;
  }

  return (
    <div style={{
      ...styles.phoneMockup,
      borderColor: isDark ? '#334155' : '#1e293b',
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

function AsIsStockSearchView({ setAsIsSubScreen, isDark }) {
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
            disabled
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
        {stocks.map((s, idx) => (
          <div 
            key={idx} 
            onClick={() => setAsIsSubScreen('currentPrice')}
            style={{ padding: '14px 16px', borderBottom: '1px solid #f1f5f9', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '4px' }}
          >
            <span style={{ fontSize: '1.05rem', fontWeight: '600', color: '#222' }}>{s.name}</span>
            <span style={{ fontSize: '0.82rem', color: '#888' }}>{s.code}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ToBeEtfMallView({ setToBeSubScreen, isDark, isDrawerOpen, setToBePrevSubScreen, etfMallNavMode, setEtfMallNavMode, activeMallTab, setActiveMallTab }) {
  const [activeTab, setActiveTab] = useState('1주일 매수고객순'); // '1주일 매수고객순', '1주일 매수금액순'
  const [sortOption, setSortOption] = useState('1주일');
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedChip, setSelectedChip] = useState('전체');
  const [favorites, setFavorites] = useState(['A0207Z0', 'A390140']);
  const [ownedSortOption, setOwnedSortOption] = useState('수익률 높은 순');
  const [ownedDisplayOption, setOwnedDisplayOption] = useState('평가금');
  const [isOwnedSortBsheetOpen, setIsOwnedSortBsheetOpen] = useState(false);
  const [isFavoriteBsheetOpen, setIsFavoriteBsheetOpen] = useState(false);
  const [favoritePosition, setFavoritePosition] = useState('bottom');
  const [pendingFavoriteCode, setPendingFavoriteCode] = useState(null);
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
    { name: 'KODEX 현대차로보틱스밸류체인TO', code: 'A0204D0', limit: '투자한도70%', price: 15300, pct: 3.0, positive: true, quantity: 10, avgPrice: 14850 },
    { name: 'DAISHIN343 금융&지주고배당', code: 'A0189Z0', limit: '투자한도70%', price: 125400, pct: -0.5, positive: false, quantity: 5, avgPrice: 126030 },
    { name: '대신글로벌코어리츠', code: 'A390140', limit: '투자한도100%', price: 2950, pct: 1.2, positive: true, quantity: 100, avgPrice: 2915 },
    { name: 'TIGER 미국S&P500', code: 'A0191B0', limit: '투자한도70%', price: 28325, pct: 0.21, positive: true, quantity: 20, avgPrice: 28165 },
    { name: 'RISE 삼성전자SK하이닉스채권혼합50', code: 'A0192C0', limit: '투자한도100%', price: 14550, pct: 1.11, positive: true, quantity: 50, avgPrice: 14390 },
    { name: 'ACE 미국나스닥100', code: 'A0193D0', limit: '투자한도70%', price: 21050, pct: -1.05, positive: false, quantity: 15, avgPrice: 21270 },
    { name: 'KODEX 200', code: 'A005930', limit: '투자한도100%', price: 32450, pct: -0.37, positive: false, quantity: 30, avgPrice: 32570 }
  ];

  const getSortedOwnedList = () => {
    let list = [...ownedList];
    if (ownedSortOption === '평가금액 많은 순') {
      list.sort((a, b) => (b.quantity * b.price) - (a.quantity * a.price));
    } else if (ownedSortOption === '수익률 높은 순') {
      list.sort((a, b) => b.pct - a.pct);
    } else if (ownedSortOption === '수익률 낮은 순') {
      list.sort((a, b) => a.pct - b.pct);
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

  const goDividendList = [
    { name: 'TIGER 코리아배당다우존스', code: 'A0052D0', limit: '투자한도70%', price: 16320, pct: -1.27, positive: false },
    { name: 'PLUS 고배당주', code: 'A161510', limit: '투자한도70%', price: 26325, pct: -1.52, positive: false },
    { name: 'RISE 금융채액티브', code: 'A336160', limit: '투자한도100%', price: 100595, pct: -0.05, positive: false },
    { name: 'TIME Korea플러스배당액티브', code: 'A441800', limit: '투자한도70%', price: 37090, pct: 0.68, positive: true },
    { name: 'KODEX 한국부동산리츠인프라', code: 'A476800', limit: '투자한도100%', price: 4455, pct: 0.34, positive: true },
    { name: 'KoAct 배당성장액티브', code: 'A476850', limit: '투자한도70%', price: 27290, pct: 0.65, positive: true },
    { name: 'ACE 미국고배당소비재', code: 'A0210A0', limit: '투자한도70%', price: 11840, pct: 0.15, positive: true },
    { name: 'SOL 미국배당다우존스', code: 'A0211B0', limit: '투자한도70%', price: 10450, pct: 0.95, positive: true },
    { name: 'KBSTAR 200고배당커버드콜', code: 'A0212C0', limit: '투자한도70%', price: 8640, pct: -0.35, positive: false }
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
    ...goDividendList
  ].filter((item, index, self) => 
    self.findIndex(t => t.name === item.name) === index
  );

  const filterByChip = (list) => {
    if (selectedChip === '전체') return list;
    return list.filter(item => {
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
  };

  const renderEmptyState = () => (
    <div style={{ padding: '40px 20px', textAlign: 'center', color: isDark ? '#64748b' : '#999999', fontSize: '0.88rem' }}>
      해당 조건의 종목이 없습니다.
    </div>
  );

  const renderStockList = (list) => {
    return filterByChip(list).length === 0 ? renderEmptyState() : filterByChip(list).map((item, idx, arr) => {
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
            gap: '8px',
            position: 'relative'
          }}
        >
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
              wordBreak: 'keep-all',
              whiteSpace: 'normal',
              lineHeight: '1.2'
            }}>{item.name}</span>
            {item.quantity !== undefined && item.avgPrice !== undefined && (
              <div style={{ display: 'flex', alignItems: 'center', marginTop: '1px' }}>
                <span style={{ fontSize: '0.72rem', color: isDark ? '#94a3b8' : '#555555' }}>
                  {item.quantity}주 · 내 평균 {item.avgPrice.toLocaleString()}원
                </span>
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: '500', color: '#3b82f6' }}>{item.limit.replace('투자한도', '')}</span>
              <span style={{ width: '1px', height: '10px', backgroundColor: isDark ? '#334155' : '#d1d5db', flexShrink: 0 }} />
              <span style={{ fontSize: '0.72rem', color: isDark ? '#64748b' : '#888888' }}>
                {item.code} · {item.name.includes('리츠') || item.name.includes('부동산') ? '리츠' : (item.name.includes('ETN') ? 'ETN' : 'ETF')} · {item.name.match(/미국|글로벌|S&P500|나스닥|인도|차이나|베트남/) ? '해외' : '국내'}
              </span>
            </div>
          </div>

          {/* Col 2 & 3 Group */}
          {item.quantity !== undefined && item.avgPrice !== undefined && ownedDisplayOption === '평가금' ? (
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
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flexShrink: 0 }}>
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
                </div>

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

          {/* Col 4 */}
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
        </div>
      );
    });
  };

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
              setToBeSubScreen('tigerDetail');
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
      <div style={menuTabsStyle}>
        {['추천', '보유', 'GO배당GO금리', 'TDF', '전체'].map((tab) => (
          <span 
            key={tab} 
            onClick={() => setActiveMallTab(tab)}
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

      {/* Search Input Filter Row with Chips (from Stock Search screen) */}
      <div style={{ 
        padding: '10px 14px 4px 14px', 
        borderBottom: 'none', 
        backgroundColor: isDark ? '#0b0f19' : '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        <div 
          onClick={() => {
            setToBePrevSubScreen('etfMall');
            setToBeSubScreen('stockSearch');
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
            disabled
            style={{
              border: 'none',
              background: 'none',
              width: '100%',
              outline: 'none',
              fontSize: '0.82rem',
              color: isDark ? '#ffffff' : '#222222',
              cursor: 'pointer'
            }}
          />
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
      </div>      {/* Ranking and List Area */}
      <div style={{ ...rankingSectionStyle, padding: '0' }}>
        {activeMallTab === '추천' && (
          <>
            {/* Section Title + Tabs */}
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

            {/* ETF Ranked List */}
            <div>
              {filterByChip([
                { rank: 1, name: 'RISE 삼성전자SK하이닉스채권혼합50', code: 'A0189Z0', limit: '투자한도100%', price: 14550, pct: 1.76,  positive: true  },
                { rank: 2, name: 'SOL AI반도체TOP2플러스',             code: 'A0207Z0', limit: '투자한도70%',  price: 12840, pct: 2.56,  positive: true  },
                { rank: 3, name: 'TIGER 미국S&P500',                   code: 'A0191B0', limit: '투자한도70%',  price: 28165, pct: -0.32, positive: false },
                { rank: 4, name: 'TIGER 미국우주테크',                  code: 'A0185L0', limit: '투자한도70%',  price: 11730, pct: -5.17, positive: false },
                { rank: 5, name: 'TIGER 반도체TOP10',                   code: 'A0199C0', limit: '투자한도100%', price: 9850,  pct: 1.28,  positive: true  }
              ]).length === 0 ? renderEmptyState() : filterByChip([
                { rank: 1, name: 'RISE 삼성전자SK하이닉스채권혼합50', code: 'A0189Z0', limit: '투자한도100%', price: 14550, pct: 1.76,  positive: true  },
                { rank: 2, name: 'SOL AI반도체TOP2플러스',             code: 'A0207Z0', limit: '투자한도70%',  price: 12840, pct: 2.56,  positive: true  },
                { rank: 3, name: 'TIGER 미국S&P500',                   code: 'A0191B0', limit: '투자한도70%',  price: 28165, pct: -0.32, positive: false },
                { rank: 4, name: 'TIGER 미국우주테크',                  code: 'A0185L0', limit: '투자한도70%',  price: 11730, pct: -5.17, positive: false },
                { rank: 5, name: 'TIGER 반도체TOP10',                   code: 'A0199C0', limit: '투자한도100%', price: 9850,  pct: 1.28,  positive: true  }
              ]).map((item, idx, arr) => (
                <div key={idx} 
                  onClick={() => {
                    setToBePrevSubScreen('etfMall');
                    setToBeSubScreen('tigerDetail');
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '12px 14px',
                    borderBottom: idx < arr.length - 1 ? (isDark ? '1px solid #1e293b' : '1px solid #f1f5f9') : 'none',
                    cursor: 'pointer',
                    gap: '10px'
                  }}>
                  {/* Rank number */}
                  <span style={{
                    fontSize: '1.05rem',
                    fontWeight: '800',
                    fontStyle: 'italic',
                    color: isDark ? '#ffffff' : '#111111',
                    width: '18px',
                    flexShrink: 0
                  }}>{item.rank}</span>

                  {/* Left: ETF Name + subtitle */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3px', minWidth: 0 }}>
                    {/* ETF Name only */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{
                        fontSize: item.name.length > 12 ? '0.74rem' : '0.85rem',
                        fontWeight: '600',
                        color: isDark ? '#e2e8f0' : '#111111',
                        letterSpacing: '-0.2px',
                        wordBreak: 'keep-all',
                        whiteSpace: 'normal',
                        lineHeight: '1.2'
                      }}>{item.name}</span>
                      {item.rank === 1 && isDrawerOpen && (
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
                      {item.rank === 3 && isDrawerOpen && (
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
                    {/* 투자한도 + code (no box) */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{
                        fontSize: '0.72rem',
                        fontWeight: '500',
                        color: '#3b82f6',
                        letterSpacing: '-0.1px'
                      }}>{item.limit}</span>
                      <span style={{ width: '1px', height: '10px', backgroundColor: isDark ? '#334155' : '#d1d5db', flexShrink: 0 }} />
                      <span style={{
                        fontSize: '0.72rem',
                        color: isDark ? '#64748b' : '#888888',
                        letterSpacing: '-0.1px'
                      }}>{item.code}</span>
                    </div>
                  </div>

                  {/* Right: Price (top) + Arrow+Pct (bottom) */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', flexShrink: 0, gap: '3px' }}>
                    <span style={{
                      fontSize: '0.92rem',
                      fontWeight: '600',
                      color: isDark ? '#e2e8f0' : '#111111',
                      letterSpacing: '-0.3px'
                    }}>{item.price.toLocaleString()}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <span style={{ fontSize: '0.58rem', color: item.positive ? '#de201e' : '#2366ca' }}>
                        {item.positive ? '▲' : '▼'}
                      </span>
                      <span style={{
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        color: item.positive ? '#de201e' : '#2366ca'
                      }}>{item.positive ? '+' : ''}{item.pct}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Grey Bar Separator */}
            <div style={{
              height: '8px',
              backgroundColor: isDark ? '#121826' : '#f1f5f9',
              flexShrink: 0
            }} />

            {/* GO배당GO금리 퇴직연금 ETF Section */}
            <div style={{ padding: '16px 0 0 0', backgroundColor: isDark ? '#0b0f19' : '#ffffff' }}>
              <div style={{ padding: '0 14px', marginBottom: '12px' }}>
                <span style={{ fontSize: '1.12rem', fontWeight: '600', color: isDark ? '#ffffff' : '#111111', letterSpacing: '-0.3px' }}>GO배당GO금리</span>
              </div>
              <div>
                {filterByChip(goDividendList).length === 0 ? renderEmptyState() : filterByChip(goDividendList).map((item, idx, arr) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '12px 14px',
                    borderBottom: idx < arr.length - 1 ? (isDark ? '1px solid #1e293b' : '1px solid #f1f5f9') : 'none',
                    cursor: 'pointer',
                    gap: '10px'
                  }}>
                    {/* Left: ETF Name + subtitle */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3px', minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{
                          fontSize: '0.85rem',
                          fontWeight: '600',
                          color: isDark ? '#e2e8f0' : '#111111',
                          letterSpacing: '-0.2px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>{item.name}</span>
                      </div>
                      {/* 투자한도 + code */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{
                          fontSize: '0.72rem',
                          fontWeight: '500',
                          color: '#3b82f6',
                          letterSpacing: '-0.1px'
                        }}>{item.limit}</span>
                        <span style={{ width: '1px', height: '10px', backgroundColor: isDark ? '#334155' : '#d1d5db', flexShrink: 0 }} />
                        <span style={{
                          fontSize: '0.72rem',
                          color: isDark ? '#64748b' : '#888888',
                          letterSpacing: '-0.1px'
                        }}>{item.code}</span>
                      </div>
                    </div>

                    {/* Right: Price + arrow pct */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', flexShrink: 0, gap: '3px' }}>
                      <span style={{
                        fontSize: '0.92rem',
                        fontWeight: '600',
                        color: isDark ? '#e2e8f0' : '#111111',
                        letterSpacing: '-0.3px'
                      }}>{item.price.toLocaleString()}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <span style={{ fontSize: '0.58rem', color: item.positive ? '#de201e' : '#2366ca' }}>
                          {item.positive ? '▲' : '▼'}
                        </span>
                        <span style={{
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          color: item.positive ? '#de201e' : '#2366ca'
                        }}>{item.positive ? '+' : ''}{item.pct}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* 보유 Tab View */}
        {activeMallTab === '보유' && (
          <div style={{ padding: '0px 0' }}>
            {/* 정렬 & 옵션 선택 Row */}
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

            {/* 보유 종목 리스트 */}
            <div>
              {renderStockList(getSortedOwnedList())}
            </div>
          </div>
        )}

        {/* GO배당GO금리 Tab View */}
        {activeMallTab === 'GO배당GO금리' && (
          <div style={{ padding: '0px 0' }}>
            {/* 최근 본 종목 Section */}
            <div style={sectionHeaderStyle}>
              최근 본 종목
            </div>
            <div>
              {renderStockList(recentViewedList)}
            </div>

            {/* 인기 종목 Section */}
            <div style={sectionHeaderStyle}>
              인기 종목
            </div>
            <div>
              {renderStockList(goDividendList)}
            </div>
          </div>
        )}

        {/* TDF Tab View */}
        {activeMallTab === 'TDF' && (
          <div style={{ padding: '0px 0' }}>
            {/* 최근 본 종목 Section */}
            <div style={sectionHeaderStyle}>
              최근 본 종목
            </div>
            <div>
              {renderStockList(recentViewedList)}
            </div>

            {/* 인기 종목 Section */}
            <div style={sectionHeaderStyle}>
              인기 종목
            </div>
            <div>
              {renderStockList(tdfList)}
            </div>
          </div>
        )}

        {/* 전체 Tab View */}
        {activeMallTab === '전체' && (
          <div style={{ padding: '0px 0' }}>
            {/* 최근 본 종목 Section */}
            <div style={sectionHeaderStyle}>
              최근 본 종목
            </div>
            <div>
              {renderStockList(recentViewedList)}
            </div>

            {/* 인기 종목 Section */}
            <div style={sectionHeaderStyle}>
              인기 종목
            </div>
            <div>
              {renderStockList(allList)}
            </div>
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
                '평가금액 많은 순',
                '수익률 낮은 순'
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

      {/* Android Navigation Bar */}
      <div style={{
        height: '32px',
        backgroundColor: isDark ? '#0b0f19' : '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '0 40px',
        color: '#ffffff'
      }}>
        {/* ||| key */}
        <div style={{ display: 'flex', gap: '3px', cursor: 'pointer' }}>
          <div style={{ width: '2px', height: '12px', backgroundColor: '#94a3b8', borderRadius: '1px' }}></div>
          <div style={{ width: '2px', height: '12px', backgroundColor: '#94a3b8', borderRadius: '1px' }}></div>
          <div style={{ width: '2px', height: '12px', backgroundColor: '#94a3b8', borderRadius: '1px' }}></div>
        </div>
        {/* O key */}
        <div style={{
          width: '12px',
          height: '12px',
          border: '2px solid #94a3b8',
          borderRadius: '3px',
          cursor: 'pointer'
        }}></div>
        {/* < key */}
        <div 
          onClick={() => setToBeSubScreen('menu')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="3"><polyline points="15 18 9 12 15 6" /></svg>
        </div>
      </div>
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

      {/* Android Back/Navigation Bar */}
      <div style={{
        height: '36px',
        backgroundColor: isDark ? '#0b0f19' : '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '0 40px',
        color: '#ffffff',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', gap: '3px', cursor: 'pointer' }}>
          <div style={{ width: '2px', height: '12px', backgroundColor: '#94a3b8', borderRadius: '1px' }}></div>
          <div style={{ width: '2px', height: '12px', backgroundColor: '#94a3b8', borderRadius: '1px' }}></div>
          <div style={{ width: '2px', height: '12px', backgroundColor: '#94a3b8', borderRadius: '1px' }}></div>
        </div>
        <div style={{
          width: '12px',
          height: '12px',
          border: '2px solid #94a3b8',
          borderRadius: '3px',
          cursor: 'pointer'
        }}></div>
        <div 
          onClick={() => setToBeSubScreen('etfMall')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="3"><polyline points="15 18 9 12 15 6" /></svg>
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
    if (selectedChip === '전체') return stockList;
    return stockList.filter(s => {
      if (selectedChip === 'ETF') return s.name.includes('ETF') || s.name.includes('밸류') || s.name.includes('인프') || s.name.includes('액티') || s.name.includes('S&P500') || s.name.includes('코스닥') || s.name.includes('TDF');
      if (selectedChip === 'ETN') return s.name.includes('ETN');
      if (selectedChip === '리츠') return s.name.includes('리츠');
      return true;
    });
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
            disabled
            style={{
              border: 'none',
              background: 'none',
              width: '100%',
              outline: 'none',
              fontSize: '0.82rem',
              color: isDark ? '#ffffff' : '#222222'
            }}
          />
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

      {/* Android Bottom Navigation Bar */}
      <div style={{
        height: '36px',
        backgroundColor: isDark ? '#0b0f19' : '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '0 40px',
        color: '#ffffff',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', gap: '3px', cursor: 'pointer' }}>
          <div style={{ width: '2px', height: '12px', backgroundColor: '#94a3b8', borderRadius: '1px' }}></div>
          <div style={{ width: '2px', height: '12px', backgroundColor: '#94a3b8', borderRadius: '1px' }}></div>
          <div style={{ width: '2px', height: '12px', backgroundColor: '#94a3b8', borderRadius: '1px' }}></div>
        </div>
        <div style={{
          width: '12px',
          height: '12px',
          border: '2px solid #94a3b8',
          borderRadius: '3px',
          cursor: 'pointer'
        }}></div>
        <div 
          onClick={() => setToBeSubScreen(toBePrevSubScreen)}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="3"><polyline points="15 18 9 12 15 6" /></svg>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [isDark, setIsDark] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [selectedStock, setSelectedStock] = useState('신대증 30');
  const [activeTab, setActiveTab] = useState('호가');
  const [activeBottomTab, setActiveBottomTab] = useState('보유상품 현황');
  const [showOrderPanel, setShowOrderPanel] = useState(false);
  const [orderType, setOrderType] = useState('buy');
  const [orderPrice, setOrderPrice] = useState(stockData['신대증 30'].price);
  const [orderQty, setOrderQty] = useState(10);
  const [stockSelectorOpen, setStockSelectorOpen] = useState(false);
  const [activeScreen, setActiveScreen] = useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [asIsSubScreen, setAsIsSubScreen] = useState('menu'); // 'menu', 'currentPrice', 'stockSearch'
  const [toBeSubScreen, setToBeSubScreen] = useState('menu'); // 'menu', 'etfMall'
  const [toBePrevSubScreen, setToBePrevSubScreen] = useState('etfMall');
  const [etfMallNavMode, setEtfMallNavMode] = useState('default'); // 'default' or 'search'
  const [activeMallTab, setActiveMallTab] = useState('추천');
  const [isAsIsToBeExpanded, setIsAsIsToBeExpanded] = useState(false);
  const [enteredViaEtfMall, setEnteredViaEtfMall] = useState(false);

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
        gap: '8px'
      }}>
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
                  borderColor: isDark ? '#334155' : '#1e293b',
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
                                  fontWeight: isSelected ? '800' : '500',
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
                      <AsIsStockSearchView setAsIsSubScreen={setAsIsSubScreen} isDark={isDark} />
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
                  borderColor: isDark ? '#334155' : '#1e293b',
                  backgroundColor: isDark ? '#0b0f19' : '#fff',
                  width: '360px',
                  height: '800px',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative'
                }}>
                  {toBeSubScreen === 'etfMall' ? (
                    <ToBeEtfMallView setToBeSubScreen={setToBeSubScreen} isDark={isDark} isDrawerOpen={isDrawerOpen} setToBePrevSubScreen={setToBePrevSubScreen} etfMallNavMode={etfMallNavMode} setEtfMallNavMode={setEtfMallNavMode} activeMallTab={activeMallTab} setActiveMallTab={setActiveMallTab} />
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
                            fontWeight: isSelected ? '800' : '500',
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
                  {/* Dim Overlay */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    borderRadius: '24px',
                    zIndex: 100,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(3px)',
                    pointerEvents: 'auto'
                  }}>
                    <div style={{
                      backgroundColor: '#1e293b',
                      color: '#f8fafc',
                      padding: '12px 24px',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: '700',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                      border: '1px solid #334155',
                      letterSpacing: '-0.3px',
                      textAlign: 'center'
                    }}>
                      브전실에서 작업중....
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Task Title immediately below the emulators */}
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
              KRX 거래시간 연장(프리/애프터 마켓) 및 NXT ETF 거래 도입 (SOR 주문/거래시간)
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
                          <li style={{ marginBottom: '6px' }}>기존 '퇴직연금 ETF 전용 현재가' 화면을 폐기하고, 일반 트레이딩에서 사용하는 '전체 현재가' 화면과 연동하여 일원화</li>
                          <li>
                            ETF몰 메뉴 및 화면 신설
                            <ul style={{ margin: '4px 0 0 0', paddingLeft: '22px', listStyleType: 'circle' }}>
                              <li style={{ marginBottom: '2px' }}>상단 탭 세분화</li>
                              <li style={{ marginBottom: '2px' }}>검색창 기능 강화</li>
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
                          <li>보유/미보유 종목 UI 이원화</li>
                        </ul>
                      </div>
                    </li>
                    <li style={{ wordBreak: 'keep-all', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <span style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#00c3a5', color: '#fff', fontSize: '11px', fontWeight: 'bold' }}>3</span>
                      <div>
                        <strong style={{ color: isDark ? '#cbd5e1' : '#374151' }}>전체 현재가 화면 연동</strong>
                        <ul style={{ margin: '4px 0 0 0', paddingLeft: '16px', listStyleType: 'disc', fontSize: '15px', color: '#6b7280' }}>
                          <li>일반 트레이딩에서 사용하는 '전체 현재가' 화면 연동</li>
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
                          <li>좌측 정렬 선택 버튼 클릭 시 바텀시트 정렬 옵션 메뉴(`수익률 높은 순`, `평가금액 많은 순`, `수익률 낮은 순`) 호출 및 정렬 스위칭</li>
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
                          <li>우측 토글에서 [현재가] 선택 시, 평가금액 통합 블록이 비활성화되며 기존의 개별 [현재가/거래량] 및 [대비금액/대비율] 고유 레이아웃 형태로 자동 복원</li>
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
    borderRadius: '24px',
    border: '6px solid #22252a',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
  },
  phoneHeaderBar: {
    height: '32px',
    padding: '0 20px',
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
