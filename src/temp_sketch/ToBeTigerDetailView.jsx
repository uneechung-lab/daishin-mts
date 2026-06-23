
function ToBeTigerDetailView({ setToBeSubScreen, isDark }) {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: isDark ? '#0b0f19' : '#ffffff',
    color: isDark ? '#cbd5e1' : '#333333',
    fontFamily: 'sans-serif',
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
    padding: '12px 14px 8px 14px',
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    borderBottom: isDark ? '1px solid #1e293b' : '1px solid #f1f5f9'
  };

  const tabStyle = (active) => ({
    padding: '8px 12px',
    fontSize: '0.82rem',
    fontWeight: active ? '800' : '400',
    color: active ? '#ffffff' : (isDark ? '#94a3b8' : '#777777'),
    backgroundColor: active ? (isDark ? '#1e293b' : '#22252a') : 'transparent',
    borderRadius: '4px',
    cursor: 'pointer'
  });

  const subTabItemStyle = (active) => ({
    flex: 1,
    textAlign: 'center',
    padding: '10px 0',
    fontSize: '0.82rem',
    fontWeight: active ? '800' : '400',
    color: active ? (isDark ? '#ffffff' : '#222222') : (isDark ? '#64748b' : '#888888'),
    borderBottom: active ? (isDark ? '2px solid #ffffff' : '2px solid #222222') : '2px solid transparent',
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
          onClick={() => setToBeSubScreen('etfMall')}
          style={{ border: 'none', background: 'none', padding: '0 12px 0 0', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'inherit' }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flex: 1, justifyContent: 'flex-start' }}>
          <span style={{ fontWeight: '800', fontSize: '1.05rem', letterSpacing: '-0.3px' }}>TIGER 미국S&P500</span>
          <span style={{ fontSize: '0.6rem', color: isDark ? '#94a3b8' : '#777777' }}>▼</span>
        </div>
        <div style={{ display: 'flex', gap: '14px', alignItems: 'center', color: isDark ? '#94a3b8' : '#555555' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" /></svg>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /></svg>
        </div>
      </div>

      {/* Main content area (scrollable) */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        
        {/* Price & Trade Buttons Row */}
        <div style={priceSectionStyle}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '0.68rem', fontWeight: 'bold', color: '#fff', backgroundColor: '#00c3a5', padding: '1px 4px', borderRadius: '2px', marginRight: '6px' }}>KRX</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '1.85rem', fontWeight: '900', color: '#de201e', letterSpacing: '-0.5px', lineHeight: 1 }}>28,325</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#de201e', fontSize: '0.78rem', fontWeight: '700' }}>
                <span>▲ 60</span>
                <span>(0.21%)</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button style={{ backgroundColor: '#2366ca', color: '#ffffff', border: 'none', borderRadius: '4px', width: '56px', height: '32px', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer' }}>매도</button>
              <button style={{ backgroundColor: '#de201e', color: '#ffffff', border: 'none', borderRadius: '4px', width: '56px', height: '32px', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer' }}>매수</button>
            </div>
          </div>
          {/* Notice Banner */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px', color: '#de201e', fontSize: '0.72rem', fontWeight: '600' }}>
            <span>ⓘ RIA 공제 축소 상품</span>
          </div>
        </div>

        {/* Sub Info Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 14px', borderBottom: isDark ? '1px solid #1e293b' : '1px solid #f1f5f9', fontSize: '0.74rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: isDark ? '#94a3b8' : '#6b7280' }}>신대증 40</span>
            <span style={{ fontSize: '0.62rem', fontWeight: 'bold', color: '#00c3a5', border: '1px solid #00c3a5', padding: '0px 3px', borderRadius: '2px', lineHeight: '1.2' }}>KRX</span>
          </div>
          <div style={{ fontWeight: '700', color: isDark ? '#e2e8f0' : '#111111' }}>
            7,707,508 <span style={{ color: '#2366ca', fontSize: '0.7rem' }}>(16.97%)</span>
          </div>
        </div>

        {/* Market Select Tabs & Sub Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '4px 10px', backgroundColor: isDark ? '#121826' : '#fafafa', borderBottom: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0', gap: '10px' }}>
          <div style={tabStyle(true)}>KRX</div>
          <div style={tabStyle(false)}>NXT</div>
          <div style={tabStyle(false)}>SOR</div>
        </div>

        {/* Sub Tabs: 호가, 차트... */}
        <div style={{ display: 'flex', borderBottom: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0', backgroundColor: isDark ? '#121826' : '#ffffff' }}>
          <span style={subTabItemStyle(true)}>호가</span>
          <span style={subTabItemStyle(false)}>거래원</span>
          <span style={subTabItemStyle(false)}>시간</span>
          <span style={subTabItemStyle(false)}>일자</span>
          <span style={subTabItemStyle(false)}>차트</span>
        </div>

        {/* Order Book Table */}
        <div style={{ flex: 1, backgroundColor: isDark ? '#0b0f19' : '#ffffff', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed', borderSpacing: 0 }}>
              <tbody>
                {[
                  { size: 757, price: 28375, pct: '+0.39%', sideInfo: 'S&P 500' },
                  { size: 1541, price: 28370, pct: '+0.37%', sideInfo: 'NAV 28,071.93(-143.86)' },
                  { size: 831, price: 28365, pct: '+0.35%', sideInfo: '추적오차율 +0.10' },
                  { size: 1453, price: 28360, pct: '+0.34%', sideInfo: '괴리율 +0.90' },
                  { size: 1757, price: 28355, pct: '+0.32%', sideInfo: '거래량 7,707,508' },
                  { size: 18122, price: 28350, pct: '+0.30%', sideInfo: '체결강도 93.40%' },
                  { size: 24867, price: 28345, pct: '+0.28%', sideInfo: '전종 28,265' },
                  { size: 30444, price: 28340, pct: '+0.27%', sideInfo: '전거 4,542만' },
                  { size: 81612, price: 28335, pct: '+0.25%', hasTag: '고', sideInfo: '시가 28,265' },
                  { size: 141807, price: 28330, pct: '+0.23%', sideInfo: '고가 28,335 / 저가 28,265' }
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
                        <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: barWidth, backgroundColor: isDark ? '#1b2d47' : '#cbdffd', zIndex: 1 }} />
                        <span style={{ position: 'relative', zIndex: 2, fontSize: '0.8rem', fontWeight: '600', color: isDark ? '#cbd5e1' : '#333' }}>
                          {row.size.toLocaleString()}
                          {row.hasTag && <span style={{ color: '#de201e', fontSize: '0.62rem', fontWeight: 'bold', marginLeft: '2px' }}>{row.hasTag}</span>}
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
                        <span>{row.price.toLocaleString()}</span>
                        <span style={{ fontSize: '0.68rem', fontWeight: '600', marginLeft: '4px' }}>{row.pct}</span>
                      </td>
                      {/* Right: Info */}
                      <td style={{
                        width: '30%',
                        backgroundColor: isDark ? '#0b0f19' : '#fafafa',
                        fontSize: '0.65rem',
                        color: isDark ? '#94a3b8' : '#777777',
                        paddingLeft: '6px',
                        verticalAlign: 'middle'
                      }}>
                        {row.sideInfo}
                      </td>
                    </tr>
                  );
                })}

                {/* Spread Line */}
                <tr style={{ height: '34px', borderBottom: isDark ? '1px solid #1e293b' : '1px solid #f1f5f9' }}>
                  <td style={{ width: '30%', borderRight: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0', paddingLeft: '8px', verticalAlign: 'middle' }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: 'bold', color: '#047857', border: '1px solid #047857', padding: '0px 3px', borderRadius: '2px' }}>증</span>
                  </td>
                  <td style={{
                    width: '40%',
                    borderRight: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0',
                    textAlign: 'center',
                    fontSize: '0.82rem',
                    fontWeight: '800',
                    color: '#de201e',
                    verticalAlign: 'middle'
                  }}>
                    <span>28,327</span>
                    <span style={{ fontSize: '0.68rem', fontWeight: '600', marginLeft: '4px' }}>+0.22%</span>
                  </td>
                  <td style={{ width: '30%', padding: '0 6px', verticalAlign: 'middle' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: isDark ? '1px solid #334155' : '1px solid #ccd0d7', borderRadius: '4px', padding: '2px 6px', fontSize: '0.7rem', fontWeight: '700', cursor: 'pointer' }}>
                      <span>10호가</span>
                      <span>▼</span>
                    </div>
                  </td>
                </tr>

                {/* Bid Rows */}
                {[
                  { price: 28325, pct: '+0.21%', size: 96333 },
                  { price: 28320, pct: '+0.19%', size: 118054 },
                  { price: 28315, pct: '+0.18%', size: 145914 }
                ].map((row, i) => {
                  const maxBidSize = 145914;
                  const barWidth = ((row.size / maxBidSize) * 100) + '%';
                  return (
                    <tr key={'bid-' + i} style={{ height: '34px', borderBottom: isDark ? '1px solid #1e293b' : '1px solid #f1f5f9' }}>
                      <td style={{ width: '30%', borderRight: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0', backgroundColor: isDark ? '#0b0f19' : '#ffffff' }}></td>
                      <td style={{
                        width: '40%',
                        borderRight: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0',
                        backgroundColor: isDark ? '#2b1b1b' : '#ffefef',
                        color: '#de201e',
                        textAlign: 'center',
                        fontSize: '0.82rem',
                        fontWeight: '800',
                        verticalAlign: 'middle'
                      }}>
                        <span>{row.price.toLocaleString()}</span>
                        <span style={{ fontSize: '0.68rem', fontWeight: '600', marginLeft: '4px' }}>{row.pct}</span>
                      </td>
                      <td style={{
                        width: '30%',
                        position: 'relative',
                        backgroundColor: isDark ? '#2b1b1b' : '#ffefef',
                        textAlign: 'left',
                        paddingLeft: '8px',
                        verticalAlign: 'middle'
                      }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: barWidth, backgroundColor: isDark ? '#4c2626' : '#ffd5d5', zIndex: 1 }} />
                        <span style={{ position: 'relative', zIndex: 2, fontSize: '0.8rem', fontWeight: '600', color: isDark ? '#cbd5e1' : '#333' }}>
                          {row.size.toLocaleString()}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Cumulative Row */}
          <div style={{
            height: '28px',
            borderTop: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0',
            backgroundColor: isDark ? '#121826' : '#f8fafc',
            display: 'flex',
            alignItems: 'center',
            fontSize: '0.74rem',
            fontWeight: '700',
            color: isDark ? '#cbd5e1' : '#475569',
            flexShrink: 0
          }}>
            <div style={{ width: '30%', textAlign: 'right', paddingRight: '8px' }}>303,191</div>
            <div style={{ width: '40%', textAlign: 'center' }}>10:27</div>
            <div style={{ width: '30%', textAlign: 'left', paddingLeft: '8px' }}>604,039</div>
          </div>
        </div>

        {/* Nasdaq Composite Banner */}
        <div style={{
          height: '30px',
          backgroundColor: '#0a0d14',
          color: '#ffffff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 12px',
          fontSize: '0.74rem',
          fontWeight: '700',
          flexShrink: 0
        }}>
          <span>나스닥 종합</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>26,021.66</span>
            <span style={{ color: '#2366ca', display: 'flex', alignItems: 'center', gap: '2px' }}>▼ 354.68 (1.34%)</span>
          </div>
        </div>
      </div>

      {/* Bottom Menu Bar */}
      <div style={{
        height: '52px',
        borderTop: isDark ? '1px solid #1e293b' : '1px solid #e2e8f0',
        backgroundColor: isDark ? '#121826' : '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        fontSize: '0.62rem',
        fontWeight: 'bold',
        color: isDark ? '#64748b' : '#777777',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
          <span>관심종목</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', color: '#00c3a5' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></svg>
          <span>주식현재가</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="9" y1="9" x2="15" y2="15" /><line x1="15" y1="9" x2="9" y2="15" /></svg>
          <span>주식차트</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>
          <span>주식주문</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
          <span>주식잔고</span>
        </div>
      </div>

    </div>
  );
}
