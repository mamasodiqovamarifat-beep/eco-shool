import { Slide, PresentationData } from '../types/slide';

const DB_NAME = 'eco_schools_db';
const DB_VERSION = 1;
const STORE_DATA = 'presentation_data';
const STORE_MEDIA = 'media_blobs';

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_DATA)) {
        db.createObjectStore(STORE_DATA, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORE_MEDIA)) {
        db.createObjectStore(STORE_MEDIA, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function savePresentationToDB(data: PresentationData): Promise<void> {
  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction([STORE_DATA], 'readwrite');
      const store = tx.objectStore(STORE_DATA);
      store.put(data);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.warn('IndexedDB save failed, trying localStorage backup:', err);
    try {
      localStorage.setItem('eco_school_presentation', JSON.stringify(data));
    } catch {
      // Ignored if quota exceeded
    }
  }
}

export async function loadPresentationFromDB(): Promise<PresentationData | null> {
  try {
    const db = await openDatabase();
    return new Promise((resolve) => {
      const tx = db.transaction([STORE_DATA], 'readonly');
      const store = tx.objectStore(STORE_DATA);
      const req = store.get('main_presentation');
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  } catch (err) {
    console.warn('IndexedDB load failed, falling back to localStorage:', err);
    try {
      const saved = localStorage.getItem('eco_school_presentation');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  }
}

export async function saveMediaBlob(blobId: string, blob: Blob): Promise<string> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction([STORE_MEDIA], 'readwrite');
    const store = tx.objectStore(STORE_MEDIA);
    store.put({ id: blobId, blob, createdAt: Date.now() });
    tx.oncomplete = () => {
      const blobUrl = URL.createObjectURL(blob);
      resolve(blobUrl);
    };
    tx.onerror = () => reject(tx.error);
  });
}

export async function getMediaBlobUrl(blobId: string): Promise<string | null> {
  try {
    const db = await openDatabase();
    return new Promise((resolve) => {
      const tx = db.transaction([STORE_MEDIA], 'readonly');
      const store = tx.objectStore(STORE_MEDIA);
      const req = store.get(blobId);
      req.onsuccess = () => {
        if (req.result && req.result.blob) {
          resolve(URL.createObjectURL(req.result.blob));
        } else {
          resolve(null);
        }
      };
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

export async function clearPresentationDB(): Promise<void> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction([STORE_DATA, STORE_MEDIA], 'readwrite');
    tx.objectStore(STORE_DATA).clear();
    tx.objectStore(STORE_MEDIA).clear();
    tx.oncomplete = () => {
      localStorage.removeItem('eco_school_presentation');
      resolve();
    };
    tx.onerror = () => reject(tx.error);
  });
}
