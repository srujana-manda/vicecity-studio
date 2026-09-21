import { useRef, useState } from "react";
import ImageEditor from "@unlayer/react-image-editor";
import "./Editor.css";

function Editor({ image, onBack }) {
  const editorRef = useRef(null);

  const [editedImage, setEditedImage] = useState(image);
  const [name, setName] = useState("YOUR NAME");
  const [tagline, setTagline] = useState("THE STORY BEGINS");
  const [style, setStyle] = useState("miami");
  const [finalPoster, setFinalPoster] = useState(null);

  const styles = [
    {
      id: "miami",
      name: "MIAMI NIGHTS",
      className: "style-miami",
    },
    {
      id: "sunset",
      name: "SUNSET DRIVE",
      className: "style-sunset",
    },
    {
      id: "midnight",
      name: "MIDNIGHT",
      className: "style-midnight",
    },
  ];

  // Get edited image from Unlayer
  const handleSave = ({ dataUrl }) => {
    setEditedImage(dataUrl);
  };

  // Generate the complete poster
  const generatePoster = () => {
    if (!editedImage) return;

    const canvas = document.createElement("canvas");

    const width = 900;
    const height = 1200;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");

    const img = new Image();

    img.onload = () => {
      /*
        =========================
        1. DRAW IMAGE
        =========================
      */

      const imageRatio = img.width / img.height;
      const canvasRatio = width / height;

      let drawWidth;
      let drawHeight;
      let offsetX;
      let offsetY;

      if (imageRatio > canvasRatio) {
        drawHeight = height;
        drawWidth = height * imageRatio;

        offsetX = (width - drawWidth) / 2;
        offsetY = 0;
      } else {
        drawWidth = width;
        drawHeight = width / imageRatio;

        offsetX = 0;
        offsetY = (height - drawHeight) / 2;
      }

      ctx.drawImage(
        img,
        offsetX,
        offsetY,
        drawWidth,
        drawHeight
      );

      /*
        =========================
        2. STYLE OVERLAY
        =========================
      */

      let gradient;

      if (style === "miami") {
        gradient = ctx.createLinearGradient(
          0,
          0,
          width,
          height
        );

        gradient.addColorStop(
          0,
          "rgba(255, 60, 172, 0.45)"
        );

        gradient.addColorStop(
          0.5,
          "rgba(123, 44, 255, 0.25)"
        );

        gradient.addColorStop(
          1,
          "rgba(10, 5, 30, 0.75)"
        );
      }

      if (style === "sunset") {
        gradient = ctx.createLinearGradient(
          0,
          0,
          width,
          height
        );

        gradient.addColorStop(
          0,
          "rgba(255, 154, 60, 0.50)"
        );

        gradient.addColorStop(
          0.5,
          "rgba(255, 60, 145, 0.30)"
        );

        gradient.addColorStop(
          1,
          "rgba(76, 35, 122, 0.75)"
        );
      }

      if (style === "midnight") {
        gradient = ctx.createLinearGradient(
          0,
          0,
          width,
          height
        );

        gradient.addColorStop(
          0,
          "rgba(17, 26, 69, 0.55)"
        );

        gradient.addColorStop(
          0.5,
          "rgba(23, 17, 47, 0.50)"
        );

        gradient.addColorStop(
          1,
          "rgba(8, 7, 11, 0.85)"
        );
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      /*
        =========================
        3. DARK BOTTOM GRADIENT
        =========================
      */

      const bottomGradient = ctx.createLinearGradient(
        0,
        height * 0.55,
        0,
        height
      );

      bottomGradient.addColorStop(
        0,
        "rgba(0,0,0,0)"
      );

      bottomGradient.addColorStop(
        1,
        "rgba(0,0,0,0.90)"
      );

      ctx.fillStyle = bottomGradient;
      ctx.fillRect(
        0,
        height * 0.55,
        width,
        height * 0.45
      );

      /*
        =========================
        4. GRID LINES
        =========================
      */

      ctx.strokeStyle = "rgba(255,255,255,0.12)";
      ctx.lineWidth = 1;

      for (let y = 780; y < height; y += 45) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      for (let x = 0; x < width; x += 60) {
        ctx.beginPath();
        ctx.moveTo(x, 780);
        ctx.lineTo(width / 2, height);
        ctx.stroke();
      }

      /*
        =========================
        5. TOP LABEL
        =========================
      */

      ctx.fillStyle = "white";
      ctx.font = "bold 20px Arial";
      ctx.letterSpacing = "4px";

      ctx.fillText(
        "VICE CITY",
        60,
        70
      );

      ctx.font = "14px Arial";

      ctx.fillText(
        "2026",
        width - 100,
        70
      );

      /*
        =========================
        6. DECORATIVE LINE
        =========================
      */

      ctx.fillStyle = "#ff3cac";

      ctx.fillRect(
        60,
        90,
        120,
        4
      );

      /*
        =========================
        7. SUN
        =========================
      */

      ctx.beginPath();

      ctx.arc(
        width - 170,
        250,
        100,
        0,
        Math.PI * 2
      );

      ctx.fillStyle =
        style === "midnight"
          ? "rgba(120,150,255,0.25)"
          : "rgba(255,120,170,0.45)";

      ctx.fill();

      /*
        =========================
        8. CHARACTER NAME
        =========================
      */

      ctx.fillStyle = "white";

      ctx.font =
        "bold 72px Arial";

      ctx.fillText(
        name.toUpperCase(),
        60,
        970
      );

      /*
        =========================
        9. TAGLINE
        =========================
      */

      ctx.fillStyle = "#eeeeee";

      ctx.font =
        "20px Arial";

      ctx.fillText(
        tagline.toUpperCase(),
        65,
        1015
      );

      /*
        =========================
        10. FOOTER
        =========================
      */

      ctx.fillStyle = "#ff3cac";

      ctx.font =
        "bold 14px Arial";

      ctx.fillText(
        "CREATE • EDIT • SHARE",
        60,
        1120
      );

      ctx.fillStyle = "white";

      ctx.font =
        "bold 18px Arial";

      ctx.fillText(
        "01",
        width - 90,
        1120
      );

      /*
        =========================
        11. BORDER
        =========================
      */

      ctx.strokeStyle =
        "rgba(255,255,255,0.7)";

      ctx.lineWidth = 3;

      ctx.strokeRect(
        25,
        25,
        width - 50,
        height - 50
      );

      /*
        =========================
        12. FINAL IMAGE
        =========================
      */

      const poster = canvas.toDataURL(
        "image/png"
      );

      setFinalPoster(poster);
    };

    img.src = editedImage;
  };

  /*
    =========================
    DOWNLOAD FINAL POSTER
  =========================
  */

  const downloadPoster = () => {
    if (!finalPoster) {
      generatePoster();
      return;
    }

    const link =
      document.createElement("a");

    link.href = finalPoster;

    link.download =
      "vicecity-poster.png";

    link.click();
  };

  return (
    <div className="editor-page">

      {/* HEADER */}

      <header className="editor-header">

        <button
          className="back-button"
          onClick={onBack}
        >
          ← BACK
        </button>

        <div className="editor-logo">
          VICE<span>STUDIO</span>
        </div>

        <button
          className="download-button"
          onClick={downloadPoster}
        >
          DOWNLOAD ↓
        </button>

      </header>


      {/* MAIN */}

      <main className="editor-main">

        <div className="editor-title">

          <span>
            02 — CREATIVE STUDIO
          </span>

          <h1>
            EDIT YOUR
            <i> STORY.</i>
          </h1>

        </div>


        <div className="editor-layout">

          {/* IMAGE EDITOR */}

          <div className="image-editor-box">

            <ImageEditor
              ref={editorRef}
              image={image}
              minHeight={600}

              options={{
                theme: "dark",

                features: {
                  imageEditor: {
                    tools: {
                      crop: true,
                      resize: true,
                      filter: true,
                      draw: true,
                      text: true,
                      shapes: true,
                      stickers: true,
                      frame: true,
                    },
                  },
                },
              }}

              onSave={handleSave}

              onCancel={onBack}

              onError={(error) => {
                console.error(
                  "Image Editor Error:",
                  error
                );
              }}

              onLoadError={() => {
                console.error(
                  "Image could not be loaded."
                );
              }}
            />

          </div>


          {/* CUSTOM PANEL */}

          <aside className="custom-panel">

            <div className="panel-label">
              POSTER DETAILS
            </div>


            {/* NAME */}

            <label>
              CHARACTER NAME
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Enter your name"
            />


            {/* TAGLINE */}

            <label>
              TAGLINE
            </label>

            <input
              type="text"
              value={tagline}
              onChange={(e) =>
                setTagline(e.target.value)
              }
              placeholder="Enter your tagline"
            />


            {/* STYLE */}

            <div className="style-section">

              <label>
                CHOOSE STYLE
              </label>

              <div className="style-grid">

                {styles.map((item) => (

                  <button
                    key={item.id}
                    className={`style-option ${
                      style === item.id
                        ? "active"
                        : ""
                    }`}
                    onClick={() => {
                      setStyle(item.id);
                      setFinalPoster(null);
                    }}
                  >

                    <span
                      className={`style-preview ${item.className}`}
                    />

                    <span>
                      {item.name}
                    </span>

                  </button>

                ))}

              </div>

            </div>


            {/* PREVIEW */}

            <div
              className={`poster-preview style-${style}`}
            >

              <div className="preview-image">

                <img
                  src={editedImage}
                  alt="Edited poster"
                />

              </div>


              <div className="preview-overlay">

                <span>
                  VICE CITY
                </span>

                <h2>
                  {name}
                </h2>

                <p>
                  {tagline}
                </p>

              </div>

            </div>


            {/* GENERATE */}

            <button
              className="save-poster"
              onClick={generatePoster}
            >
              GENERATE POSTER
              <span>✦</span>
            </button>


            {/* FINAL POSTER */}

            {finalPoster && (

              <div className="final-poster-section">

                <div className="panel-label">
                  FINAL POSTER
                </div>

                <img
                  className="final-poster-image"
                  src={finalPoster}
                  alt="Final Vice City poster"
                />

                <button
                  className="save-poster"
                  onClick={downloadPoster}
                >
                  DOWNLOAD POSTER
                  <span>↓</span>
                </button>

              </div>

            )}

          </aside>

        </div>

      </main>

    </div>
  );
}

export default Editor;