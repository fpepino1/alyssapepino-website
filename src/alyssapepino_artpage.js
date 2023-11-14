document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modal-content");
  const captionDiv = document.getElementById("image-caption");
  const body = document.body;
  const imageButtons = document.querySelectorAll(".image-tile");
  const modalClose = document.querySelector(".modal-close");
  const nextButton = document.getElementById("modal-next");
  const prevButton = document.getElementById("modal-prev");

  let isModalOpen = false;
  let currentImageIndex = 0;
  const imageButtonArray = Array.from(imageButtons);

  imageButtonArray.forEach((modalButton, index) => {
    modalButton.addEventListener("click", () => {
      openModal(index);
    });
  });

  modalClose.addEventListener("click", closeModal);
  nextButton.addEventListener("click", showNextImage);
  prevButton.addEventListener("click", showPrevImage);

  function openModal(index) {
    document.querySelectorAll(".disable-interaction").forEach((element) => {
      element.style.pointerEvents = "none";
    });

    if (!isModalOpen) {
      body.style.overflow = "hidden";
      body.style.paddingRight =
        '${"width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;"}';
      isModalOpen = true;
    }

    modal.style.display = "block";
    const img = imageButtonArray[index].querySelector("img");
    modalContent.src = img.src;
    const imageDescription =
      imageButtonArray[index].querySelector(".image-description");
    captionDiv.innerHTML = imageDescription.innerHTML;
    currentImageIndex = index;
    updateButtonVisibility();
  }

  function closeModal() {
    document.querySelectorAll(".disable-interaction").forEach((element) => {
      element.style.pointerEvents = "auto";
    });

    if (isModalOpen) {
      body.style.overflow = "auto";
      body.style.paddingRight = "0";
      isModalOpen = false;
    }

    modal.style.display = "none";
  }

  function showNextImage() {
    if (currentImageIndex < imageButtonArray.length - 1) {
      currentImageIndex++;
      openModal(currentImageIndex);
    }
  }

  function showPrevImage() {
    if (currentImageIndex > 0) {
      currentImageIndex--;
      openModal(currentImageIndex);
    }
  }

  function updateButtonVisibility() {
    nextButton.disabled = currentImageIndex === imageButtonArray.length - 1;
    prevButton.disabled = currentImageIndex === 0;
  }

  document.addEventListener("keydown", function (event) {
    if (isModalOpen) {
      if (event.key === "ArrowLeft") {
        showPrevImage();
      } else if (event.key === "ArrowRight") {
        showNextImage();
      }
    }
  });
});
