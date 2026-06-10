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
      { price: 29800, percent: '+7.19%', type: 'ask', size: 120 },
      { price: 29750, percent: '+7.01%', type: 'ask', size: 240 },
      { price: 29700, percent: '+6.83%', type: 'ask', size: 856 },
      { price: 29650, percent: '+6.65%', type: 'ask', size: 1200 },
      { price: 29600, percent: '+6.47%', type: 'ask', size: 4920 },
      { price: 29550, percent: '+6.29%', type: 'bid', size: 5200 },
      { price: 29500, percent: '+6.12%', type: 'bid', size: 6800 },
      { price: 29450, percent: '+5.94%', type: 'bid', size: 11000 },
      { price: 29400, percent: '+5.76%', type: 'bid', size: 15400 },
      { price: 29350, percent: '+5.58%', type: 'bid', size: 22000 }
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
  isDrawerOpen
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

  return (
    <div style={{
      ...styles.phoneMockup,
      borderColor: isDark ? '#334155' : '#1e293b',
      backgroundColor: isDark ? '#0b0f19' : '#fff'
    }}>
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
          <button style={{ ...styles.menuBtn, color: isDark ? '#fff' : '#000', padding: 0, display: 'flex', alignItems: 'center' }}>
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
          
          <button style={{ ...styles.toolBtn, color: isDark ? '#fff' : '#111', padding: 0, display: 'flex', alignItems: 'center' }}>
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
            width: '22px',
            height: '22px',
            borderRadius: '50%',
            backgroundColor: '#00c3a5',
            color: '#fff',
            fontSize: '13px',
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
              width: '22px',
              height: '22px',
              borderRadius: '50%',
              backgroundColor: '#00c3a5',
              color: '#fff',
              fontSize: '13px',
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
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                backgroundColor: '#00c3a5',
                color: '#fff',
                fontSize: '13px',
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
                                height: '260px',
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
        <button style={{ width: '48px', border: 'none', background: 'none', borderLeft: isDark ? '1px solid #1e293b' : '1px solid #f1f5f9', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
        <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

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
          const isActive = num === 2;
          return (
            <span
              key={num}
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
        {/* Left Column: Emulators & Title */}
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
                <span style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#00c3a5', color: '#fff', fontSize: '12px', fontWeight: 'bold' }}>1</span>
                <div>
                  <strong style={{ color: isDark ? '#cbd5e1' : '#374151' }}>실시간 이중 호가 비교:</strong> 통합 모드에서 KRX 시세(29,550원)와 NXT 시세(29,600원)를 한눈에 볼 수 있습니다.
                </div>
              </li>
              <li style={{ wordBreak: 'keep-all', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <span style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#00c3a5', color: '#fff', fontSize: '12px', fontWeight: 'bold' }}>2</span>
                <div>
                  <strong style={{ color: isDark ? '#cbd5e1' : '#374151' }}>유연한 시장 전환:</strong> 최좌측 토글 탭을 클릭하여 <span style={{ fontFamily: 'var(--font-sans)', fontWeight: '800', color: '#00c3a5', backgroundColor: isDark ? 'rgba(0, 195, 165, 0.15)' : 'rgba(0, 195, 165, 0.08)', padding: '2px 6px', borderRadius: '4px', fontSize: '11px', margin: '0 2px' }}>통합 ☰</span>, <span style={{ fontFamily: 'var(--font-sans)', fontWeight: '800', color: '#d97706', backgroundColor: isDark ? 'rgba(217, 119, 6, 0.15)' : 'rgba(217, 119, 6, 0.08)', padding: '2px 6px', borderRadius: '4px', fontSize: '11px', margin: '0 2px' }}>NXT ☰</span>, <span style={{ fontFamily: 'var(--font-sans)', fontWeight: '800', color: '#00977d', backgroundColor: isDark ? 'rgba(0, 151, 125, 0.15)' : 'rgba(0, 151, 125, 0.08)', padding: '2px 6px', borderRadius: '4px', fontSize: '11px', margin: '0 2px' }}>KRX ☰</span> 모드를 손쉽게 오갈 수 있습니다.
                </div>
              </li>
              <li style={{ wordBreak: 'keep-all', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <span style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#00c3a5', color: '#fff', fontSize: '12px', fontWeight: 'bold' }}>3</span>
                <div>
                  <strong style={{ color: isDark ? '#cbd5e1' : '#374151' }}>시장 지표 배너 탑재:</strong> 두 시장 간 가격 차이 정보 및 점유율/거래량 비교 요약 배너를 상단에 구성했습니다.
                </div>
              </li>
            </ul>
          </div>
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
