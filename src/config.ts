"use client"

import { IconType } from "react-icons/lib"
import { FaItunesNote } from "react-icons/fa6";
import { IoMdAlbums } from "react-icons/io";
import { IoHome } from "react-icons/io5";
import { MdArtTrack } from "react-icons/md";

export const links: [string, string][] = [
  ["Home", "/"],
  ["New releases", "/releases"],
  ["Shuffle play", "/shuffle"]
]

export const browseMusic: [IconType, string, string][] = [
  [IoHome, "Home", "/"],
  [IoMdAlbums, "Albums", "/albums"],
  [MdArtTrack, "Tracks", '/tracks'],
  [FaItunesNote, "Genres", "/genres"]
]

export const MODE: string = "production"
export const API_URL = MODE == "development" ? "http://localhost:5050/api" : "http://85.193.80.231:5050/api"
export const STATIC_URL = MODE == "development" ? "http://localhost:5050" : "http://85.193.80.231:5050"