import { BrowserRouter, Routes, Route } from "react-router-dom";

import SiteLayout from "./components/SiteLayout";

import Index from "./pages/Index";
import Produtos from "./pages/Produtos";
import ProdutoDetalhe from "./pages/ProdutoDetalhe";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Index />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/produto/:id" element={<ProdutoDetalhe />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;