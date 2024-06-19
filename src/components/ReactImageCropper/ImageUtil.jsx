import React from "react";
export const adjustImageSize = async (
  file,
  maxSize = 1000,
  maxFileSize = 2 * 1024 * 1024,
  initialQuality = 0.8,
  qualityStep = 0.1
) => {
  const img = document.createElement("img");
  img.src = URL.createObjectURL(file);

  await new Promise((resolve) => {
    img.onload = resolve;
  });

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  let { width, height } = img;

  if (width > height) {
    if (width > maxSize) {
      height *= maxSize / width;
      width = maxSize;
    }
  } else {
    if (height > maxSize) {
      width *= maxSize / height;
      height = maxSize;
    }
  }

  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(img, 0, 0, width, height);

  let quality = initialQuality; // 초기 품질 설정
  let blob;

  while (true) {
    blob = await new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), "image/jpeg", quality);
    });

    console.log(
      "Current quality:",
      quality,
      "Size:",
      (blob.size / (1024 * 1024)).toFixed(2),
      "MB"
    ); // MB 단위로 출력

    if (blob.size <= maxFileSize || quality <= 0) {
      break;
    }

    quality -= qualityStep; // 파일 크기가 너무 크면 품질 낮춤
  }

  console.log(
    "Final quality:",
    quality,
    "Size:",
    (blob.size / (1024 * 1024)).toFixed(2),
    "MB"
  );

  return blob;
};
