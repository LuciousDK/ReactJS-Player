import { VideoData } from "./httpClient";

export function saveToFavorites(data: VideoData) {
  let favorites = getFavoritesList();
  let list: string[];
  if (favorites === null) {
    list = [data.id.videoId];
  } else {
    if (!isInFavorites(data.id.videoId)) {
      favorites.push(data.id.videoId);
    }
    list = favorites;
  }
  saveFavoritesList(list);
  saveToLibrary(data);
}

export function removeFromFavorites(videoId:string){
    let favorites = getFavoritesList()
    if(favorites!==null){
        favorites = removeElementFromArray(favorites ,videoId)
        saveFavoritesList(favorites)
    }
}

//If favorites list doesn't exist returns null
export function getFavoritesList(): string[] | null {
  const favorites = localStorage.getItem("favorites");
  if (favorites === null) return null;
  else return JSON.parse(favorites);
}

function saveFavoritesList(list: string[]) {
  localStorage.setItem("favorites", JSON.stringify(list));
}

export function isInFavorites(videoId: string): boolean {
  const favorites = getFavoritesList();
  if (favorites !== null && favorites.includes(videoId)) return true;
  return false;
}

export function saveToLibrary(data: VideoData) {
  let library = getLibraryList();
  let list: string[];
  if (library === null) {
    list = [data.id.videoId];
  } else {
    if (!isInLibrary(data.id.videoId)) {
      library.push(data.id.videoId);
    }
    list = library;
  }
  saveLibraryList(list);
  saveVideoData(data);
}

export function removeFromLibrary(videoId:string){
    let library = getLibraryList()
    if(library!==null){
        library = removeElementFromArray(library ,videoId)
        saveLibraryList(library)
    }
    removeFromFavorites(videoId)
}

//If library list doesn't exist returns null
export function getLibraryList(): string[] | null {
  const library = localStorage.getItem("library");
  if (library === null) return null;
  else return JSON.parse(library);
}

function saveLibraryList(list: string[]) {
  localStorage.setItem("library", JSON.stringify(list));
}

export function isInLibrary(videoId: string): boolean {
  const library = getLibraryList();
  if (library !== null && library.includes(videoId)) return true;
  return false;
}

function saveVideoData(data: VideoData) {
  localStorage.setItem(data.id.videoId, JSON.stringify(data));
}

export function getVideoData(videoId: string): VideoData | null {
  let data = localStorage.getItem(videoId);
  let returnData: VideoData | null;
  if (data) returnData = JSON.parse(data);
  else returnData = null;
  return returnData;
}

function removeElementFromArray(array: Array<any>, element: any) : Array<any>{
    const index = array.indexOf(element);
    if (index > -1) {
      array.splice(index, 1);
    }
    return array;
}
