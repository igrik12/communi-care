import { useState, useEffect } from 'react';
import { Storage, Cache } from 'aws-amplify';

export const useFetchPhoto = (data) => {
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    const fetchImages = async () => {
      data.forEach(async (item) => {
        const ret = Cache.getItem(item.id);
        let mapped;
        if (ret) {
          mapped = { id: item.id, photo: ret };
        } else {
          const photo = await Storage.get(item.photoUrl);
          Cache.setItem(item.id, photo);
          mapped = { id: item.id, photo };
        }
        setPhotos((prevArray) => [...prevArray, mapped]);
      });
    };
    fetchImages();
  }, [data]);
  return photos;
};

/**
 * Fetches an item URL and stores that in the session cache
 * @param {String} id Identifier for the cache key
 * @param {*} photoUrl img file name to be used to retrieve the item
 */
export const usePhoto = (id, photoUrl) => {
  const [photo, setPhoto] = useState();
  useEffect(() => {
    const fetchImage = async () => {
      const item = Cache.getItem(id);
      if (item) {
        setPhoto(item);
      } else {
        const img = await Storage.get(photoUrl);
        setPhoto(img);
        Cache.setItem(id, img);
      }
    };
    fetchImage();
  }, [id, photoUrl]);

  return photo;
};
