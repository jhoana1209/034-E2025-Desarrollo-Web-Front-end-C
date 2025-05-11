
// Constantes
        const API_URL = 'https://jsonplaceholder.typicode.com/posts';
        
        // Elementos del DOM
        const postForm = document.getElementById('postForm');
        const titleInput = document.getElementById('title');
        const bodyInput = document.getElementById('body');
        const messageDiv = document.getElementById('message');
        const postsTableBody = document.getElementById('postsTableBody');
        const loadingDiv = document.getElementById('loading');
        
        // Variable para almacenar el ID del último post creado
        let lastCreatedPostId = null;
        
        // Función para mostrar mensajes
        function showMessage(text, type) {
            messageDiv.className = `message ${type}`;
            messageDiv.textContent = text;
            setTimeout(() => {
                messageDiv.textContent = '';
                messageDiv.className = '';
            }, 5000);
        }
        
        // Cargar posts con XMLHttpRequest
        function loadPostsXHR() {
            loadingDiv.style.display = 'block';
            
            const xhr = new XMLHttpRequest();
            xhr.open('GET', API_URL, true);
            
            xhr.onload = function() {
                if (xhr.status >= 200 && xhr.status < 300) {
                    const posts = JSON.parse(xhr.responseText);
                    displayPosts(posts);
                } else {
                    showMessage('Error al cargar posts: ' + xhr.status, 'error');
                }
                loadingDiv.style.display = 'none';
            };
            
            xhr.onerror = function() {
                showMessage('Error de conexión', 'error');
                loadingDiv.style.display = 'none';
            };
            
            xhr.send();
        }
        
        // Cargar posts con Fetch API
        function loadPostsFetch() {
            loadingDiv.style.display = 'block';
            
            fetch(API_URL)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error: ' + response.status);
                    }
                    return response.json();
                })
                .then(posts => {
                    displayPosts(posts);
                })
                .catch(error => {
                    showMessage('Error al cargar posts: ' + error.message, 'error');
                })
                .finally(() => {
                    loadingDiv.style.display = 'none';
                });
        }
        
        // Mostrar posts en la tabla
        function displayPosts(posts) {
            postsTableBody.innerHTML = '';
            
            // Limitar a 10 posts para que la página no sea demasiado larga
            const limitedPosts = posts.slice(0, 10);
            
            limitedPosts.forEach(post => {
                const row = document.createElement('tr');
                
                const idCell = document.createElement('td');
                idCell.textContent = post.id;
                
                const titleCell = document.createElement('td');
                titleCell.textContent = post.title;
                
                const actionsCell = document.createElement('td');
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Eliminar';
                deleteButton.className = 'delete';
                deleteButton.addEventListener('click', () => deletePost(post.id));
                
                actionsCell.appendChild(deleteButton);
                
                row.appendChild(idCell);
                row.appendChild(titleCell);
                row.appendChild(actionsCell);
                
                postsTableBody.appendChild(row);
            });
        }
        
        // Crear post con XMLHttpRequest
        function createPostXHR(title, body) {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', API_URL, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            
            xhr.onload = function() {
                if (xhr.status >= 200 && xhr.status < 300) {
                    const newPost = JSON.parse(xhr.responseText);
                    lastCreatedPostId = newPost.id;
                    showMessage('Post creado con éxito (ID: ' + newPost.id + ')', 'success');
                    loadPostsXHR();
                } else {
                    showMessage('Error al crear post: ' + xhr.status, 'error');
                }
            };
            
            xhr.onerror = function() {
                showMessage('Error de conexión', 'error');
            };
            
            const data = JSON.stringify({
                title: title,
                body: body,
                userId: 1
            });
            
            xhr.send(data);
        }
        
        // Crear post con Fetch API
        function createPostFetch(title, body) {
            fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: title,
                    body: body,
                    userId: 1
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error: ' + response.status);
                }
                return response.json();
            })
            .then(newPost => {
                lastCreatedPostId = newPost.id;
                showMessage('Post creado con éxito (ID: ' + newPost.id + ')', 'success');
                loadPostsFetch();
            })
            .catch(error => {
                showMessage('Error al crear post: ' + error.message, 'error');
            });
        }
        
        // Eliminar post con XMLHttpRequest
        function deletePostXHR(id) {
            const xhr = new XMLHttpRequest();
            xhr.open('DELETE', `${API_URL}/${id}`, true);
            
            xhr.onload = function() {
                if (xhr.status >= 200 && xhr.status < 300) {
                    showMessage('Post eliminado con éxito (ID: ' + id + ')', 'success');
                    loadPostsXHR();
                } else {
                    showMessage('Error al eliminar post: ' + xhr.status, 'error');
                }
            };
            
            xhr.onerror = function() {
                showMessage('Error de conexión', 'error');
            };
            
            xhr.send();
        }
        
        // Eliminar post con Fetch API
        function deletePostFetch(id) {
            fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error: ' + response.status);
                }
                showMessage('Post eliminado con éxito (ID: ' + id + ')', 'success');
                loadPostsFetch();
            })
            .catch(error => {
                showMessage('Error al eliminar post: ' + error.message, 'error');
            });
        }
        
        // Funciones principales que se utilizarán (elige entre XHR o Fetch)
        const loadPosts = loadPostsFetch;  // Puedes cambiar a loadPostsXHR
        const createPost = createPostFetch;  // Puedes cambiar a createPostXHR
        const deletePost = deletePostFetch;  // Puedes cambiar a deletePostXHR
        
        // Event listeners
        document.addEventListener('DOMContentLoaded', loadPosts);
        
        postForm.addEventListener('submit', function(e) {
            e.preventDefault();
            createPost(titleInput.value, bodyInput.value);
            titleInput.value = '';
            bodyInput.value = '';
        });