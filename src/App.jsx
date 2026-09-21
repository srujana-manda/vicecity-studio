
import { useState } from "react";
import "./App.css";
import Editor from "./Editor";

function App() {
  const [showEditor, setShowEditor] = useState(false);
  const [image, setImage] = useState(null);

  const handleCreate = () => {
    document.getElementById("photo-upload").click();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
      setShowEditor(true);
    };

    reader.readAsDataURL(file);
  };

  if (showEditor) {
    return (
      <Editor
        image={image}
        onBack={() => setShowEditor(false)}
      />
    );
  }

  return (
    <div className="app">

      <input
        id="photo-upload"
        type="file"
        accept="image/*"
        hidden
        onChange={handleImageUpload}
      />

      {/* ================= NAVBAR ================= */}

      <header className="navbar">

        <a href="#home" className="brand">
          <div className="brand-mark">V</div>

          <div className="brand-copy">
            <h2>
              VICE<span>STUDIO</span>
            </h2>
            <p>CHARACTER POSTER LAB</p>
          </div>
        </a>

        <nav>
          <a href="#home">Home</a>
          <a href="#experience">Experience</a>
          <a href="#about">About</a>
        </nav>

        <button
          className="nav-button"
          onClick={handleCreate}
        >
          CREATE POSTER
          <span>↗</span>
        </button>

      </header>


      {/* ================= HERO ================= */}

      <main id="home" className="hero">

        <div className="hero-background-text">
          VICE
        </div>

        <div className="hero-left">

          <div className="eyebrow">
            <span className="eyebrow-line"></span>
            YOUR PHOTO. YOUR CHARACTER. YOUR STORY.
          </div>

          <h1>
            TURN
            <span>YOUR</span>
            <strong>STORY.</strong>
          </h1>

          <p className="hero-text">
            Create cinematic character posters from your own photos.
            Edit your image, choose your visual style, add your identity,
            and turn it into a poster worth remembering.
          </p>

          <div className="hero-actions">

            <button
              className="primary-button"
              onClick={handleCreate}
            >
              <span>START CREATING</span>
              <b>↗</b>
            </button>

            <a
              href="#experience"
              className="secondary-button"
            >
              EXPLORE STUDIO
              <span>↓</span>
            </a>

          </div>

          <div className="hero-meta">

            <div className="meta-item">
              <span>01</span>
              <p>UPLOAD</p>
            </div>

            <div className="meta-line"></div>

            <div className="meta-item">
              <span>02</span>
              <p>EDIT</p>
            </div>

            <div className="meta-line"></div>

            <div className="meta-item">
              <span>03</span>
              <p>CREATE</p>
            </div>

          </div>

        </div>


        {/* ================= HERO POSTER ================= */}

        <div className="hero-right">

          <div className="poster-label label-one">
            ORIGINAL
          </div>

          <div className="poster-label label-two">
            01 / 03
          </div>

          <div className="poster-glow"></div>

          <div className="poster">

            <div className="poster-noise"></div>

            <div className="poster-grid"></div>

            <div className="sun"></div>

            <div className="sun-lines">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="palm palm-one"></div>
            <div className="palm palm-two"></div>

            <div className="poster-border"></div>

            <div className="poster-top">
              <span>VICE CITY</span>
              <span>2026</span>
            </div>

            <div className="poster-center">

              <div className="circle circle-one"></div>
              <div className="circle circle-two"></div>

              <div className="silhouette">
                <div className="head"></div>
                <div className="body"></div>
              </div>

            </div>

            <div className="poster-bottom">

              <p>CHARACTER 001</p>

              <h2>
                YOUR
                <br />
                STORY
              </h2>

              <div className="poster-divider"></div>

              <span>
                CREATE • EDIT • SHARE
              </span>

            </div>

            <div className="poster-number">
              01
            </div>

          </div>


          {/* FLOATING INFO */}

          <div className="floating-card">

            <div className="floating-icon">
              ✦
            </div>

            <div>
              <span>POWERED BY</span>
              <strong>IMAGE EDITOR</strong>
            </div>

            <div className="floating-arrow">
              ↗
            </div>

          </div>

        </div>

      </main>


      {/* ================= EXPERIENCE ================= */}

      <section
        id="experience"
        className="features"
      >

        <div className="section-top">

          <div className="section-heading">

            <span>01 — THE EXPERIENCE</span>

            <h2>
              BUILD YOUR
              <br />
              <i>CHARACTER.</i>
            </h2>

          </div>

          <p className="section-description">
            From your first upload to the final poster,
            every step is designed to keep your story
            at the center.
          </p>

        </div>


        <div className="feature-grid">

          <div className="feature-card">

            <div className="feature-top">
              <span>01</span>
              <span>START</span>
            </div>

            <div className="feature-icon">
              +
            </div>

            <h3>
              UPLOAD
            </h3>

            <p>
              Bring your own photograph into the studio
              and start building your character.
            </p>

            <div className="feature-arrow">
              ↗
            </div>

          </div>


          <div className="feature-card feature-highlight">

            <div className="feature-top">
              <span>02</span>
              <span>CREATE</span>
            </div>

            <div className="feature-icon">
              ✦
            </div>

            <h3>
              EDIT
            </h3>

            <p>
              Crop, resize, filter, draw, add text,
              shapes and creative elements with the
              image editor.
            </p>

            <div className="feature-arrow">
              ↗
            </div>

          </div>


          <div className="feature-card">

            <div className="feature-top">
              <span>03</span>
              <span>FINISH</span>
            </div>

            <div className="feature-icon">
              ↗
            </div>

            <h3>
              POSTER
            </h3>

            <p>
              Choose your style, add your identity,
              generate your final cinematic poster
              and download it.
            </p>

            <div className="feature-arrow">
              ↗
            </div>

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="final-cta">

        <div className="cta-number">
          02
        </div>

        <div>
          <span>READY WHEN YOU ARE</span>

          <h2>
            YOUR STORY
            <i> STARTS HERE.</i>
          </h2>
        </div>

        <button
          onClick={handleCreate}
        >
          CREATE NOW
          <span>↗</span>
        </button>

      </section>


      {/* ================= FOOTER ================= */}

      <footer id="about">

        <div className="footer-brand">

          <h3>
            VICE<span>STUDIO</span>
          </h3>

          <p>
            BUILT FOR CREATORS.
            <br />
            INSPIRED BY THE CITY.
          </p>

        </div>

        <div className="footer-middle">
          <span>REACT</span>
          <span>IMAGE EDITOR</span>
          <span>2026</span>
        </div>

        <div className="footer-right">
          <p>CREATE • EDIT • SHARE</p>
          <span>YOUR STORY. YOUR WORLD.</span>
        </div>

      </footer>

    </div>
  );
}

export default App;
