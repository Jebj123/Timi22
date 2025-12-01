import { useEffect, useState } from "react";

type Posts = {
  body: string;
  id: number;
  title: string;
  userId: number;
};
const FetchAefing = () => {
  const [posts, setPosts] = useState<Posts[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${postsPerPage}`
        );
        const data: Posts[] = await response.json();
        setPosts(data);
      } catch {
        setError("Villa kom upp!");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [currentPage]);

  if (loading) {
    return (
      <div>
        <p>Hleð posta...</p>
      </div>
    );
  }
  return (
    <div style={{ display: "flex", width: "100vw", flexDirection: "column" }}>
      <h1>Posts</h1>
      <div>
        {loading ? (
          <p>Hleð Pósta...</p>
        ) : (
          <div>
            {posts.map((post) => (
              <div>
                {" "}
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          {" "}
          Previous Page
        </button>
        <p> Page : {currentPage}</p>
        <button onClick={() => setCurrentPage(currentPage + 1)}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default function Timi22() {
  return (
    <div>
      <h1>Timi 22</h1>
      <div>
        <FetchAefing />
      </div>
    </div>
  );
}
