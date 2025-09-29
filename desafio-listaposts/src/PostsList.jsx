import { useState, useEffect } from 'react';

// Componente PostsList
function PostsList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        
        if (!response.ok) {
          throw new Error('Error al cargar las publicaciones');
        }
        
        const data = await response.json();
        // Limitamos a las primeras 10 publicaciones
        setPosts(data.slice(0, 10));
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
          <p className="mt-4 text-lg text-gray-700 font-medium">Cargando publicaciones...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-50 to-pink-100">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md">
          <div className="text-center">
            <svg className="mx-auto h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="mt-4 text-2xl font-bold text-gray-800">¡Oops!</h2>
            <p className="mt-2 text-gray-600">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-6 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-3">
            📝 Publicaciones
          </h1>
          <p className="text-gray-600 text-lg">
            Explora las últimas publicaciones de nuestra comunidad
          </p>
          <div className="mt-4 inline-block px-4 py-2 bg-indigo-100 rounded-full">
            <span className="text-indigo-700 font-semibold">{posts.length} publicaciones</span>
          </div>
        </header>

        <div className="grid gap-6">
          {posts.map((post) => (
            <article 
              key={post.id} 
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:scale-[1.02]"
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md">
                    {post.id}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-800 mb-3 capitalize leading-tight">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      {post.body}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      <span>Usuario #{post.userId}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-3 border-t border-gray-100">
                <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm transition-colors">
                  Leer más →
                </button>
              </div>
            </article>
          ))}
        </div>

        <footer className="text-center mt-12 text-gray-500">
          <p>Datos obtenidos de JSONPlaceholder API</p>
        </footer>
      </div>
    </div>
  );
}


export default PostsList