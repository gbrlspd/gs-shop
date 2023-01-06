import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { db } from '../firebase/config';

const useFetchCollection = (collectionName) => {
  const [data, setData] = useState([]);

  const getCollection = () => {
    toast.loading('Processing your request...');
    try {
      const docRef = collection(db, collectionName);
      const q = query(docRef, orderBy('createdAt', 'desc'));
      onSnapshot(q, (querySnapshot) => {
        toast.dismiss();
        const allData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(allData);
      });
    } catch (error) {
      toast.dismiss();
      toast.error(`${error.message}`, { theme: 'colored' });
    }
  };

  useEffect(() => {
    getCollection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data };
};

export default useFetchCollection;
