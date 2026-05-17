import { useEffect, useState } from "react";
import SubjectCard from "../components/SubjectCard";
import Footer from "../components/Footer";

const Home = () => {
  const [backendStatus, setBackendStatus] = useState("");

  // 🔹 Backend test (page load pe)
  useEffect(() => {
    fetch("http://127.0.0.1:8000/")
      .then((res) => res.json())
      .then((data) => setBackendStatus(data.status))
      .catch(() => setBackendStatus("Backend not connected ❌"));
  }, []);

  return (
  <div
    style={{
      padding: "24px",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <div style={{ flex: 1 }}>
      <h1>Virtual Science Lab</h1>

      <p>
        Explore interactive Biology, Chemistry, and Physics experiments
      </p>

      {/* 🔹 Backend status indicator */}
      <p style={{ color: "green", marginTop: "8px" }}>
        {backendStatus}
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
          marginTop: "32px",
        }}
      >
        <SubjectCard
          title="Biology"
          description="Human anatomy and cell structures in 3D"
          link="/biology"
        />

        <SubjectCard
          title="Chemistry"
          description="Chemical reactions and laboratory apparatus"
          link="/chemistry"
        />

        <SubjectCard
          title="Physics"
          description="Motion, magnetism, and physical laws"
          link="/physics"
        />
      </div>
    </div>

    <Footer />
  </div>
);
};

export default Home;
