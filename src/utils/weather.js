export const handleWeatherClassification = weatherText => {
  const lowerCaseWeatherText = weatherText.toLowerCase();

  if (lowerCaseWeatherText.includes('clear')) {
    return {
      uri: 'https://png.pngtree.com/thumb_back/fw800/back_our/20190621/ourmid/pngtree-flat-cartoon-sunset-under-spring-outing-background-image_201037.jpg',
    };
  } else if (
    lowerCaseWeatherText.includes('rain') ||
    lowerCaseWeatherText.includes('thunderstorm') ||
    lowerCaseWeatherText.includes('shower')
  ) {
    return {
      uri: 'https://allimages.sgp1.digitaloceanspaces.com/photographercomvn/2021/01/1609909842_991_Tai-hinh-nen-phong-canh-hoat-hinh-cho-iPhone.webp.webp ',
    };
  } else {
    return {
      uri: 'https://c.wallhere.com/photos/7b/07/nature_landscape_pixel_art_pixelated_pixels_mountains_Wavestormed_trees-1523667.jpg!d',
    };
  }
};
