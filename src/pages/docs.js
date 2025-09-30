import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load file swagger.yaml
const swaggerDocument = YAML.load(path.join(__dirname, "swagger.yaml"));

export default function (app) {
  app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
      customCss: `
        body { background-color: #fff; }
        .topbar { display: flex; justify-content: space-between; align-items: center; }
        #themeSwitcher {
          padding: 5px 10px;
          margin-left: 10px;
          border-radius: 6px;
          font-size: 14px;
          border: 1px solid #ccc;
        }
      `,
      customJs: `
        window.onload = function() {
          const topbar = document.querySelector('.topbar');
          if (topbar && !document.getElementById('themeSwitcher')) {
            const label = document.createElement('span');
            label.innerText = "Theme:";
            label.style.marginRight = "5px";

            const select = document.createElement('select');
            select.id = 'themeSwitcher';
            select.innerHTML = \`
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="classic">Classic</option>
            \`;

            select.addEventListener('change', (e) => {
              if (e.target.value === "dark") {
                document.body.style.background = "#121212";
                document.body.style.color = "#fff";
              } else if (e.target.value === "classic") {
                document.body.style.background = "#f5f5f5";
                document.body.style.color = "#000";
              } else {
                document.body.style.background = "#fff";
                document.body.style.color = "#000";
              }
            });

            const container = document.createElement('div');
            container.style.display = "flex";
            container.style.alignItems = "center";
            container.appendChild(label);
            container.appendChild(select);

            topbar.appendChild(container);
          }
        }
      `,
    })
  );
}
