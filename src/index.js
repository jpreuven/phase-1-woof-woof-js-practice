document.addEventListener("DOMContentLoaded", () => {
  const dogBar = document.querySelector("#dog-bar");
  const dogInfo = document.querySelector("#dog-info");

  function makeBadDog(dog) {
    dog.isGoodDog = false;

    fetch(`http://localhost:3000/pups/${dog.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(dog),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  function makeGoodDog(dog) {
    dog.isGoodDog = true;

    fetch(`http://localhost:3000/pups/${dog.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(dog),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  function fetchRequest() {
    fetch("http://localhost:3000/pups")
      .then((res) => res.json())
      .then((data) => {
        data.forEach((dog) => {
          // let dog = { ...dog };

          const span = document.createElement("span");
          span.textContent = dog.name;
          dogBar.append(span);
          span.addEventListener("click", (e) => {
            dogInfo.innerHTML = "";
            const img = document.createElement("img");
            const h2 = document.createElement("h2");
            const btn = document.createElement("button");

            img.src = dog.image;
            h2.textContent = dog.name;

            if (dog.isGoodDog === true) {
              btn.textContent = "Good dog!";
            } else if (dog.isGoodDog === false) {
              btn.textContent = "Bad dog!";
            }
            dogInfo.append(img, h2, btn);

            btn.addEventListener("click", (e) => {
              if (e.target.textContent === "Good dog!") {
                e.target.textContent = "Bad dog!";
                makeBadDog(dog);
              } else if (e.target.textContent === "Bad dog!") {
                e.target.textContent = "Good dog!";
                makeGoodDog(dog);
              }
            });
          });
        });
      });
  }
  fetchRequest();

  const dogFilter = document.querySelector("#good-dog-filter");
  dogFilter.addEventListener("click", (e) => {
    if (e.target.textContent === "Filter good dogs: OFF") {
      e.target.textContent = "Filter good dogs: ON";
      fetch("http://localhost:3000/pups")
        .then((res) => res.json())
        .then((data) => {
          dogBar.innerHTML = "";
          data.forEach((dog) => {
            if (dog.isGoodDog) {
              const span = document.createElement("span");
              span.textContent = dog.name;
              dogBar.append(span);
              span.addEventListener("click", (e) => {
                dogInfo.innerHTML = "";
                const img = document.createElement("img");
                const h2 = document.createElement("h2");
                const btn = document.createElement("button");

                img.src = dog.image;
                h2.textContent = dog.name;

                if (dog.isGoodDog === true) {
                  btn.textContent = "Good dog!";
                } else if (dog.isGoodDog === false) {
                  btn.textContent = "Bad dog!";
                }
                dogInfo.append(img, h2, btn);

                btn.addEventListener("click", (e) => {
                  if (e.target.textContent === "Good dog!") {
                    e.target.textContent = "Bad dog!";
                    makeBadDog(dog);
                  } else if (e.target.textContent === "Bad dog!") {
                    e.target.textContent = "Good dog!";
                    makeGoodDog(dog);
                  }
                });
              });
            }
          });
        });
    } else if (e.target.textContent === "Filter good dogs: ON") {
      e.target.textContent = "Filter good dogs: OFF";
      dogBar.innerHTML = "";
      fetchRequest();
    }
  });
});
