import { useState, useEffect } from 'react';

export const useFetchPhoto = (data) => {
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    const fetchImages = async () => {
      data.forEach(async (item) => {
        const photo = await Storage.get(item.photoUrl);
        const mapped = { id: item.id, photo };
        setPhotos((prevArray) => [...prevArray, mapped]);
      });
    };
    fetchImages();
  }, [data]);
  return photos;
};
