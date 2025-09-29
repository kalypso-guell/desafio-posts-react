import { useState, useEffect } from 'react';

function PostsList() {
  // Estado para almacenar las publicaciones
  const [posts, setPosts] = useState([]);
  
  // Estado para controlar la carga
  const [loading, setLoading] = useState(true);
  
  // Estado para manejar errores
  const [error, setError] = useState(null);

  // useEffect para hacer la petición cuando el componente se monte
  useEffect(() => {
    // Función para obtener las publicaciones
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        
        if (!response.ok) {
          throw new Error('Error al cargar las publicaciones');
        }
        
        const data = await response.json();
        
        // Limitamos a las primeras 10 publicaciones
        const firstTenPosts = data.slice(0, 10);
        setPosts(firstTenPosts);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); // El array vacío significa que solo se ejecuta al montar el componente

  // Mostrar loading mientras carga
  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3">Cargando publicaciones...</p>
      </div>
    );
  }

  // Mostrar error si algo salió mal
  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">¡Error!</h4>
        <p>{error}</p>
      </div>
    );
  }

  // Renderizar las publicaciones
  return (
    <div className="row">
      {posts.map((post) => (
        <div key={post.id} className="col-12 mb-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title text-primary">
                {post.id}. {post.title}
              </h5>
              <p className="card-text text-muted">
                {post.body}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostsList;