/* Функция для загрузки CSS */
export const loadPreloaderCSS = (cssPaths) => {
  const link = document.createElement("link");
  link.rel = "stylesheet";

  let currentAttempt = 0;

  const attemptCSS = () => {
    link.href = cssPaths[currentAttempt];
    link.onload = () =>
      console.log("Preloader CSS loaded from:", cssPaths[currentAttempt]);
    link.onerror = () => {
      currentAttempt++;
      if (currentAttempt < cssPaths.length) {
        attemptCSS();
      } else {
        console.error("Failed to load preloader CSS from all paths");
      }
    };
    document.head.appendChild(link);
  };

  attemptCSS();
};

/* Функция для загрузки HTML */
export const loadPreloaderHTML = async (htmlPaths) => {
  let currentAttempt = 0;

  const attemptHTML = async () => {
    try {
      const response = await fetch(htmlPaths[currentAttempt]);
      if (!response.ok) throw new Error("Preloader HTML not found");

      const html = await response.text();
      document.body.insertAdjacentHTML("afterbegin", html);
      console.log("Preloader HTML loaded from:", htmlPaths[currentAttempt]);
    } catch (error) {
      currentAttempt++;
      if (currentAttempt < htmlPaths.length) {
        await attemptHTML();
      } else {
        console.error("Failed to load preloader HTML from all paths:", error);
      }
    }
  };

  await attemptHTML();
};
