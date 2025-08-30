# ZSPRD Portfolio Analytics

ZSPRD Portfolio Analytics is a SaaS platform delivering institutional-grade portfolio analytics for high-net-worth individuals ($1M+ portfolios). Our mission is to democratize professional investment analysis tools, offering advanced features at a fraction of traditional enterprise costs.

## Features

- **Portfolio Tracking**: Real-time tracking of US/international stocks, ETFs, Bitcoin/Ethereum, and cash (USD/EUR/GBP)
- **Performance Analytics**: Total/annualized returns, volatility, Sharpe ratio, drawdown, and more
- **Risk Analysis**: Value at Risk, stress tests, and risk metrics
- **Asset Allocation**: Visual breakdowns by asset type, sector, and geography
- **Professional PDF Reports**: Downloadable, presentation-ready analytics

## Technology Stack

- **Frontend**: Next.js 15+, React 19+, Fuse React Admin, TailwindCSS, Material-UI 7+, TanStack Query, ApexCharts
- **Backend**: FastAPI (Python 3.11+), PostgreSQL, Redis, JWT Auth (NextAuth.js)
- **Microservices**: Auth, Portfolio, Analytics, MarketData, Reports
- **Deployment**: Vercel

## Folder Structure

```
src/
├── api/                  # API layer (hooks, services, types, models)
├── components/           # UI components (views, ui, forms)
├── (routes)/             # Next.js App Router pages
├── contexts/             # React contexts
├── hooks/                # Custom React hooks
├── lib/                  # Utilities & constants
├── types/                # Frontend-specific types
```

## Coding Patterns

- **TanStack Query** for server state
- **NextAuth.js** for authentication
- **ApexCharts** for financial data visualization
- **Material-UI** and **Fuse** for UI/UX
- **Responsive Design**: Mobile-first, professional desktop experience
- **Security**: JWT handling, authenticated API calls
- **Accessibility**: WCAG compliance

## Getting Started

1. **Install dependencies**
    ```powershell
    npm install
    ```
2. **Run development server**
    ```powershell
    npm run dev
    ```
3. **Environment Variables**
    - Configure `.env.local` with service URLs and secrets

## License

This project is licensed for ZSPRD internal use. See LICENSE for details.

## More Information

- [Fuse Theme](https://fusetheme.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
