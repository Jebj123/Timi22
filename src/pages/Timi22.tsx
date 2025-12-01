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
        {error && <div>{error} </div>}
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

function AutoSaveNote() {
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("Nothing to save");

  useEffect(() => {
    if (!note.trim()) {
      setStatus("Write something...");
      return;
    }
    setStatus("Saving...");

    const id = setTimeout(() => {
      //þykjumst að vera að save-a note í database
      setStatus("Saved!");
    }, 1000);
    return () => clearTimeout(id);
  }, [note]);
  return (
    <div>
      <h1>Note</h1>
      <textarea
        rows={5}
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <p>{status}</p>
    </div>
  );
}

function BMITracker() {
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [bmi, setBmi] = useState<number | null>(null);

  useEffect(() => {
    const meters = height / 100;
    const results = weight / (meters * meters);
    setBmi(Number(results.toFixed(1)));
  }, [weight, height]);
  return (
    <div>
      <h1>Bmi Tracker</h1>
      <div>
        <p>Þyngd í kg:</p>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
        ></input>
      </div>
      <div>
        <p>Hæð:</p>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
        />
      </div>
      <div>
        <h3>BMI:</h3>
        <h2>{bmi}</h2>
      </div>
    </div>
  );
}

export default function Timi22() {
  return (
    <div>
      <h1>Timi 22</h1>
      <div>
        <FetchAefing />
      </div>
      <div>
        <AutoSaveNote />
      </div>
      <div>
        <BMITracker />
      </div>
    </div>
  );
}
