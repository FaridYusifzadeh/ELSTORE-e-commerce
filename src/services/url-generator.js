import {URL as DEV_URL,API_VERSION as DEV_API_VERSION} from '../config/enviroment/development'


export default function UrlGenerator(lang,source){
  return `${DEV_URL}/api/${DEV_API_VERSION}/${lang}/${source}`;
}