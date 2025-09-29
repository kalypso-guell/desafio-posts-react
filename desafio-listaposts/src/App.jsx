import PostsList from './PostsList';

function App() {
  return (
    <div className="container py-5">
      <header className="text-center mb-5">
        <h1 className="display-4 text-primary">📝 Lista de Publicaciones</h1>
        <p className="text-muted">Consumiendo datos desde JSONPlaceholder API</p>
      </header>
      
      <PostsList />
    </div>
  );
}

export default App;
