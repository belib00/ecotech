import { useEffect } from 'react';
import { criarUsuario, buscarUsuarios } from './services/api';

function App() {

  useEffect(() => {

    async function testarAPI() {

      await criarUsuario(
        'Isabela',
        'isa@gmail.com'
      );

      const usuarios = await buscarUsuarios();

      console.log(usuarios);
    }

    testarAPI();

  }, []);

  return (
    <div>
      <h1>EcoTech</h1>
    </div>
  );
}

export default App;