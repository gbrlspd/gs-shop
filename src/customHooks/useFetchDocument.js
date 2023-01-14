import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { db } from '../firebase/config';

const useFetchDocument = (collection, id) => {
  const [document, setDocument] = useState({});

  const getDocument = async () => {
    const docRef = doc(db, collection, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const result = {
        id: id,
        ...docSnap.data(),
      };
      setDocument(result);
    } else {
      toast.error('Document not found!', { theme: 'colored' });
    }
  };

  useEffect(() => {
    getDocument();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { document };
};

export default useFetchDocument;
