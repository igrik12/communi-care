import { useState, useEffect } from 'react';
import { Storage } from 'aws-amplify';

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

export const usePhoto = (photoUrl) => {
  const [photo, setPhoto] = useState();
  useEffect(() => {
    const fetchImages = async () => {
      const img = await Storage.get(photoUrl);
      setPhoto(img);
    };
    fetchImages();
  }, [photoUrl]);

  return photo;
};
