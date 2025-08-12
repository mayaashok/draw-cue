# Draw-Cue 

This sets up a React Frontend + Flask Backend project working in Vite with HMR some ESLint rules. Additionally, the Flask Backend utilizes a SQLAlchemy database and a Google Gemini API Key. Currenty a work in progress...

## Available Scripts
#### In the main project directory, you can run:
```
npm install
npm run dev
o + enter
```
#### In another terminal, you can run:
```
cd api
python -m venv venv
source venv/bin/activate (or venv\Scripts\activate for Powershell/CMD on Windows)
pip install flask flask_cors flask_sqlalchemy sqlalchemy python-dotenv google-genai
cd .. && npm run api
```
#### In another terminal to test if the Flask server is working, you can run:
```
curl http://127.0.0.1:5000/api/time
```


Currently, two official plugins are available:
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

#### Expanding the ESLint configuration
If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
