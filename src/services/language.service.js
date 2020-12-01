import fs from 'fs'
import Path from 'path'


export default function GetLanguage(key) {
  const resource=require(`../resources/${key}.resource.json`)
  return resource;
}