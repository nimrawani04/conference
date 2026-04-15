# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


Payment flow
```mermaid
flowchart LR
  A["/registration Form"] --> B["sessionStorage pendingRegistration"]
  B --> C["POST /api/create-payment-order"]
  C --> D["Qfix payment page"]
  D --> E["/payment-callback"]
  E --> F["POST /api/verify-payment"]
  F --> G["POST /api/register"]
  G --> H["POST /api/send-ticket"]
  G --> I["/registration-success"]
```